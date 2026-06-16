import type {
  AppData,
  Game,
  NewsItem,
  Player,
  TeamRecord,
  YouTubeVideo,
} from '../types';

const API = '/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`API error: ${path}`);
  return res.json();
}

function parseRecord(teamData: Record<string, unknown>): TeamRecord {
  const team = teamData.team as Record<string, unknown>;
  const record = team.record as Record<string, unknown>;
  const items = (record.items as Array<Record<string, unknown>>) ?? [];
  const total = items.find((i) => i.type === 'total') ?? items[0] ?? {};
  const stats = (total.stats as Array<Record<string, unknown>>) ?? [];

  const getStat = (name: string) => {
    const stat = stats.find((s) => s.name === name);
    return stat?.displayValue ?? stat?.value ?? '—';
  };

  const winPctRaw = getStat('winPercent');
  const winPct =
    typeof winPctRaw === 'number' || !isNaN(Number(winPctRaw))
      ? `${(Number(winPctRaw) * (Number(winPctRaw) <= 1 ? 100 : 1)).toFixed(1)}%`
      : String(winPctRaw);

  const streakVal = getStat('streak');
  const standingSummary = team.standingSummary as string | undefined;

  return {
    wins: Number(getStat('wins')) || 0,
    losses: Number(getStat('losses')) || 0,
    winPct,
    streak: String(streakVal),
    standing: standingSummary ?? String(getStat('playoffSeed') ? `${getStat('playoffSeed')}th Seed` : '—'),
    conference: 'Eastern Conference',
  };
}

function parseGames(scheduleData: Record<string, unknown>): Game[] {
  const events = (scheduleData.events as Array<Record<string, unknown>>) ?? [];
  const now = Date.now();

  return events
    .slice(0, 20)
    .map((event) => {
      const comp = (event.competitions as Array<Record<string, unknown>>)?.[0];
      if (!comp) return null;

      const competitors = (comp.competitors as Array<Record<string, unknown>>) ?? [];
      const cavs = competitors.find((c) => (c.team as Record<string, unknown>)?.abbreviation === 'CLE');
      const opp = competitors.find((c) => (c.team as Record<string, unknown>)?.abbreviation !== 'CLE');
      if (!cavs || !opp) return null;

      const oppTeam = opp.team as Record<string, unknown>;
      const oppLogos = oppTeam.logos as Array<Record<string, unknown>> | undefined;
      const isHome = cavs.homeAway === 'home';
      const cavsScore = cavs.score ? Number(cavs.score) : undefined;
      const oppScore = opp.score ? Number(opp.score) : undefined;
      const eventDate = new Date(event.date as string).getTime();
      const isPast = eventDate < now && cavsScore !== undefined;

      let result: Game['result'] = 'upcoming';
      if (isPast && cavsScore !== undefined && oppScore !== undefined) {
        result = cavsScore > oppScore ? 'W' : 'L';
      }

      const scoreStr =
        cavsScore !== undefined && oppScore !== undefined
          ? `${cavsScore} - ${oppScore}`
          : new Date(event.date as string).toLocaleDateString('zh-CN', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

      return {
        id: String(event.id),
        date: event.date as string,
        opponent: String(oppTeam.displayName ?? oppTeam.name),
        opponentLogo: String(oppLogos?.[0]?.href ?? oppTeam.logo ?? ''),
        homeAway: isHome ? 'home' : 'away',
        result,
        score: scoreStr,
        cavsScore,
        oppScore,
      } satisfies Game;
    })
    .filter(Boolean)
    .slice(0, 10) as Game[];
}

function parsePlayers(raw: Array<Record<string, unknown>>): Player[] {
  return raw.slice(0, 15).map((p) => ({
    id: String(p.id),
    name: String(p.name),
    position: String(p.position),
    jersey: String(p.jersey),
    headshot: String(p.headshot ?? ''),
    ppg: Number(p.ppg) || 0,
    rpg: Number(p.rpg) || 0,
    apg: Number(p.apg) || 0,
    fgPct: String(p.fgPct ?? '—'),
  }));
}

function parseNews(newsData: Record<string, unknown>): NewsItem[] {
  const articles = (newsData.articles as Array<Record<string, unknown>>) ?? [];
  return articles.slice(0, 6).map((a) => ({
    id: String(a.dataSourceIdentifier ?? a.headline),
    headline: String(a.headline),
    description: String(a.description ?? ''),
    image: String((a.images as Array<Record<string, unknown>>)?.[0]?.url ?? ''),
    published: String(a.published ?? a.lastModified ?? ''),
    link: String((a.links as Record<string, unknown>)?.web
      ? ((a.links as Record<string, Record<string, unknown>>).web?.href ?? '#')
      : '#'),
  }));
}

export async function fetchAppData(): Promise<AppData> {
  const [teamData, scheduleData, playerStats, videos, newsData] = await Promise.all([
    get<Record<string, unknown>>('/team'),
    get<Record<string, unknown>>('/schedule'),
    get<Array<Record<string, unknown>>>('/player-stats'),
    get<YouTubeVideo[]>('/videos'),
    get<Record<string, unknown>>('/news').catch(() => ({ articles: [] })),
  ]);

  const team = teamData.team as Record<string, unknown>;
  const teamInfo = team as Record<string, unknown>;

  return {
    team: parseRecord(teamData),
    recentGames: parseGames(scheduleData),
    players: parsePlayers(playerStats),
    videos,
    news: parseNews(newsData),
    teamName: String(teamInfo.displayName ?? 'Cleveland Cavaliers'),
    teamLogo: String(
      (teamInfo.logos as Array<Record<string, unknown>>)?.[0]?.href ?? ''
    ),
    arena: String(
      ((teamInfo.franchise as Record<string, unknown>)?.venue as Record<string, unknown>)
        ?.fullName ?? 'Rocket Mortgage FieldHouse'
    ),
  };
}

export async function fetchVideos(): Promise<YouTubeVideo[]> {
  return get<YouTubeVideo[]>('/videos');
}

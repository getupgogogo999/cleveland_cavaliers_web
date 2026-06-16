import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLAYERS_FILE = path.join(__dirname, '..', 'public', 'data', 'players.json');

const CAVS_CHANNEL_ID = 'UCWJ2lWNubArHWmf3FIHbF_Q';
const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba';
const ESPN_STATS =
  'https://site.api.espn.com/apis/common/v3/sports/basketball/nba/athletes';

const cache = new Map();
let bootstrapCache = null;
let bootstrapCacheTime = 0;
const BOOTSTRAP_TTL = 3 * 60 * 1000;

async function withCache(key, ttlMs, fn) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < ttlMs) return hit.data;
  const data = await fn();
  cache.set(key, { data, time: Date.now() });
  return data;
}

async function fetchJson(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'CavsNation/1.0 (fan site)' },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function fetchText(url, timeoutMs = 2500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'CavsNation/1.0 (fan site)' },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`);
    return res.text();
  } finally {
    clearTimeout(timer);
  }
}

function readStaticPlayers() {
  try {
    const raw = fs.readFileSync(PLAYERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function parseYouTubeRss(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '';
    const title = block.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1] ?? '';
    const thumb =
      block.match(/<media:thumbnail url="([^"]+)"/)?.[1] ??
      `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    if (id) {
      entries.push({
        id,
        title: title.replace(/&amp;/g, '&').replace(/&quot;/g, '"'),
        published,
        thumbnail: thumb,
        description: '',
        url: `https://www.youtube.com/watch?v=${id}`,
      });
    }
  }
  return entries;
}

function getFallbackVideos() {
  return [
    {
      id: '4gdYH5wgTc4',
      title: 'Cavs at Pistons | Game Highlights',
      published: '2026-05-17T20:30:12-07:00',
      thumbnail: 'https://img.youtube.com/vi/4gdYH5wgTc4/hqdefault.jpg',
      description: 'Cleveland Cavaliers highlights',
      url: 'https://www.youtube.com/watch?v=4gdYH5wgTc4',
    },
    {
      id: 'ySSWyYd0em8',
      title: 'Cleveland Cavaliers All-Access - Perspective',
      published: '2026-02-02T16:30:06-08:00',
      thumbnail: 'https://img.youtube.com/vi/ySSWyYd0em8/hqdefault.jpg',
      description: 'Cleveland Cavaliers highlights',
      url: 'https://www.youtube.com/watch?v=ySSWyYd0em8',
    },
    {
      id: '1EMhI7DDa7I',
      title: 'Highlights | Cavs at Heat',
      published: '2025-11-13T06:50:00-08:00',
      thumbnail: 'https://img.youtube.com/vi/1EMhI7DDa7I/hqdefault.jpg',
      description: 'Cleveland Cavaliers highlights',
      url: 'https://www.youtube.com/watch?v=1EMhI7DDa7I',
    },
  ];
}

async function fetchYouTubeVideosFast() {
  try {
    const xml = await fetchText(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CAVS_CHANNEL_ID}`,
      2500
    );
    const videos = parseYouTubeRss(xml);
    if (videos.length > 0) return videos.slice(0, 12);
  } catch {
    /* fallback */
  }
  return getFallbackVideos();
}

function parseRecord(teamData) {
  const team = teamData?.team ?? {};
  const record = team.record ?? {};
  const items = record.items ?? [];
  const total = items.find((i) => i.type === 'total') ?? items[0] ?? {};
  const stats = total.stats ?? [];
  const getStat = (name) => stats.find((s) => s.name === name)?.displayValue ?? stats.find((s) => s.name === name)?.value ?? '—';
  const winPctRaw = getStat('winPercent');
  const winPct =
    !isNaN(Number(winPctRaw))
      ? `${(Number(winPctRaw) * (Number(winPctRaw) <= 1 ? 100 : 1)).toFixed(1)}%`
      : String(winPctRaw);

  return {
    wins: Number(getStat('wins')) || 0,
    losses: Number(getStat('losses')) || 0,
    winPct,
    streak: String(getStat('streak')),
    standing: team.standingSummary ?? '—',
    conference: 'Eastern Conference',
  };
}

function parseGames(scheduleData) {
  const events = scheduleData?.events ?? [];
  const now = Date.now();
  return events
    .slice(0, 20)
    .map((event) => {
      const comp = event.competitions?.[0];
      if (!comp) return null;
      const competitors = comp.competitors ?? [];
      const cavs = competitors.find((c) => c.team?.abbreviation === 'CLE');
      const opp = competitors.find((c) => c.team?.abbreviation !== 'CLE');
      if (!cavs || !opp) return null;
      const oppTeam = opp.team ?? {};
      const isHome = cavs.homeAway === 'home';
      const cavsScore = cavs.score != null ? Number(cavs.score) : undefined;
      const oppScore = opp.score != null ? Number(opp.score) : undefined;
      const eventDate = new Date(event.date).getTime();
      const isPast = eventDate < now && cavsScore !== undefined;
      let result = 'upcoming';
      if (isPast && cavsScore !== undefined && oppScore !== undefined) {
        result = cavsScore > oppScore ? 'W' : 'L';
      }
      const scoreStr =
        cavsScore !== undefined && oppScore !== undefined
          ? `${cavsScore} - ${oppScore}`
          : new Date(event.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
      return {
        id: String(event.id),
        date: event.date,
        opponent: String(oppTeam.displayName ?? oppTeam.name),
        opponentLogo: String(oppTeam.logos?.[0]?.href ?? oppTeam.logo ?? ''),
        homeAway: isHome ? 'home' : 'away',
        result,
        score: scoreStr,
        cavsScore,
        oppScore,
      };
    })
    .filter(Boolean)
    .slice(0, 10);
}

function parseNews(newsData) {
  return (newsData?.articles ?? []).slice(0, 6).map((a) => ({
    id: String(a.dataSourceIdentifier ?? a.headline),
    headline: String(a.headline),
    description: String(a.description ?? ''),
    image: String(a.images?.[0]?.url ?? ''),
    published: String(a.published ?? a.lastModified ?? ''),
    link: String(a.links?.web?.href ?? '#'),
  }));
}

export async function getBootstrap() {
  if (bootstrapCache && Date.now() - bootstrapCacheTime < BOOTSTRAP_TTL) {
    return bootstrapCache;
  }

  const players = readStaticPlayers();
  const videos = getFallbackVideos();

  const [teamResult, scheduleResult, videosResult, newsResult] = await Promise.allSettled([
    fetchJson(`${ESPN_BASE}/teams/cle`, 5000),
    fetchJson(`${ESPN_BASE}/teams/cle/schedule`, 5000),
    fetchYouTubeVideosFast(),
    fetchJson(`${ESPN_BASE}/news`, 3000),
  ]);

  const teamData = teamResult.status === 'fulfilled' ? teamResult.value : null;
  const scheduleData = scheduleResult.status === 'fulfilled' ? scheduleResult.value : null;
  const fetchedVideos = videosResult.status === 'fulfilled' ? videosResult.value : videos;
  const newsData = newsResult.status === 'fulfilled' ? newsResult.value : { articles: [] };

  const teamInfo = teamData?.team ?? {};
  const bootstrap = {
    team: teamData ? parseRecord(teamData) : { wins: 0, losses: 0, winPct: '—', streak: '—', standing: '—', conference: 'Eastern Conference' },
    recentGames: scheduleData ? parseGames(scheduleData) : [],
    players,
    videos: fetchedVideos,
    news: parseNews(newsData),
    teamName: String(teamInfo.displayName ?? 'Cleveland Cavaliers'),
    teamLogo: String(teamInfo.logos?.[0]?.href ?? 'https://a.espncdn.com/i/teamlogos/nba/500/cle.png'),
    arena: String(teamInfo.franchise?.venue?.fullName ?? 'Rocket Mortgage FieldHouse'),
  };

  bootstrapCache = bootstrap;
  bootstrapCacheTime = Date.now();
  return bootstrap;
}

export function warmCache() {
  getBootstrap().catch(() => {});
  setInterval(() => getBootstrap().catch(() => {}), 4 * 60 * 1000);
}

/* legacy endpoints */
export async function getTeam() {
  return withCache('team', 5 * 60 * 1000, () => fetchJson(`${ESPN_BASE}/teams/cle`));
}
export async function getSchedule() {
  return withCache('schedule', 5 * 60 * 1000, () => fetchJson(`${ESPN_BASE}/teams/cle/schedule`));
}
export async function getStandings() {
  return withCache('standings', 10 * 60 * 1000, () =>
    fetchJson('https://site.api.espn.com/apis/v2/sports/basketball/nba/standings')
  );
}
export async function getRoster() {
  return withCache('roster', 30 * 60 * 1000, () => fetchJson(`${ESPN_BASE}/teams/cle/roster`));
}
export async function getPlayerStats() {
  return readStaticPlayers();
}
export async function getVideos() {
  return withCache('videos', 10 * 60 * 1000, fetchYouTubeVideosFast);
}
export async function getNews() {
  return withCache('news', 5 * 60 * 1000, async () => {
    const data = await fetchJson(`${ESPN_BASE}/news`, 3000);
    return { articles: (data.articles ?? []).slice(0, 6) };
  });
}

/* build-time player refresh (optional) */
function parseAthleteStats(statsData) {
  const avg = statsData.categories?.find((c) => c.name === 'averages');
  if (!avg?.names || !avg?.totals) return null;
  const map = {};
  avg.names.forEach((name, i) => { map[name] = avg.totals[i]; });
  return {
    ppg: parseFloat(map.avgPoints) || 0,
    rpg: parseFloat(map.avgRebounds) || 0,
    apg: parseFloat(map.avgAssists) || 0,
    fgPct: map.fieldGoalPct ? `${map.fieldGoalPct}%` : '—',
  };
}

export async function refreshPlayerDataFile() {
  const roster = await fetchJson(`${ESPN_BASE}/teams/cle/roster`, 8000);
  const active = (roster.athletes ?? []).filter((a) => a.status?.type !== 'inactive').slice(0, 10);
  const results = await Promise.allSettled(
    active.map(async (ath) => {
      const statsData = await fetchJson(`${ESPN_STATS}/${ath.id}/stats?season=2025&seasontype=2`, 8000);
      const stats = parseAthleteStats(statsData);
      return {
        id: String(ath.id),
        name: ath.displayName ?? ath.fullName,
        position: ath.position?.abbreviation ?? '—',
        jersey: String(ath.jersey ?? '—'),
        headshot: ath.headshot?.href ?? '',
        ppg: stats?.ppg ?? 0,
        rpg: stats?.rpg ?? 0,
        apg: stats?.apg ?? 0,
        fgPct: stats?.fgPct ?? '—',
      };
    })
  );
  const players = results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((p) => p.ppg > 0)
    .sort((a, b) => b.ppg - a.ppg);
  if (players.length > 0) {
    fs.mkdirSync(path.dirname(PLAYERS_FILE), { recursive: true });
    fs.writeFileSync(PLAYERS_FILE, JSON.stringify(players, null, 2));
  }
  return players;
}

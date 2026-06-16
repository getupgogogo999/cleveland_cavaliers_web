const CAVS_CHANNEL_ID = 'UCWJ2lWNubArHWmf3FIHbF_Q';
const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba';
const ESPN_STATS =
  'https://site.api.espn.com/apis/common/v3/sports/basketball/nba/athletes';

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'CavsNation/1.0 (fan site)' },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'CavsNation/1.0 (fan site)' },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${url} (${res.status})`);
  return res.text();
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
    const description =
      block.match(/<media:description>([^<]*)<\/media:description>/)?.[1] ?? '';

    if (id) {
      entries.push({
        id,
        title: decodeXml(title),
        published,
        thumbnail: thumb,
        description: decodeXml(description),
        url: `https://www.youtube.com/watch?v=${id}`,
      });
    }
  }

  return entries;
}

function decodeXml(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function getFallbackVideos() {
  const items = [
    {
      id: '4gdYH5wgTc4',
      title: 'Cavs at Pistons | Game Highlights | 05.17.2026',
      published: '2026-05-17T20:30:12-07:00',
    },
    {
      id: 'ySSWyYd0em8',
      title: 'Cleveland Cavaliers All-Access - Perspective',
      published: '2026-02-02T16:30:06-08:00',
    },
    {
      id: '1EMhI7DDa7I',
      title: 'Highlights & Recap | Cavs at Heat | 11.12.2025',
      published: '2025-11-13T06:50:00-08:00',
    },
  ];

  return items.map((v) => ({
    id: v.id,
    title: v.title,
    published: v.published,
    thumbnail: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    description: 'Cleveland Cavaliers official highlights',
    url: `https://www.youtube.com/watch?v=${v.id}`,
  }));
}

async function fetchYouTubeVideos() {
  const urls = [
    `https://www.youtube.com/feeds/videos.xml?channel_id=${CAVS_CHANNEL_ID}`,
    `https://www.youtube.com/feeds/videos.xml?playlist_id=UU${CAVS_CHANNEL_ID.slice(2)}`,
  ];

  for (const url of urls) {
    try {
      const xml = await fetchText(url);
      const videos = parseYouTubeRss(xml);
      if (videos.length > 0) return videos.slice(0, 12);
    } catch {
      /* try next source */
    }
  }

  return getFallbackVideos();
}

function parseAthleteStats(statsData) {
  const avg = statsData.categories?.find((c) => c.name === 'averages');
  if (!avg?.names || !avg?.totals) return null;

  const map = {};
  avg.names.forEach((name, i) => {
    map[name] = avg.totals[i];
  });

  return {
    ppg: parseFloat(map.avgPoints) || 0,
    rpg: parseFloat(map.avgRebounds) || 0,
    apg: parseFloat(map.avgAssists) || 0,
    fgPct: map.fieldGoalPct ? `${map.fieldGoalPct}%` : '—',
    mpg: parseFloat(map.avgMinutes) || 0,
    gamesPlayed: parseInt(map.gamesPlayed, 10) || 0,
  };
}

async function fetchPlayerStats(athletes) {
  const active = athletes.filter((a) => a.status?.type !== 'inactive').slice(0, 16);

  const results = await Promise.all(
    active.map(async (ath) => {
      const headshot = ath.headshot?.href ?? '';
      const position = ath.position?.abbreviation ?? '—';

      try {
        const statsData = await fetchJson(
          `${ESPN_STATS}/${ath.id}/stats?season=2025&seasontype=2`
        );
        const stats = parseAthleteStats(statsData);

        return {
          id: String(ath.id),
          name: ath.displayName ?? ath.fullName,
          position,
          jersey: String(ath.jersey ?? '—'),
          headshot,
          ppg: stats?.ppg ?? 0,
          rpg: stats?.rpg ?? 0,
          apg: stats?.apg ?? 0,
          fgPct: stats?.fgPct ?? '—',
          mpg: stats?.mpg ?? 0,
          gamesPlayed: stats?.gamesPlayed ?? 0,
        };
      } catch {
        return {
          id: String(ath.id),
          name: ath.displayName ?? ath.fullName,
          position,
          jersey: String(ath.jersey ?? '—'),
          headshot,
          ppg: 0,
          rpg: 0,
          apg: 0,
          fgPct: '—',
          mpg: 0,
          gamesPlayed: 0,
        };
      }
    })
  );

  return results.filter((p) => p.gamesPlayed > 0 || p.ppg > 0).sort((a, b) => b.ppg - a.ppg);
}

export async function getTeam() {
  return fetchJson(`${ESPN_BASE}/teams/cle`);
}

export async function getSchedule() {
  return fetchJson(`${ESPN_BASE}/teams/cle/schedule`);
}

export async function getStandings() {
  return fetchJson('https://site.api.espn.com/apis/v2/sports/basketball/nba/standings');
}

export async function getRoster() {
  return fetchJson(`${ESPN_BASE}/teams/cle/roster`);
}

export async function getPlayerStats() {
  const roster = await getRoster();
  return fetchPlayerStats(roster.athletes ?? []);
}

export async function getVideos() {
  try {
    return await fetchYouTubeVideos();
  } catch {
    return getFallbackVideos();
  }
}

export async function getNews() {
  const data = await fetchJson(`${ESPN_BASE}/news`);
  return { articles: (data.articles ?? []).slice(0, 6) };
}

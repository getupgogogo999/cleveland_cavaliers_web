function parseScore(raw) {
  if (raw == null || raw === '') return undefined;
  if (typeof raw === 'number' && !Number.isNaN(raw)) return raw;
  if (typeof raw === 'string') {
    const n = Number(raw);
    return Number.isNaN(n) ? undefined : n;
  }
  if (typeof raw === 'object') {
    if (raw.value != null) return parseScore(raw.value);
    if (raw.displayValue != null) return parseScore(raw.displayValue);
  }
  return undefined;
}

function formatGameScore(cavsScore, oppScore, date) {
  if (cavsScore != null && oppScore != null && !Number.isNaN(cavsScore) && !Number.isNaN(oppScore)) {
    return `${cavsScore} - ${oppScore}`;
  }
  if (date) {
    return new Date(date).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return '待定';
}

export function parseGamesFromSchedule(scheduleData) {
  const events = scheduleData?.events ?? [];
  const now = Date.now();

  const parsed = events
    .map((event) => {
      const comp = event.competitions?.[0];
      if (!comp) return null;

      const competitors = comp.competitors ?? [];
      const cavs = competitors.find((c) => c.team?.abbreviation === 'CLE');
      const opp = competitors.find((c) => c.team?.abbreviation !== 'CLE');
      if (!cavs || !opp) return null;

      const oppTeam = opp.team ?? {};
      const isHome = cavs.homeAway === 'home';
      const cavsScore = parseScore(cavs.score);
      const oppScore = parseScore(opp.score);
      const eventDate = new Date(event.date).getTime();
      const status = comp.status?.type?.name ?? event.status?.type?.name ?? '';
      const isFinal = status === 'STATUS_FINAL' || String(status).includes('FINAL');
      const hasScore = cavsScore != null && oppScore != null;

      let result = 'upcoming';
      if (hasScore && (isFinal || eventDate < now)) {
        result = cavsScore > oppScore ? 'W' : 'L';
      }

      return {
        id: String(event.id),
        date: event.date,
        opponent: String(oppTeam.displayName ?? oppTeam.name),
        opponentLogo: String(oppTeam.logos?.[0]?.href ?? oppTeam.logo ?? ''),
        homeAway: isHome ? 'home' : 'away',
        result,
        score: formatGameScore(cavsScore, oppScore, event.date),
        cavsScore,
        oppScore,
        _sortDate: eventDate,
      };
    })
    .filter(Boolean);

  parsed.sort((a, b) => b._sortDate - a._sortDate);

  return parsed.slice(0, 12).map(({ _sortDate, ...game }) => game);
}

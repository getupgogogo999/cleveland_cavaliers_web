export function parseScore(raw: unknown): number | undefined {
  if (raw == null || raw === '') return undefined;
  if (typeof raw === 'number' && !Number.isNaN(raw)) return raw;
  if (typeof raw === 'string') {
    const n = Number(raw);
    return Number.isNaN(n) ? undefined : n;
  }
  if (typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    if (obj.value != null) return parseScore(obj.value);
    if (obj.displayValue != null) return parseScore(obj.displayValue);
  }
  return undefined;
}

export function formatGameScore(cavsScore?: number, oppScore?: number, date?: string): string {
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

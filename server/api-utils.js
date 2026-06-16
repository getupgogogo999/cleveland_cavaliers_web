/** Safe API helpers — never expose internal URLs, stack traces, or secrets. */

const GENERIC_ERROR = 'Service temporarily unavailable';

export function apiHandler(fetchData) {
  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=600');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const data = await fetchData();
      return res.status(200).json(data);
    } catch {
      return res.status(500).json({ error: GENERIC_ERROR });
    }
  };
}

export { GENERIC_ERROR };

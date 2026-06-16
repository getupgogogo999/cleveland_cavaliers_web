import type { AppData } from '../types';

const API = '/api';

export async function fetchBootstrap(): Promise<AppData> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${API}/bootstrap`, { signal: controller.signal });
    if (!res.ok) throw new Error('bootstrap failed');
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchVideos() {
  const data = await fetchBootstrap();
  return data.videos;
}

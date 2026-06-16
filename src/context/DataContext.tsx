import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchCoreData, fetchPlayerStatsData, fetchVideos } from '../services/api';
import type { AppData } from '../types';

interface DataContextValue {
  data: AppData | null;
  loading: boolean;
  playersLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  refreshVideos: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

const emptyData: AppData = {
  team: { wins: 0, losses: 0, winPct: '—', streak: '—', standing: '—', conference: 'Eastern Conference' },
  recentGames: [],
  players: [],
  videos: [],
  news: [],
  teamName: 'Cleveland Cavaliers',
  teamLogo: 'https://a.espncdn.com/i/teamlogos/nba/500/cle.png',
  arena: 'Rocket Mortgage FieldHouse',
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [playersLoading, setPlayersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const core = await fetchCoreData();
      setData(core);
      setLoading(false);

      setPlayersLoading(true);
      try {
        const players = await fetchPlayerStatsData();
        setData((prev) => (prev ? { ...prev, players } : prev));
      } catch {
        /* players optional — page still works */
      } finally {
        setPlayersLoading(false);
      }
    } catch {
      setError('数据加载失败，请稍后刷新页面重试');
      setLoading(false);
    }
  }, []);

  const refreshVideos = useCallback(async () => {
    try {
      const videos = await fetchVideos();
      setData((prev) => (prev ? { ...prev, videos } : prev));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    reload();
    const interval = setInterval(reload, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [reload]);

  return (
    <DataContext.Provider
      value={{ data: data ?? emptyData, loading, playersLoading, error, reload, refreshVideos }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

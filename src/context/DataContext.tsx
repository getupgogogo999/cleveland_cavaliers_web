import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchAppData, fetchVideos } from '../services/api';
import type { AppData } from '../types';

interface DataContextValue {
  data: AppData | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  refreshVideos: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const appData = await fetchAppData();
      setData(appData);
    } catch {
      setError('数据加载失败，请稍后刷新页面重试');
    } finally {
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
    <DataContext.Provider value={{ data, loading, error, reload, refreshVideos }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

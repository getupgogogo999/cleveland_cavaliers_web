import { Loader2, RefreshCw } from 'lucide-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { DataProvider, useData } from './context/DataContext';
import GamesPage from './pages/GamesPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import PlayersPage from './pages/PlayersPage';
import RecordPage from './pages/RecordPage';
import VideosPage from './pages/VideosPage';

function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cavs-navy"
      style={{ background: '#041E42', color: '#FFB81C', fontFamily: 'system-ui, sans-serif' }}
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full border-4 border-cavs-wine border-t-cavs-gold animate-spin" />
        <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-cavs-gold animate-pulse" />
      </div>
      <p className="mt-6 font-display text-xl text-cavs-gold tracking-widest" style={{ color: '#FFB81C' }}>
        LOADING CAVS...
      </p>
      <p className="mt-2 text-sm text-cavs-cream/40" style={{ color: '#F5F0E8' }}>
        正在加载…
      </p>
    </div>
  );
}

function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cavs-navy px-4">
      <p className="font-display text-2xl text-cavs-gold mb-2">加载失败</p>
      <p className="text-cavs-cream/60 text-center mb-6 max-w-md">{message}</p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-cavs-wine text-white rounded-full hover:bg-cavs-wine-light transition-colors"
      >
        <RefreshCw size={18} />
        重试
      </button>
      <p className="mt-8 text-xs text-cavs-cream/30">请检查网络连接后重试</p>
    </div>
  );
}

function AppRoutes() {
  const { loading, error, reload } = useData();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} onRetry={reload} />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="record" element={<RecordPage />} />
        <Route path="games" element={<GamesPage />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="news" element={<NewsPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AppRoutes />
      </DataProvider>
    </BrowserRouter>
  );
}

import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useData } from '../context/DataContext';

export default function Layout() {
  const { data } = useData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header teamName={data?.teamName ?? 'Cleveland Cavaliers'} teamLogo={data?.teamLogo ?? ''} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

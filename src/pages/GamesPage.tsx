import { GamesSection } from '../components/RecordSection';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../config/site';
import { useData } from '../context/DataContext';

export default function GamesPage() {
  const { data } = useData();
  if (!data) return null;

  return (
    <>
      <Seo {...PAGE_SEO.games} path="/games" />
      <div className="pt-24">
        <GamesSection games={data.recentGames} />
      </div>
    </>
  );
}

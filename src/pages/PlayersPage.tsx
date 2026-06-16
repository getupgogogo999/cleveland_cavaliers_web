import PlayersSection from '../components/PlayersSection';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../config/site';
import { useData } from '../context/DataContext';

export default function PlayersPage() {
  const { data } = useData();
  if (!data) return null;

  return (
    <>
      <Seo {...PAGE_SEO.players} path="/players" />
      <div className="pt-24">
        <PlayersSection players={data.players} />
      </div>
    </>
  );
}

import RecordSection from '../components/RecordSection';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../config/site';
import { useData } from '../context/DataContext';

export default function RecordPage() {
  const { data } = useData();
  if (!data) return null;

  return (
    <>
      <Seo {...PAGE_SEO.record} path="/record" />
      <div className="pt-24">
        <RecordSection record={data.team} games={data.recentGames} />
      </div>
    </>
  );
}

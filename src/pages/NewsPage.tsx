import NewsSection from '../components/NewsSection';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../config/site';
import { useData } from '../context/DataContext';

export default function NewsPage() {
  const { data } = useData();
  if (!data) return null;

  return (
    <>
      <Seo {...PAGE_SEO.news} path="/news" />
      <div className="pt-24">
        <NewsSection news={data.news} />
      </div>
    </>
  );
}

import HistorySection from '../components/HistorySection';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../config/site';

export default function HistoryPage() {
  return (
    <>
      <Seo {...PAGE_SEO.history} path="/history" />
      <div className="pt-24">
        <HistorySection />
      </div>
    </>
  );
}

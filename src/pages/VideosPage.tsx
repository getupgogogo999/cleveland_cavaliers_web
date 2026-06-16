import Seo from '../components/Seo';
import VideoSection from '../components/VideoSection';
import { PAGE_SEO } from '../config/site';
import { useData } from '../context/DataContext';

export default function VideosPage() {
  const { data, refreshVideos } = useData();
  if (!data) return null;

  return (
    <>
      <Seo {...PAGE_SEO.videos} path="/videos" />
      <div className="pt-24">
        <VideoSection videos={data.videos} onRefresh={refreshVideos} />
      </div>
    </>
  );
}

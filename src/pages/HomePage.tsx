import ImageCarousel from '../components/ImageCarousel';
import QuickNav from '../components/QuickNav';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import { CAROUSEL_SLIDES, PAGE_SEO, ROUTES } from '../config/site';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { data } = useData();

  return (
    <>
      <Seo {...PAGE_SEO.home} path="/" />
      <ImageCarousel slides={CAROUSEL_SLIDES} teamLogo={data.teamLogo} />
      <Hero
        teamName={data.teamName}
        teamLogo={data.teamLogo}
        arena={data.arena}
        record={data.team}
        compact
      />
      <QuickNav />
      <section className="py-12 border-t border-cavs-wine/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-cavs-cream/50 text-sm mb-4">今日推荐</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to={ROUTES.videos}
              className="px-5 py-2 glass-card hover:border-cavs-gold/40 text-sm transition-colors"
            >
              观看最新视频 →
            </Link>
            <Link
              to={ROUTES.record}
              className="px-5 py-2 glass-card hover:border-cavs-gold/40 text-sm transition-colors"
            >
              查看战绩 {data.team.wins}-{data.team.losses} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ImageCarousel from '../components/ImageCarousel';
import QuickNav from '../components/QuickNav';
import Seo from '../components/Seo';
import { DEFAULT_CAROUSEL_SLIDES, PAGE_SEO, ROUTES } from '../config/site';
import { useData } from '../context/DataContext';

export default function HomePage() {
  const { data } = useData();
  if (!data) return null;

  const playerSlides = data.players.slice(0, 3).map((p) => ({
    image:
      p.headshot ||
      'https://a.espncdn.com/i/teamlogos/nba/500/cle.png',
    title: p.name,
    subtitle: `#${p.jersey} · ${p.position} · ${p.ppg.toFixed(1)} 分/场`,
    link: ROUTES.players,
  }));

  const slides =
    playerSlides.length >= 3
      ? [...playerSlides, ...DEFAULT_CAROUSEL_SLIDES.slice(3)]
      : DEFAULT_CAROUSEL_SLIDES;

  return (
    <>
      <Seo {...PAGE_SEO.home} path="/" />
      <ImageCarousel slides={slides} />
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
            <Link to={ROUTES.videos} className="px-5 py-2 glass-card hover:border-cavs-gold/40 text-sm transition-colors">
              观看最新视频 →
            </Link>
            <Link to={ROUTES.record} className="px-5 py-2 glass-card hover:border-cavs-gold/40 text-sm transition-colors">
              查看战绩 {data.team.wins}-{data.team.losses} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

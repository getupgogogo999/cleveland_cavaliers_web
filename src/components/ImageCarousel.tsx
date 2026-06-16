import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CarouselSlide } from '../config/site';

interface ImageCarouselProps {
  slides: CarouselSlide[];
  teamLogo?: string;
  autoPlayMs?: number;
}

export default function ImageCarousel({ slides, teamLogo, autoPlayMs = 5500 }: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setDirection(next > index ? 1 : -1);
      setIndex((next + slides.length) % slides.length);
    },
    [index, slides.length]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, autoPlayMs);
    return () => clearInterval(timer);
  }, [next, autoPlayMs, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[index];

  const variants = {
    enter: (d: number) => ({ opacity: 0, scale: d > 0 ? 1.04 : 0.98 }),
    center: { opacity: 1, scale: 1 },
    exit: (d: number) => ({ opacity: 0, scale: d > 0 ? 0.98 : 1.04 }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-cavs-navy pt-16 md:pt-20">
      {/* 21:9 cinematic ratio — scales on all screen sizes */}
      <div className="relative w-full aspect-[21/9] min-h-[280px] max-h-[min(56vw,780px)]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {slide.variant === 'brand' ? (
              <div className="absolute inset-0 bg-gradient-to-br from-cavs-wine via-cavs-wine-dark to-cavs-navy">
                <div className="absolute inset-0 bg-hero-pattern opacity-60" />
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cavs-gold/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cavs-wine/30 rounded-full blur-3xl" />
                {teamLogo && (
                  <img
                    src={teamLogo}
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-32 h-32 md:w-48 md:h-48 opacity-20 object-contain pointer-events-none"
                  />
                )}
              </div>
            ) : (
              <>
                <img
                  src={slide.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cavs-navy via-cavs-navy/40 to-cavs-wine/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-cavs-navy/70 via-transparent to-cavs-navy/50" />
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12">
              <div className="max-w-7xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-cavs-cream/90 text-sm sm:text-base md:text-lg max-w-2xl mb-4 drop-shadow"
                >
                  {slide.subtitle}
                </motion.p>
                {slide.link && (
                  <Link
                    to={slide.link}
                    className="inline-block px-5 py-2 sm:px-6 sm:py-2.5 bg-cavs-gold text-cavs-navy font-semibold rounded-full hover:bg-cavs-gold-light transition-colors text-sm shadow-lg"
                  >
                    了解更多 →
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-cavs-wine/90 text-white transition-colors backdrop-blur-sm border border-white/10"
          aria-label="上一张"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-cavs-wine/90 text-white transition-colors backdrop-blur-sm border border-white/10"
          aria-label="下一张"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                i === index ? 'w-7 sm:w-8 bg-cavs-gold' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`第 ${i + 1} 张`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { CarouselSlide } from '../config/site';

interface ImageCarouselProps {
  slides: CarouselSlide[];
  autoPlayMs?: number;
}

export default function ImageCarousel({ slides, autoPlayMs = 5000 }: ImageCarouselProps) {
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
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section className="relative w-full h-[55vh] min-h-[360px] max-h-[680px] overflow-hidden bg-cavs-navy pt-20">
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80 || info.velocity.x < -400) next();
            else if (info.offset.x > 80 || info.velocity.x > 400) prev();
          }}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cavs-navy via-cavs-navy/50 to-cavs-wine/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-cavs-navy/80 via-transparent to-cavs-navy/40" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="font-display text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-cavs-cream/80 text-sm md:text-lg max-w-xl mb-4"
              >
                {slide.subtitle}
              </motion.p>
              {slide.link && (
                <Link
                  to={slide.link}
                  className="inline-block px-6 py-2.5 bg-cavs-gold text-cavs-navy font-semibold rounded-full hover:bg-cavs-gold-light transition-colors text-sm"
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
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 hover:bg-cavs-wine/80 text-white transition-colors backdrop-blur-sm"
        aria-label="上一张"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 hover:bg-cavs-wine/80 text-white transition-colors backdrop-blur-sm"
        aria-label="下一张"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-8 bg-cavs-gold' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`第 ${i + 1} 张`}
          />
        ))}
      </div>

      <p className="absolute top-24 right-4 md:right-8 z-20 text-xs text-cavs-cream/40 hidden sm:block">
        ← 左右滑动切换 →
      </p>
    </section>
  );
}

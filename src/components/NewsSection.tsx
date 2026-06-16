import { motion } from 'framer-motion';
import { ArrowRight, Newspaper } from 'lucide-react';
import type { NewsItem } from '../types';

interface NewsSectionProps {
  news: NewsItem[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  if (!news.length) return null;

  return (
    <section id="news" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title gold-gradient-text">最新资讯</h2>
          <p className="text-cavs-cream/60 mt-2">骑士队相关新闻动态</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card overflow-hidden group hover:border-cavs-gold/30 transition-all block"
            >
              <div className="relative h-44 bg-cavs-wine/30 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Newspaper size={48} className="text-cavs-wine-light/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-cavs-navy via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <p className="text-xs text-cavs-gold mb-2">
                  {item.published &&
                    new Date(item.published).toLocaleDateString('zh-CN')}
                </p>
                <h3 className="font-display text-lg font-bold text-white line-clamp-2 mb-2 group-hover:text-cavs-gold transition-colors">
                  {item.headline}
                </h3>
                {item.description && (
                  <p className="text-sm text-cavs-cream/50 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-sm text-cavs-gold">
                  阅读更多
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

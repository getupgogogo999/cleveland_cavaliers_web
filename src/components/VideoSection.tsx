import { motion } from 'framer-motion';
import { ExternalLink, Play, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import type { YouTubeVideo } from '../types';

interface VideoSectionProps {
  videos: YouTubeVideo[];
  onRefresh?: () => void;
}

export default function VideoSection({ videos, onRefresh }: VideoSectionProps) {
  const [activeVideo, setActiveVideo] = useState(videos[0]?.id ?? '');
  const active = videos.find((v) => v.id === activeVideo) ?? videos[0];

  if (!videos.length) {
    return (
      <section id="videos" className="py-20 bg-cavs-wine-dark/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title gold-gradient-text mb-4">精彩视频</h2>
          <p className="text-cavs-cream/60">视频加载中...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="videos" className="py-20 bg-cavs-wine-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
        >
          <div className="text-center sm:text-left">
            <h2 className="section-title gold-gradient-text">YouTube 精彩视频</h2>
            <p className="text-cavs-cream/60 mt-2">
              来自 Cleveland Cavaliers 官方频道
            </p>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2 glass-card hover:bg-white/10 transition-colors text-sm"
            >
              <RefreshCw size={16} />
              刷新视频
            </button>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="glass-card overflow-hidden">
              <div className="relative aspect-video bg-black">
                {active && (
                  <iframe
                    key={active.id}
                    src={`https://www.youtube.com/embed/${active.id}?autoplay=0&rel=0`}
                    title={active.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-white mb-2 line-clamp-2">
                  {active?.title}
                </h3>
                <p className="text-sm text-cavs-cream/50 mb-3">
                  {active?.published &&
                    new Date(active.published).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                </p>
                {active?.url && (
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-cavs-gold hover:text-cavs-gold-light text-sm transition-colors"
                  >
                    在 YouTube 观看
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3 max-h-[600px] overflow-y-auto pr-1"
          >
            {videos.map((video, i) => (
              <button
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                className={`w-full glass-card p-3 flex gap-3 text-left transition-all hover:bg-white/10 ${
                  activeVideo === video.id
                    ? 'border-cavs-gold/50 bg-cavs-gold/5'
                    : ''
                }`}
              >
                <div className="relative shrink-0 w-28 h-16 rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play size={20} className="text-white fill-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded">
                    {i + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white line-clamp-2 leading-snug">
                    {video.title}
                  </p>
                  <p className="text-[11px] text-cavs-cream/40 mt-1">
                    {new Date(video.published).toLocaleDateString('zh-CN')}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

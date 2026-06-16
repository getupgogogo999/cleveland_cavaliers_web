import { motion } from 'framer-motion';
import { MapPin, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TeamRecord } from '../types';
import { ROUTES } from '../config/site';

interface HeroProps {
  teamName: string;
  teamLogo: string;
  arena: string;
  record: TeamRecord;
  compact?: boolean;
}

export default function Hero({ teamName, teamLogo, arena, record, compact }: HeroProps) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${
        compact ? 'py-16 md:py-20' : 'min-h-screen pt-20'
      }`}
    >
      <div className="absolute inset-0 bg-hero-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-cavs-navy via-transparent to-cavs-navy" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {!compact && teamLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src={teamLogo}
              alt={teamName}
              className="h-32 w-32 md:h-44 md:w-44 mx-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-display font-bold tracking-tight mb-4 ${
            compact ? 'text-4xl sm:text-5xl' : 'text-5xl sm:text-7xl md:text-8xl'
          }`}
        >
          <span className="text-white">{teamName.split(' ').slice(-1)[0]}</span>
          {!compact && (
            <>
              <br />
              <span className="gold-gradient-text">NATION</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg text-cavs-cream/70 max-w-2xl mx-auto mb-8"
        >
          2016 NBA 总冠军 · 东部劲旅 · Wine & Gold 荣耀传承
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <div className="flex items-center gap-2 text-cavs-cream/60">
            <MapPin size={16} className="text-cavs-gold" />
            <span className="text-sm">{arena}</span>
          </div>
          <div className="flex items-center gap-2 text-cavs-cream/60">
            <Trophy size={16} className="text-cavs-gold" />
            <span className="text-sm">{record.standing}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: '胜场', value: record.wins },
            { label: '负场', value: record.losses },
            { label: '胜率', value: record.winPct },
            { label: '近况', value: record.streak },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 md:p-6 bg-card-shine">
              <p className="stat-value">{stat.value}</p>
              <p className="text-sm text-cavs-cream/50 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            to={ROUTES.videos}
            className="px-8 py-3 bg-cavs-gold text-cavs-navy font-semibold rounded-full hover:bg-cavs-gold-light transition-all hover:scale-105 shadow-lg shadow-cavs-gold/20"
          >
            观看精彩视频
          </Link>
          <Link
            to={ROUTES.players}
            className="px-8 py-3 border border-cavs-wine-light text-cavs-cream font-semibold rounded-full hover:bg-cavs-wine/30 transition-all"
          >
            查看球员数据
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

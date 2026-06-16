import { motion } from 'framer-motion';
import { Activity, Target, Users } from 'lucide-react';
import type { Player } from '../types';

interface PlayersSectionProps {
  players: Player[];
}

export default function PlayersSection({ players }: PlayersSectionProps) {
  const sorted = [...players].sort((a, b) => b.ppg - a.ppg);
  const topScorer = sorted[0];

  return (
    <section id="players" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title gold-gradient-text">球员表现</h2>
          <p className="text-cavs-cream/60 mt-2">2024-25 赛季核心数据</p>
        </motion.div>

        {topScorer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-8 mb-10 bg-gradient-to-r from-cavs-wine/30 via-cavs-wine/10 to-cavs-gold/10 border-cavs-gold/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative">
                {topScorer.headshot ? (
                  <img
                    src={topScorer.headshot}
                    alt={topScorer.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover object-top border-2 border-cavs-gold/50"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-cavs-wine flex items-center justify-center">
                    <Users size={48} className="text-cavs-gold/50" />
                  </div>
                )}
                <span className="absolute -top-2 -right-2 bg-cavs-gold text-cavs-navy text-xs font-bold px-2 py-1 rounded-full">
                  得分王
                </span>
              </div>
              <div className="text-center md:text-left flex-1">
                <p className="text-cavs-gold text-sm uppercase tracking-widest mb-1">
                  #{topScorer.jersey} · {topScorer.position}
                </p>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  {topScorer.name}
                </h3>
                <div className="grid grid-cols-3 gap-4 max-w-md">
                  <div>
                    <p className="font-display text-3xl font-bold text-cavs-gold">
                      {topScorer.ppg.toFixed(1)}
                    </p>
                    <p className="text-xs text-cavs-cream/50">得分</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-white">
                      {topScorer.rpg.toFixed(1)}
                    </p>
                    <p className="text-xs text-cavs-cream/50">篮板</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-white">
                      {topScorer.apg.toFixed(1)}
                    </p>
                    <p className="text-xs text-cavs-cream/50">助攻</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.slice(1).map((player, i) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden hover:border-cavs-gold/30 transition-all group"
            >
              <div className="relative h-48 bg-gradient-to-b from-cavs-wine/40 to-cavs-navy overflow-hidden">
                {player.headshot ? (
                  <img
                    src={player.headshot}
                    alt={player.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users size={64} className="text-cavs-wine-light/50" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-cavs-navy/80 backdrop-blur px-2 py-1 rounded-lg">
                  <span className="font-display font-bold text-cavs-gold">#{player.jersey}</span>
                </div>
                <div className="absolute top-3 right-3 bg-cavs-wine/80 backdrop-blur px-2 py-1 rounded-lg text-xs">
                  {player.position}
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-display text-lg font-bold text-white truncate mb-3">
                  {player.name}
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/5 rounded-lg p-2">
                    <Activity size={14} className="mx-auto mb-1 text-cavs-gold" />
                    <p className="font-bold text-sm text-white">{player.ppg.toFixed(1)}</p>
                    <p className="text-[10px] text-cavs-cream/40">PTS</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <Target size={14} className="mx-auto mb-1 text-cavs-cream/60" />
                    <p className="font-bold text-sm text-white">{player.rpg.toFixed(1)}</p>
                    <p className="text-[10px] text-cavs-cream/40">REB</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <Users size={14} className="mx-auto mb-1 text-cavs-cream/60" />
                    <p className="font-bold text-sm text-white">{player.apg.toFixed(1)}</p>
                    <p className="text-[10px] text-cavs-cream/40">AST</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

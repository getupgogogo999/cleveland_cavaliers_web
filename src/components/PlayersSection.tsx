import { motion } from 'framer-motion';
import type { Player } from '../types';

interface PlayersSectionProps {
  players: Player[];
}

function StatBar({ label, value, max, highlight }: { label: string; value: number; max: number; highlight?: boolean }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-cavs-cream/50">{label}</span>
        <span className={highlight ? 'text-cavs-gold font-bold' : 'text-white font-medium'}>
          {value.toFixed(1)}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${highlight ? 'bg-cavs-gold' : 'bg-cavs-wine-light'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function PlayersSection({ players }: PlayersSectionProps) {
  const sorted = [...players].sort((a, b) => b.ppg - a.ppg);
  const topScorer = sorted[0];
  const maxPpg = Math.max(...sorted.map((p) => p.ppg), 1);
  const maxRpg = Math.max(...sorted.map((p) => p.rpg), 1);
  const maxApg = Math.max(...sorted.map((p) => p.apg), 1);

  if (!sorted.length) {
    return (
      <section id="players" className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-cavs-cream/50">
          球员数据加载中…
        </div>
      </section>
    );
  }

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
          <p className="text-cavs-cream/60 mt-2">2024-25 赛季数据排行</p>
        </motion.div>

        {topScorer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-cavs-gold/30 mb-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cavs-wine via-cavs-wine-dark to-cavs-navy" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,184,28,0.12),transparent_55%)]" />
            <div className="relative p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex items-center gap-5 md:flex-1">
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cavs-navy/80 border-2 border-cavs-gold flex items-center justify-center overflow-hidden">
                    {topScorer.headshot ? (
                      <img
                        src={topScorer.headshot}
                        alt={topScorer.name}
                        className="w-full h-full object-cover object-top scale-110"
                      />
                    ) : (
                      <span className="font-display text-2xl text-cavs-gold">#{topScorer.jersey}</span>
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-cavs-gold text-cavs-navy text-[10px] font-bold px-2 py-0.5 rounded-full">
                    得分王
                  </span>
                </div>
                <div>
                  <p className="text-cavs-gold text-xs uppercase tracking-widest mb-1">
                    #{topScorer.jersey} · {topScorer.position}
                  </p>
                  <h3 className="font-display text-2xl md:text-4xl font-bold text-white">
                    {topScorer.name}
                  </h3>
                  <p className="text-cavs-cream/50 text-sm mt-1">球队进攻核心</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 md:gap-8 md:flex-1">
                {[
                  { label: '得分', value: topScorer.ppg, unit: 'PPG' },
                  { label: '篮板', value: topScorer.rpg, unit: 'RPG' },
                  { label: '助攻', value: topScorer.apg, unit: 'APG' },
                ].map((s) => (
                  <div key={s.label} className="text-center md:text-left">
                    <p className="font-display text-3xl md:text-4xl font-bold text-cavs-gold">
                      {s.value.toFixed(1)}
                    </p>
                    <p className="text-xs text-cavs-cream/50 mt-0.5">
                      {s.label} · {s.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="glass-card overflow-hidden">
          <div className="hidden md:grid grid-cols-[minmax(0,2fr)_repeat(3,1fr)] gap-4 px-6 py-3 border-b border-white/10 text-xs uppercase tracking-wider text-cavs-cream/40">
            <span>球员</span>
            <span className="text-center">得分</span>
            <span className="text-center">篮板</span>
            <span className="text-center">助攻</span>
          </div>
          <div className="divide-y divide-white/5">
            {sorted.map((player, i) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="px-4 sm:px-6 py-4 hover:bg-white/[0.03] transition-colors"
              >
                <div className="grid md:grid-cols-[minmax(0,2fr)_repeat(3,1fr)] gap-4 items-center">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 text-center font-display text-sm text-cavs-cream/30 shrink-0">
                      {i + 1}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-cavs-wine/40 border border-white/10 overflow-hidden shrink-0">
                      {player.headshot ? (
                        <img
                          src={player.headshot}
                          alt=""
                          className="w-full h-full object-cover object-top scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-cavs-gold">
                          {player.jersey}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-white truncate">{player.name}</p>
                      <p className="text-xs text-cavs-cream/40">
                        #{player.jersey} · {player.position}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <StatBar label="PPG" value={player.ppg} max={maxPpg} highlight={i === 0} />
                  </div>
                  <div className="hidden md:block">
                    <StatBar label="RPG" value={player.rpg} max={maxRpg} />
                  </div>
                  <div className="hidden md:block">
                    <StatBar label="APG" value={player.apg} max={maxApg} />
                  </div>

                  {/* Mobile stats row */}
                  <div className="md:hidden col-span-full grid grid-cols-3 gap-3 pl-9">
                    <div className="text-center bg-white/5 rounded-lg py-2">
                      <p className="font-display text-lg font-bold text-cavs-gold">{player.ppg.toFixed(1)}</p>
                      <p className="text-[10px] text-cavs-cream/40">得分</p>
                    </div>
                    <div className="text-center bg-white/5 rounded-lg py-2">
                      <p className="font-display text-lg font-bold text-white">{player.rpg.toFixed(1)}</p>
                      <p className="text-[10px] text-cavs-cream/40">篮板</p>
                    </div>
                    <div className="text-center bg-white/5 rounded-lg py-2">
                      <p className="font-display text-lg font-bold text-white">{player.apg.toFixed(1)}</p>
                      <p className="text-[10px] text-cavs-cream/40">助攻</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

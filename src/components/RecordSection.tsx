import { motion } from 'framer-motion';
import { Calendar, Home, Plane, TrendingDown, TrendingUp } from 'lucide-react';
import type { Game, TeamRecord } from '../types';

interface RecordSectionProps {
  record: TeamRecord;
  games: Game[];
}

export default function RecordSection({ record, games }: RecordSectionProps) {
  const completed = games.filter((g) => g.result !== 'upcoming');
  const wins = completed.filter((g) => g.result === 'W').length;
  const losses = completed.filter((g) => g.result === 'L').length;
  const lastFive = completed.slice(0, 5);

  return (
    <section id="record" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title gold-gradient-text">赛季战绩</h2>
          <p className="text-cavs-cream/60 mt-2">{record.conference}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 text-center md:col-span-1 bg-gradient-to-br from-cavs-wine/20 to-transparent"
          >
            <p className="text-cavs-cream/50 text-sm uppercase tracking-widest mb-2">
              总战绩
            </p>
            <p className="font-display text-6xl font-bold text-white mb-2">
              {record.wins}
              <span className="text-cavs-cream/30 mx-2">-</span>
              {record.losses}
            </p>
            <p className="text-cavs-gold font-medium">{record.standing}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 md:col-span-2"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: TrendingUp, label: '胜率', value: `${record.winPct}`, color: 'text-green-400' },
                { icon: Calendar, label: '已赛场次', value: completed.length, color: 'text-cavs-gold' },
                { icon: TrendingUp, label: '近5场胜', value: wins, color: 'text-green-400' },
                { icon: TrendingDown, label: '近5场负', value: losses, color: 'text-red-400' },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                  <p className="font-display text-2xl font-bold text-white">{item.value}</p>
                  <p className="text-xs text-cavs-cream/50 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {lastFive.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-cavs-cream/50 mb-3 uppercase tracking-wider">
                  最近 {lastFive.length} 场
                </p>
                <div className="flex gap-2 flex-wrap">
                  {lastFive.map((game) => (
                    <span
                      key={game.id}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                        game.result === 'W'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                      title={`vs ${game.opponent}: ${game.score}`}
                    >
                      {game.result}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function GamesSection({ games }: { games: Game[] }) {
  return (
    <section id="games" className="py-20 bg-cavs-wine-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title gold-gradient-text">赛程 & 赛果</h2>
          <p className="text-cavs-cream/60 mt-2">最近比赛与 upcoming 赛程</p>
        </motion.div>

        <div className="space-y-3">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4 md:p-5 flex items-center gap-4 hover:bg-white/10 transition-colors"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold shrink-0 ${
                  game.result === 'W'
                    ? 'bg-green-500/20 text-green-400'
                    : game.result === 'L'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-cavs-gold/20 text-cavs-gold'
                }`}
              >
                {game.result === 'upcoming' ? (
                  <Calendar size={20} />
                ) : (
                  game.result
                )}
              </div>

              <div className="flex items-center gap-3 flex-1 min-w-0">
                {game.opponentLogo ? (
                  <img
                    src={game.opponentLogo}
                    alt={game.opponent}
                    className="w-10 h-10 object-contain shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                )}
                <div className="min-w-0">
                  <p className="font-medium text-white truncate">
                    {game.homeAway === 'home' ? 'vs' : '@'} {game.opponent}
                  </p>
                  <p className="text-xs text-cavs-cream/50 flex items-center gap-1">
                    {game.homeAway === 'home' ? (
                      <Home size={12} />
                    ) : (
                      <Plane size={12} />
                    )}
                    {new Date(game.date).toLocaleDateString('zh-CN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p
                  className={`font-display text-xl font-bold ${
                    game.result === 'upcoming' ? 'text-cavs-gold' : 'text-white'
                  }`}
                >
                  {game.score}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

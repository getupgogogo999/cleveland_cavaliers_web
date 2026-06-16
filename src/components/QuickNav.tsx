import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Crown,
  Newspaper,
  Play,
  Trophy,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/site';

const cards = [
  {
    to: ROUTES.record,
    icon: Trophy,
    title: '赛季战绩',
    desc: '胜负、胜率、排名一览',
    color: 'from-cavs-wine to-cavs-wine-dark',
  },
  {
    to: ROUTES.games,
    icon: Calendar,
    title: '赛程赛果',
    desc: '最近比赛与 upcoming',
    color: 'from-cavs-navy to-cavs-wine/80',
  },
  {
    to: ROUTES.players,
    icon: Users,
    title: '球员表现',
    desc: '得分篮板助攻数据',
    color: 'from-cavs-wine/80 to-cavs-navy',
  },
  {
    to: ROUTES.videos,
    icon: Play,
    title: '精彩视频',
    desc: 'YouTube 官方集锦',
    color: 'from-cavs-gold/30 to-cavs-wine',
  },
  {
    to: ROUTES.history,
    icon: Crown,
    title: '荣耀历程',
    desc: '2016 总冠军传奇',
    color: 'from-cavs-wine to-cavs-gold/20',
  },
  {
    to: ROUTES.news,
    icon: Newspaper,
    title: '最新资讯',
    desc: 'NBA 新闻动态',
    color: 'from-cavs-navy to-cavs-wine-light/40',
  },
];

export default function QuickNav() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title gold-gradient-text">探索骑士队</h2>
          <p className="text-cavs-cream/60 mt-2">点击进入各专题页面</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={card.to}
                className={`group block glass-card p-6 bg-gradient-to-br ${card.color} hover:border-cavs-gold/40 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-cavs-wine/20`}
              >
                <card.icon className="w-10 h-10 text-cavs-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl font-bold text-white mb-1 flex items-center gap-2">
                  {card.title}
                  <ArrowRight
                    size={18}
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-cavs-gold"
                  />
                </h3>
                <p className="text-sm text-cavs-cream/60">{card.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

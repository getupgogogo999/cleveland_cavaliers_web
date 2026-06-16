import { motion } from 'framer-motion';
import { Award, Crown, Star, Trophy } from 'lucide-react';

const milestones = [
  {
    year: '1970',
    title: '球队成立',
    desc: '克利夫兰骑士队加入 NBA，成为俄亥俄州的篮球象征。',
    icon: Star,
  },
  {
    year: '2007',
    title: '首次总决赛',
    desc: '勒布朗·詹姆斯率领球队首次闯入 NBA 总决赛。',
    icon: Trophy,
  },
  {
    year: '2016',
    title: 'NBA 总冠军',
    desc: '1-3 逆转勇士，队史首冠！「Cleveland, this is for you!」',
    icon: Crown,
    highlight: true,
  },
  {
    year: '2024',
    title: '东部劲旅',
    desc: 'Kenny Atkinson 执教，Donovan Mitchell 领衔，重夺中央分区冠军。',
    icon: Award,
  },
];

export default function HistorySection() {
  return (
    <section id="history" className="py-20 bg-gradient-to-b from-cavs-navy to-cavs-wine-dark/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="section-title gold-gradient-text">荣耀历程</h2>
          <p className="text-cavs-cream/60 mt-2">Wine & Gold 的传奇故事</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cavs-gold/50 via-cavs-wine to-cavs-gold/50 hidden md:block" />

          <div className="space-y-8">
            {milestones.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div
                    className={`glass-card p-6 inline-block text-left ${
                      item.highlight
                        ? 'border-cavs-gold/40 bg-cavs-gold/5 shadow-lg shadow-cavs-gold/10'
                        : ''
                    }`}
                  >
                    <p className="font-display text-3xl font-bold text-cavs-gold mb-1">
                      {item.year}
                    </p>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-cavs-cream/60 leading-relaxed max-w-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div
                  className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center z-10 ${
                    item.highlight
                      ? 'bg-cavs-gold text-cavs-navy'
                      : 'bg-cavs-wine border-2 border-cavs-gold/30 text-cavs-gold'
                  }`}
                >
                  <item.icon size={24} />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

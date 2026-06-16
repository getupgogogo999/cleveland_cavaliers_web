import { Heart, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../config/site';

export default function Footer() {
  return (
    <footer className="border-t border-cavs-wine/30 bg-cavs-wine-dark/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-bold text-cavs-gold mb-3">CAVS NATION</h3>
            <p className="text-sm text-cavs-cream/50 leading-relaxed">
              克利夫兰骑士队球迷资讯站。实时战绩、球员数据、YouTube 官方视频，Wine & Gold 永不停歇。
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-3 uppercase tracking-wider">
              页面导航
            </h4>
            <ul className="space-y-2 text-sm text-cavs-cream/50">
              <li><Link to={ROUTES.record} className="hover:text-cavs-gold transition-colors">赛季战绩</Link></li>
              <li><Link to={ROUTES.games} className="hover:text-cavs-gold transition-colors">赛程赛果</Link></li>
              <li><Link to={ROUTES.players} className="hover:text-cavs-gold transition-colors">球员表现</Link></li>
              <li><Link to={ROUTES.videos} className="hover:text-cavs-gold transition-colors">精彩视频</Link></li>
              <li><Link to={ROUTES.history} className="hover:text-cavs-gold transition-colors">荣耀历程</Link></li>
              <li><Link to={ROUTES.news} className="hover:text-cavs-gold transition-colors">最新资讯</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-3 uppercase tracking-wider">
              官方渠道
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/user/clevelandcavaliers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cavs-cream/50 hover:text-cavs-gold transition-colors"
                >
                  <Youtube size={16} />
                  YouTube 官方频道
                </a>
              </li>
              <li>
                <a
                  href="https://www.nba.com/cavaliers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cavs-cream/50 hover:text-cavs-gold transition-colors"
                >
                  NBA 官网
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cavs-cream/40">
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-cavs-wine fill-cavs-wine" /> for Cavs fans
          </p>
          <p>数据来源: ESPN API · YouTube RSS · 仅供球迷交流</p>
        </div>
      </div>
    </footer>
  );
}

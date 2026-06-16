import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS, ROUTES } from '../config/site';

interface HeaderProps {
  teamName: string;
  teamLogo: string;
}

export default function Header({ teamName, teamLogo }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'text-cavs-gold bg-cavs-gold/10'
        : 'text-cavs-cream/80 hover:text-cavs-gold hover:bg-white/5'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cavs-navy/90 backdrop-blur-lg border-b border-cavs-wine/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <NavLink to={ROUTES.home} className="flex items-center gap-3 group">
            {teamLogo ? (
              <img
                src={teamLogo}
                alt={teamName}
                className="h-10 w-10 md:h-12 md:w-12 object-contain group-hover:scale-110 transition-transform"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-cavs-wine flex items-center justify-center font-display font-bold text-cavs-gold">
                CLE
              </div>
            )}
            <div>
              <p className="font-display text-lg md:text-xl font-bold tracking-wider text-white">
                CAVS NATION
              </p>
              <p className="text-xs text-cavs-gold/80 hidden sm:block">克利夫兰骑士队</p>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === ROUTES.home}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden p-2 text-cavs-cream"
            onClick={() => setOpen(!open)}
            aria-label="菜单"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-cavs-wine-dark border-t border-cavs-wine/50"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === ROUTES.home}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 transition-colors ${
                  isActive ? 'text-cavs-gold bg-white/5' : 'text-cavs-cream hover:bg-white/5 hover:text-cavs-gold'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </motion.nav>
      )}
    </header>
  );
}

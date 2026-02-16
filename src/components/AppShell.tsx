import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Trophy, User, Zap, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { StreakFlame } from './StreakFlame';
import { storage } from '../utils/storage';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const streak = storage.getStreak();
  const profile = storage.getProfile();

  const navItems = [
    { icon: BookOpen, label: 'Subjects', path: '/' },
    { icon: Compass, label: 'Discover', path: '/discover' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen" style={{ background: 'rgb(var(--bg))' }}>
      <header
        className="fixed top-0 left-0 right-0 h-16 z-40 glass border-b"
        style={{ borderColor: 'rgb(var(--border))' }}
      >
        <div className="h-full px-4 lg:pl-64 flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gradient tracking-tight">
              Grade9 Sprint
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Daily Challenge - hidden on mobile */}
            <button
              onClick={() => navigate('/quiz/daily-challenge-1')}
              className="hidden md:flex items-center gap-2 btn-primary text-sm px-4 py-2"
              title="Past-paper-style questions"
            >
              <Zap size={16} />
              <span>Daily Challenge</span>
            </button>

            {/* Streak - always visible but compact */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg min-h-[40px]"
              style={{ background: 'rgb(var(--surface-2))' }}
            >
              <StreakFlame streak={streak.currentStreakDays} size="sm" />
            </div>

            {/* XP Badge - responsive text */}
            <div
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm text-white min-h-[40px]"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <span className="whitespace-nowrap">Lv {profile.level}</span>
              <span className="hidden xs:inline opacity-75">•</span>
              <span className="hidden xs:inline whitespace-nowrap">{profile.xpTotal} XP</span>
            </div>

          </div>
        </div>
      </header>

      <aside
        className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 z-30 border-r"
        style={{
          background: 'rgb(var(--surface))',
          borderColor: 'rgb(var(--border))'
        }}
      >
        <nav className="p-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all relative overflow-hidden"
                style={{
                  color: active ? 'white' : 'rgb(var(--text))',
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'var(--gradient-primary)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: active ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
                <Icon size={20} className="relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </aside>

      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t pb-[env(safe-area-inset-bottom,0)]"
        style={{ borderColor: 'rgb(var(--border))' }}
      >
        <div className="h-16 min-h-[4rem] grid grid-cols-4 gap-1 px-2 sm:px-4 py-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all py-2 min-h-[48px]"
                style={{
                  color: active ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary))',
                  background: active ? 'rgb(var(--accent) / 0.1)' : 'transparent'
                }}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-[10px] sm:text-xs font-medium ${active ? 'font-semibold' : ''}`}>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      <div className="lg:hidden h-16 min-h-[4rem] pb-[env(safe-area-inset-bottom,0)]" />
    </div>
  );
}

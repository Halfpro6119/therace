import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Trophy, User, Sun, Moon, Zap, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { StreakFlame } from './StreakFlame';
import { storage } from '../utils/storage';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>(storage.getTheme());
  const streak = storage.getStreak();
  const profile = storage.getProfile();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    storage.setTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/quiz/daily-challenge-1')}
              className="hidden sm:flex items-center gap-2 btn-primary text-sm px-4 py-2"
            >
              <Zap size={16} />
              <span>Daily Challenge</span>
            </button>

            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: 'rgb(var(--surface-2))' }}
            >
              <StreakFlame streak={streak.currentStreakDays} size="sm" />
            </div>

            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm text-white"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <span>Lv {profile.level}</span>
              <span className="opacity-75">•</span>
              <span>{profile.xpTotal} XP</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all hover:scale-105"
              style={{
                background: 'rgb(var(--surface-2))',
                color: 'rgb(var(--text))'
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
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
        <div className="h-16 min-h-[4rem] grid grid-cols-5 gap-1 px-2 py-2 flex items-center">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center gap-0.5 rounded-lg transition-all py-1"
                style={{
                  color: active ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary))'
                }}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-[11px] sm:text-xs font-semibold ${active ? 'font-bold' : ''}`}>{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      <div className="lg:hidden h-16 min-h-[4rem] pb-[env(safe-area-inset-bottom,0)]" />
    </div>
  );
}

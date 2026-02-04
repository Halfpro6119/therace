import { useState, useEffect, ReactNode, Suspense } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Lock, Home, BookOpen, Layers, Tag, FileText, Database, Upload, Wrench, Shield, LogOut, List, Activity, Image, Layout } from 'lucide-react';

const ADMIN_PASSCODE = 'admin123';
const PASSCODE_KEY = 'grade9_admin_auth';

interface AdminLayoutProps {
  children?: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const stored = sessionStorage.getItem(PASSCODE_KEY);
    if (stored === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem(PASSCODE_KEY, passcode);
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid passcode');
      setPasscode('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(PASSCODE_KEY);
    setIsAuthenticated(false);
    setPasscode('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-red-500/10 rounded-xl">
              <Lock size={48} className="text-red-600 dark:text-red-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Admin Access
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Enter passcode to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
            >
              Unlock Admin Panel
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { path: '/admin', icon: Home, label: 'Dashboard' },
    { path: '/admin/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/admin/units', icon: Layers, label: 'Units' },
    { path: '/admin/topics', icon: Tag, label: 'Topics' },
    { path: '/admin/papers', icon: FileText, label: 'Papers' },
    { path: '/admin/prompts', icon: FileText, label: 'Prompts' },
    { path: '/admin/diagrams', icon: Image, label: 'Diagrams' },
    { path: '/admin/diagram-templates', icon: Layout, label: 'Diagram Templates' },
    { path: '/admin/ops', icon: Activity, label: 'Content Ops' },
    { path: '/admin/import', icon: Upload, label: 'Import' },
    { path: '/admin/quizzes', icon: Database, label: 'Quizzes' },
    { path: '/admin/playlists', icon: List, label: 'Playlists' },
    { path: '/admin/tools', icon: Wrench, label: 'Tools' },
    { path: '/admin/audit', icon: Shield, label: 'Coverage Audit' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Grade9 Sprint
            </p>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-red-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>

            <Link
              to="/"
              className="flex items-center justify-center gap-2 mt-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ← Back to App
            </Link>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-8">
          {children || (
            <Suspense fallback={<div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" /></div>}>
              <Outlet />
            </Suspense>
          )}
        </main>
      </div>
    </div>
  );
}

/**
 * Layout for /admin-view: passcode gate. On success, sets admin view mode and
 * redirects to / so the user browses the site with persistent admin view.
 */

import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAdminViewMode } from '../contexts/AdminViewModeContext';

const ADMIN_PASSCODE = 'admin123';
const PASSCODE_KEY = 'grade9_admin_auth';

export function AdminViewLayout() {
  const mode = useAdminViewMode();
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSCODE) {
      sessionStorage.setItem(PASSCODE_KEY, passcode);
      mode?.setAdminViewMode(true);
      setError('');
      navigate('/', { replace: true });
      return;
    }
    setError('Invalid passcode');
    setPasscode('');
  };

  if (mode?.isAdminViewMode) {
    return <Navigate to="/" replace />;
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-amber-500/10 rounded-xl">
              <Lock size={48} className="text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Admin View
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            Enter passcode to view and edit the site as a user
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors"
            >
              Enter admin view
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

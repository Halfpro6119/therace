/**
 * Small toolbar shown when viewing the site as admin (admin-view).
 * Shows "Viewing as admin", link to drafts, and logout.
 */

import { Link } from 'react-router-dom';
import { Shield, FileEdit, LogOut } from 'lucide-react';
import { useAdminView } from '../contexts/AdminViewContext';
import { useAdminViewMode } from '../contexts/AdminViewModeContext';

export function AdminViewToolbar() {
  const ctx = useAdminView();
  const mode = useAdminViewMode();
  if (!ctx?.isAdminView) return null;

  const handleExit = () => {
    mode?.setAdminViewMode(false);
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg border bg-white dark:bg-gray-800 border-amber-500/50"
      title="Admin view – edit content and push live"
    >
      <Shield size={18} className="text-amber-600 dark:text-amber-400" />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Viewing as admin</span>
      {ctx.draftEntries.length > 0 && (
        <Link
          to="/drafts"
          className="flex items-center gap-1.5 text-sm text-amber-700 dark:text-amber-300 hover:underline"
        >
          <FileEdit size={16} />
          <span>{ctx.draftEntries.length} draft{ctx.draftEntries.length !== 1 ? 's' : ''}</span>
        </Link>
      )}
      <button
        type="button"
        onClick={handleExit}
        className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
        title="Exit admin view"
      >
        <LogOut size={16} />
        <span>Exit</span>
      </button>
    </div>
  );
}

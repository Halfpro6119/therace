/**
 * Admin view mode: persistent flag so admin view survives navigation.
 * When true, the app wraps content in AdminViewProvider and shows the toolbar.
 * Only "Exit admin view" clears the mode; normal links do not.
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'grade9_admin_view_mode';

function getStored(): boolean {
  if (typeof sessionStorage === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEY) === '1';
}

interface AdminViewModeContextValue {
  isAdminViewMode: boolean;
  setAdminViewMode: (value: boolean) => void;
}

const AdminViewModeContext = createContext<AdminViewModeContextValue | null>(null);

export function AdminViewModeProvider({ children }: { children: ReactNode }) {
  const [isAdminViewMode, setState] = useState(getStored);

  const setAdminViewMode = useCallback((value: boolean) => {
    if (value) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setState(true);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem('grade9_admin_auth');
      setState(false);
    }
  }, []);

  const value = useMemo<AdminViewModeContextValue>(
    () => ({ isAdminViewMode, setAdminViewMode }),
    [isAdminViewMode, setAdminViewMode]
  );

  return (
    <AdminViewModeContext.Provider value={value}>
      {children}
    </AdminViewModeContext.Provider>
  );
}

export function useAdminViewMode(): AdminViewModeContextValue | null {
  return useContext(AdminViewModeContext);
}

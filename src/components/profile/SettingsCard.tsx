import { useState } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import { storage } from '../../utils/storage';

export function SettingsCard() {
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    storage.resetAll();
    setShowResetModal(false);
    window.location.reload();
  };

  return (
    <>
      <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
        <div className="mb-8">
          <h2 className="text-2xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
            Settings
          </h2>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            Customize your experience
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl border-2" style={{
            background: 'rgba(239, 68, 68, 0.05)',
            borderColor: 'rgb(239, 68, 68)',
          }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <AlertTriangle size={24} style={{ color: 'rgb(239, 68, 68)' }} />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-1" style={{ color: 'rgb(239, 68, 68)' }}>
                  Danger Zone
                </p>
                <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Reset all progress and start fresh. This action cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowResetModal(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{
                background: 'rgb(239, 68, 68)',
                color: 'white',
              }}
            >
              <RotateCcw size={18} />
              <span>Reset All Data</span>
            </button>
          </div>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="rounded-3xl p-8 max-w-md w-full shadow-2xl"
            style={{ background: 'rgb(var(--surface))' }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <AlertTriangle size={48} style={{ color: 'rgb(239, 68, 68)' }} />
              </div>
            </div>

            <h3 className="text-2xl font-black text-center mb-3" style={{ color: 'rgb(var(--text))' }}>
              Reset All Data?
            </h3>

            <p className="text-center mb-8 font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              This will permanently delete all your progress, attempts, streaks, and achievements. This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-6 py-4 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'rgb(239, 68, 68)',
                  color: 'white',
                }}
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-6 py-4 rounded-xl font-bold transition-all hover:scale-105"
                style={{
                  background: 'rgb(var(--surface-2))',
                  color: 'rgb(var(--text))',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

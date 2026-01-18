import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

interface ComboTrackerProps {
  combo: number;
  show: boolean;
}

export function ComboTracker({ combo, show }: ComboTrackerProps) {
  if (!show || combo < 2) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        key={combo}
        transition={{ type: 'spring', bounce: 0.6 }}
        className="fixed top-1/4 right-8 z-50 pointer-events-none"
      >
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl"
          style={{
            background: combo >= 5 ? 'var(--gradient-elite)' : 'var(--gradient-primary)',
          }}
        >
          <Zap size={24} className="text-white" fill="white" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white stat-number">
              {combo}x
            </div>
            <div className="text-xs text-white/80 font-semibold">COMBO</div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

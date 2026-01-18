import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LevelUpModalProps {
  level: number;
  onClose: () => void;
  unlocks?: string[];
}

export function LevelUpModal({ level, onClose, unlocks = [] }: LevelUpModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (level % 10 === 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [level]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="card-elevated max-w-md w-full p-8 relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${50 + (Math.random() - 0.5) * 100}%`,
                    scale: 1,
                    rotate: Math.random() * 360
                  }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: ['rgb(var(--accent))', 'rgb(var(--success))', 'rgb(var(--warning))'][i % 3]
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-opacity-10 transition-colors"
            style={{ color: 'rgb(var(--text))' }}
          >
            <X size={20} />
          </button>

          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
              style={{ background: 'var(--gradient-elite)' }}
            >
              <Trophy size={48} className="text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mb-2 text-gradient-elite"
            >
              LEVEL UP!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
              style={{
                background: 'var(--gradient-primary)',
                color: 'white'
              }}
            >
              <Sparkles size={24} />
              <span className="text-3xl font-bold stat-number">Level {level}</span>
            </motion.div>

            {unlocks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card p-4 mb-6"
              >
                <p className="text-sm font-semibold mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
                  New Unlocks
                </p>
                <div className="space-y-2">
                  {unlocks.map((unlock, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'rgb(var(--text))' }}
                    >
                      <Sparkles size={16} style={{ color: 'rgb(var(--accent))' }} />
                      <span>{unlock}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={onClose}
              className="btn-primary w-full py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Award, Share2 } from 'lucide-react';

interface Grade9AchievementProps {
  quizTitle: string;
  time: number;
  isNewPB: boolean;
  onClose: () => void;
  onShare: () => void;
}

export function Grade9Achievement({ quizTitle, time, isNewPB, onClose, onShare }: Grade9AchievementProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.9)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: 'spring', bounce: 0.3 }}
          className="max-w-lg w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: '100%',
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * -50}%`,
                  scale: [0, 1, 0.8],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.03,
                  ease: 'easeOut'
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: 'var(--gradient-elite)',
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)'
                }}
              />
            ))}
          </div>

          <div
            className="card-elevated p-12 text-center relative overflow-hidden"
            style={{ background: 'var(--gradient-elite)' }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/20 mb-6 backdrop-blur-sm"
            >
              <Zap size={64} className="text-white" fill="white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold text-white mb-3"
            >
              GRADE 9 SPEED
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 mb-6"
            >
              {quizTitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
            >
              <Award size={32} className="text-white" />
              <span className="text-4xl font-bold text-white stat-number">
                {formatTime(time)}
              </span>
            </motion.div>

            {isNewPB && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8"
              >
                <span className="text-white font-semibold">New Personal Best!</span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3"
            >
              <button
                onClick={onShare}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all"
                style={{ color: 'rgb(var(--accent))' }}
              >
                <Share2 size={20} />
                <span>Share</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-all"
              >
                Continue
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

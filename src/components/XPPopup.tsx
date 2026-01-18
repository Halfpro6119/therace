import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Plus, TrendingUp, Zap } from 'lucide-react';

interface XPPopupProps {
  xp: number;
  type?: 'answer' | 'quiz' | 'mastery';
  position?: 'center' | 'input';
}

export function XPPopup({ xp, type = 'answer', position = 'input' }: XPPopupProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const variants = {
    answer: {
      initial: { opacity: 0, y: 0, scale: 0.8 },
      animate: { opacity: 1, y: -40, scale: 1 },
      exit: { opacity: 0, y: -60, scale: 0.8 }
    },
    quiz: {
      initial: { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.5 }
    },
    mastery: {
      initial: { opacity: 0, scale: 0.5, rotate: -10 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      exit: { opacity: 0, scale: 1.2 }
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'mastery': return <Zap size={20} fill="white" />;
      case 'quiz': return <TrendingUp size={20} />;
      default: return <Plus size={16} />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'mastery':
        return {
          background: 'var(--gradient-elite)',
          padding: '12px 24px',
          fontSize: '18px'
        };
      case 'quiz':
        return {
          background: 'var(--gradient-success)',
          padding: '10px 20px',
          fontSize: '16px'
        };
      default:
        return {
          background: 'var(--gradient-primary)',
          padding: '6px 12px',
          fontSize: '14px'
        };
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          variants={variants[type]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`fixed ${position === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : 'top-1/4 left-1/2 -translate-x-1/2'} z-[100] pointer-events-none`}
        >
          <div
            className="flex items-center gap-2 rounded-full text-white font-bold shadow-xl"
            style={getStyles()}
          >
            {getIcon()}
            <span>{type === 'mastery' ? 'MASTERY UP!' : `+${xp} XP`}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

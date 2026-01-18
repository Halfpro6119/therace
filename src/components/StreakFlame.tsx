import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakFlameProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
  showIntensity?: boolean;
}

export function StreakFlame({ streak, size = 'md', showIntensity = true }: StreakFlameProps) {
  const sizeMap = {
    sm: { icon: 16, text: 'text-sm' },
    md: { icon: 20, text: 'text-base' },
    lg: { icon: 24, text: 'text-lg' },
  };

  const config = sizeMap[size];

  const getIntensityLevel = () => {
    if (streak === 0) return 0;
    if (streak <= 3) return 1;
    if (streak <= 7) return 2;
    if (streak <= 20) return 3;
    return 4;
  };

  const intensity = getIntensityLevel();

  const flameStyles = {
    0: {
      fill: 'rgb(var(--muted))',
      color: 'rgb(var(--muted))',
      glow: false,
      animation: false
    },
    1: {
      fill: 'rgb(var(--warning))',
      color: 'rgb(var(--warning))',
      glow: false,
      animation: false
    },
    2: {
      fill: 'rgb(var(--warning))',
      color: 'rgb(var(--warning))',
      glow: true,
      animation: false
    },
    3: {
      fill: 'rgb(var(--warning))',
      color: 'rgb(var(--warning))',
      glow: true,
      animation: true
    },
    4: {
      fill: 'url(#flame-gradient)',
      color: 'rgb(var(--warning))',
      glow: true,
      animation: true
    }
  };

  const style = flameStyles[intensity];

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative">
        {intensity === 4 && (
          <svg width="0" height="0">
            <defs>
              <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(251, 146, 60)" />
                <stop offset="50%" stopColor="rgb(249, 115, 22)" />
                <stop offset="100%" stopColor="rgb(234, 88, 12)" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {showIntensity && style.glow && (
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 -m-2 rounded-full blur-md"
            style={{
              background: 'rgb(var(--warning) / 0.4)'
            }}
          />
        )}

        {intensity === 4 && showIntensity && (
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 -m-4 rounded-full blur-lg"
            style={{
              background: 'var(--gradient-elite)',
              opacity: 0.3
            }}
          />
        )}

        <motion.div
          animate={style.animation && showIntensity ? {
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Flame
            size={config.icon}
            className="relative z-10 transition-all"
            style={{
              fill: style.fill,
              color: style.color
            }}
          />
        </motion.div>
      </div>
      <span
        className={`font-bold stat-number ${config.text}`}
        style={{ color: style.color }}
      >
        {streak}
      </span>
    </div>
  );
}

import { MasteryLevel } from '../types';
import { Zap, TrendingUp, CheckCircle2, Target, Circle } from 'lucide-react';

interface MasteryChipProps {
  level: MasteryLevel;
  size?: 'sm' | 'md' | 'lg';
}

const masteryConfig = {
  0: {
    label: 'Unseen',
    icon: Circle,
    style: {
      background: 'rgb(var(--muted) / 0.1)',
      color: 'rgb(var(--muted))',
      border: '1px solid rgb(var(--muted) / 0.2)'
    }
  },
  1: {
    label: 'Learning',
    icon: TrendingUp,
    style: {
      background: 'rgb(var(--warning) / 0.1)',
      color: 'rgb(var(--warning))',
      border: '1px solid rgb(var(--warning) / 0.2)'
    }
  },
  2: {
    label: 'Secure',
    icon: Target,
    style: {
      background: 'rgb(59 130 246 / 0.1)',
      color: 'rgb(59 130 246)',
      border: '1px solid rgb(59 130 246 / 0.2)'
    }
  },
  3: {
    label: 'Mastered',
    icon: CheckCircle2,
    style: {
      background: 'rgb(var(--success) / 0.1)',
      color: 'rgb(var(--success))',
      border: '1px solid rgb(var(--success) / 0.2)'
    }
  },
  4: {
    label: 'Grade 9',
    icon: Zap,
    style: {
      background: 'var(--gradient-elite)',
      color: 'white',
      border: 'none'
    }
  },
};

export function MasteryChip({ level, size = 'md' }: MasteryChipProps) {
  const config = masteryConfig[level];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold transition-all ${sizeClasses[size]}`}
      style={config.style}
    >
      <Icon size={iconSizes[size]} />
      {config.label}
    </span>
  );
}

import { motion } from 'framer-motion';
import { Trophy, Lock, Star, Award, Zap, Target, Flame } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress?: number;
  progressMax?: number;
}

interface BadgeCardProps {
  badge: Badge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const rarityColors = {
    common: 'rgb(156, 163, 175)',
    rare: 'rgb(59, 130, 246)',
    epic: 'rgb(168, 85, 247)',
    legendary: 'rgb(251, 146, 60)',
  };

  const rarityGradients = {
    common: 'linear-gradient(135deg, rgb(156, 163, 175) 0%, rgb(107, 114, 128) 100%)',
    rare: 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(37, 99, 235) 100%)',
    epic: 'linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(126, 34, 206) 100%)',
    legendary: 'linear-gradient(135deg, rgb(251, 146, 60) 0%, rgb(249, 115, 22) 100%)',
  };

  const icons: Record<string, any> = {
    'first-quiz': Star,
    'first-mastered': Award,
    'grade9-speed': Zap,
    '7-day-streak': Flame,
    '10-quizzes': Trophy,
    '100-percent': Target,
  };

  const Icon = icons[badge.id] || Trophy;

  return (
    <motion.div
      whileHover={badge.earned ? { scale: 1.05, y: -4 } : {}}
      className={`relative rounded-2xl p-6 transition-all ${
        badge.earned ? 'cursor-pointer' : 'opacity-60'
      }`}
      style={{
        background: badge.earned
          ? 'rgb(var(--surface-2))'
          : 'rgb(var(--surface))',
        border: `2px solid ${badge.earned ? rarityColors[badge.rarity] : 'rgb(var(--border))'}`,
      }}
    >
      {badge.earned && (
        <div
          className="absolute inset-0 rounded-2xl opacity-10"
          style={{ background: rarityGradients[badge.rarity] }}
        />
      )}

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            animate={
              badge.earned
                ? {
                    rotate: [0, -10, 10, -10, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              repeat: badge.earned ? Infinity : 0,
              repeatDelay: 3,
            }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
            style={{
              background: badge.earned ? rarityGradients[badge.rarity] : 'rgb(var(--surface-2))',
            }}
          >
            {badge.earned ? (
              <Icon size={32} />
            ) : (
              <Lock size={32} style={{ color: 'rgb(var(--text-secondary))' }} />
            )}
          </motion.div>

          <div
            className="px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider"
            style={{
              background: badge.earned
                ? `${rarityColors[badge.rarity]}20`
                : 'rgb(var(--surface-2))',
              color: badge.earned ? rarityColors[badge.rarity] : 'rgb(var(--text-secondary))',
            }}
          >
            {badge.rarity}
          </div>
        </div>

        <h3 className="text-lg font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
          {badge.name}
        </h3>

        <p className="text-sm font-semibold mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          {badge.description}
        </p>

        {!badge.earned && badge.progress !== undefined && badge.progressMax !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span style={{ color: 'rgb(var(--text-secondary))' }}>Progress</span>
              <span style={{ color: 'rgb(var(--text))' }}>
                {badge.progress} / {badge.progressMax}
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgb(var(--surface-2))' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(badge.progress / badge.progressMax) * 100}%`,
                  background: rarityColors[badge.rarity],
                }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

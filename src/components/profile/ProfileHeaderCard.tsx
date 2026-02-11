import { motion } from 'framer-motion';
import { User, Trophy, Flame, Zap } from 'lucide-react';
import { UserProfile, StreakState } from '../../types';

interface ProfileHeaderCardProps {
  profile: UserProfile;
  streak: StreakState;
  grade9ReadinessPct: number;
}

export function ProfileHeaderCard({ profile, streak, grade9ReadinessPct }: ProfileHeaderCardProps) {
  const xpInLevel = profile.xpTotal % 1000;
  const xpForNextLevel = 1000;
  const progressPct = (xpInLevel / xpForNextLevel) * 100;

  const getInitials = () => {
    return 'U';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl" style={{ background: 'rgb(var(--surface))' }}>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at top right, rgb(var(--accent)) 0%, transparent 70%)'
        }}
      />

      <div className="relative p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start sm:items-center">
          <div className="relative flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl flex items-center justify-center text-4xl font-black text-white relative overflow-hidden"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <div className="absolute inset-0 opacity-20" style={{
                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
              }} />
              <User size={36} className="relative z-10 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-sm sm:text-base md:text-lg shadow-lg"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {profile.level}
            </motion.div>
          </div>

          <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black" style={{ color: 'rgb(var(--text))' }}>
                Training Dashboard
              </h1>
              <p className="text-sm sm:text-base md:text-lg mt-0.5 sm:mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                Level {profile.level} Sprinter
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span style={{ color: 'rgb(var(--text-secondary))' }}>
                  {xpInLevel.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
                </span>
                <span className="text-gradient">
                  Level {profile.level + 1}
                </span>
              </div>
              <div className="h-2 sm:h-3 rounded-full overflow-hidden" style={{ background: 'rgb(var(--surface-2))' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-primary)' }}
                />
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
                <Trophy size={20} className="text-gradient sm:w-6 sm:h-6" />
                <div>
                  <p className="text-[10px] sm:text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Grade 9 Readiness
                  </p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-black text-gradient">
                    {grade9ReadinessPct}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <Flame size={18} className="sm:w-5 sm:h-5" style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
              {streak.currentStreakDays}
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              Day Streak
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <Trophy size={18} className="sm:w-5 sm:h-5" style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
              {profile.totalQuizzes}
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              Quizzes
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <Zap size={18} className="sm:w-5 sm:h-5" style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
              {profile.grade9SpeedCount}
            </p>
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              Grade 9 Speed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

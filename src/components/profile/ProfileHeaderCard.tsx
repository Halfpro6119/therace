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
    <div className="relative overflow-hidden rounded-3xl" style={{ background: 'rgb(var(--surface))' }}>
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle at top right, rgb(var(--accent)) 0%, transparent 70%)'
        }}
      />

      <div className="relative p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-28 h-28 rounded-3xl flex items-center justify-center text-4xl font-black text-white relative overflow-hidden"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <div className="absolute inset-0 opacity-20" style={{
                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
              }} />
              <User size={48} className="relative z-10" />
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="absolute -bottom-2 -right-2 w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {profile.level}
            </motion.div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black" style={{ color: 'rgb(var(--text))' }}>
                Training Dashboard
              </h1>
              <p className="text-lg mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                Level {profile.level} Sprinter
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span style={{ color: 'rgb(var(--text-secondary))' }}>
                  {xpInLevel.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
                </span>
                <span className="text-gradient">
                  Level {profile.level + 1}
                </span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgb(var(--surface-2))' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'var(--gradient-primary)' }}
                />
              </div>
            </div>

            <div className="pt-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
                <Trophy size={24} className="text-gradient" />
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Grade 9 Readiness
                  </p>
                  <p className="text-3xl font-black text-gradient">
                    {grade9ReadinessPct}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame size={20} style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <p className="text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
              {streak.currentStreakDays}
            </p>
            <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              Day Streak
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy size={20} style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <p className="text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
              {profile.totalQuizzes}
            </p>
            <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              Total Quizzes
            </p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap size={20} style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <p className="text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
              {profile.grade9SpeedCount}
            </p>
            <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              Grade 9 Speed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

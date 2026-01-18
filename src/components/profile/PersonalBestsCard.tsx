import { motion } from 'framer-motion';
import { Clock, Target, Zap, Trophy } from 'lucide-react';
import { Attempt } from '../../types';

interface PersonalBestsCardProps {
  attempts: Attempt[];
}

export function PersonalBestsCard({ attempts }: PersonalBestsCardProps) {
  const fastestTime = attempts.length > 0
    ? Math.min(...attempts.map(a => a.timeTakenSec))
    : null;

  const highestAccuracy = attempts.length > 0
    ? Math.max(...attempts.map(a => a.accuracyPct))
    : null;

  const perfectRuns = attempts.filter(a => a.accuracyPct === 100).length;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stats = [
    {
      icon: Clock,
      label: 'Fastest Quiz',
      value: fastestTime ? formatTime(fastestTime) : '--',
      color: 'rgb(59, 130, 246)',
      bgColor: 'rgba(59, 130, 246, 0.1)',
    },
    {
      icon: Target,
      label: 'Highest Accuracy',
      value: highestAccuracy ? `${highestAccuracy}%` : '--',
      color: 'rgb(34, 197, 94)',
      bgColor: 'rgba(34, 197, 94, 0.1)',
    },
    {
      icon: Trophy,
      label: 'Perfect Runs',
      value: perfectRuns > 0 ? perfectRuns : '--',
      color: 'rgb(251, 146, 60)',
      bgColor: 'rgba(251, 146, 60, 0.1)',
    },
  ];

  return (
    <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
      <div className="mb-8">
        <h2 className="text-2xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
          Personal Bests
        </h2>
        <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
          Your top achievements
        </p>
      </div>

      {attempts.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgb(var(--surface-2))' }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-xl" style={{ background: stat.bgColor }}>
                    <Icon size={24} style={{ color: stat.color }} />
                  </div>
                </div>

                <p className="text-3xl font-black text-center mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {stat.value}
                </p>

                <p className="text-sm font-semibold text-center" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 px-6 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(var(--accent), 0.1)' }}>
              <Zap size={32} style={{ color: 'rgb(var(--accent))' }} />
            </div>
          </div>
          <p className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
            No records yet
          </p>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            Complete a quiz to set your first personal best
          </p>
        </div>
      )}
    </div>
  );
}

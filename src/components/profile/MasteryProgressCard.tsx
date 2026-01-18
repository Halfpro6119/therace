import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';
import { MasteryState, UserProfile } from '../../types';

interface MasteryProgressCardProps {
  masteryStates: Record<string, MasteryState>;
  profile: UserProfile;
  onViewHeatmap: () => void;
}

export function MasteryProgressCard({ masteryStates, profile, onViewHeatmap }: MasteryProgressCardProps) {
  const states = Object.values(masteryStates);

  const distribution = {
    0: states.filter(s => s.masteryLevel === 0).length,
    1: states.filter(s => s.masteryLevel === 1).length,
    2: states.filter(s => s.masteryLevel === 2).length,
    3: states.filter(s => s.masteryLevel === 3).length,
    4: states.filter(s => s.masteryLevel === 4).length,
  };

  const total = states.length || 1;
  const masteredCount = distribution[3] + distribution[4];
  const grade9Count = distribution[4];

  const levelColors = [
    'rgb(150, 150, 150)',
    'rgb(251, 146, 60)',
    'rgb(250, 204, 21)',
    'rgb(34, 197, 94)',
    'rgb(var(--accent))',
  ];

  const levelLabels = ['Not Started', 'Learning', 'Secure', 'Mastered', 'Grade 9 Speed'];

  return (
    <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
            Mastery Progress
          </h2>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            Your training progression
          </p>
        </div>

        <button
          onClick={onViewHeatmap}
          className="px-4 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-105"
          style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
        >
          View Heatmap
        </button>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between text-sm font-semibold mb-2">
          <span style={{ color: 'rgb(var(--text-secondary))' }}>
            Mastery Distribution
          </span>
          <span style={{ color: 'rgb(var(--text))' }}>
            {states.length} quizzes
          </span>
        </div>

        <div className="h-8 rounded-full overflow-hidden flex" style={{ background: 'rgb(var(--surface-2))' }}>
          {Object.entries(distribution).map(([level, count], idx) => {
            const width = (count / total) * 100;
            if (width === 0) return null;

            return (
              <motion.div
                key={level}
                initial={{ width: 0 }}
                animate={{ width: `${width}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="h-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: levelColors[parseInt(level)] }}
                title={`${levelLabels[parseInt(level)]}: ${count}`}
              >
                {count > 0 && count}
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-5 gap-2 text-xs">
          {levelLabels.map((label, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded"
                style={{ background: levelColors[idx] }}
              />
              <span className="font-semibold truncate" style={{ color: 'rgb(var(--text-secondary))' }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl text-center" style={{ background: 'rgb(var(--surface-2))' }}>
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 rounded-xl" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
              <Award size={24} style={{ color: 'rgb(34, 197, 94)' }} />
            </div>
          </div>
          <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
            {masteredCount}
          </p>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            Mastered
          </p>
        </div>

        <div className="p-6 rounded-2xl text-center" style={{ background: 'rgb(var(--surface-2))' }}>
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 rounded-xl" style={{ background: 'rgba(var(--accent), 0.1)' }}>
              <Zap size={24} style={{ color: 'rgb(var(--accent))' }} />
            </div>
          </div>
          <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
            {grade9Count}
          </p>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            Grade 9 Speed
          </p>
        </div>

        <div className="p-6 rounded-2xl text-center" style={{ background: 'rgb(var(--surface-2))' }}>
          <div className="flex items-center justify-center mb-3">
            <div className="p-3 rounded-xl" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
              <Target size={24} style={{ color: 'rgb(59, 130, 246)' }} />
            </div>
          </div>
          <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
            {Math.round((masteredCount / total) * 100)}%
          </p>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            Completion
          </p>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Subject } from '../types';
import { ProgressBar } from './ProgressBar';

interface SubjectCardProps {
  subject: Subject;
  readinessPercent: number;
  masteredCount: number;
  totalQuizzes: number;
  /** Use compact layout inside hub columns */
  compact?: boolean;
}

export function SubjectCard({ subject, readinessPercent, masteredCount, totalQuizzes, compact = false }: SubjectCardProps) {
  const navigate = useNavigate();
  const themeColor = subject.themeColor || '#6366F1';

  return (
    <motion.div
      onClick={() => navigate(`/subjects/${subject.id}`)}
      whileHover={{ y: compact ? -2 : -4 }}
      whileTap={{ scale: 0.98 }}
      className="card-hover group relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
        style={{
          background: `linear-gradient(135deg, ${themeColor}20 0%, ${themeColor}05 100%)`,
        }}
      />
      {compact && (
        <div
          className="absolute left-0 top-0 bottom-0 w-1 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: themeColor }}
        />
      )}

      <div className={`relative ${compact ? 'p-4' : 'p-6'}`}>
        <div className={`flex items-start justify-between ${compact ? 'mb-2' : 'mb-4'}`}>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-bold mb-0.5 group-hover:text-gradient transition-all truncate ${compact ? 'text-base' : 'text-xl'}`}
              style={{ color: 'rgb(var(--text))' }}
            >
              {subject.name}
            </h3>
            <p className={`${compact ? 'text-xs' : 'text-sm'}`} style={{ color: 'rgb(var(--text-secondary))' }}>
              {subject.examBoard}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className={`rounded-lg transition-all shrink-0 ${compact ? 'p-1.5' : 'p-2'}`}
            style={{ background: 'rgb(var(--surface-2))' }}
          >
            <ChevronRight size={compact ? 16 : 20} style={{ color: 'rgb(var(--text))' }} />
          </motion.div>
        </div>

        <div className={compact ? 'space-y-2' : 'space-y-4'}>
          <ProgressBar
            value={readinessPercent}
            max={100}
            label="Grade 9 Readiness"
            size={compact ? 'sm' : 'md'}
            variant="success"
          />

          <div className={`flex items-center justify-between ${compact ? 'text-xs' : 'text-sm'}`}>
            <span style={{ color: 'rgb(var(--text-secondary))' }} className="font-medium">
              Mastered
            </span>
            <span className="font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
              {masteredCount} / {totalQuizzes}
            </span>
          </div>

          {!compact && (
            <div className="pt-4 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
              {totalQuizzes > 12 && (
                <p className="text-xs mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Showing 12 of {totalQuizzes} quizzes
                </p>
              )}
              <div className="flex gap-1.5">
                {[...Array(Math.min(totalQuizzes, 12))].map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 flex-1 rounded-full transition-all"
                    style={{
                      background: i < masteredCount
                        ? 'var(--gradient-success)'
                        : 'rgb(var(--surface-2))'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

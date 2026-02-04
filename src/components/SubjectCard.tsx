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
}

export function SubjectCard({ subject, readinessPercent, masteredCount, totalQuizzes }: SubjectCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/subjects/${subject.id}`)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="card-hover group relative overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${subject.themeColor} opacity-5 group-hover:opacity-10 transition-opacity`}
      />

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3
              className="text-xl font-bold mb-1 group-hover:text-gradient transition-all"
              style={{ color: 'rgb(var(--text))' }}
            >
              {subject.name}
            </h3>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {subject.examBoard}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-lg transition-all"
            style={{ background: 'rgb(var(--surface-2))' }}
          >
            <ChevronRight size={20} style={{ color: 'rgb(var(--text))' }} />
          </motion.div>
        </div>

        <div className="space-y-4">
          <ProgressBar
            value={readinessPercent}
            max={100}
            label="Grade 9 Readiness"
            size="md"
            variant="success"
          />

          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'rgb(var(--text-secondary))' }} className="font-medium">
              Mastered Topics
            </span>
            <span className="font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
              {masteredCount} / {totalQuizzes}
            </span>
          </div>

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
        </div>
      </div>
    </motion.div>
  );
}

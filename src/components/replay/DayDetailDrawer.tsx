import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, Clock, TrendingUp, Play, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DailyAggregate } from '../../utils/progressReplay';
import { getQuizRuns, findBiggestImprovements } from '../../utils/progressReplay';
import { Quiz, Attempt } from '../../types';

interface DayDetailDrawerProps {
  day: DailyAggregate | null;
  quizzes: Quiz[];
  allAttempts: Attempt[];
  onClose: () => void;
}

export function DayDetailDrawer({ day, quizzes, allAttempts, onClose }: DayDetailDrawerProps) {
  const navigate = useNavigate();

  if (!day) return null;

  const runs = getQuizRuns(day.attempts, quizzes, allAttempts);
  const { timeImprovement, accuracyImprovement } = findBiggestImprovements(day.attempts, allAttempts, quizzes);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMasteryLabel = (level: number): string => {
    if (level === 4) return 'Grade 9 Speed';
    if (level === 3) return 'Mastered';
    if (level === 2) return 'Secure';
    if (level === 1) return 'Learning';
    return 'Unseen';
  };

  const getMasteryColor = (level: number): string => {
    if (level === 4) return 'rgb(var(--accent))';
    if (level === 3) return 'rgb(34, 197, 94)';
    if (level === 2) return 'rgb(250, 204, 21)';
    if (level === 1) return 'rgb(251, 146, 60)';
    return 'rgb(150, 150, 150)';
  };

  const getScopeChip = (scopeType: string) => {
    const colors = {
      topic: { bg: 'rgba(59, 130, 246, 0.1)', text: 'rgb(59, 130, 246)' },
      unit: { bg: 'rgba(34, 197, 94, 0.1)', text: 'rgb(34, 197, 94)' },
      full: { bg: 'rgba(var(--accent), 0.1)', text: 'rgb(var(--accent))' },
    };
    const color = colors[scopeType as keyof typeof colors] || colors.topic;

    return (
      <span
        className="px-2 py-1 rounded-lg text-xs font-bold uppercase"
        style={{ background: color.bg, color: color.text }}
      >
        {scopeType}
      </span>
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-end"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', x: 0 }}
          animate={{ y: 0, x: 0 }}
          exit={{ y: '100%', x: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-full md:w-[600px] md:h-full md:max-h-screen rounded-t-3xl md:rounded-none overflow-hidden"
          style={{ background: 'rgb(var(--surface))' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto">
            <div className="sticky top-0 z-10 p-6 flex items-center justify-between"
              style={{ background: 'rgb(var(--surface))', borderBottom: '1px solid rgb(var(--surface-2))' }}>
              <div>
                <h2 className="text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
                  {formatDate(day.date)}
                </h2>
                <p className="text-sm font-semibold mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Training Log
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                style={{ background: 'rgb(var(--surface-2))' }}
              >
                <X size={20} style={{ color: 'rgb(var(--text))' }} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl text-center" style={{ background: 'rgb(var(--surface-2))' }}>
                  <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                    {day.attemptsCount}
                  </p>
                  <p className="text-xs font-bold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Attempts
                  </p>
                </div>

                <div className="p-4 rounded-2xl text-center" style={{ background: 'rgb(var(--surface-2))' }}>
                  <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                    {Math.round(day.bestAccuracy)}%
                  </p>
                  <p className="text-xs font-bold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Best Accuracy
                  </p>
                </div>

                {day.bestTime && (
                  <div className="p-4 rounded-2xl text-center" style={{ background: 'rgb(var(--surface-2))' }}>
                    <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                      {formatTime(day.bestTime)}
                    </p>
                    <p className="text-xs font-bold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Best Time
                    </p>
                  </div>
                )}

                {day.masteryUpgrades > 0 && (
                  <div className="p-4 rounded-2xl text-center" style={{ background: 'rgb(var(--surface-2))' }}>
                    <p className="text-3xl font-black mb-1 text-gradient">
                      +{day.masteryUpgrades}
                    </p>
                    <p className="text-xs font-bold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Mastery Upgrades
                    </p>
                  </div>
                )}
              </div>

              {(timeImprovement || accuracyImprovement) && (
                <div className="rounded-2xl p-6" style={{ background: 'rgb(var(--surface-2))' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={20} style={{ color: 'rgb(var(--accent))' }} />
                    <h3 className="font-black" style={{ color: 'rgb(var(--text))' }}>
                      Today's Gains
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {timeImprovement && (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                            {timeImprovement.quiz.title}
                          </p>
                          <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                            Time improvement
                          </p>
                        </div>
                        <div
                          className="px-3 py-1 rounded-lg font-bold text-sm"
                          style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(34, 197, 94)' }}
                        >
                          -{timeImprovement.delta}s
                        </div>
                      </div>
                    )}

                    {accuracyImprovement && (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                            {accuracyImprovement.quiz.title}
                          </p>
                          <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                            Accuracy improvement
                          </p>
                        </div>
                        <div
                          className="px-3 py-1 rounded-lg font-bold text-sm"
                          style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(34, 197, 94)' }}
                        >
                          +{accuracyImprovement.delta.toFixed(0)}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {!timeImprovement && !accuracyImprovement && day.attemptsCount > 0 && (
                <div className="rounded-2xl p-6 text-center" style={{ background: 'rgb(var(--surface-2))' }}>
                  <AlertCircle size={32} className="mx-auto mb-3" style={{ color: 'rgb(var(--text-secondary))' }} />
                  <p className="font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                    No PBs today
                  </p>
                  <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Run it back tomorrow
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-black mb-4" style={{ color: 'rgb(var(--text))' }}>
                  Runs Today
                </h3>

                <div className="space-y-3">
                  {runs.map((run, idx) => (
                    <motion.div
                      key={`${run.attempt.id}-${idx}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 rounded-2xl"
                      style={{ background: 'rgb(var(--surface-2))' }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="font-bold text-sm" style={{ color: 'rgb(var(--text))' }}>
                              {run.quiz.title}
                            </p>
                            {getScopeChip(run.quiz.scopeType)}
                          </div>

                          <div className="flex items-center gap-4 text-xs font-semibold">
                            <div className="flex items-center gap-1">
                              <Target size={14} style={{ color: 'rgb(var(--text-secondary))' }} />
                              <span style={{ color: 'rgb(var(--text))' }}>
                                {Math.round(run.attempt.accuracyPct)}%
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} style={{ color: 'rgb(var(--text-secondary))' }} />
                              <span style={{ color: 'rgb(var(--text))' }}>
                                {formatTime(run.attempt.timeTakenSec)}
                              </span>
                            </div>
                          </div>

                          {run.targetDelta !== 0 && (
                            <p className="text-xs font-semibold mt-2" style={{
                              color: run.targetDelta > 0 ? 'rgb(34, 197, 94)' : 'rgb(251, 146, 60)'
                            }}>
                              {run.targetDelta > 0 ? `-${run.targetDelta}s under target` : `+${Math.abs(run.targetDelta)}s over target`}
                            </p>
                          )}

                          {run.masteryChange && (
                            <div className="mt-2">
                              <span
                                className="text-xs font-bold px-2 py-1 rounded-lg"
                                style={{
                                  background: `${getMasteryColor(run.masteryChange.to)}20`,
                                  color: getMasteryColor(run.masteryChange.to)
                                }}
                              >
                                {getMasteryLabel(run.masteryChange.from)} → {getMasteryLabel(run.masteryChange.to)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/quiz/${run.quiz.id}`)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105"
                          style={{ background: 'var(--gradient-primary)', color: 'white' }}
                        >
                          <Play size={14} />
                          <span>Retry Quiz</span>
                        </button>

                        {run.attempt.missedPromptIds && run.attempt.missedPromptIds.length > 0 && (
                          <button
                            onClick={() => navigate(`/quiz/${run.quiz.id}?mode=fix-it&attemptId=${run.attempt.id}`)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all hover:scale-105"
                            style={{ background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
                          >
                            <AlertCircle size={14} />
                            <span>Fix-It</span>
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

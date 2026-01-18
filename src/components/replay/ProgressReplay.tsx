import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award, Flag, Crown } from 'lucide-react';
import { TrainingStrip } from './TrainingStrip';
import { DayDetailDrawer } from './DayDetailDrawer';
import { ReadinessChart } from './ReadinessChart';
import { calculateDailyAggregates, findBestDay, findLongestStreak } from '../../utils/progressReplay';
import { Quiz, Attempt } from '../../types';

interface ProgressReplayProps {
  subjectId: string;
  quizzes: Quiz[];
  attempts: Attempt[];
}

export function ProgressReplay({ subjectId, quizzes, attempts }: ProgressReplayProps) {
  const [range, setRange] = useState<14 | 30>(14);
  const [view, setView] = useState<'timeline' | 'chart'>('timeline');
  const [metric, setMetric] = useState<'readiness' | 'attempts' | 'grade9Speed'>('readiness');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const aggregates = useMemo(
    () => calculateDailyAggregates(subjectId, quizzes, attempts, range),
    [subjectId, quizzes, attempts, range]
  );

  const selectedDay = useMemo(
    () => aggregates.find(day => day.date === selectedDate) || null,
    [aggregates, selectedDate]
  );

  const bestDay = useMemo(() => findBestDay(aggregates), [aggregates]);
  const longestStreak = useMemo(() => findLongestStreak(aggregates), [aggregates]);

  const bossDay = useMemo(
    () => aggregates.find(day => day.fullGcseAttempted) || null,
    [aggregates]
  );

  const hasData = aggregates.some(day => day.attemptsCount > 0);

  return (
    <>
      <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Calendar size={28} style={{ color: 'rgb(var(--accent))' }} />
              <h2 className="text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
                Progress Replay
              </h2>
            </div>
            <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              Your training log and readiness trend
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgb(var(--surface-2))' }}>
              <button
                onClick={() => setRange(14)}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={{
                  background: range === 14 ? 'var(--gradient-primary)' : 'transparent',
                  color: range === 14 ? 'white' : 'rgb(var(--text))',
                }}
              >
                14d
              </button>
              <button
                onClick={() => setRange(30)}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={{
                  background: range === 30 ? 'var(--gradient-primary)' : 'transparent',
                  color: range === 30 ? 'white' : 'rgb(var(--text))',
                }}
              >
                30d
              </button>
            </div>

            <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgb(var(--surface-2))' }}>
              <button
                onClick={() => setView('timeline')}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={{
                  background: view === 'timeline' ? 'var(--gradient-primary)' : 'transparent',
                  color: view === 'timeline' ? 'white' : 'rgb(var(--text))',
                }}
              >
                Timeline
              </button>
              <button
                onClick={() => setView('chart')}
                className="px-4 py-2 rounded-lg font-bold text-sm transition-all"
                style={{
                  background: view === 'chart' ? 'var(--gradient-primary)' : 'transparent',
                  color: view === 'chart' ? 'white' : 'rgb(var(--text))',
                }}
              >
                Chart
              </button>
            </div>

            {view === 'chart' && (
              <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgb(var(--surface-2))' }}>
                <button
                  onClick={() => setMetric('readiness')}
                  className="px-3 py-2 rounded-lg font-bold text-xs transition-all"
                  style={{
                    background: metric === 'readiness' ? 'var(--gradient-primary)' : 'transparent',
                    color: metric === 'readiness' ? 'white' : 'rgb(var(--text))',
                  }}
                >
                  Readiness
                </button>
                <button
                  onClick={() => setMetric('attempts')}
                  className="px-3 py-2 rounded-lg font-bold text-xs transition-all"
                  style={{
                    background: metric === 'attempts' ? 'var(--gradient-primary)' : 'transparent',
                    color: metric === 'attempts' ? 'white' : 'rgb(var(--text))',
                  }}
                >
                  Attempts
                </button>
                <button
                  onClick={() => setMetric('grade9Speed')}
                  className="px-3 py-2 rounded-lg font-bold text-xs transition-all"
                  style={{
                    background: metric === 'grade9Speed' ? 'var(--gradient-primary)' : 'transparent',
                    color: metric === 'grade9Speed' ? 'white' : 'rgb(var(--text))',
                  }}
                >
                  G9 Speed
                </button>
              </div>
            )}
          </div>
        </div>

        {!hasData ? (
          <div className="text-center py-16">
            <Calendar size={64} className="mx-auto mb-4" style={{ color: 'rgb(var(--text-secondary))' }} />
            <p className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              No training data yet
            </p>
            <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              Complete a quiz to start your replay
            </p>
          </div>
        ) : (
          <>
            {(bestDay || longestStreak > 0 || bossDay) && (
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {bestDay && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 rounded-2xl text-center"
                    style={{ background: 'rgb(var(--surface-2))' }}
                  >
                    <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ background: 'rgba(var(--accent), 0.1)' }}>
                      <Award size={24} style={{ color: 'rgb(var(--accent))' }} />
                    </div>
                    <p className="text-lg font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                      Best Day
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {new Date(bestDay.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      {' • '}
                      {bestDay.grade9SpeedCount > 0
                        ? `${bestDay.grade9SpeedCount} Grade 9 Speed`
                        : `${bestDay.masteryUpgrades} upgrades`}
                    </p>
                  </motion.div>
                )}

                {longestStreak > 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 }}
                    className="p-6 rounded-2xl text-center"
                    style={{ background: 'rgb(var(--surface-2))' }}
                  >
                    <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ background: 'rgba(var(--accent), 0.1)' }}>
                      <TrendingUp size={24} style={{ color: 'rgb(var(--accent))' }} />
                    </div>
                    <p className="text-lg font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                      Longest Streak
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {longestStreak} day{longestStreak !== 1 ? 's' : ''} in a row
                    </p>
                  </motion.div>
                )}

                {bossDay && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl text-center"
                    style={{ background: 'rgb(var(--surface-2))' }}
                  >
                    <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                      style={{ background: 'rgba(var(--accent), 0.1)' }}>
                      <Flag size={24} style={{ color: 'rgb(var(--accent))' }} />
                    </div>
                    <p className="text-lg font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                      Boss Day
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {new Date(bossDay.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      {' • '}
                      Full GCSE attempt
                    </p>
                  </motion.div>
                )}
              </div>
            )}

            {view === 'timeline' ? (
              <TrainingStrip
                aggregates={aggregates}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            ) : (
              <ReadinessChart aggregates={aggregates} metric={metric} />
            )}
          </>
        )}
      </div>

      <DayDetailDrawer
        day={selectedDay}
        quizzes={quizzes}
        allAttempts={attempts}
        onClose={() => setSelectedDate(null)}
      />
    </>
  );
}

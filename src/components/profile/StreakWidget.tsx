import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Clock } from 'lucide-react';
import { StreakState, Attempt } from '../../types';

interface StreakWidgetProps {
  streak: StreakState;
  attempts: Attempt[];
}

export function StreakWidget({ streak, attempts }: StreakWidgetProps) {
  const [timeUntilMidnight, setTimeUntilMidnight] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      setTimeUntilMidnight(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const getLast14Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 13; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push(date);
    }

    return days;
  };

  const isActiveDay = (date: Date) => {
    const dateStr = date.toDateString();
    return attempts.some(attempt => {
      const attemptDate = new Date(attempt.finishedAt).toDateString();
      return attemptDate === dateStr;
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const days = getLast14Days();
  const streakIntensity = Math.min(streak.currentStreakDays / 30, 1);

  return (
    <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
            Streak & Discipline
          </h2>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            Keep your momentum going
          </p>
        </div>

        <motion.div
          animate={{
            filter: `drop-shadow(0 0 ${streakIntensity * 20}px rgb(var(--accent)))`,
          }}
          className="relative"
        >
          <Flame size={48} style={{ color: 'rgb(var(--accent))' }} />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="text-center p-6 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Current Streak
          </p>
          <p className="text-5xl font-black text-gradient mb-1">
            {streak.currentStreakDays}
          </p>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            days
          </p>
        </div>

        <div className="text-center p-6 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Best Streak
          </p>
          <p className="text-5xl font-black" style={{ color: 'rgb(var(--text))' }}>
            {streak.bestStreakDays}
          </p>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            days
          </p>
        </div>
      </div>

      <div className="p-6 rounded-2xl mb-6" style={{ background: 'rgb(var(--surface-2))' }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold" style={{ color: 'rgb(var(--text))' }}>
            14-Day Activity
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            <Clock size={14} />
            <span>Resets in {timeUntilMidnight}</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const active = isActiveDay(day);
            const today = isToday(day);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`w-full aspect-square rounded-xl transition-all ${
                    today ? 'ring-2' : ''
                  }`}
                  style={{
                    background: active
                      ? 'var(--gradient-primary)'
                      : 'rgb(var(--surface))',
                    boxShadow: today ? '0 0 0 2px rgb(var(--accent))' : undefined,
                  }}
                  title={day.toLocaleDateString()}
                />
                <span className="text-[10px] font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {day.getDate()}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="text-center p-4 rounded-xl" style={{ background: 'rgba(var(--accent), 0.1)' }}>
        <p className="text-sm font-semibold" style={{ color: 'rgb(var(--accent))' }}>
          Complete one quiz today to keep your streak alive
        </p>
      </div>
    </div>
  );
}

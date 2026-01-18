import { motion } from 'framer-motion';
import { Crown, Star, Flag } from 'lucide-react';
import { DailyAggregate } from '../../utils/progressReplay';

interface TrainingStripProps {
  aggregates: DailyAggregate[];
  selectedDate: string | null;
  onSelectDate: (date: string) => void;
}

export function TrainingStrip({ aggregates, selectedDate, onSelectDate }: TrainingStripProps) {
  const getIntensityColor = (count: number): string => {
    if (count === 0) return 'transparent';
    if (count <= 2) return 'rgba(var(--accent), 0.3)';
    if (count <= 5) return 'rgba(var(--accent), 0.6)';
    return 'rgb(var(--accent))';
  };

  const getIntensityBorder = (count: number): string => {
    if (count === 0) return '2px solid rgba(var(--text-secondary), 0.2)';
    return 'none';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  const getDayLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { weekday: 'short' });
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-2 min-w-max">
        {aggregates.map((day, idx) => (
          <motion.button
            key={day.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.02 }}
            onClick={() => onSelectDate(day.date)}
            className="relative flex flex-col items-center gap-2 group"
          >
            <div className="text-xs font-bold" style={{ color: 'rgb(var(--text-secondary))' }}>
              {getDayLabel(day.date)}
            </div>

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative transition-all group-hover:scale-110"
              style={{
                background: getIntensityColor(day.attemptsCount),
                border: getIntensityBorder(day.attemptsCount),
                transform: selectedDate === day.date ? 'scale(1.15)' : 'scale(1)',
                boxShadow: selectedDate === day.date ? '0 0 0 3px rgba(var(--accent), 0.3)' : 'none',
              }}
            >
              {day.attemptsCount > 0 && (
                <span className="text-sm font-black" style={{ color: 'white' }}>
                  {day.attemptsCount}
                </span>
              )}

              {day.grade9SpeedCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgb(var(--accent))' }}>
                  <Crown size={12} color="white" />
                </div>
              )}

              {day.masteryUpgrades > 0 && day.grade9SpeedCount === 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgb(34, 197, 94)' }}>
                  <Star size={12} color="white" />
                </div>
              )}

              {day.fullGcseAttempted && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgb(var(--accent))' }}>
                  <Flag size={12} color="white" />
                </div>
              )}
            </div>

            <div className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              {formatDate(day.date).split(' ')[0]}
            </div>

            {day.attemptsCount > 0 && (
              <div
                className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity p-2 mt-6"
                style={{
                  background: 'rgb(var(--surface-2))',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  width: '200px',
                  transform: 'translateX(-50%) translateX(28px)',
                  pointerEvents: 'none',
                  marginTop: '80px',
                }}
              >
                <div className="text-left space-y-1 p-3">
                  <p className="text-sm font-bold" style={{ color: 'rgb(var(--text))' }}>
                    {formatDate(day.date)}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {day.attemptsCount} attempt{day.attemptsCount !== 1 ? 's' : ''}
                  </p>
                  {day.bestAccuracy > 0 && (
                    <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Best: {Math.round(day.bestAccuracy)}%
                    </p>
                  )}
                  {day.masteryUpgrades > 0 && (
                    <p className="text-xs font-semibold" style={{ color: 'rgb(34, 197, 94)' }}>
                      +{day.masteryUpgrades} mastery upgrade{day.masteryUpgrades !== 1 ? 's' : ''}
                    </p>
                  )}
                  {day.grade9SpeedCount > 0 && (
                    <p className="text-xs font-semibold" style={{ color: 'rgb(var(--accent))' }}>
                      {day.grade9SpeedCount} Grade 9 Speed
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

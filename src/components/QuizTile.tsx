import { useNavigate } from 'react-router-dom';
import { Clock, Award, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { Quiz, MasteryLevel } from '../types';
import { MasteryChip } from './MasteryChip';
import { storage } from '../utils/storage';

interface QuizTileProps {
  quiz: Quiz;
  onClick?: () => void;
  paperFilter?: unknown;
}

export function QuizTile({ quiz, onClick, paperFilter: _paperFilter }: QuizTileProps) {
  const navigate = useNavigate();
  const masteryState = storage.getMasteryState(quiz.id);
  const masteryLevel: MasteryLevel = masteryState?.masteryLevel ?? 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
  };

  const getScopeLabel = (scopeType: string): string => {
    switch (scopeType) {
      case 'full':
        return 'Full GCSE';
      case 'unit':
        return 'Unit Quiz';
      case 'topic':
        return 'Topic Sprint';
      default:
        return '';
    }
  };

  const getScopeBadgeStyle = (scopeType: string) => {
    switch (scopeType) {
      case 'full':
        return {
          background: 'var(--gradient-elite)',
          color: 'white',
          border: 'none'
        };
      case 'unit':
        return {
          background: 'rgb(var(--accent) / 0.1)',
          color: 'rgb(var(--accent))',
          border: '1px solid rgb(var(--accent) / 0.2)'
        };
      case 'topic':
        return {
          background: 'rgb(var(--success) / 0.1)',
          color: 'rgb(var(--success))',
          border: '1px solid rgb(var(--success) / 0.2)'
        };
      default:
        return {
          background: 'rgb(var(--surface-2))',
          color: 'rgb(var(--text))',
          border: '1px solid rgb(var(--border))'
        };
    }
  };

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(`/quiz/${quiz.id}`);
  };

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="card-hover group relative"
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span
            className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
            style={getScopeBadgeStyle(quiz.scopeType)}
          >
            {getScopeLabel(quiz.scopeType)}
          </span>
          <MasteryChip level={masteryLevel} size="sm" />
        </div>

        <div className="mb-3">
          <h4
            className="font-bold text-lg mb-1 group-hover:text-gradient transition-colors"
            style={{ color: 'rgb(var(--text))' }}
          >
            {quiz.title}
          </h4>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {quiz.promptIds.length} questions
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span className="font-medium">{formatTime(quiz.timeLimitSec)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award size={16} />
            <span className="font-medium">G9: {formatTime(quiz.grade9TargetSec)}</span>
          </div>
        </div>

        {masteryState && (
          <div
            className="pt-3 border-t flex items-center justify-between text-sm"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <span style={{ color: 'rgb(var(--text-secondary))' }} className="font-medium">
              Personal Best
            </span>
            <div className="flex items-center gap-3 stat-number font-bold" style={{ color: 'rgb(var(--text))' }}>
              <span>{Math.round(masteryState.bestAccuracyPct)}%</span>
              <span className="opacity-50">•</span>
              <span>{formatTime(masteryState.bestTimeSec)}</span>
            </div>
          </div>
        )}

        <motion.div
          className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.1 }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <Play size={18} fill="white" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

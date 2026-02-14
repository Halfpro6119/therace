/**
 * QuickCheckInline - Single Quick Check for embedded use in Learn Mode
 * Renders MCQ, T/F, or drag-order; calls onComplete when done.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, XCircle } from 'lucide-react';
import { soundSystem } from '../../utils/sounds';
import type { ScienceQuickCheck } from '../../types/scienceLab';

export interface QuickCheckInlineProps {
  check: ScienceQuickCheck;
  onComplete: (correct: boolean) => void;
  onSkip?: () => void;
  compact?: boolean;
}

export function QuickCheckInline({ check, onComplete, onSkip, compact }: QuickCheckInlineProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragOrder, setDragOrder] = useState<string[]>([]);

  if (!check) return null;

  useEffect(() => {
    if (check.type === 'dragOrder' && check.options && Array.isArray(check.options)) {
      setDragOrder([...check.options]);
    } else {
      setDragOrder([]);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [check?.id, check?.type, check?.options]);

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleDragOrder = (fromIndex: number, toIndex: number) => {
    if (showFeedback) return;
    const newOrder = [...dragOrder];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    setDragOrder(newOrder);
    setSelectedAnswer(newOrder);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !check) return;
    let correct = false;
    const correctAnswer = check.correctAnswer;
    if (check.type === 'dragOrder') {
      const correctOrder = Array.isArray(correctAnswer) ? correctAnswer : (correctAnswer != null ? [correctAnswer] : []);
      correct = JSON.stringify(dragOrder) === JSON.stringify(correctOrder);
    } else {
      const correctAns = Array.isArray(correctAnswer) ? correctAnswer[0] : correctAnswer;
      correct = selectedAnswer === correctAns;
    }
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) soundSystem.playCorrect();
  };

  const handleContinue = () => {
    onComplete?.(isCorrect);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-4 sm:p-6 border"
      style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
    >
      <div className={compact ? 'mb-3' : 'mb-4'}>
        <p className="text-xs font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
          Quick check
        </p>
        <h3 className={compact ? 'text-base font-semibold' : 'text-lg font-semibold'} style={{ color: 'rgb(var(--text))' }}>
          {check.question ?? 'Quick check'}
        </h3>
      </div>

      {(check.type === 'multipleChoice' || check.type === 'trueFalse') && (
        <div className="space-y-2">
          {(check.options ?? []).map((option, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAnswerSelect(option)}
              disabled={showFeedback}
              className={`w-full p-3 rounded-lg text-left border transition text-sm ${
                selectedAnswer === option ? 'border-blue-500 ring-2 ring-blue-500/30' : ''
              } ${showFeedback ? 'opacity-75 cursor-not-allowed' : 'hover:border-blue-300'}`}
              style={{
                background: selectedAnswer === option ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
                color: 'rgb(var(--text))',
                borderColor: selectedAnswer === option ? 'rgb(var(--primary))' : 'rgb(var(--border))',
              }}
            >
              {option}
              {selectedAnswer === option ? ' ✓' : ''}
            </button>
          ))}
        </div>
      )}

      {check.type === 'dragOrder' && (
        <div className="space-y-2">
          <p className="text-xs mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Drag to order:
          </p>
          {dragOrder.map((item, idx) => (
            <div
              key={idx}
              draggable={!showFeedback}
              onDragStart={(e) => e.dataTransfer.setData('text/plain', idx.toString())}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleDragOrder(parseInt(e.dataTransfer.getData('text/plain')), idx);
              }}
              className="p-3 rounded-lg border cursor-move text-sm"
              style={{
                background: 'rgb(var(--surface-2))',
                borderColor: 'rgb(var(--border))',
                color: 'rgb(var(--text))',
              }}
            >
              <span className="text-xs font-semibold mr-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                {idx + 1}.
              </span>
              {item}
            </div>
          ))}
        </div>
      )}

      {!showFeedback && (
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-white transition disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)' }}
          >
            Submit
          </button>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="px-4 py-2.5 rounded-lg font-medium text-sm transition"
              style={{ color: 'rgb(var(--text-secondary))', background: 'rgb(var(--surface-2))' }}
            >
              Skip
            </button>
          )}
        </div>
      )}

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <div
            className={`p-3 rounded-lg flex items-start gap-2 ${
              isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
            }`}
          >
            {isCorrect ? (
              <Sparkles size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>
              {isCorrect ? (check.feedback?.correct ?? 'Correct!') : (check.feedback?.incorrect ?? 'Not quite. Review and try again.')}
            </p>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className="w-full mt-3 py-2.5 rounded-lg font-semibold text-sm text-white transition"
            style={{ background: '#10B981' }}
          >
            Continue →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

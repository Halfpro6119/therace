/**
 * Shared Lab-style flashcard card – Science Lab look and feel.
 * Flip animation, confidence buttons (Again, Learning, Got it), consistent styling.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  LAB_CONFIDENCE_LABELS,
  LAB_CONFIDENCE_STYLES,
  LAB_CARD_ACCENT,
} from '../../config/hubTheme';

export type LabConfidenceLevel = 1 | 2 | 3;

export interface LabFlashcardCardProps {
  /** Content shown on front (term / prompt) */
  front: React.ReactNode;
  /** Content shown on back (definition / answer) */
  back: React.ReactNode;
  isFlipped: boolean;
  onFlip: () => void;
  onConfidence: (level: LabConfidenceLevel) => void;
  /** Optional: show "Continue without rating" and call onSkip */
  onSkip?: () => void;
  /** Card count label e.g. "Card 3 of 12" */
  progressLabel?: string;
  /** Optional topic/chip label */
  topicLabel?: string;
  /** Optional accent color (default LAB_CARD_ACCENT) */
  accentColor?: string;
  /** Optional: prev/next card handlers */
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
}

export function LabFlashcardCard({
  front,
  back,
  isFlipped,
  onFlip,
  onConfidence,
  onSkip,
  progressLabel,
  topicLabel,
  accentColor = LAB_CARD_ACCENT,
  onPrev,
  onNext,
  canPrev = false,
  canNext = false,
}: LabFlashcardCardProps) {
  const borderColor = accentColor;

  return (
    <div className="space-y-6">
      {progressLabel && (
        <div className="flex items-center justify-between text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          <span>{progressLabel}</span>
          <button
            type="button"
            onClick={onFlip}
            className="flex items-center gap-1 hover:underline"
          >
            <RotateCcw size={16} /> {isFlipped ? 'Show term again' : 'Flip card'}
          </button>
        </div>
      )}

      <motion.div
        className="min-h-[220px] rounded-2xl border-2 cursor-pointer overflow-hidden"
        style={{
          background: 'rgb(var(--surface))',
          borderColor,
          borderLeftWidth: 6,
        }}
        onClick={onFlip}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center min-h-[220px]"
            >
              {topicLabel && (
                <span
                  className="mb-3 px-2 py-1 rounded-lg text-xs font-medium"
                  style={{ background: `${borderColor}20`, color: borderColor }}
                >
                  {topicLabel}
                </span>
              )}
              <div className="text-center">{front}</div>
              <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                Tap card or button to reveal
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 flex flex-col min-h-[220px]"
            >
              <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                {back}
              </div>
              <div
                className="flex-shrink-0 pt-5 mt-4 border-t flex flex-col gap-2.5"
                style={{ borderColor: 'rgb(var(--border))' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex gap-2 sm:gap-3" role="group" aria-label="Rate your recall">
                  {([1, 2, 3] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onConfidence(level);
                      }}
                      className="flex-1 min-h-[60px] py-3 px-2 flex items-center justify-center cursor-pointer touch-manipulation select-none rounded-xl font-semibold text-[13px] text-white transition hover:opacity-95 active:scale-[0.98]"
                      style={{
                        background: LAB_CONFIDENCE_STYLES[level].background,
                        boxShadow: LAB_CONFIDENCE_STYLES[level].boxShadow,
                      }}
                      aria-label={`Rate: ${LAB_CONFIDENCE_LABELS[level]}`}
                    >
                      {LAB_CONFIDENCE_LABELS[level]}
                    </button>
                  ))}
                </div>
                {onSkip && (
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onSkip();
                      }}
                      className="text-sm font-medium underline underline-offset-2 hover:no-underline transition"
                      style={{ color: 'rgb(var(--text-secondary))' }}
                    >
                      Continue without rating
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {(onPrev != null || onNext != null) && (
        <div className="flex items-center justify-between">
          <motion.button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            className="p-4 rounded-xl disabled:opacity-30 min-w-[48px] min-h-[48px] flex items-center justify-center"
            style={{ color: 'rgb(var(--text))' }}
            aria-label="Previous card"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </motion.button>
          <motion.button
            type="button"
            onClick={onFlip}
            className="text-[14px] font-semibold px-6 py-3 rounded-xl"
            style={{ color: 'rgb(var(--text-secondary))', background: 'rgb(var(--surface-2))' }}
            aria-label="Flip card"
          >
            <RotateCcw size={18} strokeWidth={2.5} className="inline mr-2 -mt-0.5" /> Flip
          </motion.button>
          <motion.button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="p-4 rounded-xl disabled:opacity-30 min-w-[48px] min-h-[48px] flex items-center justify-center"
            style={{ color: 'rgb(var(--text))' }}
            aria-label="Next card"
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </motion.button>
        </div>
      )}
    </div>
  );
}

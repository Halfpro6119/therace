/**
 * QUIZ NAVIGATION COMPONENT (FIXED)
 * 
 * Key fixes:
 * 1. Show "Continue" button after feedback is shown
 * 2. Show "Submit" button when no feedback yet
 * 3. Proper button state management
 * 4. Clear visual feedback for user
 */

import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react';

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onSkip: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  canGoBack: boolean;
  hasAnswered: boolean;
  showSubmitButton: boolean;
  /** When true, Submit is disabled (e.g. empty answer). */
  submitDisabled?: boolean;
  /** Total marks for the quiz (e.g. Maths). Shown as "• X marks" when set. */
  totalMarks?: number;
  /** Difficulty 1–5 for current question (e.g. from prompt.meta.difficulty). Shown when set. */
  difficulty?: number;
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  onPrevious,
  onSkip,
  onNext,
  onSubmit,
  isSubmitting,
  canGoBack,
  hasAnswered,
  showSubmitButton,
  submitDisabled = false,
  totalMarks,
  difficulty,
}: QuizNavigationProps) {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
      {/* Question Counter + optional marks & difficulty */}
      <div className="text-center text-xs sm:text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        Question {currentIndex + 1} of {totalQuestions}
        {totalMarks != null && totalMarks > 0 && (
          <span className="hidden xs:inline"> • {totalMarks} marks</span>
        )}
        {difficulty != null && difficulty >= 1 && difficulty <= 5 && (
          <span className="hidden sm:inline"> • Difficulty {difficulty}/5</span>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={!canGoBack || isSubmitting}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-h-[44px] min-w-[44px]"
          title="Go to previous question"
        >
          <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm">Previous</span>
        </button>

        {/* Skip Button */}
        <button
          onClick={onSkip}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border-2 border-orange-300 hover:border-orange-400 text-orange-700 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-h-[44px] min-w-[44px]"
          title="Skip this question and move to the next"
        >
          <SkipForward size={18} className="sm:w-5 sm:h-5" />
          <span className="hidden sm:inline text-sm">Skip</span>
        </button>

        {/* FIXED: Submit Button (shown when no feedback yet) */}
        {showSubmitButton && (
          <button
            onClick={onSubmit}
            disabled={isSubmitting || submitDisabled}
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base min-h-[44px]"
            title={submitDisabled ? 'Provide an answer to submit' : 'Submit your answer'}
          >
            {isSubmitting ? 'Checking...' : 'Submit'}
          </button>
        )}

        {/* FIXED: Continue Button (shown when feedback is displayed) */}
        {!showSubmitButton && hasAnswered && (
          <button
            onClick={onNext}
            disabled={isSubmitting}
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base min-h-[44px]"
            title="Continue to next question"
          >
            {isLastQuestion ? 'Finish' : 'Continue'}
          </button>
        )}

        {/* Next Button (for navigation when already answered) */}
        {!showSubmitButton && !hasAnswered && (
          <button
            onClick={onNext}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium min-h-[44px] min-w-[44px]"
            title="Go to next question"
          >
            <span className="hidden sm:inline text-sm">Next</span>
            <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
        <div
          className="bg-blue-600 h-1.5 sm:h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>
    </div>
  );
}

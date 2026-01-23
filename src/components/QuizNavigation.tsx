/**
 * QUIZ NAVIGATION COMPONENT
 * 
 * Provides skip and previous buttons for quiz navigation.
 * Allows students to move through questions flexibly.
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
}: QuizNavigationProps) {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="flex flex-col gap-4 mt-6 pt-4 border-t border-gray-200">
      {/* Question Counter */}
      <div className="text-center text-sm text-gray-600">
        Question {currentIndex + 1} of {totalQuestions}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={!canGoBack || isSubmitting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          title="Go to previous question"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Skip Button */}
        <button
          onClick={onSkip}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-orange-300 hover:border-orange-400 text-orange-700 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          title="Skip this question and move to the next"
        >
          <SkipForward size={20} />
          <span className="hidden sm:inline">Skip</span>
        </button>

        {/* Submit Button (if not answered) */}
        {showSubmitButton && !hasAnswered && (
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? 'Checking...' : 'Submit Answer'}
          </button>
        )}

        {/* Next Button (if answered or last question) */}
        {(hasAnswered || isLastQuestion) && (
          <button
            onClick={onNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            title="Go to next question"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>
    </div>
  );
}

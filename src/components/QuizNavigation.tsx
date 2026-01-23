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
  isSubmitting: boolean;
  canGoBack: boolean;
}

export function QuizNavigation({
  currentIndex,
  totalQuestions,
  onPrevious,
  onSkip,
  onNext,
  isSubmitting,
  canGoBack,
}: QuizNavigationProps) {
  return (
    <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoBack || isSubmitting}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Go to previous question"
      >
        <ChevronLeft size={20} />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Question Counter */}
      <div className="text-center text-sm text-gray-600">
        Question {currentIndex + 1} of {totalQuestions}
      </div>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        disabled={isSubmitting}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-orange-300 hover:border-orange-400 text-orange-700 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Skip this question and move to the next"
      >
        <SkipForward size={20} />
        <span className="hidden sm:inline">Skip</span>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={isSubmitting}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Go to next question"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

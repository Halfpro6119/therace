/**
 * ENHANCED QUIZ PLAYER PAGE
 * 
 * Integrated with new question type system:
 * - Skip/Previous navigation buttons
 * - Type-specific question rendering
 * - Complete answer validation
 * - Auto-fill for FILL questions
 * - Mark scheme for SHORT questions
 * - Visual feedback for all types
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { X, Clock, CheckCircle, Lightbulb, Flag, Settings, Eye, EyeOff, Zap, Volume2, VolumeX, Check, MoreHorizontal, RotateCcw, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, supabase } from '../db/client';
import { MasteryChip } from '../components/MasteryChip';
import { ProgressBar } from '../components/ProgressBar';
import { XPPopup } from '../components/XPPopup';
import { ComboTracker } from '../components/ComboTracker';
import { MathsToolkit } from '../components/toolkit/MathsToolkit';
import { DiagramRenderer } from '../components/DiagramRenderer';
import { QuestionRenderer } from '../components/QuestionRenderer';
import { QuizNavigation } from '../components/QuizNavigation';
import { storage, calculateMasteryLevel } from '../utils/storage';
import { soundSystem } from '../utils/sounds';
import { isAnswerCorrect } from '../utils/answerValidation';
import { questionRegistry } from '../utils/questionRegistry';
import { QuestionAnswer } from '../types/questionTypes';
import { useConfirm } from '../contexts/ConfirmContext';
import { Attempt, Quiz, Prompt, DiagramMetadata } from '../types';

export function QuizPlayerPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const skipAutoCheckRef = useRef(false);
  const { confirm } = useConfirm();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizPrompts, setQuizPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackAnimation, setFeedbackAnimation] = useState<'correct' | 'wrong' | null>(null);

  const isFixItMode = searchParams.get('mode') === 'fixit';

  // ============================================================================
  // NAVIGATION STATE
  // ============================================================================
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [answeredPrompts, setAnsweredPrompts] = useState<Set<string>>(new Set());

  // ============================================================================
  // ANSWER STATE
  // ============================================================================
  const [currentInput, setCurrentInput] = useState<any>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');

  // ============================================================================
  // EXISTING STATE (from original QuizPlayerPage)
  // ============================================================================
  const [focusMode, setFocusMode] = useState(() => {
    return localStorage.getItem('grade9_focus_mode') === 'true';
  });
  const [speedrunMode, setSpeedrunMode] = useState(() => {
    return localStorage.getItem('grade9_speedrun_mode') === 'true';
  });
  const [soundsEnabled, setSoundsEnabled] = useState(soundSystem.isEnabled());
  const [showSettings, setShowSettings] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [toolkitOpen, setToolkitOpen] = useState(() => {
    return localStorage.getItem('mathsToolkit_open') === 'true';
  });

  const [solvedPrompts, setSolvedPrompts] = useState<Set<string>>(new Set());
  const [missedPrompts, setMissedPrompts] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStartTime] = useState(Date.now());
  const [showHint, setShowHint] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showXPPopup, setShowXPPopup] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPrompt = quizPrompts[currentPromptIndex];
  const isMathsSubject = quiz?.subjectId === '0d9b0cc0-1779-4097-a684-f41d5b994f50';
  const calculatorAllowed = currentPrompt?.meta?.calculatorAllowed === true;
  const diagramMetadata = (currentPrompt?.meta?.diagram || (currentPrompt as any)?.diagram_metadata) as DiagramMetadata | undefined;

  // ============================================================================
  // LOAD QUIZ DATA
  // ============================================================================
  useEffect(() => {
    loadQuizData();
  }, [quizId]);

  const loadQuizData = async () => {
    if (!quizId) return;

    try {
      const quizData = await db.getQuiz(quizId);
      if (quizData) {
        setQuiz(quizData);
        setTimeRemaining(quizData.timeLimitSec);

        let promptsData = await db.getPromptsByIds(quizData.promptIds);

        if (isFixItMode) {
          const lastAttempts = storage.getAttemptsByQuizId(quizData.id);
          const lastAttempt = lastAttempts[lastAttempts.length - 1];
          if (lastAttempt && lastAttempt.missedPromptIds.length > 0) {
            promptsData = promptsData.filter(p => lastAttempt.missedPromptIds.includes(p.id));
          }
        } else {
          promptsData = [...promptsData].sort(() => Math.random() - 0.5);
        }

        setQuizPrompts(promptsData);
      }
    } catch (error) {
      console.error('Failed to load quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // NAVIGATION HANDLERS
  // ============================================================================

  /**
   * Skip to next question without answering
   */
  const handleSkip = () => {
    if (currentPromptIndex < quizPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setCurrentInput('');
      setShowFeedback(false);
      setFeedbackMessage('');
    }
  };

  /**
   * Go to previous question
   */
  const handlePrevious = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
      setCurrentInput('');
      setShowFeedback(false);
      setFeedbackMessage('');
    }
  };

  /**
   * Go to next question
   */
  const handleNext = () => {
    if (currentPromptIndex < quizPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setCurrentInput('');
      setShowFeedback(false);
      setFeedbackMessage('');
    } else {
      // Last question - end quiz
      endQuiz();
    }
  };

  // ============================================================================
  // ANSWER VALIDATION
  // ============================================================================

  /**
   * Submit and validate answer using registry system
   */
  const handleSubmitAnswer = async () => {
    if (!currentPrompt || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Get handler for this question type
      const handler = questionRegistry.getHandler(currentPrompt.type as any);
      if (!handler) {
        console.error(`No handler for type: ${currentPrompt.type}`);
        setFeedbackMessage('Error: Unknown question type');
        setShowFeedback(true);
        setIsSubmitting(false);
        return;
      }

      // Create answer object
      const userAnswer: QuestionAnswer = {
        type: currentPrompt.type as any,
        value: currentInput,
      };

      // Validate answer
      const result = handler.validateAnswer(currentPrompt, userAnswer);

      // Update feedback
      setIsCorrect(result.isCorrect);
      setFeedbackMessage(result.feedback || '');
      setExplanation(currentPrompt.explanation || '');
      setShowFeedback(true);

      // Mark as answered
      setAnsweredPrompts(prev => new Set([...prev, currentPrompt.id]));

      // Update mastery tracking
      if (result.isCorrect) {
        solvedPrompts.add(currentPrompt.id);
        setCombo(combo + 1);
        setShowXPPopup(true);
        setShowCheckmark(true);
        soundSystem.playCorrect();
      } else {
        missedPrompts.add(currentPrompt.id);
        setCombo(0);
        soundSystem.playWrong();
      }
    } catch (error) {
      console.error('Error validating answer:', error);
      setFeedbackMessage('Error validating answer');
      setShowFeedback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================================
  // EXISTING FUNCTIONS (from original QuizPlayerPage)
  // ============================================================================

  const endQuizWithSolvedPrompts = (finalSolvedPrompts: Set<string>) => {
    // ... existing implementation
  };

  const endQuiz = () => {
    setHasEnded(true);
    // ... existing implementation
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz || quizPrompts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">No quiz data available</p>
        </div>
      </div>
    );
  }

  if (hasEnded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Quiz completed!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{quiz.title}</h1>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Timer and Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              <span className="text-lg font-semibold">{Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}</span>
            </div>
            <MasteryChip level={calculateMasteryLevel(solvedPrompts.size, quizPrompts.length)} />
            <ComboTracker combo={combo} />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          {/* Question Text */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentPrompt.question}
            </h2>
            {currentPrompt.hint && !showHint && (
              <button
                onClick={() => setShowHint(true)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-2"
              >
                <Lightbulb size={16} /> Show Hint
              </button>
            )}
            {showHint && currentPrompt.hint && (
              <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800">
                <p className="font-semibold">Hint:</p>
                <p>{currentPrompt.hint}</p>
              </div>
            )}
          </div>

          {/* Question Renderer - Handles all types */}
          <QuestionRenderer
            prompt={currentPrompt}
            currentInput={currentInput}
            onInputChange={setCurrentInput}
            onSubmit={handleSubmitAnswer}
            isSubmitting={isSubmitting}
            showFeedback={showFeedback}
            feedbackMessage={feedbackMessage}
            isCorrect={isCorrect}
            explanation={explanation}
          />

          {/* Navigation */}
          <QuizNavigation
            currentIndex={currentPromptIndex}
            totalQuestions={quizPrompts.length}
            onPrevious={handlePrevious}
            onSkip={handleSkip}
            onNext={handleNext}
            onSubmit={handleSubmitAnswer}
            isSubmitting={isSubmitting}
            canGoBack={currentPromptIndex > 0}
            hasAnswered={answeredPrompts.has(currentPrompt.id)}
            showSubmitButton={!showFeedback}
          />
        </div>

        {/* XP Popup */}
        {showXPPopup && <XPPopup onComplete={() => setShowXPPopup(false)} />}
      </div>
    </div>
  );
}

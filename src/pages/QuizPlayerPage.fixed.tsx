/**
 * FIXED QUIZ PLAYER PAGE
 * 
 * Key changes:
 * 1. Import centralized submitAnswer pipeline
 * 2. Replace handleSubmitAnswer with new implementation using pipeline
 * 3. Add proper state management for feedback flow
 * 4. Implement "Continue" button after feedback
 * 5. Add console logging for debugging
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
import { storage, calculateMasteryLevel } from '../utils/storage';
import { soundSystem } from '../utils/sounds';
import { isAnswerCorrect } from '../utils/answerValidation';
import { useConfirm } from '../contexts/ConfirmContext';
import { QuestionRenderer, gradeFromRenderer } from '../components/QuestionRenderer';
import { QuizNavigation } from '../components/QuizNavigation';
import { questionRegistry } from '../utils/questionRegistry';
import { QuestionAnswer } from '../types/questionTypes';
import { Attempt, Quiz, Prompt, DiagramMetadata } from '../types';
import { submitAnswer } from '../utils/submitAnswerPipeline';

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

  const [currentInput, setCurrentInput] = useState('');
  const [solvedPrompts, setSolvedPrompts] = useState<Set<string>>(new Set());
  const [missedPrompts, setMissedPrompts] = useState<Set<string>>(new Set());
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [quizStartTime] = useState(Date.now());
  const [showHint, setShowHint] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showXPPopup, setShowXPPopup] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  
  // Prevent race conditions: lock submission during processing
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Navigation and feedback state
  const [answeredPrompts, setAnsweredPrompts] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [gradeResult, setGradeResult] = useState<any>(null);

  const currentPrompt = quizPrompts[currentPromptIndex];
  const isMathsSubject = quiz?.subjectId === '0d9b0cc0-1779-4097-a684-f41d5b994f50';
  const calculatorAllowed = currentPrompt?.meta?.calculatorAllowed === true;
  const diagramMetadata = (currentPrompt?.meta?.diagram || (currentPrompt as any)?.diagram_metadata) as DiagramMetadata | undefined;

  useEffect(() => {
    localStorage.setItem('mathsToolkit_open', toolkitOpen.toString());
  }, [toolkitOpen]);

  useEffect(() => {
    loadQuizData();
  }, [quizId]);

  // ============================================================================
  // NAVIGATION HANDLERS
  // ============================================================================

  const handleSkip = () => {
    if (currentPromptIndex < quizPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setCurrentInput('');
      setShowFeedback(false);
      setFeedbackMessage('');
    }
  };

  const handlePrevious = () => {
    if (currentPromptIndex > 0) {
      setCurrentPromptIndex(currentPromptIndex - 1);
      setCurrentInput('');
      setShowFeedback(false);
      setFeedbackMessage('');
    }
  };

  const handleNext = () => {
    if (currentPromptIndex < quizPrompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
      setCurrentInput('');
      setShowFeedback(false);
      setFeedbackMessage('');
    } else {
      endQuiz();
    }
  };

  /**
   * FIXED: New submit handler using centralized pipeline
   * 
   * Flow:
   * 1. Call submitAnswer pipeline (validates, grades, persists)
   * 2. Update UI state with result
   * 3. Play sounds and show animations
   * 4. Mark prompt as answered
   * 5. Show feedback with "Continue" button
   */
  const handleSubmitAnswer = async () => {
    if (!currentPrompt || isSubmitting) {
      console.warn('[handleSubmitAnswer] Early return: currentPrompt=%o, isSubmitting=%s', currentPrompt, isSubmitting);
      return;
    }

    console.log('[handleSubmitAnswer] Starting submission for prompt:', currentPrompt.id);
    setIsSubmitting(true);

    try {
      // ========================================================================
      // STEP 1: CALL CENTRALIZED SUBMIT PIPELINE
      // ========================================================================
      console.log('[handleSubmitAnswer] Calling submitAnswer pipeline...');
      const result = await submitAnswer(
        currentPrompt,
        currentInput,
        quizId || '',
        quizStartTime
      );

      console.log('[handleSubmitAnswer] Pipeline result:', result);

      // ========================================================================
      // STEP 2: UPDATE UI STATE WITH RESULT
      // ========================================================================
      setGradeResult({
        isCorrect: result.isCorrect,
        marksAwarded: result.marksAwarded,
        maxMarks: result.maxMarks,
        feedback: {
          correctAnswer: result.correctAnswerDisplay,
          summary: result.feedbackSummary,
        },
      });

      setIsCorrect(result.isCorrect);
      setFeedbackMessage(result.feedbackSummary);
      setExplanation(result.explanation);
      setShowFeedback(true);
      setAnsweredPrompts(prev => new Set([...prev, currentPrompt.id]));

      // ========================================================================
      // STEP 3: UPDATE COMBO, PLAY SOUNDS, SHOW ANIMATIONS
      // ========================================================================
      if (result.isCorrect) {
        console.log('[handleSubmitAnswer] Answer correct! Updating combo and sounds...');
        setSolvedPrompts(prev => new Set([...prev, currentPrompt.id]));
        setCombo(combo + 1);
        setShowXPPopup(true);
        setShowCheckmark(true);
        soundSystem.playCorrect();
      } else {
        console.log('[handleSubmitAnswer] Answer incorrect. Resetting combo...');
        setMissedPrompts(prev => new Set([...prev, currentPrompt.id]));
        setCombo(0);
        soundSystem.playWrong();
      }

      console.log('[handleSubmitAnswer] Submission complete. Feedback shown.');
    } catch (error) {
      console.error('[handleSubmitAnswer] Unexpected error:', error);
      setFeedbackMessage('An error occurred while checking your answer. Please try again.');
      setShowFeedback(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertTextAtCursor = useCallback((text: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = input.value;

    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
    skipAutoCheckRef.current = true;
    setCurrentInput(newValue);

    // Set cursor position after state update
    setTimeout(() => {
      const newCursorPos = start + text.length;
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, []);

  const inputRefCallback = useCallback((element: HTMLInputElement | null) => {
    inputRef.current = element;
    if (element) {
      (element as any).insertTextAtCursor = insertTextAtCursor;
    }
  }, [insertTextAtCursor]);

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

  useEffect(() => {
    if (!hasStarted || hasEnded) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          endQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, hasEnded]);

  useEffect(() => {
    if (hasStarted && !hasEnded) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentPromptIndex, hasStarted, hasEnded]);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hasStarted && !hasEnded) {
        const shouldEnd = await confirm({
          title: 'End Quiz?',
          message: 'Are you sure you want to end this quiz? Your progress will be saved.',
          confirmText: 'End Quiz',
          cancelText: 'Continue',
        });
        if (shouldEnd) {
          endQuiz();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, hasEnded, confirm]);

  const endQuiz = () => {
    setHasEnded(true);
    const totalMarks = quizPrompts.reduce((sum, p) => sum + (p.marks || 1), 0);
    const marksAwarded = Array.from(solvedPrompts).reduce((sum, id) => {
      const prompt = quizPrompts.find(p => p.id === id);
      return sum + (prompt?.marks || 1);
    }, 0);

    navigate('/quiz-results', {
      state: {
        quizId,
        totalMarks,
        marksAwarded,
        solvedCount: solvedPrompts.size,
        totalCount: quizPrompts.length,
        timeTaken: Math.floor((Date.now() - quizStartTime) / 1000),
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz || quizPrompts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Quiz not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
        >
          <h1 className="text-3xl font-bold mb-4 text-center">{quiz.name}</h1>
          <p className="text-gray-600 text-center mb-6">{quizPrompts.length} questions</p>
          <button
            onClick={() => setHasStarted(true)}
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Quiz
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentPrompt && (
                <motion.div
                  key={currentPrompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-lg p-8"
                >
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4">{currentPrompt.question}</h2>
                    {currentPrompt.hint && showHint && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
                      >
                        <div className="flex gap-3">
                          <Lightbulb size={20} style={{ color: 'rgb(var(--warning))' }} className="mt-0.5" />
                          <div>
                            <p className="font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Hint</p>
                            <p style={{ color: 'rgb(var(--text-secondary))' }}>{currentPrompt.hint}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* NEW: Question Renderer and Navigation */}
                  <QuestionRenderer
                    prompt={currentPrompt}
                    value={currentInput}
                    onChange={setCurrentInput}
                    disabled={isSubmitting}
                    showFeedback={showFeedback}
                    gradeResult={gradeResult}
                    onSubmit={handleSubmitAnswer}
                  />

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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!focusMode && (
            <div className="space-y-6">
              <div className="card p-6">
                <h4 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                  <CheckCircle size={20} style={{ color: 'rgb(var(--success))' }} />
                  <span>Answer Slots</span>
                </h4>
                <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                  <AnimatePresence>
                    {quizPrompts.map((prompt, idx) => {
                      const isSolved = solvedPrompts.has(prompt.id);
                      return (
                        <motion.div
                          key={prompt.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`p-3 rounded-lg text-sm transition-all ${
                            isSolved ? 'answer-slot-solved' : 'answer-slot-empty'
                          }`}
                          style={{
                            background: isSolved
                              ? 'rgb(var(--success) / 0.1)'
                              : 'rgb(var(--surface-2))',
                            color: isSolved
                              ? 'rgb(var(--success))'
                              : 'rgb(var(--muted))',
                            borderLeft: isSolved ? '3px solid rgb(var(--success))' : 'none',
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs opacity-50">{String(idx + 1).padStart(2, '0')}</span>
                            {isSolved ? (
                              <span className="font-medium">{prompt.answers[0]}</span>
                            ) : (
                              <span className="opacity-50">━━━━━</span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>

        {isMathsSubject && (
          <AnimatePresence>
            {toolkitOpen && (
              <MathsToolkit
                isOpen={toolkitOpen}
                onClose={() => setToolkitOpen(false)}
                calculatorAllowed={calculatorAllowed}
                attemptId={`${quiz.id}-${quizStartTime}`}
                inputRef={inputRef}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}

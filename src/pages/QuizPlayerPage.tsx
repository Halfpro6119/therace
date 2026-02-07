/**
 * QUIZ PLAYER PAGE - ORIGINAL DESIGN WITH NEW SUBMISSION PIPELINE
 * 
 * This component combines:
 * - Original sophisticated UI design (progress bar, settings, timer, answer slots)
 * - New centralized submit answer pipeline (validation, grading, persistence)
 * - All question types support
 * - Proper feedback flow with Continue button
 * - AUTO-ADVANCE: Automatically moves to next question when answer is correct
 * - REAL-TIME DETECTION: Detects correct answers as user types and auto-submits
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { X, Clock, CheckCircle, Lightbulb, Flag, Settings, Eye, EyeOff, Zap, Volume2, VolumeX, Check, MoreHorizontal, RotateCcw, Wrench, Calculator, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, supabase } from '../db/client';
import { MasteryChip } from '../components/MasteryChip';
import { ProgressBar } from '../components/ProgressBar';
import { XPPopup } from '../components/XPPopup';
import { ComboTracker } from '../components/ComboTracker';
import { MathsToolkit } from '../components/toolkit/MathsToolkit';
import { CalculatorModal } from '../components/CalculatorModal';
import { DiagramRenderer } from '../components/DiagramRenderer';
import { BearingsDiagramWithProtractor, isBearingsDiagram } from '../components/BearingsDiagramWithProtractor';
import { storage, calculateMasteryLevel } from '../utils/storage';
import { soundSystem } from '../utils/sounds';
import { useConfirm } from '../contexts/ConfirmContext';
import { QuestionRenderer, gradeFromRenderer } from '../components/QuestionRenderer';
import { QuestionDoodlePad } from '../components/QuestionDoodlePad';
import { QuizNavigation } from '../components/QuizNavigation';
import { questionRegistry } from '../utils/questionRegistry';
import { QuestionAnswer } from '../types/questionTypes';
import { Attempt, Quiz, Prompt, DiagramMetadata } from '../types';
import { submitAnswer, hasMinimalResponse } from '../utils/submitAnswerPipeline';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${minutes}:${String(secs).padStart(2, '0')}`;
}

const DEFAULT_TIME_PER_QUESTION_SEC = 30;
const MIN_QUIZ_TIME_SEC = 60;

/** Total quiz time = sum of per-question time allowances; falls back to quiz.timeLimitSec if none set.
 *  If the result would be 0 or invalid (e.g. quiz has timeLimitSec 0), uses a minimum so the quiz doesn't timeout immediately. */
function computeTotalQuizTimeSec(prompts: Prompt[], fallbackSec: number | undefined): number {
  const anyHaveAllowance = prompts.some(p => p.timeAllowanceSec != null && p.timeAllowanceSec > 0);
  let total =
    anyHaveAllowance
      ? prompts.reduce((s, p) => s + (p.timeAllowanceSec ?? DEFAULT_TIME_PER_QUESTION_SEC), 0)
      : (fallbackSec ?? 0);
  if (total <= 0 && prompts.length > 0) {
    total = Math.max(MIN_QUIZ_TIME_SEC, prompts.length * DEFAULT_TIME_PER_QUESTION_SEC);
  }
  return total;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function QuizPlayerPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const skipAutoCheckRef = useRef(false);
  const autoSubmitTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { confirm } = useConfirm();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [subjectName, setSubjectName] = useState<string | null>(null);
  const [quizPrompts, setQuizPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackAnimation, setFeedbackAnimation] = useState<'correct' | 'wrong' | null>(null);

  const isFixItMode = searchParams.get('mode') === 'fixit';

  // ========================================================================
  // UI STATE
  // ========================================================================
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
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [toolkitOpenWithTab, setToolkitOpenWithTab] = useState<'keyboard' | 'draw' | 'calculator' | null>(null);

  // ========================================================================
  // QUIZ STATE
  // ========================================================================
  const [currentInput, setCurrentInput] = useState('');
  const [solvedPrompts, setSolvedPrompts] = useState<Set<string>>(new Set());
  const [missedPrompts, setMissedPrompts] = useState<Set<string>>(new Set());

  // Keep a synchronous reference to solved prompt IDs so endQuiz() never reads stale React state
  const solvedPromptsRef = useRef<Set<string>>(new Set());

  // Keep the latest quiz prompts in a ref so endQuiz() can always compute totals (even from stale closures)
  const quizPromptsRef = useRef<any[]>([]);
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

  // ========================================================================
  // FEEDBACK STATE
  // ========================================================================
  const [answeredPrompts, setAnsweredPrompts] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [gradeResult, setGradeResult] = useState<any>(null);

  const currentPrompt = quizPrompts[currentPromptIndex];
  const isMathsSubject =
    (!!subjectName && /maths?|mathematics|further\s*maths?/i.test(subjectName)) ||
    quiz?.subjectId === '0d9b0cc0-1779-4097-a684-f41d5b994f50';
  const calculatorAllowed = currentPrompt?.calculatorAllowed === true || currentPrompt?.meta?.calculatorAllowed === true;
  // Check diagram_metadata field first, then fall back to meta.diagram for backward compatibility
  const diagramMetadata = (currentPrompt?.diagram_metadata || currentPrompt?.meta?.diagram) as DiagramMetadata | undefined;

  // ========================================================================
  // PROGRESS CALCULATION
  // ========================================================================
  const progressPercentage = quizPrompts.length > 0 
    ? Math.round((solvedPrompts.size / quizPrompts.length) * 100)
    : 0;

  // ========================================================================
  // EFFECTS
  // ========================================================================

  useEffect(() => {
    localStorage.setItem('mathsToolkit_open', toolkitOpen.toString());
  }, [toolkitOpen]);

  useEffect(() => {
    loadQuizData();
  }, [quizId]);

  // Reset solved prompts ref when starting a new quiz run
  useEffect(() => {
    solvedPromptsRef.current = new Set();
  }, [quizId, quizStartTime]);

  // Always keep the latest prompt list in a ref (interval callbacks can otherwise capture an older empty array)
  useEffect(() => {
    quizPromptsRef.current = quizPrompts as any[];
  }, [quizPrompts]);

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

  // Close calculator modal when question changes
  useEffect(() => {
    setCalculatorModalOpen(false);
  }, [currentPromptIndex]);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hasStarted && !hasEnded) {
        // Close calculator modal if open
        if (calculatorModalOpen) {
          setCalculatorModalOpen(false);
          return;
        }
        
        const shouldEnd = await confirm({
          title: 'End Quiz?',
          message: 'Are you sure you want to end this quiz? Your progress will be saved.',
          confirmLabel: 'End Quiz',
          cancelLabel: 'Continue',
        });
        if (shouldEnd) {
          endQuiz();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, hasEnded, confirm, calculatorModalOpen]);

  // ========================================================================
  // REAL-TIME ANSWER DETECTION
  // ========================================================================
  /**
   * Real-time validation: grade as the user types.
   *
   * Behaviour:
   * - If the answer becomes fully correct, auto-submit after 300ms.
   * - Incorrect answers do NOT auto-submit (user can still hit Submit manually).
   *
   * Implementation notes:
   * - Uses gradeFromRenderer so the logic matches manual submission and supports all question types.
   * - Skips one cycle after Maths Toolkit inserts text to avoid surprising auto-submits.
   */
  useEffect(() => {
    if (!currentPrompt || isSubmitting || showFeedback || !hasStarted || hasEnded) {
      return;
    }

    // If the toolkit inserted text, skip auto-check once to avoid surprise submits.
    if (skipAutoCheckRef.current) {
      skipAutoCheckRef.current = false;
      return;
    }

    // Don't auto-submit prompts that have already been answered.
    if (answeredPrompts.has(currentPrompt.id)) {
      return;
    }

    // Clear any pending auto-submit timeout
    if (autoSubmitTimeoutRef.current) {
      clearTimeout(autoSubmitTimeoutRef.current);
      autoSubmitTimeoutRef.current = null;
    }

    const grade = gradeFromRenderer(currentPrompt, currentInput);
    const isInputCorrect = grade.isCorrect;

    if (isInputCorrect && String(currentInput ?? '').trim().length > 0) {
      autoSubmitTimeoutRef.current = setTimeout(() => {
        handleSubmitAnswer();
      }, 300);
    }

    return () => {
      if (autoSubmitTimeoutRef.current) {
        clearTimeout(autoSubmitTimeoutRef.current);
        autoSubmitTimeoutRef.current = null;
      }
    };
  }, [currentInput, currentPrompt, isSubmitting, showFeedback, hasStarted, hasEnded, answeredPrompts]);

  // ========================================================================
  // HANDLERS
  // ========================================================================

  const toggleFocusMode = () => {
    const newValue = !focusMode;
    setFocusMode(newValue);
    localStorage.setItem('grade9_focus_mode', newValue.toString());
  };

  const toggleSpeedrunMode = () => {
    const newValue = !speedrunMode;
    setSpeedrunMode(newValue);
    localStorage.setItem('grade9_speedrun_mode', newValue.toString());
  };

  const toggleSounds = () => {
    const newValue = !soundsEnabled;
    setSoundsEnabled(newValue);
    soundSystem.setEnabled(newValue);
  };

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

  /** Advance to next question; safe to call from timeouts (uses functional update + always latest ref). */
  const advanceToNextQuestionRef = useRef<() => void>(() => {});
  advanceToNextQuestionRef.current = () => {
    setCurrentPromptIndex((prev) => {
      if (prev < quizPrompts.length - 1) return prev + 1;
      endQuiz();
      return prev;
    });
    setCurrentInput('');
    setShowFeedback(false);
    setFeedbackMessage('');
  };

  const handleGiveUp = () => {
    if (!currentPrompt || showFeedback) return;
    const correctDisplay = Array.isArray(currentPrompt.answers)
      ? currentPrompt.answers.join(', ')
      : (currentPrompt.answers?.[0] ?? '');
    const maxMarks = currentPrompt.marks ?? 1;
    setGradeResult({
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        correctAnswer: correctDisplay,
        summary: 'You gave up',
      },
    });
    setExplanation(currentPrompt.explanation ?? '');
    setShowFeedback(true);
    setAnsweredPrompts(prev => new Set([...prev, currentPrompt.id]));
    setMissedPrompts(prev => new Set([...prev, currentPrompt.id]));
    setCombo(0);
    setFeedbackAnimation('wrong');
    setTimeout(() => setFeedbackAnimation(null), 600);
  };

  /**
   * FIXED: New submit handler using centralized pipeline
   * WITH AUTO-ADVANCE: Automatically moves to next question when correct
   * WITH REAL-TIME DETECTION: Triggered automatically when correct answer is typed
   * 
   * Flow:
   * 1. Call submitAnswer pipeline (validates, grades, persists)
   * 2. Update UI state with result
   * 3. Play sounds and show animations
   * 4. Mark prompt as answered
   * 5. If CORRECT: Show feedback briefly (1.5s) then auto-advance to next question
   * 6. If WRONG: Show feedback with "Continue" button for manual advancement
   */
  const handleSubmitAnswer = async () => {
    if (!currentPrompt || isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      // ====================================================================
      // STEP 1: CALL CENTRALIZED SUBMIT PIPELINE
      // ====================================================================
      const result = await submitAnswer(
        currentPrompt,
        currentInput,
        quizId || '',
        quizStartTime
      );

      // ====================================================================
      // STEP 2: UPDATE UI STATE WITH RESULT
      // ====================================================================
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

      // ====================================================================
      // STEP 3: UPDATE COMBO, PLAY SOUNDS, SHOW ANIMATIONS
      // ====================================================================
      if (result.isCorrect) {
        // Update React state AND the ref (ref updates immediately; state may be stale until next render)
        solvedPromptsRef.current.add(currentPrompt.id);
        setSolvedPrompts(prev => new Set([...prev, currentPrompt.id]));
        setCombo(combo + 1);
        setShowXPPopup(true);
        setShowCheckmark(true);
        setFeedbackAnimation('correct');
        soundSystem.playCorrect();
        setTimeout(() => setFeedbackAnimation(null), 600);

        // ================================================================
        // AUTO-ADVANCE: Show correct feedback briefly then move to next question
        // (use ref so timeout always runs latest advance logic, no stale closure)
        // ================================================================
        setTimeout(() => {
          advanceToNextQuestionRef.current();
        }, 1000);
      } else {
        setMissedPrompts(prev => new Set([...prev, currentPrompt.id]));
        setCombo(0);
        setFeedbackAnimation('wrong');
        soundSystem.playWrong();
        setTimeout(() => setFeedbackAnimation(null), 600);
        // For incorrect answers, user must click Continue button to advance
      }
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
    (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = element;
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
        const subject = await db.getSubject(quizData.subjectId);
        setSubjectName(subject?.name ?? null);

        // Resolve prompts: explicit promptIds always win; otherwise paper_master or subject_master.
        let promptsData: Prompt[];
        if (quizData.promptIds?.length) {
          // Quiz has explicit prompt list (e.g. Maths hub full-paper or topic quiz) – use it.
          promptsData = await db.getPromptsByIds(quizData.promptIds);
        } else if (quizData.quizType === 'paper_master' && quizData.paperId) {
          promptsData = await db.getPromptsForPaperMasterQuiz(quizData.paperId);
        } else if (quizData.quizType === 'subject_master') {
          promptsData = await db.getPromptsForSubjectMasterQuiz(quizData.subjectId);
        } else {
          promptsData = [];
        }

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
        const totalTimeSec = computeTotalQuizTimeSec(promptsData, quizData.timeLimitSec);
        setTimeRemaining(totalTimeSec);
      }
    } catch (error) {
      console.error('Failed to load quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const endQuiz = () => {
    setHasEnded(true);

    // IMPORTANT: React state updates (setSolvedPrompts) may not have flushed yet when we end the quiz.
    // Use the ref to avoid reading stale values and accidentally saving 0/0 results.
    const correctIds = new Set<string>([...solvedPromptsRef.current, ...Array.from(solvedPrompts)]);

    // Anything not correct is treated as missed (includes wrong answers and unanswered prompts)
    const latestPrompts = (quizPromptsRef.current as any[]).length ? (quizPromptsRef.current as any[]) : quizPrompts;
    const allPromptIds = latestPrompts.map((p: any) => p.id);
    const missedIds = allPromptIds.filter(id => !correctIds.has(id));

    const totalCount = allPromptIds.length;
    const timeTakenSec = Math.floor((Date.now() - quizStartTime) / 1000);
    const accuracyPct = totalCount > 0 ? (correctIds.size / totalCount) * 100 : 0;

    const attemptId = `${quizId}-${quizStartTime}-${Date.now()}`;

    // Persist attempt in the shape that ResultsPage expects (see src/types/index.ts Attempt)
    const attempt: Attempt = {
      id: attemptId,
      quizId: quizId!,
      startedAt: new Date(quizStartTime).toISOString(),
      finishedAt: new Date().toISOString(),
      correctPromptIds: Array.from(correctIds),
      missedPromptIds: missedIds,
      timeTakenSec,
      accuracyPct,
    };

    try {
      storage.saveAttempt(attempt);
    } catch (error) {
      console.error('Failed to save attempt:', error);
    }

    navigate(`/results/${attemptId}`, { replace: true });
  };

  // ==============================================================================
  // RENDER: LOADING STATE
  // ========================================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'rgb(var(--bg))' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p style={{ color: 'rgb(var(--text))' }}>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz || quizPrompts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'rgb(var(--bg))' }}>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4" style={{ color: 'rgb(var(--text))' }}>Quiz not found</p>
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

  // ========================================================================
  // RENDER: QUIZ START SCREEN
  // ========================================================================

  if (!hasStarted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 overflow-auto quiz-player-bg"
        style={{ background: 'rgb(var(--bg))' }}
      >
        <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="card-elevated p-8 md:p-12 max-w-2xl w-full"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>
              {isFixItMode ? 'Fix-It Drill' : quiz.title}
            </h1>
            <p className="text-lg mb-8" style={{ color: 'rgb(var(--text-secondary))' }}>
              {quizPrompts.length} questions • {formatTime(timeRemaining)} time limit
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="card p-6">
                <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Questions</p>
                <p className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                  {quizPrompts.length}
                </p>
              </div>
              <div className="card p-6">
                <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Time Limit</p>
                <p className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                  {formatTime(timeRemaining)}
                </p>
              </div>
              <div className="card p-6">
                <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Total Marks</p>
                <p className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                  {quizPrompts.reduce((sum, p) => sum + (p.marks || 1), 0)}
                </p>
              </div>
              <div className="card p-6 sm:col-span-2">
                <p className="text-sm font-medium mb-2 text-gradient-elite">Grade 9 Target</p>
                <p className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                  {formatTime(quiz.grade9TargetSec)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={() => setHasStarted(true)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="btn-primary w-full py-4 text-lg"
              >
                {isFixItMode ? 'Start Drill' : 'Start Quiz'}
              </motion.button>
              <button
                onClick={() => navigate(-1)}
                className="btn-secondary w-full py-3"
              >
                Back
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // ========================================================================
  // RENDER: QUIZ PLAYER
  // ========================================================================

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 overflow-auto quiz-player-bg"
      style={{ background: 'rgb(var(--bg))' }}
    >
      <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
        {/* HEADER WITH PROGRESS BAR */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="card mb-6 sticky top-4 z-10"
        >
          <div className="relative">
            {/* PROGRESS BAR */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-t-xl overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  background: 'linear-gradient(90deg, rgb(var(--accent)), rgb(var(--success)))',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              {[25, 50, 75, 100].map((milestone) => (
                <div
                  key={milestone}
                  className="absolute top-0 bottom-0 w-1"
                  style={{
                    left: `${milestone}%`,
                    background: progressPercentage >= milestone ? 'white' : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>

            {/* HEADER CONTENT */}
            <div className="p-4 pt-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={async () => {
                    const confirmed = await confirm({
                      title: 'Quit Quiz?',
                      message: 'Your progress will not be saved.',
                      confirmLabel: 'Quit',
                      cancelLabel: 'Keep Going',
                      destructive: true,
                    });
                    if (confirmed) navigate(-1);
                  }}
                  className="p-2 rounded-lg transition-colors hover:bg-opacity-10"
                  style={{ color: 'rgb(var(--text))' }}
                >
                  <X size={24} />
                </motion.button>
                <div>
                  <h2 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
                    {isFixItMode ? 'Fix-It Drill' : quiz.title}
                  </h2>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {solvedPrompts.size} / {quizPrompts.length} • {Math.round(progressPercentage)}%
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE CONTROLS */}
              <div className="flex items-center gap-3">
                {!focusMode && (
                  <>
                    {speedrunMode && (
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <Zap size={16} className="text-yellow-600" />
                        <span className="text-xs font-bold text-yellow-600">SPEEDRUN</span>
                      </div>
                    )}

                    <motion.div
                      animate={{
                        scale: timeRemaining < 30 ? [1, 1.05, 1] : 1
                      }}
                      transition={{ repeat: timeRemaining < 30 ? Infinity : 0, duration: 1 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-xl"
                      style={{
                        background: timeRemaining < 30 ? 'rgb(var(--danger) / 0.1)' : 'rgb(var(--accent) / 0.1)',
                        color: timeRemaining < 30 ? 'rgb(var(--danger))' : 'rgb(var(--accent))',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      <Clock size={20} />
                      <span>{formatTime(timeRemaining)}</span>
                    </motion.div>
                  </>
                )}

                {isMathsSubject && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (toolkitOpen) {
                        setToolkitOpen(false);
                      } else {
                        setToolkitOpenWithTab('keyboard');
                        setToolkitOpen(true);
                      }
                    }}
                    className={`p-2 rounded-lg transition-colors ${
                      toolkitOpen
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    style={{ color: toolkitOpen ? undefined : 'rgb(var(--text))' }}
                    title="Maths Keyboard (powers, roots, symbols)"
                  >
                    <Keyboard size={20} />
                  </motion.button>
                )}

                <div className="flex items-center gap-1">
                  {currentPrompt && !showFeedback && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGiveUp}
                      className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors text-orange-600 dark:text-orange-400 text-sm font-medium"
                      title="Give up and see the answer"
                    >
                      <Flag size={18} />
                      <span className="hidden sm:inline">Give up</span>
                    </motion.button>
                  )}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      style={{ color: 'rgb(var(--text))' }}
                    >
                      <Settings size={20} />
                    </motion.button>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -10 }}
                        className="absolute right-0 top-12 w-56 card p-3 space-y-2 z-20"
                      >
                        <button
                          onClick={toggleFocusMode}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {focusMode ? <EyeOff size={16} /> : <Eye size={16} />}
                            <span className="text-sm font-medium">Focus Mode</span>
                          </div>
                          <div className={`w-10 h-5 rounded-full transition-colors ${focusMode ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <motion.div
                              className="w-4 h-4 bg-white rounded-full mt-0.5"
                              animate={{ x: focusMode ? 20 : 2 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </button>

                        <button
                          onClick={toggleSpeedrunMode}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Zap size={16} />
                            <span className="text-sm font-medium">Speedrun</span>
                          </div>
                          <div className={`w-10 h-5 rounded-full transition-colors ${speedrunMode ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <motion.div
                              className="w-4 h-4 bg-white rounded-full mt-0.5"
                              animate={{ x: speedrunMode ? 20 : 2 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </button>

                        <button
                          onClick={toggleSounds}
                          className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            {soundsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                            <span className="text-sm font-medium">Sounds</span>
                          </div>
                          <div className={`w-10 h-5 rounded-full transition-colors ${soundsEnabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <motion.div
                              className="w-4 h-4 bg-white rounded-full mt-0.5"
                              animate={{ x: soundsEnabled ? 20 : 2 }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* XP POPUP AND COMBO TRACKER */}
        {showXPPopup && <XPPopup xp={5} type="answer" position="input" />}
        <ComboTracker combo={combo} show={hasStarted && !hasEnded} />

        {/* MAIN CONTENT GRID */}
        <div className={`grid ${focusMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-6`}>
          {/* QUESTION CARD */}
          <div className={focusMode ? 'max-w-3xl mx-auto w-full' : 'lg:col-span-2'}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPromptIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className={`card-elevated p-8 md:p-12 relative ${
                  feedbackAnimation === 'correct' ? 'quiz-correct-pulse' : ''
                } ${feedbackAnimation === 'wrong' ? 'quiz-wrong-shake' : ''}`}
              >
                {/* CHECKMARK ANIMATION */}
                <AnimatePresence>
                  {showCheckmark && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-8 right-8 bg-green-500 rounded-full p-2"
                    >
                      <Check size={24} className="text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* QUESTION CONTENT */}
                <div className="mb-8">
                  {isMathsSubject && (
                    <div className="mb-4 flex items-center gap-3 flex-wrap">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setToolkitOpenWithTab('keyboard');
                          setToolkitOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-md"
                        style={{
                          background: 'rgb(var(--accent) / 0.15)',
                          color: 'rgb(var(--accent))',
                          border: '1px solid rgb(var(--accent) / 0.3)'
                        }}
                        title="Maths Keyboard (powers, roots, symbols)"
                      >
                        <Keyboard size={18} />
                        <span className="text-sm font-medium">Maths Keyboard</span>
                      </motion.button>
                      {calculatorAllowed && (
                        <>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <Wrench size={16} className="text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                              Calculator Available
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCalculatorModalOpen(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
                            title="Open Calculator"
                          >
                            <Calculator size={18} />
                            <span className="text-sm font-medium">Calculator</span>
                          </motion.button>
                        </>
                      )}
                    </div>
                  )}

                  {diagramMetadata && (!diagramMetadata.placement || diagramMetadata.placement === 'above') && (
                    isBearingsDiagram(diagramMetadata) && (currentPrompt?.type === 'numeric' || currentPrompt?.type === 'numericWithTolerance') ? (
                      <BearingsDiagramWithProtractor
                        metadata={diagramMetadata}
                        value={typeof currentInput === 'string' ? currentInput : ''}
                        onChange={(deg) => setCurrentInput(String(deg))}
                        disabled={isSubmitting}
                      />
                    ) : (
                      <DiagramRenderer metadata={diagramMetadata} />
                    )
                  )}

                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'rgb(var(--text))' }}>
                    {currentPrompt?.question ?? ""}
                  </h3>

                  {diagramMetadata && diagramMetadata.placement === 'below' && (
                    isBearingsDiagram(diagramMetadata) && (currentPrompt?.type === 'numeric' || currentPrompt?.type === 'numericWithTolerance') ? (
                      <BearingsDiagramWithProtractor
                        metadata={diagramMetadata}
                        value={typeof currentInput === 'string' ? currentInput : ''}
                        onChange={(deg) => setCurrentInput(String(deg))}
                        disabled={isSubmitting}
                      />
                    ) : (
                      <DiagramRenderer metadata={diagramMetadata} />
                    )
                  )}
                </div>

                {/* HINT */}
                <AnimatePresence>
                  {showHint && currentPrompt.hint && !speedrunMode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 rounded-xl"
                      style={{
                        background: 'rgb(var(--warning) / 0.1)',
                        border: '1px solid rgb(var(--warning) / 0.2)'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <Lightbulb size={20} style={{ color: 'rgb(var(--warning))' }} className="mt-0.5" />
                        <div>
                          <p className="font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Hint</p>
                          <p style={{ color: 'rgb(var(--text-secondary))' }}>{currentPrompt.hint}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* QUESTION RENDERER */}
                <QuestionRenderer
                  prompt={currentPrompt}
                  value={currentInput}
                  onChange={setCurrentInput}
                  disabled={isSubmitting}
                  showFeedback={showFeedback}
                  gradeResult={gradeResult}
                  onSubmit={handleSubmitAnswer}
                  inputRefCallback={inputRefCallback}
                />

                {/* SCRATCH PAD – doodle under the question */}
                <QuestionDoodlePad
                  sessionId={`${quiz?.id ?? 'quiz'}-${quizStartTime}`}
                  className="mt-4"
                />

                {/* NAVIGATION */}
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
                  submitDisabled={!hasMinimalResponse(currentInput, currentPrompt?.type ?? 'short')}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ANSWER SLOTS SIDEBAR */}
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

        {/* MATHS TOOLKIT */}
        {isMathsSubject && (
          <AnimatePresence>
            {toolkitOpen && (
              <MathsToolkit
                isOpen={toolkitOpen}
                onClose={() => setToolkitOpen(false)}
                calculatorAllowed={calculatorAllowed}
                attemptId={`${quiz.id}-${quizStartTime}`}
                inputRef={inputRef}
                openWithTab={toolkitOpenWithTab}
                onOpenWithTabHandled={() => setToolkitOpenWithTab(null)}
              />
            )}
          </AnimatePresence>
        )}

        {/* CALCULATOR MODAL */}
        {calculatorAllowed && (
          <CalculatorModal
            isOpen={calculatorModalOpen}
            onClose={() => setCalculatorModalOpen(false)}
            inputRef={inputRef}
          />
        )}
      </div>
    </motion.div>
  );
}

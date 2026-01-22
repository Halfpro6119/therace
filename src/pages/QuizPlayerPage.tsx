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
        const confirmed = await confirm({
          title: 'Quit Quiz?',
          message: 'Your progress will not be saved. Are you sure you want to quit?',
          confirmLabel: 'Quit',
          cancelLabel: 'Keep Going',
          destructive: true,
        });
        if (confirmed) {
          navigate(-1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasStarted, hasEnded, navigate, confirm]);

  const toggleFocusMode = () => {
    const newValue = !focusMode;
    setFocusMode(newValue);
    localStorage.setItem('grade9_focus_mode', String(newValue));
  };

  const toggleSpeedrunMode = () => {
    const newValue = !speedrunMode;
    setSpeedrunMode(newValue);
    localStorage.setItem('grade9_speedrun_mode', String(newValue));
  };

  const toggleSounds = () => {
    soundSystem.toggle();
    setSoundsEnabled(soundSystem.isEnabled());
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div style={{ color: 'rgb(var(--text-secondary))' }}>Loading quiz...</div>
      </div>
    );
  }

  if (!quiz) return <div>Quiz not found</div>;

  // Guard: quizzes can exist with 0 promptIds (or fetch may fail).
  // Never allow currentPrompt to be undefined (prevents runtime crashes).
  if (!currentPrompt) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div style={{ color: "rgb(var(--text-secondary))" }}>No questions found for this quiz.</div>
      </div>
    );
  }

  const masteryState = storage.getMasteryState(quiz.id);

  const startQuiz = () => {
    setHasStarted(true);
  };

  const handleInputChange = (value: string) => {
    setCurrentInput(value);

    if (!value.trim()) return;

    // Skip auto-check if value was inserted from calculator
    if (skipAutoCheckRef.current) {
      skipAutoCheckRef.current = false;
      return;
    }

    // Use robust answer validation
    if (!currentPrompt) return;
    const isCorrect = isAnswerCorrect(value, currentPrompt.answers);

    if (isCorrect) {
      soundSystem.playCorrect();
      setFeedbackAnimation('correct');
      setShowCheckmark(true);

      setTimeout(() => {
        setFeedbackAnimation(null);
        setShowCheckmark(false);
      }, 250);

      setCombo(prev => prev + 1);
      setShowXPPopup(true);
      setTimeout(() => setShowXPPopup(false), 1500);

      // Create new solved set with this question added
      if (!currentPrompt) return;
      const newSolvedPrompts = new Set([...solvedPrompts, currentPrompt.id]);
      setSolvedPrompts(newSolvedPrompts);

      setCurrentInput('');
      setShowHint(false);

      // Check if quiz is complete using the NEW solved count
      if (newSolvedPrompts.size === quizPrompts.length) {
        setTimeout(() => endQuizWithSolvedPrompts(newSolvedPrompts), 500);
      } else {
        setTimeout(() => moveToNextPrompt(), 200);
      }
    }
  };

  const checkAnswer = async () => {
    if (!currentInput.trim()) return;
    
    // Prevent race conditions: lock submission
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Use robust answer validation
      if (!currentPrompt) return;
      const isCorrect = isAnswerCorrect(currentInput, currentPrompt.answers);

      if (!isCorrect) {
        soundSystem.playWrong();
        setFeedbackAnimation('wrong');
        setTimeout(() => setFeedbackAnimation(null), 300);
        setCombo(0);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveToNextPrompt = () => {
    let nextIndex = (currentPromptIndex + 1) % quizPrompts.length;
    let attempts = 0;

    while (solvedPrompts.has(quizPrompts[nextIndex].id) && attempts < quizPrompts.length) {
      nextIndex = (nextIndex + 1) % quizPrompts.length;
      attempts++;
    }

    setCurrentPromptIndex(nextIndex);
  };

  const giveUp = async () => {
    const confirmed = await confirm({
      title: 'Give Up?',
      message: 'This will mark all remaining questions as missed and end the quiz.',
      confirmLabel: 'Give Up',
      cancelLabel: 'Keep Trying',
      destructive: true,
    });

    if (!confirmed) return;

    const unsolvedPrompts = quizPrompts.filter(p => !solvedPrompts.has(p.id));
    unsolvedPrompts.forEach(p => {
      setMissedPrompts(prev => new Set([...prev, p.id]));
    });
    endQuiz();
  };

  const handleRestart = async () => {
    const confirmed = await confirm({
      title: 'Restart Quiz?',
      message: 'Your current progress will be lost. Start fresh?',
      confirmLabel: 'Restart',
      cancelLabel: 'Cancel',
      destructive: false,
    });

    if (confirmed) {
      navigate(`/quiz/${quiz.id}`);
      window.location.reload();
    }
  };

  const endQuizWithSolvedPrompts = (finalSolvedPrompts: Set<string>) => {
    setHasEnded(true);

    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    const correctCount = finalSolvedPrompts.size;
    
    // Calculate missed prompts: any question not in finalSolvedPrompts
    const allPromptIds = new Set(quizPrompts.map(p => p.id));
    const calculatedMissedPrompts = new Set(
      Array.from(allPromptIds).filter(id => !finalSolvedPrompts.has(id))
    );
    
    // Use explicitly marked missed prompts if any, otherwise use calculated
    const finalMissedPrompts = missedPrompts.size > 0 ? missedPrompts : calculatedMissedPrompts;
    
    // Calculate accuracy based on total questions in this attempt
    const totalQuestionsInThisAttempt = finalSolvedPrompts.size + finalMissedPrompts.size;
    const accuracy = totalQuestionsInThisAttempt > 0 
      ? correctCount / totalQuestionsInThisAttempt 
      : 0;

    const attempt: Attempt = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      startedAt: new Date(quizStartTime).toISOString(),
      finishedAt: new Date().toISOString(),
      correctPromptIds: Array.from(finalSolvedPrompts),
      missedPromptIds: Array.from(finalMissedPrompts),
      timeTakenSec: timeTaken,
      accuracyPct: accuracy * 100,
    };

    storage.saveAttempt(attempt);
    storage.updateStreak();

    const xpGained = correctCount * 5;
    storage.addXP(xpGained);

    const profile = storage.getProfile();
    storage.updateProfile({
      totalQuizzes: profile.totalQuizzes + 1,
      totalTimeMinutes: profile.totalTimeMinutes + Math.floor(timeTaken / 60),
    });

    const existingMastery = masteryState || {
      quizId: quiz.id,
      bestAccuracyPct: 0,
      bestTimeSec: Infinity,
      masteryLevel: 0 as const,
      lastPlayedAt: new Date().toISOString(),
    };

    const newMastery = {
      ...existingMastery,
      bestAccuracyPct: Math.max(existingMastery.bestAccuracyPct, accuracy * 100),
      bestTimeSec: Math.min(existingMastery.bestTimeSec, timeTaken),
      lastPlayedAt: new Date().toISOString(),
    };

    const masteryInfo = calculateMasteryLevel(
      newMastery.bestAccuracyPct / 100,
      newMastery.bestTimeSec,
      quiz.grade9TargetSec
    );
    newMastery.masteryLevel = masteryInfo.level;

    storage.updateMasteryState(newMastery);

    if (masteryInfo.level === 3 && existingMastery.masteryLevel < 3) {
      storage.addBadge('First Mastered');
      const profile = storage.getProfile();
      storage.updateProfile({ masteredCount: profile.masteredCount + 1 });
    }

    if (masteryInfo.level === 4 && existingMastery.masteryLevel < 4) {
      soundSystem.playGrade9Finish();
      storage.addBadge('Grade 9 Speed');
      const profile = storage.getProfile();
      storage.updateProfile({ grade9SpeedCount: profile.grade9SpeedCount + 1 });
    }

    navigate(`/results/${attempt.id}`);
  };

  const endQuiz = () => {
    endQuizWithSolvedPrompts(solvedPrompts);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (solvedPrompts.size / quizPrompts.length) * 100;

  if (!hasStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="card-elevated p-8 md:p-12">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
                {quiz.title}
              </h1>
              <p style={{ color: 'rgb(var(--text-secondary))' }}>
                {isFixItMode ? 'Fix-It Drill • Practice your mistakes' : quiz.scopeType.charAt(0).toUpperCase() + quiz.scopeType.slice(1) + ' Quiz'}
              </p>
            </div>
            {masteryState && <MasteryChip level={masteryState.masteryLevel} size="lg" />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="card p-6">
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--accent))' }}>Questions</p>
              <p className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                {quizPrompts.length}
              </p>
            </div>
            <div className="card p-6">
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--success))' }}>Time Limit</p>
              <p className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                {formatTime(quiz.timeLimitSec)}
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
              onClick={startQuiz}
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
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 overflow-auto quiz-player-bg"
      style={{ background: 'rgb(var(--bg))' }}
    >
      <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="card mb-6 sticky top-4 z-10"
        >
          <div className="relative">
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
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setToolkitOpen(!toolkitOpen)}
                      className={`p-2 rounded-lg transition-colors ${
                        toolkitOpen
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          : calculatorAllowed
                          ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-400'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      style={{ color: (toolkitOpen || calculatorAllowed) ? undefined : 'rgb(var(--text))' }}
                      title={calculatorAllowed ? "Maths Toolkit (Calculator Available)" : "Maths Toolkit"}
                    >
                      <Wrench size={20} />
                    </motion.button>
                    {calculatorAllowed && !toolkitOpen && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800"
                      />
                    )}
                  </div>
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
        </motion.div>

        {showXPPopup && <XPPopup xp={5} type="answer" position="input" />}
        <ComboTracker combo={combo} show={hasStarted && !hasEnded} />

        <div className={`grid ${focusMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-6`}>
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

                <div className="mb-8">
                  {calculatorAllowed && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <Wrench size={16} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Calculator Available
                      </span>
                    </div>
                  )}

                  {diagramMetadata && (!diagramMetadata.placement || diagramMetadata.placement === 'above') && (
                    <DiagramRenderer metadata={diagramMetadata} />
                  )}

                  <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'rgb(var(--text))' }}>
                    {currentPrompt?.question ?? ""}
                  </h3>

                  {diagramMetadata && diagramMetadata.placement === 'below' && (
                    <DiagramRenderer metadata={diagramMetadata} />
                  )}
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      ref={inputRefCallback}
                      type="text"
                      value={currentInput}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') checkAnswer();
                      }}
                      placeholder="Type your answer..."
                      className={`quiz-input ${feedbackAnimation === 'correct' ? 'quiz-input-correct' : ''} ${feedbackAnimation === 'wrong' ? 'quiz-input-wrong' : ''}`}
                      autoComplete="off"
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck="false"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={checkAnswer}
                      className="btn-primary flex-1 py-4"
                      disabled={!currentInput.trim() || isSubmitting}
                    >
                      Submit
                    </motion.button>
                    {!speedrunMode && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowHint(!showHint)}
                        className="btn-secondary px-4"
                      >
                        <Lightbulb size={20} />
                      </motion.button>
                    )}
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        className="btn-secondary px-4"
                      >
                        <MoreHorizontal size={20} />
                      </motion.button>

                      <AnimatePresence>
                        {showMoreMenu && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="absolute right-0 top-14 w-48 card p-2 space-y-1 z-20"
                          >
                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                handleRestart();
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                            >
                              <RotateCcw size={16} />
                              Restart
                            </button>
                            <button
                              onClick={() => {
                                setShowMoreMenu(false);
                                giveUp();
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm text-red-600"
                            >
                              <Flag size={16} />
                              Give Up
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

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
              </motion.div>
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
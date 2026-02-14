/**
 * Science Lab Flashcard Page - Learn Mode (Merged)
 * Flow: Flashcard → Quick check (when related) → … → Bigger test (3–6 mark) after each topic
 */
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  AlertCircle,
  Lightbulb,
  GitBranch,
  Calculator,
  FlaskConical,
  AlertTriangle,
  BookOpen,
  FileQuestion,
  ArrowRight,
  Sparkles,
  XCircle,
} from 'lucide-react';
import {
  getFlashcardsGroupedByTopic,
  getQuickChecksByFilters,
  getQuickChecksForFlashcard,
  getBiggerTestQuestionsForTopic,
} from '../../config/scienceLabFlashcards';
import { FlashcardDiagram } from '../../components/FlashcardDiagram';
import { QuickCheckInline } from '../../components/science/QuickCheckInline';
import { storage } from '../../utils/storage';
import { soundSystem } from '../../utils/sounds';
import { gradeScienceAnswer } from '../../utils/scienceGrading';
import type {
  ScienceSubject,
  SciencePaper,
  ScienceTier,
  ConfidenceLevel,
  ScienceFlashcard,
  FlashcardType,
  ScienceQuickCheck,
  ScienceQuestion,
} from '../../types/scienceLab';

const SWIPE_THRESHOLD = 60;
const MIN_VIEW_MS = 500;
const TILT_MAX = 12;

type LearnStep =
  | { type: 'flashcard'; flashcard: ScienceFlashcard; topic: string; groupIndex: number }
  | { type: 'biggerTest'; topic: string; questions: ScienceQuestion[]; groupIndex: number };

const CARD_TYPE_STYLE: Record<FlashcardType, { icon: typeof Lightbulb; color: string; bgColor: string; label: string }> = {
  concept: { icon: Lightbulb, color: '#38BDF8', bgColor: 'rgba(56, 189, 248, 0.1)', label: 'Concept' },
  processChain: { icon: GitBranch, color: '#A78BFA', bgColor: 'rgba(167, 139, 250, 0.1)', label: 'Process' },
  equation: { icon: Calculator, color: '#FBBF24', bgColor: 'rgba(251, 191, 36, 0.1)', label: 'Equation' },
  practical: { icon: FlaskConical, color: '#34D399', bgColor: 'rgba(52, 211, 153, 0.1)', label: 'Practical' },
  misconception: { icon: AlertTriangle, color: '#F87171', bgColor: 'rgba(248, 113, 113, 0.1)', label: 'Misconception' },
  graph: { icon: GitBranch, color: '#818CF8', bgColor: 'rgba(129, 140, 248, 0.1)', label: 'Graph' },
};

const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  1: 'Again',
  2: 'Learning',
  3: 'Got it',
};

export function ScienceLabFlashcardPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [searchParams] = useSearchParams();
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<'flashcard' | 'quickCheck' | 'biggerTest'>('flashcard');
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewStartTime, setViewStartTime] = useState<number>(Date.now());
  const [sessionComplete, setSessionComplete] = useState(false);
  const [pendingQuickChecks, setPendingQuickChecks] = useState<ScienceQuickCheck[]>([]);
  const [quickCheckIndex, setQuickCheckIndex] = useState(0);
  const [biggerTestQuestionIndex, setBiggerTestQuestionIndex] = useState(0);
  const [biggerTestCorrectCount, setBiggerTestCorrectCount] = useState(0);
  const [biggerTestUserAnswer, setBiggerTestUserAnswer] = useState('');
  const [biggerTestShowFeedback, setBiggerTestShowFeedback] = useState(false);
  const [biggerTestIsCorrect, setBiggerTestIsCorrect] = useState(false);
  const answeredQuickCheckIds = useRef<Set<string>>(new Set());

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRotateX = useMotionValue(0);
  const tiltRotateY = useMotionValue(0);
  const tiltRotateXSpring = useSpring(tiltRotateX, { stiffness: 300, damping: 30 });
  const tiltRotateYSpring = useSpring(tiltRotateY, { stiffness: 300, damping: 30 });

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? (parseInt(paper) as SciencePaper) : 1;
  const tierValue = tier ? (tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier) : 'Higher';
  const topicFilter = searchParams.get('topic') ?? undefined;
  const normalizedSubject = subjectId ? (subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject) : 'Biology';
  const isValidSubject = subjectId && subject && ['biology', 'chemistry', 'physics'].includes(subject.toLowerCase());

  const groups = useMemo(
    () => getFlashcardsGroupedByTopic(normalizedSubject, paperNum, tierValue, topicFilter),
    [normalizedSubject, paperNum, tierValue, topicFilter]
  );

  const learnSteps = useMemo((): LearnStep[] => {
    const steps: LearnStep[] = [];
    groups.forEach((g, groupIndex) => {
      g.flashcards.forEach((f) => {
        steps.push({ type: 'flashcard', flashcard: f, topic: g.topic, groupIndex });
      });
      const biggerQuestions = getBiggerTestQuestionsForTopic(normalizedSubject, paperNum, tierValue, g.topic, 2);
      if (biggerQuestions.length > 0) {
        steps.push({ type: 'biggerTest', topic: g.topic, questions: biggerQuestions, groupIndex });
      }
    });
    return steps;
  }, [groups, normalizedSubject, paperNum, tierValue]);

  const quickChecksAll = useMemo(
    () => getQuickChecksByFilters(normalizedSubject, paperNum, tierValue, topicFilter),
    [normalizedSubject, paperNum, tierValue, topicFilter]
  );

  const currentStep = learnSteps[stepIndex];
  const currentFlashcard = currentStep?.type === 'flashcard' ? currentStep.flashcard : null;
  const currentQuickCheck = pendingQuickChecks[quickCheckIndex] ?? null;
  const currentBiggerTest = currentStep?.type === 'biggerTest' ? currentStep : null;
  const currentBiggerQuestion = currentBiggerTest?.questions[biggerTestQuestionIndex] ?? null;

  const totalFlashcards = learnSteps.filter((s) => s.type === 'flashcard').length;
  const currentFlashcardIndex = learnSteps
    .slice(0, stepIndex + 1)
    .filter((s) => s.type === 'flashcard').length;

  const handleBack = useCallback(() => {
    const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
    const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
    navigate(base + query);
  }, [navigate, subject, paperNum, tierValue, topicFilter]);

  const advanceStep = useCallback(() => {
    const current = learnSteps[stepIndex];
    if (current?.type === 'flashcard' && stepIndex < learnSteps.length - 1) {
      const next = learnSteps[stepIndex + 1];
      if (next?.type === 'biggerTest') {
        const topicFlashcards = groups
          .find((g) => g.topic === current.topic)
          ?.flashcards.map((f) => f.id) ?? [];
        const mastery = storage.calculateTopicFlashcardMastery(
          normalizedSubject,
          paperNum,
          tierValue,
          current.topic,
          topicFlashcards
        );
        const existing = storage.getTopicMasteryByKey(normalizedSubject, paperNum, tierValue, current.topic);
        storage.updateTopicMastery(
          normalizedSubject,
          paperNum,
          tierValue,
          current.topic,
          mastery,
          existing?.quickCheckPassed
        );
      }
    }
    if (stepIndex >= learnSteps.length - 1) {
      setSessionComplete(true);
      setPhase('flashcard');
      setPendingQuickChecks([]);
      setQuickCheckIndex(0);
      return;
    }
    const nextIndex = stepIndex + 1;
    const next = learnSteps[nextIndex];
    setStepIndex(nextIndex);
    setPendingQuickChecks([]);
    setQuickCheckIndex(0);
    if (next?.type === 'flashcard') {
      setPhase('flashcard');
      setIsFlipped(false);
    } else if (next?.type === 'biggerTest') {
      setPhase('biggerTest');
      setBiggerTestQuestionIndex(0);
      setBiggerTestCorrectCount(0);
      setBiggerTestUserAnswer('');
      setBiggerTestShowFeedback(false);
    }
  }, [stepIndex, learnSteps, groups, normalizedSubject, paperNum, tierValue]);

  const handleConfidence = useCallback(
    (level: ConfidenceLevel) => {
      if (!currentFlashcard || !isFlipped || phase !== 'flashcard') return;
      if (level === 3) soundSystem.playCorrect();
      storage.updateFlashcardMastery(currentFlashcard.id, level, true);

      const related = getQuickChecksForFlashcard(
        currentFlashcard.id,
        currentFlashcard.topic,
        quickChecksAll,
        true
      );
      const unseen = related.filter((q) => !answeredQuickCheckIds.current.has(q.id));
      if (unseen.length > 0) {
        setPendingQuickChecks(unseen);
        setQuickCheckIndex(0);
        setPhase('quickCheck');
      } else {
        advanceStep();
      }
    },
    [currentFlashcard, isFlipped, phase, quickChecksAll, advanceStep]
  );

  const handleQuickCheckComplete = useCallback(
    (correct: boolean) => {
      if (currentQuickCheck) {
        answeredQuickCheckIds.current.add(currentQuickCheck.id);
      }
      if (currentQuickCheck && correct) {
        const existing = storage.getTopicMasteryByKey(
          normalizedSubject,
          paperNum,
          tierValue,
          currentQuickCheck.topic
        );
        storage.updateTopicMastery(
          normalizedSubject,
          paperNum,
          tierValue,
          currentQuickCheck.topic,
          existing?.flashcardMastery ?? 0,
          true
        );
      }
      if (quickCheckIndex < pendingQuickChecks.length - 1) {
        setQuickCheckIndex((i) => i + 1);
      } else {
        advanceStep();
      }
    },
    [
      currentQuickCheck,
      quickCheckIndex,
      pendingQuickChecks.length,
      normalizedSubject,
      paperNum,
      tierValue,
      advanceStep,
    ]
  );

  const handleQuickCheckSkip = useCallback(() => {
    if (currentQuickCheck) {
      answeredQuickCheckIds.current.add(currentQuickCheck.id);
    }
    if (quickCheckIndex < pendingQuickChecks.length - 1) {
      setQuickCheckIndex((i) => i + 1);
    } else {
      advanceStep();
    }
  }, [currentQuickCheck, quickCheckIndex, pendingQuickChecks.length, advanceStep]);

  const handleBiggerTestSubmit = useCallback(() => {
    if (!currentBiggerQuestion || !currentBiggerTest) return;
    const result = gradeScienceAnswer(currentBiggerQuestion, biggerTestUserAnswer.trim());
    setBiggerTestIsCorrect(result.correct);
    setBiggerTestShowFeedback(true);
    if (result.correct) {
      setBiggerTestCorrectCount((c) => c + 1);
      soundSystem.playCorrect();
    }
  }, [currentBiggerQuestion, currentBiggerTest, biggerTestUserAnswer]);

  const handleBiggerTestNext = useCallback(() => {
    if (!currentBiggerTest) return;
    if (biggerTestQuestionIndex < currentBiggerTest.questions.length - 1) {
      setBiggerTestQuestionIndex((i) => i + 1);
      setBiggerTestUserAnswer('');
      setBiggerTestShowFeedback(false);
    } else {
      storage.updateBiggerTestCompletion(
        normalizedSubject,
        paperNum,
        tierValue,
        currentBiggerTest.topic,
        biggerTestCorrectCount + (biggerTestIsCorrect ? 1 : 0),
        currentBiggerTest.questions.length
      );
      advanceStep();
    }
  }, [
    currentBiggerTest,
    biggerTestQuestionIndex,
    biggerTestCorrectCount,
    biggerTestIsCorrect,
    normalizedSubject,
    paperNum,
    tierValue,
    advanceStep,
  ]);

  const handleFlip = useCallback(() => {
    if (isFlipped) {
      setIsFlipped(false);
    } else if (currentFlashcard) {
      if (Date.now() - viewStartTime < MIN_VIEW_MS) return;
      setIsFlipped(true);
    }
  }, [isFlipped, currentFlashcard, viewStartTime]);

  // Sync phase when stepIndex changes (e.g. from prev/next nav)
  useEffect(() => {
    const step = learnSteps[stepIndex];
    if (step?.type === 'flashcard') {
      setPhase('flashcard');
      setIsFlipped(false);
      setViewStartTime(Date.now());
    } else if (step?.type === 'biggerTest') {
      setPhase('biggerTest');
      setBiggerTestQuestionIndex(0);
      setBiggerTestCorrectCount(0);
      setBiggerTestUserAnswer('');
      setBiggerTestShowFeedback(false);
    }
  }, [stepIndex, learnSteps]);

  useEffect(() => {
    if (currentFlashcard && phase === 'flashcard') {
      setViewStartTime(Date.now());
    }
  }, [currentFlashcard?.id, phase]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (phase === 'flashcard' && currentFlashcard) {
        if (e.key === ' ') {
          e.preventDefault();
          if (isFlipped) setIsFlipped(false);
          else if (Date.now() - viewStartTime >= MIN_VIEW_MS) {
            setIsFlipped(true);
          }
        } else if (isFlipped && ['1', '2', '3'].includes(e.key)) {
          handleConfidence(parseInt(e.key) as ConfidenceLevel);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [phase, currentFlashcard, isFlipped, viewStartTime, handleConfidence]);

  if (!isValidSubject) {
    return (
      <div className="max-w-4xl mx-auto p-8" style={{ color: 'rgb(var(--text))' }}>
        <p>Invalid subject. Please select Biology, Chemistry, or Physics.</p>
        <button type="button" onClick={() => navigate('/science-lab')}>Go Back</button>
      </div>
    );
  }

  if (learnSteps.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'rgb(var(--bg))', color: 'rgb(var(--text))' }}>
        <div className="max-w-md w-full rounded-2xl p-8 text-center" style={{ background: 'rgb(var(--surface))', boxShadow: '0 4px 24px -4px rgb(0 0 0 / 0.08)' }}>
          <p className="mb-4">No flashcards available for this topic.</p>
          <button type="button" onClick={handleBack} className="px-4 py-2 rounded-lg font-medium" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}>Go Back</button>
        </div>
      </div>
    );
  }

  const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;

  // Completion screen
  if (sessionComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(180deg, rgb(var(--bg)) 0%, rgb(var(--surface-2)) 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full rounded-2xl p-8 text-center"
          style={{ background: 'rgb(var(--surface))', boxShadow: '0 4px 24px -4px rgb(0 0 0 / 0.08), 0 0 0 1px rgb(var(--border))' }}
        >
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>All done!</h1>
          <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
            You completed {totalFlashcards} cards with quick checks and bigger tests.
          </p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => topicFilter ? navigate(`${base}/topic-test?topic=${encodeURIComponent(topicFilter)}`) : navigate(`${base}/topics`)}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition hover:opacity-90"
              style={{ background: '#8B5CF6' }}
            >
              {topicFilter ? 'Topic Test →' : 'Browse Topics'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`${base}/question`)}
              className="w-full py-3 rounded-xl font-medium transition border"
              style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
            >
              Full GCSE Test
            </button>
            <button
              type="button"
              onClick={() => navigate(base + (topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : ''))}
              className="w-full py-3 rounded-xl font-medium transition hover:bg-black/5"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              Back to lab
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quick Check phase
  if (phase === 'quickCheck' && currentQuickCheck && pendingQuickChecks.length > 0) {
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, rgb(var(--bg)) 0%, rgb(var(--surface-2)) 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center justify-between mb-6">
            <button type="button" onClick={handleBack} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
              <ChevronLeft size={18} /> Back
            </button>
            <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              Quick check {quickCheckIndex + 1} of {pendingQuickChecks.length}
            </span>
          </div>
          <QuickCheckInline
            check={currentQuickCheck}
            onComplete={handleQuickCheckComplete}
            onSkip={handleQuickCheckSkip}
            compact
          />
        </div>
      </div>
    );
  }

  // Bigger Test phase
  if (phase === 'biggerTest' && currentBiggerTest && currentBiggerQuestion) {
    const isLastQuestion = biggerTestQuestionIndex === currentBiggerTest.questions.length - 1;
    return (
      <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, rgb(var(--bg)) 0%, rgb(var(--surface-2)) 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center justify-between mb-6">
            <button type="button" onClick={handleBack} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
              <ChevronLeft size={18} /> Back
            </button>
            <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
              Bigger test: {currentBiggerTest.topic} — Question {biggerTestQuestionIndex + 1} of {currentBiggerTest.questions.length}
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-6 border"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <div className="flex items-center gap-2 mb-4">
              <FileQuestion size={20} style={{ color: '#8B5CF6' }} />
              <span className="text-xs font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
                {currentBiggerQuestion.marks} marks
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgb(var(--text))' }}>
              {currentBiggerQuestion.question}
            </h3>
            {!biggerTestShowFeedback && (
              <>
                <textarea
                  value={biggerTestUserAnswer}
                  onChange={(e) => setBiggerTestUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full p-4 rounded-lg border resize-none mb-4"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                  rows={4}
                />
                <button
                  type="button"
                  onClick={handleBiggerTestSubmit}
                  disabled={!biggerTestUserAnswer.trim()}
                  className="w-full py-3 rounded-lg font-semibold text-white transition disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' }}
                >
                  Submit Answer
                </button>
              </>
            )}
            {biggerTestShowFeedback && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <div
                  className={`p-4 rounded-lg flex items-start gap-3 ${
                    biggerTestIsCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  {biggerTestIsCorrect ? <Sparkles size={24} className="text-green-600 flex-shrink-0" /> : <XCircle size={24} className="text-red-600 flex-shrink-0" />}
                  <div>
                    <p className="font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>
                      {biggerTestIsCorrect ? "That's right!" : 'Not quite'}
                    </p>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {biggerTestIsCorrect ? currentBiggerQuestion.feedback.correct : currentBiggerQuestion.feedback.incorrect}
                    </p>
                    {!biggerTestIsCorrect && (
                      <p className="text-sm mt-2" style={{ color: 'rgb(var(--text))' }}>
                        Model answer: {Array.isArray(currentBiggerQuestion.correctAnswer) ? currentBiggerQuestion.correctAnswer[0] : currentBiggerQuestion.correctAnswer}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleBiggerTestNext}
                  className="w-full mt-4 py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2"
                  style={{ background: '#10B981' }}
                >
                  {isLastQuestion ? 'Continue to next topic' : 'Next Question'}
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Bigger test with 0 questions - skip (effect handles this)

  // Flashcard phase
  if (!currentFlashcard) return null;

  const typeStyle = CARD_TYPE_STYLE[currentFlashcard.type] ?? CARD_TYPE_STYLE.concept;
  const TypeIcon = typeStyle.icon;
  const processSteps = currentFlashcard.back.explanation.includes('→')
    ? currentFlashcard.back.explanation.split('→').map((s) => s.trim()).filter(Boolean)
    : null;
  const visualType = currentFlashcard.front.visual?.type;
  const isEquationVisual = visualType === 'equation';

  const progressLabel =
    currentStep?.type === 'flashcard'
      ? `Learn: ${currentStep.topic} — Card ${currentFlashcardIndex} of ${totalFlashcards}`
      : '';

  /** Flashcard steps from current+1 until next biggerTest (for deck preview) */
  const upcomingFlashcardsUntilTest = useMemo(() => {
    const upcoming: LearnStep[] = [];
    for (let i = stepIndex + 1; i < learnSteps.length; i++) {
      const step = learnSteps[i];
      if (step.type === 'biggerTest') break;
      upcoming.push(step);
    }
    return upcoming;
  }, [learnSteps, stepIndex]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'rgb(var(--bg))' }}>
      <div className="flex-1 w-full max-w-4xl mx-auto px-5 sm:px-6 py-6 sm:py-8 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <button type="button" onClick={handleBack} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
            <ChevronLeft size={18} /> Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium tabular-nums" style={{ color: 'rgb(var(--text-secondary))' }}>
              {progressLabel || `${currentFlashcardIndex} / ${totalFlashcards}`}
            </span>
            <div className="flex gap-1 max-w-48 overflow-x-auto py-1">
              {learnSteps.slice(0, 40).map((s, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-2 h-2 rounded-full"
                  style={{
                    background: i === stepIndex ? typeStyle.color : 'rgb(var(--border))',
                    opacity: i === stepIndex ? 1 : 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          ref={cardRef}
          className="relative w-full flex-1 flex flex-col cursor-pointer select-none overflow-visible"
          style={{ minHeight: 580, perspective: 1400 }}
          onClick={handleFlip}
          onMouseMove={(e) => {
            const el = cardRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            tiltRotateX.set((0.5 - y) * TILT_MAX * 2);
            tiltRotateY.set((x - 0.5) * TILT_MAX * 2);
          }}
          onMouseLeave={() => { tiltRotateX.set(0); tiltRotateY.set(0); }}
          onTouchStart={(e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
          onTouchEnd={(e) => {
            if (!touchStart.current) return;
            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            const dy = e.changedTouches[0].clientY - touchStart.current.y;
            touchStart.current = null;
            if (Math.abs(dy) > SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx) && dy < 0) {
              if (!isFlipped && Date.now() - viewStartTime >= MIN_VIEW_MS) setIsFlipped(true);
              else if (isFlipped) setIsFlipped(false);
            } else if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
              if (dx > 0 && stepIndex > 0) setStepIndex(stepIndex - 1);
              else if (dx < 0 && stepIndex < learnSteps.length - 1) setStepIndex(stepIndex + 1);
            }
          }}
        >
          {/* Lightweight card-like previews – stacked top-right (behind main card) */}
          {upcomingFlashcardsUntilTest.slice(0, 3).map((step, i) => {
            if (step.type !== 'flashcard') return null;
            const style = CARD_TYPE_STYLE[step.flashcard.type] ?? CARD_TYPE_STYLE.concept;
            const offset = (i + 1) * 8;
            return (
              <div
                key={`preview-${step.flashcard.id}-${i}`}
                className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{
                  zIndex: -1 - i,
                  transform: `translate(${offset}px, -${offset}px)`,
                  transformOrigin: 'top left',
                }}
              >
                <div
                  className="w-full h-full rounded-[20px]"
                  style={{
                    background: 'rgb(var(--surface))',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.04)',
                    borderLeft: `4px solid ${style.color}`,
                  }}
                />
              </div>
            );
          })}
          {/* Main card – tilt + flip for clean 3D flip */}
          <motion.div
            className="absolute inset-0 z-10"
            style={{ transformStyle: 'preserve-3d', rotateX: tiltRotateXSpring, rotateY: tiltRotateYSpring }}
          >
            <motion.div
              key={currentFlashcard.id}
              className="absolute inset-0"
              style={{ transformStyle: 'preserve-3d' }}
              initial={false}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            >
              {/* Front */}
              <div
                className="flashcard-face absolute inset-0 rounded-[20px] overflow-hidden flex flex-col"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  background: 'rgb(var(--surface))',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.04)',
                  borderLeft: `5px solid ${typeStyle.color}`,
                }}
              >
                <div className="flex-1 min-h-0 overflow-y-auto px-8 py-10 sm:px-10 sm:py-12 flex flex-col justify-center text-center">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide"
                      style={{ background: typeStyle.bgColor, color: typeStyle.color }}
                    >
                      <TypeIcon size={14} strokeWidth={2.5} />
                      {typeStyle.label}
                    </span>
                    <span className="text-xs font-medium tracking-wide" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {currentFlashcard.topic}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold leading-[1.35] max-w-2xl mx-auto mb-8" style={{ color: 'rgb(var(--text))', letterSpacing: '-0.01em' }}>
                    {currentFlashcard.front.prompt}
                  </h2>
                  {currentFlashcard.front.visual && (
                    <div className="flashcard-visual mx-auto w-full max-w-2xl flex-1 flex flex-col min-h-[220px]">
                      {isEquationVisual ? (
                        <p className="text-2xl sm:text-3xl font-mono font-bold py-4" style={{ color: typeStyle.color }}>{currentFlashcard.front.visual.description}</p>
                      ) : currentFlashcard.front.visual.diagramId ? (
                        <div className="science-flashcard-diagram science-flashcard-diagram-front">
                          <FlashcardDiagram slug={currentFlashcard.front.visual.diagramId} description={currentFlashcard.front.visual.description} fitToContainer />
                        </div>
                      ) : (
                        <p className="text-[15px] leading-[1.6] py-2" style={{ color: 'rgb(var(--text))' }}>{currentFlashcard.front.visual.description}</p>
                      )}
                    </div>
                  )}
                  <p className="text-xs font-medium mt-6 tracking-wider uppercase" style={{ color: 'rgb(var(--text-secondary))', opacity: 0.8 }}>Tap or press Space to reveal</p>
                </div>
              </div>

              {/* Back */}
              <div
                className="flashcard-face absolute inset-0 rounded-[20px] overflow-hidden flex flex-col"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: 'rgb(var(--surface))',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.04)',
                  borderLeft: `5px solid ${typeStyle.color}`,
                }}
              >
                <div className="flex-1 min-h-0 flex flex-col px-8 py-10 sm:px-10 sm:py-12">
                  <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-5">
                    <div>
                      <p className="text-[11px] font-semibold mb-2 uppercase tracking-[0.08em]" style={{ color: typeStyle.color }}>Answer</p>
                      {processSteps ? (
                        <div className="space-y-2">
                          {processSteps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-4">
                              <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold" style={{ background: typeStyle.bgColor, color: typeStyle.color }}>
                                {idx + 1}
                              </span>
                              <p className="text-[15px] leading-[1.6] pt-0.5" style={{ color: 'rgb(var(--text))' }}>{step}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p
                          className={
                            currentFlashcard.type === 'equation' && currentFlashcard.back.explanation.includes('=') && currentFlashcard.back.explanation.length < 60
                              ? 'text-2xl font-mono font-bold'
                              : 'text-[15px] leading-[1.65]'
                          }
                          style={{ color: 'rgb(var(--text))' }}
                        >
                          {currentFlashcard.back.explanation}
                        </p>
                      )}
                    </div>
                    {currentFlashcard.back.keyTerms.length > 0 && (
                      <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                        {currentFlashcard.back.keyTerms.map((term, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(term)}
                            className="px-3 py-1.5 rounded-lg text-[13px] font-medium"
                            style={{ background: typeStyle.bgColor, color: typeStyle.color }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    )}
                    {currentFlashcard.back.misconceptionWarning && (
                      <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(251, 191, 36, 0.1)' }}>
                        <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <div>
                          <p className="text-[13px] font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Common mistake</p>
                          <p className="text-[13px] leading-[1.5]" style={{ color: 'rgb(var(--text-secondary))' }}>{currentFlashcard.back.misconceptionWarning}</p>
                        </div>
                      </div>
                    )}
                    {currentFlashcard.back.example && (
                      <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(59, 130, 246, 0.06)' }}>
                        <BookOpen size={18} className="text-blue-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <div>
                          <p className="text-[13px] font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Example</p>
                          <p className="text-[13px] leading-[1.5]" style={{ color: 'rgb(var(--text-secondary))' }}>{currentFlashcard.back.example}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {isFlipped && (
          <div className="mt-6 p-6 rounded-2xl w-full" style={{ background: 'rgb(var(--surface))', border: '1px solid rgb(var(--border))' }}>
            <p className="text-[11px] font-semibold mb-4 uppercase tracking-[0.08em]" style={{ color: 'rgb(var(--text-secondary))' }}>Rate & continue</p>
            <div className="flex gap-3">
              {([1, 2, 3] as ConfidenceLevel[]).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleConfidence(level)}
                  className="flex-1 min-h-[88px] py-6 px-6 flex items-center justify-center cursor-pointer touch-manipulation select-none rounded-xl font-semibold text-[16px] text-white transition active:scale-[0.97]"
                  style={{ background: level === 3 ? '#10B981' : level === 2 ? '#F59E0B' : '#EF4444' }}
                >
                  {CONFIDENCE_LABELS[level]}
                </button>
              ))}
            </div>
            <p className="text-[11px] mt-3 text-center" style={{ color: 'rgb(var(--text-secondary))', opacity: 0.8 }}>Or press 1, 2, or 3</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-8 gap-4">
          <motion.button
            type="button"
            onClick={() => stepIndex > 0 && setStepIndex(stepIndex - 1)}
            disabled={stepIndex === 0}
            className="p-4 rounded-xl disabled:opacity-30 min-w-[48px] min-h-[48px] flex items-center justify-center"
            style={{ color: 'rgb(var(--text))' }}
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setIsFlipped((p) => !p)}
            className="text-[14px] font-semibold px-6 py-3 rounded-xl"
            style={{ color: 'rgb(var(--text-secondary))', background: 'rgb(var(--surface-2))' }}
          >
            <RotateCcw size={18} strokeWidth={2.5} className="inline mr-2 -mt-0.5" /> Flip
          </motion.button>
          <motion.button
            type="button"
            onClick={() => stepIndex < learnSteps.length - 1 && setStepIndex(stepIndex + 1)}
            disabled={stepIndex === learnSteps.length - 1}
            className="p-4 rounded-xl disabled:opacity-30 min-w-[48px] min-h-[48px] flex items-center justify-center"
            style={{ color: 'rgb(var(--text))' }}
          >
            <ChevronRight size={24} strokeWidth={2.5} />
          </motion.button>
        </div>
        <p className="text-center text-xs mt-3" style={{ color: 'rgb(var(--text-secondary))' }}>
          Tap card to flip · Swipe left/right · 1 2 3 to rate
        </p>
      </div>
    </div>
  );
}

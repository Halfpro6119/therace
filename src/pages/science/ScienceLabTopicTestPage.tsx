import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  XCircle,
  Calculator,
  BookOpen,
  Sparkles,
  ArrowRight,
  Layers,
  Clock,
  ClipboardList,
} from 'lucide-react';
import { getTopicTestItems, getTopicsByPaperAndTier } from '../../config/scienceLabFlashcards';
import { gradeScienceAnswer, gradeMethodMarkAnswer } from '../../utils/scienceGrading';
import { getMethodMarkBreakdown } from '../../config/scienceLabData';
import { storage } from '../../utils/storage';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../types/scienceLab';

const COMMAND_WORDS = ['State', 'Describe', 'Explain', 'Evaluate', 'Compare', 'Suggest', 'Calculate'];
function inferCommandWord(questionText: string): string | null {
  const first = questionText.trim().split(/\s+/)[0];
  return COMMAND_WORDS.find((w) => first?.startsWith(w)) ?? null;
}

function getItemMarks(item: { type: string; data: { marks?: number } }): number {
  return item.type === 'question' ? (item.data.marks ?? 1) : 1;
}

export function ScienceLabTopicTestPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [searchParams] = useSearchParams();
  const topicParam = searchParams.get('topic');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [dragOrder, setDragOrder] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [marksEarned, setMarksEarned] = useState(0);
  const [extendedMarksEarned, setExtendedMarksEarned] = useState(0);
  const [extendedMarksTotal, setExtendedMarksTotal] = useState(0);
  const [methodMarkResult, setMethodMarkResult] = useState<{
    obtained: { description: string; marks: number }[];
    missed: { description: string; marks: number }[];
    score: number;
    totalMarks: number;
  } | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [timedMode, setTimedMode] = useState(false);
  const [timeRemainingSec, setTimeRemainingSec] = useState(0);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? (parseInt(paper) as SciencePaper) : 1;
  const tierValue = tier ? (tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier) : 'Higher';
  const normalizedSubject = subjectId ? (subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject) : 'Biology';

  const items = useMemo(() => {
    if (!topicParam) return [];
    return getTopicTestItems(normalizedSubject, paperNum, tierValue, topicParam);
  }, [normalizedSubject, paperNum, tierValue, topicParam]);

  const totalMarks = useMemo(() => items.reduce((s, i) => s + getItemMarks(i), 0), [items]);
  const currentItem = items[currentIndex];
  const isQuickCheck = currentItem?.type === 'quickCheck';
  const quickCheck = isQuickCheck ? currentItem.data : null;
  const question = currentItem?.type === 'question' ? currentItem.data : null;

  useEffect(() => {
    if (quickCheck?.type === 'dragOrder' && quickCheck.options) {
      setDragOrder([...quickCheck.options]);
    }
    setSelectedAnswer(null);
    setUserAnswer('');
    setShowFeedback(false);
    setMethodMarkResult(null);
  }, [currentIndex, quickCheck?.id]);

  useEffect(() => {
    if (topicParam && items.length > 0) {
      storage.setLastTopicTestTopic(normalizedSubject, paperNum, tierValue, topicParam);
    }
  }, [topicParam, items.length, normalizedSubject, paperNum, tierValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputFocused =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.getAttribute('contenteditable') === 'true';
      if (isInputFocused) return;

      const isMcq = quickCheck && (quickCheck.type === 'multipleChoice' || quickCheck.type === 'trueFalse') && quickCheck.options;
      if (!isMcq || showFeedback) return;

      const key = e.key;
      const num = key >= '1' && key <= '9' ? parseInt(key, 10) : 0;
      if (num >= 1 && num <= quickCheck.options!.length) {
        e.preventDefault();
        setSelectedAnswer(quickCheck.options![num - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickCheck, showFeedback]);

  // Enter: submit selected answer (MCQ/quick check) or move to next question when feedback shown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return;
      const isInputFocused =
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.getAttribute('contenteditable') === 'true';
      if (isInputFocused) return;

      if (showFeedback) {
        e.preventDefault();
        handleNext();
      } else if (isQuickCheck && quickCheck && selectedAnswer !== null) {
        e.preventDefault();
        handleSubmitQuickCheck();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFeedback, isQuickCheck, quickCheck, selectedAnswer, currentIndex, items.length]);

  const marksEarnedRef = useRef(marksEarned);
  marksEarnedRef.current = marksEarned;
  const timerStartedRef = useRef(false);

  useEffect(() => {
    if (!timedMode || timeRemainingSec <= 0 || showSummary || timerStartedRef.current) return;
    timerStartedRef.current = true;
    const id = setInterval(() => {
      setTimeRemainingSec((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          storage.updateTopicTestCompletion(
            normalizedSubject,
            paperNum,
            tierValue,
            topicParam!,
            marksEarnedRef.current,
            totalMarks
          );
          setShowSummary(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timedMode, timeRemainingSec, showSummary, normalizedSubject, paperNum, tierValue, topicParam, totalMarks]);

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>Invalid subject. Please select Biology, Chemistry, or Physics.</p>
        <button type="button" onClick={() => navigate('/science-lab')}>Go Back</button>
      </div>
    );
  }

  const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;

  if (!topicParam) {
    const topics = getTopicsByPaperAndTier(normalizedSubject, paperNum, tierValue);
    const topicsWithData = topics
      .map((t) => {
        const items = getTopicTestItems(normalizedSubject, paperNum, tierValue, t);
        const marks = items.reduce((s, i) => s + getItemMarks(i), 0);
        const extendedCount = items.filter((i) => i.type === 'question' && i.data.marks >= 4).length;
        const m = storage.getTopicMasteryByKey(normalizedSubject, paperNum, tierValue, t);
        return {
          topic: t,
          questionCount: items.length,
          totalMarks: marks,
          extendedCount,
          score: m?.topicTestScore,
          completed: m?.topicTestCompleted ?? false,
          lastAttempt: m?.topicTestLastAttempt,
        };
      })
      .filter((d) => d.questionCount > 0);
    const firstIncomplete = topicsWithData.find((d) => !d.completed)?.topic ?? topicsWithData[0]?.topic;
    const lastTopicFromStorage = storage.getLastTopicTestTopic(normalizedSubject, paperNum, tierValue);
    const whereLeftOffTopic =
      (lastTopicFromStorage && topicsWithData.some((d) => d.topic === lastTopicFromStorage) ? lastTopicFromStorage : null) ??
      topicsWithData
        .filter((d) => d.lastAttempt)
        .sort((a, b) => (b.lastAttempt ?? '').localeCompare(a.lastAttempt ?? ''))[0]?.topic ??
      firstIncomplete;

    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto p-6 sm:p-10">
          <button
            type="button"
            onClick={() => navigate(base)}
            className="flex items-center gap-2 text-sm font-medium mb-8 transition hover:opacity-80"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            <ChevronLeft size={18} />
            Back to Lab
          </button>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2" style={{ color: 'rgb(var(--text))' }}>
              Topic Test
            </h1>
            <p className="text-base sm:text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
              Choose a topic. Mini GCSE paper — recall, explanation & extended response.
            </p>
          </motion.div>

          {whereLeftOffTopic && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              type="button"
              onClick={() => navigate(`${base}/topic-test?topic=${encodeURIComponent(whereLeftOffTopic)}`)}
              className="w-full mb-6 px-6 py-4 rounded-xl border-2 text-left font-semibold flex items-center justify-between transition hover:shadow-md hover:border-indigo-500/50"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
                color: 'rgb(var(--text))',
              }}
            >
              <span>Return where you left off — {whereLeftOffTopic}</span>
              <ArrowRight size={20} strokeWidth={2.5} style={{ color: 'rgb(var(--text-secondary))' }} />
            </motion.button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topicsWithData.map((d, i) => {
              const isRecommended = d.topic === firstIncomplete && !d.completed;
              return (
                <motion.button
                  key={d.topic}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  type="button"
                  onClick={() => navigate(`${base}/topic-test?topic=${encodeURIComponent(d.topic)}`)}
                  className="group relative p-6 rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(var(--bg))]"
                  style={{
                    background: 'rgb(var(--surface))',
                    border: `2px solid ${isRecommended ? 'rgb(34 197 94)' : 'rgb(var(--border))'}`,
                    boxShadow: isRecommended
                      ? '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(34 197 94 / 0.3)'
                      : '0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold mb-2 group-hover:text-indigo-400 transition-colors" style={{ color: 'rgb(var(--text))' }}>
                        {d.topic}
                      </h2>
                      <div className="flex flex-wrap gap-3 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                        <span>{d.questionCount} questions</span>
                        <span>•</span>
                        <span>{d.totalMarks} marks</span>
                        {d.extendedCount > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-amber-400">{d.extendedCount} extended (4–6 mark)</span>
                          </>
                        )}
                      </div>
                      {d.completed && d.score != null && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: 'rgb(var(--surface-2))' }}>
                          <span className="text-xs font-semibold">Last score:</span>
                          <span
                            className="text-sm font-bold"
                            style={{
                              color: d.score >= 70 ? 'rgb(34 197 94)' : d.score >= 50 ? 'rgb(251 146 60)' : 'rgb(239 68 68)',
                            }}
                          >
                            {d.score}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1"
                      style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}
                    >
                      <ArrowRight size={20} strokeWidth={2.5} />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const handleSubmitQuickCheck = () => {
    if (!quickCheck || selectedAnswer === null) return;
    let correct = false;
    if (quickCheck.type === 'dragOrder') {
      const correctOrder = Array.isArray(quickCheck.correctAnswer)
        ? quickCheck.correctAnswer
        : [quickCheck.correctAnswer];
      correct = JSON.stringify(dragOrder) === JSON.stringify(correctOrder);
    } else {
      const correctAns = Array.isArray(quickCheck.correctAnswer)
        ? quickCheck.correctAnswer[0]
        : quickCheck.correctAnswer;
      correct = selectedAnswer === correctAns;
    }
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setMarksEarned((m) => m + 1);
  };

  const handleSubmitQuestion = () => {
    if (!question) return;
    const marks = question.marks ?? 1;
    const breakdown = marks >= 4 ? getMethodMarkBreakdown(question.id) : undefined;

    if (breakdown) {
      const result = gradeMethodMarkAnswer(breakdown, userAnswer);
      setMarksEarned((m) => m + result.score);
      setExtendedMarksEarned((e) => e + result.score);
      setExtendedMarksTotal((e) => e + result.totalMarks);
      setMethodMarkResult(result);
      setIsCorrect(result.score === result.totalMarks);
    } else {
      const result = gradeScienceAnswer(question, userAnswer);
      const earned = result.correct ? marks : 0;
      setMarksEarned((m) => m + earned);
      if (marks >= 4) {
        setExtendedMarksEarned((e) => e + earned);
        setExtendedMarksTotal((e) => e + marks);
      }
      setIsCorrect(result.correct);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      storage.updateTopicTestCompletion(
        normalizedSubject,
        paperNum,
        tierValue,
        topicParam,
        marksEarned,
        totalMarks
      );
      setShowSummary(true);
    }
  };

  const handleDragOrder = (fromIndex: number, toIndex: number) => {
    if (showFeedback) return;
    const newOrder = [...dragOrder];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    setDragOrder(newOrder);
    setSelectedAnswer(newOrder);
  };

  // Summary screen
  if (showSummary) {
    const percent = totalMarks > 0 ? Math.round((marksEarned / totalMarks) * 100) : 0;
    const gradeColor = percent >= 70 ? 'rgb(34 197 94)' : percent >= 50 ? 'rgb(251 146 60)' : 'rgb(239 68 68)';
    const gradeLabel = percent >= 70 ? 'Strong!' : percent >= 50 ? 'Good progress' : 'Keep practicing';

    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="rounded-3xl p-8 sm:p-12 text-center overflow-hidden relative"
            style={{
              background: 'rgb(var(--surface))',
              border: '1px solid rgb(var(--border))',
              boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.4)',
            }}
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${gradeColor}, transparent 60%)`,
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              <Sparkles size={40} className="mx-auto mb-4" style={{ color: gradeColor }} />
              <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                {topicParam} — Complete
              </h1>
              <p className="text-sm mb-8" style={{ color: 'rgb(var(--text-secondary))' }}>
                {gradeLabel}
              </p>
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
                className="text-5xl sm:text-6xl font-bold mb-2 tabular-nums"
                style={{ color: gradeColor }}
              >
                {marksEarned} / {totalMarks}
              </motion.p>
              <p className="text-xl font-semibold mb-8" style={{ color: 'rgb(var(--text-secondary))' }}>
                {percent}%
              </p>
              {extendedMarksTotal > 0 && (
                <p className="text-sm mb-8 px-4 py-2 rounded-xl inline-block" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}>
                  Extended questions: {extendedMarksEarned}/{extendedMarksTotal} marks
                </p>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center flex-wrap"
          >
            <button
              type="button"
              onClick={() => navigate(`${base}/topic-test`)}
              className="px-6 py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, rgb(99 102 241) 0%, rgb(139 92 246) 100%)' }}
            >
              <Layers size={18} />
              Choose another topic
            </button>
            <button
              type="button"
              onClick={() => navigate(`${base}/flashcard?topic=${encodeURIComponent(topicParam)}`)}
              className="px-6 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 border hover:shadow-md"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
                color: 'rgb(var(--text))',
              }}
            >
              <BookOpen size={18} />
              Review in Flashcards
            </button>
            {extendedMarksTotal > 0 && extendedMarksEarned < extendedMarksTotal && (
              <button
                type="button"
                onClick={() => navigate(`${base}/methodMark?topic=${encodeURIComponent(topicParam)}`)}
                className="px-6 py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 border hover:shadow-md"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                }}
              >
                <ClipboardList size={18} />
                Method Mark practice
              </button>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>No questions for &quot;{topicParam}&quot;.</p>
        <button
          type="button"
          onClick={() => navigate(`${base}/topic-test`)}
          className="mt-4 px-4 py-2 rounded-lg font-semibold text-white"
          style={{ background: '#8B5CF6' }}
        >
          Choose another topic
        </button>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / items.length) * 100;

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto p-6 sm:p-10 space-y-8">
        {/* Header — exam-paper style */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 sm:p-6"
          style={{
            background: 'rgb(var(--surface))',
            border: '1px solid rgb(var(--border))',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        >
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1.5 rounded-lg font-semibold text-sm"
                style={{ background: 'rgb(99 102 241 / 0.15)', color: 'rgb(129 140 248)' }}
              >
                {topicParam}
              </span>
              <button
                type="button"
                onClick={() => navigate(`${base}/topic-test`)}
                className="flex items-center gap-2 text-sm font-medium transition hover:opacity-80"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                <ChevronLeft size={18} />
                Change topic
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span style={{ color: 'rgb(var(--text-secondary))' }}>
                Q {currentIndex + 1} of {items.length}
              </span>
              <span
                className="px-2.5 py-1 rounded-lg font-mono font-semibold"
                style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
              >
                {marksEarned}/{totalMarks}
              </span>
              {timedMode && timeRemainingSec > 0 && (
                <span
                  className="px-2.5 py-1 rounded-lg font-mono font-semibold"
                  style={{
                    background: timeRemainingSec <= 60 ? 'rgb(239 68 68 / 0.2)' : 'rgb(var(--surface-2))',
                    color: timeRemainingSec <= 60 ? 'rgb(248 113 113)' : 'rgb(var(--text))',
                  }}
                >
                  {Math.floor(timeRemainingSec / 60)}:{String(timeRemainingSec % 60).padStart(2, '0')}
                </span>
              )}
              <label className="flex items-center gap-2 cursor-pointer text-xs" title="1 min per mark">
                <input
                  type="checkbox"
                  checked={timedMode}
                  onChange={(e) => {
                    const on = e.target.checked;
                    setTimedMode(on);
                    if (on && timeRemainingSec === 0) setTimeRemainingSec(Math.ceil(totalMarks) * 60);
                  }}
                  className="rounded border-gray-500"
                />
                <Clock size={14} style={{ color: 'rgb(var(--text-secondary))' }} />
              </label>
            </div>
          </div>
          <div className="mt-4 w-full rounded-full h-2 overflow-hidden" style={{ background: 'rgb(var(--surface-2))' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, rgb(99 102 241), rgb(139 92 246))' }}
            />
          </div>
        </motion.header>

        {/* Question card — exam-paper aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl p-6 sm:p-8"
          style={{
            background: 'rgb(var(--surface))',
            border: '1px solid rgb(var(--border))',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          }}
        >
        {isQuickCheck && quickCheck && (
          <>
            <div className="mb-4">
              <div
                className="text-sm font-medium mb-2"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                {quickCheck.topic} • {quickCheck.type} • 1 mark
              </div>
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'rgb(var(--text))' }}>
                {quickCheck.question}
              </h2>
            </div>

            {(quickCheck.type === 'multipleChoice' || quickCheck.type === 'trueFalse') && (
              <div className="space-y-3">
                {!showFeedback && (
                  <p className="text-xs mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Press <kbd className="px-1.5 py-0.5 rounded bg-black/20 font-mono">1</kbd>–<kbd className="px-1.5 py-0.5 rounded bg-black/20 font-mono">{quickCheck.options?.length ?? 4}</kbd> to select
                  </p>
                )}
                {quickCheck.options?.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => !showFeedback && setSelectedAnswer(option)}
                    disabled={showFeedback}
                    className={`w-full p-4 sm:p-5 rounded-xl text-left border-2 transition-all duration-200 ${
                      selectedAnswer === option
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-500/10'
                        : 'border-transparent hover:border-indigo-500/50'
                    } ${showFeedback ? 'opacity-80 cursor-not-allowed' : ''}`}
                    style={{
                      background: selectedAnswer === option ? 'rgb(99 102 241 / 0.12)' : 'rgb(var(--surface-2))',
                      color: 'rgb(var(--text))',
                    }}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                        style={{
                          borderColor: selectedAnswer === option ? 'rgb(99 102 241)' : 'rgb(var(--border))',
                          color: selectedAnswer === option ? 'rgb(99 102 241)' : 'rgb(var(--text-secondary))',
                        }}
                        title={`Press ${idx + 1} to select`}
                      >
                        {idx + 1}
                      </span>
                      <span className="flex-1">{option}</span>
                      {selectedAnswer === option && (
                        <span className="text-indigo-400 font-semibold">✓</span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {quickCheck.type === 'dragOrder' && (
              <div className="space-y-4">
                <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Drag items to put them in the correct order:
                </p>
                <div className="space-y-2">
                  {dragOrder.map((item, idx) => (
                    <div
                      key={idx}
                      draggable={!showFeedback}
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', idx.toString())}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleDragOrder(
                          parseInt(e.dataTransfer.getData('text/plain')),
                          idx
                        );
                      }}
                      className="p-4 rounded-lg border cursor-move"
                      style={{
                        background: 'rgb(var(--surface-2))',
                        borderColor: 'rgb(var(--border))',
                        color: 'rgb(var(--text))',
                      }}
                    >
                      <span className="text-sm font-semibold mr-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {idx + 1}.
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showFeedback && (
              <button
                type="button"
                onClick={handleSubmitQuickCheck}
                disabled={selectedAnswer === null}
                className="w-full mt-6 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                style={{ background: 'linear-gradient(135deg, rgb(99 102 241) 0%, rgb(139 92 246) 100%)' }}
              >
                Submit Answer
              </button>
            )}
          </>
        )}

        {!isQuickCheck && question && (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {inferCommandWord(question.question) && (
                <span
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider"
                  style={{ background: 'rgb(99 102 241 / 0.2)', color: 'rgb(165 180 252)' }}
                >
                  {inferCommandWord(question.question)}
                </span>
              )}
              <span
                className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}
              >
                {question.marks} marks
              </span>
              {question.calculatorAllowed && (
                <span className="flex items-center gap-1.5 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                  <Calculator size={14} />
                  Calculator allowed
                </span>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-semibold leading-relaxed mb-6" style={{ color: 'rgb(var(--text))' }}>
              {question.question}
            </h2>

            {question.equations && question.equations.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>
                  Required equation(s):
                </p>
                {question.equations.map((eq, idx) => (
                  <p key={idx} className="text-sm font-mono" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {eq}
                  </p>
                ))}
              </div>
            )}

            {!showFeedback && (
              <div className="space-y-5">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Write your answer here — use full sentences for extended questions..."
                  className="w-full p-4 sm:p-5 rounded-xl border-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                  style={{
                    background: 'rgb(var(--surface-2))',
                    borderColor: 'rgb(var(--border))',
                    color: 'rgb(var(--text))',
                    minHeight: (question?.marks ?? 0) >= 4 ? 160 : 120,
                  }}
                  rows={(question?.marks ?? 0) >= 4 ? 6 : 4}
                />
                <button
                  type="button"
                  onClick={handleSubmitQuestion}
                  disabled={!userAnswer.trim()}
                  className="w-full px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: 'linear-gradient(135deg, rgb(99 102 241) 0%, rgb(139 92 246) 100%)' }}
                >
                  Submit Answer
                </button>
              </div>
            )}
          </>
        )}

        {showFeedback && (quickCheck || question) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 space-y-5"
          >
            <div
              className={`p-5 rounded-xl border-2 flex items-start gap-4 ${
                isCorrect
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-red-500/50 bg-red-500/10'
              }`}
            >
              {isCorrect ? (
                <Sparkles size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={24} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {methodMarkResult
                    ? `${methodMarkResult.score} / ${methodMarkResult.totalMarks} marks`
                    : isCorrect
                    ? "That's right!"
                    : 'Not quite'}
                </p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {isQuickCheck && quickCheck
                    ? isCorrect
                      ? quickCheck.feedback.correct
                      : quickCheck.feedback.incorrect
                    : question
                    ? isCorrect
                      ? question.feedback.correct
                      : (!methodMarkResult ? 'Not quite. Review the model answer below.' : question.feedback.incorrect)
                    : ''}
                </p>
                {methodMarkResult && methodMarkResult.obtained.length > 0 && (
                  <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <p className="text-xs font-semibold mb-1 text-green-800 dark:text-green-200">You obtained:</p>
                    <ul className="text-sm space-y-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {methodMarkResult.obtained.map((p, i) => (
                        <li key={i}>✓ {p.description} ({p.marks})</li>
                      ))}
                    </ul>
                  </div>
                )}
                {methodMarkResult && methodMarkResult.missed.length > 0 && (
                  <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                    <p className="text-xs font-semibold mb-1 text-amber-800 dark:text-amber-200">You missed:</p>
                    <ul className="text-sm space-y-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {methodMarkResult.missed.map((p, i) => (
                        <li key={i}>✗ {p.description} ({p.marks})</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!isCorrect && question && !methodMarkResult && (
                  <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>
                      Model answer:
                    </p>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {Array.isArray(question.correctAnswer)
                        ? question.correctAnswer[0]
                        : question.correctAnswer}
                    </p>
                  </div>
                )}
                {!isCorrect && quickCheck && (
                  <p className="text-sm font-medium mt-3 mb-1" style={{ color: 'rgb(var(--text))' }}>
                    The right answer:{' '}
                    {Array.isArray(quickCheck.correctAnswer)
                      ? quickCheck.correctAnswer.join(' → ')
                      : quickCheck.correctAnswer}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
              style={{ background: 'linear-gradient(135deg, rgb(99 102 241) 0%, rgb(139 92 246) 100%)' }}
            >
              {currentIndex < items.length - 1 ? 'Next Question' : 'See Results'}
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
        </motion.div>
      </div>
    </div>
  );
}

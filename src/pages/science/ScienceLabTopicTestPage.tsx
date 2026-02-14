import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  FileQuestion,
  CheckCircle,
  XCircle,
  Calculator,
  BookOpen,
  Sparkles,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { getTopicTestItems } from '../../config/scienceLabFlashcards';
import { gradeScienceAnswer } from '../../utils/scienceGrading';
import { storage } from '../../utils/storage';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../types/scienceLab';

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
  const [correctCount, setCorrectCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? (parseInt(paper) as SciencePaper) : 1;
  const tierValue = tier ? (tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier) : 'Higher';
  const normalizedSubject = subjectId ? (subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject) : 'Biology';

  const items = useMemo(() => {
    if (!topicParam) return [];
    return getTopicTestItems(normalizedSubject, paperNum, tierValue, topicParam);
  }, [normalizedSubject, paperNum, tierValue, topicParam]);

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
  }, [currentIndex, quickCheck?.id]);

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>Invalid subject. Please select Biology, Chemistry, or Physics.</p>
        <button type="button" onClick={() => navigate('/science-lab')}>Go Back</button>
      </div>
    );
  }

  if (!topicParam) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>No topic selected. Please choose a topic from the Topics page.</p>
        <button
          type="button"
          onClick={() => navigate(`/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/topics`)}
        >
          Browse Topics
        </button>
      </div>
    );
  }

  const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
  const topicsPath = `${base}/topics`;

  const handleBackToTopics = () => navigate(topicsPath);
  const handleBackToModes = () => navigate(base);

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
    if (correct) setCorrectCount((c) => c + 1);
  };

  const handleSubmitQuestion = () => {
    if (!question) return;
    const result = gradeScienceAnswer(question, userAnswer);
    setIsCorrect(result.correct);
    setShowFeedback(true);
    if (result.correct) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // correctCount already updated in submit handler when user was correct
      storage.updateTopicTestCompletion(
        normalizedSubject,
        paperNum,
        tierValue,
        topicParam,
        correctCount,
        items.length
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
    const score = correctCount;
    const total = items.length;
    const percent = total > 0 ? Math.round((score / total) * 100) : 0;

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{
            background: 'linear-gradient(135deg, #8B5CF6 0%, #10B981 100%)',
            borderColor: 'transparent',
          }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Topic Test Complete</h1>
          <p className="text-white/90 text-sm sm:text-base">Topic: {topicParam}</p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-8 border text-center"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <p className="text-4xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
            {score} / {total}
          </p>
          <p className="text-lg mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
            {percent}% correct
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleBackToTopics}
              className="px-6 py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' }}
            >
              <Layers size={18} />
              Back to Topics
            </button>
            <button
              type="button"
              onClick={() => navigate(`${base}/flashcard?topic=${encodeURIComponent(topicParam)}`)}
              className="px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 border"
              style={{
                background: 'rgb(var(--surface-2))',
                borderColor: 'rgb(var(--border))',
                color: 'rgb(var(--text))',
              }}
            >
              <BookOpen size={18} />
              Review topic in Flashcards
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>No questions available for topic &quot;{topicParam}&quot;. Try another topic.</p>
        <button type="button" onClick={handleBackToTopics}>
          Browse Topics
        </button>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / items.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={handleBackToTopics}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Topics
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Topic Test: {topicParam}</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          Mini quiz for {topicParam} — master this unit
        </p>
        <div className="flex items-center justify-between text-sm text-white/90 mb-2">
          <span>Question {currentIndex + 1} of {items.length}</span>
          <span>{correctCount} correct so far</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.section>

      <div
        className="rounded-xl p-6 border"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        {isQuickCheck && quickCheck && (
          <>
            <div className="mb-4">
              <div
                className="text-sm font-medium mb-2"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                {quickCheck.topic} • {quickCheck.type}
              </div>
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'rgb(var(--text))' }}>
                {quickCheck.question}
              </h2>
            </div>

            {(quickCheck.type === 'multipleChoice' || quickCheck.type === 'trueFalse') && (
              <div className="space-y-3">
                {quickCheck.options?.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => !showFeedback && setSelectedAnswer(option)}
                    disabled={showFeedback}
                    className={`w-full p-4 rounded-lg text-left border transition ${
                      selectedAnswer === option
                        ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    } ${showFeedback ? 'opacity-75 cursor-not-allowed' : 'hover:border-blue-300'}`}
                    style={{
                      background:
                        selectedAnswer === option ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
                      color: 'rgb(var(--text))',
                    }}
                  >
                    {option}
                    {selectedAnswer === option ? ' ✓' : ''}
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
                className="w-full mt-6 px-6 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' }}
              >
                Submit Answer
              </button>
            )}
          </>
        )}

        {!isQuickCheck && question && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <FileQuestion size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {question.topic} • {question.marks} marks
                  {question.calculatorAllowed && (
                    <span className="ml-2 flex items-center gap-1">
                      <Calculator size={14} />
                      Calculator allowed
                    </span>
                  )}
                </p>
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-4" style={{ color: 'rgb(var(--text))' }}>
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
              <div className="space-y-4">
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  className="w-full p-4 rounded-lg border resize-none"
                  style={{
                    background: 'rgb(var(--surface-2))',
                    borderColor: 'rgb(var(--border))',
                    color: 'rgb(var(--text))',
                  }}
                  rows={4}
                />
                <button
                  type="button"
                  onClick={handleSubmitQuestion}
                  disabled={!userAnswer.trim()}
                  className="w-full px-6 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' }}
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
            className="mt-6 space-y-4"
          >
            <div
              className={`p-4 rounded-lg border flex items-start gap-3 ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              {isCorrect ? (
                <Sparkles size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={24} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {isCorrect ? "That's right!" : 'Not quite'}
                </p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {isQuickCheck && quickCheck
                    ? isCorrect
                      ? quickCheck.feedback.correct
                      : quickCheck.feedback.incorrect
                    : question
                    ? isCorrect
                      ? question.feedback.correct
                      : question.feedback.incorrect
                    : ''}
                </p>
                {!isCorrect && question && (
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
              className="w-full px-6 py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' }}
            >
              {currentIndex < items.length - 1 ? 'Next Question' : 'See Results'}
              <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

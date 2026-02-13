import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react';
import { getQuickChecksByFilters } from '../../config/scienceLabFlashcards';
import { storage } from '../../utils/storage';
import type { ScienceSubject, SciencePaper, ScienceTier, ScienceQuickCheck } from '../../types/scienceLab';

export function ScienceLabQuickCheckPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dragOrder, setDragOrder] = useState<string[]>([]);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? parseInt(paper) as SciencePaper : 1;
  const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier : 'Higher';

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const [searchParams] = useSearchParams();
  const topicFilter = searchParams.get('topic') ?? undefined;
  const quickChecks = getQuickChecksByFilters(normalizedSubject, paperNum, tierValue, topicFilter);
  const currentCheck = quickChecks[currentIndex];

  useEffect(() => {
    if (currentCheck && currentCheck.type === 'dragOrder') {
      setDragOrder([...currentCheck.options || []]);
    }
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [currentIndex, currentCheck]);

  const handleBack = () => {
    const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
    const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
    navigate(base + query);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleDragOrder = (fromIndex: number, toIndex: number) => {
    if (showFeedback) return;
    const newOrder = [...dragOrder];
    const [removed] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, removed);
    setDragOrder(newOrder);
    setSelectedAnswer(newOrder);
  };

  const handleSubmit = () => {
    if (!currentCheck || selectedAnswer === null) return;

    let correct = false;
    if (currentCheck.type === 'dragOrder') {
      const correctOrder = Array.isArray(currentCheck.correctAnswer)
        ? currentCheck.correctAnswer
        : [currentCheck.correctAnswer];
      correct = JSON.stringify(dragOrder) === JSON.stringify(correctOrder);
    } else {
      const correctAns = Array.isArray(currentCheck.correctAnswer)
        ? currentCheck.correctAnswer[0]
        : currentCheck.correctAnswer;
      correct = selectedAnswer === correctAns;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    // Update topic mastery
    if (correct) {
      const topic = currentCheck.topic;
      const existing = storage.getTopicMasteryByKey(
        normalizedSubject,
        paperNum,
        tierValue,
        topic
      );
      storage.updateTopicMastery(
        normalizedSubject,
        paperNum,
        tierValue,
        topic,
        existing?.flashcardMastery || 0,
        true // Quick check passed
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < quickChecks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All quick checks completed - navigate to quiz
      const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/question`;
      const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
      navigate(base + query);
    }
  };

  if (!currentCheck) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>No quick checks available. You can proceed to quizzes.</p>
        <button onClick={() => navigate(`/science-lab/${subject.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/question`)}>
          Go to Quiz
        </button>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / quickChecks.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Lab Modes
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Quick Check</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Do you actually understand? Prove it before quizzes unlock.
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-white/90 mb-2">
            <span>Check {currentIndex + 1} of {quickChecks.length}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.section>

      {/* Quick Check Question */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-6 border"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <div className="mb-4">
          <div className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            {currentCheck.topic} • {currentCheck.type}
          </div>
          <h2 className="text-xl font-semibold mb-6" style={{ color: 'rgb(var(--text))' }}>
            {currentCheck.question}
          </h2>
        </div>

        {(currentCheck.type === 'multipleChoice' || currentCheck.type === 'trueFalse') && (
          <div className="space-y-3">
            {currentCheck.options?.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAnswerSelect(option)}
                disabled={showFeedback}
                className={`w-full p-4 rounded-lg text-left border transition ${
                  selectedAnswer === option
                    ? 'border-blue-500 ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                } ${showFeedback ? 'opacity-75 cursor-not-allowed' : 'hover:border-blue-300'}`}
                style={{
                  background: selectedAnswer === option
                    ? 'rgb(var(--surface-2))'
                    : 'rgb(var(--surface))',
                  color: 'rgb(var(--text))',
                }}
              >
                {option}{selectedAnswer === option ? ' ✓' : ''}
              </button>
            ))}
          </div>
        )}

        {currentCheck.type === 'dragOrder' && (
          <div className="space-y-4">
            <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
              Drag items to put them in the correct order:
            </p>
            <div className="space-y-2">
              {dragOrder.map((item, idx) => (
                <div
                  key={idx}
                  draggable={!showFeedback}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', idx.toString());
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                    handleDragOrder(fromIndex, idx);
                  }}
                  className="p-4 rounded-lg border cursor-move"
                  style={{
                    background: 'rgb(var(--surface-2))',
                    borderColor: 'rgb(var(--border))',
                    color: 'rgb(var(--text))',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {idx + 1}.
                    </span>
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!showFeedback && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full mt-6 px-6 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
            }}
          >
            Submit Answer
          </button>
        )}

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div
              className={`p-4 rounded-lg border flex items-start gap-3 ${
                isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              {isCorrect ? (
                <CheckCircle size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={24} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {isCorrect ? currentCheck.feedback.correct : currentCheck.feedback.incorrect}
                </p>
                <p className="text-xs italic" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {currentCheck.feedback.ideaReference}
                </p>
                {!isCorrect && (
                  <button
                    type="button"
                    onClick={() => {
                      const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/flashcard`;
                      const query = currentCheck.topic ? `?topic=${encodeURIComponent(currentCheck.topic)}` : '';
                      navigate(base + query);
                    }}
                    className="mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition border"
                    style={{
                      background: 'rgb(var(--surface))',
                      borderColor: 'rgb(var(--border))',
                      color: 'rgb(var(--text))',
                    }}
                  >
                    <BookOpen size={16} />
                    Review this topic in Flashcards
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full mt-4 px-6 py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
              }}
            >
              {currentIndex < quickChecks.length - 1 ? 'Next Check' : 'Proceed to Quiz'}
              <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

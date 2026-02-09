import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getFlashcardsByFilters } from '../../config/scienceLabFlashcards';
import { storage } from '../../utils/storage';
import type { ScienceSubject, SciencePaper, ScienceTier, ConfidenceLevel, ScienceFlashcard } from '../../types/scienceLab';

export function ScienceLabFlashcardPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [viewStartTime, setViewStartTime] = useState<number>(Date.now());
  const [minViewTime] = useState(2000); // 2 seconds minimum

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? parseInt(paper) as SciencePaper : 1;
  const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier : 'Higher';

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const flashcards = getFlashcardsByFilters(normalizedSubject, paperNum, tierValue);
  const currentCard = flashcards[currentIndex];

  useEffect(() => {
    if (currentCard) {
      setViewStartTime(Date.now());
      setIsFlipped(false);
    }
  }, [currentIndex]);

  const handleBack = () => {
    navigate(`/science-lab/${subject.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`);
  };

  const handleFlip = () => {
    if (!isFlipped && currentCard) {
      const timeViewed = Date.now() - viewStartTime;
      if (timeViewed < minViewTime) {
        // Anti-spam: require minimum viewing time
        return;
      }
      setIsFlipped(true);
      setViewedCards(prev => new Set(prev).add(currentCard.id));
    }
  };

  const handleConfidence = (level: ConfidenceLevel) => {
    if (!currentCard || !isFlipped) return;

    // Update flashcard mastery
    storage.updateFlashcardMastery(currentCard.id, level, true);

    // Move to next card
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // All cards viewed - calculate topic mastery
      const topic = currentCard.topic;
      const topicFlashcards = flashcards.filter(f => f.topic === topic);
      const mastery = storage.calculateTopicFlashcardMastery(
        normalizedSubject,
        paperNum,
        tierValue,
        topic,
        topicFlashcards.map(f => f.id)
      );
      storage.updateTopicMastery(normalizedSubject, paperNum, tierValue, topic, mastery);

      // Navigate to quick check or back
      navigate(`/science-lab/${subject.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/quick-check`);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (!currentCard) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>No flashcards available for this topic.</p>
        <button onClick={handleBack}>Go Back</button>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / flashcards.length) * 100;
  const timeViewed = Date.now() - viewStartTime;
  const canFlip = timeViewed >= minViewTime;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #0EA5E9 0%, #8B5CF6 100%)',
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Flashcard Mode</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Learn it first, then prove it
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-white/90 mb-2">
            <span>Card {currentIndex + 1} of {flashcards.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </motion.section>

      {/* Flashcard */}
      <div className="relative" style={{ minHeight: '400px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div
              className="rounded-2xl p-8 border shadow-lg cursor-pointer transform transition-transform hover:scale-[1.02]"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              onClick={handleFlip}
            >
              {!isFlipped ? (
                // Front of card
                <div className="text-center space-y-6">
                  <div className="text-sm font-medium mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {currentCard.topic} • {currentCard.type}
                  </div>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>
                    {currentCard.front.prompt}
                  </h2>
                  {currentCard.front.visual && (
                    <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {currentCard.front.visual.description}
                      </p>
                    </div>
                  )}
                  <div className="mt-8 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {!canFlip ? (
                      <span>Reading... ({Math.ceil((minViewTime - timeViewed) / 1000)}s)</span>
                    ) : (
                      <span>Tap to reveal answer</span>
                    )}
                  </div>
                </div>
              ) : (
                // Back of card
                <div className="space-y-6">
                  <div className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Answer
                  </div>
                  <p className="text-lg leading-relaxed" style={{ color: 'rgb(var(--text))' }}>
                    {currentCard.back.explanation}
                  </p>
                  
                  {currentCard.back.keyTerms.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                        Key Terms:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {currentCard.back.keyTerms.map((term, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              background: 'rgb(var(--surface-2))',
                              color: 'rgb(var(--text))',
                            }}
                          >
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentCard.back.misconceptionWarning && (
                    <div className="mt-4 p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                      <div className="flex items-start gap-2">
                        <AlertCircle size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>
                            ⚠️ Common Mistake:
                          </p>
                          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                            {currentCard.back.misconceptionWarning}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentCard.back.example && (
                    <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <p className="text-sm font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>
                        Example:
                      </p>
                      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {currentCard.back.example}
                      </p>
                    </div>
                  )}

                  {/* Confidence Rating */}
                  <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
                    <p className="text-sm font-semibold mb-4 text-center" style={{ color: 'rgb(var(--text))' }}>
                      How confident are you?
                    </p>
                    <div className="flex gap-4 justify-center">
                      {([1, 2, 3] as ConfidenceLevel[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleConfidence(level)}
                          className="px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
                          style={{
                            background: level === 3
                              ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                              : level === 2
                              ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                              : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                            color: 'white',
                          }}
                        >
                          {level === 3 ? 'Confident' : level === 2 ? 'Somewhat' : 'Not Sure'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: currentIndex === 0 ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
              color: 'rgb(var(--text))',
            }}
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          <button
            type="button"
            onClick={() => setIsFlipped(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
            style={{
              background: 'rgb(var(--surface))',
              color: 'rgb(var(--text))',
            }}
          >
            <RotateCcw size={18} />
            Flip Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: currentIndex === flashcards.length - 1 ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
              color: 'rgb(var(--text))',
            }}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

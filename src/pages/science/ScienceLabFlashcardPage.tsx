import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle, Lightbulb, GitBranch, Calculator, FlaskConical, AlertTriangle, BookOpen } from 'lucide-react';
import { getFlashcardsByFilters } from '../../config/scienceLabFlashcards';
import { storage } from '../../utils/storage';
import type { ScienceSubject, SciencePaper, ScienceTier, ConfidenceLevel, ScienceFlashcard, FlashcardType } from '../../types/scienceLab';

// Refined type styling – clear, digestible
const CARD_TYPE_STYLE: Record<FlashcardType, { icon: typeof Lightbulb; color: string; bgColor: string; label: string }> = {
  concept: { icon: Lightbulb, color: '#0EA5E9', bgColor: 'rgba(14, 165, 233, 0.12)', label: 'Concept' },
  processChain: { icon: GitBranch, color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.12)', label: 'Process' },
  equation: { icon: Calculator, color: '#F59E0B', bgColor: 'rgba(245, 158, 11, 0.12)', label: 'Equation' },
  practical: { icon: FlaskConical, color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.12)', label: 'Practical' },
  misconception: { icon: AlertTriangle, color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.12)', label: 'Misconception' },
  graph: { icon: GitBranch, color: '#6366F1', bgColor: 'rgba(99, 102, 241, 0.12)', label: 'Graph' },
};

const CONFIDENCE_LABELS: Record<ConfidenceLevel, string> = {
  1: 'Again',
  2: 'Learning',
  3: 'Got it',
};

export function ScienceLabFlashcardPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [viewStartTime, setViewStartTime] = useState<number>(Date.now());
  const [minViewTime] = useState(1000); // 1 second minimum – quick but prevents accidental skip
  const [sessionComplete, setSessionComplete] = useState(false);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? parseInt(paper) as SciencePaper : 1;
  const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier : 'Higher';

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const [searchParams] = useSearchParams();
  const topicFilter = searchParams.get('topic') ?? undefined;
  const flashcards = getFlashcardsByFilters(normalizedSubject, paperNum, tierValue, topicFilter);
  const currentCard = flashcards[currentIndex];

  useEffect(() => {
    if (currentCard) {
      setViewStartTime(Date.now());
      setIsFlipped(false);
    }
  }, [currentIndex]);

  // Keyboard shortcuts – Space flip, 1/2/3 rate, arrows navigate
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ') {
        e.preventDefault();
        if (!isFlipped && currentCard) {
          const elapsed = Date.now() - viewStartTime;
          if (elapsed >= minViewTime) {
            setIsFlipped(true);
            setViewedCards(prev => new Set(prev).add(currentCard.id));
          }
        }
      } else if (isFlipped && ['1', '2', '3'].includes(e.key)) {
        handleConfidence(parseInt(e.key) as ConfidenceLevel);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, isFlipped, currentCard, viewStartTime, minViewTime, flashcards.length, handleConfidence]);

  const handleBack = () => {
    const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
    const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
    navigate(base + query);
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
      // All cards viewed - calculate topic mastery for ALL topics touched in this session
      const topicsInSession = new Set(flashcards.map(f => f.topic));
      topicsInSession.forEach((topic) => {
        const topicFlashcards = flashcards.filter(f => f.topic === topic);
        const mastery = storage.calculateTopicFlashcardMastery(
          normalizedSubject,
          paperNum,
          tierValue,
          topic,
          topicFlashcards.map(f => f.id)
        );
        storage.updateTopicMastery(normalizedSubject, paperNum, tierValue, topic, mastery);
      });

      // Show completion modal/state - user chooses: Quick Check or Return to modes
      setSessionComplete(true);
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

  // Session complete – clean, clear next steps
  if (sessionComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(180deg, rgb(var(--bg)) 0%, rgb(var(--surface-2)) 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full rounded-2xl p-8 text-center"
          style={{
            background: 'rgb(var(--surface))',
            boxShadow: '0 4px 24px -4px rgb(0 0 0 / 0.08), 0 0 0 1px rgb(var(--border))',
          }}
        >
          <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>All done!</h1>
          <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
            You reviewed {flashcards.length} cards. Ready for a quick check?
          </p>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/quick-check`;
                const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
                navigate(base + query);
              }}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition hover:opacity-90"
              style={{ background: '#10B981' }}
            >
              Quick Check →
            </button>
            <button
              type="button"
              onClick={() => {
                const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
                const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
                navigate(base + query);
              }}
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
  const typeStyle = CARD_TYPE_STYLE[currentCard.type] ?? CARD_TYPE_STYLE.concept;
  const TypeIcon = typeStyle.icon;

  const processSteps = currentCard.back.explanation.includes('→')
    ? currentCard.back.explanation.split('→').map(s => s.trim()).filter(Boolean)
    : null;
  const visualType = currentCard.front.visual?.type;
  const isEquationVisual = visualType === 'equation';

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, rgb(var(--bg)) 0%, rgb(var(--surface-2)) 100%)' }}>
      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {/* Minimal header – progress only */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 text-sm font-medium transition hover:opacity-80"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            <ChevronLeft size={18} />
            Back
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
              {currentIndex + 1} / {flashcards.length}
            </span>
            <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgb(var(--border))' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: typeStyle.color }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="relative" style={{ minHeight: '420px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative"
          >
            <div
              className="rounded-2xl p-8 sm:p-10 cursor-pointer transition-all duration-200 hover:shadow-xl active:scale-[0.99]"
              style={{
                background: 'rgb(var(--surface))',
                boxShadow: '0 4px 24px -4px rgb(0 0 0 / 0.08), 0 0 0 1px rgb(var(--border))',
                borderLeft: `4px solid ${typeStyle.color}`,
                minHeight: '380px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
              onClick={handleFlip}
            >
              {!isFlipped ? (
                // Front – one clear question, minimal chrome
                <div className="text-center space-y-8">
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ background: typeStyle.bgColor, color: typeStyle.color }}
                    >
                      <TypeIcon size={14} />
                      {typeStyle.label}
                    </span>
                    <span className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{currentCard.topic}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold leading-snug max-w-lg mx-auto" style={{ color: 'rgb(var(--text))' }}>
                    {currentCard.front.prompt}
                  </h2>
                  {currentCard.front.visual && (
                    <div
                      className="mx-auto max-w-md p-5 rounded-xl"
                      style={{ background: typeStyle.bgColor }}
                    >
                      {isEquationVisual ? (
                        <p className="text-2xl sm:text-3xl font-mono font-bold" style={{ color: typeStyle.color }}>
                          {currentCard.front.visual.description}
                        </p>
                      ) : (
                        <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text))' }}>
                          {currentCard.front.visual.description}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {!canFlip ? (
                      <span>Wait {Math.ceil((minViewTime - timeViewed) / 1000)}s</span>
                    ) : (
                      <span>Tap or press Space to reveal</span>
                    )}
                  </p>
                </div>
              ) : (
                // Back – answer first, then extras, then rate
                <div className="space-y-5 text-left">
                  <div>
                    <p className="text-xs font-medium mb-1 uppercase tracking-wider" style={{ color: typeStyle.color }}>Answer</p>
                  {processSteps ? (
                    <div className="space-y-2">
                      {processSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <span
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                            style={{ background: typeStyle.bgColor, color: typeStyle.color }}
                          >
                            {idx + 1}
                          </span>
                          <p className="text-base leading-relaxed pt-0.5" style={{ color: 'rgb(var(--text))' }}>
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className={
                        currentCard.type === 'equation' &&
                        currentCard.back.explanation.includes('=') &&
                        currentCard.back.explanation.length < 60
                          ? 'text-2xl sm:text-3xl font-mono font-bold'
                          : 'text-lg leading-relaxed'
                      }
                      style={{ color: 'rgb(var(--text))' }}
                    >
                      {currentCard.back.explanation}
                    </p>
                  )}
                  </div>

                  {currentCard.back.keyTerms.length > 0 && (
                    <div className="pt-3 flex flex-wrap gap-2">
                      {currentCard.back.keyTerms.map((term, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-medium"
                          style={{ background: typeStyle.bgColor, color: typeStyle.color }}
                        >
                          {term}
                        </span>
                      ))}
                    </div>
                  )}

                  {currentCard.back.misconceptionWarning && (
                    <div className="p-3 rounded-lg flex items-start gap-2" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                      <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgb(var(--text))' }}>Common mistake</p>
                        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{currentCard.back.misconceptionWarning}</p>
                      </div>
                    </div>
                  )}

                  {currentCard.back.example && (
                    <div className="p-3 rounded-lg flex items-start gap-2" style={{ background: 'rgba(59, 130, 246, 0.08)' }}>
                      <BookOpen size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgb(var(--text))' }}>Example</p>
                        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{currentCard.back.example}</p>
                      </div>
                    </div>
                  )}

                  {/* Rate & advance – simple, one tap */}
                  <div className="pt-5 mt-5" style={{ borderTop: '1px solid rgb(var(--border))' }}>
                    <p className="text-xs font-medium mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>Rate & continue</p>
                    <div className="flex gap-2">
                      {([1, 2, 3] as ConfidenceLevel[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleConfidence(level)}
                          className="flex-1 py-3 rounded-xl font-semibold text-sm transition hover:opacity-90 active:scale-[0.98]"
                          style={{
                            background: level === 3 ? '#10B981' : level === 2 ? '#F59E0B' : '#EF4444',
                            color: 'white',
                          }}
                        >
                          {CONFIDENCE_LABELS[level]}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs mt-2 text-center" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Or press 1, 2, or 3
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation – minimal, keyboard-friendly */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-2.5 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: 'rgb(var(--text))' }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => setIsFlipped(false)}
            className="text-sm font-medium px-4 py-2 rounded-xl transition hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            <RotateCcw size={16} className="inline mr-1.5 -mt-0.5" />
            Flip back
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="p-2.5 rounded-xl transition disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: 'rgb(var(--text))' }}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <p className="text-center text-xs mt-3" style={{ color: 'rgb(var(--text-secondary))' }}>
          ← → navigate · Space flip · 1 2 3 rate
        </p>
        </div>
      </div>
    </div>
  );
}

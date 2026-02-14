import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle, Lightbulb, GitBranch, Calculator, FlaskConical, AlertTriangle, BookOpen } from 'lucide-react';
import { getFlashcardsByFilters } from '../../config/scienceLabFlashcards';
import { FlashcardDiagram } from '../../components/FlashcardDiagram';
import { storage } from '../../utils/storage';
import { soundSystem } from '../../utils/sounds';
import type { ScienceSubject, SciencePaper, ScienceTier, ConfidenceLevel, ScienceFlashcard, FlashcardType } from '../../types/scienceLab';

const SWIPE_THRESHOLD = 60;
const MIN_VIEW_MS = 500;
const TILT_MAX = 12; // max tilt in degrees

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
  const [searchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedCards, setViewedCards] = useState<Set<string>>(new Set());
  const [viewStartTime, setViewStartTime] = useState<number>(Date.now());
  const [minViewTime] = useState(MIN_VIEW_MS);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const tiltRotateX = useMotionValue(0);
  const tiltRotateY = useMotionValue(0);
  const tiltRotateXSpring = useSpring(tiltRotateX, { stiffness: 300, damping: 30 });
  const tiltRotateYSpring = useSpring(tiltRotateY, { stiffness: 300, damping: 30 });
  const [sessionComplete, setSessionComplete] = useState(false);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? parseInt(paper) as SciencePaper : 1;
  const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier : 'Higher';
  const topicFilter = searchParams.get('topic') ?? undefined;
  const focusIds = useMemo(
    () => searchParams.get('focus')?.split(',').map(s => s.trim()).filter(Boolean) ?? [],
    [searchParams]
  );
  const normalizedSubject = subjectId ? (subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject) : 'Biology';
  const isValidSubject = subjectId && subject && ['biology', 'chemistry', 'physics'].includes(subject.toLowerCase());

  const flashcards = useMemo(() => {
    const list = getFlashcardsByFilters(normalizedSubject, paperNum, tierValue, topicFilter);
    if (focusIds.length === 0) return list;
    const byId = new Map(list.map(f => [f.id, f]));
    const first = focusIds.map(id => byId.get(id)).filter((f): f is ScienceFlashcard => f != null);
    const rest = list.filter(f => !focusIds.includes(f.id));
    return [...first, ...rest];
  }, [normalizedSubject, paperNum, tierValue, topicFilter, focusIds]);
  const currentCard = flashcards[currentIndex];

  const handleBack = useCallback(() => {
    const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
    const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
    navigate(base + query);
  }, [navigate, subject, paperNum, tierValue, topicFilter]);

  const handleConfidence = useCallback((level: ConfidenceLevel) => {
    if (!currentCard || !isFlipped) return;

    if (level === 3) soundSystem.playCorrect();

    storage.updateFlashcardMastery(currentCard.id, level, true);

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
  }, [currentCard, isFlipped, currentIndex, flashcards, normalizedSubject, paperNum, tierValue]);

  const handleFlip = useCallback(() => {
    if (isFlipped) {
      setIsFlipped(false);
    } else if (currentCard) {
      const timeViewed = Date.now() - viewStartTime;
      if (timeViewed < minViewTime) return;
      setIsFlipped(true);
      setViewedCards(prev => new Set(prev).add(currentCard.id));
    }
  }, [isFlipped, currentCard, viewStartTime, minViewTime]);

  useEffect(() => {
    if (currentCard) {
      setViewStartTime(Date.now());
      setIsFlipped(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ') {
        e.preventDefault();
        if (!currentCard) return;
        if (isFlipped) {
          setIsFlipped(false);
        } else {
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

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const range = TILT_MAX * 2;
    // Same formula for both flipped and unflipped – tilt follows mouse position consistently
    tiltRotateX.set((0.5 - y) * range);
    tiltRotateY.set((x - 0.5) * range);
  }, [tiltRotateX, tiltRotateY]);

  const handleMouseLeave = useCallback(() => {
    tiltRotateX.set(0);
    tiltRotateY.set(0);
  }, [tiltRotateX, tiltRotateY]);

  if (!isValidSubject) {
    return (
      <div className="max-w-4xl mx-auto p-8" style={{ color: 'rgb(var(--text))' }}>
        <p>Invalid subject. Please select Biology, Chemistry, or Physics.</p>
        <button type="button" onClick={() => navigate('/science-lab')}>Go Back</button>
      </div>
    );
  }

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
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'rgb(var(--bg))', color: 'rgb(var(--text))' }}>
        <div className="max-w-md w-full rounded-2xl p-8 text-center" style={{ background: 'rgb(var(--surface))', boxShadow: '0 4px 24px -4px rgb(0 0 0 / 0.08)' }}>
          <p className="mb-4">No flashcards available for this topic.</p>
          <button type="button" onClick={handleBack} className="px-4 py-2 rounded-lg font-medium" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}>Go Back</button>
        </div>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / flashcards.length) * 100;
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
            <span className="text-sm font-medium tabular-nums" style={{ color: 'rgb(var(--text-secondary))' }}>
              {currentIndex + 1} / {flashcards.length}
            </span>
            <div className="flex gap-1 max-w-48 overflow-x-auto py-1">
              {flashcards.slice(0, 30).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className="flex-shrink-0 w-2 h-2 rounded-full transition-all"
                  style={{
                    background: i === currentIndex ? typeStyle.color : 'rgb(var(--border))',
                    opacity: i === currentIndex ? 1 : 0.6,
                  }}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
              {flashcards.length > 30 && (
                <span className="text-xs self-center ml-1" style={{ color: 'rgb(var(--text-secondary))' }}>+{flashcards.length - 30}</span>
              )}
            </div>
          </div>
        </div>

        {/* Flashcard – 3D flip card with mouse-follow tilt */}
        <div
          ref={cardRef}
          className="relative w-full cursor-pointer select-none"
          style={{
            minHeight: '440px',
            perspective: '1200px',
          }}
          onClick={handleFlip}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={(e) => {
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          }}
          onTouchEnd={(e) => {
            if (!touchStart.current) return;
            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            const dy = e.changedTouches[0].clientY - touchStart.current.y;
            touchStart.current = null;
            if (Math.abs(dy) > SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx) && dy < 0) {
              if (!isFlipped && Date.now() - viewStartTime >= minViewTime) {
                setIsFlipped(true);
                setViewedCards(prev => new Set(prev).add(currentCard.id));
              } else if (isFlipped) setIsFlipped(false);
            } else if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
              if (dx > 0 && currentIndex > 0) setCurrentIndex(currentIndex - 1);
              else if (dx < 0 && currentIndex < flashcards.length - 1) setCurrentIndex(currentIndex + 1);
            }
          }}
        >
          <motion.div
            key={currentCard.id}
            className="relative w-full"
            style={{
              minHeight: '400px',
              transformStyle: 'preserve-3d',
              rotateX: tiltRotateXSpring,
              rotateY: tiltRotateYSpring,
            }}
          >
            <motion.div
              className="relative w-full h-full"
              style={{
                minHeight: '400px',
                transformStyle: 'preserve-3d',
              }}
              initial={false}
              animate={{
                rotateY: isFlipped ? 180 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
              }}
            >
            {/* Front face */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                background: 'rgb(var(--surface))',
                boxShadow: `0 8px 32px -8px rgba(0,0,0,0.12), 0 0 0 1px rgb(var(--border)), 4px 0 0 0 ${typeStyle.color}`,
              }}
            >
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6 sm:p-8 flex flex-col justify-center text-center space-y-6">
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
                  <h2 className="text-lg sm:text-xl font-semibold leading-snug max-w-lg mx-auto break-words" style={{ color: 'rgb(var(--text))' }}>
                    {currentCard.front.prompt}
                  </h2>
                  {currentCard.front.visual && (
                    <div
                      className="mx-auto max-w-md p-4 rounded-xl"
                      style={{ background: typeStyle.bgColor }}
                    >
                      {isEquationVisual ? (
                        <p className="text-xl sm:text-2xl font-mono font-bold break-words" style={{ color: typeStyle.color }}>
                          {currentCard.front.visual.description}
                        </p>
                      ) : currentCard.front.visual.diagramId ? (
                        <div className="space-y-2">
                          <div className="science-flashcard-diagram science-flashcard-diagram-front">
                            <FlashcardDiagram
                              slug={currentCard.front.visual.diagramId}
                              description={currentCard.front.visual.description}
                              fitToContainer
                            />
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text))' }}>
                          {currentCard.front.visual.description}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Tap or press Space to reveal
                  </p>
                </div>
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'rgb(var(--surface))',
                boxShadow: `0 8px 32px -8px rgba(0,0,0,0.12), 0 0 0 1px rgb(var(--border)), 4px 0 0 0 ${typeStyle.color}`,
              }}
            >
              <div className="flex-1 min-h-0 flex flex-col p-6 sm:p-8">
                  <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
                    <div>
                      <p className="text-xs font-medium mb-1 uppercase tracking-wider" style={{ color: typeStyle.color }}>Answer</p>
                      {processSteps ? (
                        <div className="space-y-2">
                          {processSteps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <span
                                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                                style={{ background: typeStyle.bgColor, color: typeStyle.color }}
                              >
                                {idx + 1}
                              </span>
                              <p className="text-sm leading-relaxed pt-0.5 break-words" style={{ color: 'rgb(var(--text))' }}>
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
                              ? 'text-xl sm:text-2xl font-mono font-bold break-words'
                              : 'text-base leading-relaxed break-words'
                          }
                          style={{ color: 'rgb(var(--text))' }}
                        >
                          {currentCard.back.explanation}
                        </p>
                      )}
                    </div>

                    {currentCard.back.keyTerms.length > 0 && (
                      <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                      {currentCard.back.keyTerms.map((term, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => navigator.clipboard?.writeText(term)}
                          className="px-2.5 py-1 rounded-md text-xs font-medium transition hover:opacity-80 active:scale-95"
                          style={{ background: typeStyle.bgColor, color: typeStyle.color }}
                          title="Copy term"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  )}

                    {currentCard.back.misconceptionWarning && (
                      <div className="p-2.5 rounded-lg flex items-start gap-2" style={{ background: 'rgba(251, 191, 36, 0.15)' }}>
                        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgb(var(--text))' }}>Common mistake</p>
                          <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{currentCard.back.misconceptionWarning}</p>
                        </div>
                      </div>
                    )}

                    {currentCard.back.example && (
                      <div className="p-2.5 rounded-lg flex items-start gap-2" style={{ background: 'rgba(59, 130, 246, 0.08)' }}>
                        <BookOpen size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold mb-0.5" style={{ color: 'rgb(var(--text))' }}>Example</p>
                          <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{currentCard.back.example}</p>
                        </div>
                      </div>
                    )}

                    {currentCard.back.visual?.diagramId && (
                      <div className="mt-2 p-2 rounded-lg" style={{ background: typeStyle.bgColor }}>
                        <div className="science-flashcard-diagram science-flashcard-diagram-back">
                          <FlashcardDiagram
                            slug={currentCard.back.visual.diagramId}
                            description={currentCard.back.visual.description}
                            fitToContainer
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rate & advance – sticky at bottom */}
                  <div className="flex-shrink-0 pt-4 mt-4" style={{ borderTop: '1px solid rgb(var(--border))' }} onClick={(e) => e.stopPropagation()}>
                    <p className="text-xs font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Rate & continue</p>
                    <div className="flex gap-2">
                      {([1, 2, 3] as ConfidenceLevel[]).map((level) => (
                        <motion.button
                          key={level}
                          type="button"
                          onClick={() => handleConfidence(level)}
                          className="flex-1 py-2.5 rounded-xl font-semibold text-sm"
                          style={{
                            background: level === 3 ? '#10B981' : level === 2 ? '#F59E0B' : '#EF4444',
                            color: 'white',
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {CONFIDENCE_LABELS[level]}
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-xs mt-2 text-center" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Or press 1, 2, or 3
                    </p>
                  </div>
                </div>
            </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation – minimal, keyboard-friendly */}
        <div className="flex items-center justify-between mt-6 gap-2">
          <motion.button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="p-3 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: 'rgb(var(--text))' }}
            aria-label="Previous"
            whileHover={{ scale: currentIndex > 0 ? 1.05 : 1 }}
            whileTap={{ scale: currentIndex > 0 ? 0.95 : 1 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setIsFlipped(prev => !prev)}
            className="text-sm font-medium px-5 py-2.5 rounded-xl"
            style={{ color: 'rgb(var(--text-secondary))', background: 'rgb(var(--surface-2))' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw size={16} className="inline mr-1.5 -mt-0.5" />
            Flip
          </motion.button>
          <motion.button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="p-3 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: 'rgb(var(--text))' }}
            aria-label="Next"
            whileHover={{ scale: currentIndex < flashcards.length - 1 ? 1.05 : 1 }}
            whileTap={{ scale: currentIndex < flashcards.length - 1 ? 0.95 : 1 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
        <p className="text-center text-xs mt-3" style={{ color: 'rgb(var(--text-secondary))' }}>
          Tap card to flip · Swipe left/right · 1 2 3 to rate
        </p>
      </div>
    </div>
  );
}

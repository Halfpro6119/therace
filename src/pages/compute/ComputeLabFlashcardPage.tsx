import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { getUnitById, getTermsByUnit } from '../../config/computeLabData';
import { storage } from '../../utils/storage';
import type { ComputeUnitId, ComputeConfidenceLevel } from '../../types/computeLab';

const HERO_GRADIENT = 'linear-gradient(135deg, #0891B2 0%, #0E7490 50%, #155E75 100%)';

export function ComputeLabFlashcardPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const unit = unitId ? getUnitById(unitId as ComputeUnitId) : undefined;
  const terms = unit ? getTermsByUnit(unit.id) : [];
  const currentTerm = terms[currentIndex];

  useEffect(() => {
    if (currentTerm) setIsFlipped(false);
  }, [currentIndex, currentTerm]);

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/compute-lab')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Back to Compute Lab
        </button>
      </div>
    );
  }

  const handleBack = () => navigate(`/compute-lab/unit/${unit.id}`);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handleConfidence = (level: ComputeConfidenceLevel) => {
    if (!currentTerm || !isFlipped) return;
    storage.updateComputeFlashcardMastery(currentTerm.id, level);
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const topicIds = [...new Set(terms.map((t) => t.topicId).filter(Boolean))] as string[];
      topicIds.forEach((topicId) => {
        const termIdsForTopic = terms.filter((t) => t.topicId === topicId).map((t) => t.id);
        const pct = storage.calculateComputeTopicFlashcardMastery(unit.id, topicId, termIdsForTopic);
        const existing = storage.getComputeTopicProgressByKey(unit.id, topicId);
        storage.updateComputeTopicProgress({
          unitId: unit.id,
          topicId,
          flashcardMasteryPercent: pct,
          quickCheckPassed: existing?.quickCheckPassed ?? false,
          algorithmLabCompleted: existing?.algorithmLabCompleted ?? false,
          calculationLabCompleted: existing?.calculationLabCompleted ?? false,
          logicLabCompleted: existing?.logicLabCompleted ?? false,
          sqlLabCompleted: existing?.sqlLabCompleted ?? false,
          questionLabCompleted: existing?.questionLabCompleted ?? false,
          lastUpdated: new Date().toISOString(),
        });
      });
      setSessionComplete(true);
    }
  };

  if (sessionComplete) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
        >
          <h1 className="text-2xl font-bold text-white mb-2">Session complete</h1>
          <p className="text-white/90 text-sm mb-6">You&apos;ve reviewed all {terms.length} terms. What next?</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate(`/compute-lab/unit/${unit.id}/quick-check`)}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30"
            >
              Quick Check →
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30"
            >
              Back to Unit {unit.id}
            </button>
          </div>
        </motion.section>
      </div>
    );
  }

  if (!currentTerm) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>No terms for this unit.</p>
        <button type="button" onClick={handleBack} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Go Back
        </button>
      </div>
    );
  }

  const progressPct = terms.length ? ((currentIndex + 1) / terms.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Glossary / Flashcards</h1>
        <p className="text-white/90 text-sm mb-2">Unit {unit.id} – {terms.length} terms</p>
        <div className="h-2 rounded-full bg-white/30 overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 0.3 }} />
        </div>
      </motion.section>

      <div className="flex items-center justify-between text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        <span>Card {currentIndex + 1} of {terms.length}</span>
        <button type="button" onClick={handleFlip} className="flex items-center gap-1 hover:underline">
          <RotateCcw size={16} /> {isFlipped ? 'Show term again' : 'Flip card'}
        </button>
      </div>

      <motion.div
        className="min-h-[220px] rounded-2xl border-2 cursor-pointer overflow-hidden"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        onClick={handleFlip}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center min-h-[220px]"
            >
              <p className="text-lg font-bold text-center" style={{ color: 'rgb(var(--text))' }}>{currentTerm.term}</p>
              <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Tap card or button to reveal definition</p>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 min-h-[220px]"
            >
              <p className="text-base mb-2" style={{ color: 'rgb(var(--text))' }}>{currentTerm.definition}</p>
              {currentTerm.inContext && (
                <p className="text-sm italic" style={{ color: 'rgb(var(--text-secondary))' }}>{currentTerm.inContext}</p>
              )}
              <p className="text-xs mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Tap card to see term again</p>
              <p className="text-sm font-medium mt-4 mb-2" style={{ color: 'rgb(var(--text))' }}>How well do you know this?</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleConfidence(1); }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-600 dark:text-red-400"
                >
                  <ThumbsDown size={18} /> Not sure
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleConfidence(2); }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400"
                >
                  <Meh size={18} /> Okay
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleConfidence(3); }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-500/20 text-green-600 dark:text-green-400"
                >
                  <ThumbsUp size={18} /> Got it
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentIndex((i) => Math.min(terms.length - 1, i + 1))}
          disabled={currentIndex === terms.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

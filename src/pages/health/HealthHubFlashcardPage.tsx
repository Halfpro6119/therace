import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { getUnitById, getTermsByUnit } from '../../config/healthHubData';
import { storage } from '../../utils/storage';
import type { HealthUnitId } from '../../types/healthHub';
import type { HealthConfidenceLevel } from '../../types/healthHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)';

export function HealthHubFlashcardPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const unit = unitId ? getUnitById(unitId as HealthUnitId) : undefined;
  const terms = unit ? getTermsByUnit(unit.id) : [];
  const currentTerm = terms[currentIndex];

  useEffect(() => {
    if (currentTerm) setIsFlipped(false);
  }, [currentIndex, currentTerm]);

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/health-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Back to Health Hub
        </button>
      </div>
    );
  }

  const handleBack = () => navigate(`/health-hub/unit/${unit.id}`);
  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handleConfidence = (level: HealthConfidenceLevel) => {
    if (!currentTerm || !isFlipped) return;
    storage.updateHealthFlashcardMastery(currentTerm.id, level);
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const topicIds = [...new Set(terms.map((t) => t.topicId).filter(Boolean))] as string[];
      topicIds.forEach((topicId) => {
        const termIdsForTopic = terms.filter((t) => t.topicId === topicId).map((t) => t.id);
        const pct = storage.calculateHealthTopicFlashcardMastery(unit.id, topicId, termIdsForTopic);
        const existing = storage.getHealthTopicProgressByKey(unit.id, topicId);
        storage.updateHealthTopicProgress({
          unitId: unit.id,
          topicId,
          flashcardMasteryPercent: pct,
          quickCheckPassed: existing?.quickCheckPassed ?? false,
          caseStudyCompleted: existing?.caseStudyCompleted ?? false,
          investigationCompleted: existing?.investigationCompleted ?? false,
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
              onClick={() => navigate(`/health-hub/unit/${unit.id}/quick-check`)}
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
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No terms for this unit yet.</p>
          <button type="button" onClick={handleBack} className="text-sm font-medium px-4 py-2 rounded-lg bg-red-500/20 text-red-700 dark:text-red-400">
            Back to Unit {unit.id}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Glossary / Flashcards</h1>
        <p className="text-white/90 text-sm">
          {currentIndex + 1} of {terms.length}
        </p>
      </motion.section>

      <div className="perspective-1000">
        <motion.button
          type="button"
          onClick={handleFlip}
          className="w-full rounded-2xl p-8 min-h-[200px] border shadow-lg hover:shadow-xl transition-shadow text-left"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <p className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {currentTerm.term}
                </p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Tap to reveal definition
                </p>
                <RotateCcw size={24} className="mt-4 opacity-50" style={{ color: 'rgb(var(--text-secondary))' }} />
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {currentTerm.term}
                </p>
                <p className="text-base mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {currentTerm.definition}
                </p>
                {currentTerm.inContext && (
                  <p className="text-sm italic" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {currentTerm.inContext}
                  </p>
                )}
                {currentTerm.examTip && (
                  <span className="mt-2 inline-block px-2 py-1 rounded text-xs bg-red-500/20 text-red-700 dark:text-red-400">Exam tip</span>
                )}
                <p className="text-sm mt-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                  How well did you know this?
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleConfidence(1); }}
                    className="p-2 rounded-lg border hover:bg-red-500/10"
                    style={{ borderColor: 'rgb(var(--border))' }}
                    title="Struggled"
                  >
                    <ThumbsDown size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleConfidence(2); }}
                    className="p-2 rounded-lg border hover:bg-red-500/10"
                    style={{ borderColor: 'rgb(var(--border))' }}
                    title="Okay"
                  >
                    <Meh size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleConfidence(3); }}
                    className="p-2 rounded-lg border hover:bg-red-500/10"
                    style={{ borderColor: 'rgb(var(--border))' }}
                    title="Confident"
                  >
                    <ThumbsUp size={20} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
          style={{ borderColor: 'rgb(var(--border))' }}
        >
          <ChevronLeft size={18} />
          Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentIndex((i) => Math.min(terms.length - 1, i + 1))}
          disabled={currentIndex === terms.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
          style={{ borderColor: 'rgb(var(--border))' }}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { getUnitsByPaper, getQuickChecksForUnits } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import type { BusinessUnitId } from '../../types/businessHub';
import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';

export function BusinessHubAllUnitsQuickCheckPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paper = (searchParams.get('paper') || 'all') as 'all' | '1' | '2';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const units = getUnitsByPaper(paper === '1' ? 1 : paper === '2' ? 2 : 'all');
  const unitIds = units.map((u) => u.id) as BusinessUnitId[];
  const checks = getQuickChecksForUnits(unitIds);
  const current = checks[currentIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
  }, [currentIndex, current]);

  const handleBack = () => navigate(`/business-hub/all-units/topics${paper !== 'all' ? `?paper=${paper}` : ''}`);

  const handleSubmit = () => {
    if (!current || selectedAnswer === null) return;
    const correct = current.correctAnswer === selectedAnswer;
    setIsCorrect(correct);
    if (correct) setCorrectCount((c) => c + 1);
    setShowFeedback(true);
    if (correct && current.topicId && current.unitId) {
      const existing = storage.getBusinessTopicProgressByKey(current.unitId as BusinessUnitId, current.topicId);
      storage.updateBusinessTopicProgress({
        unitId: current.unitId as BusinessUnitId,
        topicId: current.topicId,
        flashcardMasteryPercent: existing?.flashcardMasteryPercent ?? 0,
        quickCheckPassed: true,
        caseStudyCompleted: existing?.caseStudyCompleted ?? false,
        calculationsCompleted: existing?.calculationsCompleted ?? false,
        evaluationCompleted: existing?.evaluationCompleted ?? false,
        lastUpdated: new Date().toISOString(),
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < checks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
        >
          <h1 className="text-2xl font-bold text-white mb-2">Quick Check complete</h1>
          <p className="text-white/90 text-sm mb-2">You got {correctCount} out of {checks.length} correct.</p>
          <p className="text-white/90 text-sm mb-6">Well done! Review any units where you need more practice.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30 flex items-center justify-center gap-2"
            >
              Back to All Units
            </button>
            <button
              type="button"
              onClick={() => navigate('/business-hub')}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30"
            >
              Business Hub Home
            </button>
          </div>
        </motion.section>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No quick checks for the selected paper filter.</p>
          <button type="button" onClick={handleBack} className="text-sm font-medium px-4 py-2 rounded-lg" style={{ background: LAB_ACCENT, color: 'white' }}>
            Back to All Units
          </button>
        </div>
      </div>
    );
  }

  const feedback = isCorrect ? current.feedback.correct : current.feedback.incorrect;
  const progressPct = checks.length ? ((currentIndex + 1) / checks.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to All Units
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Quick Check — All Units</h1>
        <p className="text-white/90 text-sm mb-2">Question {currentIndex + 1} of {checks.length}</p>
        <div className="h-2 rounded-full bg-white/30 overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ duration: 0.3 }} />
        </div>
      </motion.section>

      <div className="rounded-xl p-6 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <p className="text-lg font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{current.question}</p>
        {current.type === 'multipleChoice' && current.options && (
          <div className="space-y-2">
            {current.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => !showFeedback && setSelectedAnswer(opt)}
                disabled={showFeedback}
                className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                  selectedAnswer === opt ? 'ring-2 ring-amber-500 border-amber-500' : ''
                } ${showFeedback && opt === current.correctAnswer ? 'bg-green-500/20 border-green-500' : ''}`}
                style={{ borderColor: 'rgb(var(--border))' }}
              >
                {opt}{selectedAnswer === opt && !showFeedback ? ' ✓' : ''}
              </button>
            ))}
          </div>
        )}
        {current.type === 'trueFalse' && current.options && (
          <div className="flex gap-4">
            {current.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => !showFeedback && setSelectedAnswer(opt)}
                disabled={showFeedback}
                className={`px-6 py-3 rounded-lg border ${
                  selectedAnswer === opt ? 'ring-2 ring-amber-500' : ''
                } ${showFeedback && opt === current.correctAnswer ? 'bg-green-500/20 border-green-500' : ''}`}
                style={{ borderColor: 'rgb(var(--border))' }}
              >
                {opt}{selectedAnswer === opt && !showFeedback ? ' ✓' : ''}
              </button>
            ))}
          </div>
        )}

        {!showFeedback && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="mt-6 px-6 py-2 rounded-lg font-semibold text-white disabled:opacity-50"
            style={{ background: LAB_ACCENT }}
          >
            Check answer
          </button>
        )}

        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-lg flex gap-3"
              style={{ background: isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)' }}
            >
              {isCorrect ? <CheckCircle size={24} className="text-green-600 shrink-0" /> : <XCircle size={24} className="text-red-600 shrink-0" />}
              <div>
                <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{feedback}</p>
                <p className="text-sm mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>{current.feedback.ideaReference}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showFeedback && (
          <button type="button" onClick={handleNext} className="mt-6 flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white" style={{ background: LAB_ACCENT }}>
            {currentIndex < checks.length - 1 ? 'Next question' : 'Finish → See results'}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, FileQuestion, CheckCircle, XCircle } from 'lucide-react';
import { getUnitById, getQuestionsByUnit } from '../../config/computeLabData';
import type { ComputeUnitId } from '../../types/computeLab';

const HERO_GRADIENT = 'linear-gradient(135deg, #0891B2 0%, #0E7490 50%, #155E75 100%)';

export function ComputeLabQuestionLabPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const unit = unitId ? getUnitById(unitId as ComputeUnitId) : undefined;
  const questions = unit ? getQuestionsByUnit(unit.id) : [];
  const current = questions[currentIndex];

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

  const handleSubmit = () => {
    if (!current || selectedAnswer === null) return;
    const correct = current.correctAnswer === selectedAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
  };

  const handlePrev = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
        >
          <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
            <ChevronLeft size={18} /> Back to Unit {unit.id}
          </button>
          <h1 className="text-2xl font-bold text-white mb-2">Question Lab</h1>
          <p className="text-white/90 text-sm">No questions for this unit yet.</p>
        </motion.section>
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="text-sm font-medium px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-700 dark:text-cyan-400">
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
        <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Question Lab</h1>
        <p className="text-white/90 text-sm mb-2">Question {currentIndex + 1} of {questions.length}</p>
        <div className="h-2 rounded-full bg-white/30 overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <p className="text-base font-medium" style={{ color: 'rgb(var(--text))' }}>{current!.question}</p>
        {current!.type === 'multipleChoice' && current!.options && (
          <div className="space-y-2">
            {current!.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => !showFeedback && setSelectedAnswer(opt)}
                disabled={showFeedback}
                className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                  selectedAnswer === opt ? 'ring-2 ring-cyan-500 border-cyan-500' : ''
                } ${showFeedback && opt === current!.correctAnswer ? 'bg-green-500/20 border-green-500' : ''}`}
                style={{ borderColor: 'rgb(var(--border))' }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        {!showFeedback && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-6 py-2 rounded-lg font-semibold bg-cyan-500 text-white disabled:opacity-50"
          >
            Check answer
          </button>
        )}
        {showFeedback && (
          <div className={`p-4 rounded-lg flex gap-3 ${isCorrect ? 'bg-green-500/15' : 'bg-red-500/15'}`}>
            {isCorrect ? <CheckCircle size={24} className="text-green-600 shrink-0" /> : <XCircle size={24} className="text-red-600 shrink-0" />}
            <div>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${current!.correctAnswer}`}</p>
              <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Mark scheme: {current!.markScheme}</p>
            </div>
          </div>
        )}
        {showFeedback && (
          <div className="flex gap-4">
            <button type="button" onClick={handlePrev} disabled={currentIndex === 0} className="px-4 py-2 rounded-lg border disabled:opacity-50" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>
              Previous
            </button>
            <button type="button" onClick={handleNext} disabled={currentIndex === questions.length - 1} className="px-4 py-2 rounded-lg bg-cyan-500 text-white disabled:opacity-50">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

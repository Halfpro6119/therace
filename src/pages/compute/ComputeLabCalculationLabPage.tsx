import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Calculator, CheckCircle, XCircle } from 'lucide-react';
import { getUnitById, getCalculationTasksByUnit } from '../../config/computeLabData';
import type { ComputeUnitId } from '../../types/computeLab';

const HERO_GRADIENT = 'linear-gradient(135deg, #0891B2 0%, #0E7490 50%, #155E75 100%)';

export function ComputeLabCalculationLabPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const unit = unitId ? getUnitById(unitId as ComputeUnitId) : undefined;
  const tasks = unit ? getCalculationTasksByUnit(unit.id) : [];
  const current = tasks[currentIndex];

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
    if (!current || !userAnswer.trim()) return;
    const expected = String(current.expected);
    const correct = String(userAnswer.trim()) === expected;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setUserAnswer('');
    setShowFeedback(false);
    setCurrentIndex((i) => Math.min(tasks.length - 1, i + 1));
  };

  const handlePrev = () => {
    setUserAnswer('');
    setShowFeedback(false);
    setCurrentIndex((i) => Math.max(0, i - 1));
  };

  if (tasks.length === 0) {
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
          <h1 className="text-2xl font-bold text-white mb-2">Calculation Lab</h1>
          <p className="text-white/90 text-sm">No calculation tasks for this unit yet.</p>
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
        <h1 className="text-2xl font-bold text-white mb-2">Calculation Lab</h1>
        <p className="text-white/90 text-sm mb-2">Task {currentIndex + 1} of {tasks.length}</p>
        <div className="h-2 rounded-full bg-white/30 overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${((currentIndex + 1) / tasks.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>{current!.scenario}</h2>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Inputs: {JSON.stringify(current!.inputs)}</p>
        {current!.formulaHint && (
          <p className="text-sm italic" style={{ color: 'rgb(var(--text-secondary))' }}>Hint: {current!.formulaHint}</p>
        )}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Your answer:</label>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={showFeedback}
            placeholder="Enter your answer"
            className="w-full px-4 py-3 rounded-lg border font-mono"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          />
        </div>
        {!showFeedback && (
          <button type="button" onClick={handleSubmit} disabled={!userAnswer.trim()} className="px-6 py-2 rounded-lg font-semibold bg-cyan-500 text-white disabled:opacity-50">
            Check answer
          </button>
        )}
        {showFeedback && (
          <div className={`p-4 rounded-lg flex gap-3 ${isCorrect ? 'bg-green-500/15' : 'bg-red-500/15'}`}>
            {isCorrect ? <CheckCircle size={24} className="text-green-600 shrink-0" /> : <XCircle size={24} className="text-red-600 shrink-0" />}
            <div>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{isCorrect ? 'Correct!' : `Incorrect. Expected answer: ${current!.expected}`}</p>
            </div>
          </div>
        )}
        {showFeedback && (
          <div className="flex gap-4">
            <button type="button" onClick={handlePrev} disabled={currentIndex === 0} className="px-4 py-2 rounded-lg border disabled:opacity-50" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>
              Previous
            </button>
            <button type="button" onClick={handleNext} disabled={currentIndex === tasks.length - 1} className="px-4 py-2 rounded-lg bg-cyan-500 text-white disabled:opacity-50">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

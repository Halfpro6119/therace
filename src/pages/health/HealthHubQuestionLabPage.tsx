import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PenLine, CheckCircle2 } from 'lucide-react';
import { getUnitById, getQuestionLabByUnit } from '../../config/healthHubData';
import type { HealthUnitId } from '../../types/healthHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)';

export function HealthHubQuestionLabPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const unit = unitId ? getUnitById(unitId as HealthUnitId) : undefined;
  const items = unit ? getQuestionLabByUnit(unit.id) : [];
  const current = items[currentIndex];

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

  if (!current) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No question lab items for this unit yet.</p>
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
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} />
          Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Question Lab</h1>
        <p className="text-white/90 text-sm mb-2">
          {current.type.charAt(0).toUpperCase() + current.type.slice(1)} – exam-style practice
        </p>
        <p className="text-white/80 text-xs">
          {currentIndex + 1} of {items.length}
        </p>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            Question
          </p>
          <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>
            {current.question}
          </p>
        </div>

        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Plan and write your answer, then reveal the model answer to compare.
        </p>

        {!revealAnswer ? (
          <button
            type="button"
            onClick={() => setRevealAnswer(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-700 dark:text-red-400 font-medium"
          >
            <PenLine size={18} />
            Reveal model answer
          </button>
        ) : (
          <div className="rounded-lg p-4 bg-green-500/10 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={20} className="text-green-500" />
              <span className="font-medium text-sm">Model answer</span>
            </div>
            <p className="text-sm mb-2" style={{ color: 'rgb(var(--text))' }}>
              {current.modelAnswer}
            </p>
            <div className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
              Mark scheme: {current.markScheme.map((m) => `${m.idea} (${m.marks})`).join('; ')}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
          <button
            type="button"
            onClick={() => { setCurrentIndex((i) => Math.max(0, i - 1)); setRevealAnswer(false); }}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <ChevronLeft size={18} />
            Previous
          </button>
          <button
            type="button"
            onClick={() => { setCurrentIndex((i) => Math.min(items.length - 1, i + 1)); setRevealAnswer(false); }}
            disabled={currentIndex === items.length - 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, CheckCircle2 } from 'lucide-react';
import { CARE_VALUE_SCENARIOS } from '../../config/healthHubData';

import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';

export function HealthHubCareValuesPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const current = CARE_VALUE_SCENARIOS[currentIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button
          type="button"
          onClick={() => navigate('/health-hub')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Health Hub
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Care Values Practice</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Identify which care value applies and how a care worker should behave
        </p>
        <p className="text-white/80 text-xs mt-2">
          Scenario {currentIndex + 1} of {CARE_VALUE_SCENARIOS.length}
        </p>
      </motion.section>

      {current && (
        <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <div>
            <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Scenario</p>
            <p className="text-base mb-4" style={{ color: 'rgb(var(--text))' }}>
              {current.scenario}
            </p>
          </div>

          {!revealAnswer ? (
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                Which care value(s) apply? Think about your answer, then reveal.
              </p>
              <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                Options: {current.careValues.join(', ')}
              </p>
              <button
                type="button"
                onClick={() => setRevealAnswer(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
                style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}
              >
                <Heart size={18} />
                Reveal answer
              </button>
            </div>
          ) : (
            <div className="rounded-lg p-4 bg-green-500/10 border border-green-500/30 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={20} className="text-green-500" />
                <span className="font-medium">Correct: {current.correctAnswer}</span>
              </div>
              <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>
                {current.modelAnswer}
              </p>
              {current.breach && (
                <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Breach: {current.breach}
                </p>
              )}
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
              onClick={() => { setCurrentIndex((i) => Math.min(CARE_VALUE_SCENARIOS.length - 1, i + 1)); setRevealAnswer(false); }}
              disabled={currentIndex === CARE_VALUE_SCENARIOS.length - 1}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
              style={{ borderColor: 'rgb(var(--border))' }}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

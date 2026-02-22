import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Search, ChevronRight } from 'lucide-react';
import { getUnitById, getInvestigationsByUnit } from '../../config/healthHubData';
import { storage } from '../../utils/storage';
import type { HealthUnitId } from '../../types/healthHub';

import { LAB_HERO_GRADIENT } from '../../config/hubTheme';

export function HealthHubInvestigationPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [invIndex, setInvIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [stepAnswers, setStepAnswers] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);

  const unit = unitId ? getUnitById(unitId as HealthUnitId) : undefined;
  const investigations = unit ? getInvestigationsByUnit(unit.id) : [];
  const currentInv = investigations[invIndex];
  const currentStep = currentInv?.steps[stepIndex];

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

  const handleNext = () => {
    if (currentStep && stepIndex < currentInv.steps.length - 1) {
      setStepIndex(stepIndex + 1);
      setShowModel(false);
    } else if (invIndex < investigations.length - 1) {
      setInvIndex(invIndex + 1);
      setStepIndex(0);
      setShowModel(false);
    } else {
      storage.markHealthUnitInvestigationCompleted(unit.id, unit.topics.map((t) => t.id));
      navigate(`/health-hub/unit/${unit.id}`);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      setShowModel(false);
    } else if (invIndex > 0) {
      setInvIndex(invIndex - 1);
      const prevInv = investigations[invIndex - 1];
      setStepIndex(prevInv?.steps.length ? prevInv.steps.length - 1 : 0);
      setShowModel(false);
    }
  };

  const handleStepAnswer = (stepPrompt: string, value: string) => {
    setStepAnswers((prev) => ({ ...prev, [stepPrompt]: value }));
  };

  if (!currentInv) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No investigations for this unit. (Unit 2 & 3 only)</p>
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
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} />
          Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Investigation Lab</h1>
        <p className="text-white/90 text-sm mb-2">{currentInv.title}</p>
        <p className="text-white/80 text-xs">
          Step {stepIndex + 1} of {currentInv.steps.length}
        </p>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Aim</p>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text))' }}>{currentInv.aim}</p>
          <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Scenario</p>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text))' }}>{currentInv.scenario}</p>
        </div>

        {currentStep && (
          <>
            <div>
              <p className="font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                {currentStep.prompt}
              </p>
              {currentStep.hint && (
                <p className="text-xs mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Hint: {currentStep.hint}
                </p>
              )}
              <textarea
                value={stepAnswers[currentStep.prompt] ?? ''}
                onChange={(e) => handleStepAnswer(currentStep.prompt, e.target.value)}
                placeholder="Write your answer..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border text-sm"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}
              />
            </div>

            {stepIndex === currentInv.steps.length - 1 && (
              <>
                {!showModel ? (
                  <button
                    type="button"
                    onClick={() => setShowModel(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-700 dark:text-red-400 font-medium"
                  >
                    <Search size={18} />
                    Show model conclusion
                  </button>
                ) : (
                  <div className="rounded-lg p-4 bg-green-500/10 border border-green-500/30">
                    <p className="text-sm font-medium mb-1">Model conclusion</p>
                    <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{currentInv.modelConclusion}</p>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-between pt-4 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={invIndex === 0 && stepIndex === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
                style={{ borderColor: 'rgb(var(--border))' }}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium"
              >
                {invIndex === investigations.length - 1 && stepIndex === currentInv.steps.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

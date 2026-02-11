import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Lightbulb, BookOpen, Target, FileText, Calculator, MessageSquare, ChevronRight, List, Lock, Zap } from 'lucide-react';
import { getUnitById } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import type { BusinessUnitId } from '../../types/businessHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)';

const LEARN_MODES = [
  { id: 'concept', title: 'Concept Lab', description: 'Core ideas, misconceptions & change scenarios', icon: Lightbulb, color: '#0EA5E9', order: 1 },
  { id: 'flashcard', title: 'Glossary / Flashcards', description: 'Learn key terms and definitions', icon: BookOpen, color: '#0EA5E9', order: 2 },
  { id: 'quick-check', title: 'Quick Check', description: 'Micro-assessments before case studies', icon: Target, color: '#F59E0B', order: 3 },
  { id: 'case-study', title: 'Case Study Lab', description: 'Apply knowledge to scenarios & data', icon: FileText, color: '#EC4899', order: 4 },
] as const;

const PRACTISE_MODES = [
  { id: 'calculations', title: 'Calculation Lab', description: 'Revenue, costs, cash flow, margins', icon: Calculator, color: '#8B5CF6' },
  { id: 'evaluation', title: 'Evaluation Builder', description: 'Practise assess & evaluate questions', icon: MessageSquare, color: '#10B981' },
] as const;

export function BusinessHubUnitPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const unit = unitId ? getUnitById(unitId as BusinessUnitId) : undefined;

  const topicIds = unit ? unit.topics.map((t) => t.id) : [];
  const quickCheckSummary = unit ? storage.getBusinessUnitQuickCheckSummary(unit.id, topicIds) : { passed: 0, total: 0 };
  const caseStudyUnlocked = unit ? storage.isBusinessCaseStudyUnlocked(unit.id, topicIds) : false;
  const calculationsUnlocked = unit ? storage.isBusinessCalculationsUnlocked(unit.id, topicIds) : false;
  const evaluationUnlocked = unit ? storage.isBusinessEvaluationUnlocked(unit.id, topicIds) : false;

  const recommendedStep = useMemo(() => {
    if (!unit) return null;
    const { passed, total } = quickCheckSummary;
    if (total > 0 && passed < total) {
      return { mode: 'quick-check' as const, label: 'Complete Quick Check to unlock Case Study', path: `/business-hub/unit/${unit.id}/quick-check` };
    }
    if (!caseStudyUnlocked && total > 0) return { mode: 'quick-check' as const, label: 'Do Quick Check first', path: `/business-hub/unit/${unit.id}/quick-check` };
    if (caseStudyUnlocked) {
      const all = storage.getBusinessTopicProgress();
      const anyCaseStudyDone = topicIds.some((tid) => all[`${unit.id}-${tid}`]?.caseStudyCompleted);
      if (!anyCaseStudyDone) return { mode: 'case-study' as const, label: 'Try Case Study Lab', path: `/business-hub/unit/${unit.id}/case-study` };
    }
    if (calculationsUnlocked) {
      const all = storage.getBusinessTopicProgress();
      const anyCalcDone = topicIds.some((tid) => all[`${unit.id}-${tid}`]?.calculationsCompleted);
      if (!anyCalcDone) return { mode: 'calculations' as const, label: 'Try Calculation Lab', path: `/business-hub/unit/${unit.id}/calculations` };
    }
    if (evaluationUnlocked) {
      const all = storage.getBusinessTopicProgress();
      const anyEvalDone = topicIds.some((tid) => all[`${unit.id}-${tid}`]?.evaluationCompleted);
      if (!anyEvalDone) return { mode: 'evaluation' as const, label: 'Try Evaluation Builder', path: `/business-hub/unit/${unit.id}/evaluation` };
    }
    return { mode: 'concept' as const, label: 'Start with Concept Lab', path: `/business-hub/unit/${unit.id}/concept` };
  }, [unit, quickCheckSummary.passed, quickCheckSummary.total, caseStudyUnlocked, calculationsUnlocked, evaluationUnlocked, topicIds]);

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/business-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Back to Business Hub
        </button>
      </div>
    );
  }

  const handleMode = (modeId: string) => {
    if (modeId === 'case-study' && !caseStudyUnlocked) return;
    if (modeId === 'calculations' && !calculationsUnlocked) return;
    if (modeId === 'evaluation' && !evaluationUnlocked) return;
    navigate(`/business-hub/unit/${unit.id}/${modeId}`);
  };

  const isLocked = (modeId: string) => {
    if (modeId === 'case-study') return !caseStudyUnlocked;
    if (modeId === 'calculations') return !calculationsUnlocked;
    if (modeId === 'evaluation') return !evaluationUnlocked;
    return false;
  };

  const lockMessage = (modeId: string) => {
    if (modeId === 'case-study') return 'Complete Quick Check for at least one topic to unlock.';
    if (modeId === 'calculations') return 'Complete Case Study Lab for this unit to unlock.';
    if (modeId === 'evaluation') return 'Complete Calculation Lab for this unit to unlock.';
    return '';
  };

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
          onClick={() => navigate('/business-hub')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Business Hub
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Unit {unit.id} – {unit.title}</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          {unit.topics.length} topics. Follow the core path, then practise.
        </p>
        {recommendedStep && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/10 mb-4">
            <Zap size={18} className="text-amber-200 flex-shrink-0" />
            <span className="text-sm text-white">
              <strong>Recommended:</strong> {recommendedStep.label}
              <button type="button" onClick={() => navigate(recommendedStep!.path)} className="ml-2 underline hover:no-underline font-semibold">
                Start →
              </button>
            </span>
          </div>
        )}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(`/business-hub/unit/${unit.id}/topics`)}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
          >
            <List size={18} />
            View topic list
          </button>
          {quickCheckSummary.total > 0 && (
            <span className="text-sm text-white/90">
              Quick Check: {quickCheckSummary.passed}/{quickCheckSummary.total} topics passed
            </span>
          )}
        </div>
      </motion.section>

      {/* Learn — Core path */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} className="text-amber-500" />
          Learn — Core path
        </h2>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Follow this order: Concept Lab → Glossary → Quick Check → Case Study Lab
        </p>
        <div className="grid gap-4">
          {LEARN_MODES.sort((a, b) => a.order - b.order).map((mode, index) => {
            const locked = isLocked(mode.id);
            return (
              <motion.button
                key={mode.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => !locked && handleMode(mode.id)}
                disabled={locked}
                className={`w-full rounded-2xl p-6 text-left border shadow-sm transition-all flex items-center justify-between ${locked ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md'}`}
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl flex items-center gap-2" style={{ background: `${mode.color}20` }}>
                    {locked ? <Lock size={22} style={{ color: mode.color }} /> : <mode.icon size={26} style={{ color: mode.color }} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-0.5 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                      {mode.title}
                      {locked && <span className="text-xs font-normal px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-400">Locked</span>}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {locked ? lockMessage(mode.id) : mode.description}
                    </p>
                  </div>
                </div>
                {!locked && <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Practise */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <Zap size={20} className="text-amber-500" />
          Practise — Strengthen understanding
        </h2>
        <div className="grid gap-4">
          {PRACTISE_MODES.map((mode, index) => {
            const locked = isLocked(mode.id);
            return (
              <motion.button
                key={mode.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => !locked && handleMode(mode.id)}
                disabled={locked}
                className={`w-full rounded-2xl p-6 text-left border shadow-sm transition-all flex items-center justify-between ${locked ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-md'}`}
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl flex items-center gap-2" style={{ background: `${mode.color}20` }}>
                    {locked ? <Lock size={22} style={{ color: mode.color }} /> : <mode.icon size={26} style={{ color: mode.color }} />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-0.5 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                      {mode.title}
                      {locked && <span className="text-xs font-normal px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-400">Locked</span>}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {locked ? lockMessage(mode.id) : mode.description}
                    </p>
                  </div>
                </div>
                {!locked && <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />}
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

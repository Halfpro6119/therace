import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Lightbulb, BookOpen, Target, FileText, Search, MessageSquare, PenLine, ChevronRight, Lock, Zap, Calendar, FileQuestion } from 'lucide-react';
import { getUnitById } from '../../config/healthHubData';
import { storage } from '../../utils/storage';
import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';
import type { HealthUnitId } from '../../types/healthHub';

const LEARN_MODES = [
  { id: 'concept', title: 'Concept Lab', description: 'Core ideas, misconceptions & apply scenarios', icon: Lightbulb, color: '#0EA5E9', order: 1 },
  { id: 'flashcard', title: 'Glossary / Flashcards', description: 'Learn key terms and definitions', icon: BookOpen, color: '#0EA5E9', order: 2 },
  { id: 'quick-check', title: 'Quick Check', description: 'Micro-assessments before case studies', icon: Target, color: '#F59E0B', order: 3 },
  { id: 'case-study', title: 'Case Study Lab', description: 'Apply knowledge to scenarios', icon: FileText, color: '#EC4899', order: 4 },
] as const;

const PRACTISE_MODES = [
  { id: 'investigation', title: 'Investigation Lab', description: 'Plan investigations (Unit 2 & 3)', icon: Search, color: '#8B5CF6', units: ['2', '3'] },
  { id: 'care-values', title: 'Care Values Practice', description: 'Identify and apply care values', icon: MessageSquare, color: '#10B981', units: ['1', '2', '3', '4'] },
  { id: 'question-lab', title: 'Question Lab', description: 'Describe, explain, analyse, evaluate', icon: PenLine, color: '#6366F1', units: ['1', '2', '3', '4'] },
] as const;

export function HealthHubUnitPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const unit = unitId ? getUnitById(unitId as HealthUnitId) : undefined;

  const topicIds = unit ? unit.topics.map((t) => t.id) : [];
  const quickCheckSummary = unit ? storage.getHealthUnitQuickCheckSummary(unit.id, topicIds) : { passed: 0, total: 0 };
  const caseStudyUnlocked = unit ? storage.isHealthCaseStudyUnlocked(unit.id, topicIds) : false;

  const recommendedStep = useMemo(() => {
    if (!unit) return null;
    const { passed, total } = quickCheckSummary;
    if (total > 0 && passed < total) {
      return { mode: 'quick-check' as const, label: 'Complete Quick Check to unlock Case Study', path: `/health-hub/unit/${unit.id}/quick-check` };
    }
    if (!caseStudyUnlocked && total > 0) return { mode: 'quick-check' as const, label: 'Do Quick Check first', path: `/health-hub/unit/${unit.id}/quick-check` };
    if (caseStudyUnlocked) {
      const all = storage.getHealthTopicProgress();
      const anyCaseStudyDone = topicIds.some((tid) => all[`${unit.id}-${tid}`]?.caseStudyCompleted);
      if (!anyCaseStudyDone) return { mode: 'case-study' as const, label: 'Try Case Study Lab', path: `/health-hub/unit/${unit.id}/case-study` };
    }
    return { mode: 'concept' as const, label: 'Start with Concept Lab', path: `/health-hub/unit/${unit.id}/concept` };
  }, [unit, quickCheckSummary.passed, quickCheckSummary.total, caseStudyUnlocked, topicIds]);

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

  const handleMode = (modeId: string) => {
    if (modeId === 'case-study' && !caseStudyUnlocked) return;
    if (modeId === 'investigation') navigate('/health-hub/unit/' + unit.id + '/investigation');
    else if (modeId === 'care-values') navigate('/health-hub/care-values');
    else if (modeId === 'question-lab') navigate('/health-hub/unit/' + unit.id + '/question-lab');
    else navigate(`/health-hub/unit/${unit.id}/${modeId}`);
  };

  const isLocked = (modeId: string) => {
    if (modeId === 'case-study') return !caseStudyUnlocked;
    return false;
  };

  const isPractiseAvailable = (modeId: string) => {
    if (modeId === 'investigation') return ['2', '3'].includes(unit.id);
    return true;
  };

  const lockMessage = (modeId: string) => {
    if (modeId === 'case-study') return 'Complete Quick Check for at least one topic to unlock.';
    return '';
  };

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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Unit {unit.id} – {unit.title}</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          {unit.topics.length} topics. Follow the core path, then practise.
        </p>
        {recommendedStep && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/10 mb-4">
            <Zap size={18} className="text-white/90 flex-shrink-0" />
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
            onClick={() => navigate('/health-hub/life-stages')}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
          >
            <Calendar size={18} />
            Life Stages
          </button>
          {quickCheckSummary.total > 0 && (
            <span className="text-sm text-white/90">
              Quick Check: {quickCheckSummary.passed}/{quickCheckSummary.total} topics passed
            </span>
          )}
        </div>
      </motion.section>

      {/* Test yourself */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <FileQuestion size={20} style={{ color: '#8B5CF6' }} />
          Test yourself
        </h2>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Past-paper-style assessments. Topic test first, then full unit test.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.button type="button" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/health-hub/unit/${unit.id}/quick-check`)}
            className="rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center gap-4"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#8B5CF6' }}>1</span>
            <div>
              <h3 className="font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>Topic test</h3>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Micro-assessments per topic</p>
            </div>
            <ChevronRight size={20} className="flex-shrink-0 ml-auto" style={{ color: 'rgb(var(--text-secondary))' }} />
          </motion.button>
          <motion.button type="button" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => handleMode('question-lab')}
            className="rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center gap-4"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: '#10B981' }}>2</span>
            <div>
              <h3 className="font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>Full unit test</h3>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Describe, explain, analyse, evaluate</p>
            </div>
            <ChevronRight size={20} className="flex-shrink-0 ml-auto" style={{ color: 'rgb(var(--text-secondary))' }} />
          </motion.button>
        </div>
      </section>

      {/* Revise */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} style={{ color: '#0EA5E9' }} />
          Revise to improve your score
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.button type="button" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => handleMode('flashcard')}
            className="rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center gap-4"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#0EA5E920' }}>
              <BookOpen size={20} style={{ color: '#0EA5E9' }} />
            </div>
            <div>
              <h3 className="font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>Flashcards</h3>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Key terms and definitions</p>
            </div>
            <ChevronRight size={20} className="flex-shrink-0 ml-auto" style={{ color: 'rgb(var(--text-secondary))' }} />
          </motion.button>
          <motion.button type="button" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            onClick={() => handleMode('quick-check')}
            className="rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center gap-4"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#F59E0B20' }}>
              <Target size={20} style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <h3 className="font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>Quick check</h3>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>MCQ, T/F, drag order</p>
            </div>
            <ChevronRight size={20} className="flex-shrink-0 ml-auto" style={{ color: 'rgb(var(--text-secondary))' }} />
          </motion.button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <Lightbulb size={20} style={{ color: LAB_ACCENT }} />
          Learn — Core path
        </h2>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Concept Lab → Glossary → Quick Check → Case Study Lab
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
                      {locked && <span className="text-xs font-normal px-2 py-0.5 rounded" style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}>Locked</span>}
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

      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <Zap size={20} style={{ color: LAB_ACCENT }} />
          Practise
        </h2>
        <div className="grid gap-4">
          {PRACTISE_MODES.filter((m) => isPractiseAvailable(m.id)).map((mode, index) => (
            <motion.button
              key={mode.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => handleMode(mode.id)}
              className="w-full rounded-2xl p-6 text-left border shadow-sm transition-all flex items-center justify-between hover:shadow-md"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="p-3 rounded-xl flex items-center gap-2" style={{ background: `${mode.color}20` }}>
                  <mode.icon size={26} style={{ color: mode.color }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                    {mode.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {mode.description}
                  </p>
                </div>
              </div>
              <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

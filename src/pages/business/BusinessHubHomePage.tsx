import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Briefcase, ChevronRight, Zap, Layers } from 'lucide-react';
import { BUSINESS_UNITS } from '../../config/businessHubData';
import { LAB_HERO_GRADIENT, LAB_FILTER_ACTIVE, LAB_ACCENT } from '../../config/hubTheme';
import { storage } from '../../utils/storage';
import type { BusinessUnitId } from '../../types/businessHub';

function filterUnitsByPaper(paper: 'all' | 1 | 2) {
  if (paper === 'all') return BUSINESS_UNITS;
  return BUSINESS_UNITS.filter((u) => (paper === 1 ? u.paper1 : u.paper2));
}

export function BusinessHubHomePage() {
  const navigate = useNavigate();
  const [paperFilter, setPaperFilter] = useState<'all' | 1 | 2>('all');
  const unitsToShow = useMemo(() => filterUnitsByPaper(paperFilter), [paperFilter]);

  const recommended = useMemo(() => {
    const allProgress = storage.getBusinessTopicProgress();
    for (const unit of BUSINESS_UNITS) {
      const topicIds = unit.topics.map((t) => t.id);
      const { passed, total } = storage.getBusinessUnitQuickCheckSummary(unit.id as BusinessUnitId, topicIds);
      const anyProgress = topicIds.some((tid) => {
        const p = allProgress[`${unit.id}-${tid}`];
        return p && (p.flashcardMasteryPercent > 0 || p.quickCheckPassed || p.caseStudyCompleted || p.calculationsCompleted || p.evaluationCompleted);
      });
      if (total > 0 && passed < total) {
        if (!anyProgress) return { type: 'start' as const, unit, label: `Start with Unit ${unit.id}`, path: `/business-hub/unit/${unit.id}/topics` };
        return { type: 'continue' as const, unit, label: `Continue Unit ${unit.id}`, path: `/business-hub/unit/${unit.id}/topics` };
      }
    }
    return { type: 'start' as const, unit: BUSINESS_UNITS[0], label: 'Start with Unit 3.1', path: '/business-hub/unit/3.1/topics' };
  }, []);

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
          onClick={() => navigate('/subjects')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Business Hub</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          AQA GCSE Business 8132 – Concepts, glossary, quick checks, case studies, calculations & evaluation
        </p>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-white/10">
          <Zap size={18} className="text-white/90 flex-shrink-0" />
          <span className="text-sm text-white">
            <strong>Recommended:</strong> {recommended.label}
            <button
              type="button"
              onClick={() => navigate(recommended.path)}
              className="ml-2 underline hover:no-underline font-semibold"
            >
              Go →
            </button>
          </span>
        </div>
      </motion.section>

      {/* Paper filter */}
      <section className="rounded-xl p-4 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Filter by paper
        </h2>
        <div className="flex gap-2">
          {(['all', 1, 2] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPaperFilter(p)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                paperFilter === p ? 'text-white' : 'text-gray-700 dark:text-gray-300'
              }`}
              style={{
                background: paperFilter === p ? LAB_FILTER_ACTIVE : 'rgb(var(--surface-2))',
              }}
            >
              {p === 'all' ? 'All units' : `Paper ${p}`}
            </button>
          ))}
        </div>
      </section>

      {/* Work on All Units – prominent first card */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        onClick={() => navigate(`/business-hub/all-units/topics?paper=${paperFilter}`)}
        className="w-full rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
        style={{
          background: `linear-gradient(135deg, ${LAB_ACCENT}15 0%, rgba(59,130,246,0.08) 100%)`,
          borderColor: LAB_ACCENT,
        }}
      >
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl flex items-center justify-center" style={{ background: `${LAB_ACCENT}30` }}>
            <Layers size={28} style={{ color: LAB_ACCENT }} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
              Work on All Units
            </h3>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              Flashcards, Quick Check, Concept Lab & more across every unit
            </p>
          </div>
        </div>
        <ChevronRight size={24} style={{ color: LAB_ACCENT }} />
      </motion.button>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Choose a unit
        </h2>
        <div className="grid gap-4">
          {unitsToShow.map((unit, index) => (
            <motion.button
              key={unit.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/business-hub/unit/${unit.id}/topics`)}
              className="w-full rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl flex items-center justify-center" style={{ background: `${LAB_ACCENT}20` }}>
                  <Briefcase size={28} style={{ color: LAB_ACCENT }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                    Unit {unit.id} – {unit.shortTitle}
                  </h3>
                  <p className="text-sm flex items-center gap-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                    <span>{unit.topics.length} topics</span>
                    {unit.paper1 && unit.paper2 && <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}>P1 & P2</span>}
                    {unit.paper1 && !unit.paper2 && <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}>Paper 1</span>}
                    {!unit.paper1 && unit.paper2 && <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}>Paper 2</span>}
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

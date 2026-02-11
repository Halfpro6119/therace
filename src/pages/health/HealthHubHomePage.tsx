import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Zap } from 'lucide-react';
import { HEALTH_UNITS, getUnitsByAward } from '../../config/healthHubData';
import { storage } from '../../utils/storage';
import type { HealthUnitId } from '../../types/healthHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)';

export function HealthHubHomePage() {
  const navigate = useNavigate();
  const award = storage.getHealthHubAward();
  const unitsToShow = useMemo(() => {
    const awardUnits = award ? getUnitsByAward(award) : HEALTH_UNITS.filter((u) => u.singleAward);
    return awardUnits;
  }, [award]);

  const recommended = useMemo(() => {
    for (const unit of unitsToShow) {
      const topicIds = unit.topics.map((t) => t.id);
      const { passed, total } = storage.getHealthUnitQuickCheckSummary(unit.id as HealthUnitId, topicIds);
      const progress = storage.getHealthTopicProgress();
      const anyProgress = topicIds.some((tid) => {
        const p = progress[`${unit.id}-${tid}`];
        return p && (p.flashcardMasteryPercent > 0 || p.quickCheckPassed || p.caseStudyCompleted || p.investigationCompleted);
      });
      if (total > 0 && passed < total) {
        if (!anyProgress) return { type: 'start' as const, unit, label: `Start with Unit ${unit.id}`, path: `/health-hub/unit/${unit.id}` };
        return { type: 'continue' as const, unit, label: `Continue Unit ${unit.id}`, path: `/health-hub/unit/${unit.id}` };
      }
    }
    return { type: 'start' as const, unit: unitsToShow[0], label: 'Start with Unit 1', path: '/health-hub/unit/1' };
  }, [unitsToShow]);

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
          onClick={() => navigate('/subjects')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Health Hub</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          Edexcel GCSE Health & Social Care – Concepts, case studies, life stages & care values
        </p>
        <div className="flex items-center gap-4 mb-4">
          <button
            type="button"
            onClick={() => navigate('/health-hub/award-select')}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium"
          >
            <Heart size={18} />
            {award ? (award === 'single' ? 'Single Award' : 'Double Award') : 'Choose award'}
          </button>
        </div>
        {recommended && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-white/10">
            <Zap size={18} className="text-red-200 flex-shrink-0" />
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
        )}
      </motion.section>

      {/* Quick links */}
      <section className="rounded-xl p-4 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Learning modes
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigate('/health-hub/life-stages')}
            className="px-4 py-2 rounded-lg font-medium text-sm border"
            style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
          >
            Life Stages
          </button>
          <button
            type="button"
            onClick={() => navigate('/health-hub/care-values')}
            className="px-4 py-2 rounded-lg font-medium text-sm border"
            style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
          >
            Care Values
          </button>
          <button
            type="button"
            onClick={() => navigate('/health-hub/revision-map')}
            className="px-4 py-2 rounded-lg font-medium text-sm border"
            style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
          >
            Revision Map
          </button>
        </div>
      </section>

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
              onClick={() => navigate(`/health-hub/unit/${unit.id}`)}
              className="w-full rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
              }}
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-red-500/20">
                  <Heart size={28} className="text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                    Unit {unit.id} – {unit.shortTitle}
                  </h3>
                  <p className="text-sm flex items-center gap-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                    <span>{unit.topics.length} topics</span>
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

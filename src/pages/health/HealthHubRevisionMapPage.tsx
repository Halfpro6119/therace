import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, CheckCircle, Circle } from 'lucide-react';
import { HEALTH_UNITS, getUnitsByAward } from '../../config/healthHubData';
import { storage } from '../../utils/storage';

const HERO_GRADIENT = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)';

export function HealthHubRevisionMapPage() {
  const navigate = useNavigate();
  const award = storage.getHealthHubAward();
  const unitsToShow = useMemo(() => {
    return award ? getUnitsByAward(award) : HEALTH_UNITS.filter((u) => u.singleAward);
  }, [award]);

  const progress = storage.getHealthTopicProgress();

  const getUnitProgress = (unitId: string, topicIds: string[]) => {
    const passed = topicIds.filter((tid) => progress[`${unitId}-${tid}`]?.quickCheckPassed).length;
    const caseStudy = topicIds.some((tid) => progress[`${unitId}-${tid}`]?.caseStudyCompleted);
    const concept = topicIds.length > 0;
    return { passed, total: topicIds.length, caseStudy, concept };
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
          onClick={() => navigate('/health-hub')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Health Hub
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Revision Map</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Your progress across all units. {award ? (award === 'single' ? 'Single Award' : 'Double Award') : 'Choose award in Health Hub'}
        </p>
      </motion.section>

      <div className="space-y-4">
        {unitsToShow.map((unit, index) => {
          const topicIds = unit.topics.map((t) => t.id);
          const { passed, total, caseStudy } = getUnitProgress(unit.id, topicIds);
          const pct = total > 0 ? Math.round((passed / total) * 100) : 0;

          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl p-6 border"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-red-500/20">
                    <Heart size={24} className="text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
                      Unit {unit.id} – {unit.shortTitle}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Quick Check: {passed}/{total} topics passed
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/health-hub/unit/${unit.id}`)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-500/20 text-red-700 dark:text-red-400 font-medium text-sm"
                >
                  Open
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  {pct >= 70 ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Circle size={18} className="text-gray-400" />
                  )}
                  <span className="text-sm">Concept & Glossary</span>
                </div>
                <div className="flex items-center gap-2">
                  {passed > 0 ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Circle size={18} className="text-gray-400" />
                  )}
                  <span className="text-sm">Quick Check</span>
                </div>
                <div className="flex items-center gap-2">
                  {caseStudy ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Circle size={18} className="text-gray-400" />
                  )}
                  <span className="text-sm">Case Study</span>
                </div>
              </div>

              <div className="mt-3 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full rounded-full bg-red-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

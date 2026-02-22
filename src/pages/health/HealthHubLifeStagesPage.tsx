import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronUp, Activity, Brain, Heart, Users } from 'lucide-react';
import { LIFE_STAGES } from '../../config/healthHubData';

import { LAB_HERO_GRADIENT } from '../../config/hubTheme';

export function HealthHubLifeStagesPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Life Stages & PIES</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Explore development across six life stages: Physical, Intellectual, Emotional, Social
        </p>
      </motion.section>

      <div className="space-y-4">
        {LIFE_STAGES.sort((a, b) => a.order - b.order).map((stage, index) => {
          const isExpanded = expandedId === stage.id;
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border overflow-hidden"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : stage.id)}
                className="w-full p-6 text-left flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
                    {stage.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {stage.ageRange}
                  </p>
                </div>
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 space-y-4 border-t"
                  style={{ borderColor: 'rgb(var(--border))' }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg p-4 bg-red-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity size={18} className="text-red-500" />
                        <span className="font-semibold text-sm">Physical</span>
                      </div>
                      <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {stage.physical.map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg p-4 bg-blue-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain size={18} className="text-blue-500" />
                        <span className="font-semibold text-sm">Intellectual</span>
                      </div>
                      <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {stage.intellectual.map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg p-4 bg-amber-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart size={18} className="text-amber-500" />
                        <span className="font-semibold text-sm">Emotional</span>
                      </div>
                      <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {stage.emotional.map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg p-4 bg-green-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <Users size={18} className="text-green-500" />
                        <span className="font-semibold text-sm">Social</span>
                      </div>
                      <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {stage.social.map((p, i) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

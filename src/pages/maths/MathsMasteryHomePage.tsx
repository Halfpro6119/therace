import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calculator, Sigma, BarChart3 } from 'lucide-react';
import { FEATURED_HUBS } from '../../config/subjectGroups';

const hubConfig = FEATURED_HUBS.find((h) => h.id === 'maths')!;

const PILLARS = [
  {
    id: 'maths',
    title: 'Maths',
    description: 'GCSE Maths – Higher or Foundation, by paper or by topic (e.g. Circle Theorems)',
    path: '/maths-mastery/maths',
    icon: Calculator,
    color: '#6366F1',
  },
  {
    id: 'further-maths',
    title: 'Further Maths',
    description: 'Level 2 / FSMQ-style Further Mathematics – coming soon',
    path: '/maths-mastery/further-maths',
    icon: Sigma,
    color: '#8B5CF6',
  },
  {
    id: 'statistics',
    title: 'Statistics',
    description: 'GCSE Statistics – coming soon',
    path: '/maths-mastery/statistics',
    icon: BarChart3,
    color: '#0EA5E9',
  },
] as const;

export function MathsMasteryHomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${hubConfig.accentColor} 0%, ${hubConfig.accentColor}CC 100%)`,
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/subjects')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Maths Mastery</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Build fluency and exam-ready speed across GCSE Maths – by paper or by topic.
        </p>
      </motion.section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Practice GCSE Maths
        </h2>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Full papers and topic drills covering everything you&apos;ll be tested on. Further Maths and Statistics are coming soon.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            const isComingSoon = pillar.id !== 'maths';
            return (
              <motion.button
                key={pillar.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => navigate(pillar.path)}
                className={`rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex flex-col relative ${
                  pillar.id === 'maths' ? 'ring-2 ring-offset-2 ring-offset-[rgb(var(--bg))]' : ''
                }`}
                style={{
                  background: pillar.id === 'maths' ? 'rgb(var(--surface))' : 'rgb(var(--surface))',
                  borderColor: pillar.id === 'maths' ? hubConfig.accentColor : 'rgb(var(--border))',
                  ...(pillar.id === 'maths' ? { boxShadow: `0 0 0 2px ${hubConfig.accentColor}40` } : {}),
                }}
              >
                {isComingSoon && (
                  <span
                    className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
                    style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}
                  >
                    Coming soon
                  </span>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${pillar.color}20` }}
                >
                  <Icon size={24} style={{ color: pillar.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {pillar.title}
                </h3>
                <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {pillar.description}
                </p>
                <div className="mt-4 flex items-center gap-1 font-semibold text-sm" style={{ color: pillar.color }}>
                  <span>{pillar.id === 'maths' ? 'Start practising' : 'Open'}</span>
                  <ChevronRight size={16} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/**
 * Combined Science (AQA 8464) – 6-paper dashboard
 * Papers 1–2: Biology, 3–4: Chemistry, 5–6: Physics
 * Selecting a paper routes to the corresponding Triple Science subject/paper.
 */
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Dna, FlaskConical, Atom } from 'lucide-react';

const PAPERS = [
  { paper: 1, subject: 'biology' as const, subjectPaper: 1 as const, label: 'Biology Paper 1', color: '#10B981', icon: Dna },
  { paper: 2, subject: 'biology' as const, subjectPaper: 2 as const, label: 'Biology Paper 2', color: '#10B981', icon: Dna },
  { paper: 3, subject: 'chemistry' as const, subjectPaper: 1 as const, label: 'Chemistry Paper 1', color: '#3B82F6', icon: FlaskConical },
  { paper: 4, subject: 'chemistry' as const, subjectPaper: 2 as const, label: 'Chemistry Paper 2', color: '#3B82F6', icon: FlaskConical },
  { paper: 5, subject: 'physics' as const, subjectPaper: 1 as const, label: 'Physics Paper 1', color: '#8B5CF6', icon: Atom },
  { paper: 6, subject: 'physics' as const, subjectPaper: 2 as const, label: 'Physics Paper 2', color: '#8B5CF6', icon: Atom },
];

export function ScienceLabCombinedSciencePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/science-lab')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Science Lab
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Combined Science</h1>
        <p className="text-white/90 text-sm sm:text-base">
          AQA 8464 – 6 papers. Select a paper to enter Lab Mode (same content as Triple, shorter questions).
        </p>
      </motion.section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Papers 1–6
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PAPERS.map((p, index) => {
            const Icon = p.icon;
            return (
              <motion.button
                key={p.paper}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                onClick={() => navigate(`/science-lab/${p.subject}/${p.subjectPaper}/higher`)}
                className="rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${p.color}20` }}
                  >
                    <Icon size={20} style={{ color: p.color }} />
                  </div>
                  <div>
                    <span className="text-xs font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Paper {p.paper}
                    </span>
                    <p className="text-sm font-bold" style={{ color: 'rgb(var(--text))' }}>
                      {p.label}
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} style={{ color: 'rgb(var(--text-secondary))' }} />
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

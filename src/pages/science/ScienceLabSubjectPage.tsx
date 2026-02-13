import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, FlaskConical, Atom, Dna, ChevronRight, TestTube2 } from 'lucide-react';
import type { ScienceSubject } from '../../types/scienceLab';

const TRIPLE_SUBJECTS: Array<{
  id: ScienceSubject;
  title: string;
  description: string;
  icon: typeof FlaskConical;
  color: string;
}> = [
  {
    id: 'Biology',
    title: 'Biology',
    description: 'Processes, homeostasis, required practicals, data interpretation',
    icon: Dna,
    color: '#10B981',
  },
  {
    id: 'Chemistry',
    title: 'Chemistry',
    description: 'Moles, calculations, rate factors, structure-property links',
    icon: FlaskConical,
    color: '#3B82F6',
  },
  {
    id: 'Physics',
    title: 'Physics',
    description: 'Equations, units, graphs, energy models, proportional reasoning',
    icon: Atom,
    color: '#8B5CF6',
  },
];

export function ScienceLabSubjectPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%)',
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Science Lab</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Triple Science: Biology, Chemistry, Physics. Or Combined Science (6 papers).
        </p>
      </motion.section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Triple Science
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRIPLE_SUBJECTS.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.button
                key={subject.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => navigate(`/science-lab/${subject.id.toLowerCase()}`)}
                className="rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex flex-col"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${subject.color}20` }}
                >
                  <Icon size={24} style={{ color: subject.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {subject.title}
                </h3>
                <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {subject.description}
                </p>
                <div className="mt-4 flex items-center gap-1 font-semibold text-sm" style={{ color: subject.color }}>
                  <span>Enter Lab</span>
                  <ChevronRight size={16} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Combined Science (AQA 8464)
        </h2>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          6 papers: 2 Biology, 2 Chemistry, 2 Physics. Shorter papers, synoptic questions.
        </p>
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={() => navigate('/science-lab/combined-science')}
          className="w-full rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          style={{
            background: 'rgb(var(--surface))',
            borderColor: 'rgb(var(--border))',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#8B5CF620' }}>
              <TestTube2 size={24} style={{ color: '#8B5CF6' }} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                Combined Science
              </h3>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Papers 1–6: Bio 1 & 2, Chem 1 & 2, Phys 1 & 2
              </p>
            </div>
          </div>
          <ChevronRight size={20} style={{ color: 'rgb(var(--text-secondary))' }} />
        </motion.button>
      </section>
    </div>
  );
}

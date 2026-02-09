import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, FlaskConical, ChevronRight } from 'lucide-react';

export function ScienceLabHomePage() {
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
          GCSE Science (Biology, Chemistry, Physics) – Conceptual understanding, exam thinking, practicals
        </p>
      </motion.section>

      <section className="space-y-4">
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate('/science-lab/subjects')}
          className="w-full rounded-2xl p-8 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          style={{
            background: 'rgb(var(--surface))',
            borderColor: 'rgb(var(--border))',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-blue-500">
              <FlaskConical size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                Enter Science Lab
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Choose Biology, Chemistry, or Physics to begin
              </p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />
        </motion.button>
      </section>
    </div>
  );
}

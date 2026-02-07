import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, BarChart3 } from 'lucide-react';

export function StatisticsPlaceholder() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border shadow-sm"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <button
          type="button"
          onClick={() => navigate('/maths-mastery')}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to Maths Mastery
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ background: '#0EA5E920' }}
          >
            <BarChart3 size={28} style={{ color: '#0EA5E9' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
              Statistics
            </h1>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              GCSE Statistics
            </p>
          </div>
        </div>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Statistics practice is coming soon. For now, you can use the main Maths subject from the Subjects page.
        </p>
      </motion.section>
    </div>
  );
}

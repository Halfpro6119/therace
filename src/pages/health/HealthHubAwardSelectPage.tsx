import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Heart } from 'lucide-react';
import { storage } from '../../utils/storage';

const HERO_GRADIENT = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)';

export function HealthHubAwardSelectPage() {
  const navigate = useNavigate();

  const handleSelect = (award: 'single' | 'double') => {
    storage.setHealthHubAward(award);
    navigate('/health-hub');
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Choose your award</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Select Single Award (Units 1 + 2) or Double Award (Units 1–4) to filter content for your qualification.
        </p>
      </motion.section>

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => handleSelect('single')}
          className="rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Heart size={24} className="text-red-500" />
            <h3 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
              Single Award
            </h3>
          </div>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Units 1 + 2
          </p>
          <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
            Unit 1: Personal Development & Relationships (40% exam)<br />
            Unit 2: Care Provision (60% internal)
          </p>
        </motion.button>

        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => handleSelect('double')}
          className="rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Heart size={24} className="text-red-500" />
            <h3 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
              Double Award
            </h3>
          </div>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Units 1–4
          </p>
          <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
            Unit 1: Personal Development (20%)<br />
            Unit 2: Care Provision (30%)<br />
            Unit 3: Health & Wellbeing (30%)<br />
            Unit 4: In Practice (20%)
          </p>
        </motion.button>
      </div>
    </div>
  );
}

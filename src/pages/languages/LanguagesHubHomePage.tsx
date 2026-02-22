import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Languages } from 'lucide-react';
import { LANGUAGES } from '../../config/languagesHubData';
import { LAB_HERO_GRADIENT } from '../../config/hubTheme';

export function LanguagesHubHomePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: LAB_HERO_GRADIENT,
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Languages Hub</h1>
        <p className="text-white/90 text-sm sm:text-base">
          AQA GCSE French 8658 & Spanish 8698 – Vocabulary, grammar, listening, reading, writing & speaking
        </p>
      </motion.section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Choose your language
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {LANGUAGES.map((lang, index) => (
            <motion.button
              key={lang.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => navigate(`/languages-hub/${lang.id}`)}
              className="rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex flex-col"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl"
                style={{ background: `${lang.color}20` }}
              >
                {lang.flag}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                {lang.name}
              </h3>
              <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                {lang.spec} – Vocabulary, grammar, themes, exam skills
              </p>
              <div className="mt-4 flex items-center gap-1 font-semibold text-sm" style={{ color: lang.color }}>
                <span>Enter Lab</span>
                <ChevronRight size={16} />
              </div>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

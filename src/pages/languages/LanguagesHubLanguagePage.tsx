/**
 * Language-specific hub – French or Spanish
 * Modes: Vocabulary, Grammar, Listening, Reading, Writing, Speaking, Translation
 */
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Headphones,
  BookMarked,
  PenLine,
  Mic,
  Languages,
  Target,
} from 'lucide-react';
import { LANGUAGES, THEMES } from '../../config/languagesHubData';
import type { LanguageId } from '../../config/languagesHubData';

const MODES = [
  { id: 'vocabulary', title: 'Vocabulary', description: 'Theme-based words – spell, meaning, use in sentence', icon: BookOpen, color: '#2563EB' },
  { id: 'grammar', title: 'Grammar', description: 'Tenses, agreement, structures', icon: FileText, color: '#7C3AED' },
  { id: 'listening', title: 'Listening', description: 'Audio tasks – Foundation & Higher', icon: Headphones, color: '#059669' },
  { id: 'reading', title: 'Reading', description: 'Comprehension tasks', icon: BookMarked, color: '#D97706' },
  { id: 'writing', title: 'Writing', description: 'Photo, 40-word, 90-word, 150-word', icon: PenLine, color: '#DC2626' },
  { id: 'speaking', title: 'Speaking prep', description: 'Role-play, photo card, conversation', icon: Mic, color: '#DB2777' },
  { id: 'translation', title: 'Translation', description: 'EN↔TL sentence and passage', icon: Languages, color: '#0891B2' },
];

export function LanguagesHubLanguagePage() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const language = LANGUAGES.find((l) => l.id === languageId as LanguageId);

  if (!language || !['french', 'spanish'].includes(languageId || '')) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>Invalid language. Please select French or Spanish.</p>
        <button onClick={() => navigate('/languages-hub')}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${language.color} 0%, ${language.color}99 50%, ${language.color}66 100%)`,
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/languages-hub')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Languages
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {language.flag} {language.name}
        </h1>
        <p className="text-white/90 text-sm sm:text-base">
          {language.spec} – Vocabulary, grammar, themes, exam skills
        </p>
      </motion.section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Themes (AQA)
        </h2>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <span
              key={t.id}
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}
            >
              {t.title}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Learning modes
        </h2>
        <div className="grid gap-4">
          {MODES.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => navigate(`/languages-hub/${languageId}/${mode.id}`)}
                className="w-full rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl" style={{ background: `${mode.color}20` }}>
                    <Icon size={24} style={{ color: mode.color }} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                      {mode.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {mode.description}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} style={{ color: 'rgb(var(--text-secondary))' }} />
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

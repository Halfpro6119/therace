import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, GitCompare, Eye, Library, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const SECTIONS = [
  {
    id: 'poetry-diary',
    title: 'Poetry Diary (Seen)',
    description: 'Anthology poems – summary, themes, key quotes, methods, context, compare tasks',
    path: '/english-campus/literature/poetry',
    icon: BookOpen,
    color: '#EC4899',
  },
  {
    id: 'compare',
    title: 'Compare tasks',
    description: 'Choose two poems, exam-style question, quote picker, methods checklist, model answers',
    path: '/english-campus/literature/compare',
    icon: GitCompare,
    color: '#8B5CF6',
  },
  {
    id: 'unseen',
    title: 'Unseen poetry',
    description: 'Read poem, annotation prompts, write analysis, optional second poem comparison',
    path: '/english-campus/literature/unseen',
    icon: Eye,
    color: '#0EA5E9',
  },
  {
    id: 'texts',
    title: 'Texts library',
    description: 'Macbeth, A Christmas Carol, Jekyll & Hyde, An Inspector Calls – characters, themes, quotes',
    path: '/english-campus/literature/texts',
    icon: Library,
    color: '#10B981',
  },
  {
    id: 'quotation-lab',
    title: 'Quotation Lab',
    description: 'Recall, fill gaps, match quote to theme, identify method – spaced repetition',
    path: '/english-campus/literature/quotation-lab',
    icon: Quote,
    color: '#F59E0B',
  },
] as const;

export function EnglishLiteraturePage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Literature Mode
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Poetry (Seen + Unseen) and set texts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.button
              key={section.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(section.path)}
              className="rounded-xl border p-5 text-left hover:shadow-md transition"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${section.color}20` }}
              >
                <Icon size={20} style={{ color: section.color }} />
              </div>
              <h3 className="font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                {section.title}
              </h3>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                {section.description}
              </p>
            </motion.button>
          );
        })}
      </div>

      <p className="text-sm text-center" style={{ color: 'rgb(var(--muted))' }}>
        Poetry diary, texts library and quotation lab content can be added via the admin or content bank.
      </p>
    </div>
  );
}

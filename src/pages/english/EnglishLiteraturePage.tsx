import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, GitCompare, Eye, Library, Quote, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const SECTIONS = [
  {
    id: 'poetry',
    title: 'Seen Poetry (Anthology)',
    description: 'Single poem & comparison – Ozymandias/London, Exposure. Grade 9 checklists, mark schemes, model answers',
    path: '/english-campus/literature/poetry',
    icon: BookOpen,
    color: '#EC4899',
  },
  {
    id: 'compare',
    title: 'Compare poems',
    description: 'Compare how power/conflict/ideas are presented in two poems – full GuidePost tasks',
    path: '/english-campus/literature/poetry',
    icon: GitCompare,
    color: '#8B5CF6',
  },
  {
    id: 'unseen',
    title: 'Unseen poetry',
    description: 'Analysis (Q1) and comparison (Q2) – loneliness and methods. Grade 4–9 models',
    path: '/english-campus/literature/unseen',
    icon: Eye,
    color: '#0EA5E9',
  },
  {
    id: 'texts',
    title: 'Set texts',
    description: 'Macbeth (ambition, Lady Macbeth), ACC, J&H, Inspector Calls – extract & whole-text',
    path: '/english-campus/literature/texts',
    icon: Library,
    color: '#10B981',
  },
  {
    id: 'quotation-lab',
    title: 'Quotation Lab',
    description: 'Quote banks, drills (Explain · Upgrade · Best fit · Link two), micro-paragraph builder, progress',
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

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature/drafts')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        >
          <FileText size={18} />
          My drafts
        </button>
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
        GuidePost content from docs/ENGLISH_LITERATURE_GUIDEPOST.md – examiner-faithful mark schemes & Grade 4–9 models.
      </p>
    </div>
  );
}

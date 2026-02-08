import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Quote, FlaskConical, FileEdit, BarChart3, Library } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  QUOTATION_LAB_SOURCE_IDS,
  getQuotationLabSourceLabel,
  getQuotationLabQuotesBySource,
  getQuotationLabDrillsBySource,
  getMicroParagraphPromptsBySource,
} from '../../config/quotationLabData';

const MODES = [
  {
    id: 'quote-lab',
    title: 'Quote Lab',
    description: 'Curated quote bank: meaning, method, context, deployment tips',
    icon: Quote,
    path: 'quote-lab',
    color: '#F59E0B',
  },
  {
    id: 'drills',
    title: 'Drills',
    description: 'Explain, Upgrade, Best fit, Link two — build speed and precision',
    icon: FlaskConical,
    path: 'drills',
    color: '#8B5CF6',
  },
  {
    id: 'micro',
    title: 'Micro-Paragraph Builder',
    description: 'Theme + quote + method → 4–5 sentences (argument, AO2, AO3, judgement)',
    icon: FileEdit,
    path: 'micro',
    color: '#0EA5E9',
  },
  {
    id: 'progress',
    title: 'Progress & mastery',
    description: 'Quote familiarity, AO balance, grade ceiling, weak themes',
    icon: BarChart3,
    path: 'progress',
    color: '#10B981',
  },
] as const;

export function EnglishQuotationLabPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Quotation Lab
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Recall, selective quotation, Grade 9 micro-analysis — the difference-maker
          </p>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <Library size={20} />
          Choose a text or poem
        </h2>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Each source has a quote bank, drills, and micro-paragraph prompts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUOTATION_LAB_SOURCE_IDS.map(sourceId => {
            const label = getQuotationLabSourceLabel(sourceId);
            const quoteCount = getQuotationLabQuotesBySource(sourceId).length;
            const drillCount = getQuotationLabDrillsBySource(sourceId).length;
            const microCount = getMicroParagraphPromptsBySource(sourceId).length;
            const hasContent = quoteCount > 0;
            return (
              <button
                key={sourceId}
                type="button"
                disabled={!hasContent}
                onClick={() => {}}
                className="rounded-xl border p-4 text-left hover:shadow-md transition disabled:opacity-50"
                style={{
                  background: 'rgb(var(--surface-2))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="font-bold" style={{ color: 'rgb(var(--text))' }}>
                  {label}
                </div>
                <div className="text-xs mt-1 flex flex-wrap gap-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  <span>{quoteCount} quotes</span>
                  <span>{drillCount} drills</span>
                  <span>{microCount} micro-paragraphs</span>
                </div>
                {hasContent && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {MODES.map(mode => {
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            navigate(`/english-campus/literature/quotation-lab/${mode.path}/${sourceId}`);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            background: `${mode.color}20`,
                            color: mode.color,
                          }}
                        >
                          <Icon size={14} />
                          {mode.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </motion.section>

      <section className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          What you’ll do here
        </h2>
        <ul className="text-sm space-y-2" style={{ color: 'rgb(var(--text-secondary))' }}>
          <li><strong style={{ color: 'rgb(var(--text))' }}>Quote Lab</strong> — Learn each quote: theme, method, meaning, context, how to deploy it.</li>
          <li><strong style={{ color: 'rgb(var(--text))' }}>Drills</strong> — Explain this quote; upgrade weak analysis; which quote fits best; link two quotes to show change.</li>
          <li><strong style={{ color: 'rgb(var(--text))' }}>Micro-Paragraph Builder</strong> — Build 4–5 sentence paragraphs under timed conditions.</li>
          <li><strong style={{ color: 'rgb(var(--text))' }}>Progress</strong> — See quote familiarity, AO balance, and what’s holding you back.</li>
        </ul>
      </section>
    </div>
  );
}

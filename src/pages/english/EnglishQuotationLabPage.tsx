import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Library, BookOpen, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  QUOTATION_LAB_SOURCE_IDS,
  QUOTATION_LAB_THEME_IDS,
  CLUSTER_SOURCES,
  getQuotationLabSourceLabel,
  getQuotationLabQuotesBySource,
  getQuotationLabDrillsBySource,
  getMicroParagraphPromptsBySource,
  getQuotationLabClusterLabel,
  getQuotationLabThemeLabel,
  getQuotationLabQuotesByTheme,
} from '../../config/quotationLabData';
import type { QuotationLabSourceId, QuotationLabClusterId, QuotationLabThemeId } from '../../types/englishCampus';

const MODES = [
  { id: 'quote-lab', title: 'Quote Lab', path: 'quote-lab', color: '#F59E0B' },
  { id: 'drills', title: 'Drills', path: 'drills', color: '#8B5CF6' },
  { id: 'micro', title: 'Micro-Paragraph Builder', path: 'micro', color: '#0EA5E9' },
  { id: 'progress', title: 'Progress & mastery', path: 'progress', color: '#10B981' },
] as const;

export function EnglishQuotationLabPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
            Selective quotation, flexible deployment, examiner judgement — not memorisation
          </p>
        </div>
      </div>

      {/* By Text */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <Library size={20} />
          By Text
        </h2>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Choose a text or poem — each has a quote bank, drills, and micro-paragraph prompts.
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
                style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
              >
                <div className="font-bold" style={{ color: 'rgb(var(--text))' }}>{label}</div>
                <div className="text-xs mt-1 flex flex-wrap gap-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  <span>{quoteCount} quotes</span>
                  <span>{drillCount} drills</span>
                  <span>{microCount} micro-paragraphs</span>
                </div>
                {hasContent && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {MODES.map(mode => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          navigate(`/english-campus/literature/quotation-lab/${mode.path}/${sourceId}`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: `${mode.color}20`, color: mode.color }}
                      >
                        {mode.title}
                      </button>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* By Poetry Cluster */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} />
          By Poetry Cluster
        </h2>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Power & Conflict — choose a poem to access its quote bank and drills.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.keys(CLUSTER_SOURCES) as QuotationLabClusterId[]).map(clusterId => {
            const label = getQuotationLabClusterLabel(clusterId);
            const sources = CLUSTER_SOURCES[clusterId];
            return (
              <div key={clusterId} className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
                <div className="font-bold text-sm mb-2" style={{ color: 'rgb(var(--text))' }}>{label}</div>
                <div className="flex flex-wrap gap-2">
                  {sources.map(sourceId => {
                    const sourceLabel = getQuotationLabSourceLabel(sourceId);
                    const quoteCount = getQuotationLabQuotesBySource(sourceId).length;
                    const hasContent = quoteCount > 0;
                    return (
                      <button
                        key={sourceId}
                        type="button"
                        disabled={!hasContent}
                        onClick={() => navigate(`/english-campus/literature/quotation-lab/quote-lab/${sourceId}`)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
                        style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8B5CF6' }}
                      >
                        {sourceLabel} ({quoteCount})
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* By Theme */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <Tag size={20} />
          By Theme
        </h2>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Power, Guilt, Identity, Responsibility — explore quotes by theme across texts.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {QUOTATION_LAB_THEME_IDS.map(themeId => {
            const label = getQuotationLabThemeLabel(themeId);
            const quotes = getQuotationLabQuotesByTheme(themeId);
            const count = quotes.length;
            return (
              <button
                key={themeId}
                type="button"
                onClick={() => navigate(`/english-campus/literature/quotation-lab/theme/${themeId}`)}
                className="rounded-xl border p-4 text-left hover:shadow-md transition"
                style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
              >
                <div className="font-bold text-sm" style={{ color: 'rgb(var(--text))' }}>{label}</div>
                <div className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>{count} quotes</div>
              </button>
            );
          })}
        </div>
      </motion.section>

      <section className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>What you'll do here</h2>
        <ul className="text-sm space-y-2" style={{ color: 'rgb(var(--text-secondary))' }}>
          <li><strong style={{ color: 'rgb(var(--text))' }}>Quote Lab</strong> — Four panels: What It Means, How It Works, Why Examiners Love It, Grade 9 Angle.</li>
          <li><strong style={{ color: 'rgb(var(--text))' }}>Drills</strong> — Quote selection, one-sentence analysis, upgrade, link two, eliminate weak.</li>
          <li><strong style={{ color: 'rgb(var(--text))' }}>Micro-Paragraph Builder</strong> — 4–5 sentence paragraphs with examiner-style feedback.</li>
          <li><strong style={{ color: 'rgb(var(--text))' }}>Progress</strong> — Heatmap, theme confidence, AO balance, grade ceiling.</li>
        </ul>
      </section>
    </div>
  );
}

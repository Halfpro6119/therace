import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  PenLine,
  Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuotationLabQuote, QuotationLabSourceId } from '../../types/englishCampus';
import {
  getQuotationLabQuoteById,
  getQuotationLabSourceLabel,
  QUOTATION_LAB_SOURCE_IDS,
  isGoldQuote,
} from '../../config/quotationLabData';
import { storage } from '../../utils/storage';

function AccordionPanel({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))' }}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-white/5 transition"
      >
        <span className="font-semibold text-sm" style={{ color: 'rgb(var(--text))' }}>{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EnglishQuotationLabQuoteDetailPage() {
  const navigate = useNavigate();
  const { sourceId, quoteId } = useParams<{ sourceId: string; quoteId: string }>();
  const validSource = sourceId && QUOTATION_LAB_SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';
  const quote = quoteId ? getQuotationLabQuoteById(quoteId) : null;
  const label = getQuotationLabSourceLabel(validSource);

  const [openPanel, setOpenPanel] = useState<'meaning' | 'how' | 'grade9' | 'when' | 'alternative' | 'examiner' | null>(null);
  const isPriority = quoteId ? storage.isPriorityQuote(quoteId) : false;
  const isGold = quote && isGoldQuote(validSource, quote.id);
  const isStretch = quote && (quote.difficulty === 'stretch' || quote.difficulty === 'extension');
  const isAnchor = quote?.qualityTier === 'anchor';

  const togglePriority = () => {
    if (quoteId) {
      storage.togglePriorityQuote(quoteId);
      setOpenPanel(openPanel);
    }
  };

  useEffect(() => {
    if (quote && quote.sourceId === validSource) {
      storage.incrementQuotationFamiliarity(validSource, quote.id);
    }
  }, [validSource, quote?.id]);

  if (!quote || quote.sourceId !== validSource) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <button type="button" onClick={() => navigate(`/english-campus/literature/quotation-lab/quote-lab/${validSource}`)} className="p-2 rounded-lg hover:bg-black/5">
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <p style={{ color: 'rgb(var(--text-secondary))' }}>Quote not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(`/english-campus/literature/quotation-lab/quote-lab/${validSource}`)}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back to quote list"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div className="flex-1 min-w-0">
          <nav className="text-xs mb-1" style={{ color: 'rgb(var(--muted))' }}>
            Quotation Lab → {label}
          </nav>
          <h1 className="text-lg font-semibold" style={{ color: 'rgb(var(--text))' }}>
            {label}
            {quote.location && <span className="font-normal opacity-80"> · {quote.location}</span>}
            {isGold && (
              <span className="ml-2 px-1.5 py-0.5 rounded text-xs font-medium" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#D97706' }}>
                Gold quote
              </span>
            )}
          </h1>
        </div>
      </div>

      {/* Hero quote block — prominent, exam-ready */}
      <div
        className="rounded-xl border-l-4 p-4"
        style={{
          borderLeftColor: '#7C3AED',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.06) 0%, rgba(124, 58, 237, 0.02) 100%)',
          borderColor: 'rgb(var(--border))',
        }}
      >
        <blockquote className="text-lg italic mb-3" style={{ color: 'rgb(var(--text))' }}>
          "{quote.quote}"
        </blockquote>
        <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>{quote.meaning}</p>
        <div className="flex flex-wrap gap-1.5">
          {quote.themes.map(t => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs capitalize"
              style={{ background: 'rgb(var(--surface))', color: 'rgb(var(--text-secondary))' }}
            >
              {t}
            </span>
          ))}
        </div>
        {quote.themes.length > 1 && (
          <p className="text-xs mt-2" style={{ color: 'rgb(var(--muted))' }}>
            Also useful for → {quote.themes.slice(0, 4).join(', ')}
          </p>
        )}
      </div>

      {/* Progressive disclosure: expand for method, Grade 9, when to use, alternative read, examiner preference */}
      <div className="space-y-2">
        <AccordionPanel
          title="What It Means"
          open={openPanel === 'meaning'}
          onToggle={() => setOpenPanel(openPanel === 'meaning' ? null : 'meaning')}
        >
          <p>{quote.meaning}</p>
        </AccordionPanel>
        <AccordionPanel
          title="How It Works"
          open={openPanel === 'how'}
          onToggle={() => setOpenPanel(openPanel === 'how' ? null : 'how')}
        >
          <p>
            {(quote.methods?.length ? quote.methods.join(', ') : quote.method) || 'Method'}
            {' '}→ link to purpose and effect, not just technique spotting.
          </p>
          {quote.commonMisuse && (
            <p className="mt-2 text-amber-600 dark:text-amber-400">Avoid: {quote.commonMisuse}</p>
          )}
        </AccordionPanel>
        <AccordionPanel
          title="Grade 9 Angle"
          open={openPanel === 'grade9'}
          onToggle={() => setOpenPanel(openPanel === 'grade9' ? null : 'grade9')}
        >
          {(quote.grade9Insight ?? quote.deploymentTip) ? (
            <p>{quote.grade9Insight ?? quote.deploymentTip}</p>
          ) : (
            <p className="italic">Conceptual or alternative reading — extend your analysis.</p>
          )}
        </AccordionPanel>
        {(quote.alternativeInterpretation || isStretch) && (
          <AccordionPanel
            title="You could also argue…"
            open={openPanel === 'alternative'}
            onToggle={() => setOpenPanel(openPanel === 'alternative' ? null : 'alternative')}
          >
            <p>{quote.alternativeInterpretation ?? 'Consider a different angle on the same evidence — e.g. character vs structure, or sympathy vs critique.'}</p>
          </AccordionPanel>
        )}
        {(quote.whyExaminersPrefer || isAnchor) && (
          <AccordionPanel
            title="Why examiners prefer this quote"
            open={openPanel === 'examiner'}
            onToggle={() => setOpenPanel(openPanel === 'examiner' ? null : 'examiner')}
          >
            <p>{quote.whyExaminersPrefer ?? 'Flexible language, clear symbolic payoff, links to structure or context — use sparingly and precisely.'}</p>
          </AccordionPanel>
        )}
        <AccordionPanel
          title="When to Use It"
          open={openPanel === 'when'}
          onToggle={() => setOpenPanel(openPanel === 'when' ? null : 'when')}
        >
          {quote.bestUsedFor && quote.bestUsedFor.length > 0 && (
            <ul className="list-disc pl-4 space-y-1">
              {(quote.bestFor ?? quote.bestUsedFor).map((use, i) => (
                <li key={i}>{use}</li>
              ))}
            </ul>
          )}
          {quote.commonMisuse && (
            <p className="mt-2 text-sm"><strong>When not to use:</strong> {quote.commonMisuse}</p>
          )}
          {quote.avoidIf && quote.avoidIf.length > 0 && (
            <p className="mt-2 text-sm"><strong>Avoid if:</strong> {quote.avoidIf.join('; ')}</p>
          )}
          {(!quote.bestUsedFor || quote.bestUsedFor.length === 0) && !quote.commonMisuse && (
            <p>Use for essays that focus on {quote.themes.join(', ')}.</p>
          )}
        </AccordionPanel>
      </div>

      {/* Action buttons — primary CTAs use gradient */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigate(`/english-campus/literature/quotation-lab/drills/${validSource}?quote=${quote.id}`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90"
          style={{ background: 'var(--gradient-primary)', color: 'white' }}
        >
          <FlaskConical size={18} />
          Drill this quote
        </button>
        <button
          type="button"
          onClick={() => navigate(`/english-campus/literature/quotation-lab/micro/${validSource}?quote=${quote.id}`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition hover:opacity-90"
          style={{ background: 'var(--gradient-primary)', color: 'white' }}
        >
          <PenLine size={18} />
          Build a paragraph
        </button>
        <button
          type="button"
          onClick={togglePriority}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium ${isPriority ? 'ring-2' : ''}`}
          style={{
            background: isPriority ? 'rgba(245, 158, 11, 0.25)' : 'rgb(var(--surface-2))',
            color: isPriority ? '#D97706' : 'rgb(var(--text))',
            borderColor: isPriority ? '#D97706' : 'transparent',
          }}
        >
          <Star size={18} fill={isPriority ? 'currentColor' : 'none'} />
          {isPriority ? 'Saved as Priority' : 'Save as Priority Quote'}
        </button>
      </div>
    </div>
  );
}

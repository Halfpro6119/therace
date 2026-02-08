import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import type { QuotationDrillItem, QuotationDrillExplain, QuotationDrillUpgrade, QuotationDrillBestFit, QuotationDrillLinkTwo } from '../../types/englishCampus';
import {
  getQuotationLabDrillsBySource,
  getQuotationLabQuoteById,
  getQuotationLabSourceLabel,
} from '../../config/quotationLabData';

const SOURCE_IDS: QuotationLabSourceId[] = ['Macbeth', 'Ozymandias', 'London', 'Exposure'];

function isExplain(d: QuotationDrillItem): d is QuotationDrillExplain {
  return d.type === 'explainQuote';
}
function isUpgrade(d: QuotationDrillItem): d is QuotationDrillUpgrade {
  return d.type === 'upgradeAnalysis';
}
function isBestFit(d: QuotationDrillItem): d is QuotationDrillBestFit {
  return d.type === 'whichQuoteFitsBest';
}
function isLinkTwo(d: QuotationDrillItem): d is QuotationDrillLinkTwo {
  return d.type === 'linkTwoQuotes';
}

const DRILL_TYPE_LABELS: Record<QuotationDrillItem['type'], string> = {
  explainQuote: 'Explain this quote',
  upgradeAnalysis: 'Upgrade the analysis',
  whichQuoteFitsBest: 'Which quote fits best?',
  linkTwoQuotes: 'Link two quotes',
};

export function EnglishQuotationLabDrillsPage() {
  const navigate = useNavigate();
  const { sourceId } = useParams<{ sourceId: string }>();
  const validSource = sourceId && SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';
  const drills = getQuotationLabDrillsBySource(validSource);
  const label = getQuotationLabSourceLabel(validSource);
  const [index, setIndex] = useState(0);
  const [showWhy, setShowWhy] = useState(false);
  const [answer, setAnswer] = useState('');

  const drill = drills[index];
  const total = drills.length;

  if (!drill) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate('/english-campus/literature/quotation-lab')} className="p-2 rounded-lg hover:bg-black/5">
            <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Drills — {label}</h1>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No drills for this source yet.</p>
          </div>
        </div>
        <button type="button" onClick={() => navigate('/english-campus/literature/quotation-lab')} className="btn-ghost">Back to Quotation Lab</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature/quotation-lab')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Drills — {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {index + 1} of {total} · {DRILL_TYPE_LABELS[drill.type]}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={drill.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          className="rounded-xl border p-5 space-y-4"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          {isExplain(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.explainQuote}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.themePrompt}</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return quote ? (
                  <blockquote className="pl-4 border-l-2 italic" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                    "{quote.quote}"
                  </blockquote>
                ) : null;
              })()}
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your one-sentence explanation</label>
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Type your sentence..."
                  rows={2}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{drill.gradingNote}</p>
            </>
          )}

          {isUpgrade(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.upgradeAnalysis}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Weak response:</p>
              <p className="italic text-sm py-2" style={{ color: 'rgb(var(--text))' }}>"{drill.weakResponse}"</p>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>Upgrade focus: {drill.upgradeFocus}</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return quote ? (
                  <blockquote className="pl-4 border-l-2 italic text-sm mt-2" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                    "{quote.quote}"
                  </blockquote>
                ) : null;
              })()}
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your upgraded analysis</label>
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Rewrite with method, precision, judgement..."
                  rows={3}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
            </>
          )}

          {isBestFit(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{drill.question}</p>
              <div className="space-y-2 pt-2">
                {drill.quoteOptionIds.map(quoteId => {
                  const q = getQuotationLabQuoteById(quoteId);
                  const isBest = quoteId === drill.bestQuoteId;
                  return (
                    <div
                      key={quoteId}
                      className="rounded-lg border p-3 text-sm"
                      style={{
                        borderColor: showWhy && isBest ? '#10B981' : 'rgb(var(--border))',
                        background: showWhy && isBest ? 'rgba(16, 185, 129, 0.1)' : 'rgb(var(--surface-2))',
                      }}
                    >
                      <span className="italic" style={{ color: 'rgb(var(--text))' }}>"{q?.quote ?? quoteId}"</span>
                      {showWhy && isBest && (
                        <p className="mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                          <strong>Why best:</strong> {drill.whyBest}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              {!showWhy ? (
                <button
                  type="button"
                  onClick={() => setShowWhy(true)}
                  className="mt-3 flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'rgb(var(--accent))' }}
                >
                  <Lightbulb size={16} />
                  Show which fits best and why
                </button>
              ) : null}
            </>
          )}

          {isLinkTwo(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.linkTwoQuotes}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.linkPrompt}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[drill.quoteIdA, drill.quoteIdB].map(quoteId => {
                  const q = getQuotationLabQuoteById(quoteId);
                  return (
                    <div key={quoteId} className="rounded-lg border p-3 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))' }}>
                      {q?.location && <span className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{q.location}</span>}
                      <p className="italic mt-1" style={{ color: 'rgb(var(--text))' }}>"{q?.quote ?? quoteId}"</p>
                    </div>
                  );
                })}
              </div>
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your link (how do they show change?)</label>
                <textarea
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Write 2–4 sentences linking the two quotes..."
                  rows={4}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{drill.rewardNote}</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => { setIndex(i => Math.max(0, i - 1)); setShowWhy(false); setAnswer(''); }}
          disabled={index === 0}
          className="flex items-center gap-1 text-sm font-medium disabled:opacity-50"
          style={{ color: 'rgb(var(--text))' }}
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} / {total}</span>
        <button
          type="button"
          onClick={() => { setIndex(i => Math.min(total - 1, i + 1)); setShowWhy(false); setAnswer(''); }}
          disabled={index === total - 1}
          className="flex items-center gap-1 text-sm font-medium disabled:opacity-50"
          style={{ color: 'rgb(var(--text))' }}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

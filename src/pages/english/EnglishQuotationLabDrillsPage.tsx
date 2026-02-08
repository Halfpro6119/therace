import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import type {
  QuotationDrillItem,
  QuotationDrillExplain,
  QuotationDrillFinishAnalysis,
  QuotationDrillUpgrade,
  QuotationDrillBestFit,
  QuotationDrillLinkTwo,
  QuotationDrillWhichAO,
  QuotationDrillEliminateWeak,
} from '../../types/englishCampus';
import {
  getQuotationLabDrillsBySource,
  getQuotationLabQuoteById,
  getQuotationLabSourceLabel,
} from '../../config/quotationLabData';

const SOURCE_IDS: QuotationLabSourceId[] = ['Macbeth', 'Ozymandias', 'London', 'Exposure'];

function isExplain(d: QuotationDrillItem): d is QuotationDrillExplain {
  return d.type === 'explainQuote';
}
function isFinishAnalysis(d: QuotationDrillItem): d is QuotationDrillFinishAnalysis {
  return d.type === 'finishAnalysis';
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
function isWhichAO(d: QuotationDrillItem): d is QuotationDrillWhichAO {
  return d.type === 'whichAO';
}
function isEliminateWeak(d: QuotationDrillItem): d is QuotationDrillEliminateWeak {
  return d.type === 'eliminateWeakQuote';
}

const DRILL_TYPE_LABELS: Record<QuotationDrillItem['type'], string> = {
  explainQuote: 'Explain in one sentence',
  finishAnalysis: 'Finish the analysis',
  upgradeAnalysis: 'Upgrade the analysis',
  whichQuoteFitsBest: 'Select the best quote',
  linkTwoQuotes: 'Link two quotes',
  whichAO: 'Which AO is this?',
  eliminateWeakQuote: 'Eliminate the weak quote',
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
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const drill = drills[index];
  const total = drills.length;

  const updateAnswer = (val: string) => {
    setAnswer(val);
    setWordCount(val.trim().split(/\s+/).filter(Boolean).length);
  };

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

  const resetState = () => {
    setShowWhy(false);
    setSelectedQuoteId(null);
    setAnswer('');
    setWordCount(0);
  };

  const maxWords = isExplain(drill) && drill.maxWords ? drill.maxWords : undefined;

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
          {/* Drill 1: Explain in One Sentence (max 20 words) */}
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
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Your one-sentence explanation
                  {maxWords && (
                    <span className={wordCount > maxWords ? ' text-amber-600' : ''} style={{ marginLeft: 8 }}>
                      ({wordCount}/{maxWords} words — must include judgement)
                    </span>
                  )}
                </label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Type your sentence..."
                  rows={2}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{
                    background: 'rgb(var(--surface-2))',
                    borderColor: maxWords && wordCount > maxWords ? '#F59E0B' : 'rgb(var(--border))',
                    color: 'rgb(var(--text))',
                  }}
                />
              </div>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{drill.gradingNote}</p>
            </>
          )}

          {/* Drill 2: Finish the Analysis */}
          {isFinishAnalysis(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.finishAnalysis}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Complete the sentence:</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return (
                  <div className="space-y-2">
                    <blockquote className="pl-4 border-l-2 italic text-sm" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                      "{quote?.quote ?? drill.quoteId}"
                    </blockquote>
                    <p className="font-medium text-sm" style={{ color: 'rgb(var(--text))' }}>{drill.starter}</p>
                  </div>
                );
              })()}
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your completion</label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Add method, precision, judgement..."
                  rows={3}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{drill.rewardNote}</p>
            </>
          )}

          {/* Drill 3: Upgrade the Analysis */}
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
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your upgraded analysis (Grade 6 → 8 → 9)</label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Add method, judgement, avoid retelling..."
                  rows={4}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
            </>
          )}

          {/* Drill: Select the Best Quote (Mode 2) — must justify in 1 sentence */}
          {isBestFit(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{drill.question}</p>
              <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>Choose the best quote and justify your choice in one sentence.</p>
              <div className="space-y-2 pt-2">
                {drill.quoteOptionIds.map(quoteId => {
                  const q = getQuotationLabQuoteById(quoteId);
                  const isBest = quoteId === drill.bestQuoteId;
                  const isSelected = selectedQuoteId === quoteId;
                  return (
                    <button
                      key={quoteId}
                      type="button"
                      onClick={() => setSelectedQuoteId(quoteId)}
                      className="w-full rounded-lg border p-3 text-left text-sm transition"
                      style={{
                        borderColor: showWhy && isBest ? '#10B981' : isSelected ? 'rgb(var(--accent))' : 'rgb(var(--border))',
                        background: showWhy && isBest ? 'rgba(16, 185, 129, 0.1)' : isSelected ? 'rgba(var(--accent), 0.08)' : 'rgb(var(--surface-2))',
                      }}
                    >
                      <span className="italic" style={{ color: 'rgb(var(--text))' }}>"{q?.quote ?? quoteId}"</span>
                      {showWhy && isBest && (
                        <p className="mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                          <strong>Why best:</strong> {drill.whyBest}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedQuoteId && !showWhy && (
                <div className="pt-2">
                  <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Justify your choice in one sentence</label>
                  <input
                    type="text"
                    value={answer}
                    onChange={e => updateAnswer(e.target.value)}
                    placeholder="e.g. This quote directly addresses guilt with strong method..."
                    className="w-full rounded-lg border p-3 text-sm"
                    style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                  />
                </div>
              )}
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

          {/* Drill: Link Two Quotes */}
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
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Write 2–4 sentences linking the two quotes..."
                  rows={4}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{drill.rewardNote}</p>
            </>
          )}

          {/* Drill: Which AO Is This? */}
          {isWhichAO(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.whichAO}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Label AO1 / AO2 / AO3 and explain why.</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return (
                  <div className="space-y-2">
                    <blockquote className="pl-4 border-l-2 italic text-sm" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                      "{quote?.quote ?? drill.quoteId}"
                    </blockquote>
                    <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>Sample: <em>"{drill.sampleAnalysis}"</em></p>
                  </div>
                );
              })()}
              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Which AO? (AO1 = response, AO2 = method, AO3 = context)</p>
                <div className="flex gap-2">
                  {(['AO1', 'AO2', 'AO3'] as const).map(ao => (
                    <button
                      key={ao}
                      type="button"
                      onClick={() => setAnswer(answer.startsWith(ao) ? answer : ao + ' ')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        answer === ao ? 'ring-2' : ''
                      }`}
                      style={{
                        background: answer === ao ? 'rgba(var(--accent), 0.15)' : 'rgb(var(--surface-2))',
                        color: 'rgb(var(--text))',
                        borderColor: answer === ao ? 'rgb(var(--accent))' : 'transparent',
                      }}
                    >
                      {ao}
                    </button>
                  ))}
                </div>
                <label className="block text-xs font-medium mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Explain why</label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="AO2 because it focuses on method and effect..."
                  rows={2}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
              {showWhy && (
                <div className="rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <BookOpen size={18} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>
                    <strong>Correct: {drill.correctAO}</strong> — {drill.whyCorrect}
                  </p>
                </div>
              )}
              {!showWhy && (
                <button
                  type="button"
                  onClick={() => setShowWhy(true)}
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'rgb(var(--accent))' }}
                >
                  <Lightbulb size={16} />
                  Show correct AO and why
                </button>
              )}
            </>
          )}

          {/* Drill: Eliminate the Weak Quote */}
          {isEliminateWeak(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.eliminateWeakQuote}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.question}</p>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>Select the ONE quote to KEEP (the strongest). Eliminate the overlong, narrative, or irrelevant.</p>
              <div className="space-y-2 pt-2">
                {drill.quoteOptionIds.map(quoteId => {
                  const q = getQuotationLabQuoteById(quoteId);
                  const isBest = quoteId === drill.bestQuoteId;
                  const isSelected = selectedQuoteId === quoteId;
                  return (
                    <button
                      key={quoteId}
                      type="button"
                      onClick={() => setSelectedQuoteId(quoteId)}
                      className="w-full rounded-lg border p-3 text-left text-sm transition"
                      style={{
                        borderColor: showWhy && isBest ? '#10B981' : isSelected ? 'rgb(var(--accent))' : 'rgb(var(--border))',
                        background: showWhy && isBest ? 'rgba(16, 185, 129, 0.1)' : isSelected ? 'rgba(var(--accent), 0.08)' : 'rgb(var(--surface-2))',
                      }}
                    >
                      <span className="italic" style={{ color: 'rgb(var(--text))' }}>"{q?.quote ?? quoteId}"</span>
                      {showWhy && isBest && (
                        <p className="mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                          <strong>Why keep this one:</strong> {drill.whyOthersWeak}
                        </p>
                      )}
                    </button>
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
                  Show which to keep and why others are weak
                </button>
              ) : null}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => { setIndex(i => Math.max(0, i - 1)); resetState(); }}
          disabled={index === 0}
          className="flex items-center gap-1 text-sm font-medium disabled:opacity-50"
          style={{ color: 'rgb(var(--text))' }}
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} / {total}</span>
        <button
          type="button"
          onClick={() => { setIndex(i => Math.min(total - 1, i + 1)); resetState(); }}
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

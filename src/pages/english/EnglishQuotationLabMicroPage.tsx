import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import {
  getMicroParagraphPromptsBySource,
  getQuotationLabQuoteById,
  getQuotationLabSourceLabel,
  QUOTATION_LAB_SOURCE_IDS,
} from '../../config/quotationLabData';

/** Examiner-style auto-feedback for micro-paragraphs */
function computeExaminerFeedback(
  content: string,
  quoteText: string,
  method: string
): { id: string; message: string; type: 'success' | 'warning' | 'error' }[] {
  const feedback: { id: string; message: string; type: 'success' | 'warning' | 'error' }[] = [];
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  // 1. Word count (60–80 ideal)
  if (wordCount === 0) return [];
  if (wordCount < 40) {
    feedback.push({ id: 'wc', message: 'Too short. Aim for 60–80 words.', type: 'warning' });
  } else if (wordCount >= 60 && wordCount <= 90) {
    feedback.push({ id: 'wc', message: 'Good length.', type: 'success' });
  } else if (wordCount > 120) {
    feedback.push({ id: 'wc', message: 'Too long. Keep it tight — 4–5 sentences.', type: 'warning' });
  }

  // 2. Quotation — embedded vs dropped vs floating vs awkward
  const quoteWords = quoteText.replace(/[“”'""]/g, '').split(/\s+/).filter(Boolean);
  const shortQuote = quoteWords.length > 4 ? quoteWords.slice(0, 4).join(' ') : quoteText;
  const contentNorm = content.toLowerCase().replace(/[“”'""]/g, '');
  const quoteNorm = shortQuote.toLowerCase();
  const hasQuote = contentNorm.includes(quoteNorm) || quoteWords.some(w => w.length > 4 && contentNorm.includes(w.toLowerCase()));
  if (!hasQuote && wordCount > 20) {
    feedback.push({ id: 'quote', message: 'Dropped quotation — embed a short phrase from the text to support your argument.', type: 'error' });
  } else if (hasQuote) {
    const floatingPatterns = /\b(the quote|this quote|the phrase)\s+[“'"]|\.\s*["'][^"']+["']\s*(suggests|shows|means)/i;
    const quotedChunk = content.match(/["'][^"']+["']/g);
    const veryLongChunk = quotedChunk?.some(m => m.split(/\s+/).length > 8);
    if (floatingPatterns.test(content) || (quotedChunk?.some(m => m.length > 55))) {
      feedback.push({ id: 'quote', message: 'Floating quote — weave the phrase into your own sentence instead of dropping it in as a separate chunk.', type: 'warning' });
    } else if (veryLongChunk) {
      feedback.push({ id: 'quote', message: 'Awkward embedding — use a shorter extract (a few words) so the quote fits the sentence.', type: 'warning' });
    } else {
      feedback.push({ id: 'quote', message: 'Quote is embedded.', type: 'success' });
    }
  }

  // 3. Method–purpose link (AO2)
  const methodTerms = (method || '').toLowerCase().split(/[\s,;]+/).filter(w => w.length > 3);
  const hasMethod = methodTerms.some(t => contentNorm.includes(t)) ||
    contentNorm.includes('method') || contentNorm.includes('technique') ||
    contentNorm.includes('effect') || contentNorm.includes('suggests') || contentNorm.includes('emphasises');
  if (!hasMethod && wordCount > 30) {
    feedback.push({ id: 'method', message: 'This analysis identifies method but lacks purpose. Link technique to effect.', type: 'warning' });
  } else if (hasMethod) {
    feedback.push({ id: 'method', message: 'AO2: method linked to purpose.', type: 'success' });
  }

  // 4. Conceptual depth / judgement
  const judgementWords = ['suggests', 'reveals', 'emphasises', 'highlights', 'reinforces', 'undermines', 'exposes', 'criticises', 'shows'];
  const hasJudgement = judgementWords.some(w => contentNorm.includes(w));
  if (!hasJudgement && wordCount > 40) {
    feedback.push({ id: 'judge', message: 'This is descriptive, not analytical. Add judgement.', type: 'warning' });
  } else if (hasJudgement) {
    feedback.push({ id: 'judge', message: 'Judgement present.', type: 'success' });
  }

  // 5. Context (AO3) — heuristic: Jacobean, Shakespeare, Victorian, Romantic, historical, etc.
  const contextWords = [
    'jacobean', 'shakespeare', 'victorian', 'romantic', 'blake', 'shelley', 'owen',
    'context', 'historical', 'belief', 'society', 'audience', 'war', 'wwi', 'wwii',
    'gender', 'class', 'industrial', 'political', 'religious', 'divine',
  ];
  const hasContext = contextWords.some(w => contentNorm.includes(w));
  if (!hasContext && wordCount > 50) {
    feedback.push({ id: 'context', message: 'Context is relevant but not integrated. Weave it in.', type: 'warning' });
  } else if (hasContext) {
    feedback.push({ id: 'context', message: 'AO3 context integrated.', type: 'success' });
  }

  return feedback;
}

type AOSignal = 'ok' | 'warn' | 'fail';

/** Live AO1/AO2/AO3 signals — no marks, just signals (spec: non-intrusive). */
function computeAOSignals(content: string, quoteText: string, method: string): { AO1: AOSignal; AO2: AOSignal; AO3: AOSignal } {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const contentNorm = content.toLowerCase().replace(/[""'""]/g, '');
  const quoteWords = quoteText.replace(/[""'""]/g, '').split(/\s+/).filter(Boolean);
  const shortQuote = quoteWords.length > 4 ? quoteWords.slice(0, 4).join(' ') : quoteText;
  const quoteNorm = shortQuote.toLowerCase();
  const hasQuote = contentNorm.includes(quoteNorm) || quoteWords.some(w => w.length > 4 && contentNorm.includes(w.toLowerCase()));
  let AO1: AOSignal = 'fail';
  if (wordCount > 20 && hasQuote) AO1 = 'ok';
  else if (wordCount > 10) AO1 = 'warn';

  const methodTerms = (method || '').toLowerCase().split(/[\s,;]+/).filter(w => w.length > 3);
  const hasMethod = methodTerms.some(t => contentNorm.includes(t)) || contentNorm.includes('effect') || contentNorm.includes('suggests') || contentNorm.includes('emphasises');
  const judgementWords = ['suggests', 'reveals', 'emphasises', 'highlights', 'reinforces', 'undermines', 'exposes', 'criticises'];
  const hasJudgement = judgementWords.some(w => contentNorm.includes(w));
  let AO2: AOSignal = 'fail';
  if (wordCount > 30 && hasMethod && hasJudgement) AO2 = 'ok';
  else if (wordCount > 20 && (hasMethod || hasJudgement)) AO2 = 'warn';

  const contextWords = [
    'jacobean', 'shakespeare', 'victorian', 'romantic', 'blake', 'shelley', 'owen',
    'context', 'historical', 'belief', 'society', 'audience', 'war', 'gender', 'class',
  ];
  const hasContext = contextWords.some(w => contentNorm.includes(w));
  let AO3: AOSignal = 'fail';
  if (wordCount > 50 && hasContext) AO3 = 'ok';
  else if (wordCount > 40) AO3 = 'warn';
  return { AO1, AO2, AO3 };
}

export function EnglishQuotationLabMicroPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { sourceId } = useParams<{ sourceId: string }>();
  const validSource = sourceId && QUOTATION_LAB_SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';
  const prompts = getMicroParagraphPromptsBySource(validSource);
  const label = getQuotationLabSourceLabel(validSource);
  const focusQuoteId = searchParams.get('quote');
  const [selectedId, setSelectedId] = useState<string | null>(prompts[0]?.id ?? null);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (focusQuoteId && prompts.length > 0) {
      const match = prompts.find(p => p.quoteId === focusQuoteId);
      if (match) setSelectedId(match.id);
    }
  }, [focusQuoteId, prompts]);

  const prompt = prompts.find(p => p.id === selectedId) ?? prompts[0];
  const quote = prompt ? getQuotationLabQuoteById(prompt.quoteId) : null;

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const feedback = useMemo(
    () => (quote && prompt ? computeExaminerFeedback(content, quote.quote, prompt.method) : []),
    [content, quote, prompt]
  );
  const aoSignals = useMemo(
    () => (quote && prompt ? computeAOSignals(content, quote.quote, prompt.method) : null),
    [content, quote, prompt]
  );

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
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Micro-Paragraph Builder — {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Theme + quote + method → 4–5 sentences (argument, AO2, AO3, judgement)
          </p>
        </div>
      </div>

      {prompts.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2">
            {prompts.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => { setSelectedId(p.id); setContent(''); }}
                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{
                  background: selectedId === p.id ? 'rgba(14, 165, 233, 0.25)' : 'rgb(var(--surface-2))',
                  color: selectedId === p.id ? '#0EA5E9' : 'rgb(var(--text))',
                }}
              >
                {p.theme}
              </button>
            ))}
          </div>

          {prompt && quote && (
            <div className="rounded-xl border p-5 space-y-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
              {/* Question focus (locked) */}
              <div className="rounded-lg border p-3" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))' }}>
                <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>Question focus</p>
                <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{prompt.theme}</p>
              </div>
              {/* Chosen quote (from Lab) */}
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>Chosen quote</p>
                <p className="italic" style={{ color: 'rgb(var(--text))' }}>"{quote.quote}"</p>
              </div>
              {/* Method hint (optional) */}
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>Method hint</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{prompt.method}</p>
              </div>
              {/* Writing box — 5–6 sentences */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Your paragraph (5–6 sentences)
                </label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Argument → embedded quote → AO2 analysis → AO3 context → judgement."
                  rows={6}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
                <p className="text-xs mt-1" style={{ color: 'rgb(var(--muted))' }}>
                  {wordCount} words · Aim for 60–80
                </p>
              </div>

              {/* Live AO feedback — AO1 / AO2 / AO3 with tooltips */}
              {aoSignals && (
                <div className="flex flex-wrap gap-4 pt-2" aria-label="AO feedback">
                  {(['AO1', 'AO2', 'AO3'] as const).map(ao => {
                    const s = aoSignals[ao];
                    const icon = s === 'ok' ? '✔' : s === 'warn' ? '⚠' : '❌';
                    const color = s === 'ok' ? '#10B981' : s === 'warn' ? '#F59E0B' : '#EF4444';
                    const tooltip =
                      ao === 'AO1' ? 'AO1: Response to task, evidence selection' :
                      ao === 'AO2' ? 'AO2: Method, language, effect' :
                      'AO3: Context, ideas, audience';
                    return (
                      <span
                        key={ao}
                        className="flex items-center gap-1.5 text-sm font-medium cursor-help"
                        style={{ color }}
                        title={tooltip}
                      >
                        <span>{ao}</span>
                        <span>{icon}</span>
                      </span>
                    );
                  })}
                </div>
              )}

              {feedback.length > 0 && (
                <details className="rounded-lg border p-3" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
                  <summary className="text-xs font-semibold flex items-center gap-2 cursor-pointer" style={{ color: 'rgb(var(--text))' }}>
                    <MessageSquare size={14} />
                    More feedback
                  </summary>
                  <ul className="space-y-1.5 mt-2">
                    {feedback.map(f => (
                      <li key={f.id} className="flex items-start gap-2 text-sm">
                        {f.type === 'success' ? (
                          <CheckCircle size={14} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle size={14} style={{ color: f.type === 'error' ? '#EF4444' : '#F59E0B' }} className="flex-shrink-0 mt-0.5" />
                        )}
                        <span style={{ color: 'rgb(var(--text-secondary))' }}>{f.message}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}
        </>
      )}

      {prompts.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: 'rgb(var(--text-secondary))' }}>
          No micro-paragraph prompts for this source yet. Start with Macbeth.
        </p>
      )}
    </div>
  );
}

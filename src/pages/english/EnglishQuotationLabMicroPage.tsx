import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import {
  getMicroParagraphPromptsBySource,
  getQuotationLabQuoteById,
  getQuotationLabSourceLabel,
} from '../../config/quotationLabData';

const SOURCE_IDS: QuotationLabSourceId[] = ['Macbeth', 'Ozymandias', 'London', 'Exposure'];

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

  // 2. Quotation — is it embedded? (short phrase from quote)
  const quoteWords = quoteText.replace(/[“”'""]/g, '').split(/\s+/).filter(Boolean);
  const shortQuote = quoteWords.length > 4 ? quoteWords.slice(0, 4).join(' ') : quoteText;
  const contentNorm = content.toLowerCase().replace(/[“”'""]/g, '');
  const quoteNorm = shortQuote.toLowerCase();
  const hasQuote = contentNorm.includes(quoteNorm) || quoteWords.some(w => w.length > 4 && contentNorm.includes(w.toLowerCase()));
  if (!hasQuote && wordCount > 20) {
    feedback.push({ id: 'quote', message: 'Embed a short quotation to support your argument.', type: 'error' });
  } else if (hasQuote) {
    feedback.push({ id: 'quote', message: 'Quote is embedded.', type: 'success' });
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

  // 5. Context (AO3) — heuristic: Jacobean, Shakespeare, historical, context
  const contextWords = ['jacobean', 'shakespeare', 'context', 'historical', 'belief', 'society', 'audience'];
  const hasContext = contextWords.some(w => contentNorm.includes(w));
  if (!hasContext && wordCount > 50) {
    feedback.push({ id: 'context', message: 'Context is relevant but not integrated. Weave it in.', type: 'warning' });
  } else if (hasContext) {
    feedback.push({ id: 'context', message: 'AO3 context integrated.', type: 'success' });
  }

  return feedback;
}

export function EnglishQuotationLabMicroPage() {
  const navigate = useNavigate();
  const { sourceId } = useParams<{ sourceId: string }>();
  const validSource = sourceId && SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';
  const prompts = getMicroParagraphPromptsBySource(validSource);
  const label = getQuotationLabSourceLabel(validSource);
  const [selectedId, setSelectedId] = useState<string | null>(prompts[0]?.id ?? null);
  const [content, setContent] = useState('');

  const prompt = prompts.find(p => p.id === selectedId) ?? prompts[0];
  const quote = prompt ? getQuotationLabQuoteById(prompt.quoteId) : null;

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const feedback = useMemo(
    () => (quote && prompt ? computeExaminerFeedback(content, quote.quote, prompt.method) : []),
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
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>Theme</p>
                <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{prompt.theme}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>Quote</p>
                <p className="italic" style={{ color: 'rgb(var(--text))' }}>"{quote.quote}"</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>Method to analyse</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{prompt.method}</p>
              </div>
              <div className="rounded-lg p-3 space-y-2" style={{ background: 'rgb(var(--surface-2))' }}>
                <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'rgb(var(--text))' }}>
                  <CheckCircle size={14} />
                  Checklist — include each in your 4–5 sentences
                </p>
                <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {prompt.checklist.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">{i + 1}.</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Your micro-paragraph (4–5 sentences)
                </label>
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Write your paragraph: argument → embedded quote → AO2 analysis → AO3 context → judgement."
                  rows={6}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
                <p className="text-xs mt-1" style={{ color: 'rgb(var(--muted))' }}>
                  {wordCount} words · Aim for 60–80 words
                </p>
              </div>

              {/* Examiner-style auto-feedback */}
              {feedback.length > 0 && (
                <div className="rounded-lg p-3 space-y-2 border" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
                  <p className="text-xs font-semibold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                    <MessageSquare size={14} />
                    Examiner-style feedback
                  </p>
                  <ul className="space-y-1.5">
                    {feedback.map(f => (
                      <li key={f.id} className="flex items-start gap-2 text-sm">
                        {f.type === 'success' ? (
                          <CheckCircle size={14} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle size={14} style={{ color: f.type === 'error' ? '#EF4444' : '#F59E0B' }} className="flex-shrink-0 mt-0.5" />
                        )}
                        <span style={{ color: f.type === 'success' ? 'rgb(var(--text-secondary))' : f.type === 'error' ? '#EF4444' : 'rgb(var(--text))' }}>
                          {f.message}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
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

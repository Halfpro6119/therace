import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, FileEdit, CheckCircle } from 'lucide-react';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import {
  getMicroParagraphPromptsBySource,
  getQuotationLabQuoteById,
  getQuotationLabSourceLabel,
} from '../../config/quotationLabData';

const SOURCE_IDS: QuotationLabSourceId[] = ['Macbeth', 'Ozymandias', 'London', 'Exposure'];

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
                  {content.trim().split(/\s+/).filter(Boolean).length} words · Aim for 60–80 words
                </p>
              </div>
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

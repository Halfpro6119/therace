import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection, getInterpretationSetsForOption } from '../../config/historyHubData';

const ACCENT = '#B45309';

function getInterpretationLabDraftKey(optionKey: string, partId: string, setId: string): string {
  return `interpretation-lab:${optionKey}:${partId}:${setId}`;
}

export function HistoryHubInterpretationLabPage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : [];
  const [optionKey, setOptionKey] = useState(options[0]?.optionKey ?? '');
  const [partId, setPartId] = useState('');
  const [setIndex, setSetIndex] = useState(0);
  const [content, setContent] = useState('');
  const [saveFeedback, setSaveFeedback] = useState(false);

  const sets = getInterpretationSetsForOption(optionKey, partId || undefined);
  const set = sets[setIndex];

  useEffect(() => {
    if (set) {
      const key = getInterpretationLabDraftKey(optionKey, set.partId, set.id);
      setContent(storage.getHubWritingDraft(key));
    } else {
      setContent('');
    }
  }, [optionKey, set?.id, set?.partId, setIndex]);

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/history-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/history-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to History Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Interpretation lab (AO4)</h1>

      <div className="flex flex-wrap gap-2">
        <select value={optionKey} onChange={(e) => { setOptionKey(e.target.value); setPartId(''); setSetIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
          {options.map((o) => <option key={o.optionKey} value={o.optionKey}>{o.title}</option>)}
        </select>
        {options.find((o) => o.optionKey === optionKey)?.parts.length ? (
          <select value={partId} onChange={(e) => { setPartId(e.target.value); setSetIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
            <option value="">All parts</option>
            {options.find((o) => o.optionKey === optionKey)?.parts.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        ) : null}
      </div>

      {sets.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No interpretation sets for this option yet.</p>
      ) : set ? (
        <div className="space-y-4">
          {sets.length > 1 && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSetIndex((i) => (i === 0 ? sets.length - 1 : i - 1))}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
              >
                <ChevronLeft size={18} /> Previous set
              </button>
              <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{setIndex + 1} of {sets.length}</span>
              <button
                type="button"
                onClick={() => setSetIndex((i) => (i >= sets.length - 1 ? 0 : i + 1))}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
              >
                Next set <ChevronRight size={18} />
              </button>
            </div>
          )}
          <div className="rounded-2xl border p-6 space-y-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
            {set.interpretations.map((int) => (
              <div key={int.id} className="rounded-lg border p-4" style={{ borderColor: 'rgb(var(--border))' }}>
                <p className="text-sm mb-2" style={{ color: 'rgb(var(--text))' }}>{int.text}</p>
                <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{int.ascription}</p>
              </div>
            ))}
            {set.questionHowDiffer && <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{set.questionHowDiffer}</p>}
            {set.questionWhyDiffer && <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{set.questionWhyDiffer}</p>}
            {set.questionHowConvincing && <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{set.questionHowConvincing}</p>}
            <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{set.markSchemeSummary}</p>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Your answer</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your interpretation analysis here…"
                className="w-full min-h-[200px] rounded-xl border p-4 text-base resize-y focus:outline-none focus:ring-2"
                style={{
                  background: 'rgb(var(--surface-2))',
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                }}
              />
              <div className="mt-4 flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => {
                    const key = getInterpretationLabDraftKey(optionKey, set.partId, set.id);
                    storage.setHubWritingDraft(key, content);
                    setSaveFeedback(true);
                    setTimeout(() => setSaveFeedback(false), 2000);
                  }}
                  className="text-sm font-medium"
                  style={{ color: ACCENT }}
                >
                  {saveFeedback ? 'Saved!' : 'Save draft'}
                </button>
                {saveFeedback && (
                  <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Draft saved – your answer will be here when you return
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

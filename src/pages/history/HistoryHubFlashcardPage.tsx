import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection, getKeyTermsForOption } from '../../config/historyHubData';
import type { HistoryKeyTerm, HistoryConfidenceLevel } from '../../types/historyHub';

const ACCENT = '#B45309';

export function HistoryHubFlashcardPage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : [];
  const [optionKey, setOptionKey] = useState(options[0]?.optionKey ?? '');
  const [partId, setPartId] = useState('');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const terms = getKeyTermsForOption(optionKey, partId || undefined);
  const current = terms[index];

  useEffect(() => {
    setFlipped(false);
  }, [index, optionKey, partId]);

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/history-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  const handleConfidence = (level: HistoryConfidenceLevel) => {
    if (current) storage.updateHistoryFlashcardMastery(current.id, optionKey, current.partId, level);
    if (index < terms.length - 1) setIndex(index + 1);
    else setIndex(0);
    setFlipped(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/history-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to History Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Key terms & flashcards</h1>

      <div className="flex flex-wrap gap-2">
        <select value={optionKey} onChange={(e) => { setOptionKey(e.target.value); setPartId(''); setIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
          {options.map((o) => <option key={o.optionKey} value={o.optionKey}>{o.title}</option>)}
        </select>
        {options.find((o) => o.optionKey === optionKey)?.parts.length ? (
          <select value={partId} onChange={(e) => { setPartId(e.target.value); setIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
            <option value="">All parts</option>
            {options.find((o) => o.optionKey === optionKey)?.parts.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        ) : null}
      </div>

      {terms.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No key terms for this option yet.</p>
      ) : current ? (
        <>
          <div className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {terms.length}</div>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="w-full rounded-2xl border-2 p-8 text-left min-h-[200px] flex flex-col justify-center"
            style={{ borderColor: ACCENT, background: `${ACCENT}08` }}
          >
            {!flipped ? (
              <p className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>{current.term}</p>
            ) : (
              <>
                <p className="text-sm font-medium text-sm mb-2" style={{ color: 'rgb(var(--text))' }}>{current.definition}</p>
                {current.dateOrContext && <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{current.dateOrContext}</p>}
              </>
            )}
            <p className="text-xs mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Tap to flip</p>
          </button>
          {flipped && (
            <div className="flex gap-2">
              {(['again', 'hard', 'good', 'easy'] as HistoryConfidenceLevel[]).map((level) => (
                <button key={level} type="button" onClick={() => handleConfidence(level)} className="flex-1 py-2 rounded-lg text-sm font-medium capitalize border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>{level}</button>
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <button type="button" onClick={() => setIndex((i) => (i === 0 ? terms.length - 1 : i - 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => setIndex((i) => (i === terms.length - 1 ? 0 : i + 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </>
      ) : null}
    </div>
  );
}

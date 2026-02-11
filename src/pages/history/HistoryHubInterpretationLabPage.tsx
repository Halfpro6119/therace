import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection, getInterpretationSetsForOption } from '../../config/historyHubData';

const ACCENT = '#B45309';

export function HistoryHubInterpretationLabPage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : [];
  const [optionKey, setOptionKey] = useState(options[0]?.optionKey ?? '');
  const [partId, setPartId] = useState('');
  const [setIndex, setSetIndex] = useState(0);

  const sets = getInterpretationSetsForOption(optionKey, partId || undefined);
  const set = sets[setIndex];

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
        </div>
      ) : null}
    </div>
  );
}

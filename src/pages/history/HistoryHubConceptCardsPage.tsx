import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getHistoryOptionsForSelection, getConceptCardsForOption } from '../../config/historyHubData';
import { storage } from '../../utils/storage';

const ACCENT = '#B45309';

export function HistoryHubConceptCardsPage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : [];
  const [optionKey, setOptionKey] = useState(options[0]?.optionKey ?? '');
  const [partId, setPartId] = useState('');
  const [index, setIndex] = useState(0);
  const [showModel, setShowModel] = useState(false);

  const cards = getConceptCardsForOption(optionKey, partId || undefined);
  const card = cards[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/history-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/history-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to History Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Concept cards</h1>

      <div className="flex flex-wrap gap-2">
        <select value={optionKey} onChange={(e) => { setOptionKey(e.target.value); setPartId(''); setIndex(0); setShowModel(false); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
          {options.map((o) => <option key={o.optionKey} value={o.optionKey}>{o.title}</option>)}
        </select>
        {options.find((o) => o.optionKey === optionKey)?.parts.length ? (
          <select value={partId} onChange={(e) => { setPartId(e.target.value); setIndex(0); setShowModel(false); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
            <option value="">All parts</option>
            {options.find((o) => o.optionKey === optionKey)?.parts.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        ) : null}
      </div>

      {cards.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No concept cards for this option yet.</p>
      ) : card ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-xs mb-2" style={{ color: ACCENT }}>{card.conceptType}</p>
          <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{card.prompt}</p>
          {!showModel ? (
            <button type="button" onClick={() => setShowModel(true)} className="text-sm font-medium" style={{ color: ACCENT }}>Show model answer</button>
          ) : (
            <div className="rounded-lg p-4 text-sm border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text-secondary))' }}>
              {card.modelAnswer}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => { setIndex((i) => (i === 0 ? cards.length - 1 : i - 1)); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setIndex((i) => (i >= cards.length - 1 ? 0 : i + 1)); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

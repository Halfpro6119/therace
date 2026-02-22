import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection, getKeyTermsForOption } from '../../config/historyHubData';
import { HubHeroSection } from '../../components/hub/HubHeroSection';
import { LabFlashcardCard, type LabConfidenceLevel } from '../../components/hub/LabFlashcardCard';
import type { HistoryKeyTerm, HistoryConfidenceLevel } from '../../types/historyHub';

const LAB_TO_HISTORY: Record<LabConfidenceLevel, HistoryConfidenceLevel> = {
  1: 'again',
  2: 'hard',
  3: 'good',
};

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
        <button type="button" onClick={() => navigate('/history-hub/option-select')} className="text-sm font-medium" style={{ color: '#10B981' }}>Select options</button>
      </div>
    );
  }

  const handleConfidence = (level: LabConfidenceLevel) => {
    if (current) storage.updateHistoryFlashcardMastery(current.id, optionKey, current.partId, LAB_TO_HISTORY[level]);
    if (index < terms.length - 1) setIndex(index + 1);
    else setIndex(0);
    setFlipped(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <HubHeroSection
        backLabel="Back to History Hub"
        onBack={() => navigate('/history-hub')}
        title="Key terms & flashcards"
        subtitle="Dates, people, terms"
      />

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
        <LabFlashcardCard
          front={<p className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>{current.term}</p>}
          back={
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>{current.definition}</p>
              {current.dateOrContext && <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{current.dateOrContext}</p>}
            </div>
          }
          isFlipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          onConfidence={handleConfidence}
          progressLabel={`${index + 1} of ${terms.length}`}
          onPrev={() => setIndex((i) => (i === 0 ? terms.length - 1 : i - 1))}
          onNext={() => setIndex((i) => (i === terms.length - 1 ? 0 : i + 1))}
          canPrev={terms.length > 1}
          canNext={terms.length > 1}
        />
      ) : null}
    </div>
  );
}

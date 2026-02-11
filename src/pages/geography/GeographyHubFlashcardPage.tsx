import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getGeographySectionsForSelection, getKeyTermsForSections } from '../../config/geographyHubData';
import type { GeographyKeyTerm, GeographyConfidenceLevel } from '../../types/geographyHub';

const ACCENT = '#0D9488';

export function GeographyHubFlashcardPage() {
  const navigate = useNavigate();
  const selection = storage.getGeographyOptionSelection();
  const sections = selection ? getGeographySectionsForSelection(selection) : [];
  const sectionIds = sections.map((s) => s.id);
  const allTerms = getKeyTermsForSections(sectionIds);
  const [sectionFilter, setSectionFilter] = useState(sectionIds[0] ?? '');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const terms = sectionFilter ? allTerms.filter((t) => t.sectionId === sectionFilter) : allTerms;
  const current = terms[index];

  useEffect(() => {
    setFlipped(false);
  }, [index, sectionFilter]);

  const handleConfidence = (level: GeographyConfidenceLevel) => {
    if (current) storage.updateGeographyFlashcardMastery(current.id, current.sectionId, level);
    if (index < terms.length - 1) setIndex(index + 1);
    else setIndex(0);
    setFlipped(false);
  };

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/geography-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/geography-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Geography Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Key terms & flashcards</h1>

      <select value={sectionFilter} onChange={(e) => { setSectionFilter(e.target.value); setIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        {sections.map((s) => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>

      {terms.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No key terms for this section yet.</p>
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
                <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>{current.definition}</p>
                {current.inContext && <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{current.inContext}</p>}
              </>
            )}
            <p className="text-xs mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Tap to flip</p>
          </button>
          {flipped && (
            <div className="flex gap-2">
              {(['again', 'hard', 'good', 'easy'] as GeographyConfidenceLevel[]).map((level) => (
                <button key={level} type="button" onClick={() => handleConfidence(level)} className="flex-1 py-2 rounded-lg text-sm font-medium capitalize border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>{level}</button>
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <button type="button" onClick={() => setIndex((i) => (i === 0 ? terms.length - 1 : i - 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => setIndex((i) => (i >= terms.length - 1 ? 0 : i + 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </>
      ) : null}
    </div>
  );
}

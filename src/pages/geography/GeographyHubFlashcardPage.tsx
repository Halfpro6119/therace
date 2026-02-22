import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { getGeographySectionsForSelection, getKeyTermsForSections } from '../../config/geographyHubData';
import { HubHeroSection } from '../../components/hub/HubHeroSection';
import { LabFlashcardCard, type LabConfidenceLevel } from '../../components/hub/LabFlashcardCard';
import type { GeographyKeyTerm, GeographyConfidenceLevel } from '../../types/geographyHub';

const LAB_TO_GEOGRAPHY: Record<LabConfidenceLevel, GeographyConfidenceLevel> = {
  1: 'again',
  2: 'hard',
  3: 'good',
};

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

  const handleConfidence = (level: LabConfidenceLevel) => {
    if (current) storage.updateGeographyFlashcardMastery(current.id, current.sectionId, LAB_TO_GEOGRAPHY[level]);
    if (index < terms.length - 1) setIndex(index + 1);
    else setIndex(0);
    setFlipped(false);
  };

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/geography-hub/option-select')} className="text-sm font-medium" style={{ color: '#10B981' }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <HubHeroSection
        backLabel="Back to Geography Hub"
        onBack={() => navigate('/geography-hub')}
        title="Key terms & flashcards"
        subtitle="Definitions, processes, case study facts"
      />

      <select value={sectionFilter} onChange={(e) => { setSectionFilter(e.target.value); setIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        {sections.map((s) => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>

      {terms.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No key terms for this section yet.</p>
      ) : current ? (
        <LabFlashcardCard
          front={<p className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>{current.term}</p>}
          back={
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>{current.definition}</p>
              {current.inContext && <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{current.inContext}</p>}
            </div>
          }
          isFlipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          onConfidence={handleConfidence}
          progressLabel={`${index + 1} of ${terms.length}`}
          onPrev={() => setIndex((i) => (i === 0 ? terms.length - 1 : i - 1))}
          onNext={() => setIndex((i) => (i >= terms.length - 1 ? 0 : i + 1))}
          canPrev={terms.length > 1}
          canNext={terms.length > 1}
        />
      ) : null}
    </div>
  );
}

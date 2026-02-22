import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { getScriptureCardsForSelection } from '../../config/religiousStudiesHubData';
import { HubHeroSection } from '../../components/hub/HubHeroSection';
import { LabFlashcardCard, type LabConfidenceLevel } from '../../components/hub/LabFlashcardCard';
import type { RSConfidenceLevel } from '../../types/religiousStudiesHub';

const LAB_TO_RS: Record<LabConfidenceLevel, RSConfidenceLevel> = {
  1: 'again',
  2: 'hard',
  3: 'good',
};

export function ReligiousStudiesHubFlashcardPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const cards = selection ? getScriptureCardsForSelection(selection) : [];
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const filteredCards = cards;
  const current = filteredCards[index];

  useEffect(() => {
    setFlipped(false);
  }, [index]);

  const handleConfidence = (level: LabConfidenceLevel) => {
    if (current) storage.updateRSFlashcardMastery(current.id, current.religionId, current.themeId, LAB_TO_RS[level]);
    if (index < filteredCards.length - 1) setIndex(index + 1);
    else setIndex(0);
    setFlipped(false);
  };

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: '#10B981' }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <HubHeroSection
        backLabel="Back to Religious Studies Hub"
        onBack={() => navigate('/religious-studies-hub')}
        title="Scripture & key terms"
        subtitle="Flashcards for terms and scripture"
      />

      {cards.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No flashcards for your selection yet.</p>
      ) : current ? (
        <LabFlashcardCard
          front={<p className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>{current.term}</p>}
          back={
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>{current.definition}</p>
              {current.scriptureRef && <p className="text-xs mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Ref: {current.scriptureRef}</p>}
              {current.inContext && <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{current.inContext}</p>}
            </div>
          }
          isFlipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          onConfidence={handleConfidence}
          progressLabel={`${index + 1} of ${filteredCards.length}`}
          onPrev={() => setIndex((i) => (i === 0 ? filteredCards.length - 1 : i - 1))}
          onNext={() => setIndex((i) => (i === filteredCards.length - 1 ? 0 : i + 1))}
          canPrev={filteredCards.length > 1}
          canNext={filteredCards.length > 1}
        />
      ) : null}
    </div>
  );
}

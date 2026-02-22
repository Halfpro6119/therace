import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { getPsychologyTopicsForSelection, getFlashcardItemsForTopic } from '../../config/psychologyHubData';
import { HubHeroSection } from '../../components/hub/HubHeroSection';
import { LabFlashcardCard, type LabConfidenceLevel } from '../../components/hub/LabFlashcardCard';
import type { PsychologyKeyStudy, PsychologyKeyTerm, PsychologyConfidenceLevel } from '../../types/psychologyHub';

const LAB_TO_PSYCHOLOGY: Record<LabConfidenceLevel, PsychologyConfidenceLevel> = {
  1: 'again',
  2: 'hard',
  3: 'good',
};

export function PsychologyHubKeyStudiesPage() {
  const navigate = useNavigate();
  const selection = storage.getPsychologyOptionSelection();
  const topics = getPsychologyTopicsForSelection();
  const [topicId, setTopicId] = useState(topics[0]?.id ?? '');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const items = getFlashcardItemsForTopic(topicId);
  const current = items[index];

  useEffect(() => {
    setFlipped(false);
  }, [index, topicId]);

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/psychology-hub/option-select')} className="text-sm font-medium" style={{ color: '#10B981' }}>Select options</button>
      </div>
    );
  }

  const handleConfidence = (level: LabConfidenceLevel) => {
    if (current) {
      const itemId = current.type === 'study' ? (current.item as PsychologyKeyStudy).id : (current.item as PsychologyKeyTerm).id;
      storage.updatePsychologyFlashcardMastery(itemId, topicId, current.type, LAB_TO_PSYCHOLOGY[level]);
    }
    if (index < items.length - 1) setIndex(index + 1);
    else setIndex(0);
    setFlipped(false);
  };

  const frontContent = current ? (current.type === 'study'
    ? (current.item as PsychologyKeyStudy).researcher
    : (current.item as PsychologyKeyTerm).term) : '';
  const backContent = current ? (current.type === 'study'
    ? `${(current.item as PsychologyKeyStudy).aim}\n\nProcedure: ${(current.item as PsychologyKeyStudy).procedure}\n\nFindings: ${(current.item as PsychologyKeyStudy).findings}`
    : (current.item as PsychologyKeyTerm).definition) : '';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <HubHeroSection
        backLabel="Back to Psychology Hub"
        onBack={() => navigate('/psychology-hub')}
        title="Key studies & terms"
        subtitle="Flashcards for researchers and terminology"
      />

      <select value={topicId} onChange={(e) => { setTopicId(e.target.value); setIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        {topics.map((t) => (
          <option key={t.id} value={t.id}>{t.title}</option>
        ))}
      </select>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No key studies or terms for this topic yet.</p>
      ) : current ? (
        <LabFlashcardCard
          front={<p className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>{frontContent}</p>}
          back={<pre className="text-sm whitespace-pre-wrap font-sans" style={{ color: 'rgb(var(--text))' }}>{backContent}</pre>}
          isFlipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          onConfidence={handleConfidence}
          progressLabel={`${index + 1} of ${items.length}`}
          topicLabel={topics.find((t) => t.id === topicId)?.title}
          onPrev={() => setIndex((i) => (i === 0 ? items.length - 1 : i - 1))}
          onNext={() => setIndex((i) => (i === items.length - 1 ? 0 : i + 1))}
          canPrev={items.length > 1}
          canNext={items.length > 1}
        />
      ) : null}
    </div>
  );
}

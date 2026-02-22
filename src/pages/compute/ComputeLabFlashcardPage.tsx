import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUnitById, getTermsByUnit } from '../../config/computeLabData';
import { storage } from '../../utils/storage';
import { HubHeroSection } from '../../components/hub/HubHeroSection';
import { LabFlashcardCard, type LabConfidenceLevel } from '../../components/hub/LabFlashcardCard';
import type { ComputeUnitId, ComputeConfidenceLevel } from '../../types/computeLab';

export function ComputeLabFlashcardPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const unit = unitId ? getUnitById(unitId as ComputeUnitId) : undefined;
  const terms = unit ? getTermsByUnit(unit.id) : [];
  const currentTerm = terms[currentIndex];

  useEffect(() => {
    if (currentTerm) setIsFlipped(false);
  }, [currentIndex, currentTerm]);

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/compute-lab')}>Back to Compute Lab</button>
      </div>
    );
  }

  const handleBack = () => navigate(`/compute-lab/unit/${unit.id}`);

  const handleConfidence = (level: LabConfidenceLevel) => {
    if (!currentTerm || !isFlipped) return;
    storage.updateComputeFlashcardMastery(currentTerm.id, level as ComputeConfidenceLevel);
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const topicIds = [...new Set(terms.map((t) => t.topicId).filter(Boolean))] as string[];
      topicIds.forEach((topicId) => {
        const termIdsForTopic = terms.filter((t) => t.topicId === topicId).map((t) => t.id);
        const pct = storage.calculateComputeTopicFlashcardMastery(unit.id, topicId, termIdsForTopic);
        const existing = storage.getComputeTopicProgressByKey(unit.id, topicId);
        storage.updateComputeTopicProgress({
          unitId: unit.id,
          topicId,
          flashcardMasteryPercent: pct,
          quickCheckPassed: existing?.quickCheckPassed ?? false,
          algorithmLabCompleted: existing?.algorithmLabCompleted ?? false,
          calculationLabCompleted: existing?.calculationLabCompleted ?? false,
          logicLabCompleted: existing?.logicLabCompleted ?? false,
          sqlLabCompleted: existing?.sqlLabCompleted ?? false,
          questionLabCompleted: existing?.questionLabCompleted ?? false,
          lastUpdated: new Date().toISOString(),
        });
      });
      setSessionComplete(true);
    }
  };

  if (sessionComplete) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <HubHeroSection
          backLabel={`Back to Unit ${unit.id}`}
          onBack={handleBack}
          title="Session complete"
          subtitle={`You've reviewed all ${terms.length} terms. What next?`}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}/quick-check`)} className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30">
              Quick Check →
            </button>
            <button type="button" onClick={handleBack} className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30">
              Back to Unit {unit.id}
            </button>
          </div>
        </HubHeroSection>
      </div>
    );
  }

  if (!currentTerm) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>No terms for this unit.</p>
        <button type="button" onClick={handleBack}>Go Back</button>
      </div>
    );
  }

  const progressPct = terms.length ? ((currentIndex + 1) / terms.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <HubHeroSection
        backLabel={`Back to Unit ${unit.id}`}
        onBack={handleBack}
        title="Glossary / Flashcards"
        subtitle={`Unit ${unit.id} – ${terms.length} terms`}
        progressPercent={progressPct}
      />

      <LabFlashcardCard
        front={<p className="text-lg font-bold text-center" style={{ color: 'rgb(var(--text))' }}>{currentTerm.term}</p>}
        back={
          <div>
            <p className="text-base mb-2" style={{ color: 'rgb(var(--text))' }}>{currentTerm.definition}</p>
            {currentTerm.inContext && <p className="text-sm italic" style={{ color: 'rgb(var(--text-secondary))' }}>{currentTerm.inContext}</p>}
          </div>
        }
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped((p) => !p)}
        onConfidence={handleConfidence}
        progressLabel={`Card ${currentIndex + 1} of ${terms.length}`}
        onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentIndex((i) => Math.min(terms.length - 1, i + 1))}
        canPrev={currentIndex > 0}
        canNext={currentIndex < terms.length - 1}
      />
    </div>
  );
}

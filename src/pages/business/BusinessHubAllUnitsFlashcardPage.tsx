import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getUnitsByPaper, getTermsForUnits } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import { HubHeroSection } from '../../components/hub/HubHeroSection';
import { LabFlashcardCard, type LabConfidenceLevel } from '../../components/hub/LabFlashcardCard';
import type { BusinessConfidenceLevel, BusinessUnitId, BusinessPaper } from '../../types/businessHub';

export function BusinessHubAllUnitsFlashcardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paperParam = searchParams.get('paper') || 'all';
  const paper: BusinessPaper | 'all' = paperParam === '1' ? 1 : paperParam === '2' ? 2 : 'all';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);

  const units = getUnitsByPaper(paper);
  const unitIds = units.map((u) => u.id) as BusinessUnitId[];
  const terms = getTermsForUnits(unitIds);
  const currentTerm = terms[currentIndex];

  useEffect(() => {
    if (currentTerm) setIsFlipped(false);
  }, [currentIndex, currentTerm]);

  const handleBack = () => navigate(paper !== 'all' ? `/business-hub/all-units/topics?paper=${paper}` : '/business-hub/all-units/topics');

  const handleConfidence = (level: LabConfidenceLevel) => {
    if (!currentTerm || !isFlipped) return;
    storage.updateBusinessFlashcardMastery(currentTerm.id, level as BusinessConfidenceLevel);
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const seen = new Set<string>();
      terms.forEach((t) => {
        const key = `${t.unitId}-${t.topicId}`;
        if (!t.topicId || seen.has(key)) return;
        seen.add(key);
        const termIdsForTopic = terms.filter((x) => x.unitId === t.unitId && x.topicId === t.topicId).map((x) => x.id);
        const pct = storage.calculateBusinessTopicFlashcardMastery(t.unitId as BusinessUnitId, t.topicId, termIdsForTopic);
        const existing = storage.getBusinessTopicProgressByKey(t.unitId as BusinessUnitId, t.topicId);
        storage.updateBusinessTopicProgress({
          unitId: t.unitId as BusinessUnitId,
          topicId: t.topicId,
          flashcardMasteryPercent: pct,
          quickCheckPassed: existing?.quickCheckPassed ?? false,
          caseStudyCompleted: existing?.caseStudyCompleted ?? false,
          calculationsCompleted: existing?.calculationsCompleted ?? false,
          evaluationCompleted: existing?.evaluationCompleted ?? false,
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
          backLabel="Back to All Units"
          onBack={handleBack}
          title="Session complete"
          subtitle={`You've reviewed all ${terms.length} terms.`}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate(paper !== 'all' ? `/business-hub/all-units/quick-check?paper=${paper}` : '/business-hub/all-units/quick-check')}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30"
            >
              Quick Check →
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30"
            >
              Back to All Units
            </button>
          </div>
        </HubHeroSection>
      </div>
    );
  }

  if (!currentTerm) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>No terms for the selected paper filter.</p>
        <button type="button" onClick={handleBack}>Go Back</button>
      </div>
    );
  }

  const progressPct = terms.length ? ((currentIndex + 1) / terms.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <HubHeroSection
        backLabel="Back to All Units"
        onBack={handleBack}
        title="Glossary / Flashcards"
        subtitle={`All units – ${terms.length} terms`}
        progressPercent={progressPct}
      />

      <LabFlashcardCard
        front={
          <p className="text-lg font-bold text-center" style={{ color: 'rgb(var(--text))' }}>
            {currentTerm.term}
          </p>
        }
        back={
          <div>
            <p className="text-base mb-2" style={{ color: 'rgb(var(--text))' }}>{currentTerm.definition}</p>
            {currentTerm.inContext && (
              <p className="text-sm italic" style={{ color: 'rgb(var(--text-secondary))' }}>{currentTerm.inContext}</p>
            )}
          </div>
        }
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped((p) => !p)}
        onConfidence={handleConfidence}
        progressLabel={`Card ${currentIndex + 1} of ${terms.length}`}
        onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentIndex((i) => Math.min(terms.length - 1, i + 1))}
        canPrev={currentIndex > 0}
        canNext={currentInd
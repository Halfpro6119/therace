import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lightbulb, AlertTriangle } from 'lucide-react';
import { getUnitsByPaper, getConceptsForUnits } from '../../config/businessHubData';
import { ConceptLabSuperpowersSection } from '../../components/learning';
import type { BusinessUnitId } from '../../types/businessHub';
import type { BusinessConcept } from '../../types/businessHub';
import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';

export function BusinessHubAllUnitsConceptLabPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paper = (searchParams.get('paper') || 'all') as 'all' | '1' | '2';
  const [selectedConcept, setSelectedConcept] = useState<BusinessConcept | null>(null);

  const units = getUnitsByPaper(paper === '1' ? 1 : paper === '2' ? 2 : 'all');
  const unitIds = units.map((u) => u.id) as BusinessUnitId[];
  const concepts = getConceptsForUnits(unitIds);
  const currentIndex = selectedConcept ? concepts.findIndex((c) => c.id === selectedConcept.id) : -1;
  const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const nextConcept = currentIndex >= 0 && currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  const handleBack = () => navigate(`/business-hub/all-units/topics${paper !== 'all' ? `?paper=${paper}` : ''}`);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to All Units
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Concept Lab — All Units</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Core ideas, misconceptions, &quot;if this changes&quot; scenarios across every unit
        </p>
      </motion.section>

      {!selectedConcept ? (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>Select a concept</h2>
          <div className="space-y-4">
            {concepts.map((concept, index) => (
              <motion.button
                key={concept.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedConcept(concept)}
                className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                      {concept.title}
                    </h3>
                    <p className="text-sm mb-3 line-clamp-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {concept.coreIdea}
                    </p>
                    <div className="flex items-center gap-2 text-sm" style={{ color: LAB_ACCENT }}>
                      <span>Unit {concept.unitId} · Explore concept</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ background: `${LAB_ACCENT}20` }}>
                    <Lightbulb size={24} style={{ color: LAB_ACCENT }} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          {concepts.length === 0 && (
            <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
              <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No concepts for the selected paper filter.</p>
              <button
                type="button"
                onClick={handleBack}
                className="text-sm font-medium px-4 py-2 rounded-lg"
                style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}
              >
                Back to All Units
              </button>
            </div>
          )}
        </section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSelectedConcept(null)}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              <ChevronLeft size={18} />
              Back to concepts
            </button>
            <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {currentIndex + 1} of {concepts.length}
            </span>
          </div>

          <div
            className="rounded-xl p-6 border space-y-6"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
              {selectedConcept.title}
            </h2>
            <p className="text-base" style={{ color: 'rgb(var(--text))' }}>
              {selectedConcept.coreIdea}
            </p>
            {selectedConcept.visualModel && (
              <div className="rounded-lg p-4 border" style={{ background: `${LAB_ACCENT}10`, borderColor: `${LAB_ACCENT}30` }}>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Visual model</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{selectedConcept.visualModel.description}</p>
              </div>
            )}
            <div className="rounded-lg p-4 border flex gap-2" style={{ background: `${LAB_ACCENT}10`, borderColor: `${LAB_ACCENT}30` }}>
              <AlertTriangle size={20} className="shrink-0 mt-0.5" style={{ color: LAB_ACCENT }} />
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Common misconception</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{selectedConcept.commonMisconception}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>If this changes…</p>
              <ul className="space-y-3">
                {selectedConcept.changeScenarios.map((s, i) => (
                  <li key={i} className="rounded-lg p-3 border" style={{ borderColor: 'rgb(var(--border))' }}>
                    <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>{s.prompt}</p>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{s.explanation}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
              <ConceptLabSuperpowersSection
                subjectId="business"
                conceptId={selectedConcept.id}
                conceptTitle={selectedConcept.title}
                coreIdea={selectedConcept.coreIdea}
                context="Business"
              />
            </div>

            <div className="flex justify-between pt-4 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
              <button
                type="button"
                onClick={() => prevConcept && setSelectedConcept(prevConcept)}
                disabled={!prevConcept}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
              >
                <ChevronLeft size={18} />
                Previous concept
              </button>
              <button
                type="button"
                onClick={() => nextConcept && setSelectedConcept(nextConcept)}
                disabled={!nextConcept}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
              >
                Next concept
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}

import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lightbulb, AlertTriangle, ArrowRight } from 'lucide-react';
import { getUnitById, getConceptsByUnit } from '../../config/healthHubData';
import { ConceptLabSuperpowersSection } from '../../components/learning';
import type { HealthUnitId } from '../../types/healthHub';
import type { HealthConcept } from '../../types/healthHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)';

export function HealthHubConceptLabPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [selectedConcept, setSelectedConcept] = useState<HealthConcept | null>(null);

  const unit = unitId ? getUnitById(unitId as HealthUnitId) : undefined;
  const concepts = unit ? getConceptsByUnit(unit.id) : [];
  const currentIndex = selectedConcept ? concepts.findIndex((c) => c.id === selectedConcept.id) : -1;
  const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const nextConcept = currentIndex >= 0 && currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/health-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Back to Health Hub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button
          type="button"
          onClick={() => navigate(`/health-hub/unit/${unit.id}`)}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Concept Lab</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Understanding first – core ideas, misconceptions & apply scenarios
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
                transition={{ delay: index * 0.05 }}
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
                    <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                      <span>Explore concept</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/20">
                    <Lightbulb size={24} className="text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
          {concepts.length === 0 && (
            <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
              <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No concepts for this unit yet.</p>
              <button
                type="button"
                onClick={() => navigate(`/health-hub/unit/${unit.id}`)}
                className="text-sm font-medium px-4 py-2 rounded-lg bg-red-500/20 text-red-700 dark:text-red-400"
              >
                Back to Unit {unit.id}
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
              <div className="rounded-lg p-4 bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Visual model</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{selectedConcept.visualModel.description}</p>
              </div>
            )}
            <div className="rounded-lg p-4 bg-red-500/10 border border-red-500/30 flex gap-2">
              <AlertTriangle size={20} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Common misconception</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{selectedConcept.commonMisconception}</p>
              </div>
            </div>
            {selectedConcept.applyScenario && (
              <div className="rounded-lg p-4 bg-red-500/10 border border-red-500/30">
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Apply to a scenario</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{selectedConcept.applyScenario}</p>
              </div>
            )}

            <div className="pt-6 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
              <ConceptLabSuperpowersSection
                subjectId="health"
                conceptId={selectedConcept.id}
                conceptTitle={selectedConcept.title}
                coreIdea={selectedConcept.coreIdea}
                context="Health & Social Care"
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

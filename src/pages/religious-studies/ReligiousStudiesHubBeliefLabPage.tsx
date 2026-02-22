import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { storage } from '../../utils/storage';
import { getBeliefConceptsForSelection } from '../../config/religiousStudiesHubData';
import { ConceptLabSuperpowersSection } from '../../components/learning';
import { LAB_HERO_GRADIENT } from '../../config/hubTheme';

import { LAB_LAB_ACCENT } from '../../config/hubTheme';

export function ReligiousStudiesHubBeliefLabPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const concepts = selection ? getBeliefConceptsForSelection(selection) : [];
  const [selectedConcept, setSelectedConcept] = useState(concepts[0] ?? null);
  const currentIndex = selectedConcept ? concepts.findIndex((c) => c.id === selectedConcept.id) : -1;
  const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const nextConcept = currentIndex >= 0 && currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: LAB_ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}>
        <button type="button" onClick={() => navigate('/religious-studies-hub')} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to Religious Studies Hub
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Belief Lab</h1>
        <p className="text-white/90 text-sm">Core beliefs and teachings – understand before you revise</p>
      </section>

      {!selectedConcept ? (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>Select a belief</h2>
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
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>{concept.title}</h3>
                    <p className="text-sm line-clamp-2" style={{ color: 'rgb(var(--text-secondary))' }}>{concept.coreIdea}</p>
                    <div className="flex items-center gap-2 text-sm mt-2" style={{ color: LAB_ACCENT }}>
                      <span>Explore</span>
                      <ArrowRight size={16} />
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
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No belief concepts for your selection yet.</p>
            </div>
          )}
        </section>
      ) : (
        <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>{selectedConcept.title}</h2>
          <p className="text-base mb-4" style={{ color: 'rgb(var(--text))' }}>{selectedConcept.coreIdea}</p>
          {selectedConcept.commonMisconception && (
            <div className="rounded-lg p-4 mb-4" style={{ background: `${LAB_ACCENT}10`, borderLeft: `4px solid ${LAB_ACCENT}` }}>
              <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Common misconception</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{selectedConcept.commonMisconception}</p>
            </div>
          )}
          {selectedConcept.influence && (
            <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              <strong>How does this influence?</strong> {selectedConcept.influence}
            </p>
          )}
          {selectedConcept.scriptureRef && (
            <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>Scripture: {selectedConcept.scriptureRef}</p>
          )}
          <div className="pt-6 mt-6 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
            <ConceptLabSuperpowersSection
              subjectId="religious-studies"
              conceptId={selectedConcept.id}
              conceptTitle={selectedConcept.title}
              coreIdea={selectedConcept.coreIdea}
              context="Religious Studies"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => prevConcept && setSelectedConcept(prevConcept)}
              disabled={!prevConcept}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
              style={{ borderColor: 'rgb(var(--border))' }}
            >
              <ChevronLeft size={18} /> Previous
            </button>
            <button
              type="button"
              onClick={() => nextConcept ? setSelectedConcept(nextConcept) : setSelectedConcept(null)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg font-medium text-white"
              style={{ background: LAB_ACCENT }}
            >
              {nextConcept ? 'Next' : 'Back to list'}
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

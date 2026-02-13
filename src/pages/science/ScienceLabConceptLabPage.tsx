import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Lightbulb, AlertTriangle, ArrowRight, FileQuestion, FlaskConical, Calculator } from 'lucide-react';
import { ConceptLabSuperpowersSection } from '../../components/learning';
import {
  getConceptsBySubject,
  getConceptsByTopic,
  getQuestionsByFilters,
  getPracticalsBySubject,
  getEquationsBySubject,
} from '../../config/scienceLabData';
import type { ScienceSubject } from '../../types/scienceLab';

export function ScienceLabConceptLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [selectedConceptId, setSelectedConceptId] = useState<string | null>(null);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const [searchParams] = useSearchParams();
  const topicFilter = searchParams.get('topic') ?? undefined;
  const concepts = topicFilter
    ? getConceptsByTopic(normalizedSubject, topicFilter)
    : getConceptsBySubject(normalizedSubject);
  const selectedConcept = concepts.find(c => c.id === selectedConceptId);

  const handleBack = () => {
    const base = `/science-lab/${subject?.toLowerCase()}/${paper}/${tier?.toLowerCase()}`;
    const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
    navigate(base + query);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #0EA5E9 0%, #EC4899 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Lab Modes
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Concept Lab</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Understanding first – visual models, misconceptions, "if this changes" scenarios
        </p>
      </motion.section>

      {!selectedConcept ? (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
            Select a Concept
          </h2>
          <div className="space-y-4">
            {concepts.map((concept, index) => (
              <motion.button
                key={concept.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => setSelectedConceptId(concept.id)}
                className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                      {concept.topic}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {concept.coreIdea}
                    </p>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#0EA5E9' }}>
                      <span>Explore concept</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/20">
                    <Lightbulb size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <button
            type="button"
            onClick={() => setSelectedConceptId(null)}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            <ChevronLeft size={18} />
            Back to concepts
          </button>

          <div className="rounded-xl p-6 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>
              {selectedConcept.topic}
            </h2>
            <div className="space-y-6">
              {/* Core Idea */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                  <Lightbulb size={20} className="text-blue-600 dark:text-blue-400" />
                  Core Idea
                </h3>
                <p className="text-base" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {selectedConcept.coreIdea}
                </p>
              </div>

              {/* Visual Model */}
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  Visual Model
                </h3>
                <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border">
                  <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                    Type: {selectedConcept.visualModel.type}
                  </p>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {selectedConcept.visualModel.description}
                  </p>
                </div>
              </div>

              {/* Common Misconception */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                  <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />
                  Common Misconception Warning
                </h3>
                <div className="rounded-lg p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>
                    ❌ {selectedConcept.commonMisconception}
                  </p>
                </div>
              </div>

              {/* Learning Superpowers */}
              <ConceptLabSuperpowersSection
                subjectId="science"
                conceptId={selectedConcept.id}
                conceptTitle={selectedConcept.topic}
                coreIdea={selectedConcept.coreIdea}
                context={normalizedSubject}
              />

              {/* Change Scenarios */}
              {selectedConcept.changeScenarios.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                    "If this changes, what happens?"
                  </h3>
                  <div className="space-y-3">
                    {selectedConcept.changeScenarios.map((scenario, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      >
                        <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                          {scenario.prompt}
                        </p>
                        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                          → {scenario.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related content */}
              {(() => {
                const paperNum = paper ? parseInt(paper) : 1;
                const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : 'Higher';
                const relatedQuestions = getQuestionsByFilters(normalizedSubject, paperNum, tierValue, selectedConcept.topic);
                const topicLower = selectedConcept.topic.toLowerCase();
                const relatedPracticals = getPracticalsBySubject(normalizedSubject).filter(p =>
                  topicLower.split(/[\s,&]+/).some(word => word.length > 2 && p.title.toLowerCase().includes(word))
                );
                const relatedEquations = getEquationsBySubject(normalizedSubject).filter(e => e.topic === selectedConcept.topic);
                const hasRelated = relatedQuestions.length > 0 || relatedPracticals.length > 0 || relatedEquations.length > 0;
                if (!hasRelated) return null;
                return (
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(var(--text))' }}>
                      Related content
                    </h3>
                    <div className="space-y-3">
                      {relatedQuestions.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const base = `/science-lab/${subject?.toLowerCase()}/${paper}/${tier?.toLowerCase()}/question`;
                            const query = `?topic=${encodeURIComponent(selectedConcept.topic)}`;
                            navigate(base + query);
                          }}
                          className="w-full flex items-center gap-3 p-4 rounded-lg border text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                          style={{ borderColor: 'rgb(var(--border))' }}
                        >
                          <FileQuestion size={24} className="text-purple-500 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm" style={{ color: 'rgb(var(--text))' }}>Question Lab</p>
                            <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{relatedQuestions.length} question{relatedQuestions.length !== 1 ? 's' : ''} on {selectedConcept.topic}</p>
                          </div>
                          <ArrowRight size={18} style={{ color: 'rgb(var(--text-secondary))' }} />
                        </button>
                      )}
                      {relatedPracticals.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const base = `/science-lab/${subject?.toLowerCase()}/${paper}/${tier?.toLowerCase()}/practical`;
                            const query = `?topic=${encodeURIComponent(selectedConcept.topic)}`;
                            navigate(base + query);
                          }}
                          className="w-full flex items-center gap-3 p-4 rounded-lg border text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                          style={{ borderColor: 'rgb(var(--border))' }}
                        >
                          <FlaskConical size={24} className="text-green-500 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm" style={{ color: 'rgb(var(--text))' }}>Practical Lab</p>
                            <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{relatedPracticals.length} practical{relatedPracticals.length !== 1 ? 's' : ''} related</p>
                          </div>
                          <ArrowRight size={18} style={{ color: 'rgb(var(--text-secondary))' }} />
                        </button>
                      )}
                      {relatedEquations.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            const base = `/science-lab/${subject?.toLowerCase()}/${paper}/${tier?.toLowerCase()}/equation`;
                            const query = `?topic=${encodeURIComponent(selectedConcept.topic)}`;
                            navigate(base + query);
                          }}
                          className="w-full flex items-center gap-3 p-4 rounded-lg border text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                          style={{ borderColor: 'rgb(var(--border))' }}
                        >
                          <Calculator size={24} className="text-purple-500 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-sm" style={{ color: 'rgb(var(--text))' }}>Equation Lab</p>
                            <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{relatedEquations.length} equation{relatedEquations.length !== 1 ? 's' : ''} for {selectedConcept.topic}</p>
                          </div>
                          <ArrowRight size={18} style={{ color: 'rgb(var(--text-secondary))' }} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { getUnitById, getCaseStudiesByUnit } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import type { BusinessUnitId } from '../../types/businessHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)';

export function BusinessHubCaseStudyPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [caseIndex, setCaseIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const unit = unitId ? getUnitById(unitId as BusinessUnitId) : undefined;
  const caseStudies = unit ? getCaseStudiesByUnit(unit.id) : [];
  const currentCase = caseStudies[caseIndex];
  const currentQuestion = currentCase?.questions[questionIndex];

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/business-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>Back to Business Hub</button>
      </div>
    );
  }

  const handleBack = () => navigate(`/business-hub/unit/${unit.id}`);
  const handleNextQuestion = () => {
    setRevealAnswer(false);
    if (currentCase && questionIndex < currentCase.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (caseIndex < caseStudies.length - 1) {
      setCaseIndex(caseIndex + 1);
      setQuestionIndex(0);
    } else {
      storage.markUnitCaseStudyCompleted(unit.id, unit.topics.map((t) => t.id));
      navigate(`/business-hub/unit/${unit.id}/calculations`);
    }
  };
  const handlePrevQuestion = () => {
    setRevealAnswer(false);
    if (questionIndex > 0) setQuestionIndex(questionIndex - 1);
    else if (caseIndex > 0) {
      setCaseIndex(caseIndex - 1);
      const prevCase = caseStudies[caseIndex - 1];
      setQuestionIndex(prevCase?.questions.length ? prevCase.questions.length - 1 : 0);
    }
  };

  if (!currentCase) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
        >
          <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
            <ChevronLeft size={18} /> Back to Unit {unit.id}
          </button>
          <h1 className="text-2xl font-bold text-white mb-2">Case Study Lab</h1>
          <p className="text-white/90 text-sm">Apply knowledge to scenarios and data</p>
        </motion.section>
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No case studies for this unit yet. Try another unit or mode.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => navigate('/business-hub')} className="text-sm font-medium px-4 py-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400">
              All units
            </button>
            <button type="button" onClick={handleBack} className="text-sm font-medium px-4 py-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>
              Back to Unit {unit.id}
            </button>
          </div>
        </div>
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
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Case Study Lab</h1>
        <p className="text-white/90 text-sm">Apply knowledge to scenarios and data</p>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <div className="flex items-center gap-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          <FileText size={18} /> Case {caseIndex + 1}: {currentCase.title}
        </div>
        <p className="text-base" style={{ color: 'rgb(var(--text))' }}>{currentCase.scenario}</p>
        {currentCase.data && (
          <div className="rounded-lg p-4 bg-amber-500/10 border" style={{ borderColor: 'rgb(var(--border))' }}>
            <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Data</p>
            <p className="text-sm whitespace-pre-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>{currentCase.data}</p>
          </div>
        )}

        {currentQuestion && (
          <>
            <hr style={{ borderColor: 'rgb(var(--border))' }} />
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Question {questionIndex + 1} of {currentCase.questions.length} · {currentQuestion.marks} marks</p>
            <p className="text-lg font-medium" style={{ color: 'rgb(var(--text))' }}>{currentQuestion.question}</p>
            {!revealAnswer ? (
              <button
                type="button"
                onClick={() => setRevealAnswer(true)}
                className="px-6 py-2 rounded-lg font-semibold bg-amber-500 text-white hover:bg-amber-600"
              >
                Show model answer
              </button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg p-4 border space-y-2"
                  style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgb(var(--border))' }}
                >
                  <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>Model answer</p>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{currentQuestion.modelAnswer}</p>
                  {currentQuestion.markScheme?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Mark scheme</p>
                      <ul className="text-xs space-y-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {currentQuestion.markScheme.map((m, i) => (
                          <li key={i}>{m.marks} mark(s): {m.idea}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handlePrevQuestion}
            disabled={caseIndex === 0 && questionIndex === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          <button
            type="button"
            onClick={handleNextQuestion}
            className="flex items-center gap-1 px-6 py-2 rounded-lg font-semibold bg-amber-500 text-white hover:bg-amber-600"
          >
            {currentCase && questionIndex < currentCase.questions.length - 1 ? 'Next question' : caseIndex < caseStudies.length - 1 ? 'Next case' : 'Finish → Calculations'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

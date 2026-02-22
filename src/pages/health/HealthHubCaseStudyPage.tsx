import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import { getUnitById, getCaseStudiesByUnit } from '../../config/healthHubData';
import { storage } from '../../utils/storage';
import type { HealthUnitId } from '../../types/healthHub';

import { LAB_HERO_GRADIENT } from '../../config/hubTheme';

export function HealthHubCaseStudyPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [caseIndex, setCaseIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const unit = unitId ? getUnitById(unitId as HealthUnitId) : undefined;
  const caseStudies = unit ? getCaseStudiesByUnit(unit.id) : [];
  const currentCase = caseStudies[caseIndex];
  const currentQuestion = currentCase?.questions[questionIndex];

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

  const handleBack = () => navigate(`/health-hub/unit/${unit.id}`);

  const handleNext = () => {
    setRevealAnswer(false);
    if (currentCase && questionIndex < currentCase.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (caseIndex < caseStudies.length - 1) {
      setCaseIndex(caseIndex + 1);
      setQuestionIndex(0);
    } else {
      storage.markHealthUnitCaseStudyCompleted(unit.id, unit.topics.map((t) => t.id));
      navigate(`/health-hub/unit/${unit.id}`);
    }
  };

  const handlePrev = () => {
    setRevealAnswer(false);
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else if (caseIndex > 0) {
      setCaseIndex(caseIndex - 1);
      const prevCase = caseStudies[caseIndex - 1];
      setQuestionIndex(prevCase?.questions.length ? prevCase.questions.length - 1 : 0);
    }
  };

  if (!currentCase) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No case studies for this unit yet.</p>
          <button type="button" onClick={handleBack} className="text-sm font-medium px-4 py-2 rounded-lg bg-red-500/20 text-red-700 dark:text-red-400">
            Back to Unit {unit.id}
          </button>
        </div>
      </div>
    );
  }

  const totalQuestions = caseStudies.reduce((acc, c) => acc + c.questions.length, 0);
  const currentQuestionNumber = caseStudies
    .slice(0, caseIndex)
    .reduce((acc, c) => acc + c.questions.length, 0) + questionIndex + 1;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} />
          Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Case Study Lab</h1>
        <p className="text-white/90 text-sm mb-2">{currentCase.title}</p>
        <p className="text-white/80 text-xs">
          Question {currentQuestionNumber} of {totalQuestions}
        </p>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            Scenario • {currentCase.clientGroup} • {currentCase.setting}
          </p>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text))' }}>
            {currentCase.scenario}
          </p>
        </div>

        {currentQuestion && (
          <>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                Question ({currentQuestion.marks} marks)
              </p>
              <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>
                {currentQuestion.question}
              </p>
            </div>

            {!revealAnswer ? (
              <button
                type="button"
                onClick={() => setRevealAnswer(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-700 dark:text-red-400 font-medium"
              >
                <FileText size={18} />
                Reveal model answer
              </button>
            ) : (
              <div className="rounded-lg p-4 bg-green-500/10 border border-green-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={20} className="text-green-500" />
                  <span className="font-medium text-sm">Model answer</span>
                </div>
                <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>
                  {currentQuestion.modelAnswer}
                </p>
                <div className="mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Mark scheme: {currentQuestion.markScheme.map((m) => `${m.idea} (${m.marks})`).join('; ')}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={caseIndex === 0 && questionIndex === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
                style={{ borderColor: 'rgb(var(--border))' }}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium"
              >
                {caseIndex === caseStudies.length - 1 && questionIndex === currentCase.questions.length - 1 ? 'Finish' : 'Next'}
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

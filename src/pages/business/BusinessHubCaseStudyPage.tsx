import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { getUnitById, getCaseStudiesByUnit, getCalculationsByUnit } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import type { BusinessUnitId } from '../../types/businessHub';

import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';

interface UserAnswer {
  answer: string;
  marks: number | null;
}

export function BusinessHubCaseStudyPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [caseIndex, setCaseIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});

  const unit = unitId ? getUnitById(unitId as BusinessUnitId) : undefined;
  const caseStudies = unit ? getCaseStudiesByUnit(unit.id) : [];
  const currentCase = caseStudies[caseIndex];
  const currentQuestion = currentCase?.questions[questionIndex];
  const currentUserAnswer = currentQuestion ? userAnswers[currentQuestion.id] : undefined;

  // Load saved answers from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`business_case_study_answers_${unitId}`);
    if (saved) {
      try {
        setUserAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved answers', e);
      }
    }
  }, [unitId]);

  // Save answers to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(userAnswers).length > 0) {
      localStorage.setItem(`business_case_study_answers_${unitId}`, JSON.stringify(userAnswers));
    }
  }, [userAnswers, unitId]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer,
        marks: prev[questionId]?.marks ?? null,
      },
    }));
  };

  const handleMarksChange = (questionId: string, marks: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        answer: prev[questionId]?.answer ?? '',
        marks,
      },
    }));
  };

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/business-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>Back to Business Hub</button>
      </div>
    );
  }

  const handleBack = () => navigate(`/business-hub/unit/${unit.id}/topics`);
  const handleNextQuestion = () => {
    setRevealAnswer(false);
    if (currentCase && questionIndex < currentCase.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (caseIndex < caseStudies.length - 1) {
      setCaseIndex(caseIndex + 1);
      setQuestionIndex(0);
    } else {
      storage.markUnitCaseStudyCompleted(unit.id, unit.topics.map((t) => t.id));
      const hasCalculations = getCalculationsByUnit(unit.id).length > 0;
      navigate(hasCalculations ? `/business-hub/unit/${unit.id}/calculations` : `/business-hub/unit/${unit.id}/evaluation`);
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
          style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
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
            <button type="button" onClick={() => navigate('/business-hub')} className="text-sm font-medium px-4 py-2 rounded-lg" style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}>
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
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
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
          <div className="rounded-lg p-4 border" style={{ borderColor: 'rgb(var(--border))', background: `${LAB_ACCENT}10` }}>
            <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Data</p>
            <p className="text-sm whitespace-pre-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>{currentCase.data}</p>
          </div>
        )}

        {currentQuestion && (
          <>
            <hr style={{ borderColor: 'rgb(var(--border))' }} />
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Question {questionIndex + 1} of {currentCase.questions.length} · {currentQuestion.marks} marks</p>
            <p className="text-lg font-medium" style={{ color: 'rgb(var(--text))' }}>{currentQuestion.question}</p>
            
            {/* User answer input */}
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
                Your answer
              </label>
              <textarea
                value={currentUserAnswer?.answer ?? ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                placeholder="Type your answer here..."
                className="w-full min-h-[120px] p-3 rounded-lg border text-sm resize-y"
                style={{ 
                  background: 'rgb(var(--surface))', 
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                }}
              />
            </div>

            {/* Marks selector */}
            {currentUserAnswer?.answer && (
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
                  How many marks did you get? (out of {currentQuestion.marks})
                </label>
                <select
                  value={currentUserAnswer.marks ?? ''}
                  onChange={(e) => handleMarksChange(currentQuestion.id, parseInt(e.target.value) || 0)}
                  className="px-4 py-2 rounded-lg border text-sm"
                  style={{ 
                    background: 'rgb(var(--surface))', 
                    borderColor: 'rgb(var(--border))',
                    color: 'rgb(var(--text))',
                  }}
                >
                  <option value="">Select marks...</option>
                  {Array.from({ length: currentQuestion.marks + 1 }, (_, i) => (
                    <option key={i} value={i}>
                      {i} mark{i !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                {currentUserAnswer.marks !== null && (
                  <div className="flex items-center gap-2 text-sm">
                    {currentUserAnswer.marks === currentQuestion.marks ? (
                      <>
                        <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                        <span className="text-green-600 dark:text-green-400 font-medium">Full marks!</span>
                      </>
                    ) : currentUserAnswer.marks >= currentQuestion.marks * 0.5 ? (
                      <>
                        <CheckCircle2 size={16} style={{ color: LAB_ACCENT }} />
                        <span className="font-medium" style={{ color: LAB_ACCENT }}>Good effort</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-red-600 dark:text-red-400" />
                        <span className="text-red-600 dark:text-red-400 font-medium">Keep practicing</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Show model answer button */}
            {!revealAnswer ? (
              <button
                type="button"
                onClick={() => setRevealAnswer(true)}
                className="px-6 py-2 rounded-lg font-semibold text-white"
                style={{ background: LAB_ACCENT }}
              >
                Show model answer
              </button>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Comparison view */}
                  {currentUserAnswer?.answer && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="rounded-lg p-4 border" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgb(var(--border))' }}>
                        <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Your answer</p>
                        <p className="text-sm whitespace-pre-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {currentUserAnswer.answer || '(No answer entered)'}
                        </p>
                        {currentUserAnswer.marks !== null && (
                          <p className="text-xs mt-2 font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
                            Marks: {currentUserAnswer.marks} / {currentQuestion.marks}
                          </p>
                        )}
                      </div>
                      <div className="rounded-lg p-4 border" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgb(var(--border))' }}>
                        <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Model answer</p>
                        <p className="text-sm whitespace-pre-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {currentQuestion.modelAnswer}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Model answer only view (if no user answer) */}
                  {!currentUserAnswer?.answer && (
                    <div className="rounded-lg p-4 border space-y-2" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgb(var(--border))' }}>
                      <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>Model answer</p>
                      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{currentQuestion.modelAnswer}</p>
                    </div>
                  )}

                  {/* Mark scheme */}
                  {currentQuestion.markScheme?.length > 0 && (
                    <div className="rounded-lg p-4 border" style={{ background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgb(var(--border))' }}>
                      <p className="text-xs font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Mark scheme</p>
                      <ul className="text-xs space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {currentQuestion.markScheme.map((m, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-medium" style={{ color: LAB_ACCENT }}>{m.marks} mark{m.marks !== 1 ? 's' : ''}:</span>
                            <span>{m.idea}</span>
                          </li>
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
            className="flex items-center gap-1 px-6 py-2 rounded-lg font-semibold text-white"
            style={{ background: LAB_ACCENT }}
          >
            {currentCase && questionIndex < currentCase.questions.length - 1 ? 'Next question' : caseIndex < caseStudies.length - 1 ? 'Next case' : getCalculationsByUnit(unit.id).length > 0 ? 'Finish → Calculations' : 'Finish → Evaluation'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

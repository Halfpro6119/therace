import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Target, CheckCircle, AlertTriangle, FileQuestion, RotateCcw, ChevronRight, ExternalLink, Check, X } from 'lucide-react';
import { getQuestionsWithMethodMarkBreakdowns, getMethodMarkBreakdown } from '../../config/scienceLabData';
import { gradeMethodMarkAnswer } from '../../utils/scienceGrading';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../types/scienceLab';

export function ScienceLabMethodMarkPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [gradeResult, setGradeResult] = useState<ReturnType<typeof gradeMethodMarkAnswer> | null>(null);
  const [showMarkScheme, setShowMarkScheme] = useState(false);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? (parseInt(paper) as SciencePaper) : 1;
  const tierValue = tier ? (tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier) : 'Higher';

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const [searchParams] = useSearchParams();
  const topicFilter = searchParams.get('topic') ?? undefined;
  const questions = getQuestionsWithMethodMarkBreakdowns(normalizedSubject, paperNum, tierValue, topicFilter);
  const selectedQuestion = selectedQuestionIndex !== null ? questions[selectedQuestionIndex] : null;
  const breakdown = selectedQuestion ? getMethodMarkBreakdown(selectedQuestion.id) : null;

  const handleBack = () => {
    const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
    if (topicFilter) {
      navigate(`${base}/topics`);
    } else {
      navigate(base);
    }
  };

  const selectQuestion = (idx: number) => {
    setSelectedQuestionIndex(idx);
    setUserAnswer('');
    setGradeResult(null);
    setShowMarkScheme(false);
  };

  const handleCheckMarks = () => {
    if (!breakdown || !userAnswer.trim()) return;
    const result = gradeMethodMarkAnswer(breakdown, userAnswer);
    setGradeResult(result);
  };

  const handleTryAgain = () => {
    setUserAnswer('');
    setGradeResult(null);
  };

  const handleNextQuestion = () => {
    if (selectedQuestionIndex !== null && selectedQuestionIndex < questions.length - 1) {
      selectQuestion(selectedQuestionIndex + 1);
    } else {
      setSelectedQuestionIndex(null);
      setUserAnswer('');
      setGradeResult(null);
    }
  };

  const questionLabUrl = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/question`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Method Mark Trainer</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Write your answer, then see which marks you got. Master 4–6 mark questions.
        </p>
      </motion.section>

      {selectedQuestionIndex === null ? (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
            Select a 4–6 Mark Question
          </h2>
          {questions.length === 0 ? (
            <div
              className="rounded-xl p-6 border"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>
                No questions with mark scheme breakdowns for this subject, paper, and tier.
              </p>
              <Link
                to={questionLabUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)' }}
              >
                <ExternalLink size={18} />
                Go to Question Lab
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => selectQuestion(idx)}
                  className="w-full rounded-xl p-4 text-left border shadow-sm hover:shadow-md transition-all flex items-start gap-4"
                  style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
                >
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <FileQuestion size={20} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {q.topic} • {q.marks} marks
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>{q.question}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      ) : selectedQuestion && breakdown ? (
        <div
          className="rounded-xl p-6 border"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <button
            type="button"
            onClick={() => setSelectedQuestionIndex(null)}
            className="flex items-center gap-2 text-sm font-medium mb-4"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            <ChevronLeft size={18} />
            Back to questions
          </button>

          {/* Question */}
          <div className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
            <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              {selectedQuestion.topic} • {selectedQuestion.marks} marks
            </p>
            <h2 className="text-lg font-semibold" style={{ color: 'rgb(var(--text))' }}>
              {selectedQuestion.question}
            </h2>
          </div>

          {/* Mark breakdown (read-only reference) — shown only after user clicks "Show mark scheme" */}
          <div className="mb-6">
            {!showMarkScheme ? (
              <button
                type="button"
                onClick={() => setShowMarkScheme(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg font-medium border border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
              >
                Show mark scheme
              </button>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold" style={{ color: 'rgb(var(--text))' }}>
                    Mark scheme reference
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowMarkScheme(false)}
                    className="text-sm font-medium"
                    style={{ color: 'rgb(var(--text-secondary))' }}
                  >
                    Hide
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                      <CheckCircle size={16} className="text-blue-600 dark:text-blue-400" />
                      Idea marks
                    </h4>
                    <ul className="list-disc list-inside space-y-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {breakdown.ideaMarks.map((m) => (
                        <li key={m.id}>{m.description} ({m.marks}m)</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                      <Target size={16} className="text-purple-600 dark:text-purple-400" />
                      Method marks
                    </h4>
                    <ul className="list-disc list-inside space-y-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {breakdown.methodMarks.map((m) => (
                        <li key={m.id}>{m.description} ({m.marks}m)</li>
                      ))}
                    </ul>
                  </div>
                  {breakdown.precisionMarks.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                        <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                        Precision marks
                      </h4>
                      <ul className="list-disc list-inside space-y-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {breakdown.precisionMarks.map((m) => (
                          <li key={m.id}>{m.description} ({m.marks}m)</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Answer input */}
          {!gradeResult ? (
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-semibold mb-2 block" style={{ color: 'rgb(var(--text))' }}>
                  Write your answer
                </span>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here. Aim to hit each mark point in the scheme above."
                  className="w-full p-4 rounded-lg border resize-none"
                  style={{
                    background: 'rgb(var(--surface-2))',
                    borderColor: 'rgb(var(--border))',
                    color: 'rgb(var(--text))',
                  }}
                  rows={6}
                />
              </label>
              <button
                type="button"
                onClick={handleCheckMarks}
                disabled={!userAnswer.trim()}
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)' }}
              >
                Check Your Marks
              </button>
            </div>
          ) : (
            /* Feedback */
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score */}
              <div
                className="p-4 rounded-lg border"
                style={{
                  background: gradeResult.score >= gradeResult.totalMarks * 0.6 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  borderColor: gradeResult.score >= gradeResult.totalMarks * 0.6 ? 'rgb(34, 197, 94)' : 'rgb(245, 158, 11)',
                }}
              >
                <p className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
                  {gradeResult.score} / {gradeResult.totalMarks} marks
                </p>
              </div>

              {/* Marks obtained vs missed */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Check size={18} /> Marks you got
                  </h4>
                  {gradeResult.obtained.length === 0 ? (
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>None yet — try again!</p>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {gradeResult.obtained.map((m) => (
                        <li key={m.id} className="flex items-start gap-2">
                          <Check size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span style={{ color: 'rgb(var(--text))' }}>{m.description}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <X size={18} /> What to add
                  </h4>
                  {gradeResult.missed.length === 0 ? (
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>You hit all the marks!</p>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {gradeResult.missed.map((m) => (
                        <li key={m.id} className="flex items-start gap-2">
                          <span style={{ color: 'rgb(var(--text))' }}>• {m.description}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Common penalties */}
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                  <AlertTriangle size={16} className="text-red-600 dark:text-red-400" />
                  Avoid these examiner penalties
                </h4>
                <div className="space-y-1">
                  {breakdown.commonPenalties.map((penalty, idx) => (
                    <p key={idx} className="text-sm text-red-700 dark:text-red-400">⚠ {penalty}</p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleTryAgain}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium border"
                  style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                >
                  <RotateCcw size={16} />
                  Try again
                </button>
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)' }}
                >
                  {selectedQuestionIndex < questions.length - 1 ? (
                    <>Next question <ChevronRight size={16} /></>
                  ) : (
                    'Back to question list'
                  )}
                </button>
                <Link
                  to={questionLabUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
                  style={{ color: 'rgb(var(--text))', background: 'rgb(var(--surface-2))' }}
                >
                  <ExternalLink size={16} />
                  Practice more in Question Lab
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      ) : null}
    </div>
  );
}

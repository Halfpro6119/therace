import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, FileQuestion, CheckCircle, XCircle, Calculator } from 'lucide-react';
import { getQuestionsByFilters } from '../../config/scienceLabData';
import { gradeScienceAnswer } from '../../utils/scienceGrading';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../types/scienceLab';

export function ScienceLabQuestionLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? parseInt(paper) as SciencePaper : 1;
  const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier : 'Higher';

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const [searchParams] = useSearchParams();
  const topicFilter = searchParams.get('topic') ?? undefined;
  const questions = getQuestionsByFilters(normalizedSubject, paperNum, tierValue, topicFilter);
  const currentQuestion = questions[currentQuestionIndex];

  const handleBack = () => {
    navigate(`/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`);
  };

  const handleSubmit = () => {
    if (!currentQuestion) return;

    const result = gradeScienceAnswer(currentQuestion, userAnswer);
    setIsCorrect(result.correct);
    setShowFeedback(true);

    // Update mastery (only increases on correct)
    if (result.correct) {
      // In a real implementation, track concept mastery based on question topic
      // storage.updateConceptMastery(normalizedSubject, conceptId, true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer('');
      setShowFeedback(false);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>No questions available for this subject, paper, and tier combination.</p>
        <button onClick={handleBack}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Question Lab</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Exam-faithful questions covering every spec point
        </p>
      </motion.section>

      <div className="rounded-xl p-6 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        {/* Question Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <FileQuestion size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
              <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                {currentQuestion.topic} • {currentQuestion.marks} marks
                {currentQuestion.calculatorAllowed && (
                  <span className="ml-2 flex items-center gap-1">
                    <Calculator size={14} />
                    Calculator allowed
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'rgb(var(--text))' }}>
            {currentQuestion.question}
          </h2>
          {currentQuestion.equations && currentQuestion.equations.length > 0 && (
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>
                Required equation(s):
              </p>
              {currentQuestion.equations.map((eq, idx) => (
                <p key={idx} className="text-sm font-mono" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {eq}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Answer Input */}
        {!showFeedback && (
          <div className="space-y-4">
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full p-4 rounded-lg border resize-none"
              style={{
                background: 'rgb(var(--surface-2))',
                borderColor: 'rgb(var(--border))',
                color: 'rgb(var(--text))',
              }}
              rows={4}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="w-full px-6 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
              }}
            >
              Submit Answer
            </button>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div
              className={`p-4 rounded-lg border flex items-start gap-3 ${
                isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}
            >
              {isCorrect ? (
                <CheckCircle size={24} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={24} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {isCorrect
                    ? (currentQuestion.feedback?.correct ?? 'Correct!')
                    : (currentQuestion.feedback?.incorrect ?? 'Incorrect. Review the model answer.')}
                </p>
                {!isCorrect && (
                  <div className="mt-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>
                      Model answer:
                    </p>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {Array.isArray(currentQuestion.correctAnswer)
                        ? currentQuestion.correctAnswer[0]
                        : currentQuestion.correctAnswer}
                    </p>
                  </div>
                )}
                {currentQuestion.feedback?.ideaReference && (
                  <p className="text-xs italic mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {currentQuestion.feedback.ideaReference}
                  </p>
                )}
              </div>
            </div>

            {currentQuestionIndex < questions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition"
                style={{
                  background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                }}
              >
                Next Question
              </button>
            ) : (
              <div className="text-center">
                <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>
                  You've completed all questions!
                </p>
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition"
                  style={{
                    background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                  }}
                >
                  Return to Lab Modes
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

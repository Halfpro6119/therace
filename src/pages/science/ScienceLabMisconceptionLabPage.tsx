import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { getMisconceptionsBySubject } from '../../config/scienceLabData';
import { gradeMisconceptionAnswer } from '../../utils/scienceGrading';
import type { ScienceSubject } from '../../types/scienceLab';

export function ScienceLabMisconceptionLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [currentMisconceptionIndex, setCurrentMisconceptionIndex] = useState(0);
  const [userCorrection, setUserCorrection] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [gradedCorrect, setGradedCorrect] = useState<boolean | null>(null);
  const [graderFeedback, setGraderFeedback] = useState<string | undefined>(undefined);
  const [expectedKeyTerms, setExpectedKeyTerms] = useState<string[]>([]);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const misconceptions = getMisconceptionsBySubject(normalizedSubject);
  const currentMisconception = misconceptions[currentMisconceptionIndex];

  const paperNum = paper ? parseInt(paper) : 1;
  const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : 'Higher';

  const handleBack = () => {
    navigate(`/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`);
  };

  const handleSubmit = () => {
    const result = gradeMisconceptionAnswer(currentMisconception, userCorrection);
    setGradedCorrect(result.correct);
    setGraderFeedback(result.feedback);
    setExpectedKeyTerms(result.expectedKeyTerms ?? []);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentMisconceptionIndex < misconceptions.length - 1) {
      setCurrentMisconceptionIndex(currentMisconceptionIndex + 1);
      setUserCorrection('');
      setShowFeedback(false);
      setGradedCorrect(null);
      setGraderFeedback(undefined);
      setExpectedKeyTerms([]);
    }
  };

  if (!currentMisconception) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>No misconceptions available for this subject.</p>
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
          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Misconception Lab</h1>
        <p className="text-white/90 text-sm sm:text-base">
          A student said something wrong. Explain why it’s wrong and give the correct idea. Your answer is marked correct or wrong based on key ideas (keywords).
        </p>
      </motion.section>

      <div className="rounded-xl p-6 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
              Misconception {currentMisconceptionIndex + 1} of {misconceptions.length}
            </p>
            <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
              {currentMisconception.topic}
            </p>
          </div>
        </div>

        {/* Student quote (misconception) */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400" />
            A student says:
          </h3>
          <div className="p-4 rounded-lg border bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <p className="text-base font-medium" style={{ color: 'rgb(var(--text))' }}>
              “{currentMisconception.misconception}”
            </p>
            {currentMisconception.example && (
              <p className="text-sm mt-2 italic" style={{ color: 'rgb(var(--text-secondary))' }}>
                Example: {currentMisconception.example}
              </p>
            )}
          </div>
        </div>

        {/* User Correction */}
        {!showFeedback && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                <Lightbulb size={20} className="text-yellow-600 dark:text-yellow-400" />
                Your turn
              </h3>
              <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
                Explain why this is wrong and give the correct idea. Your answer will be marked <strong>correct</strong> or <strong>wrong</strong> based on whether you include the right key ideas (keywords).
              </p>
              <textarea
                value={userCorrection}
                onChange={(e) => setUserCorrection(e.target.value)}
                placeholder="Explain why the student is wrong and state the correct understanding..."
                className="w-full p-4 rounded-lg border resize-none"
                style={{
                  background: 'rgb(var(--surface-2))',
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                }}
                rows={6}
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!userCorrection.trim()}
              className="w-full px-6 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              }}
            >
              Submit answer
            </button>
          </div>
        )}

        {/* Feedback – correct/wrong based on keywords */}
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {gradedCorrect !== null && (
              <div
                className={`p-4 rounded-lg border flex items-start gap-3 ${
                  gradedCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                }`}
              >
                {gradedCorrect ? <CheckCircle size={24} className="text-green-600 flex-shrink-0" /> : <XCircle size={24} className="text-amber-600 flex-shrink-0" />}
                <div className="min-w-0">
                  <p className="font-semibold" style={{ color: 'rgb(var(--text))' }}>
                    {gradedCorrect ? 'Your answer is correct.' : 'Your answer is wrong.'}
                  </p>
                  <p className="text-sm mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {gradedCorrect
                      ? 'You included the key ideas we look for.'
                      : 'Marking is based on key ideas (keywords). Your answer did not include enough of the required ideas.'}
                  </p>
                  {!gradedCorrect && expectedKeyTerms.length > 0 && (
                    <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Key ideas we look for: <span className="font-medium" style={{ color: 'rgb(var(--text))' }}>{expectedKeyTerms.join(', ')}</span>
                    </p>
                  )}
                  {!gradedCorrect && graderFeedback && (
                    <p className="text-sm mt-2 italic" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Why it’s wrong: {graderFeedback}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                Correct Understanding
              </h3>
              <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <p className="text-base font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                  ✅ {currentMisconception.correctUnderstanding}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(var(--text))' }}>
                Why It's Wrong
              </h3>
              <div className="p-4 rounded-lg border bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {currentMisconception.whyWrong}
                </p>
              </div>
            </div>

            {currentMisconceptionIndex < misconceptions.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="w-full px-6 py-3 rounded-lg font-semibold text-white transition"
                style={{
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                }}
              >
                Next Misconception
              </button>
            ) : (
              <div className="text-center">
                <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>
                  You've completed all misconceptions!
                </p>
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition"
                  style={{
                    background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
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

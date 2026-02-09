import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { getMisconceptionsBySubject } from '../../config/scienceLabData';
import type { ScienceSubject } from '../../types/scienceLab';

export function ScienceLabMisconceptionLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [currentMisconceptionIndex, setCurrentMisconceptionIndex] = useState(0);
  const [userCorrection, setUserCorrection] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const misconceptions = getMisconceptionsBySubject(normalizedSubject);
  const currentMisconception = misconceptions[currentMisconceptionIndex];

  const handleBack = () => {
    navigate(`/science-lab/${subject.toLowerCase()}`);
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentMisconceptionIndex < misconceptions.length - 1) {
      setCurrentMisconceptionIndex(currentMisconceptionIndex + 1);
      setUserCorrection('');
      setShowFeedback(false);
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
          Identify and correct classic wrong ideas – Grade 9 feature
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

        {/* Misconception */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <XCircle size={20} className="text-red-600 dark:text-red-400" />
            The Wrong Idea
          </h3>
          <div className="p-4 rounded-lg border bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-base font-medium" style={{ color: 'rgb(var(--text))' }}>
              ❌ {currentMisconception.misconception}
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
                Correct This Misconception
              </h3>
              <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
                Explain the correct understanding and why the misconception is wrong.
              </p>
              <textarea
                value={userCorrection}
                onChange={(e) => setUserCorrection(e.target.value)}
                placeholder="Enter your correction..."
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
              Submit Correction
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

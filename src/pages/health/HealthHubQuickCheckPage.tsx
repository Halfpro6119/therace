import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { getUnitById, getQuickChecksByUnit } from '../../config/healthHubData';
import { storage } from '../../utils/storage';
import type { HealthUnitId } from '../../types/healthHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)';

function isCorrectAnswer(check: { correctAnswer: string | string[] }, selected: string): boolean {
  const norm = (s: string) => s.trim().toLowerCase();
  if (Array.isArray(check.correctAnswer)) return check.correctAnswer.some((a) => norm(a) === norm(selected));
  return norm(check.correctAnswer) === norm(selected);
}

export function HealthHubQuickCheckPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shortAnswer, setShortAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const unit = unitId ? getUnitById(unitId as HealthUnitId) : undefined;
  const checks = unit ? getQuickChecksByUnit(unit.id) : [];
  const current = checks[currentIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setShortAnswer('');
    setShowFeedback(false);
  }, [currentIndex, current]);

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

  const getAnswerToCheck = () => {
    if (current?.type === 'shortAnswer') return shortAnswer.trim().toLowerCase();
    return selectedAnswer;
  };

  const handleSubmit = () => {
    if (!current) return;
    const answer = getAnswerToCheck();
    if (answer === null || (current.type === 'shortAnswer' && answer === '')) return;
    const correct = isCorrectAnswer(current, answer);
    setIsCorrect(correct);
    if (correct) setCorrectCount((c) => c + 1);
    setShowFeedback(true);
    if (correct && current.topicId) {
      const existing = storage.getHealthTopicProgressByKey(unit.id, current.topicId);
      storage.updateHealthTopicProgress({
        unitId: unit.id,
        topicId: current.topicId,
        flashcardMasteryPercent: existing?.flashcardMasteryPercent ?? 0,
        quickCheckPassed: true,
        caseStudyCompleted: existing?.caseStudyCompleted ?? false,
        investigationCompleted: existing?.investigationCompleted ?? false,
        questionLabCompleted: existing?.questionLabCompleted ?? false,
        lastUpdated: new Date().toISOString(),
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < checks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
        >
          <h1 className="text-2xl font-bold text-white mb-2">Quick Check complete</h1>
          <p className="text-white/90 text-sm mb-2">You got {correctCount} out of {checks.length} correct.</p>
          <p className="text-white/90 text-sm mb-6">Case Study Lab is now unlocked for this unit.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => navigate(`/health-hub/unit/${unit.id}/case-study`)}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30 flex items-center justify-center gap-2"
            >
              Case Study Lab
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30"
            >
              Back to Unit {unit.id}
            </button>
          </div>
        </motion.section>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No quick checks for this unit yet.</p>
          <button type="button" onClick={handleBack} className="text-sm font-medium px-4 py-2 rounded-lg bg-red-500/20 text-red-700 dark:text-red-400">
            Back to Unit {unit.id}
          </button>
        </div>
      </div>
    );
  }

  const canSubmit = current.type === 'shortAnswer' ? shortAnswer.trim() !== '' : selectedAnswer !== null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} />
          Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Quick Check</h1>
        <p className="text-white/90 text-sm">
          {currentIndex + 1} of {checks.length}
        </p>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <p className="text-lg font-medium" style={{ color: 'rgb(var(--text))' }}>
          {current.question}
        </p>

        {current.type === 'multipleChoice' && current.options && (
          <div className="space-y-2">
            {current.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => !showFeedback && setSelectedAnswer(opt)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                  selectedAnswer === opt ? 'ring-2 ring-red-500 border-red-500 bg-red-500/10' : ''
                }`}
                style={{ borderColor: selectedAnswer === opt ? 'rgb(220 38 38)' : 'rgb(var(--border))' }}
              >
                {opt}{selectedAnswer === opt ? ' ✓' : ''}
              </button>
            ))}
          </div>
        )}

        {current.type === 'trueFalse' && current.options && (
          <div className="flex gap-4">
            {current.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => !showFeedback && setSelectedAnswer(opt)}
                className={`flex-1 px-4 py-3 rounded-lg border ${selectedAnswer === opt ? 'ring-2 ring-red-500 border-red-500 bg-red-500/10' : ''}`}
                style={{ borderColor: selectedAnswer === opt ? 'rgb(220 38 38)' : 'rgb(var(--border))' }}
              >
                {opt}{selectedAnswer === opt ? ' ✓' : ''}
              </button>
            ))}
          </div>
        )}

        {current.type === 'shortAnswer' && (
          <input
            type="text"
            value={shortAnswer}
            onChange={(e) => setShortAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-full px-4 py-3 rounded-lg border"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}
          />
        )}

        {showFeedback && (
          <div className={`rounded-lg p-4 flex gap-2 ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            {isCorrect ? <CheckCircle size={24} className="text-green-500" /> : <XCircle size={24} className="text-red-500" />}
            <div>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>
                {isCorrect ? current.feedback.correct : current.feedback.incorrect}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          {!showFeedback ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
            >
              Check answer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700"
            >
              {currentIndex < checks.length - 1 ? 'Next' : 'Finish'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

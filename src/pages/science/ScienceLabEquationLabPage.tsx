import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Calculator, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { getEquationsBySubject } from '../../config/scienceLabData';
import { storage } from '../../utils/storage';
import type { ScienceSubject } from '../../types/scienceLab';

export function ScienceLabEquationLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [selectedEquationId, setSelectedEquationId] = useState<string | null>(null);
  const [rearrangingAnswer, setRearrangingAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [unitTrapSelected, setUnitTrapSelected] = useState<string | null>(null);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const equations = getEquationsBySubject(normalizedSubject);
  const selectedEquation = equations.find(e => e.id === selectedEquationId);

  const handleBack = () => {
    navigate(`/science-lab/${subject.toLowerCase()}`);
  };

  const handleCheckRearranging = () => {
    if (!selectedEquation || !selectedEquation.rearrangingPrompts[0]) return;
    const normalized = rearrangingAnswer.trim().replace(/\s+/g, '');
    const correct = selectedEquation.rearrangingPrompts[0].correctRearrangement.replace(/\s+/g, '');
    const isCorrect = normalized === correct || normalized.includes(correct);
    setShowFeedback(true);
    if (isCorrect) {
      storage.updateEquationMastery(normalizedSubject, selectedEquation.id, true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Equation Lab</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Equations with units enforcement, rearranging practice, "spot the wrong unit" traps
        </p>
      </motion.section>

      {!selectedEquation ? (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
            Select an Equation
          </h2>
          <div className="space-y-4">
            {equations.map((equation, index) => (
              <motion.button
                key={equation.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => setSelectedEquationId(equation.id)}
                className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 font-mono" style={{ color: 'rgb(var(--text))' }}>
                      {equation.equation}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {equation.topic}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/20">
                    <Calculator size={24} className="text-purple-600 dark:text-purple-400" />
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
            onClick={() => {
              setSelectedEquationId(null);
              setRearrangingAnswer('');
              setShowFeedback(false);
              setUnitTrapSelected(null);
            }}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            <ChevronLeft size={18} />
            Back to equations
          </button>

          <div className="rounded-xl p-6 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
            <h2 className="text-2xl font-bold mb-2 font-mono" style={{ color: 'rgb(var(--text))' }}>
              {selectedEquation.equation}
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
              {selectedEquation.topic}
            </p>

            {/* Symbols */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(var(--text))' }}>
                Symbols Explained
              </h3>
              <div className="space-y-2">
                {selectedEquation.symbols.map((symbol, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border"
                    style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-mono font-semibold" style={{ color: 'rgb(var(--text))' }}>
                          {symbol.symbol}
                        </p>
                        <p className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {symbol.name}
                        </p>
                        <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {symbol.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono font-semibold" style={{ color: 'rgb(var(--text))' }}>
                          {symbol.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unit Traps */}
            {selectedEquation.unitTraps.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                  <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
                  Spot the Wrong Unit
                </h3>
                <div className="space-y-2">
                  {selectedEquation.unitTraps.map((trap, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUnitTrapSelected(trap.wrongUnit)}
                      className={`w-full p-3 rounded-lg border text-left transition ${
                        unitTrapSelected === trap.wrongUnit
                          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm font-mono" style={{ color: 'rgb(var(--text))' }}>
                        {trap.wrongUnit}
                      </p>
                      {unitTrapSelected === trap.wrongUnit && (
                        <div className="mt-2 pt-2 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
                          <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>
                            ❌ Wrong: {trap.wrongUnit}
                          </p>
                          <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>
                            ✅ Correct: {trap.correctUnit}
                          </p>
                          <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                            {trap.explanation}
                          </p>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Rearranging Practice */}
            {selectedEquation.rearrangingPrompts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(var(--text))' }}>
                  Rearranging Practice
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                      {selectedEquation.rearrangingPrompts[0].prompt}
                    </p>
                    {!showFeedback ? (
                      <>
                        <input
                          type="text"
                          value={rearrangingAnswer}
                          onChange={(e) => setRearrangingAnswer(e.target.value)}
                          placeholder="Enter rearranged equation..."
                          className="w-full p-3 rounded-lg border font-mono"
                          style={{
                            background: 'rgb(var(--surface-2))',
                            borderColor: 'rgb(var(--border))',
                            color: 'rgb(var(--text))',
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleCheckRearranging}
                          disabled={!rearrangingAnswer.trim()}
                          className="mt-3 px-6 py-2 rounded-lg font-semibold text-white transition disabled:opacity-50"
                          style={{
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                          }}
                        >
                          Check Answer
                        </button>
                      </>
                    ) : (
                      <div className="p-4 rounded-lg border bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                        <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                          Correct rearrangement:
                        </p>
                        <p className="text-sm font-mono" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {selectedEquation.rearrangingPrompts[0].correctRearrangement}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}
    </div>
  );
}

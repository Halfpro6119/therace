import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Calculator,
  CheckCircle,
  XCircle,
  BookOpen,
  Shuffle,
  Target,
  Hash,
} from 'lucide-react';
import { getEquationsBySubject } from '../../config/scienceLabData';
import { storage } from '../../utils/storage';
import type { ScienceSubject } from '../../types/scienceLab';

type TabId = 'reference' | 'rearranging' | 'calculate';

/** Normalize rearranged equation for comparison: strip spaces, unify ×/÷ and * / */
function normalizeRearrangement(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/\^/g, '^')
    .toLowerCase();
}

/** Check if user's rearrangement matches the correct one (allows equivalent forms) */
function rearrangementsMatch(user: string, correct: string): boolean {
  const a = normalizeRearrangement(user);
  const b = normalizeRearrangement(correct);
  if (a === b) return true;
  // Allow "a = b/c" to match "a = b ÷ c" etc already handled
  // Allow "sqrt(2E_k/m)" vs "√(2E_k/m)" - approximate by checking key parts
  if (b.includes('√') || b.includes('sqrt')) {
    const userNorm = a.replace(/sqrt/g, '');
    const correctNorm = b.replace(/√/g, '').replace(/sqrt/g, '');
    return userNorm === correctNorm || a.includes('2e_k') || a.includes('2ek');
  }
  return false;
}

/** Shuffle array (Fisher–Yates) */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const TABS: { id: TabId; label: string; icon: typeof BookOpen }[] = [
  { id: 'reference', label: 'Reference', icon: BookOpen },
  { id: 'rearranging', label: 'Rearranging', icon: Shuffle },
  { id: 'calculate', label: 'Calculate', icon: Hash },
];

export function ScienceLabEquationLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [selectedEquationId, setSelectedEquationId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('reference');

  // Rearranging state
  const [rearrangeIndex, setRearrangeIndex] = useState(0);
  const [rearrangingAnswer, setRearrangingAnswer] = useState('');
  const [rearrangeFeedback, setRearrangeFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Calculate state (1 mark value, 1 mark unit)
  const [calcIndex, setCalcIndex] = useState(0);
  const [calcAnswer, setCalcAnswer] = useState('');
  const [calcUnit, setCalcUnit] = useState('');
  const [calcMarks, setCalcMarks] = useState<{ valueMark: boolean; unitMark: boolean } | null>(null);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject =
    subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const equations = getEquationsBySubject(normalizedSubject);
  const selectedEquation = equations.find((e) => e.id === selectedEquationId);

  const handleBack = () => {
    navigate(`/science-lab/${subject?.toLowerCase()}`);
  };

  const handleCheckRearranging = () => {
    if (!selectedEquation?.rearrangingPrompts.length) return;
    const prompt = selectedEquation.rearrangingPrompts[rearrangeIndex];
    const correct = rearrangementsMatch(rearrangingAnswer, prompt.correctRearrangement);
    setRearrangeFeedback(correct ? 'correct' : 'incorrect');
    if (correct) {
      storage.updateEquationMastery(normalizedSubject, selectedEquation.id, true);
    }
  };

  const handleNextRearranging = () => {
    if (!selectedEquation) return;
    const next = (rearrangeIndex + 1) % selectedEquation.rearrangingPrompts.length;
    setRearrangeIndex(next);
    setRearrangingAnswer('');
    setRearrangeFeedback(null);
  };

  const handleCheckCalculate = () => {
    const calcs = selectedEquation?.practiceCalculations;
    if (!calcs?.length) return;
    const practice = calcs[calcIndex];
    const num = parseFloat(calcAnswer.replace(/,/g, '.'));
    const tol = practice.tolerance ?? 0.01;
    const valueMark = !Number.isNaN(num) && Math.abs(num - practice.answer) <= tol;
    const unitMark =
      practice.unit.replace(/\s/g, '').toLowerCase() ===
      calcUnit.replace(/\s/g, '').toLowerCase();
    setCalcMarks({ valueMark, unitMark });
    if (valueMark && unitMark) {
      storage.updateEquationMastery(normalizedSubject, selectedEquation!.id, true);
    }
  };

  const handleNextCalc = () => {
    const calcs = selectedEquation?.practiceCalculations;
    if (!calcs) return;
    setCalcIndex((i) => (i + 1) % calcs.length);
    setCalcAnswer('');
    setCalcUnit('');
    setCalcMarks(null);
  };

  const resetEquationState = () => {
    setSelectedEquationId(null);
    setRearrangingAnswer('');
    setRearrangeFeedback(null);
    setRearrangeIndex(0);
    setCalcAnswer('');
    setCalcUnit('');
    setCalcMarks(null);
    setCalcIndex(0);
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
          Practise symbols, rearranging, and calculations (value + unit) for exam-style questions.
        </p>
      </motion.section>

      {!selectedEquation ? (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
            Select an equation
          </h2>
          <div className="space-y-4">
            {equations.map((equation, index) => (
              <motion.button
                key={equation.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + index * 0.04 }}
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
                    <div className="flex flex-wrap gap-2 mt-2">
                      {equation.rearrangingPrompts.length > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">
                          Rearranging
                        </span>
                      )}
                      {equation.practiceCalculations && equation.practiceCalculations.length > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                          Calculate
                        </span>
                      )}
                    </div>
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
            onClick={resetEquationState}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            <ChevronLeft size={18} />
            Back to equations
          </button>

          <div
            className="rounded-xl p-6 border"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <h2 className="text-2xl font-bold mb-2 font-mono" style={{ color: 'rgb(var(--text))' }}>
              {selectedEquation.equation}
            </h2>
            <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
              {selectedEquation.topic}
            </p>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4" style={{ borderColor: 'rgb(var(--border))' }}>
              {TABS.map((tab) => {
                const disabled =
                  (tab.id === 'rearranging' && selectedEquation.rearrangingPrompts.length === 0) ||
                  (tab.id === 'calculate' &&
                    (!selectedEquation.practiceCalculations || selectedEquation.practiceCalculations.length === 0));
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setRearrangeFeedback(null);
                      setCalcMarks(null);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'opacity-80 hover:opacity-100'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{
                      background: activeTab === tab.id ? 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' : 'rgb(var(--surface-2))',
                      color: activeTab === tab.id ? 'white' : 'rgb(var(--text))',
                    }}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'reference' && (
                <motion.div
                  key="reference"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold" style={{ color: 'rgb(var(--text))' }}>
                    Symbols & units
                  </h3>
                  <div className="space-y-2">
                    {selectedEquation.symbols.map((symbol, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border flex flex-wrap items-center justify-between gap-2"
                        style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
                      >
                        <div>
                          <span className="font-mono font-semibold" style={{ color: 'rgb(var(--text))' }}>
                            {symbol.symbol}
                          </span>
                          <span className="text-sm ml-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                            {symbol.name} — {symbol.description}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
                          {symbol.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'rearranging' && selectedEquation.rearrangingPrompts.length > 0 && (
                <motion.div
                  key="rearranging"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold" style={{ color: 'rgb(var(--text))' }}>
                    Rearranging practice
                  </h3>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {selectedEquation.rearrangingPrompts[rearrangeIndex].prompt}
                  </p>
                  {rearrangeFeedback === null ? (
                    <>
                      <input
                        type="text"
                        value={rearrangingAnswer}
                        onChange={(e) => setRearrangingAnswer(e.target.value)}
                        placeholder="e.g. R = V ÷ I"
                        className="w-full p-3 rounded-lg border font-mono text-lg"
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
                        className="px-6 py-2 rounded-lg font-semibold text-white transition disabled:opacity-50"
                        style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' }}
                      >
                        Check
                      </button>
                    </>
                  ) : (
                    <div
                      className={`p-4 rounded-lg border ${
                        rearrangeFeedback === 'correct'
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      }`}
                    >
                      {rearrangeFeedback === 'correct' ? (
                        <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                          <CheckCircle size={22} />
                          <span className="font-semibold">Correct.</span>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2 text-red-800 dark:text-red-200">
                          <XCircle size={22} className="flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold">Not quite. Correct form:</p>
                            <p className="font-mono mt-1" style={{ color: 'rgb(var(--text))' }}>
                              {selectedEquation.rearrangingPrompts[rearrangeIndex].correctRearrangement}
                            </p>
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={handleNextRearranging}
                        className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/30"
                        style={{ color: 'rgb(var(--text))' }}
                      >
                        {selectedEquation.rearrangingPrompts.length > 1 ? 'Next rearrangement' : 'Try again'}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'calculate' &&
                selectedEquation.practiceCalculations &&
                selectedEquation.practiceCalculations.length > 0 && (
                  <motion.div
                    key="calculate"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                      <Target size={20} />
                      Calculation practice
                    </h3>
                    <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
                      {selectedEquation.practiceCalculations[calcIndex].prompt}
                    </p>
                    {calcMarks === null ? (
                      <>
                        <p className="text-xs font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                          (1 mark for correct value, 1 mark for correct unit)
                        </p>
                        <div className="flex flex-wrap gap-3 items-end">
                          <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                              Numerical value
                            </label>
                            <input
                              type="text"
                              inputMode="decimal"
                              value={calcAnswer}
                              onChange={(e) => setCalcAnswer(e.target.value.replace(/[^0-9.,-]/g, ''))}
                              placeholder="e.g. 3"
                              className="w-32 p-3 rounded-lg border font-mono text-lg"
                              style={{
                                background: 'rgb(var(--surface-2))',
                                borderColor: 'rgb(var(--border))',
                                color: 'rgb(var(--text))',
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                              Unit
                            </label>
                            <input
                              type="text"
                              value={calcUnit}
                              onChange={(e) => setCalcUnit(e.target.value)}
                              placeholder="e.g. A"
                              className="w-24 p-3 rounded-lg border font-mono"
                              style={{
                                background: 'rgb(var(--surface-2))',
                                borderColor: 'rgb(var(--border))',
                                color: 'rgb(var(--text))',
                              }}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleCheckCalculate}
                          disabled={!calcAnswer.trim()}
                          className="px-6 py-2 rounded-lg font-semibold text-white transition disabled:opacity-50"
                          style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)' }}
                        >
                          Check
                        </button>
                      </>
                    ) : (
                      <div
                        className={`p-4 rounded-lg border ${
                          calcMarks.valueMark && calcMarks.unitMark
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
                        }`}
                      >
                        <p className="font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                          {calcMarks.valueMark && calcMarks.unitMark ? '2/2' : '1/2'} marks
                        </p>
                        <ul className="space-y-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                          <li className="flex items-center gap-2">
                            {calcMarks.valueMark ? <CheckCircle size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" /> : <XCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />}
                            {calcMarks.valueMark ? 'Correct value' : `Value: expected ${selectedEquation.practiceCalculations[calcIndex].answer}`}
                          </li>
                          <li className="flex items-center gap-2">
                            {calcMarks.unitMark ? <CheckCircle size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" /> : <XCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0" />}
                            {calcMarks.unitMark ? 'Correct unit' : `Unit: expected ${selectedEquation.practiceCalculations[calcIndex].unit}`}
                          </li>
                        </ul>
                        {selectedEquation.practiceCalculations.length > 1 && (
                          <button
                            type="button"
                            onClick={handleNextCalc}
                            className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-white/80 dark:bg-black/20"
                            style={{ color: 'rgb(var(--text))' }}
                          >
                            Next question
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </motion.section>
      )}
    </div>
  );
}

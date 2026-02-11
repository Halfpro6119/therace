import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calculator, CheckCircle, XCircle } from 'lucide-react';
import { getUnitById, getCalculationsByUnit } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import type { BusinessUnitId } from '../../types/businessHub';
import type { CalculationTask } from '../../types/businessHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)';

/** Primary key to check for each calculation type (one main figure for "your answer"). */
function getPrimaryExpectedKey(task: CalculationTask): string | null {
  const e = task.expected;
  if (e.profit != null) return 'profit';
  if (e.unitCost != null) return 'unitCost';
  if (e.netCashFlow != null) return 'netCashFlow';
  if (e.closing != null) return 'closing';
  if (e.arrPercent != null) return 'arrPercent';
  if (e.grossProfit != null) return 'grossProfit';
  if (e.marginPercent != null) return 'marginPercent';
  return Object.keys(e)[0] ?? null;
}

export function BusinessHubCalculationLabPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [taskIndex, setTaskIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [yourAnswer, setYourAnswer] = useState('');
  const [checked, setChecked] = useState(false);

  const unit = unitId ? getUnitById(unitId as BusinessUnitId) : undefined;
  const tasks = unit ? getCalculationsByUnit(unit.id) : [];
  const task = tasks[taskIndex];

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/business-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>Back to Business Hub</button>
      </div>
    );
  }

  const handleBack = () => navigate(`/business-hub/unit/${unit.id}`);
  const handleNext = () => {
    setShowAnswer(false);
    setYourAnswer('');
    setChecked(false);
    if (taskIndex < tasks.length - 1) setTaskIndex(taskIndex + 1);
    else {
      storage.markUnitCalculationsCompleted(unit.id, unit.topics.map((t) => t.id));
      navigate(`/business-hub/unit/${unit.id}/evaluation`);
    }
  };
  const handlePrev = () => {
    setShowAnswer(false);
    setYourAnswer('');
    setChecked(false);
    if (taskIndex > 0) setTaskIndex(taskIndex - 1);
  };

  if (!task) {
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
          <h1 className="text-2xl font-bold text-white mb-2">Calculation Lab</h1>
          <p className="text-white/90 text-sm">Revenue, costs, cash flow, margins</p>
        </motion.section>
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No calculation tasks for this unit yet. Try another unit or mode.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => navigate('/business-hub')} className="text-sm font-medium px-4 py-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400">All units</button>
            <button type="button" onClick={handleBack} className="text-sm font-medium px-4 py-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>Back to Unit {unit.id}</button>
          </div>
        </div>
      </div>
    );
  }

  const primaryKey = getPrimaryExpectedKey(task);
  const expectedValue = primaryKey ? (task.expected as Record<string, number>)[primaryKey] : null;
  const numAnswer = yourAnswer.trim() === '' ? null : Number(yourAnswer.replace(/,/g, ''));
  const isCorrect = expectedValue != null && numAnswer !== null && Number.isFinite(numAnswer) && Math.round(numAnswer) === Math.round(expectedValue);

  const handleCheck = () => setChecked(true);

  const typeLabel: Record<string, string> = {
    revenueCostProfit: 'Revenue, cost & profit',
    unitCost: 'Unit cost',
    cashFlow: 'Cash flow',
    averageRateOfReturn: 'Average rate of return',
    grossProfitMargin: 'Gross profit margin',
    netProfitMargin: 'Net profit margin',
  };

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
        <h1 className="text-2xl font-bold text-white mb-2">Calculation Lab</h1>
        <p className="text-white/90 text-sm">Revenue, costs, cash flow, margins</p>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Task {taskIndex + 1} of {tasks.length} · {typeLabel[task.type] ?? task.type}</p>
        <p className="text-base" style={{ color: 'rgb(var(--text))' }}>{task.scenario}</p>
        {task.formulaHint && (
          <div className="rounded-lg p-3 bg-amber-500/10 border border-amber-500/30">
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{task.formulaHint}</p>
          </div>
        )}

        {primaryKey && expectedValue != null && (
          <div className="rounded-lg p-4 border" style={{ borderColor: 'rgb(var(--border))' }}>
            <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Your answer (optional)</p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="number"
                value={yourAnswer}
                onChange={(e) => setYourAnswer(e.target.value)}
                placeholder={primaryKey === 'marginPercent' || primaryKey === 'arrPercent' ? 'e.g. 40' : 'e.g. 1000'}
                className="w-32 px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
              />
              <button
                type="button"
                onClick={handleCheck}
                disabled={yourAnswer.trim() === ''}
                className="px-4 py-2 rounded-lg font-medium bg-amber-500 text-white disabled:opacity-50 text-sm"
              >
                Check
              </button>
            </div>
            {checked && (
              <div className={`mt-3 flex items-center gap-2 text-sm ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isCorrect ? <CheckCircle size={18} /> : <XCircle size={18} />}
                {isCorrect ? 'Correct!' : `Expected ${primaryKey}: ${expectedValue}`}
              </div>
            )}
          </div>
        )}

        <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>{task.interpretationQuestion}</p>
        {!showAnswer ? (
          <button
            type="button"
            onClick={() => setShowAnswer(true)}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-amber-500 text-white hover:bg-amber-600"
          >
            <Calculator size={18} /> Show answer & interpretation
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg p-4 border space-y-2"
              style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgb(var(--border))' }}
            >
              <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>Expected (key figures)</p>
              <p className="text-sm font-mono" style={{ color: 'rgb(var(--text-secondary))' }}>
                {Object.entries(task.expected).map(([k, v]) => `${k}: ${v}`).join(' · ')}
              </p>
              <p className="text-sm font-medium mt-2" style={{ color: 'rgb(var(--text))' }}>Interpretation</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{task.interpretationAnswer}</p>
            </motion.div>
          </AnimatePresence>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={taskIndex === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1 px-6 py-2 rounded-lg font-semibold bg-amber-500 text-white hover:bg-amber-600"
          >
            {taskIndex < tasks.length - 1 ? 'Next task' : 'Finish → Evaluation'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

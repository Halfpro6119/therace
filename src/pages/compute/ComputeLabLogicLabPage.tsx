import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CircleDot } from 'lucide-react';
import { getUnitById, getLogicTasksByUnit } from '../../config/computeLabData';
import type { ComputeUnitId } from '../../types/computeLab';

const HERO_GRADIENT = 'linear-gradient(135deg, #0891B2 0%, #0E7490 50%, #155E75 100%)';

export function ComputeLabLogicLabPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();

  const unit = unitId ? getUnitById(unitId as ComputeUnitId) : undefined;
  const tasks = unit ? getLogicTasksByUnit(unit.id) : [];

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/compute-lab')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Back to Compute Lab
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
        >
          <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
            <ChevronLeft size={18} /> Back to Unit {unit.id}
          </button>
          <h1 className="text-2xl font-bold text-white mb-2">Logic Lab</h1>
          <p className="text-white/90 text-sm">No logic tasks for this unit yet.</p>
        </motion.section>
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="text-sm font-medium px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-700 dark:text-cyan-400">
            Back to Unit {unit.id}
          </button>
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
        style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Logic Lab</h1>
        <p className="text-white/90 text-sm">Truth tables and Boolean expressions</p>
      </motion.section>

      <div className="space-y-6">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-xl p-6 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>{task.title}</h2>
            <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>Inputs: {task.inputs.join(', ')}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    {task.inputs.map((inp) => (
                      <th key={inp} className="border px-4 py-2" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>{inp}</th>
                    ))}
                    <th className="border px-4 py-2" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>Output</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(task.truthTable).map(([combo, out]) => (
                    <tr key={combo}>
                      {combo.split('').map((c, i) => (
                        <td key={i} className="border px-4 py-2 text-center" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>{c}</td>
                      ))}
                      <td className="border px-4 py-2 text-center font-bold" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>{out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {task.expression && (
              <p className="mt-4 text-sm font-mono" style={{ color: 'rgb(var(--text-secondary))' }}>Boolean expression: {task.expression}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

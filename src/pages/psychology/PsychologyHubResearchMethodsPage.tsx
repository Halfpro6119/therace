import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getPsychologyTopicsForSelection } from '../../config/psychologyHubData';
import { getResearchMethodsTasks } from '../../config/psychologyHubData';

const ACCENT = '#9333EA';

export function PsychologyHubResearchMethodsPage() {
  const navigate = useNavigate();
  const selection = storage.getPsychologyOptionSelection();
  const topics = selection ? getPsychologyTopicsForSelection(selection) : [];
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const tasks = getResearchMethodsTasks(typeFilter || undefined);
  const task = tasks[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/psychology-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/psychology-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Psychology Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Research methods</h1>

      <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setIndex(0); setShowAnswer(false); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        <option value="">All types</option>
        <option value="design">Design</option>
        <option value="method">Method</option>
        <option value="data">Data handling</option>
        <option value="inferential">Inferential testing</option>
      </select>

      {tasks.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No research methods tasks yet.</p>
      ) : task ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-xs mb-2" style={{ color: ACCENT }}>{task.type}</p>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {tasks.length}</p>
          {task.scenario && <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}><strong>Scenario:</strong> {task.scenario}</p>}
          <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{task.question}</p>
          {!showAnswer ? (
            <button type="button" onClick={() => setShowAnswer(true)} className="text-sm font-medium" style={{ color: ACCENT }}>Show model answer</button>
          ) : (
            <div className="rounded-lg p-4 text-sm border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text-secondary))' }}>
              {task.expectedAnswer}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => { setIndex((i) => (i === 0 ? tasks.length - 1 : i - 1)); setShowAnswer(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setIndex((i) => (i >= tasks.length - 1 ? 0 : i + 1)); setShowAnswer(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

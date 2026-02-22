import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection } from '../../config/historyHubData';

import { LAB_ACCENT } from '../../config/hubTheme';

export function HistoryHubRevisionMapPage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : [];
  const progress = storage.getHistoryPartProgress();

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/history-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <button type="button" onClick={() => navigate('/history-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to History Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Revision map</h1>

      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        Your four options and suggested order: Timeline → Key terms → Quick check → Interpretation / Question lab.
      </p>

      <div className="space-y-6">
        {options.map((opt) => (
          <div key={opt.optionKey} className="rounded-2xl border p-5" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
            <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>{opt.title}</h2>
            <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>Paper {opt.paper}</p>
            <ul className="space-y-2">
              {opt.parts.map((part) => {
                const key = `${opt.optionKey}-${part.id}`;
                const p = progress[key];
                return (
                  <li key={part.id} className="flex items-center gap-2 text-sm">
                    <span style={{ color: 'rgb(var(--text))' }}>{part.title}</span>
                    {p?.quickCheckPassed && <span className="text-xs text-green-600 dark:text-green-400">Quick check ✓</span>}
                    <button
                      type="button"
                      onClick={() => navigate('/history-hub/timeline', { state: { optionKey: opt.optionKey, partId: part.id } })}
                      className="text-xs font-medium ml-auto"
                      style={{ color: LAB_ACCENT }}
                    >
                      Start
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

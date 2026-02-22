import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import {
  HISTORY_PERIOD_OPTIONS,
  HISTORY_WIDER_WORLD_OPTIONS,
  HISTORY_THEMATIC_OPTIONS,
  HISTORY_BRITISH_DEPTH_OPTIONS,
} from '../../config/historyHubData';
import type { HistoryOptionSelection, PeriodStudyId, WiderWorldDepthId, ThematicStudyId, BritishDepthId } from '../../types/historyHub';

import { LAB_ACCENT } from '../../config/hubTheme';

const DEFAULT_SELECTION: HistoryOptionSelection = {
  periodStudy: 'AB',
  widerWorldDepth: 'BA',
  thematic: 'AA',
  britishDepth: 'BC',
};

export function HistoryHubOptionSelectPage() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<HistoryOptionSelection>(DEFAULT_SELECTION);

  useEffect(() => {
    const saved = storage.getHistoryOptionSelection();
    if (saved) setSelection(saved);
  }, []);

  const handleSave = () => {
    storage.setHistoryOptionSelection(selection);
    navigate('/history-hub');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <button
          type="button"
          onClick={() => navigate('/history-hub')}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to History Hub
        </button>
        <h1 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Choose your four options
        </h1>
        <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
          Select one from each section (as declared at entry). Content will be filtered to these options only.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper 1 Section A – Period study
            </label>
            <select
              value={selection.periodStudy}
              onChange={(e) => setSelection((s) => ({ ...s, periodStudy: e.target.value as PeriodStudyId }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {HISTORY_PERIOD_OPTIONS.map((opt) => (
                <option key={opt.optionKey} value={opt.id}>{opt.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper 1 Section B – Wider world depth study
            </label>
            <select
              value={selection.widerWorldDepth}
              onChange={(e) => setSelection((s) => ({ ...s, widerWorldDepth: e.target.value as WiderWorldDepthId }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {HISTORY_WIDER_WORLD_OPTIONS.map((opt) => (
                <option key={opt.optionKey} value={opt.id}>{opt.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper 2 Section A – Thematic study
            </label>
            <select
              value={selection.thematic}
              onChange={(e) => setSelection((s) => ({ ...s, thematic: e.target.value as ThematicStudyId }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {HISTORY_THEMATIC_OPTIONS.map((opt) => (
                <option key={opt.optionKey} value={opt.id}>{opt.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper 2 Section B – British depth study (incl. historic environment)
            </label>
            <select
              value={selection.britishDepth}
              onChange={(e) => setSelection((s) => ({ ...s, britishDepth: e.target.value as BritishDepthId }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {HISTORY_BRITISH_DEPTH_OPTIONS.map((opt) => (
                <option key={opt.optionKey} value={opt.id}>{opt.title}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white"
          style={{ background: LAB_ACCENT }}
        >
          Save and continue
        </button>
      </section>
    </div>
  );
}

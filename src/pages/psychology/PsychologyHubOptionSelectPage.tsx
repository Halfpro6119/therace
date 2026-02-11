import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { OPTION1_TOPICS, OPTION2_TOPICS, OPTION3_TOPICS } from '../../config/psychologyHubData';
import type { PsychologyOptionSelection, Option1Id, Option2Id, Option3Id } from '../../types/psychologyHub';

const ACCENT = '#9333EA';

const DEFAULT_SELECTION: PsychologyOptionSelection = {
  option1: 'relationships',
  option2: 'schizophrenia',
  option3: 'aggression',
};

export function PsychologyHubOptionSelectPage() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<PsychologyOptionSelection>(DEFAULT_SELECTION);

  useEffect(() => {
    const saved = storage.getPsychologyOptionSelection();
    if (saved) setSelection(saved);
  }, []);

  const handleSave = () => {
    storage.setPsychologyOptionSelection(selection);
    navigate('/psychology-hub');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <button
          type="button"
          onClick={() => navigate('/psychology-hub')}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to Psychology Hub
        </button>
        <h1 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Choose your three options (Paper 3)
        </h1>
        <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
          Select one topic from each option. Content will be filtered to these plus all compulsory topics.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Option 1
            </label>
            <select
              value={selection.option1}
              onChange={(e) => setSelection((s) => ({ ...s, option1: e.target.value as Option1Id }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {OPTION1_TOPICS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Option 2
            </label>
            <select
              value={selection.option2}
              onChange={(e) => setSelection((s) => ({ ...s, option2: e.target.value as Option2Id }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {OPTION2_TOPICS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Option 3
            </label>
            <select
              value={selection.option3}
              onChange={(e) => setSelection((s) => ({ ...s, option3: e.target.value as Option3Id }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {OPTION3_TOPICS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.title}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white"
          style={{ background: ACCENT }}
        >
          Save and continue
        </button>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { GEOGRAPHY_FIELDWORK_TASKS_LIST } from '../../config/geographyHubData';

const ACCENT = '#0D9488';

export function GeographyHubFieldworkLabPage() {
  const navigate = useNavigate();
  const selection = storage.getGeographyOptionSelection();
  const [index, setIndex] = useState(0);
  const [showMarkScheme, setShowMarkScheme] = useState(false);

  const tasks = GEOGRAPHY_FIELDWORK_TASKS_LIST;
  const current = tasks[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/geography-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/geography-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Geography Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Fieldwork lab</h1>
      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        Practise the enquiry process: question, methods, data, analysis, conclusions, evaluation.
      </p>

      {tasks.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No fieldwork tasks yet.</p>
      ) : current ? (
        <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {tasks.length} • {current.enquiryStrand}</p>
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>{current.type === 'unfamiliar' ? 'Unfamiliar context' : 'Your enquiry'}</h2>
          <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{current.question}</p>
          {current.data && <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{current.data}</p>}
          <button type="button" onClick={() => setShowMarkScheme((s) => !s)} className="text-sm font-medium" style={{ color: ACCENT }}>
            {showMarkScheme ? 'Hide' : 'Show'} mark scheme
          </button>
          {showMarkScheme && (
            <div className="rounded-lg p-3" style={{ background: `${ACCENT}15` }}>
              <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{current.markScheme}</p>
            </div>
          )}
          <div className="flex justify-between pt-4">
            <button type="button" onClick={() => { setIndex((i) => (i === 0 ? tasks.length - 1 : i - 1)); setShowMarkScheme(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setIndex((i) => (i >= tasks.length - 1 ? 0 : i + 1)); setShowMarkScheme(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

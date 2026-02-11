import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getContrastingViewsForSelection } from '../../config/religiousStudiesHubData';

const ACCENT = '#7C3AED';

export function ReligiousStudiesHubContrastingViewsPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const views = selection ? getContrastingViewsForSelection(selection) : [];
  const [index, setIndex] = useState(0);
  const [showModel, setShowModel] = useState(false);

  const current = views[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/religious-studies-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Religious Studies Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Contrasting views</h1>

      {views.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No contrasting views for your themes yet.</p>
      ) : current ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {views.length}</p>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>{current.issue}</h2>
          <div className="space-y-4">
            {current.views.map((v, i) => (
              <div key={i} className="rounded-lg p-4" style={{ background: `${ACCENT}08`, borderLeft: `4px solid ${ACCENT}` }}>
                <p className="font-medium text-sm mb-1" style={{ color: 'rgb(var(--text))' }}>{v.religion}</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{v.view}</p>
                {v.scripture && <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>Ref: {v.scripture}</p>}
              </div>
            ))}
          </div>
          {current.modelAnswer && (
            <>
              <button type="button" onClick={() => setShowModel(!showModel)} className="mt-4 text-sm font-medium" style={{ color: ACCENT }}>{showModel ? 'Hide' : 'Show'} model answer</button>
              {showModel && (
                <div className="mt-4 rounded-lg p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))', border: '1px solid' }}>
                  <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Model answer</p>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{current.modelAnswer}</p>
                </div>
              )}
            </>
          )}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => { setIndex((i) => (i === 0 ? views.length - 1 : i - 1)); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setIndex((i) => (i === views.length - 1 ? 0 : i + 1)); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

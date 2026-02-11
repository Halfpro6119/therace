import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { TEXTUAL_PASSAGES } from '../../config/religiousStudiesHubData';

const ACCENT = '#7C3AED';

export function ReligiousStudiesHubTextualStudiesPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const hasTextual = selection?.textualRoute && selection?.themes.some((t) => t === 'G' || t === 'H');
  const passages = hasTextual ? TEXTUAL_PASSAGES : [];
  const [index, setIndex] = useState(0);

  const passage = passages[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  if (!hasTextual) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Textual studies (St Mark&apos;s Gospel) are part of the textual route. Choose the textual studies route in options to access Themes G and H.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Change options</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/religious-studies-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Religious Studies Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Textual studies (St Mark&apos;s Gospel)</h1>

      {passages.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No passages yet.</p>
      ) : passage ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {passages.length} • Theme {passage.themeId}</p>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>{passage.title}</h2>
          <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>{passage.passageRef}</p>
          <div className="rounded-lg p-4 mb-4" style={{ background: `${ACCENT}08`, borderLeft: `4px solid ${ACCENT}` }}>
            <p className="text-sm italic" style={{ color: 'rgb(var(--text))' }}>{passage.passageText}</p>
          </div>
          {passage.significance && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Significance</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{passage.significance}</p>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setIndex((i) => (i === 0 ? passages.length - 1 : i - 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => setIndex((i) => (i === passages.length - 1 ? 0 : i + 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

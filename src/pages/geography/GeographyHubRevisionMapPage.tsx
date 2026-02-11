import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getGeographySectionsForSelection } from '../../config/geographyHubData';

const ACCENT = '#0D9488';

export function GeographyHubRevisionMapPage() {
  const navigate = useNavigate();
  const selection = storage.getGeographyOptionSelection();
  const sections = selection ? getGeographySectionsForSelection(selection) : [];
  const progress = storage.getGeographySectionProgress();

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/geography-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  const byPaper = sections.reduce<Record<number, typeof sections>>((acc, s) => {
    (acc[s.paper] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/geography-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Geography Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Revision map</h1>
      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        Your options and progress by section.
      </p>

      <div className="space-y-6">
        {[1, 2, 3].map((paper) => {
          const paperSections = byPaper[paper] ?? [];
          if (paperSections.length === 0) return null;
          return (
            <div key={paper} className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
              <h2 className="text-base font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
                Paper {paper} {paper === 1 ? '– Physical' : paper === 2 ? '– Human' : '– Applications'}
              </h2>
              <ul className="space-y-3">
                {paperSections.map((s) => {
                  const prog = progress[s.id];
                  return (
                    <li key={s.id} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'rgb(var(--text))' }}>{s.title}</span>
                      <div className="flex items-center gap-2">
                        {prog?.quickCheckPassed && <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">Quick check ✓</span>}
                        <button
                          type="button"
                          onClick={() => navigate('/geography-hub/concept-lab')}
                          className="text-xs font-medium flex items-center gap-1"
                          style={{ color: ACCENT }}
                        >
                          Start <ChevronRight size={14} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

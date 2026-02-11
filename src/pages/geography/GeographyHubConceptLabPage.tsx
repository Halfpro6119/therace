import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getGeographySectionsForSelection, getConceptsForSections } from '../../config/geographyHubData';

const ACCENT = '#0D9488';

export function GeographyHubConceptLabPage() {
  const navigate = useNavigate();
  const selection = storage.getGeographyOptionSelection();
  const sections = selection ? getGeographySectionsForSelection(selection) : [];
  const sectionIds = sections.map((s) => s.id);
  const concepts = getConceptsForSections(sectionIds);
  const [sectionFilter, setSectionFilter] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sectionIds.length > 0 && !sectionIds.includes(sectionFilter)) {
      setSectionFilter(sectionIds[0]);
      setIndex(0);
    }
  }, [sectionIds, sectionFilter]);

  const filteredConcepts = sectionFilter ? concepts.filter((c) => c.sectionId === sectionFilter) : concepts;
  const current = filteredConcepts[index];

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
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Concept lab</h1>

      <select value={sectionFilter} onChange={(e) => { setSectionFilter(e.target.value); setIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        {sections.map((s) => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>

      {filteredConcepts.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No concepts for this section yet.</p>
      ) : current ? (
        <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {filteredConcepts.length}</p>
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>{current.title}</h2>
          <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{current.coreIdea}</p>
          {current.changeScenario && (
            <div className="rounded-lg p-3" style={{ background: `${ACCENT}15` }}>
              <p className="text-xs font-medium mb-1" style={{ color: ACCENT }}>Think about it</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{current.changeScenario}</p>
            </div>
          )}
          {current.misconception && (
            <div className="rounded-lg p-3 border border-amber-200 dark:border-amber-800" style={{ background: 'rgb(var(--surface-2))' }}>
              <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Common misconception</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{current.misconception}</p>
            </div>
          )}
          <div className="flex justify-between pt-4">
            <button type="button" onClick={() => setIndex((i) => (i === 0 ? filteredConcepts.length - 1 : i - 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => setIndex((i) => (i >= filteredConcepts.length - 1 ? 0 : i + 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

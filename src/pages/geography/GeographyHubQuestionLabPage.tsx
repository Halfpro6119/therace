import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getGeographySectionsForSelection, getQuestionLabForSections } from '../../config/geographyHubData';

const ACCENT = '#0D9488';

export function GeographyHubQuestionLabPage() {
  const navigate = useNavigate();
  const selection = storage.getGeographyOptionSelection();
  const sections = selection ? getGeographySectionsForSelection(selection) : [];
  const sectionIds = sections.map((s) => s.id);
  const allItems = getQuestionLabForSections(sectionIds);
  const [sectionFilter, setSectionFilter] = useState(sectionIds[0] ?? '');
  const [index, setIndex] = useState(0);
  const [showModel, setShowModel] = useState(false);

  const items = sectionFilter ? allItems.filter((i) => i.sectionId === sectionFilter) : allItems;
  const item = items[index];

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
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Question lab</h1>

      <select value={sectionFilter} onChange={(e) => { setSectionFilter(e.target.value); setIndex(0); setShowModel(false); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        {sections.map((s) => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No questions for this section yet.</p>
      ) : item ? (
        <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {items.length} • {item.questionType}</p>
          <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{item.question}</p>
          <div className="rounded-lg p-3" style={{ background: 'rgb(var(--surface-2))' }}>
            <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Mark scheme</p>
            <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{item.markSchemeSummary}</p>
          </div>
          {item.modelAnswer && (
            <>
              <button type="button" onClick={() => setShowModel((s) => !s)} className="text-sm font-medium" style={{ color: ACCENT }}>
                {showModel ? 'Hide' : 'Show'} model answer
              </button>
              {showModel && (
                <div className="rounded-lg p-3" style={{ background: `${ACCENT}15` }}>
                  <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{item.modelAnswer}</p>
                </div>
              )}
            </>
          )}
          <div className="flex justify-between pt-4">
            <button type="button" onClick={() => { setIndex((i) => (i === 0 ? items.length - 1 : i - 1)); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setIndex((i) => (i >= items.length - 1 ? 0 : i + 1)); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

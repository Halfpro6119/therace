import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getOptionsForSelection, getBeliefConceptsForSelection, getScriptureCardsForSelection, getQuickChecksForSelection } from '../../config/religiousStudiesHubData';
import { LAB_HERO_GRADIENT } from '../../config/hubTheme';

import { LAB_LAB_ACCENT } from '../../config/hubTheme';

export function ReligiousStudiesHubRevisionMapPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const options = selection ? getOptionsForSelection(selection) : null;
  const concepts = selection ? getBeliefConceptsForSelection(selection) : [];
  const cards = selection ? getScriptureCardsForSelection(selection) : [];
  const quickChecks = selection ? getQuickChecksForSelection(selection) : [];

  const progress = storage.getRSPartProgress();
  const religion1Key = selection ? `religion-${selection.religion1}` : '';
  const religion2Key = selection ? `religion-${selection.religion2}` : '';
  const themeKeys = selection?.themes.map((t) => `theme-${t}`) ?? [];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: LAB_ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}>
        <button type="button" onClick={() => navigate('/religious-studies-hub')} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to Religious Studies Hub
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Revision map</h1>
        <p className="text-white/90 text-sm">Your options and coverage at a glance</p>
      </section>

      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>Your options</h2>
        <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}><strong>Component 1:</strong> {options?.religion1.title} & {options?.religion2.title}</p>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}><strong>Component 2:</strong> {options?.themes.map((t) => t.title).join(', ')}</p>
      </section>

      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>Content overview</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg p-4" style={{ background: `${LAB_ACCENT}08` }}>
            <p className="font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Belief Lab</p>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{concepts.length} concepts</p>
          </div>
          <div className="rounded-lg p-4" style={{ background: `${LAB_ACCENT}08` }}>
            <p className="font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Scripture & key terms</p>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{cards.length} flashcards</p>
          </div>
          <div className="rounded-lg p-4" style={{ background: `${LAB_ACCENT}08` }}>
            <p className="font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Quick check</p>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{quickChecks.length} items</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>Recommended next</h2>
        <div className="space-y-2">
          <button type="button" onClick={() => navigate('/religious-studies-hub/belief-lab')} className="w-full text-left rounded-lg p-4 border flex items-center justify-between" style={{ borderColor: 'rgb(var(--border))' }}>
            <span style={{ color: 'rgb(var(--text))' }}>Start with Belief Lab</span>
            <span className="text-sm" style={{ color: LAB_ACCENT }}>Go →</span>
          </button>
          <button type="button" onClick={() => navigate('/religious-studies-hub/flashcards')} className="w-full text-left rounded-lg p-4 border flex items-center justify-between" style={{ borderColor: 'rgb(var(--border))' }}>
            <span style={{ color: 'rgb(var(--text))' }}>Practise key terms</span>
            <span className="text-sm" style={{ color: LAB_ACCENT }}>Go →</span>
          </button>
          <button type="button" onClick={() => navigate('/religious-studies-hub/quick-check')} className="w-full text-left rounded-lg p-4 border flex items-center justify-between" style={{ borderColor: 'rgb(var(--border))' }}>
            <span style={{ color: 'rgb(var(--text))' }}>Quick check</span>
            <span className="text-sm" style={{ color: LAB_ACCENT }}>Go →</span>
          </button>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import {
  RELIGIONS,
  THEMES,
  THEMATIC_THEMES,
  TEXTUAL_THEMES,
  isProhibitedCombo,
} from '../../config/religiousStudiesHubData';
import type { ReligiousStudiesOptionSelection, ReligionId, ThemeId } from '../../types/religiousStudiesHub';

import { LAB_ACCENT } from '../../config/hubTheme';

const DEFAULT_SELECTION: ReligiousStudiesOptionSelection = {
  religion1: 'christianity',
  religion2: 'islam',
  themes: ['A', 'B', 'C', 'D'],
  textualRoute: false,
};

export function ReligiousStudiesHubOptionSelectPage() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<ReligiousStudiesOptionSelection>(DEFAULT_SELECTION);

  useEffect(() => {
    const saved = storage.getRSOptionSelection();
    if (saved) setSelection(saved);
  }, []);

  const prohibited = isProhibitedCombo(selection.religion1, selection.religion2);

  const handleReligion1Change = (r: ReligionId) => {
    setSelection((s) => ({ ...s, religion1: r }));
  };
  const handleReligion2Change = (r: ReligionId) => {
    setSelection((s) => ({ ...s, religion2: r }));
  };

  const handleThematicToggle = (themeId: ThemeId) => {
    if (!THEMATIC_THEMES.includes(themeId)) return;
    setSelection((s) => {
      const has = s.themes.includes(themeId);
      const thematic = s.themes.filter((t) => THEMATIC_THEMES.includes(t));
      if (has) {
        const nextThematic = thematic.filter((t) => t !== themeId);
        return { ...s, themes: s.textualRoute ? [...nextThematic, ...TEXTUAL_THEMES] : nextThematic };
      }
      if (s.textualRoute) {
        if (thematic.length >= 2) return s;
        return { ...s, themes: [...thematic, themeId, ...TEXTUAL_THEMES] };
      }
      return { ...s, themes: [...thematic, themeId].slice(0, 4) };
    });
  };

  const handleTextualRouteToggle = () => {
    setSelection((s) => {
      const next = !s.textualRoute;
      if (next) {
        return { ...s, textualRoute: true, themes: [...s.themes.filter((t) => THEMATIC_THEMES.includes(t)).slice(0, 2), ...TEXTUAL_THEMES] };
      }
      return { ...s, textualRoute: false, themes: s.themes.filter((t) => THEMATIC_THEMES.includes(t)).slice(0, 4) };
    });
  };

  const handleSave = () => {
    if (prohibited) return;
    storage.setRSOptionSelection(selection);
    navigate('/religious-studies-hub');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <button
          type="button"
          onClick={() => navigate('/religious-studies-hub')}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to Religious Studies Hub
        </button>
        <h1 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Choose your options
        </h1>
        <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
          Select two religions (Christianity and Catholic Christianity cannot be combined) and four themes, or two themes plus textual studies.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Religion 1
            </label>
            <select
              value={selection.religion1}
              onChange={(e) => handleReligion1Change(e.target.value as ReligionId)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {RELIGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Religion 2
            </label>
            <select
              value={selection.religion2}
              onChange={(e) => handleReligion2Change(e.target.value as ReligionId)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {RELIGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
            {prohibited && (
              <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">Christianity and Catholic Christianity cannot be combined.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Route
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selection.textualRoute}
                onChange={handleTextualRouteToggle}
                className="rounded"
              />
              <span className="text-sm" style={{ color: 'rgb(var(--text))' }}>Textual studies route (2 themes + St Mark&apos;s Gospel)</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Themes (choose {selection.textualRoute ? '2' : '4'} from A–F)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {THEMATIC_THEMES.map((themeId) => {
                const theme = THEMES.find((t) => t.id === themeId);
                const checked = selection.themes.includes(themeId);
                const thematicCount = selection.themes.filter((t) => THEMATIC_THEMES.includes(t)).length;
                const disabled = (selection.textualRoute ? thematicCount >= 2 && !checked : thematicCount >= 4 && !checked);
                return (
                  <label key={themeId} className={`flex items-center gap-2 p-2 rounded-lg border ${disabled ? 'opacity-50' : 'cursor-pointer'}`} style={{ borderColor: 'rgb(var(--border))' }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleThematicToggle(themeId)}
                      disabled={disabled}
                      className="rounded"
                    />
                    <span className="text-sm" style={{ color: 'rgb(var(--text))' }}>Theme {themeId}</span>
                  </label>
                );
              })}
            </div>
            {selection.textualRoute && (
              <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                Themes G and H (St Mark&apos;s Gospel) are automatically included.
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={prohibited}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-white disabled:opacity-50"
          style={{ background: LAB_ACCENT }}
        >
          Save and continue
        </button>
      </section>
    </div>
  );
}

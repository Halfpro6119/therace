import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import type { GeographyOptionSelection, LivingWorldId, PhysicalLandscapeId, ResourceId } from '../../types/geographyHub';

import { LAB_ACCENT } from '../../config/hubTheme';

const LIVING_WORLD_OPTIONS: { id: LivingWorldId; label: string }[] = [
  { id: 'desert', label: 'Hot deserts' },
  { id: 'cold', label: 'Cold environments' },
];

const PHYSICAL_LANDSCAPE_OPTIONS: { id: PhysicalLandscapeId; label: string }[] = [
  { id: 'coastal', label: 'Coastal landscapes' },
  { id: 'river', label: 'River landscapes' },
  { id: 'glacial', label: 'Glacial landscapes' },
];

const RESOURCE_OPTIONS: { id: ResourceId; label: string }[] = [
  { id: 'food', label: 'Food' },
  { id: 'water', label: 'Water' },
  { id: 'energy', label: 'Energy' },
];

function getDefaultLandscapes(): [PhysicalLandscapeId, PhysicalLandscapeId] {
  return ['coastal', 'river'];
}

export function GeographyHubOptionSelectPage() {
  const navigate = useNavigate();
  const [selection, setSelection] = useState<GeographyOptionSelection>({
    livingWorld: 'desert',
    physicalLandscapes: getDefaultLandscapes(),
    resource: 'food',
  });

  useEffect(() => {
    const saved = storage.getGeographyOptionSelection();
    if (saved) {
      const [a, b] = saved.physicalLandscapes;
      if (a === b) {
        const other = PHYSICAL_LANDSCAPE_OPTIONS.find((o) => o.id !== a)?.id ?? 'river';
        const fixed = { ...saved, physicalLandscapes: [a, other] as [PhysicalLandscapeId, PhysicalLandscapeId] };
        setSelection(fixed);
        storage.setGeographyOptionSelection(fixed);
      } else {
        setSelection(saved);
      }
    }
  }, []);

  const handleSave = () => {
    let toSave = selection;
    if (selection.physicalLandscapes[0] === selection.physicalLandscapes[1]) {
      const other = PHYSICAL_LANDSCAPE_OPTIONS.find((o) => o.id !== selection.physicalLandscapes[0])?.id ?? 'river';
      toSave = { ...selection, physicalLandscapes: [selection.physicalLandscapes[0], other] };
    }
    storage.setGeographyOptionSelection(toSave);
    navigate('/geography-hub');
  };

  const setLandscape1 = (id: PhysicalLandscapeId) => {
    const [, second] = selection.physicalLandscapes;
    if (id === second) {
      const other = PHYSICAL_LANDSCAPE_OPTIONS.find((o) => o.id !== id && o.id !== second)?.id ?? 'glacial';
      setSelection((s) => ({ ...s, physicalLandscapes: [id, other] }));
    } else {
      setSelection((s) => ({ ...s, physicalLandscapes: [id, s.physicalLandscapes[1]] }));
    }
  };

  const setLandscape2 = (id: PhysicalLandscapeId) => {
    const [first] = selection.physicalLandscapes;
    if (id === first) {
      const other = PHYSICAL_LANDSCAPE_OPTIONS.find((o) => o.id !== id && o.id !== first)?.id ?? 'glacial';
      setSelection((s) => ({ ...s, physicalLandscapes: [other, id] }));
    } else {
      setSelection((s) => ({ ...s, physicalLandscapes: [s.physicalLandscapes[0], id] }));
    }
  };

  const landscape2Options = PHYSICAL_LANDSCAPE_OPTIONS.filter((o) => o.id !== selection.physicalLandscapes[0]);
  const secondLandscape = landscape2Options.some((o) => o.id === selection.physicalLandscapes[1])
    ? selection.physicalLandscapes[1]
    : landscape2Options[0]?.id ?? 'river';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <button
          type="button"
          onClick={() => navigate('/geography-hub')}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to Geography Hub
        </button>
        <h1 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Choose your options
        </h1>
        <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
          Select your Living world option, two Physical landscapes, and one Resource topic (as declared at entry). Content will be filtered to these options only.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper 1 – Living world (choose one)
            </label>
            <select
              value={selection.livingWorld}
              onChange={(e) => setSelection((s) => ({ ...s, livingWorld: e.target.value as LivingWorldId }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {LIVING_WORLD_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper 1 – Physical landscapes (choose two)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs block mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>First</span>
                <select
                  value={selection.physicalLandscapes[0]}
                  onChange={(e) => setLandscape1(e.target.value as PhysicalLandscapeId)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
                >
                  {PHYSICAL_LANDSCAPE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="text-xs block mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Second</span>
                <select
                  value={secondLandscape}
                  onChange={(e) => setLandscape2(e.target.value as PhysicalLandscapeId)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
                >
                  {landscape2Options.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-xs mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Choose two different options from Coastal, River, Glacial.</p>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper 2 – Resource management (choose one)
            </label>
            <select
              value={selection.resource}
              onChange={(e) => setSelection((s) => ({ ...s, resource: e.target.value as ResourceId }))}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            >
              {RESOURCE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
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

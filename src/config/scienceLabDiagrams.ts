/**
 * Science Lab – inline diagram blueprints for flashcards
 * Uses CustomDiagramEngine for programmatic SVG rendering (no Supabase required)
 */

import type { CustomDiagramBlueprint } from '../diagrams/engine/customDiagramEngine';

/** Unified design system – Grade9 Sprint brand-aligned, professional */
const STYLE = {
  stroke: '#1e293b',
  strokeLight: '#64748b',
  fill: 'none',
  fillLight: 'rgba(99, 102, 241, 0.12)',
  accent: '#6366f1',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  text: { fontSize: 12, fill: '#1e293b', textAnchor: 'middle' as const },
  textLabel: { fontSize: 12, fill: '#1e293b', textAnchor: 'middle' as const },
  textCaption: { fontSize: 10, fill: '#64748b', textAnchor: 'middle' as const },
  textTiny: { fontSize: 9, fill: '#64748b', textAnchor: 'middle' as const },
  arrow: { stroke: '#6366f1', strokeWidth: 2 },
};

/** Diffusion: high concentration → low concentration */
export const cell_membrane_diffusion: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 200 },
  viewBox: '0 0 400 200',
  defs: {
    points: {
      left: { x: 80, y: 100 },
      right: { x: 320, y: 100 },
      membrane: { x: 200, y: 100 },
    },
  },
  layers: [
    {
      id: 'diffusion',
      items: [
        { type: 'rect', x: 20, y: 40, width: 160, height: 120, rx: 4, style: { stroke: STYLE.stroke, fill: STYLE.fillLight } },
        { type: 'rect', x: 220, y: 40, width: 160, height: 120, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(148,163,184,0.15)' } },
        { type: 'line', from: { x: 200, y: 40 }, to: { x: 200, y: 160 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'circle', cx: 70, cy: 80, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 100, cy: 90, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.5)' } },
        { type: 'circle', cx: 130, cy: 70, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.35)' } },
        { type: 'circle', cx: 90, cy: 120, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 120, cy: 110, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.45)' } },
        { type: 'circle', cx: 250, cy: 90, r: 6, style: { stroke: STYLE.strokeLight, fill: 'rgba(100,116,139,0.3)' } },
        { type: 'circle', cx: 300, cy: 100, r: 6, style: { stroke: STYLE.strokeLight, fill: 'rgba(100,116,139,0.3)' } },
        { type: 'arrow', from: { x: 170, y: 100 }, to: { x: 230, y: 100 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'High conc', at: { x: 100, y: 30 }, style: STYLE.textLabel },
        { type: 'text', text: 'Low conc', at: { x: 280, y: 30 }, style: STYLE.textLabel },
        { type: 'text', text: 'Net movement →', at: { x: 200, y: 175 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Osmosis: water through membrane */
export const osmosis_diagram: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 200 },
  viewBox: '0 0 400 200',
  layers: [
    {
      id: 'osmosis',
      items: [
        { type: 'rect', x: 30, y: 50, width: 140, height: 100, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(147,197,253,0.25)' } },
        { type: 'rect', x: 230, y: 50, width: 140, height: 100, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(254,202,202,0.35)' } },
        { type: 'line', from: { x: 170, y: 50 }, to: { x: 170, y: 150 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'circle', cx: 60, cy: 95, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.2)' } },
        { type: 'circle', cx: 90, cy: 115, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.2)' } },
        { type: 'circle', cx: 120, cy: 85, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.2)' } },
        { type: 'arrow', from: { x: 155, y: 100 }, to: { x: 185, y: 100 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Dilute', at: { x: 100, y: 35 }, style: STYLE.textLabel },
        { type: 'text', text: 'Concentrated', at: { x: 300, y: 35 }, style: STYLE.textLabel },
        { type: 'text', text: 'Partially permeable membrane', at: { x: 200, y: 175 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Active transport: carrier proteins, ATP */
export const active_transport: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 200 },
  viewBox: '0 0 400 200',
  layers: [
    {
      id: 'active',
      items: [
        { type: 'rect', x: 30, y: 50, width: 140, height: 100, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(148,163,184,0.15)' } },
        { type: 'rect', x: 230, y: 50, width: 140, height: 100, rx: 4, style: { stroke: STYLE.stroke, fill: STYLE.fillLight } },
        { type: 'rect', x: 165, y: 70, width: 70, height: 60, rx: 8, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.2)' } },
        { type: 'arrow', from: { x: 230, y: 100 }, to: { x: 200, y: 100 }, headSize: 8, style: { stroke: STYLE.success, strokeWidth: 2 } },
        { type: 'text', text: 'Low', at: { x: 100, y: 100 }, style: STYLE.textLabel },
        { type: 'text', text: 'High', at: { x: 300, y: 100 }, style: STYLE.textLabel },
        { type: 'text', text: 'ATP', at: { x: 200, y: 58 }, style: { ...STYLE.textLabel, fontSize: 14 } },
        { type: 'text', text: 'Against gradient', at: { x: 200, y: 175 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Cell division: mitosis vs meiosis */
export const cell_division: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 180 },
  viewBox: '0 0 400 180',
  layers: [
    {
      id: 'division',
      items: [
        { type: 'circle', cx: 100, cy: 90, r: 35, style: { stroke: STYLE.stroke, fill: STYLE.fillLight } },
        { type: 'text', text: '1 cell (2n)', at: { x: 100, y: 95 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 140, y: 90 }, to: { x: 175, y: 90 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Mitosis', at: { x: 155, y: 70 }, style: STYLE.textCaption },
        { type: 'circle', cx: 220, cy: 90, r: 25, style: { stroke: STYLE.stroke, fill: STYLE.fillLight } },
        { type: 'circle', cx: 280, cy: 90, r: 25, style: { stroke: STYLE.stroke, fill: STYLE.fillLight } },
        { type: 'text', text: '2 identical (2n)', at: { x: 250, y: 130 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 310, y: 90 }, to: { x: 345, y: 90 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Meiosis', at: { x: 325, y: 70 }, style: STYLE.textCaption },
        { type: 'circle', cx: 360, cy: 60, r: 18, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.15)' } },
        { type: 'circle', cx: 360, cy: 120, r: 18, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.15)' } },
        { type: 'text', text: '4 gametes (n)', at: { x: 360, y: 155 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Enzyme: lock-and-key model – active site, substrate binding, products; enzyme unchanged */
export const enzyme_action: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 200 },
  viewBox: '0 0 400 200',
  layers: [
    {
      id: 'enzyme',
      items: [
        // Enzyme body (protein) – soft amber
        { type: 'ellipse', cx: 200, cy: 100, rx: 82, ry: 52, style: { stroke: '#b45309', strokeWidth: 1.5, fill: 'rgba(251,191,36,0.2)' } },
        // Active site (pocket) – distinct cleft where substrate binds
        { type: 'polygon', points: [{ x: 118, y: 92 }, { x: 156, y: 72 }, { x: 156, y: 108 }], style: { stroke: STYLE.accent, strokeWidth: 1.5, fill: 'rgba(99,102,241,0.2)' } },
        // Substrate (key) – fits into active site
        { type: 'polygon', points: [{ x: 122, y: 94 }, { x: 148, y: 78 }, { x: 148, y: 102 }], style: { stroke: STYLE.success, strokeWidth: 1.5, fill: 'rgba(34,197,94,0.35)' } },
        // Reaction arrow
        { type: 'arrow', from: { x: 282, y: 100 }, to: { x: 338, y: 100 }, headSize: 8, style: STYLE.arrow },
        // Products (released)
        { type: 'circle', cx: 355, cy: 95, r: 6, style: { stroke: STYLE.strokeLight, fill: 'rgba(100,116,139,0.4)' } },
        { type: 'circle', cx: 355, cy: 108, r: 6, style: { stroke: STYLE.strokeLight, fill: 'rgba(100,116,139,0.4)' } },
        // Labels
        { type: 'text', text: 'Enzyme', at: { x: 200, y: 62 }, style: { ...STYLE.textLabel, fontWeight: 600 } },
        { type: 'text', text: 'Active site', at: { x: 138, y: 78 }, style: { ...STYLE.textCaption, fontSize: 10 } },
        { type: 'text', text: 'Substrate', at: { x: 136, y: 118 }, style: STYLE.textCaption },
        { type: 'text', text: 'Products', at: { x: 355, y: 78 }, style: STYLE.textCaption },
        { type: 'text', text: 'Lock-and-key: substrate fits active site → products released; enzyme unchanged', at: { x: 200, y: 182 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Digestive system flow */
export const digestive_system: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 120 },
  viewBox: '0 0 400 120',
  layers: [
    {
      id: 'digestive',
      items: [
        { type: 'rect', x: 20, y: 40, width: 50, height: 40, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'rect', x: 90, y: 40, width: 60, height: 40, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'rect', x: 170, y: 40, width: 60, height: 40, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'rect', x: 250, y: 40, width: 80, height: 40, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'rect', x: 350, y: 40, width: 40, height: 40, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'arrow', from: { x: 70, y: 60 }, to: { x: 90, y: 60 }, headSize: 6, style: STYLE.arrow },
        { type: 'arrow', from: { x: 150, y: 60 }, to: { x: 170, y: 60 }, headSize: 6, style: STYLE.arrow },
        { type: 'arrow', from: { x: 230, y: 60 }, to: { x: 250, y: 60 }, headSize: 6, style: STYLE.arrow },
        { type: 'arrow', from: { x: 330, y: 60 }, to: { x: 350, y: 60 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Mouth', at: { x: 45, y: 95 }, style: STYLE.textCaption },
        { type: 'text', text: 'Stomach', at: { x: 120, y: 95 }, style: STYLE.textCaption },
        { type: 'text', text: 'Small intestine', at: { x: 200, y: 95 }, style: STYLE.textCaption },
        { type: 'text', text: 'Large intestine', at: { x: 290, y: 95 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Circulatory system: heart, vessels */
export const circulatory_system: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 200 },
  viewBox: '0 0 400 200',
  layers: [
    {
      id: 'circulatory',
      items: [
        { type: 'ellipse', cx: 200, cy: 100, rx: 50, ry: 45, style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.2)', strokeWidth: 2 } },
        { type: 'text', text: 'Heart', at: { x: 200, y: 105 }, style: STYLE.textLabel },
        { type: 'line', from: { x: 250, y: 100 }, to: { x: 320, y: 60 }, style: { stroke: STYLE.danger, strokeWidth: 2 } },
        { type: 'line', from: { x: 250, y: 100 }, to: { x: 320, y: 140 }, style: { stroke: STYLE.danger, strokeWidth: 2 } },
        { type: 'line', from: { x: 150, y: 100 }, to: { x: 80, y: 60 }, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'line', from: { x: 150, y: 100 }, to: { x: 80, y: 140 }, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'text', text: 'Arteries (O₂)', at: { x: 300, y: 45 }, style: STYLE.textCaption },
        { type: 'text', text: 'Veins (CO₂)', at: { x: 70, y: 45 }, style: STYLE.textCaption },
        { type: 'text', text: 'Capillaries: gas exchange', at: { x: 200, y: 175 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Pathogen infection */
export const pathogen_infection: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 180 },
  viewBox: '0 0 400 180',
  layers: [
    {
      id: 'pathogen',
      items: [
        { type: 'rect', x: 30, y: 50, width: 120, height: 80, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(148,163,184,0.2)' } },
        { type: 'circle', cx: 70, cy: 85, r: 15, style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.4)' } },
        { type: 'text', text: 'Entry', at: { x: 90, y: 95 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 155, y: 90 }, to: { x: 195, y: 90 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Replication', at: { x: 230, y: 70 }, style: STYLE.textCaption },
        { type: 'circle', cx: 250, cy: 90, r: 12, style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.4)' } },
        { type: 'circle', cx: 270, cy: 95, r: 12, style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.4)' } },
        { type: 'arrow', from: { x: 275, y: 90 }, to: { x: 315, y: 90 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Toxins / damage', at: { x: 330, y: 70 }, style: STYLE.textCaption },
        { type: 'text', text: 'Symptoms', at: { x: 330, y: 120 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Immune response */
export const immune_response: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 180 },
  viewBox: '0 0 400 180',
  layers: [
    {
      id: 'immune',
      items: [
        { type: 'circle', cx: 80, cy: 90, r: 25, style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.3)' } },
        { type: 'text', text: 'Pathogen', at: { x: 80, y: 130 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 110, y: 90 }, to: { x: 150, y: 90 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'WBC detects', at: { x: 125, y: 70 }, style: STYLE.textCaption },
        { type: 'rect', x: 170, y: 60, width: 80, height: 60, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(59,130,246,0.2)' } },
        { type: 'text', text: 'Antibodies', at: { x: 210, y: 95 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 255, y: 90 }, to: { x: 295, y: 90 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Bind antigen', at: { x: 265, y: 70 }, style: STYLE.textCaption },
        { type: 'circle', cx: 340, cy: 90, r: 20, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.2)' } },
        { type: 'text', text: 'Destroyed', at: { x: 340, y: 130 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Photosynthesis */
export const photosynthesis: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'photosynthesis',
      items: [
        { type: 'polygon', points: [{ x: 70, y: 100 }, { x: 90, y: 60 }, { x: 110, y: 100 }], style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.3)' } },
        { type: 'line', from: { x: 90, y: 55 }, to: { x: 90, y: 45 }, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'line', from: { x: 85, y: 50 }, to: { x: 95, y: 50 }, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'text', text: 'Light + CO₂ + H₂O', at: { x: 90, y: 125 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 140, y: 80 }, to: { x: 200, y: 80 }, headSize: 10, style: STYLE.arrow },
        { type: 'ellipse', cx: 300, cy: 80, rx: 60, ry: 35, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.2)' } },
        { type: 'text', text: 'Chlorophyll', at: { x: 300, y: 75 }, style: STYLE.textCaption },
        { type: 'text', text: 'Glucose + O₂', at: { x: 300, y: 95 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Respiration */
export const respiration: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 180 },
  viewBox: '0 0 400 180',
  layers: [
    {
      id: 'respiration',
      items: [
        { type: 'rect', x: 40, y: 40, width: 200, height: 55, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(34,197,94,0.08)' } },
        { type: 'text', text: 'Glucose + O₂', at: { x: 100, y: 65 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 150, y: 67 }, to: { x: 190, y: 67 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'CO₂ + H₂O + ATP', at: { x: 240, y: 65 }, style: STYLE.textLabel },
        { type: 'text', text: 'Aerobic', at: { x: 140, y: 95 }, style: STYLE.textCaption },
        { type: 'line', from: { x: 40, y: 105 }, to: { x: 360, y: 105 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1 } },
        { type: 'rect', x: 40, y: 115, width: 200, height: 50, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,146,60,0.08)' } },
        { type: 'text', text: 'Glucose → Lactic acid + ATP', at: { x: 140, y: 140 }, style: STYLE.textLabel },
        { type: 'text', text: 'Anaerobic', at: { x: 140, y: 170 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Homeostasis: negative feedback */
export const homeostasis: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 180 },
  viewBox: '0 0 400 180',
  layers: [
    {
      id: 'homeostasis',
      items: [
        { type: 'text', text: 'Stimulus', at: { x: 80, y: 50 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 80, y: 60 }, to: { x: 80, y: 90 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Receptor', at: { x: 80, y: 105 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 100, y: 90 }, to: { x: 140, y: 90 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Coordination', at: { x: 200, y: 85 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 260, y: 90 }, to: { x: 300, y: 90 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Effector', at: { x: 320, y: 85 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 320, y: 100 }, to: { x: 320, y: 130 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Response', at: { x: 320, y: 145 }, style: STYLE.textCaption },
        { type: 'line', from: { x: 320, y: 150 }, to: { x: 80, y: 150 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1, dashArray: '4,4' } },
        { type: 'text', text: '↓ Negative feedback: return to normal', at: { x: 200, y: 170 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Nervous system */
export const nervous_system: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 140 },
  viewBox: '0 0 400 140',
  layers: [
    {
      id: 'nervous',
      items: [
        { type: 'text', text: 'Stimulus', at: { x: 50, y: 70 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 95, y: 70 }, to: { x: 130, y: 70 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Receptor', at: { x: 112, y: 55 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 155, y: 70 }, to: { x: 185, y: 70 }, headSize: 6, style: STYLE.arrow },
        { type: 'rect', x: 185, y: 45, width: 80, height: 50, rx: 4, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.15)' } },
        { type: 'text', text: 'CNS', at: { x: 225, y: 72 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 275, y: 70 }, to: { x: 315, y: 70 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Motor neuron → Effector', at: { x: 350, y: 70 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Hormone action */
export const hormone_action: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'hormone',
      items: [
        { type: 'rect', x: 50, y: 50, width: 80, height: 60, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'text', text: 'Gland', at: { x: 90, y: 85 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 135, y: 80 }, to: { x: 175, y: 80 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Hormone', at: { x: 155, y: 65 }, style: STYLE.textCaption },
        { type: 'text', text: 'Blood', at: { x: 200, y: 100 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 225, y: 80 }, to: { x: 265, y: 80 }, headSize: 8, style: STYLE.arrow },
        { type: 'rect', x: 270, y: 50, width: 100, height: 60, rx: 4, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.15)' } },
        { type: 'text', text: 'Target organ', at: { x: 320, y: 85 }, style: STYLE.textLabel },
      ],
    },
  ],
};

/** DNA structure */
export const dna_structure: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 180 },
  viewBox: '0 0 400 180',
  layers: [
    {
      id: 'dna',
      items: [
        { type: 'polyline', points: [{ x: 80, y: 40 }, { x: 120, y: 80 }, { x: 160, y: 40 }, { x: 200, y: 80 }, { x: 240, y: 40 }, { x: 280, y: 80 }, { x: 320, y: 40 }], style: { stroke: STYLE.stroke, fill: 'none', strokeWidth: 2 } },
        { type: 'polyline', points: [{ x: 80, y: 140 }, { x: 120, y: 100 }, { x: 160, y: 140 }, { x: 200, y: 100 }, { x: 240, y: 140 }, { x: 280, y: 100 }, { x: 320, y: 140 }], style: { stroke: STYLE.stroke, fill: 'none', strokeWidth: 2 } },
        { type: 'line', from: { x: 120, y: 80 }, to: { x: 120, y: 100 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1 } },
        { type: 'line', from: { x: 200, y: 80 }, to: { x: 200, y: 100 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1 } },
        { type: 'line', from: { x: 280, y: 80 }, to: { x: 280, y: 100 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1 } },
        { type: 'text', text: 'A-T', at: { x: 120, y: 92 }, style: STYLE.textTiny },
        { type: 'text', text: 'G-C', at: { x: 200, y: 92 }, style: STYLE.textTiny },
        { type: 'text', text: 'A-T', at: { x: 280, y: 92 }, style: STYLE.textTiny },
        { type: 'text', text: 'Double helix', at: { x: 200, y: 165 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Genetic inheritance: Punnett square */
export const genetic_inheritance: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 300, height: 200 },
  viewBox: '0 0 300 200',
  layers: [
    {
      id: 'punnett',
      items: [
        { type: 'text', text: 'A', at: { x: 137, y: 45 }, style: STYLE.textCaption },
        { type: 'text', text: 'a', at: { x: 212, y: 45 }, style: STYLE.textCaption },
        { type: 'text', text: 'A', at: { x: 85, y: 85 }, style: STYLE.textCaption },
        { type: 'text', text: 'a', at: { x: 85, y: 135 }, style: STYLE.textCaption },
        { type: 'rect', x: 100, y: 55, width: 150, height: 105, style: { stroke: STYLE.stroke, fill: 'none' } },
        { type: 'line', from: { x: 175, y: 55 }, to: { x: 175, y: 160 }, style: { stroke: STYLE.stroke } },
        { type: 'line', from: { x: 100, y: 107 }, to: { x: 250, y: 107 }, style: { stroke: STYLE.stroke } },
        { type: 'text', text: 'AA', at: { x: 137, y: 85 }, style: STYLE.textLabel },
        { type: 'text', text: 'Aa', at: { x: 212, y: 85 }, style: STYLE.textLabel },
        { type: 'text', text: 'Aa', at: { x: 137, y: 135 }, style: STYLE.textLabel },
        { type: 'text', text: 'aa', at: { x: 212, y: 135 }, style: STYLE.textLabel },
        { type: 'text', text: 'Punnett square', at: { x: 175, y: 185 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Natural selection */
export const natural_selection: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'evolution',
      items: [
        { type: 'circle', cx: 60, cy: 75, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.3)' } },
        { type: 'circle', cx: 75, cy: 85, r: 10, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 55, cy: 90, r: 7, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.25)' } },
        { type: 'text', text: 'Variation', at: { x: 65, y: 115 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 95, y: 80 }, to: { x: 135, y: 80 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Selection', at: { x: 180, y: 80 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 225, y: 80 }, to: { x: 265, y: 80 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Survival', at: { x: 300, y: 80 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 335, y: 80 }, to: { x: 375, y: 80 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Reproduce', at: { x: 365, y: 100 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Ecosystem: food web – energy flow direction */
export const ecosystem: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 180 },
  viewBox: '0 0 400 180',
  layers: [
    {
      id: 'ecosystem',
      items: [
        { type: 'circle', cx: 200, cy: 45, r: 22, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.25)' } },
        { type: 'text', text: 'Producer', at: { x: 200, y: 48 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 200, y: 67 }, to: { x: 120, y: 105 }, headSize: 6, style: STYLE.arrow },
        { type: 'arrow', from: { x: 200, y: 67 }, to: { x: 280, y: 105 }, headSize: 6, style: STYLE.arrow },
        { type: 'circle', cx: 120, cy: 120, r: 18, style: { stroke: STYLE.warning, fill: 'rgba(251,191,36,0.25)' } },
        { type: 'text', text: 'Primary', at: { x: 120, y: 123 }, style: STYLE.textTiny },
        { type: 'circle', cx: 280, cy: 120, r: 18, style: { stroke: STYLE.warning, fill: 'rgba(251,191,36,0.25)' } },
        { type: 'text', text: 'Primary', at: { x: 280, y: 123 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 130, y: 135 }, to: { x: 190, y: 148 }, headSize: 6, style: STYLE.arrow },
        { type: 'arrow', from: { x: 270, y: 135 }, to: { x: 210, y: 148 }, headSize: 6, style: STYLE.arrow },
        { type: 'circle', cx: 200, cy: 155, r: 16, style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.2)' } },
        { type: 'text', text: 'Secondary consumer', at: { x: 200, y: 158 }, style: STYLE.textTiny },
        { type: 'text', text: 'Energy flow →', at: { x: 200, y: 178 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Carbon cycle */
export const carbon_cycle: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 200 },
  viewBox: '0 0 400 200',
  layers: [
    {
      id: 'carbon',
      items: [
        { type: 'ellipse', cx: 80, cy: 45, rx: 50, ry: 25, style: { stroke: STYLE.stroke, fill: 'rgba(148,163,184,0.1)' } },
        { type: 'text', text: 'CO₂ atmosphere', at: { x: 80, y: 48 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 100, y: 65 }, to: { x: 140, y: 95 }, headSize: 6, style: { stroke: STYLE.success, strokeWidth: 2 } },
        { type: 'text', text: 'Photosynthesis', at: { x: 115, y: 78 }, style: STYLE.textTiny },
        { type: 'rect', x: 160, y: 90, width: 80, height: 50, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(34,197,94,0.1)' } },
        { type: 'text', text: 'Plants', at: { x: 200, y: 118 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 250, y: 115 }, to: { x: 300, y: 75 }, headSize: 6, style: { stroke: STYLE.danger, strokeWidth: 2 } },
        { type: 'text', text: 'Respiration', at: { x: 265, y: 92 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 200, y: 145 }, to: { x: 200, y: 175 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Decomposition', at: { x: 200, y: 192 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Stem cell differentiation */
export const stem_cell_differentiation: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'stem',
      items: [
        { type: 'circle', cx: 100, cy: 80, r: 35, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.15)' } },
        { type: 'text', text: 'Stem cell', at: { x: 100, y: 85 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 140, y: 60 }, to: { x: 180, y: 60 }, headSize: 6, style: STYLE.arrow },
        { type: 'arrow', from: { x: 140, y: 100 }, to: { x: 180, y: 100 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Mitosis', at: { x: 155, y: 45 }, style: STYLE.textTiny },
        { type: 'circle', cx: 220, cy: 60, r: 20, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.15)' } },
        { type: 'circle', cx: 220, cy: 100, r: 20, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.15)' } },
        { type: 'text', text: 'Differentiation', at: { x: 155, y: 125 }, style: STYLE.textTiny },
        { type: 'text', text: 'Specialised cell', at: { x: 220, y: 135 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Monoclonal antibodies */
export const monoclonal_antibodies: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'monoclonal',
      items: [
        { type: 'rect', x: 50, y: 50, width: 100, height: 60, rx: 4, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.15)' } },
        { type: 'text', text: 'B-cell + Tumour', at: { x: 100, y: 85 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 155, y: 80 }, to: { x: 195, y: 80 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Hybridoma', at: { x: 200, y: 65 }, style: STYLE.textCaption },
        { type: 'rect', x: 200, y: 70, width: 80, height: 50, rx: 4, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.15)' } },
        { type: 'arrow', from: { x: 285, y: 95 }, to: { x: 325, y: 95 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Identical antibodies', at: { x: 340, y: 95 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Photosynthesis light graph */
export const photosynthesis_light_graph: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 200 },
  viewBox: '0 0 350 200',
  layers: [
    {
      id: 'graph',
      items: [
        { type: 'line', from: { x: 50, y: 160 }, to: { x: 320, y: 160 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 50, y: 160 }, to: { x: 50, y: 30 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'polyline', points: [{ x: 50, y: 160 }, { x: 120, y: 100 }, { x: 200, y: 55 }, { x: 280, y: 50 }, { x: 320, y: 50 }], style: { stroke: STYLE.accent, fill: 'none', strokeWidth: 2 } },
        { type: 'text', text: 'Rate', at: { x: 25, y: 95 }, style: { ...STYLE.textCaption, textAnchor: 'middle' } },
        { type: 'text', text: 'Light intensity', at: { x: 185, y: 185 }, style: STYLE.textLabel },
        { type: 'text', text: 'Limiting factor', at: { x: 280, y: 75 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Thyroxine feedback */
export const thyroxine_feedback: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'thyroxine',
      items: [
        { type: 'text', text: 'Low thyroxine', at: { x: 80, y: 80 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 130, y: 80 }, to: { x: 170, y: 80 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Pituitary (TSH)', at: { x: 200, y: 65 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 250, y: 80 }, to: { x: 290, y: 80 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Thyroid', at: { x: 320, y: 65 }, style: STYLE.textCaption },
        { type: 'text', text: 'Thyroxine ↑', at: { x: 320, y: 95 }, style: STYLE.textCaption },
        { type: 'line', from: { x: 320, y: 110 }, to: { x: 80, y: 110 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1, dashArray: '4,4' } },
        { type: 'text', text: 'Negative feedback', at: { x: 200, y: 130 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Genetic engineering */
export const genetic_engineering: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 140 },
  viewBox: '0 0 400 140',
  layers: [
    {
      id: 'genetic',
      items: [
        { type: 'rect', x: 30, y: 50, width: 60, height: 40, rx: 4, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.15)' } },
        { type: 'text', text: 'Gene', at: { x: 60, y: 72 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 95, y: 70 }, to: { x: 125, y: 70 }, headSize: 6, style: STYLE.arrow },
        { type: 'rect', x: 130, y: 50, width: 70, height: 40, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.15)' } },
        { type: 'text', text: 'Vector', at: { x: 165, y: 72 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 205, y: 70 }, to: { x: 235, y: 70 }, headSize: 6, style: STYLE.arrow },
        { type: 'rect', x: 240, y: 50, width: 80, height: 40, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(148,163,184,0.15)' } },
        { type: 'text', text: 'Host cell', at: { x: 280, y: 72 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 325, y: 70 }, to: { x: 355, y: 70 }, headSize: 6, style: STYLE.arrow },
        { type: 'rect', x: 355, y: 55, width: 35, height: 30, rx: 4, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.15)' } },
        { type: 'text', text: 'Protein', at: { x: 372, y: 72 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Quadrat sampling */
export const quadrat_sampling: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 300, height: 200 },
  viewBox: '0 0 300 200',
  layers: [
    {
      id: 'quadrat',
      items: [
        { type: 'rect', x: 50, y: 50, width: 200, height: 120, style: { stroke: STYLE.stroke, fill: 'none' } },
        { type: 'line', from: { x: 100, y: 50 }, to: { x: 100, y: 170 }, style: { stroke: STYLE.strokeLight } },
        { type: 'line', from: { x: 150, y: 50 }, to: { x: 150, y: 170 }, style: { stroke: STYLE.strokeLight } },
        { type: 'line', from: { x: 200, y: 50 }, to: { x: 200, y: 170 }, style: { stroke: STYLE.strokeLight } },
        { type: 'line', from: { x: 50, y: 90 }, to: { x: 250, y: 90 }, style: { stroke: STYLE.strokeLight } },
        { type: 'line', from: { x: 50, y: 130 }, to: { x: 250, y: 130 }, style: { stroke: STYLE.strokeLight } },
        { type: 'text', text: 'Quadrat grid (random placement)', at: { x: 150, y: 195 }, style: STYLE.textCaption },
      ],
    },
  ],
};

// Chemistry & Physics diagrams
/** Bohr model */
export const bohr_model: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 200, height: 200 },
  viewBox: '0 0 200 200',
  layers: [
    {
      id: 'bohr',
      items: [
        { type: 'circle', cx: 100, cy: 100, r: 60, style: { stroke: STYLE.stroke, fill: 'none' } },
        { type: 'circle', cx: 100, cy: 100, r: 35, style: { stroke: STYLE.stroke, fill: 'none' } },
        { type: 'circle', cx: 100, cy: 100, r: 15, style: { stroke: STYLE.stroke, fill: 'rgba(239,68,68,0.3)' } },
        { type: 'circle', cx: 100, cy: 55, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.5)' } },
        { type: 'circle', cx: 145, cy: 100, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.5)' } },
        { type: 'circle', cx: 100, cy: 145, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.5)' } },
        { type: 'circle', cx: 55, cy: 100, r: 6, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.5)' } },
        { type: 'text', text: 'n=1', at: { x: 100, y: 52 }, style: STYLE.textTiny },
        { type: 'text', text: 'n=2', at: { x: 100, y: 72 }, style: STYLE.textTiny },
        { type: 'text', text: 'Nucleus', at: { x: 100, y: 185 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Ionic/covalent bonding */
export const ionic_covalent_bonding: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 160 },
  viewBox: '0 0 350 160',
  layers: [
    {
      id: 'bonding',
      items: [
        { type: 'rect', x: 50, y: 50, width: 130, height: 70, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(239,68,68,0.06)' } },
        { type: 'text', text: 'Na⁺', at: { x: 80, y: 80 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 100, y: 80 }, to: { x: 130, y: 80 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Cl⁻', at: { x: 140, y: 80 }, style: STYLE.textLabel },
        { type: 'text', text: 'Ionic: electron transfer', at: { x: 115, y: 115 }, style: STYLE.textCaption },
        { type: 'rect', x: 220, y: 50, width: 110, height: 70, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(34,197,94,0.06)' } },
        { type: 'circle', cx: 260, cy: 70, r: 18, style: { stroke: STYLE.accent, fill: 'none' } },
        { type: 'circle', cx: 300, cy: 70, r: 18, style: { stroke: STYLE.accent, fill: 'none' } },
        { type: 'line', from: { x: 278, y: 65 }, to: { x: 282, y: 75 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'text', text: 'Covalent: shared pair', at: { x: 275, y: 115 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Free body diagram */
export const free_body_diagram: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 300, height: 220 },
  viewBox: '0 0 300 220',
  layers: [
    {
      id: 'fbd',
      items: [
        { type: 'rect', x: 100, y: 80, width: 100, height: 60, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(148,163,184,0.2)' } },
        { type: 'arrow', from: { x: 150, y: 80 }, to: { x: 150, y: 40 }, headSize: 8, style: { stroke: STYLE.danger, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 150, y: 140 }, to: { x: 150, y: 100 }, headSize: 8, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 150, y: 140 }, to: { x: 150, y: 180 }, headSize: 8, style: { stroke: STYLE.success, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 100, y: 110 }, to: { x: 60, y: 110 }, headSize: 8, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 200, y: 110 }, to: { x: 240, y: 110 }, headSize: 8, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'text', text: 'F (applied)', at: { x: 150, y: 30 }, style: STYLE.textCaption },
        { type: 'text', text: 'N', at: { x: 150, y: 115 }, style: STYLE.textCaption },
        { type: 'text', text: 'W', at: { x: 150, y: 195 }, style: STYLE.textCaption },
        { type: 'text', text: 'Friction', at: { x: 245, y: 105 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Particle model */
export const particle_model: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 120 },
  viewBox: '0 0 400 120',
  layers: [
    {
      id: 'particle',
      items: [
        { type: 'text', text: 'Solid', at: { x: 70, y: 30 }, style: STYLE.textLabel },
        { type: 'circle', cx: 50, cy: 70, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 80, cy: 65, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 70, cy: 95, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'text', text: 'Liquid', at: { x: 200, y: 30 }, style: STYLE.textLabel },
        { type: 'circle', cx: 180, cy: 70, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 210, cy: 75, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 195, cy: 95, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'text', text: 'Gas', at: { x: 330, y: 30 }, style: STYLE.textLabel },
        { type: 'circle', cx: 300, cy: 60, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 340, cy: 90, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'circle', cx: 320, cy: 110, r: 8, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.4)' } },
        { type: 'text', text: 'Vibrate', at: { x: 70, y: 115 }, style: STYLE.textTiny },
        { type: 'text', text: 'Move freely', at: { x: 330, y: 115 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Energy profile */
export const energy_profile: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 200 },
  viewBox: '0 0 350 200',
  layers: [
    {
      id: 'energy',
      items: [
        { type: 'line', from: { x: 50, y: 160 }, to: { x: 300, y: 160 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 50, y: 160 }, to: { x: 50, y: 30 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'polyline', points: [{ x: 50, y: 120 }, { x: 120, y: 50 }, { x: 200, y: 90 }, { x: 280, y: 40 }], style: { stroke: STYLE.accent, fill: 'none', strokeWidth: 2 } },
        { type: 'text', text: 'Energy', at: { x: 25, y: 95 }, style: { ...STYLE.textCaption, textAnchor: 'middle' } },
        { type: 'text', text: 'Progress of reaction', at: { x: 175, y: 185 }, style: STYLE.textCaption },
        { type: 'text', text: 'Reactants', at: { x: 50, y: 135 }, style: STYLE.textCaption },
        { type: 'text', text: 'Products', at: { x: 280, y: 55 }, style: STYLE.textCaption },
        { type: 'text', text: 'Ea', at: { x: 120, y: 85 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Flame test colours */
export const flame_test_colours: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'flame',
      items: [
        { type: 'text', text: 'Li', at: { x: 50, y: 75 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 50, y: 145 }, { x: 35, y: 95 }, { x: 65, y: 95 }], style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.5)' } },
        { type: 'text', text: 'Na', at: { x: 120, y: 75 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 120, y: 145 }, { x: 105, y: 95 }, { x: 135, y: 95 }], style: { stroke: STYLE.warning, fill: 'rgba(234,179,8,0.5)' } },
        { type: 'text', text: 'K', at: { x: 190, y: 75 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 190, y: 145 }, { x: 175, y: 95 }, { x: 205, y: 95 }], style: { stroke: STYLE.accent, fill: 'rgba(168,85,247,0.5)' } },
        { type: 'text', text: 'Ca', at: { x: 260, y: 75 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 260, y: 145 }, { x: 245, y: 95 }, { x: 275, y: 95 }], style: { stroke: STYLE.danger, fill: 'rgba(220,38,38,0.5)' } },
        { type: 'text', text: 'Cu', at: { x: 330, y: 75 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 330, y: 145 }, { x: 315, y: 95 }, { x: 345, y: 95 }], style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.5)' } },
      ],
    },
  ],
};

/** Wave types – transverse and longitudinal (compression/rarefaction) */
export const wave_types: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'waves',
      items: [
        { type: 'polyline', points: [{ x: 50, y: 80 }, { x: 100, y: 50 }, { x: 150, y: 80 }, { x: 200, y: 110 }, { x: 250, y: 80 }], style: { stroke: STYLE.accent, fill: 'none', strokeWidth: 2 } },
        { type: 'text', text: 'Transverse', at: { x: 150, y: 130 }, style: STYLE.textCaption },
        { type: 'text', text: 'Longitudinal', at: { x: 320, y: 45 }, style: STYLE.textCaption },
        { type: 'rect', x: 265, y: 55, width: 18, height: 50, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(99,102,241,0.15)' } },
        { type: 'rect', x: 288, y: 60, width: 18, height: 40, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(99,102,241,0.35)' } },
        { type: 'rect', x: 311, y: 65, width: 18, height: 30, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(99,102,241,0.5)' } },
        { type: 'rect', x: 334, y: 70, width: 18, height: 20, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(99,102,241,0.25)' } },
        { type: 'text', text: 'C', at: { x: 274, y: 115 }, style: STYLE.textTiny },
        { type: 'text', text: 'R', at: { x: 297, y: 108 }, style: STYLE.textTiny },
        { type: 'text', text: 'C', at: { x: 320, y: 102 }, style: STYLE.textTiny },
        { type: 'text', text: 'C=compression R=rarefaction', at: { x: 300, y: 135 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Electromagnetism */
export const electromagnetism: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 180 },
  viewBox: '0 0 350 180',
  layers: [
    {
      id: 'em',
      items: [
        { type: 'rect', x: 80, y: 40, width: 40, height: 100, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(148,163,184,0.2)' } },
        { type: 'text', text: 'N', at: { x: 100, y: 30 }, style: STYLE.textLabel },
        { type: 'text', text: 'S', at: { x: 100, y: 155 }, style: STYLE.textLabel },
        { type: 'polyline', points: [{ x: 130, y: 50 }, { x: 200, y: 90 }, { x: 270, y: 50 }], style: { stroke: STYLE.accent, fill: 'none', strokeWidth: 2 } },
        { type: 'polyline', points: [{ x: 130, y: 130 }, { x: 200, y: 90 }, { x: 270, y: 130 }], style: { stroke: STYLE.accent, fill: 'none', strokeWidth: 2 } },
        { type: 'arrow', from: { x: 250, y: 65 }, to: { x: 265, y: 55 }, headSize: 6, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 250, y: 115 }, to: { x: 265, y: 125 }, headSize: 6, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'text', text: 'Field lines (N→S)', at: { x: 200, y: 170 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Fission/fusion */
export const fission_fusion: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 160 },
  viewBox: '0 0 400 160',
  layers: [
    {
      id: 'nuclear',
      items: [
        { type: 'circle', cx: 80, cy: 80, r: 25, style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.3)' } },
        { type: 'text', text: 'U-235', at: { x: 80, y: 115 }, style: STYLE.textCaption },
        { type: 'circle', cx: 105, cy: 65, r: 5, style: { stroke: STYLE.stroke, fill: 'rgba(100,116,139,0.6)' } },
        { type: 'text', text: 'n', at: { x: 105, y: 68 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 110, y: 80 }, to: { x: 150, y: 80 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Fission', at: { x: 125, y: 55 }, style: STYLE.textCaption },
        { type: 'circle', cx: 200, cy: 60, r: 15, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.3)' } },
        { type: 'circle', cx: 200, cy: 100, r: 15, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.3)' } },
        { type: 'text', text: 'Fusion', at: { x: 310, y: 55 }, style: STYLE.textCaption },
        { type: 'circle', cx: 300, cy: 80, r: 12, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.3)' } },
        { type: 'circle', cx: 330, cy: 80, r: 12, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.3)' } },
        { type: 'arrow', from: { x: 315, y: 80 }, to: { x: 345, y: 80 }, headSize: 6, style: STYLE.arrow },
        { type: 'circle', cx: 360, cy: 80, r: 18, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.3)' } },
      ],
    },
  ],
};

/** Red shift */
export const red_shift: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 140 },
  viewBox: '0 0 400 140',
  layers: [
    {
      id: 'redshift',
      items: [
        { type: 'rect', x: 50, y: 40, width: 120, height: 60, style: { stroke: STYLE.stroke, fill: 'none' } },
        { type: 'line', from: { x: 70, y: 55 }, to: { x: 150, y: 55 }, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'line', from: { x: 80, y: 85 }, to: { x: 140, y: 85 }, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'text', text: 'Lab', at: { x: 110, y: 110 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 175, y: 70 }, to: { x: 225, y: 70 }, headSize: 8, style: STYLE.arrow },
        { type: 'rect', x: 230, y: 40, width: 120, height: 60, style: { stroke: STYLE.stroke, fill: 'none' } },
        { type: 'line', from: { x: 250, y: 55 }, to: { x: 330, y: 55 }, style: { stroke: STYLE.danger, strokeWidth: 2 } },
        { type: 'line', from: { x: 260, y: 85 }, to: { x: 320, y: 85 }, style: { stroke: STYLE.danger, strokeWidth: 2 } },
        { type: 'text', text: 'Distant galaxy', at: { x: 290, y: 110 }, style: STYLE.textCaption },
        { type: 'text', text: 'Red-shifted', at: { x: 290, y: 130 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Le Chatelier */
export const le_chatelier: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 160 },
  viewBox: '0 0 350 160',
  layers: [
    {
      id: 'lechatelier',
      items: [
        { type: 'rect', x: 80, y: 35, width: 190, height: 45, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(99,102,241,0.06)' } },
        { type: 'text', text: 'A + B ⇌ C + D', at: { x: 175, y: 62 }, style: STYLE.textLabel },
        { type: 'text', text: 'Disturbance → shift opposes', at: { x: 175, y: 105 }, style: STYLE.textCaption },
        { type: 'text', text: 'Equilibrium', at: { x: 175, y: 145 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Half equations */
export const half_equations: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 140 },
  viewBox: '0 0 400 140',
  layers: [
    {
      id: 'half',
      items: [
        { type: 'rect', x: 50, y: 30, width: 120, height: 45, rx: 4, style: { stroke: STYLE.danger, fill: 'rgba(239,68,68,0.08)' } },
        { type: 'text', text: 'Anode (+)', at: { x: 110, y: 52 }, style: STYLE.textCaption },
        { type: 'text', text: '2Cl⁻ → Cl₂ + 2e⁻', at: { x: 110, y: 72 }, style: STYLE.textLabel },
        { type: 'rect', x: 230, y: 30, width: 120, height: 45, rx: 4, style: { stroke: STYLE.accent, fill: 'rgba(99,102,241,0.08)' } },
        { type: 'text', text: 'Cathode (−)', at: { x: 290, y: 52 }, style: STYLE.textCaption },
        { type: 'text', text: '2H⁺ + 2e⁻ → H₂', at: { x: 290, y: 72 }, style: STYLE.textLabel },
        { type: 'text', text: 'Oxidation', at: { x: 110, y: 105 }, style: STYLE.textCaption },
        { type: 'text', text: 'Reduction', at: { x: 290, y: 105 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Empirical/molecular formula */
export const empirical_molecular: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 160 },
  viewBox: '0 0 350 160',
  layers: [
    {
      id: 'empirical',
      items: [
        { type: 'rect', x: 100, y: 25, width: 150, height: 35, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(99,102,241,0.06)' } },
        { type: 'text', text: 'Mass % → moles → ratio', at: { x: 175, y: 47 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 175, y: 65 }, to: { x: 175, y: 85 }, headSize: 6, style: STYLE.arrow },
        { type: 'rect', x: 120, y: 90, width: 110, height: 35, rx: 4, style: { stroke: STYLE.success, fill: 'rgba(34,197,94,0.08)' } },
        { type: 'text', text: 'Empirical formula', at: { x: 175, y: 112 }, style: STYLE.textLabel },
        { type: 'text', text: 'Mr ÷ empirical mass = n → molecular', at: { x: 175, y: 145 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Alkene addition */
export const alkene_addition: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 140 },
  viewBox: '0 0 400 140',
  layers: [
    {
      id: 'alkene',
      items: [
        { type: 'line', from: { x: 120, y: 50 }, to: { x: 160, y: 50 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 140, y: 35 }, to: { x: 140, y: 65 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'text', text: 'C=C', at: { x: 140, y: 48 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 175, y: 50 }, to: { x: 225, y: 50 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Ethene + Br₂ → dibromoethane', at: { x: 200, y: 80 }, style: STYLE.textCaption },
        { type: 'text', text: 'Ethene + H₂O → ethanol', at: { x: 200, y: 100 }, style: STYLE.textCaption },
        { type: 'text', text: 'n ethene → poly(ethene)', at: { x: 200, y: 120 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Bond energy */
export const bond_energy: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 180 },
  viewBox: '0 0 350 180',
  layers: [
    {
      id: 'bond',
      items: [
        { type: 'line', from: { x: 50, y: 150 }, to: { x: 300, y: 150 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 50, y: 150 }, to: { x: 50, y: 30 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'polyline', points: [{ x: 50, y: 100 }, { x: 120, y: 50 }, { x: 200, y: 80 }], style: { stroke: STYLE.accent, fill: 'none', strokeWidth: 2 } },
        { type: 'text', text: 'Energy', at: { x: 25, y: 90 }, style: { ...STYLE.textCaption, textAnchor: 'middle' } },
        { type: 'text', text: 'Reaction progress', at: { x: 175, y: 172 }, style: STYLE.textCaption },
        { type: 'text', text: 'ΔH', at: { x: 120, y: 95 }, style: STYLE.textCaption },
        { type: 'text', text: 'Ea', at: { x: 85, y: 75 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Hooke's law graph */
export const hookes_law_graph: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 200 },
  viewBox: '0 0 350 200',
  layers: [
    {
      id: 'hookes',
      items: [
        { type: 'line', from: { x: 50, y: 160 }, to: { x: 320, y: 160 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 50, y: 160 }, to: { x: 50, y: 30 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'polyline', points: [{ x: 50, y: 160 }, { x: 150, y: 80 }, { x: 200, y: 50 }, { x: 280, y: 35 }], style: { stroke: STYLE.accent, fill: 'none', strokeWidth: 2 } },
        { type: 'text', text: 'Force', at: { x: 25, y: 95 }, style: { ...STYLE.textCaption, textAnchor: 'middle' } },
        { type: 'text', text: 'Extension', at: { x: 185, y: 185 }, style: STYLE.textLabel },
        { type: 'text', text: 'Elastic limit', at: { x: 200, y: 65 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Critical angle TIR – total internal reflection */
export const critical_angle_tir: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 200 },
  viewBox: '0 0 350 200',
  layers: [
    {
      id: 'tir',
      items: [
        { type: 'rect', x: 50, y: 30, width: 250, height: 120, style: { stroke: STYLE.stroke, fill: 'rgba(147,197,253,0.2)' } },
        { type: 'line', from: { x: 50, y: 150 }, to: { x: 300, y: 150 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 175, y: 150 }, to: { x: 175, y: 30 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1, dashArray: '4,4' } },
        { type: 'line', from: { x: 175, y: 150 }, to: { x: 220, y: 85 }, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'arc', center: { x: 175, y: 150 }, radius: 25, startAngle: 270, endAngle: 306, style: { stroke: STYLE.stroke, fill: 'none', strokeWidth: 1 } },
        { type: 'text', text: 'θc', at: { x: 195, y: 135 }, style: STYLE.textCaption },
        { type: 'text', text: 'Glass', at: { x: 175, y: 90 }, style: STYLE.textCaption },
        { type: 'text', text: 'Air', at: { x: 175, y: 170 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Simple circuit: cell → wire → component */
export const circuit_diagram: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 320, height: 140 },
  viewBox: '0 0 320 140',
  layers: [
    {
      id: 'circuit',
      items: [
        { type: 'rect', x: 30, y: 50, width: 40, height: 40, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'text', text: 'Cell', at: { x: 50, y: 75 }, style: STYLE.textCaption },
        { type: 'line', from: { x: 70, y: 70 }, to: { x: 120, y: 70 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'rect', x: 120, y: 45, width: 80, height: 50, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(200,200,200,0.3)' } },
        { type: 'text', text: 'Component', at: { x: 160, y: 75 }, style: STYLE.textCaption },
        { type: 'line', from: { x: 200, y: 70 }, to: { x: 250, y: 70 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 250, y: 70 }, to: { x: 250, y: 110 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 250, y: 110 }, to: { x: 70, y: 110 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'line', from: { x: 70, y: 110 }, to: { x: 70, y: 70 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'text', text: 'I same in series', at: { x: 160, y: 125 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Moles: mass, Mr, moles relationship */
export const moles_diagram: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 300, height: 120 },
  viewBox: '0 0 300 120',
  layers: [
    {
      id: 'moles',
      items: [
        { type: 'text', text: 'Mass (g)', at: { x: 50, y: 60 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 100, y: 60 }, to: { x: 140, y: 60 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: '÷ Mr', at: { x: 115, y: 45 }, style: STYLE.textCaption },
        { type: 'text', text: 'Moles', at: { x: 160, y: 60 }, style: STYLE.textLabel },
        { type: 'text', text: '× Mr', at: { x: 215, y: 45 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 220, y: 60 }, to: { x: 260, y: 60 }, headSize: 6, style: STYLE.arrow },
        { type: 'text', text: 'Mass (g)', at: { x: 265, y: 60 }, style: STYLE.textLabel },
      ],
    },
  ],
};

/** Electrolysis: cathode and anode */
export const electrolysis_diagram: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 300, height: 160 },
  viewBox: '0 0 300 160',
  layers: [
    {
      id: 'electrolysis',
      items: [
        { type: 'rect', x: 30, y: 30, width: 50, height: 100, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'text', text: 'Battery', at: { x: 55, y: 85 }, style: STYLE.textCaption },
        { type: 'rect', x: 120, y: 20, width: 30, height: 120, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(59,130,246,0.15)' } },
        { type: 'rect', x: 150, y: 20, width: 30, height: 120, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(239,68,68,0.15)' } },
        { type: 'text', text: 'Cathode (−)', at: { x: 105, y: 150 }, style: STYLE.textTiny },
        { type: 'text', text: 'Anode (+)', at: { x: 195, y: 150 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 120, y: 70 }, to: { x: 150, y: 70 }, headSize: 6, style: { stroke: STYLE.danger, strokeWidth: 2 } },
        { type: 'text', text: 'Cations →', at: { x: 130, y: 58 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 180, y: 90 }, to: { x: 150, y: 90 }, headSize: 6, style: { stroke: STYLE.accent, strokeWidth: 2 } },
        { type: 'text', text: '← Anions', at: { x: 160, y: 102 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Fractionating column */
export const fractionating_column: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 280, height: 180 },
  viewBox: '0 0 280 180',
  layers: [
    {
      id: 'column',
      items: [
        { type: 'rect', x: 100, y: 20, width: 80, height: 140, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(200,200,200,0.2)' } },
        { type: 'text', text: 'Gases', at: { x: 140, y: 45 }, style: STYLE.textTiny },
        { type: 'text', text: 'Petrol', at: { x: 140, y: 75 }, style: STYLE.textTiny },
        { type: 'text', text: 'Kerosene', at: { x: 140, y: 105 }, style: STYLE.textTiny },
        { type: 'text', text: 'Diesel', at: { x: 140, y: 135 }, style: STYLE.textTiny },
        { type: 'rect', x: 110, y: 165, width: 60, height: 15, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(100,100,100,0.3)' } },
        { type: 'text', text: 'Crude oil', at: { x: 140, y: 178 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** EM spectrum */
export const em_spectrum: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 380, height: 90 },
  viewBox: '0 0 380 90',
  layers: [
    {
      id: 'em',
      items: [
        { type: 'rect', x: 20, y: 30, width: 40, height: 30, style: { stroke: STYLE.stroke, fill: 'rgba(147,197,253,0.3)' } },
        { type: 'rect', x: 65, y: 30, width: 35, height: 30, style: { stroke: STYLE.stroke, fill: 'rgba(167,139,250,0.3)' } },
        { type: 'rect', x: 105, y: 30, width: 30, height: 30, style: { stroke: STYLE.stroke, fill: 'rgba(251,146,60,0.3)' } },
        { type: 'rect', x: 140, y: 30, width: 60, height: 30, style: { stroke: STYLE.stroke, fill: 'rgba(34,197,94,0.3)' } },
        { type: 'rect', x: 205, y: 30, width: 35, height: 30, style: { stroke: STYLE.stroke, fill: 'rgba(234,179,8,0.3)' } },
        { type: 'rect', x: 245, y: 30, width: 45, height: 30, style: { stroke: STYLE.stroke, fill: 'rgba(239,68,68,0.3)' } },
        { type: 'rect', x: 295, y: 30, width: 65, height: 30, style: { stroke: STYLE.stroke, fill: 'rgba(139,92,246,0.3)' } },
        { type: 'text', text: 'Radio', at: { x: 40, y: 75 }, style: STYLE.textTiny },
        { type: 'text', text: 'Visible', at: { x: 165, y: 75 }, style: STYLE.textTiny },
        { type: 'text', text: 'Gamma', at: { x: 320, y: 75 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 25, y: 85 }, to: { x: 355, y: 85 }, headSize: 6, style: { stroke: STYLE.strokeLight, strokeWidth: 1 } },
        { type: 'text', text: 'λ increases →', at: { x: 190, y: 88 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Generator: coil in field */
export const generator_diagram: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 300, height: 120 },
  viewBox: '0 0 300 120',
  layers: [
    {
      id: 'generator',
      items: [
        { type: 'rect', x: 80, y: 30, width: 80, height: 60, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(59,130,246,0.2)' } },
        { type: 'text', text: 'Coil', at: { x: 120, y: 65 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 165, y: 60 }, to: { x: 220, y: 60 }, headSize: 8, style: STYLE.arrow },
        { type: 'text', text: 'Movement', at: { x: 185, y: 45 }, style: STYLE.textCaption },
        { type: 'text', text: 'Induced p.d. → a.c.', at: { x: 230, y: 65 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Titration setup: burette, pipette, conical flask */
export const titration_setup: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 320, height: 220 },
  viewBox: '0 0 320 220',
  layers: [
    {
      id: 'titration',
      items: [
        { type: 'rect', x: 130, y: 20, width: 60, height: 120, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(200,200,200,0.2)' } },
        { type: 'text', text: 'Burette', at: { x: 145, y: 15 }, style: STYLE.textCaption },
        { type: 'line', from: { x: 160, y: 140 }, to: { x: 160, y: 180 }, style: { stroke: STYLE.stroke, strokeWidth: 2 } },
        { type: 'text', text: 'Acid', at: { x: 165, y: 165 }, style: STYLE.textTiny },
        { type: 'polygon', points: [{ x: 100, y: 100 }, { x: 140, y: 100 }, { x: 130, y: 130 }, { x: 110, y: 130 }], style: { stroke: STYLE.stroke, fill: 'rgba(147,197,253,0.2)' } },
        { type: 'text', text: 'Pipette', at: { x: 95, y: 95 }, style: STYLE.textTiny },
        { type: 'ellipse', cx: 220, cy: 150, rx: 50, ry: 35, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.15)' } },
        { type: 'text', text: 'Conical flask', at: { x: 200, y: 155 }, style: STYLE.textCaption },
        { type: 'text', text: 'Alkali + indicator', at: { x: 200, y: 175 }, style: STYLE.textTiny },
        { type: 'line', from: { x: 160, y: 180 }, to: { x: 220, y: 130 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1, dashArray: '4,4' } },
        { type: 'text', text: 'Add acid drop by drop', at: { x: 180, y: 205 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Density measurement: balance and ruler with solid */
export const density_measurement: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 350, height: 180 },
  viewBox: '0 0 350 180',
  layers: [
    {
      id: 'density',
      items: [
        { type: 'rect', x: 50, y: 80, width: 100, height: 50, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(200,200,200,0.3)' } },
        { type: 'text', text: 'Balance', at: { x: 100, y: 75 }, style: STYLE.textCaption },
        { type: 'rect', x: 75, y: 95, width: 50, height: 25, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(100,150,255,0.2)' } },
        { type: 'text', text: 'Mass (g)', at: { x: 100, y: 145 }, style: STYLE.textCaption },
        { type: 'rect', x: 200, y: 60, width: 120, height: 20, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(200,200,200,0.3)' } },
        { type: 'text', text: 'Ruler / Vernier', at: { x: 240, y: 55 }, style: STYLE.textCaption },
        { type: 'rect', x: 220, y: 100, width: 80, height: 50, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(139,92,246,0.2)' } },
        { type: 'text', text: 'Regular solid', at: { x: 240, y: 130 }, style: STYLE.textCaption },
        { type: 'text', text: 'L × W × H = V', at: { x: 260, y: 155 }, style: STYLE.textTiny },
        { type: 'text', text: 'ρ = m ÷ V', at: { x: 100, y: 170 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Specific heat capacity: immersion heater, block, thermometer */
export const specific_heat_capacity_setup: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 320, height: 200 },
  viewBox: '0 0 320 200',
  layers: [
    {
      id: 'shc',
      items: [
        { type: 'rect', x: 80, y: 30, width: 50, height: 80, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(251,191,36,0.2)' } },
        { type: 'text', text: 'Power supply', at: { x: 105, y: 25 }, style: STYLE.textCaption },
        { type: 'rect', x: 160, y: 70, width: 100, height: 70, rx: 4, style: { stroke: STYLE.stroke, fill: 'rgba(200,200,200,0.3)' } },
        { type: 'text', text: 'Metal block', at: { x: 210, y: 95 }, style: STYLE.text },
        { type: 'rect', x: 175, y: 75, width: 20, height: 60, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(239,68,68,0.2)' } },
        { type: 'text', text: 'Heater', at: { x: 175, y: 70 }, style: STYLE.textTiny },
        { type: 'rect', x: 255, y: 50, width: 15, height: 90, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(59,130,246,0.2)' } },
        { type: 'text', text: 'Thermometer', at: { x: 250, y: 45 }, style: STYLE.textTiny },
        { type: 'line', from: { x: 130, y: 70 }, to: { x: 185, y: 100 }, style: { stroke: STYLE.stroke, strokeWidth: 1 } },
        { type: 'text', text: 'E = Pt', at: { x: 155, y: 165 }, style: STYLE.textCaption },
        { type: 'text', text: 'c = E ÷ (mΔT)', at: { x: 200, y: 185 }, style: STYLE.textCaption },
      ],
    },
  ],
};

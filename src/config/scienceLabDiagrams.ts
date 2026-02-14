/**
 * Science Lab – inline diagram blueprints for flashcards
 * Uses CustomDiagramEngine for programmatic SVG rendering (no Supabase required)
 * Design: handcrafted, textbook-quality diagrams with subject-appropriate palettes
 */

import type { CustomDiagramBlueprint } from '../diagrams/engine/customDiagramEngine';

/** Refined design system – textbook-quality, handcrafted aesthetic */
const STYLE = {
  // Core strokes
  stroke: '#0f172a',
  strokeMuted: '#475569',
  strokeLight: '#94a3b8',
  fill: 'none',
  // Subject palettes
  bio: {
    primary: '#059669',
    primaryLight: 'rgba(5, 150, 105, 0.18)',
    secondary: '#0d9488',
    accent: '#14b8a6',
    cell: 'rgba(5, 150, 105, 0.12)',
  },
  chem: {
    primary: '#7c3aed',
    primaryLight: 'rgba(124, 58, 237, 0.14)',
    secondary: '#6366f1',
    accent: '#8b5cf6',
  },
  phys: {
    primary: '#0ea5e9',
    primaryLight: 'rgba(14, 165, 233, 0.14)',
    secondary: '#3b82f6',
    accent: '#38bdf8',
  },
  semantic: {
    success: '#059669',
    danger: '#dc2626',
    warning: '#d97706',
  },
  // Backward-compat aliases
  accent: '#6366f1',
  success: '#059669',
  danger: '#dc2626',
  warning: '#d97706',
  fillLight: 'rgba(99, 102, 241, 0.1)',
  // Typography scale
  text: { fontSize: 11, fill: '#334155', textAnchor: 'middle' as const },
  textTitle: { fontSize: 13, fill: '#0f172a', textAnchor: 'middle' as const, fontWeight: 600 },
  textLabel: { fontSize: 11, fill: '#334155', textAnchor: 'middle' as const, fontWeight: 500 },
  textCaption: { fontSize: 10, fill: '#64748b', textAnchor: 'middle' as const },
  textTiny: { fontSize: 9, fill: '#94a3b8', textAnchor: 'middle' as const },
  // Arrows
  arrow: { stroke: '#6366f1', strokeWidth: 2.5 },
  arrowAccent: { stroke: '#059669', strokeWidth: 2.5 },
};

/** Diffusion: HIGH → LOW concentration; net movement down gradient (no ATP) */
export const cell_membrane_diffusion: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 440, height: 240 },
  viewBox: '0 0 440 240',
  layers: [
    {
      id: 'diffusion',
      items: [
        // Compartments
        { type: 'rect', x: 24, y: 48, width: 172, height: 132, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: STYLE.bio.cell } },
        { type: 'rect', x: 244, y: 48, width: 172, height: 132, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(148, 163, 184, 0.08)' } },
        // Membrane
        { type: 'rect', x: 196, y: 48, width: 8, height: 132, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(15, 23, 42, 0.15)', strokeWidth: 1 } },
        { type: 'line', from: { x: 200, y: 48 }, to: { x: 200, y: 180 }, style: { stroke: STYLE.stroke, strokeWidth: 1.5 } },
        // Particles (high concentration - denser)
        { type: 'circle', cx: 65, cy: 85, r: 7, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 95, cy: 95, r: 7, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 125, cy: 78, r: 7, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 88, cy: 125, r: 7, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 118, cy: 115, r: 7, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 150, cy: 105, r: 7, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        // Particles (low concentration - sparse)
        { type: 'circle', cx: 270, cy: 92, r: 7, style: { stroke: STYLE.strokeLight, fill: 'rgba(100, 116, 139, 0.25)', strokeWidth: 1.5 } },
        { type: 'circle', cx: 320, cy: 105, r: 7, style: { stroke: STYLE.strokeLight, fill: 'rgba(100, 116, 139, 0.25)', strokeWidth: 1.5 } },
        { type: 'circle', cx: 358, cy: 88, r: 7, style: { stroke: STYLE.strokeLight, fill: 'rgba(100, 116, 139, 0.25)', strokeWidth: 1.5 } },
        // Net movement arrow
        { type: 'arrow', from: { x: 188, y: 110 }, to: { x: 232, y: 110 }, headSize: 12, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        // Labels
        { type: 'text', text: 'High concentration', at: { x: 110, y: 32 }, style: { ...STYLE.textLabel, fill: STYLE.bio.primary } },
        { type: 'text', text: 'Low concentration', at: { x: 330, y: 32 }, style: STYLE.textLabel },
        { type: 'text', text: 'Net movement down gradient', at: { x: 220, y: 205 }, style: { ...STYLE.textCaption, fontWeight: 600 } },
        { type: 'text', text: 'Passive · No ATP needed', at: { x: 220, y: 222 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Osmosis: water through membrane */
export const osmosis_diagram: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 440, height: 220 },
  viewBox: '0 0 440 220',
  layers: [
    {
      id: 'osmosis',
      items: [
        // Dilute solution (more water)
        { type: 'rect', x: 28, y: 52, width: 162, height: 112, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(14, 165, 233, 0.08)' } },
        // Concentrated solution
        { type: 'rect', x: 250, y: 52, width: 162, height: 112, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(217, 119, 6, 0.08)' } },
        // Membrane
        { type: 'rect', x: 208, y: 52, width: 12, height: 112, rx: 2, style: { stroke: STYLE.stroke, fill: 'rgba(15, 23, 42, 0.12)', strokeWidth: 1 } },
        { type: 'line', from: { x: 214, y: 52 }, to: { x: 214, y: 164 }, style: { stroke: STYLE.stroke, strokeWidth: 1.5 } },
        // Water molecules (H₂O) - dilute side
        { type: 'circle', cx: 65, cy: 95, r: 9, style: { stroke: '#0ea5e9', fill: 'rgba(14, 165, 233, 0.25)', strokeWidth: 1.5 } },
        { type: 'circle', cx: 95, cy: 115, r: 9, style: { stroke: '#0ea5e9', fill: 'rgba(14, 165, 233, 0.25)', strokeWidth: 1.5 } },
        { type: 'circle', cx: 125, cy: 88, r: 9, style: { stroke: '#0ea5e9', fill: 'rgba(14, 165, 233, 0.25)', strokeWidth: 1.5 } },
        { type: 'circle', cx: 90, cy: 135, r: 9, style: { stroke: '#0ea5e9', fill: 'rgba(14, 165, 233, 0.2)', strokeWidth: 1.5 } },
        // Water flow arrow
        { type: 'arrow', from: { x: 196, y: 108 }, to: { x: 232, y: 108 }, headSize: 10, style: { stroke: '#0ea5e9', strokeWidth: 2.5 } },
        // Labels
        { type: 'text', text: 'Dilute', at: { x: 109, y: 38 }, style: { ...STYLE.textLabel, fill: '#0ea5e9' } },
        { type: 'text', text: 'Concentrated', at: { x: 331, y: 38 }, style: STYLE.textLabel },
        { type: 'text', text: 'Partially permeable membrane', at: { x: 220, y: 195 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Active transport: carrier proteins, ATP */
export const active_transport: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 440, height: 220 },
  viewBox: '0 0 440 220',
  layers: [
    {
      id: 'active',
      items: [
        // Low concentration side
        { type: 'rect', x: 28, y: 52, width: 152, height: 112, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(148, 163, 184, 0.08)' } },
        // High concentration side
        { type: 'rect', x: 260, y: 52, width: 152, height: 112, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: STYLE.bio.cell } },
        // Carrier protein
        { type: 'rect', x: 188, y: 72, width: 64, height: 72, rx: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2, fill: STYLE.bio.primaryLight } },
        { type: 'text', text: 'Carrier', at: { x: 220, y: 102 }, style: { ...STYLE.textCaption, fill: STYLE.bio.primary } },
        { type: 'text', text: 'protein', at: { x: 220, y: 116 }, style: { ...STYLE.textCaption, fill: STYLE.bio.primary } },
        // Arrow (against gradient - low to high)
        { type: 'arrow', from: { x: 248, y: 108 }, to: { x: 220, y: 108 }, headSize: 10, style: { stroke: STYLE.success, strokeWidth: 2.5 } },
        // ATP badge
        { type: 'rect', x: 196, y: 32, width: 48, height: 24, rx: 6, style: { stroke: STYLE.success, fill: 'rgba(5, 150, 105, 0.12)', strokeWidth: 1.5 } },
        { type: 'text', text: 'ATP', at: { x: 220, y: 50 }, style: { ...STYLE.textLabel, fill: STYLE.success, fontSize: 12 } },
        // Labels
        { type: 'text', text: 'Low', at: { x: 104, y: 108 }, style: STYLE.textLabel },
        { type: 'text', text: 'High', at: { x: 336, y: 108 }, style: { ...STYLE.textLabel, fill: STYLE.bio.primary } },
        { type: 'text', text: 'Against concentration gradient', at: { x: 220, y: 195 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Cell division: mitosis vs meiosis – spacious, no overlap */
export const cell_division: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 520, height: 240 },
  viewBox: '0 0 520 240',
  layers: [
    {
      id: 'division',
      items: [
        // Parent cell
        { type: 'circle', cx: 100, cy: 108, r: 40, style: { stroke: STYLE.stroke, strokeWidth: 2, fill: STYLE.bio.cell } },
        { type: 'text', text: '1 cell', at: { x: 100, y: 102 }, style: STYLE.textLabel },
        { type: 'text', text: '(2n)', at: { x: 100, y: 118 }, style: STYLE.textTiny },
        // Mitosis arrow
        { type: 'arrow', from: { x: 144, y: 108 }, to: { x: 184, y: 108 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Mitosis', at: { x: 164, y: 78 }, style: { ...STYLE.textCaption, fill: STYLE.bio.primary } },
        // Two identical cells
        { type: 'circle', cx: 240, cy: 108, r: 30, style: { stroke: STYLE.stroke, strokeWidth: 2, fill: STYLE.bio.cell } },
        { type: 'circle', cx: 320, cy: 108, r: 30, style: { stroke: STYLE.stroke, strokeWidth: 2, fill: STYLE.bio.cell } },
        { type: 'text', text: '2 identical (2n)', at: { x: 280, y: 158 }, style: STYLE.textCaption },
        // Meiosis arrow
        { type: 'arrow', from: { x: 354, y: 108 }, to: { x: 394, y: 108 }, headSize: 10, style: { stroke: STYLE.chem.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Meiosis', at: { x: 374, y: 78 }, style: { ...STYLE.textCaption, fill: STYLE.chem.primary } },
        // Four gametes – centred with padding
        { type: 'circle', cx: 448, cy: 68, r: 22, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: STYLE.chem.primaryLight } },
        { type: 'circle', cx: 482, cy: 68, r: 22, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: STYLE.chem.primaryLight } },
        { type: 'circle', cx: 448, cy: 118, r: 22, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: STYLE.chem.primaryLight } },
        { type: 'circle', cx: 482, cy: 118, r: 22, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: STYLE.chem.primaryLight } },
        { type: 'text', text: '4 gametes (n)', at: { x: 465, y: 178 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Enzyme: lock-and-key – 1.Substrate binds 2.Reaction 3.Products released; enzyme UNCHANGED */
export const enzyme_action: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 500, height: 280 },
  viewBox: '0 0 500 280',
  layers: [
    {
      id: 'enzyme',
      items: [
        // Enzyme body (protein)
        { type: 'ellipse', cx: 240, cy: 128, rx: 92, ry: 58, style: { stroke: '#b45309', strokeWidth: 2, fill: 'rgba(251, 191, 36, 0.12)' } },
        // Active site (pocket)
        { type: 'polygon', points: [{ x: 138, y: 116 }, { x: 178, y: 90 }, { x: 178, y: 142 }], style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: STYLE.chem.primaryLight } },
        // Substrate (key)
        { type: 'polygon', points: [{ x: 142, y: 118 }, { x: 170, y: 100 }, { x: 170, y: 130 }], style: { stroke: STYLE.success, strokeWidth: 2, fill: 'rgba(5, 150, 105, 0.25)' } },
        // Step 1 – label below shape
        { type: 'circle', cx: 158, cy: 116, r: 12, style: { stroke: STYLE.chem.primary, fill: 'rgba(124, 58, 237, 0.1)', strokeWidth: 1.5 } },
        { type: 'text', text: '1', at: { x: 158, y: 120 }, style: { ...STYLE.textLabel, fontSize: 11 } },
        { type: 'text', text: 'Bind', at: { x: 158, y: 158 }, style: STYLE.textTiny },
        // Step 2 arrow
        { type: 'arrow', from: { x: 308, y: 128 }, to: { x: 368, y: 128 }, headSize: 10, style: { stroke: STYLE.chem.primary, strokeWidth: 2.5 } },
        { type: 'circle', cx: 298, cy: 128, r: 12, style: { stroke: STYLE.chem.primary, fill: 'rgba(124, 58, 237, 0.1)', strokeWidth: 1.5 } },
        { type: 'text', text: '2', at: { x: 298, y: 132 }, style: { ...STYLE.textLabel, fontSize: 11 } },
        { type: 'text', text: 'Reaction', at: { x: 333, y: 106 }, style: STYLE.textTiny },
        // Step 3 products
        { type: 'circle', cx: 408, cy: 116, r: 8, style: { stroke: STYLE.strokeMuted, fill: 'rgba(100, 116, 139, 0.35)', strokeWidth: 1.5 } },
        { type: 'circle', cx: 408, cy: 136, r: 8, style: { stroke: STYLE.strokeMuted, fill: 'rgba(100, 116, 139, 0.35)', strokeWidth: 1.5 } },
        { type: 'circle', cx: 422, cy: 116, r: 12, style: { stroke: STYLE.chem.primary, fill: 'rgba(124, 58, 237, 0.1)', strokeWidth: 1.5 } },
        { type: 'text', text: '3', at: { x: 422, y: 120 }, style: { ...STYLE.textLabel, fontSize: 11 } },
        { type: 'text', text: 'Release', at: { x: 422, y: 158 }, style: STYLE.textTiny },
        // Labels – clear of shapes
        { type: 'text', text: 'Enzyme', at: { x: 240, y: 82 }, style: { ...STYLE.textTitle } },
        { type: 'text', text: 'Active site', at: { x: 162, y: 98 }, style: STYLE.textCaption },
        { type: 'text', text: 'Substrate', at: { x: 162, y: 178 }, style: STYLE.textCaption },
        { type: 'text', text: 'Products', at: { x: 415, y: 98 }, style: STYLE.textCaption },
        // Key memory – well below diagram
        { type: 'rect', x: 160, y: 218, width: 240, height: 36, rx: 8, style: { stroke: STYLE.success, fill: 'rgba(5, 150, 105, 0.08)', strokeWidth: 1.5 } },
        { type: 'text', text: '✓ Enzyme UNCHANGED – can catalyse again', at: { x: 280, y: 241 }, style: { ...STYLE.textCaption, fontWeight: 600, fill: STYLE.success } },
      ],
    },
  ],
};

/** Digestive system flow – spacious boxes and labels */
export const digestive_system: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 520, height: 170 },
  viewBox: '0 0 520 170',
  layers: [
    {
      id: 'digestive',
      items: [
        // Flow path – boxes with gap for arrows
        { type: 'rect', x: 28, y: 36, width: 72, height: 52, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(217, 119, 6, 0.1)' } },
        { type: 'rect', x: 118, y: 36, width: 76, height: 52, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(217, 119, 6, 0.1)' } },
        { type: 'rect', x: 212, y: 36, width: 92, height: 52, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(217, 119, 6, 0.1)' } },
        { type: 'rect', x: 322, y: 36, width: 92, height: 52, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(217, 119, 6, 0.1)' } },
        { type: 'rect', x: 432, y: 36, width: 60, height: 52, rx: 8, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(217, 119, 6, 0.08)' } },
        { type: 'arrow', from: { x: 102, y: 62 }, to: { x: 118, y: 62 }, headSize: 8, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 196, y: 62 }, to: { x: 212, y: 62 }, headSize: 8, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 306, y: 62 }, to: { x: 322, y: 62 }, headSize: 8, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 416, y: 62 }, to: { x: 432, y: 62 }, headSize: 8, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'text', text: 'Mouth', at: { x: 64, y: 118 }, style: STYLE.textCaption },
        { type: 'text', text: 'Stomach', at: { x: 156, y: 118 }, style: STYLE.textCaption },
        { type: 'text', text: 'Small intestine', at: { x: 258, y: 118 }, style: STYLE.textCaption },
        { type: 'text', text: 'Large intestine', at: { x: 368, y: 118 }, style: STYLE.textCaption },
        { type: 'text', text: 'Rectum', at: { x: 462, y: 118 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Circulatory system: heart, vessels – labels clear of lines */
export const circulatory_system: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 460, height: 260 },
  viewBox: '0 0 460 260',
  layers: [
    {
      id: 'circulatory',
      items: [
        // Heart – centred with margin
        { type: 'ellipse', cx: 230, cy: 128, rx: 54, ry: 50, style: { stroke: '#dc2626', strokeWidth: 2.5, fill: 'rgba(220, 38, 38, 0.15)' } },
        { type: 'text', text: 'Heart', at: { x: 230, y: 134 }, style: { ...STYLE.textTitle, fill: '#dc2626' } },
        // Arteries (O₂ out) – lines then labels above/below
        { type: 'line', from: { x: 284, y: 128 }, to: { x: 368, y: 58 }, style: { stroke: '#dc2626', strokeWidth: 3 } },
        { type: 'line', from: { x: 284, y: 128 }, to: { x: 368, y: 198 }, style: { stroke: '#dc2626', strokeWidth: 3 } },
        { type: 'text', text: 'Arteries', at: { x: 352, y: 38 }, style: { ...STYLE.textCaption, fill: '#dc2626' } },
        { type: 'text', text: '(O₂)', at: { x: 352, y: 52 }, style: STYLE.textTiny },
        // Veins (CO₂ in)
        { type: 'line', from: { x: 176, y: 128 }, to: { x: 92, y: 58 }, style: { stroke: '#6366f1', strokeWidth: 3 } },
        { type: 'line', from: { x: 176, y: 128 }, to: { x: 92, y: 198 }, style: { stroke: '#6366f1', strokeWidth: 3 } },
        { type: 'text', text: 'Veins', at: { x: 108, y: 38 }, style: { ...STYLE.textCaption, fill: '#6366f1' } },
        { type: 'text', text: '(CO₂)', at: { x: 108, y: 52 }, style: STYLE.textTiny },
        { type: 'text', text: 'Capillaries: gas exchange', at: { x: 230, y: 238 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Pathogen infection – clear stages, no overlap */
export const pathogen_infection: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 500, height: 240 },
  viewBox: '0 0 500 240',
  layers: [
    {
      id: 'pathogen',
      items: [
        { type: 'rect', x: 32, y: 56, width: 140, height: 100, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(148, 163, 184, 0.08)', strokeWidth: 1.5 } },
        { type: 'circle', cx: 82, cy: 108, r: 20, style: { stroke: STYLE.danger, strokeWidth: 2, fill: 'rgba(220, 38, 38, 0.25)' } },
        { type: 'text', text: 'Entry', at: { x: 102, y: 168 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 176, y: 108 }, to: { x: 228, y: 108 }, headSize: 10, style: { stroke: STYLE.danger, strokeWidth: 2.5 } },
        { type: 'text', text: 'Replication', at: { x: 268, y: 78 }, style: STYLE.textCaption },
        { type: 'circle', cx: 288, cy: 108, r: 16, style: { stroke: STYLE.danger, strokeWidth: 2, fill: 'rgba(220, 38, 38, 0.3)' } },
        { type: 'circle', cx: 318, cy: 108, r: 16, style: { stroke: STYLE.danger, strokeWidth: 2, fill: 'rgba(220, 38, 38, 0.3)' } },
        { type: 'arrow', from: { x: 338, y: 108 }, to: { x: 392, y: 108 }, headSize: 10, style: { stroke: STYLE.danger, strokeWidth: 2.5 } },
        { type: 'text', text: 'Toxins / damage', at: { x: 418, y: 88 }, style: STYLE.textCaption },
        { type: 'text', text: 'Symptoms', at: { x: 418, y: 132 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Immune response – spaced stages, labels clear */
export const immune_response: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 520, height: 240 },
  viewBox: '0 0 520 240',
  layers: [
    {
      id: 'immune',
      items: [
        { type: 'circle', cx: 95, cy: 118, r: 32, style: { stroke: STYLE.danger, strokeWidth: 2, fill: 'rgba(220, 38, 38, 0.2)' } },
        { type: 'text', text: 'Pathogen', at: { x: 95, y: 168 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 130, y: 118 }, to: { x: 182, y: 118 }, headSize: 10, style: { stroke: STYLE.phys.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'WBC detects', at: { x: 152, y: 92 }, style: STYLE.textCaption },
        { type: 'rect', x: 198, y: 88, width: 100, height: 60, rx: 10, style: { stroke: STYLE.phys.primary, strokeWidth: 2, fill: 'rgba(14, 165, 233, 0.1)' } },
        { type: 'text', text: 'Antibodies', at: { x: 248, y: 120 }, style: { ...STYLE.textCaption, fill: STYLE.phys.primary } },
        { type: 'arrow', from: { x: 302, y: 118 }, to: { x: 358, y: 118 }, headSize: 10, style: { stroke: STYLE.success, strokeWidth: 2.5 } },
        { type: 'text', text: 'Bind antigen', at: { x: 328, y: 92 }, style: STYLE.textCaption },
        { type: 'circle', cx: 418, cy: 118, r: 28, style: { stroke: STYLE.success, strokeWidth: 2, fill: STYLE.bio.primaryLight } },
        { type: 'text', text: 'Destroyed', at: { x: 418, y: 168 }, style: { ...STYLE.textCaption, fill: STYLE.success } },
      ],
    },
  ],
};

/** Photosynthesis – INPUTS → chlorophyll → OUTPUTS (memory: Light + CO₂ + H₂O → Glucose + O₂) */
export const photosynthesis: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 520, height: 260 },
  viewBox: '0 0 520 260',
  layers: [
    {
      id: 'photosynthesis',
      items: [
        // INPUTS region – wider, labels inside with padding
        { type: 'rect', x: 28, y: 28, width: 152, height: 112, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(251, 191, 36, 0.06)', strokeWidth: 1.5 } },
        { type: 'text', text: 'INPUTS', at: { x: 104, y: 52 }, style: { ...STYLE.textCaption, fontWeight: 600 } },
        { type: 'polygon', points: [{ x: 72, y: 102 }, { x: 104, y: 62 }, { x: 136, y: 102 }], style: { stroke: '#d97706', strokeWidth: 1.5, fill: 'rgba(217, 119, 6, 0.15)' } },
        { type: 'line', from: { x: 104, y: 58 }, to: { x: 104, y: 48 }, style: { stroke: '#d97706', strokeWidth: 2 } },
        { type: 'line', from: { x: 98, y: 52 }, to: { x: 110, y: 52 }, style: { stroke: '#d97706', strokeWidth: 2 } },
        { type: 'text', text: 'Light', at: { x: 104, y: 86 }, style: STYLE.textTiny },
        { type: 'text', text: 'CO₂ + H₂O', at: { x: 104, y: 122 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 184, y: 82 }, to: { x: 236, y: 82 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        // Chlorophyll – label above ellipse
        { type: 'ellipse', cx: 300, cy: 82, rx: 62, ry: 40, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5, fill: STYLE.bio.primaryLight } },
        { type: 'text', text: 'Chlorophyll', at: { x: 300, y: 72 }, style: { ...STYLE.textLabel, fontWeight: 600, fill: STYLE.bio.primary } },
        { type: 'text', text: '(in chloroplasts)', at: { x: 300, y: 132 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 366, y: 82 }, to: { x: 414, y: 82 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        // OUTPUTS – wider box
        { type: 'rect', x: 418, y: 28, width: 84, height: 112, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(5, 150, 105, 0.08)', strokeWidth: 1.5 } },
        { type: 'text', text: 'OUTPUTS', at: { x: 460, y: 52 }, style: { ...STYLE.textCaption, fontWeight: 600 } },
        { type: 'text', text: 'Glucose', at: { x: 460, y: 82 }, style: { ...STYLE.textLabel, fill: STYLE.bio.primary } },
        { type: 'text', text: '+ O₂', at: { x: 460, y: 108 }, style: STYLE.textCaption },
        { type: 'text', text: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂', at: { x: 260, y: 198 }, style: { ...STYLE.textCaption, fontSize: 11 } },
        { type: 'text', text: 'Inputs = reactants · outputs = products', at: { x: 260, y: 228 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Respiration – INPUTS → OUTPUTS; aerobic (O₂) vs anaerobic (no O₂) */
export const respiration: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 500, height: 260 },
  viewBox: '0 0 500 260',
  layers: [
    {
      id: 'respiration',
      items: [
        // Aerobic – labels inside boxes, caption below
        { type: 'rect', x: 32, y: 32, width: 148, height: 80, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(5, 150, 105, 0.06)', strokeWidth: 1.5 } },
        { type: 'text', text: 'INPUTS', at: { x: 106, y: 54 }, style: { ...STYLE.textCaption, fontWeight: 600 } },
        { type: 'text', text: 'Glucose + O₂', at: { x: 106, y: 82 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 184, y: 72 }, to: { x: 232, y: 72 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'rect', x: 248, y: 32, width: 148, height: 80, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(5, 150, 105, 0.06)', strokeWidth: 1.5 } },
        { type: 'text', text: 'OUTPUTS', at: { x: 322, y: 54 }, style: { ...STYLE.textCaption, fontWeight: 600 } },
        { type: 'text', text: 'CO₂ + H₂O + ATP', at: { x: 322, y: 82 }, style: STYLE.textLabel },
        { type: 'text', text: 'Aerobic (with O₂)', at: { x: 322, y: 118 }, style: { ...STYLE.textCaption, fill: STYLE.success } },
        // Divider
        { type: 'line', from: { x: 32, y: 138 }, to: { x: 468, y: 138 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1 } },
        // Anaerobic
        { type: 'rect', x: 32, y: 152, width: 436, height: 80, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(217, 119, 6, 0.06)', strokeWidth: 1.5 } },
        { type: 'text', text: 'Anaerobic (no O₂): Glucose → Lactic acid + ATP', at: { x: 250, y: 188 }, style: STYLE.textLabel },
        { type: 'text', text: 'Less ATP than aerobic · lactic acid causes muscle fatigue', at: { x: 250, y: 238 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Homeostasis: negative feedback – labels clear of arrows */
export const homeostasis: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 500, height: 260 },
  viewBox: '0 0 500 260',
  layers: [
    {
      id: 'homeostasis',
      items: [
        { type: 'text', text: 'Stimulus', at: { x: 100, y: 58 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 100, y: 72 }, to: { x: 100, y: 108 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2 } },
        { type: 'text', text: 'Receptor', at: { x: 100, y: 128 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 128, y: 108 }, to: { x: 182, y: 108 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2 } },
        { type: 'rect', x: 198, y: 82, width: 112, height: 52, rx: 8, style: { stroke: STYLE.strokeMuted, fill: STYLE.bio.cell, strokeWidth: 1.5 } },
        { type: 'text', text: 'Coordination', at: { x: 254, y: 110 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 314, y: 108 }, to: { x: 368, y: 108 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2 } },
        { type: 'text', text: 'Effector', at: { x: 398, y: 108 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 398, y: 128 }, to: { x: 398, y: 168 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2 } },
        { type: 'text', text: 'Response', at: { x: 398, y: 188 }, style: STYLE.textCaption },
        { type: 'line', from: { x: 398, y: 198 }, to: { x: 100, y: 198 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1.5, dashArray: '6,4' } },
        { type: 'text', text: 'Negative feedback: return to normal', at: { x: 249, y: 238 }, style: { ...STYLE.textCaption, fontWeight: 600 } },
      ],
    },
  ],
};

/** Nervous system – spacious flow, labels above/below path */
export const nervous_system: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 520, height: 200 },
  viewBox: '0 0 520 200',
  layers: [
    {
      id: 'nervous',
      items: [
        { type: 'text', text: 'Stimulus', at: { x: 68, y: 98 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 118, y: 98 }, to: { x: 168, y: 98 }, headSize: 8, style: { stroke: STYLE.phys.primary, strokeWidth: 2 } },
        { type: 'text', text: 'Receptor', at: { x: 138, y: 78 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 192, y: 98 }, to: { x: 238, y: 98 }, headSize: 8, style: { stroke: STYLE.phys.primary, strokeWidth: 2 } },
        { type: 'rect', x: 238, y: 68, width: 108, height: 60, rx: 10, style: { stroke: STYLE.phys.primary, strokeWidth: 2, fill: 'rgba(14, 165, 233, 0.1)' } },
        { type: 'text', text: 'CNS', at: { x: 292, y: 100 }, style: { ...STYLE.textLabel, fill: STYLE.phys.primary } },
        { type: 'arrow', from: { x: 350, y: 98 }, to: { x: 400, y: 98 }, headSize: 8, style: { stroke: STYLE.phys.primary, strokeWidth: 2 } },
        { type: 'text', text: 'Motor neuron → Effector', at: { x: 458, y: 98 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Hormone action – labels clear of arrows */
export const hormone_action: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 500, height: 220 },
  viewBox: '0 0 500 220',
  layers: [
    {
      id: 'hormone',
      items: [
        { type: 'rect', x: 40, y: 56, width: 100, height: 88, rx: 10, style: { stroke: STYLE.warning, strokeWidth: 2, fill: 'rgba(217, 119, 6, 0.08)' } },
        { type: 'text', text: 'Gland', at: { x: 90, y: 102 }, style: { ...STYLE.textLabel, fill: STYLE.warning } },
        { type: 'arrow', from: { x: 144, y: 100 }, to: { x: 196, y: 100 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Hormone', at: { x: 168, y: 78 }, style: STYLE.textCaption },
        { type: 'text', text: 'Blood', at: { x: 250, y: 128 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 256, y: 100 }, to: { x: 308, y: 100 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'rect', x: 312, y: 56, width: 128, height: 88, rx: 10, style: { stroke: STYLE.success, strokeWidth: 2, fill: STYLE.bio.primaryLight } },
        { type: 'text', text: 'Target organ', at: { x: 376, y: 102 }, style: { ...STYLE.textLabel, fill: STYLE.success } },
      ],
    },
  ],
};

/** DNA structure – double helix, base pairs A–T and G–C (complementary pairing) */
export const dna_structure: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 440, height: 220 },
  viewBox: '0 0 440 220',
  layers: [
    {
      id: 'dna',
      items: [
        // Sugar-phosphate backbones
        { type: 'polyline', points: [{ x: 70, y: 48 }, { x: 115, y: 85 }, { x: 160, y: 48 }, { x: 220, y: 85 }, { x: 280, y: 48 }, { x: 325, y: 85 }, { x: 370, y: 48 }], style: { stroke: STYLE.stroke, fill: 'none', strokeWidth: 2.5 } },
        { type: 'polyline', points: [{ x: 70, y: 152 }, { x: 115, y: 115 }, { x: 160, y: 152 }, { x: 220, y: 115 }, { x: 280, y: 152 }, { x: 325, y: 115 }, { x: 370, y: 152 }], style: { stroke: STYLE.stroke, fill: 'none', strokeWidth: 2.5 } },
        // Base pairs
        { type: 'line', from: { x: 115, y: 85 }, to: { x: 115, y: 115 }, style: { stroke: STYLE.chem.primary, strokeWidth: 2 } },
        { type: 'line', from: { x: 220, y: 85 }, to: { x: 220, y: 115 }, style: { stroke: STYLE.chem.primary, strokeWidth: 2 } },
        { type: 'line', from: { x: 325, y: 85 }, to: { x: 325, y: 115 }, style: { stroke: STYLE.chem.primary, strokeWidth: 2 } },
        { type: 'text', text: 'A–T', at: { x: 115, y: 102 }, style: { ...STYLE.textLabel, fontSize: 11, fill: STYLE.chem.primary } },
        { type: 'text', text: 'G–C', at: { x: 220, y: 102 }, style: { ...STYLE.textLabel, fontSize: 11, fill: STYLE.chem.primary } },
        { type: 'text', text: 'T–A', at: { x: 325, y: 102 }, style: { ...STYLE.textLabel, fontSize: 11, fill: STYLE.chem.primary } },
        { type: 'text', text: 'Sugar–phosphate backbone', at: { x: 220, y: 28 }, style: STYLE.textTiny },
        { type: 'text', text: 'Base pairs: A bonds with T, G bonds with C', at: { x: 220, y: 195 }, style: { ...STYLE.textCaption, fontWeight: 600 } },
      ],
    },
  ],
};

/** Genetic inheritance: Punnett square – padded, clean grid */
export const genetic_inheritance: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 380, height: 260 },
  viewBox: '0 0 380 260',
  layers: [
    {
      id: 'punnett',
      items: [
        { type: 'text', text: 'A', at: { x: 168, y: 58 }, style: STYLE.textCaption },
        { type: 'text', text: 'a', at: { x: 258, y: 58 }, style: STYLE.textCaption },
        { type: 'text', text: 'A', at: { x: 108, y: 108 }, style: STYLE.textCaption },
        { type: 'text', text: 'a', at: { x: 108, y: 168 }, style: STYLE.textCaption },
        { type: 'rect', x: 128, y: 72, width: 172, height: 120, rx: 10, style: { stroke: STYLE.stroke, strokeWidth: 2, fill: 'none' } },
        { type: 'line', from: { x: 214, y: 72 }, to: { x: 214, y: 192 }, style: { stroke: STYLE.stroke, strokeWidth: 1.5 } },
        { type: 'line', from: { x: 128, y: 132 }, to: { x: 300, y: 132 }, style: { stroke: STYLE.stroke, strokeWidth: 1.5 } },
        { type: 'text', text: 'AA', at: { x: 168, y: 108 }, style: { ...STYLE.textLabel, fill: STYLE.chem.primary } },
        { type: 'text', text: 'Aa', at: { x: 258, y: 108 }, style: STYLE.textLabel },
        { type: 'text', text: 'Aa', at: { x: 168, y: 168 }, style: STYLE.textLabel },
        { type: 'text', text: 'aa', at: { x: 258, y: 168 }, style: STYLE.textLabel },
        { type: 'text', text: 'Punnett square', at: { x: 214, y: 238 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Natural selection */
export const natural_selection: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 440, height: 180 },
  viewBox: '0 0 440 180',
  layers: [
    {
      id: 'evolution',
      items: [
        { type: 'circle', cx: 58, cy: 82, r: 10, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 75, cy: 92, r: 12, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 52, cy: 98, r: 8, style: { stroke: STYLE.bio.primary, fill: STYLE.bio.primaryLight, strokeWidth: 1.5 } },
        { type: 'text', text: 'Variation', at: { x: 62, y: 122 }, style: { ...STYLE.textCaption, fill: STYLE.bio.primary } },
        { type: 'arrow', from: { x: 92, y: 88 }, to: { x: 138, y: 88 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Selection', at: { x: 198, y: 88 }, style: { ...STYLE.textLabel, fill: STYLE.bio.primary } },
        { type: 'arrow', from: { x: 248, y: 88 }, to: { x: 292, y: 88 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Survival', at: { x: 318, y: 88 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 358, y: 88 }, to: { x: 402, y: 88 }, headSize: 10, style: { stroke: STYLE.success, strokeWidth: 2.5 } },
        { type: 'text', text: 'Reproduce', at: { x: 392, y: 108 }, style: { ...STYLE.textCaption, fill: STYLE.success } },
      ],
    },
  ],
};

/** Ecosystem: food web – energy flow direction, labels below shapes */
export const ecosystem: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 480, height: 260 },
  viewBox: '0 0 480 260',
  layers: [
    {
      id: 'ecosystem',
      items: [
        { type: 'circle', cx: 240, cy: 52, r: 28, style: { stroke: STYLE.bio.primary, strokeWidth: 2, fill: STYLE.bio.primaryLight } },
        { type: 'text', text: 'Producer', at: { x: 240, y: 58 }, style: { ...STYLE.textCaption, fill: STYLE.bio.primary } },
        { type: 'arrow', from: { x: 228, y: 78 }, to: { x: 128, y: 118 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 252, y: 78 }, to: { x: 352, y: 118 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2 } },
        { type: 'circle', cx: 128, cy: 138, r: 24, style: { stroke: STYLE.warning, strokeWidth: 2, fill: 'rgba(217, 119, 6, 0.15)' } },
        { type: 'text', text: 'Primary consumer', at: { x: 128, y: 178 }, style: STYLE.textTiny },
        { type: 'circle', cx: 352, cy: 138, r: 24, style: { stroke: STYLE.warning, strokeWidth: 2, fill: 'rgba(217, 119, 6, 0.15)' } },
        { type: 'text', text: 'Primary consumer', at: { x: 352, y: 178 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 152, y: 158 }, to: { x: 212, y: 198 }, headSize: 8, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'arrow', from: { x: 328, y: 158 }, to: { x: 268, y: 198 }, headSize: 8, style: { stroke: STYLE.warning, strokeWidth: 2 } },
        { type: 'circle', cx: 240, cy: 208, r: 22, style: { stroke: STYLE.danger, strokeWidth: 2, fill: 'rgba(220, 38, 38, 0.12)' } },
        { type: 'text', text: 'Secondary consumer', at: { x: 240, y: 238 }, style: STYLE.textTiny },
        { type: 'text', text: 'Energy flows down the chain', at: { x: 240, y: 248 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Carbon cycle – labels offset from arrows */
export const carbon_cycle: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 480, height: 260 },
  viewBox: '0 0 480 260',
  layers: [
    {
      id: 'carbon',
      items: [
        { type: 'ellipse', cx: 95, cy: 54, rx: 56, ry: 28, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(148, 163, 184, 0.08)' } },
        { type: 'text', text: 'CO₂ atmosphere', at: { x: 95, y: 60 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 118, y: 78 }, to: { x: 162, y: 108 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Photosynthesis', at: { x: 132, y: 92 }, style: STYLE.textTiny },
        { type: 'rect', x: 188, y: 98, width: 96, height: 60, rx: 10, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: STYLE.bio.primaryLight } },
        { type: 'text', text: 'Plants', at: { x: 236, y: 132 }, style: { ...STYLE.textCaption, fill: STYLE.bio.primary } },
        { type: 'arrow', from: { x: 288, y: 128 }, to: { x: 348, y: 82 }, headSize: 8, style: { stroke: STYLE.semantic.danger, strokeWidth: 2.5 } },
        { type: 'text', text: 'Respiration', at: { x: 308, y: 108 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 236, y: 162 }, to: { x: 236, y: 198 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2 } },
        { type: 'text', text: 'Decomposition', at: { x: 236, y: 232 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Stem cell differentiation – labels clear of circles and arrows */
export const stem_cell_differentiation: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 460, height: 220 },
  viewBox: '0 0 460 220',
  layers: [
    {
      id: 'stem',
      items: [
        { type: 'circle', cx: 100, cy: 98, r: 40, style: { stroke: STYLE.bio.primary, strokeWidth: 2, fill: STYLE.bio.primaryLight } },
        { type: 'text', text: 'Stem cell', at: { x: 100, y: 106 }, style: { ...STYLE.textLabel, fill: STYLE.bio.primary } },
        { type: 'arrow', from: { x: 144, y: 72 }, to: { x: 192, y: 72 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'arrow', from: { x: 144, y: 122 }, to: { x: 192, y: 122 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Mitosis', at: { x: 164, y: 52 }, style: { ...STYLE.textTiny, fill: STYLE.bio.primary } },
        { type: 'circle', cx: 248, cy: 72, r: 24, style: { stroke: STYLE.bio.primary, strokeWidth: 2, fill: STYLE.bio.primaryLight } },
        { type: 'circle', cx: 248, cy: 122, r: 24, style: { stroke: STYLE.success, strokeWidth: 2, fill: 'rgba(5, 150, 105, 0.12)' } },
        { type: 'text', text: 'Differentiation', at: { x: 164, y: 152 }, style: STYLE.textTiny },
        { type: 'text', text: 'Specialised cell', at: { x: 248, y: 178 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Monoclonal antibodies – boxes and labels spaced */
export const monoclonal_antibodies: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 520, height: 220 },
  viewBox: '0 0 520 220',
  layers: [
    {
      id: 'monoclonal',
      items: [
        { type: 'rect', x: 32, y: 56, width: 120, height: 88, rx: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2, fill: STYLE.bio.primaryLight } },
        { type: 'text', text: 'B-cell + Tumour', at: { x: 92, y: 102 }, style: { ...STYLE.textCaption, fill: STYLE.bio.primary } },
        { type: 'arrow', from: { x: 156, y: 100 }, to: { x: 212, y: 100 }, headSize: 10, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'rect', x: 228, y: 76, width: 100, height: 48, rx: 10, style: { stroke: STYLE.success, strokeWidth: 2, fill: 'rgba(5, 150, 105, 0.12)' } },
        { type: 'text', text: 'Hybridoma', at: { x: 278, y: 102 }, style: { ...STYLE.textCaption, fill: STYLE.success } },
        { type: 'arrow', from: { x: 332, y: 100 }, to: { x: 388, y: 100 }, headSize: 10, style: { stroke: STYLE.success, strokeWidth: 2.5 } },
        { type: 'text', text: 'Identical antibodies', at: { x: 448, y: 100 }, style: { ...STYLE.textCaption, fill: STYLE.success } },
      ],
    },
  ],
};

/** Photosynthesis light graph */
export const photosynthesis_light_graph: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 380, height: 220 },
  viewBox: '0 0 380 220',
  layers: [
    {
      id: 'graph',
      items: [
        { type: 'line', from: { x: 55, y: 172 }, to: { x: 325, y: 172 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'line', from: { x: 55, y: 172 }, to: { x: 55, y: 35 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'polyline', points: [{ x: 55, y: 172 }, { x: 128, y: 108 }, { x: 212, y: 58 }, { x: 296, y: 52 }, { x: 325, y: 52 }], style: { stroke: STYLE.bio.primary, fill: 'none', strokeWidth: 2.5 } },
        { type: 'text', text: 'Rate', at: { x: 28, y: 102 }, style: { ...STYLE.textCaption, textAnchor: 'middle' } },
        { type: 'text', text: 'Light intensity', at: { x: 190, y: 198 }, style: STYLE.textLabel },
        { type: 'text', text: 'Limiting factor', at: { x: 296, y: 78 }, style: { ...STYLE.textTiny, fill: STYLE.bio.primary } },
      ],
    },
  ],
};

/** Thyroxine feedback */
export const thyroxine_feedback: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 440, height: 180 },
  viewBox: '0 0 440 180',
  layers: [
    {
      id: 'thyroxine',
      items: [
        { type: 'text', text: 'Low thyroxine', at: { x: 88, y: 88 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 142, y: 88 }, to: { x: 186, y: 88 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Pituitary (TSH)', at: { x: 218, y: 72 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 272, y: 88 }, to: { x: 316, y: 88 }, headSize: 8, style: { stroke: STYLE.bio.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Thyroid', at: { x: 352, y: 72 }, style: STYLE.textCaption },
        { type: 'text', text: 'Thyroxine ↑', at: { x: 352, y: 102 }, style: { ...STYLE.textCaption, fill: STYLE.success } },
        { type: 'line', from: { x: 352, y: 118 }, to: { x: 88, y: 118 }, style: { stroke: STYLE.strokeLight, strokeWidth: 1.5, dashArray: '6,4' } },
        { type: 'text', text: 'Negative feedback', at: { x: 220, y: 142 }, style: { ...STYLE.textCaption, fontWeight: 600 } },
      ],
    },
  ],
};

/** Genetic engineering – Protein label below box */
export const genetic_engineering: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 500, height: 200 },
  viewBox: '0 0 500 200',
  layers: [
    {
      id: 'genetic',
      items: [
        { type: 'rect', x: 32, y: 56, width: 80, height: 56, rx: 10, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: STYLE.chem.primaryLight } },
        { type: 'text', text: 'Gene', at: { x: 72, y: 88 }, style: { ...STYLE.textCaption, fill: STYLE.chem.primary } },
        { type: 'arrow', from: { x: 116, y: 84 }, to: { x: 156, y: 84 }, headSize: 8, style: { stroke: STYLE.chem.primary, strokeWidth: 2.5 } },
        { type: 'rect', x: 164, y: 56, width: 88, height: 56, rx: 10, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(251, 191, 36, 0.1)' } },
        { type: 'text', text: 'Vector', at: { x: 208, y: 88 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 256, y: 84 }, to: { x: 296, y: 84 }, headSize: 8, style: { stroke: STYLE.chem.primary, strokeWidth: 2.5 } },
        { type: 'rect', x: 304, y: 56, width: 96, height: 56, rx: 10, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(148, 163, 184, 0.1)' } },
        { type: 'text', text: 'Host cell', at: { x: 352, y: 88 }, style: STYLE.textCaption },
        { type: 'arrow', from: { x: 404, y: 84 }, to: { x: 436, y: 84 }, headSize: 8, style: { stroke: STYLE.success, strokeWidth: 2.5 } },
        { type: 'rect', x: 436, y: 62, width: 44, height: 44, rx: 8, style: { stroke: STYLE.success, strokeWidth: 2, fill: 'rgba(5, 150, 105, 0.12)' } },
        { type: 'text', text: 'Protein', at: { x: 458, y: 132 }, style: { ...STYLE.textCaption, fill: STYLE.success } },
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
  size: { width: 260, height: 260 },
  viewBox: '0 0 260 260',
  layers: [
    {
      id: 'bohr',
      items: [
        { type: 'circle', cx: 130, cy: 130, r: 75, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: 'none' } },
        { type: 'circle', cx: 130, cy: 130, r: 48, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: 'none' } },
        { type: 'circle', cx: 130, cy: 130, r: 20, style: { stroke: STYLE.danger, strokeWidth: 2, fill: 'rgba(220, 38, 38, 0.2)' } },
        { type: 'circle', cx: 130, cy: 52, r: 8, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 190, cy: 130, r: 8, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 130, cy: 208, r: 8, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 70, cy: 130, r: 8, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'text', text: 'n=1', at: { x: 130, y: 48 }, style: STYLE.textTiny },
        { type: 'text', text: 'n=2', at: { x: 130, y: 92 }, style: STYLE.textTiny },
        { type: 'text', text: 'Nucleus', at: { x: 130, y: 242 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Ionic/covalent bonding */
export const ionic_covalent_bonding: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 400, height: 180 },
  viewBox: '0 0 400 180',
  layers: [
    {
      id: 'bonding',
      items: [
        { type: 'rect', x: 28, y: 44, width: 148, height: 80, rx: 10, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(220, 38, 38, 0.06)' } },
        { type: 'text', text: 'Na⁺', at: { x: 72, y: 78 }, style: STYLE.textLabel },
        { type: 'arrow', from: { x: 98, y: 84 }, to: { x: 132, y: 84 }, headSize: 8, style: { stroke: STYLE.chem.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Cl⁻', at: { x: 152, y: 78 }, style: STYLE.textLabel },
        { type: 'text', text: 'Ionic: electron transfer', at: { x: 102, y: 132 }, style: STYLE.textCaption },
        { type: 'rect', x: 224, y: 44, width: 148, height: 80, rx: 10, style: { stroke: STYLE.strokeMuted, strokeWidth: 1.5, fill: 'rgba(5, 150, 105, 0.06)' } },
        { type: 'circle', cx: 278, cy: 72, r: 20, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: 'none' } },
        { type: 'circle', cx: 318, cy: 72, r: 20, style: { stroke: STYLE.chem.primary, strokeWidth: 2, fill: 'none' } },
        { type: 'line', from: { x: 294, y: 66 }, to: { x: 302, y: 78 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'text', text: 'Covalent: shared pair', at: { x: 298, y: 132 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Free body diagram */
export const free_body_diagram: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 340, height: 240 },
  viewBox: '0 0 340 240',
  layers: [
    {
      id: 'fbd',
      items: [
        { type: 'rect', x: 110, y: 85, width: 120, height: 70, rx: 10, style: { stroke: STYLE.stroke, strokeWidth: 2, fill: 'rgba(148, 163, 184, 0.1)' } },
        { type: 'arrow', from: { x: 170, y: 85 }, to: { x: 170, y: 40 }, headSize: 10, style: { stroke: STYLE.danger, strokeWidth: 2.5 } },
        { type: 'arrow', from: { x: 170, y: 155 }, to: { x: 170, y: 115 }, headSize: 10, style: { stroke: STYLE.phys.primary, strokeWidth: 2.5 } },
        { type: 'arrow', from: { x: 170, y: 155 }, to: { x: 170, y: 200 }, headSize: 10, style: { stroke: STYLE.success, strokeWidth: 2.5 } },
        { type: 'arrow', from: { x: 110, y: 120 }, to: { x: 65, y: 120 }, headSize: 10, style: { stroke: STYLE.phys.primary, strokeWidth: 2.5 } },
        { type: 'arrow', from: { x: 230, y: 120 }, to: { x: 275, y: 120 }, headSize: 10, style: { stroke: STYLE.warning, strokeWidth: 2.5 } },
        { type: 'text', text: 'F (applied)', at: { x: 170, y: 32 }, style: STYLE.textCaption },
        { type: 'text', text: 'N', at: { x: 170, y: 118 }, style: STYLE.textCaption },
        { type: 'text', text: 'W', at: { x: 170, y: 212 }, style: STYLE.textCaption },
        { type: 'text', text: 'Friction', at: { x: 278, y: 112 }, style: STYLE.textCaption },
      ],
    },
  ],
};

/** Particle model */
export const particle_model: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 440, height: 140 },
  viewBox: '0 0 440 140',
  layers: [
    {
      id: 'particle',
      items: [
        // Solid
        { type: 'rect', x: 24, y: 44, width: 118, height: 82, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(124, 58, 237, 0.04)', strokeWidth: 1.5 } },
        { type: 'text', text: 'Solid', at: { x: 83, y: 35 }, style: { ...STYLE.textLabel, fill: STYLE.chem.primary } },
        { type: 'circle', cx: 55, cy: 75, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 88, cy: 68, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 75, cy: 105, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'text', text: 'Vibrate in place', at: { x: 83, y: 132 }, style: STYLE.textTiny },
        // Liquid
        { type: 'rect', x: 158, y: 44, width: 118, height: 82, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(124, 58, 237, 0.04)', strokeWidth: 1.5 } },
        { type: 'text', text: 'Liquid', at: { x: 217, y: 35 }, style: STYLE.textLabel },
        { type: 'circle', cx: 195, cy: 78, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 230, cy: 72, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 218, cy: 102, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'text', text: 'Slide past each other', at: { x: 217, y: 132 }, style: STYLE.textTiny },
        // Gas
        { type: 'rect', x: 292, y: 44, width: 124, height: 82, rx: 10, style: { stroke: STYLE.strokeMuted, fill: 'rgba(124, 58, 237, 0.04)', strokeWidth: 1.5 } },
        { type: 'text', text: 'Gas', at: { x: 354, y: 35 }, style: STYLE.textLabel },
        { type: 'circle', cx: 318, cy: 62, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 365, cy: 88, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'circle', cx: 342, cy: 112, r: 9, style: { stroke: STYLE.chem.primary, fill: STYLE.chem.primaryLight, strokeWidth: 1.5 } },
        { type: 'text', text: 'Move freely', at: { x: 354, y: 132 }, style: STYLE.textTiny },
      ],
    },
  ],
};

/** Energy profile */
export const energy_profile: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 380, height: 220 },
  viewBox: '0 0 380 220',
  layers: [
    {
      id: 'energy',
      items: [
        { type: 'line', from: { x: 55, y: 170 }, to: { x: 325, y: 170 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'line', from: { x: 55, y: 170 }, to: { x: 55, y: 35 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'polyline', points: [{ x: 55, y: 125 }, { x: 130, y: 55 }, { x: 215, y: 95 }, { x: 300, y: 45 }], style: { stroke: STYLE.chem.primary, fill: 'none', strokeWidth: 2.5 } },
        { type: 'text', text: 'Energy', at: { x: 28, y: 102 }, style: { ...STYLE.textCaption, textAnchor: 'middle' } },
        { type: 'text', text: 'Progress of reaction', at: { x: 190, y: 198 }, style: STYLE.textCaption },
        { type: 'text', text: 'Reactants', at: { x: 55, y: 142 }, style: STYLE.textCaption },
        { type: 'text', text: 'Products', at: { x: 300, y: 58 }, style: STYLE.textCaption },
        { type: 'text', text: 'Ea', at: { x: 130, y: 88 }, style: { ...STYLE.textCaption, fill: STYLE.chem.primary } },
      ],
    },
  ],
};

/** Flame test colours */
export const flame_test_colours: CustomDiagramBlueprint = {
  version: 1,
  size: { width: 440, height: 180 },
  viewBox: '0 0 440 180',
  layers: [
    {
      id: 'flame',
      items: [
        { type: 'text', text: 'Li', at: { x: 52, y: 72 }, style: { ...STYLE.textLabel, fill: STYLE.chem.primary } },
        { type: 'polygon', points: [{ x: 52, y: 152 }, { x: 34, y: 98 }, { x: 70, y: 98 }], style: { stroke: STYLE.semantic.danger, strokeWidth: 1.5, fill: 'rgba(220, 38, 38, 0.4)' } },
        { type: 'text', text: 'Na', at: { x: 132, y: 72 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 132, y: 152 }, { x: 114, y: 98 }, { x: 150, y: 98 }], style: { stroke: STYLE.semantic.warning, strokeWidth: 1.5, fill: 'rgba(217, 119, 6, 0.45)' } },
        { type: 'text', text: 'K', at: { x: 212, y: 72 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 212, y: 152 }, { x: 194, y: 98 }, { x: 230, y: 98 }], style: { stroke: STYLE.chem.primary, strokeWidth: 1.5, fill: STYLE.chem.primaryLight } },
        { type: 'text', text: 'Ca', at: { x: 292, y: 72 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 292, y: 152 }, { x: 274, y: 98 }, { x: 310, y: 98 }], style: { stroke: STYLE.semantic.danger, strokeWidth: 1.5, fill: 'rgba(220, 38, 38, 0.35)' } },
        { type: 'text', text: 'Cu', at: { x: 368, y: 72 }, style: STYLE.textLabel },
        { type: 'polygon', points: [{ x: 368, y: 152 }, { x: 350, y: 98 }, { x: 386, y: 98 }], style: { stroke: STYLE.semantic.success, strokeWidth: 1.5, fill: 'rgba(5, 150, 105, 0.35)' } },
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
  size: { width: 440, height: 180 },
  viewBox: '0 0 440 180',
  layers: [
    {
      id: 'nuclear',
      items: [
        { type: 'circle', cx: 85, cy: 88, r: 28, style: { stroke: STYLE.semantic.danger, strokeWidth: 2, fill: 'rgba(220, 38, 38, 0.2)' } },
        { type: 'text', text: 'U-235', at: { x: 85, y: 122 }, style: STYLE.textCaption },
        { type: 'circle', cx: 112, cy: 72, r: 6, style: { stroke: STYLE.stroke, fill: 'rgba(71, 85, 105, 0.5)', strokeWidth: 1.5 } },
        { type: 'text', text: 'n', at: { x: 112, y: 75 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 116, y: 88 }, to: { x: 158, y: 88 }, headSize: 10, style: { stroke: STYLE.phys.primary, strokeWidth: 2.5 } },
        { type: 'text', text: 'Fission', at: { x: 132, y: 58 }, style: { ...STYLE.textCaption, fill: STYLE.phys.primary } },
        { type: 'circle', cx: 218, cy: 65, r: 18, style: { stroke: STYLE.semantic.success, strokeWidth: 2, fill: 'rgba(5, 150, 105, 0.2)' } },
        { type: 'circle', cx: 218, cy: 108, r: 18, style: { stroke: STYLE.semantic.success, strokeWidth: 2, fill: 'rgba(5, 150, 105, 0.2)' } },
        { type: 'text', text: 'Fusion', at: { x: 338, y: 58 }, style: STYLE.textCaption },
        { type: 'circle', cx: 318, cy: 88, r: 14, style: { stroke: STYLE.phys.primary, strokeWidth: 2, fill: STYLE.phys.primaryLight } },
        { type: 'circle', cx: 352, cy: 88, r: 14, style: { stroke: STYLE.phys.primary, strokeWidth: 2, fill: STYLE.phys.primaryLight } },
        { type: 'arrow', from: { x: 334, y: 88 }, to: { x: 368, y: 88 }, headSize: 8, style: { stroke: STYLE.phys.primary, strokeWidth: 2.5 } },
        { type: 'circle', cx: 398, cy: 88, r: 20, style: { stroke: STYLE.semantic.success, strokeWidth: 2, fill: 'rgba(5, 150, 105, 0.2)' } },
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
  size: { width: 360, height: 160 },
  viewBox: '0 0 360 160',
  layers: [
    {
      id: 'circuit',
      items: [
        { type: 'rect', x: 28, y: 52, width: 52, height: 52, rx: 8, style: { stroke: STYLE.phys.primary, strokeWidth: 2, fill: 'rgba(14, 165, 233, 0.1)' } },
        { type: 'text', text: 'Cell', at: { x: 54, y: 82 }, style: { ...STYLE.textCaption, fill: STYLE.phys.primary } },
        { type: 'line', from: { x: 80, y: 78 }, to: { x: 128, y: 78 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'rect', x: 128, y: 48, width: 90, height: 60, rx: 8, style: { stroke: STYLE.stroke, strokeWidth: 2, fill: 'rgba(148, 163, 184, 0.12)' } },
        { type: 'text', text: 'Component', at: { x: 173, y: 78 }, style: STYLE.textCaption },
        { type: 'line', from: { x: 218, y: 78 }, to: { x: 268, y: 78 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'line', from: { x: 268, y: 78 }, to: { x: 268, y: 118 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'line', from: { x: 268, y: 118 }, to: { x: 80, y: 118 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'line', from: { x: 80, y: 118 }, to: { x: 80, y: 78 }, style: { stroke: STYLE.stroke, strokeWidth: 2.5 } },
        { type: 'text', text: 'Current same in series', at: { x: 173, y: 148 }, style: STYLE.textCaption },
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
  size: { width: 340, height: 180 },
  viewBox: '0 0 340 180',
  layers: [
    {
      id: 'electrolysis',
      items: [
        { type: 'rect', x: 28, y: 32, width: 56, height: 112, rx: 8, style: { stroke: STYLE.phys.primary, strokeWidth: 2, fill: 'rgba(14, 165, 233, 0.08)' } },
        { type: 'text', text: 'Battery', at: { x: 56, y: 92 }, style: { ...STYLE.textCaption, fill: STYLE.phys.primary } },
        { type: 'rect', x: 115, y: 24, width: 36, height: 128, rx: 6, style: { stroke: STYLE.phys.secondary, strokeWidth: 2, fill: 'rgba(59, 130, 246, 0.1)' } },
        { type: 'rect', x: 151, y: 24, width: 36, height: 128, rx: 6, style: { stroke: STYLE.danger, strokeWidth: 2, fill: 'rgba(220, 38, 38, 0.1)' } },
        { type: 'text', text: 'Cathode (−)', at: { x: 133, y: 168 }, style: { ...STYLE.textCaption, fill: STYLE.phys.secondary } },
        { type: 'text', text: 'Anode (+)', at: { x: 207, y: 168 }, style: { ...STYLE.textCaption, fill: STYLE.danger } },
        { type: 'arrow', from: { x: 115, y: 72 }, to: { x: 151, y: 72 }, headSize: 8, style: { stroke: STYLE.danger, strokeWidth: 2.5 } },
        { type: 'text', text: 'Cations →', at: { x: 128, y: 58 }, style: STYLE.textTiny },
        { type: 'arrow', from: { x: 187, y: 95 }, to: { x: 151, y: 95 }, headSize: 8, style: { stroke: STYLE.phys.primary, strokeWidth: 2.5 } },
        { type: 'text', text: '← Anions', at: { x: 165, y: 108 }, style: STYLE.textTiny },
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

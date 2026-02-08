import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';
import { diagramStyleBlock } from '../designTokens';

/**
 * Generic triangle: three vertices A, B, C with configurable positions or side lengths.
 * Uses side lengths a (BC), b (AC), c (AB) to place vertices; default is 3-4-5 style.
 */
export const triangle: DiagramEngineTemplate = {
  templateId: 'math.geometry.triangle.v1',
  title: 'Triangle',
  description: 'Generic triangle with labeled vertices and optional side lengths',
  category: 'geometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 }
    },
    values: {
      sideAB: { default: 5, type: 'number', min: 1, max: 50 },
      sideBC: { default: 4, type: 'number', min: 1, max: 50 },
      sideAC: { default: 3, type: 'number', min: 1, max: 50 },
      unit: { default: 'cm', type: 'string', min: 0, max: 10 }
    },
    visibility: {
      showVertexLabels: { default: true },
      showSideLengths: { default: true },
      showSideAB: { default: true },
      showSideBC: { default: true },
      showSideAC: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 620;
    const height = 500;

    const labelA = params.labels?.A ?? 'A';
    const labelB = params.labels?.B ?? 'B';
    const labelC = params.labels?.C ?? 'C';

    const c = Number(params.values?.sideAB) || 5;
    const a = Number(params.values?.sideBC) || 4;
    const b = Number(params.values?.sideAC) || 3;
    const unit = String(params.values?.unit ?? 'cm');

    const showVertexLabels = params.visibility?.showVertexLabels !== false;
    const showSideLengths = params.visibility?.showSideLengths !== false;
    const showSideAB = params.visibility?.showSideAB !== false;
    const showSideBC = params.visibility?.showSideBC !== false;
    const showSideAC = params.visibility?.showSideAC !== false;

    // Place A at origin, B along x-axis, C above such that distances match
    const scale = 42;
    const ax = 100;
    const ay = height - 100;
    const bx = ax + c * scale;
    const by = ay;

    const cosA = (b * b + c * c - a * a) / (2 * b * c);
    const angleA = Math.acos(Math.max(-1, Math.min(1, cosA)));
    const cx = ax + b * scale * Math.cos(angleA);
    const cy = ay - b * scale * Math.sin(angleA);

    const midAB = { x: (ax + bx) / 2, y: (ay + by) / 2 };
    const midBC = { x: (bx + cx) / 2, y: (by + cy) / 2 };
    const midAC = { x: (ax + cx) / 2, y: (ay + cy) / 2 };
    const sideOffset = 32;
    const sideABStr = `${c} ${unit}`;
    const sideBCStr = `${a} ${unit}`;
    const sideACStr = `${b} ${unit}`;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
${diagramStyleBlock()}
  </style>
  <g id="grp:main">
    <polygon id="shape:triangle" points="${ax},${ay} ${bx},${by} ${cx},${cy}" class="diagram-triangle"/>
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-triangle"/>
    <line id="ln:BC" x1="${bx}" y1="${by}" x2="${cx}" y2="${cy}" class="diagram-triangle"/>
    <line id="ln:AC" x1="${ax}" y1="${ay}" x2="${cx}" y2="${cy}" class="diagram-triangle"/>
    ${showVertexLabels ? `
    <circle id="pt:A" cx="${ax}" cy="${ay}" r="5" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="5" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="5" class="diagram-point"/>
    <text id="txt:A" x="${ax - 16}" y="${ay + 6}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 14}" y="${by + 6}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx + 14}" y="${cy - 8}" class="diagram-text">${labelC}</text>
    ` : ''}
    ${showSideLengths && showSideAB ? `
    <text id="txt:sideAB" x="${midAB.x}" y="${midAB.y + sideOffset}" class="diagram-text-side">${sideABStr}</text>
    ` : ''}${showSideLengths && showSideBC ? `
    <text id="txt:sideBC" x="${midBC.x + sideOffset}" y="${midBC.y}" class="diagram-text-side">${sideBCStr}</text>
    ` : ''}${showSideLengths && showSideAC ? `
    <text id="txt:sideAC" x="${midAC.x - sideOffset}" y="${midAC.y}" class="diagram-text-side">${sideACStr}</text>
    ` : ''}
  </g>
</svg>`;

    return { svg, width, height, warnings: [] };
  }
};

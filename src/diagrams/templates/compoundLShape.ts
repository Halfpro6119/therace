import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const compoundLShape: DiagramEngineTemplate = {
  templateId: 'math.geometry.compound_lshape.v1',
  title: 'L-Shape Compound Shape',
  description: 'L-shaped rectilinear compound shape with side lengths labeled',
  category: 'geometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 },
      D: { default: 'D', maxLen: 3 },
      E: { default: 'E', maxLen: 3 },
      F: { default: 'F', maxLen: 3 }
    },
    values: {
      width1: { default: 8, type: 'number', min: 1, max: 50 },
      height1: { default: 4, type: 'number', min: 1, max: 50 },
      width2: { default: 4, type: 'number', min: 1, max: 50 },
      height2: { default: 6, type: 'number', min: 1, max: 50 },
      unit: { default: 'cm', type: 'string', min: 0, max: 10 }
    },
    visibility: {
      showSideLengths: { default: true },
      showVertexLabels: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    // Big shape, numbers only, clean placement
    const width = 820;
    const height = 640;
    const scale = 36;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';
    const labelD = params.labels?.D || 'D';
    const labelE = params.labels?.E || 'E';
    const labelF = params.labels?.F || 'F';

    const width1 = Number(params.values?.width1) || 8;
    const height1 = Number(params.values?.height1) || 4;
    const width2 = Number(params.values?.width2) || 4;
    const height2 = Number(params.values?.height2) || 6;
    const unit = String(params.values?.unit || 'cm');

    const showSideLengths = params.visibility?.showSideLengths !== false;
    const showVertexLabels = params.visibility?.showVertexLabels !== false;

    const offsetX = 160;
    const offsetY = 320;

    // L-shape coordinates (outer rectangle with inner cutout)
    // A top-left, clockwise: A -> B -> C -> D -> E -> F -> A
    const ax = offsetX;
    const ay = offsetY - height1 * scale;
    const bx = offsetX + width1 * scale;
    const by = offsetY - height1 * scale;
    const cx = offsetX + width1 * scale;
    const cy = offsetY;
    const dx = offsetX + width2 * scale;
    const dy = offsetY;
    const ex = offsetX + width2 * scale;
    const ey = offsetY + (height2 - height1) * scale;
    const fx = offsetX;
    const fy = offsetY + (height2 - height1) * scale;

    // Numbers only (no segment labels) — one value per side
    const sideAB = `${width1} ${unit}`;
    const sideBC = `${height1} ${unit}`;
    const sideCD = `${width1 - width2} ${unit}`;
    const sideDE = `${height2 - height1} ${unit}`;
    const sideEF = `${width2} ${unit}`;
    const sideFA = `${height2} ${unit}`;

    const sideOffset = 44;
    const vertexOffset = 30;
    // CD horizontal: number above the segment
    const sideCDx = (cx + dx) / 2;
    const sideCDy = cy - 26;
    // DE vertical: number to the right, centered on DE
    const sideDEx = dx + sideOffset + 12;
    const sideDEy = (dy + ey) / 2;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-shape { fill: rgba(100, 116, 139, 0.08); stroke: #64748b; stroke-width: 2; }
    .diagram-point { fill: #64748b; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-side { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: normal; fill: #94a3b8; text-anchor: middle; letter-spacing: 0.02em; }
    .diagram-text-side-vert { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: normal; fill: #94a3b8; text-anchor: start; letter-spacing: 0.02em; }
    .diagram-text-side-vert-left { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: normal; fill: #94a3b8; text-anchor: end; letter-spacing: 0.02em; }
  </style>

  <g id="grp:main">
    <polygon id="poly:lshape" points="${ax},${ay} ${bx},${by} ${cx},${cy} ${dx},${dy} ${ex},${ey} ${fx},${fy}" class="diagram-shape"/>

    ${showVertexLabels ? `
    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="4" class="diagram-point"/>
    <circle id="pt:D" cx="${dx}" cy="${dy}" r="4" class="diagram-point"/>
    <circle id="pt:E" cx="${ex}" cy="${ey}" r="4" class="diagram-point"/>
    <circle id="pt:F" cx="${fx}" cy="${fy}" r="4" class="diagram-point"/>

    <text id="txt:A" x="${ax - vertexOffset}" y="${ay - 14}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 16}" y="${by - 14}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx + 16}" y="${cy + 8}" class="diagram-text">${labelC}</text>
    <text id="txt:D" x="${dx + 18}" y="${dy - 14}" class="diagram-text">${labelD}</text>
    <text id="txt:E" x="${ex + 16}" y="${ey + 32}" class="diagram-text">${labelE}</text>
    <text id="txt:F" x="${fx - vertexOffset}" y="${fy + 32}" class="diagram-text">${labelF}</text>
    ` : ''}

    ${showSideLengths ? `
    <text id="txt:sideAB" x="${(ax + bx) / 2}" y="${ay - sideOffset}" class="diagram-text-side">${sideAB}</text>
    <text id="txt:sideBC" x="${bx + sideOffset}" y="${(by + cy) / 2}" class="diagram-text-side-vert">${sideBC}</text>
    <text id="txt:sideCD" x="${sideCDx}" y="${sideCDy}" class="diagram-text-side">${sideCD}</text>
    <text id="txt:sideDE" x="${sideDEx}" y="${sideDEy}" class="diagram-text-side-vert">${sideDE}</text>
    <text id="txt:sideEF" x="${(ex + fx) / 2}" y="${ey + sideOffset + 18}" class="diagram-text-side">${sideEF}</text>
    <text id="txt:sideFA" x="${fx - sideOffset}" y="${(fy + ay) / 2}" class="diagram-text-side-vert-left">${sideFA}</text>
    ` : ''}
  </g>
</svg>`;

    return {
      svg,
      width,
      height,
      warnings: []
    };
  }
};

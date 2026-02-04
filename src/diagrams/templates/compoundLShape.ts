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
    const width = 500;
    const height = 400;
    const scale = 20;

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

    const offsetX = 100;
    const offsetY = 200;

    // L-shape coordinates (outer rectangle with inner cutout)
    // A is top-left, going clockwise: A -> B -> C -> D -> E -> F -> A
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

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-shape { fill: #1e40af; fill-opacity: 0.1; stroke: #60a5fa; stroke-width: 2; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-side { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #60a5fa; text-anchor: middle; }
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

    <text id="txt:A" x="${ax - 15}" y="${ay - 10}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 10}" y="${by - 10}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx + 10}" y="${cy + 5}" class="diagram-text">${labelC}</text>
    <text id="txt:D" x="${dx + 10}" y="${dy + 5}" class="diagram-text">${labelD}</text>
    <text id="txt:E" x="${ex + 10}" y="${ey + 20}" class="diagram-text">${labelE}</text>
    <text id="txt:F" x="${fx - 15}" y="${fy + 20}" class="diagram-text">${labelF}</text>
    ` : ''}

    ${showSideLengths ? `
    <text id="txt:sideAB" x="${(ax + bx) / 2}" y="${ay - 15}" class="diagram-text-side">${width1} ${unit}</text>
    <text id="txt:sideBC" x="${bx + 20}" y="${(by + cy) / 2}" class="diagram-text-side">${height1} ${unit}</text>
    <text id="txt:sideCD" x="${(cx + dx) / 2}" y="${cy + 20}" class="diagram-text-side">${width1 - width2} ${unit}</text>
    <text id="txt:sideDE" x="${dx + 20}" y="${(dy + ey) / 2}" class="diagram-text-side">${height2 - height1} ${unit}</text>
    <text id="txt:sideEF" x="${(ex + fx) / 2}" y="${ey + 35}" class="diagram-text-side">${width2} ${unit}</text>
    <text id="txt:sideFA" x="${fx - 20}" y="${(fy + ay) / 2}" class="diagram-text-side">${height2} ${unit}</text>
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

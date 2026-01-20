import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const quadrilateralAngles: DiagramEngineTemplate = {
  templateId: 'math.quadrilateral.angles.v1',
  title: 'Quadrilateral Angles',
  description: 'Four-sided shape with interior angles (sum = 360°)',
  category: 'geometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 },
      D: { default: 'D', maxLen: 3 }
    },
    values: {
      angleA: { default: 90, type: 'number', min: 1, max: 179 },
      angleB: { default: 90, type: 'number', min: 1, max: 179 },
      angleC: { default: 90, type: 'number', min: 1, max: 179 },
      angleD: { default: 90, type: 'number', min: 1, max: 179 }
    },
    visibility: {
      showAngleA: { default: true },
      showAngleB: { default: true },
      showAngleC: { default: true },
      showAngleD: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 400;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';
    const labelD = params.labels?.D || 'D';

    const angleA = Number(params.values?.angleA) || 90;
    const angleB = Number(params.values?.angleB) || 90;
    const angleC = Number(params.values?.angleC) || 90;
    const angleD = Number(params.values?.angleD) || 90;

    const showAngleA = params.visibility?.showAngleA !== false;
    const showAngleB = params.visibility?.showAngleB !== false;
    const showAngleC = params.visibility?.showAngleC !== false;
    const showAngleD = params.visibility?.showAngleD !== false;

    const ax = 100;
    const ay = 300;
    const bx = 400;
    const by = 300;
    const cx = 380;
    const cy = 100;
    const dx = 120;
    const dy = 100;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-fill { fill: #1e40af; fill-opacity: 0.1; stroke: #3b82f6; stroke-width: 2; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #3b82f6; }
  </style>

  <g id="grp:main">
    <polygon id="poly:quad" points="${ax},${ay} ${bx},${by} ${cx},${cy} ${dx},${dy}" class="diagram-fill"/>

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="4" class="diagram-point"/>
    <circle id="pt:D" cx="${dx}" cy="${dy}" r="4" class="diagram-point"/>

    <text id="txt:A" x="${ax - 20}" y="${ay + 5}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 10}" y="${by + 5}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx + 10}" y="${cy}" class="diagram-text">${labelC}</text>
    <text id="txt:D" x="${dx - 20}" y="${dy}" class="diagram-text">${labelD}</text>

    ${showAngleA ? `<text id="txt:angleA" x="${ax + 20}" y="${ay - 10}" class="diagram-text-angle">${angleA}°</text>` : ''}
    ${showAngleB ? `<text id="txt:angleB" x="${bx - 30}" y="${by - 10}" class="diagram-text-angle">${angleB}°</text>` : ''}
    ${showAngleC ? `<text id="txt:angleC" x="${cx - 30}" y="${cy + 20}" class="diagram-text-angle">${angleC}°</text>` : ''}
    ${showAngleD ? `<text id="txt:angleD" x="${dx + 20}" y="${dy + 20}" class="diagram-text-angle">${angleD}°</text>` : ''}
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

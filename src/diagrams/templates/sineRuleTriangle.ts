import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const sineRuleTriangle: DiagramEngineTemplate = {
  templateId: 'math.trig.sine_rule_triangle.v1',
  title: 'Sine Rule Triangle',
  description: 'Triangle with sides and angles for sine rule calculations',
  category: 'trigonometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 }
    },
    values: {
      sideA: { default: 8, type: 'number', min: 1, max: 100 },
      angleA: { default: 35, type: 'number', min: 1, max: 179 },
      angleB: { default: 72, type: 'number', min: 1, max: 179 },
      angleC: { default: 73, type: 'number', min: 1, max: 179 },
      sideB: { default: 0, type: 'number', min: 0, max: 100 },
      sideC: { default: 0, type: 'number', min: 0, max: 100 }
    },
    visibility: {
      showSideLengths: { default: true },
      showAngles: { default: true },
      showAngleArcs: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 400;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';

    const sideA = Number(params.values?.sideA) || 8;
    const angleA = Number(params.values?.angleA) || 35;
    const angleB = Number(params.values?.angleB) || 72;
    const angleC = Number(params.values?.angleC) || 73;
    const sideB = Number(params.values?.sideB) || 0;
    const sideC = Number(params.values?.sideC) || 0;

    const showSideLengths = params.visibility?.showSideLengths !== false;
    const showAngles = params.visibility?.showAngles !== false;
    const showAngleArcs = params.visibility?.showAngleArcs !== false;

    const scale = 20;
    const ax = 100;
    const ay = 300;

    // Place A at origin, side a extends horizontally to the right
    const bx = ax + sideA * scale;
    const by = ay;

    // Calculate C position using angle A and side b (or estimate from angles)
    const angleARad = (angleA * Math.PI) / 180;
    const angleBRad = (angleB * Math.PI) / 180;
    
    // Use law of sines to find side b if not provided
    const sideBVal = sideB > 0 ? sideB : (sideA * Math.sin(angleBRad)) / Math.sin(angleARad);
    
    const cx = ax + sideBVal * scale * Math.cos(angleARad);
    const cy = ay - sideBVal * scale * Math.sin(angleARad);

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-side { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #60a5fa; text-anchor: middle; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #f87171; font-weight: bold; }
    .diagram-arc { stroke: #f87171; stroke-width: 1.5; fill: none; }
  </style>

  <g id="grp:main">
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <line id="ln:BC" x1="${bx}" y1="${by}" x2="${cx}" y2="${cy}" class="diagram-line"/>
    <line id="ln:CA" x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" class="diagram-line"/>

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="4" class="diagram-point"/>

    <text id="txt:A" x="${ax - 20}" y="${ay + 20}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 10}" y="${by + 20}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx + 10}" y="${cy - 10}" class="diagram-text">${labelC}</text>

    ${showSideLengths ? `
    <text id="txt:sideA" x="${(ax + bx) / 2}" y="${ay + 25}" class="diagram-text-side">a = ${sideA}</text>
    <text id="txt:sideB" x="${(ax + cx) / 2 - 20}" y="${(ay + cy) / 2 - 10}" class="diagram-text-side">b = ${sideB > 0 ? sideB : '?'}</text>
    <text id="txt:sideC" x="${(bx + cx) / 2 + 20}" y="${(by + cy) / 2 - 10}" class="diagram-text-side">c = ${sideC > 0 ? sideC : '?'}</text>
    ` : ''}

    ${showAngleArcs ? `
    <path id="arc:A" d="M ${ax + 20} ${ay} A 20 20 0 0 1 ${ax + 20 * Math.cos(angleARad)} ${ay - 20 * Math.sin(angleARad)}" class="diagram-arc"/>
    <path id="arc:B" d="M ${bx - 20} ${by} A 20 20 0 0 1 ${bx - 20 * Math.cos(angleBRad)} ${by - 20 * Math.sin(angleBRad)}" class="diagram-arc"/>
    ` : ''}

    ${showAngles ? `
    <text id="txt:angleA" x="${ax + 30}" y="${ay - 10}" class="diagram-text-angle">${angleA}°</text>
    <text id="txt:angleB" x="${bx - 40}" y="${by - 10}" class="diagram-text-angle">${angleB}°</text>
    <text id="txt:angleC" x="${cx + 5}" y="${cy + 25}" class="diagram-text-angle">${angleC}°</text>
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

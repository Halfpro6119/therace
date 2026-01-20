import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const isoscelesTriangle: DiagramEngineTemplate = {
  templateId: 'math.triangle.isosceles.v1',
  title: 'Isosceles Triangle',
  description: 'Isosceles triangle with equal sides marked and base angles',
  category: 'geometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 }
    },
    values: {
      baseAngle: { default: 50, type: 'number', min: 1, max: 89 },
      apexAngle: { default: 80, type: 'number', min: 1, max: 178 }
    },
    visibility: {
      showEqualMarks: { default: true },
      showAngles: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 400;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';

    const baseAngle = Number(params.values?.baseAngle) || 50;
    const apexAngle = Number(params.values?.apexAngle) || 80;

    const showEqualMarks = params.visibility?.showEqualMarks !== false;
    const showAngles = params.visibility?.showAngles !== false;

    const ax = 100;
    const ay = 320;
    const bx = 400;
    const by = 320;
    const cx = 250;
    const cy = 80;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #3b82f6; }
    .diagram-equal-mark { stroke: #f87171; stroke-width: 2; }
  </style>

  <g id="grp:main">
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <line id="ln:AC" x1="${ax}" y1="${ay}" x2="${cx}" y2="${cy}" class="diagram-line"/>
    <line id="ln:BC" x1="${bx}" y1="${by}" x2="${cx}" y2="${cy}" class="diagram-line"/>

    ${showEqualMarks ? `
    <g id="grp:equal-marks">
      <line id="mk:eq1a" x1="160" y1="210" x2="170" y2="195" class="diagram-equal-mark"/>
      <line id="mk:eq1b" x1="170" y1="210" x2="180" y2="195" class="diagram-equal-mark"/>
      <line id="mk:eq2a" x1="320" y1="210" x2="330" y2="195" class="diagram-equal-mark"/>
      <line id="mk:eq2b" x1="330" y1="210" x2="340" y2="195" class="diagram-equal-mark"/>
    </g>` : ''}

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="4" class="diagram-point"/>

    <text id="txt:A" x="${ax - 20}" y="${ay + 5}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 10}" y="${by + 5}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx}" y="${cy - 10}" text-anchor="middle" class="diagram-text">${labelC}</text>

    ${showAngles ? `
    <text id="txt:angleA" x="${ax + 20}" y="${ay - 15}" class="diagram-text-angle">${baseAngle}°</text>
    <text id="txt:angleB" x="${bx - 30}" y="${by - 15}" class="diagram-text-angle">${baseAngle}°</text>
    <text id="txt:angleC" x="${cx}" y="${cy + 25}" text-anchor="middle" class="diagram-text-angle">${apexAngle}°</text>
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

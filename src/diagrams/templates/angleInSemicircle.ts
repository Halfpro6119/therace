import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const angleInSemicircle: DiagramEngineTemplate = {
  templateId: 'math.circle_theorems.angle_in_semicircle.v1',
  title: 'Angle in a Semicircle',
  description: 'Circle with diameter and point on circumference showing 90° angle',
  category: 'geometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 },
      O: { default: 'O', maxLen: 3 }
    },
    positions: {
      C: { default: { x: 0.5, y: 0.2 }, normalized: true }
    },
    visibility: {
      showCenter: { default: true },
      showAngleLabel: { default: true },
      showRightAngleMark: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 400;
    const height = 400;
    const centerX = 200;
    const centerY = 200;
    const radius = 150;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';
    const labelO = params.labels?.O || 'O';

    const posC = params.positions?.C || { x: 0.5, y: 0.2 };
    const cAngle = posC.x * 2 * Math.PI;
    const cx = centerX + radius * Math.cos(cAngle);
    const cy = centerY - radius * Math.sin(cAngle);

    const ax = centerX - radius;
    const ay = centerY;
    const bx = centerX + radius;
    const by = centerY;

    const showCenter = params.visibility?.showCenter !== false;
    const showAngleLabel = params.visibility?.showAngleLabel !== false;
    const showRightAngleMark = params.visibility?.showRightAngleMark !== false;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-highlight { stroke: #60a5fa; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-point-highlight { fill: #60a5fa; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #94a3b8; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #f87171; }
    .diagram-angle-mark { stroke: #f87171; stroke-width: 2; fill: none; }
  </style>

  <g id="grp:main">
    <circle id="ln:circle" cx="${centerX}" cy="${centerY}" r="${radius}" class="diagram-line"/>
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <line id="ln:AC" x1="${ax}" y1="${ay}" x2="${cx}" y2="${cy}" class="diagram-highlight"/>
    <line id="ln:BC" x1="${bx}" y1="${by}" x2="${cx}" y2="${cy}" class="diagram-highlight"/>

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="5" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="5" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="5" class="diagram-point-highlight"/>
    ${showCenter ? `<circle id="pt:O" cx="${centerX}" cy="${centerY}" r="5" class="diagram-point"/>` : ''}

    <text id="txt:A" x="${ax - 20}" y="${ay + 5}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 10}" y="${by + 5}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx + 5}" y="${cy - 10}" class="diagram-text">${labelC}</text>
    ${showCenter ? `<text id="txt:O" x="${centerX + 5}" y="${centerY + 20}" class="diagram-text-small">${labelO}</text>` : ''}

    ${showRightAngleMark ? `<path id="mk:angleC" d="M ${cx - 15} ${cy + 5} L ${cx - 15} ${cy + 20} L ${cx} ${cy + 20}" class="diagram-angle-mark"/>` : ''}
    ${showAngleLabel ? `<text id="txt:angleC" x="${cx - 25}" y="${cy + 15}" class="diagram-text-angle">90°</text>` : ''}
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

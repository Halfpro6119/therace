import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const rightTriangle: DiagramEngineTemplate = {
  templateId: 'math.trig.right_triangle.v1',
  title: 'Right Triangle',
  description: 'Right-angled triangle with labeled sides (opposite, adjacent, hypotenuse)',
  category: 'trigonometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 },
      opposite: { default: 'opposite', maxLen: 20 },
      adjacent: { default: 'adjacent', maxLen: 20 },
      hypotenuse: { default: 'hypotenuse', maxLen: 20 }
    },
    values: {
      angle: { default: 35, type: 'number', min: 1, max: 89 }
    },
    visibility: {
      showRightAngleMark: { default: true },
      showSideLabels: { default: true },
      showAngleLabel: { default: false }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 400;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';
    const labelOpposite = params.labels?.opposite || 'opposite';
    const labelAdjacent = params.labels?.adjacent || 'adjacent';
    const labelHypotenuse = params.labels?.hypotenuse || 'hypotenuse';

    const angleValue = Number(params.values?.angle) || 35;

    const showRightAngleMark = params.visibility?.showRightAngleMark !== false;
    const showSideLabels = params.visibility?.showSideLabels !== false;
    const showAngleLabel = params.visibility?.showAngleLabel === true;

    const cx = 100;
    const cy = 300;
    const adjacent = 300;
    const angleRad = (angleValue * Math.PI) / 180;
    const opposite = adjacent * Math.tan(angleRad);

    const ax = cx;
    const ay = cy;
    const bx = cx + adjacent;
    const by = cy;
    const ccx = bx;
    const ccy = cy - opposite;

    // Calculate angle mark position - place it on the outside of the triangle
    const angleMarkDistance = 50;
    const angleMarkX = ax + angleMarkDistance * Math.cos(angleRad);
    const angleMarkY = ay - angleMarkDistance * Math.sin(angleRad);

    // Right angle mark size (hologram square)
    // The right angle is at point C where the two perpendicular sides meet
    // The square needs to be rotated -90 degrees to align with the triangle
    const rightAngleSize = 12;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-side { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #60a5fa; font-style: italic; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #f87171; font-weight: bold; }
  </style>

  <g id="grp:main">
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <line id="ln:BC" x1="${bx}" y1="${by}" x2="${ccx}" y2="${ccy}" class="diagram-line"/>
    <line id="ln:CA" x1="${ccx}" y1="${ccy}" x2="${ax}" y2="${ay}" class="diagram-line"/>

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${ccx}" cy="${ccy}" r="4" class="diagram-point"/>

    <text id="txt:A" x="${ax - 20}" y="${ay + 5}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 10}" y="${by + 5}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${ccx + 10}" y="${ccy + 5}" class="diagram-text">${labelC}</text>

    ${showRightAngleMark ? `
    <!-- Hologram-like right angle square at C, rotated to align with the triangle -->
    <g transform="translate(${ccx}, ${ccy}) rotate(-90)">
      <rect id="mk:rightAngle" x="${-rightAngleSize / 2}" y="${-rightAngleSize / 2}" width="${rightAngleSize}" height="${rightAngleSize}" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" stroke-width="1.5" style="filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.5));"/>
    </g>
    ` : ''}

    ${showSideLabels ? `
    <text id="txt:adjacent" x="${(ax + bx) / 2}" y="${ay + 25}" text-anchor="middle" class="diagram-text-side">${labelAdjacent}</text>
    <text id="txt:opposite" x="${bx + 30}" y="${(by + ccy) / 2}" text-anchor="middle" class="diagram-text-side">${labelOpposite}</text>
    <text id="txt:hypotenuse" x="${(ax + ccx) / 2 - 30}" y="${(ay + ccy) / 2 - 10}" text-anchor="middle" class="diagram-text-side">${labelHypotenuse}</text>
    ` : ''}

    ${showAngleLabel ? `<text id="txt:angle" x="${angleMarkX}" y="${angleMarkY - 10}" class="diagram-text-angle">${angleValue}°</text>` : ''}
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

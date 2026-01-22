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
    // Angle label position: near vertex A, inside the angle (uses angle bisector)
    const angleLabelDistance = 34;
    // Unit vector along AB (to the right)
    const u1x = 1;
    const u1y = 0;
    // Unit vector along AC (towards C)
    const u2x = Math.cos(angleRad);
    const u2y = -Math.sin(angleRad);
    // Angle bisector direction = normalize(u1 + u2)
    const bisx = u1x + u2x;
    const bisy = u1y + u2y;
    const bisLen = Math.sqrt(bisx * bisx + bisy * bisy) || 1;
    const angleLabelX = ax + (angleLabelDistance * bisx) / bisLen;
    const angleLabelY = ay + (angleLabelDistance * bisy) / bisLen;


    // Right angle mark size
    const rightAngleSize = 12;
    // Place the right-angle symbol slightly inside the corner at B
    const rightAngleInset = 8;
    const raX = bx - rightAngleInset;
    const raY = by - rightAngleInset;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-side { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #60a5fa; font-style: italic; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #f87171; font-weight: bold; }
    .diagram-right-angle { stroke: #3b82f6; stroke-width: 1.5; fill: none; filter: drop-shadow(0 0 3px rgba(59, 130, 246, 0.5)); }
  </style>

  <g id="grp:main">
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <line id="ln:BC" x1="${bx}" y1="${by}" x2="${ccx}" y2="${ccy}" class="diagram-line"/>
    <line id="ln:CA" x1="${ccx}" y1="${ccy}" x2="${ax}" y2="${ay}" class="diagram-line"/>

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${ccx}" cy="${ccy}" r="4" class="diagram-point"/>

    <!-- Vertex labels positioned outside the triangle -->
    <text id="txt:A" x="${ax - 25}" y="${ay + 20}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 15}" y="${by + 20}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${ccx + 15}" y="${ccy - 15}" class="diagram-text">${labelC}</text>

    ${showRightAngleMark ? `
    <!-- Right angle indicator at B (between AB and BC) -->
    <line id="mk:rightAngle1" x1="${raX}" y1="${raY}" x2="${raX - rightAngleSize}" y2="${raY}" class="diagram-right-angle"/>
    <line id="mk:rightAngle2" x1="${raX}" y1="${raY}" x2="${raX}" y2="${raY - rightAngleSize}" class="diagram-right-angle"/>
    ` : ''}

    ${showSideLabels ? `
    <!-- Side labels positioned outside the triangle -->
    <text id="txt:adjacent" x="${(ax + bx) / 2}" y="${ay + 35}" text-anchor="middle" class="diagram-text-side">${labelAdjacent}</text>
    <text id="txt:opposite" x="${bx + 50}" y="${(by + ccy) / 2}" text-anchor="middle" class="diagram-text-side">${labelOpposite}</text>
    <text id="txt:hypotenuse" x="${(ax + ccx) / 2 - 50}" y="${(ay + ccy) / 2 - 20}" text-anchor="middle" class="diagram-text-side">${labelHypotenuse}</text>
    ` : ''}

    ${showAngleLabel ? `<text id="txt:angle" x="${angleLabelX}" y="${angleLabelY - 6}" class="diagram-text-angle">${angleValue}°</text>` : ''}
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

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
      // x = 0.25 places C at 90° (top of circle) so angle ACB = 90°; 0.5 would put C on A (diameter)
      C: { default: { x: 0.25, y: 0.2 }, normalized: true }
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

    const posC = params.positions?.C || { x: 0.25, y: 0.2 };
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

    // Right angle mark size
    const rightAngleSize = 12;
    
    // Calculate vectors from C to A and C to B to determine the angle orientation
    const caX = ax - cx;
    const caY = ay - cy;
    const cbX = bx - cx;
    const cbY = by - cy;
    
    // Normalize vectors
    const caLen = Math.sqrt(caX * caX + caY * caY);
    const cbLen = Math.sqrt(cbX * cbX + cbY * cbY);
    const caNormX = caX / caLen;
    const caNormY = caY / caLen;
    const cbNormX = cbX / cbLen;
    const cbNormY = cbY / cbLen;
    
    // Position the right angle indicator inside the angle
    const offset = 15;
    const p1X = cx + caNormX * offset;
    const p1Y = cy + caNormY * offset;
    const p2X = cx + (caNormX + cbNormX) * offset;
    const p2Y = cy + (caNormY + cbNormY) * offset;
    const p3X = cx + cbNormX * offset;
    const p3Y = cy + cbNormY * offset;
    
    // Position labels outside the circle
    const labelOffsetA = 30;
    const labelOffsetB = 30;
    const labelOffsetC = 30;
    const labelA_x = ax - labelOffsetA;
    const labelA_y = ay + 10;
    const labelB_x = bx + labelOffsetB;
    const labelB_y = by + 10;
    const labelC_x = cx + labelOffsetC * Math.cos(cAngle);
    const labelC_y = cy - labelOffsetC * Math.sin(cAngle);

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-highlight { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-point { fill: #64748b; }
    .diagram-point-highlight { fill: #64748b; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; fill: #94a3b8; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: 500; fill: #dc2626; }
    .diagram-right-angle { stroke: #64748b; stroke-width: 1.5; fill: none; }
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

    <!-- Vertex labels positioned outside the circle -->
    <text id="txt:A" x="${labelA_x}" y="${labelA_y}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${labelB_x}" y="${labelB_y}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${labelC_x}" y="${labelC_y}" class="diagram-text">${labelC}</text>
    ${showCenter ? `<text id="txt:O" x="${centerX + 10}" y="${centerY + 25}" class="diagram-text-small">${labelO}</text>` : ''}

    ${showRightAngleMark ? `
    <!-- Right angle indicator at C (two perpendicular lines forming an L) -->
    <line id="mk:rightAngle1" x1="${p1X}" y1="${p1Y}" x2="${p2X}" y2="${p2Y}" class="diagram-right-angle"/>
    <line id="mk:rightAngle2" x1="${p2X}" y1="${p2Y}" x2="${p3X}" y2="${p3Y}" class="diagram-right-angle"/>
    ` : ''}
    ${showAngleLabel ? `<text id="txt:angleC" x="${cx - 35}" y="${cy + 25}" class="diagram-text-angle">90°</text>` : ''}
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

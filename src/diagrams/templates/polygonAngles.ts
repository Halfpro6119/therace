import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const polygonAngles: DiagramEngineTemplate = {
  templateId: 'math.polygons.interior_exterior.v1',
  title: 'Polygon Interior/Exterior Angles',
  description: 'Regular polygon with interior and exterior angles marked',
  category: 'geometry',
  schema: {
    values: {
      sides: { default: 6, type: 'number', min: 3, max: 12 },
      interiorAngle: { default: 120, type: 'number', min: 0, max: 180 },
      exteriorAngle: { default: 60, type: 'number', min: 0, max: 180 }
    },
    visibility: {
      showInteriorAngle: { default: true },
      showExteriorAngle: { default: true },
      showCenter: { default: false }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;
    const centerX = 250;
    const centerY = 250;
    const radius = 150;

    const sides = Number(params.values?.sides) || 6;
    const interiorAngle = Number(params.values?.interiorAngle) || 120;
    const exteriorAngle = Number(params.values?.exteriorAngle) || 60;

    const showInteriorAngle = params.visibility?.showInteriorAngle !== false;
    const showExteriorAngle = params.visibility?.showExteriorAngle !== false;
    const showCenter = params.visibility?.showCenter === true;

    const angleStep = (2 * Math.PI) / sides;
    const points: Array<{x: number; y: number}> = [];

    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      points.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      });
    }

    const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

    const extLineEnd = {
      x: points[0].x + 50 * Math.cos(-Math.PI / 2 + angleStep),
      y: points[0].y + 50 * Math.sin(-Math.PI / 2 + angleStep)
    };

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-polygon { fill: #1e40af; fill-opacity: 0.1; stroke: #94a3b8; stroke-width: 2; }
    .diagram-line { stroke: #60a5fa; stroke-width: 2; stroke-dasharray: 4,4; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #60a5fa; }
  </style>

  <g id="grp:main">
    <polygon id="poly:shape" points="${polygonPoints}" class="diagram-polygon"/>

    ${points.map((p, i) => `<circle id="pt:${i}" cx="${p.x}" cy="${p.y}" r="4" class="diagram-point"/>`).join('\n    ')}

    ${showCenter ? `
    <circle id="pt:center" cx="${centerX}" cy="${centerY}" r="4" class="diagram-point"/>
    <line id="ln:radius1" x1="${centerX}" y1="${centerY}" x2="${points[0].x}" y2="${points[0].y}" class="diagram-line"/>
    <line id="ln:radius2" x1="${centerX}" y1="${centerY}" x2="${points[1].x}" y2="${points[1].y}" class="diagram-line"/>
    ` : ''}

    ${showExteriorAngle ? `
    <line id="ln:extension" x1="${points[0].x}" y1="${points[0].y}" x2="${extLineEnd.x}" y2="${extLineEnd.y}" class="diagram-line"/>
    <text id="txt:exteriorAngle" x="${points[0].x + 60}" y="${points[0].y - 60}" class="diagram-text-angle">${exteriorAngle}°</text>
    ` : ''}

    ${showInteriorAngle ? `
    <text id="txt:interiorAngle" x="${points[0].x - 40}" y="${points[0].y + 25}" class="diagram-text-angle">${interiorAngle}°</text>
    ` : ''}

    <text id="txt:sides" x="${centerX}" y="${height - 20}" text-anchor="middle" class="diagram-text">${sides}-sided polygon</text>
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

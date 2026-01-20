import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const bearings: DiagramEngineTemplate = {
  templateId: 'math.bearings.north_arrow.v1',
  title: 'Bearings with North Arrow',
  description: 'Two points with north arrows and bearing angle',
  category: 'geometry',
  schema: {
    labels: {
      pointA: { default: 'A', maxLen: 10 },
      pointB: { default: 'B', maxLen: 10 }
    },
    values: {
      bearing: { default: 45, type: 'number', min: 0, max: 360 },
      distance: { default: 200, type: 'number', min: 50, max: 300 }
    },
    visibility: {
      showBearingLabel: { default: true },
      showNorthArrows: { default: true },
      showDistance: { default: false }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;

    const labelA = params.labels?.pointA || 'A';
    const labelB = params.labels?.pointB || 'B';

    const bearing = Number(params.values?.bearing) || 45;
    const distance = Number(params.values?.distance) || 200;

    const showBearingLabel = params.visibility?.showBearingLabel !== false;
    const showNorthArrows = params.visibility?.showNorthArrows !== false;
    const showDistance = params.visibility?.showDistance === true;

    const ax = 250;
    const ay = 350;

    const bearingRad = ((bearing - 90) * Math.PI) / 180;
    const bx = ax + distance * Math.cos(bearingRad);
    const by = ay + distance * Math.sin(bearingRad);

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#3b82f6"/>
    </marker>
  </defs>
  <style>
    .diagram-line { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-north { stroke: #3b82f6; stroke-width: 2; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #3b82f6; }
    .diagram-text-north { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: bold; fill: #3b82f6; }
  </style>

  <g id="grp:main">
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>

    ${showNorthArrows ? `
    <line id="ln:northA" x1="${ax}" y1="${ay}" x2="${ax}" y2="${ay - 60}" class="diagram-north" marker-end="url(#arrowhead-blue)"/>
    <text id="txt:northA" x="${ax + 10}" y="${ay - 50}" class="diagram-text-north">N</text>
    <line id="ln:northB" x1="${bx}" y1="${by}" x2="${bx}" y2="${by - 60}" class="diagram-north" marker-end="url(#arrowhead-blue)"/>
    <text id="txt:northB" x="${bx + 10}" y="${by - 50}" class="diagram-text-north">N</text>
    ` : ''}

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="5" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="5" class="diagram-point"/>

    <text id="txt:A" x="${ax - 10}" y="${ay + 25}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 10}" y="${by}" class="diagram-text">${labelB}</text>

    ${showBearingLabel ? `<text id="txt:bearing" x="${ax + 30}" y="${ay - 20}" class="diagram-text-angle">${bearing.toString().padStart(3, '0')}°</text>` : ''}
    ${showDistance ? `<text id="txt:distance" x="${(ax + bx) / 2}" y="${(ay + by) / 2 + 20}" text-anchor="middle" class="diagram-text-angle">${distance}m</text>` : ''}
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

import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const circleTangentRadius: DiagramEngineTemplate = {
  templateId: 'math.circle_theorems.tangent_radius.v1',
  title: 'Circle Theorem - Tangent Perpendicular to Radius',
  description: 'Circle with tangent line perpendicular to radius at point of contact',
  category: 'geometry',
  schema: {
    labels: {
      O: { default: 'O', maxLen: 3 },
      A: { default: 'A', maxLen: 3 },
      T: { default: 'T', maxLen: 3 }
    },
    visibility: {
      showRightAngle: { default: true },
      showCenter: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 400;
    const height = 400;
    const centerX = 200;
    const centerY = 200;
    const radius = 120;

    const labelO = params.labels?.O || 'O';
    const labelA = params.labels?.A || 'A';
    const labelT = params.labels?.T || 'T';

    const showRightAngle = params.visibility?.showRightAngle !== false;
    const showCenter = params.visibility?.showCenter !== false;

    const ax = centerX + radius;
    const ay = centerY;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-circle { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-line { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-tangent { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-point-highlight { fill: #3b82f6; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-angle-mark { stroke: #f87171; stroke-width: 2; fill: none; }
  </style>

  <g id="grp:main">
    <circle id="ln:circle" cx="${centerX}" cy="${centerY}" r="${radius}" class="diagram-circle"/>
    <line id="ln:radius" x1="${centerX}" y1="${centerY}" x2="${ax}" y2="${ay}" class="diagram-line"/>
    <line id="ln:tangent" x1="${ax}" y1="${ay - 100}" x2="${ax}" y2="${ay + 100}" class="diagram-tangent"/>

    ${showCenter ? `<circle id="pt:O" cx="${centerX}" cy="${centerY}" r="5" class="diagram-point"/>` : ''}
    <circle id="pt:A" cx="${ax}" cy="${ay}" r="5" class="diagram-point-highlight"/>
    <circle id="pt:T" cx="${ax}" cy="${ay + 80}" r="5" class="diagram-point"/>

    ${showCenter ? `<text id="txt:O" x="${centerX - 20}" y="${centerY + 5}" class="diagram-text">${labelO}</text>` : ''}
    <text id="txt:A" x="${ax + 15}" y="${ay}" class="diagram-text">${labelA}</text>
    <text id="txt:T" x="${ax + 15}" y="${ay + 85}" class="diagram-text">${labelT}</text>

    ${showRightAngle ? `<rect id="mk:rightAngle" x="${ax - 15}" y="${ay - 15}" width="15" height="15" class="diagram-angle-mark"/>` : ''}
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

export const circleTwoTangents: DiagramEngineTemplate = {
  templateId: 'math.circle_theorems.two_tangents.v1',
  title: 'Circle Theorem - Two Tangents from External Point',
  description: 'Two tangents from external point to circle (equal length)',
  category: 'geometry',
  schema: {
    labels: {
      O: { default: 'O', maxLen: 3 },
      P: { default: 'P', maxLen: 3 },
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 }
    },
    visibility: {
      showEqualMarks: { default: true },
      showCenter: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 450;
    const height = 450;
    const centerX = 200;
    const centerY = 200;
    const radius = 100;

    const labelO = params.labels?.O || 'O';
    const labelP = params.labels?.P || 'P';
    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';

    const showEqualMarks = params.visibility?.showEqualMarks !== false;
    const showCenter = params.visibility?.showCenter !== false;

    const px = 350;
    const py = 200;

    const angle = Math.asin(radius / (px - centerX));
    const ax = centerX + radius * Math.sin(angle);
    const ay = centerY - radius * Math.cos(angle);
    const bx = centerX + radius * Math.sin(angle);
    const by = centerY + radius * Math.cos(angle);

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-circle { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-line { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-tangent { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-point-highlight { fill: #3b82f6; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-equal-mark { stroke: #f87171; stroke-width: 2; }
  </style>

  <g id="grp:main">
    <circle id="ln:circle" cx="${centerX}" cy="${centerY}" r="${radius}" class="diagram-circle"/>
    <line id="ln:tangent1" x1="${px}" y1="${py}" x2="${ax}" y2="${ay}" class="diagram-tangent"/>
    <line id="ln:tangent2" x1="${px}" y1="${py}" x2="${bx}" y2="${by}" class="diagram-tangent"/>

    ${showCenter ? `
    <line id="ln:radiusA" x1="${centerX}" y1="${centerY}" x2="${ax}" y2="${ay}" class="diagram-line"/>
    <line id="ln:radiusB" x1="${centerX}" y1="${centerY}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <circle id="pt:O" cx="${centerX}" cy="${centerY}" r="5" class="diagram-point"/>
    ` : ''}

    <circle id="pt:P" cx="${px}" cy="${py}" r="5" class="diagram-point-highlight"/>
    <circle id="pt:A" cx="${ax}" cy="${ay}" r="5" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="5" class="diagram-point"/>

    ${showCenter ? `<text id="txt:O" x="${centerX - 20}" y="${centerY}" class="diagram-text">${labelO}</text>` : ''}
    <text id="txt:P" x="${px + 10}" y="${py + 5}" class="diagram-text">${labelP}</text>
    <text id="txt:A" x="${ax + 5}" y="${ay - 10}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 5}" y="${by + 20}" class="diagram-text">${labelB}</text>

    ${showEqualMarks ? `
    <g id="grp:equal-marks">
      <line id="mk:eq1a" x1="${(px + ax) / 2 - 5}" y1="${(py + ay) / 2 + 5}" x2="${(px + ax) / 2 + 5}" y2="${(py + ay) / 2 - 5}" class="diagram-equal-mark"/>
      <line id="mk:eq2a" x1="${(px + bx) / 2 - 5}" y1="${(py + by) / 2 - 5}" x2="${(px + bx) / 2 + 5}" y2="${(py + by) / 2 + 5}" class="diagram-equal-mark"/>
    </g>` : ''}
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

export const cyclicQuadrilateral: DiagramEngineTemplate = {
  templateId: 'math.circle_theorems.cyclic_quadrilateral.v1',
  title: 'Circle Theorem - Cyclic Quadrilateral',
  description: 'Quadrilateral inscribed in circle (opposite angles sum to 180°)',
  category: 'geometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 },
      D: { default: 'D', maxLen: 3 }
    },
    values: {
      angleA: { default: 80, type: 'number', min: 1, max: 179 },
      angleC: { default: 100, type: 'number', min: 1, max: 179 }
    },
    visibility: {
      showAngles: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 450;
    const height = 450;
    const centerX = 225;
    const centerY = 225;
    const radius = 150;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';
    const labelD = params.labels?.D || 'D';

    const angleA = Number(params.values?.angleA) || 80;
    const angleC = Number(params.values?.angleC) || 100;

    const showAngles = params.visibility?.showAngles !== false;

    const ax = centerX;
    const ay = centerY - radius;
    const bx = centerX + radius * 0.9;
    const by = centerY - radius * 0.3;
    const cx = centerX + radius * 0.5;
    const cy = centerY + radius * 0.9;
    const dx = centerX - radius * 0.8;
    const dy = centerY + radius * 0.6;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-circle { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-line { stroke: #3b82f6; stroke-width: 2; fill: none; }
    .diagram-quad { fill: #1e40af; fill-opacity: 0.1; stroke: #3b82f6; stroke-width: 2; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #3b82f6; }
  </style>

  <g id="grp:main">
    <circle id="ln:circle" cx="${centerX}" cy="${centerY}" r="${radius}" class="diagram-circle"/>
    <polygon id="poly:quad" points="${ax},${ay} ${bx},${by} ${cx},${cy} ${dx},${dy}" class="diagram-quad"/>

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="5" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="5" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="5" class="diagram-point"/>
    <circle id="pt:D" cx="${dx}" cy="${dy}" r="5" class="diagram-point"/>

    <text id="txt:A" x="${ax}" y="${ay - 15}" text-anchor="middle" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 15}" y="${by}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx + 10}" y="${cy + 20}" class="diagram-text">${labelC}</text>
    <text id="txt:D" x="${dx - 25}" y="${dy + 5}" class="diagram-text">${labelD}</text>

    ${showAngles ? `
    <text id="txt:angleA" x="${ax}" y="${ay + 20}" text-anchor="middle" class="diagram-text-angle">${angleA}°</text>
    <text id="txt:angleC" x="${cx - 25}" y="${cy - 10}" class="diagram-text-angle">${angleC}°</text>
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

import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const quadraticLinear: DiagramEngineTemplate = {
  templateId: 'math.graphs.quadratic_linear.v1',
  title: 'Quadratic and Linear Graph',
  description: 'Quadratic and linear graph showing intersection points',
  category: 'graphs',
  schema: {
    labels: {
      xLabel: { default: 'x', maxLen: 10 },
      yLabel: { default: 'y', maxLen: 10 }
    },
    values: {
      quadraticCoeff: { default: 1, type: 'number', min: -10, max: 10 },
      linearGradient: { default: 2, type: 'number', min: -10, max: 10 },
      linearIntercept: { default: 3, type: 'number', min: -10, max: 10 },
      xMin: { default: -5, type: 'number', min: -50, max: 0 },
      xMax: { default: 5, type: 'number', min: 0, max: 50 },
      yMin: { default: -2, type: 'number', min: -50, max: 0 },
      yMax: { default: 10, type: 'number', min: 0, max: 50 }
    },
    visibility: {
      showGrid: { default: true },
      showQuadratic: { default: true },
      showLinear: { default: true },
      showIntersectionPoints: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;
    const padding = 50;

    const labelX = params.labels?.xLabel || 'x';
    const labelY = params.labels?.yLabel || 'y';

    const quadraticCoeff = Number(params.values?.quadraticCoeff) || 1;
    const linearGradient = Number(params.values?.linearGradient) || 2;
    const linearIntercept = Number(params.values?.linearIntercept) || 3;
    const xMin = Number(params.values?.xMin) || -5;
    const xMax = Number(params.values?.xMax) || 5;
    const yMin = Number(params.values?.yMin) || -2;
    const yMax = Number(params.values?.yMax) || 10;

    const showGrid = params.visibility?.showGrid !== false;
    const showQuadratic = params.visibility?.showQuadratic !== false;
    const showLinear = params.visibility?.showLinear !== false;
    const showIntersectionPoints = params.visibility?.showIntersectionPoints !== false;

    const centerX = width / 2;
    const centerY = height / 2;
    const gridSize = (width - 2 * padding) / (xMax - xMin);

    const convertX = (x: number) => padding + (x - xMin) * gridSize;
    const convertY = (y: number) => height - padding - (y - yMin) * (height - 2 * padding) / (yMax - yMin);

    // Generate quadratic curve points
    const quadraticPoints: Array<{ x: number; y: number }> = [];
    const numPoints = 100;
    for (let i = 0; i <= numPoints; i++) {
      const x = xMin + (xMax - xMin) * (i / numPoints);
      const y = quadraticCoeff * x * x;
      if (y >= yMin && y <= yMax) {
        quadraticPoints.push({ x, y });
      }
    }

    // Generate linear line points
    const linearPoints: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= numPoints; i++) {
      const x = xMin + (xMax - xMin) * (i / numPoints);
      const y = linearGradient * x + linearIntercept;
      if (y >= yMin && y <= yMax) {
        linearPoints.push({ x, y });
      }
    }

    // Find intersection points: x² = 2x + 3 => x² - 2x - 3 = 0
    // Using quadratic formula: x = (2 ± √(4 + 12)) / 2 = (2 ± 4) / 2 = -1 or 3
    const intersectionPoints: Array<{ x: number; y: number }> = [];
    if (showIntersectionPoints) {
      // Solve: ax² = mx + c => ax² - mx - c = 0
      const a = quadraticCoeff;
      const b = -linearGradient;
      const c = -linearIntercept;
      const discriminant = b * b - 4 * a * c;
      if (discriminant >= 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const y1 = linearGradient * x1 + linearIntercept;
        const y2 = linearGradient * x2 + linearIntercept;
        if (x1 >= xMin && x1 <= xMax && y1 >= yMin && y1 <= yMax) {
          intersectionPoints.push({ x: x1, y: y1 });
        }
        if (x2 >= xMin && x2 <= xMax && y2 >= yMin && y2 <= yMax) {
          intersectionPoints.push({ x: x2, y: y2 });
        }
      }
    }

    const quadraticPath = quadraticPoints.length > 0 
      ? `M ${convertX(quadraticPoints[0].x)} ${convertY(quadraticPoints[0].y)} ${quadraticPoints.slice(1).map(p => `L ${convertX(p.x)} ${convertY(p.y)}`).join(' ')}`
      : '';

    const linearPath = linearPoints.length > 0
      ? `M ${convertX(linearPoints[0].x)} ${convertY(linearPoints[0].y)} ${linearPoints.slice(1).map(p => `L ${convertX(p.x)} ${convertY(p.y)}`).join(' ')}`
      : '';

    const gridMarkup = showGrid ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: xMax - xMin + 1 }, (_, i) => {
        const x = padding + i * gridSize;
        return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
      ${Array.from({ length: Math.ceil(yMax - yMin) + 1 }, (_, i) => {
        const y = padding + i * (height - 2 * padding) / (yMax - yMin);
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const intersectionMarkup = showIntersectionPoints && intersectionPoints.length > 0
      ? intersectionPoints.map((p, i) => 
          `<circle id="pt:int${i}" cx="${convertX(p.x)}" cy="${convertY(p.y)}" r="5" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>`
        ).join('\n')
      : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#94a3b8"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-quadratic { stroke: #60a5fa; stroke-width: 3; fill: none; }
    .diagram-linear { stroke: #f87171; stroke-width: 3; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${centerY}" x2="${width - padding}" y2="${centerY}" class="diagram-axis" marker-end="url(#arrowhead)"/>
    <line id="ln:yAxis" x1="${centerX}" y1="${height - padding}" x2="${centerX}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>

    <text id="txt:xLabel" x="${width - padding + 15}" y="${centerY + 5}" class="diagram-text">${labelX}</text>
    <text id="txt:yLabel" x="${centerX + 5}" y="${padding - 10}" class="diagram-text">${labelY}</text>
    <text id="txt:origin" x="${centerX - 15}" y="${centerY + 15}" class="diagram-text-small">0</text>

    ${showQuadratic && quadraticPath ? `<path id="path:quadratic" d="${quadraticPath}" class="diagram-quadratic"/>` : ''}
    ${showLinear && linearPath ? `<path id="path:linear" d="${linearPath}" class="diagram-linear"/>` : ''}
    ${intersectionMarkup}
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

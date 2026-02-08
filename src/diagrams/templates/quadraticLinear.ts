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
      showNumbers: { default: true },
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

    const quadraticCoeff = Number(params.values?.quadraticCoeff);
    const linearGradient = Number(params.values?.linearGradient);
    const linearIntercept = Number(params.values?.linearIntercept);
    const rawXMin = Number(params.values?.xMin);
    const rawXMax = Number(params.values?.xMax);
    const rawYMin = Number(params.values?.yMin);
    const rawYMax = Number(params.values?.yMax);

    const quadraticCoeffFinal = Number.isFinite(quadraticCoeff) ? quadraticCoeff : 1;
    const linearGradientFinal = Number.isFinite(linearGradient) ? linearGradient : 2;
    const linearInterceptFinal = Number.isFinite(linearIntercept) ? linearIntercept : 3;
    const xMin = Number.isFinite(rawXMin) ? rawXMin : -5;
    const xMax = Number.isFinite(rawXMax) ? rawXMax : 5;
    const yMin = Number.isFinite(rawYMin) ? rawYMin : -2;
    const yMax = Number.isFinite(rawYMax) ? rawYMax : 10;

    const showGrid = params.visibility?.showGrid !== false;
    const showNumbers = params.visibility?.showNumbers !== false;
    const showQuadratic = params.visibility?.showQuadratic !== false;
    const showLinear = params.visibility?.showLinear !== false;
    const showIntersectionPoints = params.visibility?.showIntersectionPoints !== false;

    const centerX = width / 2;
    const chartHeight = height - 2 * padding;
    const gridSize = (width - 2 * padding) / (xMax - xMin);

    const convertX = (x: number) => padding + (x - xMin) * gridSize;
    const convertY = (y: number) => height - padding - (y - yMin) * chartHeight / (yMax - yMin);
    const axisY = 0 >= yMin && 0 <= yMax ? convertY(0) : (0 < yMin ? height - padding : padding);
    const showOrigin = 0 >= yMin && 0 <= yMax && 0 >= xMin && 0 <= xMax;

    // Generate quadratic curve points
    const quadraticPoints: Array<{ x: number; y: number }> = [];
    const numPoints = 100;
    for (let i = 0; i <= numPoints; i++) {
      const x = xMin + (xMax - xMin) * (i / numPoints);
      const y = quadraticCoeffFinal * x * x;
      if (y >= yMin && y <= yMax) {
        quadraticPoints.push({ x, y });
      }
    }

    // Generate linear line points
    const linearPoints: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= numPoints; i++) {
      const x = xMin + (xMax - xMin) * (i / numPoints);
      const y = linearGradientFinal * x + linearInterceptFinal;
      if (y >= yMin && y <= yMax) {
        linearPoints.push({ x, y });
      }
    }

    // Find intersection points: x² = 2x + 3 => x² - 2x - 3 = 0
    // Using quadratic formula: x = (2 ± √(4 + 12)) / 2 = (2 ± 4) / 2 = -1 or 3
    const intersectionPoints: Array<{ x: number; y: number }> = [];
    if (showIntersectionPoints) {
      // Solve: ax² = mx + c => ax² - mx - c = 0
      const a = quadraticCoeffFinal;
      const b = -linearGradientFinal;
      const c = -linearInterceptFinal;
      const discriminant = b * b - 4 * a * c;
      if (discriminant >= 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        const y1 = linearGradientFinal * x1 + linearInterceptFinal;
        const y2 = linearGradientFinal * x2 + linearInterceptFinal;
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
        return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#64748b" stroke-width="1"/>`;
      }).join('\n')}
      ${Array.from({ length: Math.ceil(yMax - yMin) + 1 }, (_, i) => {
        const y = padding + i * (height - 2 * padding) / (yMax - yMin);
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#64748b" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const intersectionMarkup = showIntersectionPoints && intersectionPoints.length > 0
      ? intersectionPoints.map((p, i) => 
          `<circle id="pt:int${i}" cx="${convertX(p.x)}" cy="${convertY(p.y)}" r="5" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>`
        ).join('\n')
      : '';

    // Axis unit labels (integer steps; step 2 if range > 10)
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xStep = xRange <= 10 ? 1 : xRange <= 20 ? 2 : 5;
    const yStep = yRange <= 10 ? 1 : yRange <= 20 ? 2 : 5;
    const numbersMarkup = showNumbers ? `
    ${Array.from({ length: Math.floor(xRange / xStep) + 1 }, (_, i) => {
      const xVal = xMin + i * xStep;
      const x = convertX(xVal);
      return xVal === 0 ? '' : `<text x="${x}" y="${axisY + 20}" class="diagram-text-small" text-anchor="middle">${xVal}</text>`;
    }).filter(Boolean).join('\n')}
    ${Array.from({ length: Math.floor(yRange / yStep) + 1 }, (_, i) => {
      const yVal = yMin + i * yStep;
      const y = convertY(yVal);
      return yVal === 0 ? '' : `<text x="${(0 >= xMin && 0 <= xMax ? convertX(0) : centerX) - 12}" y="${y + 4}" class="diagram-text-small" text-anchor="end">${yVal}</text>`;
    }).filter(Boolean).join('\n')}
    ` : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-quadratic { stroke: #64748b; stroke-width: 2.5; fill: none; }
    .diagram-linear { stroke: #dc2626; stroke-width: 2.5; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${axisY}" x2="${width - padding}" y2="${axisY}" class="diagram-axis" marker-end="url(#arrowhead)"/>
    <line id="ln:yAxis" x1="${centerX}" y1="${height - padding}" x2="${centerX}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>

    <text id="txt:xLabel" x="${width - padding + 15}" y="${axisY + 5}" class="diagram-text">${labelX}</text>
    <text id="txt:yLabel" x="${centerX + 5}" y="${padding - 10}" class="diagram-text">${labelY}</text>
    ${showOrigin ? `<text id="txt:origin" x="${convertX(0) - 15}" y="${axisY + 15}" class="diagram-text-small">0</text>` : ''}
    ${numbersMarkup}

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

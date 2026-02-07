import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

/**
 * Pre-plotted graph — static graph rendered from equation/metadata.
 * Student reads values only; no interactive plotting.
 * Supports quadratic y = ax² + bx + c with optional highlights: turningPoint, roots, intercepts.
 */
export const prePlottedGraph: DiagramEngineTemplate = {
  templateId: 'math.graphs.pre_plotted.v1',
  title: 'Pre-plotted Graph',
  description: 'Static graph from equation with optional highlights (turning point, roots, intercepts)',
  category: 'graphs',
  schema: {
    labels: {
      xLabel: { default: 'x', maxLen: 10 },
      yLabel: { default: 'y', maxLen: 10 },
      equationLabel: { default: 'y = x² − 6x + 5', maxLen: 60 }
    },
    values: {
      a: { default: 1, type: 'number', min: -10, max: 10 },
      b: { default: -6, type: 'number', min: -50, max: 50 },
      c: { default: 5, type: 'number', min: -50, max: 50 },
      xMin: { default: -2, type: 'number', min: -20, max: 0 },
      xMax: { default: 8, type: 'number', min: 0, max: 20 },
      yMin: { default: -8, type: 'number', min: -50, max: 0 },
      yMax: { default: 8, type: 'number', min: 0, max: 50 }
    },
    visibility: {
      showGrid: { default: true },
      highlightTurningPoint: { default: true },
      highlightRoots: { default: true },
      highlightYIntercept: { default: false },
      showNumbers: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;
    const padding = 50;

    const labelX = params.labels?.xLabel || 'x';
    const labelY = params.labels?.yLabel || 'y';

    const a = Number(params.values?.a) || 1;
    const b = Number(params.values?.b) ?? -6;
    const c = Number(params.values?.c) ?? 5;
    const xMin = Number(params.values?.xMin) ?? -2;
    const xMax = Number(params.values?.xMax) ?? 8;
    const yMin = Number(params.values?.yMin) ?? -8;
    const yMax = Number(params.values?.yMax) ?? 8;

    const showGrid = params.visibility?.showGrid !== false;
    const highlightTurningPoint = params.visibility?.highlightTurningPoint !== false;
    const highlightRoots = params.visibility?.highlightRoots !== false;
    const highlightYIntercept = params.visibility?.highlightYIntercept === true;
    const showNumbers = params.visibility?.showNumbers !== false;

    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    const scaleX = chartWidth / (xMax - xMin);
    const scaleY = chartHeight / (yMax - yMin);

    const convertX = (x: number) => padding + (x - xMin) * scaleX;
    const convertY = (y: number) => height - padding - (y - yMin) * scaleY;

    // Quadratic: y = ax² + bx + c
    const f = (x: number) => a * x * x + b * x + c;

    // Turning point: x = -b/(2a)
    const turningX = a !== 0 ? -b / (2 * a) : 0;
    const turningY = f(turningX);

    // Roots: ax² + bx + c = 0 => x = (-b ± √(b²-4ac)) / 2a
    const discriminant = b * b - 4 * a * c;
    const roots: Array<{ x: number; y: number }> = [];
    if (discriminant >= 0 && a !== 0) {
      const sqrtD = Math.sqrt(discriminant);
      roots.push({ x: (-b + sqrtD) / (2 * a), y: 0 });
      if (discriminant > 0) {
        roots.push({ x: (-b - sqrtD) / (2 * a), y: 0 });
      }
    }

    // Y-intercept: (0, c)
    const yIntercept = { x: 0, y: c };

    // Generate curve points
    const numPoints = 150;
    const curvePoints: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= numPoints; i++) {
      const x = xMin + (xMax - xMin) * (i / numPoints);
      const y = f(x);
      if (y >= yMin - 1 && y <= yMax + 1) {
        curvePoints.push({ x, y });
      }
    }

    const curvePath =
      curvePoints.length > 1
        ? `M ${convertX(curvePoints[0].x)} ${convertY(curvePoints[0].y)} ${curvePoints
            .slice(1)
            .map((p) => `L ${convertX(p.x)} ${convertY(p.y)}`)
            .join(' ')}`
        : '';

    const gridMarkup =
      showGrid
        ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: xMax - xMin + 1 }, (_, i) => {
          const x = padding + i * scaleX;
          return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#94a3b8" stroke-width="1"/>`;
        })
        .join('\n')}
      ${Array.from({ length: Math.ceil(yMax - yMin) + 1 }, (_, i) => {
          const y = padding + i * scaleY;
          return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#94a3b8" stroke-width="1"/>`;
        })
        .join('\n')}
    </g>`
        : '';

    const turningPointMarkup =
      highlightTurningPoint &&
      turningX >= xMin &&
      turningX <= xMax &&
      turningY >= yMin &&
      turningY <= yMax
        ? `<circle id="pt:turningPoint" cx="${convertX(turningX)}" cy="${convertY(turningY)}" r="6" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
    <text x="${convertX(turningX)}" y="${convertY(turningY) - 12}" text-anchor="middle" class="diagram-text-highlight">(${turningX}, ${turningY})</text>`
        : '';

    const rootsMarkup = highlightRoots
      ? roots
          .filter((r) => r.x >= xMin && r.x <= xMax)
          .map(
            (r, i) =>
              `<circle id="pt:root${i}" cx="${convertX(r.x)}" cy="${convertY(r.y)}" r="5" fill="#60a5fa" stroke="#3b82f6" stroke-width="2"/>
    <text x="${convertX(r.x)}" y="${convertY(r.y) + 22}" text-anchor="middle" class="diagram-text-root">${r.x}</text>`
          )
          .join('\n')
      : '';

    const yInterceptMarkup =
      highlightYIntercept &&
      0 >= xMin &&
      0 <= xMax &&
      c >= yMin &&
      c <= yMax
        ? `<circle id="pt:yIntercept" cx="${convertX(0)}" cy="${convertY(c)}" r="5" fill="#22c55e" stroke="#16a34a" stroke-width="2"/>
    <text x="${convertX(0) - 25}" y="${convertY(c)}" text-anchor="middle" class="diagram-text-intercept">(0, ${c})</text>`
        : '';

    // Axis numbers at integer steps (step 1 for range ≤ 12, else 2)
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xStep = xRange <= 12 ? 1 : xRange <= 24 ? 2 : 5;
    const yStep = yRange <= 12 ? 1 : yRange <= 24 ? 2 : 5;
    const axisY = convertY(0);
    const axisNumbersMarkup = showNumbers
      ? `
    ${Array.from({ length: Math.floor(xRange / xStep) + 1 }, (_, i) => {
        const xVal = xMin + i * xStep;
        const x = convertX(xVal);
        return `<text x="${x}" y="${axisY + 20}" class="diagram-text-small" text-anchor="middle">${xVal}</text>`;
      }).join('\n')}
    ${Array.from({ length: Math.floor(yRange / yStep) + 1 }, (_, i) => {
        const yVal = yMin + i * yStep;
        const y = convertY(yVal);
        return `<text x="${convertX(0) - 12}" y="${y + 4}" class="diagram-text-small" text-anchor="end">${yVal}</text>`;
      }).join('\n')}
    `
      : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-pre" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#94a3b8"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-curve { stroke: #60a5fa; stroke-width: 3; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #94a3b8; text-anchor: middle; }
    .diagram-text-highlight { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #ef4444; font-weight: bold; }
    .diagram-text-root { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #60a5fa; font-weight: bold; }
    .diagram-text-intercept { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #22c55e; font-weight: bold; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${convertY(0)}" x2="${width - padding}" y2="${convertY(0)}" class="diagram-axis" marker-end="url(#arrowhead-pre)"/>
    <line id="ln:yAxis" x1="${convertX(0)}" y1="${height - padding}" x2="${convertX(0)}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead-pre)"/>

    <text id="txt:xLabel" x="${width - padding + 15}" y="${convertY(0) + 5}" class="diagram-text">${labelX}</text>
    <text id="txt:yLabel" x="${convertX(0) + 5}" y="${padding - 10}" class="diagram-text">${labelY}</text>

    ${axisNumbersMarkup}
    ${curvePath ? `<path id="path:curve" d="${curvePath}" class="diagram-curve"/>` : ''}
    ${turningPointMarkup}
    ${rootsMarkup}
    ${yInterceptMarkup}
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

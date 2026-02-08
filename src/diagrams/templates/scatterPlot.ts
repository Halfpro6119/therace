import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const scatterPlot: DiagramEngineTemplate = {
  templateId: 'math.statistics.scatter_plot.v1',
  title: 'Scatter Plot',
  description: 'Scatter plot with points and optional outlier highlighting',
  category: 'statistics',
  schema: {
    labels: {
      xAxisLabel: { default: 'X Variable', maxLen: 30 },
      yAxisLabel: { default: 'Y Variable', maxLen: 30 }
    },
    values: {
      points: { default: '[{"x":2,"y":3},{"x":4,"y":5},{"x":5,"y":6},{"x":7,"y":8},{"x":8,"y":9},{"x":10,"y":4}]', type: 'string', min: 0, max: 1000 },
      xMin: { default: 0, type: 'number', min: -100, max: 100 },
      xMax: { default: 12, type: 'number', min: 0, max: 100 },
      yMin: { default: 0, type: 'number', min: -100, max: 100 },
      yMax: { default: 10, type: 'number', min: 0, max: 100 }
    },
    visibility: {
      showGrid: { default: true },
      showPoints: { default: true },
      highlightOutlier: { default: true },
      showNumbers: { default: true },
      showLineOfBestFit: { default: false }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;
    const padding = 50;

    const xAxisLabel = params.labels?.xAxisLabel || 'X Variable';
    const yAxisLabel = params.labels?.yAxisLabel || 'Y Variable';

    let points: Array<{ x: number; y: number }> = [];
    try {
      const pointsStr = String(params.values?.points || '[{"x":2,"y":3},{"x":4,"y":5}]');
      points = JSON.parse(pointsStr);
    } catch {
      points = [{ x: 2, y: 3 }, { x: 4, y: 5 }];
    }

    const xMin = Number(params.values?.xMin) || 0;
    const xMax = Number(params.values?.xMax) || 12;
    const yMin = Number(params.values?.yMin) || 0;
    const yMax = Number(params.values?.yMax) || 10;

    const showGrid = params.visibility?.showGrid !== false;
    const showPoints = params.visibility?.showPoints !== false;
    const highlightOutlier = params.visibility?.highlightOutlier !== false;
    const showNumbers = params.visibility?.showNumbers !== false;
    const showLineOfBestFit = params.visibility?.showLineOfBestFit === true;

    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const scaleX = chartWidth / (xMax - xMin);
    const scaleY = chartHeight / (yMax - yMin);

    const convertX = (x: number) => padding + (x - xMin) * scaleX;
    const convertY = (y: number) => height - padding - (y - yMin) * scaleY;

    // Least-squares line of best fit (used for outlier detection and optional line drawing)
    let slope = 0;
    let intercept = 0;
    let outlierIndex = -1;
    if (points.length > 1) {
      const n = points.length;
      const sumX = points.reduce((s, p) => s + p.x, 0);
      const sumY = points.reduce((s, p) => s + p.y, 0);
      const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
      const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
      const denom = n * sumXX - sumX * sumX;
      if (Math.abs(denom) > 1e-10) {
        slope = (n * sumXY - sumX * sumY) / denom;
        intercept = (sumY - slope * sumX) / n;
      }
      if (highlightOutlier && points.length > 2) {
        let maxResidual = 0;
        points.forEach((p, i) => {
          const predicted = slope * p.x + intercept;
          const residual = Math.abs(p.y - predicted);
          if (residual > maxResidual) {
            maxResidual = residual;
            outlierIndex = i;
          }
        });
      }
    }

    // Line of best fit: draw from (xMin, predicted) to (xMax, predicted)
    const lineOfBestFitMarkup =
      showLineOfBestFit && points.length > 1
        ? (() => {
            const y1 = slope * xMin + intercept;
            const y2 = slope * xMax + intercept;
            return `<line id="ln:lobf" x1="${convertX(xMin)}" y1="${convertY(y1)}" x2="${convertX(xMax)}" y2="${convertY(y2)}" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 4"/>`;
          })()
        : '';

    // Axis numbers: tick marks and labels at integer steps (step 1 for range ≤ 16, else 2 or 5)
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xStep = xRange <= 16 ? 1 : xRange <= 30 ? 2 : 5;
    const yStep = yRange <= 16 ? 1 : yRange <= 30 ? 2 : 5;
    const axisNumbersMarkup = showNumbers
      ? `
    ${Array.from({ length: Math.floor(xRange / xStep) + 1 }, (_, i) => {
        const xVal = xMin + i * xStep;
        const x = convertX(xVal);
        return `<text x="${x}" y="${height - padding + 20}" class="diagram-text-small" text-anchor="middle">${xVal}</text>`;
      }).join('\n')}
    ${Array.from({ length: Math.floor(yRange / yStep) + 1 }, (_, i) => {
        const yVal = yMin + i * yStep;
        const y = convertY(yVal);
        return `<text x="${padding - 8}" y="${y + 4}" class="diagram-text-small" text-anchor="end">${yVal}</text>`;
      }).join('\n')}
    `
      : '';

    const gridMarkup = showGrid ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: xMax - xMin + 1 }, (_, i) => {
        const x = convertX(xMin + i);
        return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#64748b" stroke-width="1"/>`;
      }).join('\n')}
      ${Array.from({ length: yMax - yMin + 1 }, (_, i) => {
        const y = convertY(yMin + i);
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#64748b" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const pointsMarkup = showPoints ? points.map((p, i) => {
      const px = convertX(p.x);
      const py = convertY(p.y);
      const isOutlier = highlightOutlier && i === outlierIndex;
      
      return `<circle id="pt:${i}" cx="${px}" cy="${py}" r="${isOutlier ? 6 : 4}" fill="${isOutlier ? '#ef4444' : '#64748b'}" stroke="${isOutlier ? '#dc2626' : '#64748b'}" stroke-width="${isOutlier ? 2 : 1}"/>`;
    }).join('\n') : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>
    <line id="ln:yAxis" x1="${padding}" y1="${height - padding}" x2="${padding}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>

    <text id="txt:xAxisLabel" x="${width - padding + 15}" y="${height - padding + 5}" class="diagram-text">${xAxisLabel}</text>
    <text id="txt:yAxisLabel" x="${padding - 5}" y="${padding - 10}" class="diagram-text">${yAxisLabel}</text>

    ${axisNumbersMarkup}
    ${lineOfBestFitMarkup}
    ${pointsMarkup}
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

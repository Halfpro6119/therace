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
      highlightOutlier: { default: true }
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

    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const scaleX = chartWidth / (xMax - xMin);
    const scaleY = chartHeight / (yMax - yMin);

    const convertX = (x: number) => padding + (x - xMin) * scaleX;
    const convertY = (y: number) => height - padding - (y - yMin) * scaleY;

    // Detect outlier (point furthest from trend line)
    let outlierIndex = -1;
    if (highlightOutlier && points.length > 2) {
      // Simple outlier detection: find point with largest residual from simple linear trend
      const n = points.length;
      const sumX = points.reduce((s, p) => s + p.x, 0);
      const sumY = points.reduce((s, p) => s + p.y, 0);
      const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
      const sumXX = points.reduce((s, p) => s + p.x * p.x, 0);
      
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      
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

    const gridMarkup = showGrid ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: xMax - xMin + 1 }, (_, i) => {
        const x = convertX(xMin + i);
        return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
      ${Array.from({ length: yMax - yMin + 1 }, (_, i) => {
        const y = convertY(yMin + i);
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const pointsMarkup = showPoints ? points.map((p, i) => {
      const px = convertX(p.x);
      const py = convertY(p.y);
      const isOutlier = highlightOutlier && i === outlierIndex;
      
      return `<circle id="pt:${i}" cx="${px}" cy="${py}" r="${isOutlier ? 6 : 4}" fill="${isOutlier ? '#ef4444' : '#60a5fa'}" stroke="${isOutlier ? '#dc2626' : '#3b82f6'}" stroke-width="${isOutlier ? 2 : 1}"/>`;
    }).join('\n') : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#94a3b8"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>
    <line id="ln:yAxis" x1="${padding}" y1="${height - padding}" x2="${padding}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>

    <text id="txt:xAxisLabel" x="${width - padding + 15}" y="${height - padding + 5}" class="diagram-text">${xAxisLabel}</text>
    <text id="txt:yAxisLabel" x="${padding - 5}" y="${padding - 10}" class="diagram-text">${yAxisLabel}</text>

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

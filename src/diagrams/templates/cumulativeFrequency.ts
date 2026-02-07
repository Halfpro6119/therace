import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

/**
 * Cumulative frequency curve — used for finding median, quartiles from grouped data.
 * Student reads values from the curve (e.g. median at n/2).
 */
export const cumulativeFrequency: DiagramEngineTemplate = {
  templateId: 'math.statistics.cumulative_frequency.v1',
  title: 'Cumulative Frequency Curve',
  description: 'Cumulative frequency graph for finding median and quartiles',
  category: 'statistics',
  schema: {
    labels: {
      xAxisLabel: { default: 'Upper class boundary', maxLen: 50 },
      yAxisLabel: { default: 'Cumulative frequency', maxLen: 50 }
    },
    values: {
      data: {
        default:
          '[{"ub":10,"cf":5},{"ub":20,"cf":18},{"ub":30,"cf":42},{"ub":40,"cf":68},{"ub":50,"cf":85},{"ub":60,"cf":95},{"ub":70,"cf":100}]',
        type: 'string',
        min: 0,
        max: 2000
      },
      totalFrequency: { default: 100, type: 'number', min: 10, max: 1000 }
    },
    visibility: {
      showGrid: { default: true },
      showMedianLine: { default: false },
      showQuartileLines: { default: false },
      showNumbers: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 600;
    const height = 450;
    const padding = 60;

    const xAxisLabel = params.labels?.xAxisLabel || 'Upper class boundary';
    const yAxisLabel = params.labels?.yAxisLabel || 'Cumulative frequency';

    let data: Array<{ ub: number; cf: number }> = [];
    try {
      const dataStr = String(params.values?.data || '[]');
      data = JSON.parse(dataStr);
    } catch {
      data = [
        { ub: 10, cf: 5 },
        { ub: 20, cf: 18 },
        { ub: 30, cf: 42 },
        { ub: 40, cf: 68 },
        { ub: 50, cf: 85 },
        { ub: 60, cf: 95 },
        { ub: 70, cf: 100 }
      ];
    }

    const totalFrequency = Number(params.values?.totalFrequency) || (data.length > 0 ? data[data.length - 1].cf : 100);
    const showGrid = params.visibility?.showGrid !== false;
    const showMedianLine = params.visibility?.showMedianLine === true;
    const showQuartileLines = params.visibility?.showQuartileLines === true;
    const showNumbers = params.visibility?.showNumbers !== false;

    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const xMin = data.length > 0 ? Math.min(...data.map((d) => d.ub)) - 5 : 0;
    const xMax = data.length > 0 ? Math.max(...data.map((d) => d.ub)) + 5 : 80;
    const yMin = 0;
    const yMax = Math.max(totalFrequency, data.length > 0 ? Math.max(...data.map((d) => d.cf)) : 100) + 5;

    const scaleX = chartWidth / (xMax - xMin);
    const scaleY = chartHeight / (yMax - yMin);

    const convertX = (x: number) => padding + (x - xMin) * scaleX;
    const convertY = (y: number) => height - padding - (y - yMin) * scaleY;

    // Build curve: join points with smooth curve (polyline for simplicity)
    const points = data.map((d) => ({ x: d.ub, y: d.cf }));
    const curvePath =
      points.length > 0
        ? `M ${convertX(points[0].x)} ${convertY(points[0].y)} ${points
            .slice(1)
            .map((p) => `L ${convertX(p.x)} ${convertY(p.y)}`)
            .join(' ')}`
        : '';

    const gridMarkup =
      showGrid
        ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: Math.ceil((xMax - xMin) / 10) + 1 }, (_, i) => {
          const x = padding + i * 10 * scaleX;
          return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#94a3b8" stroke-width="1"/>`;
        })
        .join('\n')}
      ${Array.from({ length: 6 }, (_, i) => {
          const yVal = (yMax / 5) * i;
          const y = convertY(yVal);
          return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#94a3b8" stroke-width="1"/>`;
        })
        .join('\n')}
    </g>`
        : '';

    // Median line: at n/2 on y-axis, draw horizontal then vertical to curve
    const medianCf = totalFrequency / 2;
    const medianLineMarkup =
      showMedianLine && points.length > 1
        ? (() => {
            const medianY = convertY(medianCf);
            const medianX = convertX(points[0].x);
            return `<line x1="${padding}" y1="${medianY}" x2="${width - padding}" y2="${medianY}" stroke="#ef4444" stroke-width="1" stroke-dasharray="4 4"/>
    <line x1="${medianX}" y1="${height - padding}" x2="${medianX}" y2="${medianY}" stroke="#ef4444" stroke-width="1" stroke-dasharray="4 4"/>
    <text x="${padding - 10}" y="${medianY + 5}" text-anchor="end" class="diagram-text-median">n/2</text>`;
          })()
        : '';

    const quartileLinesMarkup =
      showQuartileLines && points.length > 1
        ? (() => {
            const q1Cf = totalFrequency / 4;
            const q3Cf = (3 * totalFrequency) / 4;
            const q1Y = convertY(q1Cf);
            const q3Y = convertY(q3Cf);
            return `<line x1="${padding}" y1="${q1Y}" x2="${width - padding}" y2="${q1Y}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2" opacity="0.7"/>
    <line x1="${padding}" y1="${q3Y}" x2="${width - padding}" y2="${q3Y}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2" opacity="0.7"/>`;
          })()
        : '';

    const pointsMarkup = points
      .map(
        (p, i) =>
          `<circle id="pt:${i}" cx="${convertX(p.x)}" cy="${convertY(p.y)}" r="4" fill="#60a5fa" stroke="#3b82f6" stroke-width="2"/>`
      )
      .join('\n');

    // Axis numbers: x at upper class boundaries (or every 10), y from 0 to yMax in steps
    const yStep = yMax <= 50 ? 10 : yMax <= 120 ? 20 : 25;
    const axisNumbersMarkup = showNumbers
      ? `
    ${Array.from({ length: Math.floor(yMax / yStep) + 1 }, (_, i) => {
        const yVal = i * yStep;
        const y = convertY(yVal);
        return `<text x="${padding - 10}" y="${y + 5}" class="diagram-text-small" text-anchor="end">${yVal}</text>`;
      }).join('\n')}
    ${points
      .map((p) => {
        const x = convertX(p.x);
        return `<text x="${x}" y="${height - padding + 20}" class="diagram-text-small" text-anchor="middle">${p.x}</text>`;
      })
      .join('\n')}
    `
      : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-cf" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#94a3b8"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-curve { stroke: #60a5fa; stroke-width: 2.5; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #94a3b8; text-anchor: middle; }
    .diagram-text-median { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #ef4444; font-weight: bold; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="diagram-axis" marker-end="url(#arrowhead-cf)"/>
    <line id="ln:yAxis" x1="${padding}" y1="${height - padding}" x2="${padding}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead-cf)"/>

    <text id="txt:xAxisLabel" x="${width / 2}" y="${height - 10}" class="diagram-text" text-anchor="middle">${xAxisLabel}</text>
    <text id="txt:yAxisLabel" x="20" y="${height / 2}" class="diagram-text" text-anchor="middle" transform="rotate(-90, 20, ${height / 2})">${yAxisLabel}</text>

    ${axisNumbersMarkup}
    ${medianLineMarkup}
    ${quartileLinesMarkup}
    ${curvePath ? `<path id="path:curve" d="${curvePath}" class="diagram-curve"/>` : ''}
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

import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const histogram: DiagramEngineTemplate = {
  templateId: 'math.statistics.histogram.v1',
  title: 'Histogram',
  description: 'Histogram with unequal class widths showing frequency density',
  category: 'statistics',
  schema: {
    labels: {
      xAxisLabel: { default: 'Time (minutes)', maxLen: 50 },
      yAxisLabel: { default: 'Frequency Density', maxLen: 50 }
    },
    values: {
      classes: { default: '[{"start":0,"end":10,"frequency":20,"frequencyDensity":2},{"start":10,"end":20,"frequency":30,"frequencyDensity":3},{"start":20,"end":40,"frequency":40,"frequencyDensity":2},{"start":40,"end":60,"frequency":30,"frequencyDensity":1.5}]', type: 'string', min: 0, max: 2000 },
      yMax: { default: 4, type: 'number', min: 1, max: 100 }
    },
    visibility: {
      showGrid: { default: true },
      showFrequencies: { default: false },
      showFrequencyDensity: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 600;
    const height = 400;
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const xAxisLabel = params.labels?.xAxisLabel || 'Time (minutes)';
    const yAxisLabel = params.labels?.yAxisLabel || 'Frequency Density';

    let classes: Array<{ start: number; end: number; frequency: number; frequencyDensity: number }> = [];
    try {
      const classesStr = String(params.values?.classes || '[]');
      classes = JSON.parse(classesStr);
    } catch {
      classes = [
        { start: 0, end: 10, frequency: 20, frequencyDensity: 2 },
        { start: 10, end: 20, frequency: 30, frequencyDensity: 3 },
        { start: 20, end: 40, frequency: 40, frequencyDensity: 2 },
        { start: 40, end: 60, frequency: 30, frequencyDensity: 1.5 }
      ];
    }

    const yMax = Number(params.values?.yMax) || 4;

    const showGrid = params.visibility?.showGrid !== false;
    const showFrequencies = params.visibility?.showFrequencies === true;
    const showFrequencyDensity = params.visibility?.showFrequencyDensity !== false;

    // Find min and max x values
    const xMin = classes.length > 0 ? Math.min(...classes.map(c => c.start)) : 0;
    const xMax = classes.length > 0 ? Math.max(...classes.map(c => c.end)) : 60;

    const xScale = chartWidth / (xMax - xMin);
    const yScale = chartHeight / yMax;

    const convertX = (x: number) => padding + (x - xMin) * xScale;
    const convertY = (y: number) => height - padding - y * yScale;

    const gridMarkup = showGrid ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: 5 }, (_, i) => {
        const yVal = (yMax / 4) * i;
        const y = convertY(yVal);
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const barsMarkup = classes.map((cls, i) => {
      const barX = convertX(cls.start);
      const barWidth = (cls.end - cls.start) * xScale;
      const barHeight = cls.frequencyDensity * yScale;
      const barY = convertY(cls.frequencyDensity);

      return `
      <rect id="bar:${i}" x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" fill="#60a5fa" stroke="#3b82f6" stroke-width="1"/>
      ${showFrequencyDensity ? `<text x="${barX + barWidth / 2}" y="${barY - 5}" class="diagram-text-value" text-anchor="middle">${cls.frequencyDensity}</text>` : ''}
      ${showFrequencies ? `<text x="${barX + barWidth / 2}" y="${barY + barHeight / 2}" class="diagram-text-freq" text-anchor="middle">${cls.frequency}</text>` : ''}
      <text x="${barX + barWidth / 2}" y="${height - padding + 20}" class="diagram-text-category" text-anchor="middle">${cls.start}-${cls.end}</text>
      `;
    }).join('\n');

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-axis { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #94a3b8; text-anchor: middle; }
    .diagram-text-category { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #e2e8f0; }
    .diagram-text-value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #60a5fa; font-weight: bold; }
    .diagram-text-freq { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; fill: #e2e8f0; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="diagram-axis"/>
    <line id="ln:yAxis" x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="diagram-axis"/>

    <text id="txt:xAxisLabel" x="${width / 2}" y="${height - 10}" class="diagram-text" text-anchor="middle">${xAxisLabel}</text>
    <text id="txt:yAxisLabel" x="20" y="${height / 2}" class="diagram-text" text-anchor="middle" transform="rotate(-90, 20, ${height / 2})">${yAxisLabel}</text>

    ${showGrid ? Array.from({ length: 5 }, (_, i) => {
      const yVal = (yMax / 4) * i;
      const y = convertY(yVal);
      return `<text x="${padding - 10}" y="${y + 5}" class="diagram-text-small" text-anchor="end">${yVal}</text>`;
    }).join('\n') : ''}

    ${barsMarkup}
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

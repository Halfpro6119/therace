import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const barChart: DiagramEngineTemplate = {
  templateId: 'math.statistics.bar_chart.v1',
  title: 'Bar Chart',
  description: 'Vertical bar chart with categories and frequencies',
  category: 'statistics',
  schema: {
    labels: {
      xAxisLabel: { default: 'Category', maxLen: 30 },
      yAxisLabel: { default: 'Frequency', maxLen: 30 }
    },
    values: {
      categories: { default: '["A", "B", "C", "D"]', type: 'string', min: 0, max: 500 },
      frequencies: { default: '[12, 8, 15, 10]', type: 'string', min: 0, max: 500 },
      yMax: { default: 20, type: 'number', min: 1, max: 100 }
    },
    visibility: {
      showGrid: { default: true },
      showValues: { default: true },
      showLabels: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 600;
    const height = 400;
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;

    const xAxisLabel = params.labels?.xAxisLabel || 'Category';
    const yAxisLabel = params.labels?.yAxisLabel || 'Frequency';

    let categories: string[] = [];
    let frequencies: number[] = [];
    
    try {
      const categoriesStr = String(params.values?.categories || '["A", "B", "C", "D"]');
      const frequenciesStr = String(params.values?.frequencies || '[12, 8, 15, 10]');
      categories = JSON.parse(categoriesStr);
      frequencies = JSON.parse(frequenciesStr);
    } catch {
      categories = ['A', 'B', 'C', 'D'];
      frequencies = [12, 8, 15, 10];
    }

    const yMax = Number(params.values?.yMax) || 20;

    const showGrid = params.visibility?.showGrid !== false;
    const showValues = params.visibility?.showValues !== false;
    const showLabels = params.visibility?.showLabels !== false;

    const numBars = categories.length;
    const barWidth = chartWidth / (numBars + 1);
    const barSpacing = barWidth / (numBars + 1);

    const gridMarkup = showGrid ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: 5 }, (_, i) => {
        const yVal = (yMax / 4) * i;
        const y = height - padding - (yVal / yMax) * chartHeight;
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#64748b" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const barsMarkup = categories.map((cat, i) => {
      const freq = frequencies[i] || 0;
      const barHeight = (freq / yMax) * chartHeight;
      const barX = padding + (i + 1) * barSpacing + i * barWidth;
      const barY = height - padding - barHeight;
      
      return `
      <rect id="bar:${cat}" x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" fill="#64748b" stroke="#64748b" stroke-width="1"/>
      ${showLabels ? `<text x="${barX + barWidth / 2}" y="${height - padding + 25}" class="diagram-text-category" text-anchor="middle">${cat}</text>` : ''}
      ${showValues ? `<text x="${barX + barWidth / 2}" y="${barY - 5}" class="diagram-text-value" text-anchor="middle">${freq}</text>` : ''}
      `;
    }).join('\n');

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-axis { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #94a3b8; text-anchor: middle; }
    .diagram-text-category { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #e2e8f0; }
    .diagram-text-value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #94a3b8; font-weight: bold; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" class="diagram-axis"/>
    <line id="ln:yAxis" x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" class="diagram-axis"/>

    <text id="txt:xAxisLabel" x="${width / 2}" y="${height - 10}" class="diagram-text" text-anchor="middle">${xAxisLabel}</text>
    <text id="txt:yAxisLabel" x="20" y="${height / 2}" class="diagram-text" text-anchor="middle" transform="rotate(-90, 20, ${height / 2})">${yAxisLabel}</text>

    ${showGrid ? Array.from({ length: 5 }, (_, i) => {
      const yVal = (yMax / 4) * i;
      const y = height - padding - (yVal / yMax) * chartHeight;
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

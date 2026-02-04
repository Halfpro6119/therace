import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const boxplotComparison: DiagramEngineTemplate = {
  templateId: 'math.statistics.boxplot_comparison.v1',
  title: 'Box Plot Comparison',
  description: 'Two box plots side-by-side for comparison',
  category: 'statistics',
  schema: {
    labels: {
      dataset1Label: { default: 'Group A', maxLen: 30 },
      dataset2Label: { default: 'Group B', maxLen: 30 }
    },
    values: {
      dataset1Min: { default: 5, type: 'number', min: 0, max: 100 },
      dataset1Q1: { default: 15, type: 'number', min: 0, max: 100 },
      dataset1Median: { default: 25, type: 'number', min: 0, max: 100 },
      dataset1Q3: { default: 35, type: 'number', min: 0, max: 100 },
      dataset1Max: { default: 50, type: 'number', min: 0, max: 100 },
      dataset2Min: { default: 10, type: 'number', min: 0, max: 100 },
      dataset2Q1: { default: 20, type: 'number', min: 0, max: 100 },
      dataset2Median: { default: 30, type: 'number', min: 0, max: 100 },
      dataset2Q3: { default: 40, type: 'number', min: 0, max: 100 },
      dataset2Max: { default: 55, type: 'number', min: 0, max: 100 }
    },
    visibility: {
      showLabels: { default: true },
      showValues: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 600;
    const height = 300;

    const dataset1Label = params.labels?.dataset1Label || 'Group A';
    const dataset2Label = params.labels?.dataset2Label || 'Group B';

    const d1Min = Number(params.values?.dataset1Min) || 5;
    const d1Q1 = Number(params.values?.dataset1Q1) || 15;
    const d1Median = Number(params.values?.dataset1Median) || 25;
    const d1Q3 = Number(params.values?.dataset1Q3) || 35;
    const d1Max = Number(params.values?.dataset1Max) || 50;

    const d2Min = Number(params.values?.dataset2Min) || 10;
    const d2Q1 = Number(params.values?.dataset2Q1) || 20;
    const d2Median = Number(params.values?.dataset2Median) || 30;
    const d2Q3 = Number(params.values?.dataset2Q3) || 40;
    const d2Max = Number(params.values?.dataset2Max) || 55;

    const showLabels = params.visibility?.showLabels !== false;
    const showValues = params.visibility?.showValues !== false;

    const padding = 50;
    const boxHeight = 60;
    const centerY = height / 2;
    const plot1X = width / 3;
    const plot2X = (2 * width) / 3;
    const plotWidth = 150;
    const scale = plotWidth / Math.max(d1Max - d1Min, d2Max - d2Min);

    const drawBoxPlot = (x: number, min: number, q1: number, median: number, q3: number, max: number, color: string) => {
      const minX = x - plotWidth / 2 + (min - Math.min(d1Min, d2Min)) * scale;
      const q1X = x - plotWidth / 2 + (q1 - Math.min(d1Min, d2Min)) * scale;
      const medianX = x - plotWidth / 2 + (median - Math.min(d1Min, d2Min)) * scale;
      const q3X = x - plotWidth / 2 + (q3 - Math.min(d1Min, d2Min)) * scale;
      const maxX = x - plotWidth / 2 + (max - Math.min(d1Min, d2Min)) * scale;

      return `
      <line x1="${minX}" y1="${centerY}" x2="${q1X}" y2="${centerY}" stroke="${color}" stroke-width="2"/>
      <line x1="${q3X}" y1="${centerY}" x2="${maxX}" y2="${centerY}" stroke="${color}" stroke-width="2"/>
      <line x1="${minX}" y1="${centerY - boxHeight / 2}" x2="${minX}" y2="${centerY + boxHeight / 2}" stroke="${color}" stroke-width="2"/>
      <line x1="${maxX}" y1="${centerY - boxHeight / 2}" x2="${maxX}" y2="${centerY + boxHeight / 2}" stroke="${color}" stroke-width="2"/>
      <rect x="${q1X}" y="${centerY - boxHeight / 2}" width="${q3X - q1X}" height="${boxHeight}" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="2"/>
      <line x1="${medianX}" y1="${centerY - boxHeight / 2}" x2="${medianX}" y2="${centerY + boxHeight / 2}" stroke="#f87171" stroke-width="3"/>
      `;
    };

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #e2e8f0; text-anchor: middle; }
    .diagram-text-value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #60a5fa; text-anchor: middle; }
  </style>

  <g id="grp:main">
    ${drawBoxPlot(plot1X, d1Min, d1Q1, d1Median, d1Q3, d1Max, '#60a5fa')}
    ${drawBoxPlot(plot2X, d2Min, d2Q1, d2Median, d2Q3, d2Max, '#f87171')}

    ${showLabels ? `
    <text x="${plot1X}" y="${centerY + boxHeight / 2 + 30}" class="diagram-text">${dataset1Label}</text>
    <text x="${plot2X}" y="${centerY + boxHeight / 2 + 30}" class="diagram-text">${dataset2Label}</text>
    ` : ''}

    ${showValues ? `
    <text x="${plot1X}" y="${centerY - boxHeight / 2 - 10}" class="diagram-text-value">Min: ${d1Min}, Q₁: ${d1Q1}, Med: ${d1Median}, Q₃: ${d1Q3}, Max: ${d1Max}</text>
    <text x="${plot2X}" y="${centerY - boxHeight / 2 - 10}" class="diagram-text-value">Min: ${d2Min}, Q₁: ${d2Q1}, Med: ${d2Median}, Q₃: ${d2Q3}, Max: ${d2Max}</text>
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

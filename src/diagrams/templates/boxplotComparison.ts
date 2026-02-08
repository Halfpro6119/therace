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
    const width = 760;
    const height = 380;

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

    const boxHeight = 60;
    const centerY = height / 2;
    const plot1X = width * 0.35;
    const plot2X = width * 0.65;
    const plotWidth = 200;
    const globalMin = Math.min(d1Min, d2Min);
    const globalRange = Math.max(d1Max - d1Min, d2Max - d2Min, 1);
    const scale = plotWidth / globalRange;

    const toX = (plotCenterX: number, value: number) => plotCenterX - plotWidth / 2 + (value - globalMin) * scale;
    const p1 = { minX: toX(plot1X, d1Min), q1X: toX(plot1X, d1Q1), medianX: toX(plot1X, d1Median), q3X: toX(plot1X, d1Q3), maxX: toX(plot1X, d1Max) };
    const p2 = { minX: toX(plot2X, d2Min), q1X: toX(plot2X, d2Q1), medianX: toX(plot2X, d2Median), q3X: toX(plot2X, d2Q3), maxX: toX(plot2X, d2Max) };

    const drawBoxPlot = (minX: number, q1X: number, medianX: number, q3X: number, maxX: number, color: string) => `
    <line x1="${minX}" y1="${centerY}" x2="${q1X}" y2="${centerY}" stroke="${color}" stroke-width="2"/>
    <line x1="${q3X}" y1="${centerY}" x2="${maxX}" y2="${centerY}" stroke="${color}" stroke-width="2"/>
    <line x1="${minX}" y1="${centerY - boxHeight / 2}" x2="${minX}" y2="${centerY + boxHeight / 2}" stroke="${color}" stroke-width="2"/>
    <line x1="${maxX}" y1="${centerY - boxHeight / 2}" x2="${maxX}" y2="${centerY + boxHeight / 2}" stroke="${color}" stroke-width="2"/>
    <rect x="${q1X}" y="${centerY - boxHeight / 2}" width="${Math.max(q3X - q1X, 2)}" height="${boxHeight}" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="2"/>
    <line x1="${medianX}" y1="${centerY - boxHeight / 2}" x2="${medianX}" y2="${centerY + boxHeight / 2}" stroke="#dc2626" stroke-width="2.5"/>`;

    const minGap = 26;
    const valueY = centerY + boxHeight / 2 + 32;
    const showValueAt = (xs: number[], i: number) => (i === 0 || xs[i] - xs[i - 1] >= minGap) && (i === 4 || xs[i + 1] - xs[i] >= minGap);
    const valuesMarkup = (xs: number[], vals: number[]) =>
      [0, 1, 2, 3, 4].filter(i => showValueAt(xs, i)).map(i => `<text x="${xs[i]}" y="${valueY}" class="diagram-text-value">${vals[i]}</text>`).join('\n    ');
    const xs1 = [p1.minX, p1.q1X, p1.medianX, p1.q3X, p1.maxX];
    const xs2 = [p2.minX, p2.q1X, p2.medianX, p2.q3X, p2.maxX];

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #e2e8f0; text-anchor: middle; }
    .diagram-text-value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    ${drawBoxPlot(p1.minX, p1.q1X, p1.medianX, p1.q3X, p1.maxX, '#64748b')}
    ${drawBoxPlot(p2.minX, p2.q1X, p2.medianX, p2.q3X, p2.maxX, '#dc2626')}

    ${showLabels ? `
    <text id="txt:label1" x="${plot1X}" y="${centerY + boxHeight / 2 + 56}" class="diagram-text">${dataset1Label}</text>
    <text id="txt:label2" x="${plot2X}" y="${centerY + boxHeight / 2 + 56}" class="diagram-text">${dataset2Label}</text>
    ` : ''}

    ${showValues ? `
    <g id="grp:values1">${valuesMarkup(xs1, [d1Min, d1Q1, d1Median, d1Q3, d1Max])}</g>
    <g id="grp:values2">${valuesMarkup(xs2, [d2Min, d2Q1, d2Median, d2Q3, d2Max])}</g>
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

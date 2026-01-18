import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const linearAxesLine: DiagramEngineTemplate = {
  templateId: 'math.graphs.linear_axes_line.v1',
  title: 'Linear Graph with Axes',
  description: 'Coordinate axes with optional grid and customizable linear line',
  category: 'graphs',
  schema: {
    labels: {
      xLabel: { default: 'x', maxLen: 10 },
      yLabel: { default: 'y', maxLen: 10 }
    },
    values: {
      gradient: { default: 1, type: 'number', min: -10, max: 10 },
      intercept: { default: 0, type: 'number', min: -10, max: 10 }
    },
    visibility: {
      showGrid: { default: true },
      showLine: { default: true },
      showPoints: { default: false }
    },
    positions: {
      point1: { default: { x: 0.3, y: 0.6 }, normalized: true },
      point2: { default: { x: 0.7, y: 0.4 }, normalized: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;
    const padding = 50;
    const gridSize = 50;

    const labelX = params.labels?.xLabel || 'x';
    const labelY = params.labels?.yLabel || 'y';

    const gradient = Number(params.values?.gradient) || 1;
    const intercept = Number(params.values?.intercept) || 0;

    const showGrid = params.visibility?.showGrid !== false;
    const showLine = params.visibility?.showLine !== false;
    const showPoints = params.visibility?.showPoints === true;

    const centerX = width / 2;
    const centerY = height / 2;

    let lineMarkup = '';
    if (showLine) {
      const x1 = padding;
      const y1 = centerY - (gradient * (x1 - centerX) + intercept * gridSize);
      const x2 = width - padding;
      const y2 = centerY - (gradient * (x2 - centerX) + intercept * gridSize);

      lineMarkup = `<line id="ln:graphLine" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3b82f6" stroke-width="3"/>`;
    }

    let pointsMarkup = '';
    if (showPoints) {
      const pos1 = params.positions?.point1 || { x: 0.3, y: 0.6 };
      const pos2 = params.positions?.point2 || { x: 0.7, y: 0.4 };

      const p1x = pos1.x * width;
      const p1y = pos1.y * height;
      const p2x = pos2.x * width;
      const p2y = pos2.y * height;

      pointsMarkup = `
      <circle id="pt:A" cx="${p1x}" cy="${p1y}" r="5" fill="#ef4444"/>
      <circle id="pt:B" cx="${p2x}" cy="${p2y}" r="5" fill="#ef4444"/>
      <text id="txt:A" x="${p1x + 10}" y="${p1y - 5}" class="diagram-text-point">A</text>
      <text id="txt:B" x="${p2x + 10}" y="${p2y - 5}" class="diagram-text-point">B</text>
      `;
    }

    const gridMarkup = showGrid ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: 9 }, (_, i) => {
        const y = padding + i * gridSize;
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
      ${Array.from({ length: 9 }, (_, i) => {
        const x = padding + i * gridSize;
        return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#94a3b8"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #94a3b8; }
    .diagram-text-point { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #f87171; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${centerY}" x2="${width - padding}" y2="${centerY}" class="diagram-axis" marker-end="url(#arrowhead)"/>
    <line id="ln:yAxis" x1="${centerX}" y1="${height - padding}" x2="${centerX}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>

    <text id="txt:xLabel" x="${width - padding + 15}" y="${centerY + 5}" class="diagram-text">${labelX}</text>
    <text id="txt:yLabel" x="${centerX + 5}" y="${padding - 10}" class="diagram-text">${labelY}</text>
    <text id="txt:origin" x="${centerX - 20}" y="${centerY + 20}" class="diagram-text-small">0</text>

    ${lineMarkup}
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

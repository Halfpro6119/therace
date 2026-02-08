import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const coordinatePoint: DiagramEngineTemplate = {
  templateId: 'math.graphs.coordinate_point.v1',
  title: 'Coordinate Point',
  description: 'Coordinate grid with a single labelled point',
  category: 'graphs',
  schema: {
    labels: {
      xLabel: { default: 'x', maxLen: 10 },
      yLabel: { default: 'y', maxLen: 10 },
      pointLabel: { default: 'P', maxLen: 5 }
    },
    values: {
      xMin: { default: -5, type: 'number', min: -50, max: 0 },
      xMax: { default: 5, type: 'number', min: 0, max: 50 },
      yMin: { default: -5, type: 'number', min: -50, max: 0 },
      yMax: { default: 5, type: 'number', min: 0, max: 50 },
      pointX: { default: 3, type: 'number', min: -50, max: 50 },
      pointY: { default: 2, type: 'number', min: -50, max: 50 }
    },
    visibility: {
      showGrid: { default: true },
      showNumbers: { default: true },
      showPoint: { default: true },
      highlightPoint: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;
    const padding = 50;

    const labelX = params.labels?.xLabel || 'x';
    const labelY = params.labels?.yLabel || 'y';
    const pointLabel = params.labels?.pointLabel || 'P';

    const xMin = Number(params.values?.xMin) || -5;
    const xMax = Number(params.values?.xMax) || 5;
    const yMin = Number(params.values?.yMin) || -5;
    const yMax = Number(params.values?.yMax) || 5;
    const pointX = Number(params.values?.pointX) || 3;
    const pointY = Number(params.values?.pointY) || 2;

    const showGrid = params.visibility?.showGrid !== false;
    const showNumbers = params.visibility?.showNumbers !== false;
    const showPoint = params.visibility?.showPoint !== false;
    const highlightPoint = params.visibility?.highlightPoint !== false;

    const centerX = width / 2;
    const centerY = height / 2;
    const gridSize = (width - 2 * padding) / (xMax - xMin);

    // Convert point coordinates to pixel coordinates
    const pointPixelX = padding + (pointX - xMin) * gridSize;
    const pointPixelY = height - padding - (pointY - yMin) * gridSize;

    const gridMarkup = showGrid ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: xMax - xMin + 1 }, (_, i) => {
        const x = padding + i * gridSize;
        return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
      ${Array.from({ length: yMax - yMin + 1 }, (_, i) => {
        const y = padding + i * gridSize;
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#94a3b8" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const pointMarkup = showPoint ? `
    <circle id="pt:P" cx="${pointPixelX}" cy="${pointPixelY}" r="${highlightPoint ? 5 : 4}" fill="${highlightPoint ? '#60a5fa' : '#ef4444'}" stroke="${highlightPoint ? '#3b82f6' : '#dc2626'}" stroke-width="${highlightPoint ? 2 : 1}"/>
    <text id="txt:P" x="${pointPixelX + 12}" y="${pointPixelY - 8}" class="diagram-text-point">${pointLabel}</text>
    ` : '';

    const numbersMarkup = showNumbers ? `
    <text id="txt:origin" x="${centerX - 15}" y="${centerY + 15}" class="diagram-text-small">0</text>
    ${Array.from({ length: xMax - xMin + 1 }, (_, i) => {
      const xVal = xMin + i;
      if (xVal === 0) return '';
      const x = padding + i * gridSize;
      return `<text x="${x}" y="${centerY + 25}" class="diagram-text-small" text-anchor="middle">${xVal}</text>`;
    }).join('\n')}
    ${Array.from({ length: yMax - yMin + 1 }, (_, i) => {
      const yVal = yMax - i;
      if (yVal === 0) return '';
      const y = padding + i * gridSize;
      return `<text x="${centerX - 15}" y="${y + 5}" class="diagram-text-small" text-anchor="middle">${yVal}</text>`;
    }).join('\n')}
    ` : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#94a3b8"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #94a3b8; text-anchor: middle; }
    .diagram-text-point { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #60a5fa; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${centerY}" x2="${width - padding}" y2="${centerY}" class="diagram-axis" marker-end="url(#arrowhead)"/>
    <line id="ln:yAxis" x1="${centerX}" y1="${height - padding}" x2="${centerX}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>

    <text id="txt:xLabel" x="${width - padding + 15}" y="${centerY + 5}" class="diagram-text">${labelX}</text>
    <text id="txt:yLabel" x="${centerX + 5}" y="${padding - 10}" class="diagram-text">${labelY}</text>

    ${numbersMarkup}
    ${pointMarkup}
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

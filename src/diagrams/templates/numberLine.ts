import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const numberLine: DiagramEngineTemplate = {
  templateId: 'math.algebra.number_line.v1',
  title: 'Number Line',
  description: 'Number line with inequality visualization',
  category: 'algebra',
  schema: {
    labels: {
      label: { default: 'x', maxLen: 10 }
    },
    values: {
      min: { default: -5, type: 'number', min: -100, max: 0 },
      max: { default: 10, type: 'number', min: 0, max: 100 },
      value: { default: 6, type: 'number', min: -100, max: 100 },
      strict: { default: true, type: 'number', min: 0, max: 1 }
    },
    visibility: {
      showNumbers: { default: true },
      showArrow: { default: true },
      showOpenCircle: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 600;
    const height = 200;
    const padding = 50;

    const label = params.labels?.label || 'x';

    const min = Number(params.values?.min) || -5;
    const max = Number(params.values?.max) || 10;
    const value = Number(params.values?.value) || 6;
    const strict = Number(params.values?.strict) !== 0;

    const showNumbers = params.visibility?.showNumbers !== false;
    const showArrow = params.visibility?.showArrow !== false;
    const showOpenCircle = params.visibility?.showOpenCircle !== false;

    const lineY = height / 2;
    const lineX1 = padding;
    const lineX2 = width - padding;
    const lineLength = lineX2 - lineX1;

    const scale = lineLength / (max - min);
    const valueX = lineX1 + (value - min) * scale;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-numline" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
  <style>
    .diagram-line { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-arrow { stroke: #64748b; stroke-width: 2.5; fill: none; }
    .diagram-circle-open { fill: none; stroke: #64748b; stroke-width: 2; }
    .diagram-circle-filled { fill: #64748b; stroke: #64748b; stroke-width: 2; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; text-anchor: middle; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    <line id="ln:numberLine" x1="${lineX1}" y1="${lineY}" x2="${lineX2}" y2="${lineY}" class="diagram-line" marker-end="url(#arrowhead-numline)"/>

    ${showNumbers ? Array.from({ length: max - min + 1 }, (_, i) => {
      const num = min + i;
      const x = lineX1 + (num - min) * scale;
      return `
      <line x1="${x}" y1="${lineY - 8}" x2="${x}" y2="${lineY + 8}" stroke="#64748b" stroke-width="2"/>
      <text x="${x}" y="${lineY + 30}" class="diagram-text-small">${num}</text>
      `;
    }).join('\n') : ''}

    ${showOpenCircle ? (strict ? 
      `<circle id="pt:value" cx="${valueX}" cy="${lineY}" r="6" class="diagram-circle-open"/>` :
      `<circle id="pt:value" cx="${valueX}" cy="${lineY}" r="6" class="diagram-circle-filled"/>`
    ) : ''}

    ${showArrow ? `
    <line id="ln:arrow" x1="${valueX}" y1="${lineY}" x2="${lineX1}" y2="${lineY}" class="diagram-arrow" marker-start="url(#arrowhead-numline)"/>
    ` : ''}

    <text id="txt:label" x="${lineX2 + 20}" y="${lineY + 5}" class="diagram-text">${label}</text>
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

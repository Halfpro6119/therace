import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const circleBasic: DiagramEngineTemplate = {
  templateId: 'math.circle.basic.v1',
  title: 'Basic Circle',
  description: 'Simple circle with center and radius marked',
  category: 'geometry',
  schema: {
    labels: {
      O: { default: 'O', maxLen: 3 },
      radiusLabel: { default: '6 cm', maxLen: 20 }
    },
    values: {
      radius: { default: 6, type: 'number', min: 1, max: 100 }
    },
    visibility: {
      showCenter: { default: true },
      showRadius: { default: true },
      showRadiusLabel: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 400;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    const labelO = params.labels?.O || 'O';
    const radiusLabel = params.labels?.radiusLabel || '6 cm';

    const radius = Number(params.values?.radius) || 6;
    const radiusPixels = radius * 15; // Scale for display

    const showCenter = params.visibility?.showCenter !== false;
    const showRadius = params.visibility?.showRadius !== false;
    const showRadiusLabel = params.visibility?.showRadiusLabel !== false;

    // Radius line from center to edge (pointing right)
    const radiusEndX = centerX + radiusPixels;
    const radiusEndY = centerY;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-circle { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-line { stroke: #60a5fa; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-point-highlight { fill: #60a5fa; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-radius { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #60a5fa; text-anchor: middle; }
  </style>

  <g id="grp:main">
    <circle id="ln:circle" cx="${centerX}" cy="${centerY}" r="${radiusPixels}" class="diagram-circle"/>

    ${showRadius ? `<line id="ln:radius" x1="${centerX}" y1="${centerY}" x2="${radiusEndX}" y2="${radiusEndY}" class="diagram-line"/>` : ''}

    ${showCenter ? `
    <circle id="pt:O" cx="${centerX}" cy="${centerY}" r="5" class="diagram-point-highlight"/>
    <text id="txt:O" x="${centerX - 20}" y="${centerY + 5}" class="diagram-text">${labelO}</text>
    ` : ''}

    ${showRadius ? `<circle id="pt:radiusEnd" cx="${radiusEndX}" cy="${radiusEndY}" r="4" class="diagram-point"/>` : ''}

    ${showRadiusLabel ? `<text id="txt:radiusLabel" x="${(centerX + radiusEndX) / 2}" y="${centerY - 15}" class="diagram-text-radius">${radiusLabel}</text>` : ''}
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

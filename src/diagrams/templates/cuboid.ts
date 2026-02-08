import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const cuboid: DiagramEngineTemplate = {
  templateId: 'math.geometry.cuboid.v1',
  title: 'Cuboid',
  description: 'Simple 3D cuboid with dimensions labeled',
  category: 'geometry',
  schema: {
    labels: {
      length: { default: '8 cm', maxLen: 20 },
      width: { default: '5 cm', maxLen: 20 },
      height: { default: '3 cm', maxLen: 20 }
    },
    values: {
      length: { default: 8, type: 'number', min: 1, max: 50 },
      width: { default: 5, type: 'number', min: 1, max: 50 },
      height: { default: 3, type: 'number', min: 1, max: 50 }
    },
    visibility: {
      showDimensions: { default: true },
      showHiddenEdges: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 450;

    const labelLength = params.labels?.length || '8 cm';
    const labelWidth = params.labels?.width || '5 cm';
    const labelHeight = params.labels?.height || '3 cm';

    const lengthVal = Number(params.values?.length) || 8;
    const widthVal = Number(params.values?.width) || 5;
    const heightVal = Number(params.values?.height) || 3;

    const showDimensions = params.visibility?.showDimensions !== false;
    const showHiddenEdges = params.visibility?.showHiddenEdges !== false;

    const scale = 25;
    const offsetX = 100;
    const offsetY = 300;

    const p1 = { x: offsetX, y: offsetY };
    const p2 = { x: offsetX + lengthVal * scale, y: offsetY };
    const p3 = { x: offsetX + lengthVal * scale + widthVal * scale * 0.5, y: offsetY - widthVal * scale * 0.3 };
    const p4 = { x: offsetX + widthVal * scale * 0.5, y: offsetY - widthVal * scale * 0.3 };
    const p5 = { x: offsetX, y: offsetY - heightVal * scale };
    const p6 = { x: offsetX + lengthVal * scale, y: offsetY - heightVal * scale };
    const p7 = { x: offsetX + lengthVal * scale + widthVal * scale * 0.5, y: offsetY - heightVal * scale - widthVal * scale * 0.3 };
    const p8 = { x: offsetX + widthVal * scale * 0.5, y: offsetY - heightVal * scale - widthVal * scale * 0.3 };

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-line-hidden { stroke: #64748b; stroke-width: 1; stroke-dasharray: 4,4; fill: none; }
    .diagram-face { fill: rgba(100, 116, 139, 0.08); stroke: #64748b; stroke-width: 2; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; }
    .diagram-text-value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; fill: #94a3b8; }
  </style>

  <g id="grp:main">
    <polygon id="face:front" points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p6.x},${p6.y} ${p5.x},${p5.y}" class="diagram-face"/>
    <polygon id="face:right" points="${p2.x},${p2.y} ${p3.x},${p3.y} ${p7.x},${p7.y} ${p6.x},${p6.y}" class="diagram-face"/>
    <polygon id="face:top" points="${p5.x},${p5.y} ${p6.x},${p6.y} ${p7.x},${p7.y} ${p8.x},${p8.y}" class="diagram-face"/>

    ${showHiddenEdges ? `
    <line id="ln:hidden1" x1="${p1.x}" y1="${p1.y}" x2="${p4.x}" y2="${p4.y}" class="diagram-line-hidden"/>
    <line id="ln:hidden2" x1="${p4.x}" y1="${p4.y}" x2="${p8.x}" y2="${p8.y}" class="diagram-line-hidden"/>
    <line id="ln:hidden3" x1="${p4.x}" y1="${p4.y}" x2="${p3.x}" y2="${p3.y}" class="diagram-line-hidden"/>
    ` : ''}

    ${showDimensions ? `
    <text id="txt:length" x="${(p1.x + p2.x) / 2}" y="${p1.y + 25}" class="diagram-text" text-anchor="middle">${labelLength}</text>
    <text id="txt:width" x="${p2.x + 40}" y="${(p2.y + p3.y) / 2 + 10}" class="diagram-text" text-anchor="middle">${labelWidth}</text>
    <text id="txt:height" x="${p1.x - 25}" y="${(p1.y + p5.y) / 2}" class="diagram-text" text-anchor="middle">${labelHeight}</text>
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

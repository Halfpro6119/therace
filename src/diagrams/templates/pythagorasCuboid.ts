import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const pythagorasCuboid: DiagramEngineTemplate = {
  templateId: 'math.pythagoras.cuboid_3d.v1',
  title: 'Pythagoras 3D Cuboid Diagonal',
  description: '3D cuboid showing space diagonal for Pythagoras in 3D',
  category: 'geometry',
  schema: {
    labels: {
      length: { default: 'l', maxLen: 10 },
      width: { default: 'w', maxLen: 10 },
      height: { default: 'h', maxLen: 10 }
    },
    values: {
      length: { default: 6, type: 'number', min: 1, max: 20 },
      width: { default: 4, type: 'number', min: 1, max: 20 },
      height: { default: 3, type: 'number', min: 1, max: 20 }
    },
    visibility: {
      showDiagonal: { default: true },
      showLabels: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 450;

    const labelLength = params.labels?.length || 'l';
    const labelWidth = params.labels?.width || 'w';
    const labelHeight = params.labels?.height || 'h';

    const lengthVal = Number(params.values?.length) || 6;
    const widthVal = Number(params.values?.width) || 4;
    const heightVal = Number(params.values?.height) || 3;

    const showDiagonal = params.visibility?.showDiagonal !== false;
    const showLabels = params.visibility?.showLabels !== false;

    const scale = 30;
    const offsetX = 120;
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
    .diagram-line { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-line-hidden { stroke: #94a3b8; stroke-width: 1; stroke-dasharray: 4,4; fill: none; }
    .diagram-diagonal { stroke: #f87171; stroke-width: 2; fill: none; }
    .diagram-face { fill: #1e40af; fill-opacity: 0.1; stroke: #94a3b8; stroke-width: 2; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; }
    .diagram-text-value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #60a5fa; }
  </style>

  <g id="grp:main">
    <polygon id="face:front" points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p6.x},${p6.y} ${p5.x},${p5.y}" class="diagram-face"/>
    <polygon id="face:right" points="${p2.x},${p2.y} ${p3.x},${p3.y} ${p7.x},${p7.y} ${p6.x},${p6.y}" class="diagram-face"/>
    <polygon id="face:top" points="${p5.x},${p5.y} ${p6.x},${p6.y} ${p7.x},${p7.y} ${p8.x},${p8.y}" class="diagram-face"/>

    <line id="ln:hidden1" x1="${p1.x}" y1="${p1.y}" x2="${p4.x}" y2="${p4.y}" class="diagram-line-hidden"/>
    <line id="ln:hidden2" x1="${p4.x}" y1="${p4.y}" x2="${p8.x}" y2="${p8.y}" class="diagram-line-hidden"/>
    <line id="ln:hidden3" x1="${p4.x}" y1="${p4.y}" x2="${p3.x}" y2="${p3.y}" class="diagram-line-hidden"/>

    ${showDiagonal ? `<line id="ln:diagonal" x1="${p1.x}" y1="${p1.y}" x2="${p7.x}" y2="${p7.y}" class="diagram-diagonal"/>` : ''}

    ${showLabels ? `
    <text id="txt:length" x="${(p1.x + p2.x) / 2}" y="${p1.y + 25}" text-anchor="middle" class="diagram-text">${labelLength}</text>
    <text id="txt:lengthVal" x="${(p1.x + p2.x) / 2}" y="${p1.y + 42}" text-anchor="middle" class="diagram-text-value">${lengthVal}</text>

    <text id="txt:width" x="${p2.x + 40}" y="${(p2.y + p3.y) / 2 + 10}" text-anchor="middle" class="diagram-text">${labelWidth}</text>
    <text id="txt:widthVal" x="${p2.x + 40}" y="${(p2.y + p3.y) / 2 + 25}" text-anchor="middle" class="diagram-text-value">${widthVal}</text>

    <text id="txt:height" x="${p1.x - 25}" y="${(p1.y + p5.y) / 2}" text-anchor="middle" class="diagram-text">${labelHeight}</text>
    <text id="txt:heightVal" x="${p1.x - 25}" y="${(p1.y + p5.y) / 2 + 15}" text-anchor="middle" class="diagram-text-value">${heightVal}</text>
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

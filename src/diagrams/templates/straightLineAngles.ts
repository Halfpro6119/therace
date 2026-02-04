import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const straightLineAngles: DiagramEngineTemplate = {
  templateId: 'math.geometry.straight_line_angles.v1',
  title: 'Straight Line Angles',
  description: 'Horizontal line with two adjacent angles marked',
  category: 'geometry',
  schema: {
    labels: {
      angle1Label: { default: '(3x + 10)°', maxLen: 30 },
      angle2Label: { default: '(2x + 30)°', maxLen: 30 }
    },
    values: {
      angle1: { default: 100, type: 'number', min: 1, max: 179 },
      angle2: { default: 80, type: 'number', min: 1, max: 179 }
    },
    visibility: {
      showLine: { default: true },
      showAngleArcs: { default: true },
      showAngleLabels: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 300;

    const angle1Label = params.labels?.angle1Label || '(3x + 10)°';
    const angle2Label = params.labels?.angle2Label || '(2x + 30)°';

    const angle1 = Number(params.values?.angle1) || 100;
    const angle2 = Number(params.values?.angle2) || 80;

    const showLine = params.visibility?.showLine !== false;
    const showAngleArcs = params.visibility?.showAngleArcs !== false;
    const showAngleLabels = params.visibility?.showAngleLabels !== false;

    const lineX1 = 50;
    const lineY = height / 2;
    const lineX2 = width - 50;
    const vertexX = (lineX1 + lineX2) / 2;
    const vertexY = lineY;

    const arcRadius = 40;
    const arc1StartAngle = 0;
    const arc1EndAngle = angle1;
    const arc2StartAngle = 180;
    const arc2EndAngle = 180 - angle2;

    // Calculate arc paths
    const arc1Path = `M ${vertexX + arcRadius} ${vertexY} A ${arcRadius} ${arcRadius} 0 ${angle1 > 180 ? 1 : 0} 0 ${vertexX + arcRadius * Math.cos(angle1 * Math.PI / 180)} ${vertexY - arcRadius * Math.sin(angle1 * Math.PI / 180)}`;
    const arc2Path = `M ${vertexX - arcRadius} ${vertexY} A ${arcRadius} ${arcRadius} 0 ${angle2 > 180 ? 1 : 0} 1 ${vertexX - arcRadius * Math.cos(angle2 * Math.PI / 180)} ${vertexY - arcRadius * Math.sin(angle2 * Math.PI / 180)}`;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-arc { stroke: #60a5fa; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #60a5fa; }
  </style>

  <g id="grp:main">
    ${showLine ? `<line id="ln:straightLine" x1="${lineX1}" y1="${lineY}" x2="${lineX2}" y2="${lineY}" class="diagram-line"/>` : ''}
    
    <circle id="pt:vertex" cx="${vertexX}" cy="${vertexY}" r="4" class="diagram-point"/>

    ${showAngleArcs ? `
    <path id="arc:angle1" d="${arc1Path}" class="diagram-arc"/>
    <path id="arc:angle2" d="${arc2Path}" class="diagram-arc"/>
    ` : ''}

    ${showAngleLabels ? `
    <text id="txt:angle1" x="${vertexX + arcRadius * 0.7}" y="${vertexY - arcRadius * 0.7 - 10}" class="diagram-text">${angle1Label}</text>
    <text id="txt:angle2" x="${vertexX - arcRadius * 0.7 - 60}" y="${vertexY - arcRadius * 0.7 - 10}" class="diagram-text">${angle2Label}</text>
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

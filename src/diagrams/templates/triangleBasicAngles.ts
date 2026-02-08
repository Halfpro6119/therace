import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';
import { diagramStyleBlock, angleArcPath } from '../designTokens';

export const triangleBasicAngles: DiagramEngineTemplate = {
  templateId: 'math.triangle.basic_angles.v1',
  title: 'Triangle - Basic Angles',
  description: 'Triangle with three angles, used for finding unknown angles',
  category: 'geometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 }
    },
    values: {
      angleA: { default: 60, type: 'number', min: 1, max: 179 },
      angleB: { default: 60, type: 'number', min: 1, max: 179 },
      angleC: { default: 60, type: 'number', min: 1, max: 179 }
    },
    visibility: {
      showAngleA: { default: true },
      showAngleB: { default: true },
      showAngleC: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 400;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';

    const angleA = Number(params.values?.angleA) || 60;
    const angleB = Number(params.values?.angleB) || 60;
    const angleC = Number(params.values?.angleC) || 60;

    const showAngleA = params.visibility?.showAngleA !== false;
    const showAngleB = params.visibility?.showAngleB !== false;
    const showAngleC = params.visibility?.showAngleC !== false;

    const ax = 100;
    const ay = 300;
    const bx = 400;
    const by = 300;
    const cx = 250;
    const cy = 100;
    const arcR = 22;

    const arcA = showAngleA ? angleArcPath(ax, ay, bx, by, cx, cy, arcR) : '';
    const arcB = showAngleB ? angleArcPath(bx, by, ax, ay, cx, cy, arcR) : '';
    const arcC = showAngleC ? angleArcPath(cx, cy, ax, ay, bx, by, arcR) : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
${diagramStyleBlock()}
  </style>

  <g id="grp:main">
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <line id="ln:BC" x1="${bx}" y1="${by}" x2="${cx}" y2="${cy}" class="diagram-line"/>
    <line id="ln:CA" x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" class="diagram-line"/>

    ${arcA ? `<path id="arc:A" d="${arcA}" class="diagram-arc"/>` : ''}
    ${arcB ? `<path id="arc:B" d="${arcB}" class="diagram-arc"/>` : ''}
    ${arcC ? `<path id="arc:C" d="${arcC}" class="diagram-arc"/>` : ''}

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="4" class="diagram-point"/>

    <text id="txt:A" x="${ax - 18}" y="${ay + 6}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 14}" y="${by + 6}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx}" y="${cy - 12}" text-anchor="middle" class="diagram-text">${labelC}</text>

    ${showAngleA ? `<text id="txt:angleA" x="${ax + 28}" y="${ay - 12}" class="diagram-text-angle">${angleA}°</text>` : ''}
    ${showAngleB ? `<text id="txt:angleB" x="${bx - 38}" y="${by - 12}" class="diagram-text-angle">${angleB}°</text>` : ''}
    ${showAngleC ? `<text id="txt:angleC" x="${cx}" y="${cy + 28}" text-anchor="middle" class="diagram-text-angle">${angleC}°</text>` : ''}
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

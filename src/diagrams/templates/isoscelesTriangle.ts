import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';
import { diagramStyleBlock, angleArcPath } from '../designTokens';

export const isoscelesTriangle: DiagramEngineTemplate = {
  templateId: 'math.triangle.isosceles.v1',
  title: 'Isosceles Triangle',
  description: 'Isosceles triangle with equal sides marked and base angles',
  category: 'geometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 }
    },
    values: {
      baseAngle: { default: 50, type: 'number', min: 1, max: 89 },
      apexAngle: { default: 80, type: 'number', min: 1, max: 178 }
    },
    visibility: {
      showEqualMarks: { default: true },
      showAngles: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 620;
    const height = 500;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';

    const baseAngle = Number(params.values?.baseAngle) || 50;
    const apexAngle = Number(params.values?.apexAngle) || 80;

    const showEqualMarks = params.visibility?.showEqualMarks !== false;
    const showAngles = params.visibility?.showAngles !== false;

    const ax = 120;
    const ay = 400;
    const bx = 500;
    const by = 400;
    const cx = 310;
    const cy = 100;
    // Equal marks: short perpendicular ticks along AC and BC at 0.35 and 0.45 along each side
    const tickLen = 8;
    const placeTick = (x1: number, y1: number, x2: number, y2: number, t: number) => {
      const mx = x1 + (x2 - x1) * t;
      const my = y1 + (y2 - y1) * t;
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const nx = (-dy / len) * tickLen;
      const ny = (dx / len) * tickLen;
      return { x1: mx - nx, y1: my - ny, x2: mx + nx, y2: my + ny };
    };
    const t1 = placeTick(ax, ay, cx, cy, 0.35);
    const t2 = placeTick(ax, ay, cx, cy, 0.45);
    const t3 = placeTick(bx, by, cx, cy, 0.35);
    const t4 = placeTick(bx, by, cx, cy, 0.45);

    const arcR = 24;
    const arcA = showAngles ? angleArcPath(ax, ay, bx, by, cx, cy, arcR) : '';
    const arcB = showAngles ? angleArcPath(bx, by, ax, ay, cx, cy, arcR) : '';
    const arcC = showAngles ? angleArcPath(cx, cy, ax, ay, bx, by, arcR) : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
${diagramStyleBlock()}
  </style>

  <g id="grp:main">
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <line id="ln:AC" x1="${ax}" y1="${ay}" x2="${cx}" y2="${cy}" class="diagram-line"/>
    <line id="ln:BC" x1="${bx}" y1="${by}" x2="${cx}" y2="${cy}" class="diagram-line"/>

    ${showEqualMarks ? `
    <g id="grp:equal-marks">
      <line id="mk:eq1a" x1="${t1.x1}" y1="${t1.y1}" x2="${t1.x2}" y2="${t1.y2}" class="diagram-equal-mark"/>
      <line id="mk:eq1b" x1="${t2.x1}" y1="${t2.y1}" x2="${t2.x2}" y2="${t2.y2}" class="diagram-equal-mark"/>
      <line id="mk:eq2a" x1="${t3.x1}" y1="${t3.y1}" x2="${t3.x2}" y2="${t3.y2}" class="diagram-equal-mark"/>
      <line id="mk:eq2b" x1="${t4.x1}" y1="${t4.y1}" x2="${t4.x2}" y2="${t4.y2}" class="diagram-equal-mark"/>
    </g>` : ''}

    ${arcA ? `<path id="arc:A" d="${arcA}" class="diagram-arc"/>` : ''}
    ${arcB ? `<path id="arc:B" d="${arcB}" class="diagram-arc"/>` : ''}
    ${arcC ? `<path id="arc:C" d="${arcC}" class="diagram-arc"/>` : ''}

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="4" class="diagram-point"/>

    <text id="txt:A" x="${ax - 22}" y="${ay + 10}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 14}" y="${by + 10}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx}" y="${cy - 14}" text-anchor="middle" class="diagram-text">${labelC}</text>

    ${showAngles ? `
    <text id="txt:angleA" x="${ax + 30}" y="${ay - 18}" class="diagram-text-angle">${baseAngle}°</text>
    <text id="txt:angleB" x="${bx - 42}" y="${by - 18}" class="diagram-text-angle">${baseAngle}°</text>
    <text id="txt:angleC" x="${cx}" y="${cy + 34}" text-anchor="middle" class="diagram-text-angle">${apexAngle}°</text>
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

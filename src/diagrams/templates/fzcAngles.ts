import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const fzcAngles: DiagramEngineTemplate = {
  templateId: 'math.parallel_lines.fzc_angles.v1',
  title: 'F, Z, C Angles (Parallel Lines)',
  description: 'Two parallel lines with a transversal showing alternate, corresponding, or co-interior angles',
  category: 'geometry',
  schema: {
    labels: {
      angle1: { default: 'a°', maxLen: 10 },
      angle2: { default: 'b°', maxLen: 10 }
    },
    values: {
      angle1Value: { default: 65, type: 'number', min: 0, max: 180 },
      angle2Value: { default: 65, type: 'number', min: 0, max: 180 }
    },
    visibility: {
      showParallelMarks: { default: true },
      showAngle1: { default: true },
      showAngle2: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 450;
    const height = 350;

    const labelAngle1 = params.labels?.angle1 || 'a°';
    const labelAngle2 = params.labels?.angle2 || 'b°';

    const showParallelMarks = params.visibility?.showParallelMarks !== false;
    const showAngle1 = params.visibility?.showAngle1 !== false;
    const showAngle2 = params.visibility?.showAngle2 !== false;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-transversal { stroke: #60a5fa; stroke-width: 2; fill: none; }
    .diagram-angle1 { fill: #f87171; fill-opacity: 0.3; }
    .diagram-angle2 { fill: #4ade80; fill-opacity: 0.3; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; }
    .diagram-text-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; }
    .diagram-parallel-mark { stroke: #94a3b8; stroke-width: 2; }
  </style>

  <g id="grp:main">
    <line id="ln:L1" x1="50" y1="100" x2="400" y2="100" class="diagram-line"/>
    <line id="ln:L2" x1="50" y1="250" x2="400" y2="250" class="diagram-line"/>
    <line id="ln:T" x1="150" y1="50" x2="300" y2="300" class="diagram-transversal"/>

    ${showAngle1 ? `<path id="mk:angle1" d="M 190 100 L 210 100 L 200 85" class="diagram-angle1"/>` : ''}
    ${showAngle2 ? `<path id="mk:angle2" d="M 230 250 L 250 250 L 240 235" class="diagram-angle2"/>` : ''}

    <text id="txt:L1" x="410" y="105" class="diagram-text-label">L₁</text>
    <text id="txt:L2" x="410" y="255" class="diagram-text-label">L₂</text>
    ${showAngle1 ? `<text id="txt:angle1" x="205" y="75" class="diagram-text" fill="#ef4444">${labelAngle1}</text>` : ''}
    ${showAngle2 ? `<text id="txt:angle2" x="245" y="225" class="diagram-text" fill="#22c55e">${labelAngle2}</text>` : ''}

    ${showParallelMarks ? `
    <g id="grp:parallel-marks">
      <line id="mk:par1a" x1="120" y1="95" x2="130" y2="95" class="diagram-parallel-mark"/>
      <line id="mk:par1b" x1="120" y1="105" x2="130" y2="105" class="diagram-parallel-mark"/>
      <line id="mk:par2a" x1="120" y1="245" x2="130" y2="245" class="diagram-parallel-mark"/>
      <line id="mk:par2b" x1="120" y1="255" x2="130" y2="255" class="diagram-parallel-mark"/>
    </g>` : ''}
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

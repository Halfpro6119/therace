import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';
import { diagramStyleBlock } from '../designTokens';

export const cosineRuleTriangle: DiagramEngineTemplate = {
  templateId: 'math.trig.cosine_rule_triangle.v1',
  title: 'Cosine Rule Triangle',
  description: 'Triangle with sides and included angle for cosine rule calculations',
  category: 'trigonometry',
  schema: {
    labels: {
      A: { default: 'A', maxLen: 3 },
      B: { default: 'B', maxLen: 3 },
      C: { default: 'C', maxLen: 3 }
    },
    values: {
      sideA: { default: 7, type: 'number', min: 1, max: 100 },
      sideB: { default: 9, type: 'number', min: 1, max: 100 },
      sideC: { default: 0, type: 'number', min: 0, max: 100 },
      angleC: { default: 120, type: 'number', min: 1, max: 179 }
    },
    visibility: {
      showSideLengths: { default: true },
      showAngleC: { default: true },
      showAngleArc: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 620;
    const height = 500;

    const labelA = params.labels?.A || 'A';
    const labelB = params.labels?.B || 'B';
    const labelC = params.labels?.C || 'C';

    const sideA = Number(params.values?.sideA) || 7;
    const sideB = Number(params.values?.sideB) || 9;
    const sideC = Number(params.values?.sideC) || 0;
    const angleC = Number(params.values?.angleC) || 120;

    const showSideLengths = params.visibility?.showSideLengths !== false;
    const showAngleC = params.visibility?.showAngleC !== false;
    const showAngleArc = params.visibility?.showAngleArc !== false;

    const scale = 20;
    const cx = 360;
    const cy = 300;

    // Place C at vertex, sides a and b extend from C
    const angleCRad = (angleC * Math.PI) / 180;
    
    // Side a extends from C at angle 0 (to the right)
    const ax = cx + sideA * scale;
    const ay = cy;
    
    // Side b extends from C at angle angleC
    const bx = cx + sideB * scale * Math.cos(angleCRad);
    const by = cy - sideB * scale * Math.sin(angleCRad);

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
${diagramStyleBlock()}
  </style>

  <g id="grp:main">
    <line id="ln:CA" x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" class="diagram-line"/>
    <line id="ln:CB" x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" class="diagram-line"/>
    <line id="ln:AB" x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" class="diagram-line"/>

    <circle id="pt:A" cx="${ax}" cy="${ay}" r="4" class="diagram-point"/>
    <circle id="pt:B" cx="${bx}" cy="${by}" r="4" class="diagram-point"/>
    <circle id="pt:C" cx="${cx}" cy="${cy}" r="4" class="diagram-point"/>

    <text id="txt:A" x="${ax + 10}" y="${ay + 5}" class="diagram-text">${labelA}</text>
    <text id="txt:B" x="${bx + 10}" y="${by - 10}" class="diagram-text">${labelB}</text>
    <text id="txt:C" x="${cx - 20}" y="${cy + 5}" class="diagram-text">${labelC}</text>

    ${showSideLengths ? `
    <text id="txt:sideA" x="${(cx + ax) / 2}" y="${cy + 20}" class="diagram-text-side">a = ${sideA}</text>
    <text id="txt:sideB" x="${(cx + bx) / 2 - 20}" y="${(cy + by) / 2 - 10}" class="diagram-text-side">b = ${sideB}</text>
    <text id="txt:sideC" x="${(ax + bx) / 2}" y="${(ay + by) / 2 - 15}" class="diagram-text-side">c = ${sideC > 0 ? sideC : '?'}</text>
    ` : ''}

    ${showAngleArc ? `
    <path id="arc:C" d="M ${cx + 20} ${cy} A 20 20 0 ${angleC > 90 ? 1 : 0} 1 ${cx + 20 * Math.cos(angleCRad)} ${cy - 20 * Math.sin(angleCRad)}" class="diagram-arc"/>
    ` : ''}

    ${showAngleC ? `
    <text id="txt:angleC" x="${cx + 35}" y="${cy - 15}" class="diagram-text-angle">${angleC}°</text>
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

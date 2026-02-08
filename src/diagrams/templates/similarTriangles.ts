import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const similarTriangles: DiagramEngineTemplate = {
  templateId: 'math.geometry.similar_triangles.v1',
  title: 'Similar Triangles',
  description: 'Two similar triangles side-by-side with corresponding sides and angles',
  category: 'geometry',
  schema: {
    labels: {
      triangle1A: { default: 'A', maxLen: 3 },
      triangle1B: { default: 'B', maxLen: 3 },
      triangle1C: { default: 'C', maxLen: 3 },
      triangle2D: { default: 'D', maxLen: 3 },
      triangle2E: { default: 'E', maxLen: 3 },
      triangle2F: { default: 'F', maxLen: 3 }
    },
    values: {
      sideAB: { default: 6, type: 'number', min: 1, max: 50 },
      sideBC: { default: 8, type: 'number', min: 1, max: 50 },
      sideAC: { default: 10, type: 'number', min: 1, max: 50 },
      sideDE: { default: 9, type: 'number', min: 1, max: 50 },
      sideEF: { default: 12, type: 'number', min: 1, max: 50 },
      sideDF: { default: 0, type: 'number', min: 0, max: 50 },
      scaleFactor: { default: 1.5, type: 'number', min: 0.1, max: 10 }
    },
    visibility: {
      showSideLengths: { default: true },
      showCorrespondingAngles: { default: true },
      showScaleFactor: { default: false }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 700;
    const height = 400;

    const label1A = params.labels?.triangle1A || 'A';
    const label1B = params.labels?.triangle1B || 'B';
    const label1C = params.labels?.triangle1C || 'C';
    const label2D = params.labels?.triangle2D || 'D';
    const label2E = params.labels?.triangle2E || 'E';
    const label2F = params.labels?.triangle2F || 'F';

    const sideAB = Number(params.values?.sideAB) || 6;
    const sideBC = Number(params.values?.sideBC) || 8;
    const sideAC = Number(params.values?.sideAC) || 10;
    const sideDE = Number(params.values?.sideDE) || 9;
    const sideEF = Number(params.values?.sideEF) || 12;
    const sideDF = Number(params.values?.sideDF) || 0;
    const scaleFactor = Number(params.values?.scaleFactor) || 1.5;

    const showSideLengths = params.visibility?.showSideLengths !== false;
    const showCorrespondingAngles = params.visibility?.showCorrespondingAngles !== false;
    const showScaleFactor = params.visibility?.showScaleFactor === true;

    const scale = 15;
    const triangle1X = 100;
    const triangle1Y = 300;
    const triangle2X = 400;
    const triangle2Y = 300;

    // Triangle 1: A at bottom-left, B at bottom-right, C at top
    const t1Ax = triangle1X;
    const t1Ay = triangle1Y;
    const t1Bx = triangle1X + sideAB * scale;
    const t1By = triangle1Y;
    // Calculate C position using law of cosines
    const angleA = Math.acos((sideAB * sideAB + sideAC * sideAC - sideBC * sideBC) / (2 * sideAB * sideAC));
    const t1Cx = triangle1X + sideAC * scale * Math.cos(angleA);
    const t1Cy = triangle1Y - sideAC * scale * Math.sin(angleA);

    // Triangle 2: D at bottom-left, E at bottom-right, F at top (scaled)
    const t2Dx = triangle2X;
    const t2Dy = triangle2Y;
    const t2Ex = triangle2X + sideDE * scale;
    const t2Ey = triangle2Y;
    const angleD = angleA; // Same angle
    const t2Fx = triangle2X + (sideDF > 0 ? sideDF : sideAC * scaleFactor) * scale * Math.cos(angleD);
    const t2Fy = triangle2Y - (sideDF > 0 ? sideDF : sideAC * scaleFactor) * scale * Math.sin(angleD);

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-point { fill: #64748b; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-side { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; fill: #94a3b8; text-anchor: middle; }
    .diagram-arc { stroke: #dc2626; stroke-width: 1.5; fill: none; }
  </style>

  <g id="grp:main">
    <!-- Triangle 1 -->
    <line id="ln:t1AB" x1="${t1Ax}" y1="${t1Ay}" x2="${t1Bx}" y2="${t1By}" class="diagram-line"/>
    <line id="ln:t1BC" x1="${t1Bx}" y1="${t1By}" x2="${t1Cx}" y2="${t1Cy}" class="diagram-line"/>
    <line id="ln:t1CA" x1="${t1Cx}" y1="${t1Cy}" x2="${t1Ax}" y2="${t1Ay}" class="diagram-line"/>

    <circle id="pt:t1A" cx="${t1Ax}" cy="${t1Ay}" r="4" class="diagram-point"/>
    <circle id="pt:t1B" cx="${t1Bx}" cy="${t1By}" r="4" class="diagram-point"/>
    <circle id="pt:t1C" cx="${t1Cx}" cy="${t1Cy}" r="4" class="diagram-point"/>

    <text id="txt:t1A" x="${t1Ax - 15}" y="${t1Ay + 20}" class="diagram-text">${label1A}</text>
    <text id="txt:t1B" x="${t1Bx + 10}" y="${t1By + 20}" class="diagram-text">${label1B}</text>
    <text id="txt:t1C" x="${t1Cx + 10}" y="${t1Cy - 10}" class="diagram-text">${label1C}</text>

    <!-- Triangle 2 -->
    <line id="ln:t2DE" x1="${t2Dx}" y1="${t2Dy}" x2="${t2Ex}" y2="${t2Ey}" class="diagram-line"/>
    <line id="ln:t2EF" x1="${t2Ex}" y1="${t2Ey}" x2="${t2Fx}" y2="${t2Fy}" class="diagram-line"/>
    <line id="ln:t2FD" x1="${t2Fx}" y1="${t2Fy}" x2="${t2Dx}" y2="${t2Dy}" class="diagram-line"/>

    <circle id="pt:t2D" cx="${t2Dx}" cy="${t2Dy}" r="4" class="diagram-point"/>
    <circle id="pt:t2E" cx="${t2Ex}" cy="${t2Ey}" r="4" class="diagram-point"/>
    <circle id="pt:t2F" cx="${t2Fx}" cy="${t2Fy}" r="4" class="diagram-point"/>

    <text id="txt:t2D" x="${t2Dx - 15}" y="${t2Dy + 20}" class="diagram-text">${label2D}</text>
    <text id="txt:t2E" x="${t2Ex + 10}" y="${t2Ey + 20}" class="diagram-text">${label2E}</text>
    <text id="txt:t2F" x="${t2Fx + 10}" y="${t2Fy - 10}" class="diagram-text">${label2F}</text>

    ${showSideLengths ? `
    <text id="txt:t1AB" x="${(t1Ax + t1Bx) / 2}" y="${t1Ay + 25}" class="diagram-text-side">${sideAB}</text>
    <text id="txt:t1BC" x="${t1Bx + 20}" y="${(t1By + t1Cy) / 2}" class="diagram-text-side">${sideBC}</text>
    <text id="txt:t1AC" x="${(t1Ax + t1Cx) / 2 - 20}" y="${(t1Ay + t1Cy) / 2 - 10}" class="diagram-text-side">${sideAC}</text>

    <text id="txt:t2DE" x="${(t2Dx + t2Ex) / 2}" y="${t2Dy + 25}" class="diagram-text-side">${sideDE}</text>
    <text id="txt:t2EF" x="${t2Ex + 20}" y="${(t2Ey + t2Fy) / 2}" class="diagram-text-side">${sideEF}</text>
    <text id="txt:t2DF" x="${(t2Dx + t2Fx) / 2 - 20}" y="${(t2Dy + t2Fy) / 2 - 10}" class="diagram-text-side">${sideDF > 0 ? sideDF : '?'}</text>
    ` : ''}

    ${showCorrespondingAngles ? `
    <path id="arc:t1A" d="M ${t1Ax + 15} ${t1Ay} A 15 15 0 0 1 ${t1Ax + 15 * Math.cos(angleA)} ${t1Ay - 15 * Math.sin(angleA)}" class="diagram-arc"/>
    <path id="arc:t2D" d="M ${t2Dx + 15} ${t2Dy} A 15 15 0 0 1 ${t2Dx + 15 * Math.cos(angleD)} ${t2Dy - 15 * Math.sin(angleD)}" class="diagram-arc"/>
    ` : ''}

    ${showScaleFactor ? `<text x="${width / 2}" y="50" class="diagram-text" text-anchor="middle">Scale factor: ${scaleFactor}</text>` : ''}
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

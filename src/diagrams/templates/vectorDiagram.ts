import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

/**
 * Vector diagram: coordinate grid with one or more vectors (arrows from point to point).
 * Supports magnitude/direction style and from/to coordinates.
 */
export const vectorDiagram: DiagramEngineTemplate = {
  templateId: 'math.vectors.diagram.v1',
  title: 'Vector Diagram',
  description: 'Coordinate grid with vectors (arrows) from point to point',
  category: 'geometry',
  schema: {
    labels: {
      xLabel: { default: 'x', maxLen: 10 },
      yLabel: { default: 'y', maxLen: 10 }
    },
    values: {
      xMin: { default: -5, type: 'number', min: -20, max: 0 },
      xMax: { default: 5, type: 'number', min: 0, max: 20 },
      yMin: { default: -5, type: 'number', min: -20, max: 0 },
      yMax: { default: 5, type: 'number', min: 0, max: 20 },
      /** JSON array of vectors: [{ "from": [x,y], "to": [x,y] }] */
      vectors: { default: '[{"from":[0,0],"to":[3,4]},{"from":[0,0],"to":[-2,3]}]', type: 'string', min: 0, max: 2000 }
    },
    visibility: {
      showGrid: { default: true },
      showOrigin: { default: true },
      showLabels: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;
    const padding = 50;

    const xMin = Number(params.values?.xMin) ?? -5;
    const xMax = Number(params.values?.xMax) ?? 5;
    const yMin = Number(params.values?.yMin) ?? -5;
    const yMax = Number(params.values?.yMax) ?? 5;
    const showGrid = params.visibility?.showGrid !== false;
    const showOrigin = params.visibility?.showOrigin !== false;
    const showLabels = params.visibility?.showLabels !== false;
    const labelX = params.labels?.xLabel ?? 'x';
    const labelY = params.labels?.yLabel ?? 'y';

    let vectors: Array<{ from: [number, number]; to: [number, number] }> = [];
    try {
      const raw = String(params.values?.vectors ?? '[{"from":[0,0],"to":[3,4]}]');
      vectors = JSON.parse(raw);
      if (!Array.isArray(vectors)) vectors = [];
    } catch {
      vectors = [{ from: [0, 0], to: [3, 4] }];
    }

    const scaleX = (width - 2 * padding) / (xMax - xMin);
    const scaleY = (height - 2 * padding) / (yMax - yMin);
    const toPx = (x: number, y: number) => ({
      x: padding + (x - xMin) * scaleX,
      y: height - padding - (y - yMin) * scaleY
    });

    const gridMarkup = showGrid
      ? Array.from({ length: xMax - xMin + 1 }, (_, i) => {
          const x = padding + i * scaleX;
          return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#334155" stroke-width="0.5" opacity="0.4"/>`;
        }).join('') +
        Array.from({ length: yMax - yMin + 1 }, (_, i) => {
          const y = padding + i * scaleY;
          return `<line x1="${padding}" y1="${height - padding - i * scaleY}" x2="${width - padding}" y2="${height - padding - i * scaleY}" stroke="#334155" stroke-width="0.5" opacity="0.4"/>`;
        }).join('')
      : '';

    const centerPx = toPx(0, 0);
    const axisMarkup =
      `<line id="ln:xAxis" x1="${padding}" y1="${centerPx.y}" x2="${width - padding}" y2="${centerPx.y}" stroke="#64748b" stroke-width="1.5" marker-end="url(#vec-arrow)"/>` +
      `<line id="ln:yAxis" x1="${centerPx.x}" y1="${height - padding}" x2="${centerPx.x}" y2="${padding}" stroke="#64748b" stroke-width="1.5" marker-end="url(#vec-arrow)"/>`;

    const vectorMarkup = vectors
      .map((v, i) => {
        const fromPx = toPx(v.from[0], v.from[1]);
        const toPx_ = toPx(v.to[0], v.to[1]);
        return `<line id="ln:vec${i}" x1="${fromPx.x}" y1="${fromPx.y}" x2="${toPx_.x}" y2="${toPx_.y}" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#vec-arrow-blue)"/>`;
      })
      .join('');

    const originMarkup =
      showOrigin && (xMin <= 0 && 0 <= xMax && yMin <= 0 && 0 <= yMax)
        ? `<circle id="pt:origin" cx="${centerPx.x}" cy="${centerPx.y}" r="4" fill="#64748b"/>`
        : '';

    const labelMarkup = showLabels
      ? `<text x="${width - padding + 8}" y="${centerPx.y + 4}" fill="#94a3b8" font-size="14" font-family="sans-serif">${labelX}</text>` +
        `<text x="${centerPx.x - 20}" y="${padding - 8}" fill="#94a3b8" font-size="14" font-family="sans-serif">${labelY}</text>`
      : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="vec-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <polygon points="0 0, 8 4, 0 8" fill="#64748b"/>
    </marker>
    <marker id="vec-arrow-blue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <polygon points="0 0, 8 4, 0 8" fill="#3b82f6"/>
    </marker>
  </defs>
  <g id="grp:grid">${gridMarkup}</g>
  <g id="grp:axes">${axisMarkup}</g>
  <g id="grp:vectors">${vectorMarkup}</g>
  <g id="grp:origin">${originMarkup}</g>
  <g id="grp:labels">${labelMarkup}</g>
</svg>`;

    return { svg, width, height, warnings: [] };
  }
};

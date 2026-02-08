import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const axesBlank: DiagramEngineTemplate = {
  templateId: 'math.graphs.axes_blank.v1',
  title: 'Blank Coordinate Axes',
  description: 'Empty coordinate axes with optional grid',
  category: 'graphs',
  schema: {
    labels: {
      xLabel: { default: 'x', maxLen: 10 },
      yLabel: { default: 'y', maxLen: 10 }
    },
    values: {
      xMin: { default: -10, type: 'number', min: -50, max: 0 },
      xMax: { default: 10, type: 'number', min: 0, max: 50 },
      yMin: { default: -10, type: 'number', min: -50, max: 0 },
      yMax: { default: 10, type: 'number', min: 0, max: 50 }
    },
    visibility: {
      showGrid: { default: true },
      showNumbers: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 500;
    const padding = 50;

    const labelX = params.labels?.xLabel || 'x';
    const labelY = params.labels?.yLabel || 'y';

    const xMin = Number(params.values?.xMin) || -10;
    const xMax = Number(params.values?.xMax) || 10;
    const yMin = Number(params.values?.yMin) || -10;
    const yMax = Number(params.values?.yMax) || 10;

    const showGrid = params.visibility?.showGrid !== false;
    const showNumbers = params.visibility?.showNumbers !== false;

    const centerX = width / 2;
    const centerY = height / 2;
    const gridSize = (width - 2 * padding) / (xMax - xMin);

    const gridMarkup = showGrid ? `
    <g id="grp:grid" opacity="0.2">
      ${Array.from({ length: xMax - xMin + 1 }, (_, i) => {
        const x = padding + i * gridSize;
        return `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" stroke="#64748b" stroke-width="1"/>`;
      }).join('\n')}
      ${Array.from({ length: yMax - yMin + 1 }, (_, i) => {
        const y = padding + i * gridSize;
        return `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#64748b" stroke-width="1"/>`;
      }).join('\n')}
    </g>` : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
  <style>
    .diagram-axis { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    ${gridMarkup}

    <line id="ln:xAxis" x1="${padding}" y1="${centerY}" x2="${width - padding}" y2="${centerY}" class="diagram-axis" marker-end="url(#arrowhead)"/>
    <line id="ln:yAxis" x1="${centerX}" y1="${height - padding}" x2="${centerX}" y2="${padding}" class="diagram-axis" marker-end="url(#arrowhead)"/>

    <text id="txt:xLabel" x="${width - padding + 15}" y="${centerY + 5}" class="diagram-text">${labelX}</text>
    <text id="txt:yLabel" x="${centerX + 5}" y="${padding - 10}" class="diagram-text">${labelY}</text>
    <text id="txt:origin" x="${centerX - 15}" y="${centerY + 15}" class="diagram-text-small">0</text>

    ${showNumbers ? `
    <text id="txt:xMax" x="${width - padding}" y="${centerY + 25}" class="diagram-text-small">${xMax}</text>
    <text id="txt:yMax" x="${centerX + 15}" y="${padding + 5}" class="diagram-text-small">${yMax}</text>
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

export const boxPlot: DiagramEngineTemplate = {
  templateId: 'math.statistics.boxplot.v1',
  title: 'Box Plot',
  description: 'Box and whisker plot showing five-number summary',
  category: 'statistics',
  schema: {
    values: {
      min: { default: 10, type: 'number', min: 0, max: 100 },
      q1: { default: 25, type: 'number', min: 0, max: 100 },
      median: { default: 40, type: 'number', min: 0, max: 100 },
      q3: { default: 55, type: 'number', min: 0, max: 100 },
      max: { default: 70, type: 'number', min: 0, max: 100 }
    },
    visibility: {
      showLabels: { default: true },
      showValues: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 720;
    const height = 380;

    const minVal = Number(params.values?.min) || 10;
    const q1 = Number(params.values?.q1) || 25;
    const median = Number(params.values?.median) || 40;
    const q3 = Number(params.values?.q3) || 55;
    const maxVal = Number(params.values?.max) || 70;

    const showLabels = params.visibility?.showLabels !== false;
    const showValues = params.visibility?.showValues !== false;

    const padding = 72;
    const boxHeight = 64;
    const centerY = height / 2;
    const range = Math.max(maxVal - minVal, 1);
    const scale = (width - 2 * padding) / range;

    const minX = padding + (minVal - minVal) * scale;
    const q1X = padding + (q1 - minVal) * scale;
    const medianX = padding + (median - minVal) * scale;
    const q3X = padding + (q3 - minVal) * scale;
    const maxX = padding + (maxVal - minVal) * scale;

    // Only show label/value when there's enough horizontal gap to avoid overlap
    const minGap = 32;
    const positions = [
      { x: minX, label: 'Min', value: minVal, idLabel: 'minLabel', idVal: 'minVal' },
      { x: q1X, label: 'Q₁', value: q1, idLabel: 'q1Label', idVal: 'q1Val' },
      { x: medianX, label: 'Median', value: median, idLabel: 'medianLabel', idVal: 'medianVal' },
      { x: q3X, label: 'Q₃', value: q3, idLabel: 'q3Label', idVal: 'q3Val' },
      { x: maxX, label: 'Max', value: maxVal, idLabel: 'maxLabel', idVal: 'maxVal' }
    ];
    const showAt = (i: number) =>
      (i === 0 || positions[i].x - positions[i - 1].x >= minGap) &&
      (i === positions.length - 1 || positions[i + 1].x - positions[i].x >= minGap);
    const labelY = centerY - boxHeight / 2 - 34;
    const valueY = centerY + boxHeight / 2 + 34;

    const labelsMarkup = showLabels
      ? positions.map((p, i) => showAt(i) ? `<text id="txt:${p.idLabel}" x="${p.x}" y="${labelY}" class="diagram-text">${p.label}</text>` : '').join('\n    ')
      : '';
    const valuesMarkup = showValues
      ? positions.map((p, i) => showAt(i) ? `<text id="txt:${p.idVal}" x="${p.x}" y="${valueY}" class="diagram-text-value">${p.value}</text>` : '').join('\n    ')
      : '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-box { fill: rgba(100, 116, 139, 0.12); stroke: #64748b; stroke-width: 2; }
    .diagram-median { stroke: #dc2626; stroke-width: 2.5; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #e2e8f0; text-anchor: middle; }
    .diagram-text-value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    <line id="ln:whiskerLeft" x1="${minX}" y1="${centerY}" x2="${q1X}" y2="${centerY}" class="diagram-line"/>
    <line id="ln:whiskerRight" x1="${q3X}" y1="${centerY}" x2="${maxX}" y2="${centerY}" class="diagram-line"/>

    <line id="ln:minBar" x1="${minX}" y1="${centerY - boxHeight / 2}" x2="${minX}" y2="${centerY + boxHeight / 2}" class="diagram-line"/>
    <line id="ln:maxBar" x1="${maxX}" y1="${centerY - boxHeight / 2}" x2="${maxX}" y2="${centerY + boxHeight / 2}" class="diagram-line"/>

    <rect id="rect:box" x="${q1X}" y="${centerY - boxHeight / 2}" width="${Math.max(q3X - q1X, 2)}" height="${boxHeight}" class="diagram-box"/>
    <line id="ln:median" x1="${medianX}" y1="${centerY - boxHeight / 2}" x2="${medianX}" y2="${centerY + boxHeight / 2}" class="diagram-median"/>

    ${labelsMarkup}
    ${valuesMarkup}
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

export const functionMachine: DiagramEngineTemplate = {
  templateId: 'math.algebra.function_machine.v1',
  title: 'Function Machine',
  description: 'Input-output function machine diagram',
  category: 'algebra',
  schema: {
    labels: {
      input: { default: 'x', maxLen: 10 },
      output: { default: 'y', maxLen: 10 },
      operation: { default: '×2 + 3', maxLen: 20 }
    },
    values: {
      inputValue: { default: 5, type: 'number', min: -100, max: 100 },
      outputValue: { default: 13, type: 'number', min: -100, max: 100 }
    },
    visibility: {
      showValues: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 250;

    const labelInput = params.labels?.input || 'x';
    const labelOutput = params.labels?.output || 'y';
    const labelOperation = params.labels?.operation || '×2 + 3';

    const inputValue = Number(params.values?.inputValue) || 5;
    const outputValue = Number(params.values?.outputValue) || 13;

    const showValues = params.visibility?.showValues !== false;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-machine" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#64748b"/>
    </marker>
  </defs>
  <style>
    .diagram-box { fill: rgba(100, 116, 139, 0.12); stroke: #64748b; stroke-width: 2; rx: 8; }
    .diagram-arrow { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: bold; fill: #e2e8f0; text-anchor: middle; }
    .diagram-text-small { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #94a3b8; text-anchor: middle; }
    .diagram-text-value { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #94a3b8; text-anchor: middle; }
  </style>

  <g id="grp:main">
    <rect id="box:input" x="30" y="80" width="80" height="80" class="diagram-box"/>
    <rect id="box:machine" x="180" y="60" width="140" height="120" class="diagram-box"/>
    <rect id="box:output" x="390" y="80" width="80" height="80" class="diagram-box"/>

    <line id="ln:arrow1" x1="110" y1="120" x2="180" y2="120" class="diagram-arrow" marker-end="url(#arrowhead-machine)"/>
    <line id="ln:arrow2" x1="320" y1="120" x2="390" y2="120" class="diagram-arrow" marker-end="url(#arrowhead-machine)"/>

    <text id="txt:inputLabel" x="70" y="45" class="diagram-text-small">Input</text>
    <text id="txt:input" x="70" y="130" class="diagram-text">${labelInput}</text>
    ${showValues ? `<text id="txt:inputValue" x="70" y="155" class="diagram-text-value">${inputValue}</text>` : ''}

    <text id="txt:operation" x="250" y="125" class="diagram-text">${labelOperation}</text>

    <text id="txt:outputLabel" x="430" y="45" class="diagram-text-small">Output</text>
    <text id="txt:output" x="430" y="130" class="diagram-text">${labelOutput}</text>
    ${showValues ? `<text id="txt:outputValue" x="430" y="155" class="diagram-text-value">${outputValue}</text>` : ''}
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

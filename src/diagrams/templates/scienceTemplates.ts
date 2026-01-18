import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const circuitSeries: DiagramEngineTemplate = {
  templateId: 'physics.circuits.series.v1',
  title: 'Series Circuit',
  description: 'Simple series circuit with battery and components',
  category: 'physics',
  schema: {
    labels: {
      battery: { default: '6V', maxLen: 10 },
      component1: { default: 'R₁', maxLen: 10 },
      component2: { default: 'R₂', maxLen: 10 }
    },
    visibility: {
      showComponent1: { default: true },
      showComponent2: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 400;

    const labelBattery = params.labels?.battery || '6V';
    const labelComp1 = params.labels?.component1 || 'R₁';
    const labelComp2 = params.labels?.component2 || 'R₂';

    const showComp1 = params.visibility?.showComponent1 !== false;
    const showComp2 = params.visibility?.showComponent2 !== false;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-wire { stroke: #94a3b8; stroke-width: 3; fill: none; }
    .diagram-component { stroke: #60a5fa; stroke-width: 3; fill: none; }
    .diagram-battery-pos { stroke: #94a3b8; stroke-width: 4; }
    .diagram-battery-neg { stroke: #94a3b8; stroke-width: 2; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; text-anchor: middle; }
  </style>

  <g id="grp:main">
    <line id="wire:1" x1="100" y1="150" x2="100" y2="100" class="diagram-wire"/>
    <line id="wire:2" x1="100" y1="100" x2="250" y2="100" class="diagram-wire"/>
    <line id="wire:3" x1="250" y1="100" x2="400" y2="100" class="diagram-wire"/>
    <line id="wire:4" x1="400" y1="100" x2="400" y2="300" class="diagram-wire"/>
    <line id="wire:5" x1="400" y1="300" x2="100" y2="300" class="diagram-wire"/>
    <line id="wire:6" x1="100" y1="300" x2="100" y2="250" class="diagram-wire"/>

    <g id="component:battery">
      <line id="battery:pos" x1="90" y1="150" x2="110" y2="150" class="diagram-battery-pos"/>
      <line id="battery:neg" x1="95" y1="160" x2="105" y2="160" class="diagram-battery-neg"/>
      <line id="battery:pos2" x1="90" y1="170" x2="110" y2="170" class="diagram-battery-pos"/>
      <line id="battery:neg2" x1="95" y1="180" x2="105" y2="180" class="diagram-battery-neg"/>
      <line id="battery:pos3" x1="90" y1="190" x2="110" y2="190" class="diagram-battery-pos"/>
      <line id="battery:neg3" x1="95" y1="200" x2="105" y2="200" class="diagram-battery-neg"/>
      <line id="battery:pos4" x1="90" y1="210" x2="110" y2="210" class="diagram-battery-pos"/>
      <line id="battery:neg4" x1="95" y1="220" x2="105" y2="220" class="diagram-battery-neg"/>
      <line id="battery:pos5" x1="90" y1="230" x2="110" y2="230" class="diagram-battery-pos"/>
      <line id="battery:neg5" x1="95" y1="240" x2="105" y2="240" class="diagram-battery-neg"/>
      <text id="txt:battery" x="140" y="205" class="diagram-text">${labelBattery}</text>
    </g>

    ${showComp1 ? `
    <g id="component:1">
      <rect id="resistor:1" x="230" y="90" width="40" height="20" class="diagram-component"/>
      <text id="txt:comp1" x="250" y="80" class="diagram-text">${labelComp1}</text>
    </g>` : ''}

    ${showComp2 ? `
    <g id="component:2">
      <rect id="resistor:2" x="380" y="140" width="40" height="20" class="diagram-component"/>
      <text id="txt:comp2" x="400" y="180" class="diagram-text">${labelComp2}</text>
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

export const circuitParallel: DiagramEngineTemplate = {
  templateId: 'physics.circuits.parallel.v1',
  title: 'Parallel Circuit',
  description: 'Parallel circuit with battery and two branches',
  category: 'physics',
  schema: {
    labels: {
      battery: { default: '6V', maxLen: 10 },
      component1: { default: 'R₁', maxLen: 10 },
      component2: { default: 'R₂', maxLen: 10 }
    },
    visibility: {
      showComponent1: { default: true },
      showComponent2: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 450;

    const labelBattery = params.labels?.battery || '6V';
    const labelComp1 = params.labels?.component1 || 'R₁';
    const labelComp2 = params.labels?.component2 || 'R₂';

    const showComp1 = params.visibility?.showComponent1 !== false;
    const showComp2 = params.visibility?.showComponent2 !== false;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-wire { stroke: #94a3b8; stroke-width: 3; fill: none; }
    .diagram-component { stroke: #60a5fa; stroke-width: 3; fill: none; }
    .diagram-battery-pos { stroke: #94a3b8; stroke-width: 4; }
    .diagram-battery-neg { stroke: #94a3b8; stroke-width: 2; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; text-anchor: middle; }
  </style>

  <g id="grp:main">
    <line id="wire:main1" x1="100" y1="250" x2="100" y2="100" class="diagram-wire"/>
    <line id="wire:main2" x1="100" y1="100" x2="200" y2="100" class="diagram-wire"/>

    <line id="wire:branch1a" x1="200" y1="100" x2="200" y2="150" class="diagram-wire"/>
    <line id="wire:branch1b" x1="200" y1="150" x2="400" y2="150" class="diagram-wire"/>
    <line id="wire:branch2a" x1="200" y1="100" x2="200" y2="50" class="diagram-wire"/>
    <line id="wire:branch2b" x1="200" y1="50" x2="400" y2="50" class="diagram-wire"/>

    <line id="wire:merge1" x1="400" y1="50" x2="400" y2="100" class="diagram-wire"/>
    <line id="wire:merge2" x1="400" y1="150" x2="400" y2="100" class="diagram-wire"/>
    <line id="wire:return1" x1="400" y1="100" x2="400" y2="350" class="diagram-wire"/>
    <line id="wire:return2" x1="400" y1="350" x2="100" y2="350" class="diagram-wire"/>
    <line id="wire:return3" x1="100" y1="350" x2="100" y2="300" class="diagram-wire"/>

    <g id="component:battery">
      <line id="battery:pos" x1="90" y1="250" x2="110" y2="250" class="diagram-battery-pos"/>
      <line id="battery:neg" x1="95" y1="260" x2="105" y2="260" class="diagram-battery-neg"/>
      <line id="battery:pos2" x1="90" y1="270" x2="110" y2="270" class="diagram-battery-pos"/>
      <line id="battery:neg2" x1="95" y1="280" x2="105" y2="280" class="diagram-battery-neg"/>
      <line id="battery:pos3" x1="90" y1="290" x2="110" y2="290" class="diagram-battery-pos"/>
      <text id="txt:battery" x="140" y="280" class="diagram-text">${labelBattery}</text>
    </g>

    ${showComp1 ? `
    <g id="component:1">
      <rect id="resistor:1" x="280" y="40" width="40" height="20" class="diagram-component"/>
      <text id="txt:comp1" x="300" y="30" class="diagram-text">${labelComp1}</text>
    </g>` : ''}

    ${showComp2 ? `
    <g id="component:2">
      <rect id="resistor:2" x="280" y="140" width="40" height="20" class="diagram-component"/>
      <text id="txt:comp2" x="300" y="180" class="diagram-text">${labelComp2}</text>
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

export const rayReflection: DiagramEngineTemplate = {
  templateId: 'physics.ray_diagram.reflection.v1',
  title: 'Ray Diagram - Reflection',
  description: 'Light ray reflecting off a plane mirror',
  category: 'physics',
  schema: {
    values: {
      incidentAngle: { default: 30, type: 'number', min: 5, max: 85 }
    },
    visibility: {
      showNormal: { default: true },
      showAngles: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 400;

    const incidentAngle = Number(params.values?.incidentAngle) || 30;

    const showNormal = params.visibility?.showNormal !== false;
    const showAngles = params.visibility?.showAngles !== false;

    const centerX = 250;
    const centerY = 250;
    const rayLength = 150;

    const incidentRad = (incidentAngle * Math.PI) / 180;
    const incidentStartX = centerX - rayLength * Math.sin(incidentRad);
    const incidentStartY = centerY - rayLength * Math.cos(incidentRad);

    const reflectedEndX = centerX + rayLength * Math.sin(incidentRad);
    const reflectedEndY = centerY - rayLength * Math.cos(incidentRad);

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrowhead-ray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#f87171"/>
    </marker>
  </defs>
  <style>
    .diagram-mirror { stroke: #94a3b8; stroke-width: 4; }
    .diagram-normal { stroke: #60a5fa; stroke-width: 2; stroke-dasharray: 4,4; }
    .diagram-ray { stroke: #f87171; stroke-width: 2; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; }
    .diagram-text-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #60a5fa; }
  </style>

  <g id="grp:main">
    <line id="ln:mirror" x1="100" y1="${centerY}" x2="400" y2="${centerY}" class="diagram-mirror"/>

    ${showNormal ? `
    <line id="ln:normal" x1="${centerX}" y1="${centerY}" x2="${centerX}" y2="${centerY - 180}" class="diagram-normal"/>
    ` : ''}

    <line id="ln:incident" x1="${incidentStartX}" y1="${incidentStartY}" x2="${centerX}" y2="${centerY}" class="diagram-ray" marker-end="url(#arrowhead-ray)"/>
    <line id="ln:reflected" x1="${centerX}" y1="${centerY}" x2="${reflectedEndX}" y2="${reflectedEndY}" class="diagram-ray" marker-end="url(#arrowhead-ray)"/>

    ${showAngles ? `
    <text id="txt:incidentAngle" x="${centerX - 60}" y="${centerY - 40}" class="diagram-text-angle">${incidentAngle}°</text>
    <text id="txt:reflectedAngle" x="${centerX + 60}" y="${centerY - 40}" class="diagram-text-angle">${incidentAngle}°</text>
    ` : ''}

    <text id="txt:incident" x="${incidentStartX - 40}" y="${incidentStartY + 10}" class="diagram-text">Incident</text>
    <text id="txt:reflected" x="${reflectedEndX + 40}" y="${reflectedEndY + 10}" class="diagram-text">Reflected</text>
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

export const titrationSetup: DiagramEngineTemplate = {
  templateId: 'chemistry.titration_setup.v1',
  title: 'Titration Setup',
  description: 'Burette and conical flask titration apparatus',
  category: 'chemistry',
  schema: {
    labels: {
      burette: { default: 'Burette', maxLen: 20 },
      solution: { default: 'Acid', maxLen: 20 },
      flask: { default: 'Alkali + Indicator', maxLen: 30 }
    },
    visibility: {
      showLabels: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 400;
    const height = 500;

    const labelBurette = params.labels?.burette || 'Burette';
    const labelSolution = params.labels?.solution || 'Acid';
    const labelFlask = params.labels?.flask || 'Alkali + Indicator';

    const showLabels = params.visibility?.showLabels !== false;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-glass { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-liquid { fill: #3b82f6; fill-opacity: 0.3; stroke: #60a5fa; stroke-width: 2; }
    .diagram-stand { stroke: #94a3b8; stroke-width: 3; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #e2e8f0; text-anchor: middle; }
  </style>

  <g id="grp:main">
    <g id="grp:burette">
      <rect id="burette:body" x="180" y="50" width="40" height="200" class="diagram-glass"/>
      <rect id="burette:liquid" x="182" y="80" width="36" height="120" class="diagram-liquid"/>
      <line id="burette:tap" x1="200" y1="250" x2="200" y2="270" class="diagram-glass"/>
      <circle id="burette:tap-handle" cx="210" cy="260" r="8" class="diagram-glass"/>
      ${showLabels ? `<text id="txt:burette" x="260" y="100" class="diagram-text">${labelBurette}</text>` : ''}
      ${showLabels ? `<text id="txt:solution" x="260" y="120" class="diagram-text">${labelSolution}</text>` : ''}
    </g>

    <g id="grp:stand">
      <line id="stand:vertical" x1="150" y1="50" x2="150" y2="450" class="diagram-stand"/>
      <line id="stand:base" x1="100" y1="450" x2="300" y2="450" class="diagram-stand"/>
      <line id="stand:clamp1" x1="150" y1="150" x2="180" y2="150" class="diagram-stand"/>
      <line id="stand:clamp2" x1="150" y1="180" x2="180" y2="180" class="diagram-stand"/>
    </g>

    <g id="grp:flask">
      <path id="flask:body" d="M 170 320 L 170 360 L 160 380 L 160 420 L 240 420 L 240 380 L 230 360 L 230 320 Z" class="diagram-glass"/>
      <path id="flask:liquid" d="M 172 360 L 162 380 L 162 418 L 238 418 L 238 380 L 228 360 Z" class="diagram-liquid"/>
      ${showLabels ? `<text id="txt:flask" x="280" y="380" class="diagram-text">${labelFlask}</text>` : ''}
    </g>
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

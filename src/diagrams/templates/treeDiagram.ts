import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const treeDiagram: DiagramEngineTemplate = {
  templateId: 'math.probability.tree_diagram.v1',
  title: 'Probability Tree Diagram',
  description: 'Tree diagram showing probability outcomes',
  category: 'probability',
  schema: {
    labels: {
      firstDraw: { default: 'First Draw', maxLen: 30 },
      secondDraw: { default: 'Second Draw', maxLen: 30 }
    },
    values: {
      branches: { default: '[{"label":"Red","probability":"5/10"},{"label":"Blue","probability":"3/10"},{"label":"Green","probability":"2/10"}]', type: 'string', min: 0, max: 1000 },
      secondBranches: { default: '{"Red":[{"label":"Red","probability":"4/9"},{"label":"Blue","probability":"3/9"},{"label":"Green","probability":"2/9"}]}', type: 'string', min: 0, max: 5000 }
    },
    visibility: {
      showProbabilities: { default: true },
      showOutcomes: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 700;
    const height = 500;

    const firstDrawLabel = params.labels?.firstDraw || 'First Draw';
    const secondDrawLabel = params.labels?.secondDraw || 'Second Draw';

    let branches: Array<{ label: string; probability: string }> = [];
    let secondBranches: Record<string, Array<{ label: string; probability: string }>> = {};
    
    try {
      const branchesStr = String(params.values?.branches || '[]');
      const secondBranchesStr = String(params.values?.secondBranches || '{}');
      branches = JSON.parse(branchesStr);
      secondBranches = JSON.parse(secondBranchesStr);
    } catch {
      branches = [
        { label: 'Red', probability: '5/10' },
        { label: 'Blue', probability: '3/10' },
        { label: 'Green', probability: '2/10' }
      ];
      secondBranches = {
        Red: [
          { label: 'Red', probability: '4/9' },
          { label: 'Blue', probability: '3/9' },
          { label: 'Green', probability: '2/9' }
        ]
      };
    }

    const showProbabilities = params.visibility?.showProbabilities !== false;
    const showOutcomes = params.visibility?.showOutcomes !== false;

    const startX = 100;
    const startY = height / 2;
    const level1X = 250;
    const level2X = 500;
    const branchSpacing = 80;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-line { stroke: #64748b; stroke-width: 2; fill: none; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; }
    .diagram-text-prob { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #94a3b8; }
    .diagram-text-label { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: bold; fill: #e2e8f0; }
  </style>

  <g id="grp:main">
    <text x="${startX}" y="${startY - 30}" class="diagram-text-label">${firstDrawLabel}</text>
    <circle id="pt:start" cx="${startX}" cy="${startY}" r="4" fill="#64748b"/>

    ${branches.map((branch, i) => {
      const totalBranches = branches.length;
      const yOffset = (i - (totalBranches - 1) / 2) * branchSpacing;
      const y1 = startY;
      const y2 = startY + yOffset;
      
      let secondLevelMarkup = '';
      if (secondBranches[branch.label]) {
        const secondLevel = secondBranches[branch.label];
        secondLevelMarkup = secondLevel.map((secondBranch, j) => {
          const totalSecond = secondLevel.length;
          const secondYOffset = (j - (totalSecond - 1) / 2) * (branchSpacing * 0.6);
          const y3 = y2 + secondYOffset;
          
          return `
          <line x1="${level1X}" y1="${y2}" x2="${level2X}" y2="${y3}" class="diagram-line"/>
          <circle cx="${level2X}" cy="${y3}" r="4" fill="#64748b"/>
          ${showOutcomes ? `<text x="${level2X + 10}" y="${y3 + 5}" class="diagram-text">${branch.label}, ${secondBranch.label}</text>` : ''}
          ${showProbabilities ? `<text x="${(level1X + level2X) / 2}" y="${(y2 + y3) / 2 - 5}" class="diagram-text-prob">${secondBranch.probability}</text>` : ''}
          `;
        }).join('\n');
      }
      
      return `
      <line x1="${startX}" y1="${y1}" x2="${level1X}" y2="${y2}" class="diagram-line"/>
      <circle cx="${level1X}" cy="${y2}" r="4" fill="#64748b"/>
      ${showOutcomes ? `<text x="${level1X + 10}" y="${y2 + 5}" class="diagram-text">${branch.label}</text>` : ''}
      ${showProbabilities ? `<text x="${(startX + level1X) / 2}" y="${(y1 + y2) / 2 - 5}" class="diagram-text-prob">${branch.probability}</text>` : ''}
      ${secondLevelMarkup}
      `;
    }).join('\n')}

    <text x="${level1X}" y="${startY - 30}" class="diagram-text-label">${secondDrawLabel}</text>
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

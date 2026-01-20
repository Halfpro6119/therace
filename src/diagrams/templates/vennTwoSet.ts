import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const vennTwoSet: DiagramEngineTemplate = {
  templateId: 'math.statistics.venn_two_set.v1',
  title: 'Two-Set Venn Diagram',
  description: 'Venn diagram with two overlapping sets',
  category: 'statistics',
  schema: {
    labels: {
      setA: { default: 'A', maxLen: 20 },
      setB: { default: 'B', maxLen: 20 },
      onlyA: { default: '', maxLen: 50 },
      onlyB: { default: '', maxLen: 50 },
      intersection: { default: '', maxLen: 50 },
      outside: { default: '', maxLen: 50 }
    },
    visibility: {
      showSetLabels: { default: true },
      showRegionLabels: { default: true },
      showUniverseBox: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 500;
    const height = 400;

    const labelSetA = params.labels?.setA || 'A';
    const labelSetB = params.labels?.setB || 'B';
    const labelOnlyA = params.labels?.onlyA || '';
    const labelOnlyB = params.labels?.onlyB || '';
    const labelIntersection = params.labels?.intersection || '';
    const labelOutside = params.labels?.outside || '';

    const showSetLabels = params.visibility?.showSetLabels !== false;
    const showRegionLabels = params.visibility?.showRegionLabels !== false;
    const showUniverseBox = params.visibility?.showUniverseBox !== false;

    const centerY = height / 2;
    const radiusA = 120;
    const radiusB = 120;
    const centerAX = width / 2 - 60;
    const centerBX = width / 2 + 60;

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-universe { stroke: #3b82f6; stroke-width: 2; fill: #1e293b; fill-opacity: 0.3; }
    .diagram-circle { stroke: #3b82f6; stroke-width: 2; fill: #3b82f6; fill-opacity: 0.2; }
    .diagram-text-set { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-region { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; fill: #e2e8f0; text-anchor: middle; }
    .diagram-text-outside { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #3b82f6; }
  </style>

  <g id="grp:main">
    ${showUniverseBox ? `<rect id="rect:universe" x="30" y="30" width="440" height="340" rx="5" class="diagram-universe"/>` : ''}

    <circle id="circle:A" cx="${centerAX}" cy="${centerY}" r="${radiusA}" class="diagram-circle"/>
    <circle id="circle:B" cx="${centerBX}" cy="${centerY}" r="${radiusB}" class="diagram-circle"/>

    ${showSetLabels ? `
    <text id="txt:setA" x="${centerAX - radiusA / 2}" y="${centerY - radiusA - 10}" class="diagram-text-set">${labelSetA}</text>
    <text id="txt:setB" x="${centerBX + radiusB / 2}" y="${centerY - radiusB - 10}" class="diagram-text-set">${labelSetB}</text>
    ` : ''}

    ${showRegionLabels ? `
    ${labelOnlyA ? `<text id="txt:onlyA" x="${centerAX - 50}" y="${centerY + 5}" class="diagram-text-region">${labelOnlyA}</text>` : ''}
    ${labelIntersection ? `<text id="txt:intersection" x="${width / 2}" y="${centerY + 5}" class="diagram-text-region">${labelIntersection}</text>` : ''}
    ${labelOnlyB ? `<text id="txt:onlyB" x="${centerBX + 50}" y="${centerY + 5}" class="diagram-text-region">${labelOnlyB}</text>` : ''}
    ${labelOutside && showUniverseBox ? `<text id="txt:outside" x="50" y="60" class="diagram-text-outside">${labelOutside}</text>` : ''}
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

import type { DiagramEngineTemplate, DiagramParams, DiagramRenderResult } from '../../types';

export const circleBasic: DiagramEngineTemplate = {
  templateId: 'math.circle.basic.v1',
  title: 'Basic Circle',
  description: 'Simple circle with center and radius marked',
  category: 'geometry',
  schema: {
    labels: {
      O: { default: 'O', maxLen: 3 },
      radiusLabel: { default: '6 cm', maxLen: 20 },
      diameterLabel: { default: '12 cm', maxLen: 20 }
    },
    values: {
      radius: { default: 6, type: 'number', min: 1, max: 100 },
      sectorAngle: { default: undefined, type: 'number', min: 0, max: 360 }
    },
    visibility: {
      showCenter: { default: true },
      showRadius: { default: true },
      showRadiusLabel: { default: true },
      showDiameter: { default: false },
      showDiameterLabel: { default: true },
      showTangent: { default: false },
      showSectorAngleLabel: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    const width = 400;
    const height = 400;
    const centerX = width / 2;
    const centerY = height / 2;

    const labelO = params.labels?.O || 'O';
    const radiusLabel = params.labels?.radiusLabel || '6 cm';
    const diameterLabel = params.labels?.diameterLabel || '12 cm';

    const radius = Number(params.values?.radius) || 6;
    const radiusPixels = radius * 15; // Scale for display
    const sectorAngleDeg = params.values?.sectorAngle != null ? Number(params.values.sectorAngle) : null;

    const showCenter = params.visibility?.showCenter !== false;
    const showRadius = params.visibility?.showRadius !== false;
    const showRadiusLabel = params.visibility?.showRadiusLabel !== false;
    const showDiameter = params.visibility?.showDiameter === true;
    const showDiameterLabel = params.visibility?.showDiameterLabel !== false && showDiameter;
    const showTangent = params.visibility?.showTangent === true;
    const showSectorAngleLabel = params.visibility?.showSectorAngleLabel !== false;

    // Radius line from center to edge (pointing right = 0°)
    const radiusEndX = centerX + radiusPixels;
    const radiusEndY = centerY;
    // Diameter: horizontal line through center
    const diameterLeftX = centerX - radiusPixels;
    const diameterRightX = centerX + radiusPixels;
    // Tangent at radius end (vertical line): optional
    const tangentTopY = centerY - 100;
    const tangentBottomY = centerY + 100;

    // Sector: second radius and arc when sectorAngle is set (angles in degrees, 0° = right, counterclockwise)
    let sectorSecondRadiusX = radiusEndX;
    let sectorSecondRadiusY = radiusEndY;
    let sectorArcPath = '';
    let sectorFillPath = '';
    let sectorAngleLabel = '';
    if (sectorAngleDeg != null && sectorAngleDeg > 0 && sectorAngleDeg <= 360) {
      const rad = (sectorAngleDeg * Math.PI) / 180;
      sectorSecondRadiusX = centerX + radiusPixels * Math.cos(rad);
      sectorSecondRadiusY = centerY - radiusPixels * Math.sin(rad);
      const arcPath = `A ${radiusPixels} ${radiusPixels} 0 0 0 ${sectorSecondRadiusX} ${sectorSecondRadiusY}`;
      sectorArcPath = `M ${radiusEndX} ${radiusEndY} ${arcPath}`;
      sectorFillPath = `M ${centerX} ${centerY} L ${radiusEndX} ${radiusEndY} ${arcPath} Z`;
      if (showSectorAngleLabel && sectorAngleDeg > 0) {
        const labelRad = (sectorAngleDeg / 2) * (Math.PI / 180);
        const labelR = radiusPixels * 0.55;
        sectorAngleLabel = `<text id="txt:sectorAngle" x="${centerX + labelR * Math.cos(labelRad)}" y="${centerY - labelR * Math.sin(labelRad)}" class="diagram-text-sector-angle">${Math.round(sectorAngleDeg)}°</text>`;
      }
    }

    const hasSector = sectorArcPath !== '';

    const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .diagram-circle { stroke: #94a3b8; stroke-width: 2; fill: none; }
    .diagram-circle-dimmed { stroke: #475569; stroke-width: 1.5; fill: none; stroke-dasharray: 4 2; }
    .diagram-line { stroke: #60a5fa; stroke-width: 2; fill: none; }
    .diagram-sector-fill { fill: rgba(59, 130, 246, 0.15); stroke: none; }
    .diagram-sector-arc { stroke: #60a5fa; stroke-width: 2; fill: none; }
    .diagram-tangent { stroke: #f59e0b; stroke-width: 2; fill: none; }
    .diagram-point { fill: #cbd5e1; }
    .diagram-point-highlight { fill: #60a5fa; }
    .diagram-text { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 18px; font-weight: bold; fill: #e2e8f0; }
    .diagram-text-radius { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #60a5fa; text-anchor: middle; }
    .diagram-text-diameter { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; fill: #94a3b8; text-anchor: middle; }
    .diagram-text-sector-angle { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: bold; fill: #93c5fd; text-anchor: middle; dominant-baseline: middle; }
  </style>

  <g id="grp:main">
    ${hasSector
      ? `<path id="ln:sectorFill" d="${sectorFillPath}" class="diagram-sector-fill"/>
    <circle id="ln:circle" cx="${centerX}" cy="${centerY}" r="${radiusPixels}" class="diagram-circle-dimmed"/>
    <path id="ln:sectorArc" d="${sectorArcPath}" class="diagram-sector-arc"/>
    ${showRadius ? `<line id="ln:radius" x1="${centerX}" y1="${centerY}" x2="${radiusEndX}" y2="${radiusEndY}" class="diagram-line"/>` : ''}
    <line id="ln:radius2" x1="${centerX}" y1="${centerY}" x2="${sectorSecondRadiusX}" y2="${sectorSecondRadiusY}" class="diagram-line"/>
    ${sectorAngleLabel}`
      : `<circle id="ln:circle" cx="${centerX}" cy="${centerY}" r="${radiusPixels}" class="diagram-circle"/>
    ${showDiameter ? `<line id="ln:diameter" x1="${diameterLeftX}" y1="${centerY}" x2="${diameterRightX}" y2="${centerY}" class="diagram-line"/>` : ''}
    ${showRadius ? `<line id="ln:radius" x1="${centerX}" y1="${centerY}" x2="${radiusEndX}" y2="${radiusEndY}" class="diagram-line"/>` : ''}
    ${showTangent ? `<line id="ln:tangent" x1="${radiusEndX}" y1="${tangentTopY}" x2="${radiusEndX}" y2="${tangentBottomY}" class="diagram-tangent"/>` : ''}`}

    ${showCenter ? `
    <circle id="pt:O" cx="${centerX}" cy="${centerY}" r="5" class="diagram-point-highlight"/>
    <text id="txt:O" x="${centerX - 20}" y="${centerY + 5}" class="diagram-text">${labelO}</text>
    ` : ''}

    ${showRadius && !hasSector ? `<circle id="pt:radiusEnd" cx="${radiusEndX}" cy="${radiusEndY}" r="4" class="diagram-point"/>` : ''}
    ${hasSector ? `<circle id="pt:radiusEnd" cx="${radiusEndX}" cy="${radiusEndY}" r="4" class="diagram-point"/><circle id="pt:radiusEnd2" cx="${sectorSecondRadiusX}" cy="${sectorSecondRadiusY}" r="4" class="diagram-point"/>` : ''}
    ${showDiameter && !hasSector ? `<circle id="pt:diameterLeft" cx="${diameterLeftX}" cy="${centerY}" r="4" class="diagram-point"/><circle id="pt:diameterRight" cx="${diameterRightX}" cy="${centerY}" r="4" class="diagram-point"/>` : ''}

    ${showRadiusLabel ? `<text id="txt:radiusLabel" x="${(centerX + radiusEndX) / 2}" y="${centerY - 15}" class="diagram-text-radius">${radiusLabel}</text>` : ''}
    ${showDiameterLabel ? `<text id="txt:diameterLabel" x="${centerX}" y="${centerY + 28}" class="diagram-text-diameter">${diameterLabel}</text>` : ''}
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

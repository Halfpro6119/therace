import type { DiagramEngineTemplate } from '../../types';
import { DIAGRAM_TYPE_TO_TEMPLATE_ID } from '../diagramTypeSpec';
import { angleInSemicircle } from '../templates/angleInSemicircle';
import { fzcAngles } from '../templates/fzcAngles';
import { rightTriangle } from '../templates/rightTriangle';
import { linearAxesLine } from '../templates/linearAxesLine';
import { vennTwoSet } from '../templates/vennTwoSet';
import { triangleBasicAngles } from '../templates/triangleBasicAngles';
import { isoscelesTriangle } from '../templates/isoscelesTriangle';
import { quadrilateralAngles } from '../templates/quadrilateralAngles';
import { polygonAngles } from '../templates/polygonAngles';
import { bearings } from '../templates/bearings';
import { circleTangentRadius, circleTwoTangents, cyclicQuadrilateral } from '../templates/circleTheorems';
import { pythagorasCuboid } from '../templates/pythagorasCuboid';
import { axesBlank, boxPlot, functionMachine } from '../templates/graphsAndStats';
import { circuitSeries, circuitParallel, rayReflection, titrationSetup } from '../templates/scienceTemplates';
import { coordinatePoint } from '../templates/coordinatePoint';
import { straightLineAngles } from '../templates/straightLineAngles';
import { compoundLShape } from '../templates/compoundLShape';
import { circleBasic } from '../templates/circleBasic';
import { barChart } from '../templates/barChart';
import { scatterPlot } from '../templates/scatterPlot';
import { numberLine } from '../templates/numberLine';
import { similarTriangles } from '../templates/similarTriangles';
import { sineRuleTriangle } from '../templates/sineRuleTriangle';
import { cosineRuleTriangle } from '../templates/cosineRuleTriangle';
import { histogram } from '../templates/histogram';
import { quadraticLinear } from '../templates/quadraticLinear';
import { treeDiagram } from '../templates/treeDiagram';
import { boxplotComparison } from '../templates/boxplotComparison';
import { cuboid } from '../templates/cuboid';
import { triangle } from '../templates/triangle';
import { vectorDiagram } from '../templates/vectorDiagram';

const templates = new Map<string, DiagramEngineTemplate>();

function registerTemplate(template: DiagramEngineTemplate) {
  templates.set(template.templateId, template);
}

/** Register canonical diagram type id so getTemplate('coordinateGrid') etc. resolve. */
function registerCanonicalAliases() {
  for (const [typeId, templateId] of Object.entries(DIAGRAM_TYPE_TO_TEMPLATE_ID)) {
    const template = templates.get(templateId);
    if (template) templates.set(typeId, template);
  }
}

registerTemplate(angleInSemicircle);
registerTemplate(fzcAngles);
registerTemplate(rightTriangle);
registerTemplate(linearAxesLine);
registerTemplate(vennTwoSet);
registerTemplate(triangleBasicAngles);
registerTemplate(isoscelesTriangle);
registerTemplate(quadrilateralAngles);
registerTemplate(polygonAngles);
registerTemplate(bearings);
registerTemplate(circleTangentRadius);
registerTemplate(circleTwoTangents);
registerTemplate(cyclicQuadrilateral);
registerTemplate(pythagorasCuboid);
registerTemplate(axesBlank);
registerTemplate(boxPlot);
registerTemplate(functionMachine);
registerTemplate(circuitSeries);
registerTemplate(circuitParallel);
registerTemplate(rayReflection);
registerTemplate(titrationSetup);
// New templates from MATHS_DIAGRAM_SPECIFICATIONS.md
registerTemplate(coordinatePoint);
registerTemplate(straightLineAngles);
registerTemplate(compoundLShape);
registerTemplate(circleBasic);
registerTemplate(barChart);
registerTemplate(scatterPlot);
registerTemplate(numberLine);
registerTemplate(similarTriangles);
registerTemplate(sineRuleTriangle);
registerTemplate(cosineRuleTriangle);
registerTemplate(histogram);
registerTemplate(quadraticLinear);
registerTemplate(treeDiagram);
registerTemplate(boxplotComparison);
registerTemplate(cuboid);
registerTemplate(triangle);
registerTemplate(vectorDiagram);

registerCanonicalAliases();

export function getTemplate(templateId: string): DiagramEngineTemplate | undefined {
  return templates.get(templateId);
}

export function getAllTemplates(): DiagramEngineTemplate[] {
  return Array.from(templates.values());
}

export function getTemplatesByCategory(category: string): DiagramEngineTemplate[] {
  return Array.from(templates.values()).filter(t => t.category === category);
}

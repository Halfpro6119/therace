import type { DiagramEngineTemplate } from '../../types';
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

const templates = new Map<string, DiagramEngineTemplate>();

function registerTemplate(template: DiagramEngineTemplate) {
  templates.set(template.templateId, template);
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

export function getTemplate(templateId: string): DiagramEngineTemplate | undefined {
  return templates.get(templateId);
}

export function getAllTemplates(): DiagramEngineTemplate[] {
  return Array.from(templates.values());
}

export function getTemplatesByCategory(category: string): DiagramEngineTemplate[] {
  return Array.from(templates.values()).filter(t => t.category === category);
}

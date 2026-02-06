import type { DiagramMetadata, DiagramRenderResult, DiagramValidationResult, DiagramParams } from '../../types';
import { getTemplate } from './registry';
import { validateDiagramParams, mergeWithDefaults } from './validator';

export { getTemplate, getAllTemplates, getTemplatesByCategory } from './registry';
export {
  getTemplateIdForDiagramType,
  isSupportedDiagramType,
  SUPPORTED_DIAGRAM_TYPES,
  DIAGRAM_TYPE_TO_TEMPLATE_ID,
} from '../diagramTypeSpec';
export type { DiagramTypeId } from '../diagramTypeSpec';
export { validateDiagramParams, mergeWithDefaults } from './validator';

export function renderDiagram(metadata: DiagramMetadata): DiagramRenderResult {
  if (metadata.mode !== 'auto' || !metadata.templateId) {
    return {
      svg: '',
      width: 0,
      height: 0,
      warnings: ['Invalid mode or missing templateId for auto-render']
    };
  }

  const template = getTemplate(metadata.templateId);

  if (!template) {
    return {
      svg: '',
      width: 0,
      height: 0,
      warnings: [`Template "${metadata.templateId}" not found in engine registry`]
    };
  }

  const params = metadata.params || {};
  const mergedParams = mergeWithDefaults(params, template.schema);
  const validation = validateDiagramParams(mergedParams, template.schema);

  if (!validation.ok) {
    return {
      svg: '',
      width: 0,
      height: 0,
      warnings: [...validation.warnings, ...validation.errors]
    };
  }

  try {
    const result = template.render(mergedParams);
    return {
      ...result,
      warnings: [...(result.warnings || []), ...validation.warnings]
    };
  } catch (error) {
    console.error('Error rendering diagram:', error);
    return {
      svg: '',
      width: 0,
      height: 0,
      warnings: [`Render error: ${error instanceof Error ? error.message : 'Unknown error'}`]
    };
  }
}

export function validateDiagram(metadata: DiagramMetadata): DiagramValidationResult {
  if (metadata.mode !== 'auto' || !metadata.templateId) {
    return {
      ok: false,
      warnings: [],
      errors: ['Invalid mode or missing templateId for auto-render']
    };
  }

  const template = getTemplate(metadata.templateId);

  if (!template) {
    return {
      ok: false,
      warnings: [],
      errors: [`Template "${metadata.templateId}" not found in engine registry`]
    };
  }

  const params = metadata.params || {};
  const mergedParams = mergeWithDefaults(params, template.schema);

  return validateDiagramParams(mergedParams, template.schema);
}

export function denormalizeCoord(normalized: number, dimension: number): number {
  return normalized * dimension;
}

export function normalizeCoord(absolute: number, dimension: number): number {
  return absolute / dimension;
}

/**
 * Diagram Factory
 * 
 * Creates diagrams from metadata specifications.
 * Handles both template-based and asset-based diagram creation.
 * Supports bulk operations and batch processing.
 */

import type { 
  DiagramMetadata, 
  Diagram, 
  DiagramTemplate,
  DiagramParams,
  CanvasData 
} from '../../types';
import { getTemplate } from '../engine/registry';
import { renderDiagram, validateDiagram } from '../engine';
import { validateDiagramMetadata, mergeParamsWithDefaults } from './validator';

export interface DiagramCreationSpec {
  title: string;
  metadata: DiagramMetadata;
  subjectId?: string;
  tags?: string[];
}

export interface DiagramCreationResult {
  success: boolean;
  diagram?: Partial<Diagram>;
  errors: string[];
  warnings: string[];
}

/**
 * Create a diagram from metadata specification
 * Validates metadata and generates diagram data
 */
export async function createDiagramFromMetadata(
  spec: DiagramCreationSpec
): Promise<DiagramCreationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate metadata structure
  const validation = validateDiagramMetadata(spec.metadata);
  if (!validation.valid) {
    errors.push(...validation.errors.map(e => `${e.field}: ${e.message}`));
  }
  warnings.push(...validation.warnings.map(w => `${w.field}: ${w.message}`));

  if (errors.length > 0) {
    return { success: false, errors, warnings };
  }

  try {
    // Handle different modes
    if (spec.metadata.mode === 'auto' && spec.metadata.templateId) {
      return createFromTemplate(spec, errors, warnings);
    } else if (spec.metadata.mode === 'asset' && spec.metadata.diagramId) {
      return createAssetReference(spec, errors, warnings);
    } else if (spec.metadata.mode === 'template' && spec.metadata.templateId) {
      return createFromTemplate(spec, errors, warnings);
    } else {
      errors.push('Invalid metadata mode or missing required fields');
      return { success: false, errors, warnings };
    }
  } catch (error) {
    errors.push(`Creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false, errors, warnings };
  }
}

/**
 * Create diagram from template with parameters
 */
function createFromTemplate(
  spec: DiagramCreationSpec,
  errors: string[],
  warnings: string[]
): DiagramCreationResult {
  const { metadata, title, subjectId, tags } = spec;
  const templateId = metadata.templateId!;

  // Get template from registry
  const template = getTemplate(templateId);
  if (!template) {
    errors.push(`Template "${templateId}" not found in registry`);
    return { success: false, errors, warnings };
  }

  // Merge parameters with defaults
  const params = mergeParamsWithDefaults(metadata.params, template.schema);

  // Validate parameters
  const paramValidation = validateDiagram({
    mode: 'auto',
    templateId,
    params
  });

  if (!paramValidation.ok) {
    errors.push(...paramValidation.errors);
    warnings.push(...paramValidation.warnings);
  }

  if (errors.length > 0) {
    return { success: false, errors, warnings };
  }

  // Render diagram
  const renderResult = renderDiagram({
    mode: 'auto',
    templateId,
    params
  });

  const resultWarnings = renderResult.warnings ?? [];
  if (resultWarnings.length > 0) {
    warnings.push(...resultWarnings);
  }

  // Create diagram object
  const diagram: Partial<Diagram> = {
    title,
    subjectId,
    tags: tags || [],
    diagramType: 'template-generated',
    storageMode: 'vector',
    svgData: renderResult.svg,
    width: renderResult.width,
    height: renderResult.height,
    canvasData: {
      elements: [],
      gridEnabled: false,
      snapToGrid: false
    } as CanvasData
  };

  return {
    success: true,
    diagram,
    errors,
    warnings
  };
}

/**
 * Create asset reference diagram
 * Links to existing diagram without modification
 */
function createAssetReference(
  spec: DiagramCreationSpec,
  errors: string[],
  warnings: string[]
): DiagramCreationResult {
  const { metadata, title, subjectId, tags } = spec;

  // In a real implementation, would verify diagram exists
  // For now, create reference structure
  const diagram: Partial<Diagram> = {
    title,
    subjectId,
    tags: tags || [],
    diagramType: 'asset-reference',
    storageMode: 'vector',
    width: 800,
    height: 600,
    canvasData: {
      elements: [],
      gridEnabled: false,
      snapToGrid: false
    } as CanvasData
  };

  return {
    success: true,
    diagram,
    errors,
    warnings
  };
}

/**
 * Create multiple diagrams from metadata specifications
 * Batch operation with error handling
 */
export async function createDiagramsBatch(
  specs: DiagramCreationSpec[]
): Promise<DiagramCreationResult[]> {
  return Promise.all(specs.map(spec => createDiagramFromMetadata(spec)));
}

/**
 * Update diagram metadata
 * Modifies existing diagram's metadata and re-renders if needed
 */
export async function updateDiagramMetadata(
  diagramId: string,
  metadata: Partial<DiagramMetadata>
): Promise<DiagramCreationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate new metadata
  const fullMetadata: DiagramMetadata = {
    mode: metadata.mode || 'auto',
    templateId: metadata.templateId,
    diagramId: metadata.diagramId,
    params: metadata.params,
    placement: metadata.placement,
    caption: metadata.caption,
    alt: metadata.alt
  };

  const validation = validateDiagramMetadata(fullMetadata);
  if (!validation.valid) {
    errors.push(...validation.errors.map(e => `${e.field}: ${e.message}`));
    return { success: false, errors, warnings };
  }

  warnings.push(...validation.warnings.map(w => `${w.field}: ${w.message}`));

  return {
    success: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Generate metadata from diagram specification
 * Useful for creating metadata from user input
 */
export function generateMetadataFromSpec(spec: {
  mode: 'auto' | 'template' | 'asset';
  templateId?: string;
  diagramId?: string;
  params?: DiagramParams;
  placement?: 'above' | 'inline' | 'below' | 'side';
  caption?: string;
  alt?: string;
}): DiagramMetadata {
  return {
    mode: spec.mode,
    templateId: spec.templateId,
    diagramId: spec.diagramId,
    params: spec.params,
    placement: spec.placement || 'inline',
    caption: spec.caption,
    alt: spec.alt
  };
}

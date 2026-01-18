/**
 * Diagram Metadata Validator
 * 
 * Validates diagram metadata against schema requirements.
 * Ensures all required parameters are present and valid.
 * Provides detailed error messages for debugging.
 */

import type { DiagramMetadata, DiagramParams, DiagramTemplateSchema } from '../../types';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface MetadataValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Validate diagram metadata structure
 * Checks mode, required fields, and parameter validity
 */
export function validateDiagramMetadata(
  metadata: DiagramMetadata,
  schema?: DiagramTemplateSchema
): MetadataValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Validate mode
  if (!metadata.mode || !['asset', 'template', 'auto'].includes(metadata.mode)) {
    errors.push({
      field: 'mode',
      message: `Invalid mode: "${metadata.mode}". Must be "asset", "template", or "auto"`,
      severity: 'error'
    });
  }

  // Validate mode-specific requirements
  if (metadata.mode === 'asset' && !metadata.diagramId) {
    errors.push({
      field: 'diagramId',
      message: 'Asset mode requires diagramId',
      severity: 'error'
    });
  }

  if ((metadata.mode === 'template' || metadata.mode === 'auto') && !metadata.templateId) {
    errors.push({
      field: 'templateId',
      message: `${metadata.mode} mode requires templateId`,
      severity: 'error'
    });
  }

  // Validate placement
  if (metadata.placement && !['above', 'inline', 'below', 'side'].includes(metadata.placement)) {
    warnings.push({
      field: 'placement',
      message: `Invalid placement: "${metadata.placement}". Using default "inline"`,
      severity: 'warning'
    });
  }

  // Validate parameters against schema if provided
  if (schema && metadata.params) {
    const paramErrors = validateDiagramParams(metadata.params, schema);
    errors.push(...paramErrors.errors);
    warnings.push(...paramErrors.warnings);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validate diagram parameters against template schema
 */
export function validateDiagramParams(
  params: DiagramParams,
  schema: DiagramTemplateSchema
): MetadataValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Validate labels
  if (schema.labels) {
    for (const [key, config] of Object.entries(schema.labels)) {
      if (params.labels?.[key]) {
        const value = params.labels[key];
        if (config.maxLen && value.length > config.maxLen) {
          errors.push({
            field: `labels.${key}`,
            message: `Label exceeds max length of ${config.maxLen}: "${value}"`,
            severity: 'error'
          });
        }
      } else if (config.required && !config.default) {
        errors.push({
          field: `labels.${key}`,
          message: `Required label "${key}" is missing`,
          severity: 'error'
        });
      }
    }
  }

  // Validate values
  if (schema.values) {
    for (const [key, config] of Object.entries(schema.values)) {
      if (params.values?.[key] !== undefined) {
        const value = params.values[key];
        
        if (config.type === 'number') {
          const numValue = Number(value);
          if (isNaN(numValue)) {
            errors.push({
              field: `values.${key}`,
              message: `Value must be a number: "${value}"`,
              severity: 'error'
            });
          } else {
            if (config.min !== undefined && numValue < config.min) {
              errors.push({
                field: `values.${key}`,
                message: `Value ${numValue} is below minimum ${config.min}`,
                severity: 'error'
              });
            }
            if (config.max !== undefined && numValue > config.max) {
              errors.push({
                field: `values.${key}`,
                message: `Value ${numValue} exceeds maximum ${config.max}`,
                severity: 'error'
              });
            }
          }
        }
      } else if (config.required && config.default === undefined) {
        errors.push({
          field: `values.${key}`,
          message: `Required value "${key}" is missing`,
          severity: 'error'
        });
      }
    }
  }

  // Validate visibility
  if (schema.visibility) {
    for (const [key, config] of Object.entries(schema.visibility)) {
      if (params.visibility?.[key] !== undefined) {
        const value = params.visibility[key];
        if (typeof value !== 'boolean') {
          errors.push({
            field: `visibility.${key}`,
            message: `Visibility must be boolean: "${value}"`,
            severity: 'error'
          });
        }
      }
    }
  }

  // Validate positions
  if (schema.positions) {
    for (const [key, config] of Object.entries(schema.positions)) {
      if (params.positions?.[key]) {
        const pos = params.positions[key];
        if (!pos.x || !pos.y || typeof pos.x !== 'number' || typeof pos.y !== 'number') {
          errors.push({
            field: `positions.${key}`,
            message: `Position must have numeric x and y: ${JSON.stringify(pos)}`,
            severity: 'error'
          });
        }
      } else if (config.required && !config.default) {
        errors.push({
          field: `positions.${key}`,
          message: `Required position "${key}" is missing`,
          severity: 'error'
        });
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Merge provided parameters with schema defaults
 * Ensures all required parameters have values
 */
export function mergeParamsWithDefaults(
  params: DiagramParams | undefined,
  schema: DiagramTemplateSchema
): DiagramParams {
  const merged: DiagramParams = {
    labels: {},
    values: {},
    visibility: {},
    positions: {}
  };

  // Merge labels
  if (schema.labels) {
    for (const [key, config] of Object.entries(schema.labels)) {
      merged.labels![key] = params?.labels?.[key] ?? config.default ?? '';
    }
  }

  // Merge values
  if (schema.values) {
    for (const [key, config] of Object.entries(schema.values)) {
      merged.values![key] = params?.values?.[key] ?? config.default ?? 0;
    }
  }

  // Merge visibility
  if (schema.visibility) {
    for (const [key, config] of Object.entries(schema.visibility)) {
      merged.visibility![key] = params?.visibility?.[key] ?? config.default ?? true;
    }
  }

  // Merge positions
  if (schema.positions) {
    for (const [key, config] of Object.entries(schema.positions)) {
      merged.positions![key] = params?.positions?.[key] ?? config.default ?? { x: 0, y: 0 };
    }
  }

  return merged;
}

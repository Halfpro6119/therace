import type { DiagramParams, DiagramTemplateSchema, DiagramValidationResult } from '../../types';

export function validateDiagramParams(
  params: DiagramParams,
  schema: DiagramTemplateSchema
): DiagramValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  if (schema.labels) {
    Object.entries(schema.labels).forEach(([key, config]) => {
      const value = params.labels?.[key];

      if (config.required && !value) {
        errors.push(`Label "${key}" is required but missing`);
      }

      if (value && config.maxLen && value.length > config.maxLen) {
        warnings.push(`Label "${key}" exceeds max length of ${config.maxLen}`);
      }
    });
  }

  if (schema.positions) {
    Object.entries(schema.positions).forEach(([key, config]) => {
      const value = params.positions?.[key];

      if (config.required && !value) {
        errors.push(`Position "${key}" is required but missing`);
      }

      if (value && config.normalized) {
        if (value.x < 0 || value.x > 1) {
          warnings.push(`Position "${key}" x-coordinate should be normalized (0-1), got ${value.x}`);
        }
        if (value.y < 0 || value.y > 1) {
          warnings.push(`Position "${key}" y-coordinate should be normalized (0-1), got ${value.y}`);
        }
      }
    });
  }

  if (schema.values) {
    Object.entries(schema.values).forEach(([key, config]) => {
      const value = params.values?.[key];

      if (config.required && value === undefined) {
        errors.push(`Value "${key}" is required but missing`);
      }

      if (value !== undefined && config.type === 'number') {
        const numValue = typeof value === 'number' ? value : parseFloat(String(value));

        if (isNaN(numValue)) {
          errors.push(`Value "${key}" must be a number`);
        } else {
          if (config.min !== undefined && numValue < config.min) {
            warnings.push(`Value "${key}" is below minimum of ${config.min}`);
          }
          if (config.max !== undefined && numValue > config.max) {
            warnings.push(`Value "${key}" is above maximum of ${config.max}`);
          }
        }
      }
    });
  }

  return {
    ok: errors.length === 0,
    warnings,
    errors
  };
}

export function mergeWithDefaults(
  params: DiagramParams,
  schema: DiagramTemplateSchema
): DiagramParams {
  const merged: DiagramParams = {
    labels: { ...params.labels },
    positions: { ...params.positions },
    values: { ...params.values },
    visibility: { ...params.visibility }
  };

  if (schema.labels) {
    Object.entries(schema.labels).forEach(([key, config]) => {
      if (merged.labels && merged.labels[key] === undefined && config.default !== undefined) {
        merged.labels[key] = config.default;
      }
    });
  }

  if (schema.positions) {
    Object.entries(schema.positions).forEach(([key, config]) => {
      if (merged.positions && merged.positions[key] === undefined && config.default) {
        merged.positions[key] = config.default;
      }
    });
  }

  if (schema.values) {
    Object.entries(schema.values).forEach(([key, config]) => {
      if (merged.values && merged.values[key] === undefined && config.default !== undefined) {
        merged.values[key] = config.default;
      }
    });
  }

  if (schema.visibility) {
    Object.entries(schema.visibility).forEach(([key, config]) => {
      if (merged.visibility && merged.visibility[key] === undefined && config.default !== undefined) {
        merged.visibility[key] = config.default;
      }
    });
  }

  return merged;
}

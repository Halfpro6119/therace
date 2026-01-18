import { supabase } from '../db/client';
import { getAllTemplates } from '../diagrams/engine';
import type { DiagramEngineTemplate } from '../types';

function extractDefaults(template: DiagramEngineTemplate): Record<string, any> {
  const defaults: Record<string, any> = {
    labels: {},
    values: {},
    visibility: {},
    positions: {}
  };

  if (template.schema.labels) {
    for (const [key, config] of Object.entries(template.schema.labels)) {
      if (config.default !== undefined) {
        defaults.labels[key] = config.default;
      }
    }
  }

  if (template.schema.values) {
    for (const [key, config] of Object.entries(template.schema.values)) {
      if (config.default !== undefined) {
        defaults.values[key] = config.default;
      }
    }
  }

  if (template.schema.visibility) {
    for (const [key, config] of Object.entries(template.schema.visibility)) {
      if (config.default !== undefined) {
        defaults.visibility[key] = config.default;
      }
    }
  }

  if (template.schema.positions) {
    for (const [key, config] of Object.entries(template.schema.positions)) {
      if (config.default) {
        defaults.positions[key] = config.default;
      }
    }
  }

  return defaults;
}

function generateTopicTags(templateId: string): string[] {
  const tags: string[] = [];

  const parts = templateId.split('.');
  if (parts.length >= 2) {
    tags.push(parts[1]);
  }
  if (parts.length >= 3) {
    tags.push(parts[2]);
  }

  return tags;
}

function getSubjectKey(category: string): string {
  const categoryMap: Record<string, string> = {
    'geometry': 'math',
    'graphs': 'math',
    'statistics': 'math',
    'algebra': 'math',
    'physics': 'physics',
    'chemistry': 'chemistry',
    'biology': 'biology'
  };

  return categoryMap[category] || 'math';
}

export async function seedAllDiagramTemplates(): Promise<{
  success: boolean;
  inserted: number;
  updated: number;
  errors: string[];
}> {
  const result = {
    success: true,
    inserted: 0,
    updated: 0,
    errors: [] as string[]
  };

  try {
    const templates = getAllTemplates();
    console.log(`Found ${templates.length} templates to seed`);

    for (const template of templates) {
      try {
        const defaults = extractDefaults(template);
        const topicTags = generateTopicTags(template.templateId);
        const subjectKey = getSubjectKey(template.category);

        const { data: existing } = await supabase
          .from('diagram_templates')
          .select('id')
          .eq('template_id', template.templateId)
          .maybeSingle();

        const templateData = {
          template_id: template.templateId,
          title: template.title,
          subject_key: subjectKey,
          topic_tags: topicTags,
          engine_mode: 'auto',
          base_canvas_data: null,
          base_svg_data: null,
          width: 500,
          height: 400,
          anchors: {},
          schema: template.schema,
          defaults: defaults,
          thumbnail_svg: null
        };

        if (existing) {
          const { error } = await supabase
            .from('diagram_templates')
            .update(templateData)
            .eq('id', existing.id);

          if (error) {
            result.errors.push(`Failed to update ${template.templateId}: ${error.message}`);
          } else {
            result.updated++;
            console.log(`Updated: ${template.templateId}`);
          }
        } else {
          const { error } = await supabase
            .from('diagram_templates')
            .insert(templateData);

          if (error) {
            result.errors.push(`Failed to insert ${template.templateId}: ${error.message}`);
          } else {
            result.inserted++;
            console.log(`Inserted: ${template.templateId}`);
          }
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Unknown error';
        result.errors.push(`Error processing ${template.templateId}: ${msg}`);
      }
    }

    result.success = result.errors.length === 0;

    console.log(`Seeding complete: ${result.inserted} inserted, ${result.updated} updated, ${result.errors.length} errors`);

    return result;
  } catch (error) {
    result.success = false;
    result.errors.push(`Fatal error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return result;
  }
}

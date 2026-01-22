/*
  # Custom Template Builder System
  
  Adds support for database-defined diagram templates with custom shapes.
  Allows admins to create templates without code deployment.
  
  1. New columns on diagram_templates:
    - blueprint_json (jsonb) - shape blueprint definition
    - schema_json (jsonb) - parameter schema for validation
    - defaults_json (jsonb) - default parameter values
    - is_custom (boolean) - true if created via template builder
    - created_by (text) - admin user who created it
    - created_at (timestamp)
    - updated_at (timestamp)
  
  2. New table: template_revisions
    - Track template changes for audit trail
  
  3. Indexes for performance
*/

-- Add new columns to diagram_templates if they don't exist
ALTER TABLE diagram_templates
ADD COLUMN IF NOT EXISTS blueprint_json jsonb,
ADD COLUMN IF NOT EXISTS schema_json jsonb,
ADD COLUMN IF NOT EXISTS defaults_json jsonb,
ADD COLUMN IF NOT EXISTS is_custom boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS created_by text,
ADD COLUMN IF NOT EXISTS created_at timestamp DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at timestamp DEFAULT now();

-- Create template_revisions table for audit trail
CREATE TABLE IF NOT EXISTS template_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid NOT NULL REFERENCES diagram_templates(id) ON DELETE CASCADE,
  blueprint_json jsonb,
  schema_json jsonb,
  defaults_json jsonb,
  changed_by text,
  changed_at timestamp DEFAULT now(),
  change_description text
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_diagram_templates_is_custom ON diagram_templates(is_custom);
CREATE INDEX IF NOT EXISTS idx_diagram_templates_created_by ON diagram_templates(created_by);
CREATE INDEX IF NOT EXISTS idx_template_revisions_template_id ON template_revisions(template_id);
CREATE INDEX IF NOT EXISTS idx_template_revisions_changed_at ON template_revisions(changed_at);

-- Add comments for documentation
COMMENT ON COLUMN diagram_templates.blueprint_json IS 'JSON blueprint defining shapes and layers for rendering';
COMMENT ON COLUMN diagram_templates.schema_json IS 'JSON schema for validating template parameters';
COMMENT ON COLUMN diagram_templates.defaults_json IS 'Default parameter values for template';
COMMENT ON COLUMN diagram_templates.is_custom IS 'True if created via template builder (not hardcoded)';
COMMENT ON TABLE template_revisions IS 'Audit trail for template changes';

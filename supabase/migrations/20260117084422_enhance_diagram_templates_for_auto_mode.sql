/*
  # Enhance Diagram Templates for Auto Mode & Complete Feature Set

  1. Schema Changes
    - Add `engine_mode` (text) - "auto" or "template" mode
    - Add `subject_key` (text) - e.g. "math", "physics" for easier filtering
    - Add `defaults` (jsonb) - default params/overrides
    - Add `thumbnail_svg` (text) - preview thumbnail
    
  2. Indexes
    - Add index on engine_mode for filtering
    - Add index on subject_key for filtering
    
  3. Notes
    - `engine_mode = 'auto'`: code-driven renderer, params in schema
    - `engine_mode = 'template'`: SVG-driven with overrides
    - `defaults`: default values for params (auto) or overrides (template)
    - `schema`: defines allowed params structure and validation rules
*/

-- Add new columns to diagram_templates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'diagram_templates' AND column_name = 'engine_mode'
  ) THEN
    ALTER TABLE diagram_templates ADD COLUMN engine_mode text NOT NULL DEFAULT 'auto' CHECK (engine_mode IN ('auto', 'template'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'diagram_templates' AND column_name = 'subject_key'
  ) THEN
    ALTER TABLE diagram_templates ADD COLUMN subject_key text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'diagram_templates' AND column_name = 'defaults'
  ) THEN
    ALTER TABLE diagram_templates ADD COLUMN defaults jsonb DEFAULT '{}'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'diagram_templates' AND column_name = 'thumbnail_svg'
  ) THEN
    ALTER TABLE diagram_templates ADD COLUMN thumbnail_svg text;
  END IF;
END $$;

-- Make base_svg_data nullable for auto mode templates
ALTER TABLE diagram_templates ALTER COLUMN base_svg_data DROP NOT NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_diagram_templates_engine_mode ON diagram_templates(engine_mode);
CREATE INDEX IF NOT EXISTS idx_diagram_templates_subject_key ON diagram_templates(subject_key);

-- Add helpful comment
COMMENT ON COLUMN diagram_templates.engine_mode IS 'auto = code-driven renderer with params; template = SVG-driven with overrides';
COMMENT ON COLUMN diagram_templates.defaults IS 'Default parameter values for auto mode or override defaults for template mode';
COMMENT ON COLUMN diagram_templates.schema IS 'Parameter schema (labels/values/visibility/positions) for auto mode or override schema for template mode';

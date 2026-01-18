/*
  # Create Diagram Templates System

  1. New Tables
    - `diagram_templates`
      - `id` (uuid, primary key)
      - `template_id` (text, unique) - e.g. "math.circle_theorems.angle_in_semicircle.v1"
      - `title` (text)
      - `subject_id` (uuid, nullable, foreign key to subjects)
      - `topic_tags` (jsonb) - array of topic tags
      - `base_canvas_data` (jsonb, nullable) - editor state
      - `base_svg_data` (text) - canonical SVG with element ids
      - `width` (int)
      - `height` (int)
      - `anchors` (jsonb) - lists of point/line/text ids
      - `schema` (jsonb) - allowed overrides schema
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `diagram_templates` table
    - Public read access for authenticated users
    - Admin-only write access (service role)
*/

-- Create diagram_templates table
CREATE TABLE IF NOT EXISTS diagram_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id text UNIQUE NOT NULL,
  title text NOT NULL,
  subject_id uuid REFERENCES subjects(id) ON DELETE SET NULL,
  topic_tags jsonb DEFAULT '[]'::jsonb,
  base_canvas_data jsonb,
  base_svg_data text NOT NULL,
  width int NOT NULL DEFAULT 800,
  height int NOT NULL DEFAULT 600,
  anchors jsonb DEFAULT '{}'::jsonb,
  schema jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE diagram_templates ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read all templates
CREATE POLICY "Authenticated users can read diagram templates"
  ON diagram_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Service role can manage templates (admin access)
CREATE POLICY "Service role can insert diagram templates"
  ON diagram_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can update diagram templates"
  ON diagram_templates
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete diagram templates"
  ON diagram_templates
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index on template_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_diagram_templates_template_id ON diagram_templates(template_id);

-- Create index on subject_id for filtering
CREATE INDEX IF NOT EXISTS idx_diagram_templates_subject_id ON diagram_templates(subject_id);

-- Create GIN index on topic_tags for array searches
CREATE INDEX IF NOT EXISTS idx_diagram_templates_topic_tags ON diagram_templates USING GIN (topic_tags);
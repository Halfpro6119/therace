/*
  # Create Diagrams Table for Template Library

  1. New Tables
    - `diagrams`
      - `id` (uuid, primary key)
      - `title` (text, required) - Diagram name/title
      - `subject_id` (uuid, foreign key to subjects) - Optional subject categorization
      - `diagram_type` (text) - Type like "math-geometry", "math-graph", "science-circuit"
      - `tags` (jsonb) - Array of searchable tags
      - `storage_mode` (text) - "vector", "canvas-json", or "image"
      - `canvas_data` (jsonb) - Full editable design state for the editor
      - `svg_data` (text) - Exported clean SVG for fast rendering
      - `png_url` (text) - Optional PNG export URL
      - `width` (integer) - Canvas width
      - `height` (integer) - Canvas height
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `diagram_versions` (optional for rollback)
      - `id` (uuid, primary key)
      - `diagram_id` (uuid, foreign key to diagrams)
      - `version_number` (integer)
      - `canvas_data` (jsonb)
      - `svg_data` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on diagrams table
    - Policies for authenticated admin users
    - Public read access for rendering in quiz player

  3. Indexes
    - Index on subject_id for filtering
    - Index on diagram_type for filtering
    - GIN index on tags for search
*/

-- Create diagrams table
CREATE TABLE IF NOT EXISTS diagrams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject_id uuid REFERENCES subjects(id) ON DELETE SET NULL,
  diagram_type text NOT NULL DEFAULT 'general',
  tags jsonb DEFAULT '[]'::jsonb,
  storage_mode text NOT NULL DEFAULT 'vector' CHECK (storage_mode IN ('vector', 'canvas-json', 'image')),
  canvas_data jsonb DEFAULT '{}'::jsonb,
  svg_data text,
  png_url text,
  width integer NOT NULL DEFAULT 800,
  height integer NOT NULL DEFAULT 600,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create diagram_versions table for rollback capability
CREATE TABLE IF NOT EXISTS diagram_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagram_id uuid NOT NULL REFERENCES diagrams(id) ON DELETE CASCADE,
  version_number integer NOT NULL,
  canvas_data jsonb DEFAULT '{}'::jsonb,
  svg_data text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(diagram_id, version_number)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_diagrams_subject_id ON diagrams(subject_id);
CREATE INDEX IF NOT EXISTS idx_diagrams_diagram_type ON diagrams(diagram_type);
CREATE INDEX IF NOT EXISTS idx_diagrams_tags ON diagrams USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_diagrams_updated_at ON diagrams(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagram_versions_diagram_id ON diagram_versions(diagram_id);

-- Enable RLS
ALTER TABLE diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagram_versions ENABLE ROW LEVEL SECURITY;

-- Policies for diagrams (public read, authenticated write)
CREATE POLICY "Anyone can view diagrams"
  ON diagrams FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create diagrams"
  ON diagrams FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update diagrams"
  ON diagrams FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete diagrams"
  ON diagrams FOR DELETE
  TO authenticated
  USING (true);

-- Policies for diagram_versions
CREATE POLICY "Anyone can view diagram versions"
  ON diagram_versions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create diagram versions"
  ON diagram_versions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete diagram versions"
  ON diagram_versions FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_diagrams_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_diagrams_updated_at
  BEFORE UPDATE ON diagrams
  FOR EACH ROW
  EXECUTE FUNCTION update_diagrams_updated_at();

-- Function to count prompt usage for a diagram
CREATE OR REPLACE FUNCTION count_diagram_usage(diagram_uuid uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer
    FROM prompts
    WHERE meta->>'diagramId' = diagram_uuid::text
  );
END;
$$ LANGUAGE plpgsql;
/*
  # Create Diagram Metadata System

  1. New Tables
    - `diagram_metadata`
      - `id` (uuid, primary key)
      - `diagram_id` (uuid, foreign key to diagrams)
      - `metadata` (jsonb) - DiagramMetadata object
      - `version` (integer) - Version number for tracking changes
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `diagram_metadata_history`
      - `id` (uuid, primary key)
      - `diagram_id` (uuid, foreign key to diagrams)
      - `metadata` (jsonb) - Historical metadata snapshot
      - `version` (integer) - Version number
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Public read access for metadata
    - Authenticated write access

  3. Indexes
    - Index on diagram_id for fast lookups
    - Index on metadata mode for filtering
    - Index on metadata templateId for filtering
*/

-- Create diagram_metadata table
CREATE TABLE IF NOT EXISTS diagram_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagram_id uuid NOT NULL UNIQUE REFERENCES diagrams(id) ON DELETE CASCADE,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create diagram_metadata_history table for version tracking
CREATE TABLE IF NOT EXISTS diagram_metadata_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  diagram_id uuid NOT NULL REFERENCES diagrams(id) ON DELETE CASCADE,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  version integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(diagram_id, version)
);

-- Enable RLS
ALTER TABLE diagram_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagram_metadata_history ENABLE ROW LEVEL SECURITY;

-- Policies for diagram_metadata (public read, authenticated write)
CREATE POLICY "Anyone can view diagram metadata"
  ON diagram_metadata FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create diagram metadata"
  ON diagram_metadata FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update diagram metadata"
  ON diagram_metadata FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete diagram metadata"
  ON diagram_metadata FOR DELETE
  TO authenticated
  USING (true);

-- Policies for diagram_metadata_history
CREATE POLICY "Anyone can view diagram metadata history"
  ON diagram_metadata_history FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create diagram metadata history"
  ON diagram_metadata_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_diagram_metadata_diagram_id ON diagram_metadata(diagram_id);
CREATE INDEX IF NOT EXISTS idx_diagram_metadata_mode ON diagram_metadata USING gin((metadata->'mode'));
CREATE INDEX IF NOT EXISTS idx_diagram_metadata_template_id ON diagram_metadata USING gin((metadata->'templateId'));
CREATE INDEX IF NOT EXISTS idx_diagram_metadata_updated_at ON diagram_metadata(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagram_metadata_history_diagram_id ON diagram_metadata_history(diagram_id);
CREATE INDEX IF NOT EXISTS idx_diagram_metadata_history_version ON diagram_metadata_history(diagram_id, version DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_diagram_metadata_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_diagram_metadata_updated_at
  BEFORE UPDATE ON diagram_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_diagram_metadata_updated_at();

-- Function to create history entry on metadata update
CREATE OR REPLACE FUNCTION create_diagram_metadata_history()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO diagram_metadata_history (diagram_id, metadata, version)
  VALUES (NEW.diagram_id, NEW.metadata, NEW.version);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create history on update
CREATE TRIGGER create_diagram_metadata_history
  AFTER UPDATE ON diagram_metadata
  FOR EACH ROW
  EXECUTE FUNCTION create_diagram_metadata_history();

-- Function to count diagrams by metadata mode
CREATE OR REPLACE FUNCTION count_diagrams_by_metadata_mode(mode_name text)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer
    FROM diagram_metadata
    WHERE metadata->>'mode' = mode_name
  );
END;
$$ LANGUAGE plpgsql;

-- Function to count diagrams by template
CREATE OR REPLACE FUNCTION count_diagrams_by_template(template_id_name text)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer
    FROM diagram_metadata
    WHERE metadata->>'templateId' = template_id_name
  );
END;
$$ LANGUAGE plpgsql;

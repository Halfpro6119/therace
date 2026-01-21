/*
  # Add Paper Relationships (Unit/Topic to Papers)

  1. New Tables
    - `unit_papers` - Join table linking units to papers
    - `topic_papers` - Join table linking topics to papers

  2. Columns
    - unit_papers(unit_id, paper_id) with unique constraint
    - topic_papers(topic_id, paper_id) with unique constraint

  3. Security
    - Enable RLS on both tables
    - Public read access
    - Authenticated write access

  4. Indexes
    - Index on unit_id for fast lookups
    - Index on paper_id for fast lookups
    - Index on topic_id for fast lookups
*/

-- Create unit_papers join table
CREATE TABLE IF NOT EXISTS unit_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id uuid NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  paper_id uuid NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(unit_id, paper_id)
);

-- Create topic_papers join table
CREATE TABLE IF NOT EXISTS topic_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id uuid NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  paper_id uuid NOT NULL REFERENCES papers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(topic_id, paper_id)
);

-- Enable RLS
ALTER TABLE unit_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_papers ENABLE ROW LEVEL SECURITY;

-- Policies for unit_papers
CREATE POLICY "Anyone can view unit_papers"
  ON unit_papers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert unit_papers"
  ON unit_papers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update unit_papers"
  ON unit_papers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete unit_papers"
  ON unit_papers FOR DELETE
  TO authenticated
  USING (true);

-- Policies for topic_papers
CREATE POLICY "Anyone can view topic_papers"
  ON topic_papers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert topic_papers"
  ON topic_papers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update topic_papers"
  ON topic_papers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete topic_papers"
  ON topic_papers FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_unit_papers_unit_id ON unit_papers(unit_id);
CREATE INDEX IF NOT EXISTS idx_unit_papers_paper_id ON unit_papers(paper_id);
CREATE INDEX IF NOT EXISTS idx_topic_papers_topic_id ON topic_papers(topic_id);
CREATE INDEX IF NOT EXISTS idx_topic_papers_paper_id ON topic_papers(paper_id);

-- Backfill: Create unit_papers and topic_papers relationships from existing prompts
-- This ensures that if a prompt has a paper_id, we create the corresponding unit/topic relationships
INSERT INTO unit_papers (unit_id, paper_id)
SELECT DISTINCT p.unit_id, p.paper_id
FROM prompts p
WHERE p.paper_id IS NOT NULL
  AND p.unit_id IS NOT NULL
ON CONFLICT (unit_id, paper_id) DO NOTHING;

INSERT INTO topic_papers (topic_id, paper_id)
SELECT DISTINCT p.topic_id, p.paper_id
FROM prompts p
WHERE p.paper_id IS NOT NULL
  AND p.topic_id IS NOT NULL
ON CONFLICT (topic_id, paper_id) DO NOTHING;

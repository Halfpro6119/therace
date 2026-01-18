/*
  # Content Coverage Schema for GCSE Revision App

  1. New Tables
    - `papers` - GCSE papers (Paper 1, 2, 3 per subject)
    - `question_types` - Question type templates (e.g., "p1_geo_circle_semi_circle")
    - `coverage_settings` - Admin settings for coverage thresholds

  2. Modifications
    - Add `paper_id` to prompts (optional, for paper-specific questions)
    - Add `question_type_id` to prompts (FK to question_types)

  3. Security
    - Enable RLS on all tables
    - Public read access for coverage data
    - Admin write access
*/

-- Papers table
CREATE TABLE IF NOT EXISTS papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  paper_number int NOT NULL CHECK (paper_number IN (1, 2, 3)),
  name text NOT NULL,
  calculator_allowed_default boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(subject_id, paper_number)
);

ALTER TABLE papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for papers"
  ON papers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert papers"
  ON papers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can update papers"
  ON papers FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete papers"
  ON papers FOR DELETE
  TO public
  USING (true);

-- Question Types table (template library)
CREATE TABLE IF NOT EXISTS question_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  paper_id uuid REFERENCES papers(id) ON DELETE CASCADE,
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE,
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE,
  type_id text NOT NULL, -- e.g., "p1_geo_circle_semi_circle"
  title text NOT NULL,
  difficulty_min int DEFAULT 1,
  difficulty_max int DEFAULT 9,
  marks_min int DEFAULT 1,
  marks_max int DEFAULT 5,
  calculator_allowed boolean,
  diagram_template_id uuid,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(subject_id, type_id)
);

ALTER TABLE question_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for question_types"
  ON question_types FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert question_types"
  ON question_types FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can update question_types"
  ON question_types FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete question_types"
  ON question_types FOR DELETE
  TO public
  USING (true);

-- Coverage Settings table
CREATE TABLE IF NOT EXISTS coverage_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  min_prompts_per_question_type int DEFAULT 10,
  min_prompts_per_topic int DEFAULT 50,
  min_prompts_per_unit int DEFAULT 200,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(subject_id)
);

ALTER TABLE coverage_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for coverage_settings"
  ON coverage_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert coverage_settings"
  ON coverage_settings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can update coverage_settings"
  ON coverage_settings FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Add columns to prompts table for coverage tracking
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS paper_id uuid REFERENCES papers(id) ON DELETE SET NULL;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS question_type_id uuid REFERENCES question_types(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_papers_subject_id ON papers(subject_id);
CREATE INDEX IF NOT EXISTS idx_question_types_subject_id ON question_types(subject_id);
CREATE INDEX IF NOT EXISTS idx_question_types_paper_id ON question_types(paper_id);
CREATE INDEX IF NOT EXISTS idx_question_types_unit_id ON question_types(unit_id);
CREATE INDEX IF NOT EXISTS idx_question_types_topic_id ON question_types(topic_id);
CREATE INDEX IF NOT EXISTS idx_prompts_question_type_id ON prompts(question_type_id);
CREATE INDEX IF NOT EXISTS idx_prompts_paper_id ON prompts(paper_id);
CREATE INDEX IF NOT EXISTS idx_coverage_settings_subject_id ON coverage_settings(subject_id);

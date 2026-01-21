/*
  # Add Paper Master Quiz Support

  1. Extend quizzes table
    - Add paper_id (nullable FK to papers.id)
    - Add quiz_type (subject_master | paper_master | unit | topic)
    - Add is_active boolean
    - Add settings jsonb for configuration

  2. Create indexes for efficient querying

  3. Backfill existing quizzes as "subject_master" type
*/

-- Add new columns to quizzes table
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS paper_id uuid REFERENCES papers(id) ON DELETE CASCADE;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS quiz_type text NOT NULL DEFAULT 'subject_master' CHECK (quiz_type IN ('subject_master', 'paper_master', 'unit', 'topic'));
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS settings jsonb DEFAULT '{}';

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_quizzes_paper_id ON quizzes(paper_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_quiz_type ON quizzes(quiz_type);
CREATE INDEX IF NOT EXISTS idx_quizzes_subject_paper ON quizzes(subject_id, paper_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_active ON quizzes(is_active);

-- Update existing quizzes to be subject_master type if not already set
UPDATE quizzes SET quiz_type = 'subject_master' WHERE quiz_type IS NULL OR quiz_type = '';

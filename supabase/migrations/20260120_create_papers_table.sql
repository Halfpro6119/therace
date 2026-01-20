-- Create papers table for exam paper organization
CREATE TABLE IF NOT EXISTS papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL,
  paper_key TEXT NOT NULL,
  paper_number INT,
  name TEXT NOT NULL,
  calculator_allowed_default BOOLEAN DEFAULT false,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Unique constraint on paper_key per subject
  UNIQUE(subject_id, paper_key)
);

-- Create index for faster lookups
CREATE INDEX idx_papers_subject_id ON papers(subject_id);
CREATE INDEX idx_papers_paper_key ON papers(paper_key);
CREATE INDEX idx_papers_sort_order ON papers(sort_order);

-- Add paperId column to prompts table
ALTER TABLE prompts 
ADD COLUMN IF NOT EXISTS paper_id UUID REFERENCES papers(id) ON DELETE SET NULL;

-- Create index for paper_id lookups
CREATE INDEX IF NOT EXISTS idx_prompts_paper_id ON prompts(paper_id);

-- Add calculator_allowed override to prompts
ALTER TABLE prompts 
ADD COLUMN IF NOT EXISTS calculator_allowed BOOLEAN;

-- Create index for calculator_allowed
CREATE INDEX IF NOT EXISTS idx_prompts_calculator_allowed ON prompts(calculator_allowed);

-- Enable RLS on papers table
ALTER TABLE papers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for papers
CREATE POLICY "Enable read access for all users" ON papers
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON papers
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON papers
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON papers
  FOR DELETE USING (auth.role() = 'authenticated');

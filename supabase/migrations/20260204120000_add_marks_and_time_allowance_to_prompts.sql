-- Migration: Add marks and time_allowance_sec to prompts table
-- Purpose: Allow per-question marks and time allowances; total quiz time = sum of per-question allowances

-- Add marks column (nullable; NULL => treat as 1 for display)
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS marks int DEFAULT NULL;
COMMENT ON COLUMN prompts.marks IS 'Marks/points for this question. NULL defaults to 1.';

-- Add time_allowance_sec column (nullable; NULL => use quiz default per question)
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS time_allowance_sec int DEFAULT NULL;
COMMENT ON COLUMN prompts.time_allowance_sec IS 'Recommended time in seconds for this question. Sum of all allowances = total quiz time.';

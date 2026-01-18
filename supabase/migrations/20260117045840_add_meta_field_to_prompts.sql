/*
  # Add meta field to prompts table

  1. Changes
    - Add `meta` jsonb column to `prompts` table to store metadata like calculatorAllowed
    
  2. Purpose
    - Enables storing additional metadata for prompts (e.g., calculator availability, drawing recommendations)
    - Provides flexibility for future prompt-specific settings without schema changes
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'prompts' AND column_name = 'meta'
  ) THEN
    ALTER TABLE prompts ADD COLUMN meta jsonb DEFAULT NULL;
  END IF;
END $$;

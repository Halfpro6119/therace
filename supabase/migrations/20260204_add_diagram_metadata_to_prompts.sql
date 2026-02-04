/*
  # Add diagram_metadata column to prompts table

  1. Changes
    - Add `diagram_metadata` JSONB column to `prompts` table for storing diagram metadata
    - This enables storing diagram information directly on prompts
    
  2. Purpose
    - Enables storing diagram metadata (mode, templateId, placement, etc.) directly on prompts
    - Provides flexibility for prompt-specific diagrams without requiring separate diagram assets
    - Supports both `meta.diagram` and `diagram_metadata` for backward compatibility
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'prompts' AND column_name = 'diagram_metadata'
  ) THEN
    ALTER TABLE prompts ADD COLUMN diagram_metadata jsonb DEFAULT NULL;
  END IF;
END $$;

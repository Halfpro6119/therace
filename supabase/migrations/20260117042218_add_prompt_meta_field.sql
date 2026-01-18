/*
  # Add meta field to prompts table

  1. Changes
    - Add `meta` JSONB column to prompts table for storing metadata
    - This enables calculator permissions and other prompt-specific settings
    
  2. Details
    - Field is nullable for backward compatibility
    - Calculator allowed can be set via `meta.calculatorAllowed`
    - Drawing recommended can be set via `meta.drawingRecommended`
    - Other metadata can be added as needed
    
  3. Notes
    - No data migration needed
    - Existing prompts will have NULL meta, which is handled gracefully
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

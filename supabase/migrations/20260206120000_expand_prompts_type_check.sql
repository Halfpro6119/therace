-- Migration: Expand prompts.type CHECK to allow all app question types
-- Purpose: Golden Maths seed (and imports) use numeric, expression, multiNumeric, etc.
--          Original schema only allowed ('short', 'mcq', 'fill', 'match', 'label').

DO $$
DECLARE
  conname text;
BEGIN
  SELECT tc.constraint_name INTO conname
  FROM information_schema.table_constraints tc
  WHERE tc.table_schema = 'public' AND tc.table_name = 'prompts' AND tc.constraint_type = 'CHECK'
    AND EXISTS (
      SELECT 1 FROM information_schema.constraint_column_usage ccu
      WHERE ccu.constraint_name = tc.constraint_name AND ccu.column_name = 'type'
    )
  LIMIT 1;
  IF conname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE prompts DROP CONSTRAINT %I', conname);
  END IF;
END $$;

ALTER TABLE prompts ADD CONSTRAINT prompts_type_check CHECK (
  type IN (
    'short', 'mcq', 'fill', 'match', 'label',
    'numeric', 'numericWithTolerance', 'multiNumeric', 'expression', 'tableFill',
    'orderSteps', 'graphPlot', 'graphRead', 'inequalityPlot', 'proofShort',
    'geometryConstruct', 'dragMatch', 'matrixInput', 'vectorDiagram', 'functionMachine'
  )
);
COMMENT ON COLUMN prompts.type IS 'Question form type; must match app PromptType for rendering and grading.';

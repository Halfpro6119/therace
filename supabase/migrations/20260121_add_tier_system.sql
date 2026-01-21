/*
  # Add Tier Separation System (Higher vs Foundation)

  1. New Columns
    - `prompts.tier` - text NULL, allowed values: 'higher' | 'foundation' | NULL
    - `quizzes.tier_filter` - text DEFAULT 'all', allowed values: 'all' | 'higher' | 'foundation'

  2. Indexes (for performance)
    - idx_prompts_subject_tier (subject_id, tier)
    - idx_prompts_paper_tier (paper_id, tier)
    - idx_prompts_topic_tier (topic_id, tier)
    - idx_prompts_unit_tier (unit_id, tier)

  3. Constraints
    - CHECK constraint on tier column to ensure valid values

  4. Notes
    - Tier is stored on prompts, NOT on papers (papers are orthogonal to tier)
    - NULL tier means "All tiers" - backwards compatible with existing prompts
    - Quizzes can be filtered by tier at runtime
*/

-- Add tier column to prompts table
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS tier text NULL
CHECK (tier IS NULL OR tier IN ('higher', 'foundation'));

-- Add tier_filter column to quizzes table for runtime filtering
ALTER TABLE quizzes
ADD COLUMN IF NOT EXISTS tier_filter text DEFAULT 'all'
CHECK (tier_filter IN ('all', 'higher', 'foundation'));

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_prompts_subject_tier ON prompts(subject_id, tier);
CREATE INDEX IF NOT EXISTS idx_prompts_paper_tier ON prompts(paper_id, tier);
CREATE INDEX IF NOT EXISTS idx_prompts_topic_tier ON prompts(topic_id, tier);
CREATE INDEX IF NOT EXISTS idx_prompts_unit_tier ON prompts(unit_id, tier);

-- Index for quiz tier filtering
CREATE INDEX IF NOT EXISTS idx_quizzes_tier_filter ON quizzes(tier_filter);

-- Add comment for documentation
COMMENT ON COLUMN prompts.tier IS 'Tier level: higher, foundation, or NULL for all tiers (backwards compatible)';
COMMENT ON COLUMN quizzes.tier_filter IS 'Runtime tier filter: all, higher, or foundation';

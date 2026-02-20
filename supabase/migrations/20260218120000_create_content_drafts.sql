/*
  # Content drafts for admin-view edit workflow

  - content_drafts: one row per entity (prompt or diagram); draft_json holds full payload
  - Unique on (entity_type, entity_id) so one draft per entity
  - Public read/write via anon key (app gates access by admin passcode in UI); optionally restrict with RLS later
*/

CREATE TABLE IF NOT EXISTS content_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type IN ('prompt', 'diagram')),
  entity_id uuid NOT NULL,
  draft_json jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(entity_type, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_content_drafts_entity ON content_drafts(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_content_drafts_updated_at ON content_drafts(updated_at DESC);

ALTER TABLE content_drafts ENABLE ROW LEVEL SECURITY;

-- Allow public read/write; app uses admin passcode in UI. Tighten with auth later if needed.
CREATE POLICY "Allow read content_drafts"
  ON content_drafts FOR SELECT TO public USING (true);

CREATE POLICY "Allow insert content_drafts"
  ON content_drafts FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow update content_drafts"
  ON content_drafts FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow delete content_drafts"
  ON content_drafts FOR DELETE TO public USING (true);

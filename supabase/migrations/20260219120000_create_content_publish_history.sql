/*
  # Content publish history for admin-view

  - When a draft is pushed live, we store the previous live state here so admins can revert.
  - One row per publish event; reverting restores previous_state_json to live and removes the row.
*/

CREATE TABLE IF NOT EXISTS content_publish_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type IN ('prompt', 'diagram')),
  entity_id uuid NOT NULL,
  previous_state_json jsonb NOT NULL,
  published_at timestamptz DEFAULT now(),
  preview_text text
);

CREATE INDEX IF NOT EXISTS idx_content_publish_history_published_at ON content_publish_history(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_publish_history_entity ON content_publish_history(entity_type, entity_id);

ALTER TABLE content_publish_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read content_publish_history"
  ON content_publish_history FOR SELECT TO public USING (true);

CREATE POLICY "Allow insert content_publish_history"
  ON content_publish_history FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Allow delete content_publish_history"
  ON content_publish_history FOR DELETE TO public USING (true);

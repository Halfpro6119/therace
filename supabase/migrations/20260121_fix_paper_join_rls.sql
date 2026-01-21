/*
  # Fix RLS for unit_papers/topic_papers

  The app uses the anon/public key in the browser (no Supabase Auth session).
  Previous policies allowed writes only to `authenticated`, causing "Failed to assign paper".

  This migration updates policies so public can insert/update/delete join rows,
  matching the existing admin approach on other tables.
*/

-- unit_papers policies
DROP POLICY IF EXISTS "Authenticated users can insert unit_papers" ON unit_papers;
DROP POLICY IF EXISTS "Authenticated users can update unit_papers" ON unit_papers;
DROP POLICY IF EXISTS "Authenticated users can delete unit_papers" ON unit_papers;

CREATE POLICY "Public can insert unit_papers"
  ON unit_papers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update unit_papers"
  ON unit_papers FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete unit_papers"
  ON unit_papers FOR DELETE
  TO public
  USING (true);

-- topic_papers policies
DROP POLICY IF EXISTS "Authenticated users can insert topic_papers" ON topic_papers;
DROP POLICY IF EXISTS "Authenticated users can update topic_papers" ON topic_papers;
DROP POLICY IF EXISTS "Authenticated users can delete topic_papers" ON topic_papers;

CREATE POLICY "Public can insert topic_papers"
  ON topic_papers FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update topic_papers"
  ON topic_papers FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete topic_papers"
  ON topic_papers FOR DELETE
  TO public
  USING (true);

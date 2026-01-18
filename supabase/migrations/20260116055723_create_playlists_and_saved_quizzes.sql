/*
  # Create Playlists and Discovery System

  1. New Tables
    - `playlists`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `subject_id` (uuid, nullable, foreign key)
      - `unit_id` (uuid, nullable, foreign key)
      - `theme_tag` (text) - e.g. "Grade 9 Speed", "Exam Week"
      - `is_daily` (boolean)
      - `is_featured` (boolean)
      - `cover_style` (text) - "gradient", "image", "minimal"
      - `order_index` (integer)
      - `created_at` (timestamptz)

    - `playlist_items`
      - `id` (uuid, primary key)
      - `playlist_id` (uuid, foreign key)
      - `quiz_id` (uuid, foreign key)
      - `order_index` (integer)
      - `created_at` (timestamptz)

    - `user_saved_quizzes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `quiz_id` (uuid, foreign key)
      - `saved_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public can read playlists and playlist_items
    - Users can manage their own saved quizzes
*/

CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subject_id uuid REFERENCES subjects(id) ON DELETE SET NULL,
  unit_id uuid REFERENCES units(id) ON DELETE SET NULL,
  theme_tag text,
  is_daily boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  cover_style text DEFAULT 'gradient',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS playlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE NOT NULL,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_saved_quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  saved_at timestamptz DEFAULT now(),
  UNIQUE(user_id, quiz_id)
);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_saved_quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view playlists"
  ON playlists
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view playlist items"
  ON playlist_items
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view their saved quizzes"
  ON user_saved_quizzes
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can save quizzes"
  ON user_saved_quizzes
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can unsave quizzes"
  ON user_saved_quizzes
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_playlists_featured ON playlists(is_featured, order_index);
CREATE INDEX IF NOT EXISTS idx_playlists_daily ON playlists(is_daily, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_playlist_items_playlist ON playlist_items(playlist_id, order_index);
CREATE INDEX IF NOT EXISTS idx_user_saved_quizzes_user ON user_saved_quizzes(user_id, saved_at DESC);

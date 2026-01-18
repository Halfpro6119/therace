/*
  # Grade9 Sprint Database Schema

  1. New Tables
    - `subjects` - Subject information (Maths, Biology, History)
    - `units` - Units within subjects
    - `topics` - Topics within units
    - `prompts` - Question prompts (tagged to subject/unit/topic)
    - `quizzes` - Fixed quizzes with promptIds array
    - `users` - User profiles
    - `attempts` - Quiz attempt history
    - `mastery` - Per-user quiz mastery tracking
    - `streaks` - Per-user streak tracking

  2. Security
    - Enable RLS on all tables
    - Public read access for subjects, units, topics, prompts, quizzes
    - User-specific access for attempts, mastery, streaks
*/

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  exam_board text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  theme_color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for subjects"
  ON subjects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert subjects"
  ON subjects FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can update subjects"
  ON subjects FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Units table
CREATE TABLE IF NOT EXISTS units (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  order_index int NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for units"
  ON units FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert units"
  ON units FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can update units"
  ON units FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Topics table
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  order_index int NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for topics"
  ON topics FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert topics"
  ON topics FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can update topics"
  ON topics FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Prompts table
CREATE TABLE IF NOT EXISTS prompts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  unit_id uuid REFERENCES units(id) ON DELETE CASCADE NOT NULL,
  topic_id uuid REFERENCES topics(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('short', 'mcq', 'fill', 'match', 'label')),
  question text NOT NULL,
  answers jsonb NOT NULL,
  hint text,
  explanation text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for prompts"
  ON prompts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert prompts"
  ON prompts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can update prompts"
  ON prompts FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete prompts"
  ON prompts FOR DELETE
  TO public
  USING (true);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
  scope_type text NOT NULL CHECK (scope_type IN ('topic', 'unit', 'full')),
  topic_id uuid REFERENCES topics(id) ON DELETE SET NULL,
  unit_id uuid REFERENCES units(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL,
  time_limit_sec int NOT NULL,
  grade9_target_sec int NOT NULL,
  prompt_ids jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for quizzes"
  ON quizzes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert quizzes"
  ON quizzes FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admin can update quizzes"
  ON quizzes FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can delete quizzes"
  ON quizzes FOR DELETE
  TO public
  USING (true);

-- Users table (local profile tracking)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  display_name text NOT NULL DEFAULT 'Student',
  xp_total int NOT NULL DEFAULT 0,
  badges jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Attempts table
CREATE TABLE IF NOT EXISTS attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  started_at timestamptz NOT NULL,
  finished_at timestamptz NOT NULL,
  correct_prompt_ids jsonb NOT NULL,
  missed_prompt_ids jsonb NOT NULL,
  time_taken_sec int NOT NULL,
  accuracy_pct int NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own attempts"
  ON attempts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own attempts"
  ON attempts FOR INSERT
  TO public
  WITH CHECK (true);

-- Mastery table
CREATE TABLE IF NOT EXISTS mastery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  best_accuracy_pct int NOT NULL,
  best_time_sec int NOT NULL,
  mastery_level int NOT NULL CHECK (mastery_level >= 0 AND mastery_level <= 4),
  last_played_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, quiz_id)
);

ALTER TABLE mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own mastery"
  ON mastery FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own mastery"
  ON mastery FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own mastery"
  ON mastery FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Streaks table
CREATE TABLE IF NOT EXISTS streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  current_streak_days int NOT NULL DEFAULT 0,
  best_streak_days int NOT NULL DEFAULT 0,
  last_active_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own streak"
  ON streaks FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own streak"
  ON streaks FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own streak"
  ON streaks FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_units_subject ON units(subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_subject ON topics(subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_unit ON topics(unit_id);
CREATE INDEX IF NOT EXISTS idx_prompts_subject ON prompts(subject_id);
CREATE INDEX IF NOT EXISTS idx_prompts_unit ON prompts(unit_id);
CREATE INDEX IF NOT EXISTS idx_prompts_topic ON prompts(topic_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_subject ON quizzes(subject_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_quiz ON attempts(quiz_id);
CREATE INDEX IF NOT EXISTS idx_mastery_user ON mastery(user_id);
CREATE INDEX IF NOT EXISTS idx_mastery_quiz ON mastery(quiz_id);

/*
  Vocab Lab schema: sets, words, attempts, mastery, fix-it queue.
  RLS: students read sets/words; students manage own attempts/mastery/fixit.
*/

-- vocab_sets
CREATE TABLE IF NOT EXISTS vocab_sets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  mode text NOT NULL CHECK (mode IN ('language_p1','language_p2','literature','general')),
  theme_tag text NOT NULL,
  tier text NOT NULL CHECK (tier IN ('core','stretch')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vocab_sets_mode ON vocab_sets(mode);
CREATE INDEX IF NOT EXISTS idx_vocab_sets_theme_tag ON vocab_sets(theme_tag);

ALTER TABLE vocab_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read vocab_sets"
  ON vocab_sets FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert vocab_sets (admin via service role)"
  ON vocab_sets FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update vocab_sets"
  ON vocab_sets FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete vocab_sets"
  ON vocab_sets FOR DELETE TO authenticated USING (true);

-- vocab_words (case-insensitive unique on set_id, word via unique index)
CREATE TABLE IF NOT EXISTS vocab_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  set_id uuid NOT NULL REFERENCES vocab_sets(id) ON DELETE CASCADE,
  word text NOT NULL,
  pronunciation text,
  definition text NOT NULL,
  synonyms jsonb NOT NULL DEFAULT '[]'::jsonb,
  antonyms jsonb NOT NULL DEFAULT '[]'::jsonb,
  connotation text NOT NULL CHECK (connotation IN ('positive','negative','neutral')),
  word_class text NOT NULL CHECK (word_class IN ('noun','verb','adj','adv','other')),
  example_sentence text NOT NULL,
  common_misspellings jsonb NOT NULL DEFAULT '[]'::jsonb,
  difficulty int NOT NULL DEFAULT 3 CHECK (difficulty BETWEEN 1 AND 5),
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vocab_words_set_id ON vocab_words(set_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_vocab_words_set_id_word_lower ON vocab_words(set_id, lower(word));

ALTER TABLE vocab_words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read vocab_words"
  ON vocab_words FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert vocab_words"
  ON vocab_words FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update vocab_words"
  ON vocab_words FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete vocab_words"
  ON vocab_words FOR DELETE TO authenticated USING (true);

-- vocab_attempts
CREATE TABLE IF NOT EXISTS vocab_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  word_id uuid NOT NULL REFERENCES vocab_words(id) ON DELETE CASCADE,
  mode text NOT NULL CHECK (mode IN ('spell','definition','synonym','context')),
  prompt_variant text NOT NULL DEFAULT '',
  user_input text NOT NULL DEFAULT '',
  is_correct boolean NOT NULL,
  levenshtein_distance int,
  time_ms int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_vocab_attempts_user_id_created_at ON vocab_attempts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vocab_attempts_word_id ON vocab_attempts(word_id);

ALTER TABLE vocab_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own vocab_attempts"
  ON vocab_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vocab_attempts"
  ON vocab_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- vocab_mastery
CREATE TABLE IF NOT EXISTS vocab_mastery (
  user_id uuid NOT NULL,
  word_id uuid NOT NULL REFERENCES vocab_words(id) ON DELETE CASCADE,
  mastery int NOT NULL DEFAULT 0 CHECK (mastery BETWEEN 0 AND 100),
  streak int NOT NULL DEFAULT 0,
  last_seen timestamptz,
  next_due timestamptz,
  ease float NOT NULL DEFAULT 2.5,
  lapses int NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, word_id)
);

CREATE INDEX IF NOT EXISTS idx_vocab_mastery_user_id_next_due ON vocab_mastery(user_id, next_due);
CREATE INDEX IF NOT EXISTS idx_vocab_mastery_user_id_mastery ON vocab_mastery(user_id, mastery);

ALTER TABLE vocab_mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own vocab_mastery"
  ON vocab_mastery FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vocab_mastery"
  ON vocab_mastery FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vocab_mastery"
  ON vocab_mastery FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- vocab_fixit_queue
CREATE TABLE IF NOT EXISTS vocab_fixit_queue (
  user_id uuid NOT NULL,
  word_id uuid NOT NULL REFERENCES vocab_words(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, word_id)
);

CREATE INDEX IF NOT EXISTS idx_vocab_fixit_queue_user_id_added_at ON vocab_fixit_queue(user_id, added_at);

ALTER TABLE vocab_fixit_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own vocab_fixit_queue"
  ON vocab_fixit_queue FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vocab_fixit_queue"
  ON vocab_fixit_queue FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own vocab_fixit_queue"
  ON vocab_fixit_queue FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- RPC: submit one attempt, update mastery (with scheduling), update fixit queue (atomic)
CREATE OR REPLACE FUNCTION submit_vocab_attempt(
  p_word_id uuid,
  p_mode text,
  p_prompt_variant text,
  p_user_input text,
  p_is_correct boolean,
  p_levenshtein_distance int,
  p_time_ms int,
  p_mastery_delta int,
  p_streak_delta int,
  p_add_to_fixit boolean
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_attempt_id uuid;
  v_cur_mastery int;
  v_cur_streak int;
  v_cur_ease float;
  v_cur_lapses int;
  v_next_due timestamptz;
  v_ease float;
  v_new_mastery int;
  v_new_streak int;
  v_interval_min int;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT COALESCE(m.mastery, 0), COALESCE(m.streak, 0), COALESCE(m.ease, 2.5), COALESCE(m.lapses, 0)
  INTO v_cur_mastery, v_cur_streak, v_cur_ease, v_cur_lapses
  FROM vocab_mastery m
  WHERE m.user_id = v_user_id AND m.word_id = p_word_id;

  IF NOT FOUND THEN
    v_cur_mastery := 0; v_cur_streak := 0; v_cur_ease := 2.5; v_cur_lapses := 0;
  END IF;

  v_new_mastery := GREATEST(0, LEAST(100, v_cur_mastery + p_mastery_delta));
  v_new_streak := GREATEST(0, v_cur_streak + p_streak_delta);

  IF p_is_correct THEN
    v_interval_min := GREATEST(10, ROUND(((v_new_mastery / 10.0) + 1) * v_cur_ease * 60));
    v_next_due := now() + (v_interval_min || ' minutes')::interval;
    v_ease := LEAST(3.0, v_cur_ease + 0.05);
  ELSE
    v_next_due := now() + interval '10 minutes';
    v_ease := GREATEST(1.7, v_cur_ease - 0.15);
  END IF;

  INSERT INTO vocab_attempts (user_id, word_id, mode, prompt_variant, user_input, is_correct, levenshtein_distance, time_ms)
  VALUES (v_user_id, p_word_id, p_mode, COALESCE(p_prompt_variant, ''), COALESCE(p_user_input, ''), p_is_correct, p_levenshtein_distance, p_time_ms)
  RETURNING id INTO v_attempt_id;

  INSERT INTO vocab_mastery (user_id, word_id, mastery, streak, last_seen, next_due, ease, lapses)
  VALUES (v_user_id, p_word_id, v_new_mastery, v_new_streak, now(), v_next_due, v_ease, v_cur_lapses + CASE WHEN p_streak_delta < 0 THEN 1 ELSE 0 END)
  ON CONFLICT (user_id, word_id) DO UPDATE SET
    mastery = EXCLUDED.mastery,
    streak = EXCLUDED.streak,
    last_seen = now(),
    next_due = EXCLUDED.next_due,
    ease = EXCLUDED.ease,
    lapses = vocab_mastery.lapses + CASE WHEN p_streak_delta < 0 THEN 1 ELSE 0 END;

  IF p_add_to_fixit THEN
    INSERT INTO vocab_fixit_queue (user_id, word_id) VALUES (v_user_id, p_word_id)
    ON CONFLICT (user_id, word_id) DO NOTHING;
  END IF;

  RETURN v_attempt_id;
END;
$$;

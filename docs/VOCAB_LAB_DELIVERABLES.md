# Vocab Lab – Implementation Deliverables

## 1. Files changed/added

### Supabase
- **supabase/migrations/20260209120000_create_vocab_lab_schema.sql** – Tables: `vocab_sets`, `vocab_words`, `vocab_attempts`, `vocab_mastery`, `vocab_fixit_queue`; indexes; RLS policies; RPC `submit_vocab_attempt`.

### Types
- **src/types/vocab.ts** – VocabSet, VocabWord, VocabAttempt, VocabMastery, SpellGradeResult, session types.

### Lib / utils
- **src/utils/vocab/grading.ts** – Normalize input, Levenshtein, near-miss, grade spell attempt.
- **src/utils/vocab/mastery.ts** – Mastery delta, streak delta, next_due/ease (used in RPC), shouldAddToFixIt.
- **src/utils/vocab/session.ts** – selectSessionWords (due/weak/new), applySessionLength.
- **src/utils/vocab/api.ts** – vocabApi (getSets, getSet, getWordsBySetId, getWordsBySetIds, getWord, getMasteryForUser, getFixItQueue, getAttemptsByWord, submitSpellAttempt, removeFromFixItAndBoost); getCurrentUserId; admin create/update/delete set/word.
- **src/utils/vocab/index.ts** – Re-exports.

### Student pages (English Campus → Vocab Lab)
- **src/pages/english/vocab/EnglishVocabLabHomePage.tsx** – Home with tiles (Language, Literature, Weak Words, Fix-It, Sets Library, Streak Sprint) and heatmap link.
- **src/pages/english/vocab/EnglishVocabSetsPage.tsx** – Set library with filters (mode, theme, tier, search).
- **src/pages/english/vocab/EnglishVocabSetDetailPage.tsx** – Set detail; session length (10/20/40 / Mastery Sprint); Start session.
- **src/pages/english/vocab/EnglishVocabSessionPage.tsx** – Quiz player: spell mode, feedback (correct / near miss / wrong), HUD (streak, accuracy, mastery), Fix-It mode, Mastery Sprint (5 in a row or 25).
- **src/pages/english/vocab/EnglishVocabResultsPage.tsx** – Session summary, fix-it additions, words-in-session list with links to word detail (progress replay), CTAs (Fix mistakes now, Replay weak words, Next due words, Back).
- **src/pages/english/vocab/EnglishVocabHeatmapPage.tsx** – Heatmap by theme and by set; mastery bands (0–20 … 81–100).
- **src/pages/english/vocab/EnglishVocabWordDetailPage.tsx** – Word, definition, example, mastery/streak/next due, attempt timeline (last 20).

### Admin pages
- **src/admin/vocab/AdminVocabSetsPage.tsx** – CRUD sets (create/edit/delete), link to words.
- **src/admin/vocab/AdminVocabWordsPage.tsx** – CRUD words (filter by set), word preview.
- **src/admin/vocab/AdminVocabImportPage.tsx** – Paste or upload JSON (file input + drag-and-drop); validate; import (reuse or create set, upsert words).
- **src/admin/vocab/AdminVocabExportPage.tsx** – Select set, export JSON.

### Routes and nav
- **src/App.tsx** – Vocab routes under `/english-campus/vocab` (home, sets, set/:setId, session, results/:sessionId, heatmap, word/:wordId); admin routes `/admin/vocab/sets`, `/admin/vocab/words`, `/admin/vocab/import`, `/admin/vocab/export`; Vocab Lab nav uses new home/sets/detail/session/results/heatmap/word pages.
- **src/admin/AdminLayout.tsx** – Nav item “Vocab Lab” → `/admin/vocab/sets`.

### Tests
- **src/utils/vocab/__tests__/grading.test.ts** – normalizeSpellInput, levenshteinDistance, isNearMiss, gradeSpellAttempt.
- **src/utils/vocab/__tests__/mastery.test.ts** – getMasteryDelta, getStreakDelta, shouldAddToFixIt.
- **src/utils/vocab/__tests__/session.test.ts** – selectSessionWords, applySessionLength.

### Sample data
- **docs/vocab-lab-sample-import.json** – Sample set “Rhetoric Basics” (10 words, difficulty 1–3, some synonyms/misspellings) for import and smoke test.

### Removed / replaced
- **src/pages/english/EnglishVocabLabPage.tsx** – **Removed.** Replaced by `EnglishVocabLabHomePage`; all routes in App.tsx point to the new vocab pages.

---

## 2. SQL migrations

Run in order:

1. **20260209120000_create_vocab_lab_schema.sql**

Apply via Supabase CLI (from project root):

```bash
supabase db push
```

Or run the SQL in the Supabase SQL editor for the target project.

---

## 3. How to import vocab data

### Option A: Seed script (all sets in one go)

1. **Apply the migration** (see §2).
2. Add `SUPABASE_SERVICE_ROLE_KEY` to `.env` (get from Supabase: Project Settings → API → service_role).
3. Run: `npm run seed:vocab`
4. This imports all four JSON files: sample, persuasion-core, description-core, literature-stretch (~210 words total).

### Option B: Admin UI (paste JSON)

1. **Apply the migration** (see §2).
2. **Open Admin** → passcode → **Vocab Lab** (or go to `/admin/vocab/sets`).
3. Go to **Import** (`/admin/vocab/import`).
4. Paste the contents of **docs/vocab-lab-sample-import.json**, or use **Choose JSON file** / drag-and-drop to upload the file, or use this minimal example:

```json
{
  "set": {
    "name": "Rhetoric Basics",
    "mode": "language_p2",
    "theme_tag": "Rhetoric",
    "tier": "core"
  },
  "words": [
    {
      "word": "inevitable",
      "definition": "Certain to happen; unavoidable.",
      "synonyms": ["unavoidable", "inescapable"],
      "antonyms": ["avoidable"],
      "connotation": "neutral",
      "word_class": "adj",
      "example_sentence": "Change is inevitable in life.",
      "difficulty": 2,
      "tags": ["formal"],
      "common_misspellings": ["inevitible"]
    }
  ]
}
```

5. Click **Import**. Fix any validation errors shown (e.g. missing required fields).
6. **Student side**: go to **English Campus** → **Vocab Lab** → **Sets Library** (or **Language Mode Vocab**), open the set, choose length, **Start session**.

---

## 4. Design and permissions

- **No existing site design changed.** Only new pages and components were added; existing design system (colors, typography, spacing, CSS variables, existing components) is reused. No refactors to unrelated code.
- **Permissions**: RLS uses `auth.uid()` for attempts, mastery, and fix-it queue. Sets and words are readable by all; writes to sets/words use “authenticated” policies. Admin is behind the existing passcode; Supabase auth is required for persisting student attempts/mastery/fix-it (use Supabase Auth and sign in for student progress).

---

## 5. Manual QA checklist

- [ ] Student: open Vocab Lab home → see tiles (Language, Literature, Weak Words, Fix-It, Sets Library, Streak Sprint).
- [ ] Student: Sets Library → filters (mode, theme, tier, search) → open a set → choose 10/20/40 or Mastery Sprint → Start session.
- [ ] Student: complete a session (correct / wrong / near miss) → see results page (accuracy, streak, mastery gained, fix-it additions).
- [ ] Student: Fix-It Mode (with items in queue) → complete words → they leave the queue and get +6 mastery.
- [ ] Student: Heatmap (signed in) → by theme / by set; click cell → navigates to sets or set.
- [ ] Student: Word detail (e.g. from a result or future link) → definition, progress, attempt timeline.
- [ ] Admin: Vocab Lab → Sets → create/edit/delete set.
- [ ] Admin: Words → select set → create/edit/delete word, preview.
- [ ] Admin: Import → paste sample JSON → Import → no errors; set and words appear; student can start a session with that set.
- [ ] Admin: Export → select set → Export → JSON matches import shape.

---

## 6. Optional: run tests

From project root:

```bash
npm run test -- --run src/utils/vocab
```

(Use `;` instead of `&&` in PowerShell if needed.)

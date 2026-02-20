# Vocab Lab — Full Design, Functionality and Coverage Audit

**Date:** February 11, 2025  
**Scope:** English Campus → Vocab Lab (home, sets library, set detail, session, results, heatmap, word detail); types, utils, Supabase schema, admin import/export.  
**Reference:** `ENGLISH_CAMPUS_SPEC.md` §5, `docs/VOCAB_LAB_DELIVERABLES.md`, `docs/ENGLISH_CAMPUS_AUDIT.md`, `docs/ENGLISH_CAMPUS_CONTENT_COVERAGE_AUDIT.md`.

---

## Executive Summary

Vocab Lab is **well-implemented** for its core loop: theme-based sets, spell-from-definition sessions, spaced repetition (due/weak/new), Fix-It queue, Mastery Sprint, heatmap, and word-level progress. Design is consistent with the English Campus and the deliverables doc. Gaps are mainly **spec vs implementation** (missing question modes, common-mistake hint, difficulty filter), **content coverage** (no curriculum-linked theme list or exam alignment), and **UX polish** (empty states, suggested path, theme links to Literature/Language).

**Key findings:**
- ✅ Clear home → sets → set detail → session → results flow; all routes and nav in place
- ✅ Spell mode with grading (Levenshtein, near-miss), mastery delta, scheduling, Fix-It, streak
- ✅ Continue-from-Campus-home for vocab (vocabSetIds/vocabLength)
- ✅ Heatmap by theme/set; word detail with progress and attempt timeline
- ⚠️ **Session mode is spell-only** — meaning-from-word, use-in-sentence, upgrade-word exist in `englishCampus` types and golden bank but are not in the session UI
- ⚠️ **No “common mistake” hint** — spec: “Common mistake hint (silent letters, doubled consonants)”; grading uses Levenshtein only; `common_misspellings` on words are stored but not shown on wrong/near-miss
- ⚠️ **Difficulty filter is UI-only** — Sets page has difficultyMin/difficultyMax state and copy saying it “applies when starting a session”; set detail and session do not filter by difficulty
- ⚠️ No suggested learning path on Vocab home (e.g. “Start with Language sets → Weak Words → Fix-It”)
- ⚠️ No explicit link from Vocab themes to Literature/Language tasks (spec mentioned “vocabulary relevance”)
- ⚠️ Content is admin/import-driven; no in-app curriculum or AQA-linked theme list

---

## 1. Functional Audit

### 1.1 Learning Flow (Intended: Theme pack → Mode → Practice)

| Component | Status | Notes |
|-----------|--------|------|
| Vocab Lab Home | ✅ | Tiles: Language Mode Vocab, Literature Vocab, My Weak Words, Fix-It, Sets Library, Streak Sprint; heatmap link; stats (mastered, weak, fix-it count, streak, weakest theme) |
| Sets Library | ✅ | Filters: mode, theme, tier, search; weak-words CTA when `?weak=1`; mastery % and word count per set |
| Set Detail | ✅ | Session length 10/20/40 + Mastery Sprint; Start session → sets continue state and navigates to session |
| Session (spell) | ✅ | Definition + word class; type word; Submit/Skip/Give up; feedback correct/near/wrong; streak, correct count, mastery gained; pause (Escape); near-miss shows “Starts with …” when length ≥6 |
| Fix-It Mode | ✅ | Session from fix-it queue; correct removal from queue + mastery boost (+6); disabled when queue empty |
| Mastery Sprint | ✅ | Up to 25 questions; end on 5 correct in a row or 25 done; entry via Sets `?sprint=1` or length option on set detail |
| Results | ✅ | Accuracy, streak, mastery gained, near misses; Fix-It additions + “Fix mistakes now”; word list with links to word detail; Replay weak words, Next due words, Back |
| Heatmap | ✅ | By theme / by set; band colours 0–20% … 81–100%; click theme → sets filtered by theme; click set → set detail |
| Word Detail | ✅ | Definition, example, synonyms/antonyms; progress (mastery, streak, next due) when signed in; attempt timeline (last 20) |

**Flow bugs / gaps:**

1. **Difficulty filter not applied**  
   `EnglishVocabSetsPage` has `difficultyMin`, `difficultyMax` state and helper text: “Difficulty filter (1–5) applies when starting a session from a set.” These are never passed to set detail or session; `selectSessionWords` and API do not filter by word difficulty.

2. **Streak Sprint from home**  
   “Streak Sprint” tile goes to `/english-campus/vocab/sets?sprint=1`, which shows the sets list with “Streak Sprint” on the Open button. User must still pick a set and then gets set detail with Mastery Sprint pre-selected. There is no “start a sprint with any set” shortcut from home (e.g. “Start a 25-question sprint with due words from all sets”).

3. **Weak Words from home**  
   “My Weak Words” goes to sets with `?weak=1`; the Sets page then shows “Start weak words session” (all sets, length 20, weakOnly). Flow is correct but could be one click from home (e.g. “Start weak words” → session directly when signed in).

### 1.2 Navigation & Routes

| Route | Purpose |
|-------|---------|
| `/english-campus/vocab` | Vocab Lab home (tiles + heatmap link) |
| `/english-campus/vocab/sets` | Set library (optional `?mode=`, `?theme=`, `?weak=1`, `?sprint=1`) |
| `/english-campus/vocab/set/:setId` | Set detail; optional `?sprint=1` |
| `/english-campus/vocab/session` | Session (state: setIds, length, mode, weakOnly; or `?mode=fixit`, `?sprint=1`) |
| `/english-campus/vocab/results/:sessionId` | Results (state.result) |
| `/english-campus/vocab/heatmap` | Heatmap by theme / set |
| `/english-campus/vocab/word/:wordId` | Word detail (definition, progress, attempts) |

- All routes are registered in `App.tsx`. Back patterns (ChevronLeft to vocab home or sets) are consistent.
- **Missing:** Direct deep link to “start weak words session” or “start Fix-It” without an extra click (optional).

### 1.3 Progress & Storage

- **Supabase:** `vocab_attempts`, `vocab_mastery`, `vocab_fixit_queue`; RPC `submit_vocab_attempt` updates attempt, mastery (mastery, streak, next_due, ease, lapses), and optionally fix-it queue. RLS scoped to `auth.uid()`.
- **Local continue state** (`storage.setEnglishContinue`): Set on set detail when starting a session (`vocabSetIds`, `vocabLength`). Campus home “Continue” opens session with that state.
- **Anonymous:** Session works without sign-in; grading and UI feedback apply; no persistence (no attempt/mastery/fix-it save).

### 1.4 Session Logic (Spell Only)

- **Word selection** (`session.ts`): Due (next_due ≤ now or null) 50%, weak (mastery &lt; 60) 30%, new 20%; interleaved; `weakOnly` restricts to weak words.
- **Length:** 10, 20, 40, or mastery_sprint (cap 25, end on 5 correct in a row).
- **Grading** (`grading.ts`): Normalize (trim, lowercase), exact match = correct; else Levenshtein; near-miss = distance ≤ 2 and target length ≥ 6.
- **Mastery** (`mastery.ts`): Correct +12 (≤6s), +8 (≤12s), +5 (slow); wrong −10; near-miss +2. Fix-It: add when wrong or near-miss. Scheduling: correct → next_due and ease increase; wrong → next_due +10 min, ease decrease.
- **`common_misspellings`** are stored on `VocabWord` and in DB but **not used** in grading or in feedback (spec: “Common mistake hint” not implemented).

---

## 2. Design Audit

### 2.1 Information Architecture

**Current flow:**
```
English Campus → Vocab Lab (home) → [Language | Literature | Weak Words | Fix-It | Sets Library | Streak Sprint]
                                    → Sets (filter) → Set detail (length) → Session → Results
                                    → Heatmap (theme/set)
                                    → Word detail (from results or future link)
```

**Spec (ENGLISH_CAMPUS_SPEC §5):**
- Vocab Home: choose **Theme pack** (Power, Conflict, Identity, Persuasion, etc.) then **mode** (Spell from meaning, Meaning from word, Use in sentence, Upgrade word).
- Implementation uses **Sets** (with theme_tag and mode) rather than a single “theme pack” selector; modes other than spell are not in the session UI.

**Gaps:**
- No “recommended path” on Vocab home (e.g. “Start with Language sets” or “Practise weak words”).
- Theme tags are whatever admins set (e.g. Rhetoric, Persuasion, Description); no fixed list tied to exam or Literature/Language.
- Spec’s “Theme pack” is reflected as sets grouped by mode (Language/Literature) and theme in the library, not as a dedicated theme-first picker.

### 2.2 Visual Design & Consistency

- **Tokens:** Uses CSS variables (`--text`, `--text-secondary`, `--surface`, `--border`, `--accent`, `--success`, `--danger`, `--muted`). No hardcoded palette outside tile accents.
- **Tiles:** Each tile has a distinct accent (Language #0EA5E9, Literature #EC4899, Weak #F59E0B, Fix-It #EF4444, Sets #8B5CF6, Streak #10B981). Consistent with English Campus card style.
- **Session:** Definition card, text input, Submit/Skip/Give up; feedback states (correct green, near amber, wrong red). Motion (Framer Motion) for card and feedback.
- **Heatmap:** Band colours red → orange → yellow → green → dark green; theme/set toggle; click-through to sets or set.
- **Empty / loading:** Spinner for loading; “No words in your Fix-It queue” / “Select a set from the library” when no session; “Sign in to save progress” when anonymous. No skeleton loaders.
- **Accessibility:** Buttons and links; aria-label on back button; no systematic focus trap in pause modal or keyboard nav audit noted.

### 2.3 Copy & UX Details

- Subtitle on home: “High-level vocabulary, spelling, and usage.”
- Fix-It disabled when queue empty (no tooltip explaining why).
- Streak Sprint tile: “5 correct in a row or 25 questions” and “Current streak: N.”
- Results: “Replay weak words” uses `weakOnly: true`; “Next due words” uses same set/length without weakOnly. Both require `result.config.setIds.length > 0`.

---

## 3. Coverage Audit

### 3.1 Spec vs Implementation (ENGLISH_CAMPUS_SPEC §5)

| Spec | Implemented | Notes |
|------|-------------|--------|
| Theme pack (Power, Conflict, Identity, Persuasion, etc.) | ⚠️ | Themes are set-level `theme_tag`; no fixed “theme pack” list in app |
| Spell from meaning | ✅ | Definition shown, student types word |
| Meaning from word | ❌ | Types exist (`VocabTaskType`, golden bank); no session mode |
| Use it in a sentence | ❌ | As above |
| Upgrade word (basic → ambitious) | ❌ | As above |
| Common mistake hint (silent letters, doubled consonants) | ❌ | `common_misspellings` stored but not shown; grading is Levenshtein-only |
| Weak words list | ✅ | My Weak Words tile + weak-only session |
| Daily set | ⚠️ | “Due” words act as daily set via next_due; no explicit “today’s set” label |
| Mastery per theme | ✅ | Heatmap by theme and by set |

### 3.2 Types and Data Model

- **vocab.ts:** VocabSetMode (language_p1, language_p2, literature, general), VocabTier (core, stretch), VocabWord (definition, synonyms, antonyms, example_sentence, common_misspellings, difficulty, etc.), VocabAttemptMode (spell, definition, synonym, context), session types. **VocabAttemptMode** includes `definition`, `synonym`, `context` but session and RPC only use `spell`.
- **englishCampus.ts:** VocabTaskType (spellFromDefinition, meaningFromWord, upgradeWord, useInContext), EnglishVocabTask. Used by golden bank / task bank; not wired to Vocab Lab session UI.
- **Schema:** vocab_sets, vocab_words, vocab_attempts (mode column supports spell/definition/synonym/context), vocab_mastery, vocab_fixit_queue; RPC submit_vocab_attempt. Schema supports future modes; UI does not.

### 3.3 Content Sources & Volume

| Source | Role | Notes |
|--------|------|--------|
| Supabase `vocab_sets` / `vocab_words` | Live content | All student-facing sets and words come from DB |
| docs/vocab-lab-sample-import.json | Sample | “Rhetoric Basics”, 10 words |
| docs/vocab-lab-persuasion-core.json | Seed | Persuasion theme, core tier |
| docs/vocab-lab-description-core.json | Seed | Description theme |
| docs/vocab-lab-literature-stretch.json | Seed | Literature stretch |
| scripts/seed-vocab.mjs | Script | Imports above JSON files (requires SUPABASE_SERVICE_ROLE_KEY) |
| Admin Import | UI | Paste or upload JSON (set + words); validate and upsert |

There is **no in-app curriculum list** (e.g. “AQA Language Paper 2 persuasive vocabulary” or “Literature Power & Conflict vocabulary”). Coverage is whatever sets admins create or seed.

### 3.4 Vocab Lab and English Campus Integration

- **Campus home:** Vocab Lab is one of three pillars; “Continue” supports vocab (vocabSetIds, vocabLength) and opens session.
- **Suggested path (Campus):** “Language Section B → Section A → Literature → Vocab Lab.” Vocab is last; no path *within* Vocab (e.g. “Start with Language sets”).
- **Literature/Language links:** Spec and audit doc mentioned “Make Vocab Lab themes explicitly link to Literature and Language tasks.” Not implemented: no links from a set/theme to a task or vice versa.

---

## 4. Recommendations

### 4.1 High impact (functionality / spec alignment)

1. **Surface or remove difficulty filter**  
   Either: (a) pass difficultyMin/difficultyMax from Sets to set detail/session and filter words in `vocabApi.getWordsBySetId` or in `selectSessionWords` by word.difficulty; or (b) remove the filter UI and the “applies when starting a session” copy to avoid confusion.

2. **Common-mistake hint on wrong/near-miss**  
   When showing “Correct: &lt;word&gt;”, if `word.common_misspellings` includes the user’s normalized input or is non-empty, show a short hint (e.g. “Common slip: double ‘s’”) or list common misspellings. Requires a hint field per misspelling or reusing the list for display only.

3. **Optional: add one non-spell mode**  
   Prioritise **meaning-from-word** (show word, choose or type definition) using existing `VocabWord.definition` and possibly synonyms. Would use VocabAttemptMode `definition` and extend session UI with a simple “definition” mode selector on set detail or session start.

### 4.2 Medium impact (UX and IA)

4. **Suggested path on Vocab home**  
   One line or card: e.g. “Suggested: Language sets → Weak Words → Fix-It” or “Start with a Language set to build your vocabulary for Section B.”

5. **One-click Weak Words / Fix-It from home**  
   When signed in and weak count &gt; 0, “My Weak Words” could offer “Start session” directly (in addition to “View sets”); when fix-it count &gt; 0, Fix-It tile already goes to session (good). Optional: same for “Start Streak Sprint” with a default set or “all due words.”

6. **Empty Fix-It**  
   When fixItCount === 0, add a short tooltip or inline note: “Words you get wrong or nearly right are added here so you can fix them later.”

7. **Theme links to Literature/Language**  
   Add optional `taskIds` or `examFocus` to sets (or theme_tag mapping in config) and show “Linked to: Task X” on set detail or in Sets Library; or a “Vocabulary for this task” link from a Literature/Language task to a Vocab set.

### 4.3 Lower priority (coverage and polish)

8. **Theme pack list**  
   If product wants “Power, Conflict, Identity, Persuasion” as first-class themes, add a small config or constant and use it to filter or label sets; otherwise keep theme_tag free-form.

9. **Daily set label**  
   Optionally show “Today’s due words” or “X words due today” on home or set list when signed in, using next_due.

10. **Loading and errors**  
    Add skeleton loaders for Sets and Set detail; explicit error state and retry on API failure where missing.

---

## 5. Summary Table

| Area | Status | Notes |
|------|--------|--------|
| Routes & nav | ✅ | All routes and back navigation in place |
| Home tiles | ✅ | Language, Literature, Weak, Fix-It, Sets, Streak Sprint, heatmap |
| Sets library | ✅ | Mode, theme, tier, search; weak and sprint params |
| Set detail | ✅ | Length 10/20/40 + Mastery Sprint; continue state set |
| Session (spell) | ✅ | Definition → type word; grading, mastery, Fix-It, streak, pause |
| Fix-It mode | ✅ | Queue-driven session; remove + boost on correct |
| Mastery Sprint | ✅ | 5 in a row or 25; entry via sets or set detail |
| Results | ✅ | Summary, fix-it list, word links, replay / next due |
| Heatmap | ✅ | By theme / set; click-through |
| Word detail | ✅ | Definition, progress, attempt timeline |
| Continue (Campus) | ✅ | vocabSetIds, vocabLength → session |
| Difficulty filter | ⚠️ | UI only; not applied to session |
| Modes (meaning, sentence, upgrade) | ❌ | Types/schema only; spell only in UI |
| Common mistake hint | ❌ | common_misspellings not used in feedback |
| Suggested path (within Vocab) | ❌ | None on Vocab home |
| Theme ↔ Literature/Language | ❌ | No explicit links |
| Content coverage | ⚠️ | Admin/seed driven; no in-app curriculum list |

---

## 6. Files Referenced

| File | Role |
|------|------|
| `src/pages/english/vocab/EnglishVocabLabHomePage.tsx` | Vocab home tiles |
| `src/pages/english/vocab/EnglishVocabSetsPage.tsx` | Set library, filters, weak/sprint |
| `src/pages/english/vocab/EnglishVocabSetDetailPage.tsx` | Set detail, length, start session |
| `src/pages/english/vocab/EnglishVocabSessionPage.tsx` | Spell session, Fix-It, sprint |
| `src/pages/english/vocab/EnglishVocabResultsPage.tsx` | Session results |
| `src/pages/english/vocab/EnglishVocabHeatmapPage.tsx` | Heatmap theme/set |
| `src/pages/english/vocab/EnglishVocabWordDetailPage.tsx` | Word definition, progress, attempts |
| `src/types/vocab.ts` | Sets, words, attempts, mastery, session types |
| `src/types/englishCampus.ts` | VocabTaskType, EnglishVocabTask |
| `src/utils/vocab/api.ts` | Supabase queries, submitSpellAttempt, Fix-It |
| `src/utils/vocab/session.ts` | selectSessionWords, applySessionLength |
| `src/utils/vocab/grading.ts` | Spell grading, Levenshtein, near-miss |
| `src/utils/vocab/mastery.ts` | Mastery delta, scheduling, shouldAddToFixIt |
| `supabase/migrations/20260209120000_create_vocab_lab_schema.sql` | Schema, RLS, RPC |
| `docs/VOCAB_LAB_DELIVERABLES.md` | Implementation checklist |
| `ENGLISH_CAMPUS_SPEC.md` | §5 Vocab Lab structure |

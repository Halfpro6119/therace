# Science Lab Flashcard Section — Audit & Improvement Suggestions

**Date:** February 2025  
**Scope:** Science Lab flashcard section — entry points, content, UX, and code  
**Purpose:** Single audit with concrete, prioritised improvement suggestions

---

## 1. Current State Summary

### 1.1 What’s Working Well

- **Flow:** Flashcard → Quick Check (when related) → Bigger Test after each topic; “Again” cards re-queued before session end.
- **Session options:** Shuffle, Due first (spaced rep), Interleave topics, Type to reveal, Session limit (10/20 cards), Time limit (5/10 min); all persisted in `localStorage` and supported via URL params.
- **Min-view:** 1.5s “Think…” + progress bar + “Xs to reveal”; prevents instant flip.
- **Time limit:** Remaining M:SS shown; session auto-ends when time expires.
- **Type-to-reveal:** “Show answer” for concept/equation cards when enabled; tap/space disabled until click.
- **Content:** 59 concepts, 35 misconceptions, 14 practicals, 15 equations; ~720–870 cards per subject; CONCEPT_HARDER_PROMPTS (34 concepts, ~33% of concept cards); CONCEPT_APPLICATION_QUESTIONS (38/59); 23 CLEAN diagram slugs.
- **Accessibility:** `aria-label`, `aria-live`, `role="progressbar"`, keyboard (Space to flip, 1/2/3 to rate).
- **Topic mastery:** Updated when advancing from last flashcard of a topic to the next Bigger Test (not only on session end).

### 1.2 Entry Points

| Entry | Route / behaviour |
|-------|-------------------|
| **Per-topic (Topics page)** | “Learn” → `/science-lab/:subject/:paper/:tier/flashcard?topic=...` — clear, shows “X cards due”. |
| **All topics (Mode page)** | “Revise with flashcards” → `/science-lab/:subject/:paper/:tier/flashcard` (no topic) — full deck. |
| **Direct URL** | Same routes; options can be set via `?shuffle=1`, `?limit=10`, `?minutes=5`, `?spaced=0`. |

---

## 2. Content Gaps (from existing audits + code check)

### 2.1 CONCEPT_APPLICATION_QUESTIONS — 38/59

**Status:** 38 concepts have dedicated application-style MCQs; 21 rely on scenario checks or topic fallback.

**High-value concepts still without a dedicated application question** (candidates for next batch):

- Biology: `bio-bioaccumulation`, `bio-stem-cells`, `bio-monoclonal-antibodies`, `bio-limiting-factors-quantitative`, `bio-thyroxine-feedback`, `bio-genetic-engineering-ethics`, `bio-biodiversity-sampling`
- Chemistry: `chem-concentration`, `chem-energy-changes`, `chem-crude-oil`, `chem-analysis`, `chem-atmosphere`, `chem-using-resources`, `chem-half-equations`, `chem-empirical-molecular`, `chem-alkenes-addition`, `chem-bond-energy-calculations`
- Physics: `phys-generator`, `phys-hookes-law-limit`, `phys-critical-angle-tir`, `phys-nuclear-fission-fusion`, `phys-red-shift-big-bang`

**Suggestion:** Add 5–10 next (e.g. bio-bioaccumulation, bio-stem-cells, chem-concentration, chem-crude-oil, phys-nuclear-fission-fusion) using the same format as in `CONCEPT_APPLICATION_QUESTIONS` in `scienceLabFlashcards.ts`.

### 2.2 Diagram Coverage

- **CLEAN set:** 23 slugs; front shows `FlashcardDiagram` when `diagramId` is in CLEAN.
- **Non-CLEAN:** Concepts with other `diagramId`s (e.g. `genetic_inheritance`, `natural_selection`, `ecosystem`, `energy_profile`, `thyroxine_feedback`, `bohr_model` in some usages, etc.) show **description only** on the front.

**Suggestion:** Add 2–4 high-traffic non-CLEAN diagrams to CLEAN (and ensure blueprints exist in `scienceLabDiagrams.ts`) — e.g. `genetic_inheritance`, `thyroxine_feedback`, `natural_selection` — then document the rest as “description-only by design” or add when blueprints are ready.

### 2.3 Paper/Tier

- **Current:** No filtering; all subject content is shown (documented as intentional for “revision breadth” in `SCIENCE_LAB_FLASHCARD_AUDIT.md`).
- **Suggestion:** Keep as is unless product needs Foundation-only or Paper-1-only decks; then add optional `paper`/`tier` to source data and filter in `getFlashcardsByFilters`.

---

## 3. UX Improvements

### 3.1 Session Options Visibility

- **Current:** Checkboxes and selects are small and text-heavy (“Shuffle”, “Due first”, “Interleave topics”, “Type to reveal”, “Full deck”/“10”/“20”, “No time limit”/“5 min”/“10 min”).
- **Suggestion:** Add short tooltips or a single “Session options” expandable section with one-line explanations (e.g. “Due first: show cards due for review first”) to reduce cognitive load.

### 3.2 “Continue without rating” vs Rating

- **Current:** “Continue without rating” is below the 1/2/3 buttons; some users may skip rating by habit, which weakens spaced repetition.
- **Suggestion:** Either (a) move “Continue without rating” to a secondary position (e.g. text link below) and keep 1/2/3 as primary, or (b) add a one-time hint: “Rating helps schedule when you’ll see this card again.”

### 3.3 Completion Screen — “What next?”

- **Current:** Completion offers “Topic test”, “Full GCSE test”, “Revise more cards”, “Back to lab”. When user came from a topic, “Topic test → see your grade” is clear.
- **Suggestion:** When `topicFilter` is set, consider pre-filling or highlighting “Topic test for [topic]” so the next step is obvious. Optional: show “X cards due” on “Revise more cards” if `dueCount > 0`.

### 3.4 Empty State

- **Current:** “No flashcards available for this topic” with “Go Back” when `learnSteps.length === 0`.
- **Suggestion:** If this can occur for a valid topic (e.g. no concepts mapped), add: “Try another topic or start without a topic filter.”

### 3.5 Progress and Time in Header

- **Current:** “Card X of Y”, optional “M:SS left”, and a dot-strip for nearby steps.
- **Suggestion:** Keep as is; optional: show “X of Y cards” and “Z min left” in a single compact line on small screens to avoid wrap.

---

## 4. Technical / Robustness

### 4.1 `useTypeToReveal` and Flip Logic

- **Current:** When type-to-reveal is on, `handleFlip` returns early so only “Show answer” flips. Space/tap do nothing for flip until after 1.5s (then still no flip when type-to-reveal is on). Consistent.
- **Suggestion:** No change; consider adding `aria-describedby` to “Show answer” when type-to-reveal is on (e.g. “When you’ve recalled, click to reveal”).

### 4.2 Quick Check “Loading next card…”

- **Current:** If `phase === 'quickCheck'` but `pendingQuickChecks.length === 0` or no `currentQuickCheck`, a fallback UI shows “Loading next card…” and a “Continue” button that calls `advanceStep()`.
- **Suggestion:** Ensure this path is rare (e.g. only on race or bad data). If it happens, consider logging or a gentle “Something went wrong; continue to next card” message.

### 4.3 Bigger Test with 0 Questions

- **Current:** `getBiggerTestQuestionsForTopic` can return `[]`; then `currentBiggerTest.questions.length === 0` and there is no dedicated “skip” UI — the step is still in `learnSteps`. Code comment: “Bigger test with 0 questions - skip (effect handles this)”.
- **Suggestion:** In `advanceStep` or when entering bigger-test phase, if `currentBiggerTest.questions.length === 0`, skip to next step automatically (or filter out zero-question bigger-test steps when building `learnSteps`) so the user never lands on an empty bigger-test screen.

### 4.4 Session Reset on Option Change

- **Current:** Changing Shuffle, Due first, Interleave, limit, or time mid-session triggers confirm: “Reset session? Changing options will reset your progress…”
- **Suggestion:** No change. Optional: “Type to reveal” does not reset (it’s not in `applySessionOptionChange` reset path); document that only options that affect deck order/content reset the session.

---

## 5. Discoverability and Onboarding

### 5.1 First-Time Users

- **Current:** No in-app explanation of “Due first”, “Type to reveal”, or “Again/Learn/Got it” scheduling.
- **Suggestion:** Add a short “How it works” collapsible or tooltip on first visit (e.g. “Rate cards 1–3; we’ll show due cards first next time”) stored in `localStorage` so it doesn’t repeat every time.

### 5.2 Link from Topic Test / Full GCSE

- **Current:** After topic test or full GCSE, users can go to topics/modes; flashcard entry is via “Learn” per topic or “Revise with flashcards” on mode page.
- **Suggestion:** On topic test or full GCSE results, add a CTA such as “Struggled on [topic]? Revise with flashcards” linking to `.../flashcard?topic=...` to close the loop between testing and revision.

---

## 6. Prioritised Action List

| Priority | Action | Where | Effort |
|----------|--------|--------|--------|
| **P1** | Skip or auto-advance when Bigger Test has 0 questions | `ScienceLabFlashcardPage.tsx` and/or `learnSteps` construction | Low |
| **P2** | Add 5–10 more CONCEPT_APPLICATION_QUESTIONS for uncovered concepts | `scienceLabFlashcards.ts` | Medium |
| **P3** | Add tooltips or expandable “Session options” help | `ScienceLabFlashcardPage.tsx` | Low |
| **P4** | After topic/full GCSE results, add “Revise with flashcards” CTA for weak topics | Topic test / Full GCSE completion screens | Low |
| **P5** | Add 2–4 diagram slugs to CLEAN (with blueprints) for concepts that currently show description-only | `scienceLabDiagramMap.ts`, `scienceLabDiagrams.ts` | Medium |
| **P6** | Optional first-time “How it works” (spaced rep + rate 1–3) | `ScienceLabFlashcardPage.tsx` + localStorage | Low |
| **P7** | Refine completion screen: highlight “Topic test for [topic]” when from topic; optional “X due” on “Revise more” | `ScienceLabFlashcardPage.tsx` | Low |

---

## 7. File Reference

| File | Role |
|------|------|
| `src/config/scienceLabFlashcards.ts` | Card generation, CONCEPT_HARDER_PROMPTS, CONCEPT_APPLICATION_QUESTIONS, getFlashcardsGroupedByTopic, getQuickChecksForFlashcard, getBiggerTestQuestionsForTopic, session options |
| `src/config/scienceLabData.ts` | SCIENCE_CONCEPTS, SCIENCE_MISCONCEPTIONS, SCIENCE_PRACTICALS, SCIENCE_EQUATIONS |
| `src/config/scienceLabDiagramMap.ts` | CLEAN_FLASHCARD_DIAGRAMS, isCleanFlashcardDiagram |
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Main UI: phases, session options, min-view, time limit, type-to-reveal, Quick Check, Bigger Test, again queue |
| `src/pages/science/ScienceLabTopicsPage.tsx` | “Learn” (flashcard) per topic |
| `src/pages/science/ScienceLabModePage.tsx` | “Revise with flashcards” (all topics) |
| `src/components/FlashcardDiagram.tsx` | Diagram rendering (blueprint / static / description) |

---

## 8. Related Docs

- `docs/SCIENCE_LAB_FLASHCARD_AUDIT.md` — Inventory, architecture, paper/tier, completed items
- `docs/SCIENCE_LAB_FLASHCARD_FULL_REVIEW.md` — Content and coverage details, prioritised list (many items already done)
- `docs/FLASHCARD_FULL_AUDIT_2025_02.md` — Design and cross-hub comparison

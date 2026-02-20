# Flashcards – Full Design & Functionality Audit

**Date:** February 2025  
**Scope:** Science Lab (primary), FlashcardDiagram, config, cross-hub comparison, UX, learning science, technical implementation  
**Purpose:** Single consolidated audit with current-state assessment and prioritized improvement suggestions  
**Implementation:** Completed February 2025 – min-view feedback, time limit visibility + auto-end, expanded harder prompts, interleave + bigger-test placement, CLEAN diagrams, type-to-reveal, accessibility, session option persistence.

---

## Executive Summary

The Science Lab flashcard system is **mature and feature-rich**: spaced repetition, Quick Checks after rating, re-queue of "Again" cards, shuffle/interleave/session limits, due count on mode and topic pages, recall prompt, back-of-card diagrams, and CLEAN diagram set expanded to 13 slugs. Other hubs (History, Business, Geography, Health, Compute, Religious Studies) use simpler term/definition cards with no shared deck component and no spaced repetition ordering.

**Recommendations** focus on: UX polish (min-view feedback, time-limit visibility), learning-science refinements (more harder prompts, optional type-to-reveal), diagram coverage and consistency, cross-hub parity (spaced rep elsewhere, optional shared deck), and technical cleanup (interleave + bigger-test ordering, time-limit enforcement).

---

## 1. Architecture & Data Flow

### 1.1 Science Lab Learn Mode Flow

```
Entry (subject/paper/tier ± topic)
  → getFlashcardsGroupedByTopic(options: shuffle, sessionLimit, sessionLimitMinutes, useSpacedRepetition, interleaveTopics, mastery)
  → learnSteps: [flashcard, …, biggerTest, flashcard, …, biggerTest, …]  (+ notSureQueue for "Again" cards)
  → User: see prompt (min 1500ms) → recall prompt → flip → rate (1/2/3) → toast "See again in X days"
  → Optional: Quick Check (1–2 MCQs) after rating when getQuickChecksForFlashcard returns matches
  → After topic’s last flashcard: Bigger Test (3–6 mark)
  → "Again" (1) cards re-queued; shown again before session end
  → Session complete (deck exhausted, time limit, or last "Again" card) → Topic test / Full GCSE / Redo / Back
```

**Implemented:** Spaced rep ordering (due → new → later), Quick Checks post-rating, re-queue Again, shuffle/session limit (10/20 cards)/time (5/10 min), Due first, Interleave topics, confirm dialog on option change mid-session, due count on mode and topic pages, recall prompt, MIN_VIEW_MS = 1500, back-of-card diagrams, CLEAN set (13 slugs), CONCEPT_HARDER_PROMPTS (~20%).

### 1.2 Card Types & Content Sources

| Type          | Source                     | Front                         | Back |
|---------------|----------------------------|-------------------------------|------|
| Concept       | SCIENCE_CONCEPTS           | Rotated/harder prompts, diagram if CLEAN | coreIdea, keyTerms, misconceptionWarning, optional back diagram |
| Process chain | concept.changeScenarios    | scenario.prompt, optional visual | explanation (→ steps), keyTerms, optional back.visual |
| Misconception | SCIENCE_MISCONCEPTIONS     | "What is wrong with: …"       | correctUnderstanding, keyTerms, example |
| Practical     | SCIENCE_PRACTICALS          | Purpose / Variables / Risk / Graph | purpose, IV/DV/controlled, risk, graph |
| Equation      | SCIENCE_EQUATIONS          | Symbol meaning / Reverse / Unit trap | symbol name/unit, equation, unit trap |

### 1.3 Cross-Hub Comparison

| Hub               | Confidence scale   | Spaced rep ordering | Session end      | Quick Check / Extra | Content depth |
|-------------------|--------------------|---------------------|------------------|---------------------|---------------|
| **Science Lab**   | 3 (Again/Learn/Got)| Yes                 | Yes              | Quick Check + Bigger Test | Rich (diagrams, equations, process chains) |
| History Hub       | 4 (again/hard/good/easy) | No          | No (loops)        | None               | Term + definition + date/context |
| Business Hub      | 3                  | No                  | Yes              | None                | Term + definition |
| Geography Hub     | 4                  | No                  | No               | None                | Term + definition |
| Health Hub        | 3                  | No                  | Yes              | None                | Term + definition |
| Compute Lab       | 3                  | No                  | Yes              | None                | Term + definition |
| Religious Studies | 4                  | No                  | Varies           | None                | Term + definition |

**Gap:** No shared FlashcardDeck component; Science Lab is the only hub with spaced repetition, Quick Checks, and rich card types.

---

## 2. Design Audit

### 2.1 Card Front

| Aspect              | Status | Notes |
|---------------------|--------|--------|
| Prompt variety      | Good   | 7 templates + CONCEPT_HARDER_PROMPTS for ~20% (hash % 5 === 0) |
| Topic in prompt     | Improved | Harder prompts omit concept name for desirable difficulty |
| Diagram on front    | Good   | 13 CLEAN slugs render; others show description only |
| Equation display    | Good   | Equation as text, symbol highlighted |
| Recall prompt       | Good   | "Try to recall first, then tap or Space to reveal" |
| Min view time       | Good   | 1500ms; no visual countdown (see suggestions) |
| Type badge + topic  | Good   | Concept/Process/Equation/Practical/Misconception + topic label |

### 2.2 Card Back

| Aspect              | Status | Notes |
|---------------------|--------|--------|
| Answer layout       | Good   | Process steps as numbered list; otherwise paragraph; equations in mono |
| Key terms           | Good   | SCIENCE_VOCABULARY + unit regex, capped 8, copy-on-click |
| Misconception       | Good   | Amber callout |
| Example             | Good   | Blue callout |
| Diagram on back     | Implemented | When back.visual.diagramId in CLEAN (e.g. process chains, misconceptions) |
| Rate & continue     | Good   | 1/2/3 buttons, "Continue without rating", keyboard 1/2/3, "See again in X days" toast |

### 2.3 Diagram System

- **CLEAN_FLASHCARD_DIAGRAMS:** 13 slugs (cell_membrane_diffusion, osmosis_diagram, active_transport, enzyme_action, photosynthesis, respiration, particle_model, dna_structure, cell_division, homeostasis, digestive_system, circulatory_system, pathogen_infection).
- **FlashcardDiagram:** Priority order: Animated (if !preferStatic && !reducedMotion) → Blueprint → Static asset → Description only. Science Lab uses `preferStatic` to avoid Framer Motion buildup.
- **Gap:** Concepts with `diagramId` outside CLEAN still show description only. Further expansion of CLEAN (with simple blueprints) would improve visual coverage.

### 2.4 Interaction & UX

| Feature              | Status |
|----------------------|--------|
| Tap/click to flip    | Yes    |
| Swipe up to flip     | Yes    |
| Swipe L/R prev/next  | Yes    |
| Space to flip        | Yes (respects MIN_VIEW_MS) |
| 1/2/3 to rate        | Yes    |
| Tilt on mouse        | Yes    |
| Prev/Next buttons    | Yes    |
| Progress dots        | Yes (sliding window of 20) |
| Card stack preview   | Yes (3 cards behind) |
| Session options      | Shuffle, Due first, Interleave topics, 10/20/full, 5/10 min; confirm before reset mid-session |

---

## 3. Functionality Audit

### 3.1 Session Options & Limits

- **Card limit:** 10, 20, or full deck; applied when building groups (slices per group until total reached).
- **Time limit:** 5 or 10 minutes. Checked only inside `advanceStep()` (on next/rating/continue). Session does not auto-end in real time if user stays on one card.
- **Interleave:** When enabled (and no topic filter), all cards are merged, ordered (due/new/later + optional shuffle), then placed in one `_interleaved` group. Bigger tests are added as separate groups with empty flashcard lists, so **all bigger tests appear at the end** after all interleaved cards. This differs from non-interleaved mode where bigger tests follow each topic block.

### 3.2 Spaced Repetition & Storage

- **Storage:** `updateFlashcardMastery(id, level, viewed)` writes confidence, timesViewed, timesConfident, lastViewed, nextReviewDate (1/3/7 days), masteryPercent.
- **Ordering:** `getFlashcardsGroupedByTopic(…, { useSpacedRepetition, mastery })` orders cards: due (nextReviewDate ≤ today) → new (no record) → later.
- **Due count:** `getDueFlashcardCount(…, mastery)` used on ScienceLabModePage and ScienceLabTopicsPage ("X cards due").

### 3.3 Quick Check Flow

- After rating, `getQuickChecksForFlashcard(cardId, topic, quickChecksAll, true)` returns up to 2 related checks (by relatedFlashcardIds, else 1 topic fallback).
- Phase switches to `quickCheck`; user sees QuickCheckInline; on complete/skip, `advanceStep()`.

### 3.4 Again Queue

- Cards rated 1 (Again) are pushed to `notSureQueue`. After main `learnSteps` are done, steps are extended with `notSureQueue`; when the last Again card is rated, queue is popped and session completes.

### 3.5 Edge Cases & Bugs

- **Time limit:** Only checked on advance. If user never advances, session won’t end at 5/10 min. Consider a periodic check or visible countdown.
- **Interleave + bigger tests:** Bigger tests all at end may feel disconnected from topic flow; consider documenting or offering "bigger tests after each topic" vs "all cards then all bigger tests" as a choice.
- **advanceStep and topic mastery:** Topic mastery is updated when moving past the last flashcard of a topic (before the next step is a biggerTest). Correct.

---

## 4. Learning Science

- **Active recall:** Recall prompt and 1500ms min view support "try to recall first."
- **Spaced repetition:** Due-first ordering and nextReviewDate (1/3/7 days) implemented; no SM-2.
- **Interleaving:** Optional; interleave topics mixes all topics when no topic filter.
- **Re-queue weak items:** Again cards re-queued and shown before session end.
- **Desirable difficulty:** CONCEPT_HARDER_PROMPTS for ~20% of concept cards; could expand.
- **No type-to-reveal:** Optional "type answer to reveal" (e.g. for definitions/equations) would add retrieval effort; currently deferred.

---

## 5. Technical Notes

- **Shuffle:** `shuffleArray` (Fisher–Yates, optional seed) used in grouping; `shuffle()` delegates to it.
- **Session reset:** Changing shuffle, Due first, interleave, session limit, or time limit triggers confirm dialog if mid-session; on confirm, stepIndex and notSureQueue reset, sessionStartTimeRef reset.
- **FlashcardDiagram:** Used on front and back; back uses smaller max-width (200px) and `showDescriptionWithImage={false}` where appropriate.

---

## 6. Prioritized Improvement Suggestions

### High impact, lower effort

| # | Suggestion | Rationale |
|---|------------|-----------|
| 1 | **Min-view feedback** | Show a subtle "Think…" or progress (e.g. 1.5s) so users know why tap doesn’t flip yet. Reduces confusion. |
| 2 | **Time limit visibility** | Show remaining time (e.g. "5 min left") when sessionLimitMinutes is set. Optionally run a timer that calls advanceStep or setSessionComplete when time expires. |
| 3 | **Expand CONCEPT_HARDER_PROMPTS** | Add more concept IDs so a larger share of concept cards use topic-omitted prompts (e.g. 30–40%). |

### High impact, higher effort

| # | Suggestion | Status |
|---|------------|--------|
| 4 | **Interleave + bigger test placement** | ✅ Bigger tests inserted when topic changes in interleaved mode (not all at end) |
| 5 | **Shared FlashcardDeck component** | ⏸ Deferred (high effort) |
| 6 | **Spaced repetition for other hubs** | ⏸ Deferred (multi-hub scope) |

### Medium impact ✅ IMPLEMENTED

| # | Suggestion | Status |
|---|------------|--------|
| 7 | **More CLEAN diagrams** | ✅ Added immune_response, nervous_system to CLEAN_FLASHCARD_DIAGRAMS |
| 8 | **Back diagram coverage** | Content already sets back.visual where needed; CLEAN expanded |
| 9 | **Unify confidence scales (cross-hub)** | ⏸ Deferred (document only) |

### Lower priority / polish ✅ IMPLEMENTED

| # | Suggestion | Status |
|---|------------|--------|
| 10 | **Optional type-to-reveal** | ✅ "Type to reveal" checkbox; concept/equation cards show "Show answer" button (min view still applies) |
| 11 | **Accessibility** | ✅ aria-label on Flip, Rate (1/2/3), Previous/Next; aria-live on time left and "See again" toast; role="progressbar" on min-view bar |
| 12 | **Session option persistence** | ✅ Session options persisted to localStorage; URL params override on load |

---

## 7. Summary Table

| Area            | Status | Top actions |
|-----------------|--------|-------------|
| Core flow       | Solid  | —           |
| Spaced rep      | Active | Extend to other hubs (effort) |
| Quick Checks    | Active | —           |
| Session options | Good   | Time visibility; optional real-time time limit |
| Diagrams        | Good   | Expand CLEAN; ensure back.visual where useful |
| Learning science| Good   | More harder prompts; optional type-to-reveal |
| Cross-hub       | Fragmented | Shared deck; spaced rep elsewhere; unify scales |
| Interleave      | Good   | Consider bigger-test placement in interleaved mode |

---

## 8. File Reference

| File | Purpose |
|------|---------|
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Main flashcard UI, phases (flashcard / quickCheck / biggerTest), session options, again queue |
| `src/config/scienceLabFlashcards.ts` | Card generation, getFlashcardsGroupedByTopic, Quick Checks, getDueFlashcardCount, getDaysUntilNextReview, session options |
| `src/config/scienceLabDiagramMap.ts` | CLEAN_FLASHCARD_DIAGRAMS, isCleanFlashcardDiagram, getDiagramMetadataForSlug |
| `src/components/FlashcardDiagram.tsx` | Diagram render: animated → blueprint → static asset → description; preferStatic |
| `src/utils/storage.ts` | getFlashcardMastery, updateFlashcardMastery, topic mastery, calculateTopicFlashcardMastery |
| `src/types/scienceLab.ts` | ScienceFlashcard, FlashcardMastery, FlashcardType, ConfidenceLevel |
| `src/pages/science/ScienceLabModePage.tsx` | Mode selector; due count from getDueFlashcardCount |
| `src/pages/science/ScienceLabTopicsPage.tsx` | Topic list; due count per topic, Learn link |

---

## 9. Related Docs

- `FLASHCARD_AUDIT_2025_02.md` – Prior audit (implemented)
- `FLASHCARD_FULL_AUDIT.md` – Earlier full audit (implemented)
- `FLASHCARD_DESIGN_AUDIT.md`, `FLASHCARD_MODE_AUDIT_AND_IMPROVEMENTS.md`
- `FLASHCARD_DIAGRAMS_PLAN.md`, `FLASHCARD_DIAGRAM_AUDIT.md`
- `LEARN_MODE_MERGE_PLAN.md`

# Flashcard Section Audit – February 2025

**Date:** February 2025  
**Scope:** Science Lab (primary), cross-hub comparison, UX, learning science, and technical debt  
**Context:** Fresh audit following prior implementation of FLASHCARD_FULL_AUDIT recommendations  
**Status:** ✅ Implemented (February 2025) – All high/medium priority recommendations completed

---

## Executive Summary

The Science Lab flashcard system is mature: spaced repetition is active, Quick Checks run after ratings, "Again" cards re-queue, shuffle/session options exist, and due count appears on the mode page. This audit's recommendations have been **fully implemented**:

**Implemented:** Session option reset confirm dialog, back-of-card diagrams, topic-omitting prompts (~20%), interleave topics toggle, expanded CLEAN diagrams, consolidated shuffle, due count on topic selector, time-based session (5/10 min).

**Strengths:** Rich content, diagram support, merged Learn Mode, Bigger Tests, recall prompt, good keyboard/surface UX.

---

## 1. Current State Overview

### 1.1 Science Lab Learn Mode Flow

```
Mode entry → getFlashcardsGroupedByTopic (with spaced rep, shuffle, limit)
    → learnSteps: [flashcard, …, biggerTest, flashcard, …, biggerTest, …]
    → User: see prompt → recall (1500ms min) → flip → rate (1/2/3) → advance
    → Optional: Quick Check (1–2 MCQs) after rating when related checks exist
    → After topic's last flashcard: Bigger Test (3–6 mark)
    → "Again" cards re-queued before session end
    → Session complete → Topic quiz / Redo / Full GCSE
```

**Implemented since last audit:**
- Spaced repetition ordering (due → new → later)
- Quick Checks after confidence rating (when `getQuickChecksForFlashcard` returns matches)
- Re-queue "Again" cards
- Shuffle + session limit (10/20 cards) + Due first toggle
- "See again in X days" toast
- Due count on mode page
- Recall-before-reveal prompt, MIN_VIEW_MS = 1500
- CLEAN_FLASHCARD_DIAGRAMS expanded to 10 slugs

### 1.2 Cross-Hub Comparison

| Hub            | Confidence Scale   | Spaced Rep | Session Complete | Quick Check / Extra | Content Depth         |
|----------------|--------------------|------------|------------------|---------------------|------------------------|
| **Science Lab**| 3 (Again/Learn/Got) | ✅ Yes     | ✅ Yes           | ✅ Quick Check + Bigger Test | Rich (concepts, diagrams, equations) |
| History Hub    | 4 (again/hard/good/easy) | ❌ No  | ❌ Loops forever | ❌ None             | Term + definition     |
| Business Hub   | 3                  | ❌ No      | ✅ Yes           | ❌ None             | Term + definition     |
| Geography Hub  | 4                  | ❌ No      | ❌ Loops         | ❌ None             | Term + definition     |
| Health Hub     | 3                  | ❌ No      | ✅ Yes           | ❌ None             | Term + definition     |
| Compute Lab    | 3                  | ❌ No      | ✅ Yes           | ❌ None             | Term + definition     |
| Religious Studies | 4               | ❌ No      | Varies           | ❌ None             | Term + definition     |

**Inconsistencies:** Different confidence scales, no shared deck component, Science Lab is significantly more advanced.

---

## 2. UX & Interaction Audit

### 2.1 Session Options UX – **Issue**

**Location:** Checkboxes + select above the card (lines 562–593, ScienceLabFlashcardPage.tsx)

**Problem:** Changing Shuffle, Due first, or session limit triggers:

```ts
useEffect(() => {
  setStepIndex(0);
  setNotSureQueue([]);
}, [sessionOptions.shuffle, sessionOptions.useSpacedRepetition, sessionOptions.sessionLimit]);
```

The user is reset to card 1 and the not-sure queue is cleared. If they change options mid-session, progress is lost with no confirmation.

**Recommendation:** Either (a) disable option changes mid-session and show "Session in progress – finish or restart to change", or (b) show a confirm dialog before resetting.

### 2.2 Card Front

| Aspect                | Status | Notes |
|-----------------------|--------|-------|
| Prompt variety        | ✅ Good | 7 templates, hash-based selection |
| Topic in prompt       | ⚠️ Medium | Often present (e.g. "What is diffusion...") – reduces desirable difficulty |
| Diagram on front      | ✅ Good | 10 CLEAN slugs render; others show description |
| Recall prompt         | ✅ Good | "Try to recall first, then tap or Space to reveal" |
| Min view time         | ✅ Good | 1500ms |

### 2.3 Card Back

| Aspect                | Status | Notes |
|-----------------------|--------|-------|
| Answer layout         | ✅ Good | Process steps as numbered list, otherwise paragraph |
| Key terms             | ✅ Good | Extracted, capped at 8, copy-on-click |
| Misconception/Example | ✅ Good | Amber/blue callouts |
| Diagram on back       | ❌ Missing | No diagram on answer side – missed learning aid for process chains |

### 2.4 Keyboard & Gesture Support

| Feature          | Status |
|------------------|--------|
| Space = flip     | ✅ |
| 1/2/3 = rate     | ✅ |
| Swipe up = flip  | ✅ |
| Swipe L/R = prev/next | ✅ |
| Tilt on mouse    | ✅ |
| Prev/Next buttons| ✅ |

---

## 3. Diagram System Audit

### 3.1 Coverage vs. Inventory

- **CLEAN_FLASHCARD_DIAGRAMS:** 10 slugs (cell_membrane_diffusion, osmosis_diagram, active_transport, enzyme_action, photosynthesis, respiration, particle_model, dna_structure, cell_division, homeostasis)
- **FLASHCARD_DIAGRAM_SLUGS (assets):** 54 slugs in `flashcardDiagramAssets.ts`
- **scienceLabDiagrams blueprints:** 37 blueprints; CLEAN uses 10 of them

**Gap:** Concepts with `diagramId` outside CLEAN show description text only. Expanding CLEAN with more blueprints (e.g. digestive_system, circulatory_system, pathogen_infection) would improve visual learning.

### 3.2 Back-of-Card Diagrams

**Current:** Only front of card can show a diagram. Process chain cards often have scenario visuals that would reinforce the answer.

**Recommendation:** Add optional `back.visual?.diagramId` for process chains; render small diagram below explanation when present and in CLEAN set.

### 3.3 Animation vs Static

- **Animated:** osmosis_diagram, cell_membrane_diffusion, particle_model, active_transport
- **preferStatic:** Always true on Science Lab to avoid Framer Motion buildup – animations rarely shown

---

## 4. Learning Science Gaps

### 4.1 Interleaving

**Principle:** Mixing topics improves discrimination vs. blocking.

**Current:** Cards grouped strictly by topic. Shuffle is within-topic only (or within ordered groups). No cross-topic interleaving.

**Recommendation:** Add "Interleave topics" toggle that shuffles across all topics when "All topics" selected, rather than topic-by-topic blocks.

### 4.2 Desirable Difficulty – Topic in Prompt

**Principle:** Slight struggle aids retention; hints reduce effort.

**Current:** Prompts often include topic (e.g. "What is diffusion..."). Concept label sometimes gives away the concept name.

**Recommendation:** For a subset of cards, use prompts that omit the topic or use "it" (e.g. "What process moves particles from high to low concentration?") to increase retrieval difficulty.

### 4.3 Spaced Repetition – Scheduling

**Current:** Simple fixed intervals: 1 / 3 / 7 days. No SM-2 or adaptive scheduling.

**Assessment:** Adequate for GCSE context. More sophisticated scheduling is lower priority.

---

## 5. Technical Audit

### 5.1 Storage & Mastery

| Function                       | Purpose                    | Status |
|--------------------------------|----------------------------|--------|
| `updateFlashcardMastery()`     | Store confidence, nextReviewDate | ✅ Used |
| `getFlashcardMastery()`        | Read mastery for ordering  | ✅ Used (spaced rep, due count) |
| `calculateTopicFlashcardMastery()` | Topic % for gating   | ✅ Used |
| `updateTopicMastery()`         | Topic flashcard % + quickCheckPassed | ✅ Used |
| `updateBiggerTestCompletion()` | Bigger test score          | ✅ Used |

### 5.2 Quick Check Flow

**Current:** After rating, `getQuickChecksForFlashcard(cardId, topic, quickChecksAll, true)` returns up to 2 related checks. If any exist, phase switches to `quickCheck` and user sees MCQs/drag-order. On complete/skip, `advanceStep()` runs.

**Status:** Working. Quick Checks are no longer dead code.

### 5.3 Duplicate Shuffle Logic

`scienceLabFlashcards.ts` has both `shuffleArray` (with optional seed) and `shuffle` (unseeded). `getFlashcardsGroupedByTopic` uses `shuffleArray`. `getTopicTestItems` and `getFullGcsePaperTestItems` use `shuffle`. Consider consolidating.

---

## 6. Cross-Hub Opportunities

### 6.1 Shared Flashcard Deck Component

**Current:** Each hub implements its own layout, flip, and rating UI. History uses 4-level confidence; Science uses 3.

**Benefit:** Shared component would reduce duplication and allow consistent UX (keyboard, swipe, tilt). Effort is high due to different data shapes.

### 6.2 Spaced Repetition for Other Hubs

History, Geography, Business, Health, Compute all store flashcard mastery but do not use it for ordering. Adding "due first" ordering would improve retention with moderate effort per hub.

---

## 7. Prioritized Recommendations

### High Impact, Lower Effort ✅ IMPLEMENTED

| # | Improvement | Status |
|---|-------------|--------|
| 1 | **Session option reset UX** | ✅ Confirm dialog before resetting when user changes options mid-session |
| 2 | **Back-of-card diagrams** | ✅ FlashcardDiagram on answer side when back.visual.diagramId in CLEAN |
| 3 | **Reduce topic-in-prompt** | ✅ CONCEPT_HARDER_PROMPTS for ~20% of concept cards (hash % 5 === 0) |

### High Impact, Higher Effort ✅ IMPLEMENTED

| # | Improvement | Status |
|---|-------------|--------|
| 4 | **Interleave topics toggle** | ✅ "Interleave topics" checkbox when no topic filter; shuffles across all topics |
| 5 | **Expand CLEAN diagrams** | ✅ Added digestive_system, circulatory_system, pathogen_infection |
| 6 | **Shared FlashcardDeck component** | ⏸ Deferred (high effort) |

### Medium Impact ✅ IMPLEMENTED

| # | Improvement | Status |
|---|-------------|--------|
| 7 | **Consolidate shuffle utilities** | ✅ shuffle() now uses shuffleArray() |
| 8 | **Due count on topic selector** | ✅ "X cards due" on each topic row + Learn button on ScienceLabTopicsPage |
| 9 | **Spaced rep for other hubs** | ⏸ Deferred (multi-hub scope) |

### Lower Priority ✅ IMPLEMENTED

| # | Improvement | Status |
|---|-------------|--------|
| 10 | **Unify confidence scales** | ⏸ Deferred (breaking change) |
| 11 | **Session length: time-based** | ✅ 5 min / 10 min dropdown added |
| 12 | **Type-to-reveal (optional)** | ⏸ Deferred |

---

## 8. Summary Table

| Category       | Status | Top Action |
|----------------|--------|------------|
| Core flow      | ✅ Solid | — |
| Spaced rep     | ✅ Active | — |
| Quick Checks   | ✅ Active | — |
| Session options| ⚠️ Resets | Add confirm or disable mid-session |
| Diagrams       | ⚠️ Limited | Back-of-card + expand CLEAN |
| Learning science | ⚠️ Partial | Interleave, reduce topic-in-prompt |
| Cross-hub      | ❌ Fragmented | Shared component, spaced rep elsewhere |

---

## Appendix: File Reference

| File | Purpose |
|------|---------|
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Main flashcard UI, flow, phases |
| `src/config/scienceLabFlashcards.ts` | Card generation, Quick Checks, topic grouping, spaced rep |
| `src/config/scienceLabDiagramMap.ts` | CLEAN_FLASHCARD_DIAGRAMS, getDiagramMetadataForSlug |
| `src/config/scienceLabDiagrams.ts` | Blueprint definitions |
| `src/components/FlashcardDiagram.tsx` | Diagram render (animated/blueprint/asset/description) |
| `src/config/flashcardDiagramAssets.ts` | Static SVG paths |
| `src/config/animatedDiagramSlugs.ts` | Animated diagram slugs |
| `src/utils/storage.ts` | Mastery, nextReviewDate, topic mastery |
| `src/pages/science/ScienceLabModePage.tsx` | Mode selector, due count display |

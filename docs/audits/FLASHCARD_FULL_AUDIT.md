# Flashcard Design & Functionality – Full Audit

**Date:** February 2025  
**Scope:** Science Lab (primary), cross-hub comparison, diagrams, learning flow, and technical implementation  
**Last Updated:** February 2025 – Implementation complete

---

## Executive Summary

The Science Lab flashcard system is well-structured with rich card content, topic mastery gating, and a merged Learn Mode (flashcards → bigger tests per topic). **As of February 2025, the audit recommendations have been implemented:** spaced repetition is active, Quick Checks are re-enabled, diagram coverage expanded to 10 slugs, recall-before-reveal prompt added, "Again" cards re-queued, shuffle/session options added, "See again in X days" feedback shown, and due count surfaced on the mode page.

---

## 1. Architecture Overview

### 1.1 Science Lab Flashcard Flow

```
Mode entry (subject/paper/tier)
    → getFlashcardsGroupedByTopic()
    → learnSteps: [flashcard, flashcard, …, biggerTest, flashcard, …, biggerTest, …]
    → User: flip → rate confidence (1/2/3) → advance
    → After topic's last flashcard: biggerTest (3–6 mark questions)
    → Session complete → next steps (Topic quiz, Redo, Full GCSE)
```

**Current behaviour:**
- **Quick Checks are skipped.** Code comment: "Always advance immediately — skip quick checks so the flow never gets stuck." `pendingQuickChecks` is never populated; Quick Check phase UI exists but is unreachable.
- **Spaced repetition data is stored but never used.** `nextReviewDate` is written by `updateFlashcardMastery()` but deck order is always linear (topic → flashcard sequence).
- **Bigger tests** appear after each topic group and work as intended.

### 1.2 Card Types & Sources

| Type          | Source                     | Front Prompt Pattern                     | Back Content                                      |
|---------------|----------------------------|------------------------------------------|---------------------------------------------------|
| Concept       | SCIENCE_CONCEPTS           | Rotated templates (What is X?, Explain X, …) | coreIdea, keyTerms, misconceptionWarning          |
| Process chain | concept.changeScenarios    | scenario.prompt                          | explanation (→-separated), keyTerms               |
| Misconception | SCIENCE_MISCONCEPTIONS     | "What is wrong with: [misconception]?"   | correctUnderstanding, keyTerms, example           |
| Practical     | SCIENCE_PRACTICALS         | Purpose / Variables / Risk / Graph       | purpose, IV/DV/controlled, risk, graph expectation|
| Equation      | SCIENCE_EQUATIONS          | Symbol meaning / Reverse / Unit trap     | symbol name/unit, equation, unit trap             |

### 1.3 Cross-Hub Comparison

| Hub           | Confidence Scale        | Min View Time | Session Complete | Spaced Repetition | Content Depth        |
|---------------|-------------------------|---------------|------------------|-------------------|----------------------|
| Science Lab   | 3 (Again, Learning, Got it) | 500ms         | Yes              | Stored, unused    | Rich (key terms, examples, diagrams) |
| History Hub   | 4 (again, hard, good, easy) | None          | No (loops)       | No                | Term + definition + date/context     |
| Business Hub  | 3                        | None          | Yes              | No                | Term + definition + context          |
| Geography Hub | 4                        | None          | No               | No                | Term + definition + context          |
| Psychology Hub| 4                        | None          | No               | No                | Aim, procedure, findings             |
| Health Hub    | 3                        | None          | Yes              | No                | Term + definition                    |
| Compute Lab   | 3                        | None          | Yes              | No                | Term + definition                    |

**Inconsistencies:** Different confidence scales (3 vs 4), different session behaviour, no shared component.

---

## 2. Design Audit

### 2.1 Card Front

| Aspect                 | Current State                                            | Issue |
|------------------------|----------------------------------------------------------|-------|
| Prompt variety         | 7 templates, selected by hash of concept id              | ✅ Improved from prior audits |
| Topic in prompt        | Often present (e.g. "What is diffusion...")              | Can give away answer; desirable difficulty reduced |
| Visual/diagram         | Only 3 slugs render diagram; rest show description text  | **Severe** – 57+ concepts with diagramId get no visual |
| Equation cards         | Equation shown as text; symbol highlighted               | ✅ Adequate |
| "Tap to reveal"        | Shown at bottom                                          | ✅ Clear |

### 2.2 Card Back

| Aspect                 | Current State                                            | Issue |
|------------------------|----------------------------------------------------------|-------|
| Answer layout          | Process steps (→) as numbered list; otherwise paragraph  | ✅ Readable |
| Key terms              | Extracted via SCIENCE_VOCABULARY + unit regex; capped at 8 | Some cards get 0; extraction is heuristic |
| Misconception warning  | Amber callout when present                               | ✅ Good |
| Example                | Blue callout when present                                | ✅ Good |
| Rate & continue        | 1 / 2 / 3 buttons + "Continue without rating"            | ✅ Flexible |

### 2.3 Diagram System – Critical Gap

**CLEAN_FLASHCARD_DIAGRAMS** restricts which diagrams are rendered on flashcards to only:

- `cell_membrane_diffusion`
- `osmosis_diagram`
- `active_transport`

**Rationale in code:** "Only the simplest diagrams (two compartments, one idea, minimal labels) are shown on flashcards. All other diagram slugs show description text only."

**Impact:**
- 60 diagram slugs exist in `FLASHCARD_DIAGRAM_SLUGS` (static assets)
- ~35 concepts have `diagramId` in their visual model
- **Only 3** ever render a diagram; the rest show centred description text
- Blueprints in `scienceLabDiagrams.ts` exist for diffusion, osmosis, active transport; others have static SVGs
- Animated versions exist for 4 slugs (including `particle_model`), but `particle_model` is not in CLEAN so it never shows a diagram

**Recommendation:** Expand CLEAN_FLASHCARD_DIAGRAMS gradually with diagrams that are:
- Simple enough (not cluttered)
- Blueprint-first where possible (consistent styling)
- High educational value (process concepts, required practicals)

### 2.4 Interaction & UX

| Feature                | Status | Notes |
|------------------------|--------|-------|
| Flip on tap/click      | ✅     | Works |
| Flip on swipe up       | ✅     | Swipe up = flip; left/right = prev/next |
| Keyboard: Space        | ✅     | Flip (with 500ms min view) |
| Keyboard: 1 / 2 / 3    | ✅     | Rate confidence |
| Tilt on mouse move     | ✅     | Nice 3D effect |
| Prev/next buttons      | ✅     | ChevronLeft/Right |
| Progress dots          | ✅     | Sliding window of 20 steps |
| Card stack preview     | ✅     | 3 cards visible behind main card |
| preferStatic           | ✅     | Used for long sessions to avoid Framer Motion buildup |

---

## 3. Learning Science Gaps

### 3.1 Active Recall (Testing Effect)

**Principle:** Attempting retrieval before seeing the answer strengthens memory more than passive re-reading.

**Current:** User sees prompt → flips (after 500ms) → reads answer → rates. No recall attempt before reveal.

**Improvement:**
- Add **Recall Mode**: "Try to recall the answer (out loud or in your head), then flip to check."
- Optional **Type-to-reveal** for definitions/equations.
- Brief pause prompt: "Take a moment to think before flipping."

### 3.2 Spaced Repetition

**Principle:** Reviewing at increasing intervals improves long-term retention.

**Current:** `nextReviewDate` is computed (1 / 3 / 7 days based on confidence) and stored but **never used**. Deck order is always linear.

**Improvement:**
- Order deck: Due today → New → Later.
- "Review" vs "Learn" sessions: Review = due cards only; Learn = new + due.
- Surface on mode page: "X cards due for review today."

### 3.3 Interleaving

**Principle:** Mixing topics improves discrimination vs. blocking.

**Current:** Cards grouped by topic; within topic, ordered by source (concepts, misconceptions, practicals, equations). No shuffle.

**Improvement:**
- Shuffle option within topic or across session.
- Interleaved default when "All topics" selected.

### 3.4 Re-queue "Not Sure" Cards

**Principle:** Reinforcing weak items in the same session improves retention.

**Current:** Cards rated 1 (Again) advance like any other; no second pass.

**Improvement:** Add cards rated 1 to a "review again" queue; show before session end.

### 3.5 Desirable Difficulty

**Principle:** Slight struggle improves retention; topic often in prompt reduces difficulty.

**Current:** 500ms min view; prompt often contains topic name.

**Improvement:** Consider 2–3 second "think" prompt; vary prompts to reduce topic-in-prompt hints.

---

## 4. Technical Audit

### 4.1 Storage & Mastery

| Function                       | Purpose                                   | Used? |
|--------------------------------|-------------------------------------------|-------|
| `updateFlashcardMastery()`     | Store confidence, timesViewed, nextReviewDate | ✅ After each rating |
| `getFlashcardMastery()`        | Read all mastery                          | ❌ Not used for deck ordering |
| `calculateTopicFlashcardMastery()` | Topic-level % for gating                | ✅ When advancing past topic |
| `updateTopicMastery()`         | Topic flashcard % + quickCheckPassed      | ✅ |
| `updateBiggerTestCompletion()` | Store bigger test score                   | ✅ |

### 4.2 FlashcardDiagram Component

**Priority order:**
1. Animated (if motion allowed, not preferStatic)
2. Blueprint (DiagramRenderer with custom metadata)
3. Static asset (img)
4. Description only

**preferStatic:** Used on Science Lab flashcards to avoid Framer Motion memory/RAF buildup during long sessions. Good.

**Blueprint-first:** For CLEAN slugs, blueprints are used when available. Static SVGs only as fallback when no blueprint.

### 4.3 Dead / Unreachable Code

- **Quick Check phase:** `phase === 'quickCheck'` UI exists; `setPendingQuickChecks` is only ever set to `[]`. Quick Checks are never shown.
- **getQuickChecksForFlashcard():** Exists in scienceLabFlashcards.ts but is never called from the page.

---

## 5. Prioritized Improvement Recommendations

### High Impact, Moderate Effort ✅ IMPLEMENTED

| # | Improvement | Status | Notes |
|---|-------------|--------|-------|
| 1 | **Activate spaced repetition** | ✅ Done | `getFlashcardsGroupedByTopic` accepts `useSpacedRepetition` + `mastery`; orders due → new → later |
| 2 | **Expand diagram coverage** | ✅ Done | Added enzyme_action, photosynthesis, respiration, particle_model, dna_structure, cell_division, homeostasis to CLEAN_FLASHCARD_DIAGRAMS |
| 3 | **Recall-before-reveal prompt** | ✅ Done | "Try to recall first, then tap or Space to reveal"; MIN_VIEW_MS increased to 1500 |
| 4 | **Re-queue "Again" cards** | ✅ Done | Cards rated 1 added to `notSureQueue`; shown again before session complete |

### High Impact, Higher Effort

| # | Improvement | Description |
|---|-------------|-------------|
| 5 | **Re-enable Quick Checks** | Populate `pendingQuickChecks` from `getQuickChecksForFlashcard()` after confidence rating; cap at 1–2 per card to avoid fatigue |
| 6 | **Shuffle / interleave option** | Toggle for session; shuffle within topic or across deck |
| 7 | **Session length options** | "10 cards," "5 min," "Full deck" |
| 8 | **Due count on mode page** | "X cards due today" on Science Lab mode selector |

### Medium Impact, Lower Effort ✅ IMPLEMENTED (where applicable)

| # | Improvement | Status | Notes |
|---|-------------|--------|-------|
| 9 | **"See again in X days"** | ✅ Done | Toast shows for 1.2s after rating: "✓ See again in 7 days" |
| 10 | **Increase min view time** | ✅ Done | MIN_VIEW_MS = 1500 |
| 11 | **Extract shared FlashcardDeck** | ⏸ Deferred | Out of scope for this implementation |
| 12 | **Unify confidence scale** | ⏸ Deferred | Cross-hub consistency; separate effort |

### Diagram-Specific

| # | Improvement | Description |
|---|-------------|-------------|
| 13 | **Add blueprint diagrams** | Create blueprints for photosynthesis, respiration, enzyme_action, dna_structure (per FLASHCARD_DIAGRAM_AUDIT) |
| 14 | **Back-of-card diagrams** | Optional diagram on answer side for process chains |
| 15 | **Expand CLEAN set** | Add enzyme_action, photosynthesis, respiration once blueprints are clean enough |

---

## 6. Quick Wins Summary ✅ ALL DONE

1. **Show "See again in X days"** – Implemented.
2. **Add shuffle toggle** – Implemented in session options.
3. **Increase MIN_VIEW_MS** to 1500 – Done.
4. **Expand CLEAN_FLASHCARD_DIAGRAMS** – Expanded to 10 slugs (from 3).

---

## 7. Out of Scope / Future

- AI-generated diagrams
- User-uploaded diagrams
- Cloze/fill-in-blank card type
- Full shared FlashcardDeck component across all hubs
- Psychology Hub `selection` bug (separate ticket)

---

## Appendix: File Reference

| File | Purpose |
|------|---------|
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Main flashcard UI, flow, phases |
| `src/config/scienceLabFlashcards.ts` | Card generation, Quick Checks, topic grouping |
| `src/config/scienceLabDiagramMap.ts` | CLEAN_FLASHCARD_DIAGRAMS, getDiagramMetadataForSlug |
| `src/config/scienceLabDiagrams.ts` | Blueprint definitions |
| `src/components/FlashcardDiagram.tsx` | Diagram render (animated/blueprint/asset/description) |
| `src/config/flashcardDiagramAssets.ts` | Static SVG paths |
| `src/config/animatedDiagramSlugs.ts` | Animated diagram slugs |
| `src/utils/storage.ts` | Mastery, nextReviewDate, topic mastery |
| `src/types/scienceLab.ts` | ScienceFlashcard, FlashcardMastery, etc. |

---

## Related Docs

- `FLASHCARD_DESIGN_AUDIT.md` – Card structure, prompts, content
- `FLASHCARD_MODE_AUDIT_AND_IMPROVEMENTS.md` – Learning science, cross-hub
- `FLASHCARD_DIAGRAMS_PLAN.md` – Diagram wiring, phase plan
- `FLASHCARD_DIAGRAM_AUDIT.md` – Blueprint quality, animation expansion
- `LEARN_MODE_MERGE_PLAN.md` – Merged Learn Mode design

# Flashcard Mode Audit & Learning Design Improvements

**Date:** February 2025  
**Scope:** Science Lab, Business Hub, History Hub, Geography Hub, Psychology Hub, Religious Studies, Health Hub, Compute Lab

---

## Executive Summary

The flashcard mode is implemented across multiple subject hubs with a consistent pattern: flip-to-reveal cards with confidence self-rating. The **Science Lab** implementation is the most developed (mastery tracking, topic gating, rich card content). However, several learning-science principles are underused or missing, and the stored spaced-repetition data (`nextReviewDate`) is never applied. This audit identifies gaps and proposes improvements to make flashcard mode more conducive to durable learning.

---

## 1. Current State Audit

### 1.1 Implementation Overview

| Hub | Confidence Scale | Min View Time | Spaced Repetition | Session Complete | Card Content |
|-----|------------------|---------------|------------------|------------------|--------------|
| **Science Lab** | 3 levels (Not Sure, Somewhat, Confident) | 2 seconds | Stored but **never used** | Yes → Quick Check / Return | Rich (key terms, misconceptions, examples) |
| **Business Hub** | 3 levels (Not sure, Okay, Got it) | None | No | Yes → Quick Check / Return | Term + definition + context |
| **History Hub** | 4 levels (again, hard, good, easy) | None | No | No (loops) | Term + definition + date/context |
| **Geography Hub** | 4 levels (again, hard, good, easy) | None | No | No (loops) | Term + definition + context |
| **Psychology Hub** | 4 levels (again, hard, good, easy) | None | No | No (loops) | Study/term with aim, procedure, findings |
| **Health Hub** | 3 levels | None | No | Yes | Term + definition |
| **Compute Lab** | 3 levels | None | No | Yes | Term + definition |

### 1.2 Science Lab Deep Dive (Primary Reference)

**Strengths:**
- Clear learning path: Concept → Flashcard → Quick Check → Question Lab
- Rich card structure: key terms, misconception warnings, examples
- Topic mastery gating (70% flashcard mastery + quick check to unlock quiz)
- 2-second minimum view time reduces rapid flipping without reading
- Progress bar and session completion with clear next steps
- `nextReviewDate` and mastery percent stored per card

**Gaps:**
- `nextReviewDate` is **never queried** – deck order is always linear
- No "due today" prioritization – all cards treated equally
- No active recall – user reads answer before rating
- Cards rated "Not Sure" are not revisited in the same session
- No interleaving – cards are filtered by topic but ordered sequentially
- No keyboard shortcuts for power users
- No "recall mode" (type/think before reveal)

### 1.3 Cross-Hub Inconsistencies

- **Confidence scales:** 3-level (Science, Business, Health) vs 4-level Anki-style (History, Geography, Psychology)
- **Session behaviour:** Some loop indefinitely; others show completion and next steps
- **Spaced repetition:** Only Science Lab stores `nextReviewDate`, but it is unused
- **Psychology Hub bug:** `selection` is referenced but never defined (line 24), causing potential runtime error

---

## 2. Learning Science Principles – Gaps & Opportunities

### 2.1 Active Recall (Testing Effect)

**Principle:** Attempting to retrieve information before seeing the answer strengthens memory more than passive re-reading.

**Current:** User sees prompt → flips → reads answer → rates confidence. No attempt to recall before reveal.

**Improvement:**
- Add **Recall Mode**: "Try to recall the answer (out loud or in your head), then flip to check."
- Optional **Type-to-Reveal**: User types a short answer; system reveals correct answer for comparison (especially for definitions, equations, key terms).
- Prompt: "What do you think? Tap when ready to check."

### 2.2 Spaced Repetition (Ebbinghaus Forgetting Curve)

**Principle:** Reviewing at increasing intervals (1 day → 3 days → 7 days) improves long-term retention.

**Current:** `nextReviewDate` is computed and stored in Science Lab but **never used**. Deck order is always sequential.

**Improvement:**
- **Use `nextReviewDate`** to build a "due today" queue: cards with `nextReviewDate <= today` or never seen appear first.
- **Smart deck ordering:** Due cards → New cards → Overdue cards.
- **"Review" vs "Learn" sessions:** "Review" shows only due cards; "Learn" adds new cards.
- Surface this to the user: "3 cards due for review today" or "Next review: in 2 days."

### 2.3 Desirable Difficulty

**Principle:** Slight struggle during retrieval improves retention; too easy (recognition) or too hard (frustration) is suboptimal.

**Current:** User can flip immediately (after 2s in Science) and rate. No retrieval effort required.

**Improvement:**
- Encourage a brief pause before flip: "Take 5 seconds to recall before checking."
- For "Not Sure" cards: **re-queue in same session** (show again before session end) rather than moving on.
- Optional difficulty calibration: "Was this easy, just right, or too hard?"

### 2.4 Interleaving

**Principle:** Mixing topics improves discrimination and long-term retention vs. blocking by topic.

**Current:** Cards can be filtered by topic; when unfiltered, they are still grouped by source (concepts, misconceptions, practicals, equations).

**Improvement:**
- **Shuffle option:** Randomize card order within a session.
- **Interleaved default:** When "All topics" selected, interleave by topic rather than block.
- **Mixed review:** "Review due cards from all topics" as default review mode.

### 2.5 Metacognition (Calibration)

**Principle:** Learners often overestimate their knowledge; calibration improves with feedback.

**Current:** Self-rated confidence affects mastery calculation but user gets no feedback on accuracy.

**Improvement:**
- **Quick Check linkage:** After flashcard session, Quick Check performance can be compared to self-ratings ("You said 'Confident' on 5 cards; you got 4/5 correct on those in Quick Check").
- **Session summary:** "You rated X as confident, Y as somewhat, Z as not sure. Consider re-reviewing the 'not sure' ones soon."
- **Prediction prompts:** "Before flipping: How sure are you (1–5)? Then check and see if you were right."

### 2.6 Chunking & Session Design

**Principle:** Shorter, focused sessions with clear goals improve engagement and reduce fatigue.

**Current:** User works through entire deck or topic; no session length control.

**Improvement:**
- **Session goals:** "Review 10 cards" or "5 minutes" as options.
- **Micro-sessions:** "Quick 5-card burst" for mobile/short breaks.
- **Progress milestones:** "Halfway! 15 more to go" or "Last 5 cards – push through!"

### 2.7 Feedback & Motivation

**Principle:** Clear, immediate feedback and progress visibility sustain motivation.

**Current:** Progress bar and "Session Complete" with next steps. No streak for flashcards, no "cards due" visibility.

**Improvement:**
- **Flashcard streak:** "3 days of flashcard review" (separate or combined with app streak).
- **Due count on mode page:** "12 cards due for review" on Science Lab mode selector.
- **Retention estimate:** "Based on your ratings, ~85% expected retention in 1 week."
- **Sound/haptic on confident:** Optional celebration for consistent "Confident" ratings.

---

## 3. Design Improvements – Prioritized

### High Impact, Moderate Effort

| # | Improvement | Description | Learning Benefit |
|---|-------------|-------------|------------------|
| 1 | **Use spaced repetition** | Filter/order deck by `nextReviewDate`; show due cards first | Long-term retention |
| 2 | **Recall-before-reveal prompt** | Add "Try to recall first" step with optional 5s pause | Active recall, testing effect |
| 3 | **Re-queue "Not Sure" cards** | Cards rated 1 (Not Sure) reappear before session end | Desirable difficulty, reinforcement |
| 4 | **Shuffle / interleave option** | Shuffle deck; interleave by topic when "All topics" | Interleaving benefit |

### High Impact, Higher Effort

| # | Improvement | Description | Learning Benefit |
|---|-------------|-------------|------------------|
| 5 | **Type-to-reveal mode** | User types answer; system shows correct for comparison | Strong retrieval practice |
| 6 | **"Review" vs "Learn" sessions** | Review = due cards only; Learn = new + due | Focused practice |
| 7 | **Session length options** | "10 cards," "5 min," "Full deck" | Chunking, reduced fatigue |
| 8 | **Due count on mode page** | "X cards due today" on Science Lab mode selector | Motivation, habit formation |

### Medium Impact, Lower Effort

| # | Improvement | Description | Learning Benefit |
|---|-------------|-------------|------------------|
| 9 | **Keyboard shortcuts** | Space = flip, 1/2/3 = confidence, ←/→ = prev/next | Efficiency, power users |
| 10 | **Unify confidence scale** | Standardize on 4-level (again, hard, good, easy) or 3-level across hubs | Consistency, Anki familiarity |
| 11 | **Fix Psychology Hub bug** | Define `selection` (e.g. from storage) before use | Stability |
| 12 | **"See again in X days"** | Show next review date after rating (e.g. "See again in 7 days") | Transparency, trust in system |

### Lower Priority

| # | Improvement | Description |
|---|-------------|-------------|
| 13 | **Prediction calibration** | "How sure?" before flip, then compare to actual |
| 14 | **Flashcard streak** | Track consecutive days of flashcard review |
| 15 | **Quick Check linkage** | Compare self-ratings to Quick Check performance |

---

## 4. Card Content Improvements (Science Lab)

### 4.1 Front-of-Card Design

- **Cloze-style variants:** Some cards could use "Fill in the blank" (e.g. "In photosynthesis, _____ is produced in the light-dependent stage") for stronger retrieval.
- **Question variety:** Avoid always "What is X?" – use "Why does X happen?", "What happens when Y changes?", "How does X differ from Y?"
- **Image/diagram on front:** For `visual.diagramId`, render the diagram on the front when it aids the question (e.g. "What does arrow A represent?").

### 4.2 Back-of-Card Design

- **Progressive disclosure:** For long explanations, consider "Key point first" then "More detail" expandable.
- **Link to Concept Lab:** "Want to go deeper? Open Concept Lab for [topic]."
- **Mnemonics:** Where applicable, add a mnemonic (e.g. "MRS GREN" for life processes).

### 4.3 Card Generation (scienceLabFlashcards.ts)

- **extractKeyTerms:** Currently uses a fixed list; consider dynamic extraction (e.g. noun phrases, domain terms) or manual curation per concept.
- **Equation cards:** Consider reverse cards: "What is the equation for [concept]?" in addition to "What does F represent?"
- **Process chains:** Ensure `changeScenarios` produce cards with clear cause→effect structure.

---

## 5. Technical Recommendations

### 5.1 Spaced Repetition Implementation

```typescript
// Pseudocode for deck ordering
function getOrderedDeck(flashcards: ScienceFlashcard[], mastery: Record<string, FlashcardMastery>): ScienceFlashcard[] {
  const now = new Date().toISOString().slice(0, 10);
  const due: ScienceFlashcard[] = [];
  const newCards: ScienceFlashcard[] = [];
  const later: ScienceFlashcard[] = [];

  flashcards.forEach(f => {
    const m = mastery[f.id];
    if (!m) newCards.push(f);
    else if (!m.nextReviewDate || m.nextReviewDate.slice(0, 10) <= now) due.push(f);
    else later.push(f);
  });

  // Due first, then new, then later (or interleave)
  return [...shuffle(due), ...shuffle(newCards), ...later];
}
```

### 5.2 Re-queue "Not Sure" Cards

```typescript
// After handleConfidence(1), add card back to a "review again" queue
const notSureQueue = useRef<string[]>([]);
if (level === 1) notSureQueue.current.push(currentCard.id);
// Before session end, inject notSureQueue cards into remaining deck
```

### 5.3 Shared Flashcard Component

Consider extracting a reusable `FlashcardDeck` component used by Science, Business, History, etc., with props for:
- `cards`, `onConfidence`, `confidenceLevels`, `minViewTime`, `showRecallPrompt`, `enableSpacedRepetition`, `sessionGoal` (number or 'full').

---

## 6. Summary: Top 5 Changes for Maximum Learning Impact

1. **Activate spaced repetition** – Use `nextReviewDate` to prioritize due cards and support long-term retention.
2. **Recall-before-reveal** – Add explicit "Try to recall first" step (and optional type-to-reveal) to leverage the testing effect.
3. **Re-queue "Not Sure" cards** – Show them again before session end to reinforce weak items.
4. **Shuffle / interleave** – Mix topics and card order to improve discrimination and retention.
5. **Surface "due today"** – Show "X cards due for review" on the mode page to drive habit and motivation.

---

## Appendix: File References

| File | Purpose |
|------|---------|
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Primary flashcard UI |
| `src/config/scienceLabFlashcards.ts` | Card generation |
| `src/utils/storage.ts` | Mastery, nextReviewDate, topic mastery |
| `src/types/scienceLab.ts` | ScienceFlashcard, FlashcardMastery |
| `src/pages/business/BusinessHubFlashcardPage.tsx` | Business implementation |
| `src/pages/history/HistoryHubFlashcardPage.tsx` | History implementation |
| `src/pages/geography/GeographyHubFlashcardPage.tsx` | Geography implementation |
| `src/pages/psychology/PsychologyHubKeyStudiesPage.tsx` | Psychology implementation (has `selection` bug) |

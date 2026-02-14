# Learn Mode Merge Plan: Flashcards + Small Tests + Bigger Tests

**Purpose:** Redesign Learn Mode so students are tested *in context* as they move through flashcards—quick checks after each card, and bigger tests (3–6 mark questions) after each topic/idea group.

**Status:** Implemented  
**Scope:** Science Lab (Biology, Chemistry, Physics) — can be extended to other hubs later.

---

## 1. Current State vs. Target

### Current Flow (Separate Steps)

```
Learn (flashcards only)  →  Small tests (Quick Check)  →  Bigger tests (Method Mark)  →  Topic test  →  Full GCSE test
        ↓                            ↓                              ↓
   All cards, no in-context      Separate page,              Separate page,
   verification                  all topics at once          4–6 mark only
```

Students complete *all* flashcards first, then move to Quick Check and Method Mark as separate modes. There is no immediate verification per card or per idea.

### Target Flow (Merged Learn Mode)

```
Flashcard 1  →  Quick check (1–2 Qs on that card)  →  Flashcard 2  →  Quick check  →  …  →  [Topic/idea group done]
                                                                                               ↓
                                                                                    Bigger test (3–6 mark)
                                                                                               ↓
                                                                                    Next topic's flashcards…
```

- **Per-card:** Quick test immediately after each flashcard to verify understanding.
- **Per-group:** After completing all flashcards in an idea/topic, a bigger test (3–6 mark questions) before moving to the next group.

---

## 2. Core Concepts

### 2.1 "Group of Flashcards on an Idea"

An **idea** = one curriculum topic (e.g. Cell Biology, Organisation, Chemical Changes).

| Option | Granularity | Pros | Cons |
|--------|-------------|------|------|
| **A. Topic** | 5–15 cards per group | Matches spec, clear boundaries | Some topics have many cards |
| **B. Concept** | 2–8 cards (main + scenarios) | Finer grain, more frequent bigger tests | More transitions, may feel fragmented |
| **C. Sub-topic** | 3–10 cards | Middle ground | Requires new grouping in data |

**Recommendation:** **Topic-level grouping (Option A)**. Topics are already in the data (`concept.topic`, `flashcard.topic`), and they align with curriculum units. A bigger test after each topic feels like "master this unit, then prove it."

### 2.2 "Quick Test" on Each Flashcard

- **Source:** Quick Checks from `getQuickChecksByFilters()`, linked via `relatedFlashcardIds`.
- **Behaviour:** After the student flips a card and rates confidence, show 1 (or 2) related Quick Check(s) before advancing.
- **If no related Quick Check:** Skip or show a topic-level Quick Check as fallback.
- **Question types:** MCQ, True/False, drag order — all fast, low friction.

### 2.3 "Bigger Test" (3–6 Marks)

- **Source:** `SCIENCE_QUESTIONS` filtered by `marks >= 3` (or `marks >= 4` for Method Mark style) and `topic`.
- **Count:** 1–3 questions per topic group (configurable).
- **Presentation:** Same style as Method Mark / Topic Test — question text, mark scheme (where available), answer input, feedback.

---

## 3. Data Model Requirements

### 3.1 Flashcard ↔ Quick Check Mapping

Quick Checks already have `relatedFlashcardIds`. We need:

```ts
// Get Quick Checks related to a flashcard
function getQuickChecksForFlashcard(
  flashcardId: string,
  quickChecks: ScienceQuickCheck[]
): ScienceQuickCheck[]
```

- Filter `quickChecks` where `relatedFlashcardIds.includes(flashcardId)`.
- If none, optionally use topic-level Quick Checks for that flashcard's topic.

### 3.2 Topic Boundaries in Flashcard Order

Flashcards from `getFlashcardsByFilters()` are not explicitly ordered by topic. We need:

```ts
// Group flashcards by topic for Learn Mode flow
function getFlashcardsGroupedByTopic(
  subject, paper, tier, topicFilter?
): Array<{ topic: string; flashcards: ScienceFlashcard[] }>
```

- Sort/group by `topic`.
- When `topicFilter` is set, only one group is returned.
- Used to know when to inject a "bigger test" (at end of each group).

### 3.3 Bigger Test Questions per Topic

```ts
// Get 3–6 mark questions for a topic
function getBiggerTestQuestionsForTopic(
  subject, paper, tier, topic: string,
  count?: number
): ScienceQuestion[]
```

- Use `getQuestionsByFilters(subject, paper, tier, topic)`.
- Filter `marks >= 3` (or 4).
- Return first `count` (default 2–3).

---

## 4. User Experience Design

### 4.1 Flow States

| State | Description | UI |
|-------|-------------|-----|
| `flashcard` | Viewing flashcard (front/back) | Card + flip + confidence (1–3) |
| `quickCheck` | Answering quick check(s) for current card | MCQ / T/F / drag, instant feedback |
| `biggerTest` | Answering 3–6 mark questions for completed topic | Question + answer input + mark scheme + feedback |

### 4.2 Transitions

```
[Flashcard shown]
    → User flips, rates confidence
    → If related Quick Check exists: transition to quickCheck
    → Else: advance to next flashcard (or biggerTest if end of topic)

[Quick Check shown]
    → User answers, sees feedback
    → Advance to next flashcard (or biggerTest if end of topic)

[Bigger Test shown]
    → User answers 1–3 questions
    → Show summary (e.g. "2/3 correct")
    → Advance to next topic's first flashcard (or completion if no more topics)
```

### 4.3 Progress Indication

- **Header:** "Learn: Cell Biology — Card 3 of 8" or "Bigger test: Cell Biology — Question 2 of 3".
- **Mini map:** Dots or segments showing flashcard blocks + bigger test blocks.
- **After bigger test:** Brief celebration, then "Next: Organisation" with first flashcard.

### 4.4 Skip / Relaxed Mode (Optional)

- **Option A:** "Skip quick checks" — go straight from flashcard to flashcard, only bigger tests at topic boundaries.
- **Option B:** "Relaxed" — quick checks optional; "Skip" button to bypass.
- Default: full merged flow.

---

## 5. Implementation Phases

### Phase 1: Data Helpers (Low Effort)

| Task | File | Description |
|------|------|-------------|
| Add `getQuickChecksForFlashcard` | `scienceLabFlashcards.ts` | Return Quick Checks whose `relatedFlashcardIds` includes given flashcard id |
| Add `getFlashcardsGroupedByTopic` | `scienceLabFlashcards.ts` | Return `{ topic, flashcards }[]` for ordered Learn flow |
| Add `getBiggerTestQuestionsForTopic` | `scienceLabData.ts` or `scienceLabFlashcards.ts` | Return 3–6 mark questions for a topic |

### Phase 2: Inline Quick Check (Medium Effort)

| Task | File | Description |
|------|------|-------------|
| After confidence rating, check for related Quick Check | `ScienceLabFlashcardPage.tsx` | If exists, switch to inline Quick Check view instead of next card |
| Add `QuickCheckInline` component or reuse existing | New or `ScienceLabQuickCheckPage` | Render single Quick Check (MCQ/TF/drag) with feedback |
| On Quick Check complete, advance to next flashcard or bigger test | `ScienceLabFlashcardPage.tsx` | State machine: flashcard → quickCheck → flashcard | biggerTest |

### Phase 3: Topic Boundaries & Bigger Test (Medium Effort)

| Task | File | Description |
|------|------|-------------|
| Build flat sequence: cards + bigger-test placeholders | `ScienceLabFlashcardPage.tsx` | e.g. `[card1, card2, …, cardN, BIGGER_TEST, cardN+1, …]` |
| Add bigger-test phase UI | `ScienceLabFlashcardPage.tsx` or new component | Show 3–6 mark question(s), answer input, feedback (reuse Question Lab / Method Mark logic) |
| Store bigger-test completion in topic mastery | `storage.ts` | e.g. `biggerTestCompleted`, `biggerTestScore` per topic |

### Phase 4: UX Polish (Low–Medium Effort)

| Task | Description |
|------|-------------|
| Progress header | "Learn: [Topic] — Card X of Y" / "Bigger test: [Topic]" |
| Completion flow | When all topics done, show "All topics complete" with CTAs (Topic test, Full GCSE, Back to lab) |
| Optional skip | "Skip quick checks" or "Skip" per quick check |
| Sound/haptics | Reuse existing correct/wrong sounds for quick checks and bigger test |

---

## 6. Mode Page & Learning Path Updates

### 6.1 Simplified Path

With Learn Mode merged:

| Step | Title | Description |
|------|-------|-------------|
| 1 | **Learn** | Flashcards with in-context quick checks and bigger tests per topic |
| 2 | Topic test | Full topic quiz (existing) |
| 3 | Full GCSE test | Exam-style across all topics (existing) |

**Learn** now subsumes the old "Small tests" and "Bigger tests" steps. Quick Check and Method Mark can remain as **extra practice** for students who want to drill specific modes.

### 6.2 Optional: Keep Quick Check & Method Mark as Extra Practice

- **Quick Check (standalone):** "Review all quick checks" — useful for revision.
- **Method Mark (standalone):** "Practice 4–6 mark questions with mark scheme" — useful for exam technique.

These stay in "Extra practice" or a secondary nav, not the main learning path.

---

## 7. File-Level Impact

| File | Changes |
|------|---------|
| `scienceLabFlashcards.ts` | `getQuickChecksForFlashcard`, `getFlashcardsGroupedByTopic`, `getBiggerTestQuestionsForTopic` (or similar) |
| `ScienceLabFlashcardPage.tsx` | Major refactor: state machine (flashcard / quickCheck / biggerTest), inline Quick Check, bigger-test phase, grouped flow |
| `ScienceLabModePage.tsx` | Update LEARNING_PATH copy; optionally remove or demote Quick Check / Method Mark from main path |
| `ScienceLabQuickCheckPage.tsx` | Possibly extract `QuickCheckCard` component for reuse in Flashcard page |
| `storage.ts` | Extend topic mastery with `biggerTestCompleted`, `biggerTestScore` if not already present |
| `scienceLab.ts` (types) | Add `LearnModePhase: 'flashcard' \| 'quickCheck' \| 'biggerTest'` if needed |

---

## 8. Edge Cases

| Case | Handling |
|------|----------|
| No Quick Check for flashcard | Skip to next flashcard (or next phase) |
| Topic has 0 bigger-test questions | Skip bigger test, go to next topic |
| Single flashcard in topic | Still show bigger test after it |
| User navigates away mid-flow | Persist progress (optional): "Resume Learn" from last topic/card |
| Topic filter active | Only one topic; one bigger test at end of that topic's cards |

---

## 9. Success Criteria

1. **Immediate verification:** Each flashcard is followed by a quick check (when one exists) before moving on.
2. **Topic-level consolidation:** After each topic's flashcards, a bigger test (3–6 mark) is shown.
3. **Clear progression:** Students see "Card X of Y" and "Bigger test: [Topic]" so they know where they are.
4. **No dead-ends:** Completion offers clear next steps (Topic test, Full GCSE, Back to lab).
5. **Backward compatibility:** Standalone Quick Check and Method Mark pages remain usable for focused practice.

---

## 10. Summary

| Aspect | Current | Target |
|--------|---------|--------|
| **Quick check timing** | After all flashcards | After each flashcard (when related) |
| **Bigger test timing** | Separate mode, all topics | After each topic's flashcards |
| **Learning path** | 5 steps (Learn → Small → Bigger → Topic → Full) | 3 steps (Learn merged → Topic → Full) |
| **Student experience** | Choppy, context lost between modes | Continuous, in-context verification |

Implementing Phase 1 and 2 delivers the core "quick test per card" experience; Phase 3 adds the "bigger test per topic" flow. Phase 4 refines UX and completion behaviour.

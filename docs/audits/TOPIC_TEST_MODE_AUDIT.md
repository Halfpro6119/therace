# Science Lab Topic Test — Full Audit (GCSE Paper Standard)

**Purpose:** Audit the topic test to identify why it is "currently useless" and define how it can reach its full potential as a **difficult mini GCSE paper** that prepares students for real exam conditions and complete mastery of a full topic.

**Status:** ✅ **IMPLEMENTED** (February 2025) — see implementation summary at end.

---

## Executive Summary

The topic test is a thin quiz that mixes Quick Checks (MCQ, T/F, drag order) and open-ended SCIENCE_QUESTIONS with a topic filter. It **does not** function as a mini GCSE paper because:

1. **Scoring is binary and unweighted** — A 6-mark extended question counts the same as a 1-mark MCQ. Real GCSE uses total marks (e.g. 70 per paper) and partial credit for extended questions.
2. **No mark-scheme grading for 4–6 mark questions** — Topic test uses `gradeScienceAnswer()` (keyword matching, binary correct/incorrect). Method Mark breakdowns and `gradeMethodMarkAnswer()` exist but are **never used** in topic test.
3. **No exam structure** — Random shuffle, no deliberate mix of 1–2 mark recall, 3 mark explanation, 4–6 mark extended. Real GCSE papers have a clear mark distribution.
4. **Too easy** — No time pressure, no command-word guidance, no AO-style differentiation. Students are not challenged in the way real exams are.
5. **Coverage gaps** — Some topics have few or no extended questions; topic tests can be short and uneven.

**Recommendation:** Redesign the topic test as a **dedicated mini GCSE paper** with marks-based scoring, Method Mark integration for extended questions, exam-style structure, optional time pressure, and difficulty calibrated to real GCSE standards.

---

## 1. Current Implementation

### 1.1 User Flow

1. **Mode page** → User clicks "Topic test" → Navigates to **Topics page** (`/topics`)
2. **Topics page** → User selects topic, clicks "Topic test" → Navigates to **Topic Test page** (`/topic-test?topic=X`)
3. **Topic Test page** → Renders `getTopicTestItems()` (Quick Checks + SCIENCE_QUESTIONS, shuffled); user answers each; binary correct/incorrect; score shown at end

### 1.2 Data Sources

| Source | Types | Topic filter | Used in topic test |
|--------|-------|--------------|--------------------|
| `getQuickChecksByFilters()` | MCQ, T/F, drag order | ✓ | ✓ |
| `getQuestionsByFilters()` | Open text, 2–6 marks | ✓ | ✓ |
| `getMethodMarkBreakdown()` | Mark scheme for 4–6 mark | ✓ | **✗ Never used** |

### 1.3 Key Code Paths

| File | Role |
|------|------|
| `ScienceLabTopicTestPage.tsx` | Renders items; uses `gradeScienceAnswer()` for all questions (binary) |
| `scienceLabFlashcards.ts` → `getTopicTestItems()` | Combines Quick Checks + SCIENCE_QUESTIONS; shuffles |
| `scienceGrading.ts` → `gradeScienceAnswer()` | Keyword/substring matching; returns `{ correct: boolean }` |
| `scienceGrading.ts` → `gradeMethodMarkAnswer()` | Mark-point matching; returns `{ score, totalMarks, obtained, missed }` — **not used in topic test** |

---

## 2. Why It Fails as a Mini GCSE Paper

### 2.1 Scoring: Binary and Unweighted

| Real GCSE | Topic test | Gap |
|-----------|------------|-----|
| Total marks per paper ~70 | Total "correct" count (each question = 1) | Marks not used |
| 6-mark question: 0–6 marks (partial credit) | 6-mark question: 0 or 1 | No partial credit |
| 1-mark recall: 0 or 1 | Same | OK |
| Percentage = marks earned / total marks | Percentage = questions correct / total questions | Distorts performance |

**Example:** Student gets 3/3 on MCQs (3 marks) and 1/3 on 6-mark questions (each worth 6 marks).  
- **Real GCSE:** 3 + 6 = 9 marks out of 3 + 18 = 21 → 43%  
- **Topic test:** 2/4 correct → 50% (misleading)

### 2.2 No Mark-Scheme Grading for Extended Questions

- **Topic test** uses `gradeScienceAnswer()` for every question. This does keyword matching and returns `correct: true/false` only.
- **Method Mark Trainer** uses `gradeMethodMarkAnswer()` with `MethodMarkBreakdown` (idea marks, method marks, precision marks) and gives partial credit.
- Only **12** of ~35+ 4–6 mark questions have real METHOD_MARK_BREAKDOWNS; the rest would need fallback or new breakdowns.

**Effect:** Students never see "you got 4/6 marks — you missed the method mark for showing the calculation." They only see "correct" or "incorrect," which does not prepare them for real marking.

### 2.3 No Exam-Style Structure

Real AQA GCSE Science papers have:

| Element | Real GCSE | Topic test |
|---------|-----------|------------|
| Question mix | ~20% MCQ, short answer (1–3 marks), extended (4–6 marks) | Random shuffle of all types |
| Ordering | Often easier → harder; some sections mixed | Purely random |
| Command words | State, Describe, Explain, Evaluate, Compare, Suggest | Not surfaced |
| AO weighting | AO1 (recall), AO2 (apply), AO3 (analyse) | Not distinguished |
| Required practicals | Always included | Not explicitly included |
| Total length | ~70 marks, ~70 min | Variable (depends on topic) |

Topic test has no deliberate structure; it feels like a random quiz, not a paper.

### 2.4 Difficulty and Challenge

| Real GCSE challenge | Topic test | Gap |
|---------------------|------------|-----|
| Time pressure (~1 min per mark) | None | No time pressure |
| Command words (Evaluate = different to Describe) | None | No guidance |
| Unfamiliar contexts (AO2) | Some in Quick Check application questions | Inconsistent |
| Levels of response (4–6 mark) | Binary correct/incorrect | No levels |
| Common penalties (wrong units, wrong terms) | `commonMistakes` checked | Partial |

**Result:** The topic test is easier than a real paper and does not train students for exam conditions.

### 2.5 Coverage and Content

| Metric | Notes |
|--------|-------|
| SCIENCE_QUESTIONS per topic | Varies (e.g. Cell Biology ~8+, some topics fewer) |
| Quick Checks per topic | From concepts + misconceptions; some topics sparse |
| Method Mark breakdowns | 12 questions across all subjects; most 4–6 mark questions have no breakdown |
| Required practicals | Flashcards exist; topic test does not explicitly pull practical questions |

Some topics may yield a very short or easy test.

### 2.6 Feedback and Learning

| Real GCSE feedback | Topic test | Gap |
|--------------------|------------|-----|
| Mark scheme with bullet points | Model answer shown on incorrect | No mark-point breakdown |
| "1 mark for X, 1 mark for Y" | Not shown | Students don't learn where marks are |
| Examiner report style | Not available | Missing |

---

## 3. What a Real Mini GCSE Paper Should Be

### 3.1 Purpose

> A **mini GCSE paper for one topic** that:
> 1. Tests recall (AO1), application (AO2), and analysis (AO3) across the whole unit
> 2. Uses marks-based scoring with partial credit for extended questions
> 3. Feels like a real exam (structure, difficulty, optional timer)
> 4. Gives actionable feedback (which mark points were hit/missed)
> 5. Prepares students for the full GCSE

### 3.2 Target Experience

1. **Entry**
   - Clear "Topic Test: [Topic]" — "Mini GCSE paper for [Topic]"
   - Optional: "Recommended: ~15–20 min" or "X marks total, ~1 min per mark"

2. **Structure**
   - **Section A:** 1–2 mark recall (Quick Checks, short SCIENCE_QUESTIONS) — ~30% of marks
   - **Section B:** 3 mark explanation — ~25% of marks
   - **Section C:** 4–6 mark extended — ~45% of marks
   - Optional: Include 1–2 required practical questions if topic-relevant

3. **Scoring**
   - **Marks-based:** Total marks = sum of `question.marks` for all questions
   - **Partial credit:** For 4–6 mark questions with METHOD_MARK_BREAKDOWN, use `gradeMethodMarkAnswer()` and add `result.score` to total
   - **Percentage:** `marksEarned / totalMarks * 100`

4. **Difficulty**
   - Time pressure: Optional timer (e.g. totalMarks minutes)
   - Command words: Show "Explain", "Evaluate", etc. on question card
   - Stretch: Include at least one 6-mark question per topic where available

5. **Completion**
   - "You scored 24/36 marks (67%)"
   - For extended questions: "Extended questions: X/18 marks — review the mark scheme"
   - CTAs: "Back to Topics", "Review mistakes in Flashcards", "Try Method Mark for this topic"

---

## 4. Recommended Changes (Prioritised)

### Phase 1 — Marks-Based Scoring and Method Mark Integration (High Impact)

1. **Marks-based total**
   - Compute `totalMarks = items.reduce((s, i) => s + (i.type === 'question' ? i.data.marks : 1), 0)`
   - For Quick Checks: 1 mark each (or match to a "marks" field if added)
   - Display "X / Y marks" and "Z%"

2. **Use Method Mark grading for 4–6 mark questions**
   - When `question.marks >= 4` and `getMethodMarkBreakdown(question.id)` exists, call `gradeMethodMarkAnswer(breakdown, userAnswer)` instead of `gradeScienceAnswer()`
   - Add `result.score` to `marksEarned` (not 0 or 1)
   - Show which mark points were obtained/missed in feedback
   - For questions without breakdown: keep `gradeScienceAnswer()` but allocate marks proportionally (e.g. correct = full marks, incorrect = 0) — or add generic breakdowns later

3. **Display mark scheme feedback for extended questions**
   - On incorrect or partial: show "You obtained: [list]. You missed: [list]." from `gradeMethodMarkAnswer` result

### Phase 2 — Exam Structure and Difficulty (Medium Effort)

4. **Structured question order**
   - Replace random shuffle with: Section A (1–2 mark) → Section B (3 mark) → Section C (4–6 mark)
   - Within each section, optionally shuffle
   - Ensures students face easier recall first, then build to extended

5. **Command words**
   - Extract or add command word to questions (State, Describe, Explain, Evaluate, Compare, Suggest)
   - Display on question card: e.g. "Explain (3 marks)"

6. **Optional timer**
   - Add "Timed mode" toggle: `timeLimitMinutes = Math.ceil(totalMarks)` (1 min per mark)
   - Show countdown; when time expires, auto-submit and score what's done

7. **Minimum difficulty**
   - Ensure each topic test includes at least one 4+ mark question if available
   - Cap Quick Check proportion (e.g. max 40% of items from Quick Checks) so test isn't too recall-heavy

### Phase 3 — Content and Polish (Lower Priority)

8. **Expand Method Mark breakdowns**
   - Add breakdowns for remaining 4–6 mark questions in SCIENCE_QUESTIONS
   - Or: generic fallback breakdown (idea/method/precision) for questions without specific breakdown

9. **Required practical questions**
   - Include 1–2 practical-linked questions per topic where relevant (from flashcards or new question pool)

10. **Coverage audit**
    - Audit question count per topic; flag topics with &lt; 5 questions
    - Add questions for sparse topics

---

## 5. File-Level Impact

| File | Changes |
|------|---------|
| `ScienceLabTopicTestPage.tsx` | Marks-based scoring; call `gradeMethodMarkAnswer` for 4–6 mark questions with breakdown; show mark scheme feedback; structured order; optional timer |
| `scienceLabFlashcards.ts` → `getTopicTestItems()` | Return structured sections (A/B/C) instead of flat shuffle; optional min extended count |
| `scienceLabData.ts` | Add `getMethodMarkBreakdown` usage; expand METHOD_MARK_BREAKDOWNS |
| `storage.ts` | Store `marksEarned` and `totalMarks` in topic test completion (for better analytics) |
| `scienceLab.ts` (types) | Optional: `commandWord` on ScienceQuestion; `marks` on QuickCheck (default 1) |

---

## 6. Success Criteria

Topic test will reach its full potential when:

1. **Scoring:** Students see "X / Y marks (Z%)" with marks-based totals and partial credit for extended questions.
2. **Method Mark:** 4–6 mark questions use mark-scheme grading and show which points were hit/missed.
3. **Structure:** Test has clear sections (recall → explanation → extended) mimicking a real paper.
4. **Difficulty:** Optional timer, command words, and at least one extended question per topic.
5. **Feedback:** Students understand where they lost marks and can improve.
6. **Preparation:** Completing a topic test feels like doing a real GCSE topic paper.

---

## 7. Summary

| Category | Current | Target |
|----------|---------|--------|
| **Scoring** | Binary (correct count) | Marks-based with partial credit |
| **4–6 mark questions** | `gradeScienceAnswer` (binary) | `gradeMethodMarkAnswer` (mark points) |
| **Structure** | Random shuffle | Section A → B → C (recall → explain → extended) |
| **Difficulty** | No timer, no command words | Optional timer, command words, minimum extended |
| **Feedback** | Model answer only | Mark scheme: obtained vs missed |
| **Preparation** | Feels like a casual quiz | Feels like a mini GCSE paper |

Implementing Phase 1 alone will materially improve the topic test. Phase 2 will make it genuinely exam-like and difficult. Phase 3 will close content and polish gaps.

---

## Implementation Summary (Completed)

### Phase 1 — Marks-Based Scoring and Method Mark Integration
- **Marks-based total:** `totalMarks` = sum of marks per item; Quick Checks = 1 mark each
- **Method Mark grading:** For 4–6 mark questions with `METHOD_MARK_BREAKDOWN`, uses `gradeMethodMarkAnswer()` for partial credit
- **Mark scheme feedback:** Shows "You obtained:" (green) and "You missed:" (amber) for extended questions with breakdowns
- **Completion summary:** Displays "X / Y marks (Z%)" and extended questions breakdown when applicable

### Phase 2 — Exam Structure and Difficulty
- **Structured question order:** Section A (1–2 mark recall + Quick Checks) → Section B (3 mark) → Section C (4–6 mark)
- **Quick Check cap:** Max 40% of items from Quick Checks (max floor(2/3 * questionCount))
- **Command words:** Inferred from question text (State, Describe, Explain, Evaluate, Compare, Suggest, Calculate) and shown on question card
- **Optional timer:** "Timed mode" toggle in header; 1 min per mark; when time expires, auto-finish and score completed questions
- **Header copy:** "Mini GCSE paper for [Topic] — X marks total (~Y min)"

### Phase 3 — Content and Polish (Deferred)
- Generic fallback breakdown for 4–6 mark questions without specific breakdowns: not implemented; continues to use `gradeScienceAnswer()` (full/zero marks)
- Required practical questions: not yet included in topic test pool
- Coverage audit: not yet performed

### Files Changed
- `src/config/scienceLabFlashcards.ts` — `getTopicTestItems()`: structured sections, Quick Check cap, shuffle within sections
- `src/utils/storage.ts` — `updateTopicTestCompletion()`: accepts `marksEarned` and `totalMarks` (was `correctCount`, `totalCount`)
- `src/pages/science/ScienceLabTopicTestPage.tsx` — marks-based scoring, Method Mark integration, mark scheme feedback, command words, optional timer, updated summary and CTAs (Back to Topics, Review in Flashcards, Try Method Mark)

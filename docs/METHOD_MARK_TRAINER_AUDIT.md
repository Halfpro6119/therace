# Method Mark Trainer — Full Audit & Improvement Plan

**Date:** February 14, 2025  
**Status:** ✅ **IMPLEMENTED** (February 2025)  
**Scope:** Science Lab Method Mark Trainer (`ScienceLabMethodMarkPage.tsx`)  
**Purpose:** Help students master 4–6 mark questions by understanding idea/method/precision mark structure and avoiding common penalties.

---

## 1. Executive Summary

The Method Mark Trainer is **currently ineffective and disconnected from its purpose**. It presents a mark breakdown and lets students tick checkboxes, but:

- **No answer writing** — Students never write a response
- **"Check Your Marks" does nothing** — The button toggles state but no feedback is rendered
- **Self-assessment without evidence** — Ticking "I identified the concept" is guesswork without actually answering
- **Generic data for most questions** — 12 of ~35+ 4–6 mark questions have real breakdowns; the rest use a meaningless generic fallback
- **No link to practice** — Question Lab grades answers but doesn't use method mark breakdowns; Method Mark Trainer doesn't lead to Question Lab

**Verdict:** The trainer fails to deliver its intended value. Students cannot learn "where marks are lost" because there is no grading against the breakdown and no writing practice.

---

## 2. Intended Purpose (from Design Docs)

From `FULLY_AUTONOMOUS_GRADE_9_DESIGN_AND_FUNCTIONAL_PLAN.md`:

> **Method Mark Trainer** — For 4–6 mark questions: break down into idea/method/precision marks; **show where marks are lost**

From `SCIENCE_LAB_AUDIT.md`:

> Strengthen weak areas (Method Mark, Practical, Equation, Misconception) — for students who have passed Quick Check and unlocked Question Lab

**Learning objective:** Students should be able to:
1. Understand how 4–6 mark questions are marked (idea vs method vs precision)
2. Write answers that hit each mark point
3. See which marks they got and which they missed
4. Avoid common examiner penalties

---

## 3. Current Implementation Audit

### 3.1 User Flow (What Actually Happens)

1. Student selects subject/paper/tier and enters Method Mark Trainer
2. Sees list of 4–6 mark questions, picks one
3. Sees question text + mark breakdown (idea marks, method marks, precision marks, common penalties)
4. **Ticks checkboxes** next to each mark point — e.g. "Identifies correct concept ✓"
5. Clicks **"Check Your Marks"**
6. **Nothing meaningful happens** — button label changes to "Hide Feedback" but no feedback is rendered

### 3.2 Critical Bugs

| Issue | Severity | Description |
|-------|----------|-------------|
| **Check Your Marks is a no-op** | Critical | `showFeedback` toggles but there is no conditional UI that shows when `showFeedback === true`. The student gets no feedback at all. |
| **No answer input** | Critical | Student never writes an answer. Method marking requires comparing a *written response* to the mark scheme. |
| **Checkboxes are meaningless** | High | Self-ticking "did I include this?" without writing first is guesswork. No validation of the ticks. |
| **Generic fallback for most questions** | High | `FALLBACK_BREAKDOWN` is used when `getMethodMarkBreakdown(questionId)` returns `undefined`. 12 questions have real breakdowns; ~23+ 4–6 mark questions get the same generic "Identifies correct concept", "Shows working/calculation", etc. |

### 3.3 Data Coverage

| Metric | Count |
|--------|-------|
| 4–6 mark questions in `SCIENCE_QUESTIONS` | ~35+ |
| Questions with `METHOD_MARK_BREAKDOWNS` | 12 |
| Questions with real breakdown | ~34% |
| Questions with generic fallback | ~66% |

**Breakdowns exist for:**
- `bio-immune-001`, `bio-blood-glucose-001`, `bio-evolution-001`, `bio-carbon-cycle-001`
- `bio-photosynthesis-002`, `bio-enzyme-002`, `chem-greenhouse-001`
- `bio-grade9-stem-cells-001`, `bio-grade9-bioaccumulation-001`, `bio-grade9-photosynthesis-respiration-001`, `bio-grade9-evolution-001`, `bio-grade9-immune-001`

### 3.4 Disconnect from Question Lab

- **Question Lab** (`ScienceLabQuestionLabPage.tsx`): Student writes answer → `gradeScienceAnswer()` does keyword/substring matching → binary correct/incorrect. No use of method mark breakdowns, no partial credit.
- **Method Mark Trainer**: Shows breakdown, no answer, no grading.
- **No integration** between the two. Students who "practice" in Method Mark Trainer never actually answer; students who answer in Question Lab never see mark scheme feedback.

### 3.5 What Works (Minor)

- Question-specific breakdowns are well-structured (idea/method/precision + common penalties)
- UI clearly distinguishes "Question-specific mark scheme" vs "Sample mark scheme"
- List of 4–6 mark questions is correctly filtered

---

## 4. Root Cause Analysis

| Root cause | Effect |
|------------|--------|
| **Design confusion** | The UI was built as a "mark scheme viewer" + self-checklist, not a "write answer → get mark-by-mark feedback" flow. |
| **Incomplete implementation** | "Check Your Marks" was never wired to any feedback logic. |
| **Separate modes** | Method Mark and Question Lab were built independently; no shared flow for "attempt question with mark scheme support". |
| **Content gap** | Only 12 questions have breakdowns; adding more was deprioritised. |

---

## 5. Improvement Recommendations

### 5.1 Critical Fixes (Must Do)

#### 1. Add Answer Input & Real Grading

**Current:** No text input.  
**Change:** Add a textarea for the student to write their answer. On "Check Your Marks", grade against the breakdown.

**Implementation options:**
- **Option A (simpler):** Keyword/idea matching per mark point. For each breakdown item (e.g. "White blood cells produce antibodies against antigens"), check if the answer contains key terms. Return which marks obtained.
- **Option B (richer):** Extend `MethodMarkBreakdown` with `keywords` or `requiredPhrases` per mark point, then match against user answer.
- **Option C (AI-assisted):** Use an LLM to assess each mark point against the answer (future enhancement).

**Recommended:** Option B — add optional `keywords: string[]` to each mark point; if present, use them for matching; else fall back to description-based extraction.

#### 2. Implement Actual Feedback When "Check Your Marks" Is Clicked

**Current:** `showFeedback` toggles but nothing renders.  
**Change:** When `showFeedback` is true, show:
- Which marks the student got (e.g. "Idea 1 ✓, Idea 2 ✗, Method 1 ✓")
- Total score (e.g. "4/6")
- What they missed (e.g. "You didn't mention: Links insulin to target organs (liver, muscles)")
- Link to model answer or key phrases to add

#### 3. Only Show Questions With Real Breakdowns (or Clearly Gate)

**Current:** All 4–6 mark questions shown; most use generic fallback.  
**Change:**
- **Option A:** Filter to only questions that have `METHOD_MARK_BREAKDOWNS`. Hide the rest or show "No breakdown available — try Question Lab".
- **Option B:** Two sections: "Train with mark scheme" (12 questions) and "Practice without breakdown" (links to Question Lab).
- **Recommended:** Option A for now — avoid misleading students with generic breakdowns.

### 5.2 High-Value Improvements

#### 4. Plan-Then-Write Flow

Support a two-phase flow:
1. **Plan:** Student reviews breakdown, optionally ticks "I will include: …" as a planning aid
2. **Write:** Student writes answer in textarea
3. **Check:** System grades against breakdown and shows which marks obtained

This aligns with how strong students approach long-form questions.

#### 5. Link to Question Lab

- Add "Attempt this question in Question Lab" link from Method Mark Trainer
- In Question Lab, for 4–6 mark questions with breakdowns, show a collapsible "View mark scheme" that reveals the breakdown (so students can self-check after answering)

#### 6. Extend Mark Scheme Data for Grading

Add to `MethodMarkBreakdown` mark points:

```ts
// Optional: for auto-grading
keywords?: string[];  // e.g. ["antibodies", "antigens", "memory cells"]
```

Then `gradeMethodMarkAnswer(breakdown, userAnswer)` returns `{ obtained: string[], missed: string[], score: number }`.

#### 7. Add More Method Mark Breakdowns

Prioritise adding breakdowns for high-value 4–6 mark questions that currently lack them. Target: cover at least 50% of 4–6 mark questions.

### 5.3 UX Polish

- **Retry flow:** "Try again" or "Improve your answer" after feedback
- **Model answer:** Show model answer with mark points annotated (e.g. highlights for each mark)
- **Progress tracking:** Track which questions the student has attempted and their scores
- **Order by difficulty:** Sort questions by topic or by whether student has attempted them

---

## 6. Proposed New User Flow

```
1. Student enters Method Mark Trainer
2. Sees list of 4–6 mark questions that HAVE real breakdowns (only)
3. Selects a question
4. Sees:
   - Question text
   - Mark breakdown (read-only reference)
   - Textarea: "Write your answer"
   - [Optional] Plan phase: tick what they intend to include
5. Student writes answer
6. Clicks "Check Your Marks"
7. System grades against breakdown (keyword/idea matching per mark point)
8. Feedback shows:
   - Score: "4/6"
   - Marks obtained: Idea 1 ✓, Idea 2 ✓, Method 1 ✗, Method 2 ✓, Precision 1 ✗
   - What you missed: "Add: Links insulin to target organs (liver, muscles)"
   - Common penalties to avoid (if any apply)
9. "Try again" or "Next question"
10. Optional: "Attempt in Question Lab" for more practice
```

---

## 7. Implementation Priority

| # | Task | Effort | Impact |
|---|------|--------|--------|
| 1 | Add textarea + grade against breakdown (keyword matching per mark point) | Medium | Critical |
| 2 | Implement feedback UI when showFeedback is true | Low | Critical |
| 3 | Filter to questions with real breakdowns only | Low | High |
| 4 | Add `keywords` to MethodMarkBreakdown for grading | Medium | High |
| 5 | Add "Try again" / "Next question" flow | Low | Medium |
| 6 | Link to Question Lab | Low | Medium |
| 7 | Add more method mark breakdowns for uncovered questions | High | High |
| 8 | Plan-then-write optional flow | Medium | Medium |

---

## 8. Appendix: File Reference

| File | Purpose |
|------|---------|
| `src/pages/science/ScienceLabMethodMarkPage.tsx` | Method Mark Trainer UI |
| `src/config/scienceLabData.ts` | `METHOD_MARK_BREAKDOWNS`, `getMethodMarkBreakdown` |
| `src/types/scienceLab.ts` | `MethodMarkBreakdown` interface |
| `src/utils/scienceGrading.ts` | `gradeScienceAnswer` (could extend with `gradeMethodMarkAnswer`) |
| `src/pages/science/ScienceLabQuestionLabPage.tsx` | Question Lab (no breakdown integration) |

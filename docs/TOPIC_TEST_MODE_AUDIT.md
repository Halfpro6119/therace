# Science Lab Topic Test Mode — Full Audit

**Purpose:** Audit the topic test mode to identify why it is "useless and confusing" and to define how it should fulfil its purpose: *helping students master entire units of learning like a mini GCSE quiz for one topic/unit*.

---

## Executive Summary

The topic test mode is currently a thin wrapper around the Question Lab with a topic filter. It lacks a clear identity, scoring, mastery tracking, mixed question types, and exam-style structure. Students cannot tell when they are in "topic test" vs "full GCSE test," and the experience does not feel like a focused unit mastery quiz.

**Recommendation:** Redesign topic test as a dedicated "Topic Mastery Quiz" experience with distinct UI, mixed question types, score/summary, mastery tracking, and clear navigation.

---

## 1. Current Implementation

### 1.1 User Flow

1. **Mode page** → User clicks "Topic test" (step 4 of learning path) → Navigates to **Topics page** (`/topics`)
2. **Topics page** → User sees topic list; each topic has a "Topic test" button → Navigates to **Question Lab** with `?topic=X` (`/question?topic=Cell%20Biology`)
3. **Question Lab** → Renders `SCIENCE_QUESTIONS` filtered by topic; open text input; sequential Q&A

### 1.2 Data Sources

| Mode | Data Source | Question Types | Topic Filter |
|------|-------------|----------------|--------------|
| Quick Check | `getQuickChecksByFilters()` (from concepts + misconceptions) | MCQ, T/F, drag order | ✓ |
| Method Mark | `getQuestionsByFilters()` (marks ≥ 4) | 4–6 mark, checkbox mark scheme | ✗ (all topics) |
| **Topic Test** | `getQuestionsByFilters()` | Open text, 3–6 mark | ✓ |
| Full GCSE Test | Same as Topic Test | Same | ✗ (all topics) |

### 1.3 Key Code Paths

- **ScienceLabModePage.tsx**: `handleEnterLab('topicTest')` → `navigate(base + '/topics')`
- **ScienceLabTopicsPage.tsx**: Topic test button → `navigate(base + '/question?topic=' + topic)`
- **ScienceLabQuestionLabPage.tsx**: Uses `topicFilter` from URL; `getQuestionsByFilters(..., topicFilter)`; same UI for topic and full test

---

## 2. Problems Identified

### 2.1 Naming & Identity Confusion

| Issue | Detail |
|-------|--------|
| **No "Topic Test" branding** | Question Lab header says "Question Lab" and "Exam-faithful questions covering every spec point" regardless of topic filter. Users have no indication they are in topic test mode. |
| **Same page, same UI** | Topic test and Full GCSE test share the same component. There is no differentiation in header, progress copy, or completion flow. |
| **Indirect entry** | "Topic test" in the learning path sends users to the Topics page first. They must then choose a topic and click "Topic test" again. Two steps instead of one clear action. |

### 2.2 Missing "Mini GCSE Quiz" Features

A mini GCSE quiz for one topic should:

| Expected | Current | Gap |
|----------|---------|-----|
| **Score / summary at end** | None | No % correct, marks earned vs total, or performance feedback. |
| **Mixed question types** | Only open-ended `SCIENCE_QUESTIONS` | No Quick Check–style recall (MCQ, T/F, drag order). No Method Mark–style practice. |
| **Exam-style structure** | Flat list | No mix of 1–2 mark recall, 3 mark explanation, 4–6 mark extended. |
| **Topic mastery tracking** | None | Completion and score are not stored. `storage.updateTopicMastery` is never called from Question Lab. |
| **Progress persistence** | None | Leaving mid-test loses progress; no resume. |
| **Clear completion CTA** | "Return to Lab Modes" | No "Back to topic" or "Try another topic." No suggestion to review weak areas. |

### 2.3 Learning Path Disconnect

- **Recommended next step** (Mode page) never suggests `topicTest`. It only suggests: flashcards, quickCheck, or methodMark.
- Topic test is step 4 but is never surfaced as the recommended action.
- No link from topic test completion back into the learning path (e.g. "Unlock next topic" or "Retry this topic").

### 2.4 Navigation Issues

| From | Current back/completion action | Issue |
|------|-------------------------------|-------|
| Topic test (via Topics page) | "Back to Lab Modes" | Breaks flow; should offer "Back to Topics" when in topic mode. |
| Topic test completion | "Return to Lab Modes" | Should offer "Back to topic" or "Try another topic." |

### 2.5 Method Mark Excludes Topic Filter

- Method Mark uses `getQuestionsByFilters(subject, paper, tier)` — no topic parameter.
- "Bigger tests" (Method Mark) always shows all topics.
- Topic test cannot include Method Mark–style 4–6 mark questions in a structured way.

### 2.6 Data & Coverage

- **SCIENCE_QUESTIONS**: Open-ended only; mix of 3–6 marks.
- **Quick Checks**: Generated from concepts + misconceptions; MCQ, T/F, drag order.
- **Topic test uses only SCIENCE_QUESTIONS** — ignores Quick Check pool.
- Some topics may have few or no `SCIENCE_QUESTIONS`; topic test could be empty or very short.

---

## 3. What a Proper Topic Test Should Be

### 3.1 Purpose

> A **mini GCSE quiz for one topic/unit** that:
> 1. Tests recall, understanding, and application across the whole unit
> 2. Feels like a focused exam-style assessment
> 3. Gives a clear score and feedback
> 4. Feeds into mastery and the learning path

### 3.2 Target Experience

1. **Entry**
   - Clear "Topic Test" mode from learning path and Topics page.
   - Optional: direct entry to a topic test for a chosen topic from the mode page.

2. **During test**
   - Header: "Topic Test: [Topic Name]" (e.g. "Topic Test: Cell Biology").
   - Mixed question types:
     - Quick recall (1–2 mark): MCQ / short answer (from Quick Check or derived)
     - Medium (3 mark): explanation (from `SCIENCE_QUESTIONS`)
     - Extended (4–6 mark): Method Mark style (from `SCIENCE_QUESTIONS` where available)
   - Progress: "Question 3 of 12" with optional marks count.
   - Optional: timer per question or total (GCSE-style).

3. **Completion**
   - Summary: "You scored 8/12 (67%) — 24/36 marks."
   - Simple breakdown: correct vs incorrect.
   - Update topic mastery (e.g. `topicTestCompleted`, `topicTestScore`).
   - CTAs: "Back to topic," "Try another topic," "Review mistakes."

4. **Mastery integration**
   - Store completion and score in `TopicMastery` or equivalent.
   - Use to drive "Recommended next step" (e.g. suggest topic test when ready).
   - Optionally gate or highlight next steps (e.g. Full GCSE test) by topic mastery.

---

## 4. Recommended Changes

### 4.1 Phase 1 — Quick Wins (Low Effort)

1. **Differentiate Topic Test vs Full GCSE in Question Lab**
   - When `?topic=X` is present: change header to "Topic Test: [Topic Name]".
   - Add a subheader: "Mini quiz for [Topic] — master this unit."

2. **Contextual Back / Completion navigation**
   - When in topic mode: "Back" → Topics page; completion → "Back to Topics" + "Try another topic."

3. **Add basic score at completion**
   - Track correct/incorrect per question; show "X of Y correct" and optional % at end.

### 4.2 Phase 2 — Core Improvements (Medium Effort)

4. **Combined question pool for topic test**
   - `getTopicTestQuestions(subject, paper, tier, topic)` that returns:
     - Quick Check questions for that topic
     - `SCIENCE_QUESTIONS` for that topic
   - Shuffle and present as one mixed quiz (optionally weighted by type).

5. **Topic test completion → storage**
   - Extend `TopicMastery` (or add) with `topicTestCompleted`, `topicTestScore`, `topicTestLastAttempt`.
   - Call from Question Lab when in topic mode and test is completed.

6. **Include topic filter in Method Mark**
   - Add `topic` param to `getQuestionsByFilters` usage in Method Mark.
   - Allow "Bigger tests" for a single topic when launched from topic context.

### 4.3 Phase 3 — Full Redesign (Higher Effort)

7. **Dedicated Topic Test page/flow**
   - Separate route: `/topic-test?topic=X` or `/topics/:topic/test`.
   - Own component: `ScienceLabTopicTestPage` with:
     - Topic-specific header and copy
     - Mixed question types (Quick Check + SCIENCE_QUESTIONS)
     - Score and summary
     - Mastery update and contextual navigation

8. **Recommended next step includes topic test**
   - When flashcard/quick check/mastery suggest readiness: recommend "Topic test" for that topic.

9. **Optional: progress persistence**
   - Save in-progress topic test state (e.g. question index, answers) so users can resume.

---

## 5. File-Level Impact

| File | Changes |
|------|---------|
| `ScienceLabQuestionLabPage.tsx` | Topic-mode header, back/completion nav, score summary, optional mastery update |
| `ScienceLabTopicsPage.tsx` | Ensure topic param is passed correctly; optional copy updates |
| `ScienceLabModePage.tsx` | Include topic test in recommended next step logic |
| `scienceLabData.ts` | Optional: `getTopicTestQuestions()` helper |
| `scienceLabFlashcards.ts` | `getQuickChecksByFilters` already supports topic — reuse |
| `storage.ts` | Extend topic mastery schema for topic test completion/score |
| `App.tsx` | Optional: dedicated topic test route |
| `scienceLab.ts` (types) | Optional: `TopicMastery` extensions |

---

## 6. Success Criteria

Topic test mode will be successful when:

1. **Identity**: Users clearly see "Topic Test: [Topic]" and understand it is a focused unit quiz.
2. **Experience**: Test includes mixed question types (recall + explanation + extended) appropriate to the topic.
3. **Feedback**: Users receive a score and simple summary at the end.
4. **Mastery**: Completion and score are stored and influence the learning path.
5. **Navigation**: Back and completion actions return users to the topic context (Topics page / topic detail) rather than only "Lab Modes."

---

## 7. Summary

| Category | Current | Target |
|----------|---------|--------|
| **Identity** | Same as Full GCSE; no topic branding | Clear "Topic Test: [Topic]" header and copy |
| **Questions** | Open-ended only | Mixed: recall (Quick Check) + explanation + extended |
| **Score** | None | Score and summary at completion |
| **Mastery** | Not tracked | Completion and score stored in topic mastery |
| **Navigation** | Back to Lab Modes | Back to Topics; contextual completion CTAs |
| **Learning path** | Never recommended | Suggested when user is ready for topic assessment |

Implementing Phase 1 and 2 will materially improve the topic test experience; Phase 3 will make it a true "mini GCSE quiz" for each unit.

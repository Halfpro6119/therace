# Core Learning Loops – Audit & Fixes

This document summarizes the stress-test of the three major loops (Maths quiz, English writing, Progress/mastery) and the fixes applied.

---

## STEP 1: LOCK THE CORE USER JOURNEYS

### A) Maths Loop – Fixes Applied

**Critical bug fixed: MasteryState, XP, and streak were never updated after quiz completion.**

- **Root cause**: `storage.updateMasteryState()` was never called anywhere in the codebase. ResultsPage showed mastery chip and personal best, but these were always undefined.
- **Fix**: In `QuizPlayerPage.endQuiz()`, after saving the attempt, we now:
  1. Compute MasteryState from all attempts for this quiz (best accuracy, best time, mastery level)
  2. Call `storage.updateMasteryState()` with the computed state
  3. Call `storage.addXP(correctIds.size * 5)` for XP gains
  4. Call `storage.updateStreak()` for streak tracking
  5. Call `storage.updateProfile()` for totalQuizzes and totalTimeMinutes

**Maths flow checklist:**

| Step | Path | Status |
|------|------|--------|
| 1 | Home → Maths Mastery → Maths Hub | ✓ |
| 2 | Choose tier (Higher/Foundation) → Paper (1–3) | ✓ |
| 3 | Choose mode (Full paper / Topic practice) | ✓ |
| 4 | Start quiz → QuizPlayerPage | ✓ |
| 5 | Answer questions, submit | ✓ |
| 6 | Finish quiz → ResultsPage | ✓ |
| 7 | Retry (Run It Back) / Fix-It Drill (missed only) | ✓ |
| 8 | Progress updates (mastery, XP, streak) | ✓ **Fixed** |

**What to verify:**

- [ ] No "nothing happens" moments
- [ ] Clear feedback every time (correct/wrong, sounds, animations)
- [ ] Results screen always appears after quiz completion
- [ ] Paper/tier separation correct (Higher vs Foundation prompts)
- [ ] Diagrams load consistently
- [ ] Calculator rules respected (shown only when allowed)
- [ ] Fix-It Drill only shows missed questions from last attempt
- [ ] Mastery chip and Personal Best appear on ResultsPage after first attempt

---

### B) English Writing Loop – Fixes Applied

**Added "Improve this draft" button** on the result page after feedback is saved, so students can go straight back to the writing workspace to edit and resubmit.

**English flow checklist:**

| Step | Path | Status |
|------|------|--------|
| 1 | Home → English Campus → Language Mode | ✓ |
| 2 | Choose Paper 1 or 2 | ✓ |
| 3 | Start a task from task bank | ✓ |
| 4 | Write response | ✓ |
| 5 | Open checklist (Top Band Coverage) | ✓ |
| 6 | View mark scheme | ✓ |
| 7 | View model answers (placeholder for now) | ✓ |
| 8 | Submit for marking | ✓ |
| 9 | Choose Self-mark or AI examiner (simulated) | ✓ |
| 10 | Improve and resubmit | ✓ **Added** |

**What to verify:**

- [ ] Writing experience feels calm and focused
- [ ] Checklists are genuinely helpful
- [ ] Model answers feel aspirational (currently placeholder)
- [ ] AI feedback (simulated) feels examiner-like, not generic
- [ ] "Improve this draft" works cleanly (opens workspace with draft loaded)

---

### C) AI Feedback Prompt Guidelines

Created `docs/ENGLISH_AI_FEEDBACK_PROMPT_GUIDELINES.md` with:

- Band-level assessment rules
- AO breakdown (AO5/AO6)
- Strengths format (specific, evidence-based)
- Targets format (actionable, explain why not just what)
- Rewrite suggestions
- Tone guidelines (examiner-like)
- Example good vs bad targets

Use this when integrating the real AI API.

---

## STEP 2: VALIDATE MARKING & FEEDBACK

**Maths**

- Marks use centralized `submitAnswerPipeline` → `gradeFromRenderer`
- Partial marks: check question engine for multi-mark questions
- Fix-It questions: filtered from `lastAttempt.missedPromptIds`

**English**

- AI bands (simulated): sample feedback in `handleAISimulate()`
- Targets: stored in `storage.englishTargets`, shown on result page
- Feedback explains strengths + targets (use prompt guidelines for real API)

---

## STEP 3: MINIMUM WOW EXPERIENCE

**Maths WOW**

- Clean quiz completion with progress bar and answer slots
- Visual progress (mastery chip on ResultsPage)
- Fix-It mode feels smart (only missed questions)

**English WOW**

- Checklist completion feels like levelling up (% coverage)
- Model answer comparison (placeholder – add content later)
- Draft improvement flow (Improve this draft → edit → resubmit)

---

## Files Changed

1. **`src/pages/QuizPlayerPage.tsx`** – MasteryState, XP, streak, profile update in `endQuiz()`
2. **`src/pages/english/EnglishLanguageResultPage.tsx`** – "Improve this draft" button and `savedDraftId` state
3. **`docs/ENGLISH_AI_FEEDBACK_PROMPT_GUIDELINES.md`** – New file
4. **`docs/CORE_LOOPS_AUDIT.md`** – This file

---

## Manual Test Plan

1. **Maths**: Go to Maths Hub → choose Higher Paper 1 → Full paper → Start. Answer a few questions (some correct, some wrong or skip). End quiz. Confirm ResultsPage shows mastery chip, stats, Fix-It Drill. Run Fix-It Drill. Confirm it only shows missed questions.
2. **English**: Go to English Campus → Language → Paper 1 → Start "Describe a busy market". Write a short response. Open checklist, tick a few. Submit for marking. Choose AI examiner. Confirm feedback saved. Click "Improve this draft". Confirm workspace opens with your content. Edit and submit again.
3. **Progress**: After Maths quiz, check Profile for XP and streak. Confirm mastery chip on ResultsPage.

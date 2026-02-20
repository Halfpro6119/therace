# Student Progress & Engagement Plan

**Purpose:** Make students *feel* their progress, see clear test results, and always know what to do next. Design for easy, addictive progression that keeps learners coming back.

**Date:** 13 February 2025

---

## 1. Design Principles

| Principle | Meaning |
|-----------|---------|
| **Visible progress** | Every action moves a visible needle. No "black box" effort. |
| **Micro-wins** | Celebrate small victories constantly. One more question, one more topic, one more day. |
| **Zero ambiguity** | One clear "Next Action" at all times. Never "what should I do?" |
| **Test clarity** | During and after tests: always know where you stand. |
| **Addictive loop** | Streaks, XP, milestones, and "just one more" moments. |
| **Progress storytelling** | "You've come from X to Y" — show the journey. |

---

## 2. The "Next Action" System

### 2.1 Single Primary CTA on Home

**Current gap:** Home shows multiple options (Start Today's Sprint, Continue, Fix-It Drill, Explore subjects) with no clear priority. Students can feel paralysed.

**Solution: "Your Next Sprint" — One Hero Recommendation**

Replace the current multi-button layout with a **single, smart, personalised recommendation** that changes based on context:

| Priority | Condition | Recommended Action | CTA Label |
|----------|------------|---------------------|-----------|
| 1 | Has missed questions from recent attempts | Fix-It Drill | "Fix Your Mistakes" |
| 2 | Streak at risk (no activity today) | Any quick quiz | "Save Your Streak" |
| 3 | Has unfinished quiz (resumable) | Continue last quiz | "Continue [Quiz Name]" |
| 4 | Has weak spots (mastery 1–2) | Weakest quiz | "Strengthen [Topic]" |
| 5 | Has unseen quizzes | First unseen | "Try [Quiz Name]" |
| 6 | Needs speed (100% accuracy, over time) | Speed-target quiz | "Beat Your Time" |
| 7 | Default | Today's Sprint / Daily Challenge | "Start Today's Sprint" |

**Implementation:**
- Create `getNextAction()` in `subjectStats.ts` (or new `nextAction.ts`) that returns `{ action, label, href, reason, urgency }`
- Home hero section: one large primary button that uses this
- Secondary row: "Or explore" → Subjects, Discover, Profile

### 2.2 "What to Do Next" After Every Milestone

| After | Show |
|-------|------|
| **Quiz complete** | Results page → prominent "What's Next?" with 2–3 options: Run It Back, Fix-It Drill, Recommended Next Quiz |
| **Topic mastered** | Toast + "3 more topics to master [Subject]" or "You've mastered [Subject]! Try [Next Subject]" |
| **Streak saved** | "Streak saved! 5 more minutes to level up?" (optional quick quiz) |
| **Level up** | Level-up modal → "Keep going — you're X XP from next level" |
| **Fix-It complete** | "All fixed! Ready for a new challenge?" → Recommended quiz |

### 2.3 Persistent "Next" in App Shell

- **Floating pill** or **top bar**: "Next: [Action]" with one tap to start
- Updates after every completed action (quiz, drill, etc.)
- Tapping opens the relevant quiz/page directly

---

## 3. Test Progress Visibility

### 3.1 During the Quiz

| Element | Current | Improvement |
|---------|---------|-------------|
| **Progress bar** | ✅ Exists (solved/total) | Add: "Question 7 of 20" + percentage; animate fill on each correct |
| **Question dots** | Partial (QuizNavigation) | Full dot strip: green = correct, orange = current, grey = pending; tap to jump |
| **Time** | Timer exists | Add: "Grade 9 target: X min" when relevant; show if ahead/behind |
| **Marks** | Sometimes shown | Always show "X marks" per question; running total "Marks so far: Y" |
| **Combo/streak** | ComboTracker exists | Make more prominent; "5 in a row!" micro-celebration |
| **Exit** | Can exit | "Save & exit" — resume later; show "X questions left" |

### 3.2 After the Quiz (Results Page)

| Element | Current | Improvement |
|---------|---------|-------------|
| **Accuracy** | ✅ Shown | Add: "Up from last time" or "Personal best!" when applicable |
| **Time** | ✅ Shown | Add: "X sec faster than last" or "X sec under Grade 9 target" |
| **Mastery chip** | ✅ Shown | Add: "1 more attempt to master" or "Mastered!" with confetti |
| **Question breakdown** | Correct/missed list | Visual: green/red per question; "Tap to review" |
| **Progress vs previous** | Partial | Side-by-side: This attempt vs Last attempt (accuracy, time) |
| **Next steps** | Run It Back, Fix-It | Add: "Recommended next: [Quiz]" with one tap |

### 3.3 Over Time (Progress Dashboard)

| View | What to Show |
|------|--------------|
| **Subject heatmap** | Per-quiz mastery: green (mastered), yellow (learning), grey (unseen) |
| **Accuracy trend** | Line chart: accuracy over attempts for a quiz or subject |
| **Time trend** | "Getting faster" — time per attempt over time |
| **Test history** | List of attempts with date, quiz, accuracy, time; tap to see details |
| **Spaced review queue** | "3 items due today" — concepts to re-test (from design plan) |

---

## 4. Making Progress Feel Tangible

### 4.1 Progress Bars Everywhere

| Location | What It Shows |
|----------|---------------|
| **Home** | Overall Grade 9 Readiness (existing) + "X% to next milestone" |
| **Subject card** | Mastered X / Y quizzes (existing) + "3 more to 50%" |
| **Quiz list** | Per-quiz: mastery level (0–4) with label |
| **Profile** | Level progress: "Level 7 — 45/100 XP to Level 8" |
| **Topic/hub** | Section completion: "Unit 1: 80% | Unit 2: 20%" |

### 4.2 Milestone Celebrations

| Milestone | Celebration |
|-----------|-------------|
| First quiz complete | "First sprint done! 🎉" + XP popup |
| 5 correct in a row | Combo popup (existing) + optional sound |
| Quiz mastered (level 4) | "Mastered!" badge + confetti |
| 10 quizzes mastered | "10 down!" toast |
| Streak: 3 days | "3-day streak! 🔥" |
| Streak: 7 days | "One week! You're on fire!" |
| Level up | Level-up modal (existing) |
| Subject 100% | "Subject complete! 🏆" |
| Fix-It complete | "All fixed! 💪" |

### 4.3 "Progress Story" Moments

- **Weekly digest** (optional): "This week you mastered 3 topics and added 2 days to your streak"
- **Returning user**: "Welcome back! Last time you were working on [Quiz]. Pick up where you left off?"
- **Before exam**: "You've completed X% of the spec. Y topics left to review."

---

## 5. Addictive Progression Mechanics

### 5.1 Variable Reward Schedule

| Mechanic | Implementation |
|----------|----------------|
| **XP on every correct** | Already exists (5 XP per correct) |
| **Bonus XP** | Combo bonus (e.g. +5 for 5 in a row), first-attempt bonus, speed bonus |
| **Streaks** | Daily streak (existing); consider "quiz streak" (quizzes per day) |
| **Badges** | Existing; add more: "Night owl" (quiz after 9pm), "Early bird", "Weekend warrior" |
| **Levels** | Existing; ensure level-up feels significant (modal, sound) |
| **Unlockables** | "Unlock [Subject] by mastering [Prerequisite]" (optional) |

### 5.2 "Just One More" Hooks

| Hook | Where |
|------|-------|
| "5 more XP to level up" | After quiz, if close |
| "1 more question to save your streak" | If no activity today |
| "You're 1 quiz away from 50% [Subject]" | Subject card |
| "Fix-It: 3 questions, ~2 min" | After quiz with misses |
| "Beat your time: last was 4:32" | Quiz intro for retry |

### 5.3 Reduce Friction to Start

| Friction | Fix |
|---------|-----|
| Too many choices | Single "Next Action" (see §2) |
| Long quiz intimidating | "Quick Sprint" — 5 questions, any topic |
| Don't know what to pick | "Recommended for you" always visible |
| Forgot where they were | "Continue" always shows last activity |
| Cold start (new user) | Onboarding: "Start with Maths Paper 1" or diagnostic |

### 5.4 Social Proof (Optional)

- "X students mastered this today"
- "You're in the top 10% for speed on this quiz"
- Anonymous leaderboard by school/cohort
- Share card: "I just mastered [Quiz]!" (existing ShareCardModal)

---

## 6. Implementation Roadmap

### Phase 1: "Next Action" & Home Clarity (High Impact, Medium Effort)

1. **`getNextAction()`** — Central logic for recommended action
2. **Home hero** — Replace multi-CTAs with single smart "Your Next Sprint" button
3. **Results page** — Add "What's Next?" section with 2–3 options
4. **Persistent Next pill** — In AppShell or floating; one tap to start

### Phase 2: Test Progress Clarity (High Impact, Low–Medium Effort)

1. **Quiz progress** — Enhance progress bar, add question dots, time vs target
2. **Results page** — Add "vs last attempt", "X more to master", recommended next
3. **Subject heatmap** — Per-quiz mastery grid (may exist in SubjectBreakdownDetail)

### Phase 3: Celebrations & Micro-Wins (Medium Impact, Low Effort)

1. **Milestone toasts** — First quiz, 5 in a row, mastered, streak milestones
2. **Progress copy** — "3 more to 50%", "45 XP to next level"
3. **Bonus XP** — Combo, first-attempt, speed bonuses

### Phase 4: Progress Storytelling (Medium Impact, Medium Effort)

1. **Weekly digest** — Optional email or in-app summary
2. **Returning user** — "Welcome back" with last activity
3. **Trend charts** — Accuracy and time over attempts

---

## 7. Quick Wins (Can Ship Immediately)

| Win | Effort | Impact |
|-----|--------|--------|
| Add "What's Next?" to Results page with Run It Back, Fix-It, Recommended | Low | High |
| Home: surface `getRecommendedQuiz` for "Continue" when no last attempt | Low | Medium |
| Add "X more to master" to MasteryChip on Results | Low | Medium |
| Add "Recommended Next Sprint" to Home (from Discover logic) | Medium | High |
| Progress bar label: "7 of 20" during quiz | Low | Medium |
| Toast on quiz complete: "Sprint complete! +X XP" | Low | Medium |

---

## 8. Copy Guidelines

- **Never punitive**: "Let's fix these" not "You got these wrong"
- **Always forward-looking**: "Next: strengthen quadratics" not "You're weak at quadratics"
- **Celebrate effort**: "You showed up!" even for low scores
- **Concrete numbers**: "3 more quizzes" not "keep going"
- **Urgency when helpful**: "Save your streak — 1 quiz to go" (not guilt-trippy)

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Time to first action (from app open) | < 10 seconds |
| "What should I do?" support tickets | Near zero |
| Sessions per week (returning users) | Increase |
| Quiz completion rate | Maintain or increase |
| Fix-It Drill usage (when applicable) | > 50% of users with misses |
| NPS / qualitative feedback | "I always know what to do next" |

---

## 10. Alignment with Existing Design

This plan extends (does not replace) the existing design in `FULLY_AUTONOMOUS_GRADE_9_DESIGN_AND_FUNCTIONAL_PLAN.md`:

- **§3A Emotional & Motivational Design** — Growth mindset, mastery framing, celebration, autonomy
- **§3 Cross-Cutting: Progress & Motivation** — Mastery per topic, XP, streaks, badges
- **Smart Study Path** — Gap analysis, adaptive pacing, Spaced Review Queue
- **DiscoverPage** — Weak spots, unseen, in-progress, Grade 9 targets

The new "Next Action" system surfaces Discover-style logic on Home so students don't need to navigate to Discover to get recommendations. Discover remains the "explore" destination for users who want choice.

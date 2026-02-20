# Full Site Audit — Simple, Fun, Addictive Past-Paper Learning

**Date:** February 2025  
**Goal:** Make the site a **simple and fun, addictive way to learn** using the **most powerful revision method: completing past paper questions.**  
**Implementation:** Recommendations 1–7 implemented: Science Lab → XP & streak; Continue Science Lab on SubjectsPage; Profile Grade 9 readiness includes Science Lab (combined % + label); grade celebrations (Grade 7/9, Grade 9 ready); Study Path suggests "Past-paper practice — Science Lab" when exam date set; Discover subtitle "Past-paper practice and exam-style questions".

---

## Executive Summary

| Pillar | Current state | Target |
|--------|----------------|--------|
| **Past paper first** | Partially done: Science Lab puts Topic test & Full GCSE first; DB subjects (Maths, etc.) are quiz-based, not framed as “past paper”. | Every subject path leads to **do questions → get marks → see grade** as the core loop. |
| **Simple** | Many hubs, two learning systems (DB vs Science Lab), 10+ featured hubs, Paper/Tier before action, Mode vs Topics entry. | One clear path per subject; fewer decisions; “Continue” from last activity. |
| **Fun & addictive** | Streak + XP + combos only in **Quiz Player** (DB). Science Lab (your main past-paper experience) **does not award XP or update streak**. | All question-based activity (Science Lab topic test, full GCSE, flashcards completion) feeds streak and XP; celebrations on grade milestones. |
| **Design** | Consistent theme (Grade9 Sprint, brand.ts); some duplication (e.g. “Think…” / type-to-reveal in flashcard). | Cohesive, minimal UI; no dead or duplicate flows. |

**Bottom line:** The best past-paper experience (Science Lab) is already “past-paper first” and has grade mapping, but it is **disconnected from the gamification** that makes the rest of the site sticky. The **landing experience** does not surface “do past paper questions” or “Continue Science Lab”; Science Lab progress is computed in code that lives in **HomePage**, which is **not used** in routing (root is SubjectsPage).

---

## 1. Current Architecture

### 1.1 Entry Points

| Route | What users see |
|-------|----------------|
| `/` (SubjectsPage) | “Your Subjects”, Study Path Dashboard (if exam date set), **4 featured hub cards** (English, Maths, Science Lab, Business), Chosen Subjects, Languages, Quick Tips. **No “Continue” or Science Lab progress.** |
| `/subjects/:subjectId` | DB subject: Units/Topics, tier filter, create/play quiz (past-paper-style prompts from DB). |
| `/science-lab` | Triple (Bio/Chem/Physics) + Combined Science. Click subject → **Topics** (Paper 1 Higher). |
| `/science-lab/:subject/1/higher/topics` | Topic map, “Start topic test”, Full GCSE, “Work on All Topics” (back to Mode page). |
| `/science-lab/:subject/:paper/:tier` (Mode) | Test path (Topic test, Full GCSE), Revise (flashcards, quick check), Extra (Practical, Equation, Misconception). |

**Finding:** The **root is SubjectsPage**, not HomePage. `HomePage.tsx` contains the Science Lab progress card and “Continue Science Lab” but is **never rendered** (no route points to it). So Science Lab progress and “Continue” are effectively **invisible** to users.

### 1.2 Two Learning Systems

| System | Content | Past-paper framing | Gamification (XP / streak) |
|--------|---------|--------------------|-----------------------------|
| **DB (Quiz Player)** | Prompts from DB; quiz by topic/unit. Timed, focus mode, speedrun, combos. | Framed as “quiz” / “Daily Challenge”; not explicitly “past paper questions”. | ✅ XP, streak, combos, level. |
| **Science Lab** | Config-driven: topic tests (marks, method marks), full GCSE papers, flashcards, quick checks, practical/equation/misconception. | ✅ Explicit: “Past-paper-style tests grade you accurately”, grade mapping (70/80/90% → G4/7/9). | ❌ **No XP, no streak update.** |

Only `QuizPlayerPage` calls `storage.addXP()` and `storage.updateStreak()`. Science Lab topic test, full GCSE, and flashcard completion do **not**.

### 1.3 Where Past Paper Questions Live

- **Science Lab:** `ScienceLabTopicTestPage`, `ScienceLabPaperTestPage` — real mark schemes, method marks, grade mapping. This is the **strongest** past-paper experience.
- **DB:** `QuizPlayerPage` — prompts are question-like; no marks-based grading or grade equivalence; “correct/incorrect” and mastery levels.
- **Other hubs:** History/Geography/Psychology/etc. have “Question Lab” or similar; vary in how exam-like they are.

So “most powerful method = past paper questions” is **best delivered in Science Lab**, but that path does not contribute to the global “addictive” loop (streak, XP, level).

---

## 2. Simplicity Audit

### 2.1 Navigation and Decisions

| Issue | Impact |
|-------|--------|
| **10 featured hubs** on Subjects | Choice overload; no single “start here for past papers”. |
| **Paper & Tier** before doing anything in Science Lab | Extra step (partially mitigated by defaulting to Paper 1 Higher from subject card). |
| **Mode page vs Topics page** | Two ways in: subject card → Topics; “Work on All Topics” → Mode. Copy says “Back to Lab Modes” from Topics. Still two mental models. |
| **No global “Continue”** | Science Lab “Continue” exists only in unreachable HomePage. SubjectsPage has no “Continue Science Lab” or “Pick up where you left off”. |
| **Study Path Dashboard** | Only shows when `studyPath` is set (exam date etc.); many users never see it. |

### 2.2 Redundancy and Dead Code

| Item | Recommendation |
|------|----------------|
| **HomePage not routed** | Either use it as the real home (e.g. `/` → HomePage) so Science Lab progress and Continue appear, or move Science Lab summary + Continue onto SubjectsPage and remove/deprecate HomePage. |
| **Quick Check** | Standalone page + inline in Learn. Keep inline; “Review quick checks” as optional revision is enough. |
| **Method Mark** | Folded into topic test (4–6 mark); standalone Method Mark page is extra. Could keep as “focused 4–6 mark practice” or remove from main nav. |
| **Question Lab / Concept Lab** | Redirects to topic-test exist; routes still in App. Fine as redirects; ensure no prominent nav to them. |

### 2.3 Clarity of “What to do next”

- **Science Lab Mode page:** “Recommended” step (topic test → full GCSE → flashcards when due) is clear and past-paper first.
- **Science Lab Topics page:** “Start topic test (past-paper style)” is prominent; good.
- **SubjectsPage:** No “Do past paper questions” or “Continue” — just “Choose a subject” and hub cards. Missing a single, obvious next action for returning or goal-oriented users.

---

## 3. Fun & Addictive Audit

### 3.1 What Already Works

- **Streak** (header, Profile): Visible; encourages daily use.
- **XP + Level** (header, Profile): Progress feel.
- **Quiz Player:** XP per correct answer, streak update on completion, combos, focus/speedrun, sounds. Strong feedback loop.
- **Science Lab:** Grade mapping (G4/7/9), “Grade 9 ready”, topic test completion, paper pass. Good **learning** feedback; no **game** feedback.

### 3.2 Gaps

| Gap | Where | Fix |
|-----|--------|-----|
| **Science Lab gives no XP** | Topic test, full GCSE, flashcard session | Award XP on topic test completion, paper pass, and optionally per flashcard session; call `storage.addXP(...)`. |
| **Science Lab doesn’t update streak** | All Science Lab activity | Call `storage.updateStreak()` on meaningful completion (e.g. topic test done, paper passed, or flashcard session completed). |
| **No celebration for Science Lab grades** | Topic test / paper completion | Short celebration (e.g. confetti or badge) for “Grade 7” / “Grade 9” or “Grade 9 ready” to mirror the “fun” of XP popups in Quiz. |
| **Profile “Grade 9 Readiness” ignores Science Lab** | ProfilePage | Currently from DB mastery only. Include Science Lab (e.g. topic tests + full GCSE) in a combined readiness % or separate “Science Lab progress” so the main number reflects all work. |
| **Landing doesn’t invite “Continue”** | SubjectsPage | Add Science Lab progress + “Continue” (reuse `getScienceLabProgressSummary` + `continueHref`) so one tap continues past-paper practice. |

### 3.3 Addictive Loop (Target)

1. **Landing:** “Continue: Biology — Topic test Cell biology” or “3 cards due” (if Science Lab progress exists).
2. **Do questions:** Topic test or full GCSE → see marks and grade (G4/7/9).
3. **Reward:** XP awarded, streak updated, optional short celebration for grade milestones.
4. **Profile:** Single “Grade 9 readiness” (or clear Science Lab + DB breakdown) so progress feels unified.

---

## 4. Design Audit

### 4.1 Consistency

- **Brand:** `brand.ts` — name, tagline, colours, gradients, mastery levels. Used across app.
- **Science Lab:** Gradient hero (green/blue/purple), card layout, back buttons. Consistent.
- **App shell:** Header (Grade9 Sprint, Daily Challenge, streak, XP), sidebar (Subjects, Discover, Leaderboard, Profile). Clear.

### 4.2 Past-paper Messaging

- Science Lab: “Aiming for Grade 9”, “Past-paper-style tests grade you accurately” — good.
- DB / Discover: “Quiz”, “Daily Challenge”, “Unseen”, “Weak spots” — not framed as “past paper questions”. Could add a line like “Exam-style questions” or “Past-paper practice” where relevant.

### 4.3 Minor UX

- **Flashcard page:** “Think…” progress and “Show answer” (type-to-reveal) are present; ensure one clear pattern per card type to avoid duplication (see SCIENCE_LAB_FLASHCARD_AUDIT / FLASHCARD_FULL_AUDIT_2025_02).
- **Topic test:** “Return where you left off” and topic grid with last score % — good for simplicity and continuity.

---

## 5. Prioritised Recommendations

### High impact, moderate effort

| # | Recommendation | Why |
|---|----------------|-----|
| 1 | **Wire Science Lab into XP and streak** | Topic test completion, full GCSE pass, and (optionally) flashcard session completion call `storage.addXP(...)` and `storage.updateStreak()`. Makes past-paper practice part of the addictive loop. |
| 2 | **Surface Science Lab on landing** | On SubjectsPage, if `getScienceLabProgressSummary().hasProgress`, show a “Continue Science Lab” card (or reuse HomePage’s Science Lab block) with per-subject progress and `continueHref`. Optionally make `/` render HomePage so that block is visible. |
| 3 | **Include Science Lab in Profile “Grade 9 readiness”** | Combine DB mastery and Science Lab (e.g. topic tests + full GCSE passed) into one number or a clear split so Science Lab work is visible and feels central. |
| 4 | **Celebrate grade milestones in Science Lab** | On topic test or paper completion, when grade is 7 or 9 (or “Grade 9 ready”), show a short celebration (e.g. badge or confetti) to match the fun of Quiz XP popups. |

### High impact, lower effort

| # | Recommendation | Why |
|---|----------------|-----|
| 5 | **Single “Continue” on SubjectsPage** | One card or button: “Continue Science Lab” or “Continue: [last DB quiz]” using existing `getScienceLabProgressSummary()` and/or `getNextAction()`. |
| 6 | **Default Paper 1 Higher everywhere** | Already done from subject card; ensure Mode page and any other entry points default the same and don’t block. |
| 7 | **Frame DB quizzes as “past paper style”** | In Discover and subject detail: add copy like “Exam-style questions” or “Past-paper practice” so the whole site aligns with “revision = past papers”. |

### Medium impact

| # | Recommendation | Why |
|---|----------------|-----|
| 8 | **Study Path points to Science Lab** | When exam date is set, “Your study path” could suggest “Topic test: X” or “Full GCSE Paper 1” using Science Lab data. |
| 9 | **One entry per subject** | Consider making “Science Lab subject → Topics” the only entry (no Mode page in between) so the path is: Subject → Topics → Start topic test / Full GCSE. Mode could be a “Lab options” link from Topics. |
| 10 | **Timed mode default or prominent in Science Lab** | Topic test / Full GCSE: “Timed (exam-style)” as default or clearly recommended to mirror real exams. |

### Lower priority

| # | Recommendation |
|---|----------------|
| 11 | Combined Science: same simplified flow and messaging as Triple. |
| 12 | Remove or hide Method Mark / Quick Check standalone from main nav if you want only 2–3 “modes”. |
| 13 | Shared flashcard component and behaviour across hubs (see flashcard audits). |

---

## 6. Success Criteria

1. **Past paper first:** From any subject entry, the primary action is “do past-paper-style questions” (topic test or full paper); revise (flashcards) is support.
2. **Simple:** One clear “Continue” or “Start” on the main landing; fewer modes and steps; Paper/Tier defaulted.
3. **Addictive:** All question-based completion (Science Lab + DB) contributes to streak and XP; grade milestones feel rewarding.
4. **Unified progress:** Profile (and optionally landing) shows both DB and Science Lab progress so “Grade 9” feels like one journey.
5. **Fun:** Celebrations or clear feedback on grade achievements (G4/7/9, “Grade 9 ready”) in Science Lab, similar to XP/combos in Quiz.

---

## 7. Files to Change (Summary)

| Goal | Files |
|------|--------|
| Science Lab → XP & streak | `ScienceLabTopicTestPage.tsx` (on completion), `ScienceLabPaperTestPage.tsx` (on paper pass), optionally `ScienceLabFlashcardPage.tsx` (on session end); `storage.ts` (already has addXP/updateStreak). |
| Science Lab on landing | `SubjectsPage.tsx` (add Science Lab progress card + Continue), or switch `/` to `HomePage.tsx` and fix HomePage to be the dashboard. |
| Profile includes Science Lab | `ProfilePage.tsx`, `ProfileHeaderCard` or new card; `getScienceLabProgressSummary()`; combine with `calculateGrade9Readiness()`. |
| Celebrate grades | `ScienceLabTopicTestPage.tsx` (summary screen), `ScienceLabPaperTestPage.tsx` or Full GCSE completion screen; optional small celebration component. |
| “Continue” logic | Already in `getScienceLabProgressSummary().continueHref` and `getNextAction()`; wire into SubjectsPage (or HomePage if restored). |

---

## 8. Summary Table

| Aspect | Current | Target |
|--------|---------|--------|
| **Primary action** | Hub choice → subject → (Mode/) Topics → topic test | Same, but **landing** offers “Continue Science Lab” so past-paper is one tap. |
| **Past-paper framing** | Strong in Science Lab; weak in DB/Discover | “Past-paper / exam-style” messaging site-wide. |
| **Gamification** | Quiz only (XP, streak, combos) | **Science Lab** completions also award XP and update streak; grade celebrations. |
| **Progress visibility** | Profile = DB only; Science Lab progress in unreachable HomePage | Profile and landing show **unified** progress (DB + Science Lab). |
| **Simplicity** | Many hubs; two entries (Mode vs Topics); no global Continue | One clear Continue; default Paper/Tier; optional single entry (Topics first). |

**Implemented:** §5 recommendations 1–5 and 7 have been implemented so the site is clearly “simple and fun, addictive, past-paper-first” while keeping the existing Science Lab and DB structure intact.

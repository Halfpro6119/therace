# Full Site Audit — Simplify for Grade 0→9 Past Paper Learning

**Date:** February 2025  
**Purpose:** Conduct a full audit of the site and suggest improvements to simplify it and make it the real easy way for students to go from grade 0 to grade 9 through completing past paper question style learning.

---

## Executive Summary

The site has **two parallel learning systems** that are not aligned:

1. **DB-based system** (Maths, some subjects): Quiz player, mastery levels 0–4, "Grade 9 Readiness", Daily Challenge, sprint-style. Uses prompts from database.
2. **Science Lab** (Biology, Chemistry, Physics): Flashcards, topic tests, full GCSE paper tests. Config-based. **No explicit grade progression.**

The home page promises "Sprint to Grade 9" but **Science Lab—your most developed past-paper-style experience—never shows a grade**. Students can get lost among:
- Multiple hubs and subject types
- Paper/Tier selection before any action
- 3-step main path + 5 "extra practice" modes
- Two topic-entry flows (Mode page vs Topics page)
- No clear "you are here, do this next" for grade progression

**Recommendation:** Simplify around a single story: **Answer past-paper questions → Get marks feedback → Pass thresholds → Progress toward Grade 9.**

---

## 1. Current Architecture Overview

### 1.1 Entry Points

| Entry | Route | What students see |
|-------|-------|-------------------|
| Home | `/` | "Sprint to Grade 9", Daily Challenge, Subjects, Grade 9 Readiness % |
| Subjects | `/subjects` | Featured hubs (English, Maths, Science Lab, etc.), Study Path Dashboard, Chosen Subjects |
| Science Lab | `/science-lab` | Triple Science vs Combined Science |
| Biology/Chemistry/Physics | `/science-lab/:subject` | Mode page with Paper 1/2, Foundation/Higher, Learning path, Extra practice |
| Topics | `/science-lab/:subject/:paper/:tier/topics` | Topic map, Start topic test, Full GCSE, Browse by topic |
| DB Subject | `/subjects/:subjectId` | Units/Topics, tier filter, quiz creation, different flow |

### 1.2 Science Lab Flow (Current)

```
Science Lab → Subject → Mode page (Paper/Tier)
    ├── Learning path (3 steps):
    │   1. Learn (flashcards + quick checks + bigger tests)
    │   2. Topic test (mini GCSE paper per topic)
    │   3. Full GCSE test (paper-by-paper, 70% pass)
    └── Extra practice (5 modes):
         • Quick Check, Method Mark, Practical Lab, Equation Lab, Misconception Lab

Browse by topic → Topics page → Per-topic: Learn | Bigger tests | Topic test
```

**Problem:** The primary path starts with **flashcards**, not past-paper questions. Students who want "past paper style learning" must first complete Learn, then Topic test, then Full GCSE. That's backwards for the stated goal.

### 1.3 What "Grade 9" Means Today

| System | Grade 9 representation |
|--------|------------------------|
| DB/Quiz | Mastery level 4 = "Grade 9 Speed"; `grade9TargetSec`; Grade 9 Readiness % |
| Science Lab | None. Uses flashcard mastery %, topic test score %, paper pass/fail. No grade mapping. |
| Home/Profile | "Grade 9 Readiness" from DB subjects only; Science Lab progress invisible there |

**Gap:** Science Lab has rich past-paper content (topic tests, full GCSE) but no grade framing. Students don't see "you're working toward Grade 9" in Science Lab.

---

## 2. Pain Points for "Easy Grade 0→9 Past Paper Learning"

### 2.1 Navigation Friction

| Issue | Impact |
|-------|--------|
| Paper + Tier before any action | Extra step; Foundation/Higher choice may confuse new users |
| Mode page vs Topics page | Two ways to reach the same thing; unclear which to use |
| 5 extra practice modes | Paralysis: "Should I do Method Mark or Quick Check?" |
| Recommended step suggests extra practice | Sometimes "Try Method Mark" or "Do small tests" instead of main path |
| No single "Continue" from last activity | Students must remember where they were |

### 2.2 Past Paper Positioning

| Issue | Impact |
|-------|--------|
| Learn (flashcards) is step 1 | Past-paper questions are step 2–3; not "the easy way" |
| Topic test and Full GCSE are separate | Could be one spectrum: topic → paper → subject |
| No "start with questions" path | Students who prefer exam-style must wade through flashcards first |
| Method Mark and Topic test overlap | Both use 4–6 mark questions; confusing distinction |

### 2.3 Grade Progression Invisibility

| Issue | Impact |
|-------|--------|
| No grade in Science Lab | Students can't see "Grade 5" or "aiming for 9" |
| DB vs Science Lab disconnect | Profile/Home show DB readiness; Science Lab is a black box |
| Paper pass (70%) doesn't map to grade | Could map: 70% = Grade 4, 80% = Grade 7, 90% = Grade 9 |
| No "you're here" indicator | No simple "3 of 8 topics mastered" or "Paper 1 passed, Paper 2 next" |

### 2.4 Redundancy and Overlap

| Overlap | Recommendation |
|---------|----------------|
| Quick Check (standalone) vs Quick Check (in Learn) | Keep only in Learn; remove standalone or make it "Review all quick checks" for revision |
| Method Mark vs Topic test (Section C) | Merge: Topic test already uses Method Mark grading for 4–6 mark. Method Mark could be "focused 4–6 mark practice" or folded into Topic test |
| Question Lab | Old flat question mode; route exists but not in Mode page. Consider remove or redirect |
| Concept Lab | Route exists, not in Mode page. Likely legacy |

---

## 3. Recommended Simplifications

### 3.1 Core Principle: Past Paper First

**Flip the path:** Make past-paper-style questions the primary experience from the start.

| Current | Proposed |
|---------|----------|
| Learn → Topic test → Full GCSE | **Topic test** (or "Past paper questions") as primary entry; Flashcards as support when stuck |
| "Learn" is step 1 | "Do questions" is step 1; "Revise with flashcards" when needed |

**Rationale:** Students aiming for grades want to *practice exam questions*. Flashcards support recall but are not "past paper style." Putting questions first aligns with the goal.

### 3.2 Simplified Science Lab Path

**Option A — Two steps (aggressive simplification):**

1. **Practice** — Topic questions (1–6 mark) + Full GCSE papers. One place to "do questions."
2. **Revise** — Flashcards + quick checks when you need to shore up recall.

**Option B — Three steps (moderate):**

1. **Topic Practice** — Past-paper-style questions per topic (current Topic test).
2. **Full GCSE** — Paper-by-paper tests.
3. **Revise** — Flashcards (optionally with quick checks inline).

**Remove from main path:**
- Standalone Quick Check (fold into Revise or remove)
- Standalone Method Mark (fold into Topic Practice—it already uses Method Mark grading)
- Practical Lab, Equation Lab, Misconception Lab → move to "Extra practice" or "When you're stuck" section

### 3.3 Reduce Paper/Tier Friction

| Change | Benefit |
|--------|---------|
| Default to Paper 1 + Higher | Most students start here; one click less |
| "Change paper/tier" in a dropdown or secondary nav | Don't block the main flow |
| Or: let students pick topic first, infer paper/tier | Topic → Paper mapping exists in data |

### 3.4 Add Grade Framing to Science Lab

| Change | Implementation |
|--------|----------------|
| Map marks % to grade | e.g. 70% = Grade 4, 80% = Grade 7, 90% = Grade 9 (configurable) |
| Show "Current grade" or "Aiming for Grade 9" | Based on best topic test / paper scores |
| Paper pass = Grade 4 ready | "Passed Paper 1 = Grade 4+" messaging |
| Subject mastery = Grade 9 ready | "All papers passed = Grade 9 ready" |

### 3.5 Single "What's Next" for Science Lab

Replace scattered "Recommended" logic with one clear CTA:

- **First time:** "Start with Cell Biology topic questions"
- **In progress:** "Continue: Organisation topic test" or "3 cards due for review"
- **Ready:** "Take Full GCSE Paper 1"
- **Done:** "All papers passed — Grade 9 ready!"

### 3.6 Unify Home/Profile with Science Lab Progress

| Change | Benefit |
|--------|---------|
| Include Science Lab in "Grade 9 Readiness" | Single number that reflects all work |
| Or: separate "Science Lab progress" card | At least visible; not invisible |
| "Continue" could deep-link to Science Lab | If last activity was there |

---

## 4. Specific Recommendations (Prioritised)

### High Impact, Moderate Effort

| # | Recommendation | Description |
|---|----------------|-------------|
| 1 | **Past paper first** | Make Topic test (or a unified "Practice questions") the primary entry. Flashcards become "Revise" when stuck. |
| 2 | **Add grade mapping** | Map marks % (70/80/90) to Grade 4/7/9 in topic test and full GCSE completion screens. |
| 3 | **Collapse extra practice** | Reduce 5 extra modes to 2–3: e.g. "Revise (flashcards + quick checks)", "Practical Lab", "Equations & common mistakes". Method Mark folded into Topic test. |
| 4 | **One clear CTA** | Replace "Recommended: Try Method Mark" with "Next: Topic test — Cell Biology" or "Continue: 5 cards due". |

### High Impact, Lower Effort

| # | Recommendation | Description |
|---|----------------|-------------|
| 5 | **Default Paper 1, Higher** | Pre-select; "Change" in a small link. |
| 6 | **Remove or hide Question Lab, Concept Lab** | Not in main nav; reduce dead routes. |
| 7 | **Topics page = primary entry** | From subject, go straight to Topics (with paper/tier in header). Skip Mode page or make it a lightweight "Overview". |
| 8 | **"Aiming for Grade 9" in Science Lab header** | Simple line of copy to frame the journey. |

### Medium Impact

| # | Recommendation | Description |
|---|----------------|-------------|
| 9 | **Science Lab progress on Home** | Card: "Science Lab: Biology 2/8 topics, Chemistry 0/8" or similar. |
| 10 | **Unify DB and Science "Grade 9 Readiness"** | Or at least show both; don't hide Science. |
| 11 | **Timed mode default or prominent** | Topic test and Full GCSE: "Timed (exam-style)" as default to mimic real conditions. |

### Lower Priority

| # | Recommendation | Description |
|---|----------------|-------------|
| 12 | **Combined Science parity** | Ensure Combined Science has same simplified flow. |
| 13 | **Shared flashcard component** | Cross-hub consistency (from FLASHCARD_AUDIT). |
| 14 | **Study Path Dashboard** | Tie it to Science Lab if exam date is set; "X days to exam, do Topic Y". |

---

## 5. Proposed User Journey (Simplified)

### 5.1 New Student

1. **Home** → "Sprint to Grade 9" or "Explore subjects"
2. **Subjects** → "Science Lab" (or direct from featured hub)
3. **Science Lab** → Biology / Chemistry / Physics / Combined
4. **Subject** → **Topics** (not Mode page). Paper 1 Higher default.
5. **Topics** → "Start with Cell Biology" (or first topic) — **Topic test** directly
6. Complete topic test → See "X/36 marks (Y%) — Grade Z equivalent"
7. CTA: "Next topic: Organisation" or "Revise Cell Biology with flashcards"

### 5.2 Returning Student

1. **Home** → "Continue: Biology — 5 cards due" or "Continue: Chemistry Paper 1"
2. Or **Subjects** → Science Lab → Topics with "3 cards due" and "Topic test: Infection — not started"
3. Single next action; no mode paralysis.

### 5.3 Near Grade 9

1. **Full GCSE** — Pass Paper 1 and Paper 2 (70% each)
2. "Subject mastery: Biology — Grade 9 ready!"
3. Celebrate; show on Profile and Home.

---

## 6. Files and Areas to Change

| Area | Files | Changes |
|------|-------|---------|
| Mode page | `ScienceLabModePage.tsx` | Simplify to 2–3 steps; default paper/tier; one CTA; collapse extra practice |
| Topics page | `ScienceLabTopicsPage.tsx` | Could become primary entry; add "Start with questions" prominence |
| Topic test | `ScienceLabTopicTestPage.tsx` | Add grade mapping on completion (70%→G4, 80%→G7, 90%→G9) |
| Full GCSE | `ScienceLabFullGcsePage.tsx`, `ScienceLabPaperTestPage.tsx` | Same grade mapping; "Grade 9 ready" on subject mastery |
| Routing | `App.tsx` | Consider `/science-lab/:subject/topics` with paper/tier in state or URL params; reduce Mode page prominence |
| Home | `HomePage.tsx` | Include Science Lab progress if available |
| Storage | `storage.ts` | May need `getScienceLabProgressSummary()` for Home/Profile |
| Subject entry | `ScienceLabSubjectPage.tsx` | From subject card → Topics (or simplified Mode) |
| Recommended logic | `ScienceLabModePage.tsx` | Replace with past-paper-first: Topic test > Learn > Full GCSE |
| Remove/deprecate | `ScienceLabQuestionLabPage`, `ScienceLabConceptLabPage` | Remove from nav or redirect to Topic test |

---

## 7. Success Criteria

1. **One clear path:** Do past-paper questions → get marks → see grade → pass thresholds → Grade 9.
2. **Fewer decisions:** Paper/tier defaulted; 2–3 modes instead of 8.
3. **Grade visibility:** Students see grade-equivalent (4/7/9) when completing topic tests and papers.
4. **No mode paralysis:** Single "Continue" or "Next" that makes sense.
5. **Science Lab feels central:** Not a sidebar; visible on Home/Profile.

---

## 8. Summary Table

| Aspect | Current | Target |
|--------|---------|--------|
| **Primary action** | Learn (flashcards) | Past-paper questions (topic test) |
| **Grade visibility** | None in Science Lab | Marks % → Grade 4/7/9 |
| **Extra modes** | 5 (Quick Check, Method Mark, Practical, Equation, Misconception) | 2–3 (Revise, Practical, Equations) |
| **Paper/tier** | Required before anything | Default Paper 1 Higher; change in header |
| **Entry** | Mode page → choose mode | Topics page or lightweight Mode |
| **Next action** | "Recommended: Method Mark" (varies) | "Next: Topic test — X" or "5 cards due" |
| **Science Lab on Home** | Invisible | Progress card or Continue link |

Implementing the high-impact items (1–4 and 5–8) would materially simplify the experience and align it with "the real easy way for students to go from grade 0 to grade 9 through past paper question style learning."

---

## Implementation Summary (February 2025)

### Phase 1 — Past-paper-first reframe
- **ScienceLabModePage:** Reordered to Test yourself (Topic test, Full GCSE) first; "Revise to improve" (flashcards + quick checks) second; "Extra resources" (Practical, Equation, Misconception — collapsed from 5 to 3) third. Copy: "Aiming for Grade 9. Past-paper-style tests grade you accurately."
- **Recommended step:** Topic test first (any topic, no flashcard unlock); Full GCSE when all topic tests done; flashcards when cards due.
- **Topics page:** "Start topic test" no longer requires quizUnlocked; first incomplete topic recommended. Copy: "Past-paper style", "Get an accurate grade", "Aiming for Grade 9".
- **Flashcard completion:** Primary CTA = Topic test; Full GCSE goes to `/full-gcse`. Copy: "Try a topic test to see your grade", "Revise more cards".
- **ScienceLabSubjectPage:** Header: "Aiming for Grade 9. Past-paper-style tests grade you accurately."
- **Subject click:** Biology/Chemistry/Physics cards now go directly to Topics (Paper 1 Higher), not Mode page.
- **Route redirects:** `/science-lab/:subject` → Topics; `/question` and `/concept` → topic-test.

### Phase 2 — Grade visibility
- **Grade mapping utility** (`src/utils/gradeMapping.ts`): 70% → Grade 4, 80% → Grade 7, 90% → Grade 9.
- **Topic test completion:** Shows "Grade 4 equivalent" / "Grade 9 equivalent" / "Keep practicing".
- **Paper test completion:** Same grade mapping; "Subject mastery — Grade 9 ready!" when all passed.
- **Full GCSE page:** "Grade 9 ready!" when paper mastery achieved.

### Phase 3 — Home integration
- **getScienceLabProgressSummary** (`src/utils/scienceLabProgress.ts`): Aggregates topic tests + full GCSE per subject.
- **Home page:** Science Lab progress card ("Science Lab — Aiming for Grade 9") with per-subject progress (e.g. "Biology 2/8 · Chemistry 0/8").
- **Primary CTA:** When user has Science Lab progress, main "Start" button becomes "Continue Science Lab" and deep-links to next action.

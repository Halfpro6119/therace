# Full GCSE Test — Rigorous Mastery Plan

**Purpose:** Redesign the Full GCSE test so it rigorously assesses users until they demonstrate clear mastery of the entire subject, structured by the papers of that subject.

**Status:** ✅ Implemented (Science Lab) — February 2025  
**Scope:** Science Lab (Biology, Chemistry, Physics). Phases 4–5 (DB-based subjects, hub consistency) deferred.

---

## 1. Executive Summary

Today the "Full GCSE test" is:

- **Science Lab:** A flat Question Lab that shows all questions for one paper/tier in random order, with binary correct/incorrect feedback. No pass threshold, no paper-by-paper structure, no re-test loop.
- **DB-based (Maths etc.):** A single quiz with all prompts in the subject—no paper separation, no mastery gates.

**Target:** A full GCSE test that:

1. Runs **paper by paper** in exam order (Paper 1 → Paper 2 → Paper 3).
2. Uses **marks-based scoring** and **Method Mark** for extended questions (as in Topic Test).
3. Defines a **mastery threshold** per paper (e.g. 70–80% of marks).
4. Requires **passing each paper** before unlocking the next; failing means review + retake until pass.
5. Awards **subject mastery** only when all papers passed.

---

## 2. Current State

### 2.1 Science Lab Full GCSE (Question Lab)

| Aspect | Current | Gap |
|--------|---------|-----|
| **Entry** | Click "Full GCSE test" → `/question` (ScienceLabQuestionLabPage) | OK |
| **Paper scope** | All questions for selected paper + tier (Paper 1 or 2) | No multi-paper sequence |
| **Scoring** | Binary correct/incorrect; no marks total | Not marks-based |
| **4–6 mark questions** | `gradeScienceAnswer()` only | No Method Mark partial credit |
| **Structure** | Random question order | No Section A/B/C |
| **Pass/fail** | None | No mastery threshold |
| **Re-test** | User can re-enter and redo; no gate | No enforced retake until pass |

### 2.2 DB-based Full GCSE (Subject Detail)

| Aspect | Current | Gap |
|--------|---------|-----|
| **Scope** | All prompts in subject (all papers, all tiers) | Not paper-separated |
| **Flow** | Single quiz; finish when all prompts done | No paper-by-paper sequence |
| **Mastery** | Per-prompt mastery (0–5); no paper-level pass | No paper pass threshold |

### 2.3 Papers Structure (gcseScope.ts)

Each subject has 1–6 papers. Examples:

- **Maths:** 3 papers (Non-calc, Calc, Calc) — Foundation + Higher tiers
- **Biology/Chemistry/Physics:** 2 papers each
- **Combined Science:** 6 papers (Bio 1&2, Chem 1&2, Phys 1&2)
- **Geography:** 3 papers
- **English Lit:** 2 papers

---

## 3. Target Vision

### 3.1 User Journey

```
Full GCSE Test for [Subject]
├── Paper 1: [Name] — 🔒 Locked until prerequisites met
│   └── Take paper → Marks X/Y (Z%) → Pass? → Unlock Paper 2
│   └── Fail? → "Review weak areas" → Retake Paper 1
├── Paper 2: [Name] — 🔒 Locked until Paper 1 passed
│   └── …
├── Paper 3: [Name] — (if applicable)
│   └── …
└── All papers passed → 🏆 Subject Mastery achieved
```

### 3.2 Paper Test Experience (per paper)

1. **Entry:** "Paper 1: [Paper name]" — "X marks total (~Y min), 1 min per mark"
2. **Structure:** Section A (1–2 mark recall) → Section B (3 mark) → Section C (4–6 mark extended)
3. **Scoring:** Marks-based; Method Mark for 4–6 mark questions
4. **Timer:** Optional timed mode (1 min per mark)
5. **Completion:** "You scored 48/70 marks (69%)" — Pass threshold 70% → **Retake required**
6. **Retake:** Same paper, different question order/shuffle; focus weak topics if available

### 3.3 Mastery Thresholds

| Threshold | Value | Rationale |
|-----------|-------|-----------|
| Pass per paper | 70% of marks | Matches typical GCSE pass (Grade 4 boundary) |
| Stretch option | 80% | "Grade 7+ ready" for ambitious users |
| Configurable | Yes | Admin or user preference for difficulty |

---

## 4. Design Decisions

### 4.1 Paper Order

- Papers run in **exam order** (Paper 1, 2, 3…).
- For tiered subjects (Maths, Sciences): user selects tier first; each paper test uses that tier only.
- For Combined Science: 6 papers in sequence (Bio 1 → Bio 2 → Chem 1 → Chem 2 → Phys 1 → Phys 2).

### 4.2 Prerequisites for Paper 1

- **Option A:** None — Paper 1 always unlocked for Full GCSE.
- **Option B:** Require Topic Tests completed for Paper 1 topics (aligns with Learn → Topic test → Full GCSE path).
- **Recommendation:** Option A for simplicity; Option B as future enhancement.

### 4.3 Re-test Behaviour

- On fail: Show which topics/questions were weakest; suggest "Review in Flashcards" / "Try Topic Test for [Topic]".
- Retake: Same paper, same question pool; shuffle order. No "same questions" guarantee—could add "focus on weak" mode later.

### 4.4 Storage

- Persist per user: `{ subjectId, paperNumber, tier? } → { passed, attempts[], lastScore, lastMarksEarned, lastTotalMarks }`.
- Subject mastery: `all papers passed` for that subject/tier.

---

## 5. Implementation Phases

### Phase 1 — Paper-by-Paper Structure and Marks-Based Scoring (Science Lab)

| Task | Description |
|------|-------------|
| 1.1 | Add `getFullGcsePapersForSubject(subject, tier)` — returns ordered list of papers with question counts |
| 1.2 | Create `ScienceLabFullGcsePage.tsx` — replaces `/question` for Full GCSE flow; shows paper list with status (locked / available / passed) |
| 1.3 | Create `ScienceLabPaperTestPage.tsx` — one paper test: structured items (Section A/B/C), marks-based scoring, Method Mark for 4–6 mark |
| 1.4 | Reuse `getTopicTestItems()` logic but scoped to **all topics in that paper** (no topic filter) |
| 1.5 | Add `storage.getPaperTestResult(subject, paper, tier)` and `storage.setPaperTestResult(...)` |
| 1.6 | Implement pass threshold check; on pass → unlock next paper; on fail → show retake CTA |

**Deliverable:** Science Lab Full GCSE = paper-by-paper flow with marks-based scoring and pass/fail per paper.

### Phase 2 — Mastery Gates and Re-test Loop

| Task | Description |
|------|-------------|
| 2.1 | Define `PAPER_PASS_THRESHOLD = 0.70` (configurable) |
| 2.2 | On paper completion: compute `marksEarned / totalMarks`; if ≥ threshold → mark passed, unlock next |
| 2.3 | On fail: Show "Retake Paper X" button; store attempt history |
| 2.4 | Subject mastery badge: "All papers passed" when every paper in subject has `passed: true` |
| 2.5 | Optional: "Focus on weak topics" — highlight topics where user lost marks, suggest Topic Test |

**Deliverable:** Users must pass each paper to progress; clear retake path on failure.

### Phase 3 — UX Polish and Optional Timer

| Task | Description |
|------|-------------|
| 3.1 | Optional timer: "Timed mode" toggle, 1 min per mark (as in Topic Test) |
| 3.2 | Paper overview: "Paper 1: Cell biology, organisation, infection — 42 marks, ~45 min" |
| 3.3 | Progress indicator: "Paper 1 ✓ | Paper 2 (current) | Paper 3 🔒" |
| 3.4 | Celebration on subject mastery: confetti, badge, share option |

**Deliverable:** Polished, exam-like experience with optional time pressure.

### Phase 4 — Extend to DB-based Subjects (Maths, etc.)

| Task | Description |
|------|-------------|
| 4.1 | For subjects using DB quizzes: create paper-by-paper flow that launches `Paper Master Quiz` per paper |
| 4.2 | Integrate marks-based scoring and pass threshold into QuizPlayerPage or results handling |
| 4.3 | Persist paper pass state in storage (or backend if available) |
| 4.4 | Full GCSE entry from SubjectDetailPage: navigate to paper-by-paper flow instead of single "Full GCSE" quiz |

**Deliverable:** Maths, Geography, History, etc. use same paper-by-paper mastery flow.

### Phase 5 — Hub Consistency (History, Geography, Psychology, etc.)

| Task | Description |
|------|-------------|
| 5.1 | Audit each hub: does it have paper structure? (History 3 papers, Geography 3, etc.) |
| 5.2 | Where papers exist: apply same Full GCSE paper-by-paper flow |
| 5.3 | Where no papers (e.g. single unit): treat as "single paper" or keep existing flat quiz |

**Deliverable:** Consistent Full GCSE behaviour across all GCSE hubs.

---

## 6. Data Model Additions

### 6.1 Storage Keys

```ts
// Paper test result
FULL_GCSE_PAPER_RESULTS: 'fullGcsePaperResults'

// Shape: Record<string, PaperTestResult>
// Key: `${subjectId}:${paperNumber}:${tier}` (tier optional for single-tier subjects)
interface PaperTestResult {
  passed: boolean;
  attempts: Array<{
    marksEarned: number;
    totalMarks: number;
    percentage: number;
    completedAt: number;
  }>;
  lastAttempt?: {
    marksEarned: number;
    totalMarks: number;
  };
}
```

### 6.2 Science Lab: Paper Definition

For Science Lab, papers come from `gcseScope` or a local mapping:

```ts
// scienceLabData or gcseScope
const SCIENCE_PAPERS: Record<ScienceSubject, Array<{ paperNumber: number; name: string }>> = {
  Biology: [
    { paperNumber: 1, name: 'Paper 1 (Cell biology, organisation, infection)' },
    { paperNumber: 2, name: 'Paper 2 (Homeostasis, inheritance, ecology)' },
  ],
  Chemistry: [...],
  Physics: [...],
};
```

---

## 7. File-Level Impact

### Phase 1–2

| File | Changes |
|------|---------|
| `ScienceLabModePage.tsx` | Full GCSE → navigate to new `full-gcse` route |
| `ScienceLabTopicsPage.tsx` | Full GCSE button → same new route |
| **New** `ScienceLabFullGcsePage.tsx` | Paper list, locked/available/passed states |
| **New** `ScienceLabPaperTestPage.tsx` | One paper test: sections, marks, Method Mark, pass/fail |
| `scienceLabFlashcards.ts` | Add `getFullGcsePaperTestItems(subject, paper, tier)` — all topics for that paper, structured |
| `storage.ts` | `getPaperTestResult`, `setPaperTestResult`, `isPaperPassed`, `getSubjectFullGcseProgress` |
| `App.tsx` | Routes: `/science-lab/:subject/:paper/:tier/full-gcse`, `.../full-gcse/paper/:paperNum` |

### Phase 3–4

| File | Changes |
|------|---------|
| `SubjectDetailPageEnhanced.tsx` | Full GCSE tab → paper-by-paper flow for DB subjects |
| `QuizPlayerPage.tsx` | Optional: integrate pass threshold and paper result persistence for paper master quizzes |
| `docs/` | Update LEARN_MODE_MERGE_PLAN, TOPIC_TEST_MODE_AUDIT refs |

---

## 8. Success Criteria

1. **Paper-by-paper:** Full GCSE runs as a sequence of papers, not one flat quiz.
2. **Marks-based:** Each paper shows "X / Y marks (Z%)" with partial credit for extended questions.
3. **Pass threshold:** 70% (or configurable) required to pass a paper.
4. **Re-test on fail:** Clear "Retake" path with attempt history.
5. **Subject mastery:** "All papers passed" badge when every paper in the subject is passed.
6. **Exam-like:** Structure (Sections A/B/C), optional timer, Method Mark feedback—aligned with Topic Test quality.

---

## 9. Summary

| Aspect | Current | Target |
|--------|---------|--------|
| **Structure** | Flat quiz / Question Lab | Paper 1 → Paper 2 → Paper 3 sequence |
| **Scoring** | Binary or question count | Marks-based, Method Mark for extended |
| **Pass/fail** | None | 70% threshold per paper |
| **Re-test** | Ad hoc | Enforced retake until pass |
| **Mastery** | Per-prompt or none | Subject mastery = all papers passed |
| **UX** | "All questions" feel | "Real GCSE papers" feel |

Implementing Phase 1 and 2 delivers the core rigorous Full GCSE experience. Phases 3–5 extend polish and consistency across the app.

---

## Implementation Summary (Completed)

### Phase 1–3 — Science Lab

- **Storage:** `FULL_GCSE_PAPER_RESULTS` key; `getPaperTestResult`, `setPaperTestResult`, `isPaperPassed`, `getSubjectFullGcseProgress`
- **Data:** `getFullGcsePaperTestItems(subject, paper, tier)` — all topics for paper, Section A/B/C structure
- **Pages:** `ScienceLabFullGcsePage` (paper list, locked/available/passed), `ScienceLabPaperTestPage` (one paper test)
- **Routes:** `/science-lab/:subject/:paper/:tier/full-gcse`, `.../full-gcse/test/:testPaper`
- **Flow:** Full GCSE → paper list → take Paper 1 → pass (70%) → unlock Paper 2 → take Paper 2 → subject mastery
- **Scoring:** Marks-based; Method Mark for 4–6 mark questions; optional timer (1 min per mark)
- **Summary:** Pass/fail per paper; retake CTA on fail; "Take Paper 2" on pass; celebration on subject mastery

### Files Changed

- `src/utils/storage.ts` — paper result methods
- `src/config/scienceLabFlashcards.ts` — `getFullGcsePaperTestItems`
- `src/pages/science/ScienceLabFullGcsePage.tsx` — new
- `src/pages/science/ScienceLabPaperTestPage.tsx` — new
- `src/App.tsx` — routes
- `src/pages/science/ScienceLabModePage.tsx` — Full GCSE → full-gcse
- `src/pages/science/ScienceLabTopicsPage.tsx` — Full GCSE button → full-gcse
- `src/pages/science/ScienceLabFlashcardPage.tsx` — Full GCSE CTA → full-gcse
- `src/pages/science/ScienceLabQuickCheckPage.tsx` — completion → full-gcse

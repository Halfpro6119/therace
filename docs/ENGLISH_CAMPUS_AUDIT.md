# English Campus – Functional & Design Audit

## Executive Summary

The English Campus is well-structured and aligned with GCSE exam requirements. **Implementation complete.** Language Section A (Reading) — half of both Language papers — is fully built (8 tasks with examiner packs) and is **now surfaced in the UI** (dashboard, workspace, result). Reading analysis, comparison, and evaluation are all practiceable. Addressing this plus the structural and navigation improvements below would make the product comprehensive, logically ordered, and maximally effective at preparing students for what they’ll actually be tested on, See §10 for the full implementation checklist.

---

## 1. Topic Coverage vs GCSE Exam Requirements

### GCSE English Language (AQA 8700)

| Exam Section | What's Tested | Campus Status |
|--------------|---------------|---------------|
| **Paper 1 Section A** (Reading) | Analysis (AO2), structure (AO2), evaluation (AO4) – 40 marks | ✅ **Implemented** – 4 tasks (L1-A01–L1-A04), dashboard + workspace + result |
| **Paper 1 Section B** (Writing) | Description, narrative – 40 marks | ✅ 5 tasks (L1-W01–L1-W05) |
| **Paper 2 Section A** (Reading) | Viewpoint (AO1/AO3), language (AO2), comparison (AO3), evaluation (AO4) – 40 marks | ✅ **Implemented** – 4 tasks (L2-A01–L2-A04), dashboard + workspace + result |
| **Paper 2 Section B** (Writing) | Speech, article, letter, leaflet, report – 40 marks | ✅ 5 tasks (L2-W01–L2-W05) |
| **Spoken Language** | Presentation, Q&A – separate endorsement | ❌ Not in scope – note on Campus home |

### GCSE English Literature (AQA 8702)

| Exam Component | What's Tested | Campus Status |
|----------------|---------------|---------------|
| **Paper 1** (Shakespeare + 19th-century novel) | Macbeth, ACC, J&H – extract & whole-text | ✅ 8 tasks (M-03, ACC-01–03, JH-01–02) |
| **Paper 2** (Modern + Poetry) | Modern play (AIC), seen poetry, unseen poetry | ✅ 6 tasks (AIC-01–02, P-S01, P-S03, P-C02, P-C03, UP-02, UP-C02) |

---

## 2. Critical Functional Gap: Language Section A (Reading) — ✅ Implemented

- **Was:** Eight reading tasks (L1-A01–L2-A04) with full examiner packs were not surfaced in the UI.
- **Now:**
  1. **Dashboard:** Section A (Reading) / Section B (Writing) toggle on Language Dashboard; Paper 1 / Paper 2 filter; all 8 reading tasks listed and startable.
  2. **Workspace:** Same route `/english-campus/language/task/:taskId`; workspace detects reading task IDs and uses `getReadingPackForTask`, ~12–15 min guidance, prompt as title.
  3. **Result:** Reading tasks use 8 or 12 marks and appropriate band options; self-mark and AI-simulate both supported.

---

## 3. Structure and Navigation

### Strengths

- **Three pillars** (Language, Literature, Vocab Lab) are clear.
- **Language Mode:** Paper 1 / Paper 2 toggle, task list, drafts link.
- **Literature Mode:** Seen poetry, Unseen poetry, Set texts, Quotation Lab.
- **Progress:** Streak, last score, targets, "Continue where you left off".
- **Spec alignment:** Matches `ENGLISH_CAMPUS_SPEC.md` closely.

### Issues (addressed)

1. **Duplicate Literature card** — ✅ **Done.** Separate "Compare poems" card removed; "Seen Poetry" description now includes single poem & comparison.

2. **No exam-structure explanation** — ✅ **Done.** English Campus home has "What you'll be tested on (AQA-style)" explaining Section A + B for Language and Literature.

3. **Skills heatmap placeholder** — ✅ **Done.** Copy updated to "Coming soon" so it’s clear the feature is planned.

4. **No suggested learning path** — ✅ **Done.** "Suggested path" on Campus home: Language Section B → Section A → Literature → Vocab Lab.

---

## 4. Content Quality and Depth

### Strengths

- **Language writing (10 tasks):** Full examiner packs (checklist, mark scheme, method, Grades 4/6/8/9).
- **Language reading (8 tasks):** Full packs in `englishLanguageReadingPackData.ts`; surfaced via Section A on Language Dashboard.
- **Literature (14 tasks):** Full GuidePost packs (checklist, mark scheme, method, Grades 4/6/8/9).
- **Vocab Lab:** Theme packs, spaced repetition, Fix-It, Streak Sprint, heatmap.

### Coverage

- **Vocab Lab modes (spec vs implementation):**
  - Spell from meaning: ✅ (session uses spell mode; sets/words from Supabase).
  - Meaning from word / Use in sentence / Upgrade word: ⚠️ **Not yet in session UI** – types exist in `englishCampus` and sample tasks in golden bank; live Vocab Lab session is spell-only. Future: add mode selector or separate flows.

- **Quotation Lab:** Quote banks by text/theme, drills, strategic quotes in Literature workspace. Spec defines A–E drill types; implementation has Explain, Upgrade, Best fit, Link two, etc.

---

## 5. Engagement and UX

### Strengths

- Gradient hero, motion, clear cards.
- "Continue where you left off" for Language and Literature.
- Top Band Coverage % in the writing workspace.
- Model answers by grade.
- Checklist tied to AOs.
- Self-mark and AI examiner modes.

### Improvements

1. **Gamification:** Consider XP, badges, or completion % per pillar for English tasks. (Not yet implemented.)
2. **"Continue" for Vocab Lab** — ✅ **Done.** Continue state supports `vocabSetIds`/`vocabLength`; set-detail page sets continue when starting a session; home "Continue" opens session with that set.
3. **Model Drills:** Ensure Model Drills are discoverable from Literature tasks. (Links from workspace; verify in UI.)
4. **Vocabulary relevance:** Make Vocab Lab themes explicitly link to Literature and Language tasks. (Not yet implemented.)

---

## 6. Screen Map and Routing

| Route | Purpose | Status |
|-------|---------|--------|
| `/english-campus` | Home, pillars, stats, continue, exam overview, suggested path | ✅ |
| `/english-campus/language` | Language dashboard (Paper 1/2, Section A/B, tasks, drafts) | ✅ |
| `/english-campus/language/task/:taskId` | Writing or reading workspace (same route) | ✅ |
| `/english-campus/language/result` | Result page | ✅ |
| `/english-campus/language/drafts` | Draft history | ✅ |
| `/english-campus/language/draft/:id/marking` | Draft marking | ✅ |
| `/english-campus/language/compare` | Compare drafts | ✅ |
| `/english-campus/literature` | Literature dashboard | ✅ |
| `/english-campus/literature/poetry` | Seen poetry tasks | ✅ |
| `/english-campus/literature/unseen` | Unseen poetry tasks | ✅ |
| `/english-campus/literature/texts` | Set texts tasks | ✅ |
| `/english-campus/literature/task/:taskId` | Literature workspace | ✅ |
| `/english-campus/literature/quotation-lab` | Quotation Lab home | ✅ |
| `/english-campus/vocab` | Vocab Lab home | ✅ |
| `/english-campus/vocab/sets` | Sets library | ✅ |
| `/english-campus/vocab/set/:id` | Set detail | ✅ |
| `/english-campus/vocab/session` | Vocab session | ✅ |

---

## 7. Spec "Top Notch" Differentiators

| Differentiator | Status |
|----------------|--------|
| 1. Interactive checklists tied to AOs | ✅ |
| 2. Model answers by grade with highlights | ✅ |
| 3. Dual marking (self + AI) | ✅ |
| 4. Draft improvement + compare versions | ✅ |
| 5. AO heatmaps + target system | ⚠️ Targets ✅; heatmap copy set to "Coming soon" |

---

## 8. Prioritised Recommendations — Implementation Status

### P0 – Critical

1. **Surface Language Section A (Reading)** — ✅ **Done.** Dashboard toggle, 8 tasks, shared workspace, 8/12-mark result flow.

### P1 – High

2. **Remove duplicate "Compare poems" card** — ✅ **Done.**
3. **Add exam-structure overview** — ✅ **Done.** On English Campus home.
4. **Add suggested learning path** — ✅ **Done.** On English Campus home.

### P2 – Medium

5. **Implement or remove Skills heatmap** — ✅ **Done.** Copy updated to "Coming soon."
6. **Verify and surface all Vocab Lab modes** — ⚠️ **Partial.** Spell-from-meaning is live; meaning-from-word, use-in-sentence, upgrade-word are in types/bank but not in session UI (future work).
7. **Extend "Continue where you left off" to Vocab Lab** — ✅ **Done.** Vocab continue state and set-detail → session flow.

### P3 – Nice to Have

8. **Spoken Language** — ✅ **Done.** Note on Campus home: "Spoken Language (presentation) is assessed separately by your school and is not covered here."
9. **Gamification** — Not implemented.
10. **Exam board clarity** — ✅ **Done.** "Content aligned to AQA GCSE English Language & Literature" on Campus home.

---

## 9. Summary

The English Campus has strong foundations and **audit recommendations are implemented:** Section A (Reading) is surfaced end-to-end, duplicate Literature card removed, exam overview and suggested path added, Skills heatmap clarified, Continue extended to Vocab Lab, and AQA/Spoken Language noted. Remaining optional work: Vocab Lab modes beyond spell, gamification, and stronger theme links between Vocab and Literature/Language.

---

## 10. Implementation Status (checklist)

| Item | Status | Notes |
|------|--------|-------|
| Language Section A on dashboard | ✅ | Section A/B toggle, Paper 1/2, 8 tasks |
| Reading workspace | ✅ | Same route as writing; uses reading pack, 12–15 min |
| Reading result (8/12 marks, bands) | ✅ | Self-mark + AI-simulate |
| Remove duplicate Compare poems card | ✅ | Single "Seen Poetry" card with comparison in description |
| "What you'll be tested on" | ✅ | English Campus home |
| Suggested learning path | ✅ | English Campus home |
| Skills heatmap "Coming soon" | ✅ | Language dashboard |
| Continue for Vocab Lab | ✅ | vocabSetIds/vocabLength; set-detail sets continue |
| Spoken Language note | ✅ | Campus home footer |
| AQA / exam board note | ✅ | Campus home footer |
| Vocab Lab modes (meaning, sentence, upgrade) | ⚠️ | Not in session UI; spell only |
| Gamification (XP, badges, %) | ❌ | Not implemented |

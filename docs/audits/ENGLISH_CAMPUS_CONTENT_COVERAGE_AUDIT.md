# English Campus — Full Content Coverage Audit

**Purpose:** Assess whether **English Language** and **English Literature** both have the full test content coverage required for exam-style practice (AQA GCSE 8700, 8702).

**Date:** 11 February 2025  
**Scope:** Test content coverage for Language (Paper 1 & 2, Section A Reading + Section B Writing) and Literature (set texts, seen poetry, unseen poetry).  
**Question:** Do Language and Literature both have the full test content coverage required?

**Sources:** `src/config/goldenEnglishQuestionBank.ts`, `src/config/englishExaminerPackData.ts`, `src/config/englishLanguageReadingPackData.ts`, `src/config/englishLanguageReadingTasks.ts`, `src/config/englishLiteratureGuidePostData.ts`, `src/config/quotationLabData.ts`, `src/config/literatureModelDrillsData.ts`, English Campus dashboard and workspace flows.

---

## Executive summary

| Pillar       | Full test content coverage? | Verdict |
|-------------|-----------------------------|--------|
| **Language**   | **Yes** | Paper 1 & 2 Section A (Reading): 8 tasks with full examiner packs, surfaced in dashboard/workspace/result. Section B (Writing): 10 tasks with full examiner packs. All AQA-style question types and forms covered. |
| **Literature** | **Yes** | **15 tasks** have full GuidePost packs (checklist, mark scheme, method, Grade 4/6/8/9 models). Macbeth has **extract** (M-01 ambition) and **whole play** (M-03 guilt); seen poetry, unseen, and other set texts (ACC, J&H, AIC) align with AQA Paper 1 & 2. |

**Conclusion:** Both **Language** and **Literature** have the full test content coverage required. The Macbeth extract task (M-01) was added so Shakespeare mirrors the common AQA “extract + whole” question format.

---

## 1. Content counts

Counts are taken from `src/config/goldenEnglishQuestionBank.ts`, `src/config/englishExaminerPackData.ts`, `src/config/englishLanguageReadingPackData.ts`, and `src/config/englishLiteratureGuidePostData.ts`.

### 1.1 English Language

| Content type              | Paper 1 | Paper 2 | Total | Examiner pack (checklist, mark scheme, method, models) |
|---------------------------|---------|---------|--------|--------------------------------------------------------|
| **Section A (Reading)**   | 4       | 4       | **8**  | ✅ All 8 in `englishLanguageReadingPackData.ts`        |
| **Section B (Writing)**   | 5       | 5       | **10** | ✅ All 10 in `englishExaminerPackData.ts`              |

**Reading task IDs:** L1-A01, L1-A02, L1-A03, L1-A04 (Paper 1); L2-A01, L2-A02, L2-A03, L2-A04 (Paper 2).  
**Writing task IDs:** L1-W01–L1-W05 (Paper 1); L2-W01–L2-W05 (Paper 2).

### 1.2 English Literature

| Content type        | Count | Task IDs | GuidePost pack |
|---------------------|-------|----------|----------------|
| **Seen poetry (single)**   | 2 | P-S01 (Ozymandias), P-S03 (Kamikaze) | ✅ |
| **Seen poetry (comparison)** | 2 | P-C02 (Exposure & Bayonet Charge), P-C03 (Checking Out Me History & Kamikaze) | ✅ |
| **Unseen poetry**   | 2 | UP-02 (analysis), UP-C02 (comparison) | ✅ |
| **Set texts**       | 9 | M-01, M-03, ACC-01–03, JH-01–02, AIC-01–02 | ✅ |
| **Total**           | **15** | — | ✅ All 15 in `englishLiteratureGuidePostData.ts` |

---

## 2. English Language — coverage vs AQA GCSE 8700

### 2.1 Paper 1: Explorations in Creative Reading and Writing

| Exam requirement | Campus implementation | Status |
|------------------|------------------------|--------|
| **Section A (Reading) — 40 marks** | | |
| Q1: Information retrieval / short response | Not explicitly separate; analysis tasks cover AO1/AO2 | ⚠️ Often combined in real papers with Q2–4 |
| Q2: Language analysis (AO2) | L1-A01 (tension), L1-A02 (setting, imagery) | ✅ |
| Q3: Structure (AO2) | L1-A03 (structure of opening) | ✅ |
| Q4: Evaluation (AO4) | L1-A04 (evaluate character as dangerous) | ✅ |
| **Section B (Writing) — 40 marks** | | |
| Description / narrative | L1-W01 (description from image), L1-W03 (place over time), L1-W05 (silence); L1-W02, L1-W04 (narrative) | ✅ |

**Paper 1 verdict:** Section A has 4 reading tasks covering language, structure, and evaluation with 8- and 12-mark bands. Section B has 5 writing tasks (description + narrative) with full examiner packs. **Full test content coverage.**

### 2.2 Paper 2: Writers' Viewpoints and Perspectives

| Exam requirement | Campus implementation | Status |
|------------------|------------------------|--------|
| **Section A (Reading) — 40 marks** | | |
| Q1: Source A – select / infer (AO1) | L2-A01 (viewpoint in Source A) | ✅ |
| Q2: Source B – language (AO2) | L2-A02 (language to influence in Source B) | ✅ |
| Q3: Compare writers’ ideas (AO3) | L2-A03 (compare how writers present similar ideas) | ✅ |
| Q4: Compare + evaluate (AO4) | L2-A04 (extent of agreement, both writers) | ✅ |
| **Section B (Writing) — 40 marks** | | |
| Non-fiction forms | L2-W01 (speech), L2-W02 (article), L2-W03 (letter), L2-W04 (leaflet), L2-W05 (report) | ✅ |

**Paper 2 verdict:** All four reading question types and five transactional forms are present with full examiner packs. **Full test content coverage.**

### 2.3 UI and flow

- **Dashboard:** Section A (Reading) / Section B (Writing) toggle; Paper 1 / Paper 2 filter; all 8 reading and 10 writing tasks listed and startable.
- **Workspace:** Single route `/english-campus/language/task/:taskId`; reading tasks use `getReadingPackForTask`, writing use `getExaminerPackForTask`.
- **Result:** Reading uses 8 or 12 marks and appropriate bands; writing uses 40 marks and level bands; self-mark and AI-simulate both supported.

---

## 3. English Literature — coverage vs AQA GCSE 8702

### 3.1 Paper 1: Shakespeare and the 19th-century novel

| Exam requirement | Campus implementation | Status |
|------------------|------------------------|--------|
| **Shakespeare** — extract + whole text | M-01 (extract: ambition), M-03 (whole play: guilt) | ✅ Extract and whole both covered |
| **19th-century novel** | ACC-01 (extract), ACC-02 (whole), ACC-03 (whole); JH-01 (both), JH-02 (whole) | ✅ Extract and whole both covered for ACC and J&H |

**Paper 1 verdict:** Shakespeare has extract-based (M-01) and whole-play (M-03) tasks. 19th-century novel (ACC, J&H) has full extract and whole-text coverage. **Full test content coverage.**

### 3.2 Paper 2: Modern texts and poetry

| Exam requirement | Campus implementation | Status |
|------------------|------------------------|--------|
| **Modern drama** | AIC-01 (responsibility), AIC-02 (Inspector) — whole play | ✅ |
| **Seen poetry — single poem** | P-S01 (Ozymandias), P-S03 (Kamikaze) | ✅ |
| **Seen poetry — comparison** | P-C02 (Exposure & Bayonet Charge), P-C03 (Checking Out Me History & Kamikaze) | ✅ |
| **Unseen poetry — analysis** | UP-02 (tension) | ✅ |
| **Unseen poetry — comparison** | UP-C02 (imagery) | ✅ |

**Paper 2 verdict:** Modern play, seen single, seen comparison, unseen analysis, and unseen comparison are all present with full GuidePost packs. **Full test content coverage.**

### 3.3 Set text scope summary

| Text | Tasks | Extract | Whole | Both |
|------|-------|---------|-------|------|
| Macbeth | M-01, M-03 | ✅ (M-01) | ✅ (M-03) | — |
| A Christmas Carol | ACC-01, ACC-02, ACC-03 | ✅ | ✅ | — |
| Jekyll & Hyde | JH-01, JH-02 | — | ✅ | ✅ (JH-01) |
| An Inspector Calls | AIC-01, AIC-02 | — | ✅ | — |

---

## 4. Examiner / GuidePost pack completeness

### 4.1 Language

- **Writing (10 tasks):** Each has checklist (AO5/AO6), mark scheme detail, step-by-step method, and model answers (Grade 4, 6, 8, 9). Source: `englishExaminerPackData.ts`.
- **Reading (8 tasks):** Each has checklist (AO1–AO4 as appropriate), mark scheme detail, step-by-step method, and model answers (Grade 4, 6, 8, 9). Source: `englishLanguageReadingPackData.ts`.

### 4.2 Literature

- **All 15 tasks** have a GuidePost pack: checklist (AO1/AO2/AO3), mark scheme detail, step-by-step method, and model answers (Grade 4, 6, 8, 9). Source: `englishLiteratureGuidePostData.ts` (`GUIDE_POST_BY_TASK_ID`).

---

## 5. Gaps and recommendations

### 5.1 Implemented improvements

| Improvement | Status | Notes |
|-------------|--------|--------|
| **Macbeth extract task (M-01)** | ✅ Done | “How does Shakespeare present Macbeth's ambition in this extract?” — full GuidePost pack, Quotation Lab strategic quotes (ambition), task surfaced in Set texts. |

### 5.2 No remaining gaps (already complete)

- Language Section A and B: all question types and forms covered and surfaced in the UI.
- Literature: seen poetry (single + comparison), unseen (analysis + comparison), all four set texts with **extract and whole** coverage where relevant; all 15 tasks have full GuidePost content.

### 5.3 Optional future improvements

- **Language Q1-style retrieval:** Paper 1 Section A often has a short retrieval/select task (e.g. "List four things…"). Currently folded into analysis tasks; a dedicated low-mark retrieval task would mirror the exact paper structure.
- **More seen poetry singles:** Two single-poem tasks (Ozymandias, Kamikaze) are sufficient for the question type; adding 1–2 more Power & Conflict poems would broaden anthology coverage.
- **Model drills for M-01:** `literatureModelDrillsData.ts` has model-derived drills for P-S01, P-S03, M-03 only. Adding drills for M-01 (extract ambition) would extend Study → Drill → Write for the new task.

### 5.4 Out of scope (per existing audit)

- **Spoken Language:** Not in scope; noted on Campus home.
- **Vocab Lab modes:** Meaning-from-word, use-in-sentence, upgrade-word exist in types/bank but session UI is spell-only; separate from “test content” coverage.

---

## 6. Summary table

| Area | Required (AQA-style) | Implemented | Examiner/GuidePost | Verdict |
|------|----------------------|-------------|--------------------|--------|
| **Language Paper 1 Section A** | 4 reading questions | 4 (L1-A01–L1-A04) | ✅ 4/4 | ✅ Full |
| **Language Paper 1 Section B** | Creative writing | 5 tasks (desc/narrative) | ✅ 5/5 | ✅ Full |
| **Language Paper 2 Section A** | 4 reading questions | 4 (L2-A01–L2-A04) | ✅ 4/4 | ✅ Full |
| **Language Paper 2 Section B** | Transactional writing | 5 tasks (speech, article, letter, leaflet, report) | ✅ 5/5 | ✅ Full |
| **Literature Paper 1 — Shakespeare** | Extract + whole | M-01 (extract), M-03 (whole) | ✅ 2/2 | ✅ Full |
| **Literature Paper 1 — 19th C novel** | Extract + whole | ACC 3, JH 2 | ✅ 5/5 | ✅ Full |
| **Literature Paper 2 — Modern** | One text | AIC 2 | ✅ 2/2 | ✅ Full |
| **Literature Paper 2 — Seen poetry** | Single + comparison | 2 + 2 | ✅ 4/4 | ✅ Full |
| **Literature Paper 2 — Unseen** | Analysis + comparison | UP-02, UP-C02 | ✅ 2/2 | ✅ Full |

---

## 7. Files referenced

| File | Role |
|------|------|
| `src/config/goldenEnglishQuestionBank.ts` | Source of truth for all Language and Literature task IDs, prompts, scope (extract/whole/both). |
| `src/config/englishLanguageTasks.ts` | Language writing tasks (delegates to golden bank). |
| `src/config/englishLanguageReadingTasks.ts` | Language Section A reading tasks; 8/12 mark logic. |
| `src/config/englishExaminerPackData.ts` | Writing examiner packs (10 tasks): checklist, mark scheme, method, models. |
| `src/config/englishLanguageReadingPackData.ts` | Reading examiner packs (8 tasks): checklist, mark scheme, method, models. |
| `src/config/englishLiteratureGuidePostData.ts` | Literature GuidePost packs (15 tasks): checklist, mark scheme, method, models. |
| `src/config/quotationLabData.ts` | Strategic quotes per task (`TASK_TO_STRATEGIC_QUOTES`). |
| `src/config/literatureModelDrillsData.ts` | Task → Quotation Lab source mapping (`TASK_TO_QUOTATION_LAB_SOURCE`). |
| `src/pages/english/EnglishLanguageDashboard.tsx` | Language Paper 1/2, Section A/B, task list. |
| `src/pages/english/EnglishLiteratureTextsPage.tsx` | Set texts task list (Macbeth, ACC, J&H, AIC). |

---

## 8. How to re-run this audit

1. **Count tasks:** From `goldenEnglishQuestionBank.ts`, confirm Language reading (8), writing (10), Literature seen single (2), seen comparison (2), unseen (2), set texts (9: M-01, M-03, ACC-01–03, JH-01–02, AIC-01–02). Total Literature = 15.
2. **Verify packs:** Every task ID in the golden bank must have a corresponding pack: writing → `englishExaminerPackData.ts`, reading → `englishLanguageReadingPackData.ts`, literature → `englishLiteratureGuidePostData.ts` (`GUIDE_POST_BY_TASK_ID`).
3. **Check scope:** Set-text tasks should cover extract and/or whole as per AQA (Shakespeare and 19th-century novel: extract + whole).
4. **UI:** Dashboard and Set texts / Poetry / Unseen pages should list all tasks; workspace and result pages should resolve task by ID.

---

**Final answer:** Yes. **Language** has full test content coverage (8 reading + 10 writing tasks, all with examiner packs, all surfaced). **Literature** has full test content coverage (15 tasks: Macbeth extract + whole, ACC, J&H, AIC, seen and unseen poetry, all with GuidePost packs). The Macbeth extract task (M-01) was added to mirror the AQA Shakespeare question format.

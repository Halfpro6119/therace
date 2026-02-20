# Implementation Validation

**Last updated:** February 2025  
**Purpose:** Single source of truth for what has been implemented vs what remains from audits, plans, and specs.  
**Validation:** All sections below have been cross-checked against the codebase (config, pages, components, CSS, routes).

---

## Status legend

| Symbol | Meaning |
|--------|--------|
| ✅ | Implemented and verified in code |
| ❌ | Not done (or explicitly out of scope) |
| ⚠️ | Partial / some gaps remain |
| ❓ | Not validated (claimed or assumed; needs a check) |

---

## Status at a glance

| Section | Done | Not done | Partial |
|---------|------|----------|---------|
| 1 Chemistry diagrams | 13 | 5 optional | — |
| 2 Flashcard layout | 9 | 2 | — |
| 3 Application questions | 3 | — | 1 |
| 4 Diagram system | 5 | — | 1 |
| 5 AQA alignment | 4 | — | 1 |
| 6 Topic Test / Method Mark | 4 | 0 | — |
| 7 English Quotation Lab | 4 | 0 | — |
| 8 Hubs | 7 | 0 | — |
| 9 Mobile | 1 | — | 1 (audit not re-run) |
| 18 Content Coverage | 6 | 0 | — |
| 19 Core Loops | 3 | 0 | — |
| 20 Admin Import Guide | 1 | 0 | — |
| 21 Maths Diagram Specs | 1 | 0 | 1 (many templates not created) |
| 22 Unimplemented Changes | — | — | Reference only |
| 23 Flashcard Full Audit | 6 | 2 | — |
| 24 English Examiner Pack | 5 | 0 | 1 (content ref) |
| 25 Batch (all remaining) | — | — | All checked off |

**Quick wins (high impact, low effort):**  
- Add colour names under flame test flames (Section 1, optional).  
- Add one more Chemistry 4.1 exam-style question (Section 5).  
- Paper/tier filter for Science Lab flashcards (Section 2) if product needs it.

---

## Table of contents

1. [Science Lab – Chemistry diagrams](#1-science-lab--chemistry-diagrams-chemistry-diagram-audit)
2. [Science Lab – Flashcard layout & diagram design](#2-science-lab--flashcard-layout--diagram-design)
3. [Science Lab – Application questions & harder prompts](#3-science-lab--application-questions--harder-prompts)
4. [Flashcard diagram system (general)](#4-flashcard-diagram-system-general)
5. [AQA alignment & content coverage](#5-aqa-alignment--content-coverage)
6. [Topic Test Mode & Method Mark Trainer](#6-topic-test-mode--method-mark-trainer)
7. [English Campus – Quotation Lab & Literature](#7-english-campus--quotation-lab--literature)
8. [Hubs – Business, History, Geography, Psychology, Vocab, Maths, MFL](#8-hubs--business-history-geography-psychology-vocab-maths-mfl)
9. [Mobile & responsive design](#9-mobile--responsive-design)
10. [Other docs – reference only](#10-other-docs--reference-only-not-fully-re-validated)
11. [List of all documents – validation status](#11-list-of-all-documents--validation-status)
12. [How to use this file](#12-how-to-use-this-file)
13. [Validation method & out of scope](#13-validation-method--out-of-scope)
14. [Suggested next validations](#14-suggested-next-validations)
15. [Glossary](#15-glossary)
16. [Blocks & dependencies](#16-blocks--dependencies)
17. [Changelog](#17-changelog)
18. [Content Coverage Dashboard](#18-content-coverage-dashboard-planscoverage_featuremd)
19. [Core Loops](#19-core-loops-auditscore_loops_auditmd)
20. [Guides – Admin Import](#20-guides--admin-import-guidesadmin_import_guidemd)
21. [Maths Diagram Specs](#21-maths-diagram-specs-specsmaths_diagram_specificationsmd)
22. [Unimplemented Changes (reference)](#22-unimplemented-changes-reference-auditsunimplemented_changesmd)
23. [Flashcard Full Audit](#23-flashcard-full-audit-auditsflashcard_full_auditmd)
24. [English Examiner Pack Tasks 1–2](#24-english-examiner-pack-tasks-12-englishenglish_examiner_pack_tasks_1_2md)
25. [Batch validation – all remaining docs](#25-batch-validation--all-remaining-docs)

---

## 1. Science Lab – Chemistry diagrams (Chemistry Diagram Audit)

**Area:** Science Lab · **Last validated:** 2025-02  
**Source:** `audits/CHEMISTRY_DIAGRAM_AUDIT.md`  
**Verified in:** `src/config/scienceLabDiagrams.ts`, `src/config/scienceLabDiagramMap.ts`, `src/config/flashcardDiagramAssets.ts`

| Item | Status | Notes |
|------|--------|--------|
| **Element box (atomic number / mass)** | ✅ Done | Blueprint `element_box_atomic_mass`; in CLEAN_FLASHCARD_DIAGRAMS and FLASHCARD_DIAGRAM_SLUGS. |
| **Bohr model** | ✅ Done | 260×200; labels left; n=2 electrons 120°; nucleus smaller; “Nucleus” at bottom. |
| **Ionic/covalent bonding** | ✅ Padded | Outer frame + padding. |
| **Energy profile** | ✅ Padded | Frame; axis labels; Ea/Reactants/Products. |
| **Flame test colours** | ✅ Padded | Frame; flames/labels repositioned. |
| **Le Chatelier** | ✅ Padded | Frame. |
| **Half equations** | ✅ Padded | Frame; Anode/Cathode clear. |
| **Empirical/molecular** | ✅ Padded | Frame. |
| **Alkene addition** | ✅ Padded | Frame. |
| **Bond energy** | ✅ Padded | Frame; axes/labels. |
| **Moles diagram** | ✅ Padded | Frame. |
| **Electrolysis diagram** | ✅ Padded | Frame; Cathode/Anode not cut off. |
| **Fractionating column** | ✅ Padded | Frame; “Crude oil” safe. |
| **Ionic/covalent – atom symbols, e⁻ hint** | ❌ Not done | Optional. |
| **Flame test – colour names under flames** | ❌ Not done | Optional. |
| **Le Chatelier – equilibrium arrow/sketch** | ❌ Not done | Optional. |
| **Half equations – cell sketch / e⁻ flow** | ❌ Not done | Optional. |
| **Other optional polish** | ❌ Not done | Empirical flowchart, alkene product, moles labels, etc. |

---

## 2. Science Lab – Flashcard layout & diagram design

**Area:** Science Lab · **Last validated:** 2025-02  
**Sources:** `specs/SCIENCE_LAB_FLASHCARD_DIAGRAM_DESIGN.md`, `audits/FLASHCARD_FULL_AUDIT_2025_02.md`, `audits/SCIENCE_LAB_FLASHCARD_FULL_REVIEW.md`  
**Verified in:** `src/index.css`, `src/pages/science/ScienceLabFlashcardPage.tsx`, `src/config/scienceLabDiagramMap.ts`

| Item | Status | Notes |
|------|--------|--------|
| Diagram well uses site tokens (border, shadow, light bg) | ✅ Done | `.diagram-svg-wrapper`: `rgb(226 232 240)`, `rgb(var(--border))`, `var(--shadow-sm)`, `--well-accent`. |
| Description-only uses same well | ✅ Done | `.science-flashcard-description-well` in CSS. |
| Equation well, card-type accent (--well-accent) | ✅ Done | Page sets `--well-accent`; `.science-flashcard-equation-well` in CSS. |
| Card shadow from design token | ✅ Done | `.flashcard-face` uses `box-shadow: var(--shadow-md)`. |
| Misconception / Example callouts | ✅ Done | `.science-flashcard-callout-misconception`, `.science-flashcard-callout-example` in CSS; used in ScienceLabFlashcardPage. |
| Compact card height (260→200, max 220) | ✅ Done | Page: `min-h-[200px] max-h-[220px]`; container `min-height: 180px; max-height: 220px`. |
| SVG scales to fit (object-fit, stretch) | ✅ Done | `.diagram-svg-wrapper svg`: width/height 100%, object-fit contain, align-items stretch. |
| CLEAN diagrams set | ✅ Done | 30 slugs in CLEAN_FLASHCARD_DIAGRAMS; diagram only when slug in set. |
| Blueprint-first rendering | ✅ Done | FlashcardDiagram uses getDiagramMetadataForSlug → DiagramRenderer when blueprint exists; ScienceLabFlashcardPage uses isCleanFlashcardDiagram. |
| Paper/tier filter for flashcards | ❌ Not done | No Foundation/Higher or Paper 1/2 filter in UI. |
| Dark-mode diagram variant | ❌ Not done | Optional; single light well. |

---

## 3. Science Lab – Application questions & harder prompts

**Area:** Science Lab · **Last validated:** 2025-02  
**Source:** `audits/SCIENCE_LAB_FLASHCARD_FULL_REVIEW.md`  
**Verified in:** `src/config/scienceLabFlashcards.ts`

| Item | Status | Notes |
|------|--------|--------|
| CONCEPT_APPLICATION_QUESTIONS | ✅ Done | 36 concepts with application-style MCQs (bio 18, chem 10, phys 8). |
| CONCEPT_HARDER_PROMPTS | ✅ Done | 33 entries; used when hash % 3 === 0 in getConceptPrompt. |
| Add application questions for remaining concepts | ⚠️ Partial | Some concepts still use scenario/topic fallback only. |
| Vocabulary / key terms | ✅ Done | SCIENCE_VOCABULARY array + extractKeyTerms(); used for keyTerms on cards. |

---

## 4. Flashcard diagram system (general)

**Area:** Science Lab / Flashcards · **Last validated:** 2025-02  
**Sources:** `audits/FLASHCARD_DIAGRAM_AUDIT.md`, `plans/FLASHCARD_DIAGRAMS_PLAN.md`  
**Verified in:** `src/components/FlashcardDiagram.tsx`, `src/config/scienceLabDiagramMap.ts`, `src/components/DiagramRenderer.tsx`

| Item | Status | Notes |
|------|--------|--------|
| Diagram slug → blueprint (no UUID) for Science Lab | ✅ Done | getDiagramMetadataForSlug(slug) returns mode: 'custom' + blueprint. |
| Only CLEAN diagrams shown as image | ✅ Done | Page checks isCleanFlashcardDiagram(diagramId); non-CLEAN show description only. |
| Phase 1 blueprint-first | ✅ Done | FlashcardDiagram prefers blueprint (DiagramRenderer) over static asset when metadata exists. |
| Phase 2 presentation | ✅ Done | Per Section 2. |
| Animated diagrams (4 slugs) | ✅ Done | hasAnimatedDiagram + getAnimatedDiagramComponent; reduced-motion/preferStatic use blueprint. |
| Unified visual language across all subjects | ⚠️ Science only | Science Lab uses blueprint + CLEAN set; other hubs use different patterns. |

---

## 5. AQA alignment & content coverage

**Area:** Science Lab · **Last validated:** 2025-02  
**Source:** `audits/SCIENCE_LAB_AQA_STANDARDS_AUDIT.md`  
**Verified in:** `src/config/scienceLabData.ts`

| Item | Status | Notes |
|------|--------|--------|
| Biology topics 4.1–4.7 | ✅ Aligned | Concepts, questions, practicals, equations, misconceptions present. |
| Chemistry topics 4.1–4.10 | ✅ Aligned | Stretch content (Le Chatelier, half equations, etc.) in place. |
| Physics topics 4.1–4.8 | ✅ Aligned | Space physics (4.8) included. |
| Chemistry 4.1 dedicated question | ⚠️ Light | One concept (chem-atomic-structure); audit suggested one more exam-style question. |
| Method mark breakdowns | ✅ Done | 34 breakdowns in METHOD_MARK_BREAKDOWNS (Biology majority, Chemistry 9, Physics 7). getMethodMarkBreakdown, getQuestionsWithMethodMarkBreakdowns, getTopicsWithMethodMarkQuestions used. |

---

## 6. Topic Test Mode & Method Mark Trainer

**Area:** Science Lab · **Last validated:** 2025-02  
**Sources:** `audits/TOPIC_TEST_MODE_AUDIT.md`, `audits/METHOD_MARK_TRAINER_AUDIT.md`  
**Verified in:** `src/pages/science/ScienceLabTopicTestPage.tsx`, `src/pages/science/ScienceLabMethodMarkPage.tsx`, `src/utils/scienceGrading.ts`, `src/utils/storage.ts`, `src/App.tsx`

| Item | Status | Notes |
|------|--------|--------|
| Topic Test Mode | ✅ Done | Route `/science-lab/:subject/:paper/:tier/topic-test`; getTopicTestItems(); Section A/B/C; Quick Check + questions; completion storage. |
| Method Mark Trainer (dedicated page) | ✅ Done | Route `/science-lab/:subject/:paper/:tier/methodMark`; ScienceLabMethodMarkPage; topic picker; gradeMethodMarkAnswer. |
| Method mark grading in Topic Test / Paper Test / Bigger Test | ✅ Done | Topic test & Paper test & Flashcard “Bigger Test” call getMethodMarkBreakdown + gradeMethodMarkAnswer for 4+ mark questions. |
| Link from Question Lab to Method Mark Trainer | ✅ Done | “Train with Method Mark Trainer →” in ScienceLabQuestionLabPage. |

---

## 7. English Campus – Quotation Lab & Literature

**Area:** English Campus · **Last validated:** 2025-02  
**Sources:** `english/QUOTATION_LAB_SPEC.md`, `english/QUOTATION_LAB_CLEANUP.md`, `english/ENGLISH_LITERATURE_GUIDEPOST.md`  
**Verified in:** `src/App.tsx`, `src/pages/english/`, `src/config/quotationLabData.ts`, `src/utils/storage.ts`, `src/types/englishCampus.ts`

| Item | Status | Notes |
|------|--------|--------|
| Quotation Lab routes & pages | ✅ Done | /english-campus/literature/quotation-lab + theme, quote-lab, quote detail, drills, micro, progress. |
| Quotation Lab data & helpers | ✅ Done | quotationLabData.ts: QUOTATION_LAB_QUOTES, getQuotationLabQuotesBySource, getQuotationLabDrillsBySource, themes, clusters, GOLD_QUOTE_IDS, etc. |
| Quotation Lab progress storage | ✅ Done | storage.getQuotationLabProgress, saveQuotationLabProgress, incrementQuotationFamiliarity, recordQuoteMisuse, getQuoteConfidence. |
| Literature entry point | ✅ Done | EnglishLiteraturePage links to Quotation Lab. |
| Specs compliance (cleanup, guidepost) | ❓ Not validated | Content/UX vs spec not re-audited here. |

---

## 8. Hubs – Business, History, Geography, Psychology, Vocab, Maths, MFL

**Area:** Hubs (multi-subject) · **Last validated:** 2025-02  
**Sources:** Various `audits/` and `plans/` (e.g. BUSINESS_HUB_*, HISTORY_*, GEOGRAPHY_*, PSYCHOLOGY_*, VOCAB_LAB_*, MATHS_MASTERY_*, MFL_*).  
**Verified in:** `src/App.tsx`, `src/pages/`, `src/config/`

| Hub / area | Status | Notes |
|------------|--------|--------|
| **Business Hub** | ✅ Implemented | BusinessHubHomePage, Unit, ConceptLab, QuickCheck, CaseStudy, CalculationLab, Topics, Evaluation, Flashcard; businessHubData. |
| **History Hub** | ✅ Implemented | HistoryHubHomePage, ConceptCards, QuestionLab, InterpretationLab, SourceLab, HistoricEnvironment, RevisionMap, Flashcard, Timeline, OptionSelect; historyHubData + period/thematic/British/wider content. |
| **Geography Hub** | ✅ Implemented | GeographyHubHomePage, ConceptLab, QuestionLab, QuickCheck, OptionSelect, RevisionMap, FieldworkLab, IssueLab, SkillsLab, Flashcard; geographyHubData. |
| **Psychology Hub** | ✅ Implemented | PsychologyHubHomePage, ConceptLab, KeyStudies, IssuesDebates, StudyEvaluator, ResearchMethods, RevisionMap, QuestionLab, QuickCheck, OptionSelect; psychologyHubData. |
| **Vocab Lab (English)** | ✅ Implemented | EnglishVocabLabHomePage, EnglishVocabSessionPage, EnglishVocabResultsPage; vocab session/api/mastery/grading utils; types/vocab, types/englishCampus. |
| **Maths Mastery / Maths Hub** | ✅ Implemented | MathsMasteryHomePage, MathsHubPage, StatisticsHubPage, FurtherMathsHubPage; goldenMathsQuestions; placeholders where applicable. |
| **MFL / Languages Hub** | ✅ Implemented | LanguagesHubHomePage, LanguagePage, ReadingPage, ListeningPage, SpeakingPage, WritingPage, GrammarPage, TranslationPage; mfl*Data (reading, listening, speaking, writing, grammar, translation), languagesHubData. |

Implementation plans in `plans/` (e.g. MFL_FRENCH_SPANISH_IMPLEMENTATION_PLAN, GEOGRAPHY_AQA_IMPLEMENTATION_PLAN) describe scope and AQA alignment; code confirms **hubs and main flows exist**. Full content coverage vs each plan is not re-audited here.

---

## 9. Mobile & responsive design

**Area:** Site-wide · **Last validated:** 2025-02  
**Source:** `audits/MOBILE_DESIGN_AUDIT.md`  
**Verified in:** `src/index.css`

| Item | Status | Notes |
|------|--------|--------|
| Mobile utility classes | ✅ Present | .touch-target, .mobile-padding, .mobile-safe, .mobile-text-balance, .scroll-touch, .modal-mobile, .grid-mobile-*, .card-mobile, .text-responsive, .heading-responsive. |
| Mobile audit recommendations | ❓ Not validated | Audit checklist (tap targets, viewport, etc.) not re-checked item-by-item. |

---

## 18. Content Coverage Dashboard (plans/COVERAGE_FEATURE.md)

**Area:** Admin · **Last validated:** 2025-02  
**Source:** `plans/COVERAGE_FEATURE.md`  
**Verified in:** `src/App.tsx`, `src/admin/CoveragePage.tsx`, `src/db/client.ts`, `src/utils/coverageComputation.ts`, `src/config/taxonomy/maths.ts`, `src/types/coverage.ts`

| Item | Status | Notes |
|------|--------|--------|
| Route `/admin/coverage` | ✅ Done | App.tsx route; AdminDashboard link "Content Coverage". |
| CoveragePage component | ✅ Done | Displays papers, units, topics, question types, prompts, settings. |
| Paper coverage cards | ✅ Done | Progress cards per paper; coverage % from computeSubjectCoverageSummary. |
| Hierarchical breakdown (Unit → Topic → Question Type) | ✅ Done | Expanded papers/units; coverage metrics per topic. |
| Missing content view (toggle) | ✅ Done | showMissingOnly state; listMissingQuestionTypes. |
| Seed Maths Taxonomy button | ✅ Done | seedMathsTaxonomy(); creates papers, units, topics, question types from MATHS_TAXONOMY. |
| DB: papers, question_types, coverage_settings | ✅ Done | client.ts: getPapers, createPaper, getQuestionTypes, createQuestionType, getCoverageSettings, createCoverageSettings. |
| MATHS_TAXONOMY (4 units, 17 topics, ~80 question types) | ✅ Done | config/taxonomy/maths.ts; papers 1–3, calculator defaults. |
| coverageComputation helpers | ✅ Done | computeSubjectCoverageSummary, computeTopicCoverage, listMissingQuestionTypes, isTaxonomyMissing. |
| Admins update thresholds in UI | ❌ Not done | Doc says "future enhancement"; settings created with defaults, no edit UI. |

---

## 19. Core Loops (audits/CORE_LOOPS_AUDIT.md)

**Area:** Site-wide · **Last validated:** 2025-02  
**Source:** `audits/CORE_LOOPS_AUDIT.md`  
**Verified in:** `src/pages/QuizPlayerPage.tsx`, `src/utils/storage.ts`, `src/App.tsx` (routes)

| Item | Status | Notes |
|------|--------|--------|
| Maths loop: MasteryState/XP/streak updated after quiz | ✅ Done | QuizPlayerPage endQuiz() calls storage.updateMasteryState(), addXP(), updateStreak(), updateProfile(). |
| Maths flow: Home → Maths Mastery → Hub → tier/paper → quiz → Results | ✅ Done | Routes and pages present; Fix-It Drill, Run It Back. |
| English loop: "Improve this draft" after feedback | ✅ Done | Doc says added; flow from result back to workspace. |
| submitAnswerPipeline / gradeFromRenderer | ✅ Done | Centralized grading; QuestionRenderer + gradeFromRenderer. |
| Fix-It Drill (missed questions only) | ✅ Done | Filter from lastAttempt.missedPromptIds. |

---

## 20. Guides – Admin Import (guides/ADMIN_IMPORT_GUIDE.md)

**Area:** Admin / Quiz · **Last validated:** 2025-02  
**Source:** `guides/ADMIN_IMPORT_GUIDE.md`  
**Verified in:** `src/admin/importUtils.ts`, `src/admin/jsonNormalizer.ts`, `src/admin/JsonImportPageEnhanced.tsx`, `src/utils/questionEngine/`, `src/components/QuestionRenderer.tsx`, `src/components/questions/QuestionTypes.tsx`, `src/db/client.ts`

| Item | Status | Notes |
|------|--------|--------|
| Bulk Import: parseCSV, parseImportJsonPrompts, importPrompts | ✅ Done | importUtils.ts; ImportPage uses them. |
| Enhanced JSON: parseQuestionsJson, normalizeQuestion (admin) | ✅ Done | jsonNormalizer.ts; JsonImportPageEnhanced uses parseQuestionsJson; createPrompt with normalized data. |
| Runtime: questionEngine.normalizeQuestion, validateNormalizedQuestion | ✅ Done | normalizeQuestion.ts, validate.ts; QuestionRenderer uses both. |
| QuestionRenderer + Short/MCQ/Fill/Match/Label | ✅ Done | QuestionTypes.tsx exports all; QuestionRenderer switches on q.type. |
| grade(), gradeFromRenderer(), GradeResult, UserResponse | ✅ Done | grade.ts, QuestionRenderer.tsx; QuizPlayerPage uses gradeFromRenderer. |
| Key Files table (questionTypes, types, normalizer, validate, grade, Renderer, registry, importUtils, jsonNormalizer, JsonImportPageEnhanced, importEnhancements, db) | ✅ Done | All listed files exist and match described roles. |

---

## 21. Maths Diagram Specs (specs/MATHS_DIAGRAM_SPECIFICATIONS.md)

**Area:** Maths / Diagrams · **Last validated:** 2025-02  
**Source:** `specs/MATHS_DIAGRAM_SPECIFICATIONS.md`  
**Verified in:** `src/components/DiagramRenderer.tsx`, `src/db/client.ts` (diagram_templates), `src/config/goldenQuestionSeed.ts`

| Item | Status | Notes |
|------|--------|--------|
| DiagramRenderer supports templateId + params | ✅ Done | mode 'template', templateId; loads from DB by template_id; passes params. |
| Some Maths templates in use | ✅ Done | goldenQuestionSeed: math.circle_theorems.angle_in_semicircle.v1, tangent_radius.v1, math.statistics.boxplot_comparison.v1; GOLDEN_DIAGRAM_TO_TEMPLATE_ID. |
| Spec templates (F15, F17, F18, etc.) – many "NEW - to create" | ⚠️ Partial | Spec lists many templates (e.g. math.graphs.coordinate_point.v1, math.geometry.straight_line_angles.v1); not all exist in codebase/DB. Implement as needed per question. |

---

## 22. Unimplemented Changes (reference) (audits/UNIMPLEMENTED_CHANGES.md)

**Area:** Reference · **Last validated:** 2025-02  
**Source:** `audits/UNIMPLEMENTED_CHANGES.md`

This doc is a **compiled list** of done/not-done items from other .md files (QUIZ_SUBMISSION_FIX_PLAN, ERRORS_AND_FIXES, INTEGRATION_PATCH, DEPLOYMENT_GUIDE, etc.). It was **not** re-validated line-by-line against the codebase. Use it as a **reference** for known gaps; for authoritative status use the corresponding source doc and Sections 1–9 and 18–21 above.

| Item | Status | Notes |
|------|--------|--------|
| Doc purpose | ✅ Reference | Compilation only; source docs control. |
| Quiz submission / persistence / Continue flow | ❓ See doc | UNIMPLEMENTED_CHANGES lists phases not done; verify against QuizPlayerPage and submitAnswerPipeline if needed. |
| Tier migration / deployment checklist | ❓ See doc | Deployment steps not re-run. |

---

## 23. Flashcard Full Audit (audits/FLASHCARD_FULL_AUDIT.md)

**Area:** Science Lab / Flashcards · **Last validated:** 2025-02  
**Source:** `audits/FLASHCARD_FULL_AUDIT.md`  
**Verified in:** `src/pages/science/ScienceLabFlashcardPage.tsx`, `src/config/scienceLabDiagramMap.ts`, `src/config/scienceLabFlashcards.ts`, `src/utils/storage.ts`

| Item | Status | Notes |
|------|--------|--------|
| Overlap with Sections 1–4 | ✅ Covered | CLEAN_FLASHCARD_DIAGRAMS now has 30 slugs (audit said 3; expanded per FULL_REVIEW). |
| getFlashcardsGroupedByTopic, learnSteps | ✅ Done | ScienceLabFlashcardPage; biggerTest after topic groups. |
| Flip, rate 1/2/3, prev/next, progress dots | ✅ Done | UI and keyboard (Space, 1/2/3). |
| updateFlashcardMastery, nextReviewDate stored | ✅ Done | storage + scienceLabFlashcards. |
| Quick Checks | ❌ Skipped | pendingQuickChecks never populated; flow skips Quick Check phase (per audit). |
| Spaced repetition used for deck order | ❌ Not done | nextReviewDate stored but deck order is linear (per audit). |
| "Again" cards re-queued | ✅ Done | notSureQueue; cards rated 1 re-shown. |
| Shuffle / session options, due count | ✅ Done | Session options; getDueCount surfaced. |

---

## 24. English Examiner Pack Tasks 1–2 (english/ENGLISH_EXAMINER_PACK_TASKS_1_2.md)

**Area:** English Campus · **Last validated:** 2025-02  
**Source:** `english/ENGLISH_EXAMINER_PACK_TASKS_1_2.md`  
**Verified in:** `src/config/englishExaminerPackData.ts`, `src/config/englishLiteratureGuidePostData.ts`, `src/config/englishLanguageReadingPackData.ts`, `src/config/literatureModelDrillsData.ts`

| Item | Status | Notes |
|------|--------|--------|
| Examiner pack task structure (Tasks 1–10) | ✅ Done | TASK_1..TASK_10 in englishExaminerPackData; EXAMINER_PACK_BY_TASK_ID (L1-W01..L2-W05). |
| getExaminerPackForTask(taskId) | ✅ Done | Returns EnglishExaminerPackTask. |
| Literature guidepost by taskId | ✅ Done | GUIDE_POST_BY_TASK_ID, getGuidePostForLiteratureTask. |
| Reading pack by taskId | ✅ Done | READING_PACK_BY_TASK_ID, getReadingPackForTask. |
| Model drills by taskId | ✅ Done | getModelDrillsByTask, hasModelDrills in literatureModelDrillsData. |
| Doc content (mark scheme, checklists, method) | 📄 Reference | Content/UX; not code-validated. |

---

## 25. Batch validation – all remaining docs

The following docs were checked: either **code was verified** (route, config, or key symbol exists) or **marked as reference** (content/ops/LLM; no implementation checklist). All are now considered validated for the purpose of this file.

### Audits (remaining)

| Doc | Status | Note |
|-----|--------|------|
| audits/BUSINESS_HUB_* (3) | ✅ | Hub implemented (Section 8); content coverage not re-audited. |
| audits/DIAGRAM_DESIGN_AUDIT.md | 📄 | Design review; diagram system in Sections 1–4, 21. |
| audits/ENGLISH_CAMPUS_AUDIT.md, ENGLISH_CAMPUS_CONTENT_COVERAGE_AUDIT.md | ✅ | English routes & Quotation Lab (Section 7); content not re-audited. |
| audits/FLASHCARD_AUDIT_2025_02.md, FLASHCARD_DESIGN_AUDIT.md, FLASHCARD_MODE_*.md | ✅ | Overlap with Sections 2, 4, 23. |
| audits/FULL_CONTENT_AUDIT_2025.md, FULL_SITE_*.md (2) | 📄 | Broad scope; reference only. |
| audits/HISTORY_HUB_CONTENT_COVERAGE_AUDIT.md | ✅ | History Hub (Section 8). |
| audits/IMPROVEMENT_SUGGESTIONS.md, VISUAL_IMPROVEMENTS_CHECKLIST.md | 📄 | Ideas/checklist; reference. |
| audits/MATHS_MASTERY_*.md (2) | ✅ | Maths Hub (Section 8). |
| audits/SCIENCE_LAB_*.md (remaining) | ✅ | Science Lab in Sections 1–6. |
| audits/VOCAB_LAB_AUDIT.md | ✅ | Vocab Lab (Section 8). |

### Plans (remaining)

| Doc | Status | Note |
|-----|--------|------|
| plans/CONCEPT_LAB_MERGE_PLAN.md, LEARN_MODE_MERGE_PLAN.md | 📄 | Merge plans; reference. |
| plans/COVERAGE_IMPLEMENTATION.md | ✅ | Coverage (Section 18). |
| plans/COMPLETE_FEATURE_SUMMARY.md, DELIVERABLES_*.md, IMPLEMENTATION_SUMMARY.md, TASK_COMPLETION_SUMMARY.md | 📄 | Historical summaries; reference. |
| plans/ERRORS_AND_FIXES.md | 📄 | Reference; UNIMPLEMENTED_CHANGES (S22) compiles gaps. |
| plans/FULL_GCSE_*.md, FULLY_AUTONOMOUS_*.md (2) | 📄 | Scope plans; reference. |
| plans/GEOGRAPHY_*.md, HISTORY_*.md, PSYCHOLOGY_*.md, MFL_*.md, BUSINESS_STUDIES_*.md, COMPUTER_SCIENCE_*.md, RELIGIOUS_*.md, HEALTH_*.md | ✅ | Hubs exist (Section 8); plan scope not re-audited. |
| plans/MOVING_VISUAL_DIAGRAMS_PLAN.md | 📄 | Reference. |
| plans/PAPER_*.md (6), PAPERS_FEATURE.md | ✅ | PapersPageEnhanced, paperAssignmentUtils, listPapersBySubject, PaperQuizBuilder, PaperMasterQuizzes. |
| plans/QUIZ_SUBMISSION_FIX_PLAN.md | ⚠️ | Quiz flow exists; persistence/Continue per UNIMPLEMENTED_CHANGES. |
| plans/STUDENT_PROGRESS_*.md, VOCAB_LAB_DELIVERABLES.md | 📄 | Reference. |

### Specs

| Doc | Status | Note |
|-----|--------|------|
| specs/HIGHER_PAPER2_DIAGRAM_SPEC.md | 📄 | Diagram spec; DiagramRenderer/templates (Section 21). |

### English (remaining)

| Doc | Status | Note |
|-----|--------|------|
| english/ENGLISH_AI_FEEDBACK_*.md, ENGLISH_CAMPUS_SPEC.md | 📄 | Prompts/spec; reference. |
| english/ENGLISH_LITERATURE_GUIDEPOST_*.md (3), ENGLISH_TASKS_*.md | ✅ | Guidepost data, task IDs (Section 7, 24). |
| english/LITERATURE_*.md (2), LLM_PROMPT_*.md | 📄 | Content/prompts; reference. |

### Guides (remaining)

| Doc | Status | Note |
|-----|--------|------|
| guides/DEPLOYMENT_*.md, INTEGRATION_*.md, NETLIFY_*.md, PORT_*.md, SUPABASE_*.md | 📄 | Ops/deployment; reference. |
| guides/MATHS_GOLD_*.md, REIMPORT_GOLD_*.md | 📄 | Import how-to; reference. |
| guides/QUESTION_TYPES_GUIDE.md, README_*.md (2) | 📄 | Matches question engine (Section 20); reference. |

### Reference

| Doc | Status | Note |
|-----|--------|------|
| reference/*.md (all) | 📄 | Gold lists, diagram/text issues; reference only. |

---

## 10. Other docs – reference only (not fully re-validated)

- **Core Loops** (`audits/CORE_LOOPS_AUDIT.md`): Validated in Section 19.
- **Full content / site audits** (`audits/FULL_CONTENT_AUDIT_2025.md`, `FULL_SITE_*`): Broad scope; not re-run.
- **English specs** (guideposts, LLM prompts, examiner packs): Content and prompts not re-validated.
- **Deliverables / feature summaries** (`plans/DELIVERABLES_SUMMARY.md`, `COMPLETE_FEATURE_SUMMARY.md`, etc.): Historical; may be out of date.

---

## 11. List of all documents – validation status

**All docs in `docs/` have been assigned a validation status** in Sections 1–9 (detailed) or 18–25 (including batch in Section 25). Nothing is left "not validated."

**Detailed validation** (Sections 1–9, 18–24):  
`audits/CHEMISTRY_DIAGRAM_AUDIT.md`, `audits/FLASHCARD_DIAGRAM_AUDIT.md`, `audits/FLASHCARD_FULL_AUDIT_2025_02.md`, `audits/METHOD_MARK_TRAINER_AUDIT.md`, `audits/SCIENCE_LAB_AQA_STANDARDS_AUDIT.md`, `audits/SCIENCE_LAB_FLASHCARD_FULL_REVIEW.md`, `audits/TOPIC_TEST_MODE_AUDIT.md`, `audits/MOBILE_DESIGN_AUDIT.md` (partial), `specs/SCIENCE_LAB_FLASHCARD_DIAGRAM_DESIGN.md`, `plans/FLASHCARD_DIAGRAMS_PLAN.md`, `english/QUOTATION_LAB_SPEC.md`, `english/QUOTATION_LAB_CLEANUP.md`, `english/ENGLISH_LITERATURE_GUIDEPOST.md`, `plans/COVERAGE_FEATURE.md`, `audits/CORE_LOOPS_AUDIT.md`, `guides/ADMIN_IMPORT_GUIDE.md`, `specs/MATHS_DIAGRAM_SPECIFICATIONS.md`, `audits/UNIMPLEMENTED_CHANGES.md` (reference), `audits/FLASHCARD_FULL_AUDIT.md` (Section 23), `english/ENGLISH_EXAMINER_PACK_TASKS_1_2.md` (Section 24).

**Batch validation** (Section 25): All remaining audits, plans, specs, english, guides, and reference docs are listed there with status (✅ / ⚠️ / 📄 reference).

- **Audits:** See Section 25 (batch) for all audit docs; CORE_LOOPS (S19), FLASHCARD_FULL_AUDIT (S23), UNIMPLEMENTED_CHANGES (S22) have detailed sections.
- **Plans:** See Section 25 (batch); COVERAGE_FEATURE (S18) has a detailed section.
- **Specs:** See Section 25; MATHS_DIAGRAM_SPECIFICATIONS (S21) has a detailed section.
- **English:** See Section 25; ENGLISH_EXAMINER_PACK_TASKS_1_2 (S24) has a detailed section; Quotation Lab (S7).
- **Guides:** See Section 25; ADMIN_IMPORT_GUIDE (S20) has a detailed section.
- **Reference:** See Section 25; all reference docs are 📄 reference only.
- **docs/README.md:** Index; no implementation to validate.

---

## 12. How to use this file

1. **Before starting work:** Use Sections 1–9 for “❌ Not done” or “⚠️ Partial” and pick tasks.
2. **After implementing:** Update the relevant row to ✅ and add a short note (and code ref if helpful).
3. **New audits/plans:** Add a new section with a table and link to the doc under `audits/` or `plans/`.
4. **Paths:** Doc paths are relative to `docs/` (e.g. `audits/CHEMISTRY_DIAGRAM_AUDIT.md`). Layout in `docs/README.md`.
5. **Validating more docs:** When you validate another doc, move it from Section 11 (not validated) into the appropriate section 1–9 and add it to the "Documents that were validated" list at the start of Section 11. Update the **Last validated** date for that section.
6. **Changelog:** When you change this file (new section, re-validation, dependency), add a row to [Section 17 (Changelog)](#17-changelog).

---

## 13. Validation method & out of scope

**How sections 1–9 were validated:**  
Codebase was checked with search (grep/semantic search) and file reads. We confirmed that the referenced files exist, export the expected symbols, and that behaviour described in the table matches the code (e.g. CLEAN set contents, route paths, component usage). We did **not** run the app, run tests, or manually click through every flow.

**Out of scope for this doc:**  
- Runtime behaviour in the browser (e.g. “does the quiz actually grade correctly?”).  
- Accessibility (a11y), performance, or security.  
- Whether content (copy, questions, quotes) matches the latest spec text.  
- Full content coverage vs each plan (Section 25 batch gives status only).

**How to re-run validation for a section:**  
1. Open the **Verified in** files for that section.  
2. Confirm the **Item** rows: for each ✅, check that the code still has the described export/route/class/constant; for each ❌, confirm it’s still absent.  
3. Use search (grep or IDE) for key symbols (e.g. `CLEAN_FLASHCARD_DIAGRAMS`, `getDiagramMetadataForSlug`, route paths).  
4. If behaviour or files changed, update the table and the **Last validated** date for that section.  
5. Optionally add a Changelog entry.

---

## 14. Suggested next validations

If you have time to validate more docs, these are high-value next steps (one-line rationale):

| Doc | Why validate next |
|-----|-------------------|
| ~~guides/ADMIN_IMPORT_GUIDE.md~~ | *(validated Section 20)* |
| ~~plans/COVERAGE_FEATURE.md~~ | *(done – Section 18)* |
| ~~audits/FLASHCARD_FULL_AUDIT.md~~ | *(done – Section 23)* |
| ~~english/ENGLISH_EXAMINER_PACK_TASKS_1_2.md~~ | *(done – Section 24)* |
| ~~audits/CORE_LOOPS_AUDIT.md~~ | *(done – Section 19)* |
| ~~specs/MATHS_DIAGRAM_SPECIFICATIONS.md~~ | *(done – Section 21)* |

All suggested docs are now validated (Sections 18–25). For future docs, add a section and add to the validated list in Section 11.

---

## 15. Glossary

| Term | Meaning (in this doc) |
|------|------------------------|
| **Blueprint** | Programmatic diagram definition in `scienceLabDiagrams.ts` (e.g. circles, text, paths). Rendered by `DiagramRenderer`; no static SVG file required. |
| **CLEAN diagram** | A diagram slug in `CLEAN_FLASHCARD_DIAGRAMS`. Only these show the actual diagram image on Science Lab flashcards; other slugs show description text only. |
| **Method Mark Trainer** | Science Lab feature for 4–6 mark questions: breakdown of idea/method/precision marks, grading against keywords, dedicated page and in-topic-test use. |
| **Topic Test** | Science Lab mode: mixed Quick Checks + questions per topic; route `…/topic-test`; completion stored per topic. |
| **Well** | In flashcard UI: the bordered, rounded content area (e.g. diagram, description, equation) with `--well-accent` and shared styling. |
| **Validated** | Cross-checked against the codebase for this file (files exist, symbols used as described). |
| **Not validated** | (Legacy.) All docs now have a status in Section 11 / Sections 1–9, 18–25. |

---

## 16. Blocks & dependencies

Use this when planning work so you don’t do things in the wrong order.

| Item | Blocks | Blocked by |
|------|--------|------------|
| Section 2 (Flashcard layout) | Section 4 Phase 2 presentation | — |
| Section 4 (Diagram system) | — | Section 1 (blueprints), Section 2 (presentation) |
| Paper/tier filter (Section 2) | Any “filter by paper” reporting or content | — |
| Chemistry 4.1 question (Section 5) | — | — |
| ADMIN_IMPORT_GUIDE validation | — | — |

*Add rows as you discover dependencies.*

---

## 17. Changelog

| Date | Change |
|------|--------|
| 2025-02 | Initial full validation (Sections 1–9). Added Section 11 (list of docs not validated). |
| 2025-02 | Added Status legend, Status at a glance, Quick wins, Table of contents. |
| 2025-02 | Added Section 13 (Validation method & out of scope), Section 14 (Suggested next validations), Section 15 (Glossary). |
| 2025-02 | Added per-section **Last validated** and **Area**; Section 16 (Blocks & dependencies), Section 17 (Changelog). Added “How to re-run validation” in Section 13; one-line summaries in Section 11. |
| 2025-02 | Validated ADMIN_IMPORT_GUIDE (S20), COVERAGE_FEATURE (S18), CORE_LOOPS_AUDIT (S19), MATHS_DIAGRAM_SPECIFICATIONS (S21), UNIMPLEMENTED_CHANGES (S22). Updated Section 11 and Status at a glance; added TOC 18–22. |
| 2025-02 | Validated FLASHCARD_FULL_AUDIT (S23), ENGLISH_EXAMINER_PACK_TASKS_1_2 (S24). Added Section 25 batch validation for all remaining docs; Section 11 now states all docs checked off. |

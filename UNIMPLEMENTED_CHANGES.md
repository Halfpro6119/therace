# Unimplemented Changes – Compiled from .md Files

This document lists changes, fixes, and features from the project’s Markdown files, with **Done** vs **Not done** status as of the latest implementation pass.

---

## 1. VISUAL_IMPROVEMENTS_CHECKLIST.md

### Optional / Future
- **[ ] Not done — Review admin vs user-facing consistency** — If admins use the app, ensure shared design language where appropriate.

*All other checklist items are marked done.*

---

## 2. QUIZ_SUBMISSION_FIX_PLAN.md

### Partially or not implemented
- **[ ] Not done — Phase 1 (Debug logging)** — Temporary `console.log` at key points; status unclear.
- **[ ] Not done — Phase 2 (Submit button wiring)** — Ensure **all** question types have a visible submit button and `onClick` → `onSubmit`; disable when answer is empty.
- **[ ] Not done — Phase 3 (Attempt persistence)** — Save attempt to Supabase after grading; update mastery/streak. QuizPlayerPage has local `storage.saveAttempt(attempt)`; Supabase persistence for attempts is not clearly present.
- **[ ] Not done — Phase 4 (Continue flow)** — Explicit “Continue” after feedback; flow may still rely on “Next” rather than a dedicated “Continue”.
- **[ ] Not done — Phase 5 (Test all question types)** — Full test pass for Short, MCQ, Fill, Match, Label (submit, feedback, continue) not documented as done.

---

## 3. DEVELOPMENT_STATUS.md & ERRORS_AND_FIXES.md

### TypeScript / code quality
- **[x] Done — Toast context (partial)** — Fixed in: SubjectOpsDetail, DiagramMetadataManager, DiagramMetadataImporter, JsonImportPageEnhanced. These now use `success()`, `error()`, `info()` from `useToast()`. Other admin pages still use `showToast`; API is valid.
- **[x] Done — Confirm context (partial)** — Fixed: DiagramsPage, UnitsPageEnhanced, ImportLogPage, PlaylistsPage, QuizzesPage, SubjectsPage (useConfirm + await). QuizPlayerPage uses `confirmLabel`/`cancelLabel` instead of `confirmText`/`cancelText`.
- **[x] Done — Missing type properties** — `ValidationResult` now has `isValid` in jsonNormalizer; `NormalizedQuestion` has optional unitId, topicId, type, explanation, meta. CsvImportPageWithTier uses `db.importPrompt`; JsonImportPageEnhanced uses normalized types.
- **[x] Done — Type mismatches** — ResultsPage, SubjectDetailPageWithTier use `setSubject(data ?? null)`. SubjectOpsDetail uses `undefined` for optional quiz fields. QuizTileProps extended with optional `onClick`, `paperFilter`. HeatmapGrid receives `topics`/`quizzes` from SubjectDetailPageEnhanced. Paper relationship service and tierBulkAssignmentService typed; db has `getAllUnits`/`getAllTopics` and `importPrompt`.
- **[x] Done — Function signature mismatches** — ImportPage: setProgress/logImportRun/createTopicQuizzes/createUnitQuizzes/createFullGCSEQuiz no longer pass extra args. ConfirmOptions: `confirmLabel`/`cancelLabel` used. SoundSystem has `setEnabled`. Ref assignment in QuizPlayerPage uses MutableRefObject cast.
- **[x] Done — typecheck** — `npm run typecheck` passes. QuizPlayerPage.backup, .enhanced, .fixed are excluded from tsconfig.app.json (alternate implementations).

### Verification
- **[ ] Not done — ERRORS_AND_FIXES.md “Files Needing Fixes”** — Many items still unchecked; only a subset of Toast/Confirm fixes were applied.

---

## 4. INTEGRATION_PATCH.md & INTEGRATION_GUIDE.md

### App startup
- **[x] Done — Initialize question registry in App** — `App.tsx` now calls `initializeQuestionRegistry()` once on startup in a `useEffect`. Registry is invoked at app boot.

### Integration testing checklist (all unchecked in doc)
- **[ ] Not done —** SHORT mark scheme comparison, MCQ choice feedback, FILL auto-fill, MATCH dropdowns, LABEL targets.
- **[ ] Not done —** Skip/Previous, question counter, feedback, explanation, Next after answer.
- **[ ] Not done —** Combo counter, XP popup, sound effects.
- **[ ] Not done —** Backwards compatibility with existing questions.

---

## 5. DEPLOYMENT_GUIDE.md (Tier system)

### TODOs
- **[ ] Not done — Run migration in Supabase** — Run `supabase/migrations/20260121_add_tier_system.sql` (or equivalent) in Supabase.
- **[x] Done — Update admin routing** — Admin routes now use Enhanced pages (paper assignment); see §9.
- **[ ] Not done — Update quiz routing** — “Update quiz routing” for tier-aware quiz flow.
- **[ ] Not done — Update user-facing routing** — “Update user-facing routing” for tier-aware subject/detail pages.
- **[ ] Not done — Run acceptance tests** — Tier-related acceptance tests not marked done.
- **[ ] Not done — Deploy to production** — Not marked done.

---

## 6. DEPLOYMENT_CHECKLIST.md (Question types / JSON import)

### Verification checklist (all unchecked)
- **[ ] Not done — Before deployment:** Code reviewed, all tests passing, no TypeScript errors, no console warnings, documentation reviewed, integration steps completed.
- **[ ] Not done — After deployment:** Existing questions load, new question types work, navigation buttons work, admin forms work, import works, no runtime errors, performance acceptable.

### Integration steps
- **[x] Done — Initialize Registry (Required)** — Registry initialization in `App.tsx` is now done.
- **[x] Done — Update QuizPlayerPage (Required)** — QuizPlayerPage already uses QuestionRenderer and QuizNavigation; registry init was the missing piece.

---

## 7. TASK_COMPLETION_SUMMARY.md

### Next steps
- **[x] Done (partial) —** Fix Toast context errors — Addressed in SubjectOpsDetail, DiagramMetadataManager, DiagramMetadataImporter; many files still use `showToast`.
- **[x] Done (partial) —** Fix Confirm context errors — Addressed in DiagramsPage, UnitsPageEnhanced, ImportLogPage, PlaylistsPage, QuizzesPage, SubjectsPage.
- **[ ] Not done —** Remove unused imports (~30).
- **[ ] Not done —** Fix type mismatches (~15), missing properties (~20), function signature mismatches (~10).
- **[ ] Not done —** Run `npm run typecheck` and achieve zero (or minimal) errors.
- **[ ] Not done —** After fixes: production build, full test, deploy, monitoring, optional custom domain.
- **[ ] Not done —** Optional: more content, auth, progress/analytics, admin dashboard, mobile, real-time features.

---

## 8. COVERAGE_FEATURE.md & COVERAGE_IMPLEMENTATION.md

### Not implemented / “Future”
- **[ ] Not done — Editable coverage thresholds in admin** — Change MIN_PROMPTS_PER_QUESTION_TYPE, MIN_PROMPTS_PER_TOPIC, MIN_PROMPTS_PER_UNIT in the UI.

### COVERAGE_IMPLEMENTATION.md testing checklist (all unchecked)
- **[ ] Not done —** Load coverage dashboard, seed Maths taxonomy, verify papers/units/topics/question types created, coverage % correct, expand/collapse, “Show Missing Only”, missing types table, status badges.

### Next steps (optional, not done)
- **[ ] Not done —** Import existing prompts and link to question types; set `prompt.question_type_id`.
- **[ ] Not done —** Coverage alerts (e.g. email/Slack when coverage drops).
- **[ ] Not done —** Bulk import for question types and batch prompt linking.
- **[ ] Not done —** Analytics (coverage over time, question type usage, creation velocity).
- **[ ] Not done —** Auto-generation (e.g. AI suggestions, template-based questions).

---

## 9. DELIVERABLES_SUMMARY.md & Paper assignment

### Admin routing vs “Enhanced” pages
- **[x] Done — Use Enhanced pages for paper assignment** — **App.tsx** now uses: **UnitsPageEnhanced**, **TopicsPageEnhanced**, **PapersPageEnhanced**, **PromptsPageEnhanced**, **JsonImportPageEnhanced** for admin units, topics, papers, prompts, and JSON import. The Enhanced variants (with full paper-assignment UI) are the active admin routes.

---

## 10. NETLIFY_ENVIRONMENT_SETUP.md

### Operational (not code)
- **[ ] Not done — Netlify env vars** — If deploying to Netlify, ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in the Netlify dashboard. Verification is per-deployment.

---

## 11. PAPER_MASTER_QUIZ_IMPLEMENTATION.md & PAPER_QUIZ_BUILDER_COMPLETE.md

- Docs describe implementation as complete. **[ ] Not done —** Operational: run migration for `quizzes.paper_id`, `quiz_type`, etc., if not yet run; confirm Tools/admin links point to PaperQuizBuilderPage / PaperMasterQuizzesPage as intended.

---

## 12. README / other docs

- **README.md**, **README_JSON_IMPORT.md**, **README_TIER_SYSTEM.md**, **SUPABASE_URL_FIX.md**, **PORT_CONFIGURATION.md**, **QUESTION_TYPES_GUIDE.md**, **PAPERS_FEATURE.md**, **PAPER_ASSIGNMENT_*.md**, **COMPLETE_FEATURE_SUMMARY.md**, **IMPLEMENTATION_SUMMARY.md**, **questionValidation/README.md** — No additional unchecked implementation items identified beyond what’s above.

---

## Summary table

| Source doc                         | Category        | Status | Notes |
|------------------------------------|-----------------|--------|--------|
| VISUAL_IMPROVEMENTS_CHECKLIST      | UX              | Not done | Admin vs user-facing consistency review (optional) |
| QUIZ_SUBMISSION_FIX_PLAN           | Quiz flow       | Not done | Phases 1–5: submit wiring, Supabase attempts, Continue flow, full type testing |
| DEVELOPMENT_STATUS / ERRORS_AND_FIXES | TypeScript   | Partial | Toast/Confirm fixed in several files; unused imports, types, signatures still outstanding |
| INTEGRATION_PATCH / INTEGRATION_GUIDE | Integration  | Partial | **Done:** Registry init in App. **Not done:** Integration testing checklist |
| DEPLOYMENT_GUIDE (tier)             | Deployment     | Partial | **Done:** Admin routing (Enhanced pages). **Not done:** Run migration, quiz/user routing, acceptance tests, production deploy |
| DEPLOYMENT_CHECKLIST               | Verification   | Partial | **Done:** Registry init. **Not done:** Pre/post deployment verification |
| TASK_COMPLETION_SUMMARY            | Next steps      | Partial | **Done:** Some Toast/Confirm fixes. **Not done:** Full typecheck/build/deploy and optional enhancements |
| COVERAGE_*                         | Feature / future| Not done | Editable thresholds; testing checklist; optional next steps |
| DELIVERABLES_SUMMARY                | Routing        | **Done** | App uses Enhanced pages for units, topics, papers, prompts, JSON import |
| NETLIFY_ENVIRONMENT_SETUP          | Ops            | Not done | Confirm Netlify env vars per deployment |
| PAPER_MASTER_QUIZ_*                | Ops / routing  | Not done | Run migration if needed; confirm links to PaperQuizBuilder / PaperMasterQuizzes |

---

*Updated after implementation pass. Last updated: February 4, 2026.*

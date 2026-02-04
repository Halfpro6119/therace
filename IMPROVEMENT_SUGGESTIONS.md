# Grade9 Sprint – Improvement Suggestions

This document summarizes code review findings and suggests changes to improve functionality, maintainability, and user experience.

**Date**: February 4, 2026  
**Scope**: Full codebase analysis (src/, admin/, utils/, pages/, components/)

---

## 1. Critical Functionality Issues

### 1.1 Attempt Persistence Schema Mismatch

**Issue**: `submitAnswerPipeline.ts` inserts per-question attempt rows into Supabase with a schema that **does not match** the `attempts` table in the migrations.

| submitAnswerPipeline inserts | attempts table (migration) expects |
|-----------------------------|-----------------------------------|
| `id`, `quizId`, `promptId`, `userAnswer`, `isCorrect`, `marksAwarded`, `maxMarks`, `timestamp`, `attemptNumber` | `id`, `user_id`, `quiz_id`, `started_at`, `finished_at`, `correct_prompt_ids`, `missed_prompt_ids`, `time_taken_sec`, `accuracy_pct` |

The DB schema is for **quiz-level summaries** (one row per completed quiz). The pipeline expects **per-question answers** (one row per answer). Inserts will fail (missing `user_id`, wrong columns).

**Recommendation**:
- **Option A**: Add a new `attempt_responses` table for per-question data (promptId, userAnswer, isCorrect, etc.), and keep `attempts` for full quiz summaries.
- **Option B**: If per-question storage is not required, remove Supabase persistence from `submitAnswerPipeline` and rely on localStorage + the final quiz completion save in `QuizPlayerPage.endQuiz()`. **✅ Implemented**

---

### 1.2 User ID Required for Attempts

**Issue**: The `attempts` table requires `user_id` (NOT NULL). The app does not appear to use Supabase Auth; users are anonymous. Without auth, inserts into `attempts` (and `mastery`, `streaks`) will fail.

**Recommendation**:
- Add optional anonymous user support (e.g. Supabase anonymous auth or a device/session ID).
- Or relax RLS and make `user_id` nullable for anonymous users until auth is implemented.
- Document current “localStorage-only” behavior clearly for users and future developers.

---

### 1.3 Quiz Data Loading for Paper Master Quizzes

**Issue**: `QuizPlayerPage` uses `db.getQuiz()` and `db.getPromptsByIds(quiz.promptIds)`. Paper master quizzes may have empty `promptIds` and instead derive prompts from `db.getPromptsForPaperMasterQuiz(paperId)`.

**Recommendation**:
- In `loadQuizData`, detect `quizType === 'paper_master'` and load prompts via `getPromptsForPaperMasterQuiz` when `promptIds` is empty.
- Same for `subject_master` using `getPromptsForSubjectMasterQuiz`.

**✅ Implemented**: `loadQuizData` now loads prompts from `getPromptsForPaperMasterQuiz(paperId)` for paper master quizzes and `getPromptsForSubjectMasterQuiz(subjectId)` for subject master quizzes. `mapQuiz` updated to include `paperId` and `quizType`.

---

### 1.4 Storage Mastery Stubs

**Issue**: In `storage.ts`:
```typescript
getMasteryByPromptId: (_promptId: string): number => 0,
setMasteryByPromptId: (_promptId: string, _level: number): void => {},
```
These are no-ops. `submitAnswerPipeline` calls them, but no mastery is persisted per prompt.

**Recommendation**:
- Either implement prompt-level mastery in localStorage (or Supabase) and wire it to `storage`.
- Or remove these calls from the pipeline until mastery is implemented, to avoid misleading “updates.”

---

## 2. Architecture & Code Organization

### 2.1 Duplicate / Legacy Page Variants

**Issue**: Multiple variants of the same page exist:
- `QuizPlayerPage.backup.tsx`, `.enhanced.tsx`, `.fixed.tsx`
- `SubjectDetailPage`, `SubjectDetailPageEnhanced`, `SubjectDetailPageWithTier`
- `UnitsPage`, `UnitsPageEnhanced`, `UnitsPageWithTier` (admin)
- `PromptsPage`, `PromptsPageEnhanced`, `PromptsPageWithTier`
- `JsonImportPage`, `JsonImportPageEnhanced`, `JsonImportPageWithTier`

**Recommendation**:
- Decide on the canonical version for each (e.g. `SubjectDetailPageWithTier`, `JsonImportPageEnhanced`).
- Remove or archive backup/legacy files.
- Add a brief README or comment indicating which variants are active and why others exist, if kept.

**✅ Implemented**: Legacy/backup variants removed. Canonical versions documented in `src/PAGE_VARIANTS.md`. App uses QuizPlayerPage, SubjectDetailPageWithTier, UnitsPageEnhanced, PromptsPageEnhanced, JsonImportPageEnhanced.

---

### 2.2 Centralize DB Client Error Handling

**Issue**: Most `db.*` methods throw on Supabase errors. Callers must wrap in try/catch. There is no unified logging or retry for transient failures.

**Recommendation**:
- Introduce a small wrapper or hook for common patterns (e.g. `useDbQuery`) with logging and error toasts.
- Consider retries for network errors where appropriate.
- Document which methods throw and what callers should handle.

**✅ Implemented**: `src/hooks/useDbQuery.ts` added: runs async query with loading/error state and optional `onError` (e.g. toast). Use for consistent DB error handling.

---

### 2.3 Types: Reduce `any` Usage

**Issue**: Several areas use `any`:
- `db.client.ts`: `mapPrompt` row typing, `createPaper`, `createQuestionType`, etc.
- `submitAnswerPipeline`: `userAnswer: any`
- Various `(row: any)` in mappers

**Recommendation**:
- Define DB row types (e.g. `PromptsRow`, `PapersRow`) and use them in mappers.
- Use discriminated unions for `userAnswer` by question type (`short` → string, `fill` → string[], etc.).
- Gradually replace `any` with proper types for better safety and IDE support.

**✅ Implemented**: `UserAnswer` type added (`string | string[] | Record<string, string>`); used in `submitAnswerPipeline`. `SubjectsRow` added in `db/client` and used in `mapSubject`. Pipeline helpers use `unknown` where appropriate.

---

## 3. UX & Quiz Flow

### 3.1 Quiz Submission Fix Plan (from QUIZ_SUBMISSION_FIX_PLAN)

**Status**: Partially implemented.

**Outstanding items**:
- [ ] Ensure all question types have a visible submit button and `onClick` → `onSubmit`.
- [ ] Disable submit when answer is empty.
- [ ] Add explicit “Continue” after feedback (some flows may still rely on “Next”).
- [ ] Run a full test pass for Short, MCQ, Fill, Match, Label.

**Recommendation**: Address these items before promoting quiz flows as production-ready.

---

### 3.2 Remove or Gate Debug Logging

**Issue**: `submitAnswerPipeline` logs extensively:
```typescript
console.log('[submitAnswer] Starting submission pipeline', {...})
console.log('[submitAnswer] Grading answer...')
// etc.
```

**Recommendation**:
- Use a debug flag (e.g. `import.meta.env.DEV` or `localStorage.getItem('debug_submit')`).
- Or replace with a lightweight logging utility that can be disabled in production.

**✅ Implemented**: Debug logging in `submitAnswerPipeline` is gated with `import.meta.env.DEV`.

---

### 3.3 Sound System Persistence

**Issue**: `soundsEnabled` is derived from `soundSystem.isEnabled()`. Ensure the setting persists across sessions (e.g. via localStorage) and is restored on load.

**Recommendation**: Confirm `soundSystem` persists and restores preference; document this in the settings UI.

**✅ Implemented**: Sound preference is persisted in localStorage (`grade9_sounds_enabled`) and restored in constructor. Comment added in `sounds.ts`.

---

## 4. Admin & Content Management

### 4.1 Paper Master Quiz / Tier Migrations

**Issue**: `UNIMPLEMENTED_CHANGES.md` notes that migrations for `quizzes.paper_id`, `quiz_type`, tier system, etc. may not have been run.

**Recommendation**:
- Confirm all required migrations are applied in Supabase.
- Add a small “health check” or admin page that verifies schema (e.g. `paper_id`, `quiz_type` exist).
- Document migration order and dependencies.

---

### 4.2 Coverage Feature Gaps

**Issue**: Coverage dashboard and related features are only partially implemented:
- Editable coverage thresholds in admin UI.
- Coverage alerts (e.g. when coverage drops).
- Bulk import for question types and batch prompt linking.
- Coverage over time analytics.

**Recommendation**: Prioritize editable thresholds and basic coverage checks; treat the rest as follow-up enhancements.

---

### 4.3 Admin vs User-Facing Design Consistency

**Issue**: `VISUAL_IMPROVEMENTS_CHECKLIST.md` recommends reviewing consistency between admin and user-facing UI.

**Recommendation**: Use shared design tokens, buttons, and layout patterns where possible so the app feels cohesive.

---

## 5. Testing & Quality

### 5.1 Test Coverage

**Issue**: Tests exist for `questionEngine` (e.g. `grade.test.ts`, `normalizeQuestion.test.ts`) but coverage for pages, quiz flow, and integration is limited.

**Recommendation**:
- Add integration tests for core flows (load quiz, submit answer, see feedback, continue).
- Add tests for question type handlers (short, mcq, fill, match, label).
- Add smoke tests for critical admin flows (create unit, assign paper, import JSON).

---

### 5.2 TypeScript Status

**Status**: `npm run typecheck` passes (tsconfig.app.json excludes backup/enhanced/fixed variants).

**Recommendation**: Keep it passing; avoid re-introducing `any` or relaxing strictness without a clear plan.

---

## 6. Security & Configuration

### 6.1 Environment Variables

**Issue**: `.env.example` is deleted (per git status). New contributors lack a template for required vars.

**Recommendation**:
- Restore `.env.example` with placeholder values (no secrets).
- Document all `VITE_*` vars in README or a dedicated env doc.
- Ensure Netlify/Vercel env vars are set per deployment guides.

**✅ Implemented**: `.env.example` restored with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` placeholders. README updated with env table and reference to `.env.example`.

---

### 6.2 Supabase RLS Policies

**Issue**: Some policies use `USING (true)` and `WITH CHECK (true)`, effectively allowing public access. This may be intentional for anonymous use but weakens isolation.

**Recommendation**: Document intended access model. If user-specific data is added, tighten RLS to `auth.uid()` where appropriate.

---

## 7. Performance & Bundle

### 7.1 Lazy Loading for Admin Routes

**Issue**: Admin routes are likely bundled with the main app. Admin pages (DiagramEditor, CoveragePage, etc.) can be heavy.

**Recommendation**:
- Use `React.lazy()` and `Suspense` for admin routes.
- Reduces initial load for students who never hit `/admin`.

---

### 7.2 Diagram Templates Dynamic Import

**Issue**: Diagram templates may be loaded eagerly. If many templates exist, consider code-splitting.

**Recommendation**: Load diagram template modules only when a quiz/question requires them.

---

## 8. Documentation

### 8.1 README Accuracy

**Issue**: README mentions “~150 TypeScript errors” and references `ERRORS_AND_FIXES.md`. Typecheck now passes.

**Recommendation**: Update README to reflect current status (typecheck passing, known issues, etc.).

**✅ Implemented**: README updated: typecheck passing, outdated "~150 errors" and Known Issues section removed. Status set to "Active development; typecheck passing".

---

### 8.2 API / Data Flow Docs

**Issue**: Data flow (load quiz → submit answer → save attempt) is spread across several files. New developers may struggle to trace the pipeline.

**Recommendation**:
- Add a short “Data Flow” section to the README or a dedicated doc.
- Document: `QuizPlayerPage` → `submitAnswer` → `storage` / Supabase.
- Note the difference between per-question (pipeline) and quiz-level (endQuiz) persistence.

**✅ Implemented**: README now includes a "Data Flow (Quiz → Submit → Persistence)" section covering load quiz, per-question submit (no Supabase per-question rows), quiz completion (localStorage attempt), and sounds persistence.

---

## 9. Priority Summary

| Priority | Item | Effort |
|----------|------|--------|
| Critical | Fix attempt persistence schema (pipeline vs DB) | Medium |
| Critical | Handle paper master / subject master quiz loading | Low |
| High | Implement or remove mastery by prompt | Low |
| High | Add auth or relax user_id for anonymous attempts | Medium |
| Medium | Clean up duplicate/legacy page variants | Low |
| Medium | Reduce `any` usage in db and pipeline | Medium |
| Medium | Complete quiz submission fix plan (submit, continue, test) | Medium |
| Low | Gate debug logging | Low |
| Low | Lazy-load admin routes | Low |
| Low | Restore .env.example | Low |

---

## 10. Quick Wins

1. **Restore `.env.example`** – Copy from `.env.local` (remove secrets), commit.
2. **Remove backup/legacy QuizPlayerPage files** – If `.backup`, `.enhanced`, `.fixed` are unused.
3. **Gate `console.log` in submitAnswerPipeline** – Use `if (import.meta.env.DEV)` or a debug flag.
4. **Document current persistence model** – Clarify localStorage vs Supabase for attempts.
5. **Add paper master quiz prompt loading** – Small change in `loadQuizData` in QuizPlayerPage.

---

*Generated from codebase analysis. Update this document as improvements are implemented.*

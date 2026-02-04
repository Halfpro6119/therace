# Page Variants (Canonical Versions)

This project previously had multiple variants of some pages. The following are the **active** versions used in `App.tsx`:

| Route / Area | Canonical component | Location |
|--------------|---------------------|----------|
| `/quiz/:quizId` | `QuizPlayerPage` | `pages/QuizPlayerPage.tsx` |
| `/subjects/:subjectId` | `SubjectDetailPageWithTier` | `pages/SubjectDetailPageWithTier.tsx` |
| Admin Units | `UnitsPageEnhanced` | `admin/UnitsPageEnhanced.tsx` |
| Admin Prompts | `PromptsPageEnhanced` | `admin/PromptsPageEnhanced.tsx` |
| Admin JSON Import | `JsonImportPageEnhanced` | `admin/JsonImportPageEnhanced.tsx` |

Legacy/backup variants (e.g. `QuizPlayerPage.backup`, `SubjectDetailPage`, `UnitsPage`, `PromptsPage`, `JsonImportPage`) have been removed. The admin `QuizPlayerPageWithTier` exists for admin-tier testing and is not used in the main app routes.

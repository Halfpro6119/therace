import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { HomePage } from './pages/HomePage';
import { SubjectsPage } from './pages/SubjectsPage';
import { SubjectDetailPageWithTier } from './pages/SubjectDetailPageWithTier';
import { QuizPlayerPage } from './pages/QuizPlayerPage';
import { ResultsPage } from './pages/ResultsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SubjectBreakdownHub } from './pages/SubjectBreakdownHub';
import { SubjectBreakdownDetail } from './pages/SubjectBreakdownDetail';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { PlaylistDetailPage } from './pages/PlaylistDetailPage';
import { LibraryPage } from './pages/LibraryPage';
import { EnglishCampusHomePage } from './pages/english/EnglishCampusHomePage';
import { EnglishLanguageDashboard } from './pages/english/EnglishLanguageDashboard';
import { EnglishWritingWorkspacePage } from './pages/english/EnglishWritingWorkspacePage';
import { EnglishLanguageResultPage } from './pages/english/EnglishLanguageResultPage';
import { EnglishDraftsPage } from './pages/english/EnglishDraftsPage';
import { EnglishCompareDraftsPage } from './pages/english/EnglishCompareDraftsPage';
import { EnglishDraftMarkingPage } from './pages/english/EnglishDraftMarkingPage';
import { EnglishLiteraturePage } from './pages/english/EnglishLiteraturePage';
import { EnglishLiteraturePlaceholder } from './pages/english/EnglishLiteraturePlaceholder';
import { EnglishLiteratureWorkspacePage } from './pages/english/EnglishLiteratureWorkspacePage';
import { EnglishLiteratureResultPage } from './pages/english/EnglishLiteratureResultPage';
import { EnglishLiteratureDraftsPage } from './pages/english/EnglishLiteratureDraftsPage';
import { EnglishLiteratureSeenPoetryPage } from './pages/english/EnglishLiteratureSeenPoetryPage';
import { EnglishLiteratureUnseenPage } from './pages/english/EnglishLiteratureUnseenPage';
import { EnglishLiteratureTextsPage } from './pages/english/EnglishLiteratureTextsPage';
import { EnglishLiteratureModelDrillsPage } from './pages/english/EnglishLiteratureModelDrillsPage';
import { EnglishQuotationLabPage } from './pages/english/EnglishQuotationLabPage';
import { EnglishQuotationLabThemePage } from './pages/english/EnglishQuotationLabThemePage';
import { EnglishQuotationLabQuoteLabPage } from './pages/english/EnglishQuotationLabQuoteLabPage';
import { EnglishQuotationLabQuoteDetailPage } from './pages/english/EnglishQuotationLabQuoteDetailPage';
import { EnglishQuotationLabDrillsPage } from './pages/english/EnglishQuotationLabDrillsPage';
import { EnglishQuotationLabMicroPage } from './pages/english/EnglishQuotationLabMicroPage';
import { EnglishQuotationLabProgressPage } from './pages/english/EnglishQuotationLabProgressPage';
import { EnglishVocabLabHomePage } from './pages/english/vocab/EnglishVocabLabHomePage';
import { EnglishVocabSetsPage } from './pages/english/vocab/EnglishVocabSetsPage';
import { EnglishVocabSetDetailPage } from './pages/english/vocab/EnglishVocabSetDetailPage';
import { EnglishVocabSessionPage } from './pages/english/vocab/EnglishVocabSessionPage';
import { EnglishVocabResultsPage } from './pages/english/vocab/EnglishVocabResultsPage';
import { EnglishVocabHeatmapPage } from './pages/english/vocab/EnglishVocabHeatmapPage';
import { EnglishVocabWordDetailPage } from './pages/english/vocab/EnglishVocabWordDetailPage';
import { MathsMasteryHomePage } from './pages/maths/MathsMasteryHomePage';
import { MathsHubPage } from './pages/maths/MathsHubPage';
import { FurtherMathsPlaceholder } from './pages/maths/FurtherMathsPlaceholder';
import { StatisticsPlaceholder } from './pages/maths/StatisticsPlaceholder';
import { ScienceLabHomePage } from './pages/science/ScienceLabHomePage';
import { ScienceLabSubjectPage } from './pages/science/ScienceLabSubjectPage';
import { ScienceLabModePage } from './pages/science/ScienceLabModePage';
import { ScienceLabConceptLabPage } from './pages/science/ScienceLabConceptLabPage';
import { ScienceLabQuestionLabPage } from './pages/science/ScienceLabQuestionLabPage';
import { ScienceLabMethodMarkPage } from './pages/science/ScienceLabMethodMarkPage';
import { ScienceLabPracticalLabPage } from './pages/science/ScienceLabPracticalLabPage';
import { ScienceLabEquationLabPage } from './pages/science/ScienceLabEquationLabPage';
import { ScienceLabMisconceptionLabPage } from './pages/science/ScienceLabMisconceptionLabPage';
import { ScienceLabFlashcardPage } from './pages/science/ScienceLabFlashcardPage';
import { ScienceLabQuickCheckPage } from './pages/science/ScienceLabQuickCheckPage';
import { AdminLayout } from './admin/AdminLayout';

// Admin routes: lazy-loaded so students who never hit /admin don't download admin bundle
const AdminDashboard = lazy(() => import('./admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const ImportPage = lazy(() => import('./admin/ImportPage').then(m => ({ default: m.ImportPage })));
const AdminSubjectsPage = lazy(() => import('./admin/SubjectsPage').then(m => ({ default: m.SubjectsPage })));
const UnitsPageEnhanced = lazy(() => import('./admin/UnitsPageEnhanced').then(m => ({ default: m.UnitsPageEnhanced })));
const TopicsPageEnhanced = lazy(() => import('./admin/TopicsPageEnhanced').then(m => ({ default: m.TopicsPageEnhanced })));
const PapersPageEnhanced = lazy(() => import('./admin/PapersPageEnhanced').then(m => ({ default: m.PapersPageEnhanced })));
const PromptsPageEnhanced = lazy(() => import('./admin/PromptsPageEnhanced').then(m => ({ default: m.PromptsPageEnhanced })));
const DiagramsPage = lazy(() => import('./admin/DiagramsPage').then(m => ({ default: m.DiagramsPage })));
const DiagramEditor = lazy(() => import('./admin/DiagramEditor').then(m => ({ default: m.DiagramEditor })));
const DiagramTemplatesPage = lazy(() => import('./admin/DiagramTemplatesPage').then(m => ({ default: m.DiagramTemplatesPage })));
const DiagramTemplateEditor = lazy(() => import('./admin/DiagramTemplateEditor').then(m => ({ default: m.DiagramTemplateEditor })));
const DiagramTemplateDetailPage = lazy(() => import('./admin/DiagramTemplateDetailPage').then(m => ({ default: m.DiagramTemplateDetailPage })));
const QuizzesPage = lazy(() => import('./admin/QuizzesPage').then(m => ({ default: m.QuizzesPage })));
const PlaylistsPage = lazy(() => import('./admin/PlaylistsPage').then(m => ({ default: m.PlaylistsPage })));
const ToolsPage = lazy(() => import('./admin/ToolsPage').then(m => ({ default: m.ToolsPage })));
const AuditPage = lazy(() => import('./admin/AuditPage').then(m => ({ default: m.AuditPage })));
const AdminVocabSetsPage = lazy(() => import('./admin/vocab/AdminVocabSetsPage').then(m => ({ default: m.AdminVocabSetsPage })));
const AdminVocabWordsPage = lazy(() => import('./admin/vocab/AdminVocabWordsPage').then(m => ({ default: m.AdminVocabWordsPage })));
const AdminVocabImportPage = lazy(() => import('./admin/vocab/AdminVocabImportPage').then(m => ({ default: m.AdminVocabImportPage })));
const AdminVocabExportPage = lazy(() => import('./admin/vocab/AdminVocabExportPage').then(m => ({ default: m.AdminVocabExportPage })));
const AdminQuotationAuditPage = lazy(() => import('./admin/quotation/AdminQuotationAuditPage').then(m => ({ default: m.AdminQuotationAuditPage })));
const AdminQuotationGoldPage = lazy(() => import('./admin/quotation/AdminQuotationGoldPage').then(m => ({ default: m.AdminQuotationGoldPage })));
const ContentOpsHome = lazy(() => import('./admin/ContentOpsHome').then(m => ({ default: m.ContentOpsHome })));
const SubjectOpsDetail = lazy(() => import('./admin/ops/SubjectOpsDetail').then(m => ({ default: m.SubjectOpsDetail })));
const ImportLogPage = lazy(() => import('./admin/ops/ImportLogPage').then(m => ({ default: m.ImportLogPage })));
const CoveragePage = lazy(() => import('./admin/CoveragePage').then(m => ({ default: m.CoveragePage })));
const GcseScopePage = lazy(() => import('./admin/GcseScopePage').then(m => ({ default: m.GcseScopePage })));
const DiagramMetadataManager = lazy(() => import('./admin/DiagramMetadataManager').then(m => ({ default: m.DiagramMetadataManager })));
const DiagramMetadataImporter = lazy(() => import('./admin/DiagramMetadataImporter').then(m => ({ default: m.DiagramMetadataImporter })));
const JsonImportPageEnhanced = lazy(() => import('./admin/JsonImportPageEnhanced').then(m => ({ default: m.JsonImportPageEnhanced })));
const CsvImportPageWithTier = lazy(() => import('./admin/CsvImportPageWithTier').then(m => ({ default: m.CsvImportPageWithTier })));
const DeleteGoldQuestionsPage = lazy(() => import('./admin/DeleteGoldQuestionsPage').then(m => ({ default: m.DeleteGoldQuestionsPage })));
import { ToastProvider } from './contexts/ToastContext';
import { ConfirmProvider } from './contexts/ConfirmContext';
import { CommandPalette } from './components/CommandPalette';
import { ScrollToTop } from './components/ScrollToTop';
import { initializeQuestionRegistry } from './utils/questionRegistry';

function AdminRouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
    </div>
  );
}

function App() {
  useEffect(() => {
    initializeQuestionRegistry();
  }, []);

  return (
    <ToastProvider>
      <ConfirmProvider>
        <BrowserRouter>
          <ScrollToTop />
          <CommandPalette />
      <Routes>
        <Route path="/quiz/:quizId" element={<QuizPlayerPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="subjects" element={<AdminSubjectsPage />} />
          <Route path="units" element={<UnitsPageEnhanced />} />
          <Route path="topics" element={<TopicsPageEnhanced />} />
          <Route path="papers" element={<PapersPageEnhanced />} />
          <Route path="prompts" element={<PromptsPageEnhanced />} />
          <Route path="diagrams" element={<DiagramsPage />} />
          <Route path="diagram-templates" element={<DiagramTemplatesPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="playlists" element={<PlaylistsPage />} />
          <Route path="coverage" element={<CoveragePage />} />
          <Route path="scope" element={<GcseScopePage />} />
          <Route path="diagram-metadata" element={<DiagramMetadataManager />} />
          <Route path="diagram-import" element={<DiagramMetadataImporter />} />
          <Route path="json-import" element={<JsonImportPageEnhanced />} />
          <Route path="csv-import" element={<CsvImportPageWithTier />} />
          <Route path="delete-gold-questions" element={<DeleteGoldQuestionsPage />} />
          <Route path="ops" element={<ContentOpsHome />} />
          <Route path="ops/subjects/:subjectId" element={<SubjectOpsDetail />} />
          <Route path="ops/import-log" element={<ImportLogPage />} />
          <Route path="import" element={<ImportPage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="vocab/sets" element={<AdminVocabSetsPage />} />
          <Route path="vocab/words" element={<AdminVocabWordsPage />} />
          <Route path="vocab/import" element={<AdminVocabImportPage />} />
          <Route path="vocab/export" element={<AdminVocabExportPage />} />
          <Route path="quotation/audit" element={<AdminQuotationAuditPage />} />
          <Route path="quotation/gold" element={<AdminQuotationGoldPage />} />
        </Route>

        <Route path="/admin/diagrams/:diagramId" element={<Suspense fallback={<AdminRouteFallback />}><DiagramEditor /></Suspense>} />
        <Route path="/admin/diagram-templates/:templateId" element={<Suspense fallback={<AdminRouteFallback />}><DiagramTemplateEditor /></Suspense>} />
        <Route path="/admin/diagram-templates/view/:id" element={<Suspense fallback={<AdminRouteFallback />}><DiagramTemplateDetailPage /></Suspense>} />

        <Route
          path="*"
          element={
            <AppShell>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/playlists/:playlistId" element={<PlaylistDetailPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/subjects" element={<SubjectsPage />} />
                <Route path="/subjects/:subjectId" element={<SubjectDetailPageWithTier />} />
                <Route path="/english-campus" element={<EnglishCampusHomePage />} />
                <Route path="/english-campus/language" element={<EnglishLanguageDashboard />} />
                <Route path="/english-campus/language/task/:taskId" element={<EnglishWritingWorkspacePage />} />
                <Route path="/english-campus/language/result" element={<EnglishLanguageResultPage />} />
                <Route path="/english-campus/language/drafts" element={<EnglishDraftsPage />} />
                <Route path="/english-campus/language/draft/:draftId/marking" element={<EnglishDraftMarkingPage />} />
                <Route path="/english-campus/language/compare" element={<EnglishCompareDraftsPage />} />
                <Route path="/english-campus/literature" element={<EnglishLiteraturePage />} />
                <Route path="/english-campus/literature/task/:taskId" element={<EnglishLiteratureWorkspacePage />} />
                <Route path="/english-campus/literature/task/:taskId/model-drills" element={<EnglishLiteratureModelDrillsPage />} />
                <Route path="/english-campus/literature/result" element={<EnglishLiteratureResultPage />} />
                <Route path="/english-campus/literature/drafts" element={<EnglishLiteratureDraftsPage />} />
                <Route path="/english-campus/literature/poetry" element={<EnglishLiteratureSeenPoetryPage />} />
                <Route path="/english-campus/literature/unseen" element={<EnglishLiteratureUnseenPage />} />
                <Route path="/english-campus/literature/texts" element={<EnglishLiteratureTextsPage />} />
                <Route path="/english-campus/literature/quotation-lab" element={<EnglishQuotationLabPage />} />
                <Route path="/english-campus/literature/quotation-lab/theme/:themeId" element={<EnglishQuotationLabThemePage />} />
                <Route path="/english-campus/literature/quotation-lab/quote-lab/:sourceId" element={<EnglishQuotationLabQuoteLabPage />} />
                <Route path="/english-campus/literature/quotation-lab/quote-lab/:sourceId/quote/:quoteId" element={<EnglishQuotationLabQuoteDetailPage />} />
                <Route path="/english-campus/literature/quotation-lab/drills/:sourceId" element={<EnglishQuotationLabDrillsPage />} />
                <Route path="/english-campus/literature/quotation-lab/micro/:sourceId" element={<EnglishQuotationLabMicroPage />} />
                <Route path="/english-campus/literature/quotation-lab/progress/:sourceId" element={<EnglishQuotationLabProgressPage />} />
                <Route path="/english-campus/literature/:section" element={<EnglishLiteraturePlaceholder />} />
                <Route path="/english-campus/vocab" element={<EnglishVocabLabHomePage />} />
                <Route path="/english-campus/vocab/sets" element={<EnglishVocabSetsPage />} />
                <Route path="/english-campus/vocab/set/:setId" element={<EnglishVocabSetDetailPage />} />
                <Route path="/english-campus/vocab/session" element={<EnglishVocabSessionPage />} />
                <Route path="/english-campus/vocab/results/:sessionId" element={<EnglishVocabResultsPage />} />
                <Route path="/english-campus/vocab/heatmap" element={<EnglishVocabHeatmapPage />} />
                <Route path="/english-campus/vocab/word/:wordId" element={<EnglishVocabWordDetailPage />} />
                <Route path="/maths-mastery" element={<MathsMasteryHomePage />} />
                <Route path="/maths-mastery/maths" element={<MathsHubPage />} />
                <Route path="/maths-mastery/further-maths" element={<FurtherMathsPlaceholder />} />
                <Route path="/maths-mastery/statistics" element={<StatisticsPlaceholder />} />
                <Route path="/science-lab" element={<ScienceLabHomePage />} />
                <Route path="/science-lab/subjects" element={<ScienceLabSubjectPage />} />
                <Route path="/science-lab/:subject" element={<ScienceLabModePage />} />
                <Route path="/science-lab/:subject/:paper/:tier/flashcard" element={<ScienceLabFlashcardPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/quick-check" element={<ScienceLabQuickCheckPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/concept" element={<ScienceLabConceptLabPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/question" element={<ScienceLabQuestionLabPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/methodMark" element={<ScienceLabMethodMarkPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/practical" element={<ScienceLabPracticalLabPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/equation" element={<ScienceLabEquationLabPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/misconception" element={<ScienceLabMisconceptionLabPage />} />
                <Route path="/results/:attemptId" element={<ResultsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/subjects" element={<SubjectBreakdownHub />} />
                <Route path="/profile/subjects/:subjectId" element={<SubjectBreakdownDetail />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
              </Routes>
            </AppShell>
          }
        />
      </Routes>
        </BrowserRouter>
      </ConfirmProvider>
    </ToastProvider>
  );
}

export default App;

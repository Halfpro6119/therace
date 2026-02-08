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
import { EnglishLiteraturePage } from './pages/english/EnglishLiteraturePage';
import { EnglishLiteraturePlaceholder } from './pages/english/EnglishLiteraturePlaceholder';
import { EnglishVocabLabPage } from './pages/english/EnglishVocabLabPage';
import { MathsMasteryHomePage } from './pages/maths/MathsMasteryHomePage';
import { MathsHubPage } from './pages/maths/MathsHubPage';
import { FurtherMathsPlaceholder } from './pages/maths/FurtherMathsPlaceholder';
import { StatisticsPlaceholder } from './pages/maths/StatisticsPlaceholder';
import { ScienceLabHomePage } from './pages/science/ScienceLabHomePage';
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
                <Route path="/english-campus/language/compare" element={<EnglishCompareDraftsPage />} />
                <Route path="/english-campus/literature" element={<EnglishLiteraturePage />} />
                <Route path="/english-campus/literature/:section" element={<EnglishLiteraturePlaceholder />} />
                <Route path="/english-campus/vocab" element={<EnglishVocabLabPage />} />
                <Route path="/maths-mastery" element={<MathsMasteryHomePage />} />
                <Route path="/maths-mastery/maths" element={<MathsHubPage />} />
                <Route path="/maths-mastery/further-maths" element={<FurtherMathsPlaceholder />} />
                <Route path="/maths-mastery/statistics" element={<StatisticsPlaceholder />} />
                <Route path="/science-lab" element={<ScienceLabHomePage />} />
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

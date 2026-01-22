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
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { ImportPage } from './admin/ImportPage';
import { SubjectsPage as AdminSubjectsPage } from './admin/SubjectsPage';
import { UnitsPageWithTier } from './admin/UnitsPageWithTier';
import { TopicsPageWithTier } from './admin/TopicsPageWithTier';
import { PapersPage } from './admin/PapersPage';
import { PromptsPageWithTier } from './admin/PromptsPageWithTier';
import { DiagramsPage } from './admin/DiagramsPage';
import { DiagramEditor } from './admin/DiagramEditor';
import { DiagramTemplatesPage } from './admin/DiagramTemplatesPage';
import { DiagramTemplateEditor } from './admin/DiagramTemplateEditor';
import { DiagramTemplateDetailPage } from './admin/DiagramTemplateDetailPage';
import { QuizzesPage } from './admin/QuizzesPage';
import { PlaylistsPage } from './admin/PlaylistsPage';
import { ToolsPage } from './admin/ToolsPage';
import { AuditPage } from './admin/AuditPage';
import { ContentOpsHome } from './admin/ContentOpsHome';
import { SubjectOpsDetail } from './admin/ops/SubjectOpsDetail';
import { ImportLogPage } from './admin/ops/ImportLogPage';
import { CoveragePage } from './admin/CoveragePage';
import { DiagramMetadataManager } from './admin/DiagramMetadataManager';
import { DiagramMetadataImporter } from './admin/DiagramMetadataImporter';
import { JsonImportPageWithTier } from './admin/JsonImportPageWithTier';
import { CsvImportPageWithTier } from './admin/CsvImportPageWithTier';
import { ToastProvider } from './contexts/ToastContext';
import { ConfirmProvider } from './contexts/ConfirmContext';
import { CommandPalette } from './components/CommandPalette';

function App() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <BrowserRouter>
          <CommandPalette />
      <Routes>
        <Route path="/quiz/:quizId" element={<QuizPlayerPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="subjects" element={<AdminSubjectsPage />} />
          <Route path="units" element={<UnitsPageWithTier />} />
          <Route path="topics" element={<TopicsPageWithTier />} />
          <Route path="papers" element={<PapersPage />} />
          <Route path="prompts" element={<PromptsPageWithTier />} />
          <Route path="diagrams" element={<DiagramsPage />} />
          <Route path="diagram-templates" element={<DiagramTemplatesPage />} />
          <Route path="quizzes" element={<QuizzesPage />} />
          <Route path="playlists" element={<PlaylistsPage />} />
          <Route path="coverage" element={<CoveragePage />} />
          <Route path="diagram-metadata" element={<DiagramMetadataManager />} />
          <Route path="diagram-import" element={<DiagramMetadataImporter />} />
          <Route path="json-import" element={<JsonImportPageWithTier />} />
          <Route path="csv-import" element={<CsvImportPageWithTier />} />
          <Route path="ops" element={<ContentOpsHome />} />
          <Route path="ops/subjects/:subjectId" element={<SubjectOpsDetail />} />
          <Route path="ops/import-log" element={<ImportLogPage />} />
          <Route path="import" element={<ImportPage />} />
          <Route path="tools" element={<ToolsPage />} />
          <Route path="audit" element={<AuditPage />} />
        </Route>

        <Route path="/admin/diagrams/:diagramId" element={<DiagramEditor />} />
        <Route path="/admin/diagram-templates/:templateId" element={<DiagramTemplateEditor />} />
        <Route path="/admin/diagram-templates/view/:id" element={<DiagramTemplateDetailPage />} />

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

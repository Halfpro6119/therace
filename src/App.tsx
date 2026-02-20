import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
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
import { FurtherMathsHubPage } from './pages/maths/FurtherMathsHubPage';
import { StatisticsHubPage } from './pages/maths/StatisticsHubPage';
import { ScienceLabSubjectPage } from './pages/science/ScienceLabSubjectPage';
import { ScienceLabCombinedSciencePage } from './pages/science/ScienceLabCombinedSciencePage';
import { ScienceLabModePage } from './pages/science/ScienceLabModePage';
import { ScienceLabSubjectToTopicsRedirect, QuestionToTopicTestRedirect, ConceptToTopicTestRedirect } from './pages/science/ScienceLabRedirects';
import { ScienceLabMethodMarkPage } from './pages/science/ScienceLabMethodMarkPage';
import { ScienceLabPracticalLabPage } from './pages/science/ScienceLabPracticalLabPage';
import { ScienceLabEquationLabPage } from './pages/science/ScienceLabEquationLabPage';
import { ScienceLabMisconceptionLabPage } from './pages/science/ScienceLabMisconceptionLabPage';
import { ScienceLabFlashcardPage } from './pages/science/ScienceLabFlashcardPage';
import { ScienceLabQuickCheckPage } from './pages/science/ScienceLabQuickCheckPage';
import { ScienceLabTopicsPage } from './pages/science/ScienceLabTopicsPage';
import { ScienceLabTopicTestPage } from './pages/science/ScienceLabTopicTestPage';
import { ScienceLabFullGcsePage } from './pages/science/ScienceLabFullGcsePage';
import { ScienceLabPaperTestPage } from './pages/science/ScienceLabPaperTestPage';
import { BusinessHubHomePage } from './pages/business/BusinessHubHomePage';
import { BusinessHubUnitPage } from './pages/business/BusinessHubUnitPage';
import { BusinessHubTopicsPage } from './pages/business/BusinessHubTopicsPage';
import { BusinessHubConceptLabPage } from './pages/business/BusinessHubConceptLabPage';
import { BusinessHubFlashcardPage } from './pages/business/BusinessHubFlashcardPage';
import { BusinessHubQuickCheckPage } from './pages/business/BusinessHubQuickCheckPage';
import { BusinessHubCaseStudyPage } from './pages/business/BusinessHubCaseStudyPage';
import { BusinessHubCalculationLabPage } from './pages/business/BusinessHubCalculationLabPage';
import { BusinessHubEvaluationPage } from './pages/business/BusinessHubEvaluationPage';
import { HistoryHubHomePage } from './pages/history/HistoryHubHomePage';
import { HistoryHubOptionSelectPage } from './pages/history/HistoryHubOptionSelectPage';
import { HistoryHubTimelinePage } from './pages/history/HistoryHubTimelinePage';
import { HistoryHubFlashcardPage } from './pages/history/HistoryHubFlashcardPage';
import { HistoryHubConceptCardsPage } from './pages/history/HistoryHubConceptCardsPage';
import { HistoryHubQuickCheckPage } from './pages/history/HistoryHubQuickCheckPage';
import { HistoryHubSourceLabPage } from './pages/history/HistoryHubSourceLabPage';
import { HistoryHubInterpretationLabPage } from './pages/history/HistoryHubInterpretationLabPage';
import { HistoryHubQuestionLabPage } from './pages/history/HistoryHubQuestionLabPage';
import { HistoryHubRevisionMapPage } from './pages/history/HistoryHubRevisionMapPage';
import { HistoryHubHistoricEnvironmentPage } from './pages/history/HistoryHubHistoricEnvironmentPage';
import { GeographyHubHomePage } from './pages/geography/GeographyHubHomePage';
import { GeographyHubOptionSelectPage } from './pages/geography/GeographyHubOptionSelectPage';
import { GeographyHubConceptLabPage } from './pages/geography/GeographyHubConceptLabPage';
import { GeographyHubFlashcardPage } from './pages/geography/GeographyHubFlashcardPage';
import { GeographyHubQuickCheckPage } from './pages/geography/GeographyHubQuickCheckPage';
import { GeographyHubSkillsLabPage } from './pages/geography/GeographyHubSkillsLabPage';
import { GeographyHubIssueLabPage } from './pages/geography/GeographyHubIssueLabPage';
import { GeographyHubFieldworkLabPage } from './pages/geography/GeographyHubFieldworkLabPage';
import { GeographyHubQuestionLabPage } from './pages/geography/GeographyHubQuestionLabPage';
import { GeographyHubRevisionMapPage } from './pages/geography/GeographyHubRevisionMapPage';
import { ReligiousStudiesHubHomePage } from './pages/religious-studies/ReligiousStudiesHubHomePage';
import { ReligiousStudiesHubOptionSelectPage } from './pages/religious-studies/ReligiousStudiesHubOptionSelectPage';
import { ReligiousStudiesHubBeliefLabPage } from './pages/religious-studies/ReligiousStudiesHubBeliefLabPage';
import { ReligiousStudiesHubFlashcardPage } from './pages/religious-studies/ReligiousStudiesHubFlashcardPage';
import { ReligiousStudiesHubContrastingViewsPage } from './pages/religious-studies/ReligiousStudiesHubContrastingViewsPage';
import { ReligiousStudiesHubQuickCheckPage } from './pages/religious-studies/ReligiousStudiesHubQuickCheckPage';
import { ReligiousStudiesHubShortAnswerPage } from './pages/religious-studies/ReligiousStudiesHubShortAnswerPage';
import { ReligiousStudiesHubExtendedWritingPage } from './pages/religious-studies/ReligiousStudiesHubExtendedWritingPage';
import { ReligiousStudiesHubPhilosophicalArgumentsPage } from './pages/religious-studies/ReligiousStudiesHubPhilosophicalArgumentsPage';
import { ReligiousStudiesHubTextualStudiesPage } from './pages/religious-studies/ReligiousStudiesHubTextualStudiesPage';
import { ReligiousStudiesHubRevisionMapPage } from './pages/religious-studies/ReligiousStudiesHubRevisionMapPage';
import { PsychologyHubHomePage } from './pages/psychology/PsychologyHubHomePage';
import { PsychologyHubOptionSelectPage } from './pages/psychology/PsychologyHubOptionSelectPage';
import { PsychologyHubConceptLabPage } from './pages/psychology/PsychologyHubConceptLabPage';
import { PsychologyHubKeyStudiesPage } from './pages/psychology/PsychologyHubKeyStudiesPage';
import { PsychologyHubQuickCheckPage } from './pages/psychology/PsychologyHubQuickCheckPage';
import { PsychologyHubStudyEvaluatorPage } from './pages/psychology/PsychologyHubStudyEvaluatorPage';
import { PsychologyHubIssuesDebatesPage } from './pages/psychology/PsychologyHubIssuesDebatesPage';
import { PsychologyHubResearchMethodsPage } from './pages/psychology/PsychologyHubResearchMethodsPage';
import { PsychologyHubQuestionLabPage } from './pages/psychology/PsychologyHubQuestionLabPage';
import { PsychologyHubRevisionMapPage } from './pages/psychology/PsychologyHubRevisionMapPage';
import { HealthHubHomePage } from './pages/health/HealthHubHomePage';
import { HealthHubAwardSelectPage } from './pages/health/HealthHubAwardSelectPage';
import { HealthHubUnitPage } from './pages/health/HealthHubUnitPage';
import { HealthHubConceptLabPage } from './pages/health/HealthHubConceptLabPage';
import { HealthHubFlashcardPage } from './pages/health/HealthHubFlashcardPage';
import { HealthHubLifeStagesPage } from './pages/health/HealthHubLifeStagesPage';
import { HealthHubQuickCheckPage } from './pages/health/HealthHubQuickCheckPage';
import { HealthHubCaseStudyPage } from './pages/health/HealthHubCaseStudyPage';
import { HealthHubInvestigationPage } from './pages/health/HealthHubInvestigationPage';
import { HealthHubCareValuesPage } from './pages/health/HealthHubCareValuesPage';
import { HealthHubQuestionLabPage } from './pages/health/HealthHubQuestionLabPage';
import { HealthHubRevisionMapPage } from './pages/health/HealthHubRevisionMapPage';
import { ComputeLabHomePage } from './pages/compute/ComputeLabHomePage';
import { ComputeLabUnitPage } from './pages/compute/ComputeLabUnitPage';
import { ComputeLabTopicsPage } from './pages/compute/ComputeLabTopicsPage';
import { ComputeLabConceptLabPage } from './pages/compute/ComputeLabConceptLabPage';
import { ComputeLabFlashcardPage } from './pages/compute/ComputeLabFlashcardPage';
import { ComputeLabQuickCheckPage } from './pages/compute/ComputeLabQuickCheckPage';
import { ComputeLabAlgorithmLabPage } from './pages/compute/ComputeLabAlgorithmLabPage';
import { ComputeLabCalculationLabPage } from './pages/compute/ComputeLabCalculationLabPage';
import { ComputeLabLogicLabPage } from './pages/compute/ComputeLabLogicLabPage';
import { ComputeLabSqlLabPage } from './pages/compute/ComputeLabSqlLabPage';
import { ComputeLabQuestionLabPage } from './pages/compute/ComputeLabQuestionLabPage';
import { LanguagesHubHomePage } from './pages/languages/LanguagesHubHomePage';
import { LanguagesHubLanguagePage } from './pages/languages/LanguagesHubLanguagePage';
import { LanguagesHubVocabularyPage } from './pages/languages/LanguagesHubVocabularyPage';
import { LanguagesHubGrammarPage } from './pages/languages/LanguagesHubGrammarPage';
import { LanguagesHubListeningPage } from './pages/languages/LanguagesHubListeningPage';
import { LanguagesHubReadingPage } from './pages/languages/LanguagesHubReadingPage';
import { LanguagesHubWritingPage } from './pages/languages/LanguagesHubWritingPage';
import { LanguagesHubSpeakingPage } from './pages/languages/LanguagesHubSpeakingPage';
import { LanguagesHubTranslationPage } from './pages/languages/LanguagesHubTranslationPage';
import { LanguagesHubPlaceholderPage } from './pages/languages/LanguagesHubPlaceholderPage';
import { LearningSuperpowersPage } from './pages/LearningSuperpowersPage';
import { AdminLayout } from './admin/AdminLayout';
import { AdminViewLayout } from './layouts/AdminViewLayout';
import { AdminViewModeProvider, useAdminViewMode } from './contexts/AdminViewModeContext';
import { AdminViewProvider } from './contexts/AdminViewContext';
import { AdminViewToolbar } from './components/AdminViewToolbar';
import { MainAppRoutes } from './routes/MainAppRoutes';

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
import { StudyPathProvider } from './contexts/StudyPathContext';
import { CommandPalette } from './components/CommandPalette';
import { ScrollToTop } from './components/ScrollToTop';
import { initializeQuestionRegistry } from './utils/questionRegistry';
import { seedAllMathsContent } from './config/seedAllMathsContent';

function AdminRouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
    </div>
  );
}

function MainAppCatchAll() {
  return (
    <AppShell>
      <MainAppRoutes />
    </AppShell>
  );
}

/** When admin view mode is on, wrap all routes in AdminViewProvider and show toolbar so context persists across navigation. */
function MaybeAdminViewWrapper({ children }: { children: ReactNode }) {
  const mode = useAdminViewMode();
  if (mode?.isAdminViewMode) {
    return (
      <AdminViewProvider>
        <AdminViewToolbar />
        {children}
      </AdminViewProvider>
    );
  }
  return <>{children}</>;
}

function App() {
  useEffect(() => {
    initializeQuestionRegistry();
  }, []);

  // Auto-seed all maths content on startup (idempotent; no user action required)
  useEffect(() => {
    seedAllMathsContent().catch((err) => {
      console.warn('[seedAllMathsContent]', err instanceof Error ? err.message : err);
    });
  }, []);

  return (
    <ToastProvider>
      <ConfirmProvider>
        <StudyPathProvider>
        <BrowserRouter>
          <ScrollToTop />
          <CommandPalette />
          <AdminViewModeProvider>
            <MaybeAdminViewWrapper>
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

        <Route path="/admin-view" element={<AdminViewLayout />} />

        <Route path="/*" element={<MainAppCatchAll />} />
      </Routes>
            </MaybeAdminViewWrapper>
          </AdminViewModeProvider>
        </BrowserRouter>
        </StudyPathProvider>
      </ConfirmProvider>
    </ToastProvider>
  );
}

export default App;

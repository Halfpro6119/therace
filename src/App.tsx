import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { ScienceLabTopicsPage } from './pages/science/ScienceLabTopicsPage';
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
                <Route path="/" element={<SubjectsPage />} />
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
                <Route path="/science-lab/:subject/:paper/:tier" element={<ScienceLabModePage />} />
                <Route path="/science-lab/:subject/:paper/:tier/topics" element={<ScienceLabTopicsPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/flashcard" element={<ScienceLabFlashcardPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/quick-check" element={<ScienceLabQuickCheckPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/concept" element={<ScienceLabConceptLabPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/question" element={<ScienceLabQuestionLabPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/methodMark" element={<ScienceLabMethodMarkPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/practical" element={<ScienceLabPracticalLabPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/equation" element={<ScienceLabEquationLabPage />} />
                <Route path="/science-lab/:subject/:paper/:tier/misconception" element={<ScienceLabMisconceptionLabPage />} />
                <Route path="/business-hub" element={<BusinessHubHomePage />} />
                <Route path="/business-hub/unit/:unitId" element={<BusinessHubUnitPage />} />
                <Route path="/business-hub/unit/:unitId/topics" element={<BusinessHubTopicsPage />} />
                <Route path="/business-hub/unit/:unitId/concept" element={<BusinessHubConceptLabPage />} />
                <Route path="/business-hub/unit/:unitId/flashcard" element={<BusinessHubFlashcardPage />} />
                <Route path="/business-hub/unit/:unitId/quick-check" element={<BusinessHubQuickCheckPage />} />
                <Route path="/business-hub/unit/:unitId/case-study" element={<BusinessHubCaseStudyPage />} />
                <Route path="/business-hub/unit/:unitId/calculations" element={<BusinessHubCalculationLabPage />} />
                <Route path="/business-hub/unit/:unitId/evaluation" element={<BusinessHubEvaluationPage />} />
                <Route path="/history-hub" element={<HistoryHubHomePage />} />
                <Route path="/history-hub/option-select" element={<HistoryHubOptionSelectPage />} />
                <Route path="/history-hub/timeline" element={<HistoryHubTimelinePage />} />
                <Route path="/history-hub/key-terms" element={<HistoryHubFlashcardPage />} />
                <Route path="/history-hub/concept-cards" element={<HistoryHubConceptCardsPage />} />
                <Route path="/history-hub/quick-check" element={<HistoryHubQuickCheckPage />} />
                <Route path="/history-hub/source-lab" element={<HistoryHubSourceLabPage />} />
                <Route path="/history-hub/interpretation-lab" element={<HistoryHubInterpretationLabPage />} />
                <Route path="/history-hub/question-lab" element={<HistoryHubQuestionLabPage />} />
                <Route path="/history-hub/revision-map" element={<HistoryHubRevisionMapPage />} />
                <Route path="/history-hub/historic-environment" element={<HistoryHubHistoricEnvironmentPage />} />
                <Route path="/geography-hub" element={<GeographyHubHomePage />} />
                <Route path="/geography-hub/option-select" element={<GeographyHubOptionSelectPage />} />
                <Route path="/geography-hub/concept-lab" element={<GeographyHubConceptLabPage />} />
                <Route path="/geography-hub/flashcard" element={<GeographyHubFlashcardPage />} />
                <Route path="/geography-hub/quick-check" element={<GeographyHubQuickCheckPage />} />
                <Route path="/geography-hub/skills-lab" element={<GeographyHubSkillsLabPage />} />
                <Route path="/geography-hub/issue-lab" element={<GeographyHubIssueLabPage />} />
                <Route path="/geography-hub/fieldwork-lab" element={<GeographyHubFieldworkLabPage />} />
                <Route path="/geography-hub/question-lab" element={<GeographyHubQuestionLabPage />} />
                <Route path="/geography-hub/revision-map" element={<GeographyHubRevisionMapPage />} />
                <Route path="/religious-studies-hub" element={<ReligiousStudiesHubHomePage />} />
                <Route path="/religious-studies-hub/option-select" element={<ReligiousStudiesHubOptionSelectPage />} />
                <Route path="/religious-studies-hub/belief-lab" element={<ReligiousStudiesHubBeliefLabPage />} />
                <Route path="/religious-studies-hub/flashcards" element={<ReligiousStudiesHubFlashcardPage />} />
                <Route path="/religious-studies-hub/contrasting-views" element={<ReligiousStudiesHubContrastingViewsPage />} />
                <Route path="/religious-studies-hub/quick-check" element={<ReligiousStudiesHubQuickCheckPage />} />
                <Route path="/religious-studies-hub/short-answer-lab" element={<ReligiousStudiesHubShortAnswerPage />} />
                <Route path="/religious-studies-hub/extended-writing-lab" element={<ReligiousStudiesHubExtendedWritingPage />} />
                <Route path="/religious-studies-hub/philosophical-arguments" element={<ReligiousStudiesHubPhilosophicalArgumentsPage />} />
                <Route path="/religious-studies-hub/textual-studies" element={<ReligiousStudiesHubTextualStudiesPage />} />
                <Route path="/religious-studies-hub/revision-map" element={<ReligiousStudiesHubRevisionMapPage />} />
                <Route path="/psychology-hub" element={<PsychologyHubHomePage />} />
                <Route path="/psychology-hub/option-select" element={<PsychologyHubOptionSelectPage />} />
                <Route path="/psychology-hub/concept-lab" element={<PsychologyHubConceptLabPage />} />
                <Route path="/psychology-hub/key-studies" element={<PsychologyHubKeyStudiesPage />} />
                <Route path="/psychology-hub/quick-check" element={<PsychologyHubQuickCheckPage />} />
                <Route path="/psychology-hub/study-evaluator" element={<PsychologyHubStudyEvaluatorPage />} />
                <Route path="/psychology-hub/issues-debates" element={<PsychologyHubIssuesDebatesPage />} />
                <Route path="/psychology-hub/research-methods" element={<PsychologyHubResearchMethodsPage />} />
                <Route path="/psychology-hub/question-lab" element={<PsychologyHubQuestionLabPage />} />
                <Route path="/psychology-hub/revision-map" element={<PsychologyHubRevisionMapPage />} />
                <Route path="/health-hub" element={<HealthHubHomePage />} />
                <Route path="/health-hub/award-select" element={<HealthHubAwardSelectPage />} />
                <Route path="/health-hub/life-stages" element={<HealthHubLifeStagesPage />} />
                <Route path="/health-hub/care-values" element={<HealthHubCareValuesPage />} />
                <Route path="/health-hub/revision-map" element={<HealthHubRevisionMapPage />} />
                <Route path="/health-hub/unit/:unitId" element={<HealthHubUnitPage />} />
                <Route path="/health-hub/unit/:unitId/concept" element={<HealthHubConceptLabPage />} />
                <Route path="/health-hub/unit/:unitId/flashcard" element={<HealthHubFlashcardPage />} />
                <Route path="/health-hub/unit/:unitId/quick-check" element={<HealthHubQuickCheckPage />} />
                <Route path="/compute-lab" element={<ComputeLabHomePage />} />
                <Route path="/compute-lab/unit/:unitId" element={<ComputeLabUnitPage />} />
                <Route path="/compute-lab/unit/:unitId/topics" element={<ComputeLabTopicsPage />} />
                <Route path="/compute-lab/unit/:unitId/concept" element={<ComputeLabConceptLabPage />} />
                <Route path="/compute-lab/unit/:unitId/flashcard" element={<ComputeLabFlashcardPage />} />
                <Route path="/compute-lab/unit/:unitId/quick-check" element={<ComputeLabQuickCheckPage />} />
                <Route path="/compute-lab/unit/:unitId/algorithm-lab" element={<ComputeLabAlgorithmLabPage />} />
                <Route path="/compute-lab/unit/:unitId/calculation-lab" element={<ComputeLabCalculationLabPage />} />
                <Route path="/compute-lab/unit/:unitId/logic-lab" element={<ComputeLabLogicLabPage />} />
                <Route path="/compute-lab/unit/:unitId/sql-lab" element={<ComputeLabSqlLabPage />} />
                <Route path="/compute-lab/unit/:unitId/question-lab" element={<ComputeLabQuestionLabPage />} />
                <Route path="/health-hub/unit/:unitId/case-study" element={<HealthHubCaseStudyPage />} />
                <Route path="/health-hub/unit/:unitId/investigation" element={<HealthHubInvestigationPage />} />
                <Route path="/health-hub/unit/:unitId/question-lab" element={<HealthHubQuestionLabPage />} />
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

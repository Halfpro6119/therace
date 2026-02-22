/**
 * Shared route tree for main app and admin-view.
 * When basePath is set (e.g. "/admin-view"), all paths are prefixed so the same pages render under /admin-view/*.
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { SubjectsPage } from '../pages/SubjectsPage';
import { SubjectDetailPageWithTier } from '../pages/SubjectDetailPageWithTier';
import { QuizPlayerPage } from '../pages/QuizPlayerPage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { SubjectBreakdownHub } from '../pages/SubjectBreakdownHub';
import { SubjectBreakdownDetail } from '../pages/SubjectBreakdownDetail';
import { LeaderboardPage } from '../pages/LeaderboardPage';
import { DiscoverPage } from '../pages/DiscoverPage';
import { PlaylistDetailPage } from '../pages/PlaylistDetailPage';
import { LibraryPage } from '../pages/LibraryPage';
import { EnglishCampusHomePage } from '../pages/english/EnglishCampusHomePage';
import { EnglishLanguageDashboard } from '../pages/english/EnglishLanguageDashboard';
import { EnglishWritingWorkspacePage } from '../pages/english/EnglishWritingWorkspacePage';
import { EnglishLanguageResultPage } from '../pages/english/EnglishLanguageResultPage';
import { EnglishDraftsPage } from '../pages/english/EnglishDraftsPage';
import { EnglishCompareDraftsPage } from '../pages/english/EnglishCompareDraftsPage';
import { EnglishDraftMarkingPage } from '../pages/english/EnglishDraftMarkingPage';
import { EnglishLiteraturePage } from '../pages/english/EnglishLiteraturePage';
import { EnglishLiteraturePlaceholder } from '../pages/english/EnglishLiteraturePlaceholder';
import { EnglishLiteratureWorkspacePage } from '../pages/english/EnglishLiteratureWorkspacePage';
import { EnglishLiteratureResultPage } from '../pages/english/EnglishLiteratureResultPage';
import { EnglishLiteratureDraftsPage } from '../pages/english/EnglishLiteratureDraftsPage';
import { EnglishLiteratureSeenPoetryPage } from '../pages/english/EnglishLiteratureSeenPoetryPage';
import { EnglishLiteratureUnseenPage } from '../pages/english/EnglishLiteratureUnseenPage';
import { EnglishLiteratureTextsPage } from '../pages/english/EnglishLiteratureTextsPage';
import { EnglishLiteratureModelDrillsPage } from '../pages/english/EnglishLiteratureModelDrillsPage';
import { EnglishQuotationLabPage } from '../pages/english/EnglishQuotationLabPage';
import { EnglishQuotationLabThemePage } from '../pages/english/EnglishQuotationLabThemePage';
import { EnglishQuotationLabQuoteLabPage } from '../pages/english/EnglishQuotationLabQuoteLabPage';
import { EnglishQuotationLabQuoteDetailPage } from '../pages/english/EnglishQuotationLabQuoteDetailPage';
import { EnglishQuotationLabDrillsPage } from '../pages/english/EnglishQuotationLabDrillsPage';
import { EnglishQuotationLabMicroPage } from '../pages/english/EnglishQuotationLabMicroPage';
import { EnglishQuotationLabProgressPage } from '../pages/english/EnglishQuotationLabProgressPage';
import { EnglishVocabLabHomePage } from '../pages/english/vocab/EnglishVocabLabHomePage';
import { EnglishVocabSetsPage } from '../pages/english/vocab/EnglishVocabSetsPage';
import { EnglishVocabSetDetailPage } from '../pages/english/vocab/EnglishVocabSetDetailPage';
import { EnglishVocabSessionPage } from '../pages/english/vocab/EnglishVocabSessionPage';
import { EnglishVocabResultsPage } from '../pages/english/vocab/EnglishVocabResultsPage';
import { EnglishVocabHeatmapPage } from '../pages/english/vocab/EnglishVocabHeatmapPage';
import { EnglishVocabWordDetailPage } from '../pages/english/vocab/EnglishVocabWordDetailPage';
import { MathsMasteryHomePage } from '../pages/maths/MathsMasteryHomePage';
import { MathsHubPage } from '../pages/maths/MathsHubPage';
import { FurtherMathsHubPage } from '../pages/maths/FurtherMathsHubPage';
import { StatisticsHubPage } from '../pages/maths/StatisticsHubPage';
import { ScienceLabSubjectPage } from '../pages/science/ScienceLabSubjectPage';
import { ScienceLabCombinedSciencePage } from '../pages/science/ScienceLabCombinedSciencePage';
import { ScienceLabSubjectToTopicsRedirect, ScienceLabModeToTopicsRedirect, QuestionToTopicTestRedirect, ConceptToTopicTestRedirect } from '../pages/science/ScienceLabRedirects';
import { ScienceLabMethodMarkPage } from '../pages/science/ScienceLabMethodMarkPage';
import { ScienceLabPracticalLabPage } from '../pages/science/ScienceLabPracticalLabPage';
import { ScienceLabEquationLabPage } from '../pages/science/ScienceLabEquationLabPage';
import { ScienceLabMisconceptionLabPage } from '../pages/science/ScienceLabMisconceptionLabPage';
import { ScienceLabFlashcardPage } from '../pages/science/ScienceLabFlashcardPage';
import { ScienceLabQuickCheckPage } from '../pages/science/ScienceLabQuickCheckPage';
import { ScienceLabTopicsPage } from '../pages/science/ScienceLabTopicsPage';
import { ScienceLabTopicTestPage } from '../pages/science/ScienceLabTopicTestPage';
import { ScienceLabFullGcsePage } from '../pages/science/ScienceLabFullGcsePage';
import { ScienceLabPaperTestPage } from '../pages/science/ScienceLabPaperTestPage';
import { BusinessHubHomePage } from '../pages/business/BusinessHubHomePage';
import { BusinessHubUnitToTopicsRedirect } from '../pages/business/BusinessHubRedirects';
import { BusinessHubTopicsPage } from '../pages/business/BusinessHubTopicsPage';
import { BusinessHubConceptLabPage } from '../pages/business/BusinessHubConceptLabPage';
import { BusinessHubFlashcardPage } from '../pages/business/BusinessHubFlashcardPage';
import { BusinessHubQuickCheckPage } from '../pages/business/BusinessHubQuickCheckPage';
import { BusinessHubCaseStudyPage } from '../pages/business/BusinessHubCaseStudyPage';
import { BusinessHubCalculationLabPage } from '../pages/business/BusinessHubCalculationLabPage';
import { BusinessHubEvaluationPage } from '../pages/business/BusinessHubEvaluationPage';
import { BusinessHubAllUnitsTopicsPage } from '../pages/business/BusinessHubAllUnitsTopicsPage';
import { BusinessHubAllUnitsFlashcardPage } from '../pages/business/BusinessHubAllUnitsFlashcardPage';
import { BusinessHubAllUnitsQuickCheckPage } from '../pages/business/BusinessHubAllUnitsQuickCheckPage';
import { BusinessHubAllUnitsConceptLabPage } from '../pages/business/BusinessHubAllUnitsConceptLabPage';
import { HistoryHubHomePage } from '../pages/history/HistoryHubHomePage';
import { HistoryHubOptionSelectPage } from '../pages/history/HistoryHubOptionSelectPage';
import { HistoryHubTimelinePage } from '../pages/history/HistoryHubTimelinePage';
import { HistoryHubFlashcardPage } from '../pages/history/HistoryHubFlashcardPage';
import { HistoryHubConceptCardsPage } from '../pages/history/HistoryHubConceptCardsPage';
import { HistoryHubQuickCheckPage } from '../pages/history/HistoryHubQuickCheckPage';
import { HistoryHubSourceLabPage } from '../pages/history/HistoryHubSourceLabPage';
import { HistoryHubInterpretationLabPage } from '../pages/history/HistoryHubInterpretationLabPage';
import { HistoryHubQuestionLabPage } from '../pages/history/HistoryHubQuestionLabPage';
import { HistoryHubRevisionMapPage } from '../pages/history/HistoryHubRevisionMapPage';
import { HistoryHubHistoricEnvironmentPage } from '../pages/history/HistoryHubHistoricEnvironmentPage';
import { GeographyHubHomePage } from '../pages/geography/GeographyHubHomePage';
import { GeographyHubOptionSelectPage } from '../pages/geography/GeographyHubOptionSelectPage';
import { GeographyHubConceptLabPage } from '../pages/geography/GeographyHubConceptLabPage';
import { GeographyHubFlashcardPage } from '../pages/geography/GeographyHubFlashcardPage';
import { GeographyHubQuickCheckPage } from '../pages/geography/GeographyHubQuickCheckPage';
import { GeographyHubSkillsLabPage } from '../pages/geography/GeographyHubSkillsLabPage';
import { GeographyHubIssueLabPage } from '../pages/geography/GeographyHubIssueLabPage';
import { GeographyHubFieldworkLabPage } from '../pages/geography/GeographyHubFieldworkLabPage';
import { GeographyHubQuestionLabPage } from '../pages/geography/GeographyHubQuestionLabPage';
import { GeographyHubRevisionMapPage } from '../pages/geography/GeographyHubRevisionMapPage';
import { ReligiousStudiesHubHomePage } from '../pages/religious-studies/ReligiousStudiesHubHomePage';
import { ReligiousStudiesHubOptionSelectPage } from '../pages/religious-studies/ReligiousStudiesHubOptionSelectPage';
import { ReligiousStudiesHubBeliefLabPage } from '../pages/religious-studies/ReligiousStudiesHubBeliefLabPage';
import { ReligiousStudiesHubFlashcardPage } from '../pages/religious-studies/ReligiousStudiesHubFlashcardPage';
import { ReligiousStudiesHubContrastingViewsPage } from '../pages/religious-studies/ReligiousStudiesHubContrastingViewsPage';
import { ReligiousStudiesHubQuickCheckPage } from '../pages/religious-studies/ReligiousStudiesHubQuickCheckPage';
import { ReligiousStudiesHubShortAnswerPage } from '../pages/religious-studies/ReligiousStudiesHubShortAnswerPage';
import { ReligiousStudiesHubExtendedWritingPage } from '../pages/religious-studies/ReligiousStudiesHubExtendedWritingPage';
import { ReligiousStudiesHubPhilosophicalArgumentsPage } from '../pages/religious-studies/ReligiousStudiesHubPhilosophicalArgumentsPage';
import { ReligiousStudiesHubTextualStudiesPage } from '../pages/religious-studies/ReligiousStudiesHubTextualStudiesPage';
import { ReligiousStudiesHubRevisionMapPage } from '../pages/religious-studies/ReligiousStudiesHubRevisionMapPage';
import { PsychologyHubHomePage } from '../pages/psychology/PsychologyHubHomePage';
import { PsychologyHubOptionSelectPage } from '../pages/psychology/PsychologyHubOptionSelectPage';
import { PsychologyHubConceptLabPage } from '../pages/psychology/PsychologyHubConceptLabPage';
import { PsychologyHubKeyStudiesPage } from '../pages/psychology/PsychologyHubKeyStudiesPage';
import { PsychologyHubQuickCheckPage } from '../pages/psychology/PsychologyHubQuickCheckPage';
import { PsychologyHubStudyEvaluatorPage } from '../pages/psychology/PsychologyHubStudyEvaluatorPage';
import { PsychologyHubIssuesDebatesPage } from '../pages/psychology/PsychologyHubIssuesDebatesPage';
import { PsychologyHubResearchMethodsPage } from '../pages/psychology/PsychologyHubResearchMethodsPage';
import { PsychologyHubQuestionLabPage } from '../pages/psychology/PsychologyHubQuestionLabPage';
import { PsychologyHubRevisionMapPage } from '../pages/psychology/PsychologyHubRevisionMapPage';
import { HealthHubHomePage } from '../pages/health/HealthHubHomePage';
import { HealthHubAwardSelectPage } from '../pages/health/HealthHubAwardSelectPage';
import { HealthHubUnitToTopicsRedirect } from '../pages/health/HealthHubRedirects';
import { HealthHubTopicsPage } from '../pages/health/HealthHubTopicsPage';
import { HealthHubConceptLabPage } from '../pages/health/HealthHubConceptLabPage';
import { HealthHubFlashcardPage } from '../pages/health/HealthHubFlashcardPage';
import { HealthHubLifeStagesPage } from '../pages/health/HealthHubLifeStagesPage';
import { HealthHubQuickCheckPage } from '../pages/health/HealthHubQuickCheckPage';
import { HealthHubCaseStudyPage } from '../pages/health/HealthHubCaseStudyPage';
import { HealthHubInvestigationPage } from '../pages/health/HealthHubInvestigationPage';
import { HealthHubCareValuesPage } from '../pages/health/HealthHubCareValuesPage';
import { HealthHubQuestionLabPage } from '../pages/health/HealthHubQuestionLabPage';
import { HealthHubRevisionMapPage } from '../pages/health/HealthHubRevisionMapPage';
import { ComputeLabHomePage } from '../pages/compute/ComputeLabHomePage';
import { ComputeLabUnitToTopicsRedirect } from '../pages/compute/ComputeLabRedirects';
import { ComputeLabTopicsPage } from '../pages/compute/ComputeLabTopicsPage';
import { ComputeLabConceptLabPage } from '../pages/compute/ComputeLabConceptLabPage';
import { ComputeLabFlashcardPage } from '../pages/compute/ComputeLabFlashcardPage';
import { ComputeLabQuickCheckPage } from '../pages/compute/ComputeLabQuickCheckPage';
import { ComputeLabAlgorithmLabPage } from '../pages/compute/ComputeLabAlgorithmLabPage';
import { ComputeLabCalculationLabPage } from '../pages/compute/ComputeLabCalculationLabPage';
import { ComputeLabLogicLabPage } from '../pages/compute/ComputeLabLogicLabPage';
import { ComputeLabSqlLabPage } from '../pages/compute/ComputeLabSqlLabPage';
import { ComputeLabQuestionLabPage } from '../pages/compute/ComputeLabQuestionLabPage';
import { LanguagesHubHomePage } from '../pages/languages/LanguagesHubHomePage';
import { LanguagesHubLanguagePage } from '../pages/languages/LanguagesHubLanguagePage';
import { LanguagesHubVocabularyPage } from '../pages/languages/LanguagesHubVocabularyPage';
import { LanguagesHubGrammarPage } from '../pages/languages/LanguagesHubGrammarPage';
import { LanguagesHubListeningPage } from '../pages/languages/LanguagesHubListeningPage';
import { LanguagesHubReadingPage } from '../pages/languages/LanguagesHubReadingPage';
import { LanguagesHubWritingPage } from '../pages/languages/LanguagesHubWritingPage';
import { LanguagesHubSpeakingPage } from '../pages/languages/LanguagesHubSpeakingPage';
import { LanguagesHubTranslationPage } from '../pages/languages/LanguagesHubTranslationPage';
import { LanguagesHubPlaceholderPage } from '../pages/languages/LanguagesHubPlaceholderPage';
import { LearningSuperpowersPage } from '../pages/LearningSuperpowersPage';
import { AdminViewDraftsPage } from '../pages/admin-view/AdminViewDraftsPage';

function pathWithBase(basePath: string | undefined, path: string): string {
  if (!basePath) return path;
  if (path === '/') return basePath;
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}

/** When basePath is set, we render inside Route path="*", so RR v6 matches relative to the splat. Use relative path for route matching. */
function routePath(basePath: string | undefined, path: string): string {
  if (!basePath) return path;
  if (path === '/') return '';
  return path.startsWith('/') ? path.slice(1) : path;
}

interface MainAppRoutesProps {
  basePath?: string;
}

export function MainAppRoutes({ basePath }: MainAppRoutesProps) {
  const p = (path: string) => pathWithBase(basePath, path);
  const r = (path: string) => routePath(basePath, path);
  return (
    <Routes>
      <Route path={r('/')} element={<SubjectsPage />} />
      <Route path={r('/learning-superpowers')} element={<LearningSuperpowersPage />} />
      <Route path={r('/discover')} element={<DiscoverPage />} />
      <Route path={r('/playlists/:playlistId')} element={<PlaylistDetailPage />} />
      <Route path={r('/library')} element={<LibraryPage />} />
      <Route path={r('/subjects')} element={<SubjectsPage />} />
      <Route path={r('/subjects/:subjectId')} element={<SubjectDetailPageWithTier />} />
      <Route path={r('/quiz/:quizId')} element={<QuizPlayerPage />} />
      <Route path={r('/drafts')} element={<AdminViewDraftsPage />} />
      <Route path={r('/english-campus')} element={<EnglishCampusHomePage />} />
      <Route path={r('/english-campus/language')} element={<EnglishLanguageDashboard />} />
      <Route path={r('/english-campus/language/task/:taskId')} element={<EnglishWritingWorkspacePage />} />
      <Route path={r('/english-campus/language/result')} element={<EnglishLanguageResultPage />} />
      <Route path={r('/english-campus/language/drafts')} element={<EnglishDraftsPage />} />
      <Route path={r('/english-campus/language/draft/:draftId/marking')} element={<EnglishDraftMarkingPage />} />
      <Route path={r('/english-campus/language/compare')} element={<EnglishCompareDraftsPage />} />
      <Route path={r('/english-campus/literature')} element={<EnglishLiteraturePage />} />
      <Route path={r('/english-campus/literature/task/:taskId')} element={<EnglishLiteratureWorkspacePage />} />
      <Route path={r('/english-campus/literature/task/:taskId/model-drills')} element={<EnglishLiteratureModelDrillsPage />} />
      <Route path={r('/english-campus/literature/result')} element={<EnglishLiteratureResultPage />} />
      <Route path={r('/english-campus/literature/drafts')} element={<EnglishLiteratureDraftsPage />} />
      <Route path={r('/english-campus/literature/poetry')} element={<EnglishLiteratureSeenPoetryPage />} />
      <Route path={r('/english-campus/literature/unseen')} element={<EnglishLiteratureUnseenPage />} />
      <Route path={r('/english-campus/literature/texts')} element={<EnglishLiteratureTextsPage />} />
      <Route path={r('/english-campus/literature/quotation-lab')} element={<EnglishQuotationLabPage />} />
      <Route path={r('/english-campus/literature/quotation-lab/theme/:themeId')} element={<EnglishQuotationLabThemePage />} />
      <Route path={r('/english-campus/literature/quotation-lab/quote-lab/:sourceId')} element={<EnglishQuotationLabQuoteLabPage />} />
      <Route path={r('/english-campus/literature/quotation-lab/quote-lab/:sourceId/quote/:quoteId')} element={<EnglishQuotationLabQuoteDetailPage />} />
      <Route path={r('/english-campus/literature/quotation-lab/drills/:sourceId')} element={<EnglishQuotationLabDrillsPage />} />
      <Route path={r('/english-campus/literature/quotation-lab/micro/:sourceId')} element={<EnglishQuotationLabMicroPage />} />
      <Route path={r('/english-campus/literature/quotation-lab/progress/:sourceId')} element={<EnglishQuotationLabProgressPage />} />
      <Route path={r('/english-campus/literature/:section')} element={<EnglishLiteraturePlaceholder />} />
      <Route path={r('/english-campus/vocab')} element={<EnglishVocabLabHomePage />} />
      <Route path={r('/english-campus/vocab/sets')} element={<EnglishVocabSetsPage />} />
      <Route path={r('/english-campus/vocab/set/:setId')} element={<EnglishVocabSetDetailPage />} />
      <Route path={r('/english-campus/vocab/session')} element={<EnglishVocabSessionPage />} />
      <Route path={r('/english-campus/vocab/results/:sessionId')} element={<EnglishVocabResultsPage />} />
      <Route path={r('/english-campus/vocab/heatmap')} element={<EnglishVocabHeatmapPage />} />
      <Route path={r('/english-campus/vocab/word/:wordId')} element={<EnglishVocabWordDetailPage />} />
      <Route path={r('/maths-mastery')} element={<MathsMasteryHomePage />} />
      <Route path={r('/maths-mastery/maths')} element={<MathsHubPage />} />
      <Route path={r('/maths-mastery/further-maths')} element={<FurtherMathsHubPage />} />
      <Route path={r('/maths-mastery/statistics')} element={<StatisticsHubPage />} />
      <Route path={r('/science-lab')} element={<ScienceLabSubjectPage />} />
      <Route path={r('/science-lab/subjects')} element={<Navigate to={p('/science-lab')} replace />} />
      <Route path={r('/science-lab/combined-science')} element={<ScienceLabCombinedSciencePage />} />
      <Route path={r('/science-lab/:subject')} element={<ScienceLabSubjectToTopicsRedirect />} />
      <Route path={r('/science-lab/:subject/:paper/:tier')} element={<ScienceLabModeToTopicsRedirect />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/topics')} element={<ScienceLabTopicsPage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/topic-test')} element={<ScienceLabTopicTestPage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/flashcard')} element={<ScienceLabFlashcardPage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/quick-check')} element={<ScienceLabQuickCheckPage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/concept')} element={<ConceptToTopicTestRedirect />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/question')} element={<QuestionToTopicTestRedirect />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/full-gcse')} element={<ScienceLabFullGcsePage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/full-gcse/test/:testPaper')} element={<ScienceLabPaperTestPage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/methodMark')} element={<ScienceLabMethodMarkPage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/practical')} element={<ScienceLabPracticalLabPage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/equation')} element={<ScienceLabEquationLabPage />} />
      <Route path={r('/science-lab/:subject/:paper/:tier/misconception')} element={<ScienceLabMisconceptionLabPage />} />
      <Route path={r('/business-hub')} element={<BusinessHubHomePage />} />
      <Route path={r('/business-hub/all-units/topics')} element={<BusinessHubAllUnitsTopicsPage />} />
      <Route path={r('/business-hub/all-units/flashcard')} element={<BusinessHubAllUnitsFlashcardPage />} />
      <Route path={r('/business-hub/all-units/quick-check')} element={<BusinessHubAllUnitsQuickCheckPage />} />
      <Route path={r('/business-hub/all-units/concept')} element={<BusinessHubAllUnitsConceptLabPage />} />
      <Route path={r('/business-hub/unit/:unitId')} element={<BusinessHubUnitToTopicsRedirect />} />
      <Route path={r('/business-hub/unit/:unitId/topics')} element={<BusinessHubTopicsPage />} />
      <Route path={r('/business-hub/unit/:unitId/concept')} element={<BusinessHubConceptLabPage />} />
      <Route path={r('/business-hub/unit/:unitId/flashcard')} element={<BusinessHubFlashcardPage />} />
      <Route path={r('/business-hub/unit/:unitId/quick-check')} element={<BusinessHubQuickCheckPage />} />
      <Route path={r('/business-hub/unit/:unitId/case-study')} element={<BusinessHubCaseStudyPage />} />
      <Route path={r('/business-hub/unit/:unitId/calculations')} element={<BusinessHubCalculationLabPage />} />
      <Route path={r('/business-hub/unit/:unitId/evaluation')} element={<BusinessHubEvaluationPage />} />
      <Route path={r('/history-hub')} element={<HistoryHubHomePage />} />
      <Route path={r('/history-hub/option-select')} element={<HistoryHubOptionSelectPage />} />
      <Route path={r('/history-hub/timeline')} element={<HistoryHubTimelinePage />} />
      <Route path={r('/history-hub/key-terms')} element={<HistoryHubFlashcardPage />} />
      <Route path={r('/history-hub/concept-cards')} element={<HistoryHubConceptCardsPage />} />
      <Route path={r('/history-hub/quick-check')} element={<HistoryHubQuickCheckPage />} />
      <Route path={r('/history-hub/source-lab')} element={<HistoryHubSourceLabPage />} />
      <Route path={r('/history-hub/interpretation-lab')} element={<HistoryHubInterpretationLabPage />} />
      <Route path={r('/history-hub/question-lab')} element={<HistoryHubQuestionLabPage />} />
      <Route path={r('/history-hub/revision-map')} element={<HistoryHubRevisionMapPage />} />
      <Route path={r('/history-hub/historic-environment')} element={<HistoryHubHistoricEnvironmentPage />} />
      <Route path={r('/geography-hub')} element={<GeographyHubHomePage />} />
      <Route path={r('/geography-hub/option-select')} element={<GeographyHubOptionSelectPage />} />
      <Route path={r('/geography-hub/concept-lab')} element={<GeographyHubConceptLabPage />} />
      <Route path={r('/geography-hub/flashcard')} element={<GeographyHubFlashcardPage />} />
      <Route path={r('/geography-hub/quick-check')} element={<GeographyHubQuickCheckPage />} />
      <Route path={r('/geography-hub/skills-lab')} element={<GeographyHubSkillsLabPage />} />
      <Route path={r('/geography-hub/issue-lab')} element={<GeographyHubIssueLabPage />} />
      <Route path={r('/geography-hub/fieldwork-lab')} element={<GeographyHubFieldworkLabPage />} />
      <Route path={r('/geography-hub/question-lab')} element={<GeographyHubQuestionLabPage />} />
      <Route path={r('/geography-hub/revision-map')} element={<GeographyHubRevisionMapPage />} />
      <Route path={r('/religious-studies-hub')} element={<ReligiousStudiesHubHomePage />} />
      <Route path={r('/religious-studies-hub/option-select')} element={<ReligiousStudiesHubOptionSelectPage />} />
      <Route path={r('/religious-studies-hub/belief-lab')} element={<ReligiousStudiesHubBeliefLabPage />} />
      <Route path={r('/religious-studies-hub/flashcards')} element={<ReligiousStudiesHubFlashcardPage />} />
      <Route path={r('/religious-studies-hub/contrasting-views')} element={<ReligiousStudiesHubContrastingViewsPage />} />
      <Route path={r('/religious-studies-hub/quick-check')} element={<ReligiousStudiesHubQuickCheckPage />} />
      <Route path={r('/religious-studies-hub/short-answer-lab')} element={<ReligiousStudiesHubShortAnswerPage />} />
      <Route path={r('/religious-studies-hub/extended-writing-lab')} element={<ReligiousStudiesHubExtendedWritingPage />} />
      <Route path={r('/religious-studies-hub/philosophical-arguments')} element={<ReligiousStudiesHubPhilosophicalArgumentsPage />} />
      <Route path={r('/religious-studies-hub/textual-studies')} element={<ReligiousStudiesHubTextualStudiesPage />} />
      <Route path={r('/religious-studies-hub/revision-map')} element={<ReligiousStudiesHubRevisionMapPage />} />
      <Route path={r('/psychology-hub')} element={<PsychologyHubHomePage />} />
      <Route path={r('/psychology-hub/option-select')} element={<PsychologyHubOptionSelectPage />} />
      <Route path={r('/psychology-hub/concept-lab')} element={<PsychologyHubConceptLabPage />} />
      <Route path={r('/psychology-hub/key-studies')} element={<PsychologyHubKeyStudiesPage />} />
      <Route path={r('/psychology-hub/quick-check')} element={<PsychologyHubQuickCheckPage />} />
      <Route path={r('/psychology-hub/study-evaluator')} element={<PsychologyHubStudyEvaluatorPage />} />
      <Route path={r('/psychology-hub/issues-debates')} element={<PsychologyHubIssuesDebatesPage />} />
      <Route path={r('/psychology-hub/research-methods')} element={<PsychologyHubResearchMethodsPage />} />
      <Route path={r('/psychology-hub/question-lab')} element={<PsychologyHubQuestionLabPage />} />
      <Route path={r('/psychology-hub/revision-map')} element={<PsychologyHubRevisionMapPage />} />
      <Route path={r('/health-hub')} element={<HealthHubHomePage />} />
      <Route path={r('/health-hub/award-select')} element={<HealthHubAwardSelectPage />} />
      <Route path={r('/health-hub/life-stages')} element={<HealthHubLifeStagesPage />} />
      <Route path={r('/health-hub/care-values')} element={<HealthHubCareValuesPage />} />
      <Route path={r('/health-hub/revision-map')} element={<HealthHubRevisionMapPage />} />
      <Route path={r('/health-hub/unit/:unitId')} element={<HealthHubUnitToTopicsRedirect />} />
      <Route path={r('/health-hub/unit/:unitId/topics')} element={<HealthHubTopicsPage />} />
      <Route path={r('/health-hub/unit/:unitId/concept')} element={<HealthHubConceptLabPage />} />
      <Route path={r('/health-hub/unit/:unitId/flashcard')} element={<HealthHubFlashcardPage />} />
      <Route path={r('/health-hub/unit/:unitId/quick-check')} element={<HealthHubQuickCheckPage />} />
      <Route path={r('/compute-lab')} element={<ComputeLabHomePage />} />
      <Route path={r('/compute-lab/unit/:unitId')} element={<ComputeLabUnitToTopicsRedirect />} />
      <Route path={r('/compute-lab/unit/:unitId/topics')} element={<ComputeLabTopicsPage />} />
      <Route path={r('/compute-lab/unit/:unitId/concept')} element={<ComputeLabConceptLabPage />} />
      <Route path={r('/compute-lab/unit/:unitId/flashcard')} element={<ComputeLabFlashcardPage />} />
      <Route path={r('/compute-lab/unit/:unitId/quick-check')} element={<ComputeLabQuickCheckPage />} />
      <Route path={r('/compute-lab/unit/:unitId/algorithm-lab')} element={<ComputeLabAlgorithmLabPage />} />
      <Route path={r('/compute-lab/unit/:unitId/calculation-lab')} element={<ComputeLabCalculationLabPage />} />
      <Route path={r('/compute-lab/unit/:unitId/logic-lab')} element={<ComputeLabLogicLabPage />} />
      <Route path={r('/compute-lab/unit/:unitId/sql-lab')} element={<ComputeLabSqlLabPage />} />
      <Route path={r('/compute-lab/unit/:unitId/question-lab')} element={<ComputeLabQuestionLabPage />} />
      <Route path={r('/languages-hub')} element={<LanguagesHubHomePage />} />
      <Route path={r('/languages-hub/:languageId')} element={<LanguagesHubLanguagePage />} />
      <Route path={r('/languages-hub/:languageId/vocabulary')} element={<LanguagesHubVocabularyPage />} />
      <Route path={r('/languages-hub/:languageId/grammar')} element={<LanguagesHubGrammarPage />} />
      <Route path={r('/languages-hub/:languageId/listening')} element={<LanguagesHubListeningPage />} />
      <Route path={r('/languages-hub/:languageId/reading')} element={<LanguagesHubReadingPage />} />
      <Route path={r('/languages-hub/:languageId/writing')} element={<LanguagesHubWritingPage />} />
      <Route path={r('/languages-hub/:languageId/speaking')} element={<LanguagesHubSpeakingPage />} />
      <Route path={r('/languages-hub/:languageId/translation')} element={<LanguagesHubTranslationPage />} />
      <Route path={r('/languages-hub/:languageId/:modeId')} element={<LanguagesHubPlaceholderPage />} />
      <Route path={r('/health-hub/unit/:unitId/case-study')} element={<HealthHubCaseStudyPage />} />
      <Route path={r('/health-hub/unit/:unitId/investigation')} element={<HealthHubInvestigationPage />} />
      <Route path={r('/health-hub/unit/:unitId/question-lab')} element={<HealthHubQuestionLabPage />} />
      <Route path={r('/results/:attemptId')} element={<ResultsPage />} />
      <Route path={r('/profile')} element={<ProfilePage />} />
      <Route path={r('/profile/subjects')} element={<SubjectBreakdownHub />} />
      <Route path={r('/profile/subjects/:subjectId')} element={<SubjectBreakdownDetail />} />
      <Route path={r('/leaderboard')} element={<LeaderboardPage />} />
      {/* Fallback for unmatched admin-view paths only; specific hub routes above take precedence. */}
      {basePath === '/admin-view' && (
        <Route path="*" element={<SubjectsPage />} />
      )}
    </Routes>
  );
}

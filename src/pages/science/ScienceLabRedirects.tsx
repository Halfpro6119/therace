import { Navigate, useParams } from 'react-router-dom';

/** Redirect /science-lab/:subject to Topics (Paper 1 Higher) — Topics as primary entry */
export function ScienceLabSubjectToTopicsRedirect() {
  const { subject } = useParams<{ subject: string }>();
  if (!subject) return null;
  return <Navigate to={`/science-lab/${subject}/1/higher/topics`} replace />;
}

/** Redirect legacy /question route to topic-test */
export function QuestionToTopicTestRedirect() {
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  if (!subject || !paper || !tier) return null;
  return <Navigate to={`/science-lab/${subject}/${paper}/${tier}/topic-test`} replace />;
}

/** Redirect legacy /concept route to topic-test */
export function ConceptToTopicTestRedirect() {
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  if (!subject || !paper || !tier) return null;
  return <Navigate to={`/science-lab/${subject}/${paper}/${tier}/topic-test`} replace />;
}

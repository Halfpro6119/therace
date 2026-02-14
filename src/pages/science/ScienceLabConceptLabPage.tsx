import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

/** Redirects /concept to /flashcard (Concept Lab merged into Flashcard mode). */
export function ScienceLabConceptLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [searchParams] = useSearchParams();
  const topic = searchParams.get('topic');
  useEffect(() => {
    const base = `/science-lab/${subject?.toLowerCase()}/${paper}/${tier?.toLowerCase()}/flashcard`;
    const query = topic ? `?topic=${encodeURIComponent(topic)}` : '';
    navigate(base + query, { replace: true });
  }, [navigate, subject, paper, tier, topic]);
  return null;
}

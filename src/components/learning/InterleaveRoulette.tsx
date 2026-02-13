/**
 * Interleave Roulette – "Random topic from your weak list" – one question, instant feedback
 * Design Plan §1 & §3A: Interleaving + spaced retrieval; prevents blocking
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudyPath } from '../../contexts/StudyPathContext';
import { Shuffle } from 'lucide-react';

export interface WeakTopicOption {
  id: string;
  label: string;
  hubPath: string;
  /** Optional route params */
  params?: Record<string, string>;
}

export interface InterleaveRouletteProps {
  /** Override weak topics (otherwise from StudyPathContext) */
  weakTopics?: WeakTopicOption[];
  /** Callback when a topic is selected */
  onSelect?: (topicId: string) => void;
}

export function InterleaveRoulette({ weakTopics: overrideTopics, onSelect }: InterleaveRouletteProps) {
  const studyPath = useStudyPath();
  const navigate = useNavigate();
  const [picked, setPicked] = useState<string | null>(null);

  const weakTopics = overrideTopics ?? (studyPath?.weakTopics ?? []).map(id => ({
    id,
    label: id,
    hubPath: '/',
  }));

  const pickRandom = () => {
    if (weakTopics.length === 0) return;
    const topic = weakTopics[Math.floor(Math.random() * weakTopics.length)];
    setPicked(topic.id);
    onSelect?.(topic.id);
  };

  const goToTopic = () => {
    if (!picked) return;
    const topic = weakTopics.find(t => t.id === picked);
    if (topic && topic.hubPath !== '/') {
      navigate(topic.hubPath);
    }
  };

  if (weakTopics.length === 0) return null;

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: 'rgb(var(--surface))',
        borderColor: 'rgb(var(--border))',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Shuffle size={18} style={{ color: 'rgb(var(--accent))' }} />
        <span className="font-bold" style={{ color: 'rgb(var(--text))' }}>
          Interleave Roulette
        </span>
      </div>
      <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
        Random weak topic — one question, instant feedback. Prevents blocking.
      </p>
      <button
        type="button"
        onClick={pickRandom}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium"
        style={{ background: 'rgb(var(--accent))', color: 'white' }}
      >
        <Shuffle size={18} />
        Pick random weak topic
      </button>
      {picked && (
        <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
          <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
            {weakTopics.find(t => t.id === picked)?.label ?? picked}
          </p>
          <button
            type="button"
            onClick={goToTopic}
            className="mt-2 text-sm font-medium"
            style={{ color: 'rgb(var(--accent))' }}
          >
            Go to practice →
          </button>
        </div>
      )}
    </div>
  );
}

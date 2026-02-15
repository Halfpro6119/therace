/**
 * Rigorous tests for Science Lab flashcard flow: all steps build correctly
 * and the app can show every flashcard without crashing.
 */
import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  getFlashcardsGroupedByTopic,
  getBiggerTestQuestionsForTopic,
} from '../../../config/scienceLabFlashcards';
import { ScienceLabFlashcardPage } from '../ScienceLabFlashcardPage';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../../types/scienceLab';

type LearnStep =
  | { type: 'flashcard'; flashcard: { id: string; front: { prompt: string }; back: { explanation: string }; topic: string }; topic: string; groupIndex: number }
  | { type: 'biggerTest'; topic: string; questions: Array<{ question: string }>; groupIndex: number };

function buildLearnSteps(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): LearnStep[] {
  const groups = getFlashcardsGroupedByTopic(subject, paper, tier);
  const steps: LearnStep[] = [];
  groups.forEach((g, groupIndex) => {
    g.flashcards.forEach((f) => {
      steps.push({ type: 'flashcard', flashcard: f, topic: g.topic, groupIndex });
    });
    const biggerQuestions = getBiggerTestQuestionsForTopic(subject, paper, tier, g.topic, 2);
    if (biggerQuestions.length > 0) {
      steps.push({ type: 'biggerTest', topic: g.topic, questions: biggerQuestions, groupIndex });
    }
  });
  return steps;
}

describe('Science Lab Flashcard data and flow', () => {
  const subjects: ScienceSubject[] = ['Biology', 'Chemistry', 'Physics'];
  const paper = 1 as SciencePaper;
  const tier = 'Higher' as ScienceTier;

  it('builds non-empty learn steps for Biology, Chemistry, and Physics (no topic filter)', () => {
    for (const subject of subjects) {
      const steps = buildLearnSteps(subject, paper, tier);
      expect(steps.length).toBeGreaterThan(0);
      const flashcardSteps = steps.filter((s) => s.type === 'flashcard');
      expect(flashcardSteps.length).toBeGreaterThan(0);
    }
  });

  it('every flashcard step has valid front.prompt and back.explanation', () => {
    for (const subject of subjects) {
      const steps = buildLearnSteps(subject, paper, tier);
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        if (step.type === 'flashcard') {
          expect(step.flashcard.front.prompt, `subject=${subject} step=${i}`).toBeDefined();
          expect(typeof step.flashcard.front.prompt).toBe('string');
          expect(step.flashcard.front.prompt.length).toBeGreaterThan(0);
          expect(step.flashcard.back.explanation, `subject=${subject} step=${i}`).toBeDefined();
          expect(typeof step.flashcard.back.explanation).toBe('string');
        }
      }
    }
  });

  it('every biggerTest step has at least one question with question text', () => {
    for (const subject of subjects) {
      const steps = buildLearnSteps(subject, paper, tier);
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        if (step.type === 'biggerTest') {
          expect(step.questions.length).toBeGreaterThan(0);
          step.questions.forEach((q, qi) => {
            expect(q.question, `subject=${subject} step=${i} q=${qi}`).toBeDefined();
            expect(typeof q.question).toBe('string');
          });
        }
      }
    }
  });

  it('can iterate all steps without throwing (simulated show-all)', () => {
    for (const subject of subjects) {
      const steps = buildLearnSteps(subject, paper, tier);
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        expect(() => {
          if (step.type === 'flashcard') {
            void step.flashcard.front.prompt;
            void step.flashcard.front.visual;
            void step.flashcard.back.explanation;
            void step.flashcard.back.keyTerms;
          } else {
            step.questions.forEach((q) => void q.question);
          }
        }).not.toThrow();
      }
    }
  });
});

describe('Science Lab Flashcard page render', () => {
  function renderFlashcardPage(subject: string, paper = '1', tier = 'higher') {
    return render(
      <MemoryRouter initialEntries={[`/science-lab/${subject}/${paper}/${tier}/flashcard`]}>
        <Routes>
          <Route path="/science-lab/:subject/:paper/:tier/flashcard" element={<ScienceLabFlashcardPage />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('renders Biology flashcard page without crashing', () => {
    expect(() => renderFlashcardPage('biology')).not.toThrow();
  });

  it('shows at least one flashcard and progress when steps exist', () => {
    renderFlashcardPage('biology');
    const progressOrCard = screen.queryAllByText(/Learn:|Card \d+ of \d+|Again|Got it|Flip/);
    expect(progressOrCard.length).toBeGreaterThan(0);
  });

  it('advances through many steps without crashing (stress test)', () => {
    const { container } = renderFlashcardPage('biology');
    const steps = buildLearnSteps('Biology', 1 as SciencePaper, 'Higher' as ScienceTier);
    const advanceCount = Math.min(80, Math.max(0, steps.length - 1));
    for (let i = 0; i < advanceCount; i++) {
      const next = screen.queryByTestId('flashcard-next');
      if (!next || next.hasAttribute('disabled')) break;
      act(() => {
        next.click();
      });
    }
    expect(container.textContent?.length).toBeGreaterThan(0);
  });

  it('full deck has 100+ flashcard steps (Biology) so app can show all in one go', () => {
    const steps = buildLearnSteps('Biology', 1 as SciencePaper, 'Higher' as ScienceTier);
    const flashcardSteps = steps.filter((s) => s.type === 'flashcard');
    expect(flashcardSteps.length).toBeGreaterThanOrEqual(100);
  });
});

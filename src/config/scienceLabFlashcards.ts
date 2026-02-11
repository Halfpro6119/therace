/**
 * Science Lab Flashcards - Generated from concepts, questions, and practicals
 * Flashcard-First Learning System
 */

import type {
  ScienceSubject,
  SciencePaper,
  ScienceTier,
  ScienceFlashcard,
  FlashcardType,
  ScienceQuickCheck,
  QuickCheckType,
} from '../types/scienceLab';
import {
  SCIENCE_CONCEPTS,
  SCIENCE_QUESTIONS,
  SCIENCE_PRACTICALS,
  SCIENCE_MISCONCEPTIONS,
  SCIENCE_EQUATIONS,
  getConceptsBySubject,
  getQuestionsByFilters,
  getPracticalsBySubject,
  getMisconceptionsBySubject,
  getEquationsBySubject,
} from './scienceLabData';

/**
 * Generate flashcards from concepts
 */
function generateConceptFlashcards(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): ScienceFlashcard[] {
  const concepts = SCIENCE_CONCEPTS.filter(
    c => c.subject === subject
  );

  const flashcards: ScienceFlashcard[] = [];

  concepts.forEach(concept => {
    // Main concept card
    flashcards.push({
      id: `flashcard-${concept.id}`,
      subject,
      paper,
      tier,
      topic: concept.topic,
      type: 'concept',
      front: {
        prompt: `What is the core idea behind ${concept.topic}?`,
        visual: {
          type: concept.visualModel.type === 'flow' ? 'diagram' : concept.visualModel.type,
          description: concept.visualModel.description,
          diagramId: concept.visualModel.diagramId,
        },
      },
      back: {
        explanation: concept.coreIdea,
        keyTerms: extractKeyTerms(concept.coreIdea),
        misconceptionWarning: concept.commonMisconception,
      },
      relatedConceptId: concept.id,
    });

    // Process chain cards from change scenarios
    concept.changeScenarios.forEach((scenario, idx) => {
      flashcards.push({
        id: `flashcard-${concept.id}-scenario-${idx}`,
        subject,
        paper,
        tier,
        topic: concept.topic,
        type: 'processChain',
        front: {
          prompt: scenario.prompt,
        },
        back: {
          explanation: scenario.explanation,
          keyTerms: extractKeyTerms(scenario.explanation),
          misconceptionWarning: concept.commonMisconception,
        },
        relatedConceptId: concept.id,
      });
    });
  });

  return flashcards;
}

/**
 * Generate flashcards from misconceptions
 */
function generateMisconceptionFlashcards(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): ScienceFlashcard[] {
  const misconceptions = getMisconceptionsBySubject(subject);

  return misconceptions.map(misconception => ({
    id: `flashcard-misconception-${misconception.id}`,
    subject,
    paper,
    tier,
    topic: misconception.topic,
    type: 'misconception',
    front: {
      prompt: `What is wrong with this idea: "${misconception.misconception}"?`,
    },
    back: {
      explanation: misconception.correctUnderstanding,
      keyTerms: extractKeyTerms(misconception.correctUnderstanding),
      misconceptionWarning: misconception.misconception,
      example: misconception.example,
    },
  }));
}

/**
 * Generate flashcards from practicals
 */
function generatePracticalFlashcards(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): ScienceFlashcard[] {
  const practicals = getPracticalsBySubject(subject);
  const flashcards: ScienceFlashcard[] = [];

  practicals.forEach(practical => {
    // Purpose card
    flashcards.push({
      id: `flashcard-practical-${practical.id}-purpose`,
      subject,
      paper,
      tier,
      topic: practical.title,
      type: 'practical',
      front: {
        prompt: `What is the purpose of the practical: ${practical.title}?`,
      },
      back: {
        explanation: practical.purpose,
        keyTerms: ['purpose', 'investigate', 'determine'],
      },
      relatedPracticalId: practical.id,
    });

    // Variables card
    flashcards.push({
      id: `flashcard-practical-${practical.id}-variables`,
      subject,
      paper,
      tier,
      topic: practical.title,
      type: 'practical',
      front: {
        prompt: `What are the variables in ${practical.title}?`,
      },
      back: {
        explanation: `Independent: ${practical.independentVariable}. Dependent: ${practical.dependentVariable}. Controlled: ${practical.controlledVariables.join(', ')}.`,
        keyTerms: ['independent variable', 'dependent variable', 'controlled variable'],
      },
      relatedPracticalId: practical.id,
    });
  });

  return flashcards;
}

/**
 * Generate flashcards from equations
 */
function generateEquationFlashcards(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): ScienceFlashcard[] {
  const equations = getEquationsBySubject(subject);
  const flashcards: ScienceFlashcard[] = [];

  equations.forEach(equation => {
    equation.symbols.forEach(symbol => {
      flashcards.push({
        id: `flashcard-equation-${equation.id}-${symbol.symbol}`,
        subject,
        paper,
        tier,
        topic: equation.topic,
        type: 'equation',
        front: {
          prompt: `In the equation ${equation.equation}, what does ${symbol.symbol} represent?`,
          visual: {
            type: 'equation',
            description: equation.equation,
          },
        },
        back: {
          explanation: `${symbol.symbol} represents ${symbol.name}. Unit: ${symbol.unit}. ${symbol.description}`,
          keyTerms: [symbol.name, symbol.unit],
        },
      });
    });
  });

  return flashcards;
}

/**
 * Extract key terms from text
 */
function extractKeyTerms(text: string): string[] {
  const scienceTerms = [
    'diffusion', 'osmosis', 'active transport', 'concentration gradient',
    'enzyme', 'substrate', 'active site', 'denatured',
    'photosynthesis', 'respiration', 'glucose', 'ATP',
    'homeostasis', 'negative feedback', 'hormone', 'insulin',
    'DNA', 'gene', 'chromosome', 'allele', 'genotype', 'phenotype',
    'natural selection', 'evolution', 'variation',
    'ecosystem', 'food chain', 'trophic level', 'carbon cycle',
    'mole', 'concentration', 'neutralisation', 'reactivity', 'electrolysis', 'cathode', 'anode',
    'exothermic', 'endothermic', 'activation energy', 'crude oil', 'alkane', 'fractional distillation',
    'greenhouse', 'infrared', 'life cycle assessment',
    'density', 'specific heat capacity', 'wave', 'wavelength', 'frequency', 'resistance', 'current', 'potential difference',
    'force', 'acceleration', 'magnetic field', 'Fleming',
  ];

  const lowerText = text.toLowerCase();
  return scienceTerms.filter(term => lowerText.includes(term.toLowerCase()));
}

/**
 * Get all flashcards for a subject, paper, and tier (optionally filtered by topic)
 */
export function getFlashcardsByFilters(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier,
  topic?: string
): ScienceFlashcard[] {
  const conceptCards = generateConceptFlashcards(subject, paper, tier);
  const misconceptionCards = generateMisconceptionFlashcards(subject, paper, tier);
  const practicalCards = generatePracticalFlashcards(subject, paper, tier);
  const equationCards = generateEquationFlashcards(subject, paper, tier);

  const all = [
    ...conceptCards,
    ...misconceptionCards,
    ...practicalCards,
    ...equationCards,
  ];
  if (topic) return all.filter(f => f.topic === topic);
  return all;
}

/**
 * Generate Quick Checks from flashcards
 */
export function generateQuickChecks(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): ScienceQuickCheck[] {
  const flashcards = getFlashcardsByFilters(subject, paper, tier);
  const quickChecks: ScienceQuickCheck[] = [];

  // Generate misconception checks (MC with improved options)
  const misconceptions = getMisconceptionsBySubject(subject);
  misconceptions.forEach(misconception => {
    const distractors = [
      misconception.misconception,
      misconception.whyWrong.length > 80 ? misconception.whyWrong.slice(0, 80) + '...' : misconception.whyWrong,
      misconception.example && misconception.example.length < 100 ? misconception.example : misconception.misconception,
    ].filter((v, i, a) => a.indexOf(v) === i && v !== misconception.correctUnderstanding);
    const options = [misconception.correctUnderstanding, ...distractors.slice(0, 2)].sort(() => Math.random() - 0.5);
    quickChecks.push({
      id: `quickcheck-misconception-${misconception.id}`,
      subject,
      paper,
      tier,
      topic: misconception.topic,
      type: 'multipleChoice',
      question: `Which statement is correct about ${misconception.topic}?`,
      options,
      correctAnswer: misconception.correctUnderstanding,
      feedback: {
        correct: `Correct! ${misconception.correctUnderstanding}`,
        incorrect: `Incorrect. ${misconception.whyWrong}`,
        ideaReference: misconception.correctUnderstanding,
      },
      relatedFlashcardIds: [`flashcard-misconception-${misconception.id}`],
    });
    // True/False: "True or False: [misconception]"
    quickChecks.push({
      id: `quickcheck-tf-${misconception.id}`,
      subject,
      paper,
      tier,
      topic: misconception.topic,
      type: 'trueFalse',
      question: `True or False: "${misconception.misconception}"`,
      options: ['True', 'False'],
      correctAnswer: 'False',
      feedback: {
        correct: `Correct! This is a misconception. ${misconception.correctUnderstanding}`,
        incorrect: `False. This is wrong. ${misconception.whyWrong}`,
        ideaReference: misconception.correctUnderstanding,
      },
      relatedFlashcardIds: [`flashcard-misconception-${misconception.id}`],
    });
  });

  // Generate process chain checks (drag to order)
  const concepts = SCIENCE_CONCEPTS.filter(c => c.subject === subject);
  concepts.forEach(concept => {
    if (concept.changeScenarios.length > 0) {
      const scenario = concept.changeScenarios[0];
      const steps = scenario.explanation.split('→').map(s => s.trim());
      if (steps.length >= 3) {
        quickChecks.push({
          id: `quickcheck-process-${concept.id}`,
          subject,
          paper,
          tier,
          topic: concept.topic,
          type: 'dragOrder',
          question: `Put these steps in the correct order for: ${scenario.prompt}`,
          options: [...steps].sort(() => Math.random() - 0.5), // Shuffled
          correctAnswer: steps,
          feedback: {
            correct: 'Correct! You understand the process chain.',
            incorrect: `Incorrect. The correct order is: ${steps.join(' → ')}`,
            ideaReference: scenario.explanation,
          },
          relatedFlashcardIds: [`flashcard-${concept.id}`, `flashcard-${concept.id}-scenario-0`],
        });
      }
    }
  });

  return quickChecks;
}

/**
 * Get quick checks by filters (optionally filtered by topic)
 */
export function getQuickChecksByFilters(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier,
  topic?: string
): ScienceQuickCheck[] {
  const all = generateQuickChecks(subject, paper, tier);
  if (topic) return all.filter(q => q.topic === topic);
  return all;
}

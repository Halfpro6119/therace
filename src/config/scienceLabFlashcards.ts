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

  concepts.forEach((concept, conceptIdx) => {
    // Varied prompt templates to reduce predictability and strengthen retrieval
    const promptTemplates = [
      `What is the core idea behind ${concept.topic}?`,
      `Explain the key concept of ${concept.topic} in 1–2 sentences.`,
      `What must you understand about ${concept.topic}?`,
    ];
    const prompt = promptTemplates[conceptIdx % promptTemplates.length];

    // Main concept card
    flashcards.push({
      id: `flashcard-${concept.id}`,
      subject,
      paper,
      tier,
      topic: concept.topic,
      type: 'concept',
      front: {
        prompt,
        visual: {
          type: (['flow', 'cell', 'particle', 'energy', 'foodChain'].includes(concept.visualModel.type) ? 'diagram' : concept.visualModel.type) as 'diagram' | 'graph' | 'icon' | 'equation',
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
  const cards: ScienceFlashcard[] = [];

  misconceptions.forEach((misconception, idx) => {
    // Card 1: "What is wrong" – tests explanation recall
    cards.push({
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
    });

    // Card 2: "True or False" – tests quick recognition (every other misconception to avoid doubling deck size)
    if (idx % 2 === 0) {
      cards.push({
        id: `flashcard-misconception-${misconception.id}-tf`,
        subject,
        paper,
        tier,
        topic: misconception.topic,
        type: 'misconception',
        front: {
          prompt: `True or False: "${misconception.misconception}"`,
        },
        back: {
          explanation: `False. ${misconception.correctUnderstanding}`,
          keyTerms: extractKeyTerms(misconception.correctUnderstanding),
          misconceptionWarning: misconception.misconception,
          example: misconception.example,
        },
      });
    }
  });

  return cards;
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
        keyTerms: extractKeyTerms(practical.purpose).length > 0 ? extractKeyTerms(practical.purpose) : ['purpose', 'investigate', 'determine'],
      },
      relatedPracticalId: practical.id,
    });

    // Variables card
    const variablesExplanation = `Independent: ${practical.independentVariable}. Dependent: ${practical.dependentVariable}. Controlled: ${practical.controlledVariables.join(', ')}.`;
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
        explanation: variablesExplanation,
        keyTerms: ['independent variable', 'dependent variable', 'controlled variable'],
      },
      relatedPracticalId: practical.id,
    });

    // Risk card – first hazard and control (exam-relevant)
    if (practical.risks.length > 0) {
      const risk = practical.risks[0];
      flashcards.push({
        id: `flashcard-practical-${practical.id}-risk`,
        subject,
        paper,
        tier,
        topic: practical.title,
        type: 'practical',
        front: {
          prompt: `What is a hazard in ${practical.title} and how do you control it?`,
        },
        back: {
          explanation: `${risk.hazard}: ${risk.risk}. Control: ${risk.control}`,
          keyTerms: extractKeyTerms(`${risk.hazard} ${risk.control}`),
        },
        relatedPracticalId: practical.id,
      });
    }

    // Graph card – when practical has graph expectations
    if (practical.graphExpectations) {
      const g = practical.graphExpectations;
      flashcards.push({
        id: `flashcard-practical-${practical.id}-graph`,
        subject,
        paper,
        tier,
        topic: practical.title,
        type: 'practical',
        front: {
          prompt: `What graph do you plot for ${practical.title} and what trend do you expect?`,
        },
        back: {
          explanation: `Plot ${g.xAxis} (x-axis) against ${g.yAxis} (y-axis). Expected trend: ${g.expectedTrend ?? g.type + ' graph'}.`,
          keyTerms: [g.xAxis, g.yAxis, g.type],
        },
        relatedPracticalId: practical.id,
      });
    }
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
    // Symbol → meaning cards (original)
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

    // Reverse card: concept → equation (one per equation)
    const firstSymbol = equation.symbols[0];
    if (firstSymbol) {
      flashcards.push({
        id: `flashcard-equation-${equation.id}-reverse`,
        subject,
        paper,
        tier,
        topic: equation.topic,
        type: 'equation',
        front: {
          prompt: `What is the equation for ${equation.topic}?`,
        },
        back: {
          explanation: equation.equation,
          keyTerms: equation.symbols.map(s => s.name),
        },
      });
    }

    // Unit trap cards – common mistakes (one per equation with traps)
    if (equation.unitTraps?.length > 0) {
      const trap = equation.unitTraps[0];
      flashcards.push({
        id: `flashcard-equation-${equation.id}-unit`,
        subject,
        paper,
        tier,
        topic: equation.topic,
        type: 'equation',
        front: {
          prompt: `In ${equation.equation}, why is ${trap.wrongUnit} wrong? What is correct?`,
        },
        back: {
          explanation: trap.explanation,
          keyTerms: [trap.correctUnit, trap.wrongUnit],
          misconceptionWarning: `Using ${trap.wrongUnit} is a common mistake.`,
        },
      });
    }
  });

  return flashcards;
}

/**
 * Science vocabulary for key term extraction (longer phrases first for specificity)
 */
const SCIENCE_VOCABULARY = [
  'concentration gradient', 'active transport', 'negative feedback', 'natural selection',
  'activation energy', 'fractional distillation', 'specific heat capacity', 'potential difference',
  'magnetic field', 'life cycle assessment', 'carbon cycle', 'food chain', 'trophic level',
  'diffusion', 'osmosis', 'enzyme', 'substrate', 'active site', 'denatured',
  'photosynthesis', 'respiration', 'glucose', 'ATP', 'homeostasis', 'hormone', 'insulin',
  'DNA', 'gene', 'chromosome', 'allele', 'genotype', 'phenotype', 'evolution', 'variation',
  'ecosystem', 'mole', 'concentration', 'neutralisation', 'reactivity', 'electrolysis',
  'cathode', 'anode', 'exothermic', 'endothermic', 'crude oil', 'alkane',
  'greenhouse', 'infrared', 'density', 'wave', 'wavelength', 'frequency',
  'resistance', 'current', 'force', 'acceleration', 'Fleming',
  'turgid', 'plasmolysed', 'carrier protein', 'kinetic energy', 'mitosis', 'meiosis',
  'pathogen', 'antibody', 'antigen', 'vaccine', 'chlorophyll', 'chloroplast',
  'aerobic', 'anaerobic', 'lactic acid', 'oxygen debt', 'receptor', 'effector',
  'stimulus', 'reflex', 'CNS', 'neurone', 'gamete', 'homozygous', 'heterozygous',
  'fermentation', 'catalyst', 'emulsify', 'lipase', 'amylase', 'starch',
  'independent variable', 'dependent variable', 'controlled variable',
];

/**
 * Extract key terms from text – uses vocabulary match + extracts quoted/phrase-like terms
 */
function extractKeyTerms(text: string): string[] {
  const lowerText = text.toLowerCase();
  const found = new Set<string>();

  // Match known science vocabulary (longer phrases first)
  for (const term of SCIENCE_VOCABULARY) {
    if (lowerText.includes(term.toLowerCase())) {
      found.add(term);
    }
  }

  // Extract unit-like terms (e.g. "g", "mol", "N", "m/s²")
  const unitMatch = text.match(/\b(g|kg|mol|N|J|s|m\/s²|°C|V|A|Ω|Hz|m|cm|mm|μm|%|dm³)\b/gi);
  if (unitMatch) {
    unitMatch.forEach(u => found.add(u));
  }

  return Array.from(found).slice(0, 8); // Cap at 8 to avoid clutter
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
  // Use only wrong statements as distractors: the misconception itself + other misconceptions.
  // Avoid whyWrong/example - they often restate the correct understanding and create duplicate "correct" options.
  const misconceptions = getMisconceptionsBySubject(subject);
  misconceptions.forEach(misconception => {
    const sameTopicWrong = misconceptions
      .filter(m => m.id !== misconception.id && m.topic === misconception.topic)
      .map(m => m.misconception);
    const otherTopicWrong = misconceptions
      .filter(m => m.id !== misconception.id && m.topic !== misconception.topic)
      .map(m => m.misconception);
    const distractors = [
      misconception.misconception,
      ...sameTopicWrong,
      ...otherTopicWrong,
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

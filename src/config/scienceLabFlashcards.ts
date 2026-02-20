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
  TopicTestItem,
  ScienceQuestion,
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
 * Derive a short, human-readable label from concept id for use in prompts
 * e.g. 'bio-diffusion' → 'diffusion', 'bio-cell-division' → 'cell division'
 */
function getConceptLabel(concept: { id: string }): string {
  const withoutPrefix = concept.id.replace(/^(bio|chem|phys)-/, '');
  const withoutSuffix = withoutPrefix.replace(/-00\d+$/, '').replace(/-grade9$/, '');
  return withoutSuffix.replace(/-/g, ' ');
}

/**
 * Harder prompts that omit the concept name (desirable difficulty).
 * Used for ~33% of concept cards when hash % 3 === 0 (per FLASHCARD_FULL_AUDIT_2025_02).
 */
const CONCEPT_HARDER_PROMPTS: Record<string, string> = {
  'bio-diffusion': 'What process moves particles from an area of high concentration to low concentration?',
  'bio-osmosis': 'What happens when water moves across a partially permeable membrane down a water concentration gradient?',
  'bio-active-transport': 'What process moves substances against the concentration gradient, requiring energy?',
  'bio-enzyme-action': 'How does an enzyme speed up a reaction? What is the role of the active site?',
  'bio-photosynthesis': 'What process do plants use to make glucose using light, water and carbon dioxide?',
  'bio-respiration': 'What process releases energy from glucose in cells?',
  'bio-cell-division': 'What process produces genetically identical cells for growth and repair?',
  'bio-digestive-system': 'Where is bile produced and what is its role in digestion?',
  'bio-circulatory-system': 'Which blood vessel carries deoxygenated blood from the heart to the lungs?',
  'bio-pathogens': 'What is the difference between a virus and a bacterium in how they reproduce?',
  'bio-immune-system': 'Why does a second infection with the same pathogen often cause milder symptoms?',
  'bio-hormones': 'What type of signal travels in the blood and acts more slowly than a nerve impulse?',
  'bio-dna-genes': 'What is the relationship between a gene and a protein?',
  'bio-inheritance': 'If both parents are heterozygous for a recessive allele, what proportion of offspring could show the recessive phenotype?',
  'bio-evolution': 'What process leads to changes in the proportion of alleles in a population over time?',
  'bio-ecosystems': 'Why do food chains rarely have more than four or five trophic levels?',
  'bio-carbon-cycle': 'How does carbon in the atmosphere become part of a plant, then an animal, then return to the atmosphere?',
  'bio-energy-transfer': 'Why is only about 10% of energy passed to the next trophic level?',
  'bio-homeostasis': 'What do we call the maintenance of a stable internal environment?',
  'bio-stem-cells': 'What type of cell can differentiate into many different cell types?',
  'chem-rate-reaction': 'What factors increase the rate of a chemical reaction and why?',
  'chem-bonding': 'Why does sodium chloride conduct when molten but not when solid?',
  'chem-electrolysis': 'During electrolysis, where do positive ions move and what happens to them?',
  'chem-reactivity-series': 'Why does zinc displace copper from copper sulfate solution?',
  'chem-atomic-structure': 'How do you find the number of neutrons in an atom from the periodic table?',
  'chem-moles': 'How many moles are in 8 g of oxygen gas (O₂)? (Mr = 32)',
  'chem-acids-bases': 'What are the products when an acid reacts with a base?',
  'chem-crude-oil': 'In the fractionating column, where do the smallest hydrocarbon molecules condense?',
  'phys-electricity': 'How do resistors in series affect total resistance?',
  'phys-forces': 'What happens to acceleration when mass doubles but force stays constant?',
  'phys-energy-stores': 'If speed doubles, what happens to kinetic energy and why?',
  'phys-particle-model': 'Why does a gas fill its container but a solid does not?',
  'phys-specific-heat-capacity': 'Why does the same heater raise the temperature of water more slowly than the same mass of aluminium?',
  'phys-waves': 'What is the relationship between wave speed, frequency and wavelength?',
  'phys-atomic-structure': 'Which type of nuclear radiation is stopped by a sheet of paper?',
  'phys-magnetism': 'How do you find the direction of the force on a current-carrying wire in a magnetic field?',
};

/**
 * Get a stable, varied prompt for a concept when no custom flashcardPrompt is set.
 * ~33% of cards use harder prompts (omit topic) for desirable difficulty.
 */
function getConceptPrompt(concept: { id: string; topic: string; coreIdea: string; flashcardPrompt?: string }): string {
  if (concept.flashcardPrompt) return concept.flashcardPrompt;
  const label = getConceptLabel(concept);
  const hash = concept.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const useHarder = hash % 3 === 0 && CONCEPT_HARDER_PROMPTS[concept.id];
  if (useHarder) return CONCEPT_HARDER_PROMPTS[concept.id];
  const templates = [
    () => `What is ${label} and how does it work?`,
    () => `Explain ${label} in 1–2 sentences.`,
    () => `What is the key idea behind ${label}?`,
    () => `What must you understand about ${label}?`,
    () => `Describe ${label}.`,
    () => `How would you explain ${label} to another student?`,
    () => `What is the core concept of ${label}?`,
    () => `Summarise ${label}.`,
  ];
  const idx = hash % templates.length;
  return templates[idx]();
}

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

  concepts.forEach((concept) => {
    const prompt = getConceptPrompt(concept);

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
          visual: scenario.visual ? {
            type: 'diagram',
            description: scenario.visual.description ?? scenario.explanation,
          } : undefined,
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
        visual: misconception.correctUnderstanding ? {
          type: 'diagram',
          description: misconception.correctUnderstanding,
        } : undefined,
      },
      back: {
        explanation: misconception.correctUnderstanding,
        keyTerms: extractKeyTerms(misconception.correctUnderstanding),
        misconceptionWarning: misconception.misconception,
        example: misconception.example,
      },
    });
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
        visual: practical.visual ? {
          type: 'diagram',
          description: practical.visual.description ?? practical.purpose,
        } : undefined,
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
 * Science vocabulary for key term extraction (longer phrases first for specificity).
 * Extended per SCIENCE_LAB_FLASHCARD_FULL_REVIEW.
 */
const SCIENCE_VOCABULARY = [
  'concentration gradient', 'active transport', 'negative feedback', 'natural selection',
  'activation energy', 'fractional distillation', 'specific heat capacity', 'potential difference',
  'magnetic field', 'life cycle assessment', 'carbon cycle', 'food chain', 'trophic level',
  'total internal reflection', 'limit of proportionality', 'elastic deformation', 'plastic deformation',
  'empirical formula', 'molecular formula', 'half equation', 'reversible reaction',
  'induced p.d.', 'alternating current', 'red shift', 'half-life',
  'diffusion', 'osmosis', 'enzyme', 'substrate', 'active site', 'denatured',
  'photosynthesis', 'respiration', 'glucose', 'ATP', 'homeostasis', 'hormone', 'insulin',
  'DNA', 'gene', 'chromosome', 'allele', 'genotype', 'phenotype', 'evolution', 'variation',
  'ecosystem', 'mole', 'concentration', 'neutralisation', 'reactivity', 'electrolysis',
  'cathode', 'anode', 'electrode', 'exothermic', 'endothermic', 'crude oil', 'alkane',
  'greenhouse', 'infrared', 'density', 'wave', 'wavelength', 'frequency',
  'resistance', 'current', 'force', 'acceleration', 'Fleming',
  'turgid', 'plasmolysed', 'carrier protein', 'kinetic energy', 'mitosis', 'meiosis',
  'pathogen', 'antibody', 'antigen', 'vaccine', 'chlorophyll', 'chloroplast',
  'aerobic', 'anaerobic', 'lactic acid', 'oxygen debt', 'receptor', 'effector',
  'stimulus', 'reflex', 'CNS', 'neurone', 'gamete', 'homozygous', 'heterozygous',
  'fermentation', 'catalyst', 'emulsify', 'lipase', 'amylase', 'starch',
  'predator', 'prey', 'decomposer', 'biodiversity', 'quadrat', 'transect', 'equilibrium',
  'critical angle', 'fission', 'fusion', 'isotope',
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

  // Extract unit-like terms (e.g. "g", "mol", "N", "m/s²"). Extended per SCIENCE_LAB_FLASHCARD_FULL_REVIEW (W, kW, Pa, kPa).
  const unitMatch = text.match(/\b(g|kg|mol|N|J|s|m\/s²|°C|V|A|Ω|Hz|m|cm|mm|μm|%|dm³|W|kW|Pa|kPa)\b/gi);
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
 * Concept-specific application questions for tougher quick checks.
 * Each tests applied understanding, not just recall.
 */
const CONCEPT_APPLICATION_QUESTIONS: Array<{
  conceptId: string;
  question: string;
  correctAnswer: string;
  distractors: string[];
  /** Optional: richer feedback when incorrect. If absent, uses coreIdea. */
  feedbackIncorrect?: string;
}> = [
  // Cell Biology
  {
    conceptId: 'bio-diffusion',
    question: 'A drop of ink is placed in still water. Which statement correctly explains why it spreads?',
    correctAnswer: 'Particles move randomly; net movement is from high to low concentration because more particles start there',
    distractors: [
      'Particles choose to spread out to fill the space',
      'Water pushes the ink particles apart',
      'Particles move only when stirred',
    ],
    feedbackIncorrect: 'Diffusion: particles move randomly. Because there are more particles in the ink drop, more move out than in → net movement from high to low concentration until even.',
  },
  {
    conceptId: 'bio-osmosis',
    question: 'A plant cell is placed in concentrated salt solution. Water leaves the cell. Why?',
    correctAnswer: 'The salt solution has lower water concentration than the cytoplasm',
    distractors: [
      'The salt solution has less water in total',
      'Salt pulls water out of the cell',
      'The cell membrane becomes more permeable',
    ],
    feedbackIncorrect: 'Osmosis is water moving down its concentration gradient. Concentrated salt solution has fewer free water molecules than cytoplasm → water leaves the cell through the partially permeable membrane.',
  },
  {
    conceptId: 'bio-active-transport',
    question: 'Root hair cells absorb mineral ions from dilute soil. Why can\'t diffusion do this?',
    correctAnswer: 'Ions would need to move from low to high concentration, which requires energy',
    distractors: [
      'Diffusion is too slow for minerals',
      'The cell membrane blocks ions',
      'Soil has higher concentration than the cell',
    ],
    feedbackIncorrect: 'Diffusion moves substances from high to low concentration. Minerals in soil are dilute (low concentration); inside the cell they are higher. Moving low → high goes against the gradient and needs energy (ATP from respiration) and carrier proteins.',
  },
  {
    conceptId: 'bio-cell-division',
    question: 'A skin cell divides to heal a cut. Which process produces genetically identical cells?',
    correctAnswer: 'Mitosis – for growth and repair',
    distractors: [
      'Meiosis – produces body cells',
      'Both mitosis and meiosis produce identical cells',
      'Neither – cell division always creates variation',
    ],
  },
  // Organisation
  {
    conceptId: 'bio-enzyme-action',
    question: 'An enzyme is heated above 60°C and stops working. Why?',
    correctAnswer: 'The active site has changed shape so the substrate no longer fits',
    distractors: [
      'The enzyme has been used up',
      'High temperature speeds up the reaction too much',
      'The substrate has denatured',
    ],
    feedbackIncorrect: 'Above optimum temperature, bonds holding the enzyme\'s shape break → active site changes shape → substrate no longer fits → enzyme is denatured and cannot catalyse the reaction.',
  },
  {
    conceptId: 'bio-digestive-system',
    question: 'Bile is not produced. Which type of digestion is most affected?',
    correctAnswer: 'Fat digestion – bile emulsifies fats to increase surface area for lipase',
    distractors: [
      'Carbohydrate digestion – bile breaks down starch',
      'Protein digestion – bile provides the correct pH',
      'No effect – bile is not essential',
    ],
    feedbackIncorrect: 'Bile (from the liver) emulsifies fats: breaks large globules into smaller droplets → larger surface area → lipase can break down fats efficiently. Without bile, fat digestion is impaired.',
  },
  {
    conceptId: 'bio-circulatory-system',
    question: 'Which vessel has the thinnest walls and allows exchange of substances?',
    correctAnswer: 'Capillaries – one cell thick for diffusion',
    distractors: [
      'Arteries – carry blood at high pressure',
      'Veins – return blood to the heart',
      'All vessels have similar wall thickness',
    ],
  },
  // Infection and Response
  {
    conceptId: 'bio-pathogens',
    question: 'A virus causes disease. How does it differ from a bacterium?',
    correctAnswer: 'Viruses need a host cell to reproduce; bacteria can reproduce independently',
    distractors: [
      'Viruses are larger than bacteria',
      'Bacteria are always harmful, viruses are not',
      'Viruses produce toxins; bacteria do not',
    ],
    feedbackIncorrect: 'Viruses: non-living, invade host cells and use them to replicate. Bacteria: living cells, can reproduce by binary fission outside a host. Bacteria can also be beneficial (e.g. in gut).',
  },
  {
    conceptId: 'bio-immune-system',
    question: 'Why does a second infection with the same pathogen cause fewer symptoms?',
    correctAnswer: 'Memory cells produce antibodies faster, destroying the pathogen before symptoms develop',
    distractors: [
      'The first infection used up all the pathogens',
      'Antibodies from the first infection are still in the blood',
      'The immune system ignores the pathogen the second time',
    ],
    feedbackIncorrect: 'First infection: antigens trigger primary response → antibodies produced slowly → memory cells formed. Second infection: memory cells recognise antigens → faster antibody production (secondary response) → pathogen destroyed before symptoms develop.',
  },
  // Bioenergetics
  {
    conceptId: 'bio-photosynthesis',
    question: 'A plant is moved from dim to bright light. What happens to the rate of photosynthesis and why?',
    correctAnswer: 'Rate increases – more light energy for the light-dependent reaction',
    distractors: [
      'Rate decreases – bright light damages chlorophyll',
      'Rate stays the same – light is not a limiting factor',
      'Rate increases – more carbon dioxide is produced',
    ],
    feedbackIncorrect: 'Light is energy for the light-dependent reaction in chloroplasts. In dim light, light is limiting. More light → more energy for splitting water and making ATP/NADPH → more glucose produced. Rate increases until another factor (CO₂, temperature) limits.',
  },
  {
    conceptId: 'bio-respiration',
    question: 'During vigorous exercise, muscles respire anaerobically. What is the disadvantage?',
    correctAnswer: 'Lactic acid builds up, causing muscle fatigue and oxygen debt',
    distractors: [
      'Less glucose is released',
      'Carbon dioxide cannot be removed',
      'No disadvantage – anaerobic releases more energy',
    ],
    feedbackIncorrect: 'Anaerobic respiration: glucose → lactic acid (no oxygen). Less ATP per glucose than aerobic. Lactic acid builds up → muscle fatigue. Oxygen debt: extra oxygen needed later to oxidise lactic acid.',
  },
  // Chemistry
  {
    conceptId: 'chem-rate-reaction',
    question: 'Concentration of a reactant is doubled. Why does the reaction rate increase?',
    correctAnswer: 'More particles per unit volume means more collisions per second',
    distractors: [
      'Particles move faster at higher concentration',
      'The activation energy is lower',
      'Concentration has no effect on rate',
    ],
  },
  {
    conceptId: 'chem-bonding',
    question: 'Sodium chloride conducts electricity when molten but not when solid. Why?',
    correctAnswer: 'Ions are fixed in the solid lattice; molten ions can move and carry charge',
    distractors: [
      'Electrons can move in the solid',
      'The melting process creates free electrons',
      'Solid NaCl has covalent bonds',
    ],
  },
  {
    conceptId: 'chem-electrolysis',
    question: 'During electrolysis of copper sulfate, where does copper metal form and why?',
    correctAnswer: 'At the cathode – Cu²⁺ ions gain electrons and are reduced to Cu',
    distractors: [
      'At the anode – copper loses electrons there',
      'In the solution – ions combine in the middle',
      'Copper does not form – only oxygen is produced',
    ],
  },
  {
    conceptId: 'chem-reactivity-series',
    question: 'Zinc is added to silver nitrate solution. What happens and why?',
    correctAnswer: 'Zinc displaces silver – zinc is more reactive, so the reaction occurs',
    distractors: [
      'No reaction – silver is more reactive',
      'Both metals dissolve equally',
      'Zinc coating forms on the silver',
    ],
  },
  // Physics
  {
    conceptId: 'phys-electricity',
    question: 'Two identical resistors are connected in series. How does total resistance compare to one resistor?',
    correctAnswer: 'Total resistance doubles – R_total = R₁ + R₂',
    distractors: [
      'Total resistance halves',
      'Total resistance stays the same',
      'It depends on the voltage',
    ],
  },
  {
    conceptId: 'phys-forces',
    question: 'A constant force acts on an object. The mass is doubled. What happens to acceleration?',
    correctAnswer: 'Acceleration halves – a = F/m, so doubling m halves a',
    distractors: [
      'Acceleration doubles',
      'Acceleration stays the same',
      'Acceleration becomes zero',
    ],
  },
  {
    conceptId: 'phys-energy-stores',
    question: 'A ball\'s speed doubles. What happens to its kinetic energy?',
    correctAnswer: 'Kinetic energy quadruples – KE ∝ v², so (2v)² = 4 × original KE',
    distractors: [
      'Kinetic energy doubles',
      'Kinetic energy stays the same',
      'Kinetic energy halves',
    ],
  },
  // Homeostasis and Response (per SCIENCE_LAB_FLASHCARD_AUDIT)
  {
    conceptId: 'bio-homeostasis',
    question: 'Blood glucose rises after a meal. How does the body respond to return it to normal?',
    correctAnswer: 'Insulin is released; it triggers cells to take up glucose and liver to store it as glycogen',
    distractors: [
      'Glucagon is released to lower glucose',
      'The pancreas stops producing insulin',
      'Nothing – glucose returns on its own',
    ],
    feedbackIncorrect: 'High glucose → pancreas releases insulin. Insulin causes liver and muscle cells to take up glucose and store as glycogen. Blood glucose decreases. Glucagon raises glucose (opposite effect); it is released when glucose is low.',
  },
  {
    conceptId: 'bio-nervous-system',
    question: 'You touch a hot surface. In which order do these occur?',
    correctAnswer: 'Receptor detects heat → sensory neurone → CNS → motor neurone → effector (muscle) contracts',
    distractors: [
      'Effector responds first, then receptor detects',
      'CNS receives signal before receptor detects',
      'Motor neurone carries signal from receptor directly to effector',
    ],
  },
  // Physics – Waves (per SCIENCE_LAB_FLASHCARD_AUDIT)
  {
    conceptId: 'phys-waves',
    question: 'A wave has frequency 2 Hz and wavelength 3 m. What is its speed?',
    correctAnswer: '6 m/s – v = f × λ = 2 × 3 = 6',
    distractors: [
      '1.5 m/s – v = λ/f',
      '5 m/s – v = f + λ',
      'It depends on the wave type',
    ],
  },
  // Per SCIENCE_LAB_FLASHCARD_FULL_REVIEW: high-impact application questions
  {
    conceptId: 'bio-hormones',
    question: 'A person needs a rapid response to remove their hand from a hot object. Why are hormones not suitable for this?',
    correctAnswer: 'Hormones travel in the blood and act more slowly; nerve impulses are electrical and much faster',
    distractors: [
      'Hormones only work on muscles',
      'Hormones are broken down by heat',
      'Nerve impulses are chemical and slower than hormones',
    ],
  },
  {
    conceptId: 'bio-dna-genes',
    question: 'A gene codes for a protein. What is the correct sequence from gene to characteristic?',
    correctAnswer: 'Gene (DNA) → protein produced → affects characteristic',
    distractors: [
      'Characteristic → protein → gene',
      'Protein → gene → characteristic',
      'Gene and protein work independently',
    ],
  },
  {
    conceptId: 'bio-inheritance',
    question: 'Both parents are heterozygous (Aa) for a recessive disorder. What proportion of offspring could show the recessive phenotype?',
    correctAnswer: '25% – one in four can be homozygous recessive (aa)',
    distractors: [
      '50% – half will have the disorder',
      '75% – three in four',
      '0% – recessive is never expressed when a dominant is present',
    ],
  },
  {
    conceptId: 'bio-evolution',
    question: 'A population of bacteria becomes resistant to an antibiotic. Which process explains this?',
    correctAnswer: 'Natural selection – resistant variants survive and reproduce; alleles for resistance increase',
    distractors: [
      'Bacteria chose to become resistant',
      'The antibiotic caused mutations that made them resistant',
      'All bacteria evolved equally',
    ],
  },
  {
    conceptId: 'bio-ecosystems',
    question: 'Why do food chains rarely have more than four or five trophic levels?',
    correctAnswer: 'Energy is lost at each level (respiration, heat, waste); not enough energy left for more levels',
    distractors: [
      'Predators at the top eat everything',
      'There are not enough species',
      'Energy is recycled so it does not run out',
    ],
  },
  {
    conceptId: 'bio-carbon-cycle',
    question: 'How does carbon in the atmosphere become part of a plant, then an animal, then return to the atmosphere?',
    correctAnswer: 'Photosynthesis (CO₂ → plant) → consumption (animal eats plant) → respiration/decomposition (CO₂ released)',
    distractors: [
      'Animals absorb CO₂ directly from the air',
      'Carbon is created in plants and destroyed in animals',
      'Decomposition happens before consumption',
    ],
  },
  {
    conceptId: 'bio-energy-transfer',
    question: 'Why is only about 10% of energy passed to the next trophic level?',
    correctAnswer: 'Energy is lost in respiration, heat, movement, and waste; not all biomass is consumed',
    distractors: [
      'Organisms only eat 10% of their food',
      '90% is stored in bones',
      'Energy is destroyed at each level',
    ],
  },
  {
    conceptId: 'chem-moles',
    question: 'How many moles are in 8 g of oxygen gas, O₂? (Relative formula mass of O₂ = 32)',
    correctAnswer: '0.25 mol – moles = mass ÷ Mr = 8 ÷ 32 = 0.25',
    distractors: [
      '4 mol – 32 ÷ 8 = 4',
      '256 mol – 32 × 8',
      '8 mol – one mole per gram',
    ],
  },
  {
    conceptId: 'chem-le-chatelier',
    question: 'A reversible reaction is exothermic in the forward direction. Temperature is increased. What happens to the equilibrium position?',
    correctAnswer: 'Equilibrium shifts to the left (reverse direction) to absorb the extra heat',
    distractors: [
      'Equilibrium shifts to the right – more product',
      'No change – temperature does not affect equilibrium',
      'Equilibrium shifts to the side with more moles',
    ],
  },
  {
    conceptId: 'chem-atomic-structure',
    question: 'An atom has mass number 23 and atomic number 11. How many neutrons does it have?',
    correctAnswer: '12 – neutrons = mass number − atomic number = 23 − 11 = 12',
    distractors: [
      '11 – same as atomic number',
      '23 – same as mass number',
      '34 – 23 + 11',
    ],
  },
  {
    conceptId: 'chem-acids-bases',
    question: 'What are the products when an acid reacts with a base?',
    correctAnswer: 'Salt + water (neutralisation: H⁺ + OH⁻ → H₂O)',
    distractors: [
      'Hydrogen gas + salt',
      'Acid + base (no reaction)',
      'Carbon dioxide + water only',
    ],
  },
  {
    conceptId: 'phys-particle-model',
    question: 'A fixed mass of gas is compressed at constant temperature. What happens to the density and why?',
    correctAnswer: 'Density increases – same number of particles in a smaller volume',
    distractors: [
      'Density decreases – particles get smaller',
      'Density stays the same – temperature is constant',
      'Density increases – more particles are created',
    ],
  },
  {
    conceptId: 'phys-atomic-structure',
    question: 'Which type of nuclear radiation is stopped by a sheet of paper?',
    correctAnswer: 'Alpha – it has the largest mass and charge, so it is the least penetrating',
    distractors: [
      'Beta – it is the weakest',
      'Gamma – it is absorbed by paper',
      'All three are stopped by paper',
    ],
  },
  {
    conceptId: 'phys-magnetism',
    question: 'A current-carrying wire is placed in a magnetic field. How do you find the direction of the force on the wire?',
    correctAnswer: 'Fleming’s left-hand rule – thumb = force, first finger = field, second finger = current',
    distractors: [
      'Right-hand rule – same as for conventional current',
      'The force is always in the direction of the current',
      'The force is always opposite to the field',
    ],
  },
  {
    conceptId: 'phys-specific-heat-capacity',
    question: 'The same heater is used on equal masses of water and aluminium. Why does the water heat up more slowly?',
    correctAnswer: 'Water has a higher specific heat capacity – it needs more energy to raise its temperature by 1°C',
    distractors: [
      'Aluminium conducts heat better',
      'Water has a lower boiling point',
      'The heater works less well on water',
    ],
  },
];

/**
 * Infer outcome direction from scenario explanation (for application MCQs)
 */
function inferScenarioOutcome(explanation: string): { direction: 'increase' | 'decrease' | 'other'; outcome?: string } {
  const lower = explanation.toLowerCase();
  if (/\b(increase|faster|higher|more|enters?|swells?|turgid|quadruple|double)\b/.test(lower)) return { direction: 'increase' };
  if (/\b(decrease|slower|lower|less|leaves?|shrinks?|plasmolysed|stops?|halves?|halve)\b/.test(lower)) return { direction: 'decrease' };
  return { direction: 'other' };
}

/**
 * Generate Quick Checks from flashcards – application-focused, tougher questions
 */
export function generateQuickChecks(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): ScienceQuickCheck[] {
  const quickChecks: ScienceQuickCheck[] = [];
  const concepts = SCIENCE_CONCEPTS.filter(c => c.subject === subject);
  const misconceptions = getMisconceptionsBySubject(subject);

  // 1. Concept application checks – test applied understanding, not just recall
  const conceptAppConfigs = CONCEPT_APPLICATION_QUESTIONS.filter(c => 
    concepts.some(concept => concept.id === c.conceptId)
  );
  conceptAppConfigs.forEach(config => {
    const concept = concepts.find(c => c.id === config.conceptId);
    if (!concept) return;
    const options = [config.correctAnswer, ...config.distractors].sort(() => Math.random() - 0.5);
    quickChecks.push({
      id: `quickcheck-apply-${config.conceptId}`,
      subject,
      paper,
      tier,
      topic: concept.topic,
      type: 'multipleChoice',
      question: config.question,
      options,
      correctAnswer: config.correctAnswer,
      feedback: {
        correct: `Correct! This shows you understand ${getConceptLabel(concept)} in context.`,
        incorrect: config.feedbackIncorrect ?? `Think about the mechanism. ${concept.coreIdea}`,
        ideaReference: concept.coreIdea,
      },
      relatedFlashcardIds: [`flashcard-${config.conceptId}`],
    });
  });

  // 2. Scenario application checks – "if X then what?" with plausible distractors
  concepts.forEach(concept => {
    concept.changeScenarios.forEach((scenario, idx) => {
      const { direction } = inferScenarioOutcome(scenario.explanation);
      const steps = scenario.explanation.split('→').map(s => s.trim());
      const lastPart = steps[steps.length - 1] ?? '';
      const isRateOutcome = /\b(rate|speed|activity|movement)\b/i.test(lastPart);
      let correctAnswer: string;
      const wrongOptions: string[] = [];
      if (direction === 'increase') {
        correctAnswer = isRateOutcome ? 'The rate increases' : lastPart;
        wrongOptions.push(isRateOutcome ? 'The rate decreases' : 'The opposite effect occurs', 'No change', 'It depends on other factors');
      } else if (direction === 'decrease') {
        correctAnswer = isRateOutcome ? 'The rate decreases' : lastPart;
        wrongOptions.push(isRateOutcome ? 'The rate increases' : 'The opposite effect occurs', 'No change', 'It depends on other factors');
      } else {
        correctAnswer = lastPart;
        wrongOptions.push('The opposite effect occurs', 'No change', 'The mechanism is different');
      }
      const plausibleWrong = wrongOptions.filter(w => w !== correctAnswer && w.length > 0).slice(0, 2);
      const allOptions = [correctAnswer, ...plausibleWrong];
      if (allOptions.length < 2) return;
      const options = [...allOptions].sort(() => Math.random() - 0.5);
      quickChecks.push({
        id: `quickcheck-scenario-${concept.id}-${idx}`,
        subject,
        paper,
        tier,
        topic: concept.topic,
        type: 'multipleChoice',
        question: `${scenario.prompt} What is the correct outcome?`,
        options,
        correctAnswer,
        feedback: {
          correct: `Correct! ${scenario.explanation}`,
          incorrect: `The full chain is: ${scenario.explanation}`,
          ideaReference: scenario.explanation,
        },
        relatedFlashcardIds: [`flashcard-${concept.id}-scenario-${idx}`],
      });
    });
  });

  // 3. Misconception checks – application style: "A student says X. What would you tell them?"
  misconceptions.forEach(misconception => {
    const misconceptionQuote = misconception.misconception.length > 100
      ? misconception.misconception.slice(0, 97) + '…'
      : misconception.misconception;
    const question = `A student says: "${misconceptionQuote}" What is the best correction?`;
    const sameTopic = misconceptions.filter(m => m.topic === misconception.topic && m.id !== misconception.id);
    const distractors = [
      misconception.misconception,
      ...sameTopic.slice(0, 2).map(m => m.correctUnderstanding),
    ].filter((v, i, a) => a.indexOf(v) === i && v !== misconception.correctUnderstanding);
    const options = [misconception.correctUnderstanding, ...distractors.slice(0, 2)].sort(() => Math.random() - 0.5);
    quickChecks.push({
      id: `quickcheck-misconception-${misconception.id}`,
      subject,
      paper,
      tier,
      topic: misconception.topic,
      type: 'multipleChoice',
      question,
      options,
      correctAnswer: misconception.correctUnderstanding,
      feedback: {
        correct: `Correct! ${misconception.correctUnderstanding}`,
        incorrect: `Consider: ${misconception.whyWrong} The correct idea: ${misconception.correctUnderstanding}`,
        ideaReference: misconception.correctUnderstanding,
      },
      relatedFlashcardIds: [`flashcard-misconception-${misconception.id}`],
    });
  });

  // 4. Process chain checks (drag order) – for ALL scenarios with 3+ steps
  concepts.forEach(concept => {
    concept.changeScenarios.forEach((scenario, idx) => {
      const steps = scenario.explanation.split('→').map(s => s.trim()).filter(Boolean);
      if (steps.length >= 3) {
        quickChecks.push({
          id: `quickcheck-process-${concept.id}-${idx}`,
          subject,
          paper,
          tier,
          topic: concept.topic,
          type: 'dragOrder',
          question: `Put the mechanism in the correct order: ${scenario.prompt}`,
          options: [...steps].sort(() => Math.random() - 0.5),
          correctAnswer: steps,
          feedback: {
            correct: 'Correct! You understand the causal chain.',
            incorrect: `The steps follow a cause-and-effect order. The correct sequence is: ${steps.join(' → ')}`,
            ideaReference: scenario.explanation,
          },
          relatedFlashcardIds: [`flashcard-${concept.id}`, `flashcard-${concept.id}-scenario-${idx}`],
        });
      }
    });
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

/**
 * Get Quick Checks related to a flashcard (by relatedFlashcardIds).
 * If none, returns topic-level Quick Checks for that flashcard's topic as fallback.
 */
export function getQuickChecksForFlashcard(
  flashcardId: string,
  flashcardTopic: string,
  quickChecks: ScienceQuickCheck[],
  useTopicFallback = true
): ScienceQuickCheck[] {
  const direct = quickChecks.filter(
    q => q.relatedFlashcardIds?.includes(flashcardId)
  );
  if (direct.length > 0) return direct.slice(0, 2); // Max 2 per card
  if (useTopicFallback) {
    const topicFallback = quickChecks.filter(q => q.topic === flashcardTopic);
    return topicFallback.slice(0, 1); // 1 fallback
  }
  return [];
}

/**
 * Get a shuffled batch of Quick Checks for a topic (e.g. after all flashcards for that topic).
 * Excludes already-answered IDs and returns up to max items.
 */
export function getQuickChecksForTopicBatch(
  quickChecks: ScienceQuickCheck[],
  topic: string,
  options?: { excludeIds?: Set<string>; max?: number }
): ScienceQuickCheck[] {
  const { excludeIds, max = 5 } = options ?? {};
  const filtered = quickChecks.filter(
    (q) => q.topic === topic && !excludeIds?.has(q.id)
  );
  return shuffle(filtered).slice(0, max);
}

/** Shuffle array (Fisher-Yates). Returns new array. */
function shuffleArray<T>(arr: T[], seed?: number): T[] {
  const out = [...arr];
  const rng = seed !== undefined ? seededRandom(seed) : Math.random;
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export type SessionOptions = {
  shuffle?: boolean;
  /** Max flashcard steps in session. Omit = full deck (or use time limit). */
  sessionLimit?: number;
  /** Time limit in minutes (5 or 10). When set, session ends when time runs out. */
  sessionLimitMinutes?: number;
  /** If true, order flashcards by spaced repetition: due first, then new, then later. Pass mastery from storage. */
  useSpacedRepetition?: boolean;
  /** If true (and no topic filter), interleave cards across all topics instead of topic-by-topic. */
  interleaveTopics?: boolean;
  /** If true, concept/equation cards show "Show answer" button instead of tap-to-reveal (type-to-reveal style). */
  typeToReveal?: boolean;
  /** Flashcard mastery data (from storage.getFlashcardMastery). Required when useSpacedRepetition is true. */
  mastery?: Record<string, { nextReviewDate?: string }>;
};

/**
 * Group flashcards by topic for Learn Mode flow.
 * Returns ordered groups; when topicFilter is set, only that topic's group is returned.
 * With options: can shuffle, limit session length, and apply spaced-repetition ordering.
 */
export function getFlashcardsGroupedByTopic(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier,
  topicFilter?: string,
  options?: SessionOptions
): Array<{ topic: string; flashcards: ScienceFlashcard[] }> {
  const all = getFlashcardsByFilters(subject, paper, tier);
  const byTopic = new Map<string, ScienceFlashcard[]>();
  all.forEach((f) => {
    const list = byTopic.get(f.topic) ?? [];
    list.push(f);
    byTopic.set(f.topic, list);
  });
  let topics = Array.from(byTopic.keys()).sort();
  if (topicFilter) topics = topics.filter(t => t === topicFilter);

  const { shuffle = false, sessionLimit, useSpacedRepetition = false, mastery, interleaveTopics = false } = options ?? {};
  const today = new Date().toISOString().slice(0, 10);
  const seed = Date.now() % 10000;

  const orderFlashcards = (cards: ScienceFlashcard[]): ScienceFlashcard[] => {
    if (!mastery && !shuffle) return cards;
    if (useSpacedRepetition && mastery) {
      const due: ScienceFlashcard[] = [];
      const newCards: ScienceFlashcard[] = [];
      const later: ScienceFlashcard[] = [];
      cards.forEach((f) => {
        const m = mastery[f.id];
        if (!m?.nextReviewDate) newCards.push(f);
        else if (m.nextReviewDate.slice(0, 10) <= today) due.push(f);
        else later.push(f);
      });
      const ordered = [...due, ...newCards, ...later];
      return shuffle ? shuffleArray(ordered, seed) : ordered;
    }
    return shuffle ? shuffleArray(cards, seed) : cards;
  };

  let result: Array<{ topic: string; flashcards: ScienceFlashcard[] }>;

  if (interleaveTopics && !topicFilter && topics.length > 1) {
    const allCards: ScienceFlashcard[] = [];
    topics.forEach((topic) => {
      allCards.push(...(byTopic.get(topic) ?? []));
    });
    const ordered = orderFlashcards(allCards);
    const topicsWithCards = new Set(ordered.map((f) => f.topic));
    const biggerTestGroups: Array<{ topic: string; flashcards: ScienceFlashcard[] }> = [];
    Array.from(topicsWithCards).sort().forEach((topic) => {
      const biggerQuestions = getBiggerTestQuestionsForTopic(subject, paper, tier, topic, 2);
      if (biggerQuestions.length > 0) {
        biggerTestGroups.push({ topic, flashcards: [] });
      }
    });
    result = [{ topic: '_interleaved', flashcards: ordered }, ...biggerTestGroups];
  } else {
    result = topics.map((topic) => ({
      topic,
      flashcards: orderFlashcards(byTopic.get(topic) ?? []),
    }));
  }

  if (sessionLimit && sessionLimit > 0) {
    let count = 0;
    const out: Array<{ topic: string; flashcards: ScienceFlashcard[] }> = [];
    for (const g of result) {
      const cards = g.flashcards;
      if (cards.length === 0) {
        out.push(g);
        continue;
      }
      if (count >= sessionLimit) continue;
      const take = Math.min(cards.length, sessionLimit - count);
      if (take > 0) {
        out.push({ topic: g.topic, flashcards: cards.slice(0, take) });
        count += take;
      }
    }
    result = out;
  }

  return result;
}

/**
 * Get count of flashcards due for review today (nextReviewDate <= today or never seen).
 */
export function getDueFlashcardCount(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier,
  topicFilter?: string,
  mastery?: Record<string, { nextReviewDate?: string }>
): number {
  const all = getFlashcardsByFilters(subject, paper, tier);
  const filtered = topicFilter ? all.filter(f => f.topic === topicFilter) : all;
  const today = new Date().toISOString().slice(0, 10);
  return filtered.filter((f) => {
    const m = mastery?.[f.id];
    if (!m) return true;
    return !m.nextReviewDate || m.nextReviewDate.slice(0, 10) <= today;
  }).length;
}

/**
 * Days until next review for a given confidence level (for "See again in X days").
 */
export function getDaysUntilNextReview(level: 1 | 2 | 3): number {
  return level === 3 ? 7 : level === 2 ? 3 : 1;
}

/**
 * Get 3–6 mark questions for a topic (for bigger test phase).
 */
export function getBiggerTestQuestionsForTopic(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier,
  topic: string,
  count = 2
): ScienceQuestion[] {
  const questions = getQuestionsByFilters(subject, paper, tier, topic);
  const extended = questions.filter((q) => q.marks >= 3 && q.marks <= 6);
  return extended.slice(0, count);
}

/**
 * Get topics that have content (questions or quick checks) for the given subject, paper, and tier.
 * Use this instead of getTopicsBySubject when the topic list should reflect the selected paper and tier.
 */
export function getTopicsByPaperAndTier(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): string[] {
  const questions = getQuestionsByFilters(subject, paper, tier);
  const quickChecks = getQuickChecksByFilters(subject, paper, tier);
  const fromQuestions = new Set(questions.map((q) => q.topic));
  const fromQuickChecks = new Set(quickChecks.map((q) => q.topic));
  const combined = new Set([...fromQuestions, ...fromQuickChecks]);
  return Array.from(combined).sort();
}

/** Shuffle array (Fisher-Yates). Uses shuffleArray with no seed for randomness. */
function shuffle<T>(arr: T[]): T[] {
  return shuffleArray(arr);
}

/**
 * Get combined topic test items in exam structure: Section A (1-2 mark) → B (3 mark) → C (4-6 mark)
 * Quick Checks count as 1 mark; max 30% of items from Quick Checks so the test really challenges knowledge.
 * All extended (4-6 mark) questions are included when available.
 */
export function getTopicTestItems(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier,
  topic: string
): TopicTestItem[] {
  const allQuickChecks = getQuickChecksByFilters(subject, paper, tier, topic);
  const allQuestions = getQuestionsByFilters(subject, paper, tier, topic);

  const sectionAQuestions = allQuestions.filter((q) => q.marks >= 1 && q.marks <= 2);
  const sectionBQuestions = allQuestions.filter((q) => q.marks === 3);
  const sectionCQuestions = allQuestions.filter((q) => q.marks >= 4 && q.marks <= 6);

  const questionCount = sectionAQuestions.length + sectionBQuestions.length + sectionCQuestions.length;
  const maxQuickChecks = questionCount > 0
    ? Math.min(allQuickChecks.length, Math.min(4, Math.floor((3 / 7) * questionCount)) || 0)
    : allQuickChecks.length;
  const quickChecks = shuffle(allQuickChecks).slice(0, Math.max(0, maxQuickChecks));

  const sectionA: TopicTestItem[] = [
    ...quickChecks.map((q): TopicTestItem => ({ type: 'quickCheck', data: q })),
    ...shuffle(sectionAQuestions).map((q): TopicTestItem => ({ type: 'question', data: q })),
  ];
  const sectionB: TopicTestItem[] = shuffle(sectionBQuestions).map((q): TopicTestItem => ({ type: 'question', data: q }));
  const sectionC: TopicTestItem[] = shuffle(sectionCQuestions).map((q): TopicTestItem => ({ type: 'question', data: q }));

  return [...sectionA, ...sectionB, ...sectionC];
}

/**
 * Get full GCSE paper test items: all topics for the given paper, in exam structure.
 * Section A (1–2 mark + Quick Checks) → Section B (3 mark) → Section C (4–6 mark).
 * Same logic as getTopicTestItems but scoped to entire paper (no topic filter).
 */
export function getFullGcsePaperTestItems(
  subject: ScienceSubject,
  paper: SciencePaper,
  tier: ScienceTier
): TopicTestItem[] {
  const allQuickChecks = getQuickChecksByFilters(subject, paper, tier, undefined);
  const allQuestions = getQuestionsByFilters(subject, paper, tier, undefined);

  const sectionAQuestions = allQuestions.filter((q) => q.marks >= 1 && q.marks <= 2);
  const sectionBQuestions = allQuestions.filter((q) => q.marks === 3);
  const sectionCQuestions = allQuestions.filter((q) => q.marks >= 4 && q.marks <= 6);

  const questionCount = sectionAQuestions.length + sectionBQuestions.length + sectionCQuestions.length;
  const maxQuickChecks = questionCount > 0 ? Math.min(allQuickChecks.length, Math.floor((2 / 3) * questionCount)) : allQuickChecks.length;
  const quickChecks = shuffle(allQuickChecks).slice(0, Math.max(0, maxQuickChecks));

  const sectionA: TopicTestItem[] = [
    ...quickChecks.map((q): TopicTestItem => ({ type: 'quickCheck', data: q })),
    ...shuffle(sectionAQuestions).map((q): TopicTestItem => ({ type: 'question', data: q })),
  ];
  const sectionB: TopicTestItem[] = shuffle(sectionBQuestions).map((q): TopicTestItem => ({ type: 'question', data: q }));
  const sectionC: TopicTestItem[] = shuffle(sectionCQuestions).map((q): TopicTestItem => ({ type: 'question', data: q }));

  return [...sectionA, ...sectionB, ...sectionC];
}

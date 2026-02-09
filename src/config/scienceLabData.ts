/**
 * Science Lab – data structures for Biology, Chemistry, Physics (GCSE)
 * Sample data following the Golden Prompt structure
 */

import type {
  ScienceSubject,
  ScienceConcept,
  ScienceQuestion,
  SciencePractical,
  ScienceEquation,
  ScienceMisconception,
  QuestionType,
  SciencePaper,
  ScienceTier,
} from '../types/scienceLab';

// ============================================================================
// BIOLOGY CONCEPTS - Paper 1 & Paper 2 (AQA GCSE)
// ============================================================================

export const SCIENCE_CONCEPTS: ScienceConcept[] = [
  // ========== PAPER 1: CELL BIOLOGY ==========
  {
    id: 'bio-diffusion',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Diffusion is the net movement of particles from an area of high concentration to low concentration down a concentration gradient, due to random particle movement.',
    visualModel: {
      type: 'cell',
      description: 'Particle diagram showing high concentration → random movement → net movement → equilibrium',
      diagramId: 'cell_membrane_diffusion',
    },
    commonMisconception: 'Particles want to spread out or choose to move.',
    changeScenarios: [
      {
        prompt: 'What happens to diffusion rate if temperature increases?',
        explanation: 'Particles gain kinetic energy → move faster → more collisions per second → faster net movement → increased diffusion rate',
      },
      {
        prompt: 'What happens to diffusion rate if surface area increases?',
        explanation: 'More area for particles to cross → more particles can diffuse simultaneously → faster overall rate',
      },
      {
        prompt: 'What happens to diffusion rate if membrane thickness increases?',
        explanation: 'Longer distance to travel → particles take longer to cross → slower diffusion rate',
      },
    ],
  },
  {
    id: 'bio-osmosis',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Osmosis is the net movement of water molecules from a dilute solution (high water concentration) to a concentrated solution (low water concentration) through a partially permeable membrane.',
    visualModel: {
      type: 'cell',
      description: 'Water molecules moving through membrane: dilute solution → concentrated solution until equilibrium',
      diagramId: 'osmosis_diagram',
    },
    commonMisconception: 'Water moves to where there is less water (confusing water concentration with solute concentration).',
    changeScenarios: [
      {
        prompt: 'What happens to a plant cell in pure water?',
        explanation: 'Pure water has higher water concentration than cell cytoplasm → water enters by osmosis → cell swells → becomes turgid',
      },
      {
        prompt: 'What happens to a plant cell in concentrated salt solution?',
        explanation: 'Salt solution has lower water concentration than cytoplasm → water leaves by osmosis → cell shrinks → becomes plasmolysed',
      },
    ],
  },
  {
    id: 'bio-active-transport',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Active transport moves substances from low to high concentration against the concentration gradient, requiring energy from respiration.',
    visualModel: {
      type: 'cell',
      description: 'Carrier proteins using ATP to pump molecules against concentration gradient',
      diagramId: 'active_transport',
    },
    commonMisconception: 'Active transport is just faster diffusion.',
    changeScenarios: [
      {
        prompt: 'What happens if respiration is inhibited?',
        explanation: 'No ATP produced → carrier proteins cannot function → active transport stops → substances accumulate where concentration is already high',
      },
    ],
  },
  {
    id: 'bio-cell-division',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Mitosis produces genetically identical cells for growth and repair. Meiosis produces genetically different gametes with half the chromosome number.',
    visualModel: {
      type: 'cell',
      description: 'Mitosis: one cell → two identical cells. Meiosis: one cell → four different gametes',
      diagramId: 'cell_division',
    },
    commonMisconception: 'Mitosis and meiosis are the same process.',
    changeScenarios: [
      {
        prompt: 'What happens if mitosis goes wrong?',
        explanation: 'Mutations in DNA → daughter cells have different genetic material → can lead to cancer or developmental issues',
      },
    ],
  },
  
  // ========== PAPER 1: ORGANISATION ==========
  {
    id: 'bio-enzyme-action',
    subject: 'Biology',
    topic: 'Organisation',
    coreIdea: 'Enzymes are biological catalysts that speed up reactions by lowering activation energy. They have an active site that binds to specific substrates.',
    visualModel: {
      type: 'diagram',
      description: 'Lock-and-key model: substrate fits active site → enzyme-substrate complex → products released → enzyme unchanged',
      diagramId: 'enzyme_action',
    },
    commonMisconception: 'Enzymes are used up in reactions or make reactions happen that wouldn\'t otherwise.',
    changeScenarios: [
      {
        prompt: 'What happens to enzyme activity if temperature increases above optimum?',
        explanation: 'High temperature → bonds break → active site changes shape → substrate no longer fits → enzyme denatured → activity decreases',
      },
      {
        prompt: 'What happens to enzyme activity if pH changes?',
        explanation: 'pH affects hydrogen bonds → active site shape changes → substrate binding affected → activity decreases',
      },
    ],
  },
  {
    id: 'bio-digestive-system',
    subject: 'Biology',
    topic: 'Organisation',
    coreIdea: 'The digestive system breaks down large insoluble molecules into small soluble molecules that can be absorbed into the blood.',
    visualModel: {
      type: 'flow',
      description: 'Food → mouth (mechanical) → stomach (acid + enzymes) → small intestine (enzymes + absorption) → large intestine (water absorption)',
      diagramId: 'digestive_system',
    },
    commonMisconception: 'Digestion happens in one place or food is just broken into smaller pieces.',
    changeScenarios: [
      {
        prompt: 'What happens if bile is not produced?',
        explanation: 'No bile → fats not emulsified → smaller surface area → lipase cannot access fats efficiently → fat digestion impaired',
      },
    ],
  },
  {
    id: 'bio-circulatory-system',
    subject: 'Biology',
    topic: 'Organisation',
    coreIdea: 'The circulatory system transports substances around the body. The heart pumps blood through arteries (away), capillaries (exchange), and veins (back).',
    visualModel: {
      type: 'flow',
      description: 'Heart → arteries → capillaries (exchange) → veins → heart',
      diagramId: 'circulatory_system',
    },
    commonMisconception: 'Arteries always carry oxygenated blood (ignoring pulmonary artery).',
    changeScenarios: [
      {
        prompt: 'What happens if heart rate increases?',
        explanation: 'More beats per minute → more blood pumped → more oxygen delivered to muscles → more carbon dioxide removed',
      },
    ],
  },
  
  // ========== PAPER 1: INFECTION AND RESPONSE ==========
  {
    id: 'bio-pathogens',
    subject: 'Biology',
    topic: 'Infection and Response',
    coreIdea: 'Pathogens are microorganisms that cause disease. They reproduce rapidly inside the body, producing toxins or damaging cells.',
    visualModel: {
      type: 'cell',
      description: 'Pathogen enters body → reproduces → produces toxins/damages cells → symptoms appear',
      diagramId: 'pathogen_infection',
    },
    commonMisconception: 'All microorganisms are harmful or bacteria and viruses are the same.',
    changeScenarios: [
      {
        prompt: 'What happens if a pathogen mutates?',
        explanation: 'Mutation → different surface proteins → immune system doesn\'t recognize it → can cause new disease or evade vaccines',
      },
    ],
  },
  {
    id: 'bio-immune-system',
    subject: 'Biology',
    topic: 'Infection and Response',
    coreIdea: 'The immune system produces antibodies that bind to specific antigens on pathogens, marking them for destruction by white blood cells.',
    visualModel: {
      type: 'cell',
      description: 'Pathogen detected → white blood cells produce antibodies → antibodies bind to antigens → pathogen destroyed',
      diagramId: 'immune_response',
    },
    commonMisconception: 'Antibodies kill pathogens directly or immunity is permanent.',
    changeScenarios: [
      {
        prompt: 'What happens on second exposure to the same pathogen?',
        explanation: 'Memory cells recognize pathogen → faster antibody production → higher antibody concentration → pathogen destroyed before symptoms',
      },
    ],
  },
  
  // ========== PAPER 1: BIOENERGETICS ==========
  {
    id: 'bio-photosynthesis',
    subject: 'Biology',
    topic: 'Bioenergetics',
    coreIdea: 'Photosynthesis converts light energy into chemical energy stored in glucose. Carbon dioxide + water → glucose + oxygen (in presence of light and chlorophyll).',
    visualModel: {
      type: 'flow',
      description: 'Light energy + CO₂ + H₂O → chlorophyll → glucose + O₂',
      diagramId: 'photosynthesis',
    },
    commonMisconception: 'Plants get food from soil, light is a substance, or chlorophyll makes glucose.',
    changeScenarios: [
      {
        prompt: 'What happens to photosynthesis rate if light intensity increases?',
        explanation: 'More light energy → more reactions in chloroplasts → more glucose produced → rate increases until another factor becomes limiting',
      },
      {
        prompt: 'What happens to photosynthesis rate if carbon dioxide concentration increases?',
        explanation: 'More CO₂ available → more reactions can occur → more glucose produced → rate increases until light or temperature becomes limiting',
      },
      {
        prompt: 'What happens to photosynthesis rate if temperature increases?',
        explanation: 'Higher temperature → enzymes work faster → rate increases → but above optimum, enzymes denature → rate decreases',
      },
    ],
  },
  {
    id: 'bio-respiration',
    subject: 'Biology',
    topic: 'Bioenergetics',
    coreIdea: 'Respiration releases energy from glucose for cellular processes. Aerobic respiration requires oxygen and produces more ATP than anaerobic.',
    visualModel: {
      type: 'flow',
      description: 'Glucose + oxygen → carbon dioxide + water + ATP (aerobic) OR Glucose → lactic acid + ATP (anaerobic)',
      diagramId: 'respiration',
    },
    commonMisconception: 'Respiration is breathing or only happens in lungs.',
    changeScenarios: [
      {
        prompt: 'What happens during intense exercise?',
        explanation: 'Oxygen demand exceeds supply → cells switch to anaerobic respiration → lactic acid builds up → oxygen debt created',
      },
    ],
  },
  
  // ========== PAPER 2: HOMEOSTASIS AND RESPONSE ==========
  {
    id: 'bio-homeostasis',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    coreIdea: 'Homeostasis maintains constant internal conditions. Negative feedback detects changes and triggers responses to return to set point.',
    visualModel: {
      type: 'flow',
      description: 'Stimulus → receptor → coordination centre → effector → response → return to normal',
      diagramId: 'homeostasis',
    },
    commonMisconception: 'Homeostasis keeps everything constant all the time (ignoring dynamic equilibrium).',
    changeScenarios: [
      {
        prompt: 'What happens if blood glucose rises?',
        explanation: 'Pancreas detects increase → releases insulin → liver and muscles take up glucose → blood glucose decreases → returns to normal',
      },
    ],
  },
  {
    id: 'bio-nervous-system',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    coreIdea: 'The nervous system uses electrical impulses for rapid responses. Stimulus → receptor → sensory neurone → CNS → motor neurone → effector → response.',
    visualModel: {
      type: 'flow',
      description: 'Stimulus → sensory neurone → CNS → motor neurone → effector → response',
      diagramId: 'nervous_system',
    },
    commonMisconception: 'Nerves carry messages to the brain only (ignoring reflexes).',
    changeScenarios: [
      {
        prompt: 'What happens in a reflex arc?',
        explanation: 'Stimulus detected → sensory neurone → relay neurone in spinal cord → motor neurone → effector → rapid response without brain',
      },
    ],
  },
  {
    id: 'bio-hormones',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    coreIdea: 'Hormones are chemical messengers produced by endocrine glands, transported in blood, and act on target organs with slower but longer-lasting effects than nerves.',
    visualModel: {
      type: 'flow',
      description: 'Gland produces hormone → released into blood → travels to target organ → binds to receptors → response',
      diagramId: 'hormone_action',
    },
    commonMisconception: 'Hormones and nerves work the same way or hormones are faster than nerves.',
    changeScenarios: [
      {
        prompt: 'What happens if insulin is not produced?',
        explanation: 'No insulin → glucose not taken up by cells → blood glucose stays high → diabetes symptoms appear',
      },
    ],
  },
  
  // ========== PAPER 2: INHERITANCE, VARIATION AND EVOLUTION ==========
  {
    id: 'bio-dna-genes',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    coreIdea: 'DNA contains genes that code for proteins. Genes are sections of DNA that determine characteristics. Chromosomes are long molecules of DNA.',
    visualModel: {
      type: 'cell',
      description: 'Nucleus → chromosomes → DNA → genes → proteins → characteristics',
      diagramId: 'dna_structure',
    },
    commonMisconception: 'Genes and chromosomes are the same thing or DNA is only in humans.',
    changeScenarios: [
      {
        prompt: 'What happens if a gene mutates?',
        explanation: 'DNA sequence changes → different protein produced → may change characteristic → may be harmful, beneficial, or neutral',
      },
    ],
  },
  {
    id: 'bio-inheritance',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    coreIdea: 'Offspring inherit alleles from both parents. Dominant alleles are expressed if present; recessive alleles only expressed if homozygous.',
    visualModel: {
      type: 'diagram',
      description: 'Parent genotypes → gametes → offspring genotypes → phenotypes',
      diagramId: 'genetic_inheritance',
    },
    commonMisconception: 'Dominant means common or stronger, or children always look like one parent.',
    changeScenarios: [
      {
        prompt: 'What happens if both parents are heterozygous for a recessive disorder?',
        explanation: 'Each parent has one recessive allele → 25% chance offspring is homozygous recessive → disorder expressed',
      },
    ],
  },
  {
    id: 'bio-evolution',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    coreIdea: 'Evolution occurs by natural selection: variation exists → environmental pressure → advantageous characteristics survive → reproduce → pass on alleles → population changes.',
    visualModel: {
      type: 'flow',
      description: 'Variation → selection pressure → survival of fittest → reproduction → allele frequency changes → evolution',
      diagramId: 'natural_selection',
    },
    commonMisconception: 'Evolution is organisms adapting or trying to evolve, or it happens to individuals.',
    changeScenarios: [
      {
        prompt: 'What happens if selection pressure changes?',
        explanation: 'Different characteristics become advantageous → different individuals survive → different alleles passed on → population evolves in new direction',
      },
    ],
  },
  
  // ========== PAPER 2: ECOLOGY ==========
  {
    id: 'bio-ecosystems',
    subject: 'Biology',
    topic: 'Ecology',
    coreIdea: 'Ecosystems contain communities of organisms and their environment. Energy flows through food chains; materials cycle through ecosystems.',
    visualModel: {
      type: 'foodChain',
      description: 'Producer → primary consumer → secondary consumer → decomposers (energy decreases, materials cycle)',
      diagramId: 'ecosystem',
    },
    commonMisconception: 'Energy is recycled or all energy is transferred between trophic levels.',
    changeScenarios: [
      {
        prompt: 'What happens if a top predator is removed?',
        explanation: 'Prey population increases → overgrazing → plant population decreases → ecosystem imbalance',
      },
    ],
  },
  {
    id: 'bio-carbon-cycle',
    subject: 'Biology',
    topic: 'Ecology',
    coreIdea: 'Carbon cycles through ecosystems: CO₂ in atmosphere → photosynthesis → carbon in plants → consumption → respiration/decomposition → CO₂ released.',
    visualModel: {
      type: 'flow',
      description: 'Atmosphere CO₂ → plants (photosynthesis) → animals (consumption) → respiration/decomposition → CO₂ back to atmosphere',
      diagramId: 'carbon_cycle',
    },
    commonMisconception: 'Carbon is created or destroyed, or it only moves one way.',
    changeScenarios: [
      {
        prompt: 'What happens if deforestation increases?',
        explanation: 'Fewer trees → less photosynthesis → less CO₂ removed → more CO₂ in atmosphere → enhanced greenhouse effect',
      },
    ],
  },
  
  // ========== CHEMISTRY & PHYSICS (keeping existing) ==========
  {
    id: 'bio-energy-transfer',
    subject: 'Biology',
    topic: 'Energy stores and transfers',
    coreIdea: 'Energy is transferred between stores, not created or destroyed.',
    visualModel: {
      type: 'energy',
      description: 'Sankey diagram showing energy transfer from food to movement, growth, and waste heat',
    },
    commonMisconception: 'Energy is used up or destroyed.',
    changeScenarios: [
      {
        prompt: 'What happens to rate of reaction if temperature increases?',
        explanation: 'Particles move faster → collision frequency increases → more successful collisions per second',
      },
    ],
  },
  {
    id: 'chem-rate-reaction',
    subject: 'Chemistry',
    topic: 'Rate of reaction',
    coreIdea: 'Rate depends on collision frequency and energy of collisions.',
    visualModel: {
      type: 'particle',
      description: 'Particle diagram showing faster-moving particles at higher temperature',
    },
    commonMisconception: 'More particles always means faster reaction (ignoring collision energy).',
    changeScenarios: [
      {
        prompt: 'What happens to rate if concentration doubles?',
        explanation: 'More particles per unit volume → more collisions per second → faster rate',
      },
    ],
  },
  {
    id: 'phys-energy-stores',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    coreIdea: 'Energy is stored in different forms and transferred between stores.',
    visualModel: {
      type: 'energy',
      description: 'Energy transfer diagram: kinetic → gravitational potential → kinetic',
    },
    commonMisconception: 'Energy is used up or disappears.',
    changeScenarios: [
      {
        prompt: 'What happens to kinetic energy if speed doubles?',
        explanation: 'Kinetic energy = ½mv², so doubling speed quadruples kinetic energy (v² term)',
      },
    ],
  },
];

// ============================================================================
// BIOLOGY QUESTIONS - Paper 1 & Paper 2 (AQA GCSE)
// ============================================================================

export const SCIENCE_QUESTIONS: ScienceQuestion[] = [
  // ========== PAPER 1: CELL BIOLOGY ==========
  {
    id: 'bio-diffusion-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'Explain how oxygen moves from the air into the blood in the lungs. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'saying particles choose to move',
      'confusing diffusion with osmosis',
      'not mentioning concentration gradient',
    ],
    correctAnswer: 'Oxygen moves from high concentration in air to low concentration in blood down a concentration gradient by diffusion. The alveoli have thin walls and large surface area, allowing rapid diffusion.',
    feedback: {
      correct: 'Correct. You identified the process (diffusion), the direction (high to low concentration), and the mechanism (concentration gradient).',
      incorrect: 'Remember: diffusion is the net movement of particles down a concentration gradient due to random movement. Particles do not choose to move.',
      ideaReference: 'Diffusion requires a concentration gradient and happens due to random particle movement.',
    },
  },
  {
    id: 'bio-diffusion-002',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'A student investigates how temperature affects the rate of diffusion. Explain why increasing temperature increases the rate of diffusion. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'saying particles want to move faster',
      'not linking temperature to kinetic energy',
      'missing the link to collision frequency',
    ],
    correctAnswer: 'Increasing temperature gives particles more kinetic energy, so they move faster. Faster movement means more collisions per second between particles. This increases the rate of net movement from high to low concentration, so diffusion happens faster.',
    feedback: {
      correct: 'Excellent. You linked temperature → kinetic energy → particle speed → collision frequency → diffusion rate. This shows process understanding.',
      incorrect: 'You need to explain the process chain: temperature increases kinetic energy → particles move faster → more collisions → faster net movement. Avoid saying particles "want" to move.',
      ideaReference: 'Temperature affects particle kinetic energy, which affects movement speed and collision frequency.',
    },
  },
  {
    id: 'bio-osmosis-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'A plant cell is placed in pure water. Explain what happens to the cell. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'confusing water concentration with solute concentration',
      'saying water moves to where there is less water',
    ],
    correctAnswer: 'Pure water has a higher water concentration than the cell cytoplasm. Water moves into the cell by osmosis through the partially permeable membrane. The cell swells and becomes turgid.',
    feedback: {
      correct: 'Correct. You identified osmosis, the direction of water movement, and the outcome (turgid cell).',
      incorrect: 'Remember: osmosis is about water concentration, not solute concentration. Water moves from high water concentration to low water concentration.',
      ideaReference: 'Osmosis is the net movement of water molecules from dilute to concentrated solution through a partially permeable membrane.',
    },
  },
  {
    id: 'bio-active-transport-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'Root hair cells absorb mineral ions from soil water. The concentration of mineral ions is higher in the root hair cell than in the soil. Explain how the root hair cell absorbs these ions. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'saying it is diffusion',
      'not mentioning energy requirement',
      'not explaining against concentration gradient',
    ],
    correctAnswer: 'The ions move from low concentration (soil) to high concentration (cell) against the concentration gradient. This requires active transport. Energy from respiration is used by carrier proteins to pump the ions into the cell.',
    feedback: {
      correct: 'Perfect. You identified active transport, explained it works against the gradient, and linked it to energy from respiration.',
      incorrect: 'This cannot be diffusion because diffusion only works down a concentration gradient. Active transport requires energy to move substances against the gradient.',
      ideaReference: 'Active transport moves substances against a concentration gradient using energy from respiration.',
    },
  },
  
  // ========== PAPER 1: ORGANISATION ==========
  {
    id: 'bio-enzyme-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Organisation',
    type: 'explanation',
    question: 'Explain why enzymes are described as biological catalysts. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: [
      'saying enzymes are used up',
      'confusing catalysts with reactants',
    ],
    correctAnswer: 'Enzymes speed up chemical reactions without being used up or changed themselves.',
    feedback: {
      correct: 'Correct. You identified that enzymes speed up reactions and remain unchanged.',
      incorrect: 'Remember: catalysts speed up reactions but are not used up. Enzymes remain unchanged after the reaction.',
      ideaReference: 'Catalysts speed up reactions without being used up.',
    },
  },
  {
    id: 'bio-enzyme-002',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Organisation',
    type: 'explanation',
    question: 'An enzyme works best at 37°C. Explain what happens to the enzyme if the temperature increases to 60°C. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'saying enzyme is killed',
      'not explaining shape change',
      'missing link to active site',
    ],
    correctAnswer: 'At high temperature, the bonds holding the enzyme\'s shape break. The active site changes shape and no longer fits the substrate. The enzyme is denatured and cannot catalyze the reaction.',
    feedback: {
      correct: 'Excellent. You explained the process: temperature → bonds break → shape changes → active site affected → enzyme denatured.',
      incorrect: 'You need to explain the process chain: high temperature breaks bonds → enzyme shape changes → active site no longer fits substrate → enzyme denatured. Avoid saying enzymes are "killed" - they are denatured.',
      ideaReference: 'Enzymes have a specific shape with an active site. High temperature breaks bonds, changing the shape and denaturing the enzyme.',
    },
  },
  {
    id: 'bio-digestion-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Organisation',
    type: 'explanation',
    question: 'Explain why large molecules need to be broken down during digestion. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'saying molecules are too big to eat',
      'not mentioning absorption',
      'not explaining solubility',
    ],
    correctAnswer: 'Large molecules are insoluble and cannot be absorbed into the blood. They are broken down into small soluble molecules that can pass through the wall of the small intestine into the blood.',
    feedback: {
      correct: 'Correct. You linked size to solubility and explained why small molecules can be absorbed.',
      incorrect: 'The key point is that large molecules are insoluble and cannot be absorbed. They must be broken down into small soluble molecules.',
      ideaReference: 'Digestion breaks down large insoluble molecules into small soluble molecules that can be absorbed.',
    },
  },
  
  // ========== PAPER 1: INFECTION AND RESPONSE ==========
  {
    id: 'bio-pathogen-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Infection and Response',
    type: 'explanation',
    question: 'Explain how bacteria cause disease. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'confusing bacteria with viruses',
      'saying all bacteria are harmful',
    ],
    correctAnswer: 'Bacteria reproduce rapidly inside the body. They produce toxins that damage cells and cause disease symptoms.',
    feedback: {
      correct: 'Correct. You identified reproduction and toxin production as mechanisms of disease.',
      incorrect: 'Remember: bacteria cause disease by reproducing and producing toxins, not by being "bad".',
      ideaReference: 'Pathogens cause disease by reproducing and producing toxins or damaging cells.',
    },
  },
  {
    id: 'bio-immune-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Infection and Response',
    type: 'explanation',
    question: 'Explain how vaccination provides protection against disease. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: [
      'saying vaccine contains live pathogen',
      'not explaining memory cells',
      'missing the process chain',
    ],
    correctAnswer: 'Vaccination introduces a dead or weakened pathogen or its antigens into the body. White blood cells produce antibodies against these antigens. Memory cells are formed that remember the specific antigen. On future exposure to the real pathogen, memory cells quickly produce large numbers of antibodies, destroying the pathogen before symptoms develop.',
    feedback: {
      correct: 'Excellent 6-mark answer. You explained the vaccination process, antibody production, memory cell formation, and secondary response.',
      incorrect: 'You need to explain the full process: vaccine introduces antigens → antibodies produced → memory cells formed → secondary response is faster. Make sure you mention memory cells - this is key for 6 marks.',
      ideaReference: 'Vaccination triggers antibody production and memory cell formation, providing long-term immunity.',
    },
  },
  
  // ========== PAPER 1: BIOENERGETICS ==========
  {
    id: 'bio-photosynthesis-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'Write the word equation for photosynthesis. (1 mark)',
    marks: 1,
    calculatorAllowed: false,
    commonMistakes: [
      'reversing the equation',
      'missing conditions',
    ],
    correctAnswer: 'Carbon dioxide + water → glucose + oxygen (in the presence of light and chlorophyll)',
    feedback: {
      correct: 'Correct.',
      incorrect: 'Remember: carbon dioxide and water are reactants, glucose and oxygen are products. Light and chlorophyll are needed.',
      ideaReference: 'Photosynthesis converts carbon dioxide and water into glucose and oxygen using light energy.',
    },
  },
  {
    id: 'bio-photosynthesis-002',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'A plant is kept in low light intensity. Explain why the rate of photosynthesis is low. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'saying plant cannot photosynthesize',
      'not explaining limiting factor',
      'missing process understanding',
    ],
    correctAnswer: 'Light provides energy for photosynthesis. Low light intensity means less energy available for the reactions in chloroplasts. Light is the limiting factor, so the rate of photosynthesis is limited by the amount of light energy available. Increasing light intensity would increase the rate until another factor becomes limiting.',
    feedback: {
      correct: 'Excellent. You explained light as an energy source, linked it to the rate-limiting effect, and showed understanding of limiting factors.',
      incorrect: 'You need to explain that light provides energy for photosynthesis, and low light means less energy available, making light the limiting factor.',
      ideaReference: 'Light provides energy for photosynthesis. When light is limiting, increasing it increases the rate until another factor limits it.',
    },
  },
  {
    id: 'bio-respiration-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'Explain why cells need to respire. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: [
      'confusing respiration with breathing',
      'saying cells need oxygen',
    ],
    correctAnswer: 'Respiration releases energy from glucose. This energy is needed for cellular processes like growth and movement.',
    feedback: {
      correct: 'Correct. You identified that respiration releases energy for cellular processes.',
      incorrect: 'Remember: respiration releases energy from glucose. This energy is used for cellular processes.',
      ideaReference: 'Respiration releases energy from glucose for cellular processes.',
    },
  },
  
  // ========== PAPER 2: HOMEOSTASIS AND RESPONSE ==========
  {
    id: 'bio-homeostasis-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'What is homeostasis? (1 mark)',
    marks: 1,
    calculatorAllowed: false,
    commonMistakes: [
      'saying keeping everything the same',
    ],
    correctAnswer: 'The maintenance of constant internal conditions.',
    feedback: {
      correct: 'Correct.',
      incorrect: 'Homeostasis maintains constant internal conditions, not external conditions.',
      ideaReference: 'Homeostasis maintains constant internal conditions.',
    },
  },
  {
    id: 'bio-blood-glucose-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'After eating a meal, blood glucose concentration increases. Explain how the body responds to return blood glucose to normal. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: [
      'not explaining the process chain',
      'missing negative feedback',
      'not mentioning target organs',
    ],
    correctAnswer: 'The pancreas detects the increase in blood glucose concentration. It releases the hormone insulin into the blood. Insulin travels to target organs (liver and muscles). Insulin causes the liver and muscles to take up glucose from the blood and store it as glycogen. Blood glucose concentration decreases and returns to normal. This is negative feedback.',
    feedback: {
      correct: 'Perfect 6-mark answer. You explained detection, hormone release, target organs, response, and negative feedback.',
      incorrect: 'You need to explain the full process: pancreas detects change → releases insulin → insulin travels to target organs → glucose taken up and stored → concentration returns to normal. Mention negative feedback for full marks.',
      ideaReference: 'Blood glucose is controlled by negative feedback involving insulin and glucagon.',
    },
  },
  {
    id: 'bio-nervous-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'Describe the pathway of a nervous response. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'missing steps in the pathway',
      'confusing with hormonal response',
    ],
    correctAnswer: 'Stimulus detected by receptor → sensory neurone carries impulse → central nervous system (CNS) → motor neurone carries impulse → effector responds.',
    feedback: {
      correct: 'Correct. You identified all the key components of the nervous pathway.',
      incorrect: 'Remember the pathway: stimulus → receptor → sensory neurone → CNS → motor neurone → effector → response.',
      ideaReference: 'Nervous responses use electrical impulses through neurones.',
    },
  },
  
  // ========== PAPER 2: INHERITANCE, VARIATION AND EVOLUTION ==========
  {
    id: 'bio-dna-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'What is a gene? (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: [
      'confusing gene with chromosome',
      'saying gene is DNA',
    ],
    correctAnswer: 'A gene is a section of DNA that codes for a specific protein, which determines a characteristic.',
    feedback: {
      correct: 'Correct. You identified that a gene is a section of DNA that codes for a protein.',
      incorrect: 'A gene is a section of DNA, not all DNA. It codes for a specific protein.',
      ideaReference: 'Genes are sections of DNA that code for proteins.',
    },
  },
  {
    id: 'bio-inheritance-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'In pea plants, the allele for purple flowers (P) is dominant to the allele for white flowers (p). A plant with genotype Pp is crossed with a plant with genotype pp. Explain the possible genotypes and phenotypes of the offspring. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'not showing genetic cross',
      'confusing genotype with phenotype',
    ],
    correctAnswer: 'Parent genotypes: Pp × pp. Gametes: P or p from first parent, p from second parent. Offspring genotypes: Pp or pp (50% each). Phenotypes: 50% purple flowers (Pp), 50% white flowers (pp).',
    feedback: {
      correct: 'Excellent. You showed the genetic cross, identified gametes, genotypes, and phenotypes correctly.',
      incorrect: 'You need to show: parent genotypes → gametes → offspring genotypes → phenotypes. Remember Pp shows purple (dominant), pp shows white (recessive).',
      ideaReference: 'Offspring inherit one allele from each parent. Dominant alleles are expressed if present.',
    },
  },
  {
    id: 'bio-evolution-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'Explain how natural selection leads to evolution. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: [
      'saying organisms adapt',
      'saying evolution happens to individuals',
      'missing the process chain',
    ],
    correctAnswer: 'Within a population, there is variation due to different alleles. Environmental conditions create selection pressure. Individuals with advantageous characteristics are more likely to survive and reproduce. These individuals pass on their advantageous alleles to offspring. Over many generations, the frequency of advantageous alleles increases in the population. The population evolves.',
    feedback: {
      correct: 'Perfect 6-mark answer. You explained variation, selection pressure, survival, reproduction, inheritance, and population change.',
      incorrect: 'You need to explain the full process: variation exists → selection pressure → survival of fittest → reproduction → alleles passed on → population changes. Remember: evolution happens to populations, not individuals.',
      ideaReference: 'Natural selection acts on variation within populations, leading to evolution over generations.',
    },
  },
  
  // ========== PAPER 2: ECOLOGY ==========
  {
    id: 'bio-food-chain-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Explain why there are usually fewer organisms at the top of a food chain. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'saying top predators are bigger',
      'not explaining energy transfer',
    ],
    correctAnswer: 'Energy is lost at each trophic level through respiration, movement, and waste. Less energy is available to the next level, so fewer organisms can be supported at higher levels.',
    feedback: {
      correct: 'Correct. You explained energy loss and linked it to fewer organisms.',
      incorrect: 'The key point is energy loss. Energy is lost at each level, so less is available for the next level.',
      ideaReference: 'Energy is lost at each trophic level, limiting the number of organisms at higher levels.',
    },
  },
  {
    id: 'bio-carbon-cycle-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Explain how carbon moves from the atmosphere into living organisms and back again. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: [
      'missing steps in the cycle',
      'not explaining processes',
    ],
    correctAnswer: 'Carbon dioxide in the atmosphere is taken in by plants during photosynthesis. Carbon becomes part of plant biomass. Animals eat plants, taking in carbon. Carbon moves through food chains. Respiration by plants and animals releases carbon dioxide back to the atmosphere. Decomposition of dead organisms also releases carbon dioxide.',
    feedback: {
      correct: 'Excellent 6-mark answer. You explained photosynthesis, consumption, food chains, respiration, and decomposition.',
      incorrect: 'You need to explain: photosynthesis removes CO₂ → carbon in plants → consumption → food chains → respiration releases CO₂ → decomposition releases CO₂. Make sure you mention all the key processes.',
      ideaReference: 'Carbon cycles through ecosystems via photosynthesis, consumption, respiration, and decomposition.',
    },
  },
  
  // ========== PHYSICS (keeping existing) ==========
  {
    id: 'phys-energy-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Energy stores and transfers',
    type: 'calculation',
    question: 'Calculate the kinetic energy of a 2 kg object moving at 5 m/s.',
    marks: 4,
    calculatorAllowed: true,
    equations: ['E_k = ½mv²'],
    commonMistakes: ['wrong unit', 'forgot squared term', 'confused energy with power'],
    correctAnswer: '25 J',
    feedback: {
      correct: 'Correct. You used E_k = ½mv² = ½ × 2 × 5² = 25 J.',
      incorrect: 'You used power instead of energy. Power is the rate of transfer, not the total amount.',
      ideaReference: 'Kinetic energy depends on mass and the square of velocity.',
    },
  },
];

// ============================================================================
// BIOLOGY PRACTICALS - Required Practicals (AQA GCSE)
// ============================================================================

export const SCIENCE_PRACTICALS: SciencePractical[] = [
  // ========== PAPER 1 PRACTICALS ==========
  {
    id: 'bio-microscopy',
    subject: 'Biology',
    title: 'Use of microscopes to observe cells',
    purpose: 'To observe and draw plant and animal cells using a light microscope, and calculate magnification.',
    independentVariable: 'Type of cell (plant or animal)',
    dependentVariable: 'Cell structures observed',
    controlledVariables: ['Microscope magnification', 'Staining method', 'Slide preparation method'],
    methodSteps: [
      'Place a drop of water on a clean slide',
      'Obtain a thin layer of cells (e.g., onion epidermis)',
      'Place cells on the slide',
      'Add a drop of iodine solution to stain',
      'Lower a coverslip onto the slide at an angle to avoid air bubbles',
      'Place slide on microscope stage',
      'Start with lowest magnification objective lens',
      'Use coarse focus, then fine focus to bring cells into view',
      'Switch to higher magnification',
      'Draw and label observed structures',
    ],
    risks: [
      {
        hazard: 'Iodine solution',
        risk: 'Stains skin and clothing',
        control: 'Wear lab coat and handle carefully',
      },
      {
        hazard: 'Glass slides',
        risk: 'Cuts if broken',
        control: 'Handle carefully, dispose of broken glass safely',
      },
    ],
    dataTable: {
      headers: ['Cell type', 'Structures observed', 'Magnification'],
    },
    graphExpectations: undefined,
    evaluationQuestions: [
      {
        question: 'What limitations affect the accuracy of this practical?',
        expectedPoints: [
          'Resolution limit of light microscope - cannot see smaller structures',
          'Staining may distort cell structure',
          'Cells may be damaged during preparation',
          'Subjective judgement when drawing cells',
        ],
      },
      {
        question: 'How could you improve the reliability of your observations?',
        expectedPoints: [
          'Repeat observations with multiple slides',
          'Use different staining methods to confirm structures',
          'Compare observations with other students',
          'Use higher magnification to see more detail',
        ],
      },
    ],
  },
  {
    id: 'bio-enzyme-activity',
    subject: 'Biology',
    title: 'Investigating the effect of pH on enzyme activity',
    purpose: 'To determine the effect of pH on the rate of enzyme-catalyzed reaction using amylase and starch.',
    independentVariable: 'pH of solution',
    dependentVariable: 'Time taken for starch to be broken down (s)',
    controlledVariables: [
      'Temperature',
      'Enzyme concentration',
      'Substrate concentration',
      'Volume of solutions',
      'Same method for detecting starch (iodine test)',
    ],
    methodSteps: [
      'Set up water bath at 37°C',
      'Prepare buffer solutions at different pH values',
      'Add amylase solution to each buffer',
      'Add starch solution to each',
      'Start timer',
      'At regular intervals, remove a sample and test with iodine',
      'Stop timer when iodine test is negative (no blue-black colour)',
      'Record time taken',
      'Repeat at each pH',
      'Calculate rate (1/time)',
    ],
    risks: [
      {
        hazard: 'Iodine solution',
        risk: 'Stains skin and clothing',
        control: 'Wear lab coat and handle carefully',
      },
      {
        hazard: 'Hot water bath',
        risk: 'Burns',
        control: 'Use tongs, allow to cool before handling',
      },
    ],
    dataTable: {
      headers: ['pH', 'Time for starch breakdown (s)', 'Rate (1/time)'],
      exampleRow: ['5', '120', '0.0083'],
    },
    graphExpectations: {
      xAxis: 'pH',
      yAxis: 'Rate of reaction (1/time)',
      type: 'line',
      expectedTrend: 'Rate increases to optimum pH, then decreases (bell-shaped curve)',
    },
    evaluationQuestions: [
      {
        question: 'What makes this experiment unreliable?',
        expectedPoints: [
          'Subjective judgement of when iodine test becomes negative',
          'pH may change during the reaction',
          'Temperature may not be constant',
          'Timing errors',
        ],
      },
      {
        question: 'How could you improve the accuracy of this investigation?',
        expectedPoints: [
          'Use colorimeter to measure starch concentration objectively',
          'Use pH meter to monitor pH continuously',
          'Use water bath with thermostat to maintain constant temperature',
          'Repeat each pH multiple times and calculate mean',
        ],
      },
    ],
  },
  {
    id: 'bio-osmosis-potato',
    subject: 'Biology',
    title: 'Investigating osmosis in potato cylinders',
    purpose: 'To determine the effect of sugar solution concentration on the mass of potato tissue.',
    independentVariable: 'Concentration of sugar solution (%)',
    dependentVariable: 'Change in mass of potato cylinder (g)',
    controlledVariables: [
      'Size of potato cylinders',
      'Time left in solution',
      'Temperature',
      'Same type of potato',
      'Method of drying before weighing',
    ],
    methodSteps: [
      'Cut potato into equal-sized cylinders using a cork borer',
      'Measure initial mass of each cylinder',
      'Place each cylinder in a different concentration of sugar solution',
      'Leave for 30 minutes',
      'Remove cylinders and pat dry with paper towel',
      'Measure final mass of each cylinder',
      'Calculate change in mass',
      'Calculate percentage change in mass',
      'Repeat for each concentration',
    ],
    risks: [
      {
        hazard: 'Cork borer',
        risk: 'Cuts',
        control: 'Handle carefully, use cutting board',
      },
    ],
    dataTable: {
      headers: ['Sugar concentration (%)', 'Initial mass (g)', 'Final mass (g)', 'Change in mass (g)', 'Percentage change (%)'],
      exampleRow: ['0', '2.5', '2.7', '+0.2', '+8'],
    },
    graphExpectations: {
      xAxis: 'Sugar concentration (%)',
      yAxis: 'Percentage change in mass (%)',
      type: 'line',
      expectedTrend: 'Mass decreases as concentration increases (negative correlation), crosses zero at isotonic point',
    },
    evaluationQuestions: [
      {
        question: 'What sources of error affect the accuracy of this investigation?',
        expectedPoints: [
          'Inconsistent cylinder size',
          'Incomplete drying before weighing',
          'Different parts of potato may have different water content',
          'Time not exactly the same for all cylinders',
        ],
      },
      {
        question: 'How could you improve the reliability of this investigation?',
        expectedPoints: [
          'Use more cylinders at each concentration and calculate mean',
          'Ensure all cylinders are same length and diameter',
          'Use same method for drying all cylinders',
          'Use water bath to maintain constant temperature',
        ],
      },
    ],
  },
  
  // ========== PAPER 2 PRACTICALS ==========
  {
    id: 'bio-reaction-time',
    subject: 'Biology',
    title: 'Investigating human reaction times',
    purpose: 'To measure human reaction time and determine factors that affect it.',
    independentVariable: 'Factor being tested (e.g., caffeine, practice, age)',
    dependentVariable: 'Reaction time (s)',
    controlledVariables: [
      'Same test method',
      'Same person (if testing different factors)',
      'Same conditions (lighting, noise)',
      'Same time of day',
    ],
    methodSteps: [
      'Person A holds a ruler vertically above person B\'s hand',
      'Person B positions thumb and forefinger at zero mark',
      'Person A drops ruler without warning',
      'Person B catches ruler as quickly as possible',
      'Record distance ruler fell before being caught',
      'Convert distance to reaction time using conversion table',
      'Repeat 5 times',
      'Calculate mean reaction time',
      'Repeat with different conditions or people',
    ],
    risks: [
      {
        hazard: 'Ruler',
        risk: 'Minor injury if dropped on foot',
        control: 'Handle carefully, work in clear space',
      },
    ],
    dataTable: {
      headers: ['Trial', 'Distance fallen (cm)', 'Reaction time (s)'],
      exampleRow: ['1', '25', '0.23'],
    },
    graphExpectations: {
      xAxis: 'Trial number',
      yAxis: 'Reaction time (s)',
      type: 'scatter',
      expectedTrend: 'Reaction time may decrease with practice (improvement)',
    },
    evaluationQuestions: [
      {
        question: 'What makes this experiment unreliable?',
        expectedPoints: [
          'Subjective - person may anticipate the drop',
          'Human error in measuring distance',
          'Variation in attention levels',
          'Conversion from distance to time may introduce error',
        ],
      },
      {
        question: 'How could you improve this investigation?',
        expectedPoints: [
          'Use computer-based reaction time test for more accuracy',
          'Increase number of repeats',
          'Use random intervals between tests to prevent anticipation',
          'Control for factors like tiredness and distractions',
        ],
      },
    ],
  },
  {
    id: 'bio-plant-responses',
    subject: 'Biology',
    title: 'Investigating the effect of light on plant growth',
    purpose: 'To determine how light direction affects the growth of seedlings (phototropism).',
    independentVariable: 'Direction of light',
    dependentVariable: 'Direction of growth (angle from vertical)',
    controlledVariables: [
      'Type of plant',
      'Age of seedlings',
      'Light intensity',
      'Temperature',
      'Water availability',
      'Time period',
    ],
    methodSteps: [
      'Plant cress seeds in identical pots with same soil',
      'Place all pots in same conditions until seedlings appear',
      'Set up different light conditions: one with light from above, one with light from side',
      'Leave for several days',
      'Measure angle of growth from vertical',
      'Record observations',
      'Repeat with multiple seedlings',
    ],
    risks: [
      {
        hazard: 'None significant',
        risk: 'Low risk practical',
        control: 'Standard lab safety',
      },
    ],
    dataTable: {
      headers: ['Light direction', 'Angle of growth (°)', 'Observations'],
      exampleRow: ['Above', '0', 'Grew straight up'],
    },
    graphExpectations: {
      xAxis: 'Light direction',
      yAxis: 'Angle of growth (°)',
      type: 'bar',
      expectedTrend: 'Seedlings grow towards light source',
    },
    evaluationQuestions: [
      {
        question: 'What factors could affect the reliability of this investigation?',
        expectedPoints: [
          'Uneven light distribution',
          'Seedlings may be at different growth stages',
          'Subjective measurement of angle',
          'Other environmental factors not controlled',
        ],
      },
      {
        question: 'How could you improve this investigation?',
        expectedPoints: [
          'Use more seedlings and calculate mean angle',
          'Use protractor for accurate angle measurement',
          'Control all other environmental factors',
          'Use time-lapse photography to track growth',
        ],
      },
    ],
  },
  {
    id: 'bio-field-investigation',
    subject: 'Biology',
    title: 'Field investigation: measuring the distribution of organisms',
    purpose: 'To investigate how the distribution of a plant species changes across an environmental gradient (e.g., from shade to sunlight).',
    independentVariable: 'Position along transect (distance from starting point)',
    dependentVariable: 'Abundance of plant species (number per quadrat)',
    controlledVariables: [
      'Size of quadrat',
      'Method of counting',
      'Time of year',
      'Weather conditions',
    ],
    methodSteps: [
      'Lay out a transect line across the area',
      'Place quadrat at regular intervals along transect',
      'Count number of target species in each quadrat',
      'Record environmental factor at each point (e.g., light intensity)',
      'Repeat with multiple transects',
      'Calculate mean abundance at each position',
      'Plot graph of abundance against environmental factor',
    ],
    risks: [
      {
        hazard: 'Outdoor hazards',
        risk: 'Uneven ground, weather',
        control: 'Wear appropriate clothing and footwear, work in pairs',
      },
    ],
    dataTable: {
      headers: ['Distance along transect (m)', 'Abundance (number)', 'Light intensity (lux)'],
      exampleRow: ['0', '5', '200'],
    },
    graphExpectations: {
      xAxis: 'Light intensity (lux)',
      yAxis: 'Abundance (number per quadrat)',
      type: 'scatter',
      expectedTrend: 'May show correlation between abundance and light intensity',
    },
    evaluationQuestions: [
      {
        question: 'What limitations affect the accuracy of this investigation?',
        expectedPoints: [
          'Quadrat placement may miss some organisms',
          'Environmental factors may vary within quadrat',
          'Other factors not measured may affect distribution',
          'Sampling may not be representative',
        ],
      },
      {
        question: 'How could you improve the reliability of this investigation?',
        expectedPoints: [
          'Use more transects and calculate mean',
          'Use larger quadrats or more quadrats',
          'Measure multiple environmental factors',
          'Repeat at different times of year',
        ],
      },
    ],
  },
  
  // ========== CHEMISTRY (keeping existing) ==========
  {
    id: 'chem-rate-temperature',
    subject: 'Chemistry',
    title: 'Investigating the effect of temperature on rate of reaction',
    purpose: 'To determine how temperature affects the rate of reaction between sodium thiosulfate and hydrochloric acid.',
    independentVariable: 'Temperature (°C)',
    dependentVariable: 'Time taken for cross to disappear (s)',
    controlledVariables: ['Concentration of solutions', 'Volume of solutions', 'Same cross visibility'],
    methodSteps: [
      'Measure 50 cm³ of sodium thiosulfate solution into a conical flask',
      'Place flask on a piece of paper with a cross marked on it',
      'Add 5 cm³ of hydrochloric acid and start timer',
      'Stop timer when cross is no longer visible',
      'Repeat at different temperatures',
    ],
    risks: [
      {
        hazard: 'Hydrochloric acid',
        risk: 'Skin/eye irritation',
        control: 'Wear safety goggles and handle carefully',
      },
    ],
    dataTable: {
      headers: ['Temperature (°C)', 'Time (s)', 'Rate (1/time)'],
    },
    graphExpectations: {
      xAxis: 'Temperature (°C)',
      yAxis: 'Rate (1/time)',
      type: 'line',
      expectedTrend: 'Rate increases exponentially with temperature',
    },
    evaluationQuestions: [
      {
        question: 'What makes this experiment unreliable?',
        expectedPoints: [
          'Subjective judgement of when cross disappears',
          'Temperature may not be constant throughout',
          'Human error in timing',
        ],
      },
    ],
  },
];

// ============================================================================
// BIOLOGY EQUATIONS - Where Relevant (GCSE)
// ============================================================================

export const SCIENCE_EQUATIONS: ScienceEquation[] = [
  // ========== BIOLOGY EQUATIONS ==========
  {
    id: 'bio-magnification',
    subject: 'Biology',
    topic: 'Cell Biology',
    equation: 'Magnification = Image size ÷ Actual size',
    symbols: [
      {
        symbol: 'Magnification',
        name: 'Magnification',
        unit: 'No unit (×)',
        description: 'How many times larger the image is compared to the actual object',
      },
      {
        symbol: 'Image size',
        name: 'Image size',
        unit: 'mm or μm',
        description: 'Size of the object in the image/drawing',
      },
      {
        symbol: 'Actual size',
        name: 'Actual size',
        unit: 'mm or μm',
        description: 'Real size of the object',
      },
    ],
    unitTraps: [
      {
        wrongUnit: 'cm for small cells',
        correctUnit: 'mm or μm',
        explanation: 'Cells are very small - use mm or μm, not cm. Remember: 1 mm = 1000 μm',
      },
      {
        wrongUnit: 'Different units in calculation',
        correctUnit: 'Same units for both',
        explanation: 'Image size and actual size must be in the same units before dividing',
      },
    ],
    rearrangingPrompts: [
      {
        prompt: 'Rearrange to find actual size',
        correctRearrangement: 'Actual size = Image size ÷ Magnification',
      },
      {
        prompt: 'Rearrange to find image size',
        correctRearrangement: 'Image size = Magnification × Actual size',
      },
    ],
  },
  {
    id: 'bio-percentage-change',
    subject: 'Biology',
    topic: 'Organisation',
    equation: 'Percentage change = (Change in mass ÷ Original mass) × 100',
    symbols: [
      {
        symbol: 'Percentage change',
        name: 'Percentage change',
        unit: '%',
        description: 'The percentage increase or decrease in mass',
      },
      {
        symbol: 'Change in mass',
        name: 'Change in mass',
        unit: 'g',
        description: 'Final mass - Initial mass (can be positive or negative)',
      },
      {
        symbol: 'Original mass',
        name: 'Original mass',
        unit: 'g',
        description: 'The initial mass before the change',
      },
    ],
    unitTraps: [
      {
        wrongUnit: 'Forgetting to multiply by 100',
        correctUnit: '%',
        explanation: 'Remember to multiply by 100 to convert decimal to percentage',
      },
      {
        wrongUnit: 'Using final mass instead of change',
        correctUnit: 'g (change)',
        explanation: 'You must calculate the change (final - initial) first, not use final mass directly',
      },
    ],
    rearrangingPrompts: [
      {
        prompt: 'Rearrange to find change in mass',
        correctRearrangement: 'Change in mass = (Percentage change ÷ 100) × Original mass',
      },
    ],
  },
  {
    id: 'bio-rate-calculation',
    subject: 'Biology',
    topic: 'Organisation',
    equation: 'Rate = 1 ÷ Time',
    symbols: [
      {
        symbol: 'Rate',
        name: 'Rate of reaction',
        unit: '1/s or s⁻¹',
        description: 'How fast a reaction occurs',
      },
      {
        symbol: 'Time',
        name: 'Time',
        unit: 's (seconds)',
        description: 'Time taken for reaction to complete',
      },
    ],
    unitTraps: [
      {
        wrongUnit: 'Using time directly as rate',
        correctUnit: '1/s',
        explanation: 'Rate is the reciprocal of time. Faster reactions have shorter times, so higher rates',
      },
      {
        wrongUnit: 'Forgetting to convert units',
        correctUnit: 's',
        explanation: 'Make sure time is in seconds. If given in minutes, convert first',
      },
    ],
    rearrangingPrompts: [
      {
        prompt: 'Rearrange to find time',
        correctRearrangement: 'Time = 1 ÷ Rate',
      },
    ],
  },
  
  // ========== PHYSICS (keeping existing) ==========
  {
    id: 'phys-kinetic-energy',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    equation: 'E_k = ½mv²',
    symbols: [
      {
        symbol: 'E_k',
        name: 'Kinetic energy',
        unit: 'J (joules)',
        description: 'Energy stored in a moving object',
      },
      {
        symbol: 'm',
        name: 'Mass',
        unit: 'kg',
        description: 'Mass of the object',
      },
      {
        symbol: 'v',
        name: 'Velocity',
        unit: 'm/s',
        description: 'Speed of the object',
      },
    ],
    unitTraps: [
      {
        wrongUnit: 'J/kg',
        correctUnit: 'J',
        explanation: 'Energy is measured in joules, not joules per kilogram',
      },
    ],
    rearrangingPrompts: [
      {
        prompt: 'Rearrange to find velocity v',
        correctRearrangement: 'v = √(2E_k/m)',
      },
    ],
  },
];

// ============================================================================
// BIOLOGY MISCONCEPTIONS - Common Wrong Ideas (Grade 9 Training)
// ============================================================================

export const SCIENCE_MISCONCEPTIONS: ScienceMisconception[] = [
  // ========== CELL BIOLOGY ==========
  {
    id: 'bio-particles-want-move',
    subject: 'Biology',
    topic: 'Cell Biology',
    misconception: 'Particles want to spread out or choose to move.',
    correctUnderstanding: 'Particles move randomly due to kinetic energy. Net movement occurs because there are more particles on one side, not because particles choose to move.',
    whyWrong: 'Particles do not have intentions. Movement is random, and net movement happens due to probability - more particles on one side means more likely to move to the other side.',
    example: 'In diffusion, particles move randomly in all directions. More particles move from high concentration to low concentration simply because there are more particles there, not because they want to spread out.',
  },
  {
    id: 'bio-osmosis-water-less-water',
    subject: 'Biology',
    topic: 'Cell Biology',
    misconception: 'Water moves to where there is less water.',
    correctUnderstanding: 'Water moves from high water concentration to low water concentration. A concentrated solution has low water concentration, not less water.',
    whyWrong: 'This confuses water concentration with amount of water. Osmosis is about water concentration, not total amount.',
    example: 'In a concentrated salt solution, there is actually a lot of water, but the water concentration is low because salt molecules take up space. Water moves from pure water (high water concentration) to salt solution (low water concentration).',
  },
  {
    id: 'bio-active-transport-faster-diffusion',
    subject: 'Biology',
    topic: 'Cell Biology',
    misconception: 'Active transport is just faster diffusion.',
    correctUnderstanding: 'Active transport moves substances against the concentration gradient using energy. Diffusion moves down the gradient without energy.',
    whyWrong: 'Active transport and diffusion are fundamentally different processes. Active transport requires energy and works against the gradient.',
    example: 'Root hair cells use active transport to absorb mineral ions from soil where concentration is lower than in the cell. This cannot happen by diffusion, which only works down a gradient.',
  },
  
  // ========== ORGANISATION ==========
  {
    id: 'bio-enzymes-used-up',
    subject: 'Biology',
    topic: 'Organisation',
    misconception: 'Enzymes are used up in reactions.',
    correctUnderstanding: 'Enzymes are not used up. They remain unchanged and can catalyze many reactions.',
    whyWrong: 'Enzymes are catalysts - they speed up reactions without being changed themselves.',
    example: 'One enzyme molecule can catalyze thousands of reactions. The enzyme remains the same after each reaction.',
  },
  {
    id: 'bio-enzymes-make-reactions-happen',
    subject: 'Biology',
    topic: 'Organisation',
    misconception: 'Enzymes make reactions happen that wouldn\'t otherwise occur.',
    correctUnderstanding: 'Enzymes speed up reactions that would happen anyway, just very slowly. They lower activation energy.',
    whyWrong: 'Enzymes are catalysts - they speed up existing reactions, not create new ones.',
    example: 'Digestion of starch would happen eventually without amylase, but it would take years. Amylase speeds it up to seconds.',
  },
  
  // ========== INFECTION AND RESPONSE ==========
  {
    id: 'bio-all-bacteria-harmful',
    subject: 'Biology',
    topic: 'Infection and Response',
    misconception: 'All bacteria are harmful.',
    correctUnderstanding: 'Most bacteria are harmless or beneficial. Only some bacteria are pathogens that cause disease.',
    whyWrong: 'Many bacteria are essential for life, such as those in our gut that help digestion.',
    example: 'Bacteria in yogurt help digestion. Bacteria in soil break down dead matter. Only pathogenic bacteria cause disease.',
  },
  {
    id: 'bio-bacteria-viruses-same',
    subject: 'Biology',
    topic: 'Infection and Response',
    misconception: 'Bacteria and viruses are the same thing.',
    correctUnderstanding: 'Bacteria are living cells that can reproduce independently. Viruses are not cells and can only reproduce inside host cells.',
    whyWrong: 'Bacteria and viruses are fundamentally different - bacteria are cells, viruses are not.',
    example: 'Bacteria can be killed by antibiotics. Viruses cannot be killed by antibiotics because they are not cells.',
  },
  
  // ========== BIOENERGETICS ==========
  {
    id: 'bio-plants-food-soil',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Plants get their food from the soil.',
    correctUnderstanding: 'Plants make their own food (glucose) by photosynthesis. They get water and minerals from soil, but not food.',
    whyWrong: 'Plants are autotrophs - they make their own food using light energy, not from soil.',
    example: 'A plant in a pot makes glucose from carbon dioxide and water using light. The soil provides water and minerals, but the glucose comes from photosynthesis.',
  },
  {
    id: 'bio-light-substance',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Light is a substance that plants absorb.',
    correctUnderstanding: 'Light is energy, not a substance. Plants absorb light energy and convert it to chemical energy in glucose.',
    whyWrong: 'Light is electromagnetic radiation (energy), not matter. Plants convert light energy to chemical energy.',
    example: 'During photosynthesis, light energy is converted to chemical energy stored in glucose bonds. Light is not a material that becomes part of the plant.',
  },
  {
    id: 'bio-chlorophyll-makes-glucose',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Chlorophyll makes glucose.',
    correctUnderstanding: 'Chlorophyll absorbs light energy. The energy is used in reactions that make glucose from carbon dioxide and water.',
    whyWrong: 'Chlorophyll is a pigment that absorbs light. It does not make glucose - it enables the process.',
    example: 'Chlorophyll is like a solar panel - it captures light energy, but the energy is used by other parts of the cell to make glucose.',
  },
  {
    id: 'bio-respiration-breathing',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Respiration is breathing.',
    correctUnderstanding: 'Respiration is a chemical process in cells that releases energy from glucose. Breathing is the physical process of moving air.',
    whyWrong: 'Respiration happens in cells, not lungs. Breathing brings oxygen to cells for respiration.',
    example: 'When you breathe, you bring oxygen into your lungs. The oxygen then travels to cells where respiration happens, releasing energy.',
  },
  
  // ========== HOMEOSTASIS ==========
  {
    id: 'bio-homeostasis-constant',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    misconception: 'Homeostasis keeps everything constant all the time.',
    correctUnderstanding: 'Homeostasis maintains dynamic equilibrium - values fluctuate around a set point and are corrected when they deviate.',
    whyWrong: 'Internal conditions fluctuate constantly. Homeostasis detects changes and corrects them, maintaining balance around a set point.',
    example: 'Blood glucose rises after eating, then insulin brings it back down. It doesn\'t stay exactly the same - it fluctuates around the normal range.',
  },
  {
    id: 'bio-hormones-faster-nerves',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    misconception: 'Hormones are faster than nerves.',
    correctUnderstanding: 'Nerves use electrical impulses and are much faster than hormones, which travel in blood.',
    whyWrong: 'Electrical impulses travel much faster than blood flow. Nerves provide rapid responses; hormones provide slower, longer-lasting effects.',
    example: 'If you touch something hot, your hand pulls away instantly (nerves). Hormonal responses take seconds or minutes.',
  },
  
  // ========== INHERITANCE ==========
  {
    id: 'bio-dominant-common',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    misconception: 'Dominant means common or stronger.',
    correctUnderstanding: 'Dominant means the allele is expressed if present. It has nothing to do with how common it is or being stronger.',
    whyWrong: 'Dominance is about which allele is expressed, not frequency or strength. Recessive alleles can be more common.',
    example: 'Huntington\'s disease is caused by a dominant allele but is rare. Most people have the recessive (normal) allele.',
  },
  {
    id: 'bio-evolution-adapt',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    misconception: 'Organisms adapt or try to evolve.',
    correctUnderstanding: 'Organisms do not adapt or try to evolve. Natural selection acts on existing variation - individuals with advantageous characteristics survive and reproduce.',
    whyWrong: 'Evolution happens to populations over generations, not to individuals. Organisms do not choose to evolve.',
    example: 'A giraffe does not grow a longer neck because it wants to. Giraffes with longer necks (due to variation) survive better and pass on their genes.',
  },
  {
    id: 'bio-evolution-individuals',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    misconception: 'Evolution happens to individuals.',
    correctUnderstanding: 'Evolution happens to populations over many generations. Individuals do not evolve.',
    whyWrong: 'Evolution is a change in allele frequency in a population over time. Individuals cannot evolve.',
    example: 'A single person cannot evolve to be taller. But over many generations, a population\'s average height may change.',
  },
  
  // ========== ECOLOGY ==========
  {
    id: 'bio-energy-recycled',
    subject: 'Biology',
    topic: 'Ecology',
    misconception: 'Energy is recycled in ecosystems.',
    correctUnderstanding: 'Energy flows through ecosystems and is lost at each trophic level. Materials (like carbon) are recycled, but energy is not.',
    whyWrong: 'Energy is lost as heat and cannot be recycled. Only materials cycle.',
    example: 'When a plant is eaten, energy flows to the consumer but is lost as heat. Carbon atoms cycle back to plants, but the energy does not.',
  },
  {
    id: 'bio-all-energy-transferred',
    subject: 'Biology',
    topic: 'Ecology',
    misconception: 'All energy is transferred between trophic levels.',
    correctUnderstanding: 'Only about 10% of energy is transferred. Most is lost through respiration, movement, waste, and heat.',
    whyWrong: 'Energy is lost at each level through various processes. Only a small percentage is available to the next level.',
    example: 'A rabbit eats grass. Most energy is used for respiration and movement, lost as heat. Only about 10% becomes rabbit biomass.',
  },
  
  // ========== PHYSICS (keeping existing) ==========
  {
    id: 'energy-used-up',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    misconception: 'Energy is used up.',
    correctUnderstanding: 'Energy is transferred, not destroyed. It moves between stores.',
    whyWrong: 'The law of conservation of energy states energy cannot be created or destroyed.',
    example: 'A ball rolling stops because energy is transferred to thermal energy (friction), not because energy disappears.',
  },
];

/**
 * Get concepts by subject
 */
export function getConceptsBySubject(subject: ScienceSubject): ScienceConcept[] {
  return SCIENCE_CONCEPTS.filter(c => c.subject === subject);
}

/**
 * Get concepts by topic
 */
export function getConceptsByTopic(subject: ScienceSubject, topic: string): ScienceConcept[] {
  return SCIENCE_CONCEPTS.filter(c => c.subject === subject && c.topic === topic);
}

/**
 * Get questions by subject, paper, tier
 */
export function getQuestionsByFilters(
  subject: ScienceSubject,
  paper?: SciencePaper,
  tier?: ScienceTier,
  topic?: string
): ScienceQuestion[] {
  return SCIENCE_QUESTIONS.filter(q => {
    if (q.subject !== subject) return false;
    if (paper && q.paper !== paper) return false;
    if (tier && q.tier !== tier) return false;
    if (topic && q.topic !== topic) return false;
    return true;
  });
}

/**
 * Get practicals by subject
 */
export function getPracticalsBySubject(subject: ScienceSubject): SciencePractical[] {
  return SCIENCE_PRACTICALS.filter(p => p.subject === subject);
}

/**
 * Get equations by subject
 */
export function getEquationsBySubject(subject: ScienceSubject): ScienceEquation[] {
  return SCIENCE_EQUATIONS.filter(e => e.subject === subject);
}

/**
 * Get misconceptions by subject
 */
export function getMisconceptionsBySubject(subject: ScienceSubject): ScienceMisconception[] {
  return SCIENCE_MISCONCEPTIONS.filter(m => m.subject === subject);
}

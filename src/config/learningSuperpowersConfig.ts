/**
 * Learning Superpowers – subject-specific content for integration
 * Design Plan §25: Every subject uses superpowers to make this the greatest learning platform
 */

import type { CompareStatement } from '../components/learning/CompareContrastMatrix';
import type { MistakeItem } from '../components/learning/MistakeMuseum';
import type { WorkedStep } from '../components/learning/WorkedExampleFade';

export type SubjectId =
  | 'science'
  | 'psychology'
  | 'business'
  | 'geography'
  | 'health'
  | 'compute'
  | 'history'
  | 'religious-studies'
  | 'english'
  | 'maths'
  | 'languages';

export interface ConceptBridgeConfig {
  conceptA: string;
  conceptB: string;
  modelConnection: string;
}

export interface CompareContrastConfig {
  conceptA: string;
  conceptB: string;
  statements: CompareStatement[];
}

export interface SchemaBuilderConfig {
  title: string;
  layout: 'hierarchy' | 'flow' | 'cycle';
  centralConcept?: string;
  nodes: { id: string; label: string }[];
  slots: { id: string; label: string }[];
  correctMapping: Record<string, string>;
}

export interface MemoryPalaceConfig {
  title: string;
  items: { id: string; label: string }[];
  rooms?: { id: string; name: string; icon: string }[];
}

export interface WorkedExampleConfig {
  title: string;
  problem: string;
  steps: WorkedStep[];
}

export interface RetrievalConfig {
  prompt: string;
  hint?: string;
  content: string;
}

export interface SuperpowerContent {
  explainLike11?: { concept: string; modelExplanation: string };
  conceptBridge?: ConceptBridgeConfig;
  compareContrast?: CompareContrastConfig;
  schemaBuilder?: SchemaBuilderConfig;
  memoryPalace?: MemoryPalaceConfig;
  workedExample?: WorkedExampleConfig;
  retrieval?: RetrievalConfig;
  mistakeMuseum?: { title: string; items: MistakeItem[] };
}

// ============================================================================
// SCIENCE (Biology, Chemistry, Physics)
// ============================================================================

const SCIENCE_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'bio-diffusion': {
    explainLike11: {
      concept: 'Diffusion',
      modelExplanation:
        "Imagine dropping food colouring into water. The colour slowly spreads out until the whole glass is the same colour. That's diffusion — particles moving from where there are lots to where there are fewer, until it's even.",
    },
    conceptBridge: {
      conceptA: 'Diffusion',
      conceptB: 'Osmosis',
      modelConnection:
        'Both involve movement down a concentration gradient. Diffusion: any particles. Osmosis: water only, through a partially permeable membrane. Osmosis is a type of diffusion.',
    },
    compareContrast: {
      conceptA: 'Diffusion',
      conceptB: 'Osmosis',
      statements: [
        { id: '1', text: 'Movement of particles', correctColumn: 'same' },
        { id: '2', text: 'Down a concentration gradient', correctColumn: 'same' },
        { id: '3', text: 'Water only', correctColumn: 'conceptB' },
        { id: '4', text: 'Any particles', correctColumn: 'conceptA' },
        { id: '5', text: 'Through a partially permeable membrane', correctColumn: 'conceptB' },
      ],
    },
  },
  'bio-osmosis': {
    explainLike11: {
      concept: 'Osmosis',
      modelExplanation:
        "Imagine a raisin in water. It plumps up because water sneaks into it. That's osmosis — water moving from where there's more water to where there's less, through a special membrane. It's like diffusion but only for water.",
    },
    compareContrast: {
      conceptA: 'Diffusion',
      conceptB: 'Osmosis',
      statements: [
        { id: '1', text: 'Movement of particles', correctColumn: 'same' },
        { id: '2', text: 'Down a concentration gradient', correctColumn: 'same' },
        { id: '3', text: 'Water only', correctColumn: 'conceptB' },
        { id: '4', text: 'Any particles', correctColumn: 'conceptA' },
        { id: '5', text: 'Through a partially permeable membrane', correctColumn: 'conceptB' },
      ],
    },
  },
  'bio-cell-division': {
    explainLike11: {
      concept: 'Mitosis vs Meiosis',
      modelExplanation:
        "Mitosis is like photocopying — one cell becomes two identical copies. Used for growth and repair. Meiosis is like shuffling a deck — one cell becomes four different cells with half the chromosomes. Used to make sperm and eggs.",
    },
    schemaBuilder: {
      title: 'Cell → Organism',
      layout: 'hierarchy',
      centralConcept: 'Organisation',
      nodes: [
        { id: 'cell', label: 'Cell' },
        { id: 'tissue', label: 'Tissue' },
        { id: 'organ', label: 'Organ' },
        { id: 'system', label: 'System' },
        { id: 'organism', label: 'Organism' },
      ],
      slots: [
        { id: 'l1', label: 'Level 1 (smallest)' },
        { id: 'l2', label: 'Level 2' },
        { id: 'l3', label: 'Level 3' },
        { id: 'l4', label: 'Level 4' },
        { id: 'l5', label: 'Level 5 (largest)' },
      ],
      correctMapping: { cell: 'l1', tissue: 'l2', organ: 'l3', system: 'l4', organism: 'l5' },
    },
  },
  'bio-enzyme-action': {
    conceptBridge: {
      conceptA: 'Photosynthesis',
      conceptB: 'Respiration',
      modelConnection:
        'Both involve energy transfer: photosynthesis stores light energy as glucose; respiration releases that energy for cells. They are reverse processes in terms of inputs and outputs.',
    },
    retrieval: {
      prompt: 'What are the stages of mitosis?',
      hint: 'Think about what happens to the chromosomes.',
      content:
        'Prophase — chromosomes condense, nuclear envelope breaks down. Metaphase — chromosomes line up at equator. Anaphase — chromatids pulled to poles. Telophase — two nuclei form, cytokinesis.',
    },
  },
};

// ============================================================================
// PSYCHOLOGY
// ============================================================================

const PSYCHOLOGY_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'mem-c1': {
    explainLike11: {
      concept: 'Multi-store model',
      modelExplanation:
        "Think of your memory like a factory line. Stuff comes in (sensory), gets a quick look (short-term — about 18 seconds), and the important bits get filed away (long-term). Each stage has different rules: short-term holds about 7 things, long-term can hold loads.",
    },
    conceptBridge: {
      conceptA: 'Multi-store model',
      conceptB: 'Working memory model',
      modelConnection:
        'Both describe short-term memory. MSM: simple flow through stores. WMM: STM has parts — central executive, phonological loop, visuo-spatial sketchpad. WMM explains why we struggle with two similar tasks at once.',
    },
  },
  'mem-c2': {
    explainLike11: {
      concept: 'Working memory model',
      modelExplanation:
        "Your short-term memory isn't one box — it's like a team. The boss (central executive) decides what to focus on. One helper deals with words and sounds, another with pictures and space. That's why it's hard to do two wordy tasks at once.",
    },
  },
  'per-c1': {
    compareContrast: {
      conceptA: "Gregory's theory",
      conceptB: "Gibson's theory",
      statements: [
        { id: '1', text: 'Uses past experience', correctColumn: 'conceptA' },
        { id: '2', text: 'Perception is direct', correctColumn: 'conceptB' },
        { id: '3', text: 'Context affects interpretation', correctColumn: 'conceptA' },
        { id: '4', text: 'Picks up information from environment', correctColumn: 'conceptB' },
        { id: '5', text: 'Explains visual illusions', correctColumn: 'same' },
      ],
    },
  },
  'per-c2': {
    compareContrast: {
      conceptA: "Gregory's theory",
      conceptB: "Gibson's theory",
      statements: [
        { id: '1', text: 'Uses past experience', correctColumn: 'conceptA' },
        { id: '2', text: 'Perception is direct', correctColumn: 'conceptB' },
        { id: '3', text: 'Context affects interpretation', correctColumn: 'conceptA' },
        { id: '4', text: 'Picks up information from environment', correctColumn: 'conceptB' },
        { id: '5', text: 'Explains visual illusions', correctColumn: 'same' },
      ],
    },
  },
  'dev-c1': {
    explainLike11: {
      concept: "Piaget's stages of development",
      modelExplanation:
        "Think of it like levels in a game. Babies (0–2) learn by touching and moving. Toddlers (2–7) use words but can't yet see things from others' views. Kids (7–11) start to think logically about real things. Teens (11+) can think about abstract ideas and 'what if'.",
    },
    schemaBuilder: {
      title: "Piaget's stages",
      layout: 'flow',
      centralConcept: 'Cognitive development',
      nodes: [
        { id: 'sensorimotor', label: 'Sensorimotor (0–2)' },
        { id: 'preop', label: 'Pre-operational (2–7)' },
        { id: 'concrete', label: 'Concrete operational (7–11)' },
        { id: 'formal', label: 'Formal operational (11+)' },
      ],
      slots: [
        { id: 's1', label: 'Object permanence, senses' },
        { id: 's2', label: 'Language, egocentrism' },
        { id: 's3', label: 'Conservation, logical (concrete)' },
        { id: 's4', label: 'Abstract thought, hypotheticals' },
      ],
      correctMapping: { sensorimotor: 's1', preop: 's2', concrete: 's3', formal: 's4' },
    },
  },
  'si-c1': {
    explainLike11: {
      concept: 'Conformity and obedience',
      modelExplanation:
        "Conformity is when you go along with the group even if you disagree — like wearing the same clothes as friends. Obedience is when you follow an authority figure's orders — like a teacher or boss. Both show how others influence our behaviour.",
    },
  },
};

// ============================================================================
// BUSINESS
// ============================================================================

const BUSINESS_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'c-3.1.1-purpose': {
    explainLike11: {
      concept: 'Factors of production',
      modelExplanation:
        "To make anything, you need four things: Land (space, raw materials), Labour (workers), Capital (machines, money), and Enterprise (the person with the idea who takes the risk). Like making lemonade: you need lemons, a squeezer, yourself, and the idea to sell it.",
    },
    schemaBuilder: {
      title: 'Marketing mix',
      layout: 'hierarchy',
      centralConcept: '4 Ps',
      nodes: [
        { id: 'product', label: 'Product' },
        { id: 'price', label: 'Price' },
        { id: 'place', label: 'Place' },
        { id: 'promotion', label: 'Promotion' },
      ],
      slots: [
        { id: 'p1', label: 'What you sell' },
        { id: 'p2', label: 'What you charge' },
        { id: 'p3', label: 'Where you sell it' },
        { id: 'p4', label: 'How you tell people' },
      ],
      correctMapping: { product: 'p1', price: 'p2', place: 'p3', promotion: 'p4' },
    },
  },
  'c-3.6.2-cashflow': {
    compareContrast: {
      conceptA: 'Profit',
      conceptB: 'Cash flow',
      statements: [
        { id: '1', text: 'Can be positive but business runs out of money', correctColumn: 'conceptB' },
        { id: '2', text: 'Revenue minus costs', correctColumn: 'conceptA' },
        { id: '3', text: 'Money in minus money out', correctColumn: 'conceptB' },
        { id: '4', text: 'Includes non-cash items (depreciation)', correctColumn: 'conceptA' },
        { id: '5', text: 'Timing of payments matters', correctColumn: 'conceptB' },
      ],
    },
  },
  'c-3.6.3-breakeven': {
    workedExample: {
      title: 'Break-even calculation',
      problem: 'Fixed costs = £10,000. Variable cost per unit = £2. Selling price = £7. Calculate break-even output.',
      steps: [
        { id: 's1', content: 'Contribution per unit = Price − Variable cost = £7 − £2 = £5', given: true },
        { id: 's2', content: 'Break-even = Fixed costs ÷ Contribution = £10,000 ÷ £5 = 2,000 units', given: false, modelAnswer: '2,000 units' },
      ],
    },
  },
};

// ============================================================================
// GEOGRAPHY
// ============================================================================

const GEOGRAPHY_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'nh-1': {
    explainLike11: {
      concept: 'Natural hazard risk',
      modelExplanation:
        "Risk isn't just about how dangerous something is. It's: are you in the wrong place? Are you vulnerable (e.g. poor housing)? Can you cope? More people in a flood zone + weak buildings + no warning = high risk.",
    },
    retrieval: {
      prompt: 'What factors increase hazard risk?',
      hint: 'Think about people, buildings, and preparation.',
      content: 'Exposure (more people in hazard zone), vulnerability (weak buildings, poverty), lack of capacity to cope (no warning systems, limited resources).',
    },
  },
  'nh-2': {
    schemaBuilder: {
      title: 'Plate tectonics',
      layout: 'flow',
      centralConcept: 'Plate margins',
      nodes: [
        { id: 'constructive', label: 'Constructive (diverging)' },
        { id: 'destructive', label: 'Destructive (converging)' },
        { id: 'conservative', label: 'Conservative (sliding)' },
      ],
      slots: [
        { id: 's1', label: 'Plates move apart' },
        { id: 's2', label: 'Plates collide, one subducts' },
        { id: 's3', label: 'Plates slide past' },
      ],
      correctMapping: { constructive: 's1', destructive: 's2', conservative: 's3' },
    },
  },
  'urb-1': {
    compareContrast: {
      conceptA: 'LIC city',
      conceptB: 'HIC city',
      statements: [
        { id: '1', text: 'Rapid urbanisation', correctColumn: 'conceptA' },
        { id: '2', text: 'Informal settlements common', correctColumn: 'conceptA' },
        { id: '3', text: 'Established infrastructure', correctColumn: 'conceptB' },
        { id: '4', text: 'Suburbanisation and counter-urbanisation', correctColumn: 'conceptB' },
        { id: '5', text: 'Challenges: congestion, pollution', correctColumn: 'same' },
      ],
    },
  },
  'coast-1': {
    retrieval: {
      prompt: 'What are the main coastal processes?',
      hint: 'Think about what waves do to the coast.',
      content: 'Erosion (hydraulic action, abrasion, attrition), transport (longshore drift), deposition. Creates headlands, bays, cliffs, beaches, spits.',
    },
  },
  'nh-3': {
    explainLike11: {
      concept: 'Tropical storms',
      modelExplanation:
        "Imagine a giant spinning weather system over warm ocean water. Warm air rises, cool air rushes in, and the Earth's rotation makes it spin. The warm water fuels it like petrol. When it hits land, it loses its fuel and weakens.",
    },
  },
  'econ-1': {
    compareContrast: {
      conceptA: 'LIC (Low Income Country)',
      conceptB: 'HIC (High Income Country)',
      statements: [
        { id: '1', text: 'Low GNI per capita', correctColumn: 'conceptA' },
        { id: '2', text: 'High HDI typically', correctColumn: 'conceptB' },
        { id: '3', text: 'Rapid urbanisation', correctColumn: 'conceptA' },
        { id: '4', text: 'Established infrastructure', correctColumn: 'conceptB' },
        { id: '5', text: 'Development varies within', correctColumn: 'same' },
      ],
    },
  },
};

// ============================================================================
// HEALTH
// ============================================================================

const HEALTH_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'c-1.1-pies': {
    explainLike11: {
      concept: 'PIES across life stages',
      modelExplanation:
        "PIES stands for Physical, Intellectual, Emotional, Social. Think of a baby: they grow (physical), learn to talk (intellectual), form attachments (emotional), and interact with others (social). Every life stage has its own PIES milestones.",
    },
    compareContrast: {
      conceptA: 'Infancy',
      conceptB: 'Adolescence',
      statements: [
        { id: '1', text: 'Rapid physical growth', correctColumn: 'same' },
        { id: '2', text: 'Language development begins', correctColumn: 'conceptA' },
        { id: '3', text: 'Identity formation', correctColumn: 'conceptB' },
        { id: '4', text: 'Attachment to primary carer', correctColumn: 'conceptA' },
        { id: '5', text: 'Peer groups crucial', correctColumn: 'conceptB' },
      ],
    },
  },
  'c-2.1-hierarchy': {
    explainLike11: {
      concept: "Maslow's hierarchy of needs",
      modelExplanation:
        "Imagine a ladder. Bottom: you need food, shelter, safety. Above that: love and belonging. Then: respect and achievement. Top: becoming your best self. You can't skip steps — if you're hungry, it's hard to focus on self-improvement.",
    },
  },
  'c-2.5-care-values': {
    schemaBuilder: {
      title: 'Care values in practice',
      layout: 'hierarchy',
      centralConcept: 'Care values',
      nodes: [
        { id: 'dignity', label: 'Dignity' },
        { id: 'respect', label: 'Respect' },
        { id: 'confidentiality', label: 'Confidentiality' },
        { id: 'safeguarding', label: 'Safeguarding' },
      ],
      slots: [
        { id: 's1', label: 'Treating as valued individual' },
        { id: 's2', label: 'Valuing beliefs and choices' },
        { id: 's3', label: 'Keeping information private' },
        { id: 's4', label: 'Protecting from harm' },
      ],
      correctMapping: { dignity: 's1', respect: 's2', confidentiality: 's3', safeguarding: 's4' },
    },
  },
  'c-1.4-life-events': {
    retrieval: {
      prompt: 'What are expected vs unexpected life events?',
      hint: 'Think about what we can predict.',
      content: 'Expected: school, marriage, retirement. Unexpected: bereavement, accident, redundancy. Both affect development; unexpected often need stronger support.',
    },
  },
};

// ============================================================================
// COMPUTE LAB
// ============================================================================

const COMPUTE_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'c-3.5.1-networks': {
    schemaBuilder: {
      title: 'TCP/IP layers',
      layout: 'hierarchy',
      centralConcept: 'Network layers',
      nodes: [
        { id: 'app', label: 'HTTP, FTP, SMTP' },
        { id: 'transport', label: 'TCP, UDP' },
        { id: 'internet', label: 'IP' },
        { id: 'link', label: 'Ethernet, WiFi' },
      ],
      slots: [
        { id: 'l1', label: 'Application' },
        { id: 'l2', label: 'Transport' },
        { id: 'l3', label: 'Internet' },
        { id: 'l4', label: 'Link' },
      ],
      correctMapping: { app: 'l1', transport: 'l2', internet: 'l3', link: 'l4' },
    },
  },
  'c-3.1.3-search': {
    retrieval: {
      prompt: 'What does a linear search algorithm do?',
      hint: 'Think about how it checks each item.',
      content: 'Linear search checks each item in a list one by one until it finds the target or reaches the end. Simple but slow for large lists — O(n) time complexity.',
    },
  },
  'c-3.4.5-cpu': {
    explainLike11: {
      concept: 'CPU and fetch-execute cycle',
      modelExplanation:
        "The CPU is like the brain of the computer. It fetches an instruction from memory, decodes what to do, runs it, then repeats. It does this millions of times per second. That's the fetch-execute cycle.",
    },
  },
  'c-3.3.1-bases': {
    compareContrast: {
      conceptA: 'Binary',
      conceptB: 'Hexadecimal',
      statements: [
        { id: '1', text: 'Base 2', correctColumn: 'conceptA' },
        { id: '2', text: 'Base 16', correctColumn: 'conceptB' },
        { id: '3', text: 'Uses 0 and 1 only', correctColumn: 'conceptA' },
        { id: '4', text: 'Uses 0–9 and A–F', correctColumn: 'conceptB' },
        { id: '5', text: 'Represents same numbers', correctColumn: 'same' },
      ],
    },
  },
  'c-3.1.4-sort': {
    retrieval: {
      prompt: 'What is the difference between bubble sort and merge sort?',
      hint: 'Think about how they work and efficiency.',
      content: 'Bubble sort: compare adjacent pairs, swap if wrong order; O(n²). Merge sort: divide, sort halves, merge; O(n log n). Merge sort more efficient for large lists.',
    },
  },
};

// ============================================================================
// HISTORY
// ============================================================================

const HISTORY_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'BA-cc1': {
    explainLike11: {
      concept: 'Causes of the First World War',
      modelExplanation:
        "Think of it like a domino game. Countries had made secret deals to help each other (alliances). They were competing for land and power (imperialism). They were building huge armies (militarism). When one country got into trouble, everyone got pulled in. The assassination at Sarajevo was the spark; the powder keg was already there.",
    },
    conceptBridge: {
      conceptA: 'Long-term causes of WW1',
      conceptB: 'Short-term trigger (Sarajevo)',
      modelConnection:
        'Long-term causes (alliances, militarism, imperialism) made war likely. Sarajevo was the trigger that set it off. Both matter: without long-term causes, Sarajevo would not have led to war; without Sarajevo, war might have been delayed.',
    },
    schemaBuilder: {
      title: 'Cause and consequence',
      layout: 'flow',
      centralConcept: 'Historical causation',
      nodes: [
        { id: 'cause', label: 'Cause' },
        { id: 'event', label: 'Event' },
        { id: 'consequence', label: 'Consequence' },
      ],
      slots: [
        { id: 's1', label: 'What led to it' },
        { id: 's2', label: 'What happened' },
        { id: 's3', label: 'What followed' },
      ],
      correctMapping: { cause: 's1', event: 's2', consequence: 's3' },
    },
  },
  'AB-cc1': {
    compareContrast: {
      conceptA: 'Treaty of Versailles',
      conceptB: 'Weimar Republic stability',
      statements: [
        { id: '1', text: 'War guilt clause resented', correctColumn: 'conceptA' },
        { id: '2', text: 'Reparations caused economic strain', correctColumn: 'conceptA' },
        { id: '3', text: 'Stresemann era brought stability', correctColumn: 'conceptB' },
        { id: '4', text: 'Dawes and Young Plans', correctColumn: 'conceptB' },
        { id: '5', text: 'Political unrest', correctColumn: 'same' },
      ],
    },
  },
  'BC-cc1': {
    retrieval: {
      prompt: 'What were the main causes of the Cold War?',
      hint: 'Think about ideology, wartime alliances, and post-war tensions.',
      content:
        'Ideological differences (capitalism vs communism); wartime alliances broke down; Yalta/Potsdam disagreements; Soviet control of Eastern Europe; Truman Doctrine; Marshall Plan; Berlin Blockade.',
    },
  },
};

// ============================================================================
// RELIGIOUS STUDIES
// ============================================================================

const RS_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'isl-five-pillars': {
    memoryPalace: {
      title: '5 Pillars of Islam',
      items: [
        { id: '1', label: 'Shahada (declaration of faith)' },
        { id: '2', label: 'Salah (prayer)' },
        { id: '3', label: 'Zakat (charity)' },
        { id: '4', label: 'Sawm (fasting)' },
        { id: '5', label: 'Hajj (pilgrimage)' },
      ],
      rooms: [
        { id: 'hall', name: 'Hall', icon: '🚪' },
        { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
        { id: 'living', name: 'Living room', icon: '🛋️' },
        { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
        { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
      ],
    },
  },
  'chr-trinity': {
    explainLike11: {
      concept: 'The Trinity',
      modelExplanation:
        "Think of it like water: it can be ice, liquid, or steam — but it's still one thing (H2O). Christians believe God is one God in three persons: Father, Son, Holy Spirit. Distinct but equal, sharing the same divine nature.",
    },
    compareContrast: {
      conceptA: 'Christian belief in Trinity',
      conceptB: 'Islamic belief in Tawhid',
      statements: [
        { id: '1', text: 'One God', correctColumn: 'same' },
        { id: '2', text: 'Three persons: Father, Son, Spirit', correctColumn: 'conceptA' },
        { id: '3', text: 'God is strictly one, no partners', correctColumn: 'conceptB' },
        { id: '4', text: 'Jesus is God incarnate', correctColumn: 'conceptA' },
        { id: '5', text: 'Jesus is a prophet', correctColumn: 'conceptB' },
      ],
    },
  },
  'chr-nature-god': {
    explainLike11: {
      concept: 'The nature of God',
      modelExplanation:
        "Christians believe God is all-powerful (omnipotent), loving, and just. That raises a puzzle: if God is so good and powerful, why does suffering exist? Christians wrestle with this — it's called the problem of evil.",
    },
  },
};

// ============================================================================
// MISTAKE MUSEUM — shared across subjects
// ============================================================================

const SCIENCE_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'Plants breathe in CO₂ and breathe out O₂',
    whyStudentsThinkThis: 'We learn that plants "produce" oxygen, so it sounds like breathing.',
    whyItsWrong:
      "Respiration and photosynthesis are different. Plants do both: they release O₂ from photosynthesis (splitting water) and take in O₂ for respiration.",
    correctApproach:
      'In photosynthesis, plants take in CO₂ and water; they produce glucose and O₂. The O₂ comes from splitting water, not from "breathing out" CO₂.',
  },
];

const PSYCHOLOGY_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'STM and LTM are completely separate boxes',
    whyStudentsThinkThis: 'The multi-store model shows them as distinct stores.',
    whyItsWrong: 'The working memory model shows STM is more dynamic with multiple components. Information can be rehearsed and transferred.',
    correctApproach: 'STM has sub-components (phonological loop, visuo-spatial sketchpad). Rehearsal transfers to LTM. They interact.',
  },
];

const BUSINESS_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'Profit and cash flow are the same thing',
    whyStudentsThinkThis: 'Both seem to measure how well a business is doing.',
    whyItsWrong: 'Profit is revenue minus costs (includes non-cash items like depreciation). Cash flow is money in minus money out. A business can be profitable but run out of cash.',
    correctApproach: 'Profit = revenue − costs. Cash flow = cash in − cash out. Timing matters for cash flow; depreciation affects profit but not cash.',
  },
];

const GEOGRAPHY_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'All natural hazards are equally dangerous everywhere',
    whyStudentsThinkThis: 'An earthquake sounds dangerous regardless of where it happens.',
    whyItsWrong: 'Hazard risk depends on exposure (are people there?), vulnerability (can buildings withstand it?), and capacity to cope (warning systems, resources).',
    correctApproach: 'Risk = hazard × exposure × vulnerability ÷ capacity to cope. Same hazard, different risk in different places.',
  },
];

const HEALTH_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'PIES only applies to physical development',
    whyStudentsThinkThis: 'Physical growth is the most visible.',
    whyItsWrong: 'PIES covers Physical, Intellectual, Emotional, and Social development. All four are equally important for understanding human development.',
    correctApproach: 'PIES = Physical (growth, motor skills), Intellectual (thinking, language), Emotional (feelings, self-concept), Social (relationships). Use all four when assessing development.',
  },
];

const RS_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'Christians believe in three separate gods',
    whyStudentsThinkThis: 'The Trinity mentions Father, Son and Holy Spirit.',
    whyItsWrong: 'The Trinity is one God in three persons — distinct but equal, sharing the same divine nature. Not three gods.',
    correctApproach: 'One God, three persons: Father, Son, Holy Spirit. Distinct roles, same nature. Unity in diversity.',
  },
];

const COMPUTE_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'Binary and hexadecimal are completely different number systems',
    whyStudentsThinkThis: 'They use different digits (0–1 vs 0–9, A–F).',
    whyItsWrong: 'Both represent the same numbers — just different bases. Hex is a shorthand for binary (each hex digit = 4 bits).',
    correctApproach: 'Binary = base 2, Hex = base 16. Same values, different representation. Hex groups 4 bits per digit for readability.',
  },
];

const HISTORY_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'The Treaty of Versailles caused the Second World War',
    whyStudentsThinkThis: 'We learn that Versailles was harsh and that Hitler wanted to overturn it.',
    whyItsWrong: 'Versailles contributed to conditions (resentment, economic strain) but did not directly cause WW2. Many factors: Hitler\'s actions, appeasement, invasion of Poland.',
    correctApproach: 'Versailles created resentment and instability. It was one factor among many. Avoid oversimplifying causation.',
  },
  {
    wrongAnswer: 'Source content and provenance are the same thing',
    whyStudentsThinkThis: 'Both are about what the source says or shows.',
    whyItsWrong: 'Content = what the source says/shows. Provenance = who made it, when, why, for whom. Different types of evidence.',
    correctApproach: 'Content: the message. Provenance: origin and purpose. Use both for full analysis.',
  },
];

const ENGLISH_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'Using more sophisticated vocabulary always improves an answer',
    whyStudentsThinkThis: 'We are told to use ambitious vocabulary for higher grades.',
    whyItsWrong: 'Forced or inappropriate vocabulary can obscure meaning. Precision and fit matter more than complexity.',
    correctApproach: 'Choose words that precisely convey your meaning. Sophistication comes from clarity and control, not jargon.',
  },
  {
    wrongAnswer: 'AO2 is only about identifying techniques',
    whyStudentsThinkThis: 'We learn to spot similes, metaphors, etc.',
    whyItsWrong: 'AO2 requires analysis of how language/structure creates meaning and effect — not just labelling.',
    correctApproach: 'Identify technique, then explain what it does and why it matters. Effect and meaning are key.',
  },
];

const MATHS_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'Area and perimeter increase together when you scale a shape',
    whyStudentsThinkThis: 'Bigger shape seems to mean more of everything.',
    whyItsWrong: 'Area scales with the square of the scale factor; perimeter scales linearly. Double the sides → 4× area, 2× perimeter.',
    correctApproach: 'Perimeter ∝ scale factor. Area ∝ (scale factor)². Remember the difference.',
  },
  {
    wrongAnswer: 'A negative times a negative gives a negative',
    whyStudentsThinkThis: 'Two negatives might seem to stay negative.',
    whyItsWrong: 'Negative × negative = positive. Think: owing a debt (negative) of −5 is like having +5.',
    correctApproach: '−a × −b = +ab. Same rule for division: −a ÷ −b = +a/b.',
  },
];

const LANGUAGES_MISTAKES: MistakeItem[] = [
  {
    wrongAnswer: 'French/Spanish adjectives always come after the noun',
    whyStudentsThinkThis: 'We learn "maison blanche" (house white) early on.',
    whyItsWrong: 'Some adjectives go before (bon, mauvais, petit, grand, jeune, vieux, etc.); others after. Meaning can change (ancien = former vs old).',
    correctApproach: 'Learn BAGS (Beauty, Age, Goodness, Size) — these often go before. Others typically after.',
  },
  {
    wrongAnswer: 'Por and para mean the same in Spanish',
    whyStudentsThinkThis: 'Both translate to "for" in English.',
    whyItsWrong: 'Por = cause, means, duration, exchange. Para = purpose, destination, deadline, recipient.',
    correctApproach: 'Por = through/by/reason. Para = in order to/for (purpose)/towards. Learn the distinction.',
  },
];

// ============================================================================
// ENGLISH, MATHS, LANGUAGES — Superpower content (for future Concept Labs)
// ============================================================================

const ENGLISH_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'lang-structure': {
    compareContrast: {
      conceptA: 'Language (AO2)',
      conceptB: 'Structure (AO2)',
      statements: [
        { id: '1', text: 'Word choice, imagery, sentence forms', correctColumn: 'conceptA' },
        { id: '2', text: 'How the text is organised', correctColumn: 'conceptB' },
        { id: '3', text: 'Shift in focus or perspective', correctColumn: 'conceptB' },
        { id: '4', text: 'Metaphor, simile, alliteration', correctColumn: 'conceptA' },
        { id: '5', text: 'Both contribute to meaning and effect', correctColumn: 'same' },
      ],
    },
    retrieval: {
      prompt: 'What do AO1, AO2, AO3 and AO4 test in English Language?',
      hint: 'Think: what you understand, how it\'s written, your view, your writing.',
      content: 'AO1: Identify and interpret. AO2: Analyse language and structure. AO3: Compare writers\' ideas. AO4: Evaluate texts critically.',
    },
  },
  'writing-planning': {
    retrieval: {
      prompt: 'Before writing, what should you plan?',
      hint: 'Think about structure and content.',
      content: 'Opening hook, main points/paragraphs, evidence or examples, conclusion. For creative: character, setting, conflict, resolution.',
    },
  },
};

const MATHS_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'algebra-expand': {
    workedExample: {
      title: 'Expand double brackets',
      problem: 'Expand (x + 3)(x − 2)',
      steps: [
        { id: 's1', content: 'First: x × x = x²', given: true },
        { id: 's2', content: 'Outer: x × (−2) = −2x', given: true },
        { id: 's3', content: 'Inner: 3 × x = 3x', given: false, modelAnswer: '3x' },
        { id: 's4', content: 'Last: 3 × (−2) = −6', given: false, modelAnswer: '−6' },
        { id: 's5', content: 'Combine: x² − 2x + 3x − 6 = x² + x − 6', given: false, modelAnswer: 'x² + x − 6' },
      ],
    },
    retrieval: {
      prompt: 'What is FOIL for expanding (a + b)(c + d)?',
      hint: 'First, Outer, Inner, Last.',
      content: 'First: a×c. Outer: a×d. Inner: b×c. Last: b×d. Sum them.',
    },
  },
  'quadratics-solve': {
    retrieval: {
      prompt: 'What are the methods to solve a quadratic equation?',
      hint: 'Think about factorising, formula, completing the square.',
      content: 'Factorise (if possible), quadratic formula x = (−b ± √(b²−4ac)) / 2a, or complete the square.',
    },
  },
};

const LANGUAGES_SUPERPOWERS: Record<string, SuperpowerContent> = {
  'theme-identity': {
    memoryPalace: {
      title: 'Identity theme vocabulary',
      items: [
        { id: '1', label: 'Family members' },
        { id: '2', label: 'Personal description' },
        { id: '3', label: 'Hobbies and interests' },
        { id: '4', label: 'Daily routine' },
        { id: '5', label: 'Relationships' },
      ],
      rooms: [
        { id: 'hall', name: 'Hall', icon: '🚪' },
        { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
        { id: 'living', name: 'Living room', icon: '🛋️' },
        { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
        { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
      ],
    },
    retrieval: {
      prompt: 'What are the three main themes in GCSE French/Spanish?',
      hint: 'Think about yourself, your world, and the future.',
      content: 'Identity and culture; Local, national, international and global areas; Current and future study and employment.',
    },
  },
};

// ============================================================================
// PUBLIC API
// ============================================================================

const CONFIG: Record<SubjectId, Record<string, SuperpowerContent>> = {
  science: SCIENCE_SUPERPOWERS,
  psychology: PSYCHOLOGY_SUPERPOWERS,
  business: BUSINESS_SUPERPOWERS,
  geography: GEOGRAPHY_SUPERPOWERS,
  health: HEALTH_SUPERPOWERS,
  compute: COMPUTE_SUPERPOWERS,
  'religious-studies': RS_SUPERPOWERS,
  history: HISTORY_SUPERPOWERS,
  english: ENGLISH_SUPERPOWERS,
  maths: MATHS_SUPERPOWERS,
  languages: LANGUAGES_SUPERPOWERS,
};

export type SuperpowerType = 'explainLike11' | 'conceptBridge' | 'compareContrast' | 'schemaBuilder' | 'retrieval' | 'mistakeMuseum' | 'memoryPalace' | 'workedExample';

/** Which superpowers to show per subject (in order). Fallback when no concept-specific config. */
export const DEFAULT_SUPERPOWERS: Record<SubjectId, SuperpowerType[]> = {
  science: ['explainLike11', 'compareContrast', 'conceptBridge', 'schemaBuilder', 'retrieval', 'mistakeMuseum'],
  psychology: ['explainLike11', 'compareContrast', 'conceptBridge', 'mistakeMuseum'],
  business: ['explainLike11', 'compareContrast', 'schemaBuilder', 'workedExample', 'mistakeMuseum'],
  geography: ['explainLike11', 'compareContrast', 'retrieval', 'mistakeMuseum'],
  health: ['explainLike11', 'compareContrast', 'schemaBuilder', 'mistakeMuseum'],
  compute: ['explainLike11', 'schemaBuilder', 'retrieval', 'compareContrast', 'mistakeMuseum'],
  'religious-studies': ['memoryPalace', 'explainLike11', 'compareContrast', 'mistakeMuseum'],
  history: ['explainLike11', 'retrieval', 'conceptBridge', 'compareContrast', 'schemaBuilder', 'mistakeMuseum'],
  english: ['compareContrast', 'retrieval', 'mistakeMuseum'],
  maths: ['retrieval', 'workedExample', 'mistakeMuseum'],
  languages: ['memoryPalace', 'retrieval', 'mistakeMuseum'],
};

export function getSuperpowerContent(
  subjectId: SubjectId,
  conceptId: string,
  fallback?: { conceptTitle?: string; coreIdea?: string }
): SuperpowerContent {
  const subjectConfig = CONFIG[subjectId];
  const content = subjectConfig?.[conceptId] ?? {};
  // Merge with fallback for Explain Like I'm 11 when no specific config
  if (fallback?.conceptTitle && fallback?.coreIdea && !content.explainLike11) {
    return {
      ...content,
      explainLike11: {
        concept: fallback.conceptTitle,
        modelExplanation: fallback.coreIdea,
      },
    };
  }
  return content;
}

export function getSuperpowersForSubject(subjectId: SubjectId): string[] {
  return DEFAULT_SUPERPOWERS[subjectId] ?? ['explainLike11'];
}

export function getMistakeMuseumItems(subjectId: SubjectId, topic?: string): MistakeItem[] {
  if (subjectId === 'science') return SCIENCE_MISTAKES;
  if (subjectId === 'psychology') return PSYCHOLOGY_MISTAKES;
  if (subjectId === 'business') return BUSINESS_MISTAKES;
  if (subjectId === 'geography') return GEOGRAPHY_MISTAKES;
  if (subjectId === 'health') return HEALTH_MISTAKES;
  if (subjectId === 'religious-studies') return RS_MISTAKES;
  if (subjectId === 'compute') return COMPUTE_MISTAKES;
  if (subjectId === 'history') return HISTORY_MISTAKES;
  if (subjectId === 'english') return ENGLISH_MISTAKES;
  if (subjectId === 'maths') return MATHS_MISTAKES;
  if (subjectId === 'languages') return LANGUAGES_MISTAKES;
  return [];
}

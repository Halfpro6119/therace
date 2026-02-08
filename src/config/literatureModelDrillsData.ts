/**
 * Literature Model-derived Drills
 * Drills pulled from GuidePost model answers — Study → Drill → Write loop.
 * Source: docs/LITERATURE_MODEL_DRILL_INTEGRATION_SPEC.md
 */

import type {
  ModelDrillItem,
  ModelDrillQuoteExtraction,
  ModelDrillParagraphSkeleton,
  ModelDrillGradeUpgrade,
  ModelDrillAOMapping,
} from '../types/englishCampus';

// ---------------------------------------------------------------------------
// P-S01: Ozymandias — power
// ---------------------------------------------------------------------------

const P_S01_GRADE9_P1 =
  'In Ozymandias, Shelley presents power as arrogant, self-deceiving and ultimately insignificant when measured against time. Ozymandias\' declaration, "king of kings", reflects absolute confidence in his authority and suggests a desire to dominate both people and history. This language exposes power as performative — something proclaimed rather than earned.';

const P_S01_GRADE9_P2 =
  'However, Shelley systematically dismantles this illusion. The statue\'s "shattered visage" and the description of a "colossal wreck" undermine the ruler\'s claims, revealing the emptiness behind his authority. Structurally, the framed narrative distances the reader from Ozymandias, reinforcing how his power has faded into obscurity.';

const P_S01_GRADE6_P1 =
  'In Ozymandias, Shelley presents power as temporary and unreliable. Ozymandias presents himself as extremely powerful, calling himself the "king of kings". This title suggests absolute authority and pride, showing that he believes his power will last forever.';

const P_S01_GRADE6_P2 =
  'However, this belief is contradicted by the ruined statue. The description of the "colossal wreck" shows that his power has collapsed. The empty desert surrounding the statue emphasises how time has erased his achievements.';

const P_S01_DRILLS: ModelDrillItem[] = [
  {
    type: 'quoteExtraction',
    id: 'QE-P-S01-1',
    taskId: 'P-S01',
    grade: 9,
    paragraphIndex: 1,
    paragraphText: P_S01_GRADE9_P1,
    prompt: 'Highlight the shortest possible quotation that supports the idea of power as illusion.',
    bestQuote: 'king of kings',
    whyBest: 'Shortest quote that exposes power as performative; avoids over-quoting.',
  },
  {
    type: 'paragraphSkeleton',
    id: 'PS-P-S01-1',
    taskId: 'P-S01',
    grade: 9,
    paragraphIndex: 1,
    skeleton: 'Shelley presents power as __________. The phrase "__________" reflects __________, which exposes power as __________.',
    fullParagraph: P_S01_GRADE9_P1,
    blankHints: ['arrogant/performative/illusion', 'king of kings', 'confidence/dominance', 'performative/proclaimed'],
  },
  {
    type: 'gradeUpgrade',
    id: 'GU-P-S01-1',
    taskId: 'P-S01',
    fromGrade: 6,
    toGrade: 9,
    weakParagraph: P_S01_GRADE6_P1,
    targetParagraph: P_S01_GRADE9_P1,
    rubric: [
      'Add conceptual shift (power as performative, not just temporary)',
      'Add judgement (exposes, proclaims)',
      'Link method to purpose (language exposes)',
    ],
  },
  {
    type: 'aoMapping',
    id: 'AO-P-S01-1',
    taskId: 'P-S01',
    grade: 9,
    paragraphIndex: 1,
    sentences: [
      'In Ozymandias, Shelley presents power as arrogant, self-deceiving and ultimately insignificant when measured against time.',
      'Ozymandias\' declaration, "king of kings", reflects absolute confidence in his authority.',
      'This language exposes power as performative — something proclaimed rather than earned.',
    ],
    correctAO: ['AO1', 'AO2', 'AO2'],
    weakestAO: 'AO3',
    whyWeakest: 'AO3 (context) is absent in this paragraph — top band weaves Romantic context.',
  },
];

// ---------------------------------------------------------------------------
// M-03: Macbeth — guilt
// ---------------------------------------------------------------------------

const M_03_GRADE9_P1 =
  'Shakespeare presents guilt as an internal punishment that enforces moral order. Macbeth\'s immediate disturbance after Duncan\'s murder reveals a functioning conscience, with guilt manifesting through fear, paranoia and hallucination. Blood imagery symbolises guilt as permanent and inescapable.';

const M_03_GRADE6_P1 =
  'Shakespeare presents guilt as a powerful force that causes suffering. Macbeth feels guilt immediately after killing Duncan, shown by his fear and inability to sleep. His guilt makes him paranoid and uneasy.';

const M_03_DRILLS: ModelDrillItem[] = [
  {
    type: 'quoteExtraction',
    id: 'QE-M-03-1',
    taskId: 'M-03',
    grade: 9,
    paragraphIndex: 1,
    paragraphText: M_03_GRADE9_P1,
    prompt: 'Highlight the shortest possible quotation that supports guilt as inescapable.',
    bestQuote: 'blood',
    whyBest: 'Shortest quote that supports guilt as inescapable (blood = permanent stain). Avoid over-quoting.',
  },
  {
    type: 'gradeUpgrade',
    id: 'GU-M-03-1',
    taskId: 'M-03',
    fromGrade: 6,
    toGrade: 9,
    weakParagraph: M_03_GRADE6_P1,
    targetParagraph: M_03_GRADE9_P1,
    rubric: [
      'Add conceptual shift (internal punishment, moral order)',
      'Add method (blood imagery) and purpose (symbolises)',
      'Add judgement (permanent, inescapable)',
    ],
  },
  {
    type: 'aoMapping',
    id: 'AO-M-03-1',
    taskId: 'M-03',
    grade: 9,
    paragraphIndex: 1,
    sentences: [
      'Shakespeare presents guilt as an internal punishment that enforces moral order.',
      'Blood imagery symbolises guilt as permanent and inescapable.',
    ],
    correctAO: ['AO1', 'AO2'],
    weakestAO: 'AO3',
    whyWeakest: 'AO3 (context) is absent — Jacobean beliefs about sin could be woven in.',
  },
];

// ---------------------------------------------------------------------------
// P-S03: Kamikaze — memory
// ---------------------------------------------------------------------------

const P_S03_GRADE9_P1 =
  'Garland presents memory in Kamikaze as a force that both saves and condemns. The pilot\'s memories of the sea and childhood interrupt his mission, suggesting that memory reconnects him with personal identity and moral instinct. The natural imagery contrasts sharply with the rigid ideology of honour.';

const P_S03_GRADE6_P1 =
  'Garland presents memory as powerful and controlling in Kamikaze. The pilot\'s decision to turn back becomes the most important memory associated with him. This memory causes his family to reject him, treating him as if he no longer exists.';

const P_S03_DRILLS: ModelDrillItem[] = [
  {
    type: 'quoteExtraction',
    id: 'QE-P-S03-1',
    taskId: 'P-S03',
    grade: 9,
    paragraphIndex: 1,
    paragraphText: P_S03_GRADE9_P1,
    prompt: 'Highlight the shortest possible quotation that supports memory as both saving and condemning.',
    bestQuote: 'both saves and condemns',
    whyBest: 'Shortest conceptual phrase; captures the dual nature.',
  },
  {
    type: 'gradeUpgrade',
    id: 'GU-P-S03-1',
    taskId: 'P-S03',
    fromGrade: 6,
    toGrade: 9,
    weakParagraph: P_S03_GRADE6_P1,
    targetParagraph: P_S03_GRADE9_P1,
    rubric: [
      'Add conceptual shift (saves AND condemns)',
      'Add method (natural imagery) and contrast',
      'Add judgement (moral instinct, rigid ideology)',
    ],
  },
];

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

const ALL_MODEL_DRILLS: ModelDrillItem[] = [
  ...P_S01_DRILLS,
  ...M_03_DRILLS,
  ...P_S03_DRILLS,
];

export function getModelDrillsByTask(taskId: string): ModelDrillItem[] {
  return ALL_MODEL_DRILLS.filter(d => d.taskId === taskId);
}

export function hasModelDrills(taskId: string): boolean {
  return getModelDrillsByTask(taskId).length > 0;
}

export function getModelDrillById(drillId: string): ModelDrillItem | undefined {
  return ALL_MODEL_DRILLS.find(d => d.id === drillId);
}

export const MODEL_DRILL_TASK_IDS: string[] = ['P-S01', 'P-S03', 'M-03'];

/** Map Literature task IDs to Quotation Lab source IDs for cross-linking */
export const TASK_TO_QUOTATION_LAB_SOURCE: Record<string, string> = {
  'P-S01': 'Ozymandias',
  'M-03': 'Macbeth',
};

export function getQuotationLabSourceForTask(taskId: string): string | undefined {
  return TASK_TO_QUOTATION_LAB_SOURCE[taskId];
}

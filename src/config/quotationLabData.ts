/**
 * Quotation Lab (Chunk 5) — quote banks, drills, micro-paragraph prompts.
 * Examiner-faithful: selective quotation, method focus, context hooks, Grade 9 deployment.
 */

import type {
  QuotationLabQuote,
  QuotationLabSourceId,
  QuotationDrillItem,
  QuotationDrillExplain,
  QuotationDrillUpgrade,
  QuotationDrillBestFit,
  QuotationDrillLinkTwo,
  QuotationMicroParagraphPrompt,
} from '../types/englishCampus';

// ---------------------------------------------------------------------------
// QUOTE BANKS (curated, not massive lists)
// ---------------------------------------------------------------------------

export const QUOTATION_LAB_QUOTES: QuotationLabQuote[] = [
  // Macbeth — Ambition
  {
    id: 'M-amb-1',
    sourceId: 'Macbeth',
    quote: 'Vaulting ambition, which o\'erleaps itself',
    themes: ['ambition', 'hubris', 'downfall'],
    method: 'Metaphor (physical movement)',
    meaning: 'Ambition is uncontrolled and self-destructive; it overreaches and falls.',
    contextHook: 'Jacobean fear of ambition disrupting divine order; loyalty to the king.',
    deploymentTip: 'Use this to show Macbeth’s self-awareness — ambition is a choice, not fate.',
    location: 'Act 1, Scene 7',
  },
  {
    id: 'M-amb-2',
    sourceId: 'Macbeth',
    quote: 'I have no spur / To prick the sides of my intent, but only / Vaulting ambition',
    themes: ['ambition', 'moral conflict'],
    method: 'Metaphor (horse and rider)',
    meaning: 'Ambition is the only thing driving him; no moral justification.',
    contextHook: 'Jacobean belief in natural order; Macbeth knows his intent is wrong.',
    deploymentTip: 'Shows ambition overriding conscience — links to AO1 (response) and AO3 (context).',
    location: 'Act 1, Scene 7',
  },
  {
    id: 'M-amb-3',
    sourceId: 'Macbeth',
    quote: 'Stars, hide your fires; / Let not light see my black and deep desires',
    themes: ['ambition', 'guilt', 'darkness'],
    method: 'Imagery (light vs darkness); personification',
    meaning: 'Macbeth wants to hide his ambition even from the heavens; shame and secrecy.',
    contextHook: 'Divine order; light = goodness, darkness = evil in Jacobean thought.',
    deploymentTip: 'Use for early ambition and moral awareness — sets up his decline.',
    location: 'Act 1, Scene 4',
  },
  // Macbeth — Guilt
  {
    id: 'M-guilt-1',
    sourceId: 'Macbeth',
    quote: 'Will all great Neptune’s ocean wash this blood / Clean from my hand?',
    themes: ['guilt', 'blood', 'conscience'],
    method: 'Hyperbole; symbolism (blood = guilt)',
    meaning: 'Guilt is overwhelming and cannot be washed away; permanent stain.',
    contextHook: 'Biblical/Jacobean idea of blood as guilt; divine judgement.',
    deploymentTip: 'Contrast with Lady Macbeth’s “little hand” — shows his conscience is stronger.',
    location: 'Act 2, Scene 2',
  },
  {
    id: 'M-guilt-2',
    sourceId: 'Macbeth',
    quote: 'Out, damned spot! out, I say!',
    themes: ['guilt', 'Lady Macbeth', 'madness'],
    method: 'Repetition; imperative; symbolism (spot = guilt)',
    meaning: 'Lady Macbeth cannot escape guilt; it haunts her in sleep.',
    contextHook: 'Gender and power — her earlier confidence has collapsed.',
    deploymentTip: 'Use to show change: from “unsex me” to psychological breakdown.',
    location: 'Act 5, Scene 1',
  },
  {
    id: 'M-guilt-3',
    sourceId: 'Macbeth',
    quote: 'O, full of scorpions is my mind, dear wife!',
    themes: ['guilt', 'paranoia', 'psychological decay'],
    method: 'Metaphor (scorpions = tormenting thoughts)',
    meaning: 'His mind is poisoned by guilt and fear; no peace.',
    contextHook: 'Psychological cost of tyranny; audience sees his inner collapse.',
    deploymentTip: 'Shows development from ambition to paranoia — link to structure of play.',
    location: 'Act 3, Scene 2',
  },
  // Macbeth — Power / Tyranny
  {
    id: 'M-pow-1',
    sourceId: 'Macbeth',
    quote: 'By the pricking of my thumbs, / Something wicked this way comes',
    themes: ['evil', 'power', 'witches'],
    method: 'Sensory imagery; foreshadowing',
    meaning: 'Even the witches sense Macbeth’s moral corruption; he has become “wicked”.',
    contextHook: 'Witches as moral barometers; Macbeth’s transformation.',
    deploymentTip: 'Use to show how far Macbeth has fallen — he is now aligned with evil.',
    location: 'Act 4, Scene 1',
  },
  {
    id: 'M-pow-2',
    sourceId: 'Macbeth',
    quote: 'I am in blood / Stepped in so far that, should I wade no more, / Returning were as tedious as go o’er',
    themes: ['power', 'violence', 'no return'],
    method: 'Metaphor (blood = violence and guilt); moral point of no return',
    meaning: 'He has committed so much violence that turning back is unthinkable.',
    contextHook: 'Tyranny and escalation; Jacobean fear of usurpation.',
    deploymentTip: 'Grade 9: link to “vaulting ambition” — ambition has led to irreversible corruption.',
    location: 'Act 3, Scene 4',
  },
  // Macbeth — Lady Macbeth (power)
  {
    id: 'M-lady-1',
    sourceId: 'Macbeth',
    quote: 'Unsex me here',
    themes: ['Lady Macbeth', 'power', 'gender'],
    method: 'Imperative; rejection of femininity',
    meaning: 'She wants to rid herself of “female” weakness to commit murder.',
    contextHook: 'Jacobean gender roles; women as morally weaker; she inverts this.',
    deploymentTip: 'Use for AO3 — challenge to gender expectations and her later collapse.',
    location: 'Act 1, Scene 5',
  },
  {
    id: 'M-lady-2',
    sourceId: 'Macbeth',
    quote: 'Look like the innocent flower, / But be the serpent under’t',
    themes: ['Lady Macbeth', 'deception', 'power'],
    method: 'Metaphor (flower vs serpent); biblical allusion',
    meaning: 'Appear harmless but be deadly; deliberate deception.',
    contextHook: 'Eden/serpent; appearance vs reality; political manipulation.',
    deploymentTip: 'Shows her strategic power and moral clarity at the start — contrast with Act 5.',
    location: 'Act 1, Scene 5',
  },
  // Poetry — Ozymandias (power)
  {
    id: 'Ozy-1',
    sourceId: 'Ozymandias',
    quote: 'Look on my works, ye Mighty, and despair!',
    themes: ['power', 'hubris', 'irony'],
    method: 'Irony; imperative; juxtaposition with ruin',
    meaning: 'The ruler’s boast is undercut by the ruined statue; power is temporary.',
    contextHook: 'Romantic critique of tyranny; nature and time outlast human power.',
    deploymentTip: 'Use with “colossal wreck” to show contrast between claim and reality.',
    location: 'Line 11',
  },
  {
    id: 'Ozy-2',
    sourceId: 'Ozymandias',
    quote: 'colossal wreck',
    themes: ['power', 'decay', 'time'],
    method: 'Oxymoron / juxtaposition (colossal vs wreck)',
    meaning: 'Something once huge and powerful is now broken and meaningless.',
    contextHook: 'Shelley’s belief in the futility of earthly power.',
    deploymentTip: 'Pair with the inscription for sustained AO2 on contrast.',
    location: 'Line 13',
  },
  // London (power, control)
  {
    id: 'Lon-1',
    sourceId: 'London',
    quote: 'mind-forged manacles',
    themes: ['power', 'control', 'oppression'],
    method: 'Metaphor (manacles = mental control)',
    meaning: 'People are trapped by ideas and authority, not just physical chains.',
    contextHook: 'Blake’s critique of institutions; industrial London; political and religious control.',
    deploymentTip: 'Use to show power as psychological — different from Ozymandias’ physical ruin.',
    location: 'Line 8',
  },
  // Exposure (conflict)
  {
    id: 'Exp-1',
    sourceId: 'Exposure',
    quote: 'merciless iced east winds that knive us',
    themes: ['conflict', 'nature', 'suffering'],
    method: 'Personification; sensory imagery',
    meaning: 'Nature is an enemy; weather is as violent as battle.',
    contextHook: 'Owen’s first-hand experience; conflict with nature, not just enemy.',
    deploymentTip: 'Use to show conflict beyond traditional “war” — physical and psychological.',
    location: 'Stanza 1',
  },
  {
    id: 'Exp-2',
    sourceId: 'Exposure',
    quote: 'But nothing happens',
    themes: ['conflict', 'futility', 'waiting'],
    method: 'Repetition; refrain',
    meaning: 'Frustration and fear of waiting; war as boredom and helplessness.',
    contextHook: 'WWI trench experience; Owen challenging heroic view of war.',
    deploymentTip: 'Link structure (repetition) to meaning — cyclical suffering.',
    location: 'Repeated',
  },
];

// ---------------------------------------------------------------------------
// DRILLS (Explain, Upgrade, Best Fit, Link Two)
// ---------------------------------------------------------------------------

const DRILLS_EXPLAIN: QuotationDrillExplain[] = [
  {
    type: 'explainQuote',
    id: 'DE-M-1',
    sourceId: 'Macbeth',
    quoteId: 'M-amb-1',
    themePrompt: 'In one sentence, explain how this quote links to the theme of ambition.',
    gradingNote: 'Grade 4: basic meaning. Grade 6: meaning + theme. Grade 8: method + meaning. Grade 9: concept + judgement.',
  },
  {
    type: 'explainQuote',
    id: 'DE-M-2',
    sourceId: 'Macbeth',
    quoteId: 'M-guilt-1',
    themePrompt: 'In one sentence, explain how this quote links to the theme of guilt.',
    gradingNote: 'Grade 4: basic meaning. Grade 6: meaning + theme. Grade 8: method + meaning. Grade 9: concept + judgement.',
  },
  {
    type: 'explainQuote',
    id: 'DE-M-3',
    sourceId: 'Macbeth',
    quoteId: 'M-pow-2',
    themePrompt: 'In one sentence, explain how this quote links to the theme of power.',
    gradingNote: 'Grade 4: basic meaning. Grade 6: meaning + theme. Grade 8: method + meaning. Grade 9: concept + judgement.',
  },
];

const DRILLS_UPGRADE: QuotationDrillUpgrade[] = [
  {
    type: 'upgradeAnalysis',
    id: 'DU-M-1',
    sourceId: 'Macbeth',
    quoteId: 'M-amb-1',
    weakResponse: 'This quote shows Macbeth is ambitious.',
    upgradeFocus: 'Add method (metaphor), precision (what “o’erleaps” suggests), and judgement (self-destructive ambition).',
  },
  {
    type: 'upgradeAnalysis',
    id: 'DU-M-2',
    sourceId: 'Macbeth',
    quoteId: 'M-guilt-1',
    weakResponse: 'Macbeth feels guilty after killing Duncan.',
    upgradeFocus: 'Add method (hyperbole, symbolism of blood), precision (why “Neptune’s ocean”), and judgement (guilt as permanent).',
  },
  {
    type: 'upgradeAnalysis',
    id: 'DU-M-3',
    sourceId: 'Macbeth',
    quoteId: 'M-lady-1',
    weakResponse: 'Lady Macbeth wants to be strong.',
    upgradeFocus: 'Add method (imperative, “unsex”), precision (what she rejects), and AO3 (Jacobean gender expectations).',
  },
];

const DRILLS_BEST_FIT: QuotationDrillBestFit[] = [
  {
    type: 'whichQuoteFitsBest',
    id: 'DB-M-1',
    sourceId: 'Macbeth',
    question: 'How does Shakespeare present guilt in the play?',
    quoteOptionIds: ['M-amb-1', 'M-guilt-1', 'M-lady-2', 'M-pow-1'],
    bestQuoteId: 'M-guilt-1',
    whyBest: 'Directly addresses guilt and its overwhelming, permanent nature; method (hyperbole, blood) supports AO2.',
  },
  {
    type: 'whichQuoteFitsBest',
    id: 'DB-M-2',
    sourceId: 'Macbeth',
    question: 'How does Shakespeare present ambition as destructive?',
    quoteOptionIds: ['M-guilt-2', 'M-amb-1', 'M-guilt-3', 'Exp-1'],
    bestQuoteId: 'M-amb-1',
    whyBest: '"Vaulting ambition, which o’erleaps itself" explicitly shows ambition as self-destructive; metaphor is central to the question.',
  },
];

const DRILLS_LINK_TWO: QuotationDrillLinkTwo[] = [
  {
    type: 'linkTwoQuotes',
    id: 'DL-M-1',
    sourceId: 'Macbeth',
    quoteIdA: 'M-amb-3',
    quoteIdB: 'M-pow-1',
    linkPrompt: 'Link these two moments to show how Macbeth changes from early temptation to later corruption.',
    rewardNote: 'Reward: clear development; method in both; conceptual link (desire → wickedness).',
  },
  {
    type: 'linkTwoQuotes',
    id: 'DL-M-2',
    sourceId: 'Macbeth',
    quoteIdA: 'M-lady-2',
    quoteIdB: 'M-guilt-2',
    linkPrompt: 'Link Lady Macbeth’s early power with her later collapse.',
    rewardNote: 'Reward: rise and fall; contrast in language (serpent vs “damned spot”); judgement about power.',
  },
];

export const QUOTATION_LAB_DRILLS: QuotationDrillItem[] = [
  ...DRILLS_EXPLAIN,
  ...DRILLS_UPGRADE,
  ...DRILLS_BEST_FIT,
  ...DRILLS_LINK_TWO,
];

// ---------------------------------------------------------------------------
// MICRO-PARAGRAPH BUILDER PROMPTS
// ---------------------------------------------------------------------------

export const QUOTATION_MICRO_PARAGRAPH_PROMPTS: QuotationMicroParagraphPrompt[] = [
  {
    id: 'MP-M-1',
    sourceId: 'Macbeth',
    theme: 'Ambition',
    quoteId: 'M-amb-1',
    method: 'Metaphor (vaulting)',
    checklist: [
      'Clear argument about ambition',
      'Quote embedded in a sentence',
      'AO2: analyse the metaphor',
      'AO3: brief context (e.g. Jacobean order)',
      'Judgement (e.g. self-destructive)',
    ],
  },
  {
    id: 'MP-M-2',
    sourceId: 'Macbeth',
    theme: 'Guilt',
    quoteId: 'M-guilt-1',
    method: 'Hyperbole / symbolism (blood)',
    checklist: [
      'Clear argument about guilt',
      'Quote embedded',
      'AO2: effect of hyperbole/symbolism',
      'AO3: link to divine judgement if relevant',
      'Judgement',
    ],
  },
  {
    id: 'MP-M-3',
    sourceId: 'Macbeth',
    theme: 'Power and corruption',
    quoteId: 'M-pow-2',
    method: 'Metaphor (blood / wading)',
    checklist: [
      'Argument about moral point of no return',
      'Quote embedded',
      'AO2: metaphor and escalation',
      'AO3: tyranny and Jacobean context',
      'Judgement',
    ],
  },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

const QUOTES_BY_SOURCE: Record<QuotationLabSourceId, QuotationLabQuote[]> = (() => {
  const map: Record<string, QuotationLabQuote[]> = {
    Macbeth: [],
    Ozymandias: [],
    London: [],
    Exposure: [],
  };
  for (const q of QUOTATION_LAB_QUOTES) {
    map[q.sourceId].push(q);
  }
  return map as Record<QuotationLabSourceId, QuotationLabQuote[]>;
})();

const DRILLS_BY_SOURCE: Record<QuotationLabSourceId, QuotationDrillItem[]> = (() => {
  const map: Record<string, QuotationDrillItem[]> = {
    Macbeth: [],
    Ozymandias: [],
    London: [],
    Exposure: [],
  };
  for (const d of QUOTATION_LAB_DRILLS) {
    map[d.sourceId].push(d);
  }
  return map as Record<QuotationLabSourceId, QuotationDrillItem[]>;
})();

export function getQuotationLabQuotesBySource(sourceId: QuotationLabSourceId): QuotationLabQuote[] {
  return QUOTES_BY_SOURCE[sourceId] ?? [];
}

export function getQuotationLabQuoteById(quoteId: string): QuotationLabQuote | undefined {
  return QUOTATION_LAB_QUOTES.find(q => q.id === quoteId);
}

export function getQuotationLabDrillsBySource(sourceId: QuotationLabSourceId): QuotationDrillItem[] {
  return DRILLS_BY_SOURCE[sourceId] ?? [];
}

export function getMicroParagraphPromptsBySource(sourceId: QuotationLabSourceId): QuotationMicroParagraphPrompt[] {
  return QUOTATION_MICRO_PARAGRAPH_PROMPTS.filter(p => p.sourceId === sourceId);
}

export const QUOTATION_LAB_SOURCE_IDS: QuotationLabSourceId[] = ['Macbeth', 'Ozymandias', 'London', 'Exposure'];

export function getQuotationLabSourceLabel(sourceId: QuotationLabSourceId): string {
  const labels: Record<QuotationLabSourceId, string> = {
    Macbeth: 'Macbeth',
    Ozymandias: 'Ozymandias',
    London: 'London',
    Exposure: 'Exposure',
  };
  return labels[sourceId] ?? sourceId;
}

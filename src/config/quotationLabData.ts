/**
 * Quotation Lab (Chunk 5) — quote banks, drills, micro-paragraph prompts.
 * Examiner-faithful: selective quotation, method focus, context hooks, Grade 9 deployment.
 */

import type {
  QuotationLabQuote,
  QuotationLabSourceId,
  QuotationLabClusterId,
  QuotationLabThemeId,
  QuotationDrillItem,
  QuotationDrillExplain,
  QuotationDrillFinishAnalysis,
  QuotationDrillUpgrade,
  QuotationDrillBestFit,
  QuotationDrillLinkTwo,
  QuotationDrillWhichAO,
  QuotationDrillEliminateWeak,
  QuotationMicroParagraphPrompt,
  QuotationFlexibleDeploymentPrompt,
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
    themes: ['ambition', 'hubris', 'downfall', 'power'],
    method: 'Metaphor (physical movement)',
    meaning: 'Ambition is uncontrolled and self-destructive; it overreaches and falls.',
    commonMisuse: 'Using without linking to method or purpose',
    difficulty: 'core',
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
    themes: ['guilt', 'blood', 'conscience', 'violence'],
    method: 'Hyperbole; symbolism (blood = guilt)',
    methods: ['hyperbole', 'imagery', 'mythological allusion'],
    meaning: 'Guilt is overwhelming and cannot be washed away; permanent stain.',
    grade9Insight: 'Guilt is framed as cosmic and irreversible.',
    contextHook: 'Biblical/Jacobean idea of blood as guilt; divine judgement.',
    deploymentTip: 'Contrast with Lady Macbeth’s “little hand” — shows his conscience is stronger.',
    bestUsedFor: ['guilt essays', 'moral consequence arguments', 'psychological collapse'],
    commonMisuse: 'Over-quoting the whole line instead of embedding',
    difficulty: 'core',
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
  // ---- Grade 9 Toolkit additions ----
  // Macbeth — additional embeddable fragments
  {
    id: 'MAC-AMB-01',
    sourceId: 'Macbeth',
    quote: 'vaulting ambition',
    themes: ['ambition', 'power', 'downfall'],
    method: 'Metaphor',
    methods: ['metaphor'],
    meaning: 'Macbeth recognises ambition as dangerous and self-destructive.',
    grade9Insight: 'Ambition is framed as self-propelling, requiring no external force.',
    contextHook: 'Jacobean warnings against overreaching and disruption of order.',
    bestUsedFor: ['ambition essays', "Macbeth's moral awareness"],
    commonMisuse: 'Used as proof Macbeth is unaware of his actions',
    difficulty: 'core',
    location: 'Act 1 Scene 7',
  },
  {
    id: 'MAC-AMB-02',
    sourceId: 'Macbeth',
    quote: 'king hereafter',
    themes: ['ambition', 'fate', 'power'],
    method: 'Dramatic irony; prophecy',
    methods: ['dramatic irony', 'prophecy'],
    meaning: 'Macbeth fixates on future power.',
    grade9Insight: 'The title reduces kingship to an abstract obsession.',
    contextHook: 'Belief in prophecy and divine right of kings.',
    bestUsedFor: ['fate vs free will', 'ambition beginnings'],
    commonMisuse: 'Treated as certainty rather than temptation',
    difficulty: 'core',
    location: 'Act 1 Scene 3',
  },
  {
    id: 'MAC-GUILT-01',
    sourceId: 'Macbeth',
    quote: "Neptune's ocean",
    themes: ['guilt', 'violence', 'conscience'],
    method: 'Hyperbole; mythological allusion',
    methods: ['hyperbole', 'mythological allusion'],
    meaning: 'Guilt is overwhelming and irreversible.',
    grade9Insight: 'Guilt is framed as cosmic rather than personal.',
    contextHook: 'Sin as a stain that cannot be cleansed.',
    bestUsedFor: ['guilt essays', 'psychological impact'],
    commonMisuse: 'Quoted too long and without explanation',
    difficulty: 'core',
    location: 'Act 2 Scene 2',
  },
  {
    id: 'MAC-GUILT-02',
    sourceId: 'Macbeth',
    quote: 'full of scorpions',
    themes: ['guilt', 'paranoia', 'violence'],
    method: 'Metaphor; animal imagery',
    methods: ['metaphor', 'animal imagery'],
    meaning: 'Guilt mutates into paranoia.',
    grade9Insight: 'Violence becomes habitual rather than shocking.',
    contextHook: 'Disruption of natural order.',
    bestUsedFor: ["Macbeth's moral decline"],
    commonMisuse: 'Used to show fear only, not guilt evolution',
    difficulty: 'extension',
    location: 'Act 3 Scene 2',
  },
  {
    id: 'MAC-POWER-01',
    sourceId: 'Macbeth',
    quote: 'tyrant',
    themes: ['power', 'kingship', 'violence'],
    method: 'Noun choice',
    methods: ['noun choice'],
    meaning: "Macbeth's rule is illegitimate.",
    grade9Insight: 'Power without morality is dehumanising.',
    contextHook: 'Jacobean expectations of just kingship.',
    bestUsedFor: ['kingship essays'],
    commonMisuse: 'Dropped in without context',
    difficulty: 'core',
    location: 'Act 4 Scene 3',
  },
  // A Christmas Carol
  {
    id: 'ACC-SELF-01',
    sourceId: 'AChristmasCarol',
    quote: 'solitary as an oyster',
    themes: ['selfishness', 'isolation', 'greed'],
    method: 'Simile',
    methods: ['simile'],
    meaning: 'Scrooge is isolated but capable of change.',
    grade9Insight: 'The simile contains hidden potential for redemption.',
    contextHook: 'Victorian attitudes to social responsibility.',
    bestUsedFor: ['Scrooge at the start'],
    commonMisuse: 'Only used to show loneliness',
    difficulty: 'core',
    location: 'Stave 1',
  },
  {
    id: 'ACC-RED-01',
    sourceId: 'AChristmasCarol',
    quote: 'I will honour Christmas',
    themes: ['redemption', 'change'],
    method: 'Modal verb',
    methods: ['modal verb'],
    meaning: 'Scrooge commits to moral reform.',
    grade9Insight: 'Language of duty suggests lasting change.',
    contextHook: 'Christian redemption ideology.',
    bestUsedFor: ['redemption essays'],
    commonMisuse: 'Used without contrast to earlier Scrooge',
    difficulty: 'core',
    location: 'Stave 4',
  },
  {
    id: 'ACC-SOC-01',
    sourceId: 'AChristmasCarol',
    quote: 'Are there no prisons?',
    themes: ['poverty', 'responsibility', 'selfishness'],
    method: 'Rhetorical question',
    methods: ['rhetorical question'],
    meaning: 'Scrooge rejects responsibility for the poor.',
    grade9Insight: 'Echoes institutional cruelty of the Poor Law.',
    contextHook: '1834 Poor Law',
    bestUsedFor: ['social criticism'],
    commonMisuse: 'Explained without context',
    difficulty: 'extension',
    location: 'Stave 1',
  },
  // Jekyll & Hyde
  {
    id: 'JH-DUAL-01',
    sourceId: 'JekyllHyde',
    quote: 'man is not truly one',
    themes: ['duality', 'identity', 'human nature'],
    method: 'Aphorism',
    methods: ['aphorism'],
    meaning: 'Human nature is divided.',
    grade9Insight: 'Duality is presented as universal, not personal.',
    contextHook: 'Victorian repression.',
    bestUsedFor: ['duality essays'],
    commonMisuse: "Used without linking to Jekyll's failure",
    difficulty: 'core',
    location: 'Chapter 10',
  },
  {
    id: 'JH-HYDE-01',
    sourceId: 'JekyllHyde',
    quote: 'ape-like fury',
    themes: ['violence', 'fear', 'degeneration'],
    method: 'Animal imagery',
    methods: ['animal imagery'],
    meaning: 'Hyde represents regression.',
    grade9Insight: 'Links to fears of evolutionary reversal.',
    contextHook: 'Darwinian anxiety.',
    bestUsedFor: ['Hyde frightening'],
    commonMisuse: 'Explained literally',
    difficulty: 'core',
    location: 'Chapter 1',
  },
  // An Inspector Calls
  {
    id: 'AIC-RESP-01',
    sourceId: 'AnInspectorCalls',
    quote: 'we are members of one body',
    themes: ['responsibility', 'society'],
    method: 'Metaphor',
    methods: ['metaphor'],
    meaning: 'Responsibility is collective.',
    grade9Insight: 'Challenges capitalist individualism.',
    contextHook: 'Post-war socialism.',
    bestUsedFor: ['responsibility essays'],
    commonMisuse: 'Quoted without linking to structure',
    difficulty: 'core',
    location: 'Act 3',
  },
  {
    id: 'AIC-POW-01',
    sourceId: 'AnInspectorCalls',
    quote: 'hard-headed businessman',
    themes: ['capitalism', 'power'],
    method: 'Self-description',
    methods: ['self-description'],
    meaning: 'Birling values profit over people.',
    grade9Insight: 'Language exposes moral blindness.',
    contextHook: 'Edwardian capitalism.',
    bestUsedFor: ['Birling criticism'],
    commonMisuse: 'Used descriptively only',
    difficulty: 'core',
    location: 'Act 1',
  },
  // Ozymandias — additional
  {
    id: 'OZY-POW-01',
    sourceId: 'Ozymandias',
    quote: 'king of kings',
    themes: ['power', 'pride', 'time'],
    method: 'Irony',
    methods: ['irony'],
    meaning: 'Human power is temporary.',
    grade9Insight: 'Power is mocked through self-aggrandisement.',
    contextHook: 'Romantic criticism of tyranny.',
    bestUsedFor: ['power essays'],
    commonMisuse: 'Explained without irony',
    difficulty: 'core',
    location: 'Line 10',
  },
  {
    id: 'OZY-POW-02',
    sourceId: 'Ozymandias',
    quote: 'vast and trunkless',
    themes: ['power', 'decay', 'time'],
    method: 'Adjective choice',
    methods: ['adjective choice'],
    meaning: 'Power has physically collapsed.',
    grade9Insight: 'Absence emphasises loss more than presence.',
    contextHook: 'Romantic criticism of tyranny.',
    bestUsedFor: ['power illusion'],
    commonMisuse: 'Described without linking to decay',
    difficulty: 'core',
    location: 'Line 2',
  },
  {
    id: 'OZY-POW-03',
    sourceId: 'Ozymandias',
    quote: 'sneer of cold command',
    themes: ['power', 'tyranny'],
    method: 'Alliteration; facial imagery',
    methods: ['alliteration', 'facial imagery'],
    meaning: 'Power is cruel and arrogant.',
    grade9Insight: 'Expression survives longer than authority.',
    contextHook: 'Absolute rulers.',
    bestUsedFor: ['tyranny essays'],
    commonMisuse: 'Used to describe statue only',
    difficulty: 'core',
    location: 'Line 5',
  },
  {
    id: 'OZY-POW-04',
    sourceId: 'Ozymandias',
    quote: 'look on my works',
    themes: ['power', 'pride'],
    method: 'Imperative',
    methods: ['imperative'],
    meaning: 'Ozymandias demands admiration.',
    grade9Insight: 'Command contrasts with emptiness.',
    contextHook: 'Hubris of rulers.',
    bestUsedFor: ['power arrogance'],
    commonMisuse: 'Quoted without irony',
    difficulty: 'core',
    location: 'Line 11',
  },
  {
    id: 'OZY-TIME-01',
    sourceId: 'Ozymandias',
    quote: 'colossal wreck',
    themes: ['time', 'decay', 'power'],
    method: 'Oxymoron',
    methods: ['oxymoron'],
    meaning: 'Greatness reduced to ruin.',
    grade9Insight: 'Scale emphasises futility.',
    contextHook: 'Romantic view of time.',
    bestUsedFor: ['time vs power'],
    commonMisuse: 'Explained literally',
    difficulty: 'extension',
    location: 'Line 13',
  },
  {
    id: 'OZY-TIME-02',
    sourceId: 'Ozymandias',
    quote: 'boundless and bare',
    themes: ['time', 'nature', 'decay'],
    method: 'Alliteration',
    methods: ['alliteration'],
    meaning: 'Nature outlasts humanity.',
    grade9Insight: 'Emptiness mocks human ambition.',
    contextHook: 'Nature supremacy.',
    bestUsedFor: ['power limits'],
    commonMisuse: 'Used as setting only',
    difficulty: 'core',
    location: 'Line 14',
  },
  // Exposure — additional
  {
    id: 'EXP-CON-01',
    sourceId: 'Exposure',
    quote: 'merciless iced east winds',
    themes: ['conflict', 'nature', 'suffering'],
    method: 'Personification',
    methods: ['personification'],
    meaning: 'Nature is the true enemy.',
    grade9Insight: 'War becomes meaningless against nature.',
    contextHook: 'Trench warfare.',
    bestUsedFor: ['conflict essays'],
    commonMisuse: 'Only linked to weather',
    difficulty: 'core',
    location: 'Stanza 1',
  },
  {
    id: 'EXP-NAT-02',
    sourceId: 'Exposure',
    quote: 'knife us',
    themes: ['conflict', 'nature', 'violence'],
    method: 'Personification',
    methods: ['personification'],
    meaning: 'Nature attacks soldiers.',
    grade9Insight: 'Nature replaces human enemy.',
    contextHook: 'Trench warfare.',
    bestUsedFor: ['conflict suffering'],
    commonMisuse: 'Used for violence only',
    difficulty: 'core',
    location: 'Stanza 1',
  },
  {
    id: 'EXP-NAT-03',
    sourceId: 'Exposure',
    quote: 'mad gusts',
    themes: ['nature', 'chaos'],
    method: 'Adjective choice',
    methods: ['adjective choice'],
    meaning: 'Nature is uncontrollable.',
    grade9Insight: 'Madness mirrors mental state.',
    contextHook: 'Psychological trauma.',
    bestUsedFor: ['mental conflict'],
    commonMisuse: 'Linked to weather only',
    difficulty: 'extension',
    location: 'Stanza 1',
  },
  {
    id: 'EXP-FUT-01',
    sourceId: 'Exposure',
    quote: 'nothing happens',
    themes: ['futility', 'conflict'],
    method: 'Repetition',
    methods: ['repetition'],
    meaning: 'War lacks purpose.',
    grade9Insight: 'Refrain drains hope structurally.',
    contextHook: 'Trench stalemate.',
    bestUsedFor: ['futility essays'],
    commonMisuse: 'Explained too simply',
    difficulty: 'core',
    location: 'Refrain',
  },
  // Bayonet Charge
  {
    id: 'BC-FEAR-01',
    sourceId: 'BayonetCharge',
    quote: 'raw-seamed hot khaki',
    themes: ['conflict', 'fear', 'reality'],
    method: 'Sensory imagery',
    methods: ['sensory imagery'],
    meaning: 'Physical discomfort overwhelms.',
    grade9Insight: 'War felt through body not ideology.',
    contextHook: 'Modern warfare.',
    bestUsedFor: ['reality of war'],
    commonMisuse: 'Used as colour imagery only',
    difficulty: 'core',
    location: 'Line 2',
  },
  {
    id: 'BC-FEAR-02',
    sourceId: 'BayonetCharge',
    quote: 'suddenly he awoke',
    themes: ['fear', 'conflict'],
    method: 'Adverb',
    methods: ['adverb'],
    meaning: 'War is shocking and disorientating.',
    grade9Insight: 'Suggests loss of conscious control.',
    contextHook: 'Instant combat.',
    bestUsedFor: ['panic essays'],
    commonMisuse: 'Narrative retelling',
    difficulty: 'core',
    location: 'Line 1',
  },
  // Checking Out Me History
  {
    id: 'COMH-ID-01',
    sourceId: 'CheckingOutMeHistory',
    quote: 'dem tell me',
    themes: ['identity', 'power', 'education'],
    method: 'Repetition; phonetic spelling',
    methods: ['repetition', 'phonetic spelling'],
    meaning: 'Identity is controlled by authority.',
    grade9Insight: 'Voice resists linguistic oppression.',
    contextHook: 'Post-colonial identity.',
    bestUsedFor: ['identity essays'],
    commonMisuse: 'Explained as accent only',
    difficulty: 'core',
    location: 'Repeated refrain',
  },
  {
    id: 'COMH-ID-02',
    sourceId: 'CheckingOutMeHistory',
    quote: 'bandage up me eye',
    themes: ['identity', 'power'],
    method: 'Metaphor',
    methods: ['metaphor'],
    meaning: 'Education blinds identity.',
    grade9Insight: 'Violence of cultural erasure.',
    contextHook: 'Colonial education.',
    bestUsedFor: ['identity control'],
    commonMisuse: 'Explained literally',
    difficulty: 'core',
    location: 'Stanza 1',
  },
  {
    id: 'COMH-ID-03',
    sourceId: 'CheckingOutMeHistory',
    quote: 'I carving out',
    themes: ['identity', 'resistance'],
    method: 'Present participle',
    methods: ['present participle'],
    meaning: 'Active reclaiming of identity.',
    grade9Insight: 'Identity is constructed, not given.',
    contextHook: 'Post-colonial resistance.',
    bestUsedFor: ['resistance essays'],
    commonMisuse: 'Used as conclusion filler',
    difficulty: 'extension',
    location: 'Final stanza',
  },
  // Kamikaze
  {
    id: 'KAM-ID-01',
    sourceId: 'Kamikaze',
    quote: 'he must have wondered',
    themes: ['memory', 'identity', 'conflict'],
    method: 'Modal verb; speculation',
    methods: ['modal verb', 'speculation'],
    meaning: 'Identity is shaped by reflection.',
    grade9Insight: 'Uncertainty mirrors fragmented memory.',
    contextHook: 'Cultural expectations of honour.',
    bestUsedFor: ['identity essays'],
    commonMisuse: 'Used as certainty',
    difficulty: 'extension',
    location: 'Stanza 3',
  },
  {
    id: 'KAM-ID-02',
    sourceId: 'Kamikaze',
    quote: 'a shaven head',
    themes: ['identity', 'honour'],
    method: 'Symbolism',
    methods: ['symbolism'],
    meaning: 'Identity stripped by culture.',
    grade9Insight: 'Public shame replaces death.',
    contextHook: 'Japanese honour culture.',
    bestUsedFor: ['identity loss'],
    commonMisuse: 'Descriptive only',
    difficulty: 'core',
    location: 'Stanza 6',
  },
  {
    id: 'KAM-MEM-01',
    sourceId: 'Kamikaze',
    quote: 'which had been the better way',
    themes: ['memory', 'identity'],
    method: 'Rhetorical question',
    methods: ['rhetorical question'],
    meaning: 'Moral ambiguity remains.',
    grade9Insight: 'No clear judgement offered.',
    contextHook: 'Conflict between duty and humanity.',
    bestUsedFor: ['ending analysis'],
    commonMisuse: 'Answered definitively',
    difficulty: 'extension',
    location: 'Final line',
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
    themePrompt: 'Explain how this quote links to the theme of ambition.',
    maxWords: 20,
    gradingNote: 'Grade 4: basic meaning. Grade 6: meaning + theme. Grade 8: method + meaning. Grade 9: concept + judgement. Max 20 words. Must include judgement.',
  },
  {
    type: 'explainQuote',
    id: 'DE-M-2',
    sourceId: 'Macbeth',
    quoteId: 'M-guilt-1',
    themePrompt: 'Explain how this quote links to the theme of guilt.',
    maxWords: 20,
    gradingNote: 'Grade 4: basic meaning. Grade 6: meaning + theme. Grade 8: method + meaning. Grade 9: concept + judgement. Max 20 words. Must include judgement.',
  },
  {
    type: 'explainQuote',
    id: 'DE-M-3',
    sourceId: 'Macbeth',
    quoteId: 'M-pow-2',
    themePrompt: 'Explain how this quote links to the theme of power.',
    maxWords: 20,
    gradingNote: 'Grade 4: basic meaning. Grade 6: meaning + theme. Grade 8: method + meaning. Grade 9: concept + judgement. Max 20 words. Must include judgement.',
  },
];

const DRILLS_FINISH_ANALYSIS: QuotationDrillFinishAnalysis[] = [
  {
    type: 'finishAnalysis',
    id: 'DF-M-1',
    sourceId: 'Macbeth',
    quoteId: 'M-guilt-1',
    starter: 'This suggests Macbeth\'s guilt is overwhelming because…',
    rewardNote: 'Reward: method (hyperbole/symbolism), precision (why blood/Neptune), judgement (permanent/inescapable).',
  },
  {
    type: 'finishAnalysis',
    id: 'DF-M-2',
    sourceId: 'Macbeth',
    quoteId: 'M-amb-1',
    starter: 'The metaphor of vaulting ambition suggests Macbeth\'s downfall is inevitable because…',
    rewardNote: 'Reward: method (metaphor), purpose (self-destructive), judgement.',
  },
];

const DRILLS_WHICH_AO: QuotationDrillWhichAO[] = [
  {
    type: 'whichAO',
    id: 'DA-M-1',
    sourceId: 'Macbeth',
    quoteId: 'M-guilt-1',
    sampleAnalysis: 'The hyperbole of Neptune\'s ocean emphasises that guilt is inescapable and cosmic in scale.',
    correctAO: 'AO2',
    whyCorrect: 'AO2 — focuses on method (hyperbole) and its effect (emphasis on inescapability).',
  },
  {
    type: 'whichAO',
    id: 'DA-M-2',
    sourceId: 'Macbeth',
    quoteId: 'M-amb-3',
    sampleAnalysis: 'Macbeth wants to hide his ambition from the heavens, which reflects Jacobean beliefs about divine order.',
    correctAO: 'AO3',
    whyCorrect: 'AO3 — links the quote to contextual beliefs about divine order and sin.',
  },
];

const DRILLS_ELIMINATE_WEAK: QuotationDrillEliminateWeak[] = [
  {
    type: 'eliminateWeakQuote',
    id: 'DW-M-1',
    sourceId: 'Macbeth',
    question: 'How does Shakespeare present guilt in the play?',
    quoteOptionIds: ['M-guilt-1', 'M-amb-1', 'M-lady-2', 'M-pow-1'],
    bestQuoteId: 'M-guilt-1',
    whyOthersWeak: 'M-guilt-1 directly addresses guilt with strong method (hyperbole). M-amb-1 is ambition. M-lady-2 is deception. M-pow-1 is evil/witches — not guilt.',
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
  ...DRILLS_FINISH_ANALYSIS,
  ...DRILLS_WHICH_AO,
  ...DRILLS_UPGRADE,
  ...DRILLS_BEST_FIT,
  ...DRILLS_LINK_TWO,
  ...DRILLS_ELIMINATE_WEAK,
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
// FLEXIBLE DEPLOYMENT PROMPTS (Mode 4: argue TWO ideas with one quote)
// ---------------------------------------------------------------------------

export const QUOTATION_FLEXIBLE_DEPLOYMENT_PROMPTS: QuotationFlexibleDeploymentPrompt[] = [
  {
    id: 'FD-M-1',
    sourceId: 'Macbeth',
    quoteId: 'M-guilt-1',
    ideaA: 'Guilt as cosmic punishment',
    ideaB: 'Guilt as loss of masculinity (Lady Macbeth\'s "little hand" contrast)',
    examinerNote: 'Grade 9: one quote, two conceptual angles. Shows flexibility and depth.',
  },
  {
    id: 'FD-M-2',
    sourceId: 'Macbeth',
    quoteId: 'M-amb-1',
    ideaA: 'Ambition as self-destructive force',
    ideaB: 'Ambition as moral blindness',
    examinerNote: 'Grade 9: deploy the metaphor for different arguments.',
  },
];

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

const QUOTES_BY_SOURCE: Record<QuotationLabSourceId, QuotationLabQuote[]> = (() => {
  const map: Record<string, QuotationLabQuote[]> = {
    Macbeth: [],
    AChristmasCarol: [],
    JekyllHyde: [],
    AnInspectorCalls: [],
    Ozymandias: [],
    London: [],
    Exposure: [],
    CheckingOutMeHistory: [],
    Kamikaze: [],
    BayonetCharge: [],
  };
  for (const q of QUOTATION_LAB_QUOTES) {
    if (map[q.sourceId]) map[q.sourceId].push(q);
  }
  return map as Record<QuotationLabSourceId, QuotationLabQuote[]>;
})();

const DRILLS_BY_SOURCE: Record<QuotationLabSourceId, QuotationDrillItem[]> = (() => {
  const map: Record<string, QuotationDrillItem[]> = {
    Macbeth: [],
    AChristmasCarol: [],
    JekyllHyde: [],
    AnInspectorCalls: [],
    Ozymandias: [],
    London: [],
    Exposure: [],
    CheckingOutMeHistory: [],
    Kamikaze: [],
    BayonetCharge: [],
  };
  for (const d of QUOTATION_LAB_DRILLS) {
    if (map[d.sourceId]) map[d.sourceId].push(d);
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

export function getFlexibleDeploymentPromptsBySource(sourceId: QuotationLabSourceId): QuotationFlexibleDeploymentPrompt[] {
  return QUOTATION_FLEXIBLE_DEPLOYMENT_PROMPTS.filter(p => p.sourceId === sourceId);
}

/** Set texts (plays/novels) for "By Text" route */
export const QUOTATION_LAB_TEXT_SOURCE_IDS: QuotationLabSourceId[] = [
  'Macbeth',
  'AChristmasCarol',
  'JekyllHyde',
  'AnInspectorCalls',
];
/** Poetry cluster sources for "By Poetry Cluster" route */
export const QUOTATION_LAB_POETRY_SOURCE_IDS: QuotationLabSourceId[] = [
  'Ozymandias',
  'London',
  'Exposure',
  'BayonetCharge',
  'CheckingOutMeHistory',
  'Kamikaze',
];
/** All sources (texts + poetry) */
export const QUOTATION_LAB_SOURCE_IDS: QuotationLabSourceId[] = [
  ...QUOTATION_LAB_TEXT_SOURCE_IDS,
  ...QUOTATION_LAB_POETRY_SOURCE_IDS,
];

// ---------------------------------------------------------------------------
// POETRY CLUSTER (Power & Conflict)
// ---------------------------------------------------------------------------

export const CLUSTER_SOURCES: Record<QuotationLabClusterId, QuotationLabSourceId[]> = {
  PowerAndConflict: [
    'Ozymandias',
    'London',
    'Exposure',
    'BayonetCharge',
    'CheckingOutMeHistory',
    'Kamikaze',
  ],
};

export function getQuotationLabClusterLabel(clusterId: QuotationLabClusterId): string {
  return clusterId === 'PowerAndConflict' ? 'Power & Conflict' : clusterId;
}

// ---------------------------------------------------------------------------
// THEMES (entry route)
// ---------------------------------------------------------------------------

const THEME_TO_SOURCE_IDS: Record<QuotationLabThemeId, QuotationLabSourceId[]> = {
  power: ['Macbeth', 'Ozymandias', 'London'],
  guilt: ['Macbeth'],
  identity: ['Ozymandias', 'London'],
  responsibility: ['Macbeth'],
};

export const QUOTATION_LAB_THEME_IDS: QuotationLabThemeId[] = ['power', 'guilt', 'identity', 'responsibility'];

export function getQuotationLabThemeLabel(themeId: QuotationLabThemeId): string {
  const labels: Record<QuotationLabThemeId, string> = {
    power: 'Power',
    guilt: 'Guilt',
    identity: 'Identity',
    responsibility: 'Responsibility',
  };
  return labels[themeId] ?? themeId;
}

export function getQuotationLabQuotesByTheme(themeId: QuotationLabThemeId): QuotationLabQuote[] {
  return QUOTATION_LAB_QUOTES.filter(q =>
    q.themes.some(t => t.toLowerCase() === themeId || t.toLowerCase().includes(themeId))
  );
}

// ---------------------------------------------------------------------------
// EXAM MODE — strategic quote hints (2–3 per task)
// Wired to GuidePost: quotes used in Grade 8/9 models become priority quotes.
// ---------------------------------------------------------------------------

const TASK_TO_STRATEGIC_QUOTES: Record<string, string[]> = {
  // Ozymandias — power
  'P-S01': ['Ozy-1', 'OZY-POW-01', 'OZY-TIME-01'],
  // Macbeth — guilt
  'M-03': ['M-guilt-1', 'MAC-GUILT-01', 'MAC-GUILT-02'],
  // Exposure & Bayonet Charge — conflict
  'P-C02': ['Exp-1', 'EXP-CON-01', 'BC-FEAR-01'],
  // Identity comparison — Checking Out Me History & Kamikaze
  'P-C03': ['COMH-ID-01', 'COMH-ID-02', 'KAM-ID-02'],
  // A Christmas Carol
  'ACC-01': ['ACC-SELF-01', 'ACC-SOC-01'],
  'ACC-02': ['ACC-RED-01', 'ACC-SELF-01'],
  'ACC-03': ['ACC-SELF-01', 'ACC-SOC-01'],
  // Jekyll & Hyde
  'JH-01': ['JH-HYDE-01', 'JH-DUAL-01'],
  'JH-02': ['JH-DUAL-01', 'JH-HYDE-01'],
  // An Inspector Calls
  'AIC-01': ['AIC-RESP-01', 'AIC-POW-01'],
  'AIC-02': ['AIC-RESP-01', 'AIC-POW-01'],
};

/** Priority quotes for exam mode — aligned with GuidePost Grade 8/9 model answers. */
export function getStrategicQuotesForTask(taskId: string): QuotationLabQuote[] {
  const quoteIds = TASK_TO_STRATEGIC_QUOTES[taskId];
  if (!quoteIds) return [];
  return quoteIds
    .map(id => getQuotationLabQuoteById(id))
    .filter((q): q is QuotationLabQuote => q != null);
}

export function hasStrategicQuotesForTask(taskId: string): boolean {
  return (TASK_TO_STRATEGIC_QUOTES[taskId]?.length ?? 0) > 0;
}

// ---------------------------------------------------------------------------
// QUALITY CONTROL (non-negotiable)
// ---------------------------------------------------------------------------

export type QuoteValidationResult = { valid: boolean; errors: string[] };

/** A quote cannot be added unless: 2+ themes, Grade 9 insight, top-band suitable */
export function validateQuoteForQuality(q: Partial<QuotationLabQuote>): QuoteValidationResult {
  const errors: string[] = [];
  if (!q.themes || q.themes.length < 2) {
    errors.push('Quote must support 2+ themes');
  }
  if (!q.grade9Insight && !q.deploymentTip) {
    errors.push('Quote must have a Grade 9 insight or deployment tip');
  }
  if (!q.meaning || !q.contextHook) {
    errors.push('Quote must have core meaning and context hook (top-band suitable)');
  }
  return { valid: errors.length === 0, errors };
}

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

export function getQuotationLabSourceLabel(sourceId: QuotationLabSourceId): string {
  const labels: Record<QuotationLabSourceId, string> = {
    Macbeth: 'Macbeth',
    AChristmasCarol: 'A Christmas Carol',
    JekyllHyde: 'Jekyll & Hyde',
    AnInspectorCalls: 'An Inspector Calls',
    Ozymandias: 'Ozymandias',
    London: 'London',
    Exposure: 'Exposure',
    BayonetCharge: 'Bayonet Charge',
    CheckingOutMeHistory: 'Checking Out Me History',
    Kamikaze: 'Kamikaze',
  };
  return labels[sourceId] ?? sourceId;
}

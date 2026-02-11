/**
 * History Hub – Thematic study content (AA Health, BB Power, AC Migration)
 * Paper 2 Section A – uses Source Lab (AO3) and factor essays
 */

import { getHistoryOptionKey } from '../types/historyHub';
import type { TimelineEvent, HistoryKeyTerm, HistoryConceptCard, HistoryQuickCheckItem, HistorySourceSet, HistoryQuestionLabItem } from '../types/historyHub';

const TH_AA = getHistoryOptionKey('thematic', 'AA'); // Health
const TH_BB = getHistoryOptionKey('thematic', 'BB'); // Power
const TH_AC = getHistoryOptionKey('thematic', 'AC'); // Migration

// ============================================================================
// T-AA: Britain: Health and the people c1000–present
// ============================================================================

export const THEMATIC_AA_TIMELINE: TimelineEvent[] = [
  { id: 'T-AA-1-med', optionKey: TH_AA, partId: 'T-AA-1', date: 'c1000–1500', title: 'Medicine stands still', description: 'Hippocratic/Galenic ideas, Church control, Islamic medicine preserved knowledge. Surgery basic; Black Death.', order: 1 },
  { id: 'T-AA-1-1348', optionKey: TH_AA, partId: 'T-AA-1', date: '1348', title: 'Black Death', description: 'Plague killed millions. Galenic medicine could not explain or cure.', order: 2 },
  { id: 'T-AA-2-1543', optionKey: TH_AA, partId: 'T-AA-2', date: '1543', title: 'Vesalius – Fabric of the Human Body', description: 'Challenged Galen; accurate anatomy through dissection.', order: 3 },
  { id: 'T-AA-2-1628', optionKey: TH_AA, partId: 'T-AA-2', date: '1628', title: 'Harvey – circulation of blood', description: 'Proved blood circulates; heart as pump.', order: 4 },
  { id: 'T-AA-2-1540s', optionKey: TH_AA, partId: 'T-AA-2', date: '1540s', title: 'Paré – ligatures', description: 'Surgeon used ligatures instead of cauterisation; improved wounds.', order: 5 },
  { id: 'T-AA-2-1796', optionKey: TH_AA, partId: 'T-AA-2', date: '1796', title: 'Jenner – vaccination', description: 'Smallpox vaccine using cowpox. Beginning of immunisation.', order: 6 },
  { id: 'T-AA-3-1861', optionKey: TH_AA, partId: 'T-AA-3', date: '1861', title: 'Germ Theory – Pasteur', description: 'Pasteur proved germs cause disease. Revolutionised medicine.', order: 7 },
  { id: 'T-AA-3-1867', optionKey: TH_AA, partId: 'T-AA-3', date: '1867', title: 'Lister – antiseptic surgery', description: 'Carbolic acid to prevent infection. Surgery safer.', order: 8 },
  { id: 'T-AA-3-1848', optionKey: TH_AA, partId: 'T-AA-3', date: '1848', title: 'Public Health Act', description: 'First Public Health Act; limited impact.', order: 9 },
  { id: 'T-AA-3-1875', optionKey: TH_AA, partId: 'T-AA-3', date: '1875', title: 'Public Health Act', description: 'Forced councils to provide clean water, sewerage.', order: 10 },
  { id: 'T-AA-4-1928', optionKey: TH_AA, partId: 'T-AA-4', date: '1928', title: 'Fleming – penicillin', description: 'Discovered penicillin. Developed in WWII.', order: 11 },
  { id: 'T-AA-4-1942', optionKey: TH_AA, partId: 'T-AA-4', date: '1942', title: 'Beveridge Report', description: 'Proposed welfare state. "Five giants": want, disease, ignorance, squalor, idleness.', order: 12 },
  { id: 'T-AA-4-1948', optionKey: TH_AA, partId: 'T-AA-4', date: '1948', title: 'NHS established', description: 'Free healthcare for all. Major reform.', order: 13 },
];

export const THEMATIC_AA_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'T-AA-kt1', optionKey: TH_AA, partId: 'T-AA-1', term: 'Four Humours', definition: 'Galen\'s theory: body balance of blood, phlegm, yellow bile, black bile.', dateOrContext: 'Medieval' },
  { id: 'T-AA-kt2', optionKey: TH_AA, partId: 'T-AA-1', term: 'Black Death', definition: '1348 plague; killed millions; Galenic medicine failed.', dateOrContext: '1348' },
  { id: 'T-AA-kt3', optionKey: TH_AA, partId: 'T-AA-2', term: 'Vesalius', definition: 'Renaissance anatomist; challenged Galen.', dateOrContext: '1543' },
  { id: 'T-AA-kt4', optionKey: TH_AA, partId: 'T-AA-2', term: 'Harvey', definition: 'Discovered circulation of blood.', dateOrContext: '1628' },
  { id: 'T-AA-kt5', optionKey: TH_AA, partId: 'T-AA-2', term: 'Jenner', definition: 'Developed smallpox vaccination.', dateOrContext: '1796' },
  { id: 'T-AA-kt6', optionKey: TH_AA, partId: 'T-AA-3', term: 'Germ Theory', definition: 'Pasteur/Koch: germs cause disease.', dateOrContext: '1861 onwards' },
  { id: 'T-AA-kt7', optionKey: TH_AA, partId: 'T-AA-3', term: 'Lister', definition: 'Pioneered antiseptic surgery.', dateOrContext: '1867' },
  { id: 'T-AA-kt8', optionKey: TH_AA, partId: 'T-AA-3', term: 'Pasteur', definition: 'Developed Germ Theory; pasteurisation.', dateOrContext: '1861' },
  { id: 'T-AA-kt9', optionKey: TH_AA, partId: 'T-AA-4', term: 'Penicillin', definition: 'Fleming discovered; mass-produced in WWII.', dateOrContext: '1928/1940s' },
  { id: 'T-AA-kt10', optionKey: TH_AA, partId: 'T-AA-4', term: 'NHS', definition: 'National Health Service; free healthcare from 1948.', dateOrContext: '1948' },
  { id: 'T-AA-kt11', optionKey: TH_AA, partId: 'T-AA-4', term: 'Beveridge Report', definition: '1942; proposed welfare state; led to NHS.', dateOrContext: '1942' },
];

export const THEMATIC_AA_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'T-AA-src1',
    optionKey: TH_AA,
    partId: 'T-AA-2',
    sources: [
      { id: 's1', type: 'written', content: 'I have found that Galen was wrong in many of his observations. The human body must be studied by dissection, not by reading ancient texts.', provenance: 'Andreas Vesalius, 1543.' },
    ],
    question: 'How useful is this source for understanding the Renaissance influence on medicine?',
    markSchemeSummary: 'Content: challenge to Galen. Provenance: Vesalius. Context: Renaissance, anatomy. Limitation: one figure.',
  },
  {
    id: 'T-AA-src2',
    optionKey: TH_AA,
    partId: 'T-AA-3',
    sources: [
      { id: 's1', type: 'written', content: 'The great object was to exclude the atmospheric air from the wound. I applied carbolic acid and the results were remarkable – no infection.', provenance: 'Joseph Lister, 1867.' },
    ],
    question: 'How useful is this source for understanding advances in surgery in the 19th century?',
    markSchemeSummary: 'Content: antiseptic method. Provenance: Lister himself. Context: Germ Theory, surgery. Limitation: doesn\'t show opposition or full impact.',
  },
  {
    id: 'T-AA-src3',
    optionKey: TH_AA,
    partId: 'T-AA-4',
    sources: [
      { id: 's1', type: 'written', content: 'Looking at the nation as a whole, I see five giants that need to be slain: want, disease, ignorance, squalor, and idleness.', provenance: 'Beveridge Report, 1942.' },
    ],
    question: 'How useful is this source for understanding the creation of the NHS?',
    markSchemeSummary: 'Content: welfare state vision. Provenance: Beveridge. Context: WW2, reform. Limitation: proposal; doesn\'t show opposition.',
  },
];

export const THEMATIC_AA_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'T-AA-cc1', optionKey: TH_AA, partId: 'T-AA-1', prompt: 'Why did medicine change so slowly in the Middle Ages?', conceptType: 'cause', modelAnswer: 'Church discouraged dissection; Galen was authority; no scientific method; belief in humours; lack of communication.' },
  { id: 'T-AA-cc2', optionKey: TH_AA, partId: 'T-AA-2', prompt: 'How did the Renaissance change medicine?', conceptType: 'change', modelAnswer: 'Vesalius challenged Galen; Harvey proved circulation; Paré improved surgery; printing spread ideas; observation over authority.' },
  { id: 'T-AA-cc3', optionKey: TH_AA, partId: 'T-AA-3', prompt: 'How did the Germ Theory change the way doctors understood disease?', conceptType: 'change', modelAnswer: 'Before: ideas of miasma, humours. After: specific germs cause specific diseases; could prevent and treat. Led to antiseptic surgery, vaccines, public health.' },
  { id: 'T-AA-cc4', optionKey: TH_AA, partId: 'T-AA-3', prompt: 'What were the consequences of the Germ Theory for surgery?', conceptType: 'consequence', modelAnswer: 'Lister\'s antiseptics; fewer infections; surgery safer; longer operations; aseptic surgery. Led to development of modern surgery.' },
  { id: 'T-AA-cc5', optionKey: TH_AA, partId: 'T-AA-4', prompt: 'How significant was war in the development of medicine?', conceptType: 'significance', modelAnswer: 'Very significant: WW1 (blood transfusion, plastic surgery); WW2 (penicillin, trauma). But: also peacetime (Beveridge, NHS). War accelerated; didn\'t always start.' },
];

export const THEMATIC_AA_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'T-AA-qc1', optionKey: TH_AA, partId: 'T-AA-1', type: 'multipleChoice', question: 'What theory did Galen use to explain disease?', options: ['Germ Theory', 'Four Humours', 'Miasma', 'Evolution'], correctAnswer: 'Four Humours', feedback: { correct: 'Correct.', incorrect: 'Four Humours.' } },
  { id: 'T-AA-qc2', optionKey: TH_AA, partId: 'T-AA-2', type: 'multipleChoice', question: 'Who developed the smallpox vaccine?', options: ['Pasteur', 'Jenner', 'Lister', 'Koch'], correctAnswer: 'Jenner', feedback: { correct: 'Correct.', incorrect: 'Edward Jenner developed the smallpox vaccine in 1796.' } },
  { id: 'T-AA-qc3', optionKey: TH_AA, partId: 'T-AA-2', type: 'shortAnswer', question: 'Who proved that blood circulates?', correctAnswer: 'Harvey', feedback: { correct: 'Correct.', incorrect: 'William Harvey.' } },
  { id: 'T-AA-qc4', optionKey: TH_AA, partId: 'T-AA-3', type: 'multipleChoice', question: 'Who pioneered antiseptic surgery?', options: ['Pasteur', 'Jenner', 'Lister', 'Koch'], correctAnswer: 'Lister', feedback: { correct: 'Correct.', incorrect: 'Joseph Lister.' } },
  { id: 'T-AA-qc5', optionKey: TH_AA, partId: 'T-AA-4', type: 'shortAnswer', question: 'In which year was the NHS established?', correctAnswer: '1948', feedback: { correct: 'Correct.', incorrect: 'The NHS was established in 1948.' } },
  { id: 'T-AA-qc6', optionKey: TH_AA, partId: 'T-AA-4', type: 'shortAnswer', question: 'Who discovered penicillin?', correctAnswer: 'Fleming', feedback: { correct: 'Correct.', incorrect: 'Alexander Fleming.' } },
];

export const THEMATIC_AA_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'T-AA-ql1', optionKey: TH_AA, partId: 'T-AA-1', questionType: 'describe', question: 'Describe two key features of medieval medicine.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'T-AA-ql2', optionKey: TH_AA, partId: 'T-AA-3', questionType: 'explain', question: 'In what ways did the Germ Theory change medicine? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'T-AA-ql3', optionKey: TH_AA, partId: 'T-AA-4', questionType: 'account', question: 'Write an account of the creation of the NHS.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'T-AA-ql4', optionKey: TH_AA, partId: 'T-AA-4', questionType: 'factorEssay', question: 'War was the most important factor in the development of medicine. How far do you agree?', questionFactor: 'War', markSchemeSummary: 'Factor essay. Consider war, science, government, individuals. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// T-BB: Britain: Power and the people c1170–present
// ============================================================================

export const THEMATIC_BB_TIMELINE: TimelineEvent[] = [
  { id: 'T-BB-1-1215', optionKey: TH_BB, partId: 'T-BB-1', date: '1215', title: 'Magna Carta', description: 'King John forced to accept limits on power. Rule of law.', order: 1 },
  { id: 'T-BB-1-1265', optionKey: TH_BB, partId: 'T-BB-1', date: '1265', title: 'Simon de Montfort\'s Parliament', description: 'First Parliament including knights and burgesses.', order: 2 },
  { id: 'T-BB-1-1381', optionKey: TH_BB, partId: 'T-BB-1', date: '1381', title: 'Peasants\' Revolt', description: 'Wat Tyler; poll tax; demands for freedom and equality.', order: 3 },
  { id: 'T-BB-2-1536', optionKey: TH_BB, partId: 'T-BB-2', date: '1536', title: 'Pilgrimage of Grace', description: 'Rebellion against Henry VIII\'s religious changes.', order: 4 },
  { id: 'T-BB-2-1642', optionKey: TH_BB, partId: 'T-BB-2', date: '1642', title: 'English Civil War', description: 'Parliament vs King Charles I. Cromwell; execution of Charles 1649.', order: 5 },
  { id: 'T-BB-3-1832', optionKey: TH_BB, partId: 'T-BB-3', date: '1832', title: 'Great Reform Act', description: 'Extended franchise; more men could vote.', order: 6 },
  { id: 'T-BB-3-1838', optionKey: TH_BB, partId: 'T-BB-3', date: '1838', title: 'Chartism', description: 'Working-class movement for political reform. People\'s Charter.', order: 7 },
  { id: 'T-BB-3-1833', optionKey: TH_BB, partId: 'T-BB-3', date: '1833', title: 'Factory Act', description: 'Limits on child labour. Social reform.', order: 8 },
  { id: 'T-BB-4-1903', optionKey: TH_BB, partId: 'T-BB-4', date: '1903', title: 'WSPU founded', description: 'Suffragettes; Pankhursts. Militant campaign for votes for women.', order: 9 },
  { id: 'T-BB-4-1928', optionKey: TH_BB, partId: 'T-BB-4', date: '1928', title: 'Equal franchise', description: 'Women over 21 could vote. Equal with men.', order: 10 },
];

export const THEMATIC_BB_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'T-BB-kt1', optionKey: TH_BB, partId: 'T-BB-1', term: 'Magna Carta', definition: '1215 charter limiting royal power; rule of law.', dateOrContext: '1215' },
  { id: 'T-BB-kt2', optionKey: TH_BB, partId: 'T-BB-1', term: 'Peasants\' Revolt', definition: '1381; Wat Tyler; poll tax; demands for freedom.', dateOrContext: '1381' },
  { id: 'T-BB-kt3', optionKey: TH_BB, partId: 'T-BB-2', term: 'English Civil War', definition: '1642–49: Parliament vs Charles I.', dateOrContext: '1642' },
  { id: 'T-BB-kt4', optionKey: TH_BB, partId: 'T-BB-2', term: 'Oliver Cromwell', definition: 'Parliamentarian leader; Lord Protector after Charles executed.', dateOrContext: '1640s' },
  { id: 'T-BB-kt5', optionKey: TH_BB, partId: 'T-BB-3', term: 'Great Reform Act', definition: '1832; extended franchise.', dateOrContext: '1832' },
  { id: 'T-BB-kt6', optionKey: TH_BB, partId: 'T-BB-3', term: 'Chartism', definition: 'Working-class movement for political reform.', dateOrContext: '1838' },
  { id: 'T-BB-kt7', optionKey: TH_BB, partId: 'T-BB-3', term: 'Tolpuddle Martyrs', definition: '1834; union activists transported; sparked protest.', dateOrContext: '1834' },
  { id: 'T-BB-kt8', optionKey: TH_BB, partId: 'T-BB-4', term: 'Suffragettes', definition: 'WSPU; militant campaign for votes for women.', dateOrContext: '1903' },
  { id: 'T-BB-kt9', optionKey: TH_BB, partId: 'T-BB-4', term: 'Suffragists', definition: 'NUWSS; peaceful campaign for votes for women.', dateOrContext: '1897' },
  { id: 'T-BB-kt10', optionKey: TH_BB, partId: 'T-BB-4', term: 'General Strike', definition: '1926; workers struck in support of miners.', dateOrContext: '1926' },
];

export const THEMATIC_BB_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'T-BB-src1',
    optionKey: TH_BB,
    partId: 'T-BB-2',
    sources: [
      { id: 's1', type: 'written', content: 'I am the martyr of the people. I die for the liberties of England.', provenance: 'Charles I, on the scaffold, 1649.' },
    ],
    question: 'How useful is this source for understanding the English Civil War?',
    markSchemeSummary: 'Content: Charles\' view. Provenance: King. Context: execution, Parliament victory. Limitation: one view; Parliament saw differently.',
  },
  {
    id: 'T-BB-src2',
    optionKey: TH_BB,
    partId: 'T-BB-4',
    sources: [
      { id: 's1', type: 'written', content: 'Deeds not words. We have tried peaceful methods. The government does not listen. We must take direct action to win the vote.', provenance: 'Emmeline Pankhurst, 1912.' },
    ],
    question: 'How useful is this source for understanding the suffragette campaign?',
    markSchemeSummary: 'Content: militant tactics. Provenance: Pankhurst. Context: WSPU, frustration with peaceful methods. Limitation: one perspective.',
  },
];

export const THEMATIC_BB_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'T-BB-cc1', optionKey: TH_BB, partId: 'T-BB-1', prompt: 'How significant was the Magna Carta in limiting royal power?', conceptType: 'significance', modelAnswer: 'Very significant: established principle that king was under law. Later used to justify Parliament\'s rights. But: initially limited impact; often ignored.' },
  { id: 'T-BB-cc2', optionKey: TH_BB, partId: 'T-BB-2', prompt: 'What were the causes of the English Civil War?', conceptType: 'cause', modelAnswer: 'Religion (Charles\' Catholic policies); money (Charles\' need for taxes); Parliament (tension over power); personality (Charles\' belief in divine right).' },
  { id: 'T-BB-cc3', optionKey: TH_BB, partId: 'T-BB-3', prompt: 'How did trade unions challenge power in the 19th century?', conceptType: 'cause', modelAnswer: 'Tolpuddle Martyrs; match girls; dockers. Strike action; collective bargaining. Pressure for reform. Faced opposition (employers, government).' },
  { id: 'T-BB-cc4', optionKey: TH_BB, partId: 'T-BB-4', prompt: 'Why did some women use militant tactics in the campaign for the vote?', conceptType: 'cause', modelAnswer: 'Peaceful methods (suffragists) had failed for decades. Frustration; government ignored. Pankhursts believed direct action was necessary to gain attention.' },
  { id: 'T-BB-cc5', optionKey: TH_BB, partId: 'T-BB-4', prompt: 'How significant was women\'s work in WW1 in gaining the vote?', conceptType: 'significance', modelAnswer: 'Significant: showed women could contribute. Changed attitudes. But: suffragettes suspended campaign; 1918 gave vote to some women; 1928 equal franchise. Multiple factors.' },
];

export const THEMATIC_BB_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'T-BB-qc1', optionKey: TH_BB, partId: 'T-BB-1', type: 'multipleChoice', question: 'In which year was the Magna Carta signed?', options: ['1066', '1215', '1381', '1642'], correctAnswer: '1215', feedback: { correct: 'Correct.', incorrect: 'Magna Carta was signed in 1215.' } },
  { id: 'T-BB-qc2', optionKey: TH_BB, partId: 'T-BB-2', type: 'multipleChoice', question: 'When did the English Civil War begin?', options: ['1640', '1642', '1649', '1660'], correctAnswer: '1642', feedback: { correct: 'Correct.', incorrect: '1642.' } },
  { id: 'T-BB-qc3', optionKey: TH_BB, partId: 'T-BB-3', type: 'shortAnswer', question: 'In which year was the Great Reform Act?', correctAnswer: '1832', feedback: { correct: 'Correct.', incorrect: '1832.' } },
  { id: 'T-BB-qc4', optionKey: TH_BB, partId: 'T-BB-4', type: 'shortAnswer', question: 'In which year did women gain equal voting rights with men?', correctAnswer: '1928', feedback: { correct: 'Correct.', incorrect: 'Women gained equal franchise in 1928.' } },
  { id: 'T-BB-qc5', optionKey: TH_BB, partId: 'T-BB-4', type: 'multipleChoice', question: 'Who led the suffragettes?', options: ['Millicent Fawcett', 'Emmeline Pankhurst', 'Emily Davison', 'Queen Victoria'], correctAnswer: 'Emmeline Pankhurst', feedback: { correct: 'Correct.', incorrect: 'Emmeline Pankhurst.' } },
];

export const THEMATIC_BB_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'T-BB-ql1', optionKey: TH_BB, partId: 'T-BB-1', questionType: 'describe', question: 'Describe two key features of the Magna Carta.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'T-BB-ql2', optionKey: TH_BB, partId: 'T-BB-3', questionType: 'explain', question: 'In what ways did the Great Reform Act change British politics? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'T-BB-ql3', optionKey: TH_BB, partId: 'T-BB-4', questionType: 'account', question: 'Write an account of the campaign for women\'s suffrage.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'T-BB-ql4', optionKey: TH_BB, partId: 'T-BB-4', questionType: 'factorEssay', question: 'The main reason women gained the vote was their work in the First World War. How far do you agree?', questionFactor: 'Work in WW1', markSchemeSummary: 'Factor essay. Consider WW1, suffragettes, suffragists, changing attitudes. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// T-AC: Britain: Migration, empires and the people c790–present
// ============================================================================

export const THEMATIC_AC_TIMELINE: TimelineEvent[] = [
  { id: 'T-AC-1-790s', optionKey: TH_AC, partId: 'T-AC-1', date: 'c790', title: 'Viking invasions', description: 'Vikings raided and settled. Danelaw. Impact on England.', order: 1 },
  { id: 'T-AC-1-1066', optionKey: TH_AC, partId: 'T-AC-1', date: '1066', title: 'Norman Conquest', description: 'William of Normandy. Feudalism, Domesday, consolidation.', order: 2 },
  { id: 'T-AC-2-1600s', optionKey: TH_AC, partId: 'T-AC-2', date: '17th century', title: 'Slave trade', description: 'Atlantic slave trade. Britain\'s role. Caribbean plantations.', order: 3 },
  { id: 'T-AC-2-1607', optionKey: TH_AC, partId: 'T-AC-2', date: '1607', title: 'Jamestown', description: 'First permanent English settlement in North America.', order: 4 },
  { id: 'T-AC-2-1685', optionKey: TH_AC, partId: 'T-AC-2', date: '1685', title: 'Huguenots', description: 'French Protestants fled to Britain. Silk, banking.', order: 5 },
  { id: 'T-AC-3-1857', optionKey: TH_AC, partId: 'T-AC-3', date: '1857', title: 'Indian Mutiny', description: 'Revolt against British rule. EIC rule ended; Crown took over.', order: 6 },
  { id: 'T-AC-3-1899', optionKey: TH_AC, partId: 'T-AC-3', date: '1899', title: 'Boer War', description: 'Britain vs Boers in South Africa. Concentration camps.', order: 7 },
  { id: 'T-AC-4-1948', optionKey: TH_AC, partId: 'T-AC-4', date: '1948', title: 'Windrush', description: 'SS Empire Windrush brought Caribbean migrants. Start of post-war migration.', order: 8 },
  { id: 'T-AC-4-1960s', optionKey: TH_AC, partId: 'T-AC-4', date: '1960s–70s', title: 'End of empire', description: 'Decolonisation. Commonwealth. New migration patterns.', order: 9 },
];

export const THEMATIC_AC_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'T-AC-kt1', optionKey: TH_AC, partId: 'T-AC-1', term: 'Danelaw', definition: 'Area of England under Viking control.', dateOrContext: '9th–10th century' },
  { id: 'T-AC-kt2', optionKey: TH_AC, partId: 'T-AC-1', term: 'Norman Conquest', definition: '1066; William of Normandy; feudalism.', dateOrContext: '1066' },
  { id: 'T-AC-kt3', optionKey: TH_AC, partId: 'T-AC-2', term: 'Atlantic slave trade', definition: 'Forced transport of Africans to Americas.', dateOrContext: '16th–19th century' },
  { id: 'T-AC-kt4', optionKey: TH_AC, partId: 'T-AC-2', term: 'Huguenots', definition: 'French Protestants who fled to Britain.', dateOrContext: '1685' },
  { id: 'T-AC-kt5', optionKey: TH_AC, partId: 'T-AC-2', term: 'Jamestown', definition: '1607; first permanent English settlement in North America.', dateOrContext: '1607' },
  { id: 'T-AC-kt6', optionKey: TH_AC, partId: 'T-AC-3', term: 'EIC', definition: 'East India Company; ruled India before Crown.', dateOrContext: '1600–1858' },
  { id: 'T-AC-kt7', optionKey: TH_AC, partId: 'T-AC-3', term: 'Indian Mutiny', definition: '1857 revolt; led to Crown rule.', dateOrContext: '1857' },
  { id: 'T-AC-kt8', optionKey: TH_AC, partId: 'T-AC-4', term: 'Windrush', definition: '1948 ship; symbol of Caribbean migration to Britain.', dateOrContext: '1948' },
  { id: 'T-AC-kt9', optionKey: TH_AC, partId: 'T-AC-4', term: 'Commonwealth', definition: 'Association of former British colonies.', dateOrContext: '20th century' },
  { id: 'T-AC-kt10', optionKey: TH_AC, partId: 'T-AC-4', term: 'Decolonisation', definition: 'End of empire; colonies gained independence.', dateOrContext: '1940s–60s' },
];

export const THEMATIC_AC_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'T-AC-src1',
    optionKey: TH_AC,
    partId: 'T-AC-2',
    sources: [
      { id: 's1', type: 'written', content: 'The wealth of this nation was built on the labour of those transported from Africa. Without the plantations, our ports and industries would not have prospered.', provenance: 'A British merchant, 1780s.' },
    ],
    question: 'How useful is this source for understanding Britain\'s involvement in the slave trade?',
    markSchemeSummary: 'Content: economic benefit. Provenance: merchant. Context: slave trade, plantations. Limitation: doesn\'t show abolition movement.',
  },
  {
    id: 'T-AC-src2',
    optionKey: TH_AC,
    partId: 'T-AC-4',
    sources: [
      { id: 's1', type: 'written', content: 'We were invited to come to Britain. We fought for the mother country in the war. Now we are told we don\'t belong. We belong here.', provenance: 'A Caribbean migrant, 1960s.' },
    ],
    question: 'How useful is this source for understanding the experiences of post-war migrants to Britain?',
    markSchemeSummary: 'Content: invitation, war service, rejection. Provenance: migrant. Context: Windrush, racism. Limitation: one perspective.',
  },
];

export const THEMATIC_AC_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'T-AC-cc1', optionKey: TH_AC, partId: 'T-AC-2', prompt: 'What were the consequences of the slave trade for Britain?', conceptType: 'consequence', modelAnswer: 'Economic: ports, industry, wealth. Social: racism; divisions. Cultural: African influences. Empire: colonies, plantations.' },
  { id: 'T-AC-cc2', optionKey: TH_AC, partId: 'T-AC-3', prompt: 'How did the British Empire affect migration?', conceptType: 'cause', modelAnswer: 'Colonisation brought British to colonies. Colonies brought workers to Britain. EIC, trade, administration. Two-way flow.' },
  { id: 'T-AC-cc3', optionKey: TH_AC, partId: 'T-AC-4', prompt: 'What were the causes of migration to Britain after 1945?', conceptType: 'cause', modelAnswer: 'Labour shortage; government invited workers. Empire/Commonwealth links. Refugees. Push factors: poverty, discrimination abroad.' },
  { id: 'T-AC-cc4', optionKey: TH_AC, partId: 'T-AC-4', prompt: 'What were the experiences of post-war migrants to Britain?', conceptType: 'consequence', modelAnswer: 'Mixed: work, contribution; but racism, discrimination, housing. Windrush generation; later immigration laws. Assimilation vs multiculturalism.' },
];

export const THEMATIC_AC_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'T-AC-qc1', optionKey: TH_AC, partId: 'T-AC-1', type: 'multipleChoice', question: 'What was the Danelaw?', options: ['French territory', 'Viking area of England', 'Irish colony', 'Scottish land'], correctAnswer: 'Viking area of England', feedback: { correct: 'Correct.', incorrect: 'Area of England under Viking control.' } },
  { id: 'T-AC-qc2', optionKey: TH_AC, partId: 'T-AC-2', type: 'multipleChoice', question: 'Who were the Huguenots?', options: ['Viking settlers', 'French Protestants', 'Slave traders', 'Indian rulers'], correctAnswer: 'French Protestants', feedback: { correct: 'Correct.', incorrect: 'Huguenots were French Protestants who fled to Britain.' } },
  { id: 'T-AC-qc3', optionKey: TH_AC, partId: 'T-AC-3', type: 'shortAnswer', question: 'In which year was the Indian Mutiny?', correctAnswer: '1857', feedback: { correct: 'Correct.', incorrect: '1857.' } },
  { id: 'T-AC-qc4', optionKey: TH_AC, partId: 'T-AC-4', type: 'shortAnswer', question: 'Which ship symbolises post-war Caribbean migration to Britain?', correctAnswer: 'Windrush', feedback: { correct: 'Correct.', incorrect: 'SS Empire Windrush.' } },
];


export const THEMATIC_AC_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'T-AC-ql1', optionKey: TH_AC, partId: 'T-AC-1', questionType: 'describe', question: 'Describe two key features of Viking settlement in England.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'T-AC-ql2', optionKey: TH_AC, partId: 'T-AC-2', questionType: 'explain', question: 'In what ways did the slave trade affect Britain? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'T-AC-ql3', optionKey: TH_AC, partId: 'T-AC-4', questionType: 'account', question: 'Write an account of migration to Britain after the Second World War.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'T-AC-ql4', optionKey: TH_AC, partId: 'T-AC-4', questionType: 'factorEssay', question: 'Empire was the most important factor in migration to Britain. How far do you agree?', questionFactor: 'Empire', markSchemeSummary: 'Factor essay. Consider empire, labour shortage, Commonwealth, EU. AO1 + AO2 + SPaG.' },
];

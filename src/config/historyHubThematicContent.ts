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
  { id: 'T-AA-2-1543', optionKey: TH_AA, partId: 'T-AA-2', date: '1543', title: 'Vesalius – Fabric of the Human Body', description: 'Challenged Galen; accurate anatomy through dissection.', order: 2 },
  { id: 'T-AA-2-1628', optionKey: TH_AA, partId: 'T-AA-2', date: '1628', title: 'Harvey – circulation of blood', description: 'Proved blood circulates; heart as pump.', order: 3 },
  { id: 'T-AA-2-1796', optionKey: TH_AA, partId: 'T-AA-2', date: '1796', title: 'Jenner – vaccination', description: 'Smallpox vaccine using cowpox. Beginning of immunisation.', order: 4 },
  { id: 'T-AA-3-1861', optionKey: TH_AA, partId: 'T-AA-3', date: '1861', title: 'Germ Theory – Pasteur', description: 'Pasteur proved germs cause disease. Revolutionised medicine.', order: 5 },
  { id: 'T-AA-3-1867', optionKey: TH_AA, partId: 'T-AA-3', date: '1867', title: 'Lister – antiseptic surgery', description: 'Carbolic acid to prevent infection. Surgery safer.', order: 6 },
  { id: 'T-AA-3-1875', optionKey: TH_AA, partId: 'T-AA-3', date: '1875', title: 'Public Health Act', description: 'Forced councils to provide clean water, sewerage.', order: 7 },
  { id: 'T-AA-4-1928', optionKey: TH_AA, partId: 'T-AA-4', date: '1928', title: 'Fleming – penicillin', description: 'Discovered penicillin. Developed in WWII.', order: 8 },
  { id: 'T-AA-4-1942', optionKey: TH_AA, partId: 'T-AA-4', date: '1942', title: 'Beveridge Report', description: 'Proposed welfare state. "Five giants": want, disease, ignorance, squalor, idleness.', order: 9 },
  { id: 'T-AA-4-1948', optionKey: TH_AA, partId: 'T-AA-4', date: '1948', title: 'NHS established', description: 'Free healthcare for all. Major reform.', order: 10 },
];

export const THEMATIC_AA_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'T-AA-kt1', optionKey: TH_AA, partId: 'T-AA-1', term: 'Four Humours', definition: 'Galen\'s theory: body balance of blood, phlegm, yellow bile, black bile.', dateOrContext: 'Medieval' },
  { id: 'T-AA-kt2', optionKey: TH_AA, partId: 'T-AA-2', term: 'Vesalius', definition: 'Renaissance anatomist; challenged Galen.', dateOrContext: '1543' },
  { id: 'T-AA-kt3', optionKey: TH_AA, partId: 'T-AA-2', term: 'Jenner', definition: 'Developed smallpox vaccination.', dateOrContext: '1796' },
  { id: 'T-AA-kt4', optionKey: TH_AA, partId: 'T-AA-3', term: 'Germ Theory', definition: 'Pasteur/Koch: germs cause disease.', dateOrContext: '1861 onwards' },
  { id: 'T-AA-kt5', optionKey: TH_AA, partId: 'T-AA-3', term: 'Lister', definition: 'Pioneered antiseptic surgery.', dateOrContext: '1867' },
  { id: 'T-AA-kt6', optionKey: TH_AA, partId: 'T-AA-4', term: 'Penicillin', definition: 'Fleming discovered; mass-produced in WWII.', dateOrContext: '1928/1940s' },
  { id: 'T-AA-kt7', optionKey: TH_AA, partId: 'T-AA-4', term: 'NHS', definition: 'National Health Service; free healthcare from 1948.', dateOrContext: '1948' },
];

export const THEMATIC_AA_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'T-AA-src1',
    optionKey: TH_AA,
    partId: 'T-AA-3',
    sources: [
      { id: 's1', type: 'written', content: 'The great object was to exclude the atmospheric air from the wound. I applied carbolic acid and the results were remarkable – no infection.', provenance: 'Joseph Lister, 1867.' },
    ],
    question: 'How useful is this source for understanding advances in surgery in the 19th century?',
    markSchemeSummary: 'Content: antiseptic method. Provenance: Lister himself. Context: Germ Theory, surgery. Limitation: doesn\'t show opposition or full impact.',
  },
];

export const THEMATIC_AA_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'T-AA-cc1', optionKey: TH_AA, partId: 'T-AA-3', prompt: 'How did the Germ Theory change the way doctors understood disease?', conceptType: 'change', modelAnswer: 'Before: ideas of miasma, humours. After: specific germs cause specific diseases; could prevent and treat. Led to antiseptic surgery, vaccines, public health.' },
];

export const THEMATIC_AA_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'T-AA-qc1', optionKey: TH_AA, partId: 'T-AA-2', type: 'multipleChoice', question: 'Who developed the smallpox vaccine?', options: ['Pasteur', 'Jenner', 'Lister', 'Koch'], correctAnswer: 'Jenner', feedback: { correct: 'Correct.', incorrect: 'Edward Jenner developed the smallpox vaccine in 1796.' } },
  { id: 'T-AA-qc2', optionKey: TH_AA, partId: 'T-AA-4', type: 'shortAnswer', question: 'In which year was the NHS established?', correctAnswer: '1948', feedback: { correct: 'Correct.', incorrect: 'The NHS was established in 1948.' } },
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
  { id: 'T-BB-kt2', optionKey: TH_BB, partId: 'T-BB-2', term: 'English Civil War', definition: '1642–49: Parliament vs Charles I.', dateOrContext: '1642' },
  { id: 'T-BB-kt3', optionKey: TH_BB, partId: 'T-BB-3', term: 'Great Reform Act', definition: '1832; extended franchise.', dateOrContext: '1832' },
  { id: 'T-BB-kt4', optionKey: TH_BB, partId: 'T-BB-3', term: 'Chartism', definition: 'Working-class movement for political reform.', dateOrContext: '1838' },
  { id: 'T-BB-kt5', optionKey: TH_BB, partId: 'T-BB-4', term: 'Suffragettes', definition: 'WSPU; militant campaign for votes for women.', dateOrContext: '1903' },
  { id: 'T-BB-kt6', optionKey: TH_BB, partId: 'T-BB-4', term: 'General Strike', definition: '1926; workers struck in support of miners.', dateOrContext: '1926' },
];

export const THEMATIC_BB_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'T-BB-src1',
    optionKey: TH_BB,
    partId: 'T-BB-4',
    sources: [
      { id: 's1', type: 'written', content: 'Deeds not words. We have tried peaceful methods. The government does not listen. We must take direct action to win the vote.', provenance: 'Emmeline Pankhurst, 1912.' },
    ],
    question: 'How useful is this source for understanding the suffragette campaign?',
    markSchemeSummary: 'Content: militant tactics. Provenance: Pankhurst. Context: WSPU, frustration with peaceful methods. Limitation: one perspective.',
  },
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
  { id: 'T-AC-kt2', optionKey: TH_AC, partId: 'T-AC-2', term: 'Atlantic slave trade', definition: 'Forced transport of Africans to Americas.', dateOrContext: '16th–19th century' },
  { id: 'T-AC-kt3', optionKey: TH_AC, partId: 'T-AC-2', term: 'Huguenots', definition: 'French Protestants who fled to Britain.', dateOrContext: '1685' },
  { id: 'T-AC-kt4', optionKey: TH_AC, partId: 'T-AC-3', term: 'EIC', definition: 'East India Company; ruled India before Crown.', dateOrContext: '1600–1858' },
  { id: 'T-AC-kt5', optionKey: TH_AC, partId: 'T-AC-4', term: 'Windrush', definition: '1948 ship; symbol of Caribbean migration to Britain.', dateOrContext: '1948' },
  { id: 'T-AC-kt6', optionKey: TH_AC, partId: 'T-AC-4', term: 'Commonwealth', definition: 'Association of former British colonies.', dateOrContext: '20th century' },
];

export const THEMATIC_AC_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'T-AC-src1',
    optionKey: TH_AC,
    partId: 'T-AC-4',
    sources: [
      { id: 's1', type: 'written', content: 'We were invited to come to Britain. We fought for the mother country in the war. Now we are told we don\'t belong. We belong here.', provenance: 'A Caribbean migrant, 1960s.' },
    ],
    question: 'How useful is this source for understanding the experiences of post-war migrants to Britain?',
    markSchemeSummary: 'Content: invitation, war service, rejection. Provenance: migrant. Context: Windrush, racism. Limitation: one perspective.',
  },
];

export const THEMATIC_AC_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'T-AC-ql1', optionKey: TH_AC, partId: 'T-AC-1', questionType: 'describe', question: 'Describe two key features of Viking settlement in England.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'T-AC-ql2', optionKey: TH_AC, partId: 'T-AC-2', questionType: 'explain', question: 'In what ways did the slave trade affect Britain? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'T-AC-ql3', optionKey: TH_AC, partId: 'T-AC-4', questionType: 'account', question: 'Write an account of migration to Britain after the Second World War.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'T-AC-ql4', optionKey: TH_AC, partId: 'T-AC-4', questionType: 'factorEssay', question: 'Empire was the most important factor in migration to Britain. How far do you agree?', questionFactor: 'Empire', markSchemeSummary: 'Factor essay. Consider empire, labour shortage, Commonwealth, EU. AO1 + AO2 + SPaG.' },
];

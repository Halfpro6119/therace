/**
 * History Hub – British depth study content (BA–BD) + Historic Environment
 * Paper 2 Section B – uses Interpretation Lab (AO4) and Historic Environment
 * Sites: AQA 2026–2028 (Pevensey, Caernarfon, Globe, Ham House; Hastings, Stirling Bridge, Armada, Medway; White Tower, Acton Burnell, Kenilworth, St Paul's)
 */

import { getHistoryOptionKey } from '../types/historyHub';
import type {
  TimelineEvent,
  HistoryKeyTerm,
  HistoryConceptCard,
  HistoryQuickCheckItem,
  HistoryInterpretationSet,
  HistoryQuestionLabItem,
  HistoricEnvironmentSite,
} from '../types/historyHub';

const BD_BA = getHistoryOptionKey('britishDepth', 'BA'); // Norman
const BD_BB = getHistoryOptionKey('britishDepth', 'BB'); // Edward I
const BD_BC = getHistoryOptionKey('britishDepth', 'BC'); // Elizabethan
const BD_BD = getHistoryOptionKey('britishDepth', 'BD'); // Restoration

// ============================================================================
// B-BA: Norman England c1066–c1100
// ============================================================================

export const BRITISH_BA_TIMELINE: TimelineEvent[] = [
  { id: 'B-BA-1-1066', optionKey: BD_BA, partId: 'B-BA-1', date: '1066', title: 'Battle of Stamford Bridge', description: 'Harold defeated Norwegian invasion. Then forced to march south.', order: 1 },
  { id: 'B-BA-1-1066b', optionKey: BD_BA, partId: 'B-BA-1', date: '14 October 1066', title: 'Battle of Hastings', description: 'William defeated Harold. Harold killed. Norman conquest began.', order: 2 },
  { id: 'B-BA-1-1066c', optionKey: BD_BA, partId: 'B-BA-1', date: '25 December 1066', title: 'William crowned King', description: 'William crowned at Westminster. Normans began building castles.', order: 3 },
  { id: 'B-BA-1-1068', optionKey: BD_BA, partId: 'B-BA-1', date: '1068', title: 'Revolt of the Earls', description: 'Norman earls revolted. William crushed rebellion.', order: 4 },
  { id: 'B-BA-1-1069', optionKey: BD_BA, partId: 'B-BA-1', date: '1069', title: 'Harrying of the North', description: 'William brutally suppressed rebellion. Land laid waste.', order: 5 },
  { id: 'B-BA-1-1070', optionKey: BD_BA, partId: 'B-BA-1', date: '1070', title: 'Hereward the Wake', description: 'Last Anglo-Saxon resistance at Ely. Defeated.', order: 6 },
  { id: 'B-BA-2-1086', optionKey: BD_BA, partId: 'B-BA-2', date: '1086', title: 'Domesday Book', description: 'Survey of land and resources. Basis for taxation and control.', order: 7 },
  { id: 'B-BA-2-1087', optionKey: BD_BA, partId: 'B-BA-2', date: '1087', title: 'William I dies', description: 'William Rufus (William II) succeeded. Feudalism established.', order: 8 },
  { id: 'B-BA-3-1070s', optionKey: BD_BA, partId: 'B-BA-3', date: '1070s', title: 'Lanfranc and Church reform', description: 'Norman Archbishop reformed English Church. New cathedrals.', order: 9 },
  { id: 'B-BA-3-1080s', optionKey: BD_BA, partId: 'B-BA-3', date: '1080s', title: 'Norman monasteries', description: 'New monasteries built. Norman influence on religion.', order: 10 },
];

export const BRITISH_BA_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'B-BA-kt1', optionKey: BD_BA, partId: 'B-BA-1', term: 'Battle of Hastings', definition: '1066; William defeated Harold; Norman conquest.', dateOrContext: '1066' },
  { id: 'B-BA-kt2', optionKey: BD_BA, partId: 'B-BA-1', term: 'Harrying of the North', definition: 'William\'s brutal suppression of rebellion; 1069.', dateOrContext: '1069' },
  { id: 'B-BA-kt3', optionKey: BD_BA, partId: 'B-BA-1', term: 'Motte-and-bailey', definition: 'Early Norman castle design; mound and courtyard.', dateOrContext: '1066 onwards' },
  { id: 'B-BA-kt4', optionKey: BD_BA, partId: 'B-BA-2', term: 'Domesday Book', definition: '1086 survey of land and resources.', dateOrContext: '1086' },
  { id: 'B-BA-kt5', optionKey: BD_BA, partId: 'B-BA-2', term: 'Feudalism', definition: 'System of landholding and obligations; King, lords, knights, peasants.', dateOrContext: 'Norman' },
  { id: 'B-BA-kt6', optionKey: BD_BA, partId: 'B-BA-2', term: 'Forest Law', definition: 'Harsh Norman laws protecting royal hunting forests.', dateOrContext: 'Norman' },
  { id: 'B-BA-kt7', optionKey: BD_BA, partId: 'B-BA-3', term: 'Lanfranc', definition: 'Norman Archbishop of Canterbury; reformed Church.', dateOrContext: '1070s' },
  { id: 'B-BA-kt8', optionKey: BD_BA, partId: 'B-BA-3', term: 'Normanisation', definition: 'Replacing Anglo-Saxon clergy and buildings with Norman.', dateOrContext: '1070s' },
];

export const BRITISH_BA_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'B-BA-cc1', optionKey: BD_BA, partId: 'B-BA-1', prompt: 'Why did William use such brutal methods to control England?', conceptType: 'cause', modelAnswer: 'Resistance from Anglo-Saxons; rebellions (e.g. North). Harrying of the North: terror to prevent further revolt. Castles, feudalism, Domesday: systematic control.' },
  { id: 'B-BA-cc2', optionKey: BD_BA, partId: 'B-BA-1', prompt: 'How significant were castles in Norman control of England?', conceptType: 'significance', modelAnswer: 'Very significant: military bases, intimidation, administration. Motte-and-bailey then stone. Deterred rebellion. Symbol of Norman power.' },
  { id: 'B-BA-cc3', optionKey: BD_BA, partId: 'B-BA-2', prompt: 'What were the consequences of the Domesday Book for England?', conceptType: 'consequence', modelAnswer: 'Basis for taxation; record of landholding; centralised control. Showed William\'s power. Historical record. Some resented the survey.' },
  { id: 'B-BA-cc4', optionKey: BD_BA, partId: 'B-BA-3', prompt: 'How did Lanfranc change the English Church?', conceptType: 'change', modelAnswer: 'Replaced Anglo-Saxon bishops; new cathedrals; closer links to Rome. Norman architecture. More disciplined clergy. Church supported Norman rule.' },
];

export const BRITISH_BA_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'B-BA-qc1', optionKey: BD_BA, partId: 'B-BA-1', type: 'multipleChoice', question: 'In which year was the Battle of Hastings?', options: ['1065', '1066', '1067', '1068'], correctAnswer: '1066', feedback: { correct: 'Correct.', incorrect: '1066.' } },
  { id: 'B-BA-qc2', optionKey: BD_BA, partId: 'B-BA-1', type: 'shortAnswer', question: 'What was the Harrying of the North?', correctAnswer: 'William\'s brutal suppression of rebellion', feedback: { correct: 'Correct.', incorrect: 'William\'s brutal suppression of the northern rebellion in 1069.' } },
  { id: 'B-BA-qc3', optionKey: BD_BA, partId: 'B-BA-2', type: 'shortAnswer', question: 'What was the Domesday Book?', correctAnswer: 'Survey of land', feedback: { correct: 'Correct.', incorrect: 'A survey of land and resources (1086).' } },
  { id: 'B-BA-qc4', optionKey: BD_BA, partId: 'B-BA-2', type: 'multipleChoice', question: 'In which year was the Domesday Book compiled?', options: ['1066', '1070', '1086', '1100'], correctAnswer: '1086', feedback: { correct: 'Correct.', incorrect: '1086.' } },
  { id: 'B-BA-qc5', optionKey: BD_BA, partId: 'B-BA-3', type: 'shortAnswer', question: 'Who was the Norman Archbishop of Canterbury?', correctAnswer: 'Lanfranc', feedback: { correct: 'Correct.', incorrect: 'Lanfranc.' } },
];

export const BRITISH_BA_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'B-BA-int1',
    optionKey: BD_BA,
    partId: 'B-BA-1',
    interpretations: [
      { id: 'i1', text: 'William\'s victory at Hastings was due to superior military tactics. The feigned retreat was the key to breaking the English shield wall.', ascription: 'A modern military historian.' },
      { id: 'i2', text: 'William won because of luck and Harold\'s mistakes. Harold had just fought at Stamford Bridge; his army was exhausted. The Pope\'s support gave William legitimacy.', ascription: 'Another historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about William\'s victory?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
  {
    id: 'B-BA-int2',
    optionKey: BD_BA,
    partId: 'B-BA-2',
    interpretations: [
      { id: 'i1', text: 'The Domesday Book was a tool of oppression. William used it to squeeze every penny from his subjects. It showed his absolute control.', ascription: 'An Anglo-Saxon chronicler.' },
      { id: 'i2', text: 'The Domesday Book was an administrative achievement. It created a fair system of taxation and a record that still helps historians today.', ascription: 'A modern historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about the Domesday Book?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
];

export const BRITISH_BA_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'B-BA-ql1', optionKey: BD_BA, partId: 'B-BA-1', questionType: 'describe', question: 'Describe two key features of the Battle of Hastings.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'B-BA-ql2', optionKey: BD_BA, partId: 'B-BA-2', questionType: 'explain', question: 'In what ways did William maintain control of England? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'B-BA-ql3', optionKey: BD_BA, partId: 'B-BA-3', questionType: 'account', question: 'Write an account of the Normanisation of the English Church.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'B-BA-ql4', optionKey: BD_BA, partId: 'B-BA-4', questionType: 'essay', question: 'How far does [historic site] reflect the methods used by William to control England?', markSchemeSummary: 'Historic environment essay. Site + wider context. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// B-BB: Medieval England – Edward I 1272–1307
// ============================================================================

export const BRITISH_BB_TIMELINE: TimelineEvent[] = [
  { id: 'B-BB-1-1272', optionKey: BD_BB, partId: 'B-BB-1', date: '1272', title: 'Edward I becomes King', description: 'Succeeded Henry III. Strong ruler; legal and administrative reforms.', order: 1 },
  { id: 'B-BB-1-1275', optionKey: BD_BB, partId: 'B-BB-1', date: '1275', title: 'Statute of Westminster', description: 'Legal reforms. Edward asserted royal rights.', order: 2 },
  { id: 'B-BB-1-1295', optionKey: BD_BB, partId: 'B-BB-1', date: '1295', title: 'Model Parliament', description: 'Included knights and burgesses. Representation of community.', order: 3 },
  { id: 'B-BB-2-1270s', optionKey: BD_BB, partId: 'B-BB-2', date: '1270s', title: 'Wool trade', description: 'Wool central to economy. Trade, towns, guilds.', order: 4 },
  { id: 'B-BB-3-1277', optionKey: BD_BB, partId: 'B-BB-3', date: '1277', title: 'First Welsh War', description: 'Edward conquered Wales. Built castles.', order: 5 },
  { id: 'B-BB-3-1282', optionKey: BD_BB, partId: 'B-BB-3', date: '1282', title: 'Second Welsh War', description: 'Final conquest of Wales. Llywelyn killed.', order: 6 },
  { id: 'B-BB-3-1283', optionKey: BD_BB, partId: 'B-BB-3', date: '1283', title: 'Caernarfon Castle', description: 'Edward\'s castle; symbol of conquest.', order: 7 },
  { id: 'B-BB-3-1296', optionKey: BD_BB, partId: 'B-BB-3', date: '1296', title: 'Conquest of Scotland', description: 'Edward took Stone of Destiny. Wars with Scotland.', order: 8 },
  { id: 'B-BB-3-1297', optionKey: BD_BB, partId: 'B-BB-3', date: '1297', title: 'Battle of Stirling Bridge', description: 'William Wallace defeated English. Scottish resistance.', order: 9 },
];

export const BRITISH_BB_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'B-BB-kt1', optionKey: BD_BB, partId: 'B-BB-1', term: 'Model Parliament', definition: '1295; included knights and burgesses; representation.', dateOrContext: '1295' },
  { id: 'B-BB-kt2', optionKey: BD_BB, partId: 'B-BB-1', term: 'Burnell', definition: 'Edward\'s chancellor; key administrator.', dateOrContext: '1270s–90s' },
  { id: 'B-BB-kt3', optionKey: BD_BB, partId: 'B-BB-1', term: 'Statutes', definition: 'Edward\'s laws; asserted royal authority.', dateOrContext: '1270s' },
  { id: 'B-BB-kt4', optionKey: BD_BB, partId: 'B-BB-2', term: 'Wool trade', definition: 'Central to medieval economy; exports, towns.', dateOrContext: '13th century' },
  { id: 'B-BB-kt5', optionKey: BD_BB, partId: 'B-BB-3', term: 'William Wallace', definition: 'Scottish resistance leader; Stirling Bridge.', dateOrContext: '1297' },
  { id: 'B-BB-kt6', optionKey: BD_BB, partId: 'B-BB-3', term: 'Caernarfon Castle', definition: 'Edward\'s castle in Wales; symbol of conquest.', dateOrContext: '1283' },
  { id: 'B-BB-kt7', optionKey: BD_BB, partId: 'B-BB-3', term: 'Stone of Destiny', definition: 'Scottish coronation stone; Edward took it 1296.', dateOrContext: '1296' },
];

export const BRITISH_BB_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'B-BB-cc1', optionKey: BD_BB, partId: 'B-BB-1', prompt: 'How did the Model Parliament increase the role of Parliament?', conceptType: 'significance', modelAnswer: 'Included knights and burgesses (not just lords). Community of the realm represented. Set precedent for future Parliaments.' },
  { id: 'B-BB-cc2', optionKey: BD_BB, partId: 'B-BB-1', prompt: 'Why did Edward I need Parliament?', conceptType: 'cause', modelAnswer: 'Money for wars (Wales, Scotland). Legitimacy. Statutes needed approval. Parliament granted taxes in return for grievances heard.' },
  { id: 'B-BB-cc3', optionKey: BD_BB, partId: 'B-BB-3', prompt: 'What were the consequences of Edward\'s conquest of Wales?', conceptType: 'consequence', modelAnswer: 'Wales under English rule. Castles (Caernarfon, etc.) built. English law. Prince of Wales title for heir. Welsh resistance continued in Scotland.' },
];

export const BRITISH_BB_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'B-BB-qc1', optionKey: BD_BB, partId: 'B-BB-1', type: 'shortAnswer', question: 'In which year was the Model Parliament?', correctAnswer: '1295', feedback: { correct: 'Correct.', incorrect: '1295.' } },
];

export const BRITISH_BB_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'B-BB-int1',
    optionKey: BD_BB,
    partId: 'B-BB-1',
    interpretations: [
      { id: 'i1', text: 'Edward I was a great lawmaker. His statutes strengthened royal justice and the rights of the Crown. He made England a more unified kingdom.', ascription: 'A medieval chronicler.' },
      { id: 'i2', text: 'Edward was mainly interested in war and conquest. His campaigns in Wales and Scotland bankrupted the country and caused suffering.', ascription: 'A modern historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about Edward I?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
];

export const BRITISH_BB_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'B-BB-ql1', optionKey: BD_BB, partId: 'B-BB-1', questionType: 'describe', question: 'Describe two key features of Edward I\'s government.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'B-BB-ql2', optionKey: BD_BB, partId: 'B-BB-3', questionType: 'explain', question: 'In what ways did Edward I try to control Wales and Scotland? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'B-BB-ql3', optionKey: BD_BB, partId: 'B-BB-3', questionType: 'account', question: 'Write an account of Edward I\'s military campaigns.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'B-BB-ql4', optionKey: BD_BB, partId: 'B-BB-4', questionType: 'essay', question: 'How far does [historic site] reflect Edward I\'s methods of control?', markSchemeSummary: 'Historic environment essay. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// B-BC: Elizabethan England c1568–1603
// ============================================================================

export const BRITISH_BC_TIMELINE: TimelineEvent[] = [
  { id: 'B-BC-1-1558', optionKey: BD_BC, partId: 'B-BC-1', date: '1558', title: 'Elizabeth becomes Queen', description: 'Succeeded Mary I. Religion, marriage, succession key issues.', order: 1 },
  { id: 'B-BC-1-1559', optionKey: BD_BC, partId: 'B-BC-1', date: '1559', title: 'Religious Settlement', description: 'Acts of Supremacy and Uniformity. Protestant Church; some Catholic elements.', order: 2 },
  { id: 'B-BC-1-1569', optionKey: BD_BC, partId: 'B-BC-1', date: '1569', title: 'Revolt of the Northern Earls', description: 'Catholic earls rebelled. Crushed. Mary Queen of Scots implicated.', order: 3 },
  { id: 'B-BC-1-1587', optionKey: BD_BC, partId: 'B-BC-1', date: '1587', title: 'Execution of Mary Queen of Scots', description: 'Elizabeth reluctant. Mary executed for plotting.', order: 4 },
  { id: 'B-BC-2-1588', optionKey: BD_BC, partId: 'B-BC-2', date: '1588', title: 'Spanish Armada', description: 'Philip II sent fleet to invade. Defeated by weather and English fireships.', order: 5 },
  { id: 'B-BC-2-1599', optionKey: BD_BC, partId: 'B-BC-2', date: '1599', title: 'Globe Theatre opened', description: 'Shakespeare\'s theatre. Elizabethan culture.', order: 6 },
  { id: 'B-BC-2-1601', optionKey: BD_BC, partId: 'B-BC-2', date: '1601', title: 'Poor Law', description: 'Elizabethan response to poverty. Parish relief.', order: 7 },
  { id: 'B-BC-2-1603', optionKey: BD_BC, partId: 'B-BC-2', date: '1603', title: 'Elizabeth dies', description: 'James VI of Scotland succeeded. Tudor dynasty ended.', order: 8 },
];

export const BRITISH_BC_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'B-BC-kt1', optionKey: BD_BC, partId: 'B-BC-1', term: 'Religious Settlement', definition: '1559; Elizabeth as Supreme Governor; Protestant Church.', dateOrContext: '1559' },
  { id: 'B-BC-kt2', optionKey: BD_BC, partId: 'B-BC-1', term: 'Mary Queen of Scots', definition: 'Catholic claimant; executed 1587 for plotting.', dateOrContext: '1568–1587' },
  { id: 'B-BC-kt3', optionKey: BD_BC, partId: 'B-BC-1', term: 'Puritans', definition: 'Wanted more Protestant reform; challenged Settlement.', dateOrContext: 'Elizabethan' },
  { id: 'B-BC-kt4', optionKey: BD_BC, partId: 'B-BC-2', term: 'Spanish Armada', definition: '1588; Philip II\'s invasion attempt; defeated.', dateOrContext: '1588' },
  { id: 'B-BC-kt5', optionKey: BD_BC, partId: 'B-BC-2', term: 'Globe Theatre', definition: 'Shakespeare\'s theatre; Elizabethan culture.', dateOrContext: '1599' },
  { id: 'B-BC-kt6', optionKey: BD_BC, partId: 'B-BC-2', term: 'Poor Law', definition: '1601; parish relief for poor.', dateOrContext: '1601' },
];

export const BRITISH_BC_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'B-BC-cc1', optionKey: BD_BC, partId: 'B-BC-1', prompt: 'Why did Elizabeth\'s Religious Settlement face challenges?', conceptType: 'cause', modelAnswer: 'Catholics wanted old faith; Puritans wanted more reform. Mary Queen of Scots; papal excommunication. Northern Rebellion. But: most accepted; settlement lasted.' },
  { id: 'B-BC-cc2', optionKey: BD_BC, partId: 'B-BC-2', prompt: 'Why did the Spanish Armada fail?', conceptType: 'cause', modelAnswer: 'English fireships; Spanish formation broken. Weather (storms). Length of voyage; supplies. English tactics. Spanish aims too ambitious.' },
  { id: 'B-BC-cc3', optionKey: BD_BC, partId: 'B-BC-2', prompt: 'How significant was the Globe Theatre in Elizabethan culture?', conceptType: 'significance', modelAnswer: 'Significant: Shakespeare\'s plays; popular entertainment; social mixing. But: one of many theatres; culture broader (music, literature, exploration).' },
];

export const BRITISH_BC_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'B-BC-qc1', optionKey: BD_BC, partId: 'B-BC-1', type: 'multipleChoice', question: 'In which year was the Religious Settlement?', options: ['1558', '1559', '1569', '1588'], correctAnswer: '1559', feedback: { correct: 'Correct.', incorrect: '1559.' } },
  { id: 'B-BC-qc2', optionKey: BD_BC, partId: 'B-BC-2', type: 'multipleChoice', question: 'In which year was the Spanish Armada?', options: ['1586', '1588', '1590', '1592'], correctAnswer: '1588', feedback: { correct: 'Correct.', incorrect: '1588.' } },
  { id: 'B-BC-qc3', optionKey: BD_BC, partId: 'B-BC-2', type: 'shortAnswer', question: 'Which playwright was linked to the Globe?', correctAnswer: 'Shakespeare', feedback: { correct: 'Correct.', incorrect: 'William Shakespeare.' } },
];

export const BRITISH_BC_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'B-BC-int1',
    optionKey: BD_BC,
    partId: 'B-BC-2',
    interpretations: [
      { id: 'i1', text: 'The Elizabethan age was a golden age. England was strong, culture flourished, and the Armada victory showed God favoured Protestant England.', ascription: 'An Elizabethan writer.' },
      { id: 'i2', text: 'Elizabethan England had serious problems. Poverty, disease, and religious tension. The later years saw rebellion and war in Ireland.', ascription: 'A modern historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about Elizabethan England?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
];

export const BRITISH_BC_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'B-BC-ql1', optionKey: BD_BC, partId: 'B-BC-1', questionType: 'describe', question: 'Describe two key features of the Elizabethan Religious Settlement.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'B-BC-ql2', optionKey: BD_BC, partId: 'B-BC-2', questionType: 'explain', question: 'In what ways did Elizabeth deal with the threat from Spain? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'B-BC-ql3', optionKey: BD_BC, partId: 'B-BC-3', questionType: 'essay', question: 'How far does [historic site] reflect life in Elizabethan England?', markSchemeSummary: 'Historic environment essay. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// B-BD: Restoration England 1660–1685
// ============================================================================

export const BRITISH_BD_TIMELINE: TimelineEvent[] = [
  { id: 'B-BD-1-1660', optionKey: BD_BD, partId: 'B-BD-1', date: '1660', title: 'Restoration of Charles II', description: 'Monarchy restored after Civil War and Commonwealth.', order: 1 },
  { id: 'B-BD-1-1670s', optionKey: BD_BD, partId: 'B-BD-1', date: '1670s', title: 'Crown and Parliament', description: 'Tension over religion, succession. Exclusion Crisis.', order: 2 },
  { id: 'B-BD-2-1665', optionKey: BD_BD, partId: 'B-BD-2', date: '1665', title: 'Great Plague', description: 'Plague outbreak in London.', order: 3 },
  { id: 'B-BD-2-1666', optionKey: BD_BD, partId: 'B-BD-2', date: '1666', title: 'Great Fire of London', description: 'Fire destroyed much of London. Rebuilding; Christopher Wren.', order: 4 },
  { id: 'B-BD-2-1667', optionKey: BD_BD, partId: 'B-BD-2', date: '1667', title: 'Dutch Raid on the Medway', description: 'Dutch attacked English fleet. Humiliation.', order: 5 },
];

export const BRITISH_BD_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'B-BD-kt1', optionKey: BD_BD, partId: 'B-BD-1', term: 'Restoration', definition: '1660; return of monarchy under Charles II.', dateOrContext: '1660' },
  { id: 'B-BD-kt2', optionKey: BD_BD, partId: 'B-BD-1', term: 'Exclusion Crisis', definition: 'Attempt to exclude James (Catholic) from succession.', dateOrContext: '1679–81' },
  { id: 'B-BD-kt3', optionKey: BD_BD, partId: 'B-BD-2', term: 'Great Fire', definition: '1666; destroyed much of London.', dateOrContext: '1666' },
  { id: 'B-BD-kt4', optionKey: BD_BD, partId: 'B-BD-2', term: 'Christopher Wren', definition: 'Architect; rebuilt St Paul\'s and London churches.', dateOrContext: '1666 onwards' },
];

export const BRITISH_BD_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'B-BD-cc1', optionKey: BD_BD, partId: 'B-BD-1', prompt: 'Why did the Exclusion Crisis happen?', conceptType: 'cause', modelAnswer: 'James (Charles\' brother) was Catholic. MPs feared Catholic succession. Exclusion bills to bar James. Charles dissolved Parliament. Whigs vs Tories.' },
  { id: 'B-BD-cc2', optionKey: BD_BD, partId: 'B-BD-2', prompt: 'How did the Great Fire change London?', conceptType: 'consequence', modelAnswer: 'Destruction; rebuilding. Wren\'s new churches and St Paul\'s. Wider streets; brick. But also hardship; slow recovery for poor.' },
  { id: 'B-BD-cc3', optionKey: BD_BD, partId: 'B-BD-2', prompt: 'What were the consequences of the Dutch Raid on the Medway?', conceptType: 'consequence', modelAnswer: 'National humiliation; Dutch burned English ships. Criticism of Charles. Led to naval reforms. Showed weakness of Restoration navy.' },
];

export const BRITISH_BD_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'B-BD-qc1', optionKey: BD_BD, partId: 'B-BD-1', type: 'shortAnswer', question: 'In which year was the Restoration?', correctAnswer: '1660', feedback: { correct: 'Correct.', incorrect: '1660.' } },
  { id: 'B-BD-qc2', optionKey: BD_BD, partId: 'B-BD-2', type: 'multipleChoice', question: 'In which year was the Great Fire of London?', options: ['1665', '1666', '1667', '1668'], correctAnswer: '1666', feedback: { correct: 'Correct.', incorrect: '1666.' } },
  { id: 'B-BD-qc3', optionKey: BD_BD, partId: 'B-BD-2', type: 'shortAnswer', question: 'Who designed the rebuilt St Paul\'s?', correctAnswer: 'Christopher Wren', feedback: { correct: 'Correct.', incorrect: 'Christopher Wren.' } },
];

export const BRITISH_BD_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'B-BD-int1',
    optionKey: BD_BD,
    partId: 'B-BD-1',
    interpretations: [
      { id: 'i1', text: 'Charles II learned from his father\'s mistakes. He worked with Parliament and avoided confrontation. The Restoration was a success.', ascription: 'A royalist writer.' },
      { id: 'i2', text: 'Charles was a secret absolutist. He wanted more power and favoured Catholics. The Exclusion Crisis showed real fears about his intentions.', ascription: 'A Whig historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about Charles II?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
];

export const BRITISH_BD_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'B-BD-ql1', optionKey: BD_BD, partId: 'B-BD-1', questionType: 'describe', question: 'Describe two key features of the relationship between Crown and Parliament after 1660.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'B-BD-ql2', optionKey: BD_BD, partId: 'B-BD-2', questionType: 'explain', question: 'In what ways did the Great Fire change London? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'B-BD-ql3', optionKey: BD_BD, partId: 'B-BD-3', questionType: 'essay', question: 'How far does [historic site] reflect Restoration England?', markSchemeSummary: 'Historic environment essay. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// HISTORIC ENVIRONMENT SITES (AQA 2026–2028)
// ============================================================================

export const HISTORIC_ENVIRONMENT_SITES: HistoricEnvironmentSite[] = [
  {
    id: 'he-norman-pevensey',
    optionKey: BD_BA,
    title: 'Pevensey Castle (2026)',
    description: 'Roman fort reused by Normans. William landed nearby in 1066. Shows Norman use of existing structures for control.',
    location: 'East Sussex',
    function: 'Military; control of coastline and landing',
    structure: 'Roman walls; Norman additions',
    linksToParts: ['B-BA-1', 'B-BA-2'],
    sampleEssayPrompt: 'How far does Pevensey Castle reflect the methods William used to control England?',
  },
  {
    id: 'he-norman-hastings',
    optionKey: BD_BA,
    title: 'The Battle of Hastings (2027)',
    description: 'Site of the decisive battle. William\'s victory began the Norman conquest.',
    linksToParts: ['B-BA-1'],
    sampleEssayPrompt: 'How far does the Battle of Hastings explain William\'s success in conquering England?',
  },
  {
    id: 'he-norman-whitetower',
    optionKey: BD_BA,
    title: 'The White Tower (2028)',
    description: 'Central keep of Tower of London. Built by William to dominate London. Symbol of Norman power.',
    location: 'London',
    function: 'Royal fortress; control of capital',
    structure: 'Stone keep; Norman architecture',
    linksToParts: ['B-BA-1', 'B-BA-2'],
    sampleEssayPrompt: 'How far does the White Tower reflect William\'s methods of control?',
  },
  {
    id: 'he-edward-caernarfon',
    optionKey: BD_BB,
    title: 'Caernarfon Castle (2026)',
    description: 'Edward I\'s castle in Wales. Symbol of conquest and English dominance.',
    location: 'North Wales',
    function: 'Military; administrative; symbol of power',
    structure: 'Concentric design; polygonal towers',
    linksToParts: ['B-BB-3'],
    sampleEssayPrompt: 'How far does Caernarfon Castle reflect Edward I\'s control of Wales?',
  },
  {
    id: 'he-edward-stirling',
    optionKey: BD_BB,
    title: 'The Battle of Stirling Bridge (2027)',
    description: 'William Wallace\'s victory over English. Scottish resistance.',
    linksToParts: ['B-BB-3'],
    sampleEssayPrompt: 'How far does the Battle of Stirling Bridge reflect the challenges Edward I faced in Scotland?',
  },
  {
    id: 'he-edward-acton',
    optionKey: BD_BB,
    title: 'Acton Burnell Castle (2028)',
    description: 'Fortified manor. Parliament met here 1283. Government and lordship.',
    linksToParts: ['B-BB-1'],
    sampleEssayPrompt: 'How far does Acton Burnell Castle reflect Edward I\'s government?',
  },
  {
    id: 'he-eliz-globe',
    optionKey: BD_BC,
    title: 'The Globe (2026)',
    description: 'Shakespeare\'s theatre. Elizabethan culture, entertainment, society.',
    location: 'London (Southwark)',
    function: 'Theatre; entertainment',
    linksToParts: ['B-BC-2'],
    sampleEssayPrompt: 'How far does the Globe reflect Elizabethan culture?',
  },
  {
    id: 'he-eliz-armada',
    optionKey: BD_BC,
    title: 'The Spanish Armada (2027)',
    description: '1588 invasion attempt. Defeat assured Protestant England.',
    linksToParts: ['B-BC-2'],
    sampleEssayPrompt: 'How far does the Spanish Armada reflect the threats facing Elizabethan England?',
  },
  {
    id: 'he-eliz-kenilworth',
    optionKey: BD_BC,
    title: 'Kenilworth Castle (2028)',
    description: 'Elizabeth visited; Leicester\'s entertainments. Court culture.',
    linksToParts: ['B-BC-1', 'B-BC-2'],
    sampleEssayPrompt: 'How far does Kenilworth Castle reflect Elizabethan court life?',
  },
  {
    id: 'he-rest-ham',
    optionKey: BD_BD,
    title: 'Ham House (2026)',
    description: 'Restoration elite residence. Fashion, culture, wealth.',
    location: 'Surrey',
    linksToParts: ['B-BD-2'],
    sampleEssayPrompt: 'How far does Ham House reflect Restoration society?',
  },
  {
    id: 'he-rest-medway',
    optionKey: BD_BD,
    title: 'The Dutch Raid on the Medway, June 1667 (2027)',
    description: 'Dutch attack on English fleet. National humiliation; naval weakness.',
    linksToParts: ['B-BD-2'],
    sampleEssayPrompt: 'How far does the Dutch Raid on the Medway reflect the challenges facing Charles II?',
  },
  {
    id: 'he-rest-stpauls',
    optionKey: BD_BD,
    title: 'St Paul\'s Cathedral (2028)',
    description: 'Wren\'s masterpiece. Rebuilt after Great Fire. Symbol of Restoration.',
    location: 'London',
    linksToParts: ['B-BD-2'],
    sampleEssayPrompt: 'How far does St Paul\'s Cathedral reflect Restoration England?',
  },
];

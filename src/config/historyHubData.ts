/**
 * History Hub – AQA GCSE History 8145
 * Option metadata and content (timeline, key terms, quick check, concept cards, interpretations, question lab).
 * Content uses optionKey (e.g. period_AB) so the same AQA code can refer to different options (period vs thematic).
 */

import {
  getHistoryOptionKey,
  type HistoryOptionMeta,
  type TimelineEvent,
  type HistoryKeyTerm,
  type HistoryConceptCard,
  type HistoryQuickCheckItem,
  type HistoryInterpretationSet,
  type HistoryQuestionLabItem,
  type HistorySourceSet,
  type HistoricEnvironmentSite,
} from '../types/historyHub';

import {
  PERIOD_AA_TIMELINE,
  PERIOD_AA_KEY_TERMS,
  PERIOD_AA_CONCEPT_CARDS,
  PERIOD_AA_QUICK_CHECKS,
  PERIOD_AA_INTERPRETATION_SETS,
  PERIOD_AA_QUESTION_LAB,
  PERIOD_AC_TIMELINE,
  PERIOD_AC_KEY_TERMS,
  PERIOD_AC_CONCEPT_CARDS,
  PERIOD_AC_QUICK_CHECKS,
  PERIOD_AC_INTERPRETATION_SETS,
  PERIOD_AC_QUESTION_LAB,
  PERIOD_AD_TIMELINE,
  PERIOD_AD_KEY_TERMS,
  PERIOD_AD_CONCEPT_CARDS,
  PERIOD_AD_QUICK_CHECKS,
  PERIOD_AD_INTERPRETATION_SETS,
  PERIOD_AD_QUESTION_LAB,
} from './historyHubPeriodContent';

import {
  WW_BA_TIMELINE,
  WW_BA_KEY_TERMS,
  WW_BA_CONCEPT_CARDS,
  WW_BA_QUICK_CHECKS,
  WW_BA_SOURCE_SETS,
  WW_BA_QUESTION_LAB,
  WW_BB_TIMELINE,
  WW_BB_KEY_TERMS,
  WW_BB_CONCEPT_CARDS,
  WW_BB_QUICK_CHECKS,
  WW_BB_SOURCE_SETS,
  WW_BB_QUESTION_LAB,
  WW_BC_TIMELINE,
  WW_BC_KEY_TERMS,
  WW_BC_CONCEPT_CARDS,
  WW_BC_QUICK_CHECKS,
  WW_BC_SOURCE_SETS,
  WW_BC_QUESTION_LAB,
  WW_BD_TIMELINE,
  WW_BD_KEY_TERMS,
  WW_BD_CONCEPT_CARDS,
  WW_BD_QUICK_CHECKS,
  WW_BD_SOURCE_SETS,
  WW_BD_QUESTION_LAB,
  WW_BE_TIMELINE,
  WW_BE_KEY_TERMS,
  WW_BE_CONCEPT_CARDS,
  WW_BE_QUICK_CHECKS,
  WW_BE_SOURCE_SETS,
  WW_BE_QUESTION_LAB,
} from './historyHubWiderWorldContent';

import {
  THEMATIC_AA_TIMELINE,
  THEMATIC_AA_KEY_TERMS,
  THEMATIC_AA_CONCEPT_CARDS,
  THEMATIC_AA_QUICK_CHECKS,
  THEMATIC_AA_SOURCE_SETS,
  THEMATIC_AA_QUESTION_LAB,
  THEMATIC_BB_TIMELINE,
  THEMATIC_BB_KEY_TERMS,
  THEMATIC_BB_CONCEPT_CARDS,
  THEMATIC_BB_QUICK_CHECKS,
  THEMATIC_BB_SOURCE_SETS,
  THEMATIC_BB_QUESTION_LAB,
  THEMATIC_AC_TIMELINE,
  THEMATIC_AC_KEY_TERMS,
  THEMATIC_AC_CONCEPT_CARDS,
  THEMATIC_AC_QUICK_CHECKS,
  THEMATIC_AC_SOURCE_SETS,
  THEMATIC_AC_QUESTION_LAB,
} from './historyHubThematicContent';

import {
  BRITISH_BA_TIMELINE,
  BRITISH_BA_KEY_TERMS,
  BRITISH_BA_CONCEPT_CARDS,
  BRITISH_BA_QUICK_CHECKS,
  BRITISH_BA_INTERPRETATION_SETS,
  BRITISH_BA_QUESTION_LAB,
  BRITISH_BB_TIMELINE,
  BRITISH_BB_KEY_TERMS,
  BRITISH_BB_CONCEPT_CARDS,
  BRITISH_BB_QUICK_CHECKS,
  BRITISH_BB_INTERPRETATION_SETS,
  BRITISH_BB_QUESTION_LAB,
  BRITISH_BC_TIMELINE,
  BRITISH_BC_KEY_TERMS,
  BRITISH_BC_CONCEPT_CARDS,
  BRITISH_BC_QUICK_CHECKS,
  BRITISH_BC_INTERPRETATION_SETS,
  BRITISH_BC_QUESTION_LAB,
  BRITISH_BD_TIMELINE,
  BRITISH_BD_KEY_TERMS,
  BRITISH_BD_CONCEPT_CARDS,
  BRITISH_BD_QUICK_CHECKS,
  BRITISH_BD_INTERPRETATION_SETS,
  BRITISH_BD_QUESTION_LAB,
  HISTORIC_ENVIRONMENT_SITES,
} from './historyHubBritishDepthContent';

// ============================================================================
// OPTION METADATA
// ============================================================================

const PERIOD_OPTIONS: HistoryOptionMeta[] = [
  {
    optionKey: getHistoryOptionKey('period', 'AA'),
    id: 'AA',
    title: 'America, 1840–1895: Expansion and consolidation',
    paper: 1,
    section: 'period',
    parts: [
      { id: 'AA-1', optionKey: getHistoryOptionKey('period', 'AA'), title: 'Expansion: opportunities and challenges', order: 1 },
      { id: 'AA-2', optionKey: getHistoryOptionKey('period', 'AA'), title: 'Conflict across America', order: 2 },
      { id: 'AA-3', optionKey: getHistoryOptionKey('period', 'AA'), title: 'Consolidation: forging the nation', order: 3 },
    ],
  },
  {
    optionKey: getHistoryOptionKey('period', 'AB'),
    id: 'AB',
    title: 'Germany, 1890–1945: Democracy and dictatorship',
    paper: 1,
    section: 'period',
    parts: [
      { id: 'AB-1', optionKey: getHistoryOptionKey('period', 'AB'), title: 'Germany and the growth of democracy', order: 1 },
      { id: 'AB-2', optionKey: getHistoryOptionKey('period', 'AB'), title: 'Germany and the Depression', order: 2 },
      { id: 'AB-3', optionKey: getHistoryOptionKey('period', 'AB'), title: 'The experiences of Germans under the Nazis', order: 3 },
    ],
  },
  {
    optionKey: getHistoryOptionKey('period', 'AC'),
    id: 'AC',
    title: 'Russia, 1894–1945: Tsardom and communism',
    paper: 1,
    section: 'period',
    parts: [
      { id: 'AC-1', optionKey: getHistoryOptionKey('period', 'AC'), title: 'The end of Tsardom', order: 1 },
      { id: 'AC-2', optionKey: getHistoryOptionKey('period', 'AC'), title: "Lenin's new society", order: 2 },
      { id: 'AC-3', optionKey: getHistoryOptionKey('period', 'AC'), title: "Stalin's USSR", order: 3 },
    ],
  },
  {
    optionKey: getHistoryOptionKey('period', 'AD'),
    id: 'AD',
    title: 'America, 1920–1973: Opportunity and inequality',
    paper: 1,
    section: 'period',
    parts: [
      { id: 'AD-1', optionKey: getHistoryOptionKey('period', 'AD'), title: "American people and the 'Boom'", order: 1 },
      { id: 'AD-2', optionKey: getHistoryOptionKey('period', 'AD'), title: "Bust – Americans' experiences of the Depression and New Deal", order: 2 },
      { id: 'AD-3', optionKey: getHistoryOptionKey('period', 'AD'), title: 'Post-war America', order: 3 },
    ],
  },
];

const WIDER_WORLD_OPTIONS: HistoryOptionMeta[] = [
  { optionKey: getHistoryOptionKey('widerWorldDepth', 'BA'), id: 'BA', title: 'Conflict and tension: The First World War, 1894–1918', paper: 1, section: 'widerWorldDepth', parts: [
    { id: 'BA-1', optionKey: getHistoryOptionKey('widerWorldDepth', 'BA'), title: 'The causes of the First World War', order: 1 },
    { id: 'BA-2', optionKey: getHistoryOptionKey('widerWorldDepth', 'BA'), title: 'The First World War: stalemate', order: 2 },
    { id: 'BA-3', optionKey: getHistoryOptionKey('widerWorldDepth', 'BA'), title: 'Ending the war', order: 3 },
  ]},
  { optionKey: getHistoryOptionKey('widerWorldDepth', 'BB'), id: 'BB', title: 'Conflict and tension: The inter-war years, 1918–1939', paper: 1, section: 'widerWorldDepth', parts: [
    { id: 'BB-1', optionKey: getHistoryOptionKey('widerWorldDepth', 'BB'), title: 'Peacemaking', order: 1 },
    { id: 'BB-2', optionKey: getHistoryOptionKey('widerWorldDepth', 'BB'), title: 'The League of Nations and international peace', order: 2 },
    { id: 'BB-3', optionKey: getHistoryOptionKey('widerWorldDepth', 'BB'), title: 'The origins and outbreak of the Second World War', order: 3 },
  ]},
  { optionKey: getHistoryOptionKey('widerWorldDepth', 'BC'), id: 'BC', title: 'Conflict and tension between East and West, 1945–1972', paper: 1, section: 'widerWorldDepth', parts: [
    { id: 'BC-1', optionKey: getHistoryOptionKey('widerWorldDepth', 'BC'), title: 'The origins of the Cold War', order: 1 },
    { id: 'BC-2', optionKey: getHistoryOptionKey('widerWorldDepth', 'BC'), title: 'The development of the Cold War', order: 2 },
    { id: 'BC-3', optionKey: getHistoryOptionKey('widerWorldDepth', 'BC'), title: 'Transformation of the Cold War', order: 3 },
  ]},
  { optionKey: getHistoryOptionKey('widerWorldDepth', 'BD'), id: 'BD', title: 'Conflict and tension in Asia, 1950–1975', paper: 1, section: 'widerWorldDepth', parts: [
    { id: 'BD-1', optionKey: getHistoryOptionKey('widerWorldDepth', 'BD'), title: 'Conflict in Korea', order: 1 },
    { id: 'BD-2', optionKey: getHistoryOptionKey('widerWorldDepth', 'BD'), title: 'Escalation of conflict in Vietnam', order: 2 },
    { id: 'BD-3', optionKey: getHistoryOptionKey('widerWorldDepth', 'BD'), title: 'The ending of conflict in Vietnam', order: 3 },
  ]},
  { optionKey: getHistoryOptionKey('widerWorldDepth', 'BE'), id: 'BE', title: 'Conflict and tension in the Gulf and Afghanistan, 1990–2009', paper: 1, section: 'widerWorldDepth', parts: [
    { id: 'BE-1', optionKey: getHistoryOptionKey('widerWorldDepth', 'BE'), title: 'Tensions in the Gulf', order: 1 },
    { id: 'BE-2', optionKey: getHistoryOptionKey('widerWorldDepth', 'BE'), title: 'The war on Al-Qaeda', order: 2 },
    { id: 'BE-3', optionKey: getHistoryOptionKey('widerWorldDepth', 'BE'), title: 'The Iraq War', order: 3 },
  ]},
];

const THEMATIC_OPTIONS: HistoryOptionMeta[] = [
  { optionKey: getHistoryOptionKey('thematic', 'AA'), id: 'AA', title: 'Britain: Health and the people: c1000 to the present day', paper: 2, section: 'thematic', parts: [
    { id: 'T-AA-1', optionKey: getHistoryOptionKey('thematic', 'AA'), title: 'Medicine stands still', order: 1 },
    { id: 'T-AA-2', optionKey: getHistoryOptionKey('thematic', 'AA'), title: 'The beginnings of change', order: 2 },
    { id: 'T-AA-3', optionKey: getHistoryOptionKey('thematic', 'AA'), title: 'A revolution in medicine', order: 3 },
    { id: 'T-AA-4', optionKey: getHistoryOptionKey('thematic', 'AA'), title: 'Modern medicine', order: 4 },
  ]},
  { optionKey: getHistoryOptionKey('thematic', 'BB'), id: 'BB', title: 'Britain: Power and the people: c1170 to the present day', paper: 2, section: 'thematic', parts: [
    { id: 'T-BB-1', optionKey: getHistoryOptionKey('thematic', 'BB'), title: 'Challenging authority and feudalism', order: 1 },
    { id: 'T-BB-2', optionKey: getHistoryOptionKey('thematic', 'BB'), title: 'Challenging royal authority', order: 2 },
    { id: 'T-BB-3', optionKey: getHistoryOptionKey('thematic', 'BB'), title: 'Reform and reformers', order: 3 },
    { id: 'T-BB-4', optionKey: getHistoryOptionKey('thematic', 'BB'), title: 'Equality and rights', order: 4 },
  ]},
  { optionKey: getHistoryOptionKey('thematic', 'AC'), id: 'AC', title: 'Britain: Migration, empires and the people: c790 to the present day', paper: 2, section: 'thematic', parts: [
    { id: 'T-AC-1', optionKey: getHistoryOptionKey('thematic', 'AC'), title: 'Conquered and conquerors', order: 1 },
    { id: 'T-AC-2', optionKey: getHistoryOptionKey('thematic', 'AC'), title: 'Looking west', order: 2 },
    { id: 'T-AC-3', optionKey: getHistoryOptionKey('thematic', 'AC'), title: 'Expansion and empire', order: 3 },
    { id: 'T-AC-4', optionKey: getHistoryOptionKey('thematic', 'AC'), title: "Britain in the 20th century", order: 4 },
  ]},
];

const BRITISH_DEPTH_OPTIONS: HistoryOptionMeta[] = [
  { optionKey: getHistoryOptionKey('britishDepth', 'BA'), id: 'BA', title: 'Norman England, c1066–c1100', paper: 2, section: 'britishDepth', parts: [
    { id: 'B-BA-1', optionKey: getHistoryOptionKey('britishDepth', 'BA'), title: 'The Normans: conquest and control', order: 1 },
    { id: 'B-BA-2', optionKey: getHistoryOptionKey('britishDepth', 'BA'), title: 'Life under the Normans', order: 2 },
    { id: 'B-BA-3', optionKey: getHistoryOptionKey('britishDepth', 'BA'), title: 'The Norman Church and monasticism', order: 3 },
    { id: 'B-BA-4', optionKey: getHistoryOptionKey('britishDepth', 'BA'), title: 'Historic environment', order: 4 },
  ]},
  { optionKey: getHistoryOptionKey('britishDepth', 'BB'), id: 'BB', title: 'Medieval England: the reign of Edward I, 1272–1307', paper: 2, section: 'britishDepth', parts: [
    { id: 'B-BB-1', optionKey: getHistoryOptionKey('britishDepth', 'BB'), title: 'Government, the rights of King and people', order: 1 },
    { id: 'B-BB-2', optionKey: getHistoryOptionKey('britishDepth', 'BB'), title: 'Life in Medieval England', order: 2 },
    { id: 'B-BB-3', optionKey: getHistoryOptionKey('britishDepth', 'BB'), title: "Edward I's military campaigns in Wales and Scotland", order: 3 },
    { id: 'B-BB-4', optionKey: getHistoryOptionKey('britishDepth', 'BB'), title: 'Historic environment', order: 4 },
  ]},
  { optionKey: getHistoryOptionKey('britishDepth', 'BC'), id: 'BC', title: 'Elizabethan England, c1568–1603', paper: 2, section: 'britishDepth', parts: [
    { id: 'B-BC-1', optionKey: getHistoryOptionKey('britishDepth', 'BC'), title: 'Court and Parliament', order: 1 },
    { id: 'B-BC-2', optionKey: getHistoryOptionKey('britishDepth', 'BC'), title: 'Life in Elizabethan times', order: 2 },
    { id: 'B-BC-3', optionKey: getHistoryOptionKey('britishDepth', 'BC'), title: 'Historic environment', order: 3 },
  ]},
  { optionKey: getHistoryOptionKey('britishDepth', 'BD'), id: 'BD', title: 'Restoration England, 1660–1685', paper: 2, section: 'britishDepth', parts: [
    { id: 'B-BD-1', optionKey: getHistoryOptionKey('britishDepth', 'BD'), title: 'Crown and Parliament', order: 1 },
    { id: 'B-BD-2', optionKey: getHistoryOptionKey('britishDepth', 'BD'), title: 'Life in Restoration England', order: 2 },
    { id: 'B-BD-3', optionKey: getHistoryOptionKey('britishDepth', 'BD'), title: 'Historic environment', order: 3 },
  ]},
];

export const HISTORY_PERIOD_OPTIONS = PERIOD_OPTIONS;
export const HISTORY_WIDER_WORLD_OPTIONS = WIDER_WORLD_OPTIONS;
export const HISTORY_THEMATIC_OPTIONS = THEMATIC_OPTIONS;
export const HISTORY_BRITISH_DEPTH_OPTIONS = BRITISH_DEPTH_OPTIONS;

export function getHistoryOptionMeta(optionKey: string): HistoryOptionMeta | undefined {
  return [...PERIOD_OPTIONS, ...WIDER_WORLD_OPTIONS, ...THEMATIC_OPTIONS, ...BRITISH_DEPTH_OPTIONS].find(o => o.optionKey === optionKey);
}

export function getHistoryOptionsForSelection(selection: {
  periodStudy: string;
  widerWorldDepth: string;
  thematic: string;
  britishDepth: string;
}): HistoryOptionMeta[] {
  return [
    getHistoryOptionMeta(getHistoryOptionKey('period', selection.periodStudy))!,
    getHistoryOptionMeta(getHistoryOptionKey('widerWorldDepth', selection.widerWorldDepth))!,
    getHistoryOptionMeta(getHistoryOptionKey('thematic', selection.thematic))!,
    getHistoryOptionMeta(getHistoryOptionKey('britishDepth', selection.britishDepth))!,
  ].filter(Boolean);
}

// ============================================================================
// TIMELINE EVENTS – Germany (period_AB)
// ============================================================================

const PERIOD_AB = getHistoryOptionKey('period', 'AB');

const GERMANY_TIMELINE: TimelineEvent[] = [
  { id: 'AB-1-1890', optionKey: PERIOD_AB, partId: 'AB-1', date: '1890', title: 'Kaiser Wilhelm II becomes Emperor', description: 'Wilhelm II succeeded his father Frederick III. He favoured strong personal rule and clashed with Chancellor Bismarck, who resigned in 1890. Industrialisation and the growth of socialism increased during his reign.', order: 1 },
  { id: 'AB-1-1914', optionKey: PERIOD_AB, partId: 'AB-1', date: '1914', title: 'Outbreak of the First World War', description: 'Germany entered the war as part of the Triple Alliance. The war placed huge strain on the economy and society; war weariness and defeat led to the end of the monarchy.', order: 2 },
  { id: 'AB-1-1918', optionKey: PERIOD_AB, partId: 'AB-1', date: 'November 1918', title: 'Abdication of the Kaiser; armistice', description: 'Wilhelm II abdicated and fled to the Netherlands. The Weimar Republic was declared. Germany signed the armistice ending the First World War.', order: 3 },
  { id: 'AB-1-1919', optionKey: PERIOD_AB, partId: 'AB-1', date: 'January 1919', title: 'Spartacist Uprising', description: 'The Spartacist League (Rosa Luxemburg and Karl Liebknecht) attempted a communist revolution in Berlin. It was crushed by the Freikorps and the new government.', order: 4 },
  { id: 'AB-1-1919b', optionKey: PERIOD_AB, partId: 'AB-1', date: 'June 1919', title: 'Treaty of Versailles signed', description: 'Germany was forced to accept war guilt (Article 231), reparations, loss of territory, and military restrictions. Many Germans saw it as a Diktat and resented the Weimar government for signing.', order: 5 },
  { id: 'AB-1-1920', optionKey: PERIOD_AB, partId: 'AB-1', date: 'March 1920', title: 'Kapp Putsch', description: 'Right-wing Freikorps under Wolfgang Kapp marched on Berlin in protest at disbandment. The government fled; the putsch failed when workers went on strike.', order: 6 },
  { id: 'AB-1-1923', optionKey: PERIOD_AB, partId: 'AB-1', date: '1923', title: 'Occupation of the Ruhr; hyperinflation', description: 'France and Belgium occupied the Ruhr after Germany failed to pay reparations. The government printed money to pay workers, leading to hyperinflation and the collapse of the mark.', order: 7 },
  { id: 'AB-1-1923b', optionKey: PERIOD_AB, partId: 'AB-1', date: 'November 1923', title: 'Munich Putsch', description: 'Hitler and the Nazis attempted to seize power in Munich. The putsch failed and Hitler was imprisoned, where he wrote Mein Kampf.', order: 8 },
  { id: 'AB-1-1924', optionKey: PERIOD_AB, partId: 'AB-1', date: '1924–1929', title: 'Stresemann era – recovery', description: 'Stresemann introduced the Rentenmark, negotiated the Dawes Plan (1924) and Young Plan (1929), and improved relations with the Allies. Weimar culture flourished.', order: 9 },
  { id: 'AB-2-1929', optionKey: PERIOD_AB, partId: 'AB-2', date: 'October 1929', title: 'Wall Street Crash', description: 'The US stock market crashed. US loans to Germany were withdrawn, leading to mass unemployment and a crisis that weakened the Weimar Republic and boosted support for the Nazis.', order: 10 },
  { id: 'AB-2-1932', optionKey: PERIOD_AB, partId: 'AB-2', date: '1932', title: 'Nazi Party becomes largest in Reichstag', description: 'In July 1932 the Nazis won 230 seats. Hitler was not yet Chancellor; Hindenburg and Papen were reluctant to appoint him.', order: 11 },
  { id: 'AB-2-1933', optionKey: PERIOD_AB, partId: 'AB-2', date: '30 January 1933', title: 'Hitler becomes Chancellor', description: 'Under pressure from Papen and others, Hindenburg appointed Hitler as Chancellor. The Nazis were in government but did not yet have full control.', order: 12 },
  { id: 'AB-2-1933b', optionKey: PERIOD_AB, partId: 'AB-2', date: '27 February 1933', title: 'Reichstag Fire', description: 'The Reichstag building was set on fire. The Nazis blamed communists and used the incident to push through the Reichstag Fire Decree, restricting civil liberties.', order: 13 },
  { id: 'AB-2-1933c', optionKey: PERIOD_AB, partId: 'AB-2', date: '23 March 1933', title: 'Enabling Act', description: 'The Enabling Act gave Hitler the power to pass laws without the Reichstag for four years. It effectively made him dictator.', order: 14 },
  { id: 'AB-2-1934', optionKey: PERIOD_AB, partId: 'AB-2', date: 'June 1934', title: 'Night of the Long Knives', description: 'Hitler ordered the murder of Röhm and other SA leaders, and political opponents. The SA was weakened and the SS grew in power. Hitler became Führer after Hindenburg’s death.', order: 15 },
  { id: 'AB-3-1935', optionKey: PERIOD_AB, partId: 'AB-3', date: '1935', title: 'Nuremberg Laws', description: 'Laws stripped Jews of citizenship and banned marriage between Jews and non-Jews. Persecution of minorities intensified.', order: 16 },
  { id: 'AB-3-1938', optionKey: PERIOD_AB, partId: 'AB-3', date: 'November 1938', title: 'Kristallnacht', description: 'A wave of violence against Jews; synagogues and businesses were destroyed. It marked a major escalation in anti-Jewish policy.', order: 17 },
  { id: 'AB-3-1939', optionKey: PERIOD_AB, partId: 'AB-3', date: '1939–1945', title: 'Second World War', description: 'Germany invaded Poland in September 1939. The war led to bombing, rationing, labour shortages, and the Holocaust (Final Solution).', order: 18 },
];

export const HISTORY_TIMELINE_EVENTS: TimelineEvent[] = [
  ...GERMANY_TIMELINE,
  ...PERIOD_AA_TIMELINE,
  ...PERIOD_AC_TIMELINE,
  ...PERIOD_AD_TIMELINE,
  ...WW_BA_TIMELINE,
  ...WW_BB_TIMELINE,
  ...WW_BC_TIMELINE,
  ...WW_BD_TIMELINE,
  ...WW_BE_TIMELINE,
  ...THEMATIC_AA_TIMELINE,
  ...THEMATIC_BB_TIMELINE,
  ...THEMATIC_AC_TIMELINE,
  ...BRITISH_BA_TIMELINE,
  ...BRITISH_BB_TIMELINE,
  ...BRITISH_BC_TIMELINE,
  ...BRITISH_BD_TIMELINE,
];

// ============================================================================
// KEY TERMS – Germany (period_AB)
// ============================================================================

const GERMANY_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'AB-kt1', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Kaiser', definition: 'German Emperor; head of state until 1918.', dateOrContext: '1890–1918' },
  { id: 'AB-kt2', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Weimar Republic', definition: 'The democratic government of Germany from 1919 to 1933, named after the town where its constitution was agreed.', dateOrContext: '1919–1933' },
  { id: 'AB-kt3', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Treaty of Versailles', definition: 'Peace treaty of 1919. Germany accepted war guilt (Article 231), reparations, loss of territory, and military limits.', dateOrContext: '1919' },
  { id: 'AB-kt4', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Spartacist Uprising', definition: 'January 1919 communist revolt in Berlin led by Luxemburg and Liebknecht; crushed by Freikorps.', dateOrContext: '1919' },
  { id: 'AB-kt5', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Kapp Putsch', definition: 'March 1920 right-wing putsch in Berlin led by Wolfgang Kapp; failed after a general strike.', dateOrContext: '1920' },
  { id: 'AB-kt6', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Hyperinflation', definition: 'Extremely rapid rise in prices; in 1923 the German mark became almost worthless.', dateOrContext: '1923' },
  { id: 'AB-kt7', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Rentenmark', definition: 'New currency introduced by Stresemann in 1923 to replace the worthless mark.', dateOrContext: '1923' },
  { id: 'AB-kt8', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Dawes Plan', definition: '1924 agreement that reduced annual reparations and allowed US loans to Germany.', dateOrContext: '1924' },
  { id: 'AB-kt9', optionKey: PERIOD_AB, partId: 'AB-1', term: 'Young Plan', definition: '1929 plan that reduced total reparations and extended the payment period.', dateOrContext: '1929' },
  { id: 'AB-kt10', optionKey: PERIOD_AB, partId: 'AB-2', term: 'NSDAP', definition: 'Nazi Party (National Socialist German Workers’ Party); led by Hitler from 1921.', inContext: 'Often called the Nazi Party.' },
  { id: 'AB-kt11', optionKey: PERIOD_AB, partId: 'AB-2', term: 'Munich Putsch', definition: 'November 1923 failed Nazi attempt to seize power in Munich; Hitler was imprisoned and wrote Mein Kampf.', dateOrContext: '1923' },
  { id: 'AB-kt12', optionKey: PERIOD_AB, partId: 'AB-2', term: 'SA (Sturmabteilung)', definition: 'Nazi paramilitary force (Brownshirts); led by Röhm; used for violence and intimidation.', inContext: 'Weakened after the Night of the Long Knives.' },
  { id: 'AB-kt13', optionKey: PERIOD_AB, partId: 'AB-2', term: 'Reichstag Fire', definition: 'February 1933 fire at the Reichstag building; Nazis blamed communists and used it to justify emergency powers.', dateOrContext: '1933' },
  { id: 'AB-kt14', optionKey: PERIOD_AB, partId: 'AB-2', term: 'Enabling Act', definition: 'March 1933 law that gave Hitler the power to make laws without the Reichstag; effectively made him dictator.', dateOrContext: '1933' },
  { id: 'AB-kt15', optionKey: PERIOD_AB, partId: 'AB-2', term: 'Night of the Long Knives', definition: 'June 1934 purge in which Hitler had Röhm and other SA leaders and opponents murdered.', dateOrContext: '1934' },
  { id: 'AB-kt16', optionKey: PERIOD_AB, partId: 'AB-2', term: 'Führer', definition: 'Leader; title Hitler took after Hindenburg’s death in 1934, combining head of state and government.', dateOrContext: '1934' },
  { id: 'AB-kt17', optionKey: PERIOD_AB, partId: 'AB-3', term: 'Gestapo', definition: 'Nazi secret police; could arrest and detain people without trial.', inContext: 'Part of the police state under Himmler and the SS.' },
  { id: 'AB-kt18', optionKey: PERIOD_AB, partId: 'AB-3', term: 'SS (Schutzstaffel)', definition: 'Elite Nazi bodyguard and security force; ran concentration camps and carried out the Holocaust.', inContext: 'Led by Himmler.' },
  { id: 'AB-kt19', optionKey: PERIOD_AB, partId: 'AB-3', term: 'Final Solution', definition: 'Nazi plan to murder all Jews in Europe; implemented through extermination camps from 1941.', dateOrContext: '1941 onwards' },
];

export const HISTORY_KEY_TERMS: HistoryKeyTerm[] = [
  ...GERMANY_KEY_TERMS,
  ...PERIOD_AA_KEY_TERMS,
  ...PERIOD_AC_KEY_TERMS,
  ...PERIOD_AD_KEY_TERMS,
  ...WW_BA_KEY_TERMS,
  ...WW_BB_KEY_TERMS,
  ...WW_BC_KEY_TERMS,
  ...WW_BD_KEY_TERMS,
  ...WW_BE_KEY_TERMS,
  ...THEMATIC_AA_KEY_TERMS,
  ...THEMATIC_BB_KEY_TERMS,
  ...THEMATIC_AC_KEY_TERMS,
  ...BRITISH_BA_KEY_TERMS,
  ...BRITISH_BB_KEY_TERMS,
  ...BRITISH_BC_KEY_TERMS,
  ...BRITISH_BD_KEY_TERMS,
];

// ============================================================================
// CONCEPT CARDS – Germany (period_AB)
// ============================================================================

const GERMANY_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'AB-cc1', optionKey: PERIOD_AB, partId: 'AB-1', prompt: 'The Treaty of Versailles contributed to the collapse of the Weimar Republic. Identify one cause and one consequence of the treaty for Germany.', conceptType: 'consequence', modelAnswer: 'Cause: defeat in WW1 and the terms imposed (e.g. war guilt, reparations). Consequence: economic strain (e.g. hyperinflation when Germany could not pay), political unrest, and lasting resentment that the Nazis exploited.' },
  { id: 'AB-cc2', optionKey: PERIOD_AB, partId: 'AB-1', prompt: 'What changed and what stayed the same in Germany between 1924 and 1929 (the Stresemann era)?', conceptType: 'change', modelAnswer: 'Changed: economy stabilised (Rentenmark, Dawes/Young Plans), international relations improved, Weimar culture flourished (art, cinema, literature). Stayed the same: political instability (short-lived governments), many still opposed democracy; some groups (e.g. Nazis) remained marginal.' },
  { id: 'AB-cc3', optionKey: PERIOD_AB, partId: 'AB-2', prompt: 'Why did support for the Nazis grow between 1928 and 1932?', conceptType: 'cause', modelAnswer: 'Wall Street Crash (1929) led to US loans being withdrawn, mass unemployment, and hardship. The Weimar government was blamed; moderate parties lost support. Hitler promised jobs, order, and to overturn Versailles; the SA offered strength and action. Papen and Hindenburg’s tactics also helped bring Hitler to power.' },
  { id: 'AB-cc4', optionKey: PERIOD_AB, partId: 'AB-3', prompt: 'How did the Nazis use propaganda and terror to control Germany?', conceptType: 'significance', modelAnswer: 'Propaganda (Goebbels): controlled press, radio, rallies, and culture to spread Nazi ideas and create a cult around Hitler. Terror: Gestapo and SS arrested and intimidated opponents; concentration camps; fear of being reported. Together they reduced open opposition and encouraged conformity.' },
];

export const HISTORY_CONCEPT_CARDS: HistoryConceptCard[] = [
  ...GERMANY_CONCEPT_CARDS,
  ...PERIOD_AA_CONCEPT_CARDS,
  ...PERIOD_AC_CONCEPT_CARDS,
  ...PERIOD_AD_CONCEPT_CARDS,
  ...WW_BA_CONCEPT_CARDS,
  ...WW_BB_CONCEPT_CARDS,
  ...WW_BC_CONCEPT_CARDS,
  ...WW_BD_CONCEPT_CARDS,
  ...WW_BE_CONCEPT_CARDS,
  ...THEMATIC_AA_CONCEPT_CARDS,
  ...THEMATIC_BB_CONCEPT_CARDS,
  ...THEMATIC_AC_CONCEPT_CARDS,
  ...BRITISH_BA_CONCEPT_CARDS,
  ...BRITISH_BB_CONCEPT_CARDS,
  ...BRITISH_BC_CONCEPT_CARDS,
  ...BRITISH_BD_CONCEPT_CARDS,
];

// ============================================================================
// QUICK CHECK – Germany (period_AB)
// ============================================================================

const GERMANY_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'AB-qc1', optionKey: PERIOD_AB, partId: 'AB-1', type: 'multipleChoice', question: 'When did the Kaiser abdicate?', options: ['1917', '1918', '1919', '1920'], correctAnswer: '1918', feedback: { correct: 'Correct – November 1918.', incorrect: 'The Kaiser abdicated in November 1918, after defeat in the First World War.' } },
  { id: 'AB-qc2', optionKey: PERIOD_AB, partId: 'AB-1', type: 'multipleChoice', question: 'What was Article 231 of the Treaty of Versailles?', options: ['Reparations', 'War guilt clause', 'Territorial losses', 'Military restrictions'], correctAnswer: 'War guilt clause', feedback: { correct: 'Correct.', incorrect: 'Article 231 was the war guilt clause – Germany had to accept responsibility for the war.' } },
  { id: 'AB-qc3', optionKey: PERIOD_AB, partId: 'AB-1', type: 'trueFalse', question: 'The Spartacist Uprising was a right-wing revolt.', correctAnswer: 'false', feedback: { correct: 'Correct – it was a left-wing (communist) revolt.', incorrect: 'The Spartacists were communists; the Kapp Putsch was right-wing.' } },
  { id: 'AB-qc4', optionKey: PERIOD_AB, partId: 'AB-1', type: 'shortAnswer', question: 'What new currency did Stresemann introduce in 1923?', correctAnswer: 'Rentenmark', feedback: { correct: 'Correct.', incorrect: 'Stresemann introduced the Rentenmark to replace the worthless mark.' } },
  { id: 'AB-qc5', optionKey: PERIOD_AB, partId: 'AB-2', type: 'multipleChoice', question: 'In which year did Hitler become Chancellor?', options: ['1932', '1933', '1934', '1935'], correctAnswer: '1933', feedback: { correct: 'Correct – 30 January 1933.', incorrect: 'Hitler became Chancellor on 30 January 1933.' } },
  { id: 'AB-qc6', optionKey: PERIOD_AB, partId: 'AB-2', type: 'multipleChoice', question: 'What did the Enabling Act do?', options: ['Banned the Communist Party', 'Gave Hitler the power to make laws without the Reichstag', 'Created the Gestapo', 'Abolished the SA'], correctAnswer: 'Gave Hitler the power to make laws without the Reichstag', feedback: { correct: 'Correct.', incorrect: 'The Enabling Act (March 1933) gave Hitler dictatorial law-making power.' } },
  { id: 'AB-qc7', optionKey: PERIOD_AB, partId: 'AB-2', type: 'trueFalse', question: 'The Night of the Long Knives targeted the SA leadership.', correctAnswer: 'true', feedback: { correct: 'Correct – Röhm and other SA leaders were killed.', incorrect: 'Hitler ordered the murder of Röhm and other SA leaders in June 1934.' } },
  { id: 'AB-qc8', optionKey: PERIOD_AB, partId: 'AB-3', type: 'shortAnswer', question: 'Who was in charge of Nazi propaganda?', correctAnswer: 'Goebbels', feedback: { correct: 'Correct.', incorrect: 'Joseph Goebbels was Minister of Propaganda.' } },
];

export const HISTORY_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  ...GERMANY_QUICK_CHECKS,
  ...PERIOD_AA_QUICK_CHECKS,
  ...PERIOD_AC_QUICK_CHECKS,
  ...PERIOD_AD_QUICK_CHECKS,
  ...WW_BA_QUICK_CHECKS,
  ...WW_BB_QUICK_CHECKS,
  ...WW_BC_QUICK_CHECKS,
  ...WW_BD_QUICK_CHECKS,
  ...WW_BE_QUICK_CHECKS,
  ...THEMATIC_AA_QUICK_CHECKS,
  ...THEMATIC_BB_QUICK_CHECKS,
  ...THEMATIC_AC_QUICK_CHECKS,
  ...BRITISH_BA_QUICK_CHECKS,
  ...BRITISH_BB_QUICK_CHECKS,
  ...BRITISH_BC_QUICK_CHECKS,
  ...BRITISH_BD_QUICK_CHECKS,
];

// ============================================================================
// INTERPRETATION SETS – Germany (period_AB)
// ============================================================================

const GERMANY_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'AB-int1',
    optionKey: PERIOD_AB,
    partId: 'AB-1',
    interpretations: [
      { id: 'i1', text: 'The Weimar Republic was doomed from the start. The Treaty of Versailles made it unpopular, and the constitution allowed too many parties, so no stable government could be formed.', ascription: 'A modern historian writing in 2010.' },
      { id: 'i2', text: 'Weimar was not doomed. Between 1924 and 1929 Germany recovered economically and culturally. It was the Depression and the choices of elites like Hindenburg and Papen that destroyed democracy.', ascription: 'Another historian writing in 2015.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about the Weimar Republic?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing about the reasons for the failure of the Weimar Republic?',
    markSchemeSummary: 'AO4: Compare content/focus; explain different evidence, purpose, or context; evaluate in context of your knowledge.',
  },
];

export const HISTORY_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  ...GERMANY_INTERPRETATION_SETS,
  ...PERIOD_AA_INTERPRETATION_SETS,
  ...PERIOD_AC_INTERPRETATION_SETS,
  ...PERIOD_AD_INTERPRETATION_SETS,
  ...BRITISH_BA_INTERPRETATION_SETS,
  ...BRITISH_BB_INTERPRETATION_SETS,
  ...BRITISH_BC_INTERPRETATION_SETS,
  ...BRITISH_BD_INTERPRETATION_SETS,
];

// ============================================================================
// QUESTION LAB – Germany (period_AB)
// ============================================================================

export const HISTORY_QUESTION_LAB_ITEMS: HistoryQuestionLabItem[] = [
  { id: 'AB-ql1', optionKey: PERIOD_AB, partId: 'AB-1', questionType: 'describe', question: 'Describe two key features of the Treaty of Versailles.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AB-ql2', optionKey: PERIOD_AB, partId: 'AB-1', questionType: 'explain', question: 'In what ways were Germans affected by hyperinflation in 1923? Explain your answer.', markSchemeSummary: 'AO1 + AO2. Explain ways (e.g. savings wiped out, wages paid daily, barter) with knowledge.' },
  { id: 'AB-ql3', optionKey: PERIOD_AB, partId: 'AB-2', questionType: 'account', question: 'Write an account of how Hitler became Chancellor in January 1933.', markSchemeSummary: 'Narrative account showing cause/consequence. AO1 + AO2.' },
  { id: 'AB-ql4', optionKey: PERIOD_AB, partId: 'AB-2', questionType: 'essay', question: '"The main reason Hitler was able to establish a dictatorship by 1934 was the Enabling Act." How far do you agree?', markSchemeSummary: 'Essay with judgement; consider Enabling Act and other factors (e.g. Reichstag Fire, Night of the Long Knives, terror, propaganda). AO1 + AO2.' },
];

export const HISTORY_QUESTION_LAB_ITEMS: HistoryQuestionLabItem[] = [
  ...GERMANY_QUESTION_LAB,
  ...PERIOD_AA_QUESTION_LAB,
  ...PERIOD_AC_QUESTION_LAB,
  ...PERIOD_AD_QUESTION_LAB,
  ...WW_BA_QUESTION_LAB,
  ...WW_BB_QUESTION_LAB,
  ...WW_BC_QUESTION_LAB,
  ...WW_BD_QUESTION_LAB,
  ...WW_BE_QUESTION_LAB,
  ...THEMATIC_AA_QUESTION_LAB,
  ...THEMATIC_BB_QUESTION_LAB,
  ...THEMATIC_AC_QUESTION_LAB,
  ...BRITISH_BA_QUESTION_LAB,
  ...BRITISH_BB_QUESTION_LAB,
  ...BRITISH_BC_QUESTION_LAB,
  ...BRITISH_BD_QUESTION_LAB,
];

// ============================================================================
// HELPERS – filter content by selection
// ============================================================================

export function getTimelineEventsForOption(optionKey: string, partId?: string): TimelineEvent[] {
  let list = HISTORY_TIMELINE_EVENTS.filter(e => e.optionKey === optionKey);
  if (partId) list = list.filter(e => e.partId === partId);
  return list.sort((a, b) => a.order - b.order);
}

export function getKeyTermsForOption(optionKey: string, partId?: string): HistoryKeyTerm[] {
  let list = HISTORY_KEY_TERMS.filter(t => t.optionKey === optionKey);
  if (partId) list = list.filter(t => t.partId === partId);
  return list;
}

export function getConceptCardsForOption(optionKey: string, partId?: string): HistoryConceptCard[] {
  let list = HISTORY_CONCEPT_CARDS.filter(c => c.optionKey === optionKey);
  if (partId) list = list.filter(c => c.partId === partId);
  return list;
}

export function getQuickChecksForOption(optionKey: string, partId?: string): HistoryQuickCheckItem[] {
  let list = HISTORY_QUICK_CHECKS.filter(q => q.optionKey === optionKey);
  if (partId) list = list.filter(q => q.partId === partId);
  return list;
}

export function getInterpretationSetsForOption(optionKey: string, partId?: string): HistoryInterpretationSet[] {
  let list = HISTORY_INTERPRETATION_SETS.filter(s => s.optionKey === optionKey);
  if (partId) list = list.filter(s => s.partId === partId);
  return list;
}

// ============================================================================
// SOURCE SETS (Paper 1 Section B, Paper 2 Section A – wider world depth & thematic)
// ============================================================================

export const HISTORY_SOURCE_SETS: HistorySourceSet[] = [
  ...WW_BA_SOURCE_SETS,
  ...WW_BB_SOURCE_SETS,
  ...WW_BC_SOURCE_SETS,
  ...WW_BD_SOURCE_SETS,
  ...WW_BE_SOURCE_SETS,
  ...THEMATIC_AA_SOURCE_SETS,
  ...THEMATIC_BB_SOURCE_SETS,
  ...THEMATIC_AC_SOURCE_SETS,
];

export function getSourceSetsForOption(optionKey: string, partId?: string): HistorySourceSet[] {
  let list = HISTORY_SOURCE_SETS.filter(s => s.optionKey === optionKey);
  if (partId) list = list.filter(s => s.partId === partId);
  return list;
}

export function getQuestionLabItemsForOption(optionKey: string, partId?: string): HistoryQuestionLabItem[] {
  let list = HISTORY_QUESTION_LAB_ITEMS.filter(q => q.optionKey === optionKey);
  if (partId) list = list.filter(q => q.partId === partId);
  return list;
}

export const HISTORY_HISTORIC_ENVIRONMENT_SITES = HISTORIC_ENVIRONMENT_SITES;

export function getHistoricEnvironmentSitesForOption(optionKey: string): HistoricEnvironmentSite[] {
  return HISTORIC_ENVIRONMENT_SITES.filter(s => s.optionKey === optionKey);
}

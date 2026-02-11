/**
 * History Hub – Wider world depth study content (BA–BE)
 * Paper 1 Section B – uses Source Lab (AO3)
 */

import { getHistoryOptionKey } from '../types/historyHub';
import type { TimelineEvent, HistoryKeyTerm, HistoryConceptCard, HistoryQuickCheckItem, HistorySourceSet, HistoryQuestionLabItem } from '../types/historyHub';

const WW_BA = getHistoryOptionKey('widerWorldDepth', 'BA');
const WW_BB = getHistoryOptionKey('widerWorldDepth', 'BB');
const WW_BC = getHistoryOptionKey('widerWorldDepth', 'BC');
const WW_BD = getHistoryOptionKey('widerWorldDepth', 'BD');
const WW_BE = getHistoryOptionKey('widerWorldDepth', 'BE');

// ============================================================================
// BA: Conflict and tension – The First World War, 1894–1918
// ============================================================================

export const WW_BA_TIMELINE: TimelineEvent[] = [
  { id: 'BA-1-1894', optionKey: WW_BA, partId: 'BA-1', date: '1894', title: 'Franco-Russian Alliance', description: 'France and Russia formed an alliance against Germany. System of alliances began to divide Europe.', order: 1 },
  { id: 'BA-1-1904', optionKey: WW_BA, partId: 'BA-1', date: '1904', title: 'Entente Cordiale', description: 'Britain and France agreed to cooperate. Not a formal alliance but shifted British policy.', order: 2 },
  { id: 'BA-1-1905', optionKey: WW_BA, partId: 'BA-1', date: '1905', title: 'First Moroccan Crisis', description: 'Kaiser challenged French influence in Morocco. Britain backed France. Tensions rose.', order: 3 },
  { id: 'BA-1-1907', optionKey: WW_BA, partId: 'BA-1', date: '1907', title: 'Anglo-Russian Entente', description: 'Britain and Russia settled disputes. Triple Entente (Britain, France, Russia) formed.', order: 4 },
  { id: 'BA-1-1908', optionKey: WW_BA, partId: 'BA-1', date: '1908', title: 'Bosnian Crisis', description: 'Austria annexed Bosnia. Serbia and Russia humiliated. Balkan tensions increased.', order: 5 },
  { id: 'BA-1-1914', optionKey: WW_BA, partId: 'BA-1', date: '28 June 1914', title: 'Assassination at Sarajevo', description: 'Archduke Franz Ferdinand shot by Gavrilo Princip. Trigger for July Crisis.', order: 6 },
  { id: 'BA-1-1914', optionKey: WW_BA, partId: 'BA-1', date: 'July 1914', title: 'July Crisis', description: 'Austria ultimatum to Serbia; Russia mobilised; Germany declared war on Russia and France; Schlieffen Plan; Britain entered when Belgium invaded.', order: 7 },
  { id: 'BA-2-1914', optionKey: WW_BA, partId: 'BA-2', date: '1914', title: 'Schlieffen Plan fails; stalemate', description: 'German advance halted at Marne. Trench warfare began.', order: 8 },
  { id: 'BA-2-1916', optionKey: WW_BA, partId: 'BA-2', date: '1916', title: 'Verdun and Somme', description: 'Verdun: attrition. Somme: heavy casualties, limited gains. Stalemate continued.', order: 9 },
  { id: 'BA-2-1915', optionKey: WW_BA, partId: 'BA-2', date: '1915', title: 'Gallipoli', description: 'Allied campaign to open Dardanelles failed. Withdrawn 1916.', order: 10 },
  { id: 'BA-3-1917', optionKey: WW_BA, partId: 'BA-3', date: '1917', title: 'Russia leaves war; USA enters', description: 'Russia withdrew after Revolution. USA entered after unrestricted submarine warfare.', order: 11 },
  { id: 'BA-3-1918', optionKey: WW_BA, partId: 'BA-3', date: '1918', title: 'Hundred Days; armistice', description: 'Allied offensives pushed Germany back. Blockade, exhaustion. Armistice 11 November 1918.', order: 12 },
];

export const WW_BA_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'BA-kt1', optionKey: WW_BA, partId: 'BA-1', term: 'Triple Alliance', definition: 'Germany, Austria-Hungary, Italy. Pre-war alliance.', dateOrContext: '1882' },
  { id: 'BA-kt2', optionKey: WW_BA, partId: 'BA-1', term: 'Triple Entente', definition: 'Britain, France, Russia. Pre-war understanding.', dateOrContext: '1907' },
  { id: 'BA-kt3', optionKey: WW_BA, partId: 'BA-1', term: 'Schlieffen Plan', definition: 'German plan to defeat France quickly then turn on Russia.', dateOrContext: '1914' },
  { id: 'BA-kt4', optionKey: WW_BA, partId: 'BA-2', term: 'Trench warfare', definition: 'Fighting from dug-in positions; stalemate on Western Front.', dateOrContext: '1914–1918' },
  { id: 'BA-kt5', optionKey: WW_BA, partId: 'BA-2', term: 'Verdun', definition: '1916 battle of attrition; Germany aimed to "bleed France white."', dateOrContext: '1916' },
  { id: 'BA-kt6', optionKey: WW_BA, partId: 'BA-2', term: 'Somme', definition: '1916 British offensive; heavy casualties for limited gains.', dateOrContext: '1916' },
  { id: 'BA-kt7', optionKey: WW_BA, partId: 'BA-3', term: 'Hundred Days', definition: '1918 Allied offensives that pushed Germany to defeat.', dateOrContext: '1918' },
  { id: 'BA-kt8', optionKey: WW_BA, partId: 'BA-3', term: 'Armistice', definition: 'Ceasefire agreed 11 November 1918.', dateOrContext: '1918' },
];

export const WW_BA_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'BA-cc1', optionKey: WW_BA, partId: 'BA-1', prompt: 'What were the causes of the First World War?', conceptType: 'cause', modelAnswer: 'Alliances (Triple Entente vs Triple Alliance), imperialism, militarism, naval race, Balkan crises, assassination at Sarajevo, July Crisis. Long-term and short-term causes.' },
];

export const WW_BA_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'BA-qc1', optionKey: WW_BA, partId: 'BA-1', type: 'multipleChoice', question: 'When did the First World War begin?', options: ['1912', '1914', '1916', '1918'], correctAnswer: '1914', feedback: { correct: 'Correct.', incorrect: 'The First World War began in 1914.' } },
  { id: 'BA-qc2', optionKey: WW_BA, partId: 'BA-3', type: 'shortAnswer', question: 'On what date did the armistice take effect?', correctAnswer: '11 November 1918', feedback: { correct: 'Correct.', incorrect: '11 November 1918.' } },
];

export const WW_BA_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'BA-src1',
    optionKey: WW_BA,
    partId: 'BA-1',
    sources: [
      { id: 's1', type: 'written', content: 'We must secure our position in the world. The naval race with Britain is essential to our security and our future as a great power.', provenance: 'A German admiral writing in 1912.' },
    ],
    question: 'How useful is this source for understanding the causes of the First World War?',
    markSchemeSummary: 'Content: what it shows (naval rivalry, German ambitions). Provenance: German perspective. Context: naval race, Anglo-German tension. Limitation: one view, doesn\'t show other causes.',
  },
  {
    id: 'BA-src2',
    optionKey: WW_BA,
    partId: 'BA-2',
    sources: [
      { id: 's1', type: 'written', content: 'The mud is indescribable. Men drown in shell holes. We have taken a few hundred yards at the cost of thousands of lives.', provenance: 'A British soldier\'s letter from the Somme, 1916.' },
    ],
    question: 'How useful is this source for understanding the nature of fighting on the Western Front?',
    markSchemeSummary: 'Content: conditions, attrition. Provenance: eyewitness, soldier. Context: trench warfare, Somme. Limitation: one battle, one perspective.',
  },
];

export const WW_BA_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'BA-ql1', optionKey: WW_BA, partId: 'BA-1', questionType: 'describe', question: 'Describe two key features of the system of alliances before 1914.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'BA-ql2', optionKey: WW_BA, partId: 'BA-1', questionType: 'explain', question: 'In what ways did the assassination at Sarajevo contribute to the outbreak of war? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'BA-ql3', optionKey: WW_BA, partId: 'BA-2', questionType: 'account', question: 'Write an account of the development of trench warfare on the Western Front.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'BA-ql4', optionKey: WW_BA, partId: 'BA-3', questionType: 'essay', question: '"The main reason for Germany\'s defeat in 1918 was the entry of the USA." How far do you agree?', markSchemeSummary: 'Essay. Consider USA, blockade, Hundred Days, exhaustion. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// BB: Conflict and tension – The inter-war years, 1918–1939
// ============================================================================

export const WW_BB_TIMELINE: TimelineEvent[] = [
  { id: 'BB-1-1919', optionKey: WW_BB, partId: 'BB-1', date: '1919', title: 'Paris Peace Conference', description: 'Wilson (USA), Clemenceau (France), Lloyd George (Britain). Versailles Treaty with Germany.', order: 1 },
  { id: 'BB-1-1919', optionKey: WW_BB, partId: 'BB-1', date: '28 June 1919', title: 'Treaty of Versailles signed', description: 'Germany: war guilt, reparations, territorial losses, military restrictions. Many Germans saw it as a Diktat.', order: 2 },
  { id: 'BB-2-1920', optionKey: WW_BB, partId: 'BB-2', date: '1920', title: 'League of Nations established', description: 'Based in Geneva. USA did not join. Aim: collective security.', order: 3 },
  { id: 'BB-2-1925', optionKey: WW_BB, partId: 'BB-2', date: '1925', title: 'Locarno Treaties', description: 'Germany accepted western borders. "Spirit of Locarno" – hope for peace.', order: 4 },
  { id: 'BB-2-1931', optionKey: WW_BB, partId: 'BB-2', date: '1931', title: 'Manchuria', description: 'Japan invaded Manchuria. League failed to stop aggression.', order: 5 },
  { id: 'BB-2-1935', optionKey: WW_BB, partId: 'BB-2', date: '1935', title: 'Abyssinia', description: 'Italy invaded Abyssinia. League sanctions failed. League discredited.', order: 6 },
  { id: 'BB-3-1936', optionKey: WW_BB, partId: 'BB-3', date: '1936', title: 'Rhineland remilitarised', description: 'Hitler sent troops into the demilitarised Rhineland. No resistance.', order: 7 },
  { id: 'BB-3-1938', optionKey: WW_BB, partId: 'BB-3', date: '1938', title: 'Anschluss', description: 'Germany annexed Austria. Union forbidden by Versailles.', order: 8 },
  { id: 'BB-3-1938', optionKey: WW_BB, partId: 'BB-3', date: 'September 1938', title: 'Munich Agreement', description: 'Britain and France agreed to Hitler taking Sudetenland. Appeasement. Czechoslovakia betrayed.', order: 9 },
  { id: 'BB-3-1939', optionKey: WW_BB, partId: 'BB-3', date: 'March 1939', title: 'Germany occupies rest of Czechoslovakia', description: 'Appeasement failed. Britain and France guaranteed Poland.', order: 10 },
  { id: 'BB-3-1939', optionKey: WW_BB, partId: 'BB-3', date: 'August 1939', title: 'Nazi-Soviet Pact', description: 'Germany and USSR agreed not to fight; secretly divided Eastern Europe. Cleared way for invasion of Poland.', order: 11 },
  { id: 'BB-3-1939', optionKey: WW_BB, partId: 'BB-3', date: '1 September 1939', title: 'Germany invades Poland; Second World War begins', description: 'Britain and France declared war on Germany.', order: 12 },
];

export const WW_BB_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'BB-kt1', optionKey: WW_BB, partId: 'BB-1', term: 'Treaty of Versailles', definition: '1919 peace treaty. Germany: war guilt, reparations, territorial losses, military limits.', dateOrContext: '1919' },
  { id: 'BB-kt2', optionKey: WW_BB, partId: 'BB-1', term: 'League of Nations', definition: 'International organisation for collective security; USA did not join.', dateOrContext: '1920' },
  { id: 'BB-kt3', optionKey: WW_BB, partId: 'BB-2', term: 'Locarno', definition: '1925 treaties; Germany accepted western borders.', dateOrContext: '1925' },
  { id: 'BB-kt4', optionKey: WW_BB, partId: 'BB-2', term: 'Manchuria', definition: '1931 Japanese invasion; League failed to act.', dateOrContext: '1931' },
  { id: 'BB-kt5', optionKey: WW_BB, partId: 'BB-2', term: 'Abyssinia', definition: '1935 Italian invasion; League sanctions failed.', dateOrContext: '1935' },
  { id: 'BB-kt6', optionKey: WW_BB, partId: 'BB-3', term: 'Appeasement', definition: 'Policy of giving in to Hitler to avoid war; failed.', dateOrContext: '1930s' },
  { id: 'BB-kt7', optionKey: WW_BB, partId: 'BB-3', term: 'Munich Agreement', definition: '1938; Britain and France let Hitler take Sudetenland.', dateOrContext: '1938' },
  { id: 'BB-kt8', optionKey: WW_BB, partId: 'BB-3', term: 'Nazi-Soviet Pact', definition: '1939 agreement between Germany and USSR; divided Eastern Europe.', dateOrContext: '1939' },
];

export const WW_BB_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'BB-cc1', optionKey: WW_BB, partId: 'BB-2', prompt: 'Why did the League of Nations fail to prevent aggression in the 1930s?', conceptType: 'cause', modelAnswer: 'USA not a member; no army; major powers (Germany, Japan, Italy) left or ignored it; Manchuria and Abyssinia showed weakness; economic sanctions not enforced.' },
];

export const WW_BB_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'BB-qc1', optionKey: WW_BB, partId: 'BB-1', type: 'multipleChoice', question: 'Which country did not join the League of Nations?', options: ['Britain', 'France', 'USA', 'Italy'], correctAnswer: 'USA', feedback: { correct: 'Correct.', incorrect: 'The USA did not join the League.' } },
  { id: 'BB-qc2', optionKey: WW_BB, partId: 'BB-3', type: 'shortAnswer', question: 'In which year did Germany invade Poland?', correctAnswer: '1939', feedback: { correct: 'Correct.', incorrect: '1939.' } },
];

export const WW_BB_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'BB-src1',
    optionKey: WW_BB,
    partId: 'BB-1',
    sources: [
      { id: 's1', type: 'written', content: 'This treaty is a Diktat – a dictated peace. We have been forced to sign under duress. Germany will never accept this humiliation.', provenance: 'A German politician, 1919.' },
    ],
    question: 'How useful is this source for understanding German reactions to the Treaty of Versailles?',
    markSchemeSummary: 'Content: German anger, Diktat. Provenance: German perspective. Context: Versailles terms. Limitation: one view; doesn\'t show Allied perspective.',
  },
];

export const WW_BB_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'BB-ql1', optionKey: WW_BB, partId: 'BB-1', questionType: 'describe', question: 'Describe two key features of the Treaty of Versailles.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'BB-ql2', optionKey: WW_BB, partId: 'BB-2', questionType: 'explain', question: 'In what ways did the League of Nations fail in the 1930s? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'BB-ql3', optionKey: WW_BB, partId: 'BB-3', questionType: 'account', question: 'Write an account of how war broke out in 1939.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'BB-ql4', optionKey: WW_BB, partId: 'BB-3', questionType: 'essay', question: '"The main reason for the outbreak of the Second World War was the policy of appeasement." How far do you agree?', markSchemeSummary: 'Essay. Consider appeasement, Hitler\'s aims, Nazi-Soviet Pact, Versailles. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// BC: Conflict and tension – East and West, 1945–1972
// ============================================================================

export const WW_BC_TIMELINE: TimelineEvent[] = [
  { id: 'BC-1-1945', optionKey: WW_BC, partId: 'BC-1', date: 'February 1945', title: 'Yalta Conference', description: 'Churchill, Roosevelt, Stalin. Agreed to divide Germany; free elections in Eastern Europe. Tensions over Poland.', order: 1 },
  { id: 'BC-1-1945', optionKey: WW_BC, partId: 'BC-1', date: 'July 1945', title: 'Potsdam Conference', description: 'Truman, Stalin. Disagreements over Germany and Eastern Europe. Atomic bomb changed dynamics.', order: 2 },
  { id: 'BC-1-1946', optionKey: WW_BC, partId: 'BC-1', date: '1946', title: 'Iron Curtain speech', description: 'Churchill warned of Soviet expansion. Cold War rhetoric intensified.', order: 3 },
  { id: 'BC-1-1947', optionKey: WW_BC, partId: 'BC-1', date: '1947', title: 'Truman Doctrine and Marshall Plan', description: 'USA committed to containing communism. Marshall Plan: economic aid to Europe.', order: 4 },
  { id: 'BC-1-1948', optionKey: WW_BC, partId: 'BC-1', date: '1948', title: 'Berlin Blockade', description: 'Soviets blocked West Berlin. Allies airlifted supplies. Blockade lifted 1949.', order: 5 },
  { id: 'BC-2-1949', optionKey: WW_BC, partId: 'BC-2', date: '1949', title: 'NATO formed', description: 'North Atlantic Treaty Organisation. USA and Western Europe against USSR.', order: 6 },
  { id: 'BC-2-1950', optionKey: WW_BC, partId: 'BC-2', date: '1950', title: 'Korean War begins', description: 'North Korea invaded South. UN (mainly US) intervened. Stalemate.', order: 7 },
  { id: 'BC-2-1961', optionKey: WW_BC, partId: 'BC-3', date: '1961', title: 'Berlin Wall built', description: 'East Germany built wall to stop escapes. Symbol of division.', order: 8 },
  { id: 'BC-3-1962', optionKey: WW_BC, partId: 'BC-3', date: '1962', title: 'Cuban Missile Crisis', description: 'USSR placed missiles in Cuba. US blockade. Near nuclear war. USSR withdrew.', order: 9 },
  { id: 'BC-3-1968', optionKey: WW_BC, partId: 'BC-3', date: '1968', title: 'Prague Spring', description: 'Czech reform movement. USSR invaded to suppress it.', order: 10 },
  { id: 'BC-3-1972', optionKey: WW_BC, partId: 'BC-3', date: '1972', title: 'SALT 1', description: 'Strategic Arms Limitation Treaty. Détente; limits on nuclear weapons.', order: 11 },
];

export const WW_BC_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'BC-kt1', optionKey: WW_BC, partId: 'BC-1', term: 'Iron Curtain', definition: 'Churchill\'s term for the divide between East and West Europe.', dateOrContext: '1946' },
  { id: 'BC-kt2', optionKey: WW_BC, partId: 'BC-1', term: 'Truman Doctrine', definition: 'US policy to contain communism; support for countries resisting communism.', dateOrContext: '1947' },
  { id: 'BC-kt3', optionKey: WW_BC, partId: 'BC-1', term: 'Marshall Plan', definition: 'US economic aid to rebuild Europe; reduce appeal of communism.', dateOrContext: '1947' },
  { id: 'BC-kt4', optionKey: WW_BC, partId: 'BC-1', term: 'Berlin Blockade', definition: '1948–49 Soviet blockade of West Berlin; Allies responded with airlift.', dateOrContext: '1948' },
  { id: 'BC-kt5', optionKey: WW_BC, partId: 'BC-2', term: 'NATO', definition: 'North Atlantic Treaty Organisation; Western military alliance.', dateOrContext: '1949' },
  { id: 'BC-kt6', optionKey: WW_BC, partId: 'BC-3', term: 'Cuban Missile Crisis', definition: '1962 confrontation over Soviet missiles in Cuba; near nuclear war.', dateOrContext: '1962' },
  { id: 'BC-kt7', optionKey: WW_BC, partId: 'BC-3', term: 'Détente', definition: 'Easing of Cold War tensions in the late 1960s and 1970s.', dateOrContext: '1960s–70s' },
  { id: 'BC-kt8', optionKey: WW_BC, partId: 'BC-3', term: 'SALT 1', definition: '1972 treaty limiting nuclear weapons.', dateOrContext: '1972' },
];

export const WW_BC_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'BC-cc1', optionKey: WW_BC, partId: 'BC-1', prompt: 'What were the causes of the Cold War?', conceptType: 'cause', modelAnswer: 'Ideological differences (capitalism vs communism); wartime alliances broke down; Yalta/Potsdam disagreements; Soviet control of Eastern Europe; Truman Doctrine; Marshall Plan; Berlin Blockade.' },
];

export const WW_BC_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'BC-qc1', optionKey: WW_BC, partId: 'BC-1', type: 'multipleChoice', question: 'Who gave the Iron Curtain speech?', options: ['Truman', 'Stalin', 'Churchill', 'Roosevelt'], correctAnswer: 'Churchill', feedback: { correct: 'Correct.', incorrect: 'Churchill gave the Iron Curtain speech in 1946.' } },
  { id: 'BC-qc2', optionKey: WW_BC, partId: 'BC-3', type: 'shortAnswer', question: 'In which year was the Berlin Wall built?', correctAnswer: '1961', feedback: { correct: 'Correct.', incorrect: '1961.' } },
];

export const WW_BC_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'BC-src1',
    optionKey: WW_BC,
    partId: 'BC-1',
    sources: [
      { id: 's1', type: 'written', content: 'From Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent. Behind that line lie all the capitals of the ancient states of Central and Eastern Europe.', provenance: 'Churchill\'s Iron Curtain speech, March 1946.' },
    ],
    question: 'How useful is this source for understanding the origins of the Cold War?',
    markSchemeSummary: 'Content: division of Europe. Provenance: Churchill, Western perspective. Context: Soviet control of Eastern Europe. Limitation: one-sided; Soviet view different.',
  },
];

export const WW_BC_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'BC-ql1', optionKey: WW_BC, partId: 'BC-1', questionType: 'describe', question: 'Describe two key features of the Truman Doctrine.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'BC-ql2', optionKey: WW_BC, partId: 'BC-1', questionType: 'explain', question: 'In what ways did the Berlin Blockade increase Cold War tensions? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'BC-ql3', optionKey: WW_BC, partId: 'BC-3', questionType: 'account', question: 'Write an account of the Cuban Missile Crisis.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'BC-ql4', optionKey: WW_BC, partId: 'BC-3', questionType: 'essay', question: '"The main reason for Détente in the 1970s was the Cuban Missile Crisis." How far do you agree?', markSchemeSummary: 'Essay. Consider Cuba, costs of arms race, Vietnam, Prague Spring. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// BD: Conflict and tension – Asia, 1950–1975
// ============================================================================

export const WW_BD_TIMELINE: TimelineEvent[] = [
  { id: 'BD-1-1950', optionKey: WW_BD, partId: 'BD-1', date: '1950', title: 'Korean War begins', description: 'North Korea invaded South. UN (mainly US) intervened. Stalemate near 38th parallel.', order: 1 },
  { id: 'BD-1-1953', optionKey: WW_BD, partId: 'BD-1', date: '1953', title: 'Korean armistice', description: 'Ceasefire; Korea remained divided.', order: 2 },
  { id: 'BD-2-1954', optionKey: WW_BD, partId: 'BD-2', date: '1954', title: 'Dien Bien Phu; Geneva', description: 'French defeated in Vietnam. Geneva Agreement: Vietnam divided. Elections planned.', order: 3 },
  { id: 'BD-2-1963', optionKey: WW_BD, partId: 'BD-2', date: '1963', title: 'Diem overthrown', description: 'South Vietnamese leader assassinated. Instability.', order: 4 },
  { id: 'BD-2-1964', optionKey: WW_BD, partId: 'BD-2', date: '1964', title: 'Gulf of Tonkin resolution', description: 'Congress gave wider powers for US involvement. Escalation in Vietnam.', order: 5 },
  { id: 'BD-2-1968', optionKey: WW_BD, partId: 'BD-2', date: '1968', title: 'Tet Offensive', description: 'Vietcong attacked cities. Military defeat for communists but political victory; US public turned against war.', order: 6 },
  { id: 'BD-3-1969', optionKey: WW_BD, partId: 'BD-3', date: '1969', title: 'Vietnamisation', description: 'Nixon\'s policy: US troop withdrawal; South Vietnam to fight own war.', order: 7 },
  { id: 'BD-3-1973', optionKey: WW_BD, partId: 'BD-3', date: '1973', title: 'Paris Peace Accords', description: 'US withdrew. Ceasefire. Conflict continued.', order: 8 },
  { id: 'BD-3-1975', optionKey: WW_BD, partId: 'BD-3', date: '1975', title: 'Fall of Saigon', description: 'North Vietnamese captured Saigon. Vietnam united under communism.', order: 9 },
];

export const WW_BD_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'BD-kt1', optionKey: WW_BD, partId: 'BD-1', term: '38th parallel', definition: 'Line dividing North and South Korea.', dateOrContext: '1950s' },
  { id: 'BD-kt2', optionKey: WW_BD, partId: 'BD-2', term: 'Vietcong', definition: 'Communist guerrillas in South Vietnam.', dateOrContext: '1960s' },
  { id: 'BD-kt3', optionKey: WW_BD, partId: 'BD-2', term: 'Gulf of Tonkin', definition: '1964 incident; led to US escalation in Vietnam.', dateOrContext: '1964' },
  { id: 'BD-kt4', optionKey: WW_BD, partId: 'BD-2', term: 'Tet Offensive', definition: '1968 Vietcong attacks; turned US public against war.', dateOrContext: '1968' },
  { id: 'BD-kt5', optionKey: WW_BD, partId: 'BD-3', term: 'Vietnamisation', definition: 'Nixon\'s policy of withdrawing US troops.', dateOrContext: '1969' },
  { id: 'BD-kt6', optionKey: WW_BD, partId: 'BD-3', term: 'Fall of Saigon', definition: '1975; North Vietnam captured South\'s capital.', dateOrContext: '1975' },
];

export const WW_BD_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'BD-cc1', optionKey: WW_BD, partId: 'BD-2', prompt: 'Why did the USA become involved in Vietnam?', conceptType: 'cause', modelAnswer: 'Containment of communism; domino theory; support for South Vietnam; Gulf of Tonkin; fear of Soviet/Chinese expansion.' },
];

export const WW_BD_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'BD-qc1', optionKey: WW_BD, partId: 'BD-2', type: 'multipleChoice', question: 'In which year did the Tet Offensive occur?', options: ['1964', '1966', '1968', '1970'], correctAnswer: '1968', feedback: { correct: 'Correct.', incorrect: '1968.' } },
];

export const WW_BD_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'BD-src1',
    optionKey: WW_BD,
    partId: 'BD-2',
    sources: [
      { id: 's1', type: 'written', content: 'We have to eliminate the Vietcong. They hide among the people. We may have to destroy the village to save it.', provenance: 'A US officer in Vietnam, 1968.' },
    ],
    question: 'How useful is this source for understanding US tactics in Vietnam?',
    markSchemeSummary: 'Content: brutal tactics. Provenance: US military. Context: guerrilla war, search and destroy. Limitation: one view.',
  },
];

export const WW_BD_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'BD-ql1', optionKey: WW_BD, partId: 'BD-1', questionType: 'describe', question: 'Describe two key features of the Korean War.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'BD-ql2', optionKey: WW_BD, partId: 'BD-2', questionType: 'explain', question: 'In what ways did the Tet Offensive affect the Vietnam War? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'BD-ql3', optionKey: WW_BD, partId: 'BD-3', questionType: 'account', question: 'Write an account of how the Vietnam War ended.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'BD-ql4', optionKey: WW_BD, partId: 'BD-3', questionType: 'essay', question: '"The main reason for US defeat in Vietnam was media coverage." How far do you agree?', markSchemeSummary: 'Essay. Consider media, Tet, Vietnamisation, guerrilla war. AO1 + AO2 + SPaG.' },
];

// ============================================================================
// BE: Conflict and tension – Gulf and Afghanistan, 1990–2009
// ============================================================================

export const WW_BE_TIMELINE: TimelineEvent[] = [
  { id: 'BE-1-1990', optionKey: WW_BE, partId: 'BE-1', date: '1990', title: 'Iraq invades Kuwait', description: 'Saddam Hussein invaded Kuwait. Oil, debt, regional power.', order: 1 },
  { id: 'BE-1-1991', optionKey: WW_BE, partId: 'BE-1', date: '1991', title: 'Gulf War', description: 'US-led coalition liberated Kuwait. Quick victory. Saddam stayed in power.', order: 2 },
  { id: 'BE-2-2001', optionKey: WW_BE, partId: 'BE-2', date: '11 September 2001', title: '9/11 attacks', description: 'Al-Qaeda attacked USA. War on Terror declared.', order: 3 },
  { id: 'BE-2-2001', optionKey: WW_BE, partId: 'BE-2', date: '2001', title: 'Afghanistan invasion', description: 'US and allies invaded to remove Taliban; find bin Laden. Karzai government.', order: 4 },
  { id: 'BE-3-2003', optionKey: WW_BE, partId: 'BE-3', date: '2003', title: 'Iraq War', description: 'US-led invasion. WMD justification disputed. Saddam overthrown.', order: 5 },
  { id: 'BE-3-2003', optionKey: WW_BE, partId: 'BE-3', date: '2003 onwards', title: 'Iraq insurgency', description: 'Sectarian violence, insurgency. Elections 2005. Surge 2007.', order: 6 },
];

export const WW_BE_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'BE-kt1', optionKey: WW_BE, partId: 'BE-1', term: 'Gulf War', definition: '1991 US-led liberation of Kuwait from Iraq.', dateOrContext: '1991' },
  { id: 'BE-kt2', optionKey: WW_BE, partId: 'BE-2', term: 'Al-Qaeda', definition: 'Terrorist group; 9/11 attacks.', dateOrContext: '2001' },
  { id: 'BE-kt3', optionKey: WW_BE, partId: 'BE-2', term: 'Taliban', definition: 'Islamic regime in Afghanistan; harboured al-Qaeda.', dateOrContext: '1990s–2001' },
  { id: 'BE-kt4', optionKey: WW_BE, partId: 'BE-3', term: 'WMD', definition: 'Weapons of mass destruction; justification for Iraq invasion disputed.', dateOrContext: '2003' },
  { id: 'BE-kt5', optionKey: WW_BE, partId: 'BE-3', term: 'Surge', definition: '2007 US troop increase in Iraq to combat insurgency.', dateOrContext: '2007' },
];

export const WW_BE_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'BE-cc1', optionKey: WW_BE, partId: 'BE-2', prompt: 'How did 9/11 change US foreign policy?', conceptType: 'consequence', modelAnswer: 'War on Terror; invasion of Afghanistan; increased security; Patriot Act; later Iraq invasion. Shift to pre-emptive action.' },
];

export const WW_BE_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'BE-qc1', optionKey: WW_BE, partId: 'BE-2', type: 'shortAnswer', question: 'In which year did the 9/11 attacks occur?', correctAnswer: '2001', feedback: { correct: 'Correct.', incorrect: '2001.' } },
];

export const WW_BE_SOURCE_SETS: HistorySourceSet[] = [
  {
    id: 'BE-src1',
    optionKey: WW_BE,
    partId: 'BE-2',
    sources: [
      { id: 's1', type: 'written', content: 'We will not waver, we will not tire, we will not falter, and we will not fail. Peace and freedom will prevail.', provenance: 'President George W. Bush, 20 September 2001.' },
    ],
    question: 'How useful is this source for understanding the US response to 9/11?',
    markSchemeSummary: 'Content: determination, War on Terror. Provenance: US President. Context: 9/11, Afghanistan. Limitation: rhetoric; doesn\'t show policy detail.',
  },
];

export const WW_BE_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'BE-ql1', optionKey: WW_BE, partId: 'BE-1', questionType: 'describe', question: 'Describe two key features of the Gulf War.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'BE-ql2', optionKey: WW_BE, partId: 'BE-2', questionType: 'explain', question: 'In what ways did 9/11 change US foreign policy? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'BE-ql3', optionKey: WW_BE, partId: 'BE-3', questionType: 'account', question: 'Write an account of the Iraq War from 2003 to 2009.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'BE-ql4', optionKey: WW_BE, partId: 'BE-3', questionType: 'essay', question: '"The main reason for the 2003 invasion of Iraq was the belief that Saddam had WMD." How far do you agree?', markSchemeSummary: 'Essay. Consider WMD, oil, regime change, 9/11. AO1 + AO2 + SPaG.' },
];

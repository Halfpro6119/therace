/**
 * History Hub – Period study content (AA America 1840–1895, AC Russia, AD America 1920–1973)
 * AB Germany is in historyHubData.ts
 */

import { getHistoryOptionKey } from '../types/historyHub';
import type { TimelineEvent, HistoryKeyTerm, HistoryConceptCard, HistoryQuickCheckItem, HistoryInterpretationSet, HistoryQuestionLabItem } from '../types/historyHub';

const PERIOD_AA = getHistoryOptionKey('period', 'AA');
const PERIOD_AC = getHistoryOptionKey('period', 'AC');
const PERIOD_AD = getHistoryOptionKey('period', 'AD');

// ============================================================================
// AA: America 1840–1895 – Expansion and consolidation
// ============================================================================

export const PERIOD_AA_TIMELINE: TimelineEvent[] = [
  { id: 'AA-1-1840s', optionKey: PERIOD_AA, partId: 'AA-1', date: '1840s', title: 'Manifest Destiny and westward expansion', description: 'Belief that Americans were destined to expand across the continent. Settlers moved west; geography (Great Plains, Rockies) and the Permanent Indian Frontier shaped expansion.', order: 1 },
  { id: 'AA-1-1846', optionKey: PERIOD_AA, partId: 'AA-1', date: '1846', title: 'Mormons begin migration to Utah', description: 'Brigham Young led Mormons west to escape persecution. They established Salt Lake City and developed irrigation for farming in the desert.', order: 2 },
  { id: 'AA-1-1848', optionKey: PERIOD_AA, partId: 'AA-1', date: '1848', title: 'Gold discovered in California', description: 'Gold rush drew thousands of miners (Forty-Niners). Boom towns, lawlessness, and conflict with Plains Indians increased.', order: 3 },
  { id: 'AA-1-1851', optionKey: PERIOD_AA, partId: 'AA-1', date: '1851', title: 'Fort Laramie Treaty', description: 'US government agreed boundaries with Plains Indians in return for safe passage for settlers. Tensions continued as settlers violated terms.', order: 4 },
  { id: 'AA-2-1861', optionKey: PERIOD_AA, partId: 'AA-2', date: '1861', title: 'American Civil War begins', description: 'North (Union) vs South (Confederacy) over slavery, states\' rights, and westward expansion. Lincoln vs Davis.', order: 5 },
  { id: 'AA-2-1864', optionKey: PERIOD_AA, partId: 'AA-2', date: '1864', title: 'Sand Creek Massacre', description: 'Colonel Chivington\'s troops attacked a Cheyenne camp at Sand Creek, killing many women and children. Outrage and worsening relations.', order: 6 },
  { id: 'AA-2-1866', optionKey: PERIOD_AA, partId: 'AA-2', date: '1866', title: "Fetterman's Trap", description: 'Lakota warriors ambushed Captain Fetterman\'s troops. Led to government policy of moving Indians to reservations.', order: 7 },
  { id: 'AA-2-1865', optionKey: PERIOD_AA, partId: 'AA-2', date: '1865', title: 'End of Civil War; 13th Amendment', description: 'Slavery abolished. Reconstruction began in the South.', order: 8 },
  { id: 'AA-3-1862', optionKey: PERIOD_AA, partId: 'AA-3', date: '1862', title: 'Homestead Act', description: '160 acres of land free to settlers who improved it for 5 years. Encouraged farming on the Plains.', order: 9 },
  { id: 'AA-3-1876', optionKey: PERIOD_AA, partId: 'AA-3', date: '1876', title: 'Battle of Little Bighorn', description: 'Sitting Bull and Crazy Horse defeated Custer\'s 7th Cavalry. US government intensified the "Indian problem" policy.', order: 10 },
  { id: 'AA-3-1887', optionKey: PERIOD_AA, partId: 'AA-3', date: '1887', title: 'Dawes Act', description: 'Broke up tribal land; allocated individual plots to Indians. Aimed to assimilate Indians; led to loss of land and culture.', order: 11 },
  { id: 'AA-3-1890', optionKey: PERIOD_AA, partId: 'AA-3', date: '1890', title: 'Wounded Knee Massacre', description: 'US troops killed around 150 Lakota at Wounded Knee. Marked the end of armed resistance on the Plains.', order: 12 },
];

export const PERIOD_AA_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'AA-kt1', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Manifest Destiny', definition: 'Belief that Americans were destined to expand across North America.', dateOrContext: '1840s' },
  { id: 'AA-kt2', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Permanent Indian Frontier', definition: 'Line beyond which Indians were to remain; settlers moved west and violated it.', dateOrContext: '1830s–1840s' },
  { id: 'AA-kt3', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Fort Laramie Treaty', definition: '1851 agreement with Plains Indians for safe passage; boundaries often ignored.', dateOrContext: '1851' },
  { id: 'AA-kt4', optionKey: PERIOD_AA, partId: 'AA-2', term: 'Sand Creek Massacre', definition: '1864 attack on Cheyenne camp; many women and children killed.', dateOrContext: '1864' },
  { id: 'AA-kt5', optionKey: PERIOD_AA, partId: 'AA-2', term: "Fetterman's Trap", definition: '1866 ambush of US troops by Lakota; led to reservation policy.', dateOrContext: '1866' },
  { id: 'AA-kt6', optionKey: PERIOD_AA, partId: 'AA-2', term: '13th Amendment', definition: 'Abolished slavery in the United States.', dateOrContext: '1865' },
  { id: 'AA-kt7', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Homestead Act', definition: '1862 law: 160 acres free to settlers who farmed for 5 years.', dateOrContext: '1862' },
  { id: 'AA-kt8', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Little Bighorn', definition: '1876 battle; Sioux and Cheyenne defeated Custer.', dateOrContext: '1876' },
  { id: 'AA-kt9', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Dawes Act', definition: '1887 law that broke up tribal land and allocated individual plots to assimilate Indians.', dateOrContext: '1887' },
  { id: 'AA-kt10', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Wounded Knee', definition: '1890 massacre of Lakota by US troops; end of armed resistance.', dateOrContext: '1890' },
];

export const PERIOD_AA_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'AA-cc1', optionKey: PERIOD_AA, partId: 'AA-1', prompt: 'What were the causes and consequences of the Gold Rush for California and the Plains Indians?', conceptType: 'consequence', modelAnswer: 'Causes: discovery of gold, economic opportunity. Consequences: mass migration, boom towns, lawlessness; conflict with Indians over land; environmental damage.' },
  { id: 'AA-cc2', optionKey: PERIOD_AA, partId: 'AA-2', prompt: 'How did government policy towards Plains Indians change between 1851 and 1890?', conceptType: 'change', modelAnswer: '1851: treaties and boundaries. 1860s: conflict, reservations after Sand Creek and Fetterman. 1887: Dawes Act assimilation. 1890: Wounded Knee ended armed resistance.' },
  { id: 'AA-cc3', optionKey: PERIOD_AA, partId: 'AA-3', prompt: 'Why did the Homestead Act both help and hinder settlement of the Plains?', conceptType: 'cause', modelAnswer: 'Helped: free land attracted settlers. Hindered: 160 acres too small for dry Plains; farmers needed expensive equipment; drought, insects, isolation made life hard.' },
];

export const PERIOD_AA_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'AA-qc1', optionKey: PERIOD_AA, partId: 'AA-1', type: 'multipleChoice', question: 'What was Manifest Destiny?', options: ['A treaty with Plains Indians', 'Belief in US expansion across the continent', 'A mining technique', 'A Mormon settlement'], correctAnswer: 'Belief in US expansion across the continent', feedback: { correct: 'Correct.', incorrect: 'Manifest Destiny was the belief that Americans were destined to expand across North America.' } },
  { id: 'AA-qc2', optionKey: PERIOD_AA, partId: 'AA-2', type: 'multipleChoice', question: 'When was the Sand Creek Massacre?', options: ['1851', '1864', '1876', '1890'], correctAnswer: '1864', feedback: { correct: 'Correct.', incorrect: 'The Sand Creek Massacre was in 1864.' } },
  { id: 'AA-qc3', optionKey: PERIOD_AA, partId: 'AA-3', type: 'shortAnswer', question: 'Which 1887 law broke up tribal land?', correctAnswer: 'Dawes Act', feedback: { correct: 'Correct.', incorrect: 'The Dawes Act of 1887 broke up tribal land.' } },
];

export const PERIOD_AA_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'AA-int1',
    optionKey: PERIOD_AA,
    partId: 'AA-3',
    interpretations: [
      { id: 'i1', text: 'The Dawes Act was a well-intentioned attempt to help Indians by giving them individual land and encouraging them to adopt American ways of life.', ascription: 'A US government official in 1887.' },
      { id: 'i2', text: 'The Dawes Act was designed to destroy Indian culture and take their remaining land. It was part of a policy of forced assimilation.', ascription: 'A modern historian writing in 2005.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about the Dawes Act?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare content; explain different perspectives/context; evaluate using knowledge.',
  },
];

export const PERIOD_AA_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'AA-ql1', optionKey: PERIOD_AA, partId: 'AA-1', questionType: 'describe', question: 'Describe two key features of the Homestead Act.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AA-ql2', optionKey: PERIOD_AA, partId: 'AA-2', questionType: 'explain', question: 'In what ways did the Civil War affect the Plains Indians? Explain your answer.', markSchemeSummary: 'AO1 + AO2. Explain ways with knowledge.' },
  { id: 'AA-ql3', optionKey: PERIOD_AA, partId: 'AA-3', questionType: 'account', question: 'Write an account of how the US government dealt with the "Indian problem" between 1865 and 1890.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AA-ql4', optionKey: PERIOD_AA, partId: 'AA-3', questionType: 'essay', question: '"The main reason for the destruction of the Plains Indians\' way of life was the Dawes Act." How far do you agree?', markSchemeSummary: 'Essay with judgement. Consider Dawes Act and other factors (Homestead Act, railroads, buffalo, war). AO1 + AO2.' },
];

// ============================================================================
// AC: Russia 1894–1945 – Tsardom and communism
// ============================================================================

export const PERIOD_AC_TIMELINE: TimelineEvent[] = [
  { id: 'AC-1-1894', optionKey: PERIOD_AC, partId: 'AC-1', date: '1894', title: 'Nicholas II becomes Tsar', description: 'Last Tsar of Russia. Inherited autocracy, economic backwardness, and growing discontent. Resisted reform.', order: 1 },
  { id: 'AC-1-1905', optionKey: PERIOD_AC, partId: 'AC-1', date: '1905', title: '1905 Revolution', description: 'Bloody Sunday, strikes, mutinies. Nicholas forced to create the Duma (parliament).', order: 2 },
  { id: 'AC-1-1906', optionKey: PERIOD_AC, partId: 'AC-1', date: '1906', title: 'Stolypin reforms', description: 'Prime Minister Stolypin tried to modernise agriculture; some peasants gained land. Assassinated 1911.', order: 3 },
  { id: 'AC-1-1914', optionKey: PERIOD_AC, partId: 'AC-1', date: '1914', title: 'Russia enters First World War', description: 'Heavy defeats, food shortages, Rasputin\'s influence. Discontent grew.', order: 4 },
  { id: 'AC-1-1917', optionKey: PERIOD_AC, partId: 'AC-1', date: 'March 1917', title: 'February Revolution; Tsar abdicates', description: 'Strikes and mutinies in Petrograd. Nicholas abdicated. Provisional Government formed.', order: 5 },
  { id: 'AC-2-1917', optionKey: PERIOD_AC, partId: 'AC-2', date: 'October 1917', title: 'October Revolution', description: 'Bolsheviks under Lenin seized power. "Peace, land, bread."', order: 6 },
  { id: 'AC-2-1918', optionKey: PERIOD_AC, partId: 'AC-2', date: '1918–1921', title: 'Russian Civil War', description: 'Reds (Bolsheviks) vs Whites (opponents). Reds won with terror and organisation.', order: 7 },
  { id: 'AC-2-1921', optionKey: PERIOD_AC, partId: 'AC-2', date: '1921', title: 'New Economic Policy (NEP)', description: 'Lenin allowed private trade and small-scale capitalism to recover the economy after War Communism.', order: 8 },
  { id: 'AC-3-1924', optionKey: PERIOD_AC, partId: 'AC-3', date: '1924', title: 'Lenin dies; power struggle', description: 'Stalin, Trotsky, and others competed. Stalin gradually gained control.', order: 9 },
  { id: 'AC-3-1928', optionKey: PERIOD_AC, partId: 'AC-3', date: '1928', title: 'First Five Year Plan', description: 'Stalin launched rapid industrialisation. Heavy industry prioritised.', order: 10 },
  { id: 'AC-3-1929', optionKey: PERIOD_AC, partId: 'AC-3', date: '1929', title: 'Collectivisation begins', description: 'Forced peasants onto collective farms. Kulaks "eliminated as a class." Famine.', order: 11 },
  { id: 'AC-3-1930s', optionKey: PERIOD_AC, partId: 'AC-3', date: '1930s', title: 'Purges and Terror', description: 'Stalin eliminated rivals. Show trials, execution, labour camps (Gulags).', order: 12 },
  { id: 'AC-3-1941', optionKey: PERIOD_AC, partId: 'AC-3', date: '1941', title: 'Operation Barbarossa', description: 'Germany invaded USSR. Great Patriotic War; Soviet victory by 1945.', order: 13 },
];

export const PERIOD_AC_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'AC-kt1', optionKey: PERIOD_AC, partId: 'AC-1', term: 'Nicholas II', definition: 'Last Tsar of Russia; ruled 1894–1917; abdicated in 1917.', dateOrContext: '1894–1917' },
  { id: 'AC-kt2', optionKey: PERIOD_AC, partId: 'AC-1', term: '1905 Revolution', definition: 'Uprising against Tsar; Bloody Sunday, strikes; led to creation of Duma.', dateOrContext: '1905' },
  { id: 'AC-kt3', optionKey: PERIOD_AC, partId: 'AC-1', term: 'Duma', definition: 'Russian parliament created after 1905; limited power.', dateOrContext: '1906–1917' },
  { id: 'AC-kt4', optionKey: PERIOD_AC, partId: 'AC-1', term: 'Rasputin', definition: 'Mystic who influenced Tsarina; discredited the monarchy.', dateOrContext: '1905–1916' },
  { id: 'AC-kt5', optionKey: PERIOD_AC, partId: 'AC-2', term: 'October Revolution', definition: '1917 Bolshevik seizure of power led by Lenin.', dateOrContext: '1917' },
  { id: 'AC-kt6', optionKey: PERIOD_AC, partId: 'AC-2', term: 'War Communism', definition: 'Bolshevik policy during Civil War: grain requisitioning, nationalisation.', dateOrContext: '1918–1921' },
  { id: 'AC-kt7', optionKey: PERIOD_AC, partId: 'AC-2', term: 'NEP', definition: 'New Economic Policy; Lenin allowed private trade to recover economy.', dateOrContext: '1921' },
  { id: 'AC-kt8', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Five Year Plans', definition: 'Stalin\'s programmes for rapid industrialisation.', dateOrContext: '1928 onwards' },
  { id: 'AC-kt9', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Collectivisation', definition: 'Forcing peasants onto collective farms; kulaks eliminated.', dateOrContext: '1929' },
  { id: 'AC-kt10', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Purges', definition: 'Stalin\'s elimination of rivals and "enemies"; show trials, Gulags.', dateOrContext: '1930s' },
];

export const PERIOD_AC_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'AC-cc1', optionKey: PERIOD_AC, partId: 'AC-1', prompt: 'What were the causes of the 1905 Revolution?', conceptType: 'cause', modelAnswer: 'Bloody Sunday, defeat in Russo-Japanese War, economic hardship, autocracy, lack of reform. Workers and peasants demanded change.' },
  { id: 'AC-cc2', optionKey: PERIOD_AC, partId: 'AC-2', prompt: 'Why did the Bolsheviks win the Civil War?', conceptType: 'cause', modelAnswer: 'Central position, control of railways, Red Terror, propaganda, discipline. Whites were divided and lacked popular support.' },
  { id: 'AC-cc3', optionKey: PERIOD_AC, partId: 'AC-3', prompt: 'What changed and what stayed the same between Lenin\'s and Stalin\'s rule?', conceptType: 'change', modelAnswer: 'Changed: NEP abandoned, collectivisation, Five Year Plans, cult of personality, Terror. Stayed same: one-party state, secret police, propaganda, censorship.' },
];

export const PERIOD_AC_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'AC-qc1', optionKey: PERIOD_AC, partId: 'AC-1', type: 'multipleChoice', question: 'When did Nicholas II abdicate?', options: ['1905', '1914', '1917', '1918'], correctAnswer: '1917', feedback: { correct: 'Correct – March 1917.', incorrect: 'The Tsar abdicated in March 1917.' } },
  { id: 'AC-qc2', optionKey: PERIOD_AC, partId: 'AC-2', type: 'shortAnswer', question: 'What does NEP stand for?', correctAnswer: 'New Economic Policy', feedback: { correct: 'Correct.', incorrect: 'NEP = New Economic Policy.' } },
  { id: 'AC-qc3', optionKey: PERIOD_AC, partId: 'AC-3', type: 'multipleChoice', question: 'What did collectivisation involve?', options: ['Industrial growth', 'Forcing peasants onto collective farms', 'Eliminating the army', 'Closing factories'], correctAnswer: 'Forcing peasants onto collective farms', feedback: { correct: 'Correct.', incorrect: 'Collectivisation forced peasants onto collective farms.' } },
];

export const PERIOD_AC_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'AC-int1',
    optionKey: PERIOD_AC,
    partId: 'AC-3',
    interpretations: [
      { id: 'i1', text: 'Stalin\'s industrialisation transformed Russia from a backward peasant society into a modern industrial power. The Five Year Plans were essential for victory in the Second World War.', ascription: 'A Soviet historian in 1950.' },
      { id: 'i2', text: 'Stalin\'s industrialisation was achieved at enormous human cost. Millions died in the famine and the Terror. The gains could have been made without such brutality.', ascription: 'A Western historian in 1990.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about Stalin\'s industrialisation?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
];

export const PERIOD_AC_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'AC-ql1', optionKey: PERIOD_AC, partId: 'AC-1', questionType: 'describe', question: 'Describe two key features of the 1905 Revolution.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AC-ql2', optionKey: PERIOD_AC, partId: 'AC-2', questionType: 'explain', question: 'In what ways did the Bolsheviks consolidate their power between 1917 and 1924? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'AC-ql3', optionKey: PERIOD_AC, partId: 'AC-3', questionType: 'account', question: 'Write an account of how Stalin established his dictatorship in the 1930s.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AC-ql4', optionKey: PERIOD_AC, partId: 'AC-3', questionType: 'essay', question: '"The main reason for Stalin\'s rise to power was his elimination of rivals." How far do you agree?', markSchemeSummary: 'Essay. Consider Purges, cult of personality, control of party, Trotsky\'s exile. AO1 + AO2.' },
];

// ============================================================================
// AD: America 1920–1973 – Opportunity and inequality
// ============================================================================

export const PERIOD_AD_TIMELINE: TimelineEvent[] = [
  { id: 'AD-1-1920s', optionKey: PERIOD_AD, partId: 'AD-1', date: '1920s', title: 'Boom and consumer society', description: 'Ford, mass production, consumer goods. Republican policies. Stock market rise. Entertainment, flappers.', order: 1 },
  { id: 'AD-1-1920', optionKey: PERIOD_AD, partId: 'AD-1', date: '1920', title: 'Prohibition begins', description: '18th Amendment banned alcohol. Bootlegging, speakeasies, organised crime.', order: 2 },
  { id: 'AD-1-1920s', optionKey: PERIOD_AD, partId: 'AD-1', date: '1920s', title: 'Race, immigration, KKK', description: 'Jim Crow, segregation. Immigration restrictions. KKK revival.', order: 3 },
  { id: 'AD-2-1929', optionKey: PERIOD_AD, partId: 'AD-2', date: 'October 1929', title: 'Wall Street Crash', description: 'Stock market collapsed. Banks failed. Great Depression began.', order: 4 },
  { id: 'AD-2-1932', optionKey: PERIOD_AD, partId: 'AD-2', date: '1932', title: 'Roosevelt elected', description: 'FDR promised "New Deal." Defeated Hoover in landslide.', order: 5 },
  { id: 'AD-2-1933', optionKey: PERIOD_AD, partId: 'AD-2', date: '1933', title: 'New Deal begins', description: 'Alphabet agencies: CCC, TVA, AAA, NRA, WPA. Relief, recovery, reform.', order: 6 },
  { id: 'AD-2-1941', optionKey: PERIOD_AD, partId: 'AD-2', date: '1941', title: 'USA enters Second World War', description: 'Pearl Harbor. War lifted economy; full employment.', order: 7 },
  { id: 'AD-3-1950s', optionKey: PERIOD_AD, partId: 'AD-3', date: '1950s', title: 'McCarthyism', description: 'Senator McCarthy\'s witch-hunt for communists. Red Scare.', order: 8 },
  { id: 'AD-3-1954', optionKey: PERIOD_AD, partId: 'AD-3', date: '1954', title: 'Brown v Board of Education', description: 'Supreme Court ruled segregation in schools unconstitutional.', order: 9 },
  { id: 'AD-3-1963', optionKey: PERIOD_AD, partId: 'AD-3', date: '1963', title: 'March on Washington; "I have a dream"', description: 'Martin Luther King\'s speech. Civil Rights Act 1964; Voting Rights Act 1965.', order: 10 },
  { id: 'AD-3-1964', optionKey: PERIOD_AD, partId: 'AD-3', date: '1964', title: 'Civil Rights Act', description: 'Banned discrimination based on race, colour, religion, sex.', dateOrContext: '1964' },
  { id: 'AD-3-1973', optionKey: PERIOD_AD, partId: 'AD-3', date: '1973', title: 'Roe v Wade', description: 'Supreme Court ruled abortion legal. Wins for feminism.', order: 11 },
];

export const PERIOD_AD_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'AD-kt1', optionKey: PERIOD_AD, partId: 'AD-1', term: 'Prohibition', definition: 'Ban on alcohol 1920–1933; led to bootlegging and organised crime.', dateOrContext: '1920–1933' },
  { id: 'AD-kt2', optionKey: PERIOD_AD, partId: 'AD-1', term: 'Flappers', definition: 'Young women who challenged traditional behaviour in the 1920s.', dateOrContext: '1920s' },
  { id: 'AD-kt3', optionKey: PERIOD_AD, partId: 'AD-2', term: 'New Deal', definition: 'FDR\'s programme of relief, recovery, and reform during the Depression.', dateOrContext: '1933 onwards' },
  { id: 'AD-kt4', optionKey: PERIOD_AD, partId: 'AD-2', term: 'Alphabet agencies', definition: 'CCC, TVA, AAA, NRA, WPA – New Deal programmes.', dateOrContext: '1933' },
  { id: 'AD-kt5', optionKey: PERIOD_AD, partId: 'AD-3', term: 'McCarthyism', definition: 'Witch-hunt for communists led by Senator McCarthy in the 1950s.', dateOrContext: '1950s' },
  { id: 'AD-kt6', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Civil Rights Act', definition: '1964 law banning discrimination on race, colour, religion, sex.', dateOrContext: '1964' },
  { id: 'AD-kt7', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Martin Luther King', definition: 'Civil rights leader; non-violent protest; "I have a dream."', dateOrContext: '1950s–1968' },
  { id: 'AD-kt8', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Malcolm X', definition: 'Black nationalist leader; advocated armed self-defence.', dateOrContext: '1960s' },
  { id: 'AD-kt9', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Roe v Wade', definition: '1973 Supreme Court ruling legalising abortion.', dateOrContext: '1973' },
];

export const PERIOD_AD_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'AD-cc1', optionKey: PERIOD_AD, partId: 'AD-1', prompt: 'What were the causes of the economic boom in 1920s America?', conceptType: 'cause', modelAnswer: 'Mass production (Ford), consumer goods, Republican policies (laissez-faire), easy credit, stock market speculation. Not everyone benefited: farmers, African Americans, immigrants.' },
  { id: 'AD-cc2', optionKey: PERIOD_AD, partId: 'AD-2', prompt: 'Why did the New Deal face opposition?', conceptType: 'cause', modelAnswer: 'Too much government (conservatives); not enough (radicals). Supreme Court ruled some agencies unconstitutional. Some saw it as socialism.' },
  { id: 'AD-cc3', optionKey: PERIOD_AD, partId: 'AD-3', prompt: 'How did the Civil Rights movement achieve change?', conceptType: 'consequence', modelAnswer: 'Bus boycotts, sit-ins, marches, legal challenges. King\'s leadership; media coverage. Civil Rights Act 1964, Voting Rights Act 1965. Opposition: violence, assassination.' },
];

export const PERIOD_AD_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'AD-qc1', optionKey: PERIOD_AD, partId: 'AD-1', type: 'multipleChoice', question: 'When did Prohibition begin?', options: ['1918', '1920', '1922', '1929'], correctAnswer: '1920', feedback: { correct: 'Correct.', incorrect: 'Prohibition began in 1920.' } },
  { id: 'AD-qc2', optionKey: PERIOD_AD, partId: 'AD-2', type: 'multipleChoice', question: 'Who introduced the New Deal?', options: ['Hoover', 'Roosevelt', 'Truman', 'Eisenhower'], correctAnswer: 'Roosevelt', feedback: { correct: 'Correct.', incorrect: 'FDR (Roosevelt) introduced the New Deal.' } },
  { id: 'AD-qc3', optionKey: PERIOD_AD, partId: 'AD-3', type: 'shortAnswer', question: 'In which year was the Civil Rights Act passed?', correctAnswer: '1964', feedback: { correct: 'Correct.', incorrect: 'The Civil Rights Act was passed in 1964.' } },
];

export const PERIOD_AD_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'AD-int1',
    optionKey: PERIOD_AD,
    partId: 'AD-2',
    interpretations: [
      { id: 'i1', text: 'The New Deal saved American capitalism. Roosevelt restored confidence and provided relief to millions. Without it, the Depression could have led to revolution.', ascription: 'A historian writing in 1960.' },
      { id: 'i2', text: 'The New Deal did not end the Depression. Only the Second World War brought full employment. Roosevelt\'s policies were well-intentioned but limited.', ascription: 'A historian writing in 1990.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about the New Deal?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
];

export const PERIOD_AD_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'AD-ql1', optionKey: PERIOD_AD, partId: 'AD-1', questionType: 'describe', question: 'Describe two key features of American society in the 1920s.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AD-ql2', optionKey: PERIOD_AD, partId: 'AD-2', questionType: 'explain', question: 'In what ways did the New Deal affect Americans? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'AD-ql3', optionKey: PERIOD_AD, partId: 'AD-3', questionType: 'account', question: 'Write an account of the Civil Rights movement between 1954 and 1968.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AD-ql4', optionKey: PERIOD_AD, partId: 'AD-3', questionType: 'essay', question: '"The main reason for the growth of the Civil Rights movement was Martin Luther King\'s leadership." How far do you agree?', markSchemeSummary: 'Essay. Consider King, grassroots activism, legal victories, media, Supreme Court. AO1 + AO2.' },
];

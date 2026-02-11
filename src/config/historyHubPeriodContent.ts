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
  { id: 'AA-1-1843', optionKey: PERIOD_AA, partId: 'AA-1', date: '1843', title: 'Oregon Trail migration', description: 'Thousands of pioneers travelled the Oregon Trail to the Pacific Northwest. Wagon trains, hardship, and new settlements.', order: 2 },
  { id: 'AA-1-1846', optionKey: PERIOD_AA, partId: 'AA-1', date: '1846', title: 'Mormons begin migration to Utah', description: 'Brigham Young led Mormons west to escape persecution. They established Salt Lake City and developed irrigation for farming in the desert.', order: 3 },
  { id: 'AA-1-1846b', optionKey: PERIOD_AA, partId: 'AA-1', date: '1846', title: 'Mexican-American War', description: 'War over Texas and western territories. US gained California, New Mexico. Expansion continued.', order: 4 },
  { id: 'AA-1-1848', optionKey: PERIOD_AA, partId: 'AA-1', date: '1848', title: 'Gold discovered in California', description: 'Gold rush drew thousands of miners (Forty-Niners). Boom towns, lawlessness, and conflict with Plains Indians increased.', order: 5 },
  { id: 'AA-1-1851', optionKey: PERIOD_AA, partId: 'AA-1', date: '1851', title: 'Fort Laramie Treaty', description: 'US government agreed boundaries with Plains Indians in return for safe passage for settlers. Tensions continued as settlers violated terms.', order: 6 },
  { id: 'AA-1-1859', optionKey: PERIOD_AA, partId: 'AA-1', date: '1859', title: 'Pike\'s Peak gold rush', description: 'Gold discovered in Colorado. Another wave of miners and settlers to the Plains.', order: 7 },
  { id: 'AA-2-1861', optionKey: PERIOD_AA, partId: 'AA-2', date: '1861', title: 'American Civil War begins', description: 'North (Union) vs South (Confederacy) over slavery, states\' rights, and westward expansion. Lincoln vs Davis.', order: 8 },
  { id: 'AA-2-1862', optionKey: PERIOD_AA, partId: 'AA-2', date: '1862', title: 'Dakota War', description: 'Conflict between Dakota Sioux and settlers in Minnesota. Mass execution of 38 Dakota. Escalating violence.', order: 9 },
  { id: 'AA-2-1864', optionKey: PERIOD_AA, partId: 'AA-2', date: '1864', title: 'Sand Creek Massacre', description: 'Colonel Chivington\'s troops attacked a Cheyenne camp at Sand Creek, killing many women and children. Outrage and worsening relations.', order: 10 },
  { id: 'AA-2-1865', optionKey: PERIOD_AA, partId: 'AA-2', date: '1865', title: 'End of Civil War; 13th Amendment', description: 'Slavery abolished. Reconstruction began in the South.', order: 11 },
  { id: 'AA-2-1866', optionKey: PERIOD_AA, partId: 'AA-2', date: '1866', title: "Fetterman's Trap", description: 'Lakota warriors ambushed Captain Fetterman\'s troops. Led to government policy of moving Indians to reservations.', order: 12 },
  { id: 'AA-2-1857', optionKey: PERIOD_AA, partId: 'AA-2', date: '1857', title: 'Mountain Meadows Massacre', description: 'Mormon militia killed Arkansas emigrants. Background to Civil War tensions in the West.', order: 13 },
  { id: 'AA-3-1862', optionKey: PERIOD_AA, partId: 'AA-3', date: '1862', title: 'Homestead Act', description: '160 acres of land free to settlers who improved it for 5 years. Encouraged farming on the Plains.', order: 14 },
  { id: 'AA-3-1869', optionKey: PERIOD_AA, partId: 'AA-3', date: '1869', title: 'Transcontinental Railroad completed', description: 'Union Pacific and Central Pacific joined at Promontory Point. Opened West to migration and trade.', order: 15 },
  { id: 'AA-3-1874', optionKey: PERIOD_AA, partId: 'AA-3', date: '1874', title: 'Battle of Palo Duro Canyon', description: 'US troops destroyed Indian horses and supplies. Weakened Plains resistance.', order: 16 },
  { id: 'AA-3-1876', optionKey: PERIOD_AA, partId: 'AA-3', date: '1876', title: 'Battle of Little Bighorn', description: 'Sitting Bull and Crazy Horse defeated Custer\'s 7th Cavalry. US government intensified the "Indian problem" policy.', order: 17 },
  { id: 'AA-3-1877', optionKey: PERIOD_AA, partId: 'AA-3', date: '1877', title: 'End of Reconstruction', description: 'Federal troops withdrew from South. Jim Crow laws began. Segregation and disenfranchisement.', order: 18 },
  { id: 'AA-3-1887', optionKey: PERIOD_AA, partId: 'AA-3', date: '1887', title: 'Dawes Act', description: 'Broke up tribal land; allocated individual plots to Indians. Aimed to assimilate Indians; led to loss of land and culture.', order: 19 },
  { id: 'AA-3-1890', optionKey: PERIOD_AA, partId: 'AA-3', date: '1890', title: 'Wounded Knee Massacre', description: 'US troops killed around 150 Lakota at Wounded Knee. Marked the end of armed resistance on the Plains.', order: 20 },
];

export const PERIOD_AA_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'AA-kt1', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Manifest Destiny', definition: 'Belief that Americans were destined to expand across North America.', dateOrContext: '1840s' },
  { id: 'AA-kt2', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Permanent Indian Frontier', definition: 'Line beyond which Indians were to remain; settlers moved west and violated it.', dateOrContext: '1830s–1840s' },
  { id: 'AA-kt3', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Fort Laramie Treaty', definition: '1851 agreement with Plains Indians for safe passage; boundaries often ignored.', dateOrContext: '1851' },
  { id: 'AA-kt4', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Forty-Niners', definition: 'Gold seekers who came to California in 1849.', dateOrContext: '1849' },
  { id: 'AA-kt5', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Oregon Trail', definition: 'Route used by pioneers to migrate west.', dateOrContext: '1840s' },
  { id: 'AA-kt6', optionKey: PERIOD_AA, partId: 'AA-2', term: 'Sand Creek Massacre', definition: '1864 attack on Cheyenne camp; many women and children killed.', dateOrContext: '1864' },
  { id: 'AA-kt7', optionKey: PERIOD_AA, partId: 'AA-2', term: "Fetterman's Trap", definition: '1866 ambush of US troops by Lakota; led to reservation policy.', dateOrContext: '1866' },
  { id: 'AA-kt8', optionKey: PERIOD_AA, partId: 'AA-2', term: '13th Amendment', definition: 'Abolished slavery in the United States.', dateOrContext: '1865' },
  { id: 'AA-kt9', optionKey: PERIOD_AA, partId: 'AA-2', term: 'Reconstruction', definition: 'Period after Civil War when the South was rebuilt and former slaves gained rights.', dateOrContext: '1865–1877' },
  { id: 'AA-kt10', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Homestead Act', definition: '1862 law: 160 acres free to settlers who farmed for 5 years.', dateOrContext: '1862' },
  { id: 'AA-kt11', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Little Bighorn', definition: '1876 battle; Sioux and Cheyenne defeated Custer.', dateOrContext: '1876' },
  { id: 'AA-kt12', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Dawes Act', definition: '1887 law that broke up tribal land and allocated individual plots to assimilate Indians.', dateOrContext: '1887' },
  { id: 'AA-kt13', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Wounded Knee', definition: '1890 massacre of Lakota by US troops; end of armed resistance.', dateOrContext: '1890' },
  { id: 'AA-kt14', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Sitting Bull', definition: 'Lakota chief; led resistance at Little Bighorn.', dateOrContext: '1876' },
  { id: 'AA-kt15', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Crazy Horse', definition: 'Lakota warrior; fought at Little Bighorn.', dateOrContext: '1876' },
  { id: 'AA-kt16', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Reservation', definition: 'Land set aside for Plains Indians; often poor quality.', dateOrContext: '1860s onwards' },
  { id: 'AA-kt17', optionKey: PERIOD_AA, partId: 'AA-1', term: 'Brigham Young', definition: 'Mormon leader; led migration to Utah.', dateOrContext: '1840s' },
  { id: 'AA-kt18', optionKey: PERIOD_AA, partId: 'AA-3', term: 'Buffalo', definition: 'Plains Indians depended on buffalo; US policy encouraged slaughter to destroy their way of life.', dateOrContext: '1860s–80s' },
];

export const PERIOD_AA_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'AA-cc1', optionKey: PERIOD_AA, partId: 'AA-1', prompt: 'What were the causes and consequences of the Gold Rush for California and the Plains Indians?', conceptType: 'consequence', modelAnswer: 'Causes: discovery of gold, economic opportunity. Consequences: mass migration, boom towns, lawlessness; conflict with Indians over land; environmental damage.' },
  { id: 'AA-cc2', optionKey: PERIOD_AA, partId: 'AA-1', prompt: 'Why did different groups (Mormons, miners, homesteaders) move west?', conceptType: 'cause', modelAnswer: 'Mormons: religious persecution. Miners: gold, economic opportunity. Homesteaders: free land (Homestead Act). All: Manifest Destiny, hope for better life.' },
  { id: 'AA-cc3', optionKey: PERIOD_AA, partId: 'AA-2', prompt: 'How did government policy towards Plains Indians change between 1851 and 1890?', conceptType: 'change', modelAnswer: '1851: treaties and boundaries. 1860s: conflict, reservations after Sand Creek and Fetterman. 1887: Dawes Act assimilation. 1890: Wounded Knee ended armed resistance.' },
  { id: 'AA-cc4', optionKey: PERIOD_AA, partId: 'AA-2', prompt: 'What were the consequences of the Civil War for the Plains Indians?', conceptType: 'consequence', modelAnswer: 'Union victory; more settlers moved west. Army freed up for Indian campaigns. Railroads built. Treaties broken. Conflict intensified (Sand Creek, Fetterman).' },
  { id: 'AA-cc5', optionKey: PERIOD_AA, partId: 'AA-3', prompt: 'Why did the Homestead Act both help and hinder settlement of the Plains?', conceptType: 'cause', modelAnswer: 'Helped: free land attracted settlers. Hindered: 160 acres too small for dry Plains; farmers needed expensive equipment; drought, insects, isolation made life hard.' },
  { id: 'AA-cc6', optionKey: PERIOD_AA, partId: 'AA-3', prompt: 'How significant was the destruction of the buffalo in ending Plains Indian resistance?', conceptType: 'significance', modelAnswer: 'Very significant: buffalo was central to Plains Indian life (food, shelter, culture). US policy encouraged slaughter. Without buffalo, Indians could not sustain their way of life. Combined with Dawes Act, reservations, and military defeat.' },
];

export const PERIOD_AA_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'AA-qc1', optionKey: PERIOD_AA, partId: 'AA-1', type: 'multipleChoice', question: 'What was Manifest Destiny?', options: ['A treaty with Plains Indians', 'Belief in US expansion across the continent', 'A mining technique', 'A Mormon settlement'], correctAnswer: 'Belief in US expansion across the continent', feedback: { correct: 'Correct.', incorrect: 'Manifest Destiny was the belief that Americans were destined to expand across North America.' } },
  { id: 'AA-qc2', optionKey: PERIOD_AA, partId: 'AA-1', type: 'shortAnswer', question: 'Who led the Mormons to Utah?', correctAnswer: 'Brigham Young', feedback: { correct: 'Correct.', incorrect: 'Brigham Young led the Mormon migration.' } },
  { id: 'AA-qc3', optionKey: PERIOD_AA, partId: 'AA-1', type: 'multipleChoice', question: 'When was gold discovered in California?', options: ['1846', '1848', '1851', '1862'], correctAnswer: '1848', feedback: { correct: 'Correct.', incorrect: '1848.' } },
  { id: 'AA-qc4', optionKey: PERIOD_AA, partId: 'AA-2', type: 'multipleChoice', question: 'When was the Sand Creek Massacre?', options: ['1851', '1864', '1876', '1890'], correctAnswer: '1864', feedback: { correct: 'Correct.', incorrect: 'The Sand Creek Massacre was in 1864.' } },
  { id: 'AA-qc5', optionKey: PERIOD_AA, partId: 'AA-2', type: 'trueFalse', question: 'The 13th Amendment abolished slavery.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'The 13th Amendment (1865) abolished slavery.' } },
  { id: 'AA-qc6', optionKey: PERIOD_AA, partId: 'AA-2', type: 'shortAnswer', question: 'In which year did the Civil War end?', correctAnswer: '1865', feedback: { correct: 'Correct.', incorrect: '1865.' } },
  { id: 'AA-qc7', optionKey: PERIOD_AA, partId: 'AA-3', type: 'shortAnswer', question: 'Which 1887 law broke up tribal land?', correctAnswer: 'Dawes Act', feedback: { correct: 'Correct.', incorrect: 'The Dawes Act of 1887 broke up tribal land.' } },
  { id: 'AA-qc8', optionKey: PERIOD_AA, partId: 'AA-3', type: 'multipleChoice', question: 'When was the Battle of Little Bighorn?', options: ['1864', '1876', '1887', '1890'], correctAnswer: '1876', feedback: { correct: 'Correct.', incorrect: '1876.' } },
  { id: 'AA-qc9', optionKey: PERIOD_AA, partId: 'AA-3', type: 'shortAnswer', question: 'How many acres did the Homestead Act offer?', correctAnswer: '160', feedback: { correct: 'Correct.', incorrect: '160 acres.' } },
  { id: 'AA-qc10', optionKey: PERIOD_AA, partId: 'AA-3', type: 'multipleChoice', question: 'When was the Wounded Knee Massacre?', options: ['1876', '1887', '1890', '1895'], correctAnswer: '1890', feedback: { correct: 'Correct.', incorrect: '1890.' } },
];

export const PERIOD_AA_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'AA-int1',
    optionKey: PERIOD_AA,
    partId: 'AA-1',
    interpretations: [
      { id: 'i1', text: 'Manifest Destiny was a noble ideal. Americans were bringing civilisation and progress to the West. The pioneers were brave and hardworking.', ascription: 'A 19th-century American politician.' },
      { id: 'i2', text: 'Manifest Destiny was an excuse for taking land from Indians and Mexicans. It justified violence and broken treaties.', ascription: 'A modern historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about Manifest Destiny?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
  {
    id: 'AA-int2',
    optionKey: PERIOD_AA,
    partId: 'AA-2',
    interpretations: [
      { id: 'i1', text: 'The Plains Indians were the aggressors. They attacked settlers and soldiers. The US government had to protect its citizens.', ascription: 'A US army officer in 1868.' },
      { id: 'i2', text: 'The US government broke treaties and encroached on Indian land. Indians were defending their homes and way of life.', ascription: 'A modern historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about conflict on the Plains?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
  {
    id: 'AA-int3',
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
  { id: 'AA-ql1', optionKey: PERIOD_AA, partId: 'AA-1', questionType: 'describe', question: 'Describe two key features of westward expansion before the Civil War.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AA-ql2', optionKey: PERIOD_AA, partId: 'AA-1', questionType: 'explain', question: 'In what ways did the Gold Rush affect California and the Plains? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'AA-ql3', optionKey: PERIOD_AA, partId: 'AA-2', questionType: 'describe', question: 'Describe two key features of the Sand Creek Massacre.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AA-ql4', optionKey: PERIOD_AA, partId: 'AA-2', questionType: 'explain', question: 'In what ways did the Civil War affect the Plains Indians? Explain your answer.', markSchemeSummary: 'AO1 + AO2. Explain ways with knowledge.' },
  { id: 'AA-ql5', optionKey: PERIOD_AA, partId: 'AA-2', questionType: 'account', question: 'Write an account of conflict between the US government and Plains Indians between 1864 and 1876.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AA-ql6', optionKey: PERIOD_AA, partId: 'AA-3', questionType: 'describe', question: 'Describe two key features of the Homestead Act.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AA-ql7', optionKey: PERIOD_AA, partId: 'AA-3', questionType: 'account', question: 'Write an account of how the US government dealt with the "Indian problem" between 1865 and 1890.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AA-ql8', optionKey: PERIOD_AA, partId: 'AA-3', questionType: 'essay', question: '"The main reason for the destruction of the Plains Indians\' way of life was the Dawes Act." How far do you agree?', markSchemeSummary: 'Essay with judgement. Consider Dawes Act and other factors (Homestead Act, railroads, buffalo, war). AO1 + AO2.' },
];

// ============================================================================
// AC: Russia 1894–1945 – Tsardom and communism
// ============================================================================

export const PERIOD_AC_TIMELINE: TimelineEvent[] = [
  { id: 'AC-1-1894', optionKey: PERIOD_AC, partId: 'AC-1', date: '1894', title: 'Nicholas II becomes Tsar', description: 'Last Tsar of Russia. Inherited autocracy, economic backwardness, and growing discontent. Resisted reform.', order: 1 },
  { id: 'AC-1-1904', optionKey: PERIOD_AC, partId: 'AC-1', date: '1904', title: 'Russo-Japanese War', description: 'Russia defeated by Japan. Humiliation; triggered unrest.', order: 2 },
  { id: 'AC-1-1905', optionKey: PERIOD_AC, partId: 'AC-1', date: '1905', title: 'Bloody Sunday', description: 'Troops fired on peaceful protesters in St Petersburg. Sparked 1905 Revolution.', order: 3 },
  { id: 'AC-1-1905b', optionKey: PERIOD_AC, partId: 'AC-1', date: '1905', title: '1905 Revolution', description: 'Strikes, mutinies (Potemkin), peasant unrest. Nicholas forced to create the Duma (parliament).', order: 4 },
  { id: 'AC-1-1906', optionKey: PERIOD_AC, partId: 'AC-1', date: '1906', title: 'Stolypin reforms', description: 'Prime Minister Stolypin tried to modernise agriculture; some peasants gained land. Assassinated 1911.', order: 5 },
  { id: 'AC-1-1914', optionKey: PERIOD_AC, partId: 'AC-1', date: '1914', title: 'Russia enters First World War', description: 'Heavy defeats, food shortages, Rasputin\'s influence. Discontent grew.', order: 6 },
  { id: 'AC-1-1916', optionKey: PERIOD_AC, partId: 'AC-1', date: '1916', title: 'Rasputin assassinated', description: 'Conservatives killed Rasputin. Discredited monarchy further.', order: 7 },
  { id: 'AC-1-1917', optionKey: PERIOD_AC, partId: 'AC-1', date: 'March 1917', title: 'February Revolution; Tsar abdicates', description: 'Strikes and mutinies in Petrograd. Nicholas abdicated. Provisional Government formed.', order: 8 },
  { id: 'AC-2-1917', optionKey: PERIOD_AC, partId: 'AC-2', date: 'October 1917', title: 'October Revolution', description: 'Bolsheviks under Lenin seized power. "Peace, land, bread."', order: 9 },
  { id: 'AC-2-1918', optionKey: PERIOD_AC, partId: 'AC-2', date: '1918', title: 'Treaty of Brest-Litovsk', description: 'Russia left WW1. Lost territory to Germany. Unpopular.', order: 10 },
  { id: 'AC-2-1918b', optionKey: PERIOD_AC, partId: 'AC-2', date: '1918–1921', title: 'Russian Civil War', description: 'Reds (Bolsheviks) vs Whites (opponents). Reds won with terror and organisation.', order: 11 },
  { id: 'AC-2-1918c', optionKey: PERIOD_AC, partId: 'AC-2', date: '1918–1921', title: 'War Communism', description: 'Grain requisitioning, nationalisation. Hardship and famine.', order: 12 },
  { id: 'AC-2-1921', optionKey: PERIOD_AC, partId: 'AC-2', date: '1921', title: 'New Economic Policy (NEP)', description: 'Lenin allowed private trade and small-scale capitalism to recover the economy after War Communism.', order: 13 },
  { id: 'AC-3-1924', optionKey: PERIOD_AC, partId: 'AC-3', date: '1924', title: 'Lenin dies; power struggle', description: 'Stalin, Trotsky, and others competed. Stalin gradually gained control.', order: 14 },
  { id: 'AC-3-1928', optionKey: PERIOD_AC, partId: 'AC-3', date: '1928', title: 'First Five Year Plan', description: 'Stalin launched rapid industrialisation. Heavy industry prioritised.', order: 15 },
  { id: 'AC-3-1929', optionKey: PERIOD_AC, partId: 'AC-3', date: '1929', title: 'Collectivisation begins', description: 'Forced peasants onto collective farms. Kulaks "eliminated as a class." Famine.', order: 16 },
  { id: 'AC-3-1930s', optionKey: PERIOD_AC, partId: 'AC-3', date: '1930s', title: 'Purges and Terror', description: 'Stalin eliminated rivals. Show trials, execution, labour camps (Gulags).', order: 17 },
  { id: 'AC-3-1941', optionKey: PERIOD_AC, partId: 'AC-3', date: '1941', title: 'Operation Barbarossa', description: 'Germany invaded USSR. Great Patriotic War; Soviet victory by 1945.', order: 18 },
];

export const PERIOD_AC_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'AC-kt1', optionKey: PERIOD_AC, partId: 'AC-1', term: 'Nicholas II', definition: 'Last Tsar of Russia; ruled 1894–1917; abdicated in 1917.', dateOrContext: '1894–1917' },
  { id: 'AC-kt2', optionKey: PERIOD_AC, partId: 'AC-1', term: '1905 Revolution', definition: 'Uprising against Tsar; Bloody Sunday, strikes; led to creation of Duma.', dateOrContext: '1905' },
  { id: 'AC-kt3', optionKey: PERIOD_AC, partId: 'AC-1', term: 'Duma', definition: 'Russian parliament created after 1905; limited power.', dateOrContext: '1906–1917' },
  { id: 'AC-kt4', optionKey: PERIOD_AC, partId: 'AC-1', term: 'Rasputin', definition: 'Mystic who influenced Tsarina; discredited the monarchy.', dateOrContext: '1905–1916' },
  { id: 'AC-kt5', optionKey: PERIOD_AC, partId: 'AC-1', term: 'Bloody Sunday', definition: '1905; troops fired on peaceful protesters; sparked revolution.', dateOrContext: '1905' },
  { id: 'AC-kt6', optionKey: PERIOD_AC, partId: 'AC-1', term: 'Provisional Government', definition: 'Temporary government after Tsar abdicated; failed to end war or reform.', dateOrContext: '1917' },
  { id: 'AC-kt7', optionKey: PERIOD_AC, partId: 'AC-2', term: 'October Revolution', definition: '1917 Bolshevik seizure of power led by Lenin.', dateOrContext: '1917' },
  { id: 'AC-kt8', optionKey: PERIOD_AC, partId: 'AC-2', term: 'War Communism', definition: 'Bolshevik policy during Civil War: grain requisitioning, nationalisation.', dateOrContext: '1918–1921' },
  { id: 'AC-kt9', optionKey: PERIOD_AC, partId: 'AC-2', term: 'NEP', definition: 'New Economic Policy; Lenin allowed private trade to recover economy.', dateOrContext: '1921' },
  { id: 'AC-kt10', optionKey: PERIOD_AC, partId: 'AC-2', term: 'Bolsheviks', definition: 'Communist party led by Lenin; seized power in October 1917.', dateOrContext: '1917' },
  { id: 'AC-kt11', optionKey: PERIOD_AC, partId: 'AC-2', term: 'Brest-Litovsk', definition: '1918 treaty; Russia left WW1; lost territory.', dateOrContext: '1918' },
  { id: 'AC-kt12', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Five Year Plans', definition: 'Stalin\'s programmes for rapid industrialisation.', dateOrContext: '1928 onwards' },
  { id: 'AC-kt13', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Collectivisation', definition: 'Forcing peasants onto collective farms; kulaks eliminated.', dateOrContext: '1929' },
  { id: 'AC-kt14', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Purges', definition: 'Stalin\'s elimination of rivals and "enemies"; show trials, Gulags.', dateOrContext: '1930s' },
  { id: 'AC-kt15', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Kulaks', definition: 'Wealthier peasants; "eliminated as a class" during collectivisation.', dateOrContext: '1929' },
  { id: 'AC-kt16', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Gulag', definition: 'Labour camp system; used for political prisoners.', dateOrContext: '1930s' },
  { id: 'AC-kt17', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Trotsky', definition: 'Bolshevik leader; rival to Stalin; exiled and murdered.', dateOrContext: '1920s' },
  { id: 'AC-kt18', optionKey: PERIOD_AC, partId: 'AC-3', term: 'Cult of personality', definition: 'Stalin\'s image as supreme leader; propaganda, portraits.', dateOrContext: '1930s' },
];

export const PERIOD_AC_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'AC-cc1', optionKey: PERIOD_AC, partId: 'AC-1', prompt: 'What were the causes of the 1905 Revolution?', conceptType: 'cause', modelAnswer: 'Bloody Sunday, defeat in Russo-Japanese War, economic hardship, autocracy, lack of reform. Workers and peasants demanded change.' },
  { id: 'AC-cc2', optionKey: PERIOD_AC, partId: 'AC-1', prompt: 'How significant was the First World War in causing the February Revolution?', conceptType: 'significance', modelAnswer: 'Very significant: defeats, food shortages, casualties, Rasputin weakened Tsar. But long-term: autocracy, 1905, lack of reform. War was the trigger; underlying problems existed.' },
  { id: 'AC-cc3', optionKey: PERIOD_AC, partId: 'AC-2', prompt: 'Why did the Bolsheviks win the Civil War?', conceptType: 'cause', modelAnswer: 'Central position, control of railways, Red Terror, propaganda, discipline. Whites were divided and lacked popular support.' },
  { id: 'AC-cc4', optionKey: PERIOD_AC, partId: 'AC-2', prompt: 'Why did Lenin introduce the NEP?', conceptType: 'cause', modelAnswer: 'War Communism caused famine and unrest. Kronstadt mutiny. Lenin needed to recover economy. NEP allowed private trade, small business; retreat from full communism.' },
  { id: 'AC-cc5', optionKey: PERIOD_AC, partId: 'AC-3', prompt: 'What changed and what stayed the same between Lenin\'s and Stalin\'s rule?', conceptType: 'change', modelAnswer: 'Changed: NEP abandoned, collectivisation, Five Year Plans, cult of personality, Terror. Stayed same: one-party state, secret police, propaganda, censorship.' },
  { id: 'AC-cc6', optionKey: PERIOD_AC, partId: 'AC-3', prompt: 'What were the consequences of collectivisation?', conceptType: 'consequence', modelAnswer: 'Famine (especially Ukraine); kulaks eliminated; peasants forced onto collective farms; agriculture disrupted; millions died. But: state control; grain for industry; Stalin\'s power increased.' },
];

export const PERIOD_AC_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'AC-qc1', optionKey: PERIOD_AC, partId: 'AC-1', type: 'multipleChoice', question: 'When did Nicholas II abdicate?', options: ['1905', '1914', '1917', '1918'], correctAnswer: '1917', feedback: { correct: 'Correct – March 1917.', incorrect: 'The Tsar abdicated in March 1917.' } },
  { id: 'AC-qc2', optionKey: PERIOD_AC, partId: 'AC-1', type: 'shortAnswer', question: 'What sparked the 1905 Revolution?', correctAnswer: 'Bloody Sunday', feedback: { correct: 'Correct.', incorrect: 'Bloody Sunday.' } },
  { id: 'AC-qc3', optionKey: PERIOD_AC, partId: 'AC-1', type: 'multipleChoice', question: 'When did the Russo-Japanese War take place?', options: ['1894', '1904', '1914', '1917'], correctAnswer: '1904', feedback: { correct: 'Correct.', incorrect: '1904.' } },
  { id: 'AC-qc4', optionKey: PERIOD_AC, partId: 'AC-2', type: 'shortAnswer', question: 'What does NEP stand for?', correctAnswer: 'New Economic Policy', feedback: { correct: 'Correct.', incorrect: 'NEP = New Economic Policy.' } },
  { id: 'AC-qc5', optionKey: PERIOD_AC, partId: 'AC-2', type: 'trueFalse', question: 'The Bolsheviks won the Civil War.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'The Reds (Bolsheviks) won.' } },
  { id: 'AC-qc6', optionKey: PERIOD_AC, partId: 'AC-2', type: 'multipleChoice', question: 'Who led the October Revolution?', options: ['Stalin', 'Trotsky', 'Lenin', 'Nicholas'], correctAnswer: 'Lenin', feedback: { correct: 'Correct.', incorrect: 'Lenin led the Bolsheviks.' } },
  { id: 'AC-qc7', optionKey: PERIOD_AC, partId: 'AC-3', type: 'multipleChoice', question: 'What did collectivisation involve?', options: ['Industrial growth', 'Forcing peasants onto collective farms', 'Eliminating the army', 'Closing factories'], correctAnswer: 'Forcing peasants onto collective farms', feedback: { correct: 'Correct.', incorrect: 'Collectivisation forced peasants onto collective farms.' } },
  { id: 'AC-qc8', optionKey: PERIOD_AC, partId: 'AC-3', type: 'shortAnswer', question: 'In which year did the First Five Year Plan begin?', correctAnswer: '1928', feedback: { correct: 'Correct.', incorrect: '1928.' } },
  { id: 'AC-qc9', optionKey: PERIOD_AC, partId: 'AC-3', type: 'multipleChoice', question: 'Who was Stalin\'s main rival in the 1920s?', options: ['Lenin', 'Trotsky', 'Khrushchev', 'Brezhnev'], correctAnswer: 'Trotsky', feedback: { correct: 'Correct.', incorrect: 'Trotsky.' } },
];

export const PERIOD_AC_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'AC-int1',
    optionKey: PERIOD_AC,
    partId: 'AC-1',
    interpretations: [
      { id: 'i1', text: 'Nicholas II was a weak ruler who could not adapt to the modern world. His refusal to reform led to revolution.', ascription: 'A liberal historian.' },
      { id: 'i2', text: 'Nicholas was trapped by circumstances. The war, Rasputin, and centuries of autocracy made reform difficult. He was not solely to blame.', ascription: 'A modern historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about Nicholas II?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
  {
    id: 'AC-int2',
    optionKey: PERIOD_AC,
    partId: 'AC-2',
    interpretations: [
      { id: 'i1', text: 'Lenin was a pragmatist. The NEP showed he would adapt when necessary. He saved the revolution.', ascription: 'A historian writing in 1970.' },
      { id: 'i2', text: 'Lenin was a ruthless dictator. The NEP was a temporary retreat. He created the Terror and one-party state.', ascription: 'A historian writing in 2000.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about Lenin?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
  {
    id: 'AC-int3',
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
  { id: 'AC-ql2', optionKey: PERIOD_AC, partId: 'AC-1', questionType: 'explain', question: 'In what ways did the First World War contribute to the February Revolution? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'AC-ql3', optionKey: PERIOD_AC, partId: 'AC-2', questionType: 'describe', question: 'Describe two key features of War Communism.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AC-ql4', optionKey: PERIOD_AC, partId: 'AC-2', questionType: 'explain', question: 'In what ways did the Bolsheviks consolidate their power between 1917 and 1924? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'AC-ql5', optionKey: PERIOD_AC, partId: 'AC-2', questionType: 'account', question: 'Write an account of the Russian Civil War.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AC-ql6', optionKey: PERIOD_AC, partId: 'AC-3', questionType: 'account', question: 'Write an account of how Stalin established his dictatorship in the 1930s.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AC-ql7', optionKey: PERIOD_AC, partId: 'AC-3', questionType: 'essay', question: '"The main reason for Stalin\'s rise to power was his elimination of rivals." How far do you agree?', markSchemeSummary: 'Essay. Consider Purges, cult of personality, control of party, Trotsky\'s exile. AO1 + AO2.' },
];

// ============================================================================
// AD: America 1920–1973 – Opportunity and inequality
// ============================================================================

export const PERIOD_AD_TIMELINE: TimelineEvent[] = [
  { id: 'AD-1-1920s', optionKey: PERIOD_AD, partId: 'AD-1', date: '1920s', title: 'Boom and consumer society', description: 'Ford, mass production, consumer goods. Republican policies. Stock market rise. Entertainment, flappers.', order: 1 },
  { id: 'AD-1-1920', optionKey: PERIOD_AD, partId: 'AD-1', date: '1920', title: 'Prohibition begins', description: '18th Amendment banned alcohol. Bootlegging, speakeasies, organised crime.', order: 2 },
  { id: 'AD-1-1921', optionKey: PERIOD_AD, partId: 'AD-1', date: '1921', title: 'Emergency Quota Act', description: 'Restricted immigration. Favoured northern Europeans.', order: 3 },
  { id: 'AD-1-1925', optionKey: PERIOD_AD, partId: 'AD-1', date: '1925', title: 'Scopes Trial', description: 'Tennessee teacher tried for teaching evolution. Traditional vs modern values.', order: 4 },
  { id: 'AD-1-1927', optionKey: PERIOD_AD, partId: 'AD-1', date: '1927', title: 'Charles Lindbergh crosses Atlantic', description: 'Symbol of American achievement. Celebrity culture.', order: 5 },
  { id: 'AD-2-1929', optionKey: PERIOD_AD, partId: 'AD-2', date: 'October 1929', title: 'Wall Street Crash', description: 'Stock market collapsed. Banks failed. Great Depression began.', order: 6 },
  { id: 'AD-2-1932', optionKey: PERIOD_AD, partId: 'AD-2', date: '1932', title: 'Roosevelt elected', description: 'FDR promised "New Deal." Defeated Hoover in landslide.', order: 7 },
  { id: 'AD-2-1933', optionKey: PERIOD_AD, partId: 'AD-2', date: '1933', title: 'New Deal begins', description: 'Alphabet agencies: CCC, TVA, AAA, NRA, WPA. Relief, recovery, reform.', order: 8 },
  { id: 'AD-2-1935', optionKey: PERIOD_AD, partId: 'AD-2', date: '1935', title: 'Social Security Act', description: 'Pensions and unemployment insurance. Key New Deal reform.', order: 9 },
  { id: 'AD-2-1941', optionKey: PERIOD_AD, partId: 'AD-2', date: '1941', title: 'USA enters Second World War', description: 'Pearl Harbor. War lifted economy; full employment.', order: 10 },
  { id: 'AD-3-1954', optionKey: PERIOD_AD, partId: 'AD-3', date: '1954', title: 'Brown v Board of Education', description: 'Supreme Court ruled segregation in schools unconstitutional.', order: 11 },
  { id: 'AD-3-1955', optionKey: PERIOD_AD, partId: 'AD-3', date: '1955', title: 'Montgomery Bus Boycott', description: 'Rosa Parks; MLK emerged. Non-violent protest.', order: 12 },
  { id: 'AD-3-1963', optionKey: PERIOD_AD, partId: 'AD-3', date: '1963', title: 'March on Washington; "I have a dream"', description: 'Martin Luther King\'s speech. Civil Rights Act 1964; Voting Rights Act 1965.', order: 13 },
  { id: 'AD-3-1964', optionKey: PERIOD_AD, partId: 'AD-3', date: '1964', title: 'Civil Rights Act', description: 'Banned discrimination based on race, colour, religion, sex.', order: 14 },
  { id: 'AD-3-1965', optionKey: PERIOD_AD, partId: 'AD-3', date: '1965', title: 'Voting Rights Act', description: 'Protected African American voting rights.', order: 15 },
  { id: 'AD-3-1966', optionKey: PERIOD_AD, partId: 'AD-3', date: '1966', title: 'NOW founded', description: 'National Organisation for Women. Feminist movement.', order: 16 },
  { id: 'AD-3-1973', optionKey: PERIOD_AD, partId: 'AD-3', date: '1973', title: 'Roe v Wade', description: 'Supreme Court ruled abortion legal. Wins for feminism.', order: 17 },
];

export const PERIOD_AD_KEY_TERMS: HistoryKeyTerm[] = [
  { id: 'AD-kt1', optionKey: PERIOD_AD, partId: 'AD-1', term: 'Prohibition', definition: 'Ban on alcohol 1920–1933; led to bootlegging and organised crime.', dateOrContext: '1920–1933' },
  { id: 'AD-kt2', optionKey: PERIOD_AD, partId: 'AD-1', term: 'Flappers', definition: 'Young women who challenged traditional behaviour in the 1920s.', dateOrContext: '1920s' },
  { id: 'AD-kt3', optionKey: PERIOD_AD, partId: 'AD-1', term: 'KKK', definition: 'Ku Klux Klan; revived in 1920s; targeted blacks, Catholics, immigrants.', dateOrContext: '1920s' },
  { id: 'AD-kt4', optionKey: PERIOD_AD, partId: 'AD-1', term: 'Red Scare', definition: 'Fear of communism; Palmer raids; deportation of radicals.', dateOrContext: '1919–1920' },
  { id: 'AD-kt5', optionKey: PERIOD_AD, partId: 'AD-1', term: 'Ford', definition: 'Henry Ford; mass production, Model T; assembly line.', dateOrContext: '1920s' },
  { id: 'AD-kt6', optionKey: PERIOD_AD, partId: 'AD-2', term: 'New Deal', definition: 'FDR\'s programme of relief, recovery, and reform during the Depression.', dateOrContext: '1933 onwards' },
  { id: 'AD-kt7', optionKey: PERIOD_AD, partId: 'AD-2', term: 'Alphabet agencies', definition: 'CCC, TVA, AAA, NRA, WPA – New Deal programmes.', dateOrContext: '1933' },
  { id: 'AD-kt8', optionKey: PERIOD_AD, partId: 'AD-2', term: 'CCC', definition: 'Civilian Conservation Corps; employed young men in conservation.', dateOrContext: '1933' },
  { id: 'AD-kt9', optionKey: PERIOD_AD, partId: 'AD-2', term: 'Social Security', definition: '1935 Act; pensions and unemployment insurance.', dateOrContext: '1935' },
  { id: 'AD-kt10', optionKey: PERIOD_AD, partId: 'AD-3', term: 'McCarthyism', definition: 'Witch-hunt for communists led by Senator McCarthy in the 1950s.', dateOrContext: '1950s' },
  { id: 'AD-kt11', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Civil Rights Act', definition: '1964 law banning discrimination on race, colour, religion, sex.', dateOrContext: '1964' },
  { id: 'AD-kt12', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Martin Luther King', definition: 'Civil rights leader; non-violent protest; "I have a dream."', dateOrContext: '1950s–1968' },
  { id: 'AD-kt13', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Malcolm X', definition: 'Black nationalist leader; advocated armed self-defence.', dateOrContext: '1960s' },
  { id: 'AD-kt14', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Roe v Wade', definition: '1973 Supreme Court ruling legalising abortion.', dateOrContext: '1973' },
  { id: 'AD-kt15', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Brown v Board', definition: '1954 Supreme Court ruling; segregation in schools unconstitutional.', dateOrContext: '1954' },
  { id: 'AD-kt16', optionKey: PERIOD_AD, partId: 'AD-3', term: 'Great Society', definition: 'LBJ\'s programme; Medicare, civil rights, war on poverty.', dateOrContext: '1960s' },
  { id: 'AD-kt17', optionKey: PERIOD_AD, partId: 'AD-3', term: 'NOW', definition: 'National Organisation for Women; feminist movement.', dateOrContext: '1966' },
];

export const PERIOD_AD_CONCEPT_CARDS: HistoryConceptCard[] = [
  { id: 'AD-cc1', optionKey: PERIOD_AD, partId: 'AD-1', prompt: 'What were the causes of the economic boom in 1920s America?', conceptType: 'cause', modelAnswer: 'Mass production (Ford), consumer goods, Republican policies (laissez-faire), easy credit, stock market speculation. Not everyone benefited: farmers, African Americans, immigrants.' },
  { id: 'AD-cc2', optionKey: PERIOD_AD, partId: 'AD-1', prompt: 'What were the similarities and differences between the experiences of different groups in 1920s America?', conceptType: 'similarity', modelAnswer: 'Similar: all affected by Prohibition, consumer culture. Different: urban whites prospered; farmers struggled; African Americans faced Jim Crow; immigrants restricted; women gained some freedom (flappers) but limited.' },
  { id: 'AD-cc3', optionKey: PERIOD_AD, partId: 'AD-2', prompt: 'Why did the New Deal face opposition?', conceptType: 'cause', modelAnswer: 'Too much government (conservatives); not enough (radicals). Supreme Court ruled some agencies unconstitutional. Some saw it as socialism.' },
  { id: 'AD-cc4', optionKey: PERIOD_AD, partId: 'AD-2', prompt: 'How significant was the Second World War in ending the Depression?', conceptType: 'significance', modelAnswer: 'Very significant: full employment, war production. But New Deal had stabilised banking, created jobs. War was the final push; debate continues over whether New Deal or war ended it.' },
  { id: 'AD-cc5', optionKey: PERIOD_AD, partId: 'AD-3', prompt: 'How did the Civil Rights movement achieve change?', conceptType: 'consequence', modelAnswer: 'Bus boycotts, sit-ins, marches, legal challenges. King\'s leadership; media coverage. Civil Rights Act 1964, Voting Rights Act 1965. Opposition: violence, assassination.' },
  { id: 'AD-cc6', optionKey: PERIOD_AD, partId: 'AD-3', prompt: 'What changed and what stayed the same for women between 1920 and 1973?', conceptType: 'change', modelAnswer: 'Changed: flappers (1920s), wartime work, feminism (NOW), Roe v Wade. Stayed same: expectations (home, family), pay gap, limited political power until later.' },
];

export const PERIOD_AD_QUICK_CHECKS: HistoryQuickCheckItem[] = [
  { id: 'AD-qc1', optionKey: PERIOD_AD, partId: 'AD-1', type: 'multipleChoice', question: 'When did Prohibition begin?', options: ['1918', '1920', '1922', '1929'], correctAnswer: '1920', feedback: { correct: 'Correct.', incorrect: 'Prohibition began in 1920.' } },
  { id: 'AD-qc2', optionKey: PERIOD_AD, partId: 'AD-1', type: 'trueFalse', question: 'The 1920s were prosperous for all Americans.', correctAnswer: 'false', feedback: { correct: 'Correct.', incorrect: 'Farmers, African Americans, and many workers did not share in the boom.' } },
  { id: 'AD-qc3', optionKey: PERIOD_AD, partId: 'AD-1', type: 'shortAnswer', question: 'Which car manufacturer pioneered mass production?', correctAnswer: 'Ford', feedback: { correct: 'Correct.', incorrect: 'Henry Ford.' } },
  { id: 'AD-qc4', optionKey: PERIOD_AD, partId: 'AD-2', type: 'multipleChoice', question: 'Who introduced the New Deal?', options: ['Hoover', 'Roosevelt', 'Truman', 'Eisenhower'], correctAnswer: 'Roosevelt', feedback: { correct: 'Correct.', incorrect: 'FDR (Roosevelt) introduced the New Deal.' } },
  { id: 'AD-qc5', optionKey: PERIOD_AD, partId: 'AD-2', type: 'shortAnswer', question: 'In which year did the Wall Street Crash occur?', correctAnswer: '1929', feedback: { correct: 'Correct.', incorrect: 'October 1929.' } },
  { id: 'AD-qc6', optionKey: PERIOD_AD, partId: 'AD-2', type: 'multipleChoice', question: 'What did the CCC do?', options: ['Built dams', 'Employed young men in conservation', 'Regulated banks', 'Abolished child labour'], correctAnswer: 'Employed young men in conservation', feedback: { correct: 'Correct.', incorrect: 'Civilian Conservation Corps.' } },
  { id: 'AD-qc7', optionKey: PERIOD_AD, partId: 'AD-3', type: 'shortAnswer', question: 'In which year was the Civil Rights Act passed?', correctAnswer: '1964', feedback: { correct: 'Correct.', incorrect: 'The Civil Rights Act was passed in 1964.' } },
  { id: 'AD-qc8', optionKey: PERIOD_AD, partId: 'AD-3', type: 'multipleChoice', question: 'What did Brown v Board of Education rule?', options: ['Abortion was legal', 'Segregation in schools was unconstitutional', 'Communists could be arrested', 'Women could vote'], correctAnswer: 'Segregation in schools was unconstitutional', feedback: { correct: 'Correct.', incorrect: 'Brown v Board (1954) ruled segregation unconstitutional.' } },
  { id: 'AD-qc9', optionKey: PERIOD_AD, partId: 'AD-3', type: 'shortAnswer', question: 'In which year was Roe v Wade?', correctAnswer: '1973', feedback: { correct: 'Correct.', incorrect: '1973.' } },
];

export const PERIOD_AD_INTERPRETATION_SETS: HistoryInterpretationSet[] = [
  {
    id: 'AD-int1',
    optionKey: PERIOD_AD,
    partId: 'AD-1',
    interpretations: [
      { id: 'i1', text: 'The 1920s were a golden age. Americans had never had it so good. Consumer goods, cars, entertainment – it was the birth of modern America.', ascription: 'A writer in 1929.' },
      { id: 'i2', text: 'The 1920s were a decade of inequality. Farmers, African Americans, and immigrants were left behind. The boom was built on debt and speculation.', ascription: 'A modern historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about the 1920s?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
  {
    id: 'AD-int2',
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
  {
    id: 'AD-int3',
    optionKey: PERIOD_AD,
    partId: 'AD-3',
    interpretations: [
      { id: 'i1', text: 'Martin Luther King was the key to the Civil Rights movement. His leadership, oratory, and commitment to non-violence won the nation over.', ascription: 'A civil rights historian.' },
      { id: 'i2', text: 'King was important but the movement was broader. Grassroots activists, legal challenges, and the media all played vital roles. No single leader made the difference.', ascription: 'Another historian.' },
    ],
    questionHowDiffer: 'How do these interpretations differ about the Civil Rights movement?',
    questionWhyDiffer: 'Why might these interpretations differ?',
    questionHowConvincing: 'Which interpretation do you find more convincing?',
    markSchemeSummary: 'AO4: Compare; explain context; evaluate.',
  },
];

export const PERIOD_AD_QUESTION_LAB: HistoryQuestionLabItem[] = [
  { id: 'AD-ql1', optionKey: PERIOD_AD, partId: 'AD-1', questionType: 'describe', question: 'Describe two key features of American society in the 1920s.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AD-ql2', optionKey: PERIOD_AD, partId: 'AD-1', questionType: 'explain', question: 'In what ways did Prohibition affect American society? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'AD-ql3', optionKey: PERIOD_AD, partId: 'AD-2', questionType: 'describe', question: 'Describe two key features of the New Deal.', markSchemeSummary: '2 × (feature + supporting detail). AO1.' },
  { id: 'AD-ql4', optionKey: PERIOD_AD, partId: 'AD-2', questionType: 'explain', question: 'In what ways did the New Deal affect Americans? Explain your answer.', markSchemeSummary: 'AO1 + AO2.' },
  { id: 'AD-ql5', optionKey: PERIOD_AD, partId: 'AD-2', questionType: 'account', question: 'Write an account of how the USA recovered from the Depression between 1933 and 1941.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AD-ql6', optionKey: PERIOD_AD, partId: 'AD-3', questionType: 'account', question: 'Write an account of the Civil Rights movement between 1954 and 1968.', markSchemeSummary: 'Narrative account. AO1 + AO2.' },
  { id: 'AD-ql7', optionKey: PERIOD_AD, partId: 'AD-3', questionType: 'essay', question: '"The main reason for the growth of the Civil Rights movement was Martin Luther King\'s leadership." How far do you agree?', markSchemeSummary: 'Essay. Consider King, grassroots activism, legal victories, media, Supreme Court. AO1 + AO2.' },
];

/**
 * Religious Studies Hub – AQA GCSE Religious Studies A 8062
 * Religions, themes, beliefs, flashcards, contrasting views, quick check, short answer, extended writing.
 */

import type {
  ReligionId,
  ThemeId,
  ReligionMeta,
  ThemeMeta,
  BeliefConcept,
  ScriptureCard,
  ContrastingView,
  RSQuickCheckItem,
  ShortAnswerItem,
  ExtendedWritingPrompt,
  PhilosophicalArgument,
  TextualPassage,
} from '../types/religiousStudiesHub';

// ============================================================================
// RELIGION METADATA
// ============================================================================

export const RELIGIONS: ReligionMeta[] = [
  { id: 'buddhism', title: 'Buddhism' },
  { id: 'christianity', title: 'Christianity' },
  { id: 'catholic-christianity', title: 'Catholic Christianity' },
  { id: 'hinduism', title: 'Hinduism' },
  { id: 'islam', title: 'Islam' },
  { id: 'judaism', title: 'Judaism' },
  { id: 'sikhism', title: 'Sikhism' },
];

// Prohibited: Christianity + Catholic Christianity
export const PROHIBITED_COMBOS: [ReligionId, ReligionId][] = [
  ['christianity', 'catholic-christianity'],
  ['catholic-christianity', 'christianity'],
];

// ============================================================================
// THEME METADATA
// ============================================================================

export const THEMES: ThemeMeta[] = [
  { id: 'A', title: 'Theme A: Relationships and families' },
  { id: 'B', title: 'Theme B: Religion and life' },
  { id: 'C', title: 'Theme C: The existence of God and revelation' },
  { id: 'D', title: 'Theme D: Religion, peace and conflict' },
  { id: 'E', title: 'Theme E: Religion, crime and punishment' },
  { id: 'F', title: 'Theme F: Religion, human rights and social justice' },
  { id: 'G', title: "Theme G: St Mark's Gospel – the life of Jesus", subtitle: 'Textual studies' },
  { id: 'H', title: "Theme H: St Mark's Gospel – moral and spiritual truths", subtitle: 'Textual studies' },
];

export const THEMATIC_THEMES: ThemeId[] = ['A', 'B', 'C', 'D', 'E', 'F'];
export const TEXTUAL_THEMES: ThemeId[] = ['G', 'H'];

// ============================================================================
// BELIEF CONCEPTS
// ============================================================================

export const BELIEF_CONCEPTS: BeliefConcept[] = [
  // Christianity
  {
    id: 'chr-nature-god',
    religionId: 'christianity',
    title: 'The nature of God',
    coreIdea: 'Christians believe God is omnipotent (all-powerful), loving and just. This raises the problem of evil: if God is both all-powerful and loving, why does suffering exist?',
    commonMisconception: 'God causes suffering to punish people.',
    influence: 'Belief in a loving God influences Christians to show compassion and work for justice.',
    scriptureRef: 'Genesis 1:1–3',
  },
  {
    id: 'chr-trinity',
    religionId: 'christianity',
    title: 'The Trinity',
    coreIdea: 'Christians believe in one God in three persons: Father, Son and Holy Spirit. They are distinct but equal, sharing the same divine nature.',
    commonMisconception: 'Christians believe in three gods.',
    influence: 'The Trinity shapes how Christians understand relationships: unity in diversity.',
    scriptureRef: 'Matthew 28:19',
  },
  {
    id: 'chr-creation',
    religionId: 'christianity',
    title: 'Creation',
    coreIdea: 'God created the universe. Different Christians interpret Genesis differently: some regard it as literal, others as symbolic. The role of the Word (Logos) and Spirit is key.',
    commonMisconception: 'All Christians reject evolution.',
    influence: 'Belief in creation leads to stewardship: caring for the world as God\'s gift.',
    scriptureRef: 'John 1:1–3',
  },
  {
    id: 'chr-afterlife',
    religionId: 'christianity',
    title: 'Life after death',
    coreIdea: 'Christians believe in resurrection and life after death. There will be judgement; the righteous go to heaven, the unrighteous to hell.',
    influence: 'This belief affects how Christians live: seeking to follow God\'s will.',
    scriptureRef: '1 Corinthians 15',
  },
  {
    id: 'chr-incarnation',
    religionId: 'christianity',
    title: 'Incarnation',
    coreIdea: 'Jesus is the Son of God, fully God and fully human. He was born of Mary, lived on earth, and revealed God\'s nature.',
    influence: 'The incarnation shows God\'s love and identification with human suffering.',
    scriptureRef: 'John 1:14',
  },
  {
    id: 'chr-salvation',
    religionId: 'christianity',
    title: 'Salvation',
    coreIdea: 'Salvation (being saved from sin and its consequences) comes through Jesus. Christians believe in original sin; salvation is through grace, not works alone.',
    influence: 'Salvation motivates mission and evangelism.',
    scriptureRef: 'Ephesians 2:8–9',
  },
  {
    id: 'chr-baptism',
    religionId: 'christianity',
    title: 'Baptism',
    coreIdea: 'Baptism is a sacrament: an outward sign of God\'s grace. Infant baptism (in some traditions) or believers\' baptism (in others) marks entry into the Church.',
    influence: 'Baptism unites believers and initiates them into the Christian community.',
  },
  {
    id: 'chr-eucharist',
    religionId: 'christianity',
    title: 'Holy Communion / Eucharist',
    coreIdea: 'The Eucharist commemorates the Last Supper. Christians disagree about whether the bread and wine become the body and blood of Christ (transubstantiation) or remain symbols.',
    influence: 'Central to Christian worship and community.',
  },
  // Islam
  {
    id: 'isl-tawhid',
    religionId: 'islam',
    title: 'Tawhid (Oneness of God)',
    coreIdea: 'Tawhid is the most important belief in Islam: God is one, with no partners or equals. This is expressed in Surah 112 of the Qur\'an.',
    commonMisconception: 'Allah is a different god from the Christian God.',
    influence: 'Tawhid shapes Muslim worship: prayer is directed only to God.',
    scriptureRef: 'Qur\'an Surah 112',
  },
  {
    id: 'isl-six-articles',
    religionId: 'islam',
    title: 'Six articles of faith (Sunni)',
    coreIdea: 'Sunni Muslims believe in: God, angels, holy books, prophets, predestination, and the Day of Judgement. These form the basis of Islamic belief.',
    influence: 'These beliefs guide Muslim life and practice.',
  },
  {
    id: 'isl-risalah',
    religionId: 'islam',
    title: 'Risalah (Prophethood)',
    coreIdea: 'God sent prophets to guide humanity. Key prophets include Adam, Ibrahim (Abraham) and Muhammad – the final prophet, who received the Qur\'an.',
    influence: 'Muslims follow the example of the prophets.',
    scriptureRef: 'Qur\'an',
  },
  {
    id: 'isl-five-pillars',
    religionId: 'islam',
    title: 'Five Pillars of Islam',
    coreIdea: 'Shahadah (declaration of faith), Salah (prayer five times daily), Sawm (fasting in Ramadan), Zakah (charity), Hajj (pilgrimage to Makkah).',
    influence: 'The Five Pillars structure Muslim daily life and worship.',
  },
  {
    id: 'isl-akhirah',
    religionId: 'islam',
    title: 'Akhirah (Life after death)',
    coreIdea: 'Muslims believe in resurrection, judgement, heaven (Jannah) and hell (Jahannam). Actions in this life determine the afterlife.',
    influence: 'Akhirah motivates Muslims to live righteously.',
  },
  // Theme A
  {
    id: 'thA-marriage',
    themeId: 'A',
    title: 'The nature and purpose of marriage',
    coreIdea: 'Marriage is a lifelong union, traditionally between a man and a woman. Religions see it as a sacred covenant, for companionship, procreation and stability.',
    influence: 'Affects views on divorce, same-sex marriage and cohabitation.',
  },
  {
    id: 'thA-contraception',
    themeId: 'A',
    title: 'Contraception and family planning',
    coreIdea: 'Religious views on contraception vary. Some allow it for responsible family planning; others forbid it, linking sex to procreation.',
    influence: 'Affects family size and reproductive choices.',
  },
  {
    id: 'thA-gender-equality',
    themeId: 'A',
    title: 'Gender equality',
    coreIdea: 'Religions have different teachings on the roles of men and women. Some emphasise equality; others emphasise complementary roles.',
    influence: 'Affects women\'s status in religious communities and society.',
  },
];

// ============================================================================
// SCRIPTURE CARDS / FLASHCARDS
// ============================================================================

export const SCRIPTURE_CARDS: ScriptureCard[] = [
  // Christianity
  { id: 'sc-chr-trinity', religionId: 'christianity', term: 'Trinity', definition: 'One God in three persons: Father, Son and Holy Spirit.', scriptureRef: 'Matthew 28:19' },
  { id: 'sc-chr-incarnation', religionId: 'christianity', term: 'Incarnation', definition: 'God becoming human in Jesus Christ.', scriptureRef: 'John 1:14' },
  { id: 'sc-chr-atonement', religionId: 'christianity', term: 'Atonement', definition: 'Reconciliation with God through Jesus\' death and resurrection.', scriptureRef: 'Romans 5:10' },
  { id: 'sc-chr-sacrament', religionId: 'christianity', term: 'Sacrament', definition: 'An outward sign of inward grace; e.g. baptism, Eucharist.', inContext: 'Baptism and Holy Communion are the two sacraments recognised by most Protestants.' },
  { id: 'sc-chr-eucharist', religionId: 'christianity', term: 'Eucharist / Holy Communion', definition: 'The Christian ritual commemorating the Last Supper; bread and wine.', scriptureRef: '1 Corinthians 11:23–26' },
  { id: 'sc-chr-grace', religionId: 'christianity', term: 'Grace', definition: 'God\'s free, unearned gift of forgiveness and salvation.', scriptureRef: 'Ephesians 2:8' },
  { id: 'sc-chr-original-sin', religionId: 'christianity', term: 'Original sin', definition: 'The tendency to sin inherited from Adam; healed through Christ.', scriptureRef: 'Romans 5:12' },
  // Islam
  { id: 'sc-isl-tawhid', religionId: 'islam', term: 'Tawhid', definition: 'The oneness of God; no partners or equals.', scriptureRef: 'Qur\'an Surah 112' },
  { id: 'sc-isl-shahadah', religionId: 'islam', term: 'Shahadah', definition: 'Declaration of faith: "There is no god but Allah, and Muhammad is his messenger."', inContext: 'The first of the Five Pillars; recited in prayer and at conversion.' },
  { id: 'sc-isl-salah', religionId: 'islam', term: 'Salah', definition: 'Five daily prayers facing Makkah; includes wudu and rak\'ahs.', inContext: 'Performed at dawn, noon, afternoon, sunset and night.' },
  { id: 'sc-isl-sawm', religionId: 'islam', term: 'Sawm', definition: 'Fasting during Ramadan from dawn to sunset.', scriptureRef: 'Qur\'an 2:183' },
  { id: 'sc-isl-zakah', religionId: 'islam', term: 'Zakah', definition: 'Obligatory charity; 2.5% of savings given to the poor.', inContext: 'One of the Five Pillars; purifies wealth.' },
  { id: 'sc-isl-hajj', religionId: 'islam', term: 'Hajj', definition: 'Pilgrimage to Makkah; undertaken at least once if able.', inContext: 'Performed during Dhu al-Hijjah; includes tawaf, stoning, Arafat.' },
  { id: 'sc-isl-jihad', religionId: 'islam', term: 'Jihad', definition: 'Struggle; greater jihad = inner struggle; lesser jihad = outer struggle (e.g. defence).', inContext: 'Greater jihad is the struggle against sin.' },
  // Theme A
  { id: 'sc-thA-sanctity-marriage', themeId: 'A', term: 'Sanctity of marriage', definition: 'Marriage is holy and sacred; should not be broken lightly.', inContext: 'Used in arguments against divorce.' },
  { id: 'sc-thA-procreation', themeId: 'A', term: 'Procreation', definition: 'Having children; often seen as a purpose of marriage.', inContext: 'Some religions link sex to procreation.' },
  { id: 'sc-thA-cohabitation', themeId: 'A', term: 'Cohabitation', definition: 'Living together as a couple without being married.', inContext: 'Some religions oppose it; others are more accepting.' },
];

// ============================================================================
// CONTRASTING VIEWS (Theme A)
// ============================================================================

export const CONTRASTING_VIEWS: ContrastingView[] = [
  {
    id: 'cv-contraception',
    themeId: 'A',
    issue: 'Contraception',
    views: [
      { religion: 'Catholic Christianity', view: 'Artificial contraception is wrong; sex should be open to procreation. Natural family planning may be used.', scripture: 'Humanae Vitae' },
      { religion: 'Many Protestants', view: 'Contraception can be used responsibly for family planning within marriage.', scripture: 'Conscience and stewardship' },
      { religion: 'Islam', view: 'Contraception is generally permitted if both partners agree; permanent methods may be debated.', scripture: 'Hadith' },
    ],
    modelAnswer: 'One belief: Catholic Christians teach that artificial contraception is wrong because it blocks the natural purpose of sex (procreation). Another belief: Many Protestant Christians believe contraception is acceptable when used responsibly within marriage to plan family size.',
  },
  {
    id: 'cv-divorce',
    themeId: 'A',
    issue: 'Divorce',
    views: [
      { religion: 'Catholic Christianity', view: 'Marriage is indissoluble; divorce is not recognised, though annulment may be possible.', scripture: 'Mark 10:9' },
      { religion: 'Many Protestants', view: 'Divorce may be permitted in cases of adultery or abuse; remarriage is possible.', scripture: 'Matthew 19:9' },
      { religion: 'Islam', view: 'Divorce is permitted as a last resort; there are procedures to allow reconciliation.', scripture: 'Qur\'an 2:229–230' },
    ],
    modelAnswer: 'One belief: Catholics believe marriage is a sacrament that cannot be broken; divorce is not recognised. Another belief: Many Protestants allow divorce in certain circumstances (e.g. adultery) and permit remarriage.',
  },
  {
    id: 'cv-same-sex',
    themeId: 'A',
    issue: 'Homosexual relationships',
    views: [
      { religion: 'Conservative Christians', view: 'Homosexual acts are sinful; marriage is between one man and one woman.', scripture: 'Leviticus 18:22; Romans 1' },
      { religion: 'Liberal Christians', view: 'Same-sex relationships can be loving and faithful; God accepts all who love.', scripture: 'God is love' },
      { religion: 'Islam', view: 'Homosexual acts are forbidden; traditional teaching condemns them.', scripture: 'Qur\'an; story of Lot' },
    ],
  },
];

// ============================================================================
// QUICK CHECK ITEMS
// ============================================================================

export const QUICK_CHECK_ITEMS: RSQuickCheckItem[] = [
  // Christianity
  { id: 'qc-chr-1', religionId: 'christianity', type: 'multipleChoice', question: 'What does "Trinity" mean in Christianity?', options: ['Three gods', 'One God in three persons', 'Jesus, Mary and Joseph', 'Father, Son and Church'], correctAnswer: 'One God in three persons' },
  { id: 'qc-chr-2', religionId: 'christianity', type: 'trueFalse', question: 'Christians believe Jesus was fully God and fully human.', correctAnswer: 'true', feedback: { correct: 'Correct – this is the doctrine of the incarnation.', incorrect: 'Incorrect – Christians believe Jesus is both fully God and fully human.' } },
  { id: 'qc-chr-3', religionId: 'christianity', type: 'shortAnswer', question: 'Give one belief about the afterlife in Christianity.', correctAnswer: 'resurrection', feedback: { correct: 'Good – resurrection is a key belief.', incorrect: 'Think about resurrection, judgement, heaven and hell.' } },
  { id: 'qc-chr-4', religionId: 'christianity', type: 'multipleChoice', question: 'Which sacrament marks entry into the Church?', options: ['Eucharist', 'Baptism', 'Confirmation', 'Marriage'], correctAnswer: 'Baptism' },
  { id: 'qc-chr-5', religionId: 'christianity', type: 'trueFalse', question: 'All Christians practise infant baptism.', correctAnswer: 'false', feedback: { correct: 'Correct – Baptists and others practise believers\' baptism.', incorrect: 'Some denominations baptise infants; others baptise only believers.' } },
  // Islam
  { id: 'qc-isl-1', religionId: 'islam', type: 'multipleChoice', question: 'What does Tawhid mean?', options: ['Three gods', 'The oneness of God', 'Prayer', 'Fasting'], correctAnswer: 'The oneness of God' },
  { id: 'qc-isl-2', religionId: 'islam', type: 'trueFalse', question: 'Muslims pray five times a day.', correctAnswer: 'true' },
  { id: 'qc-isl-3', religionId: 'islam', type: 'shortAnswer', question: 'What is the first pillar of Islam?', correctAnswer: 'Shahadah', feedback: { correct: 'Correct – the declaration of faith.', incorrect: 'It is the declaration of faith: Shahadah.' } },
  { id: 'qc-isl-4', religionId: 'islam', type: 'multipleChoice', question: 'During which month do Muslims fast?', options: ['Muharram', 'Shawwal', 'Ramadan', 'Dhul Hijjah'], correctAnswer: 'Ramadan' },
  { id: 'qc-isl-5', religionId: 'islam', type: 'whichTwo', question: 'Which two are among the Five Pillars of Islam?', options: ['Salah', 'Jihad', 'Sawm', 'Shahadah', 'Hadith'], correctAnswer: ['Salah', 'Sawm'], feedback: { correct: 'Correct – Salah and Sawm are two of the Five Pillars.', incorrect: 'The Five Pillars are: Shahadah, Salah, Sawm, Zakah, Hajj.' } },
  // Theme A
  { id: 'qc-thA-1', themeId: 'A', type: 'multipleChoice', question: 'Which theme covers contraception and marriage?', options: ['Theme B', 'Theme A', 'Theme C', 'Theme D'], correctAnswer: 'Theme A' },
  { id: 'qc-thA-2', themeId: 'A', type: 'trueFalse', question: 'All religions have the same view on divorce.', correctAnswer: 'false', feedback: { correct: 'Correct – views differ within and between religions.', incorrect: 'Religions have contrasting beliefs about divorce.' } },
  { id: 'qc-thA-3', themeId: 'A', type: 'shortAnswer', question: 'Give one purpose of marriage according to religious teachings.', correctAnswer: 'procreation', feedback: { correct: 'Procreation is one key purpose.', incorrect: 'Think: procreation, companionship, stability, educating children in faith.' } },
];

// ============================================================================
// SHORT ANSWER ITEMS
// ============================================================================

export const SHORT_ANSWER_ITEMS: ShortAnswerItem[] = [
  { id: 'sa-chr-1', religionId: 'christianity', marks: 1, question: 'Give one belief about the nature of God in Christianity.', modelAnswer: 'God is omnipotent (all-powerful).' },
  { id: 'sa-chr-2', religionId: 'christianity', marks: 2, question: 'Give two beliefs about the afterlife in Christianity.', modelAnswer: 'Christians believe in resurrection and life after death. They believe there will be judgement, with heaven for the righteous and hell for the unrighteous.', markScheme: '1 mark per belief; can be: resurrection, judgement, heaven, hell.' },
  { id: 'sa-chr-4', religionId: 'christianity', marks: 4, question: 'Explain two contrasting beliefs about baptism in Christianity.', modelAnswer: 'One belief: Some Christians (e.g. Catholics, Anglicans) practise infant baptism, believing it cleanses original sin and initiates the child into the Church. Another belief: Baptists and others practise believers\' baptism, where only those old enough to profess faith are baptised, as it is a personal commitment.', markScheme: 'Two contrasting beliefs with development (2 marks each).' },
  { id: 'sa-chr-5', religionId: 'christianity', marks: 5, question: 'Explain two Christian beliefs about the Trinity. Refer to scripture or sacred writings.', modelAnswer: 'One belief: Christians believe God is one but exists in three persons – Father, Son and Holy Spirit. This is suggested in Matthew 28:19 where Jesus commands baptism "in the name of the Father and of the Son and of the Holy Spirit". Another belief: The three persons are distinct but equal, sharing the same divine nature, as shown in the Nicene Creed.', markScheme: 'Two beliefs with explanation and reference to scripture (5 marks).' },
  { id: 'sa-isl-1', religionId: 'islam', marks: 1, question: 'Give one belief about the nature of God in Islam.', modelAnswer: 'God is one (Tawhid) with no partners or equals.' },
  { id: 'sa-isl-2', religionId: 'islam', marks: 2, question: 'Give two of the Five Pillars of Islam.', modelAnswer: 'Salah (prayer five times daily) and Sawm (fasting during Ramadan).', markScheme: '1 mark per pillar.' },
  { id: 'sa-isl-4', religionId: 'islam', marks: 4, question: 'Explain two contrasting beliefs about the importance of prayer in Islam.', modelAnswer: 'One belief: Sunni Muslims pray five times daily as an obligation; it is the second pillar and central to faith. Another belief: Shi\'a Muslims also pray five times but may combine some prayers; both stress that prayer maintains a direct link with God.', markScheme: 'Two contrasting beliefs with development.' },
  { id: 'sa-thA-1', themeId: 'A', marks: 1, question: 'Give one religious belief about marriage.', modelAnswer: 'Marriage is a sacred covenant between a man and a woman.' },
  { id: 'sa-thA-4', themeId: 'A', marks: 4, question: 'Explain two contrasting religious beliefs about contraception.', modelAnswer: 'One belief: Catholic Christians teach that artificial contraception is wrong because it blocks the natural purpose of sex (procreation) and goes against God\'s design. Another belief: Many Protestant Christians believe contraception is acceptable when used responsibly within marriage to plan family size and care for existing children.', markScheme: 'Two contrasting beliefs with development.' },
];

// ============================================================================
// EXTENDED WRITING PROMPTS (12 marks)
// ============================================================================

export const EXTENDED_WRITING_PROMPTS: ExtendedWritingPrompt[] = [
  {
    id: 'ew-chr-1',
    religionId: 'christianity',
    statement: '"The Trinity is the most important belief in Christianity." Evaluate this statement.',
    guidance: 'In your answer you should refer to Christianity and one other religion.',
    religionsToRefer: ['Christianity', 'Islam'],
    modelAnswer: 'One view: The Trinity is central because it defines who God is – Father, Son and Holy Spirit. It shapes worship (e.g. the sign of the cross), baptism and understanding of salvation. Another view: Some might argue that belief in Jesus as Saviour is more important for daily faith, or that the resurrection has greater practical impact. Evaluation: The Trinity underpins other beliefs (incarnation, salvation); without it, Christianity would not be distinct. Conclusion: The Trinity is arguably the most important belief as it frames all others.',
  },
  {
    id: 'ew-isl-1',
    religionId: 'islam',
    statement: '"The Five Pillars are the most important part of Islam." Evaluate this statement.',
    guidance: 'In your answer you should refer to Islam.',
    modelAnswer: 'One view: The Five Pillars structure Muslim life – Shahadah, Salah, Sawm, Zakah, Hajj – and are obligatory for all Muslims. They ensure regular worship and moral duty. Another view: Belief (Tawhid, Risalah) comes first; without correct belief, the pillars lack meaning. The Qur\'an is also central. Evaluation: The pillars put belief into practice; they are both important. Conclusion: Belief and practice are interconnected; the pillars are essential but not the only important part.',
  },
  {
    id: 'ew-thA-1',
    themeId: 'A',
    statement: '"Religious believers should not use contraception." Evaluate this statement.',
    guidance: 'In your answer you should refer to Christianity and one other religion.',
    religionsToRefer: ['Christianity', 'Islam'],
    modelAnswer: 'One view: Catholic Christians teach that artificial contraception is wrong because it blocks the natural purpose of sex (procreation) and goes against God\'s design. Another view: Many Protestant Christians and Muslims believe contraception can be used responsibly within marriage to plan family size. Evaluation: Views depend on scripture interpretation and authority. Conclusion: There is no single religious view; it depends on tradition and interpretation.',
  },
];

// ============================================================================
// PHILOSOPHICAL ARGUMENTS (Theme C)
// ============================================================================

export const PHILOSOPHICAL_ARGUMENTS: PhilosophicalArgument[] = [
  {
    id: 'pa-design',
    title: 'The Design argument',
    description: 'The universe appears designed (e.g. the eye, fine-tuning of constants); therefore a designer (God) must exist.',
    premises: ['The universe has order and purpose.', 'Such order implies a designer.', 'The designer is God.'],
    strengths: ['Fits with observation of design in nature.', 'Supported by many scientists who are religious.', 'Simple and intuitive.'],
    weaknesses: ['Evolution can explain apparent design without God.', 'Who designed the designer?', 'Could be multiple designers.'],
  },
  {
    id: 'pa-first-cause',
    title: 'The First Cause argument',
    description: 'Everything has a cause; the chain of causes cannot go back infinitely; therefore there must be a first uncaused cause (God).',
    premises: ['Everything that exists has a cause.', 'The chain cannot be infinite.', 'There must be a first cause.'],
    strengths: ['Logical structure.', 'Fits with the idea of the universe having a beginning (Big Bang).'],
    weaknesses: ['Why assume the first cause is God?', 'Could the universe be uncaused?', 'Infinite regress may be possible.'],
  },
  {
    id: 'pa-evil',
    title: 'Evil and suffering as an argument against God',
    description: 'If God is omnipotent, omniscient and benevolent, why does evil and suffering exist?',
    strengths: ['Challenges the existence of such a God.', 'Powerful emotional and logical force.'],
    weaknesses: ['Free will defence: God gave humans free will; evil results from misuse.', 'Soul-making: suffering can lead to growth.', 'Humans may not understand God\'s plan.'],
  },
];

// ============================================================================
// TEXTUAL PASSAGES (Themes G, H)
// ============================================================================

export const TEXTUAL_PASSAGES: TextualPassage[] = [
  {
    id: 'tp-g-1',
    themeId: 'G',
    passageRef: 'Mark 1:1–8',
    passageText: 'The beginning of the good news about Jesus the Messiah, the Son of God... John the Baptist appeared in the wilderness...',
    title: 'John\'s preparation for Jesus\' ministry',
    significance: 'Sets the stage for Jesus; John as forerunner; baptism of repentance.',
  },
  {
    id: 'tp-h-1',
    themeId: 'H',
    passageRef: 'Mark 4:1–9, 14–20',
    passageText: 'The Parable of the Sower: A farmer went out to sow his seed...',
    title: 'Parable of the sower',
    significance: 'Kingdom of God grows in different ways; different responses to the word.',
  },
];

// ============================================================================
// HELPERS
// ============================================================================

export function isProhibitedCombo(r1: ReligionId, r2: ReligionId): boolean {
  return PROHIBITED_COMBOS.some(([a, b]) => (a === r1 && b === r2) || (a === r2 && b === r1));
}

export function getReligionById(id: ReligionId): ReligionMeta | undefined {
  return RELIGIONS.find((r) => r.id === id);
}

export function getThemeById(id: ThemeId): ThemeMeta | undefined {
  return THEMES.find((t) => t.id === id);
}

export function getOptionsForSelection(selection: ReligiousStudiesOptionSelection): { religion1: ReligionMeta; religion2: ReligionMeta; themes: ThemeMeta[] } {
  const religion1 = getReligionById(selection.religion1)!;
  const religion2 = getReligionById(selection.religion2)!;
  const themes = selection.themes.map((id) => getThemeById(id)!).filter(Boolean);
  return { religion1, religion2, themes };
}

export function getBeliefConceptsForSelection(selection: ReligiousStudiesOptionSelection): BeliefConcept[] {
  const ids = [selection.religion1, selection.religion2];
  const themeIds = selection.themes;
  return BELIEF_CONCEPTS.filter(
    (c) =>
      (c.religionId && ids.includes(c.religionId)) ||
      (c.themeId && themeIds.includes(c.themeId))
  );
}

export function getScriptureCardsForSelection(selection: ReligiousStudiesOptionSelection): ScriptureCard[] {
  const ids = [selection.religion1, selection.religion2];
  const themeIds = selection.themes;
  return SCRIPTURE_CARDS.filter(
    (c) =>
      (c.religionId && ids.includes(c.religionId)) ||
      (c.themeId && themeIds.includes(c.themeId))
  );
}

export function getContrastingViewsForSelection(selection: ReligiousStudiesOptionSelection): ContrastingView[] {
  return CONTRASTING_VIEWS.filter((c) => c.themeId && selection.themes.includes(c.themeId));
}

export function getQuickChecksForSelection(selection: ReligiousStudiesOptionSelection): RSQuickCheckItem[] {
  const ids = [selection.religion1, selection.religion2];
  const themeIds = selection.themes;
  return QUICK_CHECK_ITEMS.filter(
    (c) =>
      (c.religionId && ids.includes(c.religionId)) ||
      (c.themeId && themeIds.includes(c.themeId))
  );
}

export function getShortAnswersForSelection(selection: ReligiousStudiesOptionSelection): ShortAnswerItem[] {
  const ids = [selection.religion1, selection.religion2];
  const themeIds = selection.themes;
  return SHORT_ANSWER_ITEMS.filter(
    (c) =>
      (c.religionId && ids.includes(c.religionId)) ||
      (c.themeId && themeIds.includes(c.themeId))
  );
}

export function getExtendedWritingForSelection(selection: ReligiousStudiesOptionSelection): ExtendedWritingPrompt[] {
  const ids = [selection.religion1, selection.religion2];
  const themeIds = selection.themes;
  return EXTENDED_WRITING_PROMPTS.filter(
    (c) =>
      (c.religionId && ids.includes(c.religionId)) ||
      (c.themeId && themeIds.includes(c.themeId))
  );
}

export function getPhilosophicalArgumentsForThemeC(selection: ReligiousStudiesOptionSelection): PhilosophicalArgument[] {
  if (selection.themes.includes('C')) return PHILOSOPHICAL_ARGUMENTS;
  return [];
}

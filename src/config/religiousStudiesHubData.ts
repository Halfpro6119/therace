/**
 * Religious Studies Hub – AQA GCSE Religious Studies A 8062
 * Religions, themes, beliefs, flashcards, contrasting views, quick check, short answer, extended writing.
 */

import type {
  ReligionId,
  ThemeId,
  ReligiousStudiesOptionSelection,
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
  // Buddhism
  { id: 'bud-dhamma', religionId: 'buddhism', title: 'Dhamma (Dharma)', coreIdea: 'The cosmic law and order; the Buddha\'s teaching. Everything is interconnected (dependent arising).', scriptureRef: 'Dhammapada' },
  { id: 'bud-four-noble-truths', religionId: 'buddhism', title: 'Four Noble Truths', coreIdea: '1. Suffering (dukkha) exists. 2. Suffering has causes (craving, ignorance). 3. Suffering can end. 4. The Eightfold Path leads to liberation.', influence: 'Central to Buddhist practice and goal of nibbana.' },
  { id: 'bud-eightfold-path', religionId: 'buddhism', title: 'Eightfold Path', coreIdea: 'Right view, intention, speech, action, livelihood, effort, mindfulness, concentration. The Threefold Way: ethics (sila), meditation (samadhi), wisdom (panna).', scriptureRef: 'Dhammapada 190–191' },
  { id: 'bud-three-marks', religionId: 'buddhism', title: 'Three Marks of Existence', coreIdea: 'Anicca (impermanence), anatta (no fixed self), dukkha (unsatisfactoriness). All conditioned things are impermanent.', influence: 'Leads to non-attachment and the path to liberation.' },
  { id: 'bud-karma', religionId: 'buddhism', title: 'Karma and rebirth', coreIdea: 'Actions have consequences; rebirth continues until nibbana is attained. Good actions lead to better rebirth.', influence: 'Motivates ethical conduct (five precepts).' },
  // Catholic Christianity
  { id: 'cath-trinity', religionId: 'catholic-christianity', title: 'Trinity (Nicene Creed)', coreIdea: 'One God in three persons: Father, Son, Holy Spirit. Defined at Council of Nicaea.', scriptureRef: 'Nicene Creed' },
  { id: 'cath-seven-sacraments', religionId: 'catholic-christianity', title: 'Seven sacraments', coreIdea: 'Baptism, Confirmation, Eucharist, Reconciliation, Anointing of the Sick, Matrimony, Holy Orders. Outward signs of inward grace.', influence: 'Structure Catholic life and worship.' },
  { id: 'cath-purgatory', religionId: 'catholic-christianity', title: 'Purgatory', coreIdea: 'A state of purification after death for those who die in God\'s grace but with venial sin. Souls are purified before heaven.', influence: 'Affects prayers for the dead and funeral rites.' },
  // Hinduism
  { id: 'hin-brahman', religionId: 'hinduism', title: 'Brahman', coreIdea: 'Ultimate reality; can be understood as nirguna (without form) or saguna (with form). The divine consciousness.', scriptureRef: 'Brihadaranyaka Upanishad' },
  { id: 'hin-karma-samsara', religionId: 'hinduism', title: 'Karma, samsara and moksha', coreIdea: 'Actions affect rebirth (samsara). Moksha is liberation from the cycle. Dharma guides right action.', influence: 'Shapes Hindu ethics and life goals.' },
  { id: 'hin-tri-murti', religionId: 'hinduism', title: 'Tri-murti', coreIdea: 'Brahma (creator), Vishnu (preserver), Shiva (destroyer). Different aspects of the divine.', influence: 'Worship and devotion take many forms.' },
  // Judaism
  { id: 'jud-covenant', religionId: 'judaism', title: 'Covenant', coreIdea: 'God\'s agreement with Abraham (Genesis 12) and with Israel at Sinai (Exodus 20). The Torah contains the terms.', scriptureRef: 'Genesis 12:1–3; Exodus 20:1–17' },
  { id: 'jud-mitzvot', religionId: 'judaism', title: 'Mitzvot', coreIdea: 'The 613 commandments. Mitzvot between humans and God, and between humans. Pikuach Nefesh: saving a life overrides most laws.', influence: 'Guide Jewish daily life and ethics.' },
  { id: 'jud-messiah', religionId: 'judaism', title: 'Messiah', coreIdea: 'The anointed one who will bring peace and redemption. Jews await the Messiah; Christians believe Jesus is the Messiah.', influence: 'Different expectations in Judaism vs Christianity.' },
  // Sikhism
  { id: 'sik-mool-mantra', religionId: 'sikhism', title: 'Mool Mantra', coreIdea: 'The opening of the Guru Granth Sahib; defines God as one, creator, timeless, beyond birth and death.', scriptureRef: 'Guru Granth Sahib 1a' },
  { id: 'sik-equality-sewa', religionId: 'sikhism', title: 'Equality and sewa', coreIdea: 'All humans are equal regardless of gender, caste or background. Sewa is selfless service to others.', influence: 'Langar (free kitchen), sangat (community).' },
  // Theme B
  { id: 'thB-sanctity-life', themeId: 'B', title: 'Sanctity of life', coreIdea: 'Human life is sacred because it is created by God (or has inherent worth). Affects views on abortion and euthanasia.', influence: 'Many religions oppose abortion and euthanasia.' },
  { id: 'thB-stewardship', themeId: 'B', title: 'Stewardship', coreIdea: 'Humans have a duty to care for creation. The world is God\'s gift; we are caretakers, not owners.', influence: 'Affects environmental ethics.' },
  // Theme D
  { id: 'thD-just-war', themeId: 'D', title: 'Just war theory', coreIdea: 'Criteria for when war may be justified: just cause, legitimate authority, last resort, proportionality, chance of success.', influence: 'Christian and other religious thought on war.' },
  { id: 'thD-pacifism', themeId: 'D', title: 'Pacifism', coreIdea: 'The belief that violence and war are never justified. Some religions (e.g. Quakers) emphasise peace.', influence: 'Conscientious objection; peace movements.' },
  // Theme E
  { id: 'thE-aims-punishment', themeId: 'E', title: 'Aims of punishment', coreIdea: 'Retribution (deserved penalty), deterrence (putting others off), reformation (changing the offender). Religions weigh these differently.', influence: 'Views on prison, death penalty, forgiveness.' },
  // Theme F
  { id: 'thF-human-rights', themeId: 'F', title: 'Human rights', coreIdea: 'All humans have inherent dignity and rights. Religions may ground this in Divine creation or natural law.', influence: 'Opposition to discrimination; support for justice.' },
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
  // Buddhism
  { id: 'sc-bud-dhamma', religionId: 'buddhism', term: 'Dhamma/Dharma', definition: 'The Buddha\'s teaching; cosmic law; the way things are.', scriptureRef: 'Dhammapada' },
  { id: 'sc-bud-dukkha', religionId: 'buddhism', term: 'Dukkha', definition: 'Suffering, unsatisfactoriness; the first Noble Truth.', inContext: 'Everything conditioned involves dukkha.' },
  { id: 'sc-bud-nibbana', religionId: 'buddhism', term: 'Nibbana/Nirvana', definition: 'Liberation from suffering; the end of rebirth.', inContext: 'Achieved by following the Eightfold Path.' },
  { id: 'sc-bud-puja', religionId: 'buddhism', term: 'Puja', definition: 'Devotional practice; offerings, chanting, meditation.', inContext: 'Practised at home and in temples.' },
  // Catholic Christianity
  { id: 'sc-cath-transubstantiation', religionId: 'catholic-christianity', term: 'Transubstantiation', definition: 'Bread and wine become the body and blood of Christ at consecration.', inContext: 'Catholic belief about the Eucharist.' },
  { id: 'sc-cath-annulment', religionId: 'catholic-christianity', term: 'Annulment', definition: 'Declaration that a marriage was never valid; not divorce.', inContext: 'Allows remarriage in the Catholic Church.' },
  // Hinduism
  { id: 'sc-hin-moksha', religionId: 'hinduism', term: 'Moksha', definition: 'Liberation from samsara; union with Brahman.', inContext: 'The ultimate goal of Hindu life.' },
  { id: 'sc-hin-puja', religionId: 'hinduism', term: 'Puja', definition: 'Hindu worship; offerings to deities; darshan (seeing the divine).', inContext: 'Can be at home or in temples.' },
  // Judaism
  { id: 'sc-jud-shekhinah', religionId: 'judaism', term: 'Shekhinah', definition: 'The divine presence; God\'s immanence in the world.', inContext: 'Often associated with the Tabernacle/Temple.' },
  { id: 'sc-jud-shabbat', religionId: 'judaism', term: 'Shabbat', definition: 'The Sabbath; rest from Friday sunset to Saturday sunset.', scriptureRef: 'Exodus 20:8–11' },
  // Sikhism
  { id: 'sc-sik-langar', religionId: 'sikhism', term: 'Langar', definition: 'Free communal meal in the gurdwara; symbolises equality.', inContext: 'All eat together regardless of background.' },
  { id: 'sc-sik-sewa', religionId: 'sikhism', term: 'Sewa', definition: 'Selfless service; physical, mental or material.', inContext: 'Central to Sikh practice.' },
  // Themes B–F
  { id: 'sc-thB-sanctity-life', themeId: 'B', term: 'Sanctity of life', definition: 'Life is sacred; created by God or has inherent worth.', inContext: 'Used in arguments against abortion and euthanasia.' },
  { id: 'sc-thB-quality-life', themeId: 'B', term: 'Quality of life', definition: 'The idea that some lives may not be worth living; used in ethical debates.', inContext: 'Contrasts with sanctity of life.' },
  { id: 'sc-thD-just-war', themeId: 'D', term: 'Just war', definition: 'War may be justified if certain criteria are met.', inContext: 'Just cause, legitimate authority, last resort, etc.' },
  { id: 'sc-thE-retribution', themeId: 'E', term: 'Retribution', definition: 'Punishment as deserved penalty; "eye for an eye".', inContext: 'One aim of punishment.' },
  { id: 'sc-thE-reformation', themeId: 'E', term: 'Reformation', definition: 'Punishment should reform the offender.', inContext: 'Rehabilitation rather than vengeance.' },
  { id: 'sc-thF-discrimination', themeId: 'F', term: 'Discrimination', definition: 'Unfair treatment based on race, gender, religion, etc.', inContext: 'Religions often oppose discrimination.' },
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
  // Theme B
  { id: 'cv-abortion', themeId: 'B', issue: 'Abortion', views: [{ religion: 'Catholic Christianity', view: 'Abortion is always wrong; life begins at conception.', scripture: 'Sanctity of life' }, { religion: 'Some Protestants', view: 'May be permitted in limited circumstances (e.g. risk to mother).', scripture: 'Quality of life; compassion' }, { religion: 'Islam', view: 'Generally forbidden after 120 days; earlier stages debated.', scripture: 'Qur\'an; Hadith' }], modelAnswer: 'One belief: Catholics teach that abortion is always wrong because life begins at conception and is sacred. Another belief: Some Christians allow abortion in limited circumstances, such as when the mother\'s life is at risk, balancing sanctity and quality of life.' },
  { id: 'cv-euthanasia', themeId: 'B', issue: 'Euthanasia', views: [{ religion: 'Christianity', view: 'Euthanasia is wrong; life is God\'s to give and take.', scripture: 'Sanctity of life' }, { religion: 'Humanism', view: 'Individuals have the right to choose when to end their life.', scripture: 'Autonomy; quality of life' }], modelAnswer: 'One belief: Christians teach that euthanasia is wrong because life is sacred and given by God; only God can take it. Another belief: Humanists argue that individuals have the right to choose to end their life if suffering is unbearable, respecting autonomy.' },
  // Theme D
  { id: 'cv-pacifism', themeId: 'D', issue: 'Pacifism', views: [{ religion: 'Quakers', view: 'Violence is never justified; peace and reconciliation.', scripture: 'Jesus\' teaching' }, { religion: 'Just war tradition', view: 'War may be justified if criteria are met.', scripture: 'Augustine; Aquinas' }] },
  // Theme E
  { id: 'cv-death-penalty', themeId: 'E', issue: 'Death penalty', views: [{ religion: 'Catholic Christianity', view: 'Opposed; all life is sacred; rehabilitation possible.', scripture: 'Sanctity of life' }, { religion: 'Some Christians', view: 'May be justified for serious crimes; retribution.', scripture: 'Genesis 9:6' }, { religion: 'Islam', view: 'Permitted for certain crimes (e.g. murder) under Shari\'ah.', scripture: 'Qur\'an' }], modelAnswer: 'One belief: Catholics oppose the death penalty, teaching that all life is sacred and redemption is always possible. Another belief: Some Muslims support it for certain crimes, as specified in Shari\'ah, seeing it as just retribution.' },
  // Theme F
  { id: 'cv-wealth-poverty', themeId: 'F', issue: 'Wealth and poverty', views: [{ religion: 'Christianity', view: 'Wealth should be shared; "love your neighbour"; charity.', scripture: 'Matthew 25; Luke 12' }, { religion: 'Islam', view: 'Zakah obliges giving; wealth is a trust from God.', scripture: 'Qur\'an; Zakah' }] },
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
  // Buddhism
  { id: 'qc-bud-1', religionId: 'buddhism', type: 'multipleChoice', question: 'What is the goal of the Eightfold Path?', options: ['Heaven', 'Nibbana', 'Reincarnation', 'Enlightenment in one life'], correctAnswer: 'Nibbana' },
  { id: 'qc-bud-2', religionId: 'buddhism', type: 'trueFalse', question: 'The Three Marks of Existence include anicca (impermanence).', correctAnswer: 'true' },
  // Catholic Christianity
  { id: 'qc-cath-1', religionId: 'catholic-christianity', type: 'multipleChoice', question: 'How many sacraments do Catholics recognise?', options: ['Two', 'Five', 'Seven', 'Ten'], correctAnswer: 'Seven' },
  { id: 'qc-cath-2', religionId: 'catholic-christianity', type: 'trueFalse', question: 'Catholics believe in purgatory.', correctAnswer: 'true' },
  // Hinduism
  { id: 'qc-hin-1', religionId: 'hinduism', type: 'multipleChoice', question: 'What is moksha?', options: ['Prayer', 'Liberation from samsara', 'A god', 'A festival'], correctAnswer: 'Liberation from samsara' },
  // Judaism
  { id: 'qc-jud-1', religionId: 'judaism', type: 'multipleChoice', question: 'What is the Sabbath called in Judaism?', options: ['Salah', 'Shabbat', 'Easter', 'Ramadan'], correctAnswer: 'Shabbat' },
  // Sikhism
  { id: 'qc-sik-1', religionId: 'sikhism', type: 'multipleChoice', question: 'What is the free communal meal in Sikhism called?', options: ['Eucharist', 'Langar', 'Sawm', 'Puja'], correctAnswer: 'Langar' },
  // Themes B–F
  { id: 'qc-thB-1', themeId: 'B', type: 'multipleChoice', question: 'Which theme covers abortion and euthanasia?', options: ['Theme A', 'Theme B', 'Theme C', 'Theme D'], correctAnswer: 'Theme B' },
  { id: 'qc-thC-1', themeId: 'C', type: 'multipleChoice', question: 'Which argument claims the universe is designed?', options: ['First Cause', 'Design', 'Evil and suffering', 'Miracles'], correctAnswer: 'Design' },
  { id: 'qc-thD-1', themeId: 'D', type: 'multipleChoice', question: 'What does pacifism mean?', options: ['Support for war', 'Opposition to all violence', 'Just war', 'Holy war'], correctAnswer: 'Opposition to all violence' },
  { id: 'qc-thE-1', themeId: 'E', type: 'multipleChoice', question: 'Which is an aim of punishment?', options: ['Liberation', 'Retribution', 'Salvation', 'Eucharist'], correctAnswer: 'Retribution' },
  { id: 'qc-thF-1', themeId: 'F', type: 'multipleChoice', question: 'Which theme covers human rights and discrimination?', options: ['Theme B', 'Theme D', 'Theme E', 'Theme F'], correctAnswer: 'Theme F' },
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
  // Buddhism, Judaism, Sikhism, Hinduism, Catholic Christianity
  { id: 'sa-bud-1', religionId: 'buddhism', marks: 1, question: 'Give one of the Four Noble Truths.', modelAnswer: 'Suffering (dukkha) exists.' },
  { id: 'sa-bud-2', religionId: 'buddhism', marks: 2, question: 'Give two of the Three Marks of Existence.', modelAnswer: 'Anicca (impermanence), anatta (no fixed self), dukkha (unsatisfactoriness).', markScheme: '1 mark per belief.' },
  { id: 'sa-jud-1', religionId: 'judaism', marks: 1, question: 'Give one belief about the Covenant in Judaism.', modelAnswer: 'God made a covenant with Abraham/the Israelites at Sinai.' },
  { id: 'sa-jud-2', religionId: 'judaism', marks: 2, question: 'Give two beliefs about Shabbat in Judaism.', modelAnswer: 'Rest from work; remembering creation; covenant sign.', markScheme: '1 mark per belief.' },
  { id: 'sa-sik-1', religionId: 'sikhism', marks: 1, question: 'Give one belief about God in Sikhism.', modelAnswer: 'God is one, creator, timeless (from Mool Mantra).' },
  { id: 'sa-sik-2', religionId: 'sikhism', marks: 2, question: 'Give two Sikh beliefs about equality.', modelAnswer: 'All humans are equal; langar demonstrates equality; sewa (service) to all.', markScheme: '1 mark per belief.' },
  { id: 'sa-hin-1', religionId: 'hinduism', marks: 1, question: 'Give one Hindu belief about Brahman.', modelAnswer: 'Brahman is ultimate reality; can be nirguna or saguna.' },
  { id: 'sa-cath-1', religionId: 'catholic-christianity', marks: 1, question: 'Give one Catholic belief about the sacraments.', modelAnswer: 'Sacraments are outward signs of inward grace.' },
  // Themes B–F
  { id: 'sa-thB-1', themeId: 'B', marks: 1, question: 'Give one religious belief about the sanctity of life.', modelAnswer: 'Human life is sacred because it is created by God.' },
  { id: 'sa-thB-4', themeId: 'B', marks: 4, question: 'Explain two contrasting religious beliefs about abortion.', modelAnswer: 'One belief: Catholics teach that abortion is always wrong because life begins at conception and is sacred. Another belief: Some Christians allow abortion in limited circumstances (e.g. risk to mother).', markScheme: 'Two contrasting beliefs with development.' },
  { id: 'sa-thD-4', themeId: 'D', marks: 4, question: 'Explain two contrasting beliefs about pacifism.', modelAnswer: 'One belief: Pacifists (e.g. Quakers) believe violence is never justified; peace and reconciliation are the way. Another belief: The just war tradition teaches that war may be justified if certain criteria are met.', markScheme: 'Two contrasting beliefs with development.' },
  { id: 'sa-thE-1', themeId: 'E', marks: 1, question: 'Give one aim of punishment.', modelAnswer: 'Retribution (deserved penalty).' },
  { id: 'sa-thF-1', themeId: 'F', marks: 1, question: 'Give one religious teaching about wealth.', modelAnswer: 'Wealth should be shared; charity is a duty.' },
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
  {
    id: 'ew-thB-1',
    themeId: 'B',
    statement: '"The sanctity of life means abortion is always wrong." Evaluate this statement.',
    guidance: 'In your answer you should refer to religious and non-religious views.',
    religionsToRefer: ['Christianity', 'Islam'],
    modelAnswer: 'One view: Catholics and many Christians teach that life begins at conception and is sacred; abortion is always wrong. Another view: Some argue quality of life matters; if the mother\'s life is at risk or the child would suffer severely, abortion may be justified. Evaluation: Depends on when life begins and how sanctity vs quality are weighed. Conclusion: Strong religious views exist; secular views often differ.',
  },
  {
    id: 'ew-thD-1',
    themeId: 'D',
    statement: '"Pacifism is the only acceptable religious response to war." Evaluate this statement.',
    guidance: 'In your answer you should refer to Christianity and one other religion.',
    religionsToRefer: ['Christianity', 'Islam'],
    modelAnswer: 'One view: Pacifists (e.g. Quakers) believe violence is never justified; Jesus taught love of enemies. Another view: Just war tradition and some Muslims support war when criteria are met (e.g. self-defence). Evaluation: Both can be grounded in scripture; interpretation matters. Conclusion: Religions contain both pacifist and just-war traditions.',
  },
  {
    id: 'ew-thE-1',
    themeId: 'E',
    statement: '"The death penalty is never justified." Evaluate this statement.',
    guidance: 'In your answer you should refer to religious and non-religious views.',
    religionsToRefer: ['Christianity', 'Islam'],
    modelAnswer: 'One view: Catholics and many Christians oppose the death penalty; all life is sacred; rehabilitation is possible. Another view: Some Muslims and Christians support it for serious crimes; retribution and deterrence. Evaluation: Sanctity of life vs justice and retribution. Conclusion: No single religious view; tradition and interpretation vary.',
  },
  {
    id: 'ew-bud-1',
    religionId: 'buddhism',
    statement: '"The Eightfold Path is the most important Buddhist teaching." Evaluate this statement.',
    guidance: 'In your answer you should refer to Buddhism.',
    modelAnswer: 'One view: The Eightfold Path is central – it is the fourth Noble Truth and the practical way to end suffering. Another view: The Four Noble Truths provide the framework; without understanding dukkha, the path lacks meaning. Evaluation: Both are interconnected; the path puts the truths into practice. Conclusion: The Eightfold Path is essential but part of a whole.',
  },
  {
    id: 'ew-cath-1',
    religionId: 'catholic-christianity',
    statement: '"The seven sacraments are the most important part of Catholic life." Evaluate this statement.',
    guidance: 'In your answer you should refer to Catholic Christianity.',
    modelAnswer: 'One view: The sacraments mark key moments (baptism, Eucharist, marriage, etc.) and channel God\'s grace. Another view: Prayer and the Mass are central; sacraments are one expression. Evaluation: Sacraments structure Catholic life; they are both important. Conclusion: The sacraments are fundamental to Catholic identity.',
  },
  {
    id: 'ew-jud-1',
    religionId: 'judaism',
    statement: '"The Covenant is the most important belief in Judaism." Evaluate this statement.',
    guidance: 'In your answer you should refer to Judaism.',
    modelAnswer: 'One view: The Covenant defines the relationship between God and Israel; the Torah flows from it. Another view: Mitzvot and practice are equally important; belief without action is incomplete. Evaluation: Covenant and mitzvot are interconnected. Conclusion: The Covenant is foundational but practice matters too.',
  },
  {
    id: 'ew-thC-1',
    themeId: 'C',
    statement: '"The Design argument proves that God exists." Evaluate this statement.',
    guidance: 'In your answer you should refer to religious and non-religious views.',
    modelAnswer: 'One view: The universe exhibits order and purpose; therefore a designer (God) exists. Another view: Evolution explains apparent design; the argument commits the "who designed the designer?" fallacy. Evaluation: The argument is intuitive but not conclusive. Conclusion: It supports belief but does not prove God\'s existence.',
  },
  {
    id: 'ew-thF-1',
    themeId: 'F',
    statement: '"Religious believers should give all their wealth to the poor." Evaluate this statement.',
    guidance: 'In your answer you should refer to Christianity and one other religion.',
    religionsToRefer: ['Christianity', 'Islam'],
    modelAnswer: 'One view: Jesus taught "sell what you have and give to the poor"; radical generosity. Another view: Stewardship and responsible giving; not necessarily giving everything. Evaluation: Religions emphasise charity but differ on extent. Conclusion: Generosity is valued; practical application varies.',
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
  {
    id: 'pa-miracles',
    title: 'The argument from miracles',
    description: 'Miracles (events that defy natural law) suggest divine intervention; therefore God exists.',
    premises: ['Miracles occur.', 'Miracles cannot be explained by natural causes.', 'Therefore a supernatural cause (God) exists.'],
    strengths: ['Fits with religious testimony.', 'If one miracle occurred, it could support God\'s existence.'],
    weaknesses: ['Miracles may have natural explanations.', 'Can we verify miracles?', 'Hume: it is always more reasonable to doubt than to believe.'],
  },
];

// ============================================================================
// TEXTUAL PASSAGES (Themes G, H)
// ============================================================================

export const TEXTUAL_PASSAGES: TextualPassage[] = [
  // Theme G
  { id: 'tp-g-1', themeId: 'G', passageRef: 'Mark 1:1–8', passageText: 'The beginning of the good news about Jesus the Messiah, the Son of God... John the Baptist appeared in the wilderness, proclaiming a baptism of repentance for the forgiveness of sins.', title: 'John\'s preparation for Jesus\' ministry', significance: 'Sets the stage for Jesus; John as forerunner; baptism of repentance.' },
  { id: 'tp-g-2', themeId: 'G', passageRef: 'Mark 1:9–13', passageText: 'Jesus came from Nazareth of Galilee and was baptized by John in the Jordan... And the Spirit immediately drove him out into the wilderness. He was in the wilderness forty days, tempted by Satan.', title: 'Jesus\' baptism and temptation', significance: 'Jesus\' identity affirmed; divine Sonship; overcoming temptation.' },
  { id: 'tp-g-3', themeId: 'G', passageRef: 'Mark 8:27–33', passageText: 'Jesus asked his disciples, "Who do people say that I am?"... Peter answered, "You are the Messiah."... And he began to teach them that the Son of Man must undergo great suffering...', title: 'The conversation at Caesarea Philippi', significance: 'Peter\'s confession; Jesus as Messiah; Son of Man must suffer.' },
  { id: 'tp-g-4', themeId: 'G', passageRef: 'Mark 14:12–26', passageText: 'On the first day of Unleavened Bread... they prepared the Passover... While they were eating, he took a loaf of bread, and after blessing it he broke it, gave it to them, and said, "Take; this is my body."', title: 'The Last Supper', significance: 'Institution of the Eucharist; Jesus\' body and blood; covenant.' },
  { id: 'tp-g-5', themeId: 'G', passageRef: 'Mark 15:21–47', passageText: 'They compelled a passer-by, Simon of Cyrene, to carry his cross... When it was noon, darkness came over the whole land... Then Jesus gave a loud cry and breathed his last.', title: 'The crucifixion and burial', significance: 'Jesus\' death; suffering; fulfilment of God\'s plan.' },
  { id: 'tp-g-6', themeId: 'G', passageRef: 'Mark 16:1–8', passageText: 'When the sabbath was over... they found the stone rolled away... A young man said, "He has been raised; he is not here."', title: 'The empty tomb', significance: 'Resurrection; Jesus\' victory over death; different explanations for the empty tomb.' },
  // Theme H
  { id: 'tp-h-1', themeId: 'H', passageRef: 'Mark 4:1–9, 14–20', passageText: 'The Parable of the Sower: A farmer went out to sow his seed. Some fell on the path... some on rocky ground... some among thorns... some on good soil.', title: 'Parable of the sower', significance: 'Kingdom of God grows in different ways; different responses to the word.' },
  { id: 'tp-h-2', themeId: 'H', passageRef: 'Mark 10:13–16', passageText: 'People were bringing little children to him... "Let the little children come to me; do not stop them; for it is to such as these that the kingdom of God belongs."', title: 'Jesus and the children', significance: 'Kingdom belongs to the humble; children as example; welcome to the marginalised.' },
  { id: 'tp-h-3', themeId: 'H', passageRef: 'Mark 12:28–34', passageText: '"Which commandment is the first of all?" Jesus answered, "The first is, \'Hear, O Israel: the Lord our God, the Lord is one; you shall love the Lord your God...\' And the second is this, \'You shall love your neighbour as yourself.\'"', title: 'The greatest commandment', significance: 'Love of God and neighbour; summary of the law.' },
  { id: 'tp-h-4', themeId: 'H', passageRef: 'Mark 1:16–20', passageText: 'As Jesus passed along the Sea of Galilee, he saw Simon and his brother Andrew... And Jesus said to them, "Follow me and I will make you fish for people." And immediately they left their nets and followed him.', title: 'The call of the first disciples', significance: 'Immediate response; cost of discipleship; leaving everything.' },
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

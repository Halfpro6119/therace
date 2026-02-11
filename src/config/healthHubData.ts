/**
 * Health Hub – Edexcel GCSE Health and Social Care
 * Units 1–4, concepts, glossary, life stages, quick checks, case studies, investigations, care values, question lab.
 */

import type {
  HealthUnit,
  HealthConcept,
  HealthTerm,
  LifeStage,
  HealthQuickCheck,
  HealthCaseStudy,
  InvestigationScaffold,
  CareValueScenario,
  QuestionLabItem,
  HealthUnitId,
  HealthAward,
} from '../types/healthHub';

// ============================================================================
// UNITS & TOPICS
// ============================================================================

export const HEALTH_UNITS: HealthUnit[] = [
  {
    id: '1',
    title: 'Understanding Personal Development and Relationships',
    shortTitle: 'Personal Development & Relationships',
    singleAward: true,
    doubleAward: true,
    topics: [
      { id: '1.1', unitId: '1', title: 'Human growth and development', specRef: '1.1' },
      { id: '1.2', unitId: '1', title: 'Factors affecting human growth and development', specRef: '1.2' },
      { id: '1.3', unitId: '1', title: 'Effects of relationships on personal growth', specRef: '1.3' },
      { id: '1.4', unitId: '1', title: 'The effect of life events on personal development', specRef: '1.4' },
    ],
  },
  {
    id: '2',
    title: 'Exploring Health, Social Care and Early Years Provision',
    shortTitle: 'Care Provision',
    singleAward: true,
    doubleAward: true,
    topics: [
      { id: '2.1', unitId: '2', title: 'Range of care needs of major client groups', specRef: '2.1' },
      { id: '2.2', unitId: '2', title: 'How services are provided', specRef: '2.2' },
      { id: '2.3', unitId: '2', title: 'Access and barriers to access', specRef: '2.3' },
      { id: '2.4', unitId: '2', title: 'Workers in health, social care and early years', specRef: '2.4' },
      { id: '2.5', unitId: '2', title: 'Care values', specRef: '2.5' },
    ],
  },
  {
    id: '3',
    title: 'Promoting Health and Wellbeing',
    shortTitle: 'Health and Wellbeing',
    singleAward: false,
    doubleAward: true,
    topics: [
      { id: '3.1', unitId: '3', title: 'Understanding health and wellbeing', specRef: '3.1' },
      { id: '3.2', unitId: '3', title: 'Factors affecting health and wellbeing', specRef: '3.2' },
      { id: '3.3', unitId: '3', title: 'Indicators of physical health', specRef: '3.3' },
      { id: '3.4', unitId: '3', title: 'Promoting and supporting health improvement', specRef: '3.4' },
    ],
  },
  {
    id: '4',
    title: 'Health, Social Care and Early Years in Practice',
    shortTitle: 'In Practice',
    singleAward: false,
    doubleAward: true,
    topics: [
      { id: '4.1', unitId: '4', title: 'Care needs of major client groups (applied)', specRef: '4.1' },
      { id: '4.2', unitId: '4', title: 'Care values in practitioner work', specRef: '4.2' },
      { id: '4.3', unitId: '4', title: 'Self-concept and personal relationships', specRef: '4.3' },
      { id: '4.4', unitId: '4', title: 'Promoting health improvement', specRef: '4.4' },
    ],
  },
];

// ============================================================================
// LIFE STAGES (PIES)
// ============================================================================

export const LIFE_STAGES: LifeStage[] = [
  {
    id: 'infancy',
    name: 'Infancy',
    ageRange: '0–2 years',
    order: 1,
    physical: ['Rapid growth', 'Gross motor skills develop (sitting, crawling, walking)', 'Fine motor skills develop (grasping, feeding)', 'Bonding and attachment'],
    intellectual: ['Language development begins', 'Object permanence', 'Learning through senses', 'Simple cause and effect'],
    emotional: ['Attachment to primary carer', 'Stranger anxiety', 'Self‑image begins to form', 'Emotional dependency'],
    social: ['Bonding with family', 'First social interactions', 'Learning to trust', 'Attachment styles form'],
  },
  {
    id: 'early-childhood',
    name: 'Early childhood',
    ageRange: '3–8 years',
    order: 2,
    physical: ['Refinement of motor skills', 'Running, jumping, climbing', 'Drawing and writing ability develops', 'Growth slows'],
    intellectual: ['Language expands rapidly', 'Reading and writing begin', 'Logical thinking develops', 'Memory and attention improve'],
    emotional: ['Self‑esteem develops', 'Managing emotions', 'Independence grows', 'Peer comparison begins'],
    social: ['Friendships form', 'Playing with others', 'School socialisation', 'Understanding rules'],
  },
  {
    id: 'adolescence',
    name: 'Adolescence',
    ageRange: '9–18 years',
    order: 3,
    physical: ['Puberty and growth spurt', 'Physical maturation', 'Hormonal changes', 'Body image concerns'],
    intellectual: ['Abstract thinking', 'Problem‑solving', 'Future planning', 'Identity exploration'],
    emotional: ['Mood swings', 'Self‑concept refinement', 'Peer pressure', 'Identity formation'],
    social: ['Peer groups crucial', 'Romantic relationships may begin', 'Independence from family', 'Role experimentation'],
  },
  {
    id: 'early-adulthood',
    name: 'Early adulthood',
    ageRange: '19–45 years',
    order: 4,
    physical: ['Peak physical fitness', 'Reproductive capacity', 'Active lifestyle choices', 'Health habits form'],
    intellectual: ['Career development', 'Decision‑making', 'Financial planning', 'Lifelong learning'],
    emotional: ['Partnership formation', 'Parenting roles', 'Work–life balance', 'Identity with career'],
    social: ['Long‑term relationships', 'Family formation', 'Professional networks', 'Community involvement'],
  },
  {
    id: 'middle-adulthood',
    name: 'Middle adulthood',
    ageRange: '46–65 years',
    order: 5,
    physical: ['Menopause (women)', 'Aging signs', 'Health maintenance', 'Chronic conditions may emerge'],
    intellectual: ['Expertise and wisdom', 'Career peak', 'Planning for retirement', 'Supporting children'],
    emotional: ['Reflection on life', 'Empty nest', 'Grandparent roles', 'Re‑evaluation of goals'],
    social: ['Supporting adult children', 'Caring for ageing parents', 'Community roles', 'Friendship networks'],
  },
  {
    id: 'later-adulthood',
    name: 'Later adulthood',
    ageRange: '65+ years',
    order: 6,
    physical: ['Slower metabolism', 'Sensory changes', 'Chronic conditions', 'Mobility may decline'],
    intellectual: [' lifelong learning', 'Memory changes', 'Life review', 'Wisdom sharing'],
    emotional: ['Loss and bereavement', 'Contentment or adjustment', 'Legacy', 'Acceptance'],
    social: ['Retirement', 'Social changes', 'Support networks', 'Care needs may increase'],
  },
];

// ============================================================================
// CONCEPTS
// ============================================================================

export const HEALTH_CONCEPTS: HealthConcept[] = [
  // Unit 1
  { id: 'c-1.1-pies', unitId: '1', topicId: '1.1', title: 'PIES across life stages', coreIdea: 'Human development can be described using PIES: Physical (growth, motor skills), Intellectual (thinking, language), Emotional (feelings, self‑concept), and Social (relationships, socialisation). Each life stage has typical PIES milestones.', commonMisconception: 'Thinking development is only physical – intellectual, emotional and social development are equally important.', applyScenario: 'How might a care worker use PIES when assessing a child\'s development?' },
  { id: 'c-1.1-self-concept', unitId: '1', topicId: '1.1', title: 'Self-concept and self-esteem', coreIdea: 'Self-concept is how we see ourselves; self-esteem is how we value ourselves. Both develop across life stages and are affected by relationships, experiences, gender, appearance and culture.', commonMisconception: 'Assuming self-concept is fixed – it can change with life events and relationships.', applyScenario: 'How might a teenager\'s self-concept be affected by social media?' },
  { id: 'c-1.2-factors', unitId: '1', topicId: '1.2', title: 'Factors affecting development', coreIdea: 'Development is affected by physical factors (genetics, diet, illness), social/cultural factors (family, education, employment), economic factors (income, poverty), environmental factors (housing, pollution), and psychological factors (stress, relationships).', commonMisconception: 'Thinking only genetics matter – environment and lifestyle have a huge impact.', applyScenario: 'How might unemployment affect an adult\'s emotional and social development?' },
  { id: 'c-1.3-relationships', unitId: '1', topicId: '1.3', title: 'Types of relationships', coreIdea: 'Relationships include family (marriage, divorce, parenthood, siblings, blended families), friendships, intimate/sexual relationships, and working relationships. All affect growth and development across life stages.', commonMisconception: 'Assuming only family matters – friendships and working relationships also shape development.', applyScenario: 'Why might a blended family present both challenges and opportunities for a child?' },
  { id: 'c-1.4-life-events', unitId: '1', topicId: '1.4', title: 'Life events and support', coreIdea: 'Expected (school, marriage, retirement) and unexpected (bereavement, redundancy, accident) life events affect development. Support networks include partners, family, friends, professional carers, statutory services, and community/voluntary/faith-based services.', commonMisconception: 'Thinking people cope alone – support networks are essential for managing change.', applyScenario: 'What support might someone need when facing redundancy?' },
  // Unit 2
  { id: 'c-2.1-hierarchy', unitId: '2', topicId: '2.1', title: 'Hierarchy of needs', coreIdea: 'Maslow\'s hierarchy: physical needs first (food, shelter), then safety, love/belonging, esteem, self-actualisation. Services respond to needs at different levels – universal (all) and targeted (specific groups).', commonMisconception: 'Assuming all needs are equal – basic physical needs must be met first.', applyScenario: 'Why might a homeless person struggle to access employment services?' },
  { id: 'c-2.2-providers', unitId: '2', topicId: '2.2', title: 'Types of service providers', coreIdea: 'Statutory (NHS, local authority), private (companies, self-employed), voluntary (charities, support groups), and informal (family, friends). Services work in partnership – multi-agency working (e.g. Sure Start, virtual wards).', commonMisconception: 'Thinking only the NHS provides care – many services are voluntary or private.', applyScenario: 'How might a family support worker and a health visitor work together?' },
  { id: 'c-2.3-barriers', unitId: '2', topicId: '2.3', title: 'Barriers to accessing services', coreIdea: 'Physical (stairs, no lifts), psychological (stigma, fear), financial (means testing, fees), geographical (distance, transport), cultural/language (beliefs, first language), and resource (staff shortages, postcode lottery).', commonMisconception: 'Assuming everyone can access services equally – barriers affect many people.', applyScenario: 'What barriers might an older person with dementia face when accessing care?' },
  { id: 'c-2.5-care-values', unitId: '2', topicId: '2.5', title: 'Care values', coreIdea: 'Anti-discriminatory practice; promoting rights to dignity, independence, health and safety; effective communication; confidentiality; acknowledging beliefs and identity. These underpin all care work.', commonMisconception: 'Thinking confidentiality is absolute – safeguarding can override it.', applyScenario: 'How would a care worker demonstrate dignity when supporting personal care?' },
  // Unit 3
  { id: 'c-3.1-wellbeing', unitId: '3', topicId: '3.1', title: 'Definitions of health and wellbeing', coreIdea: 'Health is physical, mental and social wellbeing – not just absence of disease. Holistic view considers the whole person. Different models (medical, social) influence how we understand health.', commonMisconception: 'Thinking health is only physical – mental and social wellbeing matter too.', applyScenario: 'How might a care worker take a holistic approach to a service user?' },
  { id: 'c-3.4-promotion', unitId: '3', topicId: '3.4', title: 'Promoting health improvement', coreIdea: 'Health campaigns, education, lifestyle advice, support groups, one-to-one interventions. Plan for individual or small group; evaluate effectiveness.', commonMisconception: 'Assuming one size fits all – health promotion must be tailored to the individual.', applyScenario: 'How might you promote healthy eating to a group of teenagers?' },
];

// ============================================================================
// GLOSSARY / TERMS
// ============================================================================

export const HEALTH_TERMS: HealthTerm[] = [
  { id: 't-self-concept', unitId: '1', topicId: '1.1', term: 'Self-concept', definition: 'How an individual sees and understands themselves', inContext: 'A teenager\'s self-concept may be influenced by their peers and social media.', examTip: true },
  { id: 't-gross-motor', unitId: '1', topicId: '1.1', term: 'Gross motor skills', definition: 'Large body movements (crawling, walking, running)', inContext: 'Gross motor skills develop in infancy and early childhood.' },
  { id: 't-fine-motor', unitId: '1', topicId: '1.1', term: 'Fine motor skills', definition: 'Small precise movements (grasping, writing)', inContext: 'Fine motor skills develop after gross motor skills.' },
  { id: 't-life-stages', unitId: '1', topicId: '1.1', term: 'Life stages', definition: 'Infancy 0–2, early childhood 3–8, adolescence 9–18, early adulthood 19–45, middle adulthood 46–65, later adulthood 65+', examTip: true },
  { id: 't-pies', unitId: '1', topicId: '1.1', term: 'PIES', definition: 'Physical, Intellectual, Emotional, Social – the four areas of development', examTip: true },
  { id: 't-expected-life-event', unitId: '1', topicId: '1.4', term: 'Expected life event', definition: 'Predictable events (starting school, marriage, retirement)', inContext: 'Expected life events can still cause stress and require support.' },
  { id: 't-unexpected-life-event', unitId: '1', topicId: '1.4', term: 'Unexpected life event', definition: 'Unpredictable events (bereavement, accident, redundancy)', inContext: 'Unexpected life events often require stronger support networks.' },
  { id: 't-support-network', unitId: '1', topicId: '1.4', term: 'Support network', definition: 'Formal and informal sources of help (family, friends, services)', examTip: true },
  { id: 't-statutory', unitId: '2', topicId: '2.2', term: 'Statutory provision', definition: 'Services required by law (NHS, local authority)', inContext: 'Statutory services are funded by government.', examTip: true },
  { id: 't-private', unitId: '2', topicId: '2.2', term: 'Private provision', definition: 'Services provided by private companies or self-employed practitioners', inContext: 'Private care may be paid for by the individual or insurance.' },
  { id: 't-voluntary', unitId: '2', topicId: '2.2', term: 'Voluntary provision', definition: 'Services provided by charities and non-profit organisations', inContext: 'Voluntary organisations often rely on donations and volunteers.' },
  { id: 't-informal', unitId: '2', topicId: '2.2', term: 'Informal provision', definition: 'Care provided by family, friends and neighbours', inContext: 'Informal care is unpaid and often the first source of support.', examTip: true },
  { id: 't-self-referral', unitId: '2', topicId: '2.3', term: 'Self-referral', definition: 'When a person contacts a service themselves', inContext: 'A person might self-refer to a counselling service.' },
  { id: 't-professional-referral', unitId: '2', topicId: '2.3', term: 'Professional referral', definition: 'When a professional (e.g. GP) refers someone to another service', inContext: 'A GP may refer a patient to a specialist.' },
  { id: 't-anti-discriminatory', unitId: '2', topicId: '2.5', term: 'Anti-discriminatory practice', definition: 'Treating everyone fairly regardless of characteristics', inContext: 'Care workers must not discriminate on grounds of age, race, gender, etc.', examTip: true },
  { id: 't-confidentiality', unitId: '2', topicId: '2.5', term: 'Confidentiality', definition: 'Keeping information private unless safeguarding requires disclosure', inContext: 'Care workers must not share personal details without consent.' },
  { id: 't-direct-carer', unitId: '2', topicId: '2.4', term: 'Direct carer', definition: 'Someone who provides hands-on care (nurse, care assistant)', inContext: 'Direct carers work directly with service users.' },
  { id: 't-indirect-carer', unitId: '2', topicId: '2.4', term: 'Indirect carer', definition: 'Someone who supports care delivery (receptionist, manager)', inContext: 'Indirect carers support the running of services.' },
  { id: 't-universal-services', unitId: '2', topicId: '2.1', term: 'Universal services', definition: 'Services available to everyone (e.g. NHS GP)', inContext: 'Universal services meet general population needs.' },
  { id: 't-targeted-services', unitId: '2', topicId: '2.1', term: 'Targeted services', definition: 'Services for specific groups (e.g. learning disability support)', inContext: 'Targeted services meet the needs of particular client groups.' },
  { id: 't-multi-agency', unitId: '2', topicId: '2.2', term: 'Multi-agency working', definition: 'Different organisations working together to meet needs', inContext: 'Multi-agency teams might include health, social care and education.', examTip: true },
  { id: 't-hierarchy-needs', unitId: '2', topicId: '2.1', term: 'Hierarchy of needs', definition: 'Maslow\'s model: physical → safety → love → esteem → self-actualisation', inContext: 'Basic needs must be met before higher needs.', examTip: true },
  { id: 't-holistic', unitId: '3', topicId: '3.1', term: 'Holistic health', definition: 'Viewing health as physical, mental and social wellbeing together', inContext: 'A holistic approach considers the whole person.' },
  { id: 't-bmi', unitId: '3', topicId: '3.3', term: 'BMI', definition: 'Body Mass Index – a measure of body composition', inContext: 'BMI is used as an indicator of physical health.' },
];

// ============================================================================
// QUICK CHECKS
// ============================================================================

export const HEALTH_QUICK_CHECKS: HealthQuickCheck[] = [
  { id: 'q-1.1-1', unitId: '1', topicId: '1.1', type: 'multipleChoice', question: 'What does PIES stand for?', options: ['Physical, Intellectual, Emotional, Social', 'Personal, Industrial, Environmental, Social', 'Primary, Individual, Emotional, Secondary'], correctAnswer: 'Physical, Intellectual, Emotional, Social', feedback: { correct: 'Correct. PIES covers all four areas of development.', incorrect: 'PIES = Physical, Intellectual, Emotional, Social.' } },
  { id: 'q-1.1-2', unitId: '1', topicId: '1.1', type: 'multipleChoice', question: 'Which life stage covers ages 9–18?', options: ['Early childhood', 'Adolescence', 'Early adulthood'], correctAnswer: 'Adolescence', feedback: { correct: 'Correct. Adolescence is 9–18 years.', incorrect: 'Adolescence covers 9–18 years.' } },
  { id: 'q-1.1-3', unitId: '1', topicId: '1.1', type: 'trueFalse', question: 'Self-concept is fixed and does not change across life stages.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. Self-concept develops and can change.', incorrect: 'Self-concept develops and changes with experiences.' } },
  { id: 'q-1.2-1', unitId: '1', topicId: '1.2', type: 'multipleChoice', question: 'Which is a physical factor affecting development?', options: ['Family', 'Genetic inheritance', 'Poverty'], correctAnswer: 'Genetic inheritance', feedback: { correct: 'Correct. Genetics is a physical factor.', incorrect: 'Genetic inheritance, illness, diet, exercise are physical factors.' } },
  { id: 'q-1.4-1', unitId: '1', topicId: '1.4', type: 'shortAnswer', question: 'What do we call care provided by family and friends?', correctAnswer: 'Informal provision', feedback: { correct: 'Correct.', incorrect: 'Informal provision is care from family, friends, neighbours.' } },
  { id: 'q-2.2-1', unitId: '2', topicId: '2.2', type: 'multipleChoice', question: 'Which type of provision is required by law?', options: ['Private', 'Statutory', 'Voluntary'], correctAnswer: 'Statutory', feedback: { correct: 'Correct. Statutory services are required by law.', incorrect: 'Statutory provision (NHS, local authority) is required by law.' } },
  { id: 'q-2.3-1', unitId: '2', topicId: '2.3', type: 'multipleChoice', question: 'A lack of lifts in a building is what type of barrier?', options: ['Psychological', 'Physical', 'Financial'], correctAnswer: 'Physical', feedback: { correct: 'Correct. Physical barriers include stairs and lack of lifts.', incorrect: 'Physical barriers include stairs, lack of lifts, lack of adaptations.' } },
  { id: 'q-2.5-1', unitId: '2', topicId: '2.5', type: 'multipleChoice', question: 'Which care value means treating everyone fairly?', options: ['Confidentiality', 'Anti-discriminatory practice', 'Dignity'], correctAnswer: 'Anti-discriminatory practice', feedback: { correct: 'Correct.', incorrect: 'Anti-discriminatory practice means treating everyone fairly.' } },
  { id: 'q-2.1-1', unitId: '2', topicId: '2.1', type: 'shortAnswer', question: 'What do we call services available to everyone in the population?', correctAnswer: 'Universal services', feedback: { correct: 'Correct.', incorrect: 'Universal services are available to everyone (e.g. NHS GP).' } },
  { id: 'q-3.1-1', unitId: '3', topicId: '3.1', type: 'trueFalse', question: 'Health is only the absence of disease.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. Health includes physical, mental and social wellbeing.', incorrect: 'Health is physical, mental and social wellbeing – not just absence of disease.' } },
];

// ============================================================================
// CASE STUDIES
// ============================================================================

export const HEALTH_CASE_STUDIES: HealthCaseStudy[] = [
  {
    id: 'cs-1-1',
    unitId: '1',
    title: 'Maya – adolescence and self-concept',
    scenario: 'Maya is 15 and has recently moved to a new school. She finds it hard to make friends and spends a lot of time on social media comparing herself to others. Her parents have noticed she seems withdrawn and has lost interest in activities she used to enjoy.',
    clientGroup: 'Adolescent',
    setting: 'Family and school',
    questions: [
      { id: 'cs-1-1-q1', question: 'Describe two factors that might be affecting Maya\'s self-concept.', marks: 4, type: 'describe', markScheme: [{ idea: 'Social media comparison', marks: 2 }, { idea: 'Move to new school / lack of friendships', marks: 2 }], modelAnswer: 'Social media might be affecting Maya\'s self-concept as she compares herself to others online. Moving to a new school and struggling to make friends could also affect how she sees herself, as peer relationships are important in adolescence.' },
      { id: 'cs-1-1-q2', question: 'Explain why friendships are important for development in adolescence.', marks: 4, type: 'explain', markScheme: [{ idea: 'Social development', marks: 2 }, { idea: 'Emotional support / identity', marks: 2 }], modelAnswer: 'Friendships help adolescents develop socially by learning to relate to peers. They also provide emotional support and help in forming identity, which is a key task of this life stage.' },
    ],
  },
  {
    id: 'cs-2-1',
    unitId: '2',
    title: 'Mr Patel – accessing care',
    scenario: 'Mr Patel is 72 and has mobility difficulties. He lives in a rural area with poor bus links. His GP has referred him to a physiotherapy service, but the nearest clinic is 15 miles away. Mr Patel does not drive and his family work full-time. He is also worried about the cost of taxis.',
    clientGroup: 'Later adulthood',
    setting: 'Health and social care',
    questions: [
      { id: 'cs-2-1-q1', question: 'Identify two barriers Mr Patel might face when accessing the physiotherapy service.', marks: 4, type: 'describe', markScheme: [{ idea: 'Geographical barrier', marks: 2 }, { idea: 'Financial barrier', marks: 2 }], modelAnswer: 'Geographical barrier: the clinic is 15 miles away and he has poor transport links. Financial barrier: he is worried about the cost of taxis to get there.' },
      { id: 'cs-2-1-q2', question: 'Describe two ways services could help Mr Patel overcome these barriers.', marks: 4, type: 'describe', markScheme: [{ idea: 'Transport / outreach', marks: 2 }, { idea: 'Funding / support', marks: 2 }], modelAnswer: 'Services could provide transport or community-based outreach so he does not have to travel. They could also signpost to travel vouchers or funding for transport costs.' },
    ],
  },
  {
    id: 'cs-1-2',
    unitId: '1',
    title: 'Jake – life event and support',
    scenario: 'Jake, 38, has just been made redundant from his job of 12 years. He has a mortgage and two young children. He is feeling anxious and has started to avoid social situations. His wife has suggested he speak to someone.',
    clientGroup: 'Early adulthood',
    setting: 'Family and employment',
    questions: [
      { id: 'cs-1-2-q1', question: 'Explain how redundancy might affect Jake\'s emotional development.', marks: 4, type: 'explain', markScheme: [{ idea: 'Stress / anxiety', marks: 2 }, { idea: 'Self-concept / identity', marks: 2 }], modelAnswer: 'Redundancy can cause stress and anxiety, affecting emotional wellbeing. It might also affect his self-concept and identity, as work often forms a large part of adult identity.' },
      { id: 'cs-1-2-q2', question: ' Name two types of support network Jake could access.', marks: 4, type: 'describe', markScheme: [{ idea: 'Family / friends', marks: 2 }, { idea: 'Professional / statutory', marks: 2 }], modelAnswer: 'Jake could access informal support from his wife, family and friends. He could also access professional support such as Jobcentre Plus, counselling services, or redundancy support schemes.' },
    ],
  },
  {
    id: 'cs-4-1',
    unitId: '4',
    title: 'Care home – care values in practice',
    scenario: 'Mrs Evans is 85 and lives in a care home. She has dementia and sometimes forgets where she is. A new care worker has been overheard discussing Mrs Evans\'s behaviour with another staff member in the corridor where other residents can hear.',
    clientGroup: 'Later adulthood',
    setting: 'Care home',
    questions: [
      { id: 'cs-4-1-q1', question: 'Which care value has been breached? Explain your answer.', marks: 4, type: 'explain', markScheme: [{ idea: 'Confidentiality', marks: 2 }, { idea: 'Dignity', marks: 2 }], modelAnswer: 'Confidentiality has been breached – the care worker discussed Mrs Evans in a place where others could hear. Dignity may also be breached as she was talked about without respect for her privacy.' },
      { id: 'cs-4-1-q2', question: 'Describe how the care worker should have behaved instead.', marks: 4, type: 'describe', markScheme: [{ idea: 'Private discussion', marks: 2 }, { idea: 'Respect / dignity', marks: 2 }], modelAnswer: 'The care worker should have discussed the matter in private, e.g. in an office or staff room. They should have respected Mrs Evans\'s dignity and right to confidentiality.' },
    ],
  },
];

// ============================================================================
// INVESTIGATION SCAFFOLDS
// ============================================================================

export const INVESTIGATION_SCAFFOLDS: InvestigationScaffold[] = [
  {
    id: 'inv-2-1',
    unitId: '2',
    title: 'Investigate the needs of one service user',
    aim: 'To investigate the physical, intellectual, emotional and social needs of a service user and how these are met by providers.',
    scenario: 'Choose a service user (e.g. a child in early years, an older person, or someone with specific needs). Plan how you would gather information about their needs and how services meet them.',
    steps: [
      { prompt: 'Describe the service user and setting.', hint: 'Who are they? What life stage? What setting (health, early years, care home, etc.)?' },
      { prompt: 'What physical, intellectual, emotional and social needs might they have?', hint: 'Use PIES and the hierarchy of needs.' },
      { prompt: 'What services or professionals might meet these needs?', hint: 'Consider statutory, private, voluntary and informal provision.' },
      { prompt: 'What barriers might they face in accessing services?', hint: 'Physical, financial, geographical, psychological, etc.' },
      { prompt: 'How do care values apply in this case?', hint: 'Dignity, confidentiality, anti-discriminatory practice.' },
    ],
    modelConclusion: 'The service user has a range of PIES needs. These are met by [service types]. Barriers such as [barriers] may affect access. Care workers should uphold care values including dignity and confidentiality. Multi-agency working helps coordinate support.',
  },
  {
    id: 'inv-3-1',
    unitId: '3',
    title: 'Plan a health improvement activity',
    aim: 'To plan and evaluate a health improvement activity for an individual or small group.',
    scenario: 'Plan a health promotion activity – e.g. promoting healthy eating, physical activity, or mental wellbeing for a specific group (e.g. teenagers, older adults).',
    steps: [
      { prompt: 'Who is your target group and what health need will you address?', hint: 'Be specific about age, setting, and the health issue.' },
      { prompt: 'What method will you use? (campaign, education session, one-to-one, etc.)', hint: 'Consider what would work best for your group.' },
      { prompt: 'What resources or support would you need?', hint: 'Materials, venue, funding, partnership with others.' },
      { prompt: 'How would you evaluate whether the activity was successful?', hint: 'Feedback, behaviour change, measurable outcomes.' },
    ],
    modelConclusion: 'The activity targets [group] to address [need]. The method chosen is [method] because [reason]. Success would be measured by [evaluation]. Partnerships with [services] could support delivery.',
  },
];

// ============================================================================
// CARE VALUE SCENARIOS
// ============================================================================

export const CARE_VALUE_SCENARIOS: CareValueScenario[] = [
  { id: 'cv-1', scenario: 'A care worker greets a service user by their first name without asking. The service user prefers to be called Mr Smith.', careValues: ['Dignity', 'Acknowledging identity'], correctAnswer: 'Dignity', modelAnswer: 'The care worker should ask how the person wishes to be addressed. Using first name without permission can undermine dignity and ignore individual identity.', breach: 'Not acknowledging individual identity and preferences' },
  { id: 'cv-2', scenario: 'A nurse discusses a patient\'s condition with a colleague in the hospital corridor.', careValues: ['Confidentiality'], correctAnswer: 'Confidentiality', modelAnswer: 'Patient information should only be shared in private. Discussing in a corridor breaches confidentiality as others may overhear.', breach: 'Breach of confidentiality' },
  { id: 'cv-3', scenario: 'A care worker avoids making a referral for a service user because they assume the person would not want to use a service for "people like them".', careValues: ['Anti-discriminatory practice'], correctAnswer: 'Anti-discriminatory practice', modelAnswer: 'The care worker is making assumptions based on stereotype. They should offer the service and let the person decide. This is discriminatory.', breach: 'Discriminatory assumption' },
  { id: 'cv-4', scenario: 'A support worker prevents a service user from making their own cup of tea "for their safety", even though they are capable.', careValues: ['Independence', 'Dignity'], correctAnswer: 'Independence', modelAnswer: 'Promoting independence means supporting people to do what they can. Over-protecting can reduce independence and dignity.', breach: 'Unnecessarily restricting independence' },
  { id: 'cv-5', scenario: 'A care worker speaks over a service user who has a speech impairment instead of giving them time to communicate.', careValues: ['Effective communication', 'Dignity'], correctAnswer: 'Effective communication', modelAnswer: 'Care workers must promote effective communication by giving people time and using appropriate methods. Speaking over someone excludes them.', breach: 'Poor communication' },
];

// ============================================================================
// QUESTION LAB
// ============================================================================

export const QUESTION_LAB_ITEMS: QuestionLabItem[] = [
  { id: 'ql-1-1', unitId: '1', topicId: '1.1', type: 'describe', question: 'Describe two characteristics of physical development in infancy (0–2 years).', modelAnswer: 'In infancy, gross motor skills develop – babies learn to sit, crawl and walk. Fine motor skills also develop – they learn to grasp objects and feed themselves.', markScheme: [{ idea: 'Gross motor skills', marks: 2 }, { idea: 'Fine motor skills', marks: 2 }] },
  { id: 'ql-1-2', unitId: '1', topicId: '1.2', type: 'explain', question: 'Explain why economic factors might affect a child\'s development.', modelAnswer: 'Economic factors such as poverty can affect development because they influence housing quality, diet, access to activities and stress levels. Poor housing or insufficient nutrition can impact physical and intellectual development. Stress from financial hardship can affect emotional development.', markScheme: [{ idea: 'Link to housing/diet/activities', marks: 2 }, { idea: 'Impact on development', marks: 2 }] },
  { id: 'ql-1-3', unitId: '1', topicId: '1.4', type: 'analyse', question: 'Analyse how the death of a partner might affect an individual\'s development.', modelAnswer: 'The death of a partner is an unexpected life event that can affect all areas of development. Emotionally, it may cause grief, anxiety and depression. Socially, the person may withdraw or rely more on family and friends. Support networks – family, friends, bereavement counselling – are essential to help manage the change and support development through the loss.', markScheme: [{ idea: 'Emotional impact', marks: 2 }, { idea: 'Social impact', marks: 2 }, { idea: 'Support', marks: 2 }] },
  { id: 'ql-2-1', unitId: '2', topicId: '2.3', type: 'explain', question: 'Explain why a service user might face a psychological barrier when accessing care.', modelAnswer: 'Psychological barriers include fear of stigma (e.g. mental health services), fear of loss of independence (e.g. admitting need for care), or anxiety about the service. A person might avoid accessing care because they feel embarrassed or worry about being judged.', markScheme: [{ idea: 'Stigma/fear/anxiety', marks: 2 }, { idea: 'Example', marks: 2 }] },
  { id: 'ql-2-2', unitId: '2', topicId: '2.5', type: 'evaluate', question: 'Evaluate the importance of confidentiality in care practice.', modelAnswer: 'Confidentiality is important because it builds trust between the care worker and service user. Service users need to feel safe sharing personal information. Without confidentiality, people may not seek help or may withhold important information. However, confidentiality can be overridden when safeguarding requires disclosure to protect someone from harm.', markScheme: [{ idea: 'Trust/safety', marks: 2 }, { idea: 'Consequences of breach', marks: 2 }, { idea: 'Safeguarding exception', marks: 2 }] },
  { id: 'ql-4-1', unitId: '4', topicId: '4.2', type: 'describe', question: 'Describe two ways a care worker can promote dignity when supporting personal care.', modelAnswer: 'A care worker can promote dignity by ensuring privacy – closing doors, using screens, and not exposing the person unnecessarily. They can also involve the person in decisions – asking how they would like things done and respecting their preferences. Using respectful language and not rushing also promotes dignity.', markScheme: [{ idea: 'Privacy', marks: 2 }, { idea: 'Involvement/respect', marks: 2 }] },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getUnitsByAward(award: HealthAward): HealthUnit[] {
  if (award === 'single') return HEALTH_UNITS.filter((u) => u.singleAward);
  return HEALTH_UNITS;
}

export function getUnitById(unitId: string): HealthUnit | undefined {
  return HEALTH_UNITS.find((u) => u.id === unitId);
}

export function getConceptsByUnit(unitId: HealthUnitId): HealthConcept[] {
  return HEALTH_CONCEPTS.filter((c) => c.unitId === unitId);
}

export function getTermsByUnit(unitId: HealthUnitId): HealthTerm[] {
  return HEALTH_TERMS.filter((t) => t.unitId === unitId);
}

export function getQuickChecksByUnit(unitId: HealthUnitId): HealthQuickCheck[] {
  return HEALTH_QUICK_CHECKS.filter((q) => q.unitId === unitId);
}

export function getCaseStudiesByUnit(unitId: HealthUnitId): HealthCaseStudy[] {
  return HEALTH_CASE_STUDIES.filter((c) => c.unitId === unitId);
}

export function getInvestigationsByUnit(unitId: HealthUnitId): InvestigationScaffold[] {
  return INVESTIGATION_SCAFFOLDS.filter((i) => i.unitId === unitId);
}

export function getQuestionLabByUnit(unitId: HealthUnitId): QuestionLabItem[] {
  return QUESTION_LAB_ITEMS.filter((q) => q.unitId === unitId);
}

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
  // Unit 2 – expanded
  { id: 'c-2.4-workers', unitId: '2', topicId: '2.4', title: 'Roles of care workers', coreIdea: 'Direct carers (nurses, care assistants) provide hands-on care. Indirect carers (receptionists, managers) support service delivery. All roles require training and adherence to care values.', commonMisconception: 'Thinking only nurses provide care – many roles support service users.', applyScenario: 'How might a receptionist support a service user indirectly?' },
  // Unit 3 – expanded
  { id: 'c-3.2-factors', unitId: '3', topicId: '3.2', title: 'Factors affecting health and wellbeing', coreIdea: 'Lifestyle (diet, exercise, smoking, alcohol), environment (housing, pollution), genetics, access to services, and social factors (relationships, employment) all affect health.', commonMisconception: 'Thinking health is only about genes – lifestyle and environment matter greatly.', applyScenario: 'How might poor housing affect health?' },
  { id: 'c-3.3-indicators', unitId: '3', topicId: '3.3', title: 'Indicators of physical health', coreIdea: 'BMI, blood pressure, heart rate, recovery rate. Physical health indicators help monitor and support wellbeing.', commonMisconception: 'BMI alone is sufficient – other indicators give a fuller picture.', applyScenario: 'Why might a care worker use both BMI and blood pressure?' },
  // Unit 4 – expanded
  { id: 'c-4.1-care-needs', unitId: '4', topicId: '4.1', title: 'Care needs of major client groups', coreIdea: 'Infants, children, adolescents, adults, older people, and people with disabilities or illness have different PIES needs. Services must be tailored to each group.', commonMisconception: 'Assuming all client groups need the same care – needs vary.', applyScenario: 'How do the care needs of an infant differ from those of an older person?' },
  { id: 'c-4.2-care-values-practice', unitId: '4', topicId: '4.2', title: 'Care values in practitioner work', coreIdea: 'Care workers apply dignity, respect, confidentiality, anti-discriminatory practice and effective communication in every interaction. Values guide daily practice.', commonMisconception: 'Thinking care values only apply in formal settings – they apply everywhere.', applyScenario: 'How would you demonstrate respect when supporting someone with eating?' },
  { id: 'c-4.3-self-concept-practice', unitId: '4', topicId: '4.3', title: 'Self-concept and personal relationships in care', coreIdea: 'Care workers must understand how self-concept and relationships affect service users. Supporting positive self-concept and relationships improves outcomes.', commonMisconception: 'Assuming self-concept is fixed – care can support positive change.', applyScenario: 'How might a care worker support a service user\'s self-esteem?' },
  { id: 'c-4.4-health-improvement', unitId: '4', topicId: '4.4', title: 'Promoting health improvement in practice', coreIdea: 'Care workers promote health through advice, signposting, and supporting behaviour change. Must be person-centred and tailored to the individual.', commonMisconception: 'Thinking health promotion is one-off – it is ongoing support.', applyScenario: 'How might a care worker support someone to quit smoking?' },
  // Unit 1 – additional
  { id: 'c-1.2-genetics', unitId: '1', topicId: '1.2', title: 'Genetic and environmental factors', coreIdea: 'Genetics influence potential; environment shapes how it is realised. Both interact – e.g. a genetic predisposition to illness may be triggered by poor diet.', commonMisconception: 'Nature vs nurture is either/or – both interact.', applyScenario: 'How might genetics and environment interact in obesity?' },
  { id: 'c-1.3-blended', unitId: '1', topicId: '1.3', title: 'Blended families and stepfamilies', coreIdea: 'Blended families combine two families. Can bring new relationships and support; can also challenge children with new roles and boundaries.', commonMisconception: 'Assuming blended families are always difficult – they can be positive.', applyScenario: 'What challenges might a child face in a blended family?' },
  { id: 'c-2.2-partnership', unitId: '2', topicId: '2.2', title: 'Partnership working', coreIdea: 'Services work together (multi-agency) to meet complex needs. Examples: Sure Start, virtual wards, care coordination. Shared goals and communication are key.', commonMisconception: 'Thinking each service works alone – partnership is essential.', applyScenario: 'Why might a child with a disability need multi-agency support?' },
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
  // Additional terms for 80+ target
  { id: 't-attachment', unitId: '1', topicId: '1.1', term: 'Attachment', definition: 'Emotional bond between infant and primary carer', inContext: 'Secure attachment supports later development.' },
  { id: 't-object-permanence', unitId: '1', topicId: '1.1', term: 'Object permanence', definition: 'Understanding that objects exist when out of sight', inContext: 'Develops in infancy.' },
  { id: 't-egocentrism', unitId: '1', topicId: '1.1', term: 'Egocentrism', definition: 'Seeing things only from your own perspective', inContext: 'Common in early childhood.' },
  { id: 't-bereavement', unitId: '1', topicId: '1.4', term: 'Bereavement', definition: 'Experience of losing someone through death', inContext: 'An unexpected life event requiring support.' },
  { id: 't-safeguarding', unitId: '2', topicId: '2.5', term: 'Safeguarding', definition: 'Protecting people from harm, abuse and neglect', inContext: 'Can override confidentiality when risk exists.' },
  { id: 't-dignity', unitId: '2', topicId: '2.5', term: 'Dignity', definition: 'Treating people with respect and valuing their worth', inContext: 'A core care value.' },
  { id: 't-advocacy', unitId: '2', topicId: '2.5', term: 'Advocacy', definition: 'Speaking up for someone who cannot speak for themselves', inContext: 'Supports rights and choice.' },
  { id: 't-empowerment', unitId: '2', topicId: '2.5', term: 'Empowerment', definition: 'Supporting people to make their own decisions', inContext: 'Promotes independence.' },
  { id: 't-stigma', unitId: '2', topicId: '2.3', term: 'Stigma', definition: 'Negative attitudes or discrimination towards a group', inContext: 'A psychological barrier to accessing care.' },
  { id: 't-means-testing', unitId: '2', topicId: '2.3', term: 'Means testing', definition: 'Assessing income/wealth to determine eligibility for support', inContext: 'Can be a financial barrier.' },
  { id: 't-wellbeing', unitId: '3', topicId: '3.1', term: 'Wellbeing', definition: 'State of being comfortable, healthy and happy', inContext: 'Includes physical, mental and social aspects.' },
  { id: 't-medical-model', unitId: '3', topicId: '3.1', term: 'Medical model', definition: 'View of health as absence of disease', inContext: 'Contrast with social/holistic model.' },
  { id: 't-social-model', unitId: '3', topicId: '3.1', term: 'Social model', definition: 'View of health as influenced by society and environment', inContext: 'Focuses on barriers and support.' },
  { id: 't-blood-pressure', unitId: '3', topicId: '3.3', term: 'Blood pressure', definition: 'Force of blood against artery walls', inContext: 'Indicator of cardiovascular health.' },
  { id: 't-health-promotion', unitId: '3', topicId: '3.4', term: 'Health promotion', definition: 'Activities to improve health and prevent illness', inContext: 'Education, campaigns, lifestyle support.' },
  { id: 't-person-centred', unitId: '4', topicId: '4.2', term: 'Person-centred care', definition: 'Care that focuses on the individual\'s needs and preferences', inContext: 'Puts the person at the centre of decisions.' },
  { id: 't-consent', unitId: '4', topicId: '4.2', term: 'Consent', definition: 'Agreement to treatment or care', inContext: 'Must be informed and voluntary.' },
  { id: 't-communication', unitId: '4', topicId: '4.2', term: 'Effective communication', definition: 'Clear exchange of information that meets the person\'s needs', inContext: 'Includes verbal, non-verbal and written.' },
  { id: 't-client-group', unitId: '2', topicId: '2.1', term: 'Client group', definition: 'Category of people with similar needs', inContext: 'E.g. older people, children, people with disabilities.' },
  { id: 't-outreach', unitId: '2', topicId: '2.3', term: 'Outreach', definition: 'Services that go to people rather than people coming to them', inContext: 'Reduces geographical barriers.' },
  // More terms toward 80+
  { id: 't-primary-carer', unitId: '1', topicId: '1.1', term: 'Primary carer', definition: 'Main person who looks after a child', inContext: 'Usually a parent; forms attachment bond.' },
  { id: 't-milestone', unitId: '1', topicId: '1.1', term: 'Developmental milestone', definition: 'Typical achievement at a certain age', inContext: 'E.g. walking by 18 months.' },
  { id: 't-nature-nurture', unitId: '1', topicId: '1.2', term: 'Nature and nurture', definition: 'Genetics (nature) vs environment (nurture)', inContext: 'Both influence development.' },
  { id: 't-peer-pressure', unitId: '1', topicId: '1.3', term: 'Peer pressure', definition: 'Influence from friends or peers', inContext: 'Strong in adolescence.' },
  { id: 't-blended-family', unitId: '1', topicId: '1.3', term: 'Blended family', definition: 'Family formed when two families combine', inContext: 'Step-parents, step-siblings.' },
  { id: 't-redundancy', unitId: '1', topicId: '1.4', term: 'Redundancy', definition: 'Losing a job because the role no longer exists', inContext: 'An unexpected life event.' },
  { id: 't-postcode-lottery', unitId: '2', topicId: '2.3', term: 'Postcode lottery', definition: 'Variation in services depending on where you live', inContext: 'A resource barrier.' },
  { id: 't-referral', unitId: '2', topicId: '2.3', term: 'Referral', definition: 'Process of directing someone to another service', inContext: 'Can be self-referral or professional referral.' },
  { id: 't-care-plan', unitId: '2', topicId: '2.5', term: 'Care plan', definition: 'Document outlining a person\'s needs and how they will be met', inContext: 'Person-centred and reviewed regularly.' },
  { id: 't-risk-assessment', unitId: '2', topicId: '2.5', term: 'Risk assessment', definition: 'Identifying and managing potential harm', inContext: 'Supports health and safety.' },
  { id: 't-holistic-care', unitId: '3', topicId: '3.1', term: 'Holistic care', definition: 'Care that considers the whole person', inContext: 'Physical, mental, social and spiritual.' },
  { id: 't-lifestyle', unitId: '3', topicId: '3.2', term: 'Lifestyle factors', definition: 'Choices affecting health (diet, exercise, smoking)', inContext: 'Modifiable risk factors.' },
  { id: 't-recovery-rate', unitId: '3', topicId: '3.3', term: 'Recovery rate', definition: 'How quickly heart rate returns to normal after exercise', inContext: 'Indicator of fitness.' },
  { id: 't-heart-rate', unitId: '3', topicId: '3.3', term: 'Heart rate', definition: 'Number of heartbeats per minute', inContext: 'Indicator of cardiovascular health.' },
  { id: 't-behaviour-change', unitId: '3', topicId: '3.4', term: 'Behaviour change', definition: 'Supporting people to adopt healthier habits', inContext: 'Key aim of health promotion.' },
  { id: 't-signposting', unitId: '4', topicId: '4.2', term: 'Signposting', definition: 'Directing someone to another service or resource', inContext: 'Part of effective care.' },
  { id: 't-active-listening', unitId: '4', topicId: '4.2', term: 'Active listening', definition: 'Fully focusing on what someone is saying', inContext: 'Shows respect and improves communication.' },
  { id: 't-self-actualisation', unitId: '2', topicId: '2.1', term: 'Self-actualisation', definition: 'Reaching your full potential', inContext: 'Top of Maslow\'s hierarchy.' },
  { id: 't-virtual-ward', unitId: '2', topicId: '2.2', term: 'Virtual ward', definition: 'Care at home with remote monitoring', inContext: 'Example of partnership working.' },
  { id: 't-sure-start', unitId: '2', topicId: '2.2', term: 'Sure Start', definition: 'Government programme for early years support', inContext: 'Multi-agency family support.' },
  { id: 't-adaptation', unitId: '2', topicId: '2.3', term: 'Adaptation', definition: 'Changes to buildings or equipment for accessibility', inContext: 'Reduces physical barriers.' },
  { id: 't-first-language', unitId: '2', topicId: '2.3', term: 'First language', definition: 'Person\'s main or native language', inContext: 'Language barriers affect access if not supported.' },
  { id: 't-resource-barrier', unitId: '2', topicId: '2.3', term: 'Resource barrier', definition: 'Shortage of staff, funding or services', inContext: 'Can limit access to care.' },
  { id: 't-cultural-barrier', unitId: '2', topicId: '2.3', term: 'Cultural barrier', definition: 'Beliefs or practices that affect access to care', inContext: 'Services must be culturally sensitive.' },
  { id: 't-informal-support', unitId: '1', topicId: '1.4', term: 'Informal support', definition: 'Help from family, friends, neighbours', inContext: 'Unpaid; often first source of help.' },
  { id: 't-formal-support', unitId: '1', topicId: '1.4', term: 'Formal support', definition: 'Help from trained professionals and services', inContext: 'Statutory, private or voluntary.' },
  { id: 't-bereavement-counselling', unitId: '1', topicId: '1.4', term: 'Bereavement counselling', definition: 'Professional support after a loss', inContext: 'Helps with grief and adjustment.' },
  { id: 't-inclusive-practice', unitId: '2', topicId: '2.5', term: 'Inclusive practice', definition: 'Ensuring everyone can access and benefit from services', inContext: 'Anti-discriminatory and person-centred.' },
  { id: 't-informed-consent', unitId: '4', topicId: '4.2', term: 'Informed consent', definition: 'Agreement based on understanding of risks and benefits', inContext: 'Must be given voluntarily.' },
  { id: 't-personal-care', unitId: '4', topicId: '4.2', term: 'Personal care', definition: 'Support with washing, dressing, toileting', inContext: 'Requires dignity and privacy.' },
  { id: 't-mental-wellbeing', unitId: '3', topicId: '3.1', term: 'Mental wellbeing', definition: 'Emotional and psychological health', inContext: 'Part of holistic health.' },
  { id: 't-social-wellbeing', unitId: '3', topicId: '3.1', term: 'Social wellbeing', definition: 'Quality of relationships and social connections', inContext: 'Part of holistic health.' },
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
  // Unit 1 – more quick checks
  { id: 'q-1.1-4', unitId: '1', topicId: '1.1', type: 'multipleChoice', question: 'What are gross motor skills?', options: ['Large body movements (running, jumping)', 'Small precise movements (writing)', 'Emotional regulation'], correctAnswer: 'Large body movements (running, jumping)', feedback: { correct: 'Correct.', incorrect: 'Gross motor = large movements; fine motor = small movements.' } },
  { id: 'q-1.1-5', unitId: '1', topicId: '1.1', type: 'multipleChoice', question: 'Which life stage covers ages 46–65?', options: ['Early adulthood', 'Middle adulthood', 'Later adulthood'], correctAnswer: 'Middle adulthood', feedback: { correct: 'Correct.', incorrect: 'Middle adulthood is 46–65 years.' } },
  { id: 'q-1.1-6', unitId: '1', topicId: '1.1', type: 'shortAnswer', question: 'What does attachment mean in infancy?', correctAnswer: 'Emotional bond', feedback: { correct: 'Correct. Attachment is the emotional bond between infant and primary carer.', incorrect: 'Attachment is the emotional bond between infant and primary carer.' } },
  { id: 'q-1.2-2', unitId: '1', topicId: '1.2', type: 'multipleChoice', question: 'Which is an environmental factor affecting development?', options: ['Genetics', 'Housing quality', 'Self-esteem'], correctAnswer: 'Housing quality', feedback: { correct: 'Correct.', incorrect: 'Environmental factors include housing, pollution, neighbourhood.' } },
  { id: 'q-1.2-3', unitId: '1', topicId: '1.2', type: 'trueFalse', question: 'Only genetics affect development; environment has no impact.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. Both nature and nurture affect development.', incorrect: 'Both genetics and environment interact to affect development.' } },
  { id: 'q-1.3-1', unitId: '1', topicId: '1.3', type: 'multipleChoice', question: 'Which type of relationship is most important for identity in adolescence?', options: ['Family only', 'Peer friendships', 'Work colleagues'], correctAnswer: 'Peer friendships', feedback: { correct: 'Correct. Peer relationships are crucial in adolescence.', incorrect: 'Peer friendships strongly influence identity in adolescence.' } },
  { id: 'q-1.3-2', unitId: '1', topicId: '1.3', type: 'shortAnswer', question: 'What do we call a family formed when two families combine?', correctAnswer: 'Blended family', feedback: { correct: 'Correct.', incorrect: 'A blended family (or stepfamily) combines two families.' } },
  { id: 'q-1.4-2', unitId: '1', topicId: '1.4', type: 'multipleChoice', question: 'Which is an unexpected life event?', options: ['Starting school', 'Retirement', 'Bereavement'], correctAnswer: 'Bereavement', feedback: { correct: 'Correct. Bereavement is unpredictable.', incorrect: 'Unexpected events include bereavement, accident, redundancy.' } },
  { id: 'q-1.4-3', unitId: '1', topicId: '1.4', type: 'shortAnswer', question: 'Name one type of formal support for someone facing redundancy.', correctAnswer: 'Jobcentre', feedback: { correct: 'Correct. Jobcentre Plus, counselling, redundancy support.', incorrect: 'Formal support: Jobcentre Plus, counselling, redundancy schemes.' } },
  // Unit 2 – more quick checks
  { id: 'q-2.1-2', unitId: '2', topicId: '2.1', type: 'multipleChoice', question: 'What is at the top of Maslow\'s hierarchy of needs?', options: ['Safety', 'Love and belonging', 'Self-actualisation'], correctAnswer: 'Self-actualisation', feedback: { correct: 'Correct.', incorrect: 'Self-actualisation (reaching full potential) is at the top.' } },
  { id: 'q-2.1-3', unitId: '2', topicId: '2.1', type: 'shortAnswer', question: 'What do we call services for specific groups such as learning disability support?', correctAnswer: 'Targeted services', feedback: { correct: 'Correct.', incorrect: 'Targeted services are for specific client groups.' } },
  { id: 'q-2.2-2', unitId: '2', topicId: '2.2', type: 'multipleChoice', question: 'Which provider is funded by donations and volunteers?', options: ['Statutory', 'Private', 'Voluntary'], correctAnswer: 'Voluntary', feedback: { correct: 'Correct.', incorrect: 'Voluntary organisations (charities) rely on donations and volunteers.' } },
  { id: 'q-2.2-3', unitId: '2', topicId: '2.2', type: 'shortAnswer', question: 'What do we call different organisations working together to meet needs?', correctAnswer: 'Multi-agency', feedback: { correct: 'Correct.', incorrect: 'Multi-agency working involves different organisations partnering.' } },
  { id: 'q-2.3-2', unitId: '2', topicId: '2.3', type: 'multipleChoice', question: 'Fear of stigma is what type of barrier?', options: ['Physical', 'Psychological', 'Geographical'], correctAnswer: 'Psychological', feedback: { correct: 'Correct.', incorrect: 'Psychological barriers include stigma, fear, anxiety.' } },
  { id: 'q-2.3-3', unitId: '2', topicId: '2.3', type: 'multipleChoice', question: 'Means testing is associated with which barrier?', options: ['Physical', 'Financial', 'Cultural'], correctAnswer: 'Financial', feedback: { correct: 'Correct.', incorrect: 'Means testing assesses income/wealth – a financial barrier.' } },
  { id: 'q-2.4-1', unitId: '2', topicId: '2.4', type: 'multipleChoice', question: 'Who provides hands-on care directly to service users?', options: ['Receptionist', 'Direct carer', 'Manager'], correctAnswer: 'Direct carer', feedback: { correct: 'Correct.', incorrect: 'Direct carers (nurses, care assistants) provide hands-on care.' } },
  { id: 'q-2.5-2', unitId: '2', topicId: '2.5', type: 'multipleChoice', question: 'When can confidentiality be overridden?', options: ['Never', 'When safeguarding requires it', 'Whenever a colleague asks'], correctAnswer: 'When safeguarding requires it', feedback: { correct: 'Correct.', incorrect: 'Safeguarding (protecting from harm) can override confidentiality.' } },
  { id: 'q-2.5-3', unitId: '2', topicId: '2.5', type: 'shortAnswer', question: 'What care value means supporting people to make their own decisions?', correctAnswer: 'Empowerment', feedback: { correct: 'Correct.', incorrect: 'Empowerment supports people to make their own decisions.' } },
  // Unit 3 – more quick checks
  { id: 'q-3.1-2', unitId: '3', topicId: '3.1', type: 'multipleChoice', question: 'Which model views health as influenced by society and environment?', options: ['Medical model', 'Social model', 'Genetic model'], correctAnswer: 'Social model', feedback: { correct: 'Correct.', incorrect: 'The social model focuses on societal and environmental factors.' } },
  { id: 'q-3.2-1', unitId: '3', topicId: '3.2', type: 'multipleChoice', question: 'Which is a lifestyle factor affecting health?', options: ['Genetics', 'Diet', 'Age only'], correctAnswer: 'Diet', feedback: { correct: 'Correct.', incorrect: 'Lifestyle factors include diet, exercise, smoking, alcohol.' } },
  { id: 'q-3.2-2', unitId: '3', topicId: '3.2', type: 'trueFalse', question: 'Poor housing can affect physical and mental health.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Correct.', incorrect: 'Housing quality affects both physical and mental health.' } },
  { id: 'q-3.3-1', unitId: '3', topicId: '3.3', type: 'multipleChoice', question: 'What does BMI measure?', options: ['Blood pressure', 'Body composition', 'Heart rate'], correctAnswer: 'Body composition', feedback: { correct: 'Correct.', incorrect: 'BMI (Body Mass Index) is a measure of body composition.' } },
  { id: 'q-3.3-2', unitId: '3', topicId: '3.3', type: 'shortAnswer', question: 'What do we call how quickly heart rate returns to normal after exercise?', correctAnswer: 'Recovery rate', feedback: { correct: 'Correct.', incorrect: 'Recovery rate indicates fitness level.' } },
  { id: 'q-3.4-1', unitId: '3', topicId: '3.4', type: 'multipleChoice', question: 'Which is a method of health promotion?', options: ['Ignoring the issue', 'Health campaigns', 'Reducing services'], correctAnswer: 'Health campaigns', feedback: { correct: 'Correct.', incorrect: 'Health promotion includes campaigns, education, lifestyle advice.' } },
  { id: 'q-3.4-2', unitId: '3', topicId: '3.4', type: 'trueFalse', question: 'Health promotion should be the same for everyone.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. It should be tailored to the individual or group.', incorrect: 'Health promotion must be tailored to the individual or group.' } },
  // Unit 4 – quick checks
  { id: 'q-4.1-1', unitId: '4', topicId: '4.1', type: 'multipleChoice', question: 'Care needs of infants differ from older people because:', options: ['They are the same', 'Infants need growth support; older people may need mobility support', 'Only physical needs differ'], correctAnswer: 'Infants need growth support; older people may need mobility support', feedback: { correct: 'Correct.', incorrect: 'Different client groups have different PIES needs.' } },
  { id: 'q-4.2-1', unitId: '4', topicId: '4.2', type: 'multipleChoice', question: 'What does person-centred care mean?', options: ['Care decided by the care worker', 'Care focused on the individual\'s needs and preferences', 'Care that ignores preferences'], correctAnswer: 'Care focused on the individual\'s needs and preferences', feedback: { correct: 'Correct.', incorrect: 'Person-centred care puts the individual at the centre.' } },
  { id: 'q-4.2-2', unitId: '4', topicId: '4.2', type: 'shortAnswer', question: 'What must consent be for it to be valid?', correctAnswer: 'Informed', feedback: { correct: 'Correct. Informed and voluntary.', incorrect: 'Consent must be informed (understanding risks/benefits) and voluntary.' } },
  { id: 'q-4.3-1', unitId: '4', topicId: '4.3', type: 'trueFalse', question: 'Care workers should ignore a service user\'s self-concept.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. Supporting self-concept improves outcomes.', incorrect: 'Care workers should support positive self-concept.' } },
  { id: 'q-4.4-1', unitId: '4', topicId: '4.4', type: 'multipleChoice', question: 'How can a care worker support someone to quit smoking?', options: ['Ignore it', 'Advice, signposting, ongoing support', 'Tell them to stop'], correctAnswer: 'Advice, signposting, ongoing support', feedback: { correct: 'Correct.', incorrect: 'Health promotion involves advice, signposting and ongoing support.' } },
  // More Unit 1
  { id: 'q-1.1-7', unitId: '1', topicId: '1.1', type: 'trueFalse', question: 'Object permanence develops in infancy.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Correct.', incorrect: 'Object permanence (objects exist when out of sight) develops in infancy.' } },
  { id: 'q-1.1-8', unitId: '1', topicId: '1.1', type: 'shortAnswer', question: 'What does PIES stand for? (write all four)', correctAnswer: 'Physical Intellectual Emotional Social', feedback: { correct: 'Correct.', incorrect: 'PIES = Physical, Intellectual, Emotional, Social.' } },
  { id: 'q-1.2-4', unitId: '1', topicId: '1.2', type: 'multipleChoice', question: 'Poverty is which type of factor?', options: ['Physical', 'Economic', 'Genetic'], correctAnswer: 'Economic', feedback: { correct: 'Correct.', incorrect: 'Economic factors include income, poverty, employment.' } },
  { id: 'q-1.3-3', unitId: '1', topicId: '1.3', type: 'trueFalse', question: 'Working relationships do not affect development.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. All relationships affect development.', incorrect: 'Working relationships also shape development.' } },
  { id: 'q-1.4-4', unitId: '1', topicId: '1.4', type: 'shortAnswer', question: 'Name one support for someone facing bereavement.', correctAnswer: 'Bereavement counselling', feedback: { correct: 'Correct. Or family, friends, Cruse.', incorrect: 'Bereavement counselling, family, friends, Cruse.' } },
  // More Unit 2
  { id: 'q-2.1-4', unitId: '2', topicId: '2.1', type: 'trueFalse', question: 'Basic physical needs must be met before higher needs.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Correct. Maslow\'s hierarchy.', incorrect: 'Maslow: physical needs first, then safety, love, esteem, self-actualisation.' } },
  { id: 'q-2.2-4', unitId: '2', topicId: '2.2', type: 'multipleChoice', question: 'Care from family and friends is called:', options: ['Statutory', 'Informal', 'Private'], correctAnswer: 'Informal', feedback: { correct: 'Correct.', incorrect: 'Informal provision = family, friends, neighbours.' } },
  { id: 'q-2.3-4', unitId: '2', topicId: '2.3', type: 'shortAnswer', question: 'What do we call variation in services depending on where you live?', correctAnswer: 'Postcode lottery', feedback: { correct: 'Correct.', incorrect: 'Postcode lottery = resource barrier based on location.' } },
  { id: 'q-2.4-2', unitId: '2', topicId: '2.4', type: 'trueFalse', question: 'Indirect carers never have contact with service users.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. They may have some contact (e.g. receptionist).', incorrect: 'Indirect carers support delivery; they may have some contact.' } },
  { id: 'q-2.5-4', unitId: '2', topicId: '2.5', type: 'multipleChoice', question: 'Speaking up for someone who cannot speak for themselves is:', options: ['Confidentiality', 'Advocacy', 'Safeguarding'], correctAnswer: 'Advocacy', feedback: { correct: 'Correct.', incorrect: 'Advocacy = speaking up for someone.' } },
  // More Unit 3
  { id: 'q-3.1-3', unitId: '3', topicId: '3.1', type: 'shortAnswer', question: 'What three aspects does holistic health consider?', correctAnswer: 'Physical mental social', feedback: { correct: 'Correct.', incorrect: 'Holistic = physical, mental and social wellbeing.' } },
  { id: 'q-3.2-3', unitId: '3', topicId: '3.2', type: 'multipleChoice', question: 'Which can affect health?', options: ['Only genetics', 'Lifestyle, environment, genetics, access to services', 'Only diet'], correctAnswer: 'Lifestyle, environment, genetics, access to services', feedback: { correct: 'Correct.', incorrect: 'Many factors affect health.' } },
  { id: 'q-3.3-3', unitId: '3', topicId: '3.3', type: 'multipleChoice', question: 'Blood pressure indicates:', options: ['Fitness only', 'Cardiovascular health', 'Intelligence'], correctAnswer: 'Cardiovascular health', feedback: { correct: 'Correct.', incorrect: 'Blood pressure is an indicator of cardiovascular health.' } },
  { id: 'q-3.4-3', unitId: '3', topicId: '3.4', type: 'shortAnswer', question: 'What do we call activities to improve health and prevent illness?', correctAnswer: 'Health promotion', feedback: { correct: 'Correct.', incorrect: 'Health promotion includes education, campaigns, lifestyle support.' } },
  // More Unit 4
  { id: 'q-4.1-2', unitId: '4', topicId: '4.1', type: 'trueFalse', question: 'All client groups need the same type of care.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. Needs vary by group.', incorrect: 'Care needs vary by client group and individual.' } },
  { id: 'q-4.2-3', unitId: '4', topicId: '4.2', type: 'shortAnswer', question: 'What communication skill involves fully focusing on what someone is saying?', correctAnswer: 'Active listening', feedback: { correct: 'Correct.', incorrect: 'Active listening shows respect and improves communication.' } },
  // Additional batches
  { id: 'q-1.1-9', unitId: '1', topicId: '1.1', type: 'multipleChoice', question: 'Egocentrism is common in:', options: ['Later adulthood', 'Early childhood', 'Infancy only'], correctAnswer: 'Early childhood', feedback: { correct: 'Correct.', incorrect: 'Egocentrism (seeing only your perspective) is common in early childhood.' } },
  { id: 'q-1.2-5', unitId: '1', topicId: '1.2', type: 'shortAnswer', question: 'What two factors interact to affect development? (one word each)', correctAnswer: 'Nature nurture', feedback: { correct: 'Correct.', incorrect: 'Nature (genetics) and nurture (environment) interact.' } },
  { id: 'q-1.3-4', unitId: '1', topicId: '1.3', type: 'multipleChoice', question: 'Which relationship type can bring both challenges and opportunities for a child?', options: ['Only friendships', 'Blended family', 'Work only'], correctAnswer: 'Blended family', feedback: { correct: 'Correct.', incorrect: 'Blended families can bring new support and also challenges.' } },
  { id: 'q-1.4-5', unitId: '1', topicId: '1.4', type: 'multipleChoice', question: 'Expected life events include:', options: ['Bereavement', 'Starting school', 'Accident'], correctAnswer: 'Starting school', feedback: { correct: 'Correct.', incorrect: 'Expected = predictable (school, marriage, retirement).' } },
  { id: 'q-2.1-5', unitId: '2', topicId: '2.1', type: 'shortAnswer', question: 'What do we call a category of people with similar needs?', correctAnswer: 'Client group', feedback: { correct: 'Correct.', incorrect: 'Client group = e.g. older people, children, people with disabilities.' } },
  { id: 'q-2.2-5', unitId: '2', topicId: '2.2', type: 'trueFalse', question: 'Only the NHS provides care.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. Statutory, private, voluntary and informal all provide care.', incorrect: 'Care comes from statutory, private, voluntary and informal providers.' } },
  { id: 'q-2.3-5', unitId: '2', topicId: '2.3', type: 'multipleChoice', question: 'Outreach services help overcome which barrier?', options: ['Psychological', 'Geographical', 'Financial only'], correctAnswer: 'Geographical', feedback: { correct: 'Correct.', incorrect: 'Outreach = services go to people; reduces geographical barrier.' } },
  { id: 'q-2.5-5', unitId: '2', topicId: '2.5', type: 'shortAnswer', question: 'What care value means treating people with respect and valuing their worth?', correctAnswer: 'Dignity', feedback: { correct: 'Correct.', incorrect: 'Dignity = respect and valuing worth.' } },
  { id: 'q-3.1-4', unitId: '3', topicId: '3.1', type: 'multipleChoice', question: 'Wellbeing includes:', options: ['Only physical health', 'Physical, mental and social aspects', 'Only mental health'], correctAnswer: 'Physical, mental and social aspects', feedback: { correct: 'Correct.', incorrect: 'Wellbeing = physical, mental and social.' } },
  { id: 'q-3.2-4', unitId: '3', topicId: '3.2', type: 'shortAnswer', question: 'What type of factors can be modified by lifestyle choices?', correctAnswer: 'Lifestyle', feedback: { correct: 'Correct. Lifestyle factors are modifiable.', incorrect: 'Lifestyle factors (diet, exercise, smoking) are modifiable.' } },
  { id: 'q-3.2-5', unitId: '3', topicId: '3.2', type: 'trueFalse', question: 'Relationships and employment can affect health.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Correct.', incorrect: 'Social factors including relationships and employment affect health.' } },
  { id: 'q-3.3-4', unitId: '3', topicId: '3.3', type: 'multipleChoice', question: 'What should care workers use alongside BMI?', options: ['Only BMI', 'Other indicators (e.g. blood pressure)', 'Nothing else'], correctAnswer: 'Other indicators (e.g. blood pressure)', feedback: { correct: 'Correct.', incorrect: 'BMI alone is not sufficient; use other indicators too.' } },
  { id: 'q-3.4-4', unitId: '3', topicId: '3.4', type: 'multipleChoice', question: 'Health promotion for teenagers should be:', options: ['Identical to adults', 'Tailored to the group', 'Ignored'], correctAnswer: 'Tailored to the group', feedback: { correct: 'Correct.', incorrect: 'Health promotion must be tailored to the target group.' } },
  { id: 'q-4.2-4', unitId: '4', topicId: '4.2', type: 'multipleChoice', question: 'Directing someone to another service is called:', options: ['Confidentiality', 'Signposting', 'Safeguarding'], correctAnswer: 'Signposting', feedback: { correct: 'Correct.', incorrect: 'Signposting = directing to another service or resource.' } },
  { id: 'q-4.3-2', unitId: '4', topicId: '4.3', type: 'shortAnswer', question: 'What can care workers support to improve outcomes?', correctAnswer: 'Self-esteem', feedback: { correct: 'Correct. Or self-concept.', incorrect: 'Supporting positive self-concept and self-esteem improves outcomes.' } },
  { id: 'q-4.4-2', unitId: '4', topicId: '4.4', type: 'trueFalse', question: 'Health promotion is a one-off activity.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Correct. It is ongoing support.', incorrect: 'Health promotion is ongoing support, not one-off.' } },
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
      { id: 'cs-1-2-q2', question: 'Name two types of support network Jake could access.', marks: 4, type: 'describe', markScheme: [{ idea: 'Family / friends', marks: 2 }, { idea: 'Professional / statutory', marks: 2 }], modelAnswer: 'Jake could access informal support from his wife, family and friends. He could also access professional support such as Jobcentre Plus, counselling services, or redundancy support schemes.' },
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
  {
    id: 'cs-3-1',
    unitId: '3',
    title: 'Leah – promoting healthy eating',
    scenario: 'Leah is 14 and lives with her mum. They often eat takeaways and ready meals. Leah has put on weight and her school nurse has suggested she could benefit from healthier eating. Leah is interested but her mum works long hours and finds cooking from scratch difficult.',
    clientGroup: 'Adolescent',
    setting: 'School and family',
    questions: [
      { id: 'cs-3-1-q1', question: 'Identify two factors affecting Leah\'s health and wellbeing.', marks: 4, type: 'describe', markScheme: [{ idea: 'Diet / lifestyle', marks: 2 }, { idea: 'Family / time / environment', marks: 2 }], modelAnswer: 'Diet and lifestyle – takeaways and ready meals may be high in fat and salt. Family factors – her mum works long hours, so time and energy for cooking may be limited.' },
      { id: 'cs-3-1-q2', question: 'Describe how a health promotion activity could be tailored to support Leah and her family.', marks: 4, type: 'describe', markScheme: [{ idea: 'Practical / achievable', marks: 2 }, { idea: 'Family involvement', marks: 2 }], modelAnswer: 'The activity could focus on quick, simple healthy meals that fit busy schedules. Involving her mum would help – e.g. a family cooking session or easy recipes they could do together.' },
    ],
  },
  {
    id: 'cs-1-3',
    unitId: '1',
    title: 'Fatima – early childhood and factors',
    scenario: 'Fatima is 5 and has just started school. She lives in a small flat with her parents and two older siblings. Her parents speak limited English. The school has noticed Fatima is quiet and sometimes struggles to join in with group activities.',
    clientGroup: 'Early childhood',
    setting: 'School and family',
    questions: [
      { id: 'cs-1-3-q1', question: 'Explain how environmental factors might affect Fatima\'s development.', marks: 4, type: 'explain', markScheme: [{ idea: 'Housing / space', marks: 2 }, { idea: 'Language / culture', marks: 2 }], modelAnswer: 'Living in a small flat may limit space for play and physical development. If her parents speak limited English, this could affect her language development and confidence at school, and may be a cultural/language factor.' },
      { id: 'cs-1-3-q2', question: 'Describe two types of support that could help Fatima and her family.', marks: 4, type: 'describe', markScheme: [{ idea: 'School / EAL', marks: 2 }, { idea: 'Family support', marks: 2 }], modelAnswer: 'School could provide EAL (English as an additional language) support. Family support services or outreach could help her parents access information and feel more connected to the school community.' },
    ],
  },
  {
    id: 'cs-2-2',
    unitId: '2',
    title: 'Ahmed – mental health and stigma',
    scenario: 'Ahmed is 22 and has been feeling low for several months. His GP has suggested he might benefit from talking therapy. Ahmed is worried about what his family and friends would think if they knew he was seeing a counsellor. He has not yet made an appointment.',
    clientGroup: 'Early adulthood',
    setting: 'Health services',
    questions: [
      { id: 'cs-2-2-q1', question: 'Identify the barrier Ahmed is facing when accessing care.', marks: 2, type: 'describe', markScheme: [{ idea: 'Psychological / stigma', marks: 2 }], modelAnswer: 'Ahmed is facing a psychological barrier – fear of stigma. He is worried about being judged by family and friends for seeking mental health support.' },
      { id: 'cs-2-2-q2', question: 'Explain how services could help reduce this barrier.', marks: 4, type: 'explain', markScheme: [{ idea: 'Confidentiality', marks: 2 }, { idea: 'Normalising / outreach', marks: 2 }], modelAnswer: 'Services could emphasise confidentiality so Ahmed knows his family would not be told without his consent. Campaigns that normalise mental health support could reduce stigma. Offering remote or discreet access might also help.' },
    ],
  },
  {
    id: 'cs-4-2',
    unitId: '4',
    title: 'Residential home – person-centred care',
    scenario: 'Mr Khan is 78 and has recently moved into a residential home. He has always enjoyed a cup of tea at 4pm and likes to sit in a particular chair. Staff have a set routine and sometimes offer tea at 3.30pm because it fits the rota. Mr Khan has become withdrawn.',
    clientGroup: 'Later adulthood',
    setting: 'Residential care',
    questions: [
      { id: 'cs-4-2-q1', question: 'Explain why Mr Khan might have become withdrawn.', marks: 4, type: 'explain', markScheme: [{ idea: 'Routine / preferences ignored', marks: 2 }, { idea: 'Loss of control / dignity', marks: 2 }], modelAnswer: 'His preferences (tea at 4pm, favourite chair) may be ignored in favour of staff routine. This can make him feel his choices do not matter, affecting dignity and sense of control, which may lead to withdrawal.' },
      { id: 'cs-4-2-q2', question: 'Describe how care workers could demonstrate person-centred care in this situation.', marks: 4, type: 'describe', markScheme: [{ idea: 'Respect preferences', marks: 2 }, { idea: 'Involve in decisions', marks: 2 }], modelAnswer: 'Care workers could adjust the routine to offer tea at 4pm when possible. They could ensure he has access to his preferred chair and involve him in decisions about his daily routine.' },
    ],
  },
  {
    id: 'cs-1-4',
    unitId: '1',
    title: 'Ella – infancy and attachment',
    scenario: 'Ella is 10 months old. Her mother has returned to work part-time and Ella now spends two days a week with her grandmother. Ella\'s mother is worried that Ella cries when she leaves and wonders if this will affect Ella\'s development.',
    clientGroup: 'Infant',
    setting: 'Family',
    questions: [
      { id: 'cs-1-4-q1', question: 'Explain why Ella might cry when her mother leaves.', marks: 4, type: 'explain', markScheme: [{ idea: 'Attachment', marks: 2 }, { idea: 'Separation anxiety', marks: 2 }], modelAnswer: 'Ella has formed an attachment to her mother as primary carer. Crying when her mother leaves is a normal sign of attachment and separation anxiety at this age – it shows she has formed a strong bond.' },
      { id: 'cs-1-4-q2', question: 'Describe how consistent care from her grandmother could support Ella\'s development.', marks: 4, type: 'describe', markScheme: [{ idea: 'Secure base', marks: 2 }, { idea: 'Social / emotional', marks: 2 }], modelAnswer: 'Consistent care from her grandmother can provide a secure base. Multiple caring relationships can support social and emotional development, as long as care is consistent and loving.' },
    ],
  },
  {
    id: 'cs-3-2',
    unitId: '3',
    title: 'David – physical health indicators',
    scenario: 'David is 55 and has been advised to improve his fitness. His GP has recorded his BMI as 28 and blood pressure as 142/88. David says he feels fine and does not understand why these numbers matter.',
    clientGroup: 'Middle adulthood',
    setting: 'GP surgery',
    questions: [
      { id: 'cs-3-2-q1', question: 'Explain what David\'s BMI and blood pressure might indicate.', marks: 4, type: 'explain', markScheme: [{ idea: 'BMI 28', marks: 2 }, { idea: 'Blood pressure', marks: 2 }], modelAnswer: 'BMI of 28 is in the overweight range, which can increase risk of health problems. Blood pressure 142/88 is elevated (high normal or stage 1 hypertension), indicating possible cardiovascular risk.' },
      { id: 'cs-3-2-q2', question: 'Describe two ways a care worker could support David to improve his health.', marks: 4, type: 'describe', markScheme: [{ idea: 'Lifestyle advice', marks: 2 }, { idea: 'Tailored / achievable', marks: 2 }], modelAnswer: 'Provide lifestyle advice on diet and physical activity that is realistic for him. Support could include signposting to exercise programmes or one-to-one health improvement planning with achievable goals.' },
    ],
  },
  {
    id: 'cs-2-3',
    unitId: '2',
    title: 'Grace – multi-agency support',
    scenario: 'Grace is 7 and has a physical disability. She attends a mainstream school but needs support with mobility, learning and personal care. Her parents want to ensure she gets the right support from health, education and social care services.',
    clientGroup: 'Child',
    setting: 'School, health, social care',
    questions: [
      { id: 'cs-2-3-q1', question: 'Explain why Grace might need multi-agency support.', marks: 4, type: 'explain', markScheme: [{ idea: 'Multiple needs', marks: 2 }, { idea: 'Different services', marks: 2 }], modelAnswer: 'Grace has multiple needs – mobility, learning and personal care – that no single service can meet alone. Health (physio, equipment), education (SEN support) and social care (respite, adaptations) need to work together.' },
      { id: 'cs-2-3-q2', question: 'Describe how partnership working could benefit Grace and her family.', marks: 4, type: 'describe', markScheme: [{ idea: 'Coordinated care', marks: 2 }, { idea: 'Reduced duplication', marks: 2 }], modelAnswer: 'Partnership working ensures care is coordinated – everyone knows the plan. It reduces duplication and gaps, so Grace gets consistent support and her family has a clear point of contact.' },
    ],
  },
  {
    id: 'cs-4-3',
    unitId: '4',
    title: 'Teenage health – school-based promotion',
    scenario: 'A school wants to run a health promotion campaign to reduce sugary drink consumption among Year 10 students. Past campaigns have had limited impact because students felt they were being lectured.',
    clientGroup: 'Adolescent',
    setting: 'School',
    questions: [
      { id: 'cs-4-3-q1', question: 'Explain why the previous campaigns may have had limited impact.', marks: 4, type: 'explain', markScheme: [{ idea: 'Tone / approach', marks: 2 }, { idea: 'Not tailored', marks: 2 }], modelAnswer: 'If students felt lectured, the tone may have been patronising. The approach may not have been tailored to what motivates teenagers – e.g. peer influence, choice, or practical benefits they care about.' },
      { id: 'cs-4-3-q2', question: 'Describe a person-centred approach to this health promotion activity.', marks: 4, type: 'describe', markScheme: [{ idea: 'Student involvement', marks: 2 }, { idea: 'Relevant / engaging', marks: 2 }], modelAnswer: 'Involve students in designing the campaign – they know what would work. Use peer-led activities, practical demonstrations (e.g. sugar content) and focus on benefits they value (energy, skin, sport) rather than just "don\'t do this".' },
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
  {
    id: 'inv-1-1',
    unitId: '1',
    title: 'Investigate the impact of a life event',
    aim: 'To investigate how an expected or unexpected life event affects an individual\'s PIES development and what support is available.',
    scenario: 'Choose a life event (e.g. starting school, redundancy, bereavement, retirement). Plan how you would investigate its impact on development and the support networks that help people cope.',
    steps: [
      { prompt: 'Describe the life event and whether it is expected or unexpected.', hint: 'Expected = predictable; unexpected = unpredictable.' },
      { prompt: 'What PIES effects might this event have?', hint: 'Consider physical, intellectual, emotional and social impacts.' },
      { prompt: 'What informal and formal support might be available?', hint: 'Family, friends, statutory services, voluntary organisations.' },
      { prompt: 'How might the support vary for different individuals?', hint: 'Age, culture, existing networks, resilience.' },
    ],
    modelConclusion: 'The life event [event] can affect [PIES impacts]. Support includes [informal and formal]. Support varies because [factors]. Understanding both the impact and available support helps care workers provide appropriate help.',
  },
  {
    id: 'inv-2-2',
    unitId: '2',
    title: 'Investigate barriers to accessing a local service',
    aim: 'To investigate the barriers that might prevent a specific client group from accessing a health, social care or early years service.',
    scenario: 'Choose a service (e.g. GP, counselling, childcare, care home) and a client group (e.g. older people, young parents, people with disabilities). Identify potential barriers and how they could be overcome.',
    steps: [
      { prompt: 'Describe the service and client group.', hint: 'Be specific about the setting and who might use it.' },
      { prompt: 'What physical, psychological, financial and geographical barriers might exist?', hint: 'Consider building access, stigma, cost, transport, location.' },
      { prompt: 'What cultural or language barriers might apply?', hint: 'First language, beliefs, communication needs.' },
      { prompt: 'How could the service or partnership working reduce these barriers?', hint: 'Outreach, adaptations, interpretation, funding, campaigns.' },
    ],
    modelConclusion: 'The service [name] may face barriers including [list]. These affect [client group] because [reasons]. Barriers could be reduced by [solutions]. Partnership working with [organisations] could help.',
  },
  {
    id: 'inv-4-1',
    unitId: '4',
    title: 'Apply care values in a practice scenario',
    aim: 'To plan how care values would be applied when supporting a specific service user in a practice setting.',
    scenario: 'Choose a service user (e.g. someone with dementia, a child in early years, someone with a learning disability) and a care situation (e.g. personal care, mealtime, activity). Plan how you would apply care values.',
    steps: [
      { prompt: 'Describe the service user and care situation.', hint: 'Who are they? What is the setting? What care is needed?' },
      { prompt: 'How would you promote dignity and respect?', hint: 'Privacy, choice, language, pace.' },
      { prompt: 'How would you ensure effective communication?', hint: 'Active listening, appropriate methods, checking understanding.' },
      { prompt: 'How would you balance confidentiality with safeguarding?', hint: 'When to share information; who to share with.' },
    ],
    modelConclusion: 'In this scenario, dignity would be promoted by [actions]. Communication would involve [methods]. Confidentiality would be maintained unless [safeguarding situation]. Care values guide every interaction.',
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

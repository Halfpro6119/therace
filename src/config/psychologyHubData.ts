/**
 * Psychology Hub – AQA GCSE Psychology 8182
 * Paper 1: Memory, Perception, Development, Research methods
 * Paper 2: Social influence, Language thought & communication, Brain & neuropsychology, Psychological problems
 */

import type {
  PsychologyTopicMeta,
  PsychologyConceptCard,
  PsychologyKeyStudy,
  PsychologyKeyTerm,
  PsychologyQuickCheckItem,
  PsychologyStudyEvaluatorPrompt,
  PsychologyIssuesDebatesPrompt,
  PsychologyResearchMethodsTask,
  PsychologyQuestionLabItem,
} from '../types/psychologyHub';

// ============================================================================
// TOPIC METADATA (GCSE 8182)
// ============================================================================

export const PSYCHOLOGY_TOPICS: PsychologyTopicMeta[] = [
  // Paper 1: Cognition & Behaviour
  { id: 'memory', title: 'Memory', paper: 1, isCompulsory: true },
  { id: 'perception', title: 'Perception', paper: 1, isCompulsory: true },
  { id: 'development', title: 'Development', paper: 1, isCompulsory: true },
  { id: 'research-methods', title: 'Research methods', paper: 1, isCompulsory: true },
  // Paper 2: Social Context
  { id: 'social-influence', title: 'Social influence', paper: 2, isCompulsory: true },
  { id: 'language-thought-communication', title: 'Language, thought & communication', paper: 2, isCompulsory: true },
  { id: 'brain-neuropsychology', title: 'Brain & neuropsychology', paper: 2, isCompulsory: true },
  { id: 'psychological-problems', title: 'Psychological problems', paper: 2, isCompulsory: true },
];

/** GCSE 8182: all topics compulsory; no options. */
export function getPsychologyTopicsForSelection(): PsychologyTopicMeta[] {
  return PSYCHOLOGY_TOPICS;
}

// ============================================================================
// CONCEPT CARDS
// ============================================================================

const CONCEPTS: PsychologyConceptCard[] = [
  // Memory
  {
    id: 'mem-c1',
    topicId: 'memory',
    title: 'Multi-store model',
    coreIdea: 'Atkinson & Shiffrin: information flows through sensory register → STM → LTM. Each store has different coding, capacity, and duration.',
    keyStudies: 'Sensory: brief; STM: ~18s, 7±2 items, acoustic; LTM: unlimited, semantic.',
    misconception: 'STM and LTM are separate boxes – WMM suggests STM is more dynamic.',
  },
  {
    id: 'mem-c2',
    topicId: 'memory',
    title: 'Working memory model',
    coreIdea: 'Baddeley & Hitch: central executive, phonological loop, visuo-spatial sketchpad, episodic buffer. Explains dual-task performance.',
    keyStudies: 'Phonological loop: verbal; visuo-spatial: images. Central executive coordinates.',
    misconception: 'STM is one simple store – WMM shows it has multiple components.',
  },
  {
    id: 'mem-c3',
    topicId: 'memory',
    title: 'Eyewitness testimony',
    coreIdea: 'Leading questions and post-event discussion can distort recall. Loftus & Palmer showed how wording affects estimates.',
    keyStudies: 'Cognitive interview (CIs) improves accuracy by reducing leading questions and using context reinstatement.',
  },
  // Perception
  {
    id: 'per-c1',
    topicId: 'perception',
    title: 'Gregory\'s constructivist theory',
    coreIdea: 'Perception uses past experience and context to interpret sensory input. We construct our perception.',
    keyStudies: 'Visual illusions (e.g. Necker cube) show how context affects interpretation.',
    misconception: 'We see exactly what is there – perception is influenced by expectations.',
  },
  {
    id: 'per-c2',
    topicId: 'perception',
    title: 'Gibson\'s direct theory',
    coreIdea: 'Perception is direct – we pick up information from the environment (e.g. optic flow). No need for past experience.',
    keyStudies: 'Gibson: affordances – what the environment offers. Motion parallax.',
    misconception: 'Perception is always direct – Gibson ignores context effects.',
  },
  // Development
  {
    id: 'dev-c1',
    topicId: 'development',
    title: 'Piaget\'s stages',
    coreIdea: 'Cognitive development in stages: sensorimotor, pre-operational, concrete operational, formal operational. Assimilation and accommodation.',
    keyStudies: 'Conservation tasks; egocentrism (three mountains).',
    misconception: 'Stages are fixed – Vygotsky showed social context matters.',
  },
  {
    id: 'dev-c2',
    topicId: 'development',
    title: 'Dweck\'s mindset theory',
    coreIdea: 'Fixed mindset: ability is fixed. Growth mindset: ability can be developed. Affects effort and resilience.',
    keyStudies: 'Praise for effort vs ability; children with growth mindset improve more.',
  },
  // Research methods
  {
    id: 'rm-c1',
    topicId: 'research-methods',
    title: 'Variables',
    coreIdea: 'IV: manipulated. DV: measured. Extraneous: controlled. Operationalisation: defining variables clearly.',
    keyStudies: 'Standardised procedures reduce extraneous variables.',
  },
  {
    id: 'rm-c2',
    topicId: 'research-methods',
    title: 'Sampling',
    coreIdea: 'Random: equal chance. Opportunity: convenient. Volunteer: self-selected. Stratified: proportional groups.',
    keyStudies: 'Random reduces bias; opportunity may not representative.',
  },
  // Social influence
  {
    id: 'si-c1',
    topicId: 'social-influence',
    title: 'Types of conformity',
    coreIdea: 'Conformity is yielding to group pressure. Internalisation: private and public acceptance. Compliance: public only. Identification: adopt group norms.',
    keyStudies: 'Asch (1951): 75% conformed at least once. Normative and informational influence.',
    misconception: 'Conformity is always negative – it can help us learn (informational).',
  },
  {
    id: 'si-c2',
    topicId: 'social-influence',
    title: 'Obedience',
    coreIdea: 'Obedience is following orders from authority. Milgram: 65% gave 450V. Agentic state, legitimacy of authority.',
    keyStudies: 'Milgram (1963): proximity, location, uniform affected obedience.',
  },
  // Language, thought & communication
  {
    id: 'ltc-c1',
    topicId: 'language-thought-communication',
    title: 'Language and thought',
    coreIdea: 'Sapir-Whorf: language shapes thought. Piaget: thought precedes language. Vygotsky: inner speech.',
    keyStudies: 'Different languages have different words for concepts; may affect thinking.',
  },
  {
    id: 'ltc-c2',
    topicId: 'language-thought-communication',
    title: 'Non-verbal communication',
    coreIdea: 'Body language, facial expression, eye contact. Darwin: universal expression of emotion.',
    keyStudies: 'Ekman: six basic emotions recognised across cultures.',
  },
  // Brain & neuropsychology
  {
    id: 'bn-c1',
    topicId: 'brain-neuropsychology',
    title: 'Structure of the brain',
    coreIdea: 'Cerebrum (hemispheres), cerebellum, brain stem. Localisation: different areas have different functions.',
    keyStudies: 'Broca\'s area: speech. Wernicke\'s: comprehension. Phineas Gage.',
  },
  {
    id: 'bn-c2',
    topicId: 'brain-neuropsychology',
    title: 'Neurons and synapses',
    coreIdea: 'Neurons transmit via electrical impulses and chemical neurotransmitters. Synaptic transmission: excitation or inhibition.',
    keyStudies: 'Neurotransmitters: serotonin, dopamine. Synaptic gap.',
  },
  // Psychological problems
  {
    id: 'pp-c1',
    topicId: 'psychological-problems',
    title: 'Depression',
    coreIdea: 'Beck: negative triad (self, world, future). Ellis: ABC model. CBT challenges irrational thoughts.',
    keyStudies: 'Biological: serotonin. Psychological: cognitive distortions.',
  },
  {
    id: 'pp-c2',
    topicId: 'psychological-problems',
    title: 'Addiction',
    coreIdea: 'Physical and psychological dependence. Tolerance: need more. Withdrawal: symptoms when stopped.',
    keyStudies: 'Biological: dopamine reward. Social learning: modelling.',
  },
  // Memory – stretch
  { id: 'mem-c4', topicId: 'memory', title: 'Retrieval failure', coreIdea: 'Forgetting due to absence of retrieval cues. Encoding specificity: recall is better when context at encoding matches context at retrieval.', keyStudies: 'Tulving: context-dependent and state-dependent forgetting.', misconception: 'All forgetting is decay – retrieval failure shows cues matter.' },
  { id: 'mem-c5', topicId: 'memory', title: 'Cognitive interview', coreIdea: 'Technique to improve eyewitness recall: context reinstatement, report everything, reverse order, change perspective. Reduces leading questions.', keyStudies: 'Geiselman: CI increases accurate recall without increasing errors.', misconception: 'CI always improves accuracy – it can increase confabulation if misused.' },
  // Perception – stretch
  { id: 'per-c3', topicId: 'perception', title: 'Visual illusions', coreIdea: 'Illusions (e.g. Ponzo, Müller-Lyer) show that perception can be fooled. Gregory: misinterpreted depth cues. Gibson: illusions are artificial.', keyStudies: 'Used to test constructivist vs direct theories.', misconception: 'Illusions prove perception is always wrong – they show how it usually works.' },
  // Development – stretch
  { id: 'dev-c3', topicId: 'development', title: 'Vygotsky\'s zone of proximal development', coreIdea: 'ZPD: what a child can do with help vs alone. Scaffolding: support from expert. Social context shapes development.', keyStudies: 'Contrast with Piaget: Vygotsky emphasised social learning.', misconception: 'Piaget and Vygotsky agreed – they differed on role of social context.' },
  // Research methods – stretch
  { id: 'rm-c3', topicId: 'research-methods', title: 'Experimental design', coreIdea: 'Independent groups, repeated measures, matched pairs. Each has pros and cons for controlling extraneous variables.', keyStudies: 'Random allocation reduces bias in independent groups.', misconception: 'Repeated measures always better – order effects can occur.' },
  { id: 'rm-c4', topicId: 'research-methods', title: 'Ethics in research', coreIdea: 'Informed consent, right to withdraw, confidentiality, debriefing, protection from harm. BPS guidelines.', keyStudies: 'Milgram raised ethical questions; modern studies must follow guidelines.', misconception: 'Ethics only matter in lab studies – all research needs ethical consideration.' },
  // Social influence – stretch
  { id: 'si-c3', topicId: 'social-influence', title: 'Social impact theory', coreIdea: 'Latané: impact depends on strength, immediacy, number. More people = more impact but each extra person adds less.', keyStudies: 'Explains conformity and obedience in groups.', misconception: 'More people always means more conformity – diminishing returns.' },
  // Brain – stretch
  { id: 'bn-c3', topicId: 'brain-neuropsychology', title: 'Plasticity', coreIdea: 'Brain can reorganise after damage. New neural pathways form. Use-dependent.', keyStudies: 'Recovery from stroke; London taxi drivers\' hippocampi.', misconception: 'Brain is fixed in adulthood – plasticity continues throughout life.' },
  // Psychological problems – stretch
  { id: 'pp-c3', topicId: 'psychological-problems', title: 'Phobias', coreIdea: 'Irrational fear. Classical conditioning: association. Operant: avoidance reinforced. Treatments: systematic desensitisation, flooding.', keyStudies: 'Watson & Rayner: Little Albert. Behavioural explanation.', misconception: 'Phobias are always from direct experience – can be learned indirectly.' },
];

// ============================================================================
// KEY STUDIES
// ============================================================================

const KEY_STUDIES: PsychologyKeyStudy[] = [
  { id: 'mem-s1', topicId: 'memory', researcher: 'Loftus & Palmer (1974)', aim: 'To see if leading questions affect eyewitness estimates.', procedure: 'Participants saw car crash; asked "how fast when they smashed/collided?"', findings: '"Smashed" → higher speed estimates, more "broken glass" (false memory).', conclusion: 'Leading questions distort eyewitness testimony.' },
  { id: 'mem-s2', topicId: 'memory', researcher: 'Peterson & Peterson (1959)', aim: 'To measure duration of STM.', procedure: 'Participants recalled trigrams after 3, 6, 9, 12, 15, 18 seconds of distraction.', findings: 'Recall dropped after ~18 seconds without rehearsal.', conclusion: 'STM duration is short without rehearsal.' },
  { id: 'per-s1', topicId: 'perception', researcher: 'Gregory (1970)', aim: 'To show how context affects perception.', procedure: 'Visual illusions; ambiguous figures.', findings: 'Past experience affects interpretation.',
    conclusion: 'Perception is constructed, not direct.' },
  { id: 'dev-s1', topicId: 'development', researcher: 'Piaget (1952)', aim: 'To study cognitive development.', procedure: 'Conservation tasks; three mountains.', findings: 'Children pass stages at different ages; egocentrism in pre-operational.', conclusion: 'Cognitive development in stages.' },
  { id: 'dev-s2', topicId: 'development', researcher: 'Dweck (2006)', aim: 'To test mindset and achievement.', procedure: 'Praise for effort vs ability; measured resilience.', findings: 'Growth mindset improved performance after setbacks.', conclusion: 'Mindset affects learning and resilience.' },
  { id: 'si-s1', topicId: 'social-influence', researcher: 'Asch (1951)', aim: 'To see if participants would conform to a clearly wrong answer.', procedure: 'Participants matched line lengths; confederates gave wrong answers.', findings: '75% conformed at least once. Unanimity mattered.', conclusion: 'Normative social influence.' },
  { id: 'si-s2', topicId: 'social-influence', researcher: 'Milgram (1963)', aim: 'To test obedience to authority.', procedure: 'Participants "shocked" a learner (confederate) for wrong answers.', findings: '65% gave 450V. Proximity, location, uniform affected obedience.', conclusion: 'Situational factors explain obedience.' },
  { id: 'bn-s1', topicId: 'brain-neuropsychology', researcher: 'Broca (1861)', aim: 'To identify brain regions for speech.', procedure: 'Studied patient with speech damage.', findings: 'Damage to left frontal lobe (Broca\'s area) caused speech loss.', conclusion: 'Localisation of speech production.' },
  { id: 'bn-s2', topicId: 'brain-neuropsychology', researcher: 'Sperry (1968)', aim: 'To study split-brain patients.', procedure: 'Participants with severed corpus callosum; stimuli to left or right visual field.', findings: 'Left hemisphere: language. Right: spatial. Each hemisphere processes independently.', conclusion: 'Hemispheric specialisation.' },
  { id: 'mem-s3', topicId: 'memory', researcher: 'Baddeley (1966)', aim: 'To test coding in STM and LTM.', procedure: 'Participants recalled word lists; acoustic vs semantic similarity.', findings: 'STM: acoustic confusion. LTM: semantic confusion.', conclusion: 'STM and LTM have different coding.' },
  { id: 'mem-s4', topicId: 'memory', researcher: 'Geiselman et al. (1985)', aim: 'To test the cognitive interview.', procedure: 'Witnesses used CI vs standard interview; accuracy measured.', findings: 'CI increased correct recall without increasing errors.', conclusion: 'CI improves eyewitness testimony.' },
  { id: 'dev-s3', topicId: 'development', researcher: 'Vygotsky (1978)', aim: 'To study role of social context in development.', procedure: 'Observed children learning with adults; ZPD concept.', findings: 'Learning occurs in ZPD with scaffolding.', conclusion: 'Social interaction drives cognitive development.' },
  { id: 'si-s3', topicId: 'social-influence', researcher: 'Moscovici (1969)', aim: 'To test minority influence.', procedure: 'Minority gave consistent wrong answers; did majority conform?', findings: 'Consistent minority can influence majority.', conclusion: 'Minority influence requires consistency.' },
  { id: 'pp-s1', topicId: 'psychological-problems', researcher: 'Beck (1967)', aim: 'To explain depression cognitively.', procedure: 'Identified negative triad and cognitive distortions.', findings: 'Depressed people have negative views of self, world, future.', conclusion: 'Cognitive theory of depression.' },
  { id: 'pp-s2', topicId: 'psychological-problems', researcher: 'Watson & Rayner (1920)', aim: 'To show phobias can be conditioned.', procedure: 'Little Albert: paired loud noise with white rat.', findings: 'Albert developed fear of rat (and similar stimuli).', conclusion: 'Phobias can be learned through classical conditioning.' },
];

// ============================================================================
// KEY TERMS
// ============================================================================

const KEY_TERMS: PsychologyKeyTerm[] = [
  { id: 'mem-t1', topicId: 'memory', term: 'Sensory register', definition: 'Brief store for sensory input; iconic (visual) and echoic (auditory).' },
  { id: 'mem-t2', topicId: 'memory', term: 'Working memory model', definition: 'Baddeley & Hitch: central executive, phonological loop, visuo-spatial sketchpad, episodic buffer.' },
  { id: 'mem-t3', topicId: 'memory', term: 'Retrieval failure', definition: 'Forgetting due to absence of cues (encoding specificity).' },
  { id: 'per-t1', topicId: 'perception', term: 'Constructivist theory', definition: 'Gregory: perception uses past experience and context.' },
  { id: 'per-t2', topicId: 'perception', term: 'Direct theory', definition: 'Gibson: perception is direct; we pick up information from the environment.' },
  { id: 'dev-t1', topicId: 'development', term: 'Assimilation', definition: 'Fitting new information into existing schemas.' },
  { id: 'dev-t2', topicId: 'development', term: 'Accommodation', definition: 'Changing schemas to fit new information.' },
  { id: 'dev-t3', topicId: 'development', term: 'Growth mindset', definition: 'Dweck: belief that ability can be developed through effort.' },
  { id: 'rm-t1', topicId: 'research-methods', term: 'IV', definition: 'Independent variable – manipulated by researcher.' },
  { id: 'rm-t2', topicId: 'research-methods', term: 'DV', definition: 'Dependent variable – measured outcome.' },
  { id: 'rm-t3', topicId: 'research-methods', term: 'Extraneous variable', definition: 'Variable that could affect DV; should be controlled.' },
  { id: 'si-t1', topicId: 'social-influence', term: 'Informational social influence', definition: 'Conforming because we believe others are right (ambiguous situations).' },
  { id: 'si-t2', topicId: 'social-influence', term: 'Normative social influence', definition: 'Conforming to be liked or accepted by the group.' },
  { id: 'si-t3', topicId: 'social-influence', term: 'Agentic state', definition: 'Milgram: when we obey, we see ourselves as an agent of authority, not responsible.' },
  { id: 'ltc-t1', topicId: 'language-thought-communication', term: 'Linguistic relativity', definition: 'Sapir-Whorf: language shapes thought.' },
  { id: 'bn-t1', topicId: 'brain-neuropsychology', term: 'Synaptic transmission', definition: 'Neurotransmitters cross synapse; excitation or inhibition.' },
  { id: 'bn-t2', topicId: 'brain-neuropsychology', term: 'Localisation', definition: 'Different brain areas have specific functions.' },
  { id: 'pp-t1', topicId: 'psychological-problems', term: 'Negative triad', definition: 'Beck: negative views of self, world, and future.' },
  { id: 'pp-t2', topicId: 'psychological-problems', term: 'CBT', definition: 'Cognitive Behaviour Therapy – challenges irrational thoughts.' },
];

// ============================================================================
// QUICK CHECK
// ============================================================================

const QUICK_CHECKS: PsychologyQuickCheckItem[] = [
  { id: 'mem-qc1', topicId: 'memory', type: 'multipleChoice', question: 'What is the capacity of short-term memory (Miller)?', options: ['5±2', '7±2', '9±2', 'Unlimited'], correctAnswer: '7±2', feedback: { correct: 'Correct.', incorrect: 'Miller: 7±2 items (chunks).' } },
  { id: 'mem-qc2', topicId: 'memory', type: 'shortAnswer', question: 'Which part of the working memory model deals with visual and spatial information?', correctAnswer: 'Visuo-spatial sketchpad', feedback: { correct: 'Correct.', incorrect: 'Visuo-spatial sketchpad.' } },
  { id: 'mem-qc3', topicId: 'memory', type: 'multipleChoice', question: 'What did Loftus & Palmer find about leading questions?', options: ['They improve recall', 'They distort estimates', 'They have no effect', 'They increase accuracy'], correctAnswer: 'They distort estimates', feedback: { correct: 'Correct.', incorrect: 'Leading questions distort eyewitness estimates.' } },
  { id: 'mem-qc4', topicId: 'memory', type: 'trueFalse', question: 'The multi-store model suggests STM and LTM have the same coding.', correctAnswer: 'false', feedback: { correct: 'Correct – STM is acoustic, LTM is semantic.', incorrect: 'STM: acoustic. LTM: semantic.' } },
  { id: 'per-qc1', topicId: 'perception', type: 'multipleChoice', question: 'What does Gregory\'s theory suggest about perception?', options: ['It is direct', 'It uses past experience', 'It is automatic', 'It is genetic'], correctAnswer: 'It uses past experience', feedback: { correct: 'Correct.', incorrect: 'Gregory: constructivist – past experience and context.' } },
  { id: 'per-qc2', topicId: 'perception', type: 'shortAnswer', question: 'Who proposed the direct theory of perception?', correctAnswer: 'Gibson', feedback: { correct: 'Correct.', incorrect: 'James Gibson.' } },
  { id: 'dev-qc1', topicId: 'development', type: 'multipleChoice', question: 'What is the first stage in Piaget\'s theory?', options: ['Pre-operational', 'Sensorimotor', 'Concrete operational', 'Formal operational'], correctAnswer: 'Sensorimotor', feedback: { correct: 'Correct.', incorrect: 'Sensorimotor (0–2 years).' } },
  { id: 'dev-qc2', topicId: 'development', type: 'multipleChoice', question: 'What does a growth mindset believe?', options: ['Ability is fixed', 'Ability can be developed', 'Effort doesn\'t matter', 'Success is luck'], correctAnswer: 'Ability can be developed', feedback: { correct: 'Correct.', incorrect: 'Dweck: growth mindset = ability can be developed.' } },
  { id: 'rm-qc1', topicId: 'research-methods', type: 'multipleChoice', question: 'Which sampling method gives everyone an equal chance?', options: ['Opportunity', 'Volunteer', 'Random', 'Stratified'], correctAnswer: 'Random', feedback: { correct: 'Correct.', incorrect: 'Random sampling – all have equal chance.' } },
  { id: 'rm-qc2', topicId: 'research-methods', type: 'shortAnswer', question: 'What does IV stand for?', correctAnswer: 'Independent variable', feedback: { correct: 'Correct.', incorrect: 'Independent variable – manipulated by researcher.' } },
  { id: 'si-qc1', topicId: 'social-influence', type: 'multipleChoice', question: 'What type of conformity involves both private and public acceptance?', options: ['Compliance', 'Internalisation', 'Identification', 'Normative'], correctAnswer: 'Internalisation', feedback: { correct: 'Correct.', incorrect: 'Internalisation – you believe the group is right.' } },
  { id: 'si-qc2', topicId: 'social-influence', type: 'shortAnswer', question: 'Who conducted the obedience study with electric shocks?', correctAnswer: 'Milgram', feedback: { correct: 'Correct.', incorrect: 'Stanley Milgram (1963).' } },
  { id: 'si-qc3', topicId: 'social-influence', type: 'trueFalse', question: 'Asch found that unanimity increased conformity.', correctAnswer: 'false', feedback: { correct: 'Correct – when one confederate disagreed, conformity dropped.', incorrect: 'Unanimity increased conformity; dissent reduced it.' } },
  { id: 'ltc-qc1', topicId: 'language-thought-communication', type: 'multipleChoice', question: 'What does the Sapir-Whorf hypothesis suggest?', options: ['Thought precedes language', 'Language shapes thought', 'They are unrelated', 'Language is universal'], correctAnswer: 'Language shapes thought', feedback: { correct: 'Correct.', incorrect: 'Linguistic relativity: language shapes thought.' } },
  { id: 'bn-qc1', topicId: 'brain-neuropsychology', type: 'trueFalse', question: 'The autonomic nervous system controls voluntary movement.', correctAnswer: 'false', feedback: { correct: 'Correct – somatic controls voluntary; autonomic is involuntary.', incorrect: 'Autonomic = involuntary (e.g. heart rate); somatic = voluntary.' } },
  { id: 'bn-qc2', topicId: 'brain-neuropsychology', type: 'shortAnswer', question: 'Which brain area is associated with speech production?', correctAnswer: 'Broca\'s area', feedback: { correct: 'Correct.', incorrect: 'Broca\'s area (left frontal lobe).' } },
  { id: 'pp-qc1', topicId: 'psychological-problems', type: 'multipleChoice', question: 'Which therapy uses gradual exposure and relaxation for phobias?', options: ['Flooding', 'CBT', 'Systematic desensitisation', 'Drug therapy'], correctAnswer: 'Systematic desensitisation', feedback: { correct: 'Correct.', incorrect: 'Systematic desensitisation – hierarchy + relaxation.' } },
  { id: 'pp-qc2', topicId: 'psychological-problems', type: 'shortAnswer', question: 'What is Beck\'s negative triad?', correctAnswer: 'Negative views of self, world, and future', feedback: { correct: 'Correct.', incorrect: 'Beck: negative views of self, world, and future.' } },
  // Memory – expanded
  { id: 'mem-qc5', topicId: 'memory', type: 'trueFalse', question: 'Encoding specificity suggests recall is better when context matches.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Encoding specificity: context at encoding should match at retrieval.' } },
  { id: 'mem-qc6', topicId: 'memory', type: 'multipleChoice', question: 'Which part of the working memory model coordinates other components?', options: ['Phonological loop', 'Central executive', 'Visuo-spatial sketchpad', 'Episodic buffer'], correctAnswer: 'Central executive', feedback: { correct: 'Correct.', incorrect: 'Central executive coordinates the other components.' } },
  { id: 'mem-qc7', topicId: 'memory', type: 'shortAnswer', question: 'What is the cognitive interview?', correctAnswer: 'technique to improve eyewitness recall', feedback: { correct: 'Correct.', incorrect: 'CI uses context reinstatement, report everything, reverse order, change perspective.' } },
  // Perception – expanded
  { id: 'per-qc3', topicId: 'perception', type: 'trueFalse', question: 'Gibson believed perception is direct and does not need past experience.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Gibson: we pick up information directly from the environment.' } },
  { id: 'per-qc4', topicId: 'perception', type: 'multipleChoice', question: 'Visual illusions support which theory?', options: ['Gibson\'s direct theory', 'Gregory\'s constructivist theory', 'Both equally', 'Neither'], correctAnswer: 'Gregory\'s constructivist theory', feedback: { correct: 'Correct.', incorrect: 'Gregory: illusions show we use context and can be fooled.' } },
  // Development – expanded
  { id: 'dev-qc3', topicId: 'development', type: 'shortAnswer', question: 'What does ZPD stand for?', correctAnswer: 'zone of proximal development', feedback: { correct: 'Correct.', incorrect: 'Zone of Proximal Development – Vygotsky.' } },
  { id: 'dev-qc4', topicId: 'development', type: 'multipleChoice', question: 'Who emphasised social context in development?', options: ['Piaget', 'Vygotsky', 'Dweck', 'Freud'], correctAnswer: 'Vygotsky', feedback: { correct: 'Correct.', incorrect: 'Vygotsky emphasised social interaction and ZPD.' } },
  { id: 'dev-qc5', topicId: 'development', type: 'trueFalse', question: 'A fixed mindset believes ability can be developed.', correctAnswer: 'false', feedback: { correct: 'Correct – fixed mindset says ability is fixed.', incorrect: 'Fixed mindset: ability is fixed. Growth: can be developed.' } },
  // Research methods – expanded
  { id: 'rm-qc3', topicId: 'research-methods', type: 'multipleChoice', question: 'What is an extraneous variable?', options: ['The IV', 'The DV', 'A variable that could affect the DV', 'The hypothesis'], correctAnswer: 'A variable that could affect the DV', feedback: { correct: 'Correct.', incorrect: 'Extraneous variables should be controlled.' } },
  { id: 'rm-qc4', topicId: 'research-methods', type: 'shortAnswer', question: 'What does DV stand for?', correctAnswer: 'dependent variable', feedback: { correct: 'Correct.', incorrect: 'Dependent variable – the outcome measured.' } },
  { id: 'rm-qc5', topicId: 'research-methods', type: 'multipleChoice', question: 'Which design has the same participants in all conditions?', options: ['Independent groups', 'Repeated measures', 'Matched pairs', 'Random'], correctAnswer: 'Repeated measures', feedback: { correct: 'Correct.', incorrect: 'Repeated measures: same participants in each condition.' } },
  { id: 'rm-qc6', topicId: 'research-methods', type: 'trueFalse', question: 'Random sampling gives everyone an equal chance of being selected.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Random sampling: all have equal chance.' } },
  // Social influence – expanded
  { id: 'si-qc4', topicId: 'social-influence', type: 'multipleChoice', question: 'What percentage of Milgram\'s participants gave 450V?', options: ['25%', '45%', '65%', '85%'], correctAnswer: '65%', feedback: { correct: 'Correct.', incorrect: '65% administered the full 450V.' } },
  { id: 'si-qc5', topicId: 'social-influence', type: 'shortAnswer', question: 'What is normative social influence?', correctAnswer: 'conforming to be liked or accepted', feedback: { correct: 'Correct.', incorrect: 'Normative: conform to fit in with the group.' } },
  { id: 'si-qc6', topicId: 'social-influence', type: 'trueFalse', question: 'Minority influence requires consistency.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Moscovici: consistent minority can influence majority.' } },
  // Language – expanded
  { id: 'ltc-qc2', topicId: 'language-thought-communication', type: 'trueFalse', question: 'Ekman identified six basic emotions recognised across cultures.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Ekman: six basic emotions are universal.' } },
  { id: 'ltc-qc3', topicId: 'language-thought-communication', type: 'multipleChoice', question: 'What is non-verbal communication?', options: ['Written words', 'Body language and facial expression', 'Spoken language', 'Sign language only'], correctAnswer: 'Body language and facial expression', feedback: { correct: 'Correct.', incorrect: 'NVC includes body language, facial expression, eye contact.' } },
  // Brain – expanded
  { id: 'bn-qc3', topicId: 'brain-neuropsychology', type: 'multipleChoice', question: 'Which area is associated with language comprehension?', options: ['Broca\'s area', 'Wernicke\'s area', 'Cerebellum', 'Brain stem'], correctAnswer: 'Wernicke\'s area', feedback: { correct: 'Correct.', incorrect: 'Wernicke\'s area: comprehension. Broca\'s: production.' } },
  { id: 'bn-qc4', topicId: 'brain-neuropsychology', type: 'shortAnswer', question: 'What is synaptic transmission?', correctAnswer: 'neurotransmitters cross synapse', feedback: { correct: 'Correct.', incorrect: 'Neurotransmitters cross the synaptic gap.' } },
  { id: 'bn-qc5', topicId: 'brain-neuropsychology', type: 'trueFalse', question: 'Brain plasticity means the brain can reorganise after damage.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Plasticity: brain can form new pathways.' } },
  // Psychological problems – expanded
  { id: 'pp-qc3', topicId: 'psychological-problems', type: 'multipleChoice', question: 'What is systematic desensitisation?', options: ['Flooding', 'Gradual exposure with relaxation', 'Drug therapy', 'CBT only'], correctAnswer: 'Gradual exposure with relaxation', feedback: { correct: 'Correct.', incorrect: 'SD: hierarchy + relaxation; gradual exposure.' } },
  { id: 'pp-qc4', topicId: 'psychological-problems', type: 'shortAnswer', question: 'What neurotransmitter is linked to depression?', correctAnswer: 'serotonin', feedback: { correct: 'Correct.', incorrect: 'Low serotonin is associated with depression.' } },
  { id: 'pp-qc5', topicId: 'psychological-problems', type: 'trueFalse', question: 'Addiction involves tolerance and withdrawal.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Tolerance: need more. Withdrawal: symptoms when stopped.' } },
];

// ============================================================================
// STUDY EVALUATOR
// ============================================================================

const STUDY_EVALUATOR: PsychologyStudyEvaluatorPrompt[] = [
  { id: 'mem-se1', topicId: 'memory', prompt: 'Evaluate the working memory model.', modelAnswer: 'Strengths: Explains dual-task performance; evidence from brain imaging. Limitations: Central executive vague; may be oversimplified.' },
  { id: 'mem-se2', topicId: 'memory', prompt: 'Evaluate Loftus & Palmer\'s study.', modelAnswer: 'Strengths: Controlled; replicable. Limitations: Ethical (deception); artificial (video clips); may not generalise to real crime.' },
  { id: 'per-se1', topicId: 'perception', prompt: 'Compare Gregory and Gibson\'s theories of perception.', modelAnswer: 'Gregory: constructivist – past experience. Gibson: direct – pick up information. Gregory explains illusions; Gibson explains real-world perception.' },
  { id: 'dev-se1', topicId: 'development', prompt: 'Evaluate Piaget\'s theory of cognitive development.', modelAnswer: 'Strengths: Influential; stages supported. Limitations: Underestimated children; stages may not be fixed; culture and education matter.' },
  { id: 'si-se1', topicId: 'social-influence', prompt: 'Evaluate Milgram\'s obedience study.', modelAnswer: 'Strengths: High internal validity (controlled), replicated cross-culturally. Limitations: Ethical issues (deception, distress), low ecological validity (lab), demand characteristics possible.' },
  { id: 'bn-se1', topicId: 'brain-neuropsychology', prompt: 'Evaluate localisation of function.', modelAnswer: 'Strengths: Evidence from brain damage (Broca, Wernicke). Limitations: Plasticity – brain can reorganise; functions may be distributed.' },
];

// ============================================================================
// ISSUES AND DEBATES (GCSE simplified)
// ============================================================================

const ISSUES_DEBATES: PsychologyIssuesDebatesPrompt[] = [
  { id: 'id-1', issueId: 'nature-nurture', prompt: 'Discuss the nature-nurture debate in relation to development.', modelAnswer: 'Nature: Piaget – stages are biological. Nurture: Vygotsky – social context. Interactionist: Dweck – mindset can be shaped by praise.', applyToTopicIds: ['development'] },
  { id: 'id-2', issueId: 'ethics', prompt: 'Discuss ethical issues in Milgram\'s obedience study.', modelAnswer: 'Deception: participants thought shocks were real. Distress: some showed extreme stress. Right to withdraw: experimenter urged them to continue. No informed consent.', applyToTopicIds: ['social-influence'] },
  { id: 'id-3', issueId: 'applications', prompt: 'How can psychology be applied to improve eyewitness testimony?', modelAnswer: 'Cognitive interview: context reinstatement, report everything, reverse order, change perspective. Reduces leading questions. Police training.', applyToTopicIds: ['memory'] },
];

// ============================================================================
// RESEARCH METHODS
// ============================================================================

const RESEARCH_METHODS: PsychologyResearchMethodsTask[] = [
  { id: 'rm-1', type: 'design', scenario: 'A researcher wants to test whether noise affects memory recall.', question: 'Identify the IV and DV, and suggest how to operationalise them.', expectedAnswer: 'IV: noise level (quiet vs loud). DV: memory recall (e.g. number of words recalled). Operationalise: noise in dB; recall from word list.' },
  { id: 'rm-2', type: 'method', scenario: 'Studying aggression in playground.', question: 'Which method would be most appropriate and why?', expectedAnswer: 'Naturalistic observation – see real behaviour; covert to avoid demand characteristics. Need behavioural categories and time/event sampling.' },
  { id: 'rm-3', type: 'data', scenario: 'Scores: 5, 7, 7, 8, 9.', question: 'Calculate the mean, median, and mode.', expectedAnswer: 'Mean: 7.2. Median: 7. Mode: 7.' },
  { id: 'rm-4', type: 'design', scenario: 'Testing whether revision method affects exam performance.', question: 'Identify IV, DV, and one extraneous variable to control.', expectedAnswer: 'IV: revision method (e.g. flashcards vs re-reading). DV: exam score. Extraneous: prior knowledge, time spent, sleep.' },
];

// ============================================================================
// QUESTION LAB
// ============================================================================

const QUESTION_LAB: PsychologyQuestionLabItem[] = [
  { id: 'mem-ql1', topicId: 'memory', questionType: 'short', question: 'Describe the capacity and duration of short-term memory.', markSchemeSummary: 'Capacity: 7±2. Duration: ~18-30 seconds.' },
  { id: 'mem-ql2', topicId: 'memory', questionType: 'outline', question: 'Outline the multi-store model of memory.', markSchemeSummary: 'Sensory register → STM → LTM. Coding, capacity, duration for each.' },
  { id: 'mem-ql3', topicId: 'memory', questionType: 'short', question: 'Explain one factor that affects eyewitness testimony.', markSchemeSummary: 'Leading questions: Loftus & Palmer. Post-event discussion.' },
  { id: 'per-ql1', topicId: 'perception', questionType: 'short', question: 'Outline one difference between Gregory and Gibson\'s theories of perception.', markSchemeSummary: 'Gregory: constructivist, past experience. Gibson: direct, pick up information.' },
  { id: 'dev-ql1', topicId: 'development', questionType: 'outline', question: 'Outline Piaget\'s stages of cognitive development.', markSchemeSummary: 'Sensorimotor, pre-operational, concrete operational, formal operational. Key features.' },
  { id: 'dev-ql2', topicId: 'development', questionType: 'short', question: 'Explain Dweck\'s mindset theory.', markSchemeSummary: 'Fixed vs growth mindset. Growth: effort leads to improvement.' },
  { id: 'rm-ql1', topicId: 'research-methods', questionType: 'short', question: 'Identify the IV and DV in a study testing whether noise affects memory.', markSchemeSummary: 'IV: noise level. DV: memory recall.' },
  { id: 'si-ql1', topicId: 'social-influence', questionType: 'short', question: 'Outline one explanation for conformity.', markSchemeSummary: 'Informational or normative; 2 marks for basic, 4 for developed.' },
  { id: 'si-ql2', topicId: 'social-influence', questionType: 'extended', question: 'Discuss situational and dispositional explanations for obedience.', markSchemeSummary: 'Situational: agentic state, legitimacy, proximity. Dispositional: Authoritarian Personality. AO1 + AO3.' },
  { id: 'ltc-ql1', topicId: 'language-thought-communication', questionType: 'short', question: 'Outline the Sapir-Whorf hypothesis.', markSchemeSummary: 'Language shapes thought. Linguistic relativity.' },
  { id: 'bn-ql1', topicId: 'brain-neuropsychology', questionType: 'short', question: 'Describe the function of Broca\'s area.', markSchemeSummary: 'Speech production. Left frontal lobe.' },
  { id: 'bn-ql2', topicId: 'brain-neuropsychology', questionType: 'outline', question: 'Outline synaptic transmission.', markSchemeSummary: 'Neurotransmitters cross synapse; excitation or inhibition.' },
  { id: 'pp-ql1', topicId: 'psychological-problems', questionType: 'short', question: 'Outline one explanation for depression.', markSchemeSummary: 'Beck: negative triad. Ellis: ABC. Biological: serotonin.' },
  { id: 'pp-ql2', topicId: 'psychological-problems', questionType: 'short', question: 'Describe one treatment for phobias.', markSchemeSummary: 'Systematic desensitisation or flooding. CBT.' },
  { id: 'mem-ql4', topicId: 'memory', questionType: 'outline', question: 'Outline the cognitive interview.', markSchemeSummary: 'Context reinstatement, report everything, reverse order, change perspective.' },
  { id: 'mem-ql5', topicId: 'memory', questionType: 'short', question: 'Explain retrieval failure as an explanation for forgetting.', markSchemeSummary: 'Absence of cues; encoding specificity.' },
  { id: 'per-ql2', topicId: 'perception', questionType: 'short', question: 'How do visual illusions support Gregory\'s theory?', markSchemeSummary: 'We use context; can be fooled; past experience affects interpretation.' },
  { id: 'dev-ql3', topicId: 'development', questionType: 'short', question: 'Outline Vygotsky\'s zone of proximal development.', markSchemeSummary: 'ZPD: what child can do with help. Scaffolding. Social learning.' },
  { id: 'rm-ql2', topicId: 'research-methods', questionType: 'short', question: 'Explain one ethical issue in psychological research.', markSchemeSummary: 'Informed consent, deception, right to withdraw, protection from harm.' },
  { id: 'rm-ql3', topicId: 'research-methods', questionType: 'outline', question: 'Outline the difference between independent groups and repeated measures design.', markSchemeSummary: 'Independent: different participants. Repeated: same participants. Pros and cons.' },
  { id: 'si-ql3', topicId: 'social-influence', questionType: 'short', question: 'Outline minority influence.', markSchemeSummary: 'Moscovici: consistent minority can influence. Consistency key.' },
  { id: 'si-ql4', topicId: 'social-influence', questionType: 'short', question: 'Explain one situational factor that affects obedience.', markSchemeSummary: 'Proximity, location, uniform, legitimacy of authority.' },
  { id: 'ltc-ql2', topicId: 'language-thought-communication', questionType: 'short', question: 'Describe non-verbal communication.', markSchemeSummary: 'Body language, facial expression, eye contact. Ekman: universal emotions.' },
  { id: 'bn-ql3', topicId: 'brain-neuropsychology', questionType: 'short', question: 'Explain brain plasticity.', markSchemeSummary: 'Brain reorganises; new pathways; recovery from damage.' },
  { id: 'pp-ql3', topicId: 'psychological-problems', questionType: 'outline', question: 'Outline the behavioural explanation of phobias.', markSchemeSummary: 'Classical conditioning: Watson & Rayner. Operant: avoidance reinforced.' },
  { id: 'pp-ql4', topicId: 'psychological-problems', questionType: 'short', question: 'Describe one treatment for depression.', markSchemeSummary: 'CBT: challenges negative triad. Drug therapy: SSRIs.' },
];

// ============================================================================
// EXPORTS & HELPERS
// ============================================================================

export const PSYCHOLOGY_CONCEPTS = CONCEPTS;
export const PSYCHOLOGY_KEY_STUDIES = KEY_STUDIES;
export const PSYCHOLOGY_KEY_TERMS = KEY_TERMS;
export const PSYCHOLOGY_QUICK_CHECKS = QUICK_CHECKS;
export const PSYCHOLOGY_STUDY_EVALUATOR = STUDY_EVALUATOR;
export const PSYCHOLOGY_ISSUES_DEBATES = ISSUES_DEBATES;
export const PSYCHOLOGY_RESEARCH_METHODS = RESEARCH_METHODS;
export const PSYCHOLOGY_QUESTION_LAB = QUESTION_LAB;

export function getConceptsForTopic(topicId: string): PsychologyConceptCard[] {
  return CONCEPTS.filter((c) => c.topicId === topicId);
}

export function getKeyStudiesForTopic(topicId: string): PsychologyKeyStudy[] {
  return KEY_STUDIES.filter((s) => s.topicId === topicId);
}

export function getKeyTermsForTopic(topicId: string): PsychologyKeyTerm[] {
  return KEY_TERMS.filter((t) => t.topicId === topicId);
}

/** Combined studies + terms for flashcard mode. */
export function getFlashcardItemsForTopic(topicId: string): Array<{ item: PsychologyKeyStudy | PsychologyKeyTerm; type: 'study' | 'term' }> {
  const studies = KEY_STUDIES.filter((s) => s.topicId === topicId).map((s) => ({ item: s, type: 'study' as const }));
  const terms = KEY_TERMS.filter((t) => t.topicId === topicId).map((t) => ({ item: t, type: 'term' as const }));
  return [...studies, ...terms];
}

export function getQuickChecksForTopic(topicId: string): PsychologyQuickCheckItem[] {
  return QUICK_CHECKS.filter((q) => q.topicId === topicId);
}

export function getStudyEvaluatorForTopic(topicId: string): PsychologyStudyEvaluatorPrompt[] {
  return STUDY_EVALUATOR.filter((s) => s.topicId === topicId);
}

export function getIssuesDebatesForTopic(topicId: string): PsychologyIssuesDebatesPrompt[] {
  return ISSUES_DEBATES.filter((i) => i.applyToTopicIds.includes(topicId as never));
}

export function getResearchMethodsTasks(type?: string): PsychologyResearchMethodsTask[] {
  if (type) return RESEARCH_METHODS.filter((r) => r.type === type);
  return RESEARCH_METHODS;
}

export function getQuestionLabForTopic(topicId: string): PsychologyQuestionLabItem[] {
  return QUESTION_LAB.filter((q) => q.topicId === topicId);
}

/**
 * Psychology Hub – AQA A-level Psychology 7182
 * Topics, concepts, key studies, quick check, study evaluator, issues & debates, research methods, question lab.
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
// TOPIC METADATA
// ============================================================================

export const PSYCHOLOGY_TOPICS: PsychologyTopicMeta[] = [
  // Paper 1
  { id: 'social-influence', title: 'Social influence', paper: 1, isCompulsory: true },
  { id: 'memory', title: 'Memory', paper: 1, isCompulsory: true },
  { id: 'attachment', title: 'Attachment', paper: 1, isCompulsory: true },
  { id: 'clinical', title: 'Clinical Psychology and Mental Health', paper: 1, isCompulsory: true },
  // Paper 2
  { id: 'approaches', title: 'Approaches in Psychology', paper: 2, isCompulsory: true },
  { id: 'biopsychology', title: 'Biopsychology', paper: 2, isCompulsory: true },
  { id: 'research-methods', title: 'Research methods', paper: 2, isCompulsory: true },
  // Paper 3
  { id: 'issues-debates', title: 'Issues and debates in Psychology', paper: 3, isCompulsory: true },
  // Option 1
  { id: 'relationships', title: 'Relationships', paper: 3, isCompulsory: false },
  { id: 'gender', title: 'Gender', paper: 3, isCompulsory: false },
  { id: 'cognition-development', title: 'Cognition and development', paper: 3, isCompulsory: false },
  // Option 2
  { id: 'schizophrenia', title: 'Schizophrenia', paper: 3, isCompulsory: false },
  { id: 'eating-behaviour', title: 'Eating behaviour', paper: 3, isCompulsory: false },
  { id: 'stress', title: 'Stress', paper: 3, isCompulsory: false },
  // Option 3
  { id: 'aggression', title: 'Aggression', paper: 3, isCompulsory: false },
  { id: 'forensic', title: 'Forensic Psychology', paper: 3, isCompulsory: false },
  { id: 'addiction', title: 'Addiction', paper: 3, isCompulsory: false },
];

export const OPTION1_TOPICS = PSYCHOLOGY_TOPICS.filter((t) => t.id === 'relationships' || t.id === 'gender' || t.id === 'cognition-development');
export const OPTION2_TOPICS = PSYCHOLOGY_TOPICS.filter((t) => t.id === 'schizophrenia' || t.id === 'eating-behaviour' || t.id === 'stress');
export const OPTION3_TOPICS = PSYCHOLOGY_TOPICS.filter((t) => t.id === 'aggression' || t.id === 'forensic' || t.id === 'addiction');

export function getPsychologyTopicsForSelection(selection: {
  option1: string;
  option2: string;
  option3: string;
}): PsychologyTopicMeta[] {
  const compulsory = PSYCHOLOGY_TOPICS.filter((t) => t.isCompulsory);
  const chosen = [
    PSYCHOLOGY_TOPICS.find((t) => t.id === selection.option1),
    PSYCHOLOGY_TOPICS.find((t) => t.id === selection.option2),
    PSYCHOLOGY_TOPICS.find((t) => t.id === selection.option3),
  ].filter(Boolean) as PsychologyTopicMeta[];
  return [...compulsory, ...chosen];
}

// ============================================================================
// CONCEPT CARDS
// ============================================================================

const CONCEPTS: PsychologyConceptCard[] = [
  // Social influence
  {
    id: 'si-c1',
    topicId: 'social-influence',
    title: 'Types of conformity',
    coreIdea: 'Conformity is yielding to group pressure. Internalisation: private and public acceptance. Compliance: public acceptance only, to gain approval.',
    keyStudies: 'Asch (1951, 1956) showed conformity varied with group size, unanimity, and task difficulty.',
    misconception: 'Conformity is always negative – it can help us learn (informational) or maintain social harmony (normative).',
  },
  {
    id: 'si-c2',
    topicId: 'social-influence',
    title: 'Obedience',
    coreIdea: 'Obedience is following orders from an authority figure. Milgram showed people obeyed even when it conflicted with conscience.',
    keyStudies: 'Milgram (1963): 65% gave 450V. Agentic state and legitimacy of authority explain obedience.',
    evaluationHook: 'Evaluate methodological and ethical issues in Milgram.',
  },
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
    title: 'Eyewitness testimony',
    coreIdea: 'Leading questions and post-event discussion can distort recall. Loftus & Palmer showed how wording affects estimates.',
    keyStudies: 'Cognitive interview (CIs) improves accuracy by reducing leading questions and using context reinstatement.',
  },
  // Attachment
  {
    id: 'att-c1',
    topicId: 'attachment',
    title: 'Bowlby\'s monotropic theory',
    coreIdea: 'Attachment is innate; infants have one primary attachment (mother); critical period; internal working model affects later relationships.',
    keyStudies: 'Lorenz (imprinting), Harlow (contact comfort), Ainsworth (Strange Situation).',
  },
  // Clinical
  {
    id: 'cl-c1',
    topicId: 'clinical',
    title: 'Phobias – two-process model',
    coreIdea: 'Acquired via classical conditioning (Watson & Rayner); maintained via operant conditioning (avoidance reduces anxiety).',
    keyStudies: 'Treatments: systematic desensitisation (gradual exposure + relaxation), flooding (immediate exposure).',
  },
  {
    id: 'cl-c2',
    topicId: 'clinical',
    title: 'Depression – cognitive approach',
    coreIdea: 'Beck: negative triad (self, world, future). Ellis: ABC model (Activating event, Beliefs, Consequences). CBT challenges irrational thoughts.',
  },
  // Approaches
  {
    id: 'app-c1',
    topicId: 'approaches',
    title: 'Behaviourist approach',
    coreIdea: 'Behaviour is learned. Classical conditioning (Pavlov): UCS + NS → UCR; NS becomes CS. Operant conditioning (Skinner): reinforcement increases behaviour.',
  },
  {
    id: 'app-c2',
    topicId: 'approaches',
    title: 'Cognitive approach',
    coreIdea: 'Mind processes information like a computer. Schema, models, inference. Rejected by biological approach for ignoring biology.',
  },
  // Biopsychology
  {
    id: 'bio-c1',
    topicId: 'biopsychology',
    title: 'Nervous system',
    coreIdea: 'Central (brain, spinal cord) and peripheral (somatic + autonomic). Synaptic transmission: neurotransmitters, excitation/inhibition.',
  },
  // Issues and debates
  {
    id: 'id-c1',
    topicId: 'issues-debates',
    title: 'Nature-nurture',
    coreIdea: 'Heredity vs environment. Interactionist approach: both interact. Diathesis-stress in schizophrenia.',
  },
  // Relationships (option)
  {
    id: 'rel-c1',
    topicId: 'relationships',
    title: 'Attraction',
    coreIdea: 'Self-disclosure, physical attractiveness, matching hypothesis, filter theory (social demography, attitudes, complementarity).',
  },
  // Schizophrenia (option)
  {
    id: 'sch-c1',
    topicId: 'schizophrenia',
    title: 'Diathesis-stress',
    coreIdea: 'Genetic vulnerability (diathesis) + stress trigger. Combines biological and psychological explanations.',
  },
  // Aggression (option)
  {
    id: 'agg-c1',
    topicId: 'aggression',
    title: 'Social learning theory',
    coreIdea: 'Bandura: aggression learned through observation, imitation, vicarious reinforcement. Deindividuation reduces inhibitions.',
  },
];

// ============================================================================
// KEY STUDIES (combined with key terms for flashcards)
// ============================================================================

const KEY_STUDIES: PsychologyKeyStudy[] = [
  { id: 'si-s1', topicId: 'social-influence', researcher: 'Asch (1951)', aim: 'To see if participants would conform to a clearly wrong answer.', procedure: 'Participants matched line lengths; confederates gave wrong answers.', findings: '75% conformed at least once. Conformity increased with group size (up to 3), unanimity mattered.', conclusion: 'Normative social influence – people conform to fit in.' },
  { id: 'si-s2', topicId: 'social-influence', researcher: 'Milgram (1963)', aim: 'To test obedience to authority when commands conflict with conscience.', procedure: 'Participants "shocked" a learner (confederate) for wrong answers. Experimenter in lab coat urged them to continue.', findings: '65% gave 450V. Proximity, location, uniform affected obedience.', conclusion: 'Situational factors (agentic state, legitimacy) explain obedience.' },
  { id: 'mem-s1', topicId: 'memory', researcher: 'Loftus & Palmer (1974)', aim: 'To see if leading questions affect eyewitness estimates.', procedure: 'Participants saw car crash; asked "how fast when they smashed/collided?"', findings: '"Smashed" → higher speed estimates, more "broken glass" (false memory).', conclusion: 'Leading questions distort eyewitness testimony.' },
  { id: 'att-s1', topicId: 'attachment', researcher: 'Lorenz (1935)', aim: 'To study imprinting in goslings.', procedure: 'Goslings exposed to Lorenz first; followed him instead of mother.', findings: 'Imprinting in critical period; irreversible.', conclusion: 'Biological basis for attachment.' },
  { id: 'att-s2', topicId: 'attachment', researcher: 'Harlow (1958)', aim: 'To test whether contact comfort or food matters more.', procedure: 'Monkey infants chose cloth mother over wire mother with food.', findings: 'Contact comfort more important than feeding.', conclusion: 'Challenges learning theory; supports Bowlby.' },
  { id: 'att-s3', topicId: 'attachment', researcher: 'Ainsworth (1971)', aim: 'To classify attachment types.', procedure: 'Strange Situation: mother leaves, stranger enters, reunion.', findings: 'Secure (B), insecure-avoidant (A), insecure-resistant (C).', conclusion: 'Internal working model predicts later behaviour.' },
  { id: 'app-s1', topicId: 'approaches', researcher: 'Pavlov (1927)', aim: 'To show classical conditioning in dogs.', procedure: 'Bell (NS) paired with food (UCS); dogs salivated to bell alone.', findings: 'NS became CS; CR = salivation.', conclusion: 'Associative learning underpins behaviour.' },
  { id: 'app-s2', topicId: 'approaches', researcher: 'Bandura (1961)', aim: 'To show social learning of aggression.', procedure: 'Children watched adult hitting Bobo doll; imitated when rewarded.', findings: 'Vicarious reinforcement increased imitation.', conclusion: 'Aggression can be learned through observation.' },
];

const KEY_TERMS: PsychologyKeyTerm[] = [
  { id: 'si-t1', topicId: 'social-influence', term: 'Informational social influence', definition: 'Conforming because we believe others are right (ambiguous situations).' },
  { id: 'si-t2', topicId: 'social-influence', term: 'Normative social influence', definition: 'Conforming to be liked or accepted by the group.' },
  { id: 'si-t3', topicId: 'social-influence', term: 'Agentic state', definition: 'Milgram: when we obey, we see ourselves as an agent of authority, not responsible.' },
  { id: 'si-t4', topicId: 'social-influence', term: 'Minority influence', definition: 'Influence of a small group through consistency, commitment, flexibility.' },
  { id: 'mem-t1', topicId: 'memory', term: 'Sensory register', definition: 'Brief store for sensory input; iconic (visual) and echoic (auditory).' },
  { id: 'mem-t2', topicId: 'memory', term: 'Working memory model', definition: 'Baddeley & Hitch: central executive, phonological loop, visuo-spatial sketchpad, episodic buffer.' },
  { id: 'mem-t3', topicId: 'memory', term: 'Retrieval failure', definition: 'Forgetting due to absence of cues (encoding specificity).' },
  { id: 'att-t1', topicId: 'attachment', term: 'Internal working model', definition: 'Mental model of relationships formed from primary attachment; affects later relationships.' },
  { id: 'att-t2', topicId: 'attachment', term: 'Strange Situation', definition: 'Ainsworth\'s procedure to classify attachment types (secure, avoidant, resistant).' },
  { id: 'cl-t1', topicId: 'clinical', term: 'Two-process model', definition: 'Phobias: acquired (classical) + maintained (operant).' },
  { id: 'cl-t2', topicId: 'clinical', term: 'CBT', definition: 'Cognitive Behaviour Therapy – challenges irrational thoughts (Beck, Ellis).' },
  { id: 'app-t1', topicId: 'approaches', term: 'Classical conditioning', definition: 'Learning by association; Pavlov.' },
  { id: 'app-t2', topicId: 'approaches', term: 'Operant conditioning', definition: 'Learning by consequences; Skinner.' },
  { id: 'bio-t1', topicId: 'biopsychology', term: 'Synaptic transmission', definition: 'Neurotransmitters cross synapse; excitation or inhibition.' },
  { id: 'bio-t2', topicId: 'biopsychology', term: 'Fight or flight', definition: 'Sympathomedullary pathway; adrenaline; adaptive response.' },
  { id: 'rm-t1', topicId: 'research-methods', term: 'IV', definition: 'Independent variable – manipulated by researcher.' },
  { id: 'rm-t2', topicId: 'research-methods', term: 'DV', definition: 'Dependent variable – measured outcome.' },
  { id: 'rm-t3', topicId: 'research-methods', term: 'Extraneous variable', definition: 'Variable that could affect DV; should be controlled.' },
  { id: 'rel-t1', topicId: 'relationships', term: 'Self-disclosure', definition: 'Revealing personal information; increases attraction (reciprocity).' },
  { id: 'sch-t1', topicId: 'schizophrenia', term: 'Positive symptoms', definition: 'Added experiences: hallucinations, delusions.' },
  { id: 'sch-t2', topicId: 'schizophrenia', term: 'Negative symptoms', definition: 'Loss: speech poverty, avolition.' },
  { id: 'agg-t1', topicId: 'aggression', term: 'Deindividuation', definition: 'Loss of individual identity in a group; reduces inhibitions.' },
];

// ============================================================================
// QUICK CHECK
// ============================================================================

const QUICK_CHECKS: PsychologyQuickCheckItem[] = [
  { id: 'si-qc1', topicId: 'social-influence', type: 'multipleChoice', question: 'What type of conformity involves both private and public acceptance?', options: ['Compliance', 'Internalisation', 'Identification', 'Normative'], correctAnswer: 'Internalisation', feedback: { correct: 'Correct.', incorrect: 'Internalisation – you believe the group is right.' } },
  { id: 'si-qc2', topicId: 'social-influence', type: 'shortAnswer', question: 'Who conducted the obedience study with electric shocks?', correctAnswer: 'Milgram', feedback: { correct: 'Correct.', incorrect: 'Stanley Milgram (1963).' } },
  { id: 'si-qc3', topicId: 'social-influence', type: 'trueFalse', question: 'Asch found that unanimity increased conformity.', correctAnswer: 'false', feedback: { correct: 'Correct – when one confederate disagreed, conformity dropped.', incorrect: 'Unanimity increased conformity; dissent reduced it.' } },
  { id: 'mem-qc1', topicId: 'memory', type: 'multipleChoice', question: 'What is the capacity of short-term memory (Miller)?', options: ['5±2', '7±2', '9±2', 'Unlimited'], correctAnswer: '7±2', feedback: { correct: 'Correct.', incorrect: 'Miller: 7±2 items (chunks).' } },
  { id: 'mem-qc2', topicId: 'memory', type: 'shortAnswer', question: 'Which part of the working memory model deals with visual and spatial information?', correctAnswer: 'Visuo-spatial sketchpad', feedback: { correct: 'Correct.', incorrect: 'Visuo-spatial sketchpad.' } },
  { id: 'att-qc1', topicId: 'attachment', type: 'multipleChoice', question: 'Who developed the Strange Situation?', options: ['Bowlby', 'Lorenz', 'Ainsworth', 'Harlow'], correctAnswer: 'Ainsworth', feedback: { correct: 'Correct.', incorrect: 'Mary Ainsworth (1971).' } },
  { id: 'cl-qc1', topicId: 'clinical', type: 'multipleChoice', question: 'Which therapy uses gradual exposure and relaxation for phobias?', options: ['Flooding', 'CBT', 'Systematic desensitisation', 'Drug therapy'], correctAnswer: 'Systematic desensitisation', feedback: { correct: 'Correct.', incorrect: 'Systematic desensitisation – hierarchy + relaxation.' } },
  { id: 'app-qc1', topicId: 'approaches', type: 'shortAnswer', question: 'Who studied classical conditioning in dogs?', correctAnswer: 'Pavlov', feedback: { correct: 'Correct.', incorrect: 'Ivan Pavlov.' } },
  { id: 'bio-qc1', topicId: 'biopsychology', type: 'trueFalse', question: 'The autonomic nervous system controls voluntary movement.', correctAnswer: 'false', feedback: { correct: 'Correct – somatic controls voluntary; autonomic is involuntary.', incorrect: 'Autonomic = involuntary (e.g. heart rate); somatic = voluntary.' } },
  { id: 'rm-qc1', topicId: 'research-methods', type: 'multipleChoice', question: 'Which sampling method gives everyone an equal chance?', options: ['Opportunity', 'Volunteer', 'Random', 'Stratified'], correctAnswer: 'Random', feedback: { correct: 'Correct.', incorrect: 'Random sampling – all have equal chance.' } },
  { id: 'id-qc1', topicId: 'issues-debates', type: 'shortAnswer', question: 'What debate concerns heredity vs environment?', correctAnswer: 'Nature-nurture', feedback: { correct: 'Correct.', incorrect: 'Nature-nurture debate.' } },
];

// ============================================================================
// STUDY EVALUATOR
// ============================================================================

const STUDY_EVALUATOR: PsychologyStudyEvaluatorPrompt[] = [
  { id: 'si-se1', topicId: 'social-influence', prompt: 'Evaluate Milgram\'s obedience study in terms of strengths and limitations.', modelAnswer: 'Strengths: High internal validity (controlled), replicated cross-culturally. Limitations: Ethical issues (deception, distress), low ecological validity (lab), demand characteristics possible.' },
  { id: 'mem-se1', topicId: 'memory', prompt: 'Evaluate the working memory model.', modelAnswer: 'Strengths: Explains dual-task performance; evidence from brain imaging. Limitations: Central executive vague; may be oversimplified.' },
  { id: 'att-se1', topicId: 'attachment', prompt: 'Evaluate Bowlby\'s theory of maternal deprivation.', modelAnswer: 'Strengths: Supported by ERA study (institutionalisation effects). Limitations: Critical period may be sensitive period; retrospective data.' },
  { id: 'cl-se1', topicId: 'clinical', prompt: 'Evaluate the behavioural approach to treating phobias.', modelAnswer: 'Strengths: Systematic desensitisation effective; quick. Limitations: Doesn\'t address root cause; flooding can be distressing.' },
  { id: 'app-se1', topicId: 'approaches', prompt: 'Compare the behaviourist and cognitive approaches.', modelAnswer: 'Behaviourist: Observable behaviour only; nurture; determinism. Cognitive: Mental processes; information processing; soft determinism. Both use scientific method; cognitive gives more complete picture.' },
];

// ============================================================================
// ISSUES AND DEBATES
// ============================================================================

const ISSUES_DEBATES: PsychologyIssuesDebatesPrompt[] = [
  { id: 'id-id1', issueId: 'nature-nurture', prompt: 'Discuss the nature-nurture debate in relation to attachment.', modelAnswer: 'Nature: Bowlby – innate, critical period; Lorenz imprinting. Nurture: Learning theory – reinforcement. Interactionist: Diathesis-stress; genes + environment.', applyToTopicIds: ['attachment'] },
  { id: 'id-id2', issueId: 'freewill-determinism', prompt: 'How does determinism apply to the behaviourist approach?', modelAnswer: 'Environmental determinism – behaviour determined by reinforcement history. No free will; we are products of our environment.', applyToTopicIds: ['approaches'] },
  { id: 'id-id3', issueId: 'gender-culture', prompt: 'Discuss cultural bias in attachment research.', modelAnswer: 'Ainsworth\'s Strange Situation may be culturally specific (individualist). Van Ijzendoorn found variations. Ethnocentrism – Western norms applied.', applyToTopicIds: ['attachment'] },
];

// ============================================================================
// RESEARCH METHODS
// ============================================================================

const RESEARCH_METHODS: PsychologyResearchMethodsTask[] = [
  { id: 'rm-1', type: 'design', scenario: 'A researcher wants to test whether noise affects memory recall.', question: 'Identify the IV and DV, and suggest how to operationalise them.', expectedAnswer: 'IV: noise level (quiet vs loud). DV: memory recall (e.g. number of words recalled). Operationalise: noise in dB; recall from word list.' },
  { id: 'rm-2', type: 'method', scenario: 'Studying aggression in playground.', question: 'Which method would be most appropriate and why?', expectedAnswer: 'Naturalistic observation – see real behaviour; covert to avoid demand characteristics. Need behavioural categories and time/event sampling.' },
  { id: 'rm-3', type: 'data', scenario: 'Scores: 5, 7, 7, 8, 9.', question: 'Calculate the mean, median, and mode.', expectedAnswer: 'Mean: 7.2. Median: 7. Mode: 7.' },
  { id: 'rm-4', type: 'inferential', scenario: 'Repeated measures, ordinal data, testing difference.', question: 'Which statistical test?', expectedAnswer: 'Wilcoxon signed ranks test.' },
];

// ============================================================================
// QUESTION LAB
// ============================================================================

const QUESTION_LAB: PsychologyQuestionLabItem[] = [
  { id: 'si-ql1', topicId: 'social-influence', questionType: 'short', question: 'Outline one explanation for conformity.', markSchemeSummary: 'Informational or normative; 2 marks for basic, 4 for developed.' },
  { id: 'si-ql2', topicId: 'social-influence', questionType: 'extended', question: 'Discuss situational and dispositional explanations for obedience.', markSchemeSummary: 'Situational: agentic state, legitimacy, proximity, etc. Dispositional: Authoritarian Personality. AO1 + AO3.' },
  { id: 'mem-ql1', topicId: 'memory', questionType: 'short', question: 'Describe the capacity and duration of short-term memory.', markSchemeSummary: 'Capacity: 7±2. Duration: ~18-30 seconds.' },
  { id: 'att-ql1', topicId: 'attachment', questionType: 'outline', question: 'Outline Bowlby\'s theory of attachment.', markSchemeSummary: 'Monotropic, critical period, internal working model.' },
  { id: 'cl-ql1', topicId: 'clinical', questionType: 'discuss', question: 'Discuss the behavioural approach to explaining phobias.', markSchemeSummary: 'Two-process: classical + operant. Strengths/limitations.' },
  { id: 'app-ql1', topicId: 'approaches', questionType: 'extended', question: 'Compare two approaches in Psychology.', markSchemeSummary: 'E.g. behaviourist vs cognitive; knowledge + evaluation.' },
  { id: 'rel-ql1', topicId: 'relationships', questionType: 'short', question: 'Outline one factor affecting attraction.', markSchemeSummary: 'Self-disclosure, physical attractiveness, matching hypothesis, filter theory.' },
  { id: 'sch-ql1', topicId: 'schizophrenia', questionType: 'discuss', question: 'Discuss biological explanations for schizophrenia.', markSchemeSummary: 'Genetics, dopamine hypothesis; evaluate.' },
  { id: 'agg-ql1', topicId: 'aggression', questionType: 'outline', question: 'Outline social learning theory as applied to aggression.', markSchemeSummary: 'Observation, imitation, vicarious reinforcement; Bandura.' },
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

export function getConceptsForTopic(topicId: string, partId?: string): PsychologyConceptCard[] {
  return CONCEPTS.filter((c) => c.topicId === topicId);
}

export function getKeyStudiesForTopic(topicId: string): PsychologyKeyStudy[] {
  return KEY_STUDIES.filter((s) => s.topicId === topicId);
}

export function getKeyTermsForTopic(topicId: string): PsychologyKeyTerm[] {
  return KEY_TERMS.filter((t) => t.topicId === topicId);
}

/** Combined studies + terms for flashcard mode. Studies have researcher/aim/procedure/findings; terms have term/definition. */
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

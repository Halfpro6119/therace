/**
 * Science Lab – data structures for Biology, Chemistry, Physics (GCSE)
 * Sample data following the Golden Prompt structure
 */

import type {
  ScienceSubject,
  ScienceConcept,
  ScienceQuestion,
  SciencePractical,
  ScienceEquation,
  ScienceMisconception,
  QuestionType,
  SciencePaper,
  ScienceTier,
  MethodMarkBreakdown,
  PracticalQuizQuestion,
} from '../types/scienceLab';

// ============================================================================
// BIOLOGY CONCEPTS - Paper 1 & Paper 2 (AQA GCSE)
// ============================================================================

export const SCIENCE_CONCEPTS: ScienceConcept[] = [
  // ========== PAPER 1: CELL BIOLOGY ==========
  {
    id: 'bio-diffusion',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Diffusion is the net movement of particles from an area of high concentration to low concentration down a concentration gradient, due to random particle movement.',
    flashcardPrompt: 'What is diffusion and in which direction do particles move?',
    visualModel: {
      type: 'cell',
      description: 'Particle diagram showing high concentration → random movement → net movement → equilibrium',
      diagramId: 'cell_membrane_diffusion',
    },
    commonMisconception: 'Particles want to spread out or choose to move.',
    changeScenarios: [
      {
        prompt: 'What happens to diffusion rate if temperature increases?',
        explanation: 'Particles gain kinetic energy → move faster → more collisions per second → faster net movement → increased diffusion rate',
        visual: { diagramId: 'diffusion_rate_temperature_graph', description: 'Diffusion rate vs temperature' },
      },
      {
        prompt: 'What happens to diffusion rate if surface area increases?',
        explanation: 'More area for particles to cross → more particles can diffuse simultaneously → faster overall rate',
        visual: { diagramId: 'cell_membrane_diffusion', description: 'More membrane area for diffusion' },
      },
      {
        prompt: 'What happens to diffusion rate if membrane thickness increases?',
        explanation: 'Longer distance to travel → particles take longer to cross → slower diffusion rate',
        visual: { diagramId: 'cell_membrane_diffusion', description: 'Membrane thickness affects diffusion distance' },
      },
    ],
  },
  {
    id: 'bio-osmosis',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Osmosis is the net movement of water molecules from a dilute solution (high water concentration) to a concentrated solution (low water concentration) through a partially permeable membrane.',
    flashcardPrompt: 'What is osmosis and how does water move across a partially permeable membrane?',
    visualModel: {
      type: 'cell',
      description: 'Water molecules moving through membrane: dilute solution → concentrated solution until equilibrium',
      diagramId: 'osmosis_diagram',
    },
    commonMisconception: 'Water moves to where there is less water (confusing water concentration with solute concentration).',
    changeScenarios: [
      {
        prompt: 'What happens to a plant cell in pure water?',
        explanation: 'Pure water has higher water concentration than cell cytoplasm → water enters by osmosis → cell swells → becomes turgid',
        visual: { diagramId: 'osmosis_diagram', description: 'Water enters cell by osmosis' },
      },
      {
        prompt: 'What happens to a plant cell in concentrated salt solution?',
        explanation: 'Salt solution has lower water concentration than cytoplasm → water leaves by osmosis → cell shrinks → becomes plasmolysed',
        visual: { diagramId: 'osmosis_diagram', description: 'Water leaves cell in concentrated solution' },
      },
    ],
  },
  {
    id: 'bio-active-transport',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Active transport moves substances from low to high concentration against the concentration gradient, requiring energy from respiration.',
    flashcardPrompt: 'How does active transport differ from diffusion, and where does the energy come from?',
    visualModel: {
      type: 'cell',
      description: 'Carrier proteins using ATP to pump molecules against concentration gradient',
      diagramId: 'active_transport',
    },
    commonMisconception: 'Active transport is just faster diffusion.',
    changeScenarios: [
      {
        prompt: 'Active transport needs ATP from respiration. In a cell, what happens if respiration is inhibited?',
        explanation: 'No ATP produced → carrier proteins cannot function → active transport stops → substances accumulate where concentration is already high',
        visual: { diagramId: 'active_transport', description: 'ATP required for active transport' },
      },
    ],
  },
  {
    id: 'bio-cell-division',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Mitosis produces genetically identical cells for growth and repair. Meiosis produces genetically different gametes with half the chromosome number.',
    flashcardPrompt: 'What is the difference between mitosis and meiosis, and what is each used for?',
    visualModel: {
      type: 'cell',
      description: 'Mitosis: one cell → two identical cells. Meiosis: one cell → four different gametes',
      diagramId: 'cell_division',
    },
    commonMisconception: 'Mitosis and meiosis are the same process.',
    changeScenarios: [
      {
        prompt: 'What happens if mitosis goes wrong?',
        explanation: 'Mutations in DNA → daughter cells have different genetic material → can lead to cancer or developmental issues',
        visual: { diagramId: 'cell_division', description: 'Mitosis produces identical cells' },
      },
    ],
  },
  
  // ========== PAPER 1: ORGANISATION ==========
  {
    id: 'bio-enzyme-action',
    subject: 'Biology',
    topic: 'Organisation',
    coreIdea: 'Enzymes are biological catalysts that speed up reactions by lowering activation energy. They have an active site that binds to specific substrates.',
    flashcardPrompt: 'How do enzymes speed up reactions, and what is the role of the active site?',
    visualModel: {
      type: 'diagram',
      description: 'Lock-and-key model: substrate fits active site → enzyme-substrate complex → products released → enzyme unchanged',
      diagramId: 'enzyme_action',
    },
    commonMisconception: 'Enzymes are used up in reactions or make reactions happen that wouldn\'t otherwise.',
    changeScenarios: [
      {
        prompt: 'What happens to enzyme activity if temperature increases above optimum?',
        explanation: 'High temperature → bonds break → active site changes shape → substrate no longer fits → enzyme denatured → activity decreases',
        visual: { diagramId: 'enzyme_activity_temperature_graph', description: 'Enzyme activity vs temperature' },
      },
      {
        prompt: 'What happens to enzyme activity if pH changes?',
        explanation: 'pH affects hydrogen bonds → active site shape changes → substrate binding affected → activity decreases',
        visual: { diagramId: 'enzyme_activity_ph_graph', description: 'Enzyme activity vs pH' },
      },
    ],
  },
  {
    id: 'bio-digestive-system',
    subject: 'Biology',
    topic: 'Organisation',
    coreIdea: 'The digestive system breaks down large insoluble molecules into small soluble molecules that can be absorbed into the blood.',
    flashcardPrompt: 'What does the digestive system do to food molecules before they can be absorbed?',
    visualModel: {
      type: 'flow',
      description: 'Food → mouth (mechanical) → stomach (acid + enzymes) → small intestine (enzymes + absorption) → large intestine (water absorption)',
      diagramId: 'digestive_system',
    },
    commonMisconception: 'Digestion happens in one place or food is just broken into smaller pieces.',
    changeScenarios: [
      {
        prompt: 'What happens if bile is not produced?',
        explanation: 'No bile → fats not emulsified → smaller surface area → lipase cannot access fats efficiently → fat digestion impaired',
        visual: { diagramId: 'digestive_system', description: 'Digestive tract and bile' },
      },
    ],
  },
  {
    id: 'bio-circulatory-system',
    subject: 'Biology',
    topic: 'Organisation',
    coreIdea: 'The circulatory system transports substances around the body. The heart pumps blood through arteries (away), capillaries (exchange), and veins (back).',
    flashcardPrompt: 'What are the roles of arteries, capillaries, and veins in the circulatory system?',
    visualModel: {
      type: 'flow',
      description: 'Heart → arteries → capillaries (exchange) → veins → heart',
      diagramId: 'circulatory_system',
    },
    commonMisconception: 'Arteries always carry oxygenated blood (ignoring pulmonary artery).',
    changeScenarios: [
      {
        prompt: 'What happens if heart rate increases?',
        explanation: 'More beats per minute → more blood pumped → more oxygen delivered to muscles → more carbon dioxide removed',
        visual: { diagramId: 'circulatory_system', description: 'Heart pumps blood through vessels' },
      },
    ],
  },
  
  // ========== PAPER 1: INFECTION AND RESPONSE ==========
  {
    id: 'bio-pathogens',
    subject: 'Biology',
    topic: 'Infection and Response',
    coreIdea: 'Pathogens are microorganisms that cause disease. They reproduce rapidly inside the body, producing toxins or damaging cells.',
    flashcardPrompt: 'What are pathogens and how do they cause disease?',
    visualModel: {
      type: 'cell',
      description: 'Pathogen enters body → reproduces → produces toxins/damages cells → symptoms appear',
      diagramId: 'pathogen_infection',
    },
    commonMisconception: 'All microorganisms are harmful or bacteria and viruses are the same.',
    changeScenarios: [
      {
        prompt: 'What happens if a pathogen mutates?',
        explanation: 'Mutation → different surface proteins → immune system doesn\'t recognize it → can cause new disease or evade vaccines',
        visual: { diagramId: 'pathogen_infection', description: 'Pathogen entry and replication' },
      },
    ],
  },
  {
    id: 'bio-immune-system',
    subject: 'Biology',
    topic: 'Infection and Response',
    coreIdea: 'The immune system produces antibodies that bind to specific antigens on pathogens, marking them for destruction by white blood cells.',
    flashcardPrompt: 'How do antibodies and antigens work together in the immune response?',
    visualModel: {
      type: 'cell',
      description: 'Pathogen detected → white blood cells produce antibodies → antibodies bind to antigens → pathogen destroyed',
      diagramId: 'immune_response',
    },
    commonMisconception: 'Antibodies kill pathogens directly or immunity is permanent.',
    changeScenarios: [
      {
        prompt: 'What happens on second exposure to the same pathogen?',
        explanation: 'Memory cells recognize pathogen → faster antibody production → higher antibody concentration → pathogen destroyed before symptoms',
        visual: { diagramId: 'immune_response', description: 'Antibodies bind to antigens' },
      },
    ],
  },
  
  // ========== PAPER 1: BIOENERGETICS ==========
  {
    id: 'bio-photosynthesis',
    subject: 'Biology',
    topic: 'Bioenergetics',
    coreIdea: 'Photosynthesis converts light energy into chemical energy stored in glucose. Carbon dioxide + water → glucose + oxygen (in presence of light and chlorophyll).',
    flashcardPrompt: 'What are the reactants and products of photosynthesis, and what is the role of chlorophyll?',
    visualModel: {
      type: 'flow',
      description: 'Reactants: CO₂ + H₂O + light. Products: glucose + O₂. Chlorophyll (in chloroplasts) absorbs light energy for the reaction.',
      diagramId: 'photosynthesis',
    },
    commonMisconception: 'Plants get food from soil, light is a substance, or chlorophyll makes glucose.',
    changeScenarios: [
      {
        prompt: 'What happens to photosynthesis rate if light intensity increases?',
        explanation: 'More light energy → more reactions in chloroplasts → more glucose produced → rate increases until another factor becomes limiting',
        visual: { diagramId: 'photosynthesis_light_graph', description: 'Light intensity vs rate of photosynthesis' },
      },
      {
        prompt: 'What happens to photosynthesis rate if carbon dioxide concentration increases?',
        explanation: 'More CO₂ available → more reactions can occur → more glucose produced → rate increases until light or temperature becomes limiting',
        visual: { diagramId: 'photosynthesis_co2_graph', description: 'Rate of photosynthesis vs carbon dioxide concentration' },
      },
      {
        prompt: 'What happens to photosynthesis rate if temperature increases?',
        explanation: 'Higher temperature → enzymes work faster → rate increases → but above optimum, enzymes denature → rate decreases',
        visual: { diagramId: 'photosynthesis_temperature_graph', description: 'Rate of photosynthesis vs temperature' },
      },
    ],
  },
  {
    id: 'bio-respiration',
    subject: 'Biology',
    topic: 'Bioenergetics',
    coreIdea: 'Respiration releases energy from glucose for cellular processes. Aerobic respiration requires oxygen and produces more ATP than anaerobic.',
    flashcardPrompt: 'What is the difference between aerobic and anaerobic respiration, and which produces more energy?',
    visualModel: {
      type: 'flow',
      description: 'Glucose + oxygen → carbon dioxide + water + ATP (aerobic) OR Glucose → lactic acid + ATP (anaerobic)',
      diagramId: 'respiration',
    },
    commonMisconception: 'Respiration is breathing or only happens in lungs.',
    changeScenarios: [
      {
        prompt: 'What happens during intense exercise?',
        explanation: 'Oxygen demand exceeds supply → cells switch to anaerobic respiration → lactic acid builds up → oxygen debt created',
        visual: { diagramId: 'respiration', description: 'Aerobic and anaerobic respiration' },
      },
    ],
  },
  
  // ========== PAPER 2: HOMEOSTASIS AND RESPONSE ==========
  {
    id: 'bio-homeostasis',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    coreIdea: 'Homeostasis maintains constant internal conditions. Negative feedback detects changes and triggers responses to return to set point.',
    flashcardPrompt: 'What is homeostasis and how does negative feedback help maintain it?',
    visualModel: {
      type: 'flow',
      description: 'Stimulus → receptor → coordination centre → effector → response → return to normal',
      diagramId: 'homeostasis',
    },
    commonMisconception: 'Homeostasis keeps everything constant all the time (ignoring dynamic equilibrium).',
    changeScenarios: [
      {
        prompt: 'What happens if blood glucose rises?',
        explanation: 'Pancreas detects increase → releases insulin → liver and muscles take up glucose → blood glucose decreases → returns to normal',
        visual: { diagramId: 'homeostasis', description: 'Negative feedback loop' },
      },
    ],
  },
  {
    id: 'bio-nervous-system',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    coreIdea: 'The nervous system uses electrical impulses for rapid responses. Stimulus → receptor → sensory neurone → CNS → motor neurone → effector → response.',
    flashcardPrompt: 'Describe the pathway of a nervous response from stimulus to response.',
    visualModel: {
      type: 'flow',
      description: 'Stimulus → sensory neurone → CNS → motor neurone → effector → response',
      diagramId: 'nervous_system',
    },
    commonMisconception: 'Nerves carry messages to the brain only (ignoring reflexes).',
    changeScenarios: [
      {
        prompt: 'What happens in a reflex arc?',
        explanation: 'Stimulus detected → sensory neurone → relay neurone in spinal cord → motor neurone → effector → rapid response without brain',
        visual: { diagramId: 'nervous_system', description: 'Stimulus → receptor → CNS → effector' },
      },
    ],
  },
  {
    id: 'bio-hormones',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    coreIdea: 'Hormones are chemical messengers produced by endocrine glands, transported in blood, and act on target organs with slower but longer-lasting effects than nerves.',
    flashcardPrompt: 'How are hormones different from nerve impulses in speed and how they travel?',
    visualModel: {
      type: 'flow',
      description: 'Gland produces hormone → released into blood → travels to target organ → binds to receptors → response',
      diagramId: 'hormone_action',
    },
    commonMisconception: 'Hormones and nerves work the same way or hormones are faster than nerves.',
    changeScenarios: [
      {
        prompt: 'What happens if insulin is not produced?',
        explanation: 'No insulin → glucose not taken up by cells → blood glucose stays high → diabetes symptoms appear',
        visual: { diagramId: 'hormone_action', description: 'Gland → hormone → target organ' },
      },
    ],
  },
  
  // ========== PAPER 2: INHERITANCE, VARIATION AND EVOLUTION ==========
  {
    id: 'bio-dna-genes',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    coreIdea: 'DNA contains genes that code for proteins. Genes are sections of DNA that determine characteristics. Chromosomes are long molecules of DNA.',
    flashcardPrompt: 'What is the relationship between DNA, genes, chromosomes, and proteins?',
    visualModel: {
      type: 'cell',
      description: 'Nucleus → chromosomes → DNA → genes → proteins → characteristics',
      diagramId: 'dna_structure',
    },
    commonMisconception: 'Genes and chromosomes are the same thing or DNA is only in humans.',
    changeScenarios: [
      {
        prompt: 'What happens if a gene mutates?',
        explanation: 'DNA sequence changes → different protein produced → may change characteristic → may be harmful, beneficial, or neutral',
      },
    ],
  },
  {
    id: 'bio-inheritance',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    coreIdea: 'Offspring inherit alleles from both parents. Dominant alleles are expressed if present; recessive alleles only expressed if homozygous.',
    flashcardPrompt: 'How do you predict the phenotype ratio when both parents are heterozygous for a characteristic? What do dominant and recessive mean?',
    visualModel: {
      type: 'diagram',
      description: 'Parent genotypes → gametes → offspring genotypes → phenotypes',
      diagramId: 'genetic_inheritance',
    },
    commonMisconception: 'Dominant means common or stronger, or children always look like one parent.',
    changeScenarios: [
      {
        prompt: 'What happens if both parents are heterozygous for a recessive disorder?',
        explanation: 'Each parent has one recessive allele → 25% chance offspring is homozygous recessive → disorder expressed',
      },
    ],
  },
  {
    id: 'bio-evolution',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    coreIdea: 'Evolution occurs by natural selection: variation exists → environmental pressure → advantageous characteristics survive → reproduce → pass on alleles → population changes.',
    flashcardPrompt: 'What are the steps of natural selection, and why does evolution happen in populations rather than individuals?',
    visualModel: {
      type: 'flow',
      description: 'Variation → selection pressure → survival of fittest → reproduction → allele frequency changes → evolution',
      diagramId: 'natural_selection',
    },
    commonMisconception: 'Evolution is organisms adapting or trying to evolve, or it happens to individuals.',
    changeScenarios: [
      {
        prompt: 'What happens if selection pressure changes?',
        explanation: 'Different characteristics become advantageous → different individuals survive → different alleles passed on → population evolves in new direction',
      },
    ],
  },
  
  // ========== PAPER 2: ECOLOGY ==========
  {
    id: 'bio-ecosystems',
    subject: 'Biology',
    topic: 'Ecology',
    coreIdea: 'Ecosystems contain communities of organisms and their environment. Energy flows through food chains; materials cycle through ecosystems.',
    flashcardPrompt: 'How does energy flow through an ecosystem compared to how materials move?',
    visualModel: {
      type: 'foodChain',
      description: 'Producer → primary consumer → secondary consumer → decomposers (energy decreases, materials cycle)',
      diagramId: 'ecosystem',
    },
    commonMisconception: 'Energy is recycled or all energy is transferred between trophic levels.',
    changeScenarios: [
      {
        prompt: 'What happens if a top predator is removed?',
        explanation: 'Prey population increases → overgrazing → plant population decreases → ecosystem imbalance',
      },
    ],
  },
  {
    id: 'bio-carbon-cycle',
    subject: 'Biology',
    topic: 'Ecology',
    coreIdea: 'Carbon cycles through ecosystems: CO₂ in atmosphere → photosynthesis → carbon in plants → consumption → respiration/decomposition → CO₂ released.',
    flashcardPrompt: 'Describe the main steps of the carbon cycle.',
    visualModel: {
      type: 'flow',
      description: 'Atmosphere CO₂ → plants (photosynthesis) → animals (consumption) → respiration/decomposition → CO₂ back to atmosphere',
      diagramId: 'carbon_cycle',
    },
    commonMisconception: 'Carbon is created or destroyed, or it only moves one way.',
    changeScenarios: [
      {
        prompt: 'What happens if deforestation increases?',
        explanation: 'Fewer trees → less photosynthesis → less CO₂ removed → more CO₂ in atmosphere → enhanced greenhouse effect',
      },
    ],
  },
  
  // ========== CHEMISTRY & PHYSICS (keeping existing) ==========
  {
    id: 'bio-energy-transfer',
    subject: 'Biology',
    topic: 'Energy stores and transfers',
    coreIdea: 'Energy is transferred between stores, not created or destroyed.',
    flashcardPrompt: 'What happens to energy when it is transferred between stores in an organism?',
    visualModel: {
      type: 'energy',
      description: 'Sankey diagram showing energy transfer from food to movement, growth, and waste heat',
      diagramId: 'energy_profile',
    },
    commonMisconception: 'Energy is used up or destroyed.',
    changeScenarios: [
      {
        prompt: 'What happens to rate of reaction if temperature increases?',
        explanation: 'Particles move faster → collision frequency increases → more successful collisions per second',
      },
    ],
  },
  // Stretch concept (Grade 9) — Implementation plan
  {
    id: 'bio-bioaccumulation',
    subject: 'Biology',
    topic: 'Ecology',
    coreIdea: 'Bioaccumulation is the build-up of toxins in an organism over time. Biomagnification is the increase in toxin concentration up the food chain, as each trophic level consumes many organisms from the level below.',
    flashcardPrompt: 'What is the difference between bioaccumulation and biomagnification?',
    visualModel: {
      type: 'flow',
      description: 'Food chain: plankton (low toxin) → small fish (more) → large fish (more) → predator (highest). Toxin concentration increases at each level.',
      diagramId: 'ecosystem',
    },
    commonMisconception: 'Toxins are diluted as they move up the food chain (actually they concentrate).',
    changeScenarios: [
      {
        prompt: 'Why might a top predator have dangerous levels of a toxin even if the toxin is only present in tiny amounts in the environment?',
        explanation: 'Each consumer eats many organisms; toxins are stored in fat and not excreted; concentration builds up at each trophic level (biomagnification).',
      },
    ],
  },
  // Stretch: Cell differentiation and stem cells (Grade 9)
  {
    id: 'bio-stem-cells',
    subject: 'Biology',
    topic: 'Cell Biology',
    coreIdea: 'Stem cells are undifferentiated cells that can divide to produce more stem cells or differentiate into specialised cells. Embryonic stem cells can become any cell type; adult stem cells are more limited.',
    flashcardPrompt: 'What are stem cells and how do embryonic and adult stem cells differ?',
    visualModel: {
      type: 'flow',
      description: 'Stem cell → mitosis → more stem cells OR differentiation → specialised cell (e.g. nerve, muscle, blood)',
      diagramId: 'stem_cell_differentiation',
    },
    commonMisconception: 'All stem cells can become any cell type.',
    changeScenarios: [
      {
        prompt: 'Why might embryonic stem cells be more useful for treating disease than adult stem cells?',
        explanation: 'Embryonic stem cells are pluripotent—can differentiate into any cell type. Adult stem cells are multipotent—limited to certain cell types in their tissue.',
      },
    ],
  },
  // Stretch: Monoclonal antibodies (Grade 9)
  {
    id: 'bio-monoclonal-antibodies',
    subject: 'Biology',
    topic: 'Infection and Response',
    coreIdea: 'Monoclonal antibodies are identical antibodies produced from a single clone of cells. They bind to specific antigens and are used in pregnancy tests, cancer treatment, and targeted drug delivery.',
    flashcardPrompt: 'What are monoclonal antibodies and give two uses for them.',
    visualModel: {
      type: 'cell',
      description: 'Hybridoma (fused mouse B-cell + tumour cell) → produces identical antibodies → bind to specific antigen',
      diagramId: 'monoclonal_antibodies',
    },
    commonMisconception: 'Monoclonal antibodies are the same as natural antibodies from infection.',
    changeScenarios: [
      {
        prompt: 'Why are monoclonal antibodies useful for targeting cancer cells?',
        explanation: 'Cancer cells have specific antigens not found on healthy cells. Monoclonal antibodies bind only to these antigens, so drugs attached to them are delivered specifically to cancer cells, reducing side effects.',
      },
    ],
  },
  // Stretch: Limiting factors and inverse square law (Grade 9)
  {
    id: 'bio-limiting-factors-quantitative',
    subject: 'Biology',
    topic: 'Bioenergetics',
    coreIdea: 'When light intensity is limiting, rate of photosynthesis is proportional to light intensity. At very high light, another factor (CO₂ or temperature) becomes limiting. Light intensity follows inverse square law with distance.',
    flashcardPrompt: 'Why might doubling light intensity not double the rate of photosynthesis?',
    visualModel: {
      type: 'graph',
      description: 'Graph: light intensity (x) vs rate of photosynthesis (y)—linear at low light, plateaus when another factor limits',
      diagramId: 'photosynthesis_light_graph',
    },
    commonMisconception: 'Doubling light always doubles photosynthesis rate.',
    changeScenarios: [
      {
        prompt: 'A lamp is moved from 10 cm to 20 cm from a plant. Why might the rate of photosynthesis not halve?',
        explanation: 'Inverse square law: light intensity ∝ 1/distance². At 20 cm, intensity is ¼ of at 10 cm. But if light was already saturating (another factor limiting), the rate may not change much.',
      },
    ],
  },
  // Stretch: Negative feedback and thyroxine (Grade 9)
  {
    id: 'bio-thyroxine-feedback',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    coreIdea: 'Thyroxine controls metabolic rate. Low thyroxine → pituitary releases TSH → thyroid releases more thyroxine. High thyroxine → inhibits TSH release. This negative feedback maintains thyroxine within a set range.',
    flashcardPrompt: 'How does negative feedback control thyroxine levels?',
    visualModel: {
      type: 'flow',
      description: 'Low thyroxine → pituitary (TSH) → thyroid (thyroxine) → metabolic rate rises. High thyroxine → inhibits pituitary → less TSH.',
      diagramId: 'thyroxine_feedback',
    },
    commonMisconception: 'Hormones always stimulate; they never inhibit.',
    changeScenarios: [
      {
        prompt: 'What happens if the thyroid is damaged and cannot produce thyroxine?',
        explanation: 'No thyroxine → pituitary keeps releasing TSH (no negative feedback) → TSH levels rise but thyroid cannot respond → low metabolic rate, weight gain, fatigue.',
      },
    ],
  },
  // Stretch: Genetic engineering and ethics (Grade 9)
  {
    id: 'bio-genetic-engineering-ethics',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    coreIdea: 'Genetic engineering inserts genes from one organism into another. Benefits: insulin production, disease-resistant crops. Ethical concerns: unknown long-term effects, impact on ecosystems, designer babies.',
    flashcardPrompt: 'What is genetic engineering and give one benefit and one ethical concern.',
    visualModel: {
      type: 'flow',
      description: 'Gene isolated → inserted into vector (plasmid) → vector inserted into host cell → host produces protein',
      diagramId: 'genetic_engineering',
    },
    commonMisconception: 'Genetic modification always makes organisms dangerous.',
    changeScenarios: [
      {
        prompt: 'Evaluate the use of genetic engineering to produce human insulin in bacteria.',
        explanation: 'Benefits: identical to human insulin, no animal products, scalable. Concerns: need strict quality control; some oppose GM. Overall: widely accepted as safe and beneficial.',
      },
    ],
  },
  // Stretch: Quadrat sampling and biodiversity indices (Grade 9)
  {
    id: 'bio-biodiversity-sampling',
    subject: 'Biology',
    topic: 'Ecology',
    coreIdea: 'Biodiversity can be measured by species richness (number of species) and species evenness (how evenly distributed). Quadrat sampling and transects allow systematic sampling. Simpson\'s index combines richness and evenness.',
    flashcardPrompt: 'What do we mean by species richness and species evenness when measuring biodiversity?',
    visualModel: {
      type: 'diagram',
      description: 'Grid of quadrats; different species in each; transect line across habitat',
      diagramId: 'quadrat_sampling',
    },
    commonMisconception: 'More individuals always means higher biodiversity.',
    changeScenarios: [
      {
        prompt: 'Two fields have 100 plants each. Field A has 2 species (99 of one, 1 of another). Field B has 10 species (10 of each). Which has higher biodiversity and why?',
        explanation: 'Field B has higher biodiversity: more species (richness) and more even distribution (evenness). Field A is dominated by one species.',
      },
    ],
  },
  {
    id: 'chem-rate-reaction',
    subject: 'Chemistry',
    topic: 'Rate of reaction',
    coreIdea: 'Rate depends on collision frequency and energy of collisions.',
    flashcardPrompt: 'What two factors determine the rate of a chemical reaction?',
    visualModel: {
      type: 'particle',
      description: 'Particle diagram showing faster-moving particles at higher temperature',
      diagramId: 'particle_model',
    },
    commonMisconception: 'More particles always means faster reaction (ignoring collision energy).',
    changeScenarios: [
      {
        prompt: 'What happens to rate if concentration doubles?',
        explanation: 'More particles per unit volume → more collisions per second → faster rate',
      },
    ],
  },
  {
    id: 'phys-energy-stores',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    coreIdea: 'Energy is stored in different forms and transferred between stores.',
    flashcardPrompt: 'What happens to energy when it is transferred between stores?',
    visualModel: {
      type: 'energy',
      description: 'Energy transfer diagram: kinetic → gravitational potential → kinetic',
      diagramId: 'energy_profile',
    },
    commonMisconception: 'Energy is used up or disappears.',
    changeScenarios: [
      {
        prompt: 'What happens to kinetic energy if speed doubles?',
        explanation: 'Kinetic energy = ½mv², so doubling speed quadruples kinetic energy (v² term)',
      },
    ],
  },
  // Chemistry: Atomic structure & bonding
  {
    id: 'chem-atomic-structure',
    subject: 'Chemistry',
    topic: 'Atomic structure',
    coreIdea: 'Atoms have a nucleus (protons + neutrons) surrounded by electrons in shells. Atomic number = protons; mass number = protons + neutrons.',
    flashcardPrompt: 'What do atomic number and mass number tell you about an atom?',
    visualModel: { type: 'diagram', description: 'Bohr model: nucleus in centre, electron shells around', diagramId: 'bohr_model' },
    commonMisconception: 'Electrons orbit like planets or are inside the nucleus.',
    changeScenarios: [
      { prompt: 'What happens to the atom if it gains an electron?', explanation: 'Atom becomes negative ion (anion); same number of protons' },
    ],
  },
  {
    id: 'chem-bonding',
    subject: 'Chemistry',
    topic: 'Bonding',
    coreIdea: 'Ionic bonding: metal + non-metal, transfer of electrons. Covalent: non-metals share electrons. Metallic: sea of delocalised electrons.',
    flashcardPrompt: 'How does ionic bonding differ from covalent bonding in terms of electrons?',
    visualModel: { type: 'diagram', description: 'Ionic: Na⁺ and Cl⁻ lattice. Covalent: shared pair between atoms', diagramId: 'ionic_covalent_bonding' },
    commonMisconception: 'Covalent bonds share one electron each (they share pairs).',
    changeScenarios: [
      { prompt: 'Why do ionic compounds conduct when molten?', explanation: 'Ions free to move and carry charge; solid lattice prevents movement' },
    ],
  },
  // Physics: Electricity
  {
    id: 'phys-electricity',
    subject: 'Physics',
    topic: 'Electricity',
    coreIdea: 'Current (I) = charge per second. Potential difference (V) = energy per coulomb. Resistance opposes current. V = IR.',
    flashcardPrompt: 'What is the relationship between potential difference, current, and resistance (V = IR)?',
    visualModel: { type: 'flow', description: 'Circuit: cell → wire → component → wire → cell. Current same in series.', diagramId: 'circuit_diagram' },
    commonMisconception: 'Current is used up in a circuit.',
    changeScenarios: [
      { prompt: 'What happens to total resistance if resistors are added in series?', explanation: 'Total resistance increases; R_total = R₁ + R₂ + ...' },
    ],
  },
  {
    id: 'phys-forces',
    subject: 'Physics',
    topic: 'Forces',
    coreIdea: 'Force = mass × acceleration (F = ma). Resultant force causes acceleration. Newton\'s third law: equal and opposite forces on different objects.',
    flashcardPrompt: 'What does F = ma tell you, and what is Newton\'s third law?',
    visualModel: { type: 'diagram', description: 'Free body diagram: arrows for forces, resultant determines motion', diagramId: 'free_body_diagram' },
    commonMisconception: 'Bigger object always exerts bigger force.',
    changeScenarios: [
      { prompt: 'What happens to acceleration if mass doubles and force stays same?', explanation: 'a = F/m, so acceleration halves' },
    ],
  },

  // ========== CHEMISTRY: Quantitative chemistry ==========
  {
    id: 'chem-moles',
    subject: 'Chemistry',
    topic: 'Quantitative chemistry',
    coreIdea: 'The mole is the unit for amount of substance. One mole contains 6.02 × 10²³ particles. Mass (g) = Mr × moles.',
    flashcardPrompt: 'What is the relationship between mass (g), relative formula mass (Mr), and moles? Give the formula.',
    visualModel: { type: 'diagram', description: 'Balance: mass in grams, Mr, and moles linked by formula', diagramId: 'moles_diagram' },
    commonMisconception: 'Mole is a mass or a volume.',
    changeScenarios: [
      { prompt: 'What happens to number of moles if mass doubles?', explanation: 'Moles = mass ÷ Mr → doubling mass doubles moles (Mr constant)' },
    ],
  },
  {
    id: 'chem-concentration',
    subject: 'Chemistry',
    topic: 'Quantitative chemistry',
    coreIdea: 'Concentration (g/dm³) = mass of solute ÷ volume of solution. Concentration (mol/dm³) = moles ÷ volume (dm³).',
    flashcardPrompt: 'How do you calculate concentration in g/dm³ and in mol/dm³?',
    visualModel: { type: 'flow', description: 'Solute + solvent → solution; concentration = mass/volume or moles/volume', diagramId: 'moles_diagram' },
    commonMisconception: 'Concentration is the same as amount of solute.',
    changeScenarios: [
      { prompt: 'What happens to concentration if you add more water?', explanation: 'Volume increases → concentration decreases (same mass of solute)' },
    ],
  },

  // ========== CHEMISTRY: Chemical changes ==========
  {
    id: 'chem-acids-bases',
    subject: 'Chemistry',
    topic: 'Chemical changes',
    coreIdea: 'Acids produce H⁺ ions in solution; alkalis produce OH⁻ ions. pH scale 0–14; neutralisation: acid + base → salt + water.',
    flashcardPrompt: 'What ions do acids and alkalis produce, and what is the product of neutralisation?',
    visualModel: { type: 'flow', description: 'Acid + base → salt + water; H⁺ + OH⁻ → H₂O', diagramId: 'half_equations' },
    commonMisconception: 'Acids contain oxygen or are always dangerous.',
    changeScenarios: [
      { prompt: 'What happens to pH when acid is added to alkali?', explanation: 'H⁺ reacts with OH⁻ → OH⁻ concentration decreases → pH decreases towards 7' },
    ],
  },
  {
    id: 'chem-reactivity-series',
    subject: 'Chemistry',
    topic: 'Chemical changes',
    coreIdea: 'Metals can be ordered by reactivity. More reactive metals displace less reactive metals from compounds. Carbon and hydrogen are used in extraction.',
    flashcardPrompt: 'What happens when a more reactive metal is added to a compound of a less reactive metal?',
    visualModel: { type: 'flow', description: 'Reactivity series: K Na Ca Mg Al C Zn Fe H Cu Ag Au; displacement reactions', diagramId: 'flame_test_colours' },
    commonMisconception: 'All metals react with water or acid the same way.',
    changeScenarios: [
      { prompt: 'What happens when magnesium is added to copper sulfate solution?', explanation: 'Magnesium more reactive than copper → magnesium displaces copper → copper metal forms → solution colour fades' },
    ],
  },
  {
    id: 'chem-electrolysis',
    subject: 'Chemistry',
    topic: 'Chemical changes',
    coreIdea: 'Electrolysis uses electricity to decompose compounds. Positive ions move to cathode (gain electrons); negative ions move to anode (lose electrons).',
    flashcardPrompt: 'During electrolysis, which electrode do positive ions move to and what do they gain there?',
    visualModel: { type: 'flow', description: 'Battery → electrodes in solution; cations → cathode, anions → anode; products at each electrode', diagramId: 'electrolysis_diagram' },
    commonMisconception: 'Electrons flow through the solution.',
    changeScenarios: [
      { prompt: 'What happens at the cathode during electrolysis of molten lead bromide?', explanation: 'Pb²⁺ ions gain electrons → lead metal forms at cathode' },
    ],
  },

  // ========== CHEMISTRY: Energy changes ==========
  {
    id: 'chem-energy-changes',
    subject: 'Chemistry',
    topic: 'Energy changes',
    coreIdea: 'Exothermic reactions release energy (temperature rises). Endothermic reactions take in energy (temperature falls). Bond breaking absorbs energy; bond making releases it.',
    flashcardPrompt: 'What is the difference between exothermic and endothermic reactions in terms of energy and temperature?',
    visualModel: { type: 'graph', description: 'Energy profile: reactants → activation energy → products; exothermic drops, endothermic rises', diagramId: 'energy_profile' },
    commonMisconception: 'Exothermic means no activation energy needed.',
    changeScenarios: [
      { prompt: 'What happens to temperature in an exothermic reaction?', explanation: 'Energy released to surroundings → temperature of mixture increases' },
    ],
  },

  // ========== CHEMISTRY: Organic chemistry (Paper 2) ==========
  {
    id: 'chem-crude-oil',
    subject: 'Chemistry',
    topic: 'Organic chemistry',
    coreIdea: 'Crude oil is a mixture of hydrocarbons. Fractional distillation separates it by boiling point. Alkanes are saturated (C-C single bonds); alkenes have C=C double bonds.',
    flashcardPrompt: 'How does fractional distillation separate crude oil, and how do alkanes differ from alkenes?',
    visualModel: { type: 'flow', description: 'Crude oil → fractionating column → fractions (gases, petrol, kerosene, diesel, etc.)', diagramId: 'fractionating_column' },
    commonMisconception: 'Crude oil is a single compound.',
    changeScenarios: [
      { prompt: 'What happens to boiling point down the fractionating column?', explanation: 'Longer chain molecules → higher boiling point → condense lower down the column' },
    ],
  },

  // ========== CHEMISTRY: Chemical analysis (Paper 2) ==========
  {
    id: 'chem-analysis',
    subject: 'Chemistry',
    topic: 'Chemical analysis',
    coreIdea: 'Flame tests identify metal ions by colour. Precipitation reactions identify sulfate and halide ions. Pure substances melt and boil at fixed temperatures.',
    visualModel: { type: 'diagram', description: 'Flame test colours: Li red, Na yellow, K lilac, Ca brick red, Cu green', diagramId: 'flame_test_colours' },
    commonMisconception: 'Impurities always lower melting point.',
    changeScenarios: [
      { prompt: 'What does a persistent yellow flame suggest?', explanation: 'Sodium ions present (even in trace) → sodium contaminates many compounds' },
    ],
  },

  // ========== CHEMISTRY: Chemistry of the atmosphere (Paper 2) ==========
  {
    id: 'chem-atmosphere',
    subject: 'Chemistry',
    topic: 'Chemistry of the atmosphere',
    coreIdea: 'Earth\'s early atmosphere had little oxygen; it increased due to photosynthesis. Greenhouse gases (CO₂, methane) absorb IR and warm the Earth. Human activity increases CO₂.',
    flashcardPrompt: 'How do greenhouse gases cause the Earth to warm?',
    visualModel: { type: 'flow', description: 'Sun → short wavelength in → Earth radiates IR → greenhouse gases absorb IR → temperature rises', diagramId: 'carbon_cycle' },
    commonMisconception: 'Greenhouse effect is the same as ozone depletion.',
    changeScenarios: [
      { prompt: 'What happens when greenhouse gas concentration increases?', explanation: 'More IR absorbed and re-radiated → average global temperature increases → climate change' },
    ],
  },

  // ========== CHEMISTRY: Using resources (Paper 2) ==========
  {
    id: 'chem-using-resources',
    subject: 'Chemistry',
    topic: 'Using resources',
    coreIdea: 'Life cycle assessment (LCA) evaluates environmental impact of a product from raw materials to disposal. Recycling reduces use of raw materials and energy.',
    flashcardPrompt: 'What does a life cycle assessment (LCA) consider?',
    visualModel: { type: 'flow', description: 'Extract → manufacture → use → dispose; LCA considers each stage', diagramId: 'fractionating_column' },
    commonMisconception: 'Recycling always saves energy.',
    changeScenarios: [
      { prompt: 'What does LCA consider?', explanation: 'Raw material extraction → manufacture → transport → use → disposal → overall impact on environment' },
    ],
  },

  // ========== CHEMISTRY STRETCH (Grade 9) ==========
  {
    id: 'chem-le-chatelier',
    subject: 'Chemistry',
    topic: 'Rate and extent of chemical change',
    coreIdea: 'Le Chatelier\'s principle: if a system at equilibrium is disturbed, the position of equilibrium shifts to oppose the change. Increase concentration of reactant → equilibrium shifts to products; increase temperature for endothermic reaction → shifts to products.',
    flashcardPrompt: 'What does Le Chatelier\'s principle say about how equilibrium responds to a change?',
    visualModel: { type: 'energy', description: 'Energy profile for reversible reaction; arrows showing shift when conditions change', diagramId: 'le_chatelier' },
    commonMisconception: 'Changing conditions always increases the yield.',
    changeScenarios: [
      { prompt: 'For an exothermic forward reaction, what happens to yield if temperature is increased?', explanation: 'Equilibrium shifts to oppose the change → favours the endothermic (reverse) direction → yield of products decreases' },
    ],
  },
  {
    id: 'chem-half-equations',
    subject: 'Chemistry',
    topic: 'Chemical changes',
    coreIdea: 'Half-equations show oxidation and reduction separately. At anode: oxidation (loss of electrons). At cathode: reduction (gain of electrons). Electrons must balance when combining half-equations.',
    flashcardPrompt: 'At which electrode does oxidation happen, and what happens to electrons there?',
    visualModel: { type: 'flow', description: 'Anode: 2Cl⁻ → Cl₂ + 2e⁻. Cathode: 2H⁺ + 2e⁻ → H₂. Electrons flow through circuit.', diagramId: 'half_equations' },
    commonMisconception: 'Electrons flow through the solution.',
    changeScenarios: [
      { prompt: 'When electrolysing copper sulfate with copper electrodes, why does the anode lose mass?', explanation: 'Copper atoms oxidise: Cu → Cu²⁺ + 2e⁻. Copper ions go into solution; electrons flow to cathode. Anode dissolves.' },
    ],
  },
  {
    id: 'chem-empirical-molecular',
    subject: 'Chemistry',
    topic: 'Quantitative chemistry',
    coreIdea: 'Empirical formula is the simplest whole-number ratio of atoms. Molecular formula is the actual number of atoms. Molecular formula = (empirical formula)ₙ. Find n from Mr ÷ empirical mass.',
    flashcardPrompt: 'What is the difference between empirical and molecular formula, and how do you find n?',
    visualModel: { type: 'diagram', description: 'Mass % → moles → divide by smallest → ratio → empirical formula. Mr ÷ empirical mass = n.', diagramId: 'empirical_molecular' },
    commonMisconception: 'Empirical and molecular formula are always the same.',
    changeScenarios: [
      { prompt: 'A compound has empirical formula CH₂ and Mr = 42. What is the molecular formula?', explanation: 'Empirical mass = 14. n = 42 ÷ 14 = 3. Molecular formula = C₃H₆ (e.g. propene)' },
    ],
  },
  {
    id: 'chem-alkenes-addition',
    subject: 'Chemistry',
    topic: 'Organic chemistry',
    coreIdea: 'Alkenes have C=C double bond; they undergo addition reactions. Bromine water decolourises (test for unsaturation). Hydrogen adds to form alkane. Steam adds to form alcohol. Polymerisation: many monomers → polymer.',
    flashcardPrompt: 'Why does bromine water decolourise with alkenes but not with alkanes?',
    visualModel: { type: 'flow', description: 'Ethene + Br₂ → dibromoethane. Ethene + H₂O (catalyst) → ethanol. Many ethene → poly(ethene).', diagramId: 'alkene_addition' },
    commonMisconception: 'Alkenes and alkanes react the same way.',
    changeScenarios: [
      { prompt: 'Why does bromine water decolourise with ethene but not with ethane?', explanation: 'Ethene has C=C double bond; bromine adds across it (addition). Ethane has only single bonds; no addition occurs; bromine stays red-brown.' },
    ],
  },
  {
    id: 'chem-bond-energy-calculations',
    subject: 'Chemistry',
    topic: 'Energy changes',
    coreIdea: 'Bond breaking is endothermic (energy in). Bond making is exothermic (energy out). ΔH = sum(bonds broken) − sum(bonds made). Negative ΔH = exothermic.',
    flashcardPrompt: 'Is bond breaking endothermic or exothermic, and how do you calculate ΔH from bond energies?',
    visualModel: { type: 'energy', description: 'Energy level diagram: reactants → activation energy → products. ΔH = products − reactants.', diagramId: 'bond_energy' },
    commonMisconception: 'Breaking bonds releases energy.',
    changeScenarios: [
      { prompt: 'Why is the bond energy of a C=C double bond not exactly twice the C–C single bond energy?', explanation: 'The second bond is a pi bond, weaker than the first sigma bond. Total C=C is stronger than C–C but not double. Plus, bond energies are average values.' },
    ],
  },

  // ========== PHYSICS: Particle model of matter ==========
  {
    id: 'phys-particle-model',
    subject: 'Physics',
    topic: 'Particle model of matter',
    coreIdea: 'Density = mass ÷ volume. Particles in a gas are far apart and move randomly; pressure is caused by collisions with the walls. Changing state requires energy (latent heat).',
    flashcardPrompt: 'Why does a gas fill its container? What causes gas pressure? What is density = ?',
    visualModel: { type: 'particle', description: 'Solid: fixed positions. Liquid: touching, sliding. Gas: far apart, random motion', diagramId: 'particle_model' },
    commonMisconception: 'Particles expand when heated.',
    changeScenarios: [
      { prompt: 'What happens to pressure if gas temperature increases at constant volume?', explanation: 'Particles gain kinetic energy → move faster → more frequent and harder collisions with walls → pressure increases' },
    ],
  },
  {
    id: 'phys-specific-heat-capacity',
    subject: 'Physics',
    topic: 'Particle model of matter',
    coreIdea: 'Specific heat capacity is the energy needed to raise 1 kg of a substance by 1°C. E = mcΔT. Different materials need different amounts of energy to warm up.',
    flashcardPrompt: 'What is specific heat capacity and what is the equation E = mcΔT?',
    visualModel: { type: 'energy', description: 'Energy in → temperature rise; slope of graph = 1/(mc)', diagramId: 'energy_profile' },
    commonMisconception: 'All materials heat up at the same rate for the same energy input.',
    changeScenarios: [
      { prompt: 'What happens to temperature rise if mass doubles and same energy is supplied?', explanation: 'E = mcΔT → ΔT = E/(mc) → doubling mass halves temperature rise' },
    ],
  },

  // ========== PHYSICS: Atomic structure (radioactivity) ==========
  {
    id: 'phys-atomic-structure',
    subject: 'Physics',
    topic: 'Atomic structure',
    coreIdea: 'Atom: nucleus (protons + neutrons) and electrons. Isotopes have same protons, different neutrons. Radioactive decay is random; alpha, beta, gamma have different penetration.',
    flashcardPrompt: 'What are isotopes, and how do alpha, beta, and gamma radiation differ in penetration?',
    visualModel: { type: 'diagram', description: 'Nucleus with protons/neutrons; electron shells; alpha stopped by paper, beta by metal, gamma by lead', diagramId: 'bohr_model' },
    commonMisconception: 'Radioactivity is the same as radiation (e.g. waves).',
    changeScenarios: [
      { prompt: 'What happens when an atom emits alpha radiation?', explanation: 'Nucleus loses 2 protons and 2 neutrons → mass number decreases by 4, atomic number by 2 → new element formed' },
    ],
  },

  // ========== PHYSICS: Waves ==========
  {
    id: 'phys-waves',
    subject: 'Physics',
    topic: 'Waves',
    coreIdea: 'Waves transfer energy without transferring matter. v = f × λ. Transverse: oscillations perpendicular to direction (light, EM). Longitudinal: parallel (sound).',
    flashcardPrompt: 'What is the wave equation v = f × λ, and how do transverse and longitudinal waves differ?',
    visualModel: { type: 'diagram', description: 'Transverse wave: crest, trough, wavelength, amplitude. Longitudinal: compression, rarefaction', diagramId: 'wave_types' },
    commonMisconception: 'Waves carry matter from one place to another.',
    changeScenarios: [
      { prompt: 'What happens to wavelength if frequency doubles and wave speed is constant?', explanation: 'v = fλ → λ = v/f → doubling frequency halves wavelength' },
    ],
  },
  {
    id: 'phys-em-spectrum',
    subject: 'Physics',
    topic: 'Waves',
    coreIdea: 'EM spectrum: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma. All travel at same speed in vacuum. Frequency increases, wavelength decreases across spectrum.',
    flashcardPrompt: 'How does wavelength change as you move from radio waves to gamma rays?',
    visualModel: { type: 'flow', description: 'Radio → microwave → IR → visible → UV → X-ray → gamma; frequency increases', diagramId: 'em_spectrum' },
    commonMisconception: 'Different EM waves travel at different speeds in vacuum.',
    changeScenarios: [
      { prompt: 'What happens to energy of photons as you move from radio to gamma?', explanation: 'Higher frequency → higher energy per photon (E = hf)' },
    ],
  },

  // ========== PHYSICS: Magnetism and electromagnetism ==========
  {
    id: 'phys-magnetism',
    subject: 'Physics',
    topic: 'Magnetism and electromagnetism',
    coreIdea: 'Like poles repel; unlike attract. Magnetic field lines go from N to S. Current in a wire produces a magnetic field; Fleming\'s left-hand rule for force on current in a field.',
    flashcardPrompt: 'What is Fleming\'s left-hand rule used for?',
    visualModel: { type: 'diagram', description: 'Bar magnet with field lines; wire in field with force direction', diagramId: 'electromagnetism' },
    commonMisconception: 'All metals are magnetic.',
    changeScenarios: [
      { prompt: 'What happens to the force on a wire if current doubles?', explanation: 'Force on current in magnetic field is proportional to current → doubling current doubles force' },
    ],
  },
  {
    id: 'phys-generator',
    subject: 'Physics',
    topic: 'Magnetism and electromagnetism',
    coreIdea: 'Generator: coil rotates in magnetic field → induced potential difference → a.c. current. Electromagnetic induction: changing magnetic field through coil induces p.d.',
    flashcardPrompt: 'How does a generator produce a potential difference and what type of current does it produce?',
    visualModel: { type: 'flow', description: 'Coil in field → movement → induced p.d. → current; dynamo produces a.c.', diagramId: 'generator_diagram' },
    commonMisconception: 'Generator creates current without any movement.',
    changeScenarios: [
      { prompt: 'What happens to induced p.d. if coil spins faster?', explanation: 'Rate of change of flux increases → larger induced p.d. → higher peak voltage' },
    ],
  },

  // ========== PHYSICS STRETCH (Grade 9) ==========
  {
    id: 'phys-hookes-law-limit',
    subject: 'Physics',
    topic: 'Forces',
    coreIdea: 'Hooke\'s law: F = kx (force proportional to extension) up to the limit of proportionality. Beyond this, the spring undergoes plastic deformation and may not return to original length. Elastic potential energy = ½kx².',
    flashcardPrompt: 'What is Hooke\'s law and what happens to a spring beyond the limit of proportionality?',
    visualModel: { type: 'graph', description: 'Force-extension graph: linear region (Hooke\'s law) → limit of proportionality → curve (plastic)', diagramId: 'hookes_law_graph' },
    commonMisconception: 'Springs always obey Hooke\'s law.',
    changeScenarios: [
      { prompt: 'Why does a spring not return to its original length after being stretched too far?', explanation: 'Beyond limit of proportionality, bonds between atoms are permanently rearranged (plastic deformation). Elastic limit exceeded.' },
    ],
  },
  {
    id: 'phys-critical-angle-tir',
    subject: 'Physics',
    topic: 'Waves',
    coreIdea: 'Critical angle: angle of incidence in denser medium when angle of refraction is 90°. Total internal reflection (TIR) occurs when angle of incidence > critical angle. sin(c) = 1/n where n is refractive index.',
    flashcardPrompt: 'When does total internal reflection occur and what is the formula for critical angle?',
    visualModel: { type: 'diagram', description: 'Ray in glass approaching boundary; at critical angle refracted ray along boundary; beyond that, TIR', diagramId: 'critical_angle_tir' },
    commonMisconception: 'Light always refracts at a boundary.',
    changeScenarios: [
      { prompt: 'Why do optical fibres need a cladding with lower refractive index?', explanation: 'Core has higher n than cladding → light hitting core-cladding boundary at angle > critical angle undergoes TIR → light stays in core, no loss through sides.' },
    ],
  },
  {
    id: 'phys-nuclear-fission-fusion',
    subject: 'Physics',
    topic: 'Atomic structure',
    coreIdea: 'Fission: large nucleus splits into smaller nuclei + neutrons; releases energy (e.g. uranium-235). Fusion: small nuclei join to form larger nucleus; releases energy (e.g. hydrogen → helium). Both convert mass to energy (E=mc²).',
    flashcardPrompt: 'What is the difference between nuclear fission and nuclear fusion?',
    visualModel: { type: 'flow', description: 'Fission: U-235 + neutron → Ba + Kr + 3 neutrons. Fusion: H + H → He + neutron.', diagramId: 'fission_fusion' },
    commonMisconception: 'Fission and fusion are the same process.',
    changeScenarios: [
      { prompt: 'Why does fusion require very high temperature?', explanation: 'Nuclei are positively charged and repel. High temperature gives nuclei enough kinetic energy to overcome electrostatic repulsion and get close enough for strong nuclear force to act.' },
    ],
  },
  {
    id: 'phys-red-shift-big-bang',
    subject: 'Physics',
    topic: 'Space physics',
    coreIdea: 'Red-shift: light from distant galaxies is shifted towards red (longer wavelength). Indicates galaxies are moving away. Greater red-shift = faster recession = further away. Evidence for expanding universe and Big Bang.',
    flashcardPrompt: 'What does red-shift tell us about distant galaxies and the universe?',
    visualModel: { type: 'flow', description: 'Spectrum of distant galaxy: absorption lines shifted towards red compared to lab spectrum. Hubble\'s law: v ∝ d.', diagramId: 'red_shift' },
    commonMisconception: 'Red-shift means the light is red.',
    changeScenarios: [
      { prompt: 'What does the cosmic microwave background radiation tell us about the early universe?', explanation: 'CMB is redshifted radiation from when universe became transparent (~380,000 years after Big Bang). Uniform in all directions; supports Big Bang model.' },
    ],
  },
];

// ============================================================================
// METHOD MARK BREAKDOWNS - 4–6 mark questions (AQA GCSE)
// ============================================================================

export const METHOD_MARK_BREAKDOWNS: MethodMarkBreakdown[] = [
  {
    questionId: 'bio-immune-001',
    ideaMarks: [
      { id: 'idea1', description: 'Vaccine introduces dead/weakened pathogen or antigens', marks: 1, keywords: ['vaccine', 'dead', 'weakened', 'pathogen', 'antigens'] },
      { id: 'idea2', description: 'White blood cells produce antibodies against antigens', marks: 1, keywords: ['white blood', 'antibodies', 'antigens'] },
      { id: 'idea3', description: 'Memory cells formed that remember specific antigen', marks: 1, keywords: ['memory cells', 'remember', 'antigen'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Links secondary response to faster antibody production', marks: 1, keywords: ['secondary', 'faster', 'antibody'] },
      { id: 'method2', description: 'Explains pathogen destroyed before symptoms', marks: 1, keywords: ['pathogen', 'destroyed', 'symptoms'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Uses correct terminology (antibodies, antigens, memory cells)', marks: 1, keywords: ['antibodies', 'antigens', 'memory cells'] },
    ],
    commonPenalties: ['Saying vaccine contains live pathogen', 'Missing memory cells', 'Incomplete process chain'],
  },
  {
    questionId: 'bio-blood-glucose-001',
    ideaMarks: [
      { id: 'idea1', description: 'Pancreas detects increase in blood glucose', marks: 1, keywords: ['pancreas', 'detects', 'blood glucose'] },
      { id: 'idea2', description: 'Releases insulin into blood', marks: 1, keywords: ['insulin', 'blood'] },
      { id: 'idea3', description: 'Liver and muscles take up glucose and store as glycogen', marks: 1, keywords: ['liver', 'muscles', 'glucose', 'glycogen'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Links insulin to target organs (liver, muscles)', marks: 1, keywords: ['insulin', 'target', 'liver', 'muscles'] },
      { id: 'method2', description: 'Explains blood glucose decreases and returns to normal', marks: 1, keywords: ['blood glucose', 'decreases', 'normal'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Mentions negative feedback', marks: 1, keywords: ['negative feedback'] },
    ],
    commonPenalties: ['Missing target organs', 'Confusing insulin with glucagon', 'Not mentioning negative feedback'],
  },
  {
    questionId: 'bio-evolution-001',
    ideaMarks: [
      { id: 'idea1', description: 'Variation exists in population due to different alleles', marks: 1, keywords: ['variation', 'population', 'alleles'] },
      { id: 'idea2', description: 'Selection pressure from environment', marks: 1, keywords: ['selection pressure', 'environment'] },
      { id: 'idea3', description: 'Individuals with advantageous characteristics survive and reproduce', marks: 1, keywords: ['advantageous', 'survive', 'reproduce'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Advantageous alleles passed to offspring', marks: 1, keywords: ['alleles', 'offspring'] },
      { id: 'method2', description: 'Allele frequency increases over generations', marks: 1, keywords: ['allele frequency', 'generations'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Evolution happens to populations, not individuals', marks: 1, keywords: ['populations', 'individuals'] },
    ],
    commonPenalties: ['Saying organisms adapt', 'Saying evolution happens to individuals', 'Missing variation or selection pressure'],
  },
  {
    questionId: 'bio-carbon-cycle-001',
    ideaMarks: [
      { id: 'idea1', description: 'CO₂ taken in by plants during photosynthesis', marks: 1, keywords: ['co2', 'carbon dioxide', 'plants', 'photosynthesis'] },
      { id: 'idea2', description: 'Carbon in plants → animals via consumption/food chains', marks: 1, keywords: ['carbon', 'animals', 'consumption', 'food chain'] },
      { id: 'idea3', description: 'Respiration releases CO₂ back to atmosphere', marks: 1, keywords: ['respiration', 'co2', 'atmosphere'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Decomposition also releases CO₂', marks: 1, keywords: ['decomposition', 'co2'] },
      { id: 'method2', description: 'Links processes in correct order', marks: 1, keywords: ['order', 'cycle', 'process'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Uses correct terms (photosynthesis, respiration, decomposition)', marks: 1, keywords: ['photosynthesis', 'respiration', 'decomposition'] },
    ],
    commonPenalties: ['Missing key processes', 'Confusing carbon with energy', 'Incomplete cycle'],
  },
  {
    questionId: 'bio-photosynthesis-002',
    ideaMarks: [
      { id: 'idea1', description: 'Light provides energy for photosynthesis', marks: 1, keywords: ['light', 'energy', 'photosynthesis'] },
      { id: 'idea2', description: 'Low light = less energy for reactions in chloroplasts', marks: 1, keywords: ['low light', 'chloroplasts', 'reactions'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Light is limiting factor', marks: 1, keywords: ['limiting factor', 'light'] },
      { id: 'method2', description: 'Another factor would limit if light increased', marks: 1, keywords: ['another factor', 'limit', 'increased'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying plant cannot photosynthesize', 'Not explaining limiting factor'],
  },
  {
    questionId: 'bio-enzyme-002',
    ideaMarks: [
      { id: 'idea1', description: 'Bonds holding enzyme shape break at high temperature', marks: 1, keywords: ['bonds', 'enzyme', 'shape', 'temperature'] },
      { id: 'idea2', description: 'Active site changes shape', marks: 1, keywords: ['active site', 'shape'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Substrate no longer fits active site', marks: 1, keywords: ['substrate', 'active site', 'fit'] },
      { id: 'method2', description: 'Enzyme denatured, cannot catalyse reaction', marks: 1, keywords: ['denatured', 'catalyse', 'reaction'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying enzyme is killed', 'Missing link to active site'],
  },
  {
    questionId: 'chem-greenhouse-001',
    ideaMarks: [
      { id: 'idea1', description: 'CO₂ is a greenhouse gas', marks: 1, keywords: ['co2', 'carbon dioxide', 'greenhouse'] },
      { id: 'idea2', description: 'Absorbs infrared radiation from Earth', marks: 1, keywords: ['absorbs', 'infrared', 'radiation', 'earth'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Re-radiates energy (including back to Earth)', marks: 1, keywords: ['re-radiate', 'reradiate', 'energy', 'earth'] },
      { id: 'method2', description: 'Leads to increase in average temperature / global warming', marks: 1, keywords: ['temperature', 'global warming', 'increase'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Confusing with ozone layer', 'Saying CO₂ reflects sunlight', 'Missing link to IR'],
  },
  {
    questionId: 'bio-grade9-stem-cells-001',
    ideaMarks: [
      { id: 'idea1', description: 'Bone marrow stem cells: from patient, no rejection, limited differentiation', marks: 1, keywords: ['bone marrow', 'patient', 'rejection', 'differentiation'] },
      { id: 'idea2', description: 'Embryonic stem cells: pluripotent, ethical issues, rejection risk', marks: 1, keywords: ['embryonic', 'pluripotent', 'ethical', 'rejection'] },
      { id: 'idea3', description: 'For bone marrow disease, adult stem cells may be sufficient', marks: 1, keywords: ['bone marrow', 'adult', 'sufficient'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Compares both sources with pros and cons', marks: 1, keywords: ['compares', 'pros', 'cons', 'sources'] },
      { id: 'method2', description: 'Reaches balanced conclusion for this patient', marks: 1, keywords: ['balanced', 'conclusion', 'patient'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Uses correct terminology (pluripotent, multipotent)', marks: 1, keywords: ['pluripotent', 'multipotent'] },
    ],
    commonPenalties: ['One-sided argument', 'Missing ethical considerations', 'No comparison'],
  },
  {
    questionId: 'bio-grade9-bioaccumulation-001',
    ideaMarks: [
      { id: 'idea1', description: 'DDT accumulates in fat, not excreted', marks: 1, keywords: ['ddt', 'accumulates', 'fat', 'excreted'] },
      { id: 'idea2', description: 'Biomagnification: concentration increases up food chain', marks: 1, keywords: ['biomagnification', 'concentration', 'food chain'] },
      { id: 'idea3', description: 'Top predators had lethal levels', marks: 1, keywords: ['top predators', 'lethal', 'predators'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Links to eggshell thinning', marks: 1, keywords: ['eggshell', 'thinning'] },
      { id: 'method2', description: 'Explains population decline and recovery', marks: 1, keywords: ['population', 'decline', 'recovery'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Distinguishes bioaccumulation from biomagnification', marks: 1, keywords: ['bioaccumulation', 'biomagnification'] },
    ],
    commonPenalties: ['Saying toxins dilute', 'Missing link to population', 'Confusing terms'],
  },
  {
    questionId: 'bio-grade9-photosynthesis-respiration-001',
    ideaMarks: [
      { id: 'idea1', description: 'Day: photosynthesis and respiration both occur', marks: 1, keywords: ['day', 'photosynthesis', 'respiration', 'both'] },
      { id: 'idea2', description: 'Photosynthesis rate > respiration in light → net O₂ production', marks: 1, keywords: ['photosynthesis', 'respiration', 'light', 'oxygen', 'o2'] },
      { id: 'idea3', description: 'Night: only respiration → O₂ used, concentration falls', marks: 1, keywords: ['night', 'respiration', 'oxygen', 'concentration'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Links both processes to gas exchange', marks: 1, keywords: ['gas exchange', 'processes'] },
      { id: 'method2', description: 'Explains balance depends on light', marks: 1, keywords: ['balance', 'light'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Correct gas equations for both processes', marks: 1, keywords: ['equation', 'co2', 'o2', 'glucose', 'water'] },
    ],
    commonPenalties: ['Saying plants only photosynthesise', 'Missing respiration at night', 'Incomplete synthesis'],
  },
  {
    questionId: 'bio-grade9-evolution-001',
    ideaMarks: [
      { id: 'idea1', description: 'Variation: some bacteria have resistance alleles', marks: 1, keywords: ['bacteria', 'resistance', 'alleles', 'variation'] },
      { id: 'idea2', description: 'Selection pressure: antibiotics kill non-resistant', marks: 1, keywords: ['selection pressure', 'antibiotics', 'non-resistant'] },
      { id: 'idea3', description: 'Resistant survive, reproduce; allele frequency increases', marks: 1, keywords: ['resistant', 'survive', 'reproduce', 'allele frequency'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Overuse increases selection pressure', marks: 1, keywords: ['overuse', 'selection pressure'] },
      { id: 'method2', description: 'Restricting use reduces resistance spread', marks: 1, keywords: ['restricting', 'reduces', 'resistance'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Evolution happens to populations, not individuals', marks: 1, keywords: ['populations', 'individuals'] },
    ],
    commonPenalties: ['Saying bacteria choose to evolve', 'Missing stewardship link', 'Individual not population'],
  },
  {
    questionId: 'bio-grade9-immune-001',
    ideaMarks: [
      { id: 'idea1', description: 'Primary: slow, first exposure, memory cells form', marks: 1, keywords: ['primary', 'slow', 'first exposure', 'memory cells'] },
      { id: 'idea2', description: 'Secondary: fast, memory cells respond, no illness', marks: 1, keywords: ['secondary', 'fast', 'memory cells', 'no illness'] },
      { id: 'idea3', description: 'Vaccine = artificial primary → memory → real infection = secondary', marks: 1, keywords: ['vaccine', 'artificial', 'primary', 'secondary', 'infection'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Compares speed and antibody level', marks: 1, keywords: ['speed', 'antibody', 'level', 'compares'] },
      { id: 'method2', description: 'Explains vaccination exploits secondary response', marks: 1, keywords: ['vaccination', 'secondary', 'response'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Correct use of memory cells, antibodies, antigens', marks: 1, keywords: ['memory cells', 'antibodies', 'antigens'] },
    ],
    commonPenalties: ['Saying secondary is slower', 'Missing vaccination link', 'Wrong immune pathway'],
  },
  // --- Additional breakdowns for full GCSE coverage (4–6 mark questions) ---
  {
    questionId: 'bio-diffusion-002',
    ideaMarks: [
      { id: 'idea1', description: 'Temperature increases kinetic energy of particles', marks: 1, keywords: ['temperature', 'kinetic energy', 'particles'] },
      { id: 'idea2', description: 'Particles move faster', marks: 1, keywords: ['faster', 'move', 'speed'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'More collisions per second between particles', marks: 1, keywords: ['collisions', 'collision frequency'] },
      { id: 'method2', description: 'Net movement from high to low concentration increases / diffusion rate increases', marks: 1, keywords: ['net movement', 'concentration gradient', 'rate', 'diffusion'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying particles want or choose to move', 'Not linking temperature to kinetic energy', 'Missing collision frequency'],
  },
  {
    questionId: 'bio-active-transport-001',
    ideaMarks: [
      { id: 'idea1', description: 'Ions move against concentration gradient (low to high)', marks: 1, keywords: ['against', 'concentration gradient', 'low', 'high'] },
      { id: 'idea2', description: 'Requires energy (from respiration)', marks: 1, keywords: ['energy', 'respiration', 'atp'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Carrier proteins (or membrane proteins) involved', marks: 1, keywords: ['carrier protein', 'membrane', 'protein'] },
      { id: 'method2', description: 'Pump ions into the cell', marks: 1, keywords: ['pump', 'into', 'cell'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying it is diffusion', 'Not mentioning energy', 'Missing carrier proteins'],
  },
  {
    questionId: 'bio-nervous-001',
    ideaMarks: [
      { id: 'idea1', description: 'Stimulus detected by receptor', marks: 1, keywords: ['stimulus', 'receptor', 'detected'] },
      { id: 'idea2', description: 'Sensory neurone carries impulse to CNS', marks: 1, keywords: ['sensory', 'neurone', 'cns', 'impulse'] },
      { id: 'idea3', description: 'Motor neurone carries impulse to effector', marks: 1, keywords: ['motor', 'neurone', 'effector'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Correct order: receptor → sensory → CNS → motor → effector (response)', marks: 1, keywords: ['order', 'pathway', 'response'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Missing a step in the pathway', 'Confusing with hormonal response', 'Wrong order'],
  },
  {
    questionId: 'bio-inheritance-001',
    ideaMarks: [
      { id: 'idea1', description: 'Parent genotypes Pp and pp; gametes P or p from first, p from second', marks: 1, keywords: ['gametes', 'genotype', 'p', 'pp'] },
      { id: 'idea2', description: 'Offspring genotypes: Pp and pp (50% each)', marks: 1, keywords: ['offspring', 'pp', 'pp', '50'] },
      { id: 'idea3', description: 'Phenotypes: 50% purple (Pp), 50% white (pp)', marks: 1, keywords: ['phenotype', 'purple', 'white', '50'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Shows genetic cross or Punnett square reasoning', marks: 1, keywords: ['cross', 'punnett', 'ratio'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Confusing genotype with phenotype', 'Wrong ratio', 'Missing dominant/recessive'],
  },
  {
    questionId: 'bio-grade9-enzyme-kinetics-001',
    ideaMarks: [
      { id: 'idea1', description: 'At low concentration: substrate limits rate; more substrate = more enzyme–substrate complexes', marks: 1, keywords: ['low', 'substrate', 'limiting', 'enzyme-substrate'] },
      { id: 'idea2', description: 'At high concentration: all active sites occupied; substrate no longer limiting', marks: 1, keywords: ['high', 'active site', 'occupied', 'saturated'] },
      { id: 'idea3', description: 'Lock-and-key: substrate fits active site; enzyme specific', marks: 1, keywords: ['lock and key', 'active site', 'specific', 'fit'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Links doubling substrate at low conc to doubling rate', marks: 1, keywords: ['doubling', 'rate', 'proportional'] },
      { id: 'method2', description: 'Links no effect at high conc to maximum rate / Vmax', marks: 1, keywords: ['no effect', 'maximum', 'vmax', 'limit'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying enzyme is used up', 'Not explaining both low and high', 'Missing lock-and-key'],
  },
  {
    questionId: 'bio-grade9-homeostasis-001',
    ideaMarks: [
      { id: 'idea1', description: 'Pancreas detects rise in blood glucose', marks: 1, keywords: ['pancreas', 'detects', 'blood glucose', 'rise'] },
      { id: 'idea2', description: 'Releases insulin; liver/muscles take up glucose, store as glycogen', marks: 1, keywords: ['insulin', 'liver', 'muscles', 'glycogen'] },
      { id: 'idea3', description: 'Blood glucose returns to normal', marks: 1, keywords: ['normal', 'decreases', 'return'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Explains negative feedback: high level triggers response that reduces level', marks: 1, keywords: ['negative feedback', 'reduces', 'triggers'] },
      { id: 'method2', description: 'Receptors detect change; effectors bring about correction', marks: 1, keywords: ['receptor', 'effector', 'correction', 'detect'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Confusing insulin with glucagon', 'Missing negative feedback', 'Incomplete chain'],
  },
  {
    questionId: 'bio-grade9-inheritance-001',
    ideaMarks: [
      { id: 'idea1', description: 'Both parents carriers (heterozygous); child has cystic fibrosis so inherited recessive from both', marks: 1, keywords: ['carrier', 'heterozygous', 'recessive', 'both'] },
      { id: 'idea2', description: 'Probability next child has condition = ¼ (25%)', marks: 1, keywords: ['probability', '1/4', '25', 'quarter'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Genetic diagram or Punnett square showing Cc × Cc → cc', marks: 1, keywords: ['punnett', 'cross', 'cc', 'genotype'] },
      { id: 'method2', description: 'Correct working: ½ × ½ = ¼ or 1 in 4', marks: 1, keywords: ['1/2', 'calculation', 'working'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Uses correct notation (e.g. C/c or dominant/recessive)', marks: 1, keywords: ['allele', 'notation', 'recessive'] },
    ],
    commonPenalties: ['Wrong probability', 'Saying parents have the condition', 'No working shown'],
  },
  {
    questionId: 'bio-grade9-ecology-001',
    ideaMarks: [
      { id: 'idea1', description: 'Hedgerow provides habitat / shelter / food for more species', marks: 1, keywords: ['habitat', 'shelter', 'food', 'species'] },
      { id: 'idea2', description: 'Increases biodiversity (species richness / variety)', marks: 1, keywords: ['biodiversity', 'species', 'richness', 'variety'] },
      { id: 'idea3', description: 'Benefit to crops: pollination, pest predators, windbreak', marks: 1, keywords: ['pollination', 'pest', 'predator', 'windbreak', 'crop'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Links biodiversity to ecosystem stability or crop yield', marks: 1, keywords: ['stability', 'yield', 'benefit', 'crop'] },
      { id: 'method2', description: 'Suggests specific mechanism (e.g. pollinators increase yield)', marks: 1, keywords: ['mechanism', 'pollinator', 'natural pest control'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Vague answer', 'No link to crop yield', 'Only one idea'],
  },
  {
    questionId: 'bio-grade9-carbon-cycle-001',
    ideaMarks: [
      { id: 'idea1', description: 'Cutting down forests: less photosynthesis so less CO₂ removed', marks: 1, keywords: ['photosynthesis', 'co2', 'removed', 'trees'] },
      { id: 'idea2', description: 'Decomposition / burning releases CO₂', marks: 1, keywords: ['decomposition', 'burning', 'release', 'co2'] },
      { id: 'idea3', description: 'Ways to reduce impact: replanting, reduce deforestation, use sustainable wood', marks: 1, keywords: ['replant', 'sustainable', 'reduce', 'deforestation'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Links deforestation to atmospheric CO₂ increase', marks: 1, keywords: ['atmosphere', 'increase', 'link'] },
      { id: 'method2', description: 'Suggests one specific way to reduce impact', marks: 1, keywords: ['reduce', 'impact', 'way', 'suggest'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Missing both causes and solution', 'Confusing carbon with energy', 'No suggestion'],
  },
  {
    questionId: 'phys-energy-001',
    ideaMarks: [
      { id: 'idea1', description: 'Correct equation: E_k = ½mv² or kinetic energy = half × mass × speed²', marks: 1, keywords: ['ek', 'kinetic', '1/2', 'mv2', 'equation'] },
      { id: 'idea2', description: 'Substitution: m = 2, v = 5 (or correct values)', marks: 1, keywords: ['substitute', '2', '5', 'mass', 'speed'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Correct calculation: ½ × 2 × 25 = 25 or 25 J', marks: 1, keywords: ['25', 'calculation', 'joules'] },
      { id: 'method2', description: 'Unit stated: J or joules', marks: 1, keywords: ['j', 'joules', 'unit'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Wrong formula', 'Forgetting to square speed', 'Wrong or missing unit'],
  },
  {
    questionId: 'chem-grade9-le-chatelier-001',
    ideaMarks: [
      { id: 'idea1', description: 'Lower temperature would favour exothermic forward reaction → higher yield of ammonia', marks: 1, keywords: ['lower temperature', 'exothermic', 'forward', 'yield', 'ammonia'] },
      { id: 'idea2', description: 'Higher temperature needed for rate: particles have more kinetic energy, more collisions', marks: 1, keywords: ['rate', 'kinetic energy', 'collisions', 'faster'] },
      { id: 'idea3', description: 'Compromise: 450°C balances reasonable rate and reasonable yield', marks: 1, keywords: ['compromise', 'balance', 'rate', 'yield'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Explains Le Chatelier: lower T shifts equilibrium to exothermic side', marks: 1, keywords: ['le chatelier', 'equilibrium', 'shift', 'exothermic'] },
      { id: 'method2', description: 'Links slow rate at low T to economic / practical need for faster reaction', marks: 1, keywords: ['slow', 'economic', 'practical', 'faster'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying high T gives higher yield', 'Missing compromise', 'No link to rate'],
  },
  {
    questionId: 'chem-grade9-electrolysis-001',
    ideaMarks: [
      { id: 'idea1', description: 'Inert electrodes: OH⁻ or water oxidised at anode; 4OH⁻ → O₂ + 2H₂O + 4e⁻ (or equivalent)', marks: 1, keywords: ['inert', 'anode', 'oxygen', 'oh', 'half equation'] },
      { id: 'idea2', description: 'Copper electrodes: anode is copper; Cu → Cu²⁺ + 2e⁻; copper dissolves', marks: 1, keywords: ['copper', 'anode', 'dissolves', 'cu2+', 'half equation'] },
      { id: 'idea3', description: 'Difference: inert = oxygen from solution; copper = copper oxidised and lost', marks: 1, keywords: ['difference', 'inert', 'copper', 'oxidised'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Correct half-equations for both cases', marks: 1, keywords: ['half equation', 'electron', 'balance'] },
      { id: 'method2', description: 'Explains why copper anode dissolves (preferable oxidation of Cu over OH⁻)', marks: 1, keywords: ['prefer', 'oxidation', 'dissolve', 'why'] },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'State symbols or correct ion formulae', marks: 1, keywords: ['state', 'ion', 'formula', 'equation'] },
    ],
    commonPenalties: ['Wrong half-equations', 'Saying oxygen at copper anode', 'Missing electrons'],
  },
  {
    questionId: 'chem-grade9-moles-001',
    ideaMarks: [
      { id: 'idea1', description: 'Finds ratio of moles C : H : O from percentage composition', marks: 1, keywords: ['moles', 'ratio', 'percentage', 'composition'] },
      { id: 'idea2', description: 'Simplest whole number ratio gives empirical formula (e.g. CH₂O)', marks: 1, keywords: ['empirical', 'formula', 'simplest', 'ratio'] },
      { id: 'idea3', description: 'Molecular formula = (empirical)_n where n = Mr / empirical Mr', marks: 1, keywords: ['molecular', 'formula', 'relative formula mass', '60'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Correct calculation of moles from % and mass (e.g. 40/12, 6.67/1, 53.33/16)', marks: 1, keywords: ['calculation', 'divide', 'ar', 'mass'] },
      { id: 'method2', description: 'Correct empirical then molecular (e.g. CH₂O then C₂H₄O₂)', marks: 1, keywords: ['ch2o', 'c2h4o2', 'double', 'n=2'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Wrong empirical formula', 'Not using Mr = 60 for molecular', 'Rounding errors'],
  },
  {
    questionId: 'chem-grade9-bond-energy-001',
    ideaMarks: [
      { id: 'idea1', description: 'Bonds broken: H–H, Cl–Cl. Bonds formed: 2 × H–Cl', marks: 1, keywords: ['bonds broken', 'bonds formed', 'h-h', 'cl-cl', 'h-cl'] },
      { id: 'idea2', description: 'ΔH = sum(bonds broken) − sum(bonds formed)', marks: 1, keywords: ['enthalpy', 'broken', 'formed', 'minus'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Correct substitution: (436 + 243) − (2 × 431) = 679 − 862', marks: 1, keywords: ['436', '243', '431', '862', '679'] },
      { id: 'method2', description: 'Answer: −183 kJ/mol (or correct value) with unit', marks: 1, keywords: ['-183', 'kj', 'mol', 'exothermic'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Wrong sign', 'Using formed − broken', 'Missing unit'],
  },
  {
    questionId: 'chem-grade9-alkenes-001',
    ideaMarks: [
      { id: 'idea1', description: 'Test: bromine water (or bromine solution)', marks: 1, keywords: ['bromine', 'water', 'test'] },
      { id: 'idea2', description: 'Ethene: decolourises (alkenes undergo addition); ethane: no change / stays orange', marks: 1, keywords: ['decolourise', 'ethene', 'ethane', 'no change', 'orange'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Explains alkene has C=C double bond; addition reaction with bromine', marks: 1, keywords: ['double bond', 'addition', 'c=c', 'alkene'] },
      { id: 'method2', description: 'Alkane (ethane) has only single bonds; no reaction with bromine', marks: 1, keywords: ['alkane', 'single bond', 'no reaction'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Wrong test', 'Saying both decolourise', 'Missing explanation'],
  },
  {
    questionId: 'chem-grade9-equilibrium-001',
    ideaMarks: [
      { id: 'idea1', description: 'Increasing pressure favours side with fewer moles of gas', marks: 1, keywords: ['pressure', 'fewer moles', 'gas', 'favours'] },
      { id: 'idea2', description: 'Products have fewer moles of gas than reactants', marks: 1, keywords: ['products', 'reactants', 'moles', 'gas'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Le Chatelier: equilibrium shifts to reduce pressure', marks: 1, keywords: ['le chatelier', 'shift', 'reduce', 'pressure'] },
      { id: 'method2', description: 'Deduces product side has fewer gas molecules', marks: 1, keywords: ['fewer', 'molecules', 'deduce', 'equation'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying more moles on product side', 'Missing link to pressure', 'Wrong deduction'],
  },
  {
    questionId: 'chem-grade9-atmosphere-001',
    ideaMarks: [
      { id: 'idea1', description: 'Evidence: CO₂ from ice cores, direct measurements; concentration has increased', marks: 1, keywords: ['ice core', 'measurement', 'concentration', 'increased'] },
      { id: 'idea2', description: 'Human activity: burning fossil fuels, deforestation', marks: 1, keywords: ['fossil fuels', 'burning', 'deforestation', 'human'] },
      { id: 'idea3', description: 'Evaluation: correlation vs causation; other factors; reliability of evidence', marks: 1, keywords: ['correlation', 'causation', 'evidence', 'evaluate'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Links industrial revolution to increased fossil fuel use', marks: 1, keywords: ['industrial', 'fossil', 'link'] },
      { id: 'method2', description: 'Balanced view: strength of evidence and any limitations', marks: 1, keywords: ['balanced', 'limitation', 'strength', 'evidence'] },
    ],
    precisionMarks: [],
    commonPenalties: ['One-sided answer', 'No evaluation', 'Ignoring human factor'],
  },
  {
    questionId: 'chem-grade9-titration-001',
    ideaMarks: [
      { id: 'idea1', description: 'Burette rinsed with water: left-over water dilutes the solution added', marks: 1, keywords: ['dilute', 'water', 'rinse', 'burette'] },
      { id: 'idea2', description: 'Same volume of solution added but it is less concentrated', marks: 1, keywords: ['concentration', 'less', 'volume', 'same'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'More volume of (dilute) solution needed to reach end point', marks: 1, keywords: ['more volume', 'end point', 'titration'] },
      { id: 'method2', description: 'Calculated concentration would be too high (volume used too large)', marks: 1, keywords: ['too high', 'concentration', 'calculated', 'volume'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying concentration too low', 'Missing link to volume', 'Wrong direction of error'],
  },
  {
    questionId: 'phys-grade9-energy-001',
    ideaMarks: [
      { id: 'idea1', description: 'Energy conserved: GPE lost = KE gained (or ΔGPE = ΔKE)', marks: 1, keywords: ['conservation', 'gpe', 'ke', 'energy', 'lost', 'gained'] },
      { id: 'idea2', description: 'Correct equation: GPE = mgh or KE = ½mv²', marks: 1, keywords: ['mgh', '1/2mv2', 'equation'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Finds GPE lost = mgh = 0.5 × 10 × 2 = 10 J; KE = 10 J so ½mv² = 10', marks: 1, keywords: ['10', 'j', 'calculation', 'mgh'] },
      { id: 'method2', description: 'v² = 40 or v = 6.3 m/s (or √40); unit stated', marks: 1, keywords: ['speed', '6.3', 'root 40', 'm/s'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Wrong height (must use 2 m fallen)', 'Wrong formula', 'Missing unit'],
  },
  {
    questionId: 'phys-grade9-waves-001',
    ideaMarks: [
      { id: 'idea1', description: 'Wave speed v = f × λ (or v = fλ)', marks: 1, keywords: ['v', 'f', 'lambda', 'wavelength', 'frequency', 'equation'] },
      { id: 'idea2', description: 'First wave: v = 50 × 0.60 = 30 m/s', marks: 1, keywords: ['30', 'm/s', 'calculation'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Second wave: same v; λ = v/f = 30/100 = 0.30 m', marks: 1, keywords: ['0.30', '30', '100', 'wavelength'] },
      { id: 'method2', description: 'Units: m/s for speed, m for wavelength', marks: 1, keywords: ['unit', 'm/s', 'm'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Wrong formula', 'Using 50 and 0.60 for second part', 'Unit error'],
  },
  {
    questionId: 'phys-grade9-electricity-001',
    ideaMarks: [
      { id: 'idea1', description: 'Parallel: 1/R_total = 1/R₁ + 1/R₂; identical so 1/6 = 2/R so R = 12 Ω', marks: 1, keywords: ['parallel', '1/r', 'resistance', 'reciprocal'] },
      { id: 'idea2', description: 'Each resistor 12 Ω', marks: 1, keywords: ['12', 'ohm', 'each', 'resistor'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Correct substitution: 1/6 = 2/R → R = 12', marks: 1, keywords: ['calculation', '2/r', '1/6'] },
      { id: 'method2', description: 'Explains reasoning: two identical in parallel halve resistance', marks: 1, keywords: ['identical', 'halve', 'reasoning', 'explain'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Using series formula', 'Saying 3 Ω', 'No working'],
  },
  {
    questionId: 'phys-grade9-particle-001',
    ideaMarks: [
      { id: 'idea1', description: 'Temperature increase means particles gain kinetic energy', marks: 1, keywords: ['temperature', 'kinetic energy', 'particles'] },
      { id: 'idea2', description: 'Particles move faster', marks: 1, keywords: ['faster', 'speed', 'move'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'More frequent collisions with walls of container', marks: 1, keywords: ['collisions', 'walls', 'container', 'frequent'] },
      { id: 'method2', description: 'Harder collisions (greater force) → pressure increases', marks: 1, keywords: ['pressure', 'force', 'increase', 'harder'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying particles expand', 'Not linking to collisions', 'Missing link to pressure'],
  },
  {
    questionId: 'phys-grade9-radioactivity-001',
    ideaMarks: [
      { id: 'idea1', description: 'Half-life: time for activity (or count rate / number of nuclei) to halve', marks: 1, keywords: ['half-life', 'halve', 'activity', 'time'] },
      { id: 'idea2', description: '15 years = 3 half-lives; fraction remaining = (½)³ = 1/8', marks: 1, keywords: ['3 half-lives', '1/8', 'fraction', 'remaining'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Correct calculation: 15 ÷ 5 = 3; ½ × ½ × ½ = 1/8', marks: 1, keywords: ['calculation', '3', '1/8'] },
      { id: 'method2', description: 'Explains meaning in context (e.g. activity drops to one-eighth)', marks: 1, keywords: ['explain', 'activity', 'one eighth'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Wrong fraction', 'Saying half-life is half the time', 'No calculation'],
  },
  {
    questionId: 'phys-grade9-magnetism-001',
    ideaMarks: [
      { id: 'idea1', description: 'Current in wire produces magnetic field; wire in external field experiences force', marks: 1, keywords: ['current', 'magnetic field', 'force', 'wire'] },
      { id: 'idea2', description: 'Force due to interaction of two magnetic fields', marks: 1, keywords: ['interaction', 'two fields', 'fleming', 'motor effect'] },
    ],
    methodMarks: [
      { id: 'method1', description: 'Fleming’s left-hand rule: thumb = force, first finger = field, second = current', marks: 1, keywords: ['fleming', 'left-hand', 'rule', 'direction'] },
      { id: 'method2', description: 'Reverse force: reverse current OR reverse (direction of) magnetic field', marks: 1, keywords: ['reverse', 'current', 'field', 'direction'] },
    ],
    precisionMarks: [],
    commonPenalties: ['Saying reverse both', 'Missing Fleming’s rule', 'Wrong hand'],
  },
];

// ============================================================================
// BIOLOGY QUESTIONS - Paper 1 & Paper 2 (AQA GCSE)
// ============================================================================

export const SCIENCE_QUESTIONS: ScienceQuestion[] = [
  // ========== PAPER 1: CELL BIOLOGY ==========
  {
    id: 'bio-diffusion-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'Explain how oxygen moves from the air into the blood in the lungs. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'saying particles choose to move',
      'confusing diffusion with osmosis',
      'not mentioning concentration gradient',
    ],
    correctAnswer: 'Oxygen moves from high concentration in air to low concentration in blood down a concentration gradient by diffusion. The alveoli have thin walls and large surface area, allowing rapid diffusion.',
    feedback: {
      correct: 'Correct. You identified the process (diffusion), the direction (high to low concentration), and the mechanism (concentration gradient).',
      incorrect: 'Remember: diffusion is the net movement of particles down a concentration gradient due to random movement. Particles do not choose to move.',
      ideaReference: 'Diffusion requires a concentration gradient and happens due to random particle movement.',
    },
  },
  {
    id: 'bio-diffusion-002',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'A student investigates how temperature affects the rate of diffusion. Explain why increasing temperature increases the rate of diffusion. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'saying particles want to move faster',
      'not linking temperature to kinetic energy',
      'missing the link to collision frequency',
    ],
    correctAnswer: 'Increasing temperature gives particles more kinetic energy, so they move faster. Faster movement means more collisions per second between particles. This increases the rate of net movement from high to low concentration, so diffusion happens faster.',
    feedback: {
      correct: 'Excellent. You linked temperature → kinetic energy → particle speed → collision frequency → diffusion rate. This shows process understanding.',
      incorrect: 'You need to explain the process chain: temperature increases kinetic energy → particles move faster → more collisions → faster net movement. Avoid saying particles "want" to move.',
      ideaReference: 'Temperature affects particle kinetic energy, which affects movement speed and collision frequency.',
    },
  },
  {
    id: 'bio-osmosis-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'A plant cell is placed in pure water. Explain what happens to the cell. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'confusing water concentration with solute concentration',
      'saying water moves to where there is less water',
    ],
    correctAnswer: 'Pure water has a higher water concentration than the cell cytoplasm. Water moves into the cell by osmosis through the partially permeable membrane. The cell swells and becomes turgid.',
    feedback: {
      correct: 'Correct. You identified osmosis, the direction of water movement, and the outcome (turgid cell).',
      incorrect: 'Remember: osmosis is about water concentration, not solute concentration. Water moves from high water concentration to low water concentration.',
      ideaReference: 'Osmosis is the net movement of water molecules from dilute to concentrated solution through a partially permeable membrane.',
    },
  },
  {
    id: 'bio-active-transport-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'Root hair cells absorb mineral ions from soil water. The concentration of mineral ions is higher in the root hair cell than in the soil. Explain how the root hair cell absorbs these ions. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'saying it is diffusion',
      'not mentioning energy requirement',
      'not explaining against concentration gradient',
    ],
    correctAnswer: 'The ions move from low concentration (soil) to high concentration (cell) against the concentration gradient. This requires active transport. Energy from respiration is used by carrier proteins to pump the ions into the cell.',
    feedback: {
      correct: 'Perfect. You identified active transport, explained it works against the gradient, and linked it to energy from respiration.',
      incorrect: 'This cannot be diffusion because diffusion only works down a concentration gradient. Active transport requires energy to move substances against the gradient.',
      ideaReference: 'Active transport moves substances against a concentration gradient using energy from respiration.',
    },
  },
  
  // ========== PAPER 1: ORGANISATION ==========
  {
    id: 'bio-enzyme-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Organisation',
    type: 'explanation',
    question: 'Explain why enzymes are described as biological catalysts. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: [
      'saying enzymes are used up',
      'confusing catalysts with reactants',
    ],
    correctAnswer: 'Enzymes speed up chemical reactions without being used up or changed themselves.',
    feedback: {
      correct: 'Correct. You identified that enzymes speed up reactions and remain unchanged.',
      incorrect: 'Remember: catalysts speed up reactions but are not used up. Enzymes remain unchanged after the reaction.',
      ideaReference: 'Catalysts speed up reactions without being used up.',
    },
  },
  {
    id: 'bio-enzyme-002',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Organisation',
    type: 'explanation',
    question: 'An enzyme works best at 37°C. Explain what happens to the enzyme if the temperature increases to 60°C. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'saying enzyme is killed',
      'not explaining shape change',
      'missing link to active site',
    ],
    correctAnswer: 'At high temperature, the bonds holding the enzyme\'s shape break. The active site changes shape and no longer fits the substrate. The enzyme is denatured and cannot catalyze the reaction.',
    feedback: {
      correct: 'Excellent. You explained the process: temperature → bonds break → shape changes → active site affected → enzyme denatured.',
      incorrect: 'You need to explain the process chain: high temperature breaks bonds → enzyme shape changes → active site no longer fits substrate → enzyme denatured. Avoid saying enzymes are "killed" - they are denatured.',
      ideaReference: 'Enzymes have a specific shape with an active site. High temperature breaks bonds, changing the shape and denaturing the enzyme.',
    },
  },
  {
    id: 'bio-digestion-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Organisation',
    type: 'explanation',
    question: 'Explain why large molecules need to be broken down during digestion. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'saying molecules are too big to eat',
      'not mentioning absorption',
      'not explaining solubility',
    ],
    correctAnswer: 'Large molecules are insoluble and cannot be absorbed into the blood. They are broken down into small soluble molecules that can pass through the wall of the small intestine into the blood.',
    feedback: {
      correct: 'Correct. You linked size to solubility and explained why small molecules can be absorbed.',
      incorrect: 'The key point is that large molecules are insoluble and cannot be absorbed. They must be broken down into small soluble molecules.',
      ideaReference: 'Digestion breaks down large insoluble molecules into small soluble molecules that can be absorbed.',
    },
  },
  
  // ========== PAPER 1: INFECTION AND RESPONSE ==========
  {
    id: 'bio-pathogen-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Infection and Response',
    type: 'explanation',
    question: 'Explain how bacteria cause disease. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'confusing bacteria with viruses',
      'saying all bacteria are harmful',
    ],
    correctAnswer: 'Bacteria reproduce rapidly inside the body. They produce toxins that damage cells and cause disease symptoms.',
    feedback: {
      correct: 'Correct. You identified reproduction and toxin production as mechanisms of disease.',
      incorrect: 'Remember: bacteria cause disease by reproducing and producing toxins, not by being "bad".',
      ideaReference: 'Pathogens cause disease by reproducing and producing toxins or damaging cells.',
    },
  },
  {
    id: 'bio-immune-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Infection and Response',
    type: 'explanation',
    question: 'Explain how vaccination provides protection against disease. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: [
      'saying vaccine contains live pathogen',
      'not explaining memory cells',
      'missing the process chain',
    ],
    correctAnswer: 'Vaccination introduces a dead or weakened pathogen or its antigens into the body. White blood cells produce antibodies against these antigens. Memory cells are formed that remember the specific antigen. On future exposure to the real pathogen, memory cells quickly produce large numbers of antibodies, destroying the pathogen before symptoms develop.',
    feedback: {
      correct: 'Excellent 6-mark answer. You explained the vaccination process, antibody production, memory cell formation, and secondary response.',
      incorrect: 'You need to explain the full process: vaccine introduces antigens → antibodies produced → memory cells formed → secondary response is faster. Make sure you mention memory cells - this is key for 6 marks.',
      ideaReference: 'Vaccination triggers antibody production and memory cell formation, providing long-term immunity.',
    },
  },
  
  // ========== PAPER 1: BIOENERGETICS ==========
  {
    id: 'bio-photosynthesis-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'Write the word equation for photosynthesis. (1 mark)',
    marks: 1,
    calculatorAllowed: false,
    commonMistakes: [
      'reversing the equation',
      'missing conditions',
    ],
    correctAnswer: 'Carbon dioxide + water → glucose + oxygen (in the presence of light and chlorophyll)',
    feedback: {
      correct: 'Correct.',
      incorrect: 'Remember: carbon dioxide and water are reactants, glucose and oxygen are products. Light and chlorophyll are needed.',
      ideaReference: 'Photosynthesis converts carbon dioxide and water into glucose and oxygen using light energy.',
    },
  },
  {
    id: 'bio-photosynthesis-002',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'A plant is kept in low light intensity. Explain why the rate of photosynthesis is low. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'saying plant cannot photosynthesize',
      'not explaining limiting factor',
      'missing process understanding',
    ],
    correctAnswer: 'Light provides energy for photosynthesis. Low light intensity means less energy available for the reactions in chloroplasts. Light is the limiting factor, so the rate of photosynthesis is limited by the amount of light energy available. Increasing light intensity would increase the rate until another factor becomes limiting.',
    feedback: {
      correct: 'Excellent. You explained light as an energy source, linked it to the rate-limiting effect, and showed understanding of limiting factors.',
      incorrect: 'You need to explain that light provides energy for photosynthesis, and low light means less energy available, making light the limiting factor.',
      ideaReference: 'Light provides energy for photosynthesis. When light is limiting, increasing it increases the rate until another factor limits it.',
    },
  },
  {
    id: 'bio-respiration-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'Explain why cells need to respire. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: [
      'confusing respiration with breathing',
      'saying cells need oxygen',
    ],
    correctAnswer: 'Respiration releases energy from glucose. This energy is needed for cellular processes like growth and movement.',
    feedback: {
      correct: 'Correct. You identified that respiration releases energy for cellular processes.',
      incorrect: 'Remember: respiration releases energy from glucose. This energy is used for cellular processes.',
      ideaReference: 'Respiration releases energy from glucose for cellular processes.',
    },
  },
  
  // ========== PAPER 2: HOMEOSTASIS AND RESPONSE ==========
  {
    id: 'bio-homeostasis-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'What is homeostasis? (1 mark)',
    marks: 1,
    calculatorAllowed: false,
    commonMistakes: [
      'saying keeping everything the same',
    ],
    correctAnswer: 'The maintenance of constant internal conditions.',
    feedback: {
      correct: 'Correct.',
      incorrect: 'Homeostasis maintains constant internal conditions, not external conditions.',
      ideaReference: 'Homeostasis maintains constant internal conditions.',
    },
  },
  {
    id: 'bio-blood-glucose-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'After eating a meal, blood glucose concentration increases. Explain how the body responds to return blood glucose to normal. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: [
      'not explaining the process chain',
      'missing negative feedback',
      'not mentioning target organs',
    ],
    correctAnswer: 'The pancreas detects the increase in blood glucose concentration. It releases the hormone insulin into the blood. Insulin travels to target organs (liver and muscles). Insulin causes the liver and muscles to take up glucose from the blood and store it as glycogen. Blood glucose concentration decreases and returns to normal. This is negative feedback.',
    feedback: {
      correct: 'Perfect 6-mark answer. You explained detection, hormone release, target organs, response, and negative feedback.',
      incorrect: 'You need to explain the full process: pancreas detects change → releases insulin → insulin travels to target organs → glucose taken up and stored → concentration returns to normal. Mention negative feedback for full marks.',
      ideaReference: 'Blood glucose is controlled by negative feedback involving insulin and glucagon.',
    },
  },
  {
    id: 'bio-nervous-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'Describe the pathway of a nervous response. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'missing steps in the pathway',
      'confusing with hormonal response',
    ],
    correctAnswer: 'Stimulus detected by receptor → sensory neurone carries impulse → central nervous system (CNS) → motor neurone carries impulse → effector responds.',
    feedback: {
      correct: 'Correct. You identified all the key components of the nervous pathway.',
      incorrect: 'Remember the pathway: stimulus → receptor → sensory neurone → CNS → motor neurone → effector → response.',
      ideaReference: 'Nervous responses use electrical impulses through neurones.',
    },
  },
  
  // ========== PAPER 2: INHERITANCE, VARIATION AND EVOLUTION ==========
  {
    id: 'bio-dna-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'What is a gene? (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: [
      'confusing gene with chromosome',
      'saying gene is DNA',
    ],
    correctAnswer: 'A gene is a section of DNA that codes for a specific protein, which determines a characteristic.',
    feedback: {
      correct: 'Correct. You identified that a gene is a section of DNA that codes for a protein.',
      incorrect: 'A gene is a section of DNA, not all DNA. It codes for a specific protein.',
      ideaReference: 'Genes are sections of DNA that code for proteins.',
    },
  },
  {
    id: 'bio-inheritance-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'In pea plants, the allele for purple flowers (P) is dominant to the allele for white flowers (p). A plant with genotype Pp is crossed with a plant with genotype pp. Explain the possible genotypes and phenotypes of the offspring. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: [
      'not showing genetic cross',
      'confusing genotype with phenotype',
    ],
    correctAnswer: 'Parent genotypes: Pp × pp. Gametes: P or p from first parent, p from second parent. Offspring genotypes: Pp or pp (50% each). Phenotypes: 50% purple flowers (Pp), 50% white flowers (pp).',
    feedback: {
      correct: 'Excellent. You showed the genetic cross, identified gametes, genotypes, and phenotypes correctly.',
      incorrect: 'You need to show: parent genotypes → gametes → offspring genotypes → phenotypes. Remember Pp shows purple (dominant), pp shows white (recessive).',
      ideaReference: 'Offspring inherit one allele from each parent. Dominant alleles are expressed if present.',
    },
  },
  {
    id: 'bio-evolution-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'Explain how natural selection leads to evolution. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: [
      'saying organisms adapt',
      'saying evolution happens to individuals',
      'missing the process chain',
    ],
    correctAnswer: 'Within a population, there is variation due to different alleles. Environmental conditions create selection pressure. Individuals with advantageous characteristics are more likely to survive and reproduce. These individuals pass on their advantageous alleles to offspring. Over many generations, the frequency of advantageous alleles increases in the population. The population evolves.',
    feedback: {
      correct: 'Perfect 6-mark answer. You explained variation, selection pressure, survival, reproduction, inheritance, and population change.',
      incorrect: 'You need to explain the full process: variation exists → selection pressure → survival of fittest → reproduction → alleles passed on → population changes. Remember: evolution happens to populations, not individuals.',
      ideaReference: 'Natural selection acts on variation within populations, leading to evolution over generations.',
    },
  },
  
  // ========== PAPER 2: ECOLOGY ==========
  {
    id: 'bio-food-chain-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Explain why there are usually fewer organisms at the top of a food chain. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: [
      'saying top predators are bigger',
      'not explaining energy transfer',
    ],
    correctAnswer: 'Energy is lost at each trophic level through respiration, movement, and waste. Less energy is available to the next level, so fewer organisms can be supported at higher levels.',
    feedback: {
      correct: 'Correct. You explained energy loss and linked it to fewer organisms.',
      incorrect: 'The key point is energy loss. Energy is lost at each level, so less is available for the next level.',
      ideaReference: 'Energy is lost at each trophic level, limiting the number of organisms at higher levels.',
    },
  },
  {
    id: 'bio-carbon-cycle-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Explain how carbon moves from the atmosphere into living organisms and back again. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: [
      'missing steps in the cycle',
      'not explaining processes',
    ],
    correctAnswer: 'Carbon dioxide in the atmosphere is taken in by plants during photosynthesis. Carbon becomes part of plant biomass. Animals eat plants, taking in carbon. Carbon moves through food chains. Respiration by plants and animals releases carbon dioxide back to the atmosphere. Decomposition of dead organisms also releases carbon dioxide.',
    feedback: {
      correct: 'Excellent 6-mark answer. You explained photosynthesis, consumption, food chains, respiration, and decomposition.',
      incorrect: 'You need to explain: photosynthesis removes CO₂ → carbon in plants → consumption → food chains → respiration releases CO₂ → decomposition releases CO₂. Make sure you mention all the key processes.',
      ideaReference: 'Carbon cycles through ecosystems via photosynthesis, consumption, respiration, and decomposition.',
    },
  },

  // ========== AQA PAST-PAPER STYLE: PAPER 1 ==========
  {
    id: 'bio-aqa-microscopy-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'calculation',
    question: 'A student views a cell through a microscope. The image size is 2 mm and the real size of the cell is 0.05 mm. Calculate the magnification. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    equations: ['magnification = image size ÷ real size'],
    commonMistakes: ['dividing real by image', 'wrong units or no unit'],
    correctAnswer: '40 (no unit for magnification)',
    feedback: {
      correct: 'Correct. Magnification = image size ÷ real size = 2 ÷ 0.05 = 40.',
      incorrect: 'Use magnification = image size ÷ real size. Ensure both sizes are in the same units. Magnification has no unit.',
      ideaReference: 'Magnification = size of image ÷ size of real object.',
    },
  },
  {
    id: 'bio-aqa-mitosis-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'Describe what happens during mitosis. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['confusing with meiosis', 'saying chromosomes double without explaining division', 'missing that daughter cells are identical'],
    correctAnswer: 'The chromosomes are copied. The nucleus divides. Each daughter cell receives the same number of chromosomes as the parent cell. The two daughter cells are genetically identical to each other and to the parent cell.',
    feedback: {
      correct: 'Correct. You described chromosome replication, nuclear division, and that daughter cells are identical.',
      incorrect: 'Describe the process: chromosomes replicate; nucleus divides so each new cell gets the same chromosomes; two identical daughter cells. Do not confuse with meiosis (which produces gametes).',
      ideaReference: 'Mitosis produces two genetically identical daughter cells for growth and repair.',
    },
  },
  {
    id: 'bio-aqa-root-hair-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'Root hair cells have long extensions that stick out into the soil. Suggest how this structure helps the cell absorb water and mineral ions. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['only mentioning surface area', 'confusing water uptake with mineral ion uptake (active transport)'],
    correctAnswer: 'The extensions increase the surface area of the cell in contact with the soil. Larger surface area allows more water to enter by osmosis and more mineral ions to be absorbed (by active transport) in a given time.',
    feedback: {
      correct: 'Correct. You linked the structure to surface area and to both water (osmosis) and mineral ion uptake.',
      incorrect: 'Link structure to function: increased surface area → more absorption. Water enters by osmosis; mineral ions often by active transport (against gradient).',
      ideaReference: 'Root hair cells are adapted for absorption; surface area increases rate of uptake.',
    },
  },
  {
    id: 'bio-aqa-blood-pathway-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Organisation',
    type: 'explanation',
    question: 'Describe the pathway of blood through the heart and lungs. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['wrong order (e.g. body before lungs)', 'missing that blood goes to lungs to pick up oxygen'],
    correctAnswer: 'Blood enters the right atrium from the body (deoxygenated). It passes to the right ventricle and is pumped to the lungs. In the lungs, blood picks up oxygen. Oxygenated blood returns to the left atrium, passes to the left ventricle, and is pumped to the body.',
    feedback: {
      correct: 'Correct. You described the double circulation: right side → lungs → left side → body.',
      incorrect: 'Pathway: body → right side of heart → lungs (pick up O₂) → left side of heart → body. Include that blood is oxygenated in the lungs.',
      ideaReference: 'Double circulation: heart pumps blood to lungs then to body.',
    },
  },
  {
    id: 'bio-aqa-bile-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Organisation',
    type: 'explanation',
    question: 'Describe the role of bile in digestion. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['saying bile digests fat', 'not mentioning emulsification'],
    correctAnswer: 'Bile emulsifies fats: it breaks large fat droplets into smaller droplets. This increases the surface area for lipase to digest the fat.',
    feedback: {
      correct: 'Correct. You identified emulsification and the effect on surface area for digestion.',
      incorrect: 'Bile does not digest fat (lipase does). Bile emulsifies fat – breaks it into small droplets – increasing surface area for lipase.',
      ideaReference: 'Bile emulsifies fats; lipase digests them.',
    },
  },
  {
    id: 'bio-aqa-virus-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Infection and Response',
    type: 'explanation',
    question: 'Describe how viruses cause disease. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying viruses produce toxins like bacteria', 'not mentioning invasion of cells'],
    correctAnswer: 'Viruses invade host cells. They use the cell to replicate (copy their genetic material and make new virus particles). The host cell is often damaged or destroyed when new viruses are released. This damage can cause disease symptoms.',
    feedback: {
      correct: 'Correct. You described cell invasion, replication inside the cell, and damage to the host.',
      incorrect: 'Viruses cause disease by entering cells, using them to replicate, and damaging/destroying cells when they burst out. They do not produce toxins like bacteria.',
      ideaReference: 'Viruses replicate inside host cells; cell damage causes symptoms.',
    },
  },
  {
    id: 'bio-aqa-antibiotics-virus-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Infection and Response',
    type: 'explanation',
    question: 'Explain why antibiotics are not used to treat viral infections such as flu. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying antibiotics kill viruses slowly', 'not explaining that viruses are inside host cells'],
    correctAnswer: 'Antibiotics work by targeting structures or processes in bacteria (e.g. cell wall, protein synthesis). Viruses do not have these – they use host cells to replicate. Antibiotics cannot target viruses without damaging the host\'s cells. So antibiotics are ineffective against viruses.',
    feedback: {
      correct: 'Correct. You explained that antibiotics target bacteria, not viruses, and why (viruses use host cells).',
      incorrect: 'Antibiotics target bacteria (e.g. cell walls). Viruses have no cell wall and replicate inside human cells; antibiotics cannot attack them without harming the host.',
      ideaReference: 'Antibiotics affect bacteria only; viruses need different treatments.',
    },
  },
  {
    id: 'bio-aqa-rate-calculation-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Bioenergetics',
    type: 'calculation',
    question: 'In an investigation, the time taken for a reaction to complete was 20 seconds. Calculate the rate of reaction using the formula: rate = 1 ÷ time. Give your answer to 2 decimal places. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    equations: ['rate = 1 ÷ time'],
    commonMistakes: ['using time instead of 1/time', 'wrong units or rounding'],
    correctAnswer: '0.05 (per second or s⁻¹)',
    feedback: {
      correct: 'Correct. Rate = 1 ÷ 20 = 0.05 per second.',
      incorrect: 'Rate = 1 ÷ time = 1 ÷ 20 = 0.05. Units can be per second or s⁻¹.',
      ideaReference: 'Rate of reaction can be calculated as 1 ÷ time for completion.',
    },
  },
  {
    id: 'bio-aqa-limiting-factors-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'A plant is grown in a greenhouse with plenty of light and water but low carbon dioxide concentration. Explain why increasing the carbon dioxide concentration could increase the rate of photosynthesis. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying CO₂ is not needed', 'not explaining limiting factor'],
    correctAnswer: 'Carbon dioxide is a reactant in photosynthesis. If CO₂ concentration is low, it limits the rate of reaction because there is not enough reactant. Increasing CO₂ provides more reactant, so the rate of photosynthesis increases until another factor (e.g. light or temperature) becomes limiting.',
    feedback: {
      correct: 'Correct. You identified CO₂ as a reactant and explained it as a limiting factor.',
      incorrect: 'CO₂ is a reactant. When it is in short supply, it is the limiting factor – adding more increases the rate until something else limits it.',
      ideaReference: 'Limiting factor: the factor in shortest supply limits the rate of photosynthesis.',
    },
  },
  {
    id: 'bio-aqa-anaerobic-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'During vigorous exercise, muscles may respire anaerobically. Explain why anaerobic respiration is less efficient than aerobic respiration. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying no energy is released', 'not mentioning incomplete breakdown of glucose'],
    correctAnswer: 'In anaerobic respiration, glucose is not fully broken down (e.g. in muscles it is converted to lactate). Less energy is released per molecule of glucose than in aerobic respiration, where glucose is fully broken down to CO₂ and water. So anaerobic respiration releases less energy from the same amount of glucose.',
    feedback: {
      correct: 'Correct. You explained incomplete breakdown of glucose and less energy released.',
      incorrect: 'Anaerobic: glucose not fully broken down (e.g. to lactate); less energy per glucose. Aerobic: full breakdown to CO₂ and water; more energy released.',
      ideaReference: 'Anaerobic respiration releases less energy than aerobic because glucose is not fully broken down.',
    },
  },

  // ========== AQA PAST-PAPER STYLE: PAPER 2 ==========
  {
    id: 'bio-aqa-kidney-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'Describe the role of the kidneys in the body. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying kidneys make urine only', 'not mentioning filtering blood or water balance'],
    correctAnswer: 'The kidneys filter the blood. They remove waste substances (e.g. urea) and excess water and ions. They produce urine, which is stored in the bladder and removed from the body. This helps to control water balance and remove toxins.',
    feedback: {
      correct: 'Correct. You described filtering, removal of waste and excess water, and urine production.',
      incorrect: 'Kidneys filter blood, remove waste (e.g. urea) and excess water/ions, and produce urine. This maintains water and ion balance.',
      ideaReference: 'Kidneys filter blood and remove waste and excess water; urine is produced.',
    },
  },
  {
    id: 'bio-aqa-temperature-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'When the body gets too hot, explain how the skin helps to reduce body temperature. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['only mentioning sweating', 'not linking sweat evaporation to cooling'],
    correctAnswer: 'Blood vessels in the skin dilate (vasodilation) so more blood flows near the surface. Heat is lost by radiation. Sweat glands produce sweat; sweat evaporates from the skin surface. Evaporation requires energy (latent heat), which is taken from the body, so the skin cools.',
    feedback: {
      correct: 'Correct. You described vasodilation, heat loss by radiation, and sweat evaporation causing cooling.',
      incorrect: 'Include: vasodilation (more blood to skin); heat loss by radiation; sweating and evaporation of sweat (evaporation uses energy from the body, causing cooling).',
      ideaReference: 'Temperature regulation: vasodilation and sweating (evaporation) lose heat.',
    },
  },
  {
    id: 'bio-aqa-type2-diabetes-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'Suggest why people who are overweight have a higher risk of developing type 2 diabetes. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying they eat too much sugar only', 'not mentioning insulin resistance'],
    correctAnswer: 'In type 2 diabetes, the body\'s cells become less responsive to insulin (insulin resistance). Being overweight is linked to this. The pancreas may produce enough insulin, but cells do not take up glucose properly, so blood glucose concentration stays high. A diet high in sugar and fat and lack of exercise increase the risk.',
    feedback: {
      correct: 'Correct. You linked overweight to insulin resistance and explained the effect on blood glucose.',
      incorrect: 'Type 2 diabetes involves insulin resistance – cells stop responding to insulin. Obesity/lifestyle are risk factors. Link overweight to resistance and high blood glucose.',
      ideaReference: 'Type 2 diabetes: insulin resistance; lifestyle and weight are risk factors.',
    },
  },
  {
    id: 'bio-aqa-variation-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'Describe two causes of variation within a species. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['only giving one cause', 'confusing inherited with environmental variation'],
    correctAnswer: 'Inherited variation: different alleles/genes passed on from parents (e.g. eye colour). Environmental variation: differences caused by the environment (e.g. scars, accent). Many characteristics are affected by both.',
    feedback: {
      correct: 'Correct. You gave inherited and environmental causes of variation.',
      incorrect: 'Two causes: (1) genetic/inherited – different alleles from parents; (2) environmental – effect of surroundings, diet, lifestyle. Some traits are both.',
      ideaReference: 'Variation is due to genes (inherited) and environment.',
    },
  },
  {
    id: 'bio-aqa-speciation-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'Explain how geographical isolation can lead to the formation of a new species. (5 marks)',
    marks: 5,
    calculatorAllowed: false,
    commonMistakes: ['saying organisms adapt and become new species', 'not mentioning reproductive isolation'],
    correctAnswer: 'A population may be split by a physical barrier (e.g. mountain, sea). The two groups experience different conditions and selection pressures. Natural selection acts differently in each group, so different alleles become more common. Over time, the groups become so different that they can no longer interbreed to produce fertile offspring. They are then separate species (speciation).',
    feedback: {
      correct: 'Excellent. You described isolation, different selection, genetic change, and reproductive isolation leading to new species.',
      incorrect: 'Sequence: barrier splits population → different environments → different selection → different alleles in each group → eventually cannot interbreed (reproductively isolated) → new species.',
      ideaReference: 'Speciation can occur when populations are isolated and evolve differently until they cannot interbreed.',
    },
  },
  {
    id: 'bio-aqa-quadrat-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Describe how you would use a quadrat to estimate the population size of a plant species in a field. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['saying count every plant', 'not mentioning random placement or multiple samples'],
    correctAnswer: 'Place quadrats randomly (e.g. using random numbers for coordinates) so the sample is not biased. Count the number of the plant species in each quadrat. Repeat many times (at least 10–30). Work out the mean per quadrat. Estimate total population = mean × (total area ÷ area of one quadrat).',
    feedback: {
      correct: 'Correct. You described random placement, counting, repeated sampling, and using mean to estimate total.',
      incorrect: 'Use random quadrat placement; count the species in each quadrat; repeat many times; mean per quadrat; scale up to whole area (mean × number of quadrats that fit in the field).',
      ideaReference: 'Quadrats used for sampling; random placement and multiple samples improve estimates.',
    },
  },
  {
    id: 'bio-aqa-deforestation-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Explain how deforestation could affect the concentration of carbon dioxide in the atmosphere. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['only saying less photosynthesis', 'not mentioning decomposition or burning'],
    correctAnswer: 'Trees remove CO₂ from the atmosphere by photosynthesis. Cutting down trees reduces the number of plants absorbing CO₂, so less CO₂ is removed. When trees are burned or decay, the carbon stored in them is released as CO₂. So deforestation can increase the concentration of CO₂ in the atmosphere.',
    feedback: {
      correct: 'Correct. You explained less uptake (photosynthesis) and release from burning/decay.',
      incorrect: 'Consider: (1) fewer trees = less photosynthesis = less CO₂ taken in; (2) burning or decay of wood releases CO₂. Both effects can raise atmospheric CO₂.',
      ideaReference: 'Deforestation reduces CO₂ uptake and can release CO₂ from burning and decay.',
    },
  },
  {
    id: 'bio-aqa-reintroduction-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Suggest why reintroducing a top predator, such as a wolf, into an ecosystem might increase biodiversity. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying wolves eat everything', 'not linking to controlling prey or food chain balance'],
    correctAnswer: 'The predator controls the population of its prey (e.g. herbivores). This can prevent one prey species from dominating and outcompeting others. With more balanced prey populations, more plant and animal species can coexist. The predator may also remove sick or weak individuals, affecting population structure. Overall, the food web becomes more balanced and biodiversity can increase.',
    feedback: {
      correct: 'Correct. You linked the predator to controlling prey and to allowing more species to coexist.',
      incorrect: 'Predators reduce prey numbers; this can stop one species dominating and allow others to thrive. A more balanced community can support higher biodiversity.',
      ideaReference: 'Predators can regulate prey populations and increase biodiversity (trophic cascades).',
    },
  },

  // ========== AQA PAST-PAPER INSPIRED (84611F/1H/2F style) ==========
  {
    id: 'bio-aqa-specialised-cell-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'Sperm cells have a long tail and many mitochondria. Describe how these features help the sperm cell carry out its function. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['not linking tail to movement', 'not linking mitochondria to energy'],
    correctAnswer: 'The long tail (flagellum) allows the sperm to swim towards the egg. The many mitochondria release energy (from respiration) needed for movement.',
    feedback: {
      correct: 'Correct. You linked the tail to swimming and mitochondria to energy for movement.',
      incorrect: 'Tail/flagellum: used for swimming. Mitochondria: release energy from respiration, needed for the sperm to move.',
      ideaReference: 'Specialised cells have adaptations that match their function.',
    },
  },
  {
    id: 'bio-aqa-mean-practical-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'calculation',
    question: 'In an osmosis investigation, three potato cylinders had percentage change in mass: 2.1%, −0.8%, 2.3%. Calculate the mean percentage change. Give your answer to one decimal place. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    commonMistakes: ['including the negative value wrongly', 'wrong number of decimal places'],
    correctAnswer: '1.2%',
    feedback: {
      correct: 'Correct. Mean = (2.1 + (−0.8) + 2.3) ÷ 3 = 3.6 ÷ 3 = 1.2%.',
      incorrect: 'Mean = sum of values ÷ number of values. Include the −0.8 correctly. One decimal place.',
      ideaReference: 'Mean = total ÷ number of measurements.',
    },
  },
  {
    id: 'bio-aqa-variables-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Organisation',
    type: 'explanation',
    question: 'A student investigates how pH affects the rate of enzyme activity. Name the independent variable and one variable that should be controlled. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['confusing independent with dependent', 'not giving a variable that can be kept constant'],
    correctAnswer: 'Independent variable: pH. One controlled variable: e.g. temperature, or concentration of enzyme, or concentration of substrate, or volume of solution.',
    feedback: {
      correct: 'Correct. Independent variable is the one you change (pH). Controlled variables are kept the same (e.g. temperature, enzyme concentration).',
      incorrect: 'Independent variable = the one you change (pH). Controlled = ones you keep the same so the test is fair (e.g. temperature, enzyme concentration).',
      ideaReference: 'Independent variable is changed; controlled variables are kept constant.',
    },
  },
  {
    id: 'bio-aqa-dominant-recessive-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'What is meant by a dominant allele and a recessive allele? (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['saying dominant is stronger', 'not stating effect on phenotype'],
    correctAnswer: 'A dominant allele is always expressed in the phenotype when present (even if only one copy). A recessive allele is only expressed when two copies are present (homozygous recessive).',
    feedback: {
      correct: 'Correct. You defined dominant (expressed with one copy) and recessive (expressed only with two copies).',
      incorrect: 'Dominant: expressed if at least one copy is present. Recessive: only expressed when both alleles are recessive.',
      ideaReference: 'Dominant masks recessive in the phenotype; recessive needs two copies to show.',
    },
  },
  {
    id: 'bio-aqa-probability-inheritance-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Inheritance, Variation and Evolution',
    type: 'calculation',
    question: 'Cystic fibrosis is caused by a recessive allele (f). A woman with genotype Ff and a man with genotype Ff have a child. What is the probability that the child has cystic fibrosis (genotype ff)? (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['giving 1 in 2', 'not using genetic cross or Punnett square'],
    correctAnswer: '1 in 4 (or 25% or 0.25). Offspring from Ff × Ff can be FF, Ff, Ff, ff; one out of four is ff.',
    feedback: {
      correct: 'Correct. From Ff × Ff, ¼ of offspring are ff, so probability is 1 in 4.',
      incorrect: 'Draw a genetic cross: Ff × Ff gives FF, Ff, Ff, ff. One in four is ff, so probability = 1/4.',
      ideaReference: 'Probability of recessive disorder from two heterozygous parents is 1 in 4.',
    },
  },
  {
    id: 'bio-aqa-embryo-screening-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'Embryos can be screened for genetic disorders before implantation. Give one advantage and one disadvantage of embryo screening. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['only giving advantages', 'not considering ethical or practical drawbacks'],
    correctAnswer: 'Advantage: e.g. allows parents to avoid having a child with a serious genetic disorder; or to prepare for a child with the condition. Disadvantage: e.g. embryos without the condition may be discarded (ethical concern); or screening is not 100% accurate; or cost/availability.',
    feedback: {
      correct: 'Correct. You gave one benefit (e.g. choice, preparation) and one drawback (e.g. ethical, accuracy).',
      incorrect: 'Advantage: e.g. reduces chance of genetic disorder, or informs choice. Disadvantage: e.g. embryos discarded, or ethical concerns, or reliability.',
      ideaReference: 'Embryo screening has medical benefits and ethical/social drawbacks.',
    },
  },
  {
    id: 'bio-aqa-endocrine-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'How are hormones transported around the body? Name one gland that produces hormones. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['saying hormones travel in nerves', 'naming a non-gland organ'],
    correctAnswer: 'Hormones are transported in the blood (bloodstream). One gland: e.g. pancreas, or pituitary, or thyroid, or adrenal, or ovary, or testis.',
    feedback: {
      correct: 'Correct. Hormones travel in the blood; you named a hormone-producing gland.',
      incorrect: 'Hormones are carried in the blood, not along nerves. Glands: pancreas, pituitary, thyroid, adrenal, ovary, testis.',
      ideaReference: 'Hormones are secreted by glands and travel in the blood to target organs.',
    },
  },
  {
    id: 'bio-aqa-biotic-abiotic-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Foundation',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Give one example of a biotic factor and one example of an abiotic factor that can affect the distribution of organisms. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['giving two biotic or two abiotic', 'confusing the terms'],
    correctAnswer: 'Biotic (living): e.g. food availability, predators, disease, competition. Abiotic (non-living): e.g. light, temperature, water, soil pH, oxygen.',
    feedback: {
      correct: 'Correct. Biotic = living factors; abiotic = non-living factors.',
      incorrect: 'Biotic = living (e.g. predators, food, disease). Abiotic = non-living (e.g. light, temperature, water).',
      ideaReference: 'Biotic = living; abiotic = non-living environmental factors.',
    },
  },
  {
    id: 'bio-aqa-gm-crops-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'Some crops are genetically modified (GM) to be resistant to insect pests. Suggest one benefit and one concern about growing GM crops. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['only benefit or only concern', 'vague ethical answer without a clear point'],
    correctAnswer: 'Benefit: e.g. higher yield (less crop damage); fewer chemical pesticides needed. Concern: e.g. effect on wild species or ecosystems; genes might spread to wild plants; some people have ethical or safety concerns about eating GM food.',
    feedback: {
      correct: 'Correct. You gave one benefit (e.g. yield, fewer pesticides) and one concern (e.g. environment, ethics, safety).',
      incorrect: 'Benefit: e.g. better yield, less pesticide use. Concern: e.g. impact on wildlife, gene transfer, or ethical/safety worries.',
      ideaReference: 'GM crops can increase yield and reduce pesticides; concerns include environment and ethics.',
    },
  },

  // ========== CHEMISTRY ==========
  // ========== ATOMIC STRUCTURE (4.1) ==========
  {
    id: 'chem-aqa-atomic-model-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Foundation',
    topic: 'Atomic structure',
    type: 'explanation',
    question: 'Describe the structure of an atom. Include the relative charges and masses of the subatomic particles. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['saying electrons have the same mass as protons', 'confusing charge with mass', 'missing that most of the atom is empty space'],
    correctAnswer: 'The atom has a nucleus containing protons (positive charge, relative mass 1) and neutrons (no charge, relative mass 1). Electrons (negative charge, very small mass) orbit the nucleus in shells. Most of the atom is empty space.',
    feedback: {
      correct: 'Correct. You described the nucleus, protons, neutrons and electrons with correct charges and relative masses.',
      incorrect: 'Include: nucleus with protons (positive, mass 1) and neutrons (neutral, mass 1); electrons (negative, negligible mass) in shells. Most of the atom is empty space.',
      ideaReference: 'Protons and neutrons in nucleus; electrons in shells; relative mass of electron is about 1/2000.',
    },
  },
  {
    id: 'chem-aqa-periodic-table-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Foundation',
    topic: 'Atomic structure',
    type: 'explanation',
    question: 'The periodic table is arranged in order of atomic (proton) number. Explain why elements in the same group have similar chemical properties. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['saying they have the same number of electrons', 'not mentioning outer shell electrons'],
    correctAnswer: 'Elements in the same group have the same number of electrons in their outer shell. Chemical properties depend on outer shell electrons, so they react in similar ways.',
    feedback: {
      correct: 'Correct. You linked similar properties to the same number of outer shell electrons.',
      incorrect: 'Same group = same number of electrons in the outer shell. Reactions involve outer electrons, so similar number means similar properties.',
      ideaReference: 'Group number relates to number of outer shell electrons; this determines chemical behaviour.',
    },
  },
  {
    id: 'chem-rate-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Higher',
    topic: 'Rate of reaction',
    type: 'explanation',
    question: 'Explain why increasing temperature increases the rate of a chemical reaction. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying particles want to move faster', 'not linking to kinetic energy'],
    correctAnswer: 'Particles gain more kinetic energy at higher temperature. They move faster and collide more frequently. More collisions have enough energy to overcome the activation energy, so more successful collisions per second.',
    feedback: {
      correct: 'Correct. You linked temperature to kinetic energy and collision frequency.',
      incorrect: 'Remember: temperature increases kinetic energy → faster particles → more collisions per second → more successful collisions.',
      ideaReference: 'Rate depends on collision frequency and energy of collisions.',
    },
  },
  {
    id: 'chem-bonding-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Foundation',
    topic: 'Bonding',
    type: 'explanation',
    question: 'Explain how ionic bonding occurs between sodium and chlorine. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying atoms share electrons', 'confusing ionic with covalent'],
    correctAnswer: 'Sodium loses one electron to form Na⁺. Chlorine gains one electron to form Cl⁻. The oppositely charged ions attract by electrostatic attraction to form ionic bonds.',
    feedback: {
      correct: 'Correct. You described electron transfer and electrostatic attraction.',
      incorrect: 'Ionic bonding involves transfer of electrons, not sharing. Metal loses electrons, non-metal gains them.',
      ideaReference: 'Ionic bonding: metal loses electrons, non-metal gains them; ions attract.',
    },
  },

  // ========== PHYSICS ==========
  {
    id: 'phys-electricity-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Electricity',
    type: 'calculation',
    question: 'A resistor has a potential difference of 12 V across it and a current of 0.5 A through it. Calculate its resistance. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    equations: ['V = IR'],
    commonMistakes: ['wrong unit', 'dividing V by I incorrectly'],
    correctAnswer: '24 Ω',
    feedback: {
      correct: 'Correct. R = V/I = 12/0.5 = 24 Ω.',
      incorrect: 'Use V = IR rearranged to R = V/I. Make sure units are correct (Ω for resistance).',
      ideaReference: 'V = IR; resistance = potential difference ÷ current.',
    },
  },
  {
    id: 'phys-energy-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Energy stores and transfers',
    type: 'calculation',
    question: 'Calculate the kinetic energy of a 2 kg object moving at 5 m/s.',
    marks: 4,
    calculatorAllowed: true,
    equations: ['E_k = ½mv²'],
    commonMistakes: ['wrong unit', 'forgot squared term', 'confused energy with power'],
    correctAnswer: '25 J',
    feedback: {
      correct: 'Correct. You used E_k = ½mv² = ½ × 2 × 5² = 25 J.',
      incorrect: 'You used power instead of energy. Power is the rate of transfer, not the total amount.',
      ideaReference: 'Kinetic energy depends on mass and the square of velocity.',
    },
  },

  // ========== CHEMISTRY: Quantitative chemistry ==========
  {
    id: 'chem-moles-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Foundation',
    topic: 'Quantitative chemistry',
    type: 'calculation',
    question: 'Calculate the number of moles in 8 g of oxygen gas (O₂). Relative formula mass of O₂ = 32. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    equations: ['moles = mass ÷ Mr'],
    commonMistakes: ['using atomic mass instead of Mr', 'wrong rearrangement'],
    correctAnswer: '0.25 mol',
    feedback: {
      correct: 'Correct. Moles = mass ÷ Mr = 8 ÷ 32 = 0.25 mol.',
      incorrect: 'Use moles = mass ÷ Mr. For O₂, Mr = 32. Make sure you use the formula mass, not atomic mass.',
      ideaReference: 'Number of moles = mass (g) ÷ relative formula mass.',
    },
  },
  {
    id: 'chem-concentration-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Higher',
    topic: 'Quantitative chemistry',
    type: 'calculation',
    question: 'Calculate the concentration in g/dm³ when 10 g of sodium chloride is dissolved in 0.5 dm³ of solution. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    equations: ['concentration = mass ÷ volume'],
    commonMistakes: ['wrong units', 'dividing volume by mass'],
    correctAnswer: '20 g/dm³',
    feedback: {
      correct: 'Correct. Concentration = 10 ÷ 0.5 = 20 g/dm³.',
      incorrect: 'Concentration (g/dm³) = mass of solute ÷ volume of solution in dm³.',
      ideaReference: 'Concentration = mass ÷ volume; volume must be in dm³.',
    },
  },

  // ========== CHEMISTRY: Chemical changes ==========
  {
    id: 'chem-neutralisation-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Foundation',
    topic: 'Chemical changes',
    type: 'explanation',
    question: 'Write the word equation for the reaction between hydrochloric acid and sodium hydroxide. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['wrong products', 'missing water'],
    correctAnswer: 'Hydrochloric acid + sodium hydroxide → sodium chloride + water',
    feedback: {
      correct: 'Correct. Acid + base → salt + water. The salt is named from the metal and the acid.',
      incorrect: 'Neutralisation: acid + base (alkali) → salt + water. Salt name comes from the acid (chloride from hydrochloric).',
      ideaReference: 'Neutralisation produces a salt and water.',
    },
  },
  {
    id: 'chem-displacement-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Higher',
    topic: 'Chemical changes',
    type: 'explanation',
    question: 'Explain why copper does not displace zinc from zinc sulfate solution. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['saying copper is stronger', 'confusing order of reactivity'],
    correctAnswer: 'Copper is less reactive than zinc. Only a more reactive metal can displace a less reactive metal from its compound.',
    feedback: {
      correct: 'Correct. You used the reactivity series: zinc is above copper, so copper cannot displace zinc.',
      incorrect: 'In the reactivity series, zinc is above copper. Displacement only works when the solid metal is more reactive than the metal in the compound.',
      ideaReference: 'More reactive metal displaces less reactive metal from its compound.',
    },
  },
  {
    id: 'chem-electrolysis-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Higher',
    topic: 'Chemical changes',
    type: 'explanation',
    question: 'Explain what happens at the cathode during electrolysis of copper sulfate solution using inert electrodes. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying hydrogen is always produced', 'confusing cathode with anode'],
    correctAnswer: 'Copper ions (Cu²⁺) gain electrons at the cathode. They are reduced to copper metal, which is deposited on the cathode. Cu²⁺ + 2e⁻ → Cu.',
    feedback: {
      correct: 'Correct. You identified cathode as where reduction (gain of electrons) occurs and named the product.',
      incorrect: 'Cathode is negative; positive ions (cations) move to it and gain electrons. For copper sulfate, Cu²⁺ is reduced to Cu metal.',
      ideaReference: 'At cathode: positive ions gain electrons (reduction).',
    },
  },

  // ========== CHEMISTRY: Energy changes ==========
  {
    id: 'chem-exothermic-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Foundation',
    topic: 'Energy changes',
    type: 'explanation',
    question: 'A reaction causes the temperature of the mixture to increase. Is this reaction exothermic or endothermic? Explain. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['saying endothermic', 'not linking to energy transfer'],
    correctAnswer: 'Exothermic. The reaction releases energy to the surroundings, so the temperature rises.',
    feedback: {
      correct: 'Correct. Exothermic reactions release energy; the surroundings get warmer.',
      incorrect: 'If temperature rises, energy is being released from the reaction to the surroundings. That is exothermic. Endothermic would cause a temperature fall.',
      ideaReference: 'Exothermic: energy released, temperature of surroundings increases.',
    },
  },

  // ========== CHEMISTRY: Organic (Paper 2) ==========
  {
    id: 'chem-alkanes-001',
    subject: 'Chemistry',
    paper: 2,
    tier: 'Foundation',
    topic: 'Organic chemistry',
    type: 'explanation',
    question: 'What is the general formula for alkanes? Why are they described as saturated? (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    commonMistakes: ['wrong formula', 'confusing with alkenes'],
    correctAnswer: 'CₙH₂ₙ₊₂. Saturated means they only have single bonds between carbon atoms; no C=C double bonds.',
    feedback: {
      correct: 'Correct. Alkanes have the general formula CₙH₂ₙ₊₂ and only single C-C bonds.',
      incorrect: 'General formula for alkanes is CₙH₂ₙ₊₂. Saturated = all carbon-carbon bonds are single bonds.',
      ideaReference: 'Alkanes are saturated hydrocarbons with single bonds only.',
    },
  },

  // ========== CHEMISTRY: Chemical analysis (Paper 2) ==========
  {
    id: 'chem-flame-test-001',
    subject: 'Chemistry',
    paper: 2,
    tier: 'Foundation',
    topic: 'Chemical analysis',
    type: 'explanation',
    question: 'Describe how you would carry out a flame test to identify a metal ion. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['missing safety', 'wrong procedure'],
    correctAnswer: 'Clean a nichrome or platinum wire by dipping in HCl and holding in flame until no colour. Dip wire in the sample. Hold in the blue Bunsen flame. Observe the flame colour and compare to known colours (e.g. Li red, Na yellow, K lilac).',
    feedback: {
      correct: 'Correct. You described cleaning the wire, using the sample, and interpreting the flame colour.',
      incorrect: 'Include: clean wire (to avoid contamination), dip in sample, hold in flame, record colour. Different metal ions give different flame colours.',
      ideaReference: 'Flame tests identify metal ions by the colour they produce in a flame.',
    },
  },

  // ========== CHEMISTRY: Atmosphere (Paper 2) ==========
  {
    id: 'chem-greenhouse-001',
    subject: 'Chemistry',
    paper: 2,
    tier: 'Higher',
    topic: 'Chemistry of the atmosphere',
    type: 'explanation',
    question: 'Explain how an increase in carbon dioxide in the atmosphere can lead to global warming. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['confusing with ozone', 'not explaining absorption of IR'],
    correctAnswer: 'Carbon dioxide is a greenhouse gas. It absorbs infrared radiation emitted from the Earth. The energy is re-radiated in all directions, including back towards Earth. This increases the average temperature of the atmosphere (greenhouse effect). More CO₂ means more absorption and re-radiation, so global temperature rises.',
    feedback: {
      correct: 'Excellent. You explained CO₂ as greenhouse gas, absorption of IR, re-radiation, and link to temperature rise.',
      incorrect: 'You need to explain: CO₂ absorbs IR from Earth → re-radiates some back → traps heat → temperature rises. Do not confuse with ozone layer.',
      ideaReference: 'Greenhouse gases absorb IR radiation and re-radiate it, warming the atmosphere.',
    },
  },

  // ========== CHEMISTRY: Using resources (Paper 2) ==========
  {
    id: 'chem-lca-001',
    subject: 'Chemistry',
    paper: 2,
    tier: 'Foundation',
    topic: 'Using resources',
    type: 'explanation',
    question: 'What is a life cycle assessment (LCA)? Name two stages that are considered. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['only mentioning one stage', 'confusing with recycling only'],
    correctAnswer: 'An LCA evaluates the total environmental impact of a product from raw material extraction through manufacture, use, and disposal. Two stages: e.g. extracting raw materials, manufacturing, transport, use, disposal.',
    feedback: {
      correct: 'Correct. You defined LCA and gave stages in the life cycle.',
      incorrect: 'LCA looks at the whole life of a product: obtaining raw materials, manufacture, transport, use, disposal. It assesses environmental impact at each stage.',
      ideaReference: 'LCA considers environmental impact from extraction to disposal.',
    },
  },

  // ========== PHYSICS: Particle model ==========
  {
    id: 'phys-density-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Foundation',
    topic: 'Particle model of matter',
    type: 'calculation',
    question: 'A block has a mass of 500 g and a volume of 250 cm³. Calculate its density in g/cm³. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    equations: ['density = mass ÷ volume'],
    commonMistakes: ['wrong units', 'volume in dm³ without converting'],
    correctAnswer: '2 g/cm³',
    feedback: {
      correct: 'Correct. Density = mass ÷ volume = 500 ÷ 250 = 2 g/cm³.',
      incorrect: 'Density = mass ÷ volume. Ensure units are consistent (e.g. g and cm³ for g/cm³).',
      ideaReference: 'Density is mass per unit volume.',
    },
  },
  {
    id: 'phys-shc-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Particle model of matter',
    type: 'calculation',
    question: 'Calculate the energy needed to heat 2 kg of water by 10°C. Specific heat capacity of water = 4200 J/kg°C. (3 marks)',
    marks: 3,
    calculatorAllowed: true,
    equations: ['E = mcΔT'],
    commonMistakes: ['wrong unit', 'forgetting ΔT'],
    correctAnswer: '84 000 J',
    feedback: {
      correct: 'Correct. E = mcΔT = 2 × 4200 × 10 = 84 000 J.',
      incorrect: 'Use E = mcΔT. Substitute mass in kg, c in J/kg°C, and temperature change in °C.',
      ideaReference: 'Energy = mass × specific heat capacity × temperature change.',
    },
  },

  // ========== PHYSICS: Atomic structure ==========
  {
    id: 'phys-alpha-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Atomic structure',
    type: 'explanation',
    question: 'Describe the nature of alpha radiation and how it affects the nucleus that emits it. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying it is an electron', 'wrong change to mass number'],
    correctAnswer: 'Alpha is a helium nucleus (2 protons, 2 neutrons). When emitted, the original nucleus loses 2 protons and 2 neutrons. Mass number decreases by 4, atomic number by 2; a new element is formed.',
    feedback: {
      correct: 'Correct. You described alpha as 2p + 2n and the effect on the nucleus (new element).',
      incorrect: 'Alpha particle = 2 protons + 2 neutrons. Emission reduces mass number by 4 and atomic number by 2, forming a different element.',
      ideaReference: 'Alpha decay changes the nucleus; mass number −4, atomic number −2.',
    },
  },

  // ========== PHYSICS: Waves ==========
  {
    id: 'phys-wave-speed-001',
    subject: 'Physics',
    paper: 2,
    tier: 'Foundation',
    topic: 'Waves',
    type: 'calculation',
    question: 'A wave has frequency 50 Hz and wavelength 0.06 m. Calculate the wave speed. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    equations: ['v = f × λ'],
    commonMistakes: ['wrong units', 'dividing instead of multiplying'],
    correctAnswer: '3 m/s',
    feedback: {
      correct: 'Correct. v = f × λ = 50 × 0.06 = 3 m/s.',
      incorrect: 'Wave speed v = frequency × wavelength. Use consistent units (e.g. Hz and m).',
      ideaReference: 'Wave speed = frequency × wavelength.',
    },
  },
  {
    id: 'phys-forces-001',
    subject: 'Physics',
    paper: 2,
    tier: 'Higher',
    topic: 'Forces',
    type: 'calculation',
    question: 'A resultant force of 20 N acts on a mass of 5 kg. Calculate the acceleration. (2 marks)',
    marks: 2,
    calculatorAllowed: true,
    equations: ['F = ma'],
    commonMistakes: ['using F/m wrong', 'wrong unit'],
    correctAnswer: '4 m/s²',
    feedback: {
      correct: 'Correct. a = F/m = 20 ÷ 5 = 4 m/s².',
      incorrect: 'Use F = ma rearranged to a = F/m. Force in N, mass in kg, gives acceleration in m/s².',
      ideaReference: 'Resultant force = mass × acceleration.',
    },
  },

  // ========== PHYSICS: Magnetism and electromagnetism ==========
  {
    id: 'phys-motor-001',
    subject: 'Physics',
    paper: 2,
    tier: 'Higher',
    topic: 'Magnetism and electromagnetism',
    type: 'explanation',
    question: 'Explain why a current-carrying wire in a magnetic field experiences a force. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    commonMistakes: ['saying there is no force', 'confusing with induction'],
    correctAnswer: 'The current in the wire has its own magnetic field. This field interacts with the external magnetic field. The two fields combine to produce a resultant field; the wire experiences a force (Fleming\'s left-hand rule) due to this interaction.',
    feedback: {
      correct: 'Correct. You linked the magnetic field of the current to the external field and the resulting force.',
      incorrect: 'A current creates a magnetic field. When placed in another magnetic field, the two fields interact and the wire experiences a force. Direction is given by Fleming\'s left-hand rule.',
      ideaReference: 'Force on current in magnetic field due to interaction of fields.',
    },
  },

  // ========== BIOLOGY GRADE 9-STYLE QUESTIONS ==========
  {
    id: 'bio-grade9-stem-cells-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'A patient has a disease caused by faulty bone marrow cells. Evaluate the use of stem cells from bone marrow compared with embryonic stem cells for treating this patient. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: ['not considering ethical issues', 'missing comparison', 'saying embryonic cells are always better'],
    correctAnswer: 'Bone marrow stem cells: already in patient, no rejection, limited to blood cell types, less ethical concern. Embryonic stem cells: can differentiate into any cell type, but ethical issues (destruction of embryo), risk of rejection if from donor, risk of tumour formation. For bone marrow disease, adult stem cells from patient\'s own marrow may be sufficient and avoid ethical/rejection issues. Embryonic could work but raises ethical concerns.',
    feedback: {
      correct: 'Excellent evaluation. You compared both sources, considered advantages and disadvantages, and reached a balanced conclusion for this specific context.',
      incorrect: 'Grade 9 requires evaluation: compare both stem cell sources, consider scientific pros/cons (differentiation potential, rejection, safety) and ethical issues. Reach a balanced conclusion for this patient.',
      ideaReference: 'Stem cells: embryonic (pluripotent) vs adult (multipotent); ethical considerations; rejection; differentiation potential.',
    },
  },
  {
    id: 'bio-grade9-bioaccumulation-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Ecology',
    type: 'explanation',
    question: 'DDT was used as an insecticide and is now banned in many countries. Explain why top predators such as eagles had much higher concentrations of DDT in their tissues than organisms lower in the food chain, and why this led to population decline. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: ['saying toxins dilute up the chain', 'not linking to population decline', 'confusing bioaccumulation with biomagnification'],
    correctAnswer: 'DDT is not excreted or broken down easily; it accumulates in fat. Each trophic level consumes many organisms from the level below, so the total DDT from all prey accumulates in the predator. Biomagnification: concentration increases at each level. Top predators had lethal levels. DDT caused eggshell thinning in birds; eggs broke, fewer offspring; population declined. Removing DDT allowed recovery.',
    feedback: {
      correct: 'Excellent. You explained bioaccumulation, biomagnification, and linked to the specific effect (eggshell thinning) and population decline.',
      incorrect: 'You need: (1) DDT accumulates in fat, not excreted; (2) each consumer eats many organisms—concentration builds up (biomagnification); (3) top predators have highest concentration; (4) link to eggshell thinning and population decline.',
      ideaReference: 'Bioaccumulation and biomagnification; toxins concentrate up food chain; real-world impact (DDT, eagles).',
    },
  },
  {
    id: 'bio-grade9-enzyme-kinetics-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Organisation',
    type: 'explanation',
    question: 'A student investigates enzyme activity at different substrate concentrations. At low concentration, doubling substrate doubles the rate. At high concentration, doubling substrate has no effect. Explain these observations using the lock-and-key model. (5 marks)',
    marks: 5,
    calculatorAllowed: false,
    commonMistakes: ['saying enzyme is saturated without explaining', 'not linking to active sites', 'confusing with temperature'],
    correctAnswer: 'At low concentration: few substrate molecules; many active sites empty; doubling substrate means more collisions with active sites per second; rate doubles (substrate is limiting). At high concentration: all or most active sites occupied at any moment; enzyme working at maximum rate; adding more substrate cannot increase rate because no free active sites; enzyme concentration is limiting.',
    feedback: {
      correct: 'Perfect. You explained both regions: low concentration (substrate limiting, rate proportional to substrate) and high concentration (active sites saturated, enzyme limiting).',
      incorrect: 'At low [substrate]: substrate limiting, more substrate = more collisions = faster rate. At high [substrate]: all active sites full, enzyme saturated, rate cannot increase. Link to active sites and lock-and-key.',
      ideaReference: 'Enzyme kinetics; limiting factor; active site saturation; lock-and-key model.',
    },
  },
  {
    id: 'bio-grade9-photosynthesis-respiration-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'A plant is kept in a sealed container with light. Over 24 hours, the oxygen concentration increases during the day and decreases at night. Explain these changes, linking photosynthesis and respiration. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: ['saying plants only photosynthesise', 'not explaining both processes', 'confusing gas exchange'],
    correctAnswer: 'Day: light available; photosynthesis occurs; CO₂ + H₂O → glucose + O₂; oxygen produced, released. Respiration also occurs 24/7; uses oxygen. But photosynthesis rate > respiration rate in light; net oxygen production; concentration rises. Night: no light; no photosynthesis; respiration continues; oxygen used, CO₂ produced; concentration falls. Both processes occur; balance depends on light.',
    feedback: {
      correct: 'Excellent synthesis. You explained that both processes occur, and the balance between them (photosynthesis vs respiration) determines net gas exchange and concentration changes.',
      incorrect: 'Plants respire 24/7. In light: photosynthesis and respiration both occur; photosynthesis produces O₂ faster than respiration uses it → net O₂ increase. In dark: only respiration → O₂ used → concentration falls.',
      ideaReference: 'Photosynthesis and respiration; gas exchange; light-dependent balance.',
    },
  },
  {
    id: 'bio-grade9-evolution-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'Antibiotic-resistant bacteria have become more common. Explain how natural selection has led to this, and why doctors are advised to prescribe antibiotics only when necessary. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: ['saying bacteria choose to become resistant', 'not explaining selection pressure', 'missing link to prescription'],
    correctAnswer: 'Variation: some bacteria have alleles for resistance (from mutation). Selection pressure: antibiotics kill non-resistant bacteria. Resistant bacteria survive and reproduce. Offspring inherit resistance. Over time, proportion of resistant bacteria increases. Overuse of antibiotics increases selection pressure; more opportunities for resistant strains to dominate. Prescribing only when necessary reduces selection pressure; slows spread of resistance; preserves effectiveness.',
    feedback: {
      correct: 'Excellent. You explained natural selection (variation, selection pressure, survival, reproduction, inheritance) and linked to the real-world application of antibiotic stewardship.',
      incorrect: 'Natural selection: (1) variation exists (some resistant); (2) antibiotics = selection pressure; (3) resistant survive, reproduce; (4) allele frequency increases. Overuse = stronger selection = faster spread. Restricting use = less selection = slower resistance.',
      ideaReference: 'Natural selection; antibiotic resistance; selection pressure; stewardship.',
    },
  },
  {
    id: 'bio-grade9-homeostasis-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Homeostasis and Response',
    type: 'explanation',
    question: 'Explain how the body maintains blood glucose concentration when it rises after a meal, and why this is an example of negative feedback. (5 marks)',
    marks: 5,
    calculatorAllowed: false,
    commonMistakes: ['missing receptor or effector', 'not explaining negative feedback', 'confusing insulin and glucagon'],
    correctAnswer: 'Receptors in pancreas detect rise in blood glucose. Pancreas releases insulin into blood. Insulin causes liver and muscle cells to take up glucose and store as glycogen. Blood glucose decreases. When it returns to normal, insulin release decreases (negative feedback: the response reduces the stimulus). Negative feedback: change detected → response that opposes change → return to set point.',
    feedback: {
      correct: 'Correct. You described the pathway (receptor → insulin → effector → glycogen storage) and explained why it is negative feedback (response opposes stimulus).',
      incorrect: 'Need: (1) pancreas detects high glucose; (2) releases insulin; (3) liver/muscles take up glucose, store as glycogen; (4) glucose falls; (5) negative feedback = response reduces the stimulus.',
      ideaReference: 'Blood glucose regulation; insulin; glycogen; negative feedback.',
    },
  },
  {
    id: 'bio-grade9-immune-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Infection and Response',
    type: 'explanation',
    question: 'Compare the primary and secondary immune response to the same pathogen. Explain why vaccination exploits the secondary response. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: ['saying secondary is slower', 'not linking to memory cells', 'missing vaccination link'],
    correctAnswer: 'Primary: first exposure; immune system encounters pathogen; takes days to produce enough antibodies; antibody concentration rises slowly; person may get ill. Memory cells formed. Secondary: same pathogen again; memory cells recognise antigen; rapid division; antibodies produced much faster and in greater quantity; pathogen destroyed before symptoms; person does not get ill. Vaccination: introduces dead/weakened pathogen or antigens; triggers primary response without disease; memory cells formed; on real infection, secondary response occurs; immunity without getting ill.',
    feedback: {
      correct: 'Excellent comparison. You contrasted primary and secondary response (speed, antibody level, symptoms) and explained how vaccination creates memory for a safe secondary response.',
      incorrect: 'Primary: slow, first time, may get ill, memory cells form. Secondary: fast, memory cells respond, high antibody level, no illness. Vaccine = artificial primary → memory cells → real infection = secondary → immunity.',
      ideaReference: 'Primary vs secondary immune response; memory cells; vaccination.',
    },
  },
  {
    id: 'bio-grade9-inheritance-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Inheritance, Variation and Evolution',
    type: 'explanation',
    question: 'Cystic fibrosis is caused by a recessive allele. Two parents who do not have cystic fibrosis have a child with the condition. Explain how this is possible and calculate the probability that their next child will also have cystic fibrosis. (5 marks)',
    marks: 5,
    calculatorAllowed: false,
    commonMistakes: ['saying both parents must have it', 'wrong probability', 'not using genetic diagram'],
    correctAnswer: 'Both parents are carriers (heterozygous, Ff). They do not have the condition because they have one dominant allele. Child has ff (homozygous recessive). Punnett square: Ff × Ff → FF, Ff, Ff, ff. Probability of ff = 1/4. So probability next child has cystic fibrosis = 1/4 (25%).',
    feedback: {
      correct: 'Correct. You explained carriers (heterozygous), why they are unaffected, and correctly calculated 1/4 probability for the next child.',
      incorrect: 'Both parents are carriers (Ff). Child with condition is ff. Ff × Ff gives 1/4 ff. Probability = 1/4.',
      ideaReference: 'Recessive inheritance; carriers; Punnett square; probability.',
    },
  },
  {
    id: 'bio-grade9-ecology-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Ecology',
    type: 'explanation',
    question: 'A farmer plants a hedgerow between two fields. Suggest how this might increase biodiversity and benefit crop yields. (5 marks)',
    marks: 5,
    calculatorAllowed: false,
    commonMistakes: ['only mentioning one benefit', 'not linking to crop yield', 'vague answers'],
    correctAnswer: 'Hedgerow provides habitat for many species (birds, insects, mammals); increases species richness and evenness. Predatory insects (e.g. ladybirds) eat crop pests; natural pest control; less need for pesticides. Pollinators (bees, butterflies) use hedgerow flowers; more pollination of crops; higher yields. Hedgerow acts as windbreak; reduces soil erosion. Biodiversity supports ecosystem stability; beneficial species thrive.',
    feedback: {
      correct: 'Excellent application. You linked hedgerow to biodiversity, then to ecosystem services (pest control, pollination) and crop yield.',
      incorrect: 'Consider: (1) habitat → more species; (2) natural pest control (predators); (3) pollinators for crops; (4) windbreak; (5) ecosystem services. Link biodiversity to crop benefit.',
      ideaReference: 'Biodiversity; habitat; ecosystem services; pest control; pollination.',
    },
  },
  {
    id: 'bio-grade9-carbon-cycle-001',
    subject: 'Biology',
    paper: 2,
    tier: 'Higher',
    topic: 'Ecology',
    type: 'explanation',
    question: 'Deforestation affects the carbon cycle. Explain how cutting down forests could increase the concentration of carbon dioxide in the atmosphere, and suggest one way to reduce the impact. (5 marks)',
    marks: 5,
    calculatorAllowed: false,
    commonMistakes: ['only mentioning one effect', 'not explaining decomposition', 'vague solutions'],
    correctAnswer: 'Trees remove CO₂ from atmosphere by photosynthesis; store carbon in wood, leaves, roots. Cutting down reduces photosynthesis; less CO₂ removed. Decomposition of dead wood and roots releases CO₂ (respiration of decomposers). Burning releases CO₂ quickly. Less biomass = less carbon storage. Net effect: more CO₂ in atmosphere. Reduce impact: replant trees; use wood for long-lasting products (lock up carbon); sustainable forestry (replace what is cut).',
    feedback: {
      correct: 'Good. You explained multiple pathways (reduced photosynthesis, decomposition, burning) and suggested a practical solution.',
      incorrect: 'Consider: (1) fewer trees = less photosynthesis = less CO₂ removed; (2) decomposition and burning release CO₂; (3) less carbon storage. Solution: replant, sustainable forestry, or carbon storage in products.',
      ideaReference: 'Carbon cycle; deforestation; photosynthesis; decomposition; mitigation.',
    },
  },

  // ========== CHEMISTRY GRADE 9-STYLE QUESTIONS ==========
  {
    id: 'chem-grade9-le-chatelier-001',
    subject: 'Chemistry',
    paper: 2,
    tier: 'Higher',
    topic: 'Rate and extent of chemical change',
    type: 'explanation',
    question: 'The Haber process is exothermic in the forward direction. Explain why a temperature of 450°C is used rather than a lower temperature, even though a lower temperature would give a higher yield of ammonia. (5 marks)',
    marks: 5,
    calculatorAllowed: false,
    commonMistakes: ['saying lower temp always better', 'not mentioning rate', 'missing compromise'],
    correctAnswer: 'Lower temperature would shift equilibrium to the right (Le Chatelier: favour exothermic direction) → higher yield. But at low temperature, rate of reaction is very slow; few collisions have enough energy to overcome activation energy. 450°C is a compromise: reasonable yield and reasonable rate. Industrial process needs acceptable rate to be economical.',
    feedback: {
      correct: 'Excellent. You explained the yield vs rate trade-off and why industry compromises on temperature.',
      incorrect: 'Lower temp = higher yield (equilibrium) but slower rate (kinetics). 450°C balances both. Industry needs practical rate.',
      ideaReference: 'Le Chatelier; equilibrium yield vs rate; compromise conditions.',
    },
  },
  {
    id: 'chem-grade9-electrolysis-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Higher',
    topic: 'Chemical changes',
    type: 'explanation',
    question: 'When electrolysing copper(II) sulfate solution with inert electrodes, oxygen is produced at the anode. When using copper electrodes, the anode dissolves. Explain both observations, including the half-equations. (6 marks)',
    marks: 6,
    calculatorAllowed: false,
    commonMistakes: ['confusing anode and cathode', 'wrong half-equations', 'not explaining inert vs active'],
    correctAnswer: 'Inert electrodes: OH⁻ (from water) more easily oxidised than SO₄²⁻. 4OH⁻ → O₂ + 2H₂O + 4e⁻. Oxygen produced. Copper electrodes: copper atoms easier to oxidise than OH⁻. Cu → Cu²⁺ + 2e⁻. Copper ions go into solution; anode loses mass. The product depends on which species is oxidised most easily at the anode.',
    feedback: {
      correct: 'Perfect. You explained why different products form (relative ease of oxidation) and gave correct half-equations for both.',
      incorrect: 'Inert: OH⁻ oxidised → O₂. Active (copper): Cu oxidised → Cu²⁺. Ease of oxidation determines product. Include half-equations.',
      ideaReference: 'Electrolysis; anode reactions; inert vs active electrodes; half-equations.',
    },
  },
  {
    id: 'chem-grade9-moles-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Higher',
    topic: 'Quantitative chemistry',
    type: 'calculation',
    question: 'A compound contains 40.0% carbon, 6.67% hydrogen, and 53.33% oxygen by mass. Its relative formula mass is 60. Find the empirical formula and the molecular formula. (5 marks)',
    marks: 5,
    calculatorAllowed: true,
    commonMistakes: ['wrong ratio', 'not simplifying', 'empirical = molecular'],
    correctAnswer: 'Assume 100 g: C 40 g, H 6.67 g, O 53.33 g. Moles: C 40/12 = 3.33, H 6.67/1 = 6.67, O 53.33/16 = 3.33. Ratio 1:2:1. Empirical formula CH₂O. Empirical mass = 30. n = 60/30 = 2. Molecular formula C₂H₄O₂.',
    feedback: {
      correct: 'Correct. You converted % to mass, found moles, simplified to ratio, got empirical formula, then used Mr to find molecular formula.',
      incorrect: 'Mass % → assume 100 g → moles of each → divide by smallest → ratio → empirical. Mr ÷ empirical mass = n. Molecular = (empirical)ₙ.',
      ideaReference: 'Empirical and molecular formula; percentage composition.',
    },
  },
  {
    id: 'chem-grade9-bond-energy-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Higher',
    topic: 'Energy changes',
    type: 'calculation',
    question: 'Use bond energies to calculate the enthalpy change for: H₂ + Cl₂ → 2HCl. Bond energies (kJ/mol): H–H 436, Cl–Cl 243, H–Cl 431. (4 marks)',
    marks: 4,
    calculatorAllowed: true,
    equations: ['ΔH = sum(bonds broken) − sum(bonds made)'],
    commonMistakes: ['wrong sign', 'counting bonds wrong', 'not showing working'],
    correctAnswer: 'Bonds broken: 1×H–H + 1×Cl–Cl = 436 + 243 = 679 kJ. Bonds made: 2×H–Cl = 2×431 = 862 kJ. ΔH = 679 − 862 = −183 kJ/mol. Exothermic.',
    feedback: {
      correct: 'Correct. You identified bonds broken and made, calculated correctly, and got a negative (exothermic) value.',
      incorrect: 'Bonds broken: H–H + Cl–Cl. Bonds made: 2×H–Cl. ΔH = broken − made. Negative = exothermic.',
      ideaReference: 'Bond energy calculations; enthalpy change.',
    },
  },
  {
    id: 'chem-grade9-alkenes-001',
    subject: 'Chemistry',
    paper: 2,
    tier: 'Higher',
    topic: 'Organic chemistry',
    type: 'explanation',
    question: 'Ethene and ethane are both gases. Describe a test to distinguish between them and explain the result. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['wrong test', 'not explaining decolourisation', 'confusing with alkanes'],
    correctAnswer: 'Add bromine water (orange/brown) to each gas. Ethene: bromine water decolourises. Ethene has C=C double bond; bromine adds across it (addition reaction); coloured Br₂ consumed. Ethane: no change. Ethane has only single bonds; no addition; bromine stays orange. Test for unsaturation.',
    feedback: {
      correct: 'Correct. You described the test, the observation for each, and explained using addition reaction and C=C.',
      incorrect: 'Bromine water. Ethene decolourises (addition across C=C). Ethane no change (no C=C).',
      ideaReference: 'Bromine water test; alkenes vs alkanes; addition reaction.',
    },
  },
  {
    id: 'chem-grade9-equilibrium-001',
    subject: 'Chemistry',
    paper: 2,
    tier: 'Higher',
    topic: 'Rate and extent of chemical change',
    type: 'explanation',
    question: 'For a reversible reaction at equilibrium, increasing the pressure increases the yield of products. What can you deduce about the number of moles of gas on each side of the equation? Explain. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['wrong deduction', 'not applying Le Chatelier', 'confusing moles and molecules'],
    correctAnswer: 'Increasing pressure shifts equilibrium to the side with fewer moles of gas (to reduce pressure). Yield of products increases, so products have fewer moles of gas than reactants. E.g. N₂ + 3H₂ ⇌ 2NH₃: reactants 4 mol, products 2 mol; high pressure favours NH₃.',
    feedback: {
      correct: 'Correct. You applied Le Chatelier (pressure favours fewer moles) and deduced the stoichiometry.',
      incorrect: 'Le Chatelier: high pressure favours side with fewer moles of gas. Products increase → products have fewer moles.',
      ideaReference: 'Le Chatelier; pressure; moles of gas.',
    },
  },
  {
    id: 'chem-grade9-atmosphere-001',
    subject: 'Chemistry',
    paper: 2,
    tier: 'Higher',
    topic: 'Chemistry of the atmosphere',
    type: 'explanation',
    question: 'Evaluate the evidence that human activity has caused the increase in atmospheric CO₂ concentration since the industrial revolution. (5 marks)',
    marks: 5,
    calculatorAllowed: false,
    commonMistakes: ['only one piece of evidence', 'not evaluating', 'confusing correlation and causation'],
    correctAnswer: 'Evidence: ice core data show CO₂ and temperature correlated over 800,000 years; CO₂ rose from ~280 ppm to ~420 ppm since 1850; timing matches industrial revolution and fossil fuel use; carbon isotope ratio in atmospheric CO₂ shows more carbon from fossil sources (different ¹³C/¹²C). Correlation does not prove causation, but multiple lines of evidence (timing, isotopes, known emissions) support human cause. Natural factors (volcanoes, solar) do not explain the rise.',
    feedback: {
      correct: 'Good evaluation. You presented evidence (ice cores, timing, isotopes) and discussed strength of the argument.',
      incorrect: 'Include: ice core data, timing with industry, isotope evidence. Evaluate: correlation vs causation; multiple lines of evidence support human cause.',
      ideaReference: 'Greenhouse effect; evidence for anthropogenic climate change; scientific evaluation.',
    },
  },
  {
    id: 'chem-grade9-titration-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Higher',
    topic: 'Chemical changes',
    type: 'explanation',
    question: 'In a titration, the burette is rinsed with water but not with the solution to be added. Explain how this could affect the results and whether the calculated concentration would be too high or too low. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['wrong direction of error', 'not explaining dilution', 'confusing with flask'],
    correctAnswer: 'Rinsing with water leaves droplets of water in the burette. The solution added from the burette is diluted by this water. The diluted solution has lower concentration; more volume is needed to deliver the same number of moles. Titre volume is larger than it should be. Calculated concentration of the unknown would be too high (we think we used more moles than we did).',
    feedback: {
      correct: 'Correct. You explained the dilution, the effect on titre, and the direction of error in the calculation.',
      incorrect: 'Water dilutes the solution in burette. More volume needed for same moles. Titre too large. Calculated concentration too high.',
      ideaReference: 'Titration errors; dilution; systematic error.',
    },
  },

  // ========== PHYSICS GRADE 9-STYLE QUESTIONS ==========
  {
    id: 'phys-grade9-forces-001',
    subject: 'Physics',
    paper: 2,
    tier: 'Higher',
    topic: 'Forces',
    type: 'calculation',
    question: 'A car of mass 1200 kg accelerates from rest to 25 m/s in 8.0 s. Calculate the resultant force acting on the car. (3 marks)',
    marks: 3,
    calculatorAllowed: true,
    equations: ['F = ma', 'a = (v − u) / t'],
    commonMistakes: ['wrong acceleration', 'forgetting units', 'using wrong formula'],
    correctAnswer: 'a = (v − u) / t = (25 − 0) / 8 = 3.125 m/s². F = ma = 1200 × 3.125 = 3750 N.',
    feedback: {
      correct: 'Correct. You found acceleration from the kinematic equation, then applied F = ma.',
      incorrect: 'First find a = Δv / t. Then F = ma. Ensure units: mass in kg, velocity in m/s.',
      ideaReference: 'F = ma; kinematics; resultant force.',
    },
  },
  {
    id: 'phys-grade9-energy-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Energy stores and transfers',
    type: 'calculation',
    question: 'A ball of mass 0.50 kg is dropped from 4.0 m. Calculate its speed when it has fallen 2.0 m. Assume g = 10 m/s² and no air resistance. (4 marks)',
    marks: 4,
    calculatorAllowed: true,
    equations: ['GPE = mgh', 'KE = ½mv²', 'energy conserved'],
    commonMistakes: ['wrong height', 'missing conversion', 'wrong sign'],
    correctAnswer: 'Loss in GPE = gain in KE. mgh = ½mv². gh = ½v². v² = 2gh = 2 × 10 × 2 = 40. v = √40 = 6.3 m/s (2 s.f.).',
    feedback: {
      correct: 'Correct. You used conservation of energy and correctly found the speed after 2 m fall.',
      incorrect: 'GPE lost = KE gained. mgh = ½mv². Cancel m. v² = 2gh. Use h = 2.0 m (distance fallen).',
      ideaReference: 'Conservation of energy; GPE; KE.',
    },
  },
  {
    id: 'phys-grade9-waves-001',
    subject: 'Physics',
    paper: 2,
    tier: 'Higher',
    topic: 'Waves',
    type: 'calculation',
    question: 'A wave has frequency 50 Hz and wavelength 0.60 m. Calculate the wave speed. Another wave has the same speed but frequency 100 Hz. Calculate its wavelength. (4 marks)',
    marks: 4,
    calculatorAllowed: true,
    equations: ['v = fλ'],
    commonMistakes: ['wrong rearrangement', 'unit errors', 'confusing the two waves'],
    correctAnswer: 'v = fλ = 50 × 0.60 = 30 m/s. For second wave: λ = v/f = 30/100 = 0.30 m.',
    feedback: {
      correct: 'Correct. You used v = fλ for both parts and correctly rearranged for the second.',
      incorrect: 'v = fλ. Part 1: v = 50 × 0.60. Part 2: λ = v ÷ f (same v, new f).',
      ideaReference: 'Wave equation; v = fλ.',
    },
  },
  {
    id: 'phys-grade9-electricity-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Electricity',
    type: 'explanation',
    question: 'Two identical resistors are connected in parallel. The total resistance is 6 Ω. What is the resistance of each resistor? Explain your reasoning. (4 marks)',
    marks: 4,
    calculatorAllowed: true,
    commonMistakes: ['saying 3 Ω each', 'wrong parallel formula', 'not explaining'],
    correctAnswer: 'For parallel: 1/R_total = 1/R₁ + 1/R₂. If R₁ = R₂ = R, then 1/R_total = 2/R, so R_total = R/2. R = 2 × R_total = 2 × 6 = 12 Ω. Each resistor is 12 Ω.',
    feedback: {
      correct: 'Correct. You used the parallel formula and showed that for identical resistors, R_total = R/2.',
      incorrect: 'Parallel: 1/R_total = 1/R₁ + 1/R₂. For identical: R_total = R/2. So R = 2 × 6 = 12 Ω.',
      ideaReference: 'Resistors in parallel; 1/R_total = 1/R₁ + 1/R₂.',
    },
  },
  {
    id: 'phys-grade9-particle-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Particle model of matter',
    type: 'explanation',
    question: 'Explain why the pressure of a gas in a sealed container increases when the temperature increases, in terms of particle motion. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['saying particles expand', 'not linking to collisions', 'vague explanation'],
    correctAnswer: 'Temperature increase gives particles more kinetic energy. They move faster. Faster particles collide with the container walls more frequently. They also hit the walls harder (greater change in momentum per collision). Pressure is force per unit area; more frequent and harder collisions mean greater force on the walls. So pressure increases.',
    feedback: {
      correct: 'Correct. You linked temperature → kinetic energy → particle speed → collision frequency and force → pressure.',
      incorrect: 'Temperature → kinetic energy → faster particles → more collisions per second with walls → harder collisions → higher pressure.',
      ideaReference: 'Particle model; pressure; kinetic theory.',
    },
  },
  {
    id: 'phys-grade9-radioactivity-001',
    subject: 'Physics',
    paper: 2,
    tier: 'Higher',
    topic: 'Atomic structure',
    type: 'explanation',
    question: 'A sample of radioactive material has a half-life of 5 years. Explain what this means and calculate the fraction of the original activity remaining after 15 years. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['wrong fraction', 'not explaining half-life', 'confusing activity and mass'],
    correctAnswer: 'Half-life: time for half the nuclei to decay (or activity to halve). 15 years = 3 half-lives. After 1 half-life: ½ remaining. After 2: ¼. After 3: ⅛. Fraction remaining = 1/8.',
    feedback: {
      correct: 'Correct. You defined half-life and correctly calculated the fraction after 3 half-lives.',
      incorrect: 'Half-life = time to halve. 15 years = 3 half-lives. Each halving: ½ × ½ × ½ = 1/8.',
      ideaReference: 'Half-life; radioactive decay.',
    },
  },
  {
    id: 'phys-grade9-magnetism-001',
    subject: 'Physics',
    paper: 2,
    tier: 'Higher',
    topic: 'Magnetism and electromagnetism',
    type: 'explanation',
    question: 'Explain why a wire carrying a current experiences a force when placed in a magnetic field, and how the direction of the force can be reversed. (4 marks)',
    marks: 4,
    calculatorAllowed: false,
    commonMistakes: ['not mentioning Fleming\'s rule', 'wrong way to reverse', 'confusing with induction'],
    correctAnswer: 'Current in wire creates a magnetic field around it. This field interacts with the external magnetic field. The two fields combine; the wire experiences a force (Fleming\'s left-hand rule: thumb = force, first finger = field, second finger = current). To reverse force: reverse current direction OR reverse magnetic field direction. Reversing both gives same force direction.',
    feedback: {
      correct: 'Correct. You explained the field interaction and Fleming\'s rule, and correctly stated how to reverse the force.',
      incorrect: 'Current creates field; interacts with external field; force (Fleming\'s left-hand rule). Reverse current or reverse field to reverse force.',
      ideaReference: 'Force on current in magnetic field; Fleming\'s left-hand rule.',
    },
  },
  {
    id: 'phys-grade9-shc-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Higher',
    topic: 'Particle model of matter',
    type: 'calculation',
    question: 'A 2.0 kg block of aluminium is heated from 20°C to 100°C. The specific heat capacity of aluminium is 900 J/kg°C. Calculate the energy transferred. (3 marks)',
    marks: 3,
    calculatorAllowed: true,
    equations: ['E = mcΔT'],
    commonMistakes: ['wrong ΔT', 'unit confusion', 'wrong formula'],
    correctAnswer: 'E = mcΔT = 2.0 × 900 × (100 − 20) = 2.0 × 900 × 80 = 144 000 J = 144 kJ.',
    feedback: {
      correct: 'Correct. You used E = mcΔT with correct ΔT and units.',
      incorrect: 'E = mcΔT. ΔT = 100 − 20 = 80°C. Ensure mass in kg, c in J/kg°C.',
      ideaReference: 'Specific heat capacity; E = mcΔT.',
    },
  },

  // ========== COMBINED SCIENCE — Shorter, synoptic-style questions ==========
  {
    id: 'combined-diffusion-osmosis-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Cell Biology',
    type: 'explanation',
    question: 'State one similarity and one difference between diffusion and osmosis. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    combinedScience: true,
    commonMistakes: ['saying they are the same', 'confusing water with particles'],
    correctAnswer: 'Similarity: both involve movement of particles down a concentration gradient; both are passive (no energy needed). Difference: osmosis is movement of water only through a partially permeable membrane; diffusion can be any particle.',
    feedback: {
      correct: 'Correct. You identified a valid similarity (gradient, passive) and difference (water only, membrane).',
      incorrect: 'Similarity: both passive, down gradient. Difference: osmosis = water only, through membrane; diffusion = any particle.',
      ideaReference: 'Diffusion vs osmosis; concentration gradient.',
    },
  },
  {
    id: 'combined-respiration-combustion-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Higher',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'Using your knowledge of both biology and chemistry: respiration and combustion both release carbon dioxide. Compare the two processes. (3 marks)',
    marks: 3,
    calculatorAllowed: false,
    combinedScience: true,
    commonMistakes: ['saying they are identical', 'missing enzyme control'],
    correctAnswer: 'Both oxidise carbon-containing compounds; both produce CO₂ and release energy. Respiration: occurs in cells, controlled by enzymes, gradual release of energy. Combustion: rapid, high temperature, not enzyme-controlled. Respiration is more efficient at capturing energy.',
    feedback: {
      correct: 'Good synoptic answer. You linked biology (respiration, enzymes) and chemistry (combustion, oxidation) and compared them.',
      incorrect: 'Both: oxidation, CO₂, energy. Respiration: in cells, enzymes, controlled. Combustion: rapid, high temp. Link both sciences.',
      ideaReference: 'Respiration; combustion; oxidation; energy release.',
    },
  },
  {
    id: 'combined-atom-cell-001',
    subject: 'Chemistry',
    paper: 1,
    tier: 'Foundation',
    topic: 'Atomic structure',
    type: 'explanation',
    question: 'An atom has 6 protons and 6 neutrons. What is its atomic number and mass number? (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    combinedScience: true,
    commonMistakes: ['confusing atomic and mass number', 'adding wrong'],
    correctAnswer: 'Atomic number = 6 (number of protons). Mass number = 12 (protons + neutrons = 6 + 6).',
    feedback: {
      correct: 'Correct. Atomic number = protons; mass number = protons + neutrons.',
      incorrect: 'Atomic number = protons. Mass number = protons + neutrons.',
      ideaReference: 'Atomic structure; atomic number; mass number.',
    },
  },
  {
    id: 'combined-energy-transfer-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Foundation',
    topic: 'Energy stores and transfers',
    type: 'explanation',
    question: 'A cyclist brakes and stops. Describe the energy transfer. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    combinedScience: true,
    commonMistakes: ['saying energy is destroyed', 'missing heating'],
    correctAnswer: 'Kinetic energy of the cyclist and bike is transferred to thermal energy (heat) in the brakes and surroundings. Energy is conserved.',
    feedback: {
      correct: 'Correct. You identified the energy transfer (kinetic → thermal) and that energy is conserved.',
      incorrect: 'Kinetic energy → thermal energy (heat in brakes). Energy is not destroyed.',
      ideaReference: 'Energy transfers; conservation of energy.',
    },
  },
  {
    id: 'combined-photosynthesis-equation-001',
    subject: 'Biology',
    paper: 1,
    tier: 'Foundation',
    topic: 'Bioenergetics',
    type: 'explanation',
    question: 'Write the word equation for photosynthesis. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    combinedScience: true,
    commonMistakes: ['wrong reactants or products', 'missing light/chlorophyll'],
    correctAnswer: 'Carbon dioxide + water → glucose + oxygen (in the presence of light and chlorophyll).',
    feedback: {
      correct: 'Correct. You included all reactants, products, and conditions.',
      incorrect: 'CO₂ + H₂O → glucose + O₂. Need light and chlorophyll as conditions.',
      ideaReference: 'Photosynthesis; word equation.',
    },
  },
  {
    id: 'combined-circuit-001',
    subject: 'Physics',
    paper: 1,
    tier: 'Foundation',
    topic: 'Electricity',
    type: 'explanation',
    question: 'In a series circuit, what happens to the current when another lamp is added? Explain. (2 marks)',
    marks: 2,
    calculatorAllowed: false,
    combinedScience: true,
    commonMistakes: ['saying current increases', 'saying current is used up'],
    correctAnswer: 'Current decreases. Adding another lamp increases total resistance. Same potential difference, higher resistance → lower current (V = IR).',
    feedback: {
      correct: 'Correct. You linked adding a lamp to resistance and used V = IR.',
      incorrect: 'More components = more resistance. I = V/R, so current decreases. Current is not used up.',
      ideaReference: 'Series circuit; resistance; V = IR.',
    },
  },
];

// ============================================================================
// BIOLOGY PRACTICALS - Required Practicals (AQA GCSE)
// ============================================================================

export const SCIENCE_PRACTICALS: SciencePractical[] = [
  // ========== PAPER 1 PRACTICALS ==========
  {
    id: 'bio-microscopy',
    subject: 'Biology',
    title: 'Use of microscopes to observe cells',
    purpose: 'To observe and draw plant and animal cells using a light microscope, and calculate magnification.',
    independentVariable: 'Type of cell (plant or animal)',
    dependentVariable: 'Cell structures observed',
    controlledVariables: ['Microscope magnification', 'Staining method', 'Slide preparation method'],
    equipment: [
      'Light microscope',
      'Microscope slides and coverslips',
      'Dropper or pipette',
      'Iodine solution (stain)',
      'Forceps',
      'Scalpel or mounted needle',
      'Onion or prepared cell sample',
      'Paper towel',
    ],
    setupSteps: [
      'Ensure microscope is on a stable surface with light source working',
      'Start with the lowest magnification objective lens (e.g. ×4)',
      'Clean slide and coverslip if reusing',
    ],
    methodSteps: [
      'Place a drop of water on a clean slide',
      'Obtain a thin layer of cells (e.g., onion epidermis)',
      'Place cells on the slide',
      'Add a drop of iodine solution to stain',
      'Lower a coverslip onto the slide at an angle to avoid air bubbles',
      'Place slide on microscope stage',
      'Start with lowest magnification objective lens',
      'Use coarse focus, then fine focus to bring cells into view',
      'Switch to higher magnification',
      'Draw and label observed structures',
    ],
    risks: [
      {
        hazard: 'Iodine solution',
        risk: 'Stains skin and clothing',
        control: 'Wear lab coat and handle carefully',
      },
      {
        hazard: 'Glass slides',
        risk: 'Cuts if broken',
        control: 'Handle carefully, dispose of broken glass safely',
      },
    ],
    dataTable: {
      headers: ['Cell type', 'Structures observed', 'Magnification'],
    },
    graphExpectations: undefined,
    visual: { diagramId: 'cell_membrane_diffusion', description: 'Cell structure and diffusion' },
    evaluationQuestions: [
      {
        question: 'What limitations affect the accuracy of this practical?',
        expectedPoints: [
          'Resolution limit of light microscope - cannot see smaller structures',
          'Staining may distort cell structure',
          'Cells may be damaged during preparation',
          'Subjective judgement when drawing cells',
        ],
      },
      {
        question: 'How could you improve the reliability of your observations?',
        expectedPoints: [
          'Repeat observations with multiple slides',
          'Use different staining methods to confirm structures',
          'Compare observations with other students',
          'Use higher magnification to see more detail',
        ],
      },
    ],
  },
  {
    id: 'bio-enzyme-activity',
    subject: 'Biology',
    title: 'Investigating the effect of pH on enzyme activity',
    purpose: 'To determine the effect of pH on the rate of enzyme-catalyzed reaction using amylase and starch.',
    independentVariable: 'pH of solution',
    dependentVariable: 'Time taken for starch to be broken down (s)',
    controlledVariables: [
      'Temperature',
      'Enzyme concentration',
      'Substrate concentration',
      'Volume of solutions',
      'Same method for detecting starch (iodine test)',
    ],
    equipment: [
      'Water bath (37°C)',
      'Test tubes and rack',
      'Buffer solutions (different pH values)',
      'Amylase solution',
      'Starch solution',
      'Iodine solution',
      'Stopwatch or timer',
      'Pipettes or syringes',
    ],
    setupSteps: [
      'Set water bath to 37°C and allow to reach temperature',
      'Prepare buffer solutions at range of pH (e.g. 4, 5, 6, 7, 8)',
      'Label test tubes for each pH',
    ],
    methodSteps: [
      'Set up water bath at 37°C',
      'Prepare buffer solutions at different pH values',
      'Add amylase solution to each buffer',
      'Add starch solution to each',
      'Start timer',
      'At regular intervals, remove a sample and test with iodine',
      'Stop timer when iodine test is negative (no blue-black colour)',
      'Record time taken',
      'Repeat at each pH',
      'Calculate rate (1/time)',
    ],
    risks: [
      {
        hazard: 'Iodine solution',
        risk: 'Stains skin and clothing',
        control: 'Wear lab coat and handle carefully',
      },
      {
        hazard: 'Hot water bath',
        risk: 'Burns',
        control: 'Use tongs, allow to cool before handling',
      },
    ],
    dataTable: {
      headers: ['pH', 'Time for starch breakdown (s)', 'Rate (1/time)'],
      exampleRow: ['5', '120', '0.0083'],
    },
    graphExpectations: {
      xAxis: 'pH',
      yAxis: 'Rate of reaction (1/time)',
      type: 'line',
      expectedTrend: 'Rate increases to optimum pH, then decreases (bell-shaped curve)',
    },
    visual: { diagramId: 'enzyme_action', description: 'Enzyme active site and pH effect' },
    evaluationQuestions: [
      {
        question: 'What makes this experiment unreliable?',
        expectedPoints: [
          'Subjective judgement of when iodine test becomes negative',
          'pH may change during the reaction',
          'Temperature may not be constant',
          'Timing errors',
        ],
      },
      {
        question: 'How could you improve the accuracy of this investigation?',
        expectedPoints: [
          'Use colorimeter to measure starch concentration objectively',
          'Use pH meter to monitor pH continuously',
          'Use water bath with thermostat to maintain constant temperature',
          'Repeat each pH multiple times and calculate mean',
        ],
      },
    ],
  },
  {
    id: 'bio-osmosis-potato',
    subject: 'Biology',
    title: 'Investigating osmosis in potato cylinders',
    purpose: 'To determine the effect of sugar solution concentration on the mass of potato tissue.',
    independentVariable: 'Concentration of sugar solution (%)',
    dependentVariable: 'Change in mass of potato cylinder (g)',
    controlledVariables: [
      'Size of potato cylinders',
      'Time left in solution',
      'Temperature',
      'Same type of potato',
      'Method of drying before weighing',
    ],
    methodSteps: [
      'Cut potato into equal-sized cylinders using a cork borer',
      'Measure initial mass of each cylinder',
      'Place each cylinder in a different concentration of sugar solution',
      'Leave for 30 minutes',
      'Remove cylinders and pat dry with paper towel',
      'Measure final mass of each cylinder',
      'Calculate change in mass',
      'Calculate percentage change in mass',
      'Repeat for each concentration',
    ],
    risks: [
      {
        hazard: 'Cork borer',
        risk: 'Cuts',
        control: 'Handle carefully, use cutting board',
      },
    ],
    dataTable: {
      headers: ['Sugar concentration (%)', 'Initial mass (g)', 'Final mass (g)', 'Change in mass (g)', 'Percentage change (%)'],
      exampleRow: ['0', '2.5', '2.7', '+0.2', '+8'],
    },
    graphExpectations: {
      xAxis: 'Sugar concentration (%)',
      yAxis: 'Percentage change in mass (%)',
      type: 'line',
      expectedTrend: 'Mass decreases as concentration increases (negative correlation), crosses zero at isotonic point',
    },
    visual: { diagramId: 'osmosis_diagram', description: 'Osmosis in potato cylinders' },
    evaluationQuestions: [
      {
        question: 'What sources of error affect the accuracy of this investigation?',
        expectedPoints: [
          'Inconsistent cylinder size',
          'Incomplete drying before weighing',
          'Different parts of potato may have different water content',
          'Time not exactly the same for all cylinders',
        ],
      },
      {
        question: 'How could you improve the reliability of this investigation?',
        expectedPoints: [
          'Use more cylinders at each concentration and calculate mean',
          'Ensure all cylinders are same length and diameter',
          'Use same method for drying all cylinders',
          'Use water bath to maintain constant temperature',
        ],
      },
    ],
  },
  
  // ========== PAPER 2 PRACTICALS ==========
  {
    id: 'bio-reaction-time',
    subject: 'Biology',
    title: 'Investigating human reaction times',
    purpose: 'To measure human reaction time and determine factors that affect it.',
    independentVariable: 'Factor being tested (e.g., caffeine, practice, age)',
    dependentVariable: 'Reaction time (s)',
    controlledVariables: [
      'Same test method',
      'Same person (if testing different factors)',
      'Same conditions (lighting, noise)',
      'Same time of day',
    ],
    methodSteps: [
      'Person A holds a ruler vertically above person B\'s hand',
      'Person B positions thumb and forefinger at zero mark',
      'Person A drops ruler without warning',
      'Person B catches ruler as quickly as possible',
      'Record distance ruler fell before being caught',
      'Convert distance to reaction time using conversion table',
      'Repeat 5 times',
      'Calculate mean reaction time',
      'Repeat with different conditions or people',
    ],
    risks: [
      {
        hazard: 'Ruler',
        risk: 'Minor injury if dropped on foot',
        control: 'Handle carefully, work in clear space',
      },
    ],
    dataTable: {
      headers: ['Trial', 'Distance fallen (cm)', 'Reaction time (s)'],
      exampleRow: ['1', '25', '0.23'],
    },
    graphExpectations: {
      xAxis: 'Trial number',
      yAxis: 'Reaction time (s)',
      type: 'scatter',
      expectedTrend: 'Reaction time may decrease with practice (improvement)',
    },
    visual: { diagramId: 'nervous_system', description: 'Stimulus → receptor → response' },
    evaluationQuestions: [
      {
        question: 'What makes this experiment unreliable?',
        expectedPoints: [
          'Subjective - person may anticipate the drop',
          'Human error in measuring distance',
          'Variation in attention levels',
          'Conversion from distance to time may introduce error',
        ],
      },
      {
        question: 'How could you improve this investigation?',
        expectedPoints: [
          'Use computer-based reaction time test for more accuracy',
          'Increase number of repeats',
          'Use random intervals between tests to prevent anticipation',
          'Control for factors like tiredness and distractions',
        ],
      },
    ],
  },
  {
    id: 'bio-plant-responses',
    subject: 'Biology',
    title: 'Investigating the effect of light on plant growth',
    purpose: 'To determine how light direction affects the growth of seedlings (phototropism).',
    independentVariable: 'Direction of light',
    dependentVariable: 'Direction of growth (angle from vertical)',
    controlledVariables: [
      'Type of plant',
      'Age of seedlings',
      'Light intensity',
      'Temperature',
      'Water availability',
      'Time period',
    ],
    methodSteps: [
      'Plant cress seeds in identical pots with same soil',
      'Place all pots in same conditions until seedlings appear',
      'Set up different light conditions: one with light from above, one with light from side',
      'Leave for several days',
      'Measure angle of growth from vertical',
      'Record observations',
      'Repeat with multiple seedlings',
    ],
    risks: [
      {
        hazard: 'None significant',
        risk: 'Low risk practical',
        control: 'Standard lab safety',
      },
    ],
    dataTable: {
      headers: ['Light direction', 'Angle of growth (°)', 'Observations'],
      exampleRow: ['Above', '0', 'Grew straight up'],
    },
    graphExpectations: {
      xAxis: 'Light direction',
      yAxis: 'Angle of growth (°)',
      type: 'bar',
      expectedTrend: 'Seedlings grow towards light source',
    },
    evaluationQuestions: [
      {
        question: 'What factors could affect the reliability of this investigation?',
        expectedPoints: [
          'Uneven light distribution',
          'Seedlings may be at different growth stages',
          'Subjective measurement of angle',
          'Other environmental factors not controlled',
        ],
      },
      {
        question: 'How could you improve this investigation?',
        expectedPoints: [
          'Use more seedlings and calculate mean angle',
          'Use protractor for accurate angle measurement',
          'Control all other environmental factors',
          'Use time-lapse photography to track growth',
        ],
      },
    ],
  },
  {
    id: 'bio-field-investigation',
    subject: 'Biology',
    title: 'Field investigation: measuring the distribution of organisms',
    purpose: 'To investigate how the distribution of a plant species changes across an environmental gradient (e.g., from shade to sunlight).',
    independentVariable: 'Position along transect (distance from starting point)',
    dependentVariable: 'Abundance of plant species (number per quadrat)',
    controlledVariables: [
      'Size of quadrat',
      'Method of counting',
      'Time of year',
      'Weather conditions',
    ],
    methodSteps: [
      'Lay out a transect line across the area',
      'Place quadrat at regular intervals along transect',
      'Count number of target species in each quadrat',
      'Record environmental factor at each point (e.g., light intensity)',
      'Repeat with multiple transects',
      'Calculate mean abundance at each position',
      'Plot graph of abundance against environmental factor',
    ],
    risks: [
      {
        hazard: 'Outdoor hazards',
        risk: 'Uneven ground, weather',
        control: 'Wear appropriate clothing and footwear, work in pairs',
      },
    ],
    dataTable: {
      headers: ['Distance along transect (m)', 'Abundance (number)', 'Light intensity (lux)'],
      exampleRow: ['0', '5', '200'],
    },
    visual: { diagramId: 'quadrat_sampling', description: 'Quadrat and transect sampling' },
    graphExpectations: {
      xAxis: 'Light intensity (lux)',
      yAxis: 'Abundance (number per quadrat)',
      type: 'scatter',
      expectedTrend: 'May show correlation between abundance and light intensity',
    },
    evaluationQuestions: [
      {
        question: 'What limitations affect the accuracy of this investigation?',
        expectedPoints: [
          'Quadrat placement may miss some organisms',
          'Environmental factors may vary within quadrat',
          'Other factors not measured may affect distribution',
          'Sampling may not be representative',
        ],
      },
      {
        question: 'How could you improve the reliability of this investigation?',
        expectedPoints: [
          'Use more transects and calculate mean',
          'Use larger quadrats or more quadrats',
          'Measure multiple environmental factors',
          'Repeat at different times of year',
        ],
      },
    ],
  },
  {
    id: 'bio-food-tests',
    subject: 'Biology',
    title: 'Food tests: testing for carbohydrates, lipids and proteins',
    purpose: 'To use qualitative reagents to test for the presence of starch, reducing sugars, protein and lipids in food samples.',
    independentVariable: 'Type of food sample',
    dependentVariable: 'Result of each food test (positive or negative)',
    controlledVariables: ['Volume of sample', 'Volume and concentration of reagents', 'Temperature (for Benedict\'s)', 'Same method for each test'],
    equipment: [
      'Test tubes and rack',
      'Water bath (for Benedict\'s test)',
      'Iodine solution',
      'Benedict\'s reagent',
      'Biuret reagent',
      'Ethanol (for lipid test)',
      'Distilled water',
      'Dropper pipettes',
      'Food samples (e.g. bread, milk, cheese, potato, oil)',
    ],
    setupSteps: [
      'Prepare small samples of each food (crushed or liquid as appropriate)',
      'Label test tubes for each sample and test type',
      'Set water bath to about 80°C for Benedict\'s test',
    ],
    methodSteps: [
      'Test for starch: add a few drops of iodine solution to the sample. Blue-black colour = starch present.',
      'Test for reducing sugar: add Benedict\'s reagent and heat in water bath. Brick-red precipitate = reducing sugar present (green/yellow/orange for trace).',
      'Test for protein: add Biuret reagent (sodium hydroxide then copper sulfate). Lilac/purple = protein present.',
      'Test for lipids: add ethanol and shake, then add water. Milky emulsion = lipid present.',
      'Record results in a table (positive or negative for each test and each sample).',
    ],
    risks: [
      { hazard: 'Benedict\'s reagent', risk: 'Irritant', control: 'Wear safety goggles, avoid skin contact' },
      { hazard: 'Ethanol', risk: 'Flammable', control: 'No naked flames, use in well-ventilated area' },
      { hazard: 'Iodine solution', risk: 'Stains skin and clothing', control: 'Wear lab coat, handle carefully' },
    ],
    dataTable: {
      headers: ['Food sample', 'Starch (iodine)', 'Reducing sugar (Benedict\'s)', 'Protein (Biuret)', 'Lipid (ethanol)'],
      exampleRow: ['Bread', 'Positive', 'Negative', 'Positive', 'Negative'],
    },
    graphExpectations: undefined,
    visual: { description: 'Food test reagents and colour changes' },
    evaluationQuestions: [
      {
        question: 'Why might a food sample give a negative result even when the nutrient is present?',
        expectedPoints: [
          'Sample too dilute',
          'Benedict\'s only detects reducing sugars (not non-reducing like sucrose)',
          'Not heated long enough for Benedict\'s',
          'Contamination or wrong reagent',
        ],
      },
      {
        question: 'How could you make the results more reliable?',
        expectedPoints: ['Repeat each test', 'Use same volume of sample and reagent', 'Compare against known positive and negative controls', 'Crush solid samples consistently'],
      },
    ],
  },
  {
    id: 'bio-photosynthesis-rate',
    subject: 'Biology',
    title: 'Investigating the effect of light intensity on the rate of photosynthesis',
    purpose: 'To determine how light intensity affects the rate of photosynthesis in pondweed (e.g. Cabomba or Elodea) by measuring oxygen production.',
    independentVariable: 'Light intensity (distance from lamp or use of screens)',
    dependentVariable: 'Rate of oxygen production (bubbles per minute or volume of gas collected)',
    controlledVariables: [
      'Temperature of water',
      'Carbon dioxide concentration (e.g. sodium hydrogen carbonate solution)',
      'Same plant species and health',
      'Time allowed for plant to acclimatise',
    ],
    equipment: [
      'Aquarium or large beaker of water',
      'Pondweed (Cabomba or Elodea)',
      'Lamp (bench lamp)',
      'Ruler or metre rule',
      'Sodium hydrogen carbonate solution',
      'Stopwatch',
      'Thermometer',
      'Optional: gas syringe or inverted measuring cylinder to collect oxygen',
    ],
    setupSteps: [
      'Fill beaker with water and add sodium hydrogen carbonate to supply CO₂',
      'Place pondweed in beaker with cut end uppermost',
      'Position lamp at a set distance (e.g. 10 cm)',
      'Allow 2–3 minutes for plant to acclimatise before counting bubbles',
    ],
    methodSteps: [
      'Set lamp at first distance (e.g. 10 cm from plant)',
      'Wait for bubbles to be produced steadily',
      'Count number of bubbles produced in one minute (or measure volume of gas in syringe)',
      'Record result',
      'Move lamp to different distance (e.g. 20 cm, 30 cm, 40 cm) and repeat',
      'Repeat each distance at least once and calculate mean',
      'Calculate rate (bubbles per minute or cm³ per minute)',
      'Plot graph of rate of photosynthesis against light intensity (or 1/distance² if using inverse square relationship)',
    ],
    risks: [
      { hazard: 'Lamp', risk: 'Heat and electrical', control: 'Do not touch hot bulb, keep cables dry' },
      { hazard: 'Water', risk: 'Spills', control: 'Place on tray, mop spills' },
    ],
    dataTable: {
      headers: ['Distance (cm)', 'Bubbles per minute (mean)', 'Rate (1/time or volume/min)'],
      exampleRow: ['10', '24', '24'],
    },
    graphExpectations: {
      xAxis: 'Light intensity (or 1/distance²)',
      yAxis: 'Rate of photosynthesis (bubbles/min or cm³/min)',
      type: 'line',
      expectedTrend: 'Rate increases as light intensity increases, then plateaus when another factor (e.g. CO₂ or temperature) becomes limiting',
    },
    visual: { diagramId: 'photosynthesis_light_graph', description: 'Rate of photosynthesis vs light intensity' },
    evaluationQuestions: [
      {
        question: 'Why might the rate of photosynthesis level off at high light intensity?',
        expectedPoints: [
          'Another factor becomes limiting (e.g. CO₂ concentration or temperature)',
          'Chlorophyll or enzymes working at maximum rate',
          'All available light absorbed',
        ],
      },
      {
        question: 'What are the limitations of using bubble count to measure rate of photosynthesis?',
        expectedPoints: [
          'Bubble size may vary',
          'Some gas may be lost or dissolved',
          'Subjective to decide when to start/stop counting',
          'Oxygen is not the only product (glucose also produced)',
        ],
      },
    ],
  },

  // ========== CHEMISTRY (keeping existing) ==========
  {
    id: 'chem-rate-temperature',
    subject: 'Chemistry',
    title: 'Investigating the effect of temperature on rate of reaction',
    purpose: 'To determine how temperature affects the rate of reaction between sodium thiosulfate and hydrochloric acid.',
    independentVariable: 'Temperature (°C)',
    dependentVariable: 'Time taken for cross to disappear (s)',
    controlledVariables: ['Concentration of solutions', 'Volume of solutions', 'Same cross visibility'],
    methodSteps: [
      'Measure 50 cm³ of sodium thiosulfate solution into a conical flask',
      'Place flask on a piece of paper with a cross marked on it',
      'Add 5 cm³ of hydrochloric acid and start timer',
      'Stop timer when cross is no longer visible',
      'Repeat at different temperatures',
    ],
    risks: [
      {
        hazard: 'Hydrochloric acid',
        risk: 'Skin/eye irritation',
        control: 'Wear safety goggles and handle carefully',
      },
    ],
    dataTable: {
      headers: ['Temperature (°C)', 'Time (s)', 'Rate (1/time)'],
    },
    visual: { diagramId: 'particle_model', description: 'Particles and temperature' },
    graphExpectations: {
      xAxis: 'Temperature (°C)',
      yAxis: 'Rate (1/time)',
      type: 'line',
      expectedTrend: 'Rate increases exponentially with temperature',
    },
    evaluationQuestions: [
      {
        question: 'What makes this experiment unreliable?',
        expectedPoints: [
          'Subjective judgement of when cross disappears',
          'Temperature may not be constant throughout',
          'Human error in timing',
        ],
      },
    ],
  },
  {
    id: 'chem-titration',
    subject: 'Chemistry',
    title: 'Titration: finding the concentration of a solution',
    purpose: 'To find the volume of acid needed to neutralise a known volume of alkali, then calculate the concentration of the acid.',
    independentVariable: 'Volume of acid added',
    dependentVariable: 'Volume of acid at end point (to neutralise alkali)',
    controlledVariables: ['Concentration and volume of alkali', 'Indicator', 'Same technique'],
    methodSteps: [
      'Rinse burette with acid, fill with acid, record initial reading',
      'Pipette 25 cm³ of alkali into conical flask',
      'Add a few drops of indicator (e.g. phenolphthalein)',
      'Add acid from burette with swirling until indicator just changes colour',
      'Record final burette reading',
      'Repeat until concordant results (within 0.2 cm³)',
      'Calculate mean titre and use to find concentration',
    ],
    risks: [
      { hazard: 'Acid and alkali', risk: 'Irritant', control: 'Wear safety goggles, handle carefully' },
    ],
    dataTable: { headers: ['Trial', 'Initial burette (cm³)', 'Final burette (cm³)', 'Titre (cm³)'], exampleRow: ['1', '0.0', '24.8', '24.8'] },
    graphExpectations: undefined,
    visual: { diagramId: 'titration_setup', description: 'Burette, pipette and conical flask setup' },
    evaluationQuestions: [
      {
        question: 'What sources of error affect the accuracy of a titration?',
        expectedPoints: [
          'Indicator may change at slightly wrong pH',
          'Parallax when reading burette',
          'Incomplete mixing before end point',
          'Pipette and burette calibration',
        ],
      },
    ],
  },
  {
    id: 'chem-electrolysis-prac',
    subject: 'Chemistry',
    title: 'Electrolysis of aqueous solutions',
    purpose: 'To observe the products of electrolysis at the cathode and anode for different solutions (e.g. copper sulfate with copper electrodes).',
    independentVariable: 'Solution or type of electrode',
    dependentVariable: 'Products at cathode and anode',
    controlledVariables: ['Current', 'Time', 'Concentration of solution'],
    methodSteps: [
      'Set up electrolysis cell with power pack and electrodes',
      'Pour solution into beaker',
      'Connect electrodes and pass current for several minutes',
      'Observe and record products at cathode (e.g. copper deposited) and anode (e.g. oxygen or anode dissolves)',
      'Test any gases with litmus or glowing splint',
    ],
    risks: [
      { hazard: 'Electricity and solutions', risk: 'Electric shock', control: 'Low voltage only, dry hands' },
    ],
    dataTable: { headers: ['Solution', 'Cathode product', 'Anode product'] },
    graphExpectations: undefined,
    visual: { diagramId: 'electrolysis_diagram', description: 'Electrolysis setup and electrodes' },
    evaluationQuestions: [
      {
        question: 'Why might the mass of cathode increase not equal the mass of anode decrease?',
        expectedPoints: [
          'Anode may produce gas instead of dissolving',
          'Some product may be lost or not deposited',
          'Side reactions may occur',
        ],
      },
    ],
  },
  {
    id: 'chem-making-salts',
    subject: 'Chemistry',
    title: 'Making salts from acids and bases (required practical)',
    purpose: 'To prepare a pure, dry sample of a soluble salt from an acid and an insoluble base (e.g. copper sulfate from copper oxide and sulfuric acid).',
    independentVariable: 'Type of acid and base used',
    dependentVariable: 'Mass of salt produced',
    controlledVariables: ['Concentration of acid', 'Temperature', 'Same drying method'],
    equipment: [
      'Dilute sulfuric acid (or other acid)',
      'Insoluble base (e.g. copper oxide)',
      'Beaker',
      'Bunsen burner and tripod gauze',
      'Filter funnel and filter paper',
      'Evaporating basin',
      'Spatula',
      'Balance',
    ],
    setupSteps: [
      'Measure volume of acid into beaker',
      'Warm gently (do not boil)',
      'Add base in small amounts with stirring until no more dissolves (base in excess)',
    ],
    methodSteps: [
      'Add the insoluble base to the acid in small portions, stirring each time.',
      'Continue until no more base dissolves (excess base remains). This ensures all acid has reacted.',
      'Filter the mixture to remove excess base. Collect the filtrate (salt solution).',
      'Pour filtrate into evaporating basin. Heat gently to evaporate some water until crystals form (or evaporate to dryness for a dry sample).',
      'Leave to cool and crystallise, or dry the crystals between filter paper.',
      'Weigh the mass of pure, dry salt produced.',
    ],
    risks: [
      { hazard: 'Acid', risk: 'Irritant', control: 'Wear safety goggles, handle carefully' },
      { hazard: 'Bunsen burner', risk: 'Burns', control: 'Take care with naked flame, tie back hair' },
    ],
    dataTable: { headers: ['Mass of base added (g)', 'Volume of acid (cm³)', 'Mass of salt produced (g)'] },
    graphExpectations: undefined,
    visual: { description: 'Filtration and crystallisation setup' },
    evaluationQuestions: [
      {
        question: 'Why do we add the base in excess?',
        expectedPoints: ['To ensure all the acid has reacted', 'Excess base can be filtered off', 'If acid were in excess, the salt would be contaminated with acid'],
      },
      {
        question: 'Why might the actual yield be less than the theoretical yield?',
        expectedPoints: ['Some product lost during filtering or transfer', 'Crystals left in solution', 'Incomplete reaction', 'Evaporation not taken to full dryness'],
      },
    ],
  },
  {
    id: 'chem-chromatography',
    subject: 'Chemistry',
    title: 'Paper chromatography (required practical)',
    purpose: 'To use paper chromatography to separate and identify the coloured substances in a mixture (e.g. ink or food colouring).',
    independentVariable: 'Solvent used (e.g. water, ethanol)',
    dependentVariable: 'Distance moved by each spot / Rf value',
    controlledVariables: ['Same type of paper', 'Same depth of solvent', 'Same temperature', 'Same starting position of spot'],
    equipment: [
      'Chromatography paper (or filter paper cut into strips)',
      'Pencil and ruler',
      'Beaker or chromatography tank',
      'Solvent (e.g. water, or ethanol and water mixture)',
      'Capillary tube or fine pipette',
      'Samples (e.g. different inks, food colourings)',
    ],
    setupSteps: [
      'Draw a pencil line about 1–2 cm from the bottom of the paper (pencil does not dissolve in solvent).',
      'Place small spots of each sample on the line, spaced apart. Allow to dry.',
      'Pour solvent into beaker to depth of about 1 cm (below the pencil line).',
    ],
    methodSteps: [
      'Place the paper in the beaker so the bottom edge is in the solvent but the spots are above the solvent level.',
      'Put a lid on the beaker to prevent solvent evaporating and to keep the atmosphere saturated.',
      'Allow the solvent to move up the paper until it is near the top (or for a set time).',
      'Remove the paper and mark the solvent front with pencil. Allow to dry.',
      'Measure the distance from the start line to each spot and to the solvent front.',
      'Calculate Rf = distance moved by spot ÷ distance moved by solvent. Compare Rf values to identify substances.',
    ],
    risks: [
      { hazard: 'Solvent (e.g. ethanol)', risk: 'Flammable, irritant', control: 'No naked flames, use in well-ventilated area, wear goggles' },
    ],
    dataTable: { headers: ['Colour / substance', 'Distance moved by spot (cm)', 'Distance to solvent front (cm)', 'Rf value'] },
    graphExpectations: undefined,
    visual: { description: 'Chromatography paper with separated spots' },
    evaluationQuestions: [
      {
        question: 'Why must the start line be drawn in pencil and not ink?',
        expectedPoints: ['Ink would dissolve in the solvent and run up the paper', 'Pencil does not dissolve so the start line stays fixed', 'Ink would contaminate the chromatogram'],
      },
      {
        question: 'What does a single spot that does not move tell you about the substance?',
        expectedPoints: ['It is insoluble in the solvent used', 'Try a different solvent', 'It may be a pure substance that does not separate under these conditions'],
      },
    ],
  },
  {
    id: 'chem-water-purification',
    subject: 'Chemistry',
    title: 'Water purification (required practical)',
    purpose: 'To purify water by distillation or by using a filter and desalination techniques (e.g. to make seawater safe to drink or to compare drinking water with pure water).',
    independentVariable: 'Method of purification (e.g. filtration, distillation)',
    dependentVariable: 'Purity of water (e.g. dissolved solid content, pH, conductivity)',
    controlledVariables: ['Volume of sample', 'Same testing method', 'Same source water'],
    equipment: [
      'Source water (e.g. tap water, or simulated contaminated water)',
      'Distillation apparatus (round-bottom flask, condenser, receiving flask, heat source) or filtration equipment',
      'Filter funnel and filter paper (for filtration)',
      'Conductivity meter or dissolved solids test (optional)',
      'pH paper or pH meter',
      'Bunsen burner and tripod (for distillation)',
    ],
    setupSteps: [
      'Set up distillation apparatus: flask containing water, condenser with cold water in and out, receiving flask.',
      'Or set up filtration: funnel with filter paper over a beaker.',
    ],
    methodSteps: [
      'For filtration: pour water through filter paper. Collect filtrate. Observe clarity. Test pH and conductivity if available.',
      'For distillation: heat the water in the flask. Water vapour passes into the condenser, cools and condenses. Collect the distillate in the receiving flask. Do not boil to dryness.',
      'Compare the purity of filtered vs distilled water (e.g. dissolved solids, pH). Distillation removes dissolved substances; filtration mainly removes insoluble particles.',
      'Record results and conclude which method produces purer water.',
    ],
    risks: [
      { hazard: 'Hot apparatus', risk: 'Burns', control: 'Allow to cool before handling, use heat-resistant gloves' },
      { hazard: 'Glassware', risk: 'Cuts if broken', control: 'Handle carefully, secure apparatus' },
    ],
    dataTable: { headers: ['Sample', 'Appearance', 'pH', 'Conductivity (optional)', 'Dissolved solids (optional)'] },
    graphExpectations: undefined,
    visual: { description: 'Distillation apparatus and filtration setup' },
    evaluationQuestions: [
      {
        question: 'Why does distillation produce purer water than filtration?',
        expectedPoints: [
          'Filtration only removes insoluble particles',
          'Distillation evaporates water and leaves dissolved impurities behind',
          'Distillate is condensed water vapour, so dissolved salts and other solutes are not carried over (if done correctly)',
        ],
      },
      {
        question: 'What are the drawbacks of distillation for producing drinking water on a large scale?',
        expectedPoints: ['Uses a lot of energy (heating)', 'Slow process', 'Expensive', 'Not practical for large volumes compared to other methods'],
      },
    ],
  },

  // ========== PHYSICS REQUIRED PRACTICALS ==========
  {
    id: 'phys-resistance',
    subject: 'Physics',
    title: 'Investigating resistance of a wire (or resistor)',
    purpose: 'To determine how the resistance of a wire depends on its length (or how resistance of a circuit changes with components).',
    independentVariable: 'Length of wire (or number of resistors)',
    dependentVariable: 'Resistance (calculated from V and I)',
    controlledVariables: ['Type of wire', 'Temperature', 'Same ammeter and voltmeter'],
    methodSteps: [
      'Set up circuit with wire (or variable resistor), ammeter in series, voltmeter in parallel with wire',
      'Measure current and potential difference for one length',
      'Calculate R = V/I',
      'Change length of wire (or add resistor), repeat',
      'Record several pairs of V and I',
      'Plot graph of R against length (or determine trend)',
    ],
    risks: [
      { hazard: 'Mains or low voltage', risk: 'Overheating', control: 'Use low voltage, do not leave on long' },
    ],
    dataTable: { headers: ['Length (cm)', 'V (V)', 'I (A)', 'R (Ω)'] },
    visual: { diagramId: 'circuit_diagram', description: 'Circuit with ammeter and voltmeter' },
    graphExpectations: { xAxis: 'Length (cm)', yAxis: 'Resistance (Ω)', type: 'line', expectedTrend: 'Resistance proportional to length' },
    evaluationQuestions: [
      {
        question: 'What could cause the line of best fit not to pass through the origin?',
        expectedPoints: ['Contact resistance at crocodile clips', 'Zero error in meters', 'Wire not at constant temperature'],
      },
    ],
  },
  {
    id: 'phys-density-prac',
    subject: 'Physics',
    title: 'Determining the density of a regular solid',
    purpose: 'To measure the mass and dimensions of a regular solid and calculate its density.',
    independentVariable: 'Type of solid (or repeat for same solid)',
    dependentVariable: 'Density (calculated)',
    controlledVariables: ['Same balance', 'Same ruler or vernier'],
    methodSteps: [
      'Measure mass of solid using balance',
      'Measure length, width, height (or radius) using ruler or vernier calipers',
      'Calculate volume (e.g. volume = length × width × height for cuboid)',
      'Calculate density = mass ÷ volume',
      'Repeat for same solid and calculate mean density',
    ],
    risks: [{ hazard: 'None significant', risk: 'Low', control: 'Standard lab practice' }],
    dataTable: { headers: ['Mass (g)', 'Length (cm)', 'Width (cm)', 'Height (cm)', 'Volume (cm³)', 'Density (g/cm³)'] },
    graphExpectations: undefined,
    visual: { diagramId: 'density_measurement', description: 'Balance and ruler for mass and volume' },
    evaluationQuestions: [
        {
        question: 'What limits the accuracy of this experiment?',
        expectedPoints: ['Resolution of balance and ruler', 'Irregular shape assumed regular', 'Parallax when reading scale'],
      },
    ],
  },
  {
    id: 'phys-shc-prac',
    subject: 'Physics',
    title: 'Determining specific heat capacity of a material',
    purpose: 'To heat a block (or water) with an immersion heater and use E = Pt and E = mcΔT to find specific heat capacity.',
    independentVariable: 'Material (or fixed material)',
    dependentVariable: 'Temperature rise (ΔT)',
    controlledVariables: ['Time of heating', 'Power of heater', 'Initial conditions'],
    methodSteps: [
      'Measure mass of block (or water and container)',
      'Insert thermometer and heater, record initial temperature',
      'Switch on heater for a set time (e.g. 5 minutes), record time',
      'Record final temperature',
      'Calculate energy supplied: E = P × t (power in W, time in s)',
      'Use c = E / (m × ΔT) to find specific heat capacity',
    ],
    risks: [
      { hazard: 'Hot surfaces', risk: 'Burns', control: 'Allow to cool before handling' },
    ],
    dataTable: { headers: ['Mass (kg)', 'Power (W)', 'Time (s)', 'ΔT (°C)', 'E (J)', 'c (J/kg°C)'] },
    graphExpectations: undefined,
    visual: { diagramId: 'specific_heat_capacity_setup', description: 'Immersion heater, block and thermometer' },
    evaluationQuestions: [
        {
        question: 'Why might the calculated specific heat capacity be higher than the true value?',
        expectedPoints: ['Energy lost to surroundings', 'Not all heat transferred to block', 'Thermometer not at hottest point'],
      },
    ],
  },
  {
    id: 'phys-waves-prac',
    subject: 'Physics',
    title: 'Investigating waves in a ripple tank or with a string',
    purpose: 'To measure the wavelength and frequency of waves and calculate wave speed (v = fλ).',
    independentVariable: 'Frequency (or depth of water)',
    dependentVariable: 'Wavelength (and hence speed)',
    controlledVariables: ['Same medium', 'Same equipment'],
    methodSteps: [
      'Set up ripple tank or vibrating string',
      'Measure wavelength using metre rule (distance for several waves ÷ number)',
      'Measure or set frequency (e.g. from signal generator)',
      'Calculate wave speed v = f × λ',
      'Repeat for different frequencies if required',
    ],
    risks: [{ hazard: 'Water', risk: 'Slip', control: 'Mop spills' }],
    dataTable: { headers: ['Frequency (Hz)', 'Wavelength (m)', 'Speed (m/s)'] },
    visual: { diagramId: 'wave_types', description: 'Transverse and longitudinal waves' },
    graphExpectations: { xAxis: 'Frequency (Hz)', yAxis: 'Wavelength (m)', type: 'line', expectedTrend: 'λ decreases as f increases if v constant' },
    evaluationQuestions: [
      {
        question: 'What could cause inaccuracy in measuring wavelength?',
        expectedPoints: ['Waves not perfectly regular', 'Parallax when measuring', 'Reflections from tank edges'],
      },
    ],
  },
  {
    id: 'phys-force-acceleration',
    subject: 'Physics',
    title: 'Investigating force and acceleration (F = ma)',
    purpose: 'To determine the relationship between resultant force and acceleration for a fixed mass (or mass and acceleration for fixed force).',
    independentVariable: 'Resultant force (e.g. different masses on string over pulley)',
    dependentVariable: 'Acceleration (from trolley and light gates or ticker tape)',
    controlledVariables: ['Total mass of system (if varying force)', 'Friction reduced (e.g. friction-compensated ramp)'],
    methodSteps: [
      'Set up trolley, string, pulley and masses so that falling mass provides resultant force',
      'Measure acceleration using light gates or ticker timer',
      'Record force (F = mg for falling mass) and acceleration',
      'Repeat for different forces (different masses)',
      'Plot graph of F against a; should be straight line through origin (gradient = mass)',
    ],
    risks: [{ hazard: 'Moving trolley and masses', risk: 'Impact', control: 'Clear area, catch masses' }],
    dataTable: { headers: ['Force F (N)', 'Acceleration a (m/s²)'] },
    visual: { diagramId: 'free_body_diagram', description: 'Forces and acceleration' },
    graphExpectations: { xAxis: 'Force (N)', yAxis: 'Acceleration (m/s²)', type: 'line', expectedTrend: 'Linear through origin; gradient = 1/mass' },
    evaluationQuestions: [
      {
        question: 'Why might the graph not pass through the origin?',
        expectedPoints: ['Friction not fully compensated', 'Systematic error in force or acceleration', 'String mass or pulley friction'],
      },
    ],
  },
  {
    id: 'phys-force-extension',
    subject: 'Physics',
    title: 'Investigating the relationship between force and extension for a spring',
    purpose: 'To determine the relationship between the force applied to a spring and its extension (Hooke\'s law) and find the spring constant. To identify the limit of proportionality.',
    independentVariable: 'Force applied (N)',
    dependentVariable: 'Extension of spring (m or cm)',
    controlledVariables: ['Same spring', 'Same ruler and clamp stand', 'Measure from same reference point'],
    methodSteps: [
      'Set up clamp stand with spring hanging vertically. Attach a ruler alongside to measure length.',
      'Record the original length of the spring (unloaded).',
      'Add a mass (e.g. 100 g) to the spring. Weight = mg (e.g. 1 N for 100 g). Record new length. Extension = new length − original length.',
      'Add more masses in steps (e.g. 100 g, 200 g, 300 g …). Record force (N) and extension (m or cm) each time.',
      'Continue until the spring no longer returns to original length when unloaded (past elastic limit), or extension is no longer proportional to force.',
      'Plot a graph of force (y-axis) against extension (x-axis).',
      'The gradient of the linear region = spring constant k (F = kx). Identify the limit of proportionality where the line bends.',
    ],
    risks: [
      { hazard: 'Spring under tension', risk: 'Spring or masses may fall', control: 'Secure clamp, keep feet clear' },
      { hazard: 'Masses', risk: 'Impact if dropped', control: 'Handle carefully, use tray below' },
    ],
    dataTable: { headers: ['Force F (N)', 'Length (m)', 'Extension (m)'] },
    visual: { diagramId: 'hookes_law_graph', description: 'Force vs extension; Hooke\'s law and elastic limit' },
    graphExpectations: {
      xAxis: 'Extension (m)',
      yAxis: 'Force (N)',
      type: 'line',
      expectedTrend: 'Linear through origin up to limit of proportionality; then curve where spring is permanently deformed',
    },
    evaluationQuestions: [
      {
        question: 'What is the limit of proportionality and how would you identify it from your graph?',
        expectedPoints: [
          'The point beyond which extension is no longer proportional to force',
          'Where the graph stops being a straight line through the origin',
          'Beyond this point the spring may not return to original length (plastic behaviour)',
        ],
      },
      {
        question: 'Why might the gradient (spring constant) vary between different springs?',
        expectedPoints: ['Different stiffness (material or coil thickness)', 'Different number of coils', 'Different original length', 'Different cross-sectional area of wire'],
      },
    ],
  },
];

// ============================================================================
// PRACTICAL QUIZ QUESTIONS – Test setup, variables, method, risks, evaluation
// ============================================================================

export const PRACTICAL_QUIZ_QUESTIONS: PracticalQuizQuestion[] = [
  // ---------- bio-microscopy ----------
  {
    id: 'pq-bio-microscopy-setup-1',
    practicalId: 'bio-microscopy',
    category: 'setup',
    type: 'multipleChoice',
    question: 'What is the first step when setting up the microscope slide?',
    options: [
      'Place the slide on the stage',
      'Place a drop of water on a clean slide',
      'Add iodine solution to stain',
      'Lower the coverslip',
    ],
    correctAnswer: 'Place a drop of water on a clean slide',
    feedback: {
      correct: 'Correct. You always start with a drop of water on the slide before adding the specimen.',
      incorrect: 'The first step is to place a drop of water on a clean slide. The specimen is then placed in the water.',
    },
  },
  {
    id: 'pq-bio-microscopy-setup-2',
    practicalId: 'bio-microscopy',
    category: 'setup',
    type: 'multipleChoice',
    question: 'Why do you lower the coverslip at an angle?',
    options: [
      'To make the slide look neat',
      'To avoid trapping air bubbles',
      'To spread the stain evenly',
      'To reduce magnification',
    ],
    correctAnswer: 'To avoid trapping air bubbles',
    feedback: {
      correct: 'Correct. Lowering at an angle pushes air out and avoids bubbles that would obscure the view.',
      incorrect: 'Lowering the coverslip at an angle reduces air bubbles. Bubbles would block light and make it hard to see cells.',
    },
  },
  {
    id: 'pq-bio-microscopy-variables',
    practicalId: 'bio-microscopy',
    category: 'variables',
    type: 'multipleChoice',
    question: 'What is the dependent variable in the microscopy practical?',
    options: [
      'Type of cell (plant or animal)',
      'Cell structures observed',
      'Microscope magnification',
      'Staining method',
    ],
    correctAnswer: 'Cell structures observed',
    feedback: {
      correct: 'Correct. The dependent variable is what you measure or observe – the cell structures you see.',
      incorrect: 'The dependent variable is what you observe or measure: the cell structures. The type of cell would be the independent variable if you were comparing plant vs animal.',
    },
  },
  {
    id: 'pq-bio-microscopy-method',
    practicalId: 'bio-microscopy',
    category: 'method',
    type: 'dragOrder',
    question: 'Put these steps in the correct order.',
    options: [
      'Place slide on microscope stage',
      'Start with lowest magnification',
      'Add a drop of iodine solution to stain',
      'Lower coverslip onto the slide at an angle',
      'Use coarse focus, then fine focus',
    ],
    correctAnswer: [
      'Add a drop of iodine solution to stain',
      'Lower coverslip onto the slide at an angle',
      'Place slide on microscope stage',
      'Start with lowest magnification',
      'Use coarse focus, then fine focus',
    ],
    feedback: {
      correct: 'Correct. Stain first, then coverslip, then place on stage, then low mag, then focus.',
      incorrect: 'Order: stain → lower coverslip (at an angle) → place on stage → lowest magnification → coarse then fine focus.',
    },
  },
  {
    id: 'pq-bio-microscopy-risks',
    practicalId: 'bio-microscopy',
    category: 'risks',
    type: 'multipleChoice',
    question: 'What is the main risk when using iodine solution and how do you control it?',
    options: [
      'Fire – keep away from flames',
      'Stains skin and clothing – wear lab coat and handle carefully',
      'Poisoning – do not ingest',
      'Cuts – use plastic bottles only',
    ],
    correctAnswer: 'Stains skin and clothing – wear lab coat and handle carefully',
    feedback: {
      correct: 'Correct. Iodine stains are hard to remove; lab coat and care minimise the risk.',
      incorrect: 'Iodine solution stains skin and clothing. The control is to wear a lab coat and handle it carefully.',
    },
  },
  {
    id: 'pq-bio-microscopy-eval',
    practicalId: 'bio-microscopy',
    category: 'evaluation',
    type: 'multipleChoice',
    question: 'Which is a limitation of the light microscope in this practical?',
    options: [
      'It is too heavy to move',
      'Resolution limit – you cannot see smaller structures like ribosomes',
      'It only works in the dark',
      'It cannot magnify plant cells',
    ],
    correctAnswer: 'Resolution limit – you cannot see smaller structures like ribosomes',
    feedback: {
      correct: 'Correct. Resolution is limited by the wavelength of light; smaller organelles need an electron microscope.',
      incorrect: 'The key limitation is resolution: light microscopes cannot show structures smaller than about 0.2 μm (e.g. ribosomes).',
    },
  },
  // ---------- bio-enzyme-activity ----------
  {
    id: 'pq-bio-enzyme-setup-1',
    practicalId: 'bio-enzyme-activity',
    category: 'setup',
    type: 'multipleChoice',
    question: 'Before starting the enzyme practical, what must you set up first?',
    options: [
      'The starch solution',
      'A water bath at 37°C',
      'The iodine test tubes',
      'The buffer solutions',
    ],
    correctAnswer: 'A water bath at 37°C',
    feedback: {
      correct: 'Correct. Enzymes work at body temperature; the water bath must be at 37°C before you add enzymes.',
      incorrect: 'The water bath should be set to 37°C first so it is ready when you add the enzyme and starch.',
    },
  },
  {
    id: 'pq-bio-enzyme-variables',
    practicalId: 'bio-enzyme-activity',
    category: 'variables',
    type: 'multipleChoice',
    question: 'In the amylase and starch practical, what is the independent variable?',
    options: [
      'Time taken for starch to be broken down',
      'Rate of reaction',
      'pH of solution',
      'Temperature',
    ],
    correctAnswer: 'pH of solution',
    feedback: {
      correct: 'Correct. You change the pH (e.g. different buffers) to see its effect on the rate.',
      incorrect: 'The independent variable is the one you change – here, the pH of the solution. Time (or rate) is what you measure (dependent).',
    },
  },
  {
    id: 'pq-bio-enzyme-method',
    practicalId: 'bio-enzyme-activity',
    category: 'method',
    type: 'multipleChoice',
    question: 'How do you know when the starch has been broken down in this practical?',
    options: [
      'The solution goes cloudy',
      'The iodine test stays orange (no blue-black colour)',
      'The solution heats up',
      'Bubbles appear',
    ],
    correctAnswer: 'The iodine test stays orange (no blue-black colour)',
    feedback: {
      correct: 'Correct. Iodine turns blue-black with starch. When starch is gone, the iodine test stays orange.',
      incorrect: 'You use the iodine test: starch gives blue-black with iodine. When the reaction is complete, a sample no longer turns blue-black (stays orange).',
    },
  },
  {
    id: 'pq-bio-enzyme-risks',
    practicalId: 'bio-enzyme-activity',
    category: 'risks',
    type: 'multipleChoice',
    question: 'What is the main hazard when using the water bath at 37°C?',
    options: [
      'Electric shock',
      'Burns from hot water',
      'Spills only',
      'No significant hazard',
    ],
    correctAnswer: 'Burns from hot water',
    feedback: {
      correct: 'Correct. Use tongs and allow equipment to cool before handling to avoid burns.',
      incorrect: 'Hot water can cause burns. Control: use tongs and let equipment cool before touching.',
    },
  },
  {
    id: 'pq-bio-enzyme-eval',
    practicalId: 'bio-enzyme-activity',
    category: 'evaluation',
    type: 'multipleChoice',
    question: 'Which improvement would make the results more reliable?',
    options: [
      'Using a larger beaker',
      'Using a colorimeter to measure starch concentration objectively',
      'Doing the experiment in the dark',
      'Using more iodine',
    ],
    correctAnswer: 'Using a colorimeter to measure starch concentration objectively',
    feedback: {
      correct: 'Correct. A colorimeter removes the subjective judgement of when the iodine test becomes negative.',
      incorrect: 'Judging when the iodine test turns negative is subjective. A colorimeter gives an objective measure of starch concentration.',
    },
  },
  // ---------- bio-osmosis-potato ----------
  {
    id: 'pq-bio-osmosis-setup',
    practicalId: 'bio-osmosis-potato',
    category: 'setup',
    type: 'multipleChoice',
    question: 'What do you use to cut equal-sized potato cylinders?',
    options: [
      'Scalpel only',
      'Cork borer',
      'Scissors',
      'Ruler and knife',
    ],
    correctAnswer: 'Cork borer',
    feedback: {
      correct: 'Correct. A cork borer gives cylinders of the same diameter; length can be cut to match.',
      incorrect: 'A cork borer is used to get cylinders of the same diameter so size is controlled.',
    },
  },
  {
    id: 'pq-bio-osmosis-variables',
    practicalId: 'bio-osmosis-potato',
    category: 'variables',
    type: 'multipleChoice',
    question: 'What is the independent variable in the potato osmosis practical?',
    options: [
      'Change in mass of potato cylinder',
      'Concentration of sugar solution',
      'Time left in solution',
      'Temperature',
    ],
    correctAnswer: 'Concentration of sugar solution',
    feedback: {
      correct: 'Correct. You change the concentration (e.g. 0%, 5%, 10%) to see its effect on mass change.',
      incorrect: 'The independent variable is the one you change – the concentration of the sugar solution.',
    },
  },
  {
    id: 'pq-bio-osmosis-eval',
    practicalId: 'bio-osmosis-potato',
    category: 'evaluation',
    type: 'multipleChoice',
    question: 'Why might drying the potato with a paper towel before weighing cause error?',
    options: [
      'It has no effect',
      'Inconsistent drying – some cylinders may be drier than others',
      'Paper towel adds mass',
      'It makes the potato absorb water',
    ],
    correctAnswer: 'Inconsistent drying – some cylinders may be drier than others',
    feedback: {
      correct: 'Correct. Inconsistent drying changes the mass you measure; it should be done the same way each time.',
      incorrect: 'If drying is inconsistent, the final mass you record varies. This is a source of error; use the same method for all cylinders.',
    },
  },
  // ---------- chem-rate-temperature ----------
  {
    id: 'pq-chem-rate-setup',
    practicalId: 'chem-rate-temperature',
    category: 'setup',
    type: 'multipleChoice',
    question: 'What do you place the conical flask on when doing the disappearing cross experiment?',
    options: [
      'A tripod',
      'A piece of paper with a cross marked on it',
      'A heatproof mat only',
      'The bench directly',
    ],
    correctAnswer: 'A piece of paper with a cross marked on it',
    feedback: {
      correct: 'Correct. The cross is used to judge when the reaction has made the solution opaque.',
      incorrect: 'The flask sits on paper with a cross so you can time how long until the cross is no longer visible through the solution.',
    },
  },
  {
    id: 'pq-chem-rate-variables',
    practicalId: 'chem-rate-temperature',
    category: 'variables',
    type: 'multipleChoice',
    question: 'What is the dependent variable in the sodium thiosulfate and acid practical?',
    options: [
      'Temperature',
      'Concentration of acid',
      'Time taken for cross to disappear',
      'Volume of solution',
    ],
    correctAnswer: 'Time taken for cross to disappear',
    feedback: {
      correct: 'Correct. You measure the time for the cross to disappear as the reaction produces cloudy sulfur.',
      incorrect: 'The dependent variable is what you measure – the time (in seconds) until the cross can no longer be seen.',
    },
  },
  {
    id: 'pq-chem-rate-risks',
    practicalId: 'chem-rate-temperature',
    category: 'risks',
    type: 'multipleChoice',
    question: 'What is the main hazard when using hydrochloric acid in this practical?',
    options: [
      'Fire',
      'Irritant – can damage skin and eyes',
      'Explosive when heated',
      'No significant hazard',
    ],
    correctAnswer: 'Irritant – can damage skin and eyes',
    feedback: {
      correct: 'Correct. Wear eye protection and wash spills; acid is irritant.',
      incorrect: 'Hydrochloric acid is irritant. Wear eye protection and handle carefully; wash any spills.',
    },
  },
  // ---------- phys-shc-prac ----------
  {
    id: 'pq-phys-shc-setup',
    practicalId: 'phys-shc-prac',
    category: 'setup',
    type: 'multipleChoice',
    question: 'Why do you need to measure the mass of the block before heating in the specific heat capacity practical?',
    options: [
      'To know how long to heat it',
      'The equation requires mass: E = mcΔT',
      'To choose the right heater',
      'It is not necessary',
    ],
    correctAnswer: 'The equation requires mass: E = mcΔT',
    feedback: {
      correct: 'Correct. You need mass (m) to calculate specific heat capacity from E = mcΔT.',
      incorrect: 'The specific heat capacity equation is E = mcΔT. You need the mass of the block (m) to find c.',
    },
  },
  {
    id: 'pq-phys-shc-eval',
    practicalId: 'phys-shc-prac',
    category: 'evaluation',
    type: 'multipleChoice',
    question: 'Why might some energy from the heater not raise the block’s temperature?',
    options: [
      'Energy cannot be lost',
      'Heat is lost to the surroundings (insulation not perfect)',
      'The thermometer is wrong',
      'Mass changes during heating',
    ],
    correctAnswer: 'Heat is lost to the surroundings (insulation not perfect)',
    feedback: {
      correct: 'Correct. Not all electrical energy goes into the block; some is lost, so your value of c may be off.',
      incorrect: 'Energy is lost to the air and the surroundings. Better insulation or a lid would reduce this systematic error.',
    },
  },

  // ---------- 6-mark style questions (select all that would get marks) ----------
  {
    id: 'pq-bio-microscopy-6mark',
    practicalId: 'bio-microscopy',
    category: 'method',
    type: 'multiSelect',
    marks: 6,
    question: 'A 6-mark question asks: "Describe how to prepare a microscope slide and observe cells." Which of these would get a mark? Select all that apply.',
    options: [
      'Place a drop of water on a clean slide',
      'Obtain a thin layer of cells (e.g. onion epidermis)',
      'Add iodine solution to stain the cells',
      'Lower the coverslip at an angle to avoid air bubbles',
      'Start with the lowest magnification objective lens',
      'Use coarse focus then fine focus to bring cells into view',
      'Use the highest magnification first to see detail',
      'Leave the slide to dry before placing on the stage',
    ],
    correctAnswer: [
      'Place a drop of water on a clean slide',
      'Obtain a thin layer of cells (e.g. onion epidermis)',
      'Add iodine solution to stain the cells',
      'Lower the coverslip at an angle to avoid air bubbles',
      'Start with the lowest magnification objective lens',
      'Use coarse focus then fine focus to bring cells into view',
    ],
    feedback: {
      correct: 'Full marks. You identified the key method points an examiner would credit.',
      incorrect: 'Review the method: start with low magnification, use stain, lower coverslip at an angle. Wrong options: highest mag first and leaving to dry are not correct.',
    },
  },
  {
    id: 'pq-bio-enzyme-6mark',
    practicalId: 'bio-enzyme-activity',
    category: 'evaluation',
    type: 'multiSelect',
    marks: 6,
    question: '"Evaluate the reliability of this investigation into the effect of pH on enzyme activity." Which points would get marks? Select all that apply.',
    options: [
      'Subjective judgement of when iodine test becomes negative reduces reliability',
      'Using a colorimeter would give an objective measure of starch concentration',
      'Repeating each pH and calculating mean would improve reliability',
      'Controlling temperature with a water bath improves reliability',
      'pH could change during the reaction – a limitation',
      'Using more test tubes would make it more reliable',
      'The same person should judge the end point each time',
      'Checking pH with a pH meter throughout would improve accuracy',
    ],
    correctAnswer: [
      'Subjective judgement of when iodine test becomes negative reduces reliability',
      'Using a colorimeter would give an objective measure of starch concentration',
      'Repeating each pH and calculating mean would improve reliability',
      'Controlling temperature with a water bath improves reliability',
      'pH could change during the reaction – a limitation',
      'Checking pH with a pH meter throughout would improve accuracy',
    ],
    feedback: {
      correct: 'Well done. You covered limitations (subjective end point, pH change) and improvements (colorimeter, repeat and mean, temperature control, pH meter).',
      incorrect: 'Good answers include: subjective end point; colorimeter for objectivity; repeat and mean; temperature control; pH changing; pH meter. "More test tubes" or "same person" are not the main mark points.',
    },
  },
  {
    id: 'pq-bio-osmosis-6mark',
    practicalId: 'bio-osmosis-potato',
    category: 'evaluation',
    type: 'multiSelect',
    marks: 6,
    question: '"Describe how you would investigate the effect of sugar concentration on the mass of potato cylinders." Which steps would get marks? Select all that apply.',
    options: [
      'Cut potato cylinders using a cork borer to keep size the same',
      'Measure initial mass of each cylinder',
      'Place each cylinder in a different concentration of sugar solution',
      'Leave for a set time (e.g. 30 minutes)',
      'Remove, dry with paper towel, measure final mass',
      'Calculate percentage change in mass',
      'Use the same potato for every cylinder',
      'Heat the solutions to 37°C first',
    ],
    correctAnswer: [
      'Cut potato cylinders using a cork borer to keep size the same',
      'Measure initial mass of each cylinder',
      'Place each cylinder in a different concentration of sugar solution',
      'Leave for a set time (e.g. 30 minutes)',
      'Remove, dry with paper towel, measure final mass',
      'Calculate percentage change in mass',
    ],
    feedback: {
      correct: 'Full marks. You identified the key method points: same size (cork borer), initial mass, range of concentrations, same time, dry then final mass, percentage change.',
      incorrect: 'Mark points: cork borer for same size; initial mass; different concentrations; set time; dry then weigh; percentage change. Same potato is a control, not a separate mark; heating to 37°C is not standard for this practical.',
    },
  },
  {
    id: 'pq-chem-rate-6mark',
    practicalId: 'chem-rate-temperature',
    category: 'method',
    type: 'multiSelect',
    marks: 6,
    question: '"Describe a method to investigate the effect of temperature on the rate of reaction between sodium thiosulfate and hydrochloric acid." Which would get marks? Select all that apply.',
    options: [
      'Place conical flask on a cross drawn on paper',
      'Add measured volume of sodium thiosulfate, then acid; start timer',
      'Stop timer when the cross can no longer be seen',
      'Repeat at different temperatures',
      'Use a water bath to heat the solution to each temperature',
      'Keep concentration and volume the same when changing temperature',
      'Stir the mixture to speed up the reaction',
      'Use the same cross and same lighting each time',
    ],
    correctAnswer: [
      'Place conical flask on a cross drawn on paper',
      'Add measured volume of sodium thiosulfate, then acid; start timer',
      'Stop timer when the cross can no longer be seen',
      'Repeat at different temperatures',
      'Use a water bath to heat the solution to each temperature',
      'Keep concentration and volume the same when changing temperature',
    ],
    feedback: {
      correct: 'Full marks. Key points: cross on paper, add solutions and start timer, stop when cross disappears, repeat at different temperatures, water bath for temperature, control concentration and volume.',
      incorrect: 'Mark points: cross on paper; add solutions and time; stop when cross disappears; repeat at different temperatures; water bath; control variables (concentration, volume). Same cross/lighting is control; stirring is not standard method.',
    },
  },
  {
    id: 'pq-phys-shc-6mark',
    practicalId: 'phys-shc-prac',
    category: 'evaluation',
    type: 'multiSelect',
    marks: 6,
    question: '"Explain how you would find the specific heat capacity of a metal block and evaluate the method." Which points would get marks? Select all that apply.',
    options: [
      'Measure mass of block; heat with heater for set time; measure temperature change',
      'Use E = Pt for energy supplied by heater',
      'Use c = E / (m × ΔT) to find specific heat capacity',
      'Heat lost to surroundings is a source of error',
      'Insulating the block would reduce heat loss',
      'Repeating and taking mean would improve reliability',
      'The block must be allowed to cool before weighing',
      'Use a thermometer with better resolution for accuracy',
    ],
    correctAnswer: [
      'Measure mass of block; heat with heater for set time; measure temperature change',
      'Use E = Pt for energy supplied by heater',
      'Use c = E / (m × ΔT) to find specific heat capacity',
      'Heat lost to surroundings is a source of error',
      'Insulating the block would reduce heat loss',
      'Repeating and taking mean would improve reliability',
    ],
    feedback: {
      correct: 'Full marks. You covered method (mass, heat, ΔT; E=Pt; c=E/(mΔT)) and evaluation (heat loss, insulation, repeat and mean).',
      incorrect: 'Mark points: measure mass and ΔT; E=Pt; c=E/(mΔT); heat loss to surroundings; insulation; repeat and mean. Cooling before weighing and thermometer resolution are minor/not the main 6 points.',
    },
  },
];

/**
 * Get quiz questions for a given practical (for Test your understanding)
 */
export function getPracticalQuizQuestions(practicalId: string): PracticalQuizQuestion[] {
  return PRACTICAL_QUIZ_QUESTIONS.filter(q => q.practicalId === practicalId);
}

// ============================================================================
// BIOLOGY EQUATIONS - Where Relevant (GCSE)
// ============================================================================

export const SCIENCE_EQUATIONS: ScienceEquation[] = [
  // ========== BIOLOGY EQUATIONS ==========
  {
    id: 'bio-magnification',
    subject: 'Biology',
    topic: 'Cell Biology',
    equation: 'Magnification = Image size ÷ Actual size',
    symbols: [
      {
        symbol: 'Magnification',
        name: 'Magnification',
        unit: 'No unit (×)',
        description: 'How many times larger the image is compared to the actual object',
      },
      {
        symbol: 'Image size',
        name: 'Image size',
        unit: 'mm or μm',
        description: 'Size of the object in the image/drawing',
      },
      {
        symbol: 'Actual size',
        name: 'Actual size',
        unit: 'mm or μm',
        description: 'Real size of the object',
      },
    ],
    unitTraps: [
      {
        wrongUnit: 'cm for small cells',
        correctUnit: 'mm or μm',
        explanation: 'Cells are very small - use mm or μm, not cm. Remember: 1 mm = 1000 μm',
      },
      {
        wrongUnit: 'Different units in calculation',
        correctUnit: 'Same units for both',
        explanation: 'Image size and actual size must be in the same units before dividing',
      },
    ],
    rearrangingPrompts: [
      {
        prompt: 'Rearrange to find actual size',
        correctRearrangement: 'Actual size = Image size ÷ Magnification',
      },
      {
        prompt: 'Rearrange to find image size',
        correctRearrangement: 'Image size = Magnification × Actual size',
      },
    ],
    practiceCalculations: [
      { prompt: 'An image is 50 mm long. The magnification is 100×. Find the actual size in mm.', answer: 0.5, unit: 'mm' },
      { prompt: 'Actual size is 0.02 mm, magnification is 250×. Find the image size in mm.', answer: 5, unit: 'mm' },
      { prompt: 'Image size 8 mm, actual size 0.04 mm. Find the magnification (no unit).', answer: 200, unit: '×' },
      { prompt: 'Under 400× magnification an object measures 2 mm on the image. Find actual size in mm.', answer: 0.005, unit: 'mm', tolerance: 0.0001 },
      { prompt: 'A cell is 50 μm across. Drawing is 25 mm. Find magnification.', answer: 500, unit: '×' },
    ],
  },
  {
    id: 'bio-percentage-change',
    subject: 'Biology',
    topic: 'Organisation',
    equation: 'Percentage change = (Change in mass ÷ Original mass) × 100',
    symbols: [
      {
        symbol: 'Percentage change',
        name: 'Percentage change',
        unit: '%',
        description: 'The percentage increase or decrease in mass',
      },
      {
        symbol: 'Change in mass',
        name: 'Change in mass',
        unit: 'g',
        description: 'Final mass - Initial mass (can be positive or negative)',
      },
      {
        symbol: 'Original mass',
        name: 'Original mass',
        unit: 'g',
        description: 'The initial mass before the change',
      },
    ],
    unitTraps: [
      {
        wrongUnit: 'Forgetting to multiply by 100',
        correctUnit: '%',
        explanation: 'Remember to multiply by 100 to convert decimal to percentage',
      },
      {
        wrongUnit: 'Using final mass instead of change',
        correctUnit: 'g (change)',
        explanation: 'You must calculate the change (final - initial) first, not use final mass directly',
      },
    ],
    rearrangingPrompts: [
      {
        prompt: 'Rearrange to find change in mass',
        correctRearrangement: 'Change in mass = (Percentage change ÷ 100) × Original mass',
      },
      {
        prompt: 'Rearrange to find original mass',
        correctRearrangement: 'Original mass = Change in mass ÷ (Percentage change ÷ 100)',
      },
    ],
    practiceCalculations: [
      { prompt: 'Original mass 20 g, final mass 24 g. Find percentage change in mass.', answer: 20, unit: '%' },
      { prompt: 'Original mass 50 g, change in mass −10 g. Find percentage change.', answer: -20, unit: '%' },
      { prompt: 'Percentage change is 25%, original mass is 40 g. Find the change in mass in g.', answer: 10, unit: 'g' },
      { prompt: 'A potato cylinder went from 2.0 g to 2.5 g. What is the percentage change in mass?', answer: 25, unit: '%' },
    ],
  },
  {
    id: 'bio-rate-calculation',
    subject: 'Biology',
    topic: 'Organisation',
    equation: 'Rate = 1 ÷ Time',
    symbols: [
      {
        symbol: 'Rate',
        name: 'Rate of reaction',
        unit: '1/s or s⁻¹',
        description: 'How fast a reaction occurs',
      },
      {
        symbol: 'Time',
        name: 'Time',
        unit: 's (seconds)',
        description: 'Time taken for reaction to complete',
      },
    ],
    unitTraps: [
      {
        wrongUnit: 'Using time directly as rate',
        correctUnit: '1/s',
        explanation: 'Rate is the reciprocal of time. Faster reactions have shorter times, so higher rates',
      },
      {
        wrongUnit: 'Forgetting to convert units',
        correctUnit: 's',
        explanation: 'Make sure time is in seconds. If given in minutes, convert first',
      },
    ],
    rearrangingPrompts: [
      {
        prompt: 'Rearrange to find time',
        correctRearrangement: 'Time = 1 ÷ Rate',
      },
    ],
    practiceCalculations: [
      { prompt: 'A reaction takes 20 s to complete. Find the rate in 1/s.', answer: 0.05, unit: '1/s', tolerance: 0.001 },
      { prompt: 'Rate of reaction is 0.1 s⁻¹. How long did the reaction take in seconds?', answer: 10, unit: 's' },
      { prompt: 'Time for reaction is 5 s. Find rate in s⁻¹.', answer: 0.2, unit: '1/s', tolerance: 0.01 },
      { prompt: 'Rate is 0.025 1/s. Find time in seconds.', answer: 40, unit: 's' },
    ],
  },
  
  // ========== CHEMISTRY EQUATIONS ==========
  {
    id: 'chem-rate-equation',
    subject: 'Chemistry',
    topic: 'Rate of reaction',
    equation: 'Rate = 1 ÷ Time',
    symbols: [
      { symbol: 'Rate', name: 'Rate of reaction', unit: '1/s or s⁻¹', description: 'How fast the reaction proceeds' },
      { symbol: 'Time', name: 'Time', unit: 's', description: 'Time taken for reaction to complete' },
    ],
    unitTraps: [
      { wrongUnit: 'Using time as rate', correctUnit: '1/s', explanation: 'Rate is the reciprocal of time. Faster reactions have shorter times.' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find time', correctRearrangement: 'Time = 1 ÷ Rate' },
    ],
    practiceCalculations: [
      { prompt: 'Sodium thiosulfate reaction takes 40 s. Find rate in 1/s.', answer: 0.025, unit: '1/s', tolerance: 0.001 },
      { prompt: 'Rate of reaction is 0.05 s⁻¹. Find time in seconds.', answer: 20, unit: 's' },
      { prompt: 'At 50°C the reaction takes 15 s. What is the rate in s⁻¹?', answer: 0.067, unit: '1/s', tolerance: 0.01 },
    ],
  },
  {
    id: 'chem-moles-equation',
    subject: 'Chemistry',
    topic: 'Quantitative chemistry',
    equation: 'moles = mass ÷ M_r',
    symbols: [
      { symbol: 'moles', name: 'Amount of substance', unit: 'mol', description: 'Number of moles' },
      { symbol: 'mass', name: 'Mass', unit: 'g', description: 'Mass of substance in grams' },
      { symbol: 'M_r', name: 'Relative formula mass', unit: 'No unit', description: 'Sum of relative atomic masses in the formula' },
    ],
    unitTraps: [
      { wrongUnit: 'Mass in kg', correctUnit: 'g', explanation: 'For this equation mass must be in grams' },
      { wrongUnit: 'Using atomic mass for a compound', correctUnit: 'M_r', explanation: 'Use relative formula mass for compounds (e.g. O₂ has M_r = 32)' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find mass', correctRearrangement: 'mass = moles × M_r' },
      { prompt: 'Rearrange to find M_r', correctRearrangement: 'M_r = mass ÷ moles' },
    ],
    practiceCalculations: [
      { prompt: 'How many grams in 2 moles of water, H₂O? (M_r = 18 g/mol)', answer: 36, unit: 'g' },
      { prompt: 'A sample has mass 80 g and M_r = 40. Find the number of moles.', answer: 2, unit: 'mol' },
      { prompt: 'How many moles in 16 g of methane CH₄? (M_r = 16)', answer: 1, unit: 'mol' },
      { prompt: 'Find mass in g of 3 moles of CO₂. (M_r = 44)', answer: 132, unit: 'g' },
      { prompt: '0.5 mol of a compound has mass 29 g. Find M_r.', answer: 58, unit: 'No unit' },
      { prompt: 'Sulfuric acid H₂SO₄ has M_r = 98. What mass in g is 0.25 mol?', answer: 24.5, unit: 'g', tolerance: 0.1 },
    ],
  },
  {
    id: 'chem-concentration-equation',
    subject: 'Chemistry',
    topic: 'Quantitative chemistry',
    equation: 'concentration = mass ÷ volume',
    symbols: [
      { symbol: 'concentration', name: 'Concentration', unit: 'g/dm³', description: 'Mass of solute per unit volume' },
      { symbol: 'mass', name: 'Mass of solute', unit: 'g', description: 'Mass dissolved' },
      { symbol: 'volume', name: 'Volume of solution', unit: 'dm³', description: 'Volume of solution (1 dm³ = 1000 cm³)' },
    ],
    unitTraps: [
      { wrongUnit: 'Volume in cm³ without converting', correctUnit: 'dm³', explanation: 'Convert cm³ to dm³ by dividing by 1000' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find mass', correctRearrangement: 'mass = concentration × volume' },
      { prompt: 'Rearrange to find volume', correctRearrangement: 'volume = mass ÷ concentration' },
    ],
    practiceCalculations: [
      { prompt: 'Concentration is 0.5 g/dm³, volume is 2 dm³. Find the mass of solute in g.', answer: 1, unit: 'g' },
      { prompt: 'Mass of solute is 10 g, concentration is 2 g/dm³. Find the volume in dm³.', answer: 5, unit: 'dm³' },
      { prompt: 'Dissolve 5 g in 0.5 dm³. Find concentration in g/dm³.', answer: 10, unit: 'g/dm³' },
      { prompt: 'Concentration 4 g/dm³, mass 12 g. Find volume in dm³.', answer: 3, unit: 'dm³' },
      { prompt: '250 cm³ of 2 g/dm³ solution. What mass of solute in g? (0.25 dm³)', answer: 0.5, unit: 'g', tolerance: 0.01 },
      { prompt: '8 g dissolved to make 2 dm³ solution. Find concentration in g/dm³.', answer: 4, unit: 'g/dm³' },
    ],
  },

  // ========== PHYSICS EQUATIONS ==========
  {
    id: 'phys-ohms-law',
    subject: 'Physics',
    topic: 'Electricity',
    equation: 'V = IR',
    symbols: [
      { symbol: 'V', name: 'Potential difference', unit: 'V (volts)', description: 'Energy transferred per unit charge' },
      { symbol: 'I', name: 'Current', unit: 'A (amperes)', description: 'Charge flowing per second' },
      { symbol: 'R', name: 'Resistance', unit: 'Ω (ohms)', description: 'Opposition to current' },
    ],
    unitTraps: [
      { wrongUnit: 'Using mA without converting', correctUnit: 'A', explanation: 'Convert mA to A (÷1000) before using the equation' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find resistance', correctRearrangement: 'R = V ÷ I' },
      { prompt: 'Rearrange to find current', correctRearrangement: 'I = V ÷ R' },
    ],
    practiceCalculations: [
      { prompt: 'A resistor has V = 12 V and R = 4 Ω. Find the current I in amperes.', answer: 3, unit: 'A' },
      { prompt: 'Current is 0.5 A, potential difference is 6 V. Find the resistance in Ω.', answer: 12, unit: 'Ω' },
      { prompt: '9 V across a 18 Ω resistor. Find current in A.', answer: 0.5, unit: 'A', tolerance: 0.01 },
      { prompt: 'Current 2 A, resistance 7.5 Ω. Find potential difference in V.', answer: 15, unit: 'V' },
      { prompt: 'A 24 Ω component has 6 V across it. Find current in A.', answer: 0.25, unit: 'A', tolerance: 0.01 },
      { prompt: '0.2 A through a resistor with 10 V. Find resistance in Ω.', answer: 50, unit: 'Ω' },
    ],
  },
  {
    id: 'phys-kinetic-energy',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    equation: 'E_k = ½mv²',
    symbols: [
      {
        symbol: 'E_k',
        name: 'Kinetic energy',
        unit: 'J (joules)',
        description: 'Energy stored in a moving object',
      },
      {
        symbol: 'm',
        name: 'Mass',
        unit: 'kg',
        description: 'Mass of the object',
      },
      {
        symbol: 'v',
        name: 'Velocity',
        unit: 'm/s',
        description: 'Speed of the object',
      },
    ],
    unitTraps: [
      {
        wrongUnit: 'J/kg',
        correctUnit: 'J',
        explanation: 'Energy is measured in joules, not joules per kilogram',
      },
    ],
    rearrangingPrompts: [
      {
        prompt: 'Rearrange to find velocity v',
        correctRearrangement: 'v = √(2E_k/m)',
      },
    ],
    practiceCalculations: [
      { prompt: 'A 2 kg object has 36 J of kinetic energy. Find its speed in m/s.', answer: 6, unit: 'm/s', tolerance: 0.1 },
      { prompt: 'Mass 0.5 kg, speed 4 m/s. Find kinetic energy in J.', answer: 4, unit: 'J' },
      { prompt: '1 kg object moving at 10 m/s. Find E_k in J.', answer: 50, unit: 'J' },
      { prompt: 'E_k = 72 J, m = 8 kg. Find speed in m/s.', answer: 3, unit: 'm/s', tolerance: 0.1 },
      { prompt: 'Car of mass 800 kg has 160 kJ kinetic energy. Find speed in m/s.', answer: 20, unit: 'm/s', tolerance: 0.5 },
      { prompt: 'Ball 0.2 kg, speed 5 m/s. Find kinetic energy in J.', answer: 2.5, unit: 'J', tolerance: 0.1 },
    ],
  },
  {
    id: 'phys-density-equation',
    subject: 'Physics',
    topic: 'Particle model of matter',
    equation: 'density = mass ÷ volume',
    symbols: [
      { symbol: 'density', name: 'Density', unit: 'kg/m³ or g/cm³', description: 'Mass per unit volume' },
      { symbol: 'mass', name: 'Mass', unit: 'kg or g', description: 'Mass of object' },
      { symbol: 'volume', name: 'Volume', unit: 'm³ or cm³', description: 'Volume of object' },
    ],
    unitTraps: [
      { wrongUnit: 'Mixing g with m³', correctUnit: 'Consistent', explanation: 'Use kg and m³ for kg/m³, or g and cm³ for g/cm³' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find mass', correctRearrangement: 'mass = density × volume' },
      { prompt: 'Rearrange to find volume', correctRearrangement: 'volume = mass ÷ density' },
    ],
    practiceCalculations: [
      { prompt: 'Mass 10 kg, volume 5 m³. Find density in kg/m³.', answer: 2, unit: 'kg/m³' },
      { prompt: 'Density 4 g/cm³, volume 25 cm³. Find mass in g.', answer: 100, unit: 'g' },
      { prompt: 'Density 8000 kg/m³, mass 2 kg. Find volume in m³.', answer: 0.00025, unit: 'm³', tolerance: 0.00001 },
      { prompt: 'Block 0.5 m³, density 2700 kg/m³. Find mass in kg.', answer: 1350, unit: 'kg' },
      { prompt: 'Liquid: 500 g, 400 cm³. Find density in g/cm³.', answer: 1.25, unit: 'g/cm³', tolerance: 0.01 },
      { prompt: 'Density 1 g/cm³ (water), volume 30 cm³. Find mass in g.', answer: 30, unit: 'g' },
    ],
  },
  {
    id: 'phys-shc-equation',
    subject: 'Physics',
    topic: 'Particle model of matter',
    equation: 'E = mcΔT',
    symbols: [
      { symbol: 'E', name: 'Energy transferred', unit: 'J', description: 'Thermal energy needed' },
      { symbol: 'm', name: 'Mass', unit: 'kg', description: 'Mass of substance' },
      { symbol: 'c', name: 'Specific heat capacity', unit: 'J/kg°C', description: 'Energy to heat 1 kg by 1°C' },
      { symbol: 'ΔT', name: 'Temperature change', unit: '°C', description: 'Change in temperature' },
    ],
    unitTraps: [
      { wrongUnit: 'Mass in g', correctUnit: 'kg', explanation: 'Use mass in kg for this equation' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find c', correctRearrangement: 'c = E ÷ (m × ΔT)' },
      { prompt: 'Rearrange to find ΔT', correctRearrangement: 'ΔT = E ÷ (m × c)' },
    ],
    practiceCalculations: [
      { prompt: 'Heat 1 kg of water (c = 4200 J/kg°C) by 10°C. Find energy transferred in J.', answer: 42000, unit: 'J' },
      { prompt: 'A 2 kg block receives 8400 J. Its c is 420 J/kg°C. Find temperature change in °C.', answer: 10, unit: '°C' },
      { prompt: 'Heat 0.5 kg aluminium (c = 900 J/kg°C) by 20°C. Find E in J.', answer: 9000, unit: 'J' },
      { prompt: '5000 J heats 1 kg substance by 5°C. Find c in J/kg°C.', answer: 1000, unit: 'J/kg°C' },
      { prompt: 'Copper block 3 kg, c = 390 J/kg°C, heated by 50°C. Find energy in J.', answer: 58500, unit: 'J' },
      { prompt: '10 kJ heats 2 kg water. Temperature rise in °C? (c = 4200 J/kg°C)', answer: 1.19, unit: '°C', tolerance: 0.05 },
    ],
  },
  {
    id: 'phys-wave-speed',
    subject: 'Physics',
    topic: 'Waves',
    equation: 'v = f × λ',
    symbols: [
      { symbol: 'v', name: 'Wave speed', unit: 'm/s', description: 'Speed of the wave' },
      { symbol: 'f', name: 'Frequency', unit: 'Hz', description: 'Number of waves per second' },
      { symbol: 'λ', name: 'Wavelength', unit: 'm', description: 'Distance for one complete wave' },
    ],
    unitTraps: [
      { wrongUnit: 'Wavelength in cm without converting', correctUnit: 'm', explanation: 'Use metres for v in m/s' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find frequency', correctRearrangement: 'f = v ÷ λ' },
      { prompt: 'Rearrange to find wavelength', correctRearrangement: 'λ = v ÷ f' },
    ],
    practiceCalculations: [
      { prompt: 'Frequency 50 Hz, wavelength 2 m. Find wave speed in m/s.', answer: 100, unit: 'm/s' },
      { prompt: 'Wave speed 340 m/s, frequency 170 Hz. Find wavelength in m.', answer: 2, unit: 'm' },
      { prompt: 'Radio wave: 3×10⁸ m/s, frequency 100 MHz (10⁸ Hz). Find wavelength in m.', answer: 3, unit: 'm' },
      { prompt: 'Sound: 330 m/s, wavelength 0.5 m. Find frequency in Hz.', answer: 660, unit: 'Hz' },
      { prompt: 'Wave speed 12 m/s, wavelength 4 m. Find frequency in Hz.', answer: 3, unit: 'Hz' },
      { prompt: 'Sound in water: speed 1500 m/s, wavelength 0.75 m. Find frequency in Hz.', answer: 2000, unit: 'Hz' },
    ],
  },
  {
    id: 'phys-force-acceleration',
    subject: 'Physics',
    topic: 'Forces',
    equation: 'F = ma',
    symbols: [
      { symbol: 'F', name: 'Resultant force', unit: 'N', description: 'Net force on object' },
      { symbol: 'm', name: 'Mass', unit: 'kg', description: 'Mass of object' },
      { symbol: 'a', name: 'Acceleration', unit: 'm/s²', description: 'Rate of change of velocity' },
    ],
    unitTraps: [
      { wrongUnit: 'Mass in g', correctUnit: 'kg', explanation: 'Use mass in kg for force in newtons' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find acceleration', correctRearrangement: 'a = F ÷ m' },
      { prompt: 'Rearrange to find mass', correctRearrangement: 'm = F ÷ a' },
    ],
    practiceCalculations: [
      { prompt: 'A 5 kg object is pushed with 10 N. Find its acceleration in m/s².', answer: 2, unit: 'm/s²' },
      { prompt: 'Force 20 N causes 4 m/s² acceleration. Find mass in kg.', answer: 5, unit: 'kg' },
      { prompt: 'Mass 12 kg, acceleration 0.5 m/s². Find resultant force in N.', answer: 6, unit: 'N' },
      { prompt: '100 N accelerates a car at 2 m/s². Find mass in kg.', answer: 50, unit: 'kg' },
      { prompt: '0.5 kg ball, acceleration 20 m/s². Find force in N.', answer: 10, unit: 'N' },
      { prompt: 'Force 15 N on 3 kg object. Find acceleration in m/s².', answer: 5, unit: 'm/s²' },
    ],
  },
  // ---------- Extra physics equations (GCSE) ----------
  {
    id: 'phys-gpe-equation',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    equation: 'E_p = mgh',
    symbols: [
      { symbol: 'E_p', name: 'Gravitational potential energy', unit: 'J', description: 'Energy stored due to height' },
      { symbol: 'm', name: 'Mass', unit: 'kg', description: 'Mass of object' },
      { symbol: 'g', name: 'Gravitational field strength', unit: 'N/kg', description: 'About 10 N/kg on Earth' },
      { symbol: 'h', name: 'Height', unit: 'm', description: 'Height above reference level' },
    ],
    unitTraps: [
      { wrongUnit: 'Height in cm', correctUnit: 'm', explanation: 'Use metres for g in N/kg' },
      { wrongUnit: 'Mass in g', correctUnit: 'kg', explanation: 'Use kg for energy in joules' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find height h', correctRearrangement: 'h = E_p ÷ (m × g)' },
      { prompt: 'Rearrange to find mass m', correctRearrangement: 'm = E_p ÷ (g × h)' },
    ],
    practiceCalculations: [
      { prompt: '2 kg mass raised 5 m. g = 10 N/kg. Find GPE in J.', answer: 100, unit: 'J' },
      { prompt: 'GPE = 500 J, m = 10 kg, g = 10 N/kg. Find height in m.', answer: 5, unit: 'm' },
      { prompt: 'Object 4 kg at height 3 m. Find GPE in J. (g = 10 N/kg)', answer: 120, unit: 'J' },
      { prompt: '200 J GPE, height 4 m, g = 10 N/kg. Find mass in kg.', answer: 5, unit: 'kg' },
      { prompt: '1.5 kg book on shelf 2 m high. GPE in J? (g = 10 N/kg)', answer: 30, unit: 'J' },
      { prompt: 'GPE 80 J, mass 2 kg. Find height in m. (g = 10 N/kg)', answer: 4, unit: 'm' },
    ],
  },
  {
    id: 'phys-power-equation',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    equation: 'P = E ÷ t',
    symbols: [
      { symbol: 'P', name: 'Power', unit: 'W (watts)', description: 'Energy transferred per second' },
      { symbol: 'E', name: 'Energy transferred', unit: 'J', description: 'Total energy' },
      { symbol: 't', name: 'Time', unit: 's', description: 'Time taken' },
    ],
    unitTraps: [
      { wrongUnit: 'Time in minutes', correctUnit: 's', explanation: 'Convert time to seconds for power in watts' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find energy E', correctRearrangement: 'E = P × t' },
      { prompt: 'Rearrange to find time t', correctRearrangement: 't = E ÷ P' },
    ],
    practiceCalculations: [
      { prompt: '100 J transferred in 5 s. Find power in W.', answer: 20, unit: 'W' },
      { prompt: 'Heater 2000 W runs for 30 s. Find energy in J.', answer: 60000, unit: 'J' },
      { prompt: '60 W bulb. How many seconds to transfer 1200 J?', answer: 20, unit: 's' },
      { prompt: 'Motor 500 W for 10 s. Energy transferred in J?', answer: 5000, unit: 'J' },
      { prompt: '3600 J in 2 minutes (120 s). Find power in W.', answer: 30, unit: 'W' },
      { prompt: 'Power 15 W. Time in s to transfer 90 J?', answer: 6, unit: 's' },
    ],
  },
  {
    id: 'phys-charge-equation',
    subject: 'Physics',
    topic: 'Electricity',
    equation: 'Q = It',
    symbols: [
      { symbol: 'Q', name: 'Charge', unit: 'C (coulombs)', description: 'Charge flowing' },
      { symbol: 'I', name: 'Current', unit: 'A', description: 'Current' },
      { symbol: 't', name: 'Time', unit: 's', description: 'Time' },
    ],
    unitTraps: [
      { wrongUnit: 'Time in minutes', correctUnit: 's', explanation: 'Convert to seconds for charge in coulombs' },
      { wrongUnit: 'Current in mA', correctUnit: 'A', explanation: 'Convert mA to A (÷1000)' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find current I', correctRearrangement: 'I = Q ÷ t' },
      { prompt: 'Rearrange to find time t', correctRearrangement: 't = Q ÷ I' },
    ],
    practiceCalculations: [
      { prompt: 'Current 2 A for 5 s. Find charge in C.', answer: 10, unit: 'C' },
      { prompt: 'Charge 60 C, time 12 s. Find current in A.', answer: 5, unit: 'A' },
      { prompt: '0.5 A for 20 s. Charge in coulombs?', answer: 10, unit: 'C' },
      { prompt: '120 C passed in 1 minute (60 s). Find current in A.', answer: 2, unit: 'A' },
      { prompt: 'Current 3 A. How many seconds for 15 C?', answer: 5, unit: 's' },
      { prompt: 'Charge 0.24 C in 2 s. Find current in A.', answer: 0.12, unit: 'A', tolerance: 0.01 },
    ],
  },
  {
    id: 'phys-work-done-equation',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    equation: 'W = Fs',
    symbols: [
      { symbol: 'W', name: 'Work done', unit: 'J (joules)', description: 'Energy transferred when a force moves an object' },
      { symbol: 'F', name: 'Force', unit: 'N (newtons)', description: 'Force applied in the direction of movement' },
      { symbol: 's', name: 'Distance', unit: 'm (metres)', description: 'Distance moved in the direction of the force' },
    ],
    unitTraps: [
      { wrongUnit: 'Distance in cm', correctUnit: 'm', explanation: 'Use metres for work done in joules' },
      { wrongUnit: 'Force at an angle', correctUnit: 'Component in direction of motion', explanation: 'Use the component of force in the direction of movement' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find force F', correctRearrangement: 'F = W ÷ s' },
      { prompt: 'Rearrange to find distance s', correctRearrangement: 's = W ÷ F' },
    ],
    practiceCalculations: [
      { prompt: 'A force of 20 N moves an object 5 m. Find work done in J.', answer: 100, unit: 'J' },
      { prompt: '100 J of work is done moving an object 4 m. Find the force in N.', answer: 25, unit: 'N' },
      { prompt: 'Force 15 N does 60 J of work. Find distance moved in m.', answer: 4, unit: 'm' },
      { prompt: 'A 50 N force acts over 3 m. Work done in J?', answer: 150, unit: 'J' },
      { prompt: 'Work done 200 J, distance 8 m. Find force in N.', answer: 25, unit: 'N' },
    ],
  },
  {
    id: 'phys-power-voltage-current',
    subject: 'Physics',
    topic: 'Electricity',
    equation: 'P = VI',
    symbols: [
      { symbol: 'P', name: 'Power', unit: 'W (watts)', description: 'Electrical power' },
      { symbol: 'V', name: 'Potential difference', unit: 'V (volts)', description: 'Voltage across the component' },
      { symbol: 'I', name: 'Current', unit: 'A (amperes)', description: 'Current through the component' },
    ],
    unitTraps: [
      { wrongUnit: 'Current in mA', correctUnit: 'A', explanation: 'Convert mA to A (÷1000) for power in watts' },
      { wrongUnit: 'Using P = E/t for electrical power', correctUnit: 'P = VI', explanation: 'For electrical devices, P = VI is the standard form' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find voltage V', correctRearrangement: 'V = P ÷ I' },
      { prompt: 'Rearrange to find current I', correctRearrangement: 'I = P ÷ V' },
    ],
    practiceCalculations: [
      { prompt: 'A lamp has 12 V across it and 0.5 A through it. Find power in W.', answer: 6, unit: 'W' },
      { prompt: 'Power 60 W, voltage 230 V. Find current in A.', answer: 0.26, unit: 'A', tolerance: 0.02 },
      { prompt: 'Device 24 W, current 2 A. Find potential difference in V.', answer: 12, unit: 'V' },
      { prompt: '100 W heater on 230 V. Current in A?', answer: 0.43, unit: 'A', tolerance: 0.02 },
      { prompt: 'P = 36 W, I = 3 A. Find V in volts.', answer: 12, unit: 'V' },
    ],
  },
  {
    id: 'phys-weight-equation',
    subject: 'Physics',
    topic: 'Forces',
    equation: 'W = mg',
    symbols: [
      { symbol: 'W', name: 'Weight', unit: 'N (newtons)', description: 'Force due to gravity on the object' },
      { symbol: 'm', name: 'Mass', unit: 'kg', description: 'Mass of the object' },
      { symbol: 'g', name: 'Gravitational field strength', unit: 'N/kg', description: 'About 10 N/kg on Earth' },
    ],
    unitTraps: [
      { wrongUnit: 'Mass in g', correctUnit: 'kg', explanation: 'Use mass in kg for weight in newtons' },
      { wrongUnit: 'Weight in kg', correctUnit: 'N', explanation: 'Weight is a force, measured in newtons; mass is in kg' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find mass m', correctRearrangement: 'm = W ÷ g' },
      { prompt: 'Rearrange to find g', correctRearrangement: 'g = W ÷ m' },
    ],
    practiceCalculations: [
      { prompt: 'Mass 5 kg, g = 10 N/kg. Find weight in N.', answer: 50, unit: 'N' },
      { prompt: 'Weight 120 N on Earth (g = 10 N/kg). Find mass in kg.', answer: 12, unit: 'kg' },
      { prompt: 'Object 0.5 kg. Weight in N? (g = 10 N/kg)', answer: 5, unit: 'N' },
      { prompt: 'Weight 80 N, g = 10 N/kg. Find mass in kg.', answer: 8, unit: 'kg' },
      { prompt: '3 kg mass. Weight on Earth in N?', answer: 30, unit: 'N' },
    ],
  },
  {
    id: 'phys-period-equation',
    subject: 'Physics',
    topic: 'Waves',
    equation: 'T = 1 ÷ f',
    symbols: [
      { symbol: 'T', name: 'Period', unit: 's (seconds)', description: 'Time for one complete wave to pass a point' },
      { symbol: 'f', name: 'Frequency', unit: 'Hz (hertz)', description: 'Number of waves per second' },
    ],
    unitTraps: [
      { wrongUnit: 'T in ms without converting', correctUnit: 's', explanation: 'Use seconds for period when frequency is in Hz' },
      { wrongUnit: 'Using f = 1/T with T in minutes', correctUnit: 'T in s', explanation: 'Convert time to seconds for frequency in Hz' },
    ],
    rearrangingPrompts: [
      { prompt: 'Rearrange to find frequency f', correctRearrangement: 'f = 1 ÷ T' },
    ],
    practiceCalculations: [
      { prompt: 'Frequency 50 Hz. Find period in s.', answer: 0.02, unit: 's', tolerance: 0.001 },
      { prompt: 'Period 0.1 s. Find frequency in Hz.', answer: 10, unit: 'Hz' },
      { prompt: 'Wave has frequency 200 Hz. Period in seconds?', answer: 0.005, unit: 's', tolerance: 0.0001 },
      { prompt: 'T = 0.025 s. Find frequency in Hz.', answer: 40, unit: 'Hz' },
      { prompt: 'Frequency 2 Hz. Period in s?', answer: 0.5, unit: 's', tolerance: 0.01 },
    ],
  },
];

// ============================================================================
// BIOLOGY MISCONCEPTIONS - Common Wrong Ideas (Grade 9 Training)
// ============================================================================

export const SCIENCE_MISCONCEPTIONS: ScienceMisconception[] = [
  // ========== CELL BIOLOGY ==========
  {
    id: 'bio-particles-want-move',
    subject: 'Biology',
    topic: 'Cell Biology',
    misconception: 'Particles want to spread out or choose to move.',
    correctUnderstanding: 'Particles move randomly due to kinetic energy. Net movement occurs because there are more particles on one side, not because particles choose to move.',
    whyWrong: 'Particles do not have intentions. Movement is random, and net movement happens due to probability - more particles on one side means more likely to move to the other side.',
    example: 'In diffusion, particles move randomly in all directions. More particles move from high concentration to low concentration simply because there are more particles there, not because they want to spread out.',
    diagramId: 'particle_model',
  },
  {
    id: 'bio-osmosis-water-less-water',
    subject: 'Biology',
    topic: 'Cell Biology',
    misconception: 'Water moves to where there is less water.',
    correctUnderstanding: 'Water moves from high water concentration to low water concentration. A concentrated solution has low water concentration, not less water.',
    whyWrong: 'This confuses water concentration with amount of water. Osmosis is about water concentration, not total amount.',
    example: 'In a concentrated salt solution, there is actually a lot of water, but the water concentration is low because salt molecules take up space. Water moves from pure water (high water concentration) to salt solution (low water concentration).',
    diagramId: 'osmosis_diagram',
  },
  {
    id: 'bio-active-transport-faster-diffusion',
    subject: 'Biology',
    topic: 'Cell Biology',
    misconception: 'Active transport is just faster diffusion.',
    correctUnderstanding: 'Active transport moves substances against the concentration gradient using energy. Diffusion moves down the gradient without energy.',
    whyWrong: 'Active transport and diffusion are fundamentally different processes. Active transport requires energy and works against the gradient.',
    example: 'Root hair cells use active transport to absorb mineral ions from soil where concentration is lower than in the cell. This cannot happen by diffusion, which only works down a gradient.',
    diagramId: 'active_transport',
  },
  
  // ========== ORGANISATION ==========
  {
    id: 'bio-enzymes-used-up',
    subject: 'Biology',
    topic: 'Organisation',
    misconception: 'Enzymes are used up in reactions.',
    correctUnderstanding: 'Enzymes are not used up. They remain unchanged and can catalyze many reactions.',
    whyWrong: 'Enzymes are catalysts - they speed up reactions without being changed themselves.',
    example: 'One enzyme molecule can catalyze thousands of reactions. The enzyme remains the same after each reaction.',
    diagramId: 'enzyme_action',
  },
  {
    id: 'bio-enzymes-make-reactions-happen',
    subject: 'Biology',
    topic: 'Organisation',
    misconception: 'Enzymes make reactions happen that wouldn\'t otherwise occur.',
    correctUnderstanding: 'Enzymes speed up reactions that would happen anyway, just very slowly. They lower activation energy.',
    whyWrong: 'Enzymes are catalysts - they speed up existing reactions, not create new ones.',
    example: 'Digestion of starch would happen eventually without amylase, but it would take years. Amylase speeds it up to seconds.',
    diagramId: 'enzyme_action',
  },
  
  // ========== INFECTION AND RESPONSE ==========
  {
    id: 'bio-all-bacteria-harmful',
    subject: 'Biology',
    topic: 'Infection and Response',
    misconception: 'All bacteria are harmful.',
    correctUnderstanding: 'Most bacteria are harmless or beneficial. Only some bacteria are pathogens that cause disease.',
    whyWrong: 'Many bacteria are essential for life, such as those in our gut that help digestion.',
    example: 'Bacteria in yogurt help digestion. Bacteria in soil break down dead matter. Only pathogenic bacteria cause disease.',
    diagramId: 'pathogen_infection',
  },
  {
    id: 'bio-bacteria-viruses-same',
    subject: 'Biology',
    topic: 'Infection and Response',
    misconception: 'Bacteria and viruses are the same thing.',
    correctUnderstanding: 'Bacteria are living cells that can reproduce independently. Viruses are not cells and can only reproduce inside host cells.',
    whyWrong: 'Bacteria and viruses are fundamentally different - bacteria are cells, viruses are not.',
    example: 'Bacteria can be killed by antibiotics. Viruses cannot be killed by antibiotics because they are not cells.',
    diagramId: 'pathogen_infection',
  },
  
  // ========== BIOENERGETICS ==========
  {
    id: 'bio-plants-food-soil',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Plants get their food from the soil.',
    correctUnderstanding: 'Plants make their own food (glucose) by photosynthesis. They get water and minerals from soil, but not food.',
    whyWrong: 'Plants are autotrophs - they make their own food using light energy, not from soil.',
    example: 'A plant in a pot makes glucose from carbon dioxide and water using light. The soil provides water and minerals, but the glucose comes from photosynthesis.',
  },
  {
    id: 'bio-light-substance',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Light is a substance that plants absorb.',
    correctUnderstanding: 'Light is energy, not a substance. Plants absorb light energy and convert it to chemical energy in glucose.',
    whyWrong: 'Light is electromagnetic radiation (energy), not matter. Plants convert light energy to chemical energy.',
    example: 'During photosynthesis, light energy is converted to chemical energy stored in glucose bonds. Light is not a material that becomes part of the plant.',
  },
  {
    id: 'bio-chlorophyll-makes-glucose',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Chlorophyll makes glucose.',
    correctUnderstanding: 'Chlorophyll absorbs light energy. The energy is used in reactions that make glucose from carbon dioxide and water.',
    whyWrong: 'Chlorophyll is a pigment that absorbs light. It does not make glucose - it enables the process.',
    example: 'Chlorophyll is like a solar panel - it captures light energy, but the energy is used by other parts of the cell to make glucose.',
  },
  {
    id: 'bio-respiration-breathing',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Respiration is breathing.',
    correctUnderstanding: 'Respiration is a chemical process in cells that releases energy from glucose. Breathing is the physical process of moving air.',
    whyWrong: 'Respiration happens in cells, not lungs. Breathing brings oxygen to cells for respiration.',
    example: 'When you breathe, you bring oxygen into your lungs. The oxygen then travels to cells where respiration happens, releasing energy.',
  },

  // ========== HOMEOSTASIS ==========
  {
    id: 'bio-homeostasis-constant',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    misconception: 'Homeostasis keeps everything constant all the time.',
    correctUnderstanding: 'Homeostasis maintains dynamic equilibrium - values fluctuate around a set point and are corrected when they deviate.',
    whyWrong: 'Internal conditions fluctuate constantly. Homeostasis detects changes and corrects them, maintaining balance around a set point.',
    example: 'Blood glucose rises after eating, then insulin brings it back down. It doesn\'t stay exactly the same - it fluctuates around the normal range.',
    diagramId: 'homeostasis',
  },
  {
    id: 'bio-hormones-faster-nerves',
    subject: 'Biology',
    topic: 'Homeostasis and Response',
    misconception: 'Hormones are faster than nerves.',
    correctUnderstanding: 'Nerves use electrical impulses and are much faster than hormones, which travel in blood.',
    whyWrong: 'Electrical impulses travel much faster than blood flow. Nerves provide rapid responses; hormones provide slower, longer-lasting effects.',
    example: 'If you touch something hot, your hand pulls away instantly (nerves). Hormonal responses take seconds or minutes.',
    diagramId: 'nervous_system',
  },
  
  // ========== INHERITANCE ==========
  {
    id: 'bio-dominant-common',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    misconception: 'Dominant means common or stronger.',
    correctUnderstanding: 'Dominant means the allele is expressed if present. It has nothing to do with how common it is or being stronger.',
    whyWrong: 'Dominance is about which allele is expressed, not frequency or strength. Recessive alleles can be more common.',
    example: 'Huntington\'s disease is caused by a dominant allele but is rare. Most people have the recessive (normal) allele.',
    diagramId: 'genetic_inheritance',
  },
  {
    id: 'bio-evolution-adapt',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    misconception: 'Organisms adapt or try to evolve.',
    correctUnderstanding: 'Organisms do not adapt or try to evolve. Natural selection acts on existing variation - individuals with advantageous characteristics survive and reproduce.',
    whyWrong: 'Evolution happens to populations over generations, not to individuals. Organisms do not choose to evolve.',
    example: 'A giraffe does not grow a longer neck because it wants to. Giraffes with longer necks (due to variation) survive better and pass on their genes.',
    diagramId: 'natural_selection',
  },
  {
    id: 'bio-evolution-individuals',
    subject: 'Biology',
    topic: 'Inheritance, Variation and Evolution',
    misconception: 'Evolution happens to individuals.',
    correctUnderstanding: 'Evolution happens to populations over many generations. Individuals do not evolve.',
    whyWrong: 'Evolution is a change in allele frequency in a population over time. Individuals cannot evolve.',
    example: 'A single person cannot evolve to be taller. But over many generations, a population\'s average height may change.',
    diagramId: 'natural_selection',
  },
  
  // ========== ECOLOGY ==========
  {
    id: 'bio-energy-recycled',
    subject: 'Biology',
    topic: 'Ecology',
    misconception: 'Energy is recycled in ecosystems.',
    correctUnderstanding: 'Energy flows through ecosystems and is lost at each trophic level. Materials (like carbon) are recycled, but energy is not.',
    whyWrong: 'Energy is lost as heat and cannot be recycled. Only materials cycle.',
    example: 'When a plant is eaten, energy flows to the consumer but is lost as heat. Carbon atoms cycle back to plants, but the energy does not.',
    diagramId: 'ecosystem',
  },
  {
    id: 'bio-all-energy-transferred',
    subject: 'Biology',
    topic: 'Ecology',
    misconception: 'All energy is transferred between trophic levels.',
    correctUnderstanding: 'Only about 10% of energy is transferred. Most is lost through respiration, movement, waste, and heat.',
    whyWrong: 'Energy is lost at each level through various processes. Only a small percentage is available to the next level.',
    example: 'A rabbit eats grass. Most energy is used for respiration and movement, lost as heat. Only about 10% becomes rabbit biomass.',
    diagramId: 'ecosystem',
  },
  
  // ========== PHYSICS (keeping existing) ==========
  {
    id: 'energy-used-up',
    subject: 'Physics',
    topic: 'Energy stores and transfers',
    misconception: 'Energy is used up.',
    correctUnderstanding: 'Energy is transferred, not destroyed. It moves between stores.',
    whyWrong: 'The law of conservation of energy states energy cannot be created or destroyed.',
    example: 'A ball rolling stops because energy is transferred to thermal energy (friction), not because energy disappears.',
    diagramId: 'energy_profile',
  },
  // Chemistry misconceptions
  {
    id: 'chem-covalent-share-one',
    subject: 'Chemistry',
    topic: 'Bonding',
    misconception: 'In covalent bonding, each atom donates one electron.',
    correctUnderstanding: 'In covalent bonding, atoms share pairs of electrons. Each atom contributes one electron to the shared pair.',
    whyWrong: 'Covalent bonds involve sharing, not donation. The electrons are shared between atoms.',
    example: 'In H₂, each hydrogen contributes one electron to form a shared pair. Neither atom "gives" its electron away.',
    diagramId: 'ionic_covalent_bonding',
  },
  {
    id: 'chem-rate-always-temp',
    subject: 'Chemistry',
    topic: 'Rate of reaction',
    misconception: 'Increasing temperature always increases rate.',
    correctUnderstanding: 'Increasing temperature usually increases rate because particles have more kinetic energy and collide more often with enough energy. Enzymes can denature at very high temperatures.',
    whyWrong: 'For most reactions, yes. But enzymes denature above optimum temperature, which decreases rate.',
    example: 'Amylase works fastest at 37°C. At 80°C it denatures and stops working.',
    diagramId: 'enzyme_action',
  },
  // Physics misconceptions
  {
    id: 'phys-current-used-up',
    subject: 'Physics',
    topic: 'Electricity',
    misconception: 'Current is used up as it flows through a circuit.',
    correctUnderstanding: 'Current is the same at all points in a series circuit. Charge is conserved; electrons flow in a loop.',
    whyWrong: 'Current (charge per second) is the same everywhere in a series circuit. Nothing is "used up".',
    example: 'The same current flows through the battery, wire, and bulb. The bulb uses energy, not current.',
    diagramId: 'circuit_diagram',
  },

  // ========== CHEMISTRY: Quantitative chemistry ==========
  {
    id: 'chem-mole-is-mass',
    subject: 'Chemistry',
    topic: 'Quantitative chemistry',
    misconception: 'A mole is a mass or a volume.',
    correctUnderstanding: 'A mole is an amount of substance: 6.02 × 10²³ particles. It is linked to mass by M_r (moles = mass ÷ M_r).',
    whyWrong: 'Mole is a counting unit (like dozen). Mass and volume depend on the substance.',
    example: 'One mole of water has a mass of 18 g. One mole of oxygen gas has a mass of 32 g. Same number of particles, different masses.',
    diagramId: 'moles_diagram',
  },
  // ========== CHEMISTRY: Chemical changes ==========
  {
    id: 'chem-acids-contain-oxygen',
    subject: 'Chemistry',
    topic: 'Chemical changes',
    misconception: 'Acids must contain oxygen.',
    correctUnderstanding: 'Acids produce H⁺ ions in aqueous solution. HCl is an acid but contains no oxygen. Organic acids contain oxygen but the definition is about H⁺.',
    whyWrong: 'Acidity is defined by producing hydrogen ions in solution, not by containing oxygen.',
    example: 'Hydrochloric acid (HCl) is a strong acid. Nitric acid (HNO₃) contains oxygen. Both produce H⁺ in solution.',
  },
  {
    id: 'chem-electrons-flow-in-solution',
    subject: 'Chemistry',
    topic: 'Chemical changes',
    misconception: 'Electrons flow through the solution during electrolysis.',
    correctUnderstanding: 'Ions move through the solution: positive ions to cathode, negative to anode. Electrons flow in the external circuit (wires). At electrodes, ions gain or lose electrons.',
    whyWrong: 'Electrons are transferred at the electrode surfaces. Charge is carried through the solution by moving ions.',
    example: 'In copper sulfate electrolysis, Cu²⁺ ions move to the cathode. They gain electrons from the cathode (which gets them from the power supply). Electrons do not travel through the solution.',
  },
  // ========== CHEMISTRY: Energy changes ==========
  {
    id: 'chem-exothermic-no-activation',
    subject: 'Chemistry',
    topic: 'Energy changes',
    misconception: 'Exothermic reactions need no activation energy.',
    correctUnderstanding: 'All reactions need activation energy to start (bonds must break). Exothermic means the overall energy change is negative (more energy released than absorbed).',
    whyWrong: 'Activation energy is the energy needed to start the reaction. Exothermic refers to the overall energy balance.',
    example: 'Burning methane is exothermic but you need a spark (activation energy) to start it. Once started, it releases more energy than it needed to start.',
  },
  // ========== CHEMISTRY: Organic ==========
  {
    id: 'chem-crude-oil-single-compound',
    subject: 'Chemistry',
    topic: 'Organic chemistry',
    misconception: 'Crude oil is a single compound.',
    correctUnderstanding: 'Crude oil is a mixture of many different hydrocarbons (and other compounds). Fractional distillation separates it into fractions by boiling point.',
    whyWrong: 'Crude oil is a complex mixture. Different compounds have different boiling points, so they can be separated.',
    example: 'Petrol, diesel, and bitumen all come from crude oil. They are different fractions with different chain lengths and boiling points.',
  },
  // ========== CHEMISTRY: Atmosphere ==========
  {
    id: 'chem-greenhouse-ozone-same',
    subject: 'Chemistry',
    topic: 'Chemistry of the atmosphere',
    misconception: 'The greenhouse effect and ozone depletion are the same thing.',
    correctUnderstanding: 'Greenhouse effect: CO₂ and other gases absorb IR, warming the Earth. Ozone depletion: CFCs break down ozone in the stratosphere, allowing more UV to reach Earth. Different processes, different impacts.',
    whyWrong: 'They involve different gases, different parts of the atmosphere, and different types of radiation.',
    example: 'CO₂ causes global warming (greenhouse effect). CFCs caused the ozone hole (ozone depletion). Fixing one does not fix the other.',
  },
  // ========== PHYSICS: Particle model ==========
  {
    id: 'phys-particles-expand',
    subject: 'Physics',
    topic: 'Particle model of matter',
    misconception: 'Particles expand when heated.',
    correctUnderstanding: 'Particles do not change size. The gaps between particles increase when heated (solids/liquids) or particles move faster and take up more space (gases).',
    whyWrong: 'Heating gives particles more kinetic energy. They move more (or vibrate more) and the spacing increases; the particles themselves do not grow.',
    example: 'When a metal rod is heated it gets longer. The atoms are the same size; the average distance between them has increased.',
  },
  // ========== PHYSICS: Atomic structure ==========
  {
    id: 'phys-radioactivity-same-as-waves',
    subject: 'Physics',
    topic: 'Atomic structure',
    misconception: 'Radioactivity is the same as electromagnetic radiation (e.g. radio waves).',
    correctUnderstanding: 'Radioactivity is the spontaneous emission of particles or photons from unstable nuclei (alpha, beta, gamma). EM radiation is waves from accelerating charges or transitions. Gamma is both; alpha and beta are particles.',
    whyWrong: 'Radioactivity comes from the nucleus and includes particles (alpha, beta). EM waves are oscillating electric and magnetic fields.',
    example: 'Alpha is a helium nucleus (2 protons, 2 neutrons)—a particle. Radio waves are EM radiation. Both can be harmful in different ways.',
  },
  // ========== PHYSICS: Waves ==========
  {
    id: 'phys-waves-carry-matter',
    subject: 'Physics',
    topic: 'Waves',
    misconception: 'Waves carry matter from one place to another.',
    correctUnderstanding: 'Waves transfer energy, not matter. The medium (e.g. water, air) oscillates but does not travel with the wave in the direction of the wave.',
    whyWrong: 'In a wave, particles move about a fixed position (or in a loop). The pattern (energy) travels; the medium does not travel with it.',
    example: 'A rope wave: the rope moves up and down but each bit of rope stays in place. Energy travels along the rope.',
  },
  // ========== PHYSICS: Magnetism ==========
  {
    id: 'phys-all-metals-magnetic',
    subject: 'Physics',
    topic: 'Magnetism and electromagnetism',
    misconception: 'All metals are magnetic.',
    correctUnderstanding: 'Only iron, nickel, cobalt and some of their alloys are magnetic (ferromagnetic). Aluminium, copper, gold, etc. are not attracted to a magnet.',
    whyWrong: 'Magnetism depends on the arrangement of electrons in the material. Most metals do not have the right structure.',
    example: 'A magnet attracts iron and steel. It does not attract aluminium cans or copper wire.',
  },
];

/**
 * Get concepts by subject
 */
export function getConceptsBySubject(subject: ScienceSubject): ScienceConcept[] {
  return SCIENCE_CONCEPTS.filter(c => c.subject === subject);
}

/**
 * Get unique topics for a subject (from concepts and questions)
 */
export function getTopicsBySubject(subject: ScienceSubject): string[] {
  const fromConcepts = [...new Set(SCIENCE_CONCEPTS.filter(c => c.subject === subject).map(c => c.topic))];
  const fromQuestions = [...new Set(SCIENCE_QUESTIONS.filter(q => q.subject === subject).map(q => q.topic))];
  const combined = new Set([...fromConcepts, ...fromQuestions]);
  return Array.from(combined).sort();
}

/**
 * Get concepts by topic
 */
export function getConceptsByTopic(subject: ScienceSubject, topic: string): ScienceConcept[] {
  return SCIENCE_CONCEPTS.filter(c => c.subject === subject && c.topic === topic);
}

/**
 * Get questions by subject, paper, tier
 * @param combinedOnly - when true, only return questions tagged for Combined Science (shorter, synoptic)
 */
export function getQuestionsByFilters(
  subject: ScienceSubject,
  paper?: SciencePaper,
  tier?: ScienceTier,
  topic?: string,
  combinedOnly?: boolean
): ScienceQuestion[] {
  return SCIENCE_QUESTIONS.filter(q => {
    if (q.subject !== subject) return false;
    if (paper && q.paper !== paper) return false;
    if (tier && q.tier !== tier) return false;
    if (topic && q.topic !== topic) return false;
    if (combinedOnly && !q.combinedScience) return false;
    return true;
  });
}

/**
 * Get practicals by subject
 */
export function getPracticalsBySubject(subject: ScienceSubject): SciencePractical[] {
  return SCIENCE_PRACTICALS.filter(p => p.subject === subject);
}

/**
 * Get equations by subject
 */
export function getEquationsBySubject(subject: ScienceSubject): ScienceEquation[] {
  return SCIENCE_EQUATIONS.filter(e => e.subject === subject);
}

/**
 * Get misconceptions by subject
 */
export function getMisconceptionsBySubject(subject: ScienceSubject): ScienceMisconception[] {
  return SCIENCE_MISCONCEPTIONS.filter(m => m.subject === subject);
}

/**
 * Get method mark breakdown for a question (if available)
 */
export function getMethodMarkBreakdown(questionId: string): MethodMarkBreakdown | undefined {
  return METHOD_MARK_BREAKDOWNS.find(b => b.questionId === questionId);
}

/** Question IDs that have method mark breakdowns */
const QUESTION_IDS_WITH_BREAKDOWNS = new Set(METHOD_MARK_BREAKDOWNS.map(b => b.questionId));

/**
 * Get 4–6 mark questions that have method mark breakdowns (for Method Mark Trainer)
 */
export function getQuestionsWithMethodMarkBreakdowns(
  subject: ScienceSubject,
  paper?: SciencePaper,
  tier?: ScienceTier,
  topic?: string
): ScienceQuestion[] {
  const all = getQuestionsByFilters(subject, paper, tier, topic);
  return all.filter(q => q.marks >= 4 && QUESTION_IDS_WITH_BREAKDOWNS.has(q.id));
}

/**
 * Topics that have at least one 4–6 mark question with a method mark breakdown (for Method Mark Trainer topic picker)
 */
export function getTopicsWithMethodMarkQuestions(
  subject: ScienceSubject,
  paper?: SciencePaper,
  tier?: ScienceTier
): Array<{ topic: string; count: number }> {
  const questions = getQuestionsWithMethodMarkBreakdowns(subject, paper, tier);
  const byTopic = new Map<string, number>();
  for (const q of questions) {
    byTopic.set(q.topic, (byTopic.get(q.topic) ?? 0) + 1);
  }
  return Array.from(byTopic.entries())
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => a.topic.localeCompare(b.topic));
}

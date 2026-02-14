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
        visual: { diagramId: 'particle_model', description: 'Faster particles at higher temperature' },
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
        prompt: 'What happens if respiration is inhibited?',
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
        visual: { diagramId: 'enzyme_action', description: 'Enzyme active site and denaturation' },
      },
      {
        prompt: 'What happens to enzyme activity if pH changes?',
        explanation: 'pH affects hydrogen bonds → active site shape changes → substrate binding affected → activity decreases',
        visual: { diagramId: 'enzyme_action', description: 'Enzyme active site and pH effect' },
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
      description: 'Light energy + CO₂ + H₂O → chlorophyll → glucose + O₂',
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
        visual: { diagramId: 'photosynthesis', description: 'CO₂ + H₂O → glucose + O₂' },
      },
      {
        prompt: 'What happens to photosynthesis rate if temperature increases?',
        explanation: 'Higher temperature → enzymes work faster → rate increases → but above optimum, enzymes denature → rate decreases',
        visual: { diagramId: 'enzyme_action', description: 'Enzymes and temperature' },
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
    flashcardPrompt: 'How do dominant and recessive alleles determine the phenotype of offspring?',
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
    flashcardPrompt: 'Describe how natural selection leads to evolution in a population.',
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
    flashcardPrompt: 'What is a mole and how do you convert between mass and moles?',
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
    flashcardPrompt: 'What causes gas pressure, and what is the formula for density?',
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

  // ========== CHEMISTRY ==========
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
    visual: { diagramId: 'photosynthesis', description: 'Plant response to light' },
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
];

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
    diagramId: 'photosynthesis',
  },
  {
    id: 'bio-light-substance',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Light is a substance that plants absorb.',
    correctUnderstanding: 'Light is energy, not a substance. Plants absorb light energy and convert it to chemical energy in glucose.',
    whyWrong: 'Light is electromagnetic radiation (energy), not matter. Plants convert light energy to chemical energy.',
    example: 'During photosynthesis, light energy is converted to chemical energy stored in glucose bonds. Light is not a material that becomes part of the plant.',
    diagramId: 'photosynthesis',
  },
  {
    id: 'bio-chlorophyll-makes-glucose',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Chlorophyll makes glucose.',
    correctUnderstanding: 'Chlorophyll absorbs light energy. The energy is used in reactions that make glucose from carbon dioxide and water.',
    whyWrong: 'Chlorophyll is a pigment that absorbs light. It does not make glucose - it enables the process.',
    example: 'Chlorophyll is like a solar panel - it captures light energy, but the energy is used by other parts of the cell to make glucose.',
    diagramId: 'photosynthesis',
  },
  {
    id: 'bio-respiration-breathing',
    subject: 'Biology',
    topic: 'Bioenergetics',
    misconception: 'Respiration is breathing.',
    correctUnderstanding: 'Respiration is a chemical process in cells that releases energy from glucose. Breathing is the physical process of moving air.',
    whyWrong: 'Respiration happens in cells, not lungs. Breathing brings oxygen to cells for respiration.',
    example: 'When you breathe, you bring oxygen into your lungs. The oxygen then travels to cells where respiration happens, releasing energy.',
    diagramId: 'respiration',
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

/**
 * Geography Hub – AQA GCSE Geography 8035
 * Sections, concepts, key terms, quick checks, skills, issue lab, fieldwork, question lab.
 */

import type {
  GeographyOptionSelection,
  GeographySectionId,
  GeographySectionMeta,
  GeographyConcept,
  GeographyKeyTerm,
  GeographyQuickCheckItem,
  GeographySkillsTask,
  GeographyIssueScenario,
  GeographyFieldworkTask,
  GeographyQuestionLabItem,
} from '../types/geographyHub';

// ============================================================================
// SECTION METADATA
// ============================================================================

const ALL_SECTIONS: GeographySectionMeta[] = [
  { id: 'physical-natural-hazards', title: 'Natural hazards', paper: 1, mandatory: true },
  { id: 'physical-ecosystems', title: 'Ecosystems', paper: 1, mandatory: true },
  { id: 'physical-rainforests', title: 'Tropical rainforests', paper: 1, mandatory: true },
  { id: 'physical-desert', title: 'Hot deserts', paper: 1, mandatory: false },
  { id: 'physical-cold', title: 'Cold environments', paper: 1, mandatory: false },
  { id: 'physical-uk-overview', title: 'UK physical landscapes', paper: 1, mandatory: true },
  { id: 'physical-coastal', title: 'Coastal landscapes', paper: 1, mandatory: false },
  { id: 'physical-river', title: 'River landscapes', paper: 1, mandatory: false },
  { id: 'physical-glacial', title: 'Glacial landscapes', paper: 1, mandatory: false },
  { id: 'human-urban', title: 'Urban issues and challenges', paper: 2, mandatory: true },
  { id: 'human-economic', title: 'The changing economic world', paper: 2, mandatory: true },
  { id: 'human-resource-overview', title: 'Resource management overview', paper: 2, mandatory: true },
  { id: 'human-food', title: 'Food', paper: 2, mandatory: false },
  { id: 'human-water', title: 'Water', paper: 2, mandatory: false },
  { id: 'human-energy', title: 'Energy', paper: 2, mandatory: false },
  { id: 'app-issue-evaluation', title: 'Issue evaluation', paper: 3, mandatory: true },
  { id: 'app-fieldwork', title: 'Fieldwork', paper: 3, mandatory: true },
];

export function getGeographySectionsForSelection(selection: GeographyOptionSelection): GeographySectionMeta[] {
  const optionSections: GeographySectionId[] = [
    selection.livingWorld === 'desert' ? 'physical-desert' : 'physical-cold',
    ...selection.physicalLandscapes.map((l) => `physical-${l}` as GeographySectionId),
    selection.resource === 'food' ? 'human-food' : selection.resource === 'water' ? 'human-water' : 'human-energy',
  ];
  return ALL_SECTIONS.filter(
    (s) => s.mandatory || optionSections.includes(s.id)
  );
}

// ============================================================================
// CONCEPTS
// ============================================================================

const GEOGRAPHY_CONCEPTS: GeographyConcept[] = [
  { id: 'nh-1', sectionId: 'physical-natural-hazards', title: 'Natural hazards and risk', coreIdea: 'A natural hazard is a natural process that could cause death, injury or disruption. Hazard risk is the chance of being affected by a hazard. Risk increases with exposure, vulnerability and lack of capacity to cope.', changeScenario: 'If population increases in a hazard-prone area, how does risk change?', misconception: 'All hazards are equally dangerous – risk depends on vulnerability and capacity.' },
  { id: 'nh-2', sectionId: 'physical-natural-hazards', title: 'Plate tectonics', coreIdea: 'The Earth\'s crust is broken into plates that move slowly. Earthquakes and volcanoes occur mainly at plate margins: constructive (diverging), destructive (converging with subduction), and conservative (sliding past).', changeScenario: 'Where would you expect the most powerful earthquakes?', misconception: 'Volcanoes only occur where plates collide (destructive margin) – they also occur at constructive margins.' },
  { id: 'nh-3', sectionId: 'physical-natural-hazards', title: 'Tropical storms', coreIdea: 'Tropical storms form over warm oceans (26°C+) between 5° and 30° latitude. They develop from low pressure and rotate due to the Coriolis effect. Climate change may increase their intensity and shift their distribution.', changeScenario: 'How might climate change affect tropical storm frequency?', misconception: 'Tropical storms only affect coastal areas – they can cause flooding and damage inland.' },
  { id: 'nh-4', sectionId: 'physical-natural-hazards', title: 'Climate change mitigation and adaptation', coreIdea: 'Mitigation reduces causes (e.g. alternative energy, carbon capture, afforestation, international agreements). Adaptation responds to change (e.g. changing agriculture, managing water, reducing sea-level risk).', changeScenario: 'Which strategy is more urgent for a low-lying coastal city?', misconception: 'We can only do one – both mitigation and adaptation are needed.' },
  { id: 'eco-1', sectionId: 'physical-ecosystems', title: 'Ecosystem interrelationships', coreIdea: 'Ecosystems involve biotic (living) and abiotic (non-living) components. Producers, consumers and decomposers are linked in food chains and food webs. Nutrient cycling returns nutrients to the soil.', changeScenario: 'If a predator is removed, what happens to the rest of the food web?', misconception: 'Ecosystems are static – they constantly change and rebalance.' },
  { id: 'rf-1', sectionId: 'physical-rainforests', title: 'Rainforest characteristics', coreIdea: 'Tropical rainforests have high rainfall, high temperatures and high biodiversity. Plants and animals are interdependent with climate, water and soils. Deforestation threatens biodiversity and contributes to climate change.', changeScenario: 'Why does deforestation reduce biodiversity?', misconception: 'Rainforest soil is fertile – nutrients are mainly in the vegetation.' },
  { id: 'ds-1', sectionId: 'physical-desert', title: 'Hot desert development', coreIdea: 'Hot deserts offer opportunities (minerals, energy, farming, tourism) but have challenges (extreme heat, water shortage, inaccessibility). Desertification occurs when land becomes desert due to climate change, overgrazing, over-cultivation or removal of vegetation.', changeScenario: 'Why is water the main challenge for desert development?', misconception: 'Deserts have no economic value – they contain minerals and energy resources.' },
  { id: 'cl-1', sectionId: 'physical-cold', title: 'Cold environment development', coreIdea: 'Cold environments (polar, tundra) offer opportunities (minerals, energy, fishing, tourism) but face challenges (extreme cold, inaccessibility, permafrost). Conservation must balance development with protecting wilderness.', changeScenario: 'Why is permafrost a challenge for building in cold environments?', misconception: 'Cold environments are barren – they have unique ecosystems and resources.' },
  { id: 'uk-1', sectionId: 'physical-uk-overview', title: 'UK physical landscapes', coreIdea: 'The UK has varied relief: uplands in the north and west (e.g. Scottish Highlands, Pennines), lowlands in the south and east. Major river systems drain from the uplands.', changeScenario: 'How does relief affect where people live?', misconception: 'The UK has uniform geography – relief and geology vary greatly.' },
  { id: 'coast-1', sectionId: 'physical-coastal', title: 'Coastal processes', coreIdea: 'Waves erode (hydraulic action, abrasion, attrition), transport (longshore drift) and deposit sediment. Geology and rock type influence landforms. Erosion creates headlands, bays, cliffs, wave-cut platforms, caves, arches and stacks. Deposition creates beaches, dunes, spits and bars.', changeScenario: 'How does geology affect coastal landforms?', misconception: 'Coasts are either eroding or depositing – both happen at different points.' },
  { id: 'river-1', sectionId: 'physical-river', title: 'Fluvial processes', coreIdea: 'Rivers erode, transport and deposit. Erosion creates waterfalls, gorges, interlocking spurs. Erosion and deposition create meanders and ox-bow lakes. Deposition creates levées, flood plains and estuaries. Flood risk is affected by precipitation, geology, relief and land use.', changeScenario: 'How does urbanisation increase flood risk?', misconception: 'Rivers only deposit in the lower course – deposition happens wherever velocity drops.' },
  { id: 'glac-1', sectionId: 'physical-glacial', title: 'Glacial processes', coreIdea: 'Glaciers erode (abrasion, plucking), transport and deposit (till, outwash). Erosion creates corries, arêtes, pyramidal peaks, truncated spurs, troughs, ribbon lakes. Deposition creates erratics, drumlins, moraines. Tourism, farming, forestry and quarrying create land-use conflicts.', changeScenario: 'Why do glaciated uplands attract tourists?', misconception: 'Glaciers only existed in the past – they still shape landscapes today.' },
  { id: 'urb-1', sectionId: 'human-urban', title: 'Urban growth and challenges', coreIdea: 'Urbanisation is increasing globally, especially in LICs/NEEs. Cities offer opportunities (jobs, services) but face challenges (slums, pollution, congestion). Sustainable urban living requires water/energy conservation, waste recycling and green space.', changeScenario: 'Why do people migrate to cities in LICs?', misconception: 'All urban growth is bad – cities can drive economic development.' },
  { id: 'econ-1', sectionId: 'human-economic', title: 'Uneven development', coreIdea: 'Development varies globally. Measures include GNI, HDI, life expectancy, infant mortality. Causes of uneven development include physical, economic and historical factors. Strategies to reduce the gap include aid, fairtrade, debt relief, tourism and industrial development.', changeScenario: 'Why might HDI be a better measure than GNI alone?', misconception: 'Money solves development – governance, education and infrastructure matter too.' },
  { id: 'res-1', sectionId: 'human-resource-overview', title: 'Resource management', coreIdea: 'Food, water and energy are fundamental to wellbeing. Global inequalities exist in supply and consumption. The UK imports food and energy; water supply varies regionally. Sustainability requires reducing demand and improving efficiency.', changeScenario: 'Why does the UK have a water deficit in some areas?', misconception: 'Resources are evenly distributed – geography and infrastructure create inequalities.' },
  { id: 'food-1', sectionId: 'human-food', title: 'Food security', coreIdea: 'Food security means reliable access to sufficient nutritious food. Factors affecting supply include climate, technology, pests, water, conflict and poverty. Strategies include irrigation, biotechnology, urban farming and reducing waste.', changeScenario: 'How does conflict affect food supply?', misconception: 'Producing more food solves hunger – distribution and access are key.' },
  { id: 'water-1', sectionId: 'human-water', title: 'Water security', coreIdea: 'Water security depends on availability, quality and access. Factors include climate, geology, pollution and infrastructure. Strategies include dams, transfers, desalination, conservation and recycling.', changeScenario: 'What are the disadvantages of large-scale water transfer?', misconception: 'Water is unlimited – many regions face stress or scarcity.' },
  { id: 'energy-1', sectionId: 'human-energy', title: 'Energy security', coreIdea: 'Energy demand is rising with development and population. Supply depends on physical factors, cost, technology and politics. Renewable sources (wind, solar, hydro) and efficiency can reduce dependence on fossil fuels.', changeScenario: 'Why might a country choose nuclear over renewables?', misconception: 'Renewables are always better – each has trade-offs (e.g. intermittency, land use).' },
];

export function getConceptsForSections(sectionIds: GeographySectionId[]): GeographyConcept[] {
  const set = new Set(sectionIds);
  return GEOGRAPHY_CONCEPTS.filter((c) => set.has(c.sectionId));
}

// ============================================================================
// KEY TERMS
// ============================================================================

const GEOGRAPHY_KEY_TERMS: GeographyKeyTerm[] = [
  { id: 'nh-kt1', sectionId: 'physical-natural-hazards', term: 'Natural hazard', definition: 'A natural process that could cause death, injury or disruption to humans.', inContext: 'Includes tectonic, weather and climate hazards.' },
  { id: 'nh-kt2', sectionId: 'physical-natural-hazards', term: 'Plate margin', definition: 'Boundary between two tectonic plates. Types: constructive (diverging), destructive (converging), conservative (sliding past).', inContext: 'Earthquakes and volcanoes occur mainly at plate margins.' },
  { id: 'nh-kt3', sectionId: 'physical-natural-hazards', term: 'Primary effect', definition: 'Immediate impact of a hazard (e.g. deaths, injuries, building collapse).', inContext: 'Contrast with secondary effects (disease, unemployment).' },
  { id: 'nh-kt4', sectionId: 'physical-natural-hazards', term: 'Long-term response', definition: 'Action taken months or years after a hazard (e.g. rebuilding, improved planning).', inContext: 'Contrast with immediate response (rescue, emergency aid).' },
  { id: 'nh-kt5', sectionId: 'physical-natural-hazards', term: 'Mitigation', definition: 'Reducing the causes of climate change (e.g. alternative energy, carbon capture).', inContext: 'Contrast with adaptation (responding to change).' },
  { id: 'nh-kt6', sectionId: 'physical-natural-hazards', term: 'Adaptation', definition: 'Responding to climate change (e.g. changing agriculture, managing water supply).', inContext: 'Needed alongside mitigation.' },
  { id: 'eco-kt1', sectionId: 'physical-ecosystems', term: 'Producer', definition: 'Organism that makes its own food (e.g. plants using photosynthesis).', inContext: 'Start of food chain.' },
  { id: 'eco-kt2', sectionId: 'physical-ecosystems', term: 'Consumer', definition: 'Organism that eats other organisms for energy.', inContext: 'Herbivores eat producers; carnivores eat other consumers.' },
  { id: 'eco-kt3', sectionId: 'physical-ecosystems', term: 'Food web', definition: 'Network of interconnected food chains showing energy flow.', inContext: 'More realistic than a single food chain.' },
  { id: 'rf-kt1', sectionId: 'physical-rainforests', term: 'Deforestation', definition: 'Clearing of forest for farming, logging, roads or settlement.', inContext: 'Causes include subsistence farming, commercial agriculture, logging.' },
  { id: 'rf-kt2', sectionId: 'physical-rainforests', term: 'Selective logging', definition: 'Only felling certain trees, leaving the rest to regenerate.', inContext: 'More sustainable than clear-felling.' },
  { id: 'rf-kt3', sectionId: 'physical-rainforests', term: 'Ecotourism', definition: 'Tourism that promotes conservation and benefits local people.', inContext: 'Strategy for sustainable rainforest use.' },
  { id: 'ds-kt1', sectionId: 'physical-desert', term: 'Desertification', definition: 'Land becoming desert due to climate change, overgrazing, over-cultivation or removal of vegetation.', inContext: 'Affects areas on the fringe of deserts.' },
  { id: 'cl-kt1', sectionId: 'physical-cold', term: 'Permafrost', definition: 'Permanently frozen ground. Thaws in summer, causing problems for building.', inContext: 'Found in Arctic and tundra.' },
  { id: 'coast-kt1', sectionId: 'physical-coastal', term: 'Longshore drift', definition: 'Movement of sediment along the coast by waves approaching at an angle.', inContext: 'Transports material in a zigzag pattern.' },
  { id: 'coast-kt2', sectionId: 'physical-coastal', term: 'Hard engineering', definition: 'Structures to resist erosion (e.g. sea walls, groynes, rock armour).', inContext: 'Expensive, can cause erosion elsewhere.' },
  { id: 'coast-kt3', sectionId: 'physical-coastal', term: 'Managed retreat', definition: 'Allowing the sea to reclaim land, moving defences inland.', inContext: 'Lower cost, lets natural processes occur.' },
  { id: 'river-kt1', sectionId: 'physical-river', term: 'Hydrograph', definition: 'Graph showing discharge (river flow) over time in response to rainfall.', inContext: 'Used to predict flood risk.' },
  { id: 'river-kt2', sectionId: 'physical-river', term: 'Flood plain zoning', definition: 'Restricting building on flood plains to reduce flood damage.', inContext: 'Soft engineering strategy.' },
  { id: 'glac-kt1', sectionId: 'physical-glacial', term: 'Corrie', definition: 'Armchair-shaped hollow eroded by a glacier. Often contains a tarn (lake).', inContext: 'Formed by rotational slip and plucking.' },
  { id: 'glac-kt2', sectionId: 'physical-glacial', term: 'Moraine', definition: 'Material deposited by a glacier (lateral, medial, terminal, ground).', inContext: 'Till is unsorted; outwash is sorted by meltwater.' },
  { id: 'urb-kt1', sectionId: 'human-urban', term: 'Megacity', definition: 'City with over 10 million people.', inContext: 'Most are in LICs/NEEs.' },
  { id: 'urb-kt2', sectionId: 'human-urban', term: 'Urban sprawl', definition: 'Spread of urban areas into surrounding countryside.', inContext: 'Leads to commuter settlements and loss of greenfield land.' },
  { id: 'urb-kt3', sectionId: 'human-urban', term: 'Brownfield site', definition: 'Land that has been built on before; can be redeveloped.', inContext: 'Preferable to greenfield for reducing sprawl.' },
  { id: 'econ-kt1', sectionId: 'human-economic', term: 'HDI', definition: 'Human Development Index – measures life expectancy, education and GNI.', inContext: 'More comprehensive than GNI alone.' },
  { id: 'econ-kt2', sectionId: 'human-economic', term: 'TNC', definition: 'Transnational corporation – company operating in many countries.', inContext: 'Can bring jobs and investment but also exploitation.' },
  { id: 'econ-kt3', sectionId: 'human-economic', term: 'Development gap', definition: 'Difference in wealth and wellbeing between richer and poorer countries.', inContext: 'Strategies aim to reduce it.' },
  { id: 'uk-kt1', sectionId: 'physical-uk-overview', term: 'Upland', definition: 'Area of high relief (hills, mountains). In UK: north and west (e.g. Scottish Highlands, Pennines).', inContext: 'Contrast with lowlands in south and east.' },
  { id: 'uk-kt2', sectionId: 'physical-uk-overview', term: 'Lowland', definition: 'Area of low relief; often more densely populated.', inContext: 'South and east of UK.' },
  { id: 'res-kt1', sectionId: 'human-resource-overview', term: 'Food miles', definition: 'Distance food travels from producer to consumer.', inContext: 'Longer food miles = higher carbon footprint.' },
  { id: 'food-kt1', sectionId: 'human-food', term: 'Food security', definition: 'Reliable access to sufficient nutritious food.', inContext: 'Affected by supply, distribution and access.' },
  { id: 'water-kt1', sectionId: 'human-water', term: 'Water transfer', definition: 'Moving water from areas of surplus to areas of deficit.', inContext: 'Example: schemes from wet north to dry south in UK.' },
  { id: 'energy-kt1', sectionId: 'human-energy', term: 'Carbon footprint', definition: 'Total greenhouse gas emissions caused by an individual or activity.', inContext: 'Reduced by efficiency and renewable energy.' },
];

export function getKeyTermsForSections(sectionIds: GeographySectionId[]): GeographyKeyTerm[] {
  const set = new Set(sectionIds);
  return GEOGRAPHY_KEY_TERMS.filter((t) => set.has(t.sectionId));
}

// ============================================================================
// QUICK CHECKS
// ============================================================================

const GEOGRAPHY_QUICK_CHECKS: GeographyQuickCheckItem[] = [
  { id: 'nh-qc1', sectionId: 'physical-natural-hazards', type: 'multipleChoice', question: 'What type of plate margin has volcanoes and earthquakes?', options: ['Constructive only', 'Destructive only', 'Both constructive and destructive', 'Conservative only'], correctAnswer: 'Both constructive and destructive', feedback: { correct: 'Correct.', incorrect: 'Both constructive and destructive margins have volcanic and earthquake activity.' } },
  { id: 'nh-qc2', sectionId: 'physical-natural-hazards', type: 'trueFalse', question: 'Mitigation means reducing the causes of climate change.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Mitigation reduces causes (e.g. alternative energy); adaptation responds to change.' } },
  { id: 'nh-qc3', sectionId: 'physical-natural-hazards', type: 'shortAnswer', question: 'What ocean temperature (in °C) is needed for tropical storms to form?', correctAnswer: ['26', '26°c', '26 degrees', '26c'], feedback: { correct: 'Correct – 26°C or above.', incorrect: 'Tropical storms need sea surface temperature of at least 26°C.' } },
  { id: 'eco-qc1', sectionId: 'physical-ecosystems', type: 'multipleChoice', question: 'What do decomposers do?', options: ['Make food from sunlight', 'Eat other animals', 'Break down dead matter and return nutrients', 'Only eat plants'], correctAnswer: 'Break down dead matter and return nutrients', feedback: { correct: 'Correct.', incorrect: 'Decomposers break down dead organisms and return nutrients to the soil.' } },
  { id: 'rf-qc1', sectionId: 'physical-rainforests', type: 'trueFalse', question: 'Selective logging is more sustainable than clear-felling.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Selective logging leaves most trees, allowing regeneration.' } },
  { id: 'ds-qc1', sectionId: 'physical-desert', type: 'shortAnswer', question: 'Name one cause of desertification.', correctAnswer: ['overgrazing', 'over-cultivation', 'climate change', 'removal of fuel wood', 'population growth'], feedback: { correct: 'Correct.', incorrect: 'Causes include overgrazing, over-cultivation, climate change, removal of fuel wood, population growth.' } },
  { id: 'cl-qc1', sectionId: 'physical-cold', type: 'multipleChoice', question: 'What is permafrost?', options: ['Frozen ocean', 'Permanently frozen ground', 'A type of glacier', 'Seasonal snow'], correctAnswer: 'Permanently frozen ground', feedback: { correct: 'Correct.', incorrect: 'Permafrost is ground that stays frozen for two or more years.' } },
  { id: 'coast-qc1', sectionId: 'physical-coastal', type: 'multipleChoice', question: 'Which process transports sediment along the coast?', options: ['Hydraulic action', 'Longshore drift', 'Abrasion', 'Attrition'], correctAnswer: 'Longshore drift', feedback: { correct: 'Correct.', incorrect: 'Longshore drift moves sediment along the coast in a zigzag pattern.' } },
  { id: 'river-qc1', sectionId: 'physical-river', type: 'trueFalse', question: 'Urbanisation increases flood risk.', correctAnswer: 'true', feedback: { correct: 'Correct – impermeable surfaces reduce infiltration.', incorrect: 'Urbanisation increases runoff and flood risk.' } },
  { id: 'uk-qc1', sectionId: 'physical-uk-overview', type: 'multipleChoice', question: 'Where are the UK uplands mainly located?', options: ['South and east', 'North and west', 'Centre only', 'Coastal areas only'], correctAnswer: 'North and west', feedback: { correct: 'Correct.', incorrect: 'Uplands are in the north and west (e.g. Scottish Highlands, Pennines).' } },
  { id: 'glac-qc1', sectionId: 'physical-glacial', type: 'shortAnswer', question: 'What shape is a corrie?', correctAnswer: ['armchair', 'armchair-shaped', 'hollow'], feedback: { correct: 'Correct.', incorrect: 'A corrie is armchair-shaped, formed by glacial erosion.' } },
  { id: 'urb-qc1', sectionId: 'human-urban', type: 'multipleChoice', question: 'What is a megacity?', options: ['Any city', 'City with 1 million people', 'City with 10 million people', 'Capital city'], correctAnswer: 'City with 10 million people', feedback: { correct: 'Correct.', incorrect: 'A megacity has over 10 million people.' } },
  { id: 'econ-qc1', sectionId: 'human-economic', type: 'multipleChoice', question: 'What does HDI measure?', options: ['Only income', 'Life expectancy, education and GNI', 'Population growth', 'Trade balance'], correctAnswer: 'Life expectancy, education and GNI', feedback: { correct: 'Correct.', incorrect: 'HDI combines life expectancy, education and GNI.' } },
  { id: 'res-qc1', sectionId: 'human-resource-overview', type: 'trueFalse', question: 'The UK has a water surplus in all regions.', correctAnswer: 'false', feedback: { correct: 'Correct – some areas have deficit.', incorrect: 'The south-east has water deficit; the north has surplus.' } },
  { id: 'food-qc1', sectionId: 'human-food', type: 'shortAnswer', question: 'What does food security mean?', correctAnswer: ['reliable access to sufficient nutritious food', 'access to enough food', 'enough food'], feedback: { correct: 'Correct.', incorrect: 'Food security means reliable access to sufficient nutritious food.' } },
  { id: 'water-qc1', sectionId: 'human-water', type: 'multipleChoice', question: 'Which is a strategy to increase water supply?', options: ['Flood plain zoning', 'Water transfer', 'Managed retreat', 'Beach nourishment'], correctAnswer: 'Water transfer', feedback: { correct: 'Correct.', incorrect: 'Water transfer moves water from surplus to deficit areas.' } },
  { id: 'energy-qc1', sectionId: 'human-energy', type: 'trueFalse', question: 'Renewable energy sources will never run out.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Renewables (solar, wind, hydro) are replenished naturally.' } },
];

export function getQuickChecksForSections(sectionIds: GeographySectionId[]): GeographyQuickCheckItem[] {
  const set = new Set(sectionIds);
  return GEOGRAPHY_QUICK_CHECKS.filter((q) => set.has(q.sectionId));
}

// ============================================================================
// SKILLS LAB
// ============================================================================

const GEOGRAPHY_SKILLS_TASKS: GeographySkillsTask[] = [
  { id: 'sk-1', skillType: 'map', title: 'Grid references', prompt: 'Practise four-figure and six-figure grid references on OS maps. Use eastings (across) then northings (up).', expected: 'Six-figure: divide the grid square into tenths' },
  { id: 'sk-2', skillType: 'graph', title: 'Population pyramid', prompt: 'Interpret a population pyramid. What does a wide base indicate? What does a narrow top suggest?', expected: 'Wide base = high birth rate; narrow top = lower life expectancy or emigration' },
  { id: 'sk-3', skillType: 'numerical', title: 'Percentage change', prompt: 'Calculate percentage change: (new - old) / old × 100. If a city\'s population grew from 2 million to 2.5 million, what is the percentage increase?', expected: '25%' },
  { id: 'sk-4', skillType: 'statistical', title: 'Measures of central tendency', prompt: 'For fieldwork data, when might you use median instead of mean?', expected: 'When data has outliers or is skewed' },
  { id: 'sk-5', skillType: 'graph', title: 'Choropleth map', prompt: 'What does a choropleth map show? How is data represented?', expected: 'Shows values for areas using shading or colour; darker = higher value' },
];

export const GEOGRAPHY_SKILLS_TASKS_LIST = GEOGRAPHY_SKILLS_TASKS;

// ============================================================================
// ISSUE LAB
// ============================================================================

const GEOGRAPHY_ISSUE_SCENARIOS: GeographyIssueScenario[] = [
  {
    id: 'issue-1',
    title: 'Coastal management decision',
    resources: ['Map of coastline showing erosion and settlements', 'Cost-benefit data for different strategies', 'Stakeholder quotes (residents, council, environmental group)'],
    questions: [
      { question: 'What does the map show about the distribution of erosion?', markScheme: 'Describe pattern; link to geology/settlements.' },
      { question: 'Outline one advantage of hard engineering for the local community.', markScheme: 'Protection of property; immediate effect.' },
      { question: 'Evaluate the options. Which strategy would you support? Justify your decision.', markScheme: 'Consider stakeholders; costs vs benefits; sustainability.' },
    ],
    sectionIds: ['physical-coastal', 'human-urban'],
  },
  {
    id: 'issue-2',
    title: 'Flood management scheme',
    resources: ['Map of river catchment', 'Hydrograph data', 'Costs of hard vs soft engineering'],
    questions: [
      { question: 'Using the hydrograph, describe the relationship between rainfall and discharge.', markScheme: 'Lag time; peak discharge; rising/falling limb.' },
      { question: 'Outline one disadvantage of building a dam for flood control.', markScheme: 'Cost; habitat loss; sediment trapped.' },
      { question: 'Which option would you recommend? Justify with reference to social, economic and environmental factors.', markScheme: 'Balanced evaluation; reasoned conclusion.' },
    ],
    sectionIds: ['physical-river', 'human-resource-overview'],
  },
  {
    id: 'issue-3',
    title: 'Sustainable energy development',
    resources: ['Map of proposed wind farm location', 'Data on energy demand and supply', 'Stakeholder views (residents, energy company, environmental group)'],
    questions: [
      { question: 'Outline one advantage of the proposed wind farm for the local area.', markScheme: 'Jobs; clean energy; reduced fossil fuel use.' },
      { question: 'Outline one disadvantage of the proposed wind farm.', markScheme: 'Visual impact; noise; wildlife; cost.' },
      { question: 'Evaluate the proposal. Would you support it? Justify your decision.', markScheme: 'Consider stakeholders; balance advantages and disadvantages; reasoned conclusion.' },
    ],
    sectionIds: ['human-energy', 'human-urban'],
  },
];

export const GEOGRAPHY_ISSUE_SCENARIOS_LIST = GEOGRAPHY_ISSUE_SCENARIOS;

// ============================================================================
// FIELDWORK LAB
// ============================================================================

const GEOGRAPHY_FIELDWORK_TASKS: GeographyFieldworkTask[] = [
  {
    id: 'fw-1',
    type: 'unfamiliar',
    enquiryStrand: 'Evaluation',
    question: 'A group collected data on river velocity at 10 sites. They used a stopwatch and float. Identify two limitations of their method.',
    markScheme: 'E.g. float may not represent true velocity; only surface velocity; human error with stopwatch; small sample size.',
  },
  {
    id: 'fw-2',
    type: 'unfamiliar',
    enquiryStrand: 'Conclusions',
    question: 'Given fieldwork data showing higher pollution near the city centre, what conclusion could you draw?',
    markScheme: 'Link data to urban land use; traffic; industry; need for more evidence to be certain.',
  },
  {
    id: 'fw-3',
    type: 'unfamiliar',
    enquiryStrand: 'Methods',
    question: 'Why might systematic sampling be more appropriate than random sampling for a transect across a beach?',
    markScheme: 'Transect shows change across space; systematic captures pattern; random might miss gradient.',
  },
  {
    id: 'fw-4',
    type: 'unfamiliar',
    enquiryStrand: 'Data presentation',
    question: 'A group plotted land use data on a pie chart. Suggest a more appropriate method and justify your choice.',
    markScheme: 'Choropleth or divided bar if showing distribution; pie shows proportions but not location.',
  },
  {
    id: 'fw-5',
    type: 'unfamiliar',
    enquiryStrand: 'Evaluation',
    question: 'A group collected 5 samples at each site. How could they improve the reliability of their data?',
    markScheme: 'Increase sample size; repeat sampling; use control; ensure consistent method.',
  },
];

export const GEOGRAPHY_FIELDWORK_TASKS_LIST = GEOGRAPHY_FIELDWORK_TASKS;

// ============================================================================
// QUESTION LAB
// ============================================================================

const GEOGRAPHY_QUESTION_LAB: GeographyQuestionLabItem[] = [
  { id: 'nh-ql1', sectionId: 'physical-natural-hazards', questionType: 'describe', question: 'Describe the global distribution of earthquakes and volcanic eruptions.', markSchemeSummary: '2 marks: two features with support. E.g. along plate margins; Pacific Ring of Fire; constructive and destructive margins.' },
  { id: 'nh-ql2', sectionId: 'physical-natural-hazards', questionType: 'explain', question: 'Explain why the effects of a tectonic hazard vary between areas of contrasting wealth.', markSchemeSummary: 'Explain: building quality, emergency response, planning, infrastructure. Use named example.' },
  { id: 'eco-ql1', sectionId: 'physical-ecosystems', questionType: 'explain', question: 'Explain how changing one component of an ecosystem can affect the whole system.', markSchemeSummary: 'Link to food web; knock-on effects; example (e.g. predator removal).' },
  { id: 'rf-ql1', sectionId: 'physical-rainforests', questionType: 'caseStudy', question: 'Using a case study of a tropical rainforest, explain the causes and impacts of deforestation.', markSchemeSummary: 'Causes: subsistence/commercial farming, logging, roads, minerals. Impacts: economic, soil erosion, climate. Name location.' },
  { id: 'coast-ql1', sectionId: 'physical-coastal', questionType: 'describe', question: 'Describe the formation of a wave-cut platform.', markSchemeSummary: ' cliff erosion; wave-cut notch; cliff retreat; platform exposed at low tide.' },
  { id: 'river-ql1', sectionId: 'physical-river', questionType: 'explain', question: 'Explain how physical and human factors affect flood risk.', markSchemeSummary: 'Physical: precipitation, geology, relief. Human: land use, urbanisation, deforestation.' },
  { id: 'glac-ql1', sectionId: 'physical-glacial', questionType: 'describe', question: 'Describe the formation of a corrie.', markSchemeSummary: 'Snow accumulates; nivation; plucking and abrasion; rotational slip; tarn forms when ice melts.' },
  { id: 'urb-ql1', sectionId: 'human-urban', questionType: 'caseStudy', question: 'Using a case study of a city in an LIC or NEE, explain the opportunities and challenges of urban growth.', markSchemeSummary: 'Opportunities: jobs, services. Challenges: slums, pollution, congestion. Name city.' },
  { id: 'econ-ql1', sectionId: 'human-economic', questionType: 'evaluate', question: 'Evaluate the advantages and disadvantages of TNCs for a host country.', markSchemeSummary: 'Advantages: jobs, investment, technology. Disadvantages: profits leave; poor working conditions; environmental damage. Conclusion.' },
  { id: 'res-ql1', sectionId: 'human-resource-overview', questionType: 'explain', question: 'Explain why the UK has a water deficit in some areas.', markSchemeSummary: 'Population density; rainfall distribution; demand; geology.' },
  { id: 'ds-ql1', sectionId: 'physical-desert', questionType: 'caseStudy', question: 'Using a case study of a hot desert, explain the development opportunities and challenges.', markSchemeSummary: 'Opportunities: minerals, energy, farming, tourism. Challenges: temperature, water, inaccessibility. Name location (e.g. Thar Desert, Sahara).' },
  { id: 'cl-ql1', sectionId: 'physical-cold', questionType: 'caseStudy', question: 'Using a case study of a cold environment, explain the development opportunities and challenges.', markSchemeSummary: 'Opportunities: minerals, energy, fishing, tourism. Challenges: temperature, inaccessibility, permafrost. Name location (e.g. Alaska, Svalbard).' },
  { id: 'uk-ql1', sectionId: 'physical-uk-overview', questionType: 'describe', question: 'Describe the relief of the UK.', markSchemeSummary: 'Uplands north and west; lowlands south and east; major river systems.' },
  { id: 'food-ql1', sectionId: 'human-food', questionType: 'evaluate', question: 'Evaluate strategies to increase food supply.', markSchemeSummary: 'Strategies: irrigation, biotechnology, urban farming. Advantages and disadvantages; sustainability.' },
  { id: 'water-ql1', sectionId: 'human-water', questionType: 'explain', question: 'Explain the causes and impacts of water insecurity.', markSchemeSummary: 'Causes: climate, geology, pollution, over-abstraction. Impacts: disease, food production, conflict.' },
  { id: 'energy-ql1', sectionId: 'human-energy', questionType: 'evaluate', question: 'Evaluate the advantages and disadvantages of renewable energy.', markSchemeSummary: 'Advantages: sustainable, lower emissions. Disadvantages: intermittency, land use, cost.' },
];

export function getQuestionLabForSections(sectionIds: GeographySectionId[]): GeographyQuestionLabItem[] {
  const set = new Set(sectionIds);
  return GEOGRAPHY_QUESTION_LAB.filter((q) => set.has(q.sectionId));
}

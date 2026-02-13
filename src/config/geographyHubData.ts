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
  // Natural hazards – stretch
  { id: 'nh-5', sectionId: 'physical-natural-hazards', title: 'Pacific Ring of Fire', coreIdea: 'The Pacific Ring of Fire is a belt around the Pacific Ocean where most earthquakes and volcanoes occur, due to subduction and collision at destructive and conservative plate margins.', changeScenario: 'Why is Japan at high tectonic risk?', misconception: 'Ring of Fire is a single fault line – it is a zone of many plate boundaries.' },
  { id: 'nh-6', sectionId: 'physical-natural-hazards', title: 'Hazard management cycle', coreIdea: 'Hazard management involves preparedness (planning, drills), response (rescue, aid), recovery (rebuilding) and mitigation (reducing future risk).', changeScenario: 'Which stage is most cost-effective for reducing deaths?', misconception: 'Response alone is enough – preparedness saves more lives.' },
  // Ecosystems – stretch
  { id: 'eco-2', sectionId: 'physical-ecosystems', title: 'Biodiversity and interdependence', coreIdea: 'Biodiversity is the variety of life. Species depend on each other (predator-prey, pollination). Loss of one species can cascade through the ecosystem.', changeScenario: 'Why does loss of bees affect food production?', misconception: 'One species loss does not matter – ecosystems are interconnected.' },
  { id: 'eco-3', sectionId: 'physical-ecosystems', title: 'Small-scale ecosystem', coreIdea: 'A small-scale ecosystem (e.g. pond, hedgerow) has producers, consumers, decomposers and abiotic factors. Changes to one component affect the whole.', changeScenario: 'What happens if fertiliser runs into a pond?', misconception: 'Ecosystems are self-contained – external inputs cause eutrophication.' },
  // Rainforests – stretch
  { id: 'rf-2', sectionId: 'physical-rainforests', title: 'Rainforest nutrient cycle', coreIdea: 'Most nutrients are in the biomass, not the soil. When trees are felled, nutrients are lost. The nutrient cycle is rapid due to high temperatures and rainfall.', changeScenario: 'Why does cleared rainforest land become infertile quickly?', misconception: 'Rainforest soil is rich – nutrients are in the vegetation.' },
  { id: 'rf-3', sectionId: 'physical-rainforests', title: 'Sustainable management', coreIdea: 'Strategies include selective logging, replanting, ecotourism, debt-for-nature swaps, and international agreements (e.g. FSC certification).', changeScenario: 'How does ecotourism reduce deforestation pressure?', misconception: 'Stopping all logging is the only solution – sustainable use can work.' },
  // Desert – stretch
  { id: 'ds-2', sectionId: 'physical-desert', title: 'Thar Desert case study', coreIdea: 'The Thar Desert (India/Pakistan) has opportunities: irrigation (Indira Gandhi Canal), mining (gypsum, limestone), solar power, tourism. Challenges: water scarcity, extreme temperatures.', changeScenario: 'What are the environmental costs of the Indira Gandhi Canal?', misconception: 'Deserts are useless – they have significant economic potential.' },
  // Cold – stretch
  { id: 'cl-2', sectionId: 'physical-cold', title: 'Svalbard case study', coreIdea: 'Svalbard (Norway) has opportunities: coal mining, fishing, research, tourism. Challenges: extreme cold, permafrost, inaccessibility. Conservation vs development conflicts.', changeScenario: 'Why is tourism growing in Svalbard?', misconception: 'Cold environments have no economic value.' },
  // UK – stretch
  { id: 'uk-2', sectionId: 'physical-uk-overview', title: 'UK geology and relief', coreIdea: 'UK geology: older igneous and metamorphic rocks in north/west (hard, resistant); younger sedimentary in south/east (softer). Relief reflects rock type and glacial history.', changeScenario: 'Why are the Pennines a watershed?', misconception: 'Geology does not affect relief – it strongly influences landscape.' },
  // Coastal – stretch
  { id: 'coast-2', sectionId: 'physical-coastal', title: 'Coastal management strategies', coreIdea: 'Hard engineering: sea walls, groynes, rock armour – resist erosion but expensive, can cause erosion elsewhere. Soft: beach nourishment, managed retreat – work with natural processes.', changeScenario: 'Why might managed retreat be chosen over a sea wall?', misconception: 'Hard engineering is always best – soft can be more sustainable.' },
  { id: 'coast-3', sectionId: 'physical-coastal', title: 'Holderness Coast case study', coreIdea: 'Holderness (Yorkshire) has fastest erosion in Europe (1–2 m/year). Soft boulder clay, destructive waves. Mappleton defences protect village but increase erosion south.', changeScenario: 'Why does defending one area increase erosion elsewhere?', misconception: 'Coastal defences protect the whole coast – they can displace erosion.' },
  // River – stretch
  { id: 'river-2', sectionId: 'physical-river', title: 'Somerset Levels flood case study', coreIdea: '2014 floods: prolonged rainfall, low-lying land, rivers not dredged. Impacts: homes, farms, roads. Management: dredging, flood relief channel, sustainable drainage.', changeScenario: 'Why did the Somerset Levels flood in 2014?', misconception: 'Floods are purely natural – human decisions affect risk.' },
  { id: 'river-3', sectionId: 'physical-river', title: 'River long profile', coreIdea: 'Upper course: steep, V-valley, waterfalls. Middle: gentler, meanders. Lower: flat, flood plain, levees, delta. Erosion dominates upper; deposition lower.', changeScenario: 'Where would you expect the fastest flow?', misconception: 'Rivers flow at constant speed – gradient and channel shape affect velocity.' },
  // Glacial – stretch
  { id: 'glac-2', sectionId: 'physical-glacial', title: 'Lake District case study', coreIdea: 'Lake District: glaciated upland with corries, arêtes, ribbon lakes (e.g. Windermere). Land use conflicts: tourism vs farming vs conservation vs quarrying.', changeScenario: 'What conflicts exist in the Lake District?', misconception: 'Glaciated areas are only for tourism.' },
  // Urban – stretch
  { id: 'urb-2', sectionId: 'human-urban', title: 'Rio de Janeiro case study (LIC/NEE)', coreIdea: 'Rio: opportunities (jobs, healthcare, education) but challenges (favelas, crime, pollution, traffic). Favela Bairro improved housing; Olympic regeneration had mixed results.', changeScenario: 'Why do favelas develop on steep slopes?', misconception: 'Urban growth is always negative – cities can drive development.' },
  { id: 'urb-3', sectionId: 'human-urban', title: 'Bristol case study (UK city)', coreIdea: 'Bristol: migration (from Poland, Somalia), regeneration (Harbourside), inequality (deprived areas vs affluent suburbs), sustainability (cycling, green spaces).', changeScenario: 'How has migration changed Bristol?', misconception: 'UK cities do not have inequality – deprivation exists in all cities.' },
  { id: 'urb-4', sectionId: 'human-urban', title: 'Urban change in the UK', coreIdea: 'UK cities face: population change, migration, deindustrialisation, regeneration, inequality. Counter-urbanisation and suburbanisation have shaped the urban landscape.', changeScenario: 'Why do people move from cities to rural areas?', misconception: 'Urbanisation only means growth – some UK cities have declined.' },
  // Economic – stretch
  { id: 'econ-2', sectionId: 'human-economic', title: 'Nigeria case study (NEE)', coreIdea: 'Nigeria: oil economy, TNCs (Shell), industrial development (Lagos), uneven development (north vs south), aid, environmental issues (Niger Delta).', changeScenario: 'Why is development uneven in Nigeria?', misconception: 'Oil wealth automatically leads to development – governance matters.' },
  { id: 'econ-3', sectionId: 'human-economic', title: 'Aid and development', coreIdea: 'Types: bilateral, multilateral, NGO. Advantages: infrastructure, emergency relief. Disadvantages: debt, dependency, corruption. Fairtrade and microfinance are alternatives.', changeScenario: 'When might aid do more harm than good?', misconception: 'All aid is helpful – it can create dependency.' },
  // Resource – stretch
  { id: 'res-2', sectionId: 'human-resource-overview', title: 'UK resource mix', coreIdea: 'UK: imports 40% of food, 50% of energy. Water: surplus north, deficit south-east. Strategies: reduce waste, increase efficiency, diversify supply.', changeScenario: 'Why does the UK import so much food?', misconception: 'The UK is self-sufficient – it relies on imports.' },
  // Food – stretch
  { id: 'food-2', sectionId: 'human-food', title: 'Famine and food distribution', coreIdea: 'Famines often caused by distribution failure, not absolute shortage. Conflict, poverty, infrastructure limit access. Solutions: local production, fair trade, reducing waste.', changeScenario: 'Why do famines occur when food exists?', misconception: 'Famine means no food – often it is about access.' },
  // Water – stretch
  { id: 'water-2', sectionId: 'human-water', title: 'Water conflict', coreIdea: 'Transboundary rivers (Nile, Colorado) can cause conflict. Upstream dams affect downstream. Solutions: treaties, joint management, efficiency.', changeScenario: 'Why might Ethiopia building a dam concern Egypt?', misconception: 'Water is only a local issue – it has geopolitical dimensions.' },
  // Energy – stretch
  { id: 'energy-2', sectionId: 'human-energy', title: 'UK energy mix', coreIdea: 'UK: declining fossil fuels, growing renewables (wind, solar). Nuclear provides base load. Fracking debated. Energy security depends on diversity and efficiency.', changeScenario: 'Why is the UK investing in offshore wind?', misconception: 'One energy source can meet all needs – mix is essential.' },
  // Issue evaluation
  { id: 'app-1', sectionId: 'app-issue-evaluation', title: 'Pre-release resource analysis', coreIdea: 'Paper 3 issue evaluation: analyse pre-release booklet (maps, data, stakeholder views). Make a decision and justify with evidence. Consider social, economic, environmental factors.', changeScenario: 'How would you weigh economic benefits against environmental costs?', misconception: 'There is one correct answer – evaluation requires balanced judgement.' },
  // Fieldwork
  { id: 'app-2', sectionId: 'app-fieldwork', title: 'Geographical enquiry', coreIdea: 'Enquiry process: question, hypothesis, method, data collection, presentation, analysis, conclusion, evaluation. Physical and human enquiries; contrasting locations.', changeScenario: 'Why is it important to evaluate your method?', misconception: 'Data speaks for itself – methodology affects validity.' },
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
  // Natural hazards – expanded
  { id: 'nh-kt7', sectionId: 'physical-natural-hazards', term: 'Constructive margin', definition: 'Plate boundary where plates move apart; magma rises; new crust forms.', inContext: 'Mid-Atlantic Ridge; shield volcanoes.' },
  { id: 'nh-kt8', sectionId: 'physical-natural-hazards', term: 'Destructive margin', definition: 'Plate boundary where oceanic plate subducts under continental; volcanoes and earthquakes.', inContext: 'Pacific Ring of Fire; composite volcanoes.' },
  { id: 'nh-kt9', sectionId: 'physical-natural-hazards', term: 'Conservative margin', definition: 'Plate boundary where plates slide past each other; earthquakes but no volcanoes.', inContext: 'San Andreas Fault.' },
  { id: 'nh-kt10', sectionId: 'physical-natural-hazards', term: 'Secondary effect', definition: 'Indirect impact of a hazard (e.g. disease, unemployment, mental health).', inContext: 'Often worse in LICs due to weak infrastructure.' },
  { id: 'nh-kt11', sectionId: 'physical-natural-hazards', term: 'Immediate response', definition: 'Short-term action after a hazard (rescue, shelter, medical aid).', inContext: 'First 48–72 hours critical.' },
  { id: 'nh-kt12', sectionId: 'physical-natural-hazards', term: 'Coriolis effect', definition: 'Deflection of winds due to Earth\'s rotation; causes tropical storms to spin.', inContext: 'Explains storm rotation direction.' },
  { id: 'nh-kt13', sectionId: 'physical-natural-hazards', term: 'Vulnerability', definition: 'How susceptible a population is to hazard impact.', inContext: 'Higher in LICs due to poor housing, infrastructure.' },
  { id: 'nh-kt14', sectionId: 'physical-natural-hazards', term: 'Capacity to cope', definition: 'Ability of a population to respond to and recover from a hazard.', inContext: 'HICs have greater capacity.' },
  // Ecosystems – expanded
  { id: 'eco-kt4', sectionId: 'physical-ecosystems', term: 'Decomposer', definition: 'Organism that breaks down dead matter and returns nutrients to soil.', inContext: 'Bacteria, fungi.' },
  { id: 'eco-kt5', sectionId: 'physical-ecosystems', term: 'Nutrient cycling', definition: 'Movement of nutrients through ecosystem (plants → animals → decomposers → soil).', inContext: 'Essential for ecosystem function.' },
  { id: 'eco-kt6', sectionId: 'physical-ecosystems', term: 'Biodiversity', definition: 'Variety of life in an ecosystem.', inContext: 'Higher in tropical rainforests.' },
  { id: 'eco-kt7', sectionId: 'physical-ecosystems', term: 'Abiotic', definition: 'Non-living factor (temperature, light, water, soil).', inContext: 'Contrast with biotic (living).' },
  { id: 'eco-kt8', sectionId: 'physical-ecosystems', term: 'Biotic', definition: 'Living component of ecosystem.', inContext: 'Plants, animals, microorganisms.' },
  // Rainforests – expanded
  { id: 'rf-kt4', sectionId: 'physical-rainforests', term: 'Clear-felling', definition: 'Removing all trees from an area.', inContext: 'Less sustainable than selective logging.' },
  { id: 'rf-kt5', sectionId: 'physical-rainforests', term: 'Slash and burn', definition: 'Clearing land by cutting and burning vegetation.', inContext: 'Subsistence farming method.' },
  { id: 'rf-kt6', sectionId: 'physical-rainforests', term: 'Sustainable management', definition: 'Using resources so they are available for future generations.', inContext: 'FSC, ecotourism, replanting.' },
  { id: 'rf-kt7', sectionId: 'physical-rainforests', term: 'Canopy', definition: 'Upper layer of rainforest where most wildlife lives.', inContext: 'Dense layer of tree tops.' },
  { id: 'rf-kt8', sectionId: 'physical-rainforests', term: 'Liana', definition: 'Woody vine that grows up trees in rainforest.', inContext: 'Part of rainforest structure.' },
  // Desert – expanded
  { id: 'ds-kt2', sectionId: 'physical-desert', term: 'Irrigation', definition: 'Artificial supply of water for agriculture.', inContext: 'Indira Gandhi Canal in Thar Desert.' },
  { id: 'ds-kt3', sectionId: 'physical-desert', term: 'Oasis', definition: 'Fertile area in desert where water is available.', inContext: 'Supports settlement and farming.' },
  { id: 'ds-kt4', sectionId: 'physical-desert', term: 'Mineral extraction', definition: 'Mining of minerals (e.g. oil, gas, gypsum).', inContext: 'Desert development opportunity.' },
  // Cold – expanded
  { id: 'cl-kt2', sectionId: 'physical-cold', term: 'Tundra', definition: 'Cold, treeless biome with permafrost.', inContext: 'Alaska, northern Canada, Siberia.' },
  { id: 'cl-kt3', sectionId: 'physical-cold', term: 'Conservation', definition: 'Protecting environment from damage.', inContext: 'Balanced with development in cold environments.' },
  { id: 'cl-kt4', sectionId: 'physical-cold', term: 'Wilderness', definition: 'Undisturbed natural area.', inContext: 'Valued for conservation; conflicts with development.' },
  // UK – expanded
  { id: 'uk-kt3', sectionId: 'physical-uk-overview', term: 'Relief', definition: 'Shape of the land (height and steepness).', inContext: 'UK has varied relief.' },
  { id: 'uk-kt4', sectionId: 'physical-uk-overview', term: 'Watershed', definition: 'High ground separating river drainage basins.', inContext: 'Pennines are UK watershed.' },
  { id: 'uk-kt5', sectionId: 'physical-uk-overview', term: 'Drainage basin', definition: 'Area of land drained by a river and its tributaries.', inContext: 'Thames, Severn, etc.' },
  // Coastal – expanded
  { id: 'coast-kt4', sectionId: 'physical-coastal', term: 'Hydraulic action', definition: 'Erosion by force of water against rock.', inContext: 'Waves compress air in cracks.' },
  { id: 'coast-kt5', sectionId: 'physical-coastal', term: 'Abrasion', definition: 'Erosion by material carried by waves scraping rock.', inContext: 'Sand and pebbles act like sandpaper.' },
  { id: 'coast-kt6', sectionId: 'physical-coastal', term: 'Attrition', definition: 'Rocks hitting each other and breaking into smaller pieces.', inContext: 'Rounds and reduces sediment size.' },
  { id: 'coast-kt7', sectionId: 'physical-coastal', term: 'Wave-cut notch', definition: 'Hollow at base of cliff formed by erosion.', inContext: 'Cliff retreats; platform exposed.' },
  { id: 'coast-kt8', sectionId: 'physical-coastal', term: 'Spit', definition: 'Extended beach of deposited material projecting into sea.', inContext: 'Formed by longshore drift.' },
  { id: 'coast-kt9', sectionId: 'physical-coastal', term: 'Soft engineering', definition: 'Working with natural processes (beach nourishment, managed retreat).', inContext: 'Often more sustainable than hard.' },
  { id: 'coast-kt10', sectionId: 'physical-coastal', term: 'Beach nourishment', definition: 'Adding sand to beach to replace eroded material.', inContext: 'Soft engineering strategy.' },
  // River – expanded
  { id: 'river-kt3', sectionId: 'physical-river', term: 'Discharge', definition: 'Volume of water passing a point per second (m³/s).', inContext: 'Shown on hydrograph.' },
  { id: 'river-kt4', sectionId: 'physical-river', term: 'Lag time', definition: 'Delay between peak rainfall and peak discharge.', inContext: 'Shorter in urban areas.' },
  { id: 'river-kt5', sectionId: 'physical-river', term: 'Meander', definition: 'Bend in river; erosion on outside, deposition on inside.', inContext: 'Middle and lower course.' },
  { id: 'river-kt6', sectionId: 'physical-river', term: 'Ox-bow lake', definition: 'Cut-off meander forming a crescent-shaped lake.', inContext: 'Formed when meander neck is cut through.' },
  { id: 'river-kt7', sectionId: 'physical-river', term: 'Flood plain', definition: 'Flat area beside river that floods when river overflows.', inContext: 'Deposition in lower course.' },
  { id: 'river-kt8', sectionId: 'physical-river', term: 'Levee', definition: 'Natural embankment beside river formed by deposition during floods.', inContext: 'Raised banks.' },
  { id: 'river-kt9', sectionId: 'physical-river', term: 'Dredging', definition: 'Removing sediment from river bed to increase capacity.', inContext: 'Flood management strategy.' },
  // Glacial – expanded
  { id: 'glac-kt3', sectionId: 'physical-glacial', term: 'Abrasion (glacial)', definition: 'Glacial erosion by rock embedded in ice scraping bedrock.', inContext: 'Creates striations.' },
  { id: 'glac-kt4', sectionId: 'physical-glacial', term: 'Plucking', definition: 'Glacial erosion where ice freezes to rock and pulls it away.', inContext: 'Common in jointed rock.' },
  { id: 'glac-kt5', sectionId: 'physical-glacial', term: 'Arête', definition: 'Sharp ridge between two corries.', inContext: 'Formed by glacial erosion.' },
  { id: 'glac-kt6', sectionId: 'physical-glacial', term: 'Ribbon lake', definition: 'Long, narrow lake in glacial trough.', inContext: 'E.g. Windermere.' },
  { id: 'glac-kt7', sectionId: 'physical-glacial', term: 'Till', definition: 'Unsorted material deposited directly by glacier.', inContext: 'Contrast with sorted outwash.' },
  { id: 'glac-kt8', sectionId: 'physical-glacial', term: 'Erratic', definition: 'Boulder transported and deposited by glacier.', inContext: 'Different rock type from local.' },
  // Urban – expanded
  { id: 'urb-kt4', sectionId: 'human-urban', term: 'Urbanisation', definition: 'Increase in proportion of people living in urban areas.', inContext: 'Global trend, especially in LICs/NEEs.' },
  { id: 'urb-kt5', sectionId: 'human-urban', term: 'Rural-urban migration', definition: 'Movement of people from countryside to cities.', inContext: 'Push and pull factors.' },
  { id: 'urb-kt6', sectionId: 'human-urban', term: 'Squatter settlement', definition: 'Informal housing built without permission.', inContext: 'Favelas, shanty towns.' },
  { id: 'urb-kt7', sectionId: 'human-urban', term: 'Greenfield site', definition: 'Land not previously built on.', inContext: 'Contrast with brownfield.' },
  { id: 'urb-kt8', sectionId: 'human-urban', term: 'Regeneration', definition: 'Improving run-down urban areas.', inContext: 'Harbourside Bristol, Olympic Park London.' },
  { id: 'urb-kt9', sectionId: 'human-urban', term: 'Inequality', definition: 'Difference in wealth and opportunity between groups.', inContext: 'Exists within and between cities.' },
  { id: 'urb-kt10', sectionId: 'human-urban', term: 'Counter-urbanisation', definition: 'Movement of people from cities to rural areas.', inContext: 'UK trend; commuting, retirement.' },
  // Economic – expanded
  { id: 'econ-kt4', sectionId: 'human-economic', term: 'GNI', definition: 'Gross National Income – total income of a country.', inContext: 'Measure of development.' },
  { id: 'econ-kt5', sectionId: 'human-economic', term: 'LIC', definition: 'Low-income country.', inContext: 'E.g. Ethiopia, Nepal.' },
  { id: 'econ-kt6', sectionId: 'human-economic', term: 'NEE', definition: 'Newly emerging economy – rapidly industrialising.', inContext: 'E.g. Nigeria, Brazil, India.' },
  { id: 'econ-kt7', sectionId: 'human-economic', term: 'HIC', definition: 'High-income country.', inContext: 'E.g. UK, USA, Japan.' },
  { id: 'econ-kt8', sectionId: 'human-economic', term: 'Fairtrade', definition: 'Trading system ensuring fair prices for producers.', inContext: 'Reduces development gap.' },
  { id: 'econ-kt9', sectionId: 'human-economic', term: 'Debt relief', definition: 'Cancelling or reducing debt owed by poor countries.', inContext: 'Development strategy.' },
  { id: 'econ-kt10', sectionId: 'human-economic', term: 'Industrial development', definition: 'Growth of manufacturing sector.', inContext: 'NEEs often industrialise rapidly.' },
  // Resource – expanded
  { id: 'res-kt2', sectionId: 'human-resource-overview', term: 'Water surplus', definition: 'Area where water supply exceeds demand.', inContext: 'UK north and west.' },
  { id: 'res-kt3', sectionId: 'human-resource-overview', term: 'Water deficit', definition: 'Area where water demand exceeds supply.', inContext: 'UK south-east.' },
  { id: 'res-kt4', sectionId: 'human-resource-overview', term: 'Sustainability', definition: 'Meeting needs without compromising future generations.', inContext: 'Key concept in resource management.' },
  // Food – expanded
  { id: 'food-kt2', sectionId: 'human-food', term: 'Irrigation (food)', definition: 'Artificial water supply for crops.', inContext: 'Increases yield but can cause salinisation.' },
  { id: 'food-kt3', sectionId: 'human-food', term: 'Biotechnology', definition: 'Using living organisms to improve crops.', inContext: 'GM crops, drought resistance.' },
  { id: 'food-kt4', sectionId: 'human-food', term: 'Urban farming', definition: 'Growing food in cities.', inContext: 'Reduces food miles; limited scale.' },
  // Water – expanded
  { id: 'water-kt2', sectionId: 'human-water', term: 'Desalination', definition: 'Removing salt from seawater to produce fresh water.', inContext: 'Expensive; used in Middle East.' },
  { id: 'water-kt3', sectionId: 'human-water', term: 'Water stress', definition: 'When demand approaches supply.', inContext: 'Many regions face stress.' },
  { id: 'water-kt4', sectionId: 'human-water', term: 'Water scarcity', definition: 'Lack of sufficient water.', inContext: 'Physical or economic.' },
  // Energy – expanded
  { id: 'energy-kt2', sectionId: 'human-energy', term: 'Renewable energy', definition: 'Energy from sources that replenish (solar, wind, hydro).', inContext: 'Sustainable; intermittency issues.' },
  { id: 'energy-kt3', sectionId: 'human-energy', term: 'Fossil fuel', definition: 'Coal, oil, gas – formed from ancient organic matter.', inContext: 'Finite; cause climate change.' },
  { id: 'energy-kt4', sectionId: 'human-energy', term: 'Nuclear power', definition: 'Energy from nuclear fission.', inContext: 'Base load; radioactive waste.' },
  { id: 'energy-kt5', sectionId: 'human-energy', term: 'Intermittency', definition: 'Renewables not always available (e.g. wind, sun).', inContext: 'Challenge for grid stability.' },
  // Fieldwork
  { id: 'app-kt1', sectionId: 'app-fieldwork', term: 'Hypothesis', definition: 'Testable statement for geographical enquiry.', inContext: 'E.g. "Velocity increases downstream."' },
  { id: 'app-kt2', sectionId: 'app-fieldwork', term: 'Primary data', definition: 'Data collected by researcher.', inContext: 'Fieldwork measurements.' },
  { id: 'app-kt3', sectionId: 'app-fieldwork', term: 'Secondary data', definition: 'Data collected by others.', inContext: 'Census, maps.' },
  { id: 'app-kt4', sectionId: 'app-fieldwork', term: 'Systematic sampling', definition: 'Sampling at regular intervals.', inContext: 'Transect across beach.' },
  { id: 'app-kt5', sectionId: 'app-fieldwork', term: 'Random sampling', definition: 'Each location has equal chance of selection.', inContext: 'Reduces bias.' },
  // Additional key terms for 300+ target
  { id: 'nh-kt15', sectionId: 'physical-natural-hazards', term: 'Epicentre', definition: 'Point on Earth\'s surface directly above the focus of an earthquake.', inContext: 'Where shaking is often strongest.' },
  { id: 'nh-kt16', sectionId: 'physical-natural-hazards', term: 'Richter scale', definition: 'Scale measuring earthquake magnitude (logarithmic).', inContext: 'Each unit = 10× more energy.' },
  { id: 'nh-kt17', sectionId: 'physical-natural-hazards', term: 'Tsunami', definition: 'Giant sea wave caused by underwater earthquake or landslide.', inContext: 'Can travel across oceans.' },
  { id: 'eco-kt9', sectionId: 'physical-ecosystems', term: 'Interdependence', definition: 'Species depending on each other for survival.', inContext: 'Removing one affects others.' },
  { id: 'eco-kt10', sectionId: 'physical-ecosystems', term: 'Eutrophication', definition: 'Excess nutrients cause algal bloom; oxygen depletion; fish die.', inContext: 'Often from fertiliser runoff.' },
  { id: 'rf-kt9', sectionId: 'physical-rainforests', term: 'Evapotranspiration', definition: 'Water lost from plants and soil to atmosphere.', inContext: 'Rainforests recycle much water.' },
  { id: 'rf-kt10', sectionId: 'physical-rainforests', term: 'FSC', definition: 'Forest Stewardship Council – certification for sustainable timber.', inContext: 'Ensures responsible logging.' },
  { id: 'coast-kt11', sectionId: 'physical-coastal', term: 'Fetch', definition: 'Distance of open water over which wind blows.', inContext: 'Longer fetch = larger waves.' },
  { id: 'coast-kt12', sectionId: 'physical-coastal', term: 'Constructive wave', definition: 'Gentle wave that deposits material; builds beaches.', inContext: 'Contrast with destructive.' },
  { id: 'coast-kt13', sectionId: 'physical-coastal', term: 'Destructive wave', definition: 'Steep wave that erodes; removes beach material.', inContext: 'Strong backwash.' },
  { id: 'river-kt10', sectionId: 'physical-river', term: 'Drainage basin', definition: 'Area of land drained by a river and its tributaries.', inContext: 'Watershed marks boundary.' },
  { id: 'river-kt11', sectionId: 'physical-river', term: 'Infiltration', definition: 'Water soaking into the soil.', inContext: 'Reduced by impermeable surfaces.' },
  { id: 'river-kt12', sectionId: 'physical-river', term: 'Surface runoff', definition: 'Water flowing over the ground surface.', inContext: 'Increases with urbanisation.' },
  { id: 'glac-kt9', sectionId: 'physical-glacial', term: 'Glacial trough', definition: 'U-shaped valley carved by glacier.', inContext: 'Contrast with V-shaped river valley.' },
  { id: 'glac-kt10', sectionId: 'physical-glacial', term: 'Truncated spur', definition: 'Valley side cut off by glacier.', inContext: 'Former interlocking spur.' },
  { id: 'urb-kt11', sectionId: 'human-urban', term: 'Deindustrialisation', definition: 'Decline of manufacturing industry.', inContext: 'UK cities since 1970s.' },
  { id: 'urb-kt12', sectionId: 'human-urban', term: 'Suburbanisation', definition: 'Growth of suburbs; people moving from inner city.', inContext: 'Commuter settlements.' },
  { id: 'econ-kt11', sectionId: 'human-economic', term: 'Microfinance', definition: 'Small loans to poor people; alternative to aid.', inContext: 'Grameen Bank model.' },
  { id: 'econ-kt12', sectionId: 'human-economic', term: 'Intermediate technology', definition: 'Appropriate technology for local conditions.', inContext: 'Not always high-tech.' },
  { id: 'res-kt5', sectionId: 'human-resource-overview', term: 'Energy mix', definition: 'Proportion of different energy sources used.', inContext: 'UK: declining fossil, growing renewable.' },
  { id: 'res-kt6', sectionId: 'human-resource-overview', term: 'Energy security', definition: 'Reliable access to affordable energy.', inContext: 'Affected by supply and demand.' },
  // More key terms toward 300+
  { id: 'nh-kt18', sectionId: 'physical-natural-hazards', term: 'Focus', definition: 'Point underground where earthquake originates.', inContext: 'Epicentre is directly above.' },
  { id: 'nh-kt19', sectionId: 'physical-natural-hazards', term: 'Subduction', definition: 'Oceanic plate sinking under continental plate at destructive margin.', inContext: 'Creates deep ocean trenches and volcanoes.' },
  { id: 'nh-kt20', sectionId: 'physical-natural-hazards', term: 'Composite volcano', definition: 'Steep-sided volcano at destructive margin; explosive eruptions.', inContext: 'E.g. Mount St Helens.' },
  { id: 'nh-kt21', sectionId: 'physical-natural-hazards', term: 'Shield volcano', definition: 'Gentle-sloped volcano at constructive margin; lava flows.', inContext: 'E.g. Mauna Loa.' },
  { id: 'eco-kt11', sectionId: 'physical-ecosystems', term: 'Food chain', definition: 'Linear sequence of energy transfer (producer → consumer).', inContext: 'Simpler than food web.' },
  { id: 'eco-kt12', sectionId: 'physical-ecosystems', term: 'Biomass', definition: 'Total mass of living organisms in an area.', inContext: 'Rainforest has high biomass.' },
  { id: 'rf-kt11', sectionId: 'physical-rainforests', term: 'Biomass (rainforest)', definition: 'Where most nutrients are stored in rainforest.', inContext: 'Soil is nutrient-poor.' },
  { id: 'rf-kt12', sectionId: 'physical-rainforests', term: 'Debt-for-nature swap', definition: 'Country\'s debt reduced in exchange for conservation.', inContext: 'Sustainable management strategy.' },
  { id: 'coast-kt14', sectionId: 'physical-coastal', term: 'Bay', definition: 'Indentation in coast where soft rock erodes faster.', inContext: 'Headlands and bays form from differential erosion.' },
  { id: 'coast-kt15', sectionId: 'physical-coastal', term: 'Headland', definition: 'Resistant rock projecting into sea.', inContext: 'Erodes more slowly than bays.' },
  { id: 'coast-kt16', sectionId: 'physical-coastal', term: 'Stack', definition: 'Isolated pillar of rock left when arch collapses.', inContext: 'Old Harry Rocks, Dorset.' },
  { id: 'coast-kt17', sectionId: 'physical-coastal', term: 'Groyne', definition: 'Wooden or rock barrier at right angles to coast.', inContext: 'Traps sediment; can cause erosion downdrift.' },
  { id: 'river-kt13', sectionId: 'physical-river', term: 'Tributary', definition: 'Smaller river joining a larger one.', inContext: 'Part of drainage basin.' },
  { id: 'river-kt14', sectionId: 'physical-river', term: 'Confluence', definition: 'Point where two rivers meet.', inContext: 'Tributary joins main river.' },
  { id: 'river-kt15', sectionId: 'physical-river', term: 'Waterfall', definition: 'Steep drop where hard rock overlies soft.', inContext: 'Upper course feature.' },
  { id: 'river-kt16', sectionId: 'physical-river', term: 'Gorge', definition: 'Steep-sided valley formed as waterfall retreats.', inContext: 'Cheddar Gorge.' },
  { id: 'glac-kt11', sectionId: 'physical-glacial', term: 'Pyramidal peak', definition: 'Sharp mountain summit where three or more corries meet.', inContext: 'Matterhorn-type peak.' },
  { id: 'glac-kt12', sectionId: 'physical-glacial', term: 'Drumlin', definition: 'Elongated hill of glacial till; streamlined shape.', inContext: 'Indicates ice flow direction.' },
  { id: 'urb-kt13', sectionId: 'human-urban', term: 'Push factor', definition: 'Reason for leaving a place (e.g. unemployment, poverty).', inContext: 'Rural-urban migration.' },
  { id: 'urb-kt14', sectionId: 'human-urban', term: 'Pull factor', definition: 'Reason for moving to a place (e.g. jobs, education).', inContext: 'Rural-urban migration.' },
  { id: 'urb-kt15', sectionId: 'human-urban', term: 'Informal economy', definition: 'Unofficial, unregulated economic activity.', inContext: 'Common in squatter settlements.' },
  { id: 'econ-kt13', sectionId: 'human-economic', term: 'Bilateral aid', definition: 'Aid from one country to another.', inContext: 'UK to India.' },
  { id: 'econ-kt14', sectionId: 'human-economic', term: 'NGO', definition: 'Non-governmental organisation.', inContext: 'Oxfam, WaterAid provide aid.' },
  { id: 'econ-kt15', sectionId: 'human-economic', term: 'Remittance', definition: 'Money sent home by migrants.', inContext: 'Important for some LICs.' },
  { id: 'food-kt5', sectionId: 'human-food', term: 'Famine', definition: 'Severe food shortage causing widespread hunger and death.', inContext: 'Often distribution failure, not absolute shortage.' },
  { id: 'food-kt6', sectionId: 'human-food', term: 'Food waste', definition: 'Food lost or thrown away.', inContext: 'Reducing waste improves food security.' },
  { id: 'water-kt5', sectionId: 'human-water', term: 'Reservoir', definition: 'Artificial lake storing water.', inContext: 'Dams create reservoirs.' },
  { id: 'water-kt6', sectionId: 'human-water', term: 'Transboundary river', definition: 'River flowing through more than one country.', inContext: 'Nile, Colorado – potential conflict.' },
  { id: 'energy-kt6', sectionId: 'human-energy', term: 'Base load', definition: 'Minimum constant demand for electricity.', inContext: 'Nuclear and coal often provide base load.' },
  { id: 'energy-kt7', sectionId: 'human-energy', term: 'Offshore wind', definition: 'Wind turbines in the sea.', inContext: 'UK has large capacity.' },
  { id: 'app-kt6', sectionId: 'app-fieldwork', term: 'Stratified sampling', definition: 'Sampling proportionally from different groups.', inContext: 'E.g. by land use type.' },
  { id: 'app-kt7', sectionId: 'app-fieldwork', term: 'Transect', definition: 'Line along which samples are taken.', inContext: 'Beach profile, vegetation.' },
  // Additional key terms toward 300+ (Grade 9 spec coverage)
  { id: 'nh-kt22', sectionId: 'physical-natural-hazards', term: 'Magnitude', definition: 'Size or strength of an earthquake; measured on Richter scale.', inContext: 'Each unit = 10× more energy.' },
  { id: 'nh-kt23', sectionId: 'physical-natural-hazards', term: 'Lava', definition: 'Molten rock that reaches the Earth\'s surface.', inContext: 'Constructive margins: runny; destructive: viscous.' },
  { id: 'nh-kt24', sectionId: 'physical-natural-hazards', term: 'Magma', definition: 'Molten rock beneath the Earth\'s surface.', inContext: 'Rises at constructive and destructive margins.' },
  { id: 'eco-kt13', sectionId: 'physical-ecosystems', term: 'Habitat', definition: 'Place where an organism lives.', inContext: 'Provides food, shelter, breeding sites.' },
  { id: 'eco-kt14', sectionId: 'physical-ecosystems', term: 'Niche', definition: 'Role of an organism in its ecosystem.', inContext: 'What it eats, where it lives, how it behaves.' },
  { id: 'rf-kt13', sectionId: 'physical-rainforests', term: 'Biodiversity hotspot', definition: 'Area with very high species diversity under threat.', inContext: 'Amazon, Congo Basin.' },
  { id: 'rf-kt14', sectionId: 'physical-rainforests', term: 'Carbon sink', definition: 'Area that absorbs more CO2 than it releases.', inContext: 'Rainforests store huge amounts of carbon.' },
  { id: 'coast-kt18', sectionId: 'physical-coastal', term: 'Arch', definition: 'Opening through a headland formed when cave erodes through.', inContext: 'Durdle Door, Dorset.' },
  { id: 'coast-kt19', sectionId: 'physical-coastal', term: 'Cave', definition: 'Hollow in cliff formed by wave erosion at weakness.', inContext: 'First stage of arch formation.' },
  { id: 'river-kt17', sectionId: 'physical-river', term: 'Velocity', definition: 'Speed of river flow.', inContext: 'Faster on outside of meander; affects erosion/deposition.' },
  { id: 'river-kt18', sectionId: 'physical-river', term: 'Channel', definition: 'The bed and banks of a river.', inContext: 'Shape affects velocity and capacity.' },
  { id: 'glac-kt13', sectionId: 'physical-glacial', term: 'Lateral moraine', definition: 'Ridge of till along side of glacier.', inContext: 'Marks former ice margin.' },
  { id: 'glac-kt14', sectionId: 'physical-glacial', term: 'Terminal moraine', definition: 'Ridge of till at glacier snout.', inContext: 'Marks maximum extent of ice.' },
  { id: 'urb-kt16', sectionId: 'human-urban', term: 'Urban regeneration', definition: 'Improving run-down urban areas.', inContext: 'New housing, jobs, facilities.' },
  { id: 'urb-kt17', sectionId: 'human-urban', term: 'Deprivation', definition: 'Lack of access to opportunities and resources.', inContext: 'Measured by indices of multiple deprivation.' },
  { id: 'econ-kt16', sectionId: 'human-economic', term: 'Multilateral aid', definition: 'Aid from international organisations (e.g. World Bank, UN).', inContext: 'Often for large projects.' },
  { id: 'econ-kt17', sectionId: 'human-economic', term: 'Infrastructure', definition: 'Basic physical structures (roads, water, electricity).', inContext: 'Essential for development.' },
  { id: 'food-kt7', sectionId: 'human-food', term: 'Subsistence farming', definition: 'Growing food mainly for own consumption.', inContext: 'Common in LICs.' },
  { id: 'water-kt7', sectionId: 'human-water', term: 'Aquifer', definition: 'Underground layer of rock holding water.', inContext: 'Source of groundwater.' },
  { id: 'energy-kt8', sectionId: 'human-energy', term: 'Carbon neutral', definition: 'Net zero carbon emissions.', inContext: 'Balance emissions with absorption/offset.' },
  { id: 'app-kt8', sectionId: 'app-fieldwork', term: 'Bias', definition: 'Systematic error that affects results.', inContext: 'Sampling method can introduce bias.' },
  // Implementation plan expansion — toward 300+ key terms
  { id: 'nh-kt25', sectionId: 'physical-natural-hazards', term: 'Pyroclastic flow', definition: 'Fast-moving cloud of hot gas and volcanic material.', inContext: 'Most deadly volcanic hazard.' },
  { id: 'nh-kt26', sectionId: 'physical-natural-hazards', term: 'Lahar', definition: 'Mudflow of volcanic ash and water.', inContext: 'Can travel far from volcano.' },
  { id: 'nh-kt27', sectionId: 'physical-natural-hazards', term: 'Afforestation', definition: 'Planting trees on land that was not forest.', inContext: 'Climate change mitigation.' },
  { id: 'eco-kt15', sectionId: 'physical-ecosystems', term: 'Trophic level', definition: 'Position in a food chain (producer, primary consumer, etc.).', inContext: 'Energy is lost at each level.' },
  { id: 'eco-kt16', sectionId: 'physical-ecosystems', term: 'Keystone species', definition: 'Species that has disproportionate effect on ecosystem.', inContext: 'Removal causes major change.' },
  { id: 'rf-kt15', sectionId: 'physical-rainforests', term: 'Slash and burn', definition: 'Clearing land by cutting and burning vegetation.', inContext: 'Subsistence farming method.' },
  { id: 'rf-kt16', sectionId: 'physical-rainforests', term: 'Canopy', definition: 'Upper layer of rainforest where most wildlife lives.', inContext: 'Dense tree-top layer.' },
  { id: 'ds-kt5', sectionId: 'physical-desert', term: 'Overgrazing', definition: 'Too many animals grazing; vegetation cannot recover.', inContext: 'Cause of desertification.' },
  { id: 'ds-kt6', sectionId: 'physical-desert', term: 'Solar power', definition: 'Energy from sunlight.', inContext: 'Desert development opportunity.' },
  { id: 'cl-kt5', sectionId: 'physical-cold', term: 'Wilderness value', definition: 'Importance of undisturbed natural areas.', inContext: 'Conservation vs development in cold environments.' },
  { id: 'uk-kt6', sectionId: 'physical-uk-overview', term: 'Geology', definition: 'Study of rocks and Earth structure.', inContext: 'Affects UK relief and landforms.' },
  { id: 'coast-kt20', sectionId: 'physical-coastal', term: 'Wave-cut platform', definition: 'Gently sloping rock exposed at low tide.', inContext: 'Formed as cliff retreats.' },
  { id: 'coast-kt21', sectionId: 'physical-coastal', term: 'Mass movement', definition: 'Downslope movement of material (sliding, slumping).', inContext: 'Affects coastal cliffs.' },
  { id: 'river-kt19', sectionId: 'physical-river', term: 'Interlocking spurs', definition: 'Hills that alternate from each side in upper course.', inContext: 'River winds around resistant rock.' },
  { id: 'river-kt20', sectionId: 'physical-river', term: 'Estuary', definition: 'Where river meets sea; tidal and brackish.', inContext: 'Lower course feature.' },
  { id: 'glac-kt15', sectionId: 'physical-glacial', term: 'Outwash', definition: 'Sorted material deposited by meltwater beyond glacier.', inContext: 'Contrast with unsorted till.' },
  { id: 'glac-kt16', sectionId: 'physical-glacial', term: 'Hanging valley', definition: 'Tributary valley high above main glacial trough.', inContext: 'Waterfall often forms.' },
  { id: 'glac-kt17', sectionId: 'physical-glacial', term: 'Rotational slip', definition: 'Glacial erosion in corrie; ice rotates in hollow.', inContext: 'Creates armchair shape.' },
  { id: 'urb-kt18', sectionId: 'human-urban', term: 'Greenfield site', definition: 'Land not previously built on.', inContext: 'Contrast with brownfield.' },
  { id: 'urb-kt19', sectionId: 'human-urban', term: 'Sustainable urban living', definition: 'Meeting needs without harming future generations.', inContext: 'Water, energy, waste, green space.' },
  { id: 'econ-kt18', sectionId: 'human-economic', term: 'Demographic transition', definition: 'Change in birth and death rates as country develops.', inContext: 'DTM shows stages.' },
  { id: 'econ-kt19', sectionId: 'human-economic', term: 'Post-industrial economy', definition: 'Economy based on services rather than manufacturing.', inContext: 'UK since 1970s.' },
  { id: 'res-kt7', sectionId: 'human-resource-overview', term: 'Water surplus', definition: 'Area where supply exceeds demand.', inContext: 'UK north and west.' },
  { id: 'res-kt8', sectionId: 'human-resource-overview', term: 'Water deficit', definition: 'Area where demand exceeds supply.', inContext: 'UK south-east.' },
  { id: 'food-kt8', sectionId: 'human-food', term: 'Hydroponics', definition: 'Growing plants in nutrient solution without soil.', inContext: 'Urban farming strategy.' },
  { id: 'food-kt9', sectionId: 'human-food', term: 'Agribusiness', definition: 'Large-scale commercial farming.', inContext: 'UK food production.' },
  { id: 'water-kt8', sectionId: 'human-water', term: 'Grey water', definition: 'Wastewater from washing (not sewage).', inContext: 'Can be recycled for irrigation.' },
  { id: 'energy-kt9', sectionId: 'human-energy', term: 'Carbon capture', definition: 'Capturing CO2 from emissions for storage.', inContext: 'Mitigation strategy.' },
  { id: 'energy-kt10', sectionId: 'human-energy', term: 'Fracking', definition: 'Extracting gas from shale rock by fracturing.', inContext: 'Debated in UK.' },
  { id: 'app-kt9', sectionId: 'app-fieldwork', term: 'Data presentation', definition: 'Showing data in graphs, maps or tables.', inContext: 'Part of geographical enquiry.' },
  { id: 'app-kt10', sectionId: 'app-fieldwork', term: 'Conclusion', definition: 'Summary of findings answering the hypothesis.', inContext: 'Final stage of enquiry.' },
  // Content plan expansion — toward 300+ key terms (Grade 9 coverage)
  { id: 'nh-kt28', sectionId: 'physical-natural-hazards', term: 'Exposure', definition: 'How many people or assets are in a hazard zone.', inContext: 'Higher exposure = higher risk.' },
  { id: 'nh-kt29', sectionId: 'physical-natural-hazards', term: 'Hazard risk', definition: 'Chance of being affected by a hazard.', inContext: 'Increases with exposure, vulnerability, lack of capacity.' },
  { id: 'eco-kt17', sectionId: 'physical-ecosystems', term: 'Carbon cycle', definition: 'Movement of carbon between atmosphere, plants, animals and soil.', inContext: 'Deforestation disrupts the cycle.' },
  { id: 'eco-kt18', sectionId: 'physical-ecosystems', term: 'Succession', definition: 'Change in ecosystem over time as species replace each other.', inContext: 'Pioneer species → climax community.' },
  { id: 'rf-kt17', sectionId: 'physical-rainforests', term: 'Sustainable development', definition: 'Meeting needs without damaging future generations.', inContext: 'Balances economic and environmental.' },
  { id: 'coast-kt22', sectionId: 'physical-coastal', term: 'Rock armour', definition: 'Large boulders placed at coast to absorb wave energy.', inContext: 'Hard engineering strategy.' },
  { id: 'coast-kt23', sectionId: 'physical-coastal', term: 'Sea wall', definition: 'Concrete or stone wall to protect coast from erosion.', inContext: 'Expensive; can reflect waves.' },
  { id: 'river-kt21', sectionId: 'physical-river', term: 'Storm hydrograph', definition: 'Graph showing river discharge in response to a storm.', inContext: 'Shows lag time and peak discharge.' },
  { id: 'river-kt22', sectionId: 'physical-river', term: 'Rising limb', definition: 'Part of hydrograph where discharge increases after rainfall.', inContext: 'Steeper = faster runoff.' },
  { id: 'river-kt23', sectionId: 'physical-river', term: 'Falling limb', definition: 'Part of hydrograph where discharge decreases after peak.', inContext: 'Recession of flood.' },
  { id: 'glac-kt18', sectionId: 'physical-glacial', term: 'Bulldozing', definition: 'Glacial process pushing material in front of ice.', inContext: 'Creates push moraines.' },
  { id: 'urb-kt20', sectionId: 'human-urban', term: 'Urban greening', definition: 'Adding parks, trees and green space to cities.', inContext: 'Improves air quality and wellbeing.' },
  { id: 'urb-kt21', sectionId: 'human-urban', term: 'Deprivation index', definition: 'Measure of lack of access to opportunities and resources.', inContext: 'IMD = Index of Multiple Deprivation.' },
  { id: 'econ-kt20', sectionId: 'human-economic', term: 'Intermediate technology', definition: 'Technology appropriate for local conditions and skills.', inContext: 'Often more sustainable than high-tech.' },
  { id: 'econ-kt21', sectionId: 'human-economic', term: 'Debt-for-nature swap', definition: 'Country\'s debt reduced in exchange for conservation.', inContext: 'Sustainable development strategy.' },
  { id: 'food-kt10', sectionId: 'human-food', term: 'Food insecurity', definition: 'Lack of reliable access to sufficient nutritious food.', inContext: 'Affects millions globally.' },
  { id: 'water-kt9', sectionId: 'human-water', term: 'Water scarcity', definition: 'Lack of sufficient water for needs.', inContext: 'Physical or economic.' },
  { id: 'energy-kt11', sectionId: 'human-energy', term: 'Energy efficiency', definition: 'Using less energy to achieve the same outcome.', inContext: 'Reduces demand and costs.' },
  { id: 'app-kt11', sectionId: 'app-fieldwork', term: 'Reliability', definition: 'Consistency of results; repeatability of method.', inContext: 'Larger samples improve reliability.' },
  { id: 'app-kt12', sectionId: 'app-fieldwork', term: 'Validity', definition: 'Whether the method measures what it claims to measure.', inContext: 'Methodology affects validity.' },
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
  // Natural hazards – 3–5 per sub-topic
  { id: 'nh-qc4', sectionId: 'physical-natural-hazards', type: 'multipleChoice', question: 'At which plate margin does subduction occur?', options: ['Constructive', 'Destructive', 'Conservative', 'All margins'], correctAnswer: 'Destructive', feedback: { correct: 'Correct.', incorrect: 'Subduction occurs at destructive margins where oceanic plate goes under continental.' } },
  { id: 'nh-qc5', sectionId: 'physical-natural-hazards', type: 'trueFalse', question: 'The Pacific Ring of Fire has the most earthquakes and volcanoes.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'The Ring of Fire is the most tectonically active zone on Earth.' } },
  { id: 'nh-qc6', sectionId: 'physical-natural-hazards', type: 'shortAnswer', question: 'Name one type of climate change mitigation.', correctAnswer: ['renewable energy', 'afforestation', 'carbon capture', 'international agreements'], feedback: { correct: 'Correct.', incorrect: 'Mitigation includes renewable energy, afforestation, carbon capture, international agreements.' } },
  { id: 'nh-qc7', sectionId: 'physical-natural-hazards', type: 'multipleChoice', question: 'What increases hazard risk?', options: ['Living in a safe area', 'Good infrastructure', 'High population in hazard zone', 'Emergency planning'], correctAnswer: 'High population in hazard zone', feedback: { correct: 'Correct.', incorrect: 'More people exposed = higher risk.' } },
  // Ecosystems
  { id: 'eco-qc2', sectionId: 'physical-ecosystems', type: 'trueFalse', question: 'Biodiversity is higher in tropical rainforests than in the UK.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Tropical rainforests have the highest biodiversity on Earth.' } },
  { id: 'eco-qc3', sectionId: 'physical-ecosystems', type: 'shortAnswer', question: 'What is an abiotic factor?', correctAnswer: ['temperature', 'light', 'water', 'soil', 'non-living'], feedback: { correct: 'Correct.', incorrect: 'Abiotic = non-living (temperature, light, water, soil).' } },
  { id: 'eco-qc4', sectionId: 'physical-ecosystems', type: 'multipleChoice', question: 'What happens if a top predator is removed from a food web?', options: ['Nothing', 'Prey numbers increase', 'Prey numbers decrease', 'Decomposers increase'], correctAnswer: 'Prey numbers increase', feedback: { correct: 'Correct.', incorrect: 'Without predation, prey populations can grow.' } },
  // Rainforests
  { id: 'rf-qc2', sectionId: 'physical-rainforests', type: 'multipleChoice', question: 'Where are most nutrients in a rainforest?', options: ['In the soil', 'In the biomass (plants)', 'In the water', 'In the air'], correctAnswer: 'In the biomass (plants)', feedback: { correct: 'Correct.', incorrect: 'Most nutrients are in the vegetation; soil is thin and nutrient-poor.' } },
  { id: 'rf-qc3', sectionId: 'physical-rainforests', type: 'trueFalse', question: 'Ecotourism can help reduce deforestation.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Ecotourism provides income from intact forest, giving incentive to conserve.' } },
  { id: 'rf-qc4', sectionId: 'physical-rainforests', type: 'shortAnswer', question: 'Name one cause of deforestation.', correctAnswer: ['logging', 'farming', 'roads', 'mining', 'cattle ranching'], feedback: { correct: 'Correct.', incorrect: 'Causes include logging, farming, roads, mining, cattle ranching.' } },
  // Desert
  { id: 'ds-qc2', sectionId: 'physical-desert', type: 'multipleChoice', question: 'Which desert has the Indira Gandhi Canal?', options: ['Sahara', 'Thar', 'Kalahari', 'Atacama'], correctAnswer: 'Thar', feedback: { correct: 'Correct.', incorrect: 'The Indira Gandhi Canal irrigates the Thar Desert.' } },
  { id: 'ds-qc3', sectionId: 'physical-desert', type: 'trueFalse', question: 'Hot deserts have no economic value.', correctAnswer: 'false', feedback: { correct: 'Correct.', incorrect: 'Deserts have minerals, energy, farming (with irrigation), tourism.' } },
  // Cold
  { id: 'cl-qc2', sectionId: 'physical-cold', type: 'shortAnswer', question: 'Name one cold environment case study.', correctAnswer: ['svalbard', 'alaska', 'antarctica', 'siberia'], feedback: { correct: 'Correct.', incorrect: 'Case studies include Svalbard, Alaska, Antarctica.' } },
  { id: 'cl-qc3', sectionId: 'physical-cold', type: 'multipleChoice', question: 'What is a challenge for building in cold environments?', options: ['Too much rain', 'Permafrost', 'Too hot', 'Hurricanes'], correctAnswer: 'Permafrost', feedback: { correct: 'Correct.', incorrect: 'Permafrost thaws and causes ground to shift, damaging buildings.' } },
  // UK
  { id: 'uk-qc2', sectionId: 'physical-uk-overview', type: 'trueFalse', question: 'The Pennines form a watershed in England.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'The Pennines separate east-flowing and west-flowing rivers.' } },
  { id: 'uk-qc3', sectionId: 'physical-uk-overview', type: 'shortAnswer', question: 'Where are the UK lowlands?', correctAnswer: ['south', 'east', 'south and east'], feedback: { correct: 'Correct.', incorrect: 'Lowlands are in the south and east of the UK.' } },
  // Coastal
  { id: 'coast-qc2', sectionId: 'physical-coastal', type: 'multipleChoice', question: 'Which erosion process involves rocks hitting each other?', options: ['Hydraulic action', 'Abrasion', 'Attrition', 'Solution'], correctAnswer: 'Attrition', feedback: { correct: 'Correct.', incorrect: 'Attrition is when rocks in the water hit each other and break up.' } },
  { id: 'coast-qc3', sectionId: 'physical-coastal', type: 'trueFalse', question: 'Managed retreat is a form of soft engineering.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Managed retreat works with natural processes.' } },
  { id: 'coast-qc4', sectionId: 'physical-coastal', type: 'shortAnswer', question: 'Which UK coastline has the fastest erosion in Europe?', correctAnswer: ['holderness', 'holderness coast', 'yorkshire'], feedback: { correct: 'Correct.', incorrect: 'The Holderness Coast erodes 1–2 m per year.' } },
  { id: 'coast-qc5', sectionId: 'physical-coastal', type: 'multipleChoice', question: 'What coastal landform is formed by longshore drift?', options: ['Cliff', 'Spit', 'Wave-cut platform', 'Cave'], correctAnswer: 'Spit', feedback: { correct: 'Correct.', incorrect: 'Spits are formed by longshore drift depositing material.' } },
  // River
  { id: 'river-qc2', sectionId: 'physical-river', type: 'multipleChoice', question: 'What does lag time measure?', options: ['River length', 'Delay between rainfall and peak discharge', 'Flood depth', 'Water temperature'], correctAnswer: 'Delay between rainfall and peak discharge', feedback: { correct: 'Correct.', incorrect: 'Lag time is the delay between peak rainfall and peak discharge.' } },
  { id: 'river-qc3', sectionId: 'physical-river', type: 'shortAnswer', question: 'Name one soft engineering flood management strategy.', correctAnswer: ['flood plain zoning', 'afforestation', 'wetlands', 'washlands'], feedback: { correct: 'Correct.', incorrect: 'Soft strategies include flood plain zoning, afforestation, wetlands.' } },
  { id: 'river-qc4', sectionId: 'physical-river', type: 'trueFalse', question: 'The Somerset Levels flooded in 2014.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Prolonged rainfall caused major flooding in winter 2013–14.' } },
  { id: 'river-qc5', sectionId: 'physical-river', type: 'multipleChoice', question: 'Where does deposition mainly occur in a river?', options: ['Upper course', 'Where velocity drops', 'At the source', 'In the watershed'], correctAnswer: 'Where velocity drops', feedback: { correct: 'Correct.', incorrect: 'Deposition occurs when the river loses energy (velocity drops).' } },
  // Glacial
  { id: 'glac-qc2', sectionId: 'physical-glacial', type: 'shortAnswer', question: 'What shape is an arête?', correctAnswer: ['ridge', 'sharp ridge', 'narrow ridge'], feedback: { correct: 'Correct.', incorrect: 'An arête is a sharp ridge between two corries.' } },
  { id: 'glac-qc3', sectionId: 'physical-glacial', type: 'multipleChoice', question: 'Which UK area is a glaciated upland?', options: ['London', 'Lake District', 'Norfolk', 'Kent'], correctAnswer: 'Lake District', feedback: { correct: 'Correct.', incorrect: 'The Lake District has corries, arêtes and ribbon lakes.' } },
  { id: 'glac-qc4', sectionId: 'physical-glacial', type: 'trueFalse', question: 'Plucking is a type of glacial erosion.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Plucking occurs when ice freezes to rock and pulls it away.' } },
  // Urban
  { id: 'urb-qc2', sectionId: 'human-urban', type: 'shortAnswer', question: 'Name an LIC/NEE city case study.', correctAnswer: ['rio', 'rio de janeiro', 'mumbai', 'lagos'], feedback: { correct: 'Correct.', incorrect: 'Rio de Janeiro, Mumbai, Lagos are common case studies.' } },
  { id: 'urb-qc3', sectionId: 'human-urban', type: 'multipleChoice', question: 'What is a favela?', options: ['Shopping centre', 'Informal settlement', 'Office block', 'Park'], correctAnswer: 'Informal settlement', feedback: { correct: 'Correct.', incorrect: 'Favelas are informal settlements (slums) in Brazilian cities.' } },
  { id: 'urb-qc4', sectionId: 'human-urban', type: 'trueFalse', question: 'Bristol has experienced regeneration.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Harbourside and other areas have been regenerated.' } },
  { id: 'urb-qc5', sectionId: 'human-urban', type: 'shortAnswer', question: 'What is counter-urbanisation?', correctAnswer: ['movement from city to countryside', 'moving to rural areas', 'leaving cities'], feedback: { correct: 'Correct.', incorrect: 'Counter-urbanisation is movement from cities to rural areas.' } },
  // Economic
  { id: 'econ-qc2', sectionId: 'human-economic', type: 'shortAnswer', question: 'What does NEE stand for?', correctAnswer: ['newly emerging economy', 'newly emerging economies'], feedback: { correct: 'Correct.', incorrect: 'NEE = Newly Emerging Economy.' } },
  { id: 'econ-qc3', sectionId: 'human-economic', type: 'multipleChoice', question: 'Which is a development strategy?', options: ['Deforestation', 'Fairtrade', 'Pollution', 'War'], correctAnswer: 'Fairtrade', feedback: { correct: 'Correct.', incorrect: 'Fairtrade ensures producers get fair prices.' } },
  { id: 'econ-qc4', sectionId: 'human-economic', type: 'trueFalse', question: 'Nigeria is an NEE.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Nigeria is a newly emerging economy with oil and industrial growth.' } },
  { id: 'econ-qc5', sectionId: 'human-economic', type: 'shortAnswer', question: 'What does TNC stand for?', correctAnswer: ['transnational corporation', 'transnational company'], feedback: { correct: 'Correct.', incorrect: 'TNC = Transnational Corporation.' } },
  // Resource
  { id: 'res-qc2', sectionId: 'human-resource-overview', type: 'trueFalse', question: 'The UK imports a significant proportion of its food.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'The UK imports around 40% of its food.' } },
  { id: 'res-qc3', sectionId: 'human-resource-overview', type: 'multipleChoice', question: 'What does food miles measure?', options: ['Food weight', 'Distance food travels', 'Food cost', 'Food temperature'], correctAnswer: 'Distance food travels', feedback: { correct: 'Correct.', incorrect: 'Food miles = distance from producer to consumer.' } },
  // Food
  { id: 'food-qc2', sectionId: 'human-food', type: 'multipleChoice', question: 'What affects food supply?', options: ['Only climate', 'Climate, conflict, technology, water', 'Only technology', 'Only water'], correctAnswer: 'Climate, conflict, technology, water', feedback: { correct: 'Correct.', incorrect: 'Many factors: climate, conflict, technology, water, pests.' } },
  { id: 'food-qc3', sectionId: 'human-food', type: 'trueFalse', question: 'Producing more food always solves hunger.', correctAnswer: 'false', feedback: { correct: 'Correct.', incorrect: 'Distribution and access are often the problem, not total supply.' } },
  // Water
  { id: 'water-qc2', sectionId: 'human-water', type: 'shortAnswer', question: 'Name one strategy to increase water supply.', correctAnswer: ['dam', 'reservoir', 'water transfer', 'desalination'], feedback: { correct: 'Correct.', incorrect: 'Strategies include dams, water transfer, desalination.' } },
  { id: 'water-qc3', sectionId: 'human-water', type: 'multipleChoice', question: 'What is desalination?', options: ['Filtering water', 'Removing salt from seawater', 'Storing water', 'Transporting water'], correctAnswer: 'Removing salt from seawater', feedback: { correct: 'Correct.', incorrect: 'Desalination removes salt to produce fresh water.' } },
  // Energy
  { id: 'energy-qc2', sectionId: 'human-energy', type: 'shortAnswer', question: 'Name one renewable energy source.', correctAnswer: ['wind', 'solar', 'hydro', 'tidal', 'geothermal'], feedback: { correct: 'Correct.', incorrect: 'Renewables include wind, solar, hydro, tidal, geothermal.' } },
  { id: 'energy-qc3', sectionId: 'human-energy', type: 'trueFalse', question: 'Wind power is intermittent.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Wind does not always blow; supply varies.' } },
  { id: 'energy-qc4', sectionId: 'human-energy', type: 'multipleChoice', question: 'What is a disadvantage of nuclear power?', options: ['No emissions', 'Radioactive waste', 'Always available', 'Cheap to build'], correctAnswer: 'Radioactive waste', feedback: { correct: 'Correct.', incorrect: 'Nuclear produces long-lived radioactive waste.' } },
  // Issue evaluation
  { id: 'app-qc1', sectionId: 'app-issue-evaluation', type: 'trueFalse', question: 'Issue evaluation requires considering social, economic and environmental factors.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Balanced evaluation considers all three.' } },
  { id: 'app-qc2', sectionId: 'app-issue-evaluation', type: 'multipleChoice', question: 'What is the pre-release booklet used for?', options: ['Revision only', 'Paper 3 issue evaluation', 'Fieldwork', 'Map skills'], correctAnswer: 'Paper 3 issue evaluation', feedback: { correct: 'Correct.', incorrect: 'Pre-release is for the Paper 3 issue evaluation.' } },
  // Fieldwork
  { id: 'app-qc3', sectionId: 'app-fieldwork', type: 'shortAnswer', question: 'What is a hypothesis in geography?', correctAnswer: ['testable statement', 'prediction', 'question to test'], feedback: { correct: 'Correct.', incorrect: 'A hypothesis is a testable statement for enquiry.' } },
  { id: 'app-qc4', sectionId: 'app-fieldwork', type: 'trueFalse', question: 'Primary data is collected by the researcher.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Primary data = data you collect yourself.' } },
  // Additional quick checks for 120+ target
  { id: 'nh-qc8', sectionId: 'physical-natural-hazards', type: 'multipleChoice', question: 'What is the epicentre?', options: ['The focus of an earthquake', 'Point on surface above the focus', 'A type of volcano', 'A tsunami'], correctAnswer: 'Point on surface above the focus', feedback: { correct: 'Correct.', incorrect: 'Epicentre is directly above the focus.' } },
  { id: 'nh-qc9', sectionId: 'physical-natural-hazards', type: 'shortAnswer', question: 'What scale measures earthquake magnitude?', correctAnswer: ['richter', 'richter scale'], feedback: { correct: 'Correct.', incorrect: 'The Richter scale measures magnitude.' } },
  { id: 'eco-qc5', sectionId: 'physical-ecosystems', type: 'trueFalse', question: 'Eutrophication can cause fish to die.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Excess nutrients cause oxygen depletion.' } },
  { id: 'rf-qc5', sectionId: 'physical-rainforests', type: 'multipleChoice', question: 'What does FSC certify?', options: ['Food safety', 'Sustainable timber', 'Water quality', 'Energy'], correctAnswer: 'Sustainable timber', feedback: { correct: 'Correct.', incorrect: 'FSC = Forest Stewardship Council.' } },
  { id: 'coast-qc6', sectionId: 'physical-coastal', type: 'multipleChoice', question: 'What is fetch?', options: ['Wave height', 'Distance of open water wind blows over', 'Beach width', 'Cliff height'], correctAnswer: 'Distance of open water wind blows over', feedback: { correct: 'Correct.', incorrect: 'Fetch affects wave size.' } },
  { id: 'river-qc6', sectionId: 'physical-river', type: 'trueFalse', question: 'Urbanisation increases infiltration.', correctAnswer: 'false', feedback: { correct: 'Correct – impermeable surfaces reduce it.', incorrect: 'Urbanisation reduces infiltration.' } },
  { id: 'glac-qc5', sectionId: 'physical-glacial', type: 'shortAnswer', question: 'What shape is a glacial trough?', correctAnswer: ['u-shaped', 'u shaped'], feedback: { correct: 'Correct.', incorrect: 'Glaciers create U-shaped valleys.' } },
  { id: 'urb-qc6', sectionId: 'human-urban', type: 'multipleChoice', question: 'What is deindustrialisation?', options: ['Growth of industry', 'Decline of manufacturing', 'Urban growth', 'Migration'], correctAnswer: 'Decline of manufacturing', feedback: { correct: 'Correct.', incorrect: 'Deindustrialisation = manufacturing decline.' } },
  { id: 'econ-qc6', sectionId: 'human-economic', type: 'shortAnswer', question: 'What is microfinance?', correctAnswer: ['small loans', 'loans to poor', 'micro loans'], feedback: { correct: 'Correct.', incorrect: 'Microfinance = small loans to poor people.' } },
  { id: 'res-qc4', sectionId: 'human-resource-overview', type: 'multipleChoice', question: 'What is energy security?', options: ['Cheap energy only', 'Reliable access to affordable energy', 'Renewable only', 'No imports'], correctAnswer: 'Reliable access to affordable energy', feedback: { correct: 'Correct.', incorrect: 'Energy security = reliable, affordable supply.' } },
  // More quick checks for 120+ target
  { id: 'nh-qc10', sectionId: 'physical-natural-hazards', type: 'multipleChoice', question: 'Where does subduction occur?', options: ['Constructive margin', 'Destructive margin', 'Conservative margin', 'All margins'], correctAnswer: 'Destructive margin', feedback: { correct: 'Correct.', incorrect: 'Subduction = oceanic plate under continental at destructive margin.' } },
  { id: 'nh-qc11', sectionId: 'physical-natural-hazards', type: 'shortAnswer', question: 'What is the point on the surface directly above the earthquake focus?', correctAnswer: ['epicentre', 'epicenter'], feedback: { correct: 'Correct.', incorrect: 'Epicentre is directly above the focus.' } },
  { id: 'eco-qc6', sectionId: 'physical-ecosystems', type: 'multipleChoice', question: 'What is biomass?', options: ['Only plants', 'Total mass of living organisms', 'Dead matter only', 'Water content'], correctAnswer: 'Total mass of living organisms', feedback: { correct: 'Correct.', incorrect: 'Biomass = total mass of living organisms.' } },
  { id: 'rf-qc6', sectionId: 'physical-rainforests', type: 'trueFalse', question: 'Debt-for-nature swaps can help conserve rainforest.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Countries get debt relief in exchange for conservation.' } },
  { id: 'coast-qc7', sectionId: 'physical-coastal', type: 'shortAnswer', question: 'What landform is left when an arch collapses?', correctAnswer: ['stack', 'stacks'], feedback: { correct: 'Correct.', incorrect: 'A stack is the isolated pillar left.' } },
  { id: 'coast-qc8', sectionId: 'physical-coastal', type: 'multipleChoice', question: 'What can groynes cause downdrift?', options: ['Deposition', 'Erosion', 'Nothing', 'Flooding'], correctAnswer: 'Erosion', feedback: { correct: 'Correct.', incorrect: 'Groynes trap sediment; downdrift loses supply and erodes.' } },
  { id: 'river-qc7', sectionId: 'physical-river', type: 'shortAnswer', question: 'What is a smaller river joining a larger one called?', correctAnswer: ['tributary', 'tributaries'], feedback: { correct: 'Correct.', incorrect: 'A tributary joins the main river.' } },
  { id: 'river-qc8', sectionId: 'physical-river', type: 'multipleChoice', question: 'Where do waterfalls typically form?', options: ['Lower course', 'Where hard rock overlies soft', 'At the mouth', 'In flood plains'], correctAnswer: 'Where hard rock overlies soft', feedback: { correct: 'Correct.', incorrect: 'Soft rock erodes faster, creating a drop.' } },
  { id: 'glac-qc6', sectionId: 'physical-glacial', type: 'multipleChoice', question: 'What indicates ice flow direction?', options: ['Corrie', 'Drumlin', 'Ribbon lake', 'Arête'], correctAnswer: 'Drumlin', feedback: { correct: 'Correct.', incorrect: 'Drumlins are streamlined in flow direction.' } },
  { id: 'urb-qc7', sectionId: 'human-urban', type: 'shortAnswer', question: 'What do we call reasons for leaving a place?', correctAnswer: ['push factors', 'push factor'], feedback: { correct: 'Correct.', incorrect: 'Push factors = reasons to leave.' } },
  { id: 'urb-qc8', sectionId: 'human-urban', type: 'trueFalse', question: 'Pull factors attract people to a place.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Pull factors = jobs, education, etc.' } },
  { id: 'econ-qc7', sectionId: 'human-economic', type: 'multipleChoice', question: 'What is bilateral aid?', options: ['Aid from NGOs', 'Aid from one country to another', 'Aid from UN only', 'Emergency aid only'], correctAnswer: 'Aid from one country to another', feedback: { correct: 'Correct.', incorrect: 'Bilateral = government to government.' } },
  { id: 'econ-qc8', sectionId: 'human-economic', type: 'shortAnswer', question: 'What do we call money sent home by migrants?', correctAnswer: ['remittance', 'remittances'], feedback: { correct: 'Correct.', incorrect: 'Remittances support families in home country.' } },
  { id: 'food-qc4', sectionId: 'human-food', type: 'trueFalse', question: 'Famines are always caused by absolute food shortage.', correctAnswer: 'false', feedback: { correct: 'Correct.', incorrect: 'Often distribution failure; food may exist elsewhere.' } },
  { id: 'water-qc4', sectionId: 'human-water', type: 'multipleChoice', question: 'What can cause conflict over water?', options: ['Only drought', 'Transboundary rivers', 'Only pollution', 'Only dams'], correctAnswer: 'Transboundary rivers', feedback: { correct: 'Correct.', incorrect: 'Rivers crossing borders (Nile, Colorado) can cause conflict.' } },
  { id: 'energy-qc5', sectionId: 'human-energy', type: 'shortAnswer', question: 'What provides base load electricity?', correctAnswer: ['nuclear', 'coal', 'gas', 'fossil'], feedback: { correct: 'Correct.', incorrect: 'Nuclear and fossil fuels provide constant base load.' } },
  { id: 'app-qc5', sectionId: 'app-fieldwork', type: 'multipleChoice', question: 'What is a transect?', options: ['Random sample', 'Line along which samples are taken', 'Map type', 'Graph'], correctAnswer: 'Line along which samples are taken', feedback: { correct: 'Correct.', incorrect: 'Transect = sampling along a line.' } },
  // Additional quick checks for 120+ target (Grade 9 coverage)
  { id: 'nh-qc12', sectionId: 'physical-natural-hazards', type: 'shortAnswer', question: 'What is magma called when it reaches the surface?', correctAnswer: ['lava'], feedback: { correct: 'Correct.', incorrect: 'Lava is molten rock on the surface.' } },
  { id: 'eco-qc7', sectionId: 'physical-ecosystems', type: 'multipleChoice', question: 'What is a habitat?', options: ['A food chain', 'Where an organism lives', 'A type of consumer', 'A decomposer'], correctAnswer: 'Where an organism lives', feedback: { correct: 'Correct.', incorrect: 'Habitat = place where an organism lives.' } },
  { id: 'rf-qc7', sectionId: 'physical-rainforests', type: 'trueFalse', question: 'Rainforests act as carbon sinks.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'They absorb and store huge amounts of CO2.' } },
  { id: 'coast-qc9', sectionId: 'physical-coastal', type: 'shortAnswer', question: 'What landform is formed when a cave erodes through a headland?', correctAnswer: ['arch'], feedback: { correct: 'Correct.', incorrect: 'An arch forms when two caves meet.' } },
  { id: 'river-qc9', sectionId: 'physical-river', type: 'multipleChoice', question: 'Where is river velocity fastest in a meander?', options: ['Inside of bend', 'Outside of bend', 'Centre', 'Bottom'], correctAnswer: 'Outside of bend', feedback: { correct: 'Correct.', incorrect: 'Fastest flow is on the outside; erosion there.' } },
  { id: 'glac-qc7', sectionId: 'physical-glacial', type: 'shortAnswer', question: 'What type of moraine forms at the end of a glacier?', correctAnswer: ['terminal', 'end moraine'], feedback: { correct: 'Correct.', incorrect: 'Terminal moraine marks the snout.' } },
  { id: 'urb-qc9', sectionId: 'human-urban', type: 'trueFalse', question: 'Urban regeneration can reduce deprivation.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'New jobs, housing and facilities can help.' } },
  { id: 'econ-qc9', sectionId: 'human-economic', type: 'multipleChoice', question: 'What is infrastructure?', options: ['Aid money', 'Basic physical structures like roads', 'A type of TNC', 'Trade agreement'], correctAnswer: 'Basic physical structures like roads', feedback: { correct: 'Correct.', incorrect: 'Roads, water, electricity, etc.' } },
  { id: 'food-qc5', sectionId: 'human-food', type: 'shortAnswer', question: 'What do we call farming mainly for own consumption?', correctAnswer: ['subsistence'], feedback: { correct: 'Correct.', incorrect: 'Subsistence farming.' } },
  { id: 'water-qc5', sectionId: 'human-water', type: 'multipleChoice', question: 'What is an aquifer?', options: ['A dam', 'Underground water-bearing rock', 'A river', 'A reservoir'], correctAnswer: 'Underground water-bearing rock', feedback: { correct: 'Correct.', incorrect: 'Aquifer = underground water storage.' } },
  { id: 'energy-qc6', sectionId: 'human-energy', type: 'trueFalse', question: 'Carbon neutral means net zero carbon emissions.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Emissions balanced by absorption or offset.' } },
  { id: 'app-qc6', sectionId: 'app-fieldwork', type: 'shortAnswer', question: 'What can sampling method introduce into data?', correctAnswer: ['bias'], feedback: { correct: 'Correct.', incorrect: 'Bias = systematic error.' } },
  // Implementation plan — additional quick checks toward 120+
  { id: 'nh-qc13', sectionId: 'physical-natural-hazards', type: 'trueFalse', question: 'Shield volcanoes form at constructive margins.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Shield volcanoes have runny lava at constructive margins.' } },
  { id: 'nh-qc14', sectionId: 'physical-natural-hazards', type: 'multipleChoice', question: 'What is a lahar?', options: ['Earthquake wave', 'Volcanic mudflow', 'Tsunami', 'Storm surge'], correctAnswer: 'Volcanic mudflow', feedback: { correct: 'Correct.', incorrect: 'Lahar = mudflow of volcanic ash and water.' } },
  { id: 'eco-qc8', sectionId: 'physical-ecosystems', type: 'shortAnswer', question: 'What do we call the position of an organism in a food chain?', correctAnswer: ['trophic level'], feedback: { correct: 'Correct.', incorrect: 'Trophic level = producer, consumer, etc.' } },
  { id: 'rf-qc8', sectionId: 'physical-rainforests', type: 'multipleChoice', question: 'Where do most rainforest nutrients cycle?', options: ['Soil only', 'Biomass (plants)', 'Water', 'Air'], correctAnswer: 'Biomass (plants)', feedback: { correct: 'Correct.', incorrect: 'Most nutrients are in the vegetation.' } },
  { id: 'ds-qc4', sectionId: 'physical-desert', type: 'trueFalse', question: 'Overgrazing can cause desertification.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Too many animals remove vegetation; soil erodes.' } },
  { id: 'coast-qc10', sectionId: 'physical-coastal', type: 'shortAnswer', question: 'What landform is exposed at low tide as a cliff retreats?', correctAnswer: ['wave-cut platform', 'wave cut platform'], feedback: { correct: 'Correct.', incorrect: 'Wave-cut platform.' } },
  { id: 'river-qc10', sectionId: 'physical-river', type: 'multipleChoice', question: 'What is a confluence?', options: ['River source', 'Where two rivers meet', 'River mouth', 'Flood plain'], correctAnswer: 'Where two rivers meet', feedback: { correct: 'Correct.', incorrect: 'Confluence = where tributary joins main river.' } },
  { id: 'glac-qc8', sectionId: 'physical-glacial', type: 'trueFalse', question: 'Outwash is sorted by meltwater; till is unsorted.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Meltwater sorts material; ice deposits till unsorted.' } },
  { id: 'urb-qc10', sectionId: 'human-urban', type: 'shortAnswer', question: 'What do we call land not previously built on?', correctAnswer: ['greenfield', 'greenfield site'], feedback: { correct: 'Correct.', incorrect: 'Greenfield site.' } },
  { id: 'econ-qc10', sectionId: 'human-economic', type: 'multipleChoice', question: 'What is a post-industrial economy?', options: ['Based on farming', 'Based on services', 'Based on mining', 'Based on fishing'], correctAnswer: 'Based on services', feedback: { correct: 'Correct.', incorrect: 'Post-industrial = services, not manufacturing.' } },
  { id: 'res-qc5', sectionId: 'human-resource-overview', type: 'trueFalse', question: 'The UK south-east has water surplus.', correctAnswer: 'false', feedback: { correct: 'Correct – it has deficit.', incorrect: 'South-east has water deficit; north has surplus.' } },
  { id: 'food-qc6', sectionId: 'human-food', type: 'shortAnswer', question: 'What do we call growing plants in nutrient solution?', correctAnswer: ['hydroponics'], feedback: { correct: 'Correct.', incorrect: 'Hydroponics.' } },
  { id: 'water-qc6', sectionId: 'human-water', type: 'multipleChoice', question: 'What can cause water conflict between countries?', options: ['Only drought', 'Transboundary rivers and dams', 'Only pollution', 'Only floods'], correctAnswer: 'Transboundary rivers and dams', feedback: { correct: 'Correct.', incorrect: 'Rivers crossing borders (Nile, Colorado) can cause conflict.' } },
  { id: 'energy-qc7', sectionId: 'human-energy', type: 'trueFalse', question: 'Carbon capture can reduce emissions from power stations.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'CCS captures CO2 for storage.' } },
  { id: 'app-qc7', sectionId: 'app-fieldwork', type: 'multipleChoice', question: 'What is stratified sampling?', options: ['Random selection', 'Proportional from different groups', 'Along a line', 'At regular intervals'], correctAnswer: 'Proportional from different groups', feedback: { correct: 'Correct.', incorrect: 'Stratified = sampling proportionally from groups.' } },
  // Content plan expansion — toward 120+ quick checks (Grade 9 coverage)
  { id: 'nh-qc15', sectionId: 'physical-natural-hazards', type: 'multipleChoice', question: 'What increases hazard risk?', options: ['Good emergency planning', 'High population in hazard zone', 'Strong infrastructure', 'Low vulnerability'], correctAnswer: 'High population in hazard zone', feedback: { correct: 'Correct.', incorrect: 'More people exposed = higher risk.' } },
  { id: 'eco-qc9', sectionId: 'physical-ecosystems', type: 'shortAnswer', question: 'What do we call the movement of carbon between atmosphere and living things?', correctAnswer: ['carbon cycle'], feedback: { correct: 'Correct.', incorrect: 'The carbon cycle.' } },
  { id: 'rf-qc9', sectionId: 'physical-rainforests', type: 'trueFalse', question: 'Sustainable development balances economic and environmental needs.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Sustainable development meets needs without compromising future.' } },
  { id: 'coast-qc11', sectionId: 'physical-coastal', type: 'multipleChoice', question: 'What is rock armour?', options: ['A type of cliff', 'Large boulders to absorb wave energy', 'A beach', 'A spit'], correctAnswer: 'Large boulders to absorb wave energy', feedback: { correct: 'Correct.', incorrect: 'Rock armour = large boulders for coastal defence.' } },
  { id: 'river-qc11', sectionId: 'physical-river', type: 'shortAnswer', question: 'What do we call the part of a hydrograph where discharge increases?', correctAnswer: ['rising limb'], feedback: { correct: 'Correct.', incorrect: 'Rising limb.' } },
  { id: 'glac-qc9', sectionId: 'physical-glacial', type: 'trueFalse', question: 'Bulldozing is a glacial deposition process.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Bulldozing pushes material in front of the ice.' } },
  { id: 'urb-qc11', sectionId: 'human-urban', type: 'shortAnswer', question: 'What do we call adding parks and trees to cities?', correctAnswer: ['urban greening'], feedback: { correct: 'Correct.', incorrect: 'Urban greening.' } },
  { id: 'econ-qc11', sectionId: 'human-economic', type: 'multipleChoice', question: 'What is intermediate technology?', options: ['Always high-tech', 'Technology suited to local conditions', 'Only solar power', 'Only in HICs'], correctAnswer: 'Technology suited to local conditions', feedback: { correct: 'Correct.', incorrect: 'Appropriate for local skills and resources.' } },
  { id: 'food-qc7', sectionId: 'human-food', type: 'trueFalse', question: 'Food insecurity means lack of reliable access to sufficient food.', correctAnswer: 'true', feedback: { correct: 'Correct.', incorrect: 'Food insecurity = unreliable access.' } },
  { id: 'energy-qc8', sectionId: 'human-energy', type: 'shortAnswer', question: 'What do we call using less energy for the same outcome?', correctAnswer: ['energy efficiency'], feedback: { correct: 'Correct.', incorrect: 'Energy efficiency.' } },
  { id: 'app-qc8', sectionId: 'app-fieldwork', type: 'multipleChoice', question: 'What does validity mean in geographical enquiry?', options: ['Speed of data collection', 'Whether the method measures what it claims', 'Sample size', 'Number of locations'], correctAnswer: 'Whether the method measures what it claims', feedback: { correct: 'Correct.', incorrect: 'Validity = measures what it claims to measure.' } },
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
  { id: 'sk-6', skillType: 'map', title: 'Direction and bearing', prompt: 'From grid reference 2345, what direction is 2567? Use compass directions or bearing (0–360°).', expected: 'East or bearing ~90°' },
  { id: 'sk-7', skillType: 'map', title: 'Scale and distance', prompt: 'Using a linear scale, measure the straight-line distance between two points. Convert to real distance.', expected: 'Measure with ruler; multiply by scale' },
  { id: 'sk-8', skillType: 'map', title: 'Relief and contour lines', prompt: 'Interpret contour lines on a map. What do close contours indicate? What do wide spacing indicate?', expected: 'Close = steep slope; wide = gentle slope' },
  { id: 'sk-9', skillType: 'map', title: 'Land use identification', prompt: 'Identify land use from map symbols: residential, industrial, commercial, agricultural.', expected: 'Use map key; describe distribution' },
  { id: 'sk-10', skillType: 'graph', title: 'Line graph – describe trend', prompt: 'Describe the trend in a line graph (e.g. population over time). Use: increase, decrease, fluctuate, steady.', expected: 'Identify overall pattern; quote data' },
  { id: 'sk-11', skillType: 'graph', title: 'Bar chart comparison', prompt: 'Compare two or more bars in a bar chart. What is the difference? Calculate if needed.', expected: 'Quote values; calculate difference/percentage' },
  { id: 'sk-12', skillType: 'graph', title: 'Scatter graph correlation', prompt: 'Describe the relationship in a scatter graph. Positive, negative, or no correlation?', expected: 'As X increases, Y increases/decreases/unchanged' },
  { id: 'sk-13', skillType: 'graph', title: 'Pie chart proportions', prompt: 'What proportion does each sector represent? Calculate percentage from angle if needed.', expected: 'Angle/360 × 100 = percentage' },
  { id: 'sk-14', skillType: 'graph', title: 'Hydrograph analysis', prompt: 'From a storm hydrograph: identify lag time, peak discharge, rising limb, falling limb.', expected: 'Lag = time from peak rainfall to peak discharge' },
  { id: 'sk-15', skillType: 'graph', title: 'Triangular graph (employment)', prompt: 'Plot or read from a triangular graph showing primary, secondary, tertiary employment.', expected: 'Each axis 0–100%; point shows mix' },
  { id: 'sk-16', skillType: 'numerical', title: 'Mean, median, mode', prompt: 'Calculate mean, median and mode for a dataset. When is each appropriate?', expected: 'Mean = total/n; median = middle; mode = most frequent' },
  { id: 'sk-17', skillType: 'numerical', title: 'Interquartile range', prompt: 'Find Q1, Q3 and IQR. What does IQR tell you about the data?', expected: 'IQR = Q3 - Q1; spread of middle 50%' },
  { id: 'sk-18', skillType: 'numerical', title: 'Density calculation', prompt: 'Calculate population density: population ÷ area. Units: people per km².', expected: 'e.g. 500,000 ÷ 100 = 5,000 per km²' },
  { id: 'sk-19', skillType: 'numerical', title: 'Ratio and proportion', prompt: 'Express one value as proportion of another. E.g. what % of total is X?', expected: 'X/total × 100' },
  { id: 'sk-20', skillType: 'statistical', title: 'Sample size and reliability', prompt: 'Why does a larger sample size improve reliability?', expected: 'Reduces effect of outliers; more representative' },
  { id: 'sk-21', skillType: 'statistical', title: 'Anomalies', prompt: 'Identify anomalies in data. How might you deal with them in analysis?', expected: 'Point that does not fit pattern; exclude or note' },
  { id: 'sk-22', skillType: 'statistical', title: 'Correlation vs causation', prompt: 'Two variables correlate. Does that mean one causes the other?', expected: 'No – correlation does not prove causation' },
  { id: 'sk-23', skillType: 'map', title: 'Cross-section drawing', prompt: 'Draw a cross-section between two points on a map. Show relief profile.', expected: 'Plot heights; join with smooth line' },
  { id: 'sk-24', skillType: 'graph', title: 'Describe distribution', prompt: 'Describe the spatial distribution of a feature from a map. Use: clustered, dispersed, linear, random.', expected: 'Pattern + location + example' },
  { id: 'sk-25', skillType: 'numerical', title: 'Rate of change', prompt: 'Calculate rate of change: change in value ÷ time. E.g. erosion rate m/year.', expected: 'e.g. 10m ÷ 5 years = 2 m/year' },
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
  {
    id: 'issue-4',
    title: 'Urban regeneration vs green space',
    resources: ['Map of proposed housing development on former industrial land', 'Data on housing need and green space provision', 'Stakeholder views (residents, developer, council, environmental group)'],
    questions: [
      { question: 'Outline one advantage of building on brownfield land.', markScheme: 'Reduces sprawl; uses existing infrastructure; cleans contaminated land.' },
      { question: 'Outline one disadvantage of losing green space.', markScheme: 'Recreation; wildlife; air quality; mental health.' },
      { question: 'Evaluate the proposal. Would you support it? Justify with reference to stakeholders.', markScheme: 'Balance housing need vs green space; consider who benefits/loses.' },
    ],
    sectionIds: ['human-urban', 'app-issue-evaluation'],
  },
  {
    id: 'issue-5',
    title: 'Rainforest conservation decision',
    resources: ['Map of rainforest area showing proposed logging zone', 'Data on biodiversity and carbon storage', 'Stakeholder views (government, logging company, indigenous group, NGO)'],
    questions: [
      { question: 'Outline one economic benefit of allowing logging.', markScheme: 'Jobs; revenue; timber for export.' },
      { question: 'Outline one environmental cost of deforestation.', markScheme: 'Biodiversity loss; climate change; soil erosion.' },
      { question: 'Evaluate the options. Which approach would you support? Justify your decision.', markScheme: 'Consider sustainable alternatives; balance economic and environmental.' },
    ],
    sectionIds: ['physical-rainforests', 'human-economic'],
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
  // Natural hazards – expanded
  { id: 'nh-ql3', sectionId: 'physical-natural-hazards', questionType: 'explain', question: 'Explain why the effects of earthquakes differ between HICs and LICs.', markSchemeSummary: 'Building quality, emergency response, planning, infrastructure, population density.' },
  { id: 'nh-ql4', sectionId: 'physical-natural-hazards', questionType: 'describe', question: 'Describe the formation of a tropical storm.', markSchemeSummary: 'Warm ocean 26°C+; low pressure; Coriolis effect; evaporation; condensation releases energy.' },
  { id: 'nh-ql5', sectionId: 'physical-natural-hazards', questionType: 'evaluate', question: 'Evaluate the effectiveness of mitigation and adaptation strategies for climate change.', markSchemeSummary: 'Mitigation: reduce cause. Adaptation: respond. Both needed; compare costs/benefits.' },
  { id: 'nh-ql6', sectionId: 'physical-natural-hazards', questionType: 'explain', question: 'Explain why people continue to live in areas at risk from tectonic hazards.', markSchemeSummary: 'Jobs, family, poverty, fertile soil, geothermal energy, lack of choice.' },
  // Ecosystems
  { id: 'eco-ql2', sectionId: 'physical-ecosystems', questionType: 'explain', question: 'Explain the importance of biodiversity in an ecosystem.', markSchemeSummary: 'Interdependence; resilience; human benefits (medicine, food); ecosystem services.' },
  { id: 'eco-ql3', sectionId: 'physical-ecosystems', questionType: 'describe', question: 'Describe the nutrient cycle in an ecosystem.', markSchemeSummary: 'Producers take nutrients; consumers eat; decomposers return to soil; cycle continues.' },
  // Rainforests
  { id: 'rf-ql2', sectionId: 'physical-rainforests', questionType: 'evaluate', question: 'Evaluate strategies for sustainable management of tropical rainforests.', markSchemeSummary: 'Selective logging, ecotourism, FSC, debt-for-nature. Compare effectiveness.' },
  { id: 'rf-ql3', sectionId: 'physical-rainforests', questionType: 'explain', question: 'Explain why deforestation contributes to climate change.', markSchemeSummary: 'Trees store carbon; burning releases CO2; less absorption; reduced evapotranspiration.' },
  // Desert
  { id: 'ds-ql2', sectionId: 'physical-desert', questionType: 'explain', question: 'Explain the opportunities for economic development in hot desert areas.', markSchemeSummary: 'Minerals, energy, irrigation farming, solar, tourism. Use case study.' },
  { id: 'ds-ql3', sectionId: 'physical-desert', questionType: 'explain', question: 'Explain the causes of desertification.', markSchemeSummary: 'Overgrazing, over-cultivation, climate change, removal of vegetation, population pressure.' },
  // Cold
  { id: 'cl-ql2', sectionId: 'physical-cold', questionType: 'evaluate', question: 'Evaluate the conflict between development and conservation in cold environments.', markSchemeSummary: 'Mining, tourism vs wilderness; use case study (Svalbard, Alaska).' },
  { id: 'cl-ql3', sectionId: 'physical-cold', questionType: 'explain', question: 'Explain why building in cold environments is challenging.', markSchemeSummary: 'Permafrost; extreme cold; inaccessibility; short construction season.' },
  // UK
  { id: 'uk-ql2', sectionId: 'physical-uk-overview', questionType: 'explain', question: 'Explain how geology influences UK relief.', markSchemeSummary: 'Hard rocks (igneous, metamorphic) in north/west; softer sedimentary in south/east.' },
  // Coastal
  { id: 'coast-ql2', sectionId: 'physical-coastal', questionType: 'describe', question: 'Describe the formation of a spit.', markSchemeSummary: 'Longshore drift; change in coastline direction; deposition; recurved end.' },
  { id: 'coast-ql3', sectionId: 'physical-coastal', questionType: 'evaluate', question: 'Evaluate hard engineering vs soft engineering for coastal management.', markSchemeSummary: 'Hard: effective but expensive, causes erosion elsewhere. Soft: sustainable but may need maintenance.' },
  { id: 'coast-ql4', sectionId: 'physical-coastal', questionType: 'caseStudy', question: 'Using the Holderness Coast, explain the causes and impacts of coastal erosion.', markSchemeSummary: 'Soft boulder clay; destructive waves; 1–2m/year; property loss; Mappleton defences.' },
  // River
  { id: 'river-ql2', sectionId: 'physical-river', questionType: 'describe', question: 'Describe the formation of a meander.', markSchemeSummary: 'Lateral erosion on outside; deposition on inside; thalweg; helicoidal flow.' },
  { id: 'river-ql3', sectionId: 'physical-river', questionType: 'caseStudy', question: 'Using the Somerset Levels, explain the causes and management of flooding.', markSchemeSummary: '2014: prolonged rain; low-lying; rivers not dredged. Management: dredging, flood relief channel.' },
  { id: 'river-ql4', sectionId: 'physical-river', questionType: 'explain', question: 'Explain how a hydrograph can be used to predict flood risk.', markSchemeSummary: 'Lag time; peak discharge; steep rising limb = flashy; urban areas have shorter lag.' },
  // Glacial
  { id: 'glac-ql2', sectionId: 'physical-glacial', questionType: 'describe', question: 'Describe the formation of a ribbon lake.', markSchemeSummary: 'Glacial erosion in trough; over-deepening; ice melts; water fills hollow.' },
  { id: 'glac-ql3', sectionId: 'physical-glacial', questionType: 'evaluate', question: 'Evaluate the conflicts between different land uses in glaciated uplands.', markSchemeSummary: 'Tourism vs farming vs conservation vs quarrying. Use Lake District.' },
  // Urban
  { id: 'urb-ql2', sectionId: 'human-urban', questionType: 'caseStudy', question: 'Using Bristol, explain how migration has changed a UK city.', markSchemeSummary: 'Polish, Somali migration; cultural diversity; regeneration; inequality.' },
  { id: 'urb-ql3', sectionId: 'human-urban', questionType: 'explain', question: 'Explain the push and pull factors causing rural-urban migration in LICs.', markSchemeSummary: 'Push: poverty, drought, unemployment. Pull: jobs, education, healthcare.' },
  { id: 'urb-ql4', sectionId: 'human-urban', questionType: 'evaluate', question: 'Evaluate the effectiveness of one strategy to reduce inequality in a city.', markSchemeSummary: 'Favela Bairro, regeneration, education. Advantages and disadvantages.' },
  { id: 'urb-ql5', sectionId: 'human-urban', questionType: 'explain', question: 'Explain the challenges of rapid urbanisation in LICs and NEEs.', markSchemeSummary: 'Slums, pollution, congestion, unemployment, strain on services.' },
  // Economic
  { id: 'econ-ql2', sectionId: 'human-economic', questionType: 'caseStudy', question: 'Using Nigeria, explain how industrial development can reduce the development gap.', markSchemeSummary: 'Oil, TNCs, Lagos industry; jobs, investment; but uneven, environmental cost.' },
  { id: 'econ-ql3', sectionId: 'human-economic', questionType: 'evaluate', question: 'Evaluate the effectiveness of aid in reducing the development gap.', markSchemeSummary: 'Types of aid; advantages (infrastructure, relief); disadvantages (debt, dependency).' },
  { id: 'econ-ql4', sectionId: 'human-economic', questionType: 'explain', question: 'Explain why HDI might be a better measure of development than GNI alone.', markSchemeSummary: 'HDI includes life expectancy, education; GNI is just income; HDI more comprehensive.' },
  // Resource
  { id: 'res-ql2', sectionId: 'human-resource-overview', questionType: 'explain', question: 'Explain why the UK has a mixed pattern of water surplus and deficit.', markSchemeSummary: 'Rainfall higher north/west; population higher south-east; demand vs supply.' },
  // Food
  { id: 'food-ql2', sectionId: 'human-food', questionType: 'evaluate', question: 'Evaluate the advantages and disadvantages of genetically modified (GM) crops.', markSchemeSummary: 'Advantages: yield, drought resistance. Disadvantages: ethics, biodiversity, corporate control.' },
  { id: 'food-ql3', sectionId: 'human-food', questionType: 'explain', question: 'Explain why famine can occur when food is available.', markSchemeSummary: 'Distribution; poverty; conflict; infrastructure; access not supply.' },
  // Water
  { id: 'water-ql2', sectionId: 'human-water', questionType: 'evaluate', question: 'Evaluate large-scale water transfer schemes.', markSchemeSummary: 'Advantages: supply to deficit. Disadvantages: cost, environmental impact, political.' },
  { id: 'water-ql3', sectionId: 'human-water', questionType: 'explain', question: 'Explain the causes of water insecurity.', markSchemeSummary: 'Climate, geology, pollution, over-abstraction, population growth, conflict.' },
  // Energy
  { id: 'energy-ql2', sectionId: 'human-energy', questionType: 'explain', question: 'Explain why the UK energy mix is changing.', markSchemeSummary: 'Declining fossil fuels; climate targets; renewables growing; nuclear debate.' },
  { id: 'energy-ql3', sectionId: 'human-energy', questionType: 'caseStudy', question: 'Using a UK example, explain how renewable energy can contribute to energy security.', markSchemeSummary: 'Offshore wind; location; advantages; intermittency challenge.' },
  // Issue evaluation
  { id: 'app-ql1', sectionId: 'app-issue-evaluation', questionType: 'evaluate', question: 'For a given issue, evaluate the options and justify your decision.', markSchemeSummary: 'Consider stakeholders; social, economic, environmental; balanced conclusion.' },
  // Fieldwork
  { id: 'app-ql2', sectionId: 'app-fieldwork', questionType: 'explain', question: 'Explain how you would improve the reliability of a fieldwork method.', markSchemeSummary: 'Larger sample; repeat; consistent method; control variables.' },
  { id: 'app-ql3', sectionId: 'app-fieldwork', questionType: 'describe', question: 'Describe an appropriate way to present fieldwork data.', markSchemeSummary: 'Match data type to method: map for location; graph for trend; etc.' },
  // Additional question lab for 50+ target
  { id: 'nh-ql7', sectionId: 'physical-natural-hazards', questionType: 'describe', question: 'Describe the structure of the Earth.', markSchemeSummary: 'Crust, mantle, core; lithosphere; convection currents.' },
  { id: 'eco-ql4', sectionId: 'physical-ecosystems', questionType: 'describe', question: 'Describe a small-scale ecosystem you have studied.', markSchemeSummary: 'Pond or hedgerow; producers, consumers, decomposers; abiotic factors.' },
  { id: 'coast-ql5', sectionId: 'physical-coastal', questionType: 'explain', question: 'Explain how geology affects coastal erosion rates.', markSchemeSummary: 'Hard rock resists; soft rock erodes faster; joints and bedding.' },
  { id: 'river-ql5', sectionId: 'physical-river', questionType: 'describe', question: 'Describe the characteristics of the upper course of a river.', markSchemeSummary: 'Steep gradient; V-shaped valley; erosion dominant; waterfalls.' },
  { id: 'econ-ql5', sectionId: 'human-economic', questionType: 'explain', question: 'Explain the physical and historical causes of uneven development.', markSchemeSummary: 'Physical: climate, resources, location. Historical: colonialism, conflict.' },
  { id: 'res-ql3', sectionId: 'human-resource-overview', questionType: 'evaluate', question: 'Evaluate the UK\'s approach to resource management.', markSchemeSummary: 'Imports; efficiency; renewables; sustainability.' },
];

export function getQuestionLabForSections(sectionIds: GeographySectionId[]): GeographyQuestionLabItem[] {
  const set = new Set(sectionIds);
  return GEOGRAPHY_QUESTION_LAB.filter((q) => set.has(q.sectionId));
}

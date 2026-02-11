/**
 * Business Hub – AQA GCSE Business 8132
 * Units 3.1–3.6, concepts, glossary, quick checks, case studies, calculations, evaluation.
 */

import type {
  BusinessUnit,
  BusinessConcept,
  BusinessTerm,
  BusinessQuickCheck,
  BusinessCaseStudy,
  CalculationTask,
  EvaluationPrompt,
  BusinessUnitId,
  BusinessPaper,
} from '../types/businessHub';

// ============================================================================
// UNITS & TOPICS
// ============================================================================

export const BUSINESS_UNITS: BusinessUnit[] = [
  {
    id: '3.1',
    title: 'Business in the real world',
    shortTitle: 'Business in the real world',
    paper1: true,
    paper2: true,
    topics: [
      { id: '3.1.1', unitId: '3.1', title: 'Purpose and nature of businesses', specRef: '3.1.1' },
      { id: '3.1.2', unitId: '3.1', title: 'Business ownership', specRef: '3.1.2' },
      { id: '3.1.3', unitId: '3.1', title: 'Setting business aims and objectives', specRef: '3.1.3' },
      { id: '3.1.4', unitId: '3.1', title: 'Stakeholders', specRef: '3.1.4' },
      { id: '3.1.5', unitId: '3.1', title: 'Business location', specRef: '3.1.5' },
      { id: '3.1.6', unitId: '3.1', title: 'Business planning', specRef: '3.1.6' },
      { id: '3.1.7', unitId: '3.1', title: 'Expanding a business', specRef: '3.1.7' },
    ],
  },
  {
    id: '3.2',
    title: 'Influences on business',
    shortTitle: 'Influences on business',
    paper1: true,
    paper2: true,
    topics: [
      { id: '3.2.1', unitId: '3.2', title: 'Technology', specRef: '3.2.1' },
      { id: '3.2.2', unitId: '3.2', title: 'Ethical and environmental considerations', specRef: '3.2.2' },
      { id: '3.2.3', unitId: '3.2', title: 'The economic climate', specRef: '3.2.3' },
      { id: '3.2.4', unitId: '3.2', title: 'Globalisation', specRef: '3.2.4' },
      { id: '3.2.5', unitId: '3.2', title: 'Legislation', specRef: '3.2.5' },
      { id: '3.2.6', unitId: '3.2', title: 'Competitive environment', specRef: '3.2.6' },
    ],
  },
  {
    id: '3.3',
    title: 'Business operations',
    shortTitle: 'Business operations',
    paper1: true,
    paper2: false,
    topics: [
      { id: '3.3.1', unitId: '3.3', title: 'Production processes', specRef: '3.3.1' },
      { id: '3.3.2', unitId: '3.3', title: 'The role of procurement', specRef: '3.3.2' },
      { id: '3.3.3', unitId: '3.3', title: 'The concept of quality', specRef: '3.3.3' },
      { id: '3.3.4', unitId: '3.3', title: 'Good customer service', specRef: '3.3.4' },
    ],
  },
  {
    id: '3.4',
    title: 'Human resources',
    shortTitle: 'Human resources',
    paper1: true,
    paper2: false,
    topics: [
      { id: '3.4.1', unitId: '3.4', title: 'Organisational structures', specRef: '3.4.1' },
      { id: '3.4.2', unitId: '3.4', title: 'Recruitment and selection', specRef: '3.4.2' },
      { id: '3.4.3', unitId: '3.4', title: 'Motivating employees', specRef: '3.4.3' },
      { id: '3.4.4', unitId: '3.4', title: 'Training', specRef: '3.4.4' },
    ],
  },
  {
    id: '3.5',
    title: 'Marketing',
    shortTitle: 'Marketing',
    paper1: false,
    paper2: true,
    topics: [
      { id: '3.5.1', unitId: '3.5', title: 'Identifying and understanding customers', specRef: '3.5.1' },
      { id: '3.5.2', unitId: '3.5', title: 'Segmentation', specRef: '3.5.2' },
      { id: '3.5.3', unitId: '3.5', title: 'Market research', specRef: '3.5.3' },
      { id: '3.5.4', unitId: '3.5', title: 'The marketing mix (4Ps)', specRef: '3.5.4' },
    ],
  },
  {
    id: '3.6',
    title: 'Finance',
    shortTitle: 'Finance',
    paper1: false,
    paper2: true,
    topics: [
      { id: '3.6.1', unitId: '3.6', title: 'Sources of finance', specRef: '3.6.1' },
      { id: '3.6.2', unitId: '3.6', title: 'Cash flow', specRef: '3.6.2' },
      { id: '3.6.3', unitId: '3.6', title: 'Financial terms and calculations', specRef: '3.6.3' },
      { id: '3.6.4', unitId: '3.6', title: 'Analysing financial performance', specRef: '3.6.4' },
    ],
  },
];

// ============================================================================
// CONCEPTS (core ideas, misconceptions, change scenarios)
// ============================================================================

export const BUSINESS_CONCEPTS: BusinessConcept[] = [
  // 3.1.1
  {
    id: 'c-3.1.1-purpose',
    unitId: '3.1',
    topicId: '3.1.1',
    title: 'Purpose of business and factors of production',
    coreIdea: 'Businesses exist to produce goods or supply services. They combine factors of production: land, labour, capital and enterprise. Opportunity cost is the next best alternative given up when a choice is made.',
    visualModel: { type: 'list', description: 'Factors: Land (natural resources), Labour (workers), Capital (machinery, money), Enterprise (risk-taking and ideas).' },
    commonMisconception: 'Thinking "capital" only means money – it includes machinery, equipment and buildings too.',
    changeScenarios: [
      { prompt: 'What happens if the cost of labour rises?', explanation: 'Business may substitute capital (automation) for labour, or pass costs to customers; profit may fall.' },
    ],
  },
  {
    id: 'c-3.1.1-sectors',
    unitId: '3.1',
    topicId: '3.1.1',
    title: 'Primary, secondary and tertiary sectors',
    coreIdea: 'Primary sector extracts raw materials; secondary processes them into goods; tertiary provides services. Many economies shift from primary toward tertiary over time.',
    commonMisconception: 'Confusing "secondary" with "second in importance" – it means manufacturing/processing.',
    changeScenarios: [
      { prompt: 'A farmer opens a farm shop selling their own produce. Which sectors are involved?', explanation: 'Primary (growing), secondary (minimal processing e.g. packing), tertiary (retail service).' },
    ],
  },
  // 3.1.2
  {
    id: 'c-3.1.2-ownership',
    unitId: '3.1',
    topicId: '3.1.2',
    title: 'Legal structures and limited liability',
    coreIdea: 'Sole traders and partnerships have unlimited liability – owners risk personal assets. Private and public limited companies have limited liability – shareholders only lose what they invested.',
    visualModel: { type: 'flow', description: 'Sole trader → Partnership → Ltd → PLC: increasing size, finance options and regulation; liability reduces at Ltd/PLC.' },
    commonMisconception: 'Thinking "limited company" means the business is limited in what it can do – it refers to limited liability only.',
    changeScenarios: [
      { prompt: 'Why might a successful sole trader become a Ltd?', explanation: 'To limit personal risk, access more finance (e.g. selling shares), and appear more professional.' },
    ],
  },
  // 3.1.3
  {
    id: 'c-3.1.3-objectives',
    unitId: '3.1',
    topicId: '3.1.3',
    title: 'Business aims and objectives',
    coreIdea: 'Objectives include survival, profit maximisation, growth, market share, customer satisfaction, social/ethical goals and shareholder value. They differ by business size, type and stage; they change as the business evolves.',
    commonMisconception: 'Assuming every business aims mainly for profit – start-ups often prioritise survival; not-for-profits prioritise social aims.',
    changeScenarios: [
      { prompt: 'How might objectives differ between a new start-up and a large plc?', explanation: 'Start-up: survival, growth. Plc: shareholder value, market dominance, possibly ethical/environmental reputation.' },
    ],
  },
  // 3.1.4
  {
    id: 'c-3.1.4-stakeholders',
    unitId: '3.1',
    topicId: '3.1.4',
    title: 'Stakeholders and their objectives',
    coreIdea: 'Stakeholders are groups with an interest in the business: owners, employees, customers, local community, suppliers. Each has different objectives; business decisions can create conflict (e.g. profit vs wages vs prices).',
    visualModel: { type: 'diagram', description: 'Business at centre; owners (profit), employees (pay), customers (value), community (environment, jobs), suppliers (payment, orders).' },
    commonMisconception: 'Thinking "stakeholder" means only shareholders – it means anyone affected by or affecting the business.',
    changeScenarios: [
      { prompt: 'A business relocates to cut costs. Which stakeholders gain and which lose?', explanation: 'Owners may gain (lower costs). Employees may lose (redundancy or longer commute). Community may lose jobs; new location community may gain.' },
    ],
  },
  // 3.1.5
  {
    id: 'c-3.1.5-location',
    unitId: '3.1',
    topicId: '3.1.5',
    title: 'Factors influencing business location',
    coreIdea: 'Location is influenced by proximity to market, availability of raw materials, labour supply, competition and costs (rent, wages, transport). Different businesses weight these differently.',
    commonMisconception: 'Assuming the cheapest location is always best – access to skilled labour or customers may matter more.',
    changeScenarios: [
      { prompt: 'Why might a tech start-up choose a city over a cheap rural site?', explanation: 'Access to skilled labour, customers, transport and networking; cost may be less important than talent and market.' },
    ],
  },
  // 3.1.6
  {
    id: 'c-3.1.6-planning',
    unitId: '3.1',
    topicId: '3.1.6',
    title: 'Business planning and basic financial terms',
    coreIdea: 'Business plans help set objectives, secure finance and organise functions. Key terms: revenue (total income), fixed costs (don’t vary with output), variable costs (vary with output), total costs, profit or loss.',
    commonMisconception: 'Confusing revenue with profit – revenue is total sales; profit is revenue minus costs.',
    changeScenarios: [
      { prompt: 'If a café’s rent rises, what happens to fixed costs and break-even?', explanation: 'Fixed costs increase; break-even output rises (more units must be sold to cover the higher fixed cost).' },
    ],
  },
  // 3.1.7
  {
    id: 'c-3.1.7-expansion',
    unitId: '3.1',
    topicId: '3.1.7',
    title: 'Expansion and economies of scale',
    coreIdea: 'Businesses can grow organically (new stores, e-commerce, franchising) or by merger/takeover. Growth can bring economies of scale (lower unit costs) but also diseconomies (poor communication, coordination, motivation).',
    commonMisconception: 'Assuming bigger always means lower costs – diseconomies of scale can make unit costs rise in very large firms.',
    changeScenarios: [
      { prompt: 'How might average unit cost change as output increases from 100 to 10,000 units?', explanation: 'Often falls (economies of scale) then may rise again if diseconomies set in (e.g. coordination, morale).' },
    ],
  },
  // 3.2
  {
    id: 'c-3.2.1-tech',
    unitId: '3.2',
    topicId: '3.2.1',
    title: 'Technology and e-commerce',
    coreIdea: 'E-commerce lets businesses reach wider markets; digital communication changes how firms interact with stakeholders. Technology can reduce costs and improve speed and reach.',
    commonMisconception: 'Thinking e-commerce only benefits large businesses – small firms can access global markets too.',
    changeScenarios: [
      { prompt: 'How might a small retailer use digital communication to compete with larger rivals?', explanation: 'Social media, email, online chat for customer service; faster response and personalised contact.' },
    ],
  },
  {
    id: 'c-3.2.2-ethics',
    unitId: '3.2',
    topicId: '3.2.2',
    title: 'Ethical and environmental considerations',
    coreIdea: 'Businesses face trade-offs between ethics/sustainability and profit. Ethical behaviour is fair and honest; environmental responsibility includes waste, pollution and resource use. There can be costs and benefits to acting responsibly.',
    commonMisconception: 'Assuming ethical behaviour always reduces profit – it can attract customers and staff and reduce risk.',
    changeScenarios: [
      { prompt: 'Why might a business choose to use more expensive sustainable materials?', explanation: 'To meet customer demand, improve reputation, comply with future regulation, or align with owner values.' },
    ],
  },
  {
    id: 'c-3.2.3-economic',
    unitId: '3.2',
    topicId: '3.2.3',
    title: 'Economic climate: interest rates and employment',
    coreIdea: 'Interest rates affect the cost of borrowing (overdrafts, loans) and consumer spending. Employment levels affect demand for products and services. When incomes rise, demand for many goods increases.',
    commonMisconception: 'Thinking low interest rates only help borrowers – they can also reduce savers’ income and affect exchange rates.',
    changeScenarios: [
      { prompt: 'Interest rates rise. How might a business with a large bank loan be affected?', explanation: 'Interest payments increase; profit may fall; may cut investment or pass costs to customers.' },
    ],
  },
  {
    id: 'c-3.2.4-globalisation',
    unitId: '3.2',
    topicId: '3.2.4',
    title: 'Globalisation and exchange rates',
    coreIdea: 'Globalisation means UK businesses compete internationally. Design, quality and price matter. Exchange rates affect businesses that import or export: a stronger pound makes UK exports dearer abroad and imports cheaper; a weaker pound has the opposite effect. No exchange rate calculations are required.',
    commonMisconception: 'Thinking a weaker pound always hurts UK businesses – exporters may benefit from cheaper prices abroad.',
    changeScenarios: [
      { prompt: 'A UK business imports materials from abroad. The pound strengthens against the euro. How might it be affected?', explanation: 'Imports become cheaper in pounds; cost of materials falls; profit may improve.' },
    ],
  },
  {
    id: 'c-3.2.5-legislation',
    unitId: '3.2',
    topicId: '3.2.5',
    title: 'Legislation and business',
    coreIdea: 'Laws affect how businesses operate. Employment law: National Minimum Wage, living wage, Equality Act 2010 (fair treatment). Health and Safety at Work Act (HASAWA) 1974: safe working environment. Consumer law: trade descriptions, product safety. Businesses must comply or face fines, tribunal, reputational damage.',
    commonMisconception: 'Thinking legislation only adds costs – compliance can reduce risk, improve reputation and attract staff.',
    changeScenarios: [
      { prompt: 'A business must increase wages to meet the National Minimum Wage. What might it do?', explanation: 'Raise prices, cut other costs, reduce staff hours, improve productivity to cover the increase.' },
    ],
  },
  {
    id: 'c-3.2.6-competition',
    unitId: '3.2',
    topicId: '3.2.6',
    title: 'Competitive environment and risk',
    coreIdea: 'In competitive markets, businesses must fight for customers. All businesses face uncertainty and risk; entrepreneurs take risks in hope of reward. Firms can try to minimise risk through planning and diversification.',
    commonMisconception: 'Assuming no competition means no risk – monopolies can face regulatory or demand risks.',
    changeScenarios: [
      { prompt: 'A new competitor enters the market. What might an existing business do?', explanation: 'Lower prices, improve quality, advertise more, differentiate product, improve customer service.' },
    ],
  },
  // 3.3
  {
    id: 'c-3.3.1-production',
    unitId: '3.3',
    topicId: '3.3.1',
    title: 'Job and flow production',
    coreIdea: 'Job production makes one-off or custom items; flow production makes large volumes of identical items. Lean production and JIT reduce waste and hold less stock.',
    commonMisconception: 'Thinking JIT means no stock at all – it means minimal stock, with reliable, frequent deliveries.',
    changeScenarios: [
      { prompt: 'When is flow production more appropriate than job production?', explanation: 'When demand is high and standardised (e.g. mass-market goods); when unit costs need to be low.' },
    ],
  },
  {
    id: 'c-3.3.2-procurement',
    unitId: '3.3',
    topicId: '3.3.2',
    title: 'Procurement and stock management',
    coreIdea: 'Procurement is buying supplies. JIT (Just in time) means materials arrive only when needed; JIC (Just in case) holds buffer stock. Businesses choose suppliers based on price, quality and reliability. Supply chain management improves efficiency and unit costs.',
    commonMisconception: 'Thinking JIT is always better – JIC can be safer if deliveries are unreliable or demand is unpredictable.',
    changeScenarios: [
      { prompt: 'When might a business prefer JIC over JIT?', explanation: 'When suppliers are unreliable, lead times are long, or demand is unpredictable; buffer stock reduces risk of production stopping.' },
    ],
  },
  {
    id: 'c-3.3.3-quality',
    unitId: '3.3',
    topicId: '3.3.3',
    title: 'Quality and TQM',
    coreIdea: 'Quality meets customer expectations. TQM (Total Quality Management) involves everyone in improving quality. Poor quality leads to lost sales, reputation damage and possibly recalls.',
    commonMisconception: 'Thinking quality is only about the product – service quality matters too.',
    changeScenarios: [
      { prompt: 'What are the costs and benefits of maintaining high quality?', explanation: 'Costs: inspection, training, better materials. Benefits: higher price, loyalty, reputation, fewer returns.' },
    ],
  },
  {
    id: 'c-3.3.4-customer-service',
    unitId: '3.3',
    topicId: '3.3.4',
    title: 'Customer service',
    coreIdea: 'Good customer service includes product knowledge, customer engagement and post-sales support (training, helplines, servicing). Benefits: satisfaction, loyalty, higher spend, profit. Poor service leads to lost customers and damage to reputation. ICT (websites, e-commerce, social media) supports customer service.',
    commonMisconception: 'Thinking customer service ends at the sale – post-sales support builds loyalty and repeat business.',
    changeScenarios: [
      { prompt: 'How might poor customer service affect a business?', explanation: 'Lost sales, negative reviews, damage to reputation, customers switching to competitors.' },
    ],
  },
  // 3.4
  {
    id: 'c-3.4.1-structure',
    unitId: '3.4',
    topicId: '3.4.1',
    title: 'Organisational structures',
    coreIdea: 'Structure shows chain of command, span of control and delegation. Tall structures have many layers; flat have fewer. Centralisation means decisions at the top; decentralisation spreads decision-making.',
    commonMisconception: 'Assuming flat structure is always better – it can mean managers are overloaded (wide span of control).',
    changeScenarios: [
      { prompt: 'What might happen if a business delayers (removes management layers)?', explanation: 'Faster communication, lower costs; but managers may have wider span of control and less time per employee.' },
    ],
  },
  {
    id: 'c-3.4.2-recruitment',
    unitId: '3.4',
    topicId: '3.4.2',
    title: 'Recruitment and selection',
    coreIdea: 'Recruitment can be internal (existing staff) or external (new staff). Process includes job analysis, job description, person specification and selection methods. Effective recruitment improves productivity and retention.',
    commonMisconception: 'Thinking internal recruitment is always cheaper – it can leave gaps and limit new ideas.',
    changeScenarios: [
      { prompt: 'When might external recruitment be better than internal?', explanation: 'When new skills or fresh ideas are needed; when no suitable internal candidate exists.' },
    ],
  },
  {
    id: 'c-3.4.3-motivation',
    unitId: '3.4',
    topicId: '3.4.3',
    title: 'Motivating employees',
    coreIdea: 'A motivated workforce is more productive and less likely to leave. Financial methods: salary, wage, commission, profit sharing. Non-financial: management style, training, responsibility, fringe benefits. Different workers respond to different incentives.',
    commonMisconception: 'Assuming pay is the only motivator – recognition, development and working conditions matter too.',
    changeScenarios: [
      { prompt: 'How might a business motivate staff without raising pay?', explanation: 'Training, promotion opportunities, flexible working, praise, team-building, better working conditions.' },
    ],
  },
  {
    id: 'c-3.4.4-training',
    unitId: '3.4',
    topicId: '3.4.4',
    title: 'Training',
    coreIdea: 'Training improves skills and productivity. Types: induction (new starters), on-the-job (learning while doing), off-the-job (external courses). Induction helps new staff settle. On-the-job is cheaper; off-the-job can bring new ideas but takes staff away.',
    commonMisconception: 'Thinking training is a cost to cut – it can improve quality, reduce errors and increase retention.',
    changeScenarios: [
      { prompt: 'When might off-the-job training be better than on-the-job?', explanation: 'When new skills or qualifications are needed that existing staff cannot teach; when a fresh perspective is valuable.' },
    ],
  },
  // 3.5
  {
    id: 'c-3.5.1-customers',
    unitId: '3.5',
    topicId: '3.5.1',
    title: 'Identifying and understanding customers',
    coreIdea: 'Businesses must identify and satisfy customer needs. Understanding customers helps: choose the right product, increase sales, get the marketing mix right, avoid costly mistakes, stay competitive.',
    commonMisconception: 'Assuming the business knows what customers want without researching – needs change and vary.',
    changeScenarios: [
      { prompt: 'Why might a business lose sales if it does not understand its customers?', explanation: 'Wrong product, wrong price, wrong promotion or place; customers go to competitors who meet their needs better.' },
    ],
  },
  {
    id: 'c-3.5.2-segmentation',
    unitId: '3.5',
    topicId: '3.5.2',
    title: 'Market segmentation',
    coreIdea: 'Segmentation divides the market into groups (e.g. by gender, age, location, income). Businesses target each segment with tailored products and marketing. Helps focus resources and meet needs more precisely.',
    commonMisconception: 'Thinking all customers are the same – different segments have different needs and spending power.',
    changeScenarios: [
      { prompt: 'A business sells luxury skincare. How might it segment its market?', explanation: 'By age (anti-ageing for older), income (premium for high earners), gender (different products).' },
    ],
  },
  {
    id: 'c-3.5.3-market-research',
    unitId: '3.5',
    topicId: '3.5.3',
    title: 'Market research',
    coreIdea: 'Market research finds out about customers and competitors. Primary: questionnaires, surveys, interviews, focus groups (first-hand). Secondary: internet, printed press (existing data). Qualitative = opinions; quantitative = numbers. Use findings to inform decisions.',
    commonMisconception: 'Thinking primary research is always better – secondary can be cheaper and faster; choice depends on budget and need.',
    changeScenarios: [
      { prompt: 'When might a business use secondary rather than primary research?', explanation: 'When time or budget is limited; when general market data is enough; when validating primary findings.' },
    ],
  },
  {
    id: 'c-3.5.4-mix',
    unitId: '3.5',
    topicId: '3.5.4',
    title: 'The marketing mix (4Ps)',
    coreIdea: 'Price, Product, Promotion and Place work together. Pricing methods include skimming, penetration, competitive, cost-plus. Product life cycle: development, introduction, growth, maturity, decline; extension strategies can prolong life.',
    visualModel: { type: 'flow', description: 'Product life cycle: R&D → Introduction → Growth → Maturity → Decline; extension strategies (new market, new features) can extend maturity.' },
    commonMisconception: 'Thinking the 4Ps are independent – changing price affects perceived product quality; place affects who sees promotion.',
    changeScenarios: [
      { prompt: 'A product enters the decline stage. What could the business do?', explanation: 'Extension strategies: new target market, update packaging, add features, reduce price, promote differently.' },
    ],
  },
  // 3.6
  {
    id: 'c-3.6.1-sources',
    unitId: '3.6',
    topicId: '3.6.1',
    title: 'Sources of finance',
    coreIdea: 'Internal: retained profit, selling assets. External: loans, overdraft, share issue, trade credit, hire purchase, grants, family/friends. Suitability depends on size, purpose and risk.',
    commonMisconception: 'Thinking overdraft is the same as a loan – overdraft is flexible, short-term; loan is for a fixed amount and term.',
    changeScenarios: [
      { prompt: 'Why might a new start-up use a bank loan rather than selling shares?', explanation: 'To keep ownership and control; may be easier than finding investors; no dividend obligation.' },
    ],
  },
  {
    id: 'c-3.6.2-cashflow',
    unitId: '3.6',
    topicId: '3.6.2',
    title: 'Cash flow and profit',
    coreIdea: 'Cash flow is the movement of money in and out. Profit is revenue minus costs. A business can be profitable but run out of cash if inflows are delayed or outflows are early. Cash flow forecasts help plan and avoid problems.',
    commonMisconception: 'Confusing cash flow with profit – a firm can make a profit but have negative cash flow (e.g. lots of credit sales not yet paid).',
    changeScenarios: [
      { prompt: 'What could a business do to improve cash flow?', explanation: 'Chase debtors, delay paying creditors, reduce stock, arrange overdraft, delay non-essential spending.' },
    ],
  },
  {
    id: 'c-3.6.3-breakeven',
    unitId: '3.6',
    topicId: '3.6.3',
    title: 'Break-even and financial calculations',
    coreIdea: 'Break-even is the output where total revenue equals total cost; no profit or loss. Margin of safety is how much output exceeds break-even. From a break-even chart you can identify break-even output and margin of safety. ARR (average rate of return) evaluates investment projects. Break-even has value for planning but assumptions (fixed costs, selling all output) may not hold.',
    commonMisconception: 'Thinking break-even means the business is safe – it only covers costs; any fall in sales below break-even creates a loss.',
    changeScenarios: [
      { prompt: 'What are the limitations of break-even analysis?', explanation: 'Assumes all output is sold; fixed and variable costs may change; ignores non-financial factors; single product/services mix may vary.' },
    ],
  },
  {
    id: 'c-3.6.4-performance',
    unitId: '3.6',
    topicId: '3.6.4',
    title: 'Financial performance and profit margins',
    coreIdea: 'Income statement shows revenue, costs and profit. Statement of financial position (balance sheet) shows assets and liabilities at a point in time. Gross and net profit margins help compare performance over time or with competitors.',
    commonMisconception: 'Thinking a higher profit always means a healthier business – margins and trends matter too.',
    changeScenarios: [
      { prompt: 'Gross profit margin falls but net profit margin stays the same. What might explain this?', explanation: 'Operating expenses might have been cut (e.g. lower admin or distribution costs offsetting lower gross margin).' },
    ],
  },
];

// ============================================================================
// GLOSSARY (terms for flashcard mode)
// ============================================================================

export const BUSINESS_TERMS: BusinessTerm[] = [
  { id: 't-opportunity-cost', unitId: '3.1', topicId: '3.1.1', term: 'Opportunity cost', definition: 'The next best alternative given up when a choice is made.', inContext: 'The opportunity cost of spending on advertising is the other uses of that money (e.g. new equipment).' },
  { id: 't-factors-production', unitId: '3.1', topicId: '3.1.1', term: 'Factors of production', definition: 'The resources used in production: land, labour, capital and enterprise.' },
  { id: 't-entrepreneur', unitId: '3.1', topicId: '3.1.1', term: 'Entrepreneur', definition: 'Someone who takes the risk of starting and running a business, combining factors of production.' },
  { id: 't-sole-trader', unitId: '3.1', topicId: '3.1.2', term: 'Sole trader', definition: 'A business owned and run by one person; unlimited liability.' },
  { id: 't-partnership', unitId: '3.1', topicId: '3.1.2', term: 'Partnership', definition: 'A business owned by two or more partners; usually unlimited liability.' },
  { id: 't-limited-liability', unitId: '3.1', topicId: '3.1.2', term: 'Limited liability', definition: 'Shareholders only lose the amount they invested if the company fails; personal assets are protected.' },
  { id: 't-stakeholder', unitId: '3.1', topicId: '3.1.4', term: 'Stakeholder', definition: 'Any person or group with an interest in or affected by a business (e.g. owners, employees, customers, community, suppliers).' },
  { id: 't-fixed-cost', unitId: '3.1', topicId: '3.1.6', term: 'Fixed cost', definition: 'Costs that do not change with output (e.g. rent, salaries).' },
  { id: 't-variable-cost', unitId: '3.1', topicId: '3.1.6', term: 'Variable cost', definition: 'Costs that vary directly with output (e.g. raw materials).' },
  { id: 't-revenue', unitId: '3.1', topicId: '3.1.6', term: 'Revenue', definition: 'Total income from sales (price × quantity sold).' },
  { id: 't-economies-of-scale', unitId: '3.1', topicId: '3.1.7', term: 'Economies of scale', definition: 'Reductions in average unit cost as output increases (e.g. bulk buying, spreading fixed costs).' },
  { id: 't-diseconomies-of-scale', unitId: '3.1', topicId: '3.1.7', term: 'Diseconomies of scale', definition: 'Increases in average unit cost as a firm grows too large (e.g. communication problems, coordination).' },
  { id: 't-ecommerce', unitId: '3.2', topicId: '3.2.1', term: 'E-commerce', definition: 'Buying and selling online; can give access to wider markets.' },
  { id: 't-ethical-behaviour', unitId: '3.2', topicId: '3.2.2', term: 'Ethical behaviour', definition: 'Acting in ways stakeholders consider fair and honest.' },
  { id: 't-globalisation', unitId: '3.2', topicId: '3.2.4', term: 'Globalisation', definition: 'The trend of businesses operating and competing across national borders.' },
  { id: 't-jit', unitId: '3.3', topicId: '3.3.2', term: 'Just in time (JIT)', definition: 'Stock management where materials arrive only when needed for production; reduces holding costs.' },
  { id: 't-tqm', unitId: '3.3', topicId: '3.3.3', term: 'Total Quality Management (TQM)', definition: 'Approach where everyone in the business is responsible for quality and continuous improvement.' },
  { id: 't-span-of-control', unitId: '3.4', topicId: '3.4.1', term: 'Span of control', definition: 'The number of subordinates a manager is responsible for.' },
  { id: 't-chain-of-command', unitId: '3.4', topicId: '3.4.1', term: 'Chain of command', definition: 'The line of authority from top to bottom in an organisation.' },
  { id: 't-delegation', unitId: '3.4', topicId: '3.4.1', term: 'Delegation', definition: 'Passing authority and responsibility down to subordinates.' },
  { id: 't-segmentation', unitId: '3.5', topicId: '3.5.2', term: 'Market segmentation', definition: 'Dividing the market into groups (e.g. by age, gender, location, income) to target more effectively.' },
  { id: 't-usp', unitId: '3.5', topicId: '3.5.4', term: 'Unique Selling Point (USP)', definition: 'A feature that makes a product or business different from and more attractive than competitors.' },
  { id: 't-product-life-cycle', unitId: '3.5', topicId: '3.5.4', term: 'Product life cycle', definition: 'Stages a product passes through: development, introduction, growth, maturity, decline.' },
  { id: 't-retained-profit', unitId: '3.6', topicId: '3.6.1', term: 'Retained profit', definition: 'Profit kept in the business after tax and dividends; internal source of finance.' },
  { id: 't-cash-flow', unitId: '3.6', topicId: '3.6.2', term: 'Cash flow', definition: 'The movement of money into and out of a business over a period of time.' },
  { id: 't-break-even', unitId: '3.6', topicId: '3.6.3', term: 'Break-even', definition: 'The level of output where total revenue equals total costs; no profit or loss.' },
  { id: 't-margin-of-safety', unitId: '3.6', topicId: '3.6.3', term: 'Margin of safety', definition: 'The amount by which current output exceeds break-even output.' },
  { id: 't-gross-profit-margin', unitId: '3.6', topicId: '3.6.4', term: 'Gross profit margin', definition: 'Gross profit as a percentage of revenue; (gross profit ÷ revenue) × 100.' },
  { id: 't-net-profit-margin', unitId: '3.6', topicId: '3.6.4', term: 'Net profit margin', definition: 'Net profit as a percentage of revenue; (net profit ÷ revenue) × 100.' },
  // 3.1 additional
  { id: 't-plc', unitId: '3.1', topicId: '3.1.2', term: 'Public limited company (plc)', definition: 'A company whose shares can be bought and sold on the stock exchange; limited liability.' },
  { id: 't-not-for-profit', unitId: '3.1', topicId: '3.1.2', term: 'Not-for-profit organisation', definition: 'A business whose main aim is something other than profit (e.g. charity, social enterprise).' },
  { id: 't-merger', unitId: '3.1', topicId: '3.1.7', term: 'Merger', definition: 'When two businesses combine to form one new company.' },
  { id: 't-takeover', unitId: '3.1', topicId: '3.1.7', term: 'Takeover', definition: 'When one business buys control of another.' },
  { id: 't-franchise', unitId: '3.1', topicId: '3.1.7', term: 'Franchise', definition: 'When a business (franchisee) pays to use the brand and system of another (franchisor).' },
  { id: 't-organic-growth', unitId: '3.1', topicId: '3.1.7', term: 'Organic growth', definition: 'Growth from within the business (e.g. new stores, e-commerce) rather than buying another business.' },
  { id: 't-outsourcing', unitId: '3.1', topicId: '3.1.7', term: 'Outsourcing', definition: 'Using another business to carry out tasks or provide services.' },
  { id: 't-total-cost', unitId: '3.1', topicId: '3.1.6', term: 'Total cost', definition: 'Fixed costs plus variable costs.' },
  { id: 't-profit', unitId: '3.1', topicId: '3.1.6', term: 'Profit', definition: 'Revenue minus total costs; the surplus when revenue exceeds costs.' },
  { id: 't-loss', unitId: '3.1', topicId: '3.1.6', term: 'Loss', definition: 'When total costs exceed revenue; negative profit.' },
  // 3.2 additional
  { id: 't-interest-rate', unitId: '3.2', topicId: '3.2.3', term: 'Interest rate', definition: 'The cost of borrowing money or the return on savings; set by the Bank of England.' },
  { id: 't-exchange-rate', unitId: '3.2', topicId: '3.2.4', term: 'Exchange rate', definition: 'The value of one currency in terms of another; affects import/export costs and profits.' },
  { id: 't-sustainability', unitId: '3.2', topicId: '3.2.2', term: 'Sustainability', definition: 'Meeting needs without damaging the environment or depleting resources for future generations.' },
  { id: 't-nmw', unitId: '3.2', topicId: '3.2.5', term: 'National Minimum Wage (NMW)', definition: 'The minimum hourly rate employers must pay workers by law.' },
  { id: 't-equality-act', unitId: '3.2', topicId: '3.2.5', term: 'Equality Act 2010', definition: 'Law protecting people from discrimination at work (e.g. age, gender, disability).' },
  { id: 't-hasawa', unitId: '3.2', topicId: '3.2.5', term: 'Health and Safety at Work Act (HASAWA) 1974', definition: 'Law requiring employers to provide a safe working environment.' },
  // 3.3 additional
  { id: 't-job-production', unitId: '3.3', topicId: '3.3.1', term: 'Job production', definition: 'Making one-off or custom items, often to order.' },
  { id: 't-flow-production', unitId: '3.3', topicId: '3.3.1', term: 'Flow production', definition: 'Making large numbers of identical products on a production line.' },
  { id: 't-lean-production', unitId: '3.3', topicId: '3.3.1', term: 'Lean production', definition: 'Producing with minimal waste; reducing stock and inefficiency.' },
  { id: 't-jic', unitId: '3.3', topicId: '3.3.2', term: 'Just in case (JIC)', definition: 'Holding buffer stock to avoid running out if demand or supply is uncertain.' },
  { id: 't-buffer-stock', unitId: '3.3', topicId: '3.3.2', term: 'Buffer stock', definition: 'Extra stock held as a safety margin in case of unexpected demand or supply delays.' },
  { id: 't-procurement', unitId: '3.3', topicId: '3.3.2', term: 'Procurement', definition: 'The process of buying supplies and materials for the business.' },
  { id: 't-supply-chain', unitId: '3.3', topicId: '3.3.2', term: 'Supply chain', definition: 'All the businesses and activities involved in getting a product from raw materials to the customer.' },
  // 3.4 additional
  { id: 't-job-description', unitId: '3.4', topicId: '3.4.2', term: 'Job description', definition: 'Document outlining the duties and responsibilities of a role.' },
  { id: 't-person-specification', unitId: '3.4', topicId: '3.4.2', term: 'Person specification', definition: 'Document outlining the skills, qualifications and experience needed for a role.' },
  { id: 't-internal-recruitment', unitId: '3.4', topicId: '3.4.2', term: 'Internal recruitment', definition: 'Filling a vacancy from existing staff within the business.' },
  { id: 't-external-recruitment', unitId: '3.4', topicId: '3.4.2', term: 'External recruitment', definition: 'Filling a vacancy by hiring someone from outside the business.' },
  { id: 't-induction', unitId: '3.4', topicId: '3.4.4', term: 'Induction', definition: 'Training given to new employees when they start.' },
  { id: 't-delayering', unitId: '3.4', topicId: '3.4.1', term: 'Delayering', definition: 'Removing levels of management from the organisational structure.' },
  { id: 't-commission', unitId: '3.4', topicId: '3.4.3', term: 'Commission', definition: 'Pay based on sales or performance; a percentage of what is sold.' },
  { id: 't-profit-sharing', unitId: '3.4', topicId: '3.4.3', term: 'Profit sharing', definition: 'When employees receive a share of the business profits as a bonus.' },
  // 3.5 additional
  { id: 't-primary-research', unitId: '3.5', topicId: '3.5.3', term: 'Primary research', definition: 'First-hand data collected by the business (e.g. surveys, questionnaires, interviews).' },
  { id: 't-secondary-research', unitId: '3.5', topicId: '3.5.3', term: 'Secondary research', definition: 'Existing data from other sources (e.g. internet, government, trade bodies).' },
  { id: 't-qualitative', unitId: '3.5', topicId: '3.5.3', term: 'Qualitative data', definition: 'Data about opinions, attitudes and feelings; not usually numerical.' },
  { id: 't-quantitative', unitId: '3.5', topicId: '3.5.3', term: 'Quantitative data', definition: 'Numerical data that can be analysed statistically.' },
  { id: 't-skimming', unitId: '3.5', topicId: '3.5.4', term: 'Price skimming', definition: 'Setting a high initial price to maximise profit from early adopters.' },
  { id: 't-penetration-pricing', unitId: '3.5', topicId: '3.5.4', term: 'Penetration pricing', definition: 'Setting a low initial price to gain market share quickly.' },
  { id: 't-cost-plus', unitId: '3.5', topicId: '3.5.4', term: 'Cost-plus pricing', definition: 'Adding a percentage to the cost of production to set the selling price.' },
  { id: 't-loss-leader', unitId: '3.5', topicId: '3.5.4', term: 'Loss leader', definition: 'Product sold at a loss to attract customers who may buy other items.' },
  { id: 't-extension-strategy', unitId: '3.5', topicId: '3.5.4', term: 'Extension strategy', definition: 'Actions to prolong the life of a product in maturity or decline (e.g. new market, new features).' },
  { id: 't-boston-matrix', unitId: '3.5', topicId: '3.5.4', term: 'Boston Matrix', definition: 'Model classifying products as stars, cash cows, question marks or dogs by market share and growth.' },
  // 3.6 additional
  { id: 't-overdraft', unitId: '3.6', topicId: '3.6.1', term: 'Overdraft', definition: 'Borrowing from a bank by spending more than the balance; flexible, short-term.' },
  { id: 't-trade-credit', unitId: '3.6', topicId: '3.6.1', term: 'Trade credit', definition: 'Buying and paying later; suppliers allow a period (e.g. 30 days) before payment.' },
  { id: 't-hire-purchase', unitId: '3.6', topicId: '3.6.1', term: 'Hire purchase', definition: 'Paying for an asset in instalments; ownership passes when payment is complete.' },
  { id: 't-arr', unitId: '3.6', topicId: '3.6.3', term: 'Average rate of return (ARR)', definition: 'Average annual profit as a percentage of initial investment; used to compare projects.' },
  { id: 't-income-statement', unitId: '3.6', topicId: '3.6.4', term: 'Income statement', definition: 'Financial statement showing revenue, costs and profit over a period.' },
  { id: 't-statement-of-financial-position', unitId: '3.6', topicId: '3.6.4', term: 'Statement of financial position', definition: 'Balance sheet; shows assets and liabilities at a point in time.' },
  { id: 't-assets', unitId: '3.6', topicId: '3.6.4', term: 'Assets', definition: 'What the business owns (e.g. premises, equipment, stock, cash).' },
  { id: 't-liabilities', unitId: '3.6', topicId: '3.6.4', term: 'Liabilities', definition: 'What the business owes (e.g. loans, creditors).' },
];

// ============================================================================
// QUICK CHECKS
// ============================================================================

export const BUSINESS_QUICK_CHECKS: BusinessQuickCheck[] = [
  { id: 'q-3.1.1-a', unitId: '3.1', topicId: '3.1.1', type: 'multipleChoice', question: 'What is opportunity cost?', options: ['The cost of borrowing money', 'The next best alternative given up when a choice is made', 'The total cost of production', 'The price of a product'], correctAnswer: 'The next best alternative given up when a choice is made', feedback: { correct: 'Correct. Opportunity cost is the value of the next best option you give up.', incorrect: 'Opportunity cost is the next best alternative given up when making a choice.', ideaReference: '3.1.1 Purpose and nature of businesses' }, relatedTermIds: ['t-opportunity-cost'] },
  { id: 'q-3.1.1-b', unitId: '3.1', topicId: '3.1.1', type: 'trueFalse', question: 'The tertiary sector provides services to customers.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Yes. Tertiary sector = services.', incorrect: 'The tertiary sector is the service sector.', ideaReference: '3.1.1 Sectors' } },
  { id: 'q-3.1.2-a', unitId: '3.1', topicId: '3.1.2', type: 'multipleChoice', question: 'Which type of business has limited liability?', options: ['Sole trader', 'Partnership', 'Private limited company (Ltd)', 'None of these'], correctAnswer: 'Private limited company (Ltd)', feedback: { correct: 'Correct. Ltd and PLC have limited liability.', incorrect: 'Sole traders and partnerships have unlimited liability; Ltd and PLC have limited liability.', ideaReference: '3.1.2 Business ownership' }, relatedTermIds: ['t-limited-liability'] },
  { id: 'q-3.1.4-a', unitId: '3.1', topicId: '3.1.4', type: 'multipleChoice', question: 'Which group is an example of a stakeholder?', options: ['Only shareholders', 'Only customers', 'Employees, customers and suppliers', 'Only the owner'], correctAnswer: 'Employees, customers and suppliers', feedback: { correct: 'Stakeholders include owners, employees, customers, community and suppliers.', incorrect: 'Stakeholders are all groups with an interest in the business.', ideaReference: '3.1.4 Stakeholders' }, relatedTermIds: ['t-stakeholder'] },
  { id: 'q-3.1.6-a', unitId: '3.1', topicId: '3.1.6', type: 'multipleChoice', question: 'Which cost changes directly with output?', options: ['Rent', 'Fixed cost', 'Variable cost', 'Salary'], correctAnswer: 'Variable cost', feedback: { correct: 'Variable costs (e.g. materials) vary with output.', incorrect: 'Variable costs vary with output; fixed costs (rent, salaries) do not.', ideaReference: '3.1.6 Business planning' }, relatedTermIds: ['t-variable-cost'] },
  { id: 'q-3.1.7-a', unitId: '3.1', topicId: '3.1.7', type: 'multipleChoice', question: 'What are economies of scale?', options: ['Costs that increase as output rises', 'Reductions in average unit cost as output increases', 'The cost of borrowing', 'The cost of raw materials'], correctAnswer: 'Reductions in average unit cost as output increases', feedback: { correct: 'Economies of scale lower unit cost as the business grows.', incorrect: 'Economies of scale mean lower average cost per unit as output increases.', ideaReference: '3.1.7 Expanding a business' }, relatedTermIds: ['t-economies-of-scale'] },
  { id: 'q-3.2.1-a', unitId: '3.2', topicId: '3.2.1', type: 'trueFalse', question: 'E-commerce can help a business access wider markets.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Yes. Selling online can reach national and international customers.', incorrect: 'E-commerce allows businesses to sell to customers beyond their local area.', ideaReference: '3.2.1 Technology' }, relatedTermIds: ['t-ecommerce'] },
  { id: 'q-3.2.2-a', unitId: '3.2', topicId: '3.2.2', type: 'multipleChoice', question: 'What is meant by ethical behaviour in business?', options: ['Maximising profit at all costs', 'Acting in ways that stakeholders consider fair and honest', 'Following the law only', 'Competing aggressively'], correctAnswer: 'Acting in ways that stakeholders consider fair and honest', feedback: { correct: 'Ethical behaviour is about fairness and honesty.', incorrect: 'Ethics go beyond the law; they are about what is considered fair and honest.', ideaReference: '3.2.2 Ethical and environmental' }, relatedTermIds: ['t-ethical-behaviour'] },
  { id: 'q-3.3.1-a', unitId: '3.3', topicId: '3.3.1', type: 'multipleChoice', question: 'When is flow production most appropriate?', options: ['One-off custom orders', 'Low demand', 'High volume of identical products', 'Uncertain demand'], correctAnswer: 'High volume of identical products', feedback: { correct: 'Flow production is for large volumes of standardised goods.', incorrect: 'Flow production suits high, steady demand for identical items.', ideaReference: '3.3.1 Production processes' } },
  { id: 'q-3.3.2-a', unitId: '3.3', topicId: '3.3.2', type: 'multipleChoice', question: 'What does JIT stand for in stock management?', options: ['Just in time', 'Just in case', 'Job in progress', 'Joint inventory transfer'], correctAnswer: 'Just in time', feedback: { correct: 'JIT = materials arrive only when needed.', incorrect: 'JIT (Just in time) means minimal stock; materials delivered when needed.', ideaReference: '3.3.2 Procurement' }, relatedTermIds: ['t-jit'] },
  { id: 'q-3.4.1-a', unitId: '3.4', topicId: '3.4.1', type: 'multipleChoice', question: 'What is the span of control?', options: ['The number of levels in the organisation', 'The number of subordinates a manager is responsible for', 'The length of the chain of command', 'The number of departments'], correctAnswer: 'The number of subordinates a manager is responsible for', feedback: { correct: 'Span of control = how many people report to one manager.', incorrect: 'Span of control is the number of subordinates one manager supervises.', ideaReference: '3.4.1 Organisational structures' }, relatedTermIds: ['t-span-of-control'] },
  { id: 'q-3.5.4-a', unitId: '3.5', topicId: '3.5.4', type: 'multipleChoice', question: 'What is a USP?', options: ['Universal Sales Price', 'Unique Selling Point', 'Unit Sales Projection', 'Uniform Service Policy'], correctAnswer: 'Unique Selling Point', feedback: { correct: 'USP = what makes the product or business different from competitors.', incorrect: 'USP stands for Unique Selling Point – a distinguishing feature.', ideaReference: '3.5.4 Marketing mix' }, relatedTermIds: ['t-usp'] },
  { id: 'q-3.6.1-a', unitId: '3.6', topicId: '3.6.1', type: 'multipleChoice', question: 'Which is an internal source of finance?', options: ['Bank loan', 'Retained profit', 'Overdraft', 'Share issue'], correctAnswer: 'Retained profit', feedback: { correct: 'Retained profit is profit kept in the business; internal.', incorrect: 'Internal sources include retained profit and selling assets; loans and shares are external.', ideaReference: '3.6.1 Sources of finance' }, relatedTermIds: ['t-retained-profit'] },
  { id: 'q-3.6.2-a', unitId: '3.6', topicId: '3.6.2', type: 'trueFalse', question: 'A business can be profitable but have negative cash flow.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Yes. Profit is revenue minus costs; cash flow is timing of money in and out.', incorrect: 'Profit and cash flow are different; e.g. credit sales increase profit but cash arrives later.', ideaReference: '3.6.2 Cash flow' }, relatedTermIds: ['t-cash-flow'] },
  { id: 'q-3.6.4-a', unitId: '3.6', topicId: '3.6.4', type: 'multipleChoice', question: 'What does the gross profit margin show?', options: ['Net profit as % of revenue', 'Gross profit as % of revenue', 'Revenue as % of costs', 'Costs as % of revenue'], correctAnswer: 'Gross profit as % of revenue', feedback: { correct: 'Gross profit margin = (gross profit ÷ revenue) × 100.', incorrect: 'Gross profit margin is gross profit expressed as a percentage of revenue.', ideaReference: '3.6.4 Financial performance' }, relatedTermIds: ['t-gross-profit-margin'] },
  // 3.1.3, 3.1.5 and additional coverage
  { id: 'q-3.1.3-a', unitId: '3.1', topicId: '3.1.3', type: 'multipleChoice', question: 'Which aim might a new start-up prioritise?', options: ['Market dominance', 'Survival', 'Shareholder value', 'International expansion'], correctAnswer: 'Survival', feedback: { correct: 'New businesses often focus on survival first.', incorrect: 'Start-ups typically prioritise survival; other aims come later.', ideaReference: '3.1.3 Aims and objectives' } },
  { id: 'q-3.1.3-b', unitId: '3.1', topicId: '3.1.3', type: 'trueFalse', question: 'Not-for-profit organisations aim mainly to maximise profit.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Not-for-profits focus on social or charitable aims.', incorrect: 'Not-for-profits put social aims before profit.', ideaReference: '3.1.3 Aims and objectives' } },
  { id: 'q-3.1.5-a', unitId: '3.1', topicId: '3.1.5', type: 'multipleChoice', question: 'Which factor might influence where a business locates?', options: ['Proximity to market only', 'Proximity to market, labour, costs', 'Only costs', 'None of these'], correctAnswer: 'Proximity to market, labour, costs', feedback: { correct: 'Location is influenced by market, labour, materials, competition and costs.', incorrect: 'Several factors affect location: market, labour, materials, competition, costs.', ideaReference: '3.1.5 Business location' } },
  { id: 'q-3.1.5-b', unitId: '3.1', topicId: '3.1.5', type: 'trueFalse', question: 'The cheapest location is always the best choice for a business.', options: ['True', 'False'], correctAnswer: 'False', feedback: { correct: 'Access to customers, labour or materials may matter more.', incorrect: 'Other factors like market access can outweigh cost.', ideaReference: '3.1.5 Business location' } },
  // 3.2 additional
  { id: 'q-3.2.3-a', unitId: '3.2', topicId: '3.2.3', type: 'multipleChoice', question: 'How do interest rates affect a business with a bank loan?', options: ['No effect', 'Higher rates increase the cost of borrowing', 'Lower rates always reduce profit', 'Rates only affect exporters'], correctAnswer: 'Higher rates increase the cost of borrowing', feedback: { correct: 'Interest payments rise when rates rise.', incorrect: 'Higher interest rates mean higher loan repayments.', ideaReference: '3.2.3 Economic climate' } },
  { id: 'q-3.2.4-a', unitId: '3.2', topicId: '3.2.4', type: 'multipleChoice', question: 'What does globalisation mean for UK businesses?', options: ['Only competing locally', 'Competing internationally', 'No competition', 'Only trading in the UK'], correctAnswer: 'Competing internationally', feedback: { correct: 'Globalisation means UK firms compete with businesses worldwide.', incorrect: 'Globalisation involves international competition.', ideaReference: '3.2.4 Globalisation' }, relatedTermIds: ['t-globalisation'] },
  { id: 'q-3.2.5-a', unitId: '3.2', topicId: '3.2.5', type: 'multipleChoice', question: 'What does the Equality Act 2010 protect against?', options: ['Only health and safety', 'Discrimination at work', 'Only consumer rights', 'Environmental damage'], correctAnswer: 'Discrimination at work', feedback: { correct: 'The Equality Act protects against discrimination (e.g. age, gender, disability).', incorrect: 'The Equality Act covers discrimination in employment.', ideaReference: '3.2.5 Legislation' }, relatedTermIds: ['t-equality-act'] },
  { id: 'q-3.2.6-a', unitId: '3.2', topicId: '3.2.6', type: 'multipleChoice', question: 'Which describes a competitive market?', options: ['One seller dominates', 'Businesses compete for customers', 'No risk for businesses', 'Government controls prices'], correctAnswer: 'Businesses compete for customers', feedback: { correct: 'In competitive markets, many businesses fight for customers.', incorrect: 'Competition means businesses compete for the same customers.', ideaReference: '3.2.6 Competitive environment' } },
  // 3.3 additional
  { id: 'q-3.3.3-a', unitId: '3.3', topicId: '3.3.3', type: 'multipleChoice', question: 'What does TQM stand for?', options: ['Total Quality Management', 'Total Quantity Management', 'Time Quality Method', 'Technical Quality Measure'], correctAnswer: 'Total Quality Management', feedback: { correct: 'TQM involves everyone in improving quality.', incorrect: 'TQM = Total Quality Management.', ideaReference: '3.3.3 Quality' }, relatedTermIds: ['t-tqm'] },
  { id: 'q-3.3.4-a', unitId: '3.3', topicId: '3.3.4', type: 'multipleChoice', question: 'Which is an example of good customer service?', options: ['Ignoring complaints', 'Product knowledge and helpful staff', 'Slow response times', 'No after-sales support'], correctAnswer: 'Product knowledge and helpful staff', feedback: { correct: 'Good service includes product knowledge, engagement and post-sales support.', incorrect: 'Good customer service involves knowledge, engagement and support.', ideaReference: '3.3.4 Customer service' } },
  { id: 'q-3.3.1-b', unitId: '3.3', topicId: '3.3.1', type: 'trueFalse', question: 'Job production is used for one-off or custom items.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Job production suits one-off or custom orders.', incorrect: 'Job production makes one-off or bespoke items.', ideaReference: '3.3.1 Production processes' } },
  { id: 'q-3.3.2-b', unitId: '3.3', topicId: '3.3.2', type: 'multipleChoice', question: 'What is buffer stock?', options: ['Stock that is sold', 'Extra stock held as a safety margin', 'Stock that is wasted', 'Stock for JIT only'], correctAnswer: 'Extra stock held as a safety margin', feedback: { correct: 'Buffer stock is held in case of unexpected demand or supply delays.', incorrect: 'Buffer stock is a safety margin to avoid running out.', ideaReference: '3.3.2 Procurement' }, relatedTermIds: ['t-buffer-stock'] },
  // 3.4 additional
  { id: 'q-3.4.2-a', unitId: '3.4', topicId: '3.4.2', type: 'multipleChoice', question: 'What is a job description?', options: ['A list of staff names', 'Duties and responsibilities of a role', 'A salary list', 'A training record'], correctAnswer: 'Duties and responsibilities of a role', feedback: { correct: 'Job description outlines what the role involves.', incorrect: 'Job description describes the duties of the role.', ideaReference: '3.4.2 Recruitment' }, relatedTermIds: ['t-job-description'] },
  { id: 'q-3.4.3-a', unitId: '3.4', topicId: '3.4.3', type: 'multipleChoice', question: 'Which is a financial method of motivation?', options: ['Training only', 'Commission', 'Flexible hours only', 'Praise only'], correctAnswer: 'Commission', feedback: { correct: 'Commission is pay based on sales; a financial motivator.', incorrect: 'Financial motivators include salary, wage, commission, profit sharing.', ideaReference: '3.4.3 Motivation' }, relatedTermIds: ['t-commission'] },
  { id: 'q-3.4.4-a', unitId: '3.4', topicId: '3.4.4', type: 'multipleChoice', question: 'What is induction training?', options: ['Training for managers only', 'Training given when a new employee starts', 'Training for external staff only', 'Training for leaving staff'], correctAnswer: 'Training given when a new employee starts', feedback: { correct: 'Induction helps new staff settle and learn the basics.', incorrect: 'Induction is the initial training for new starters.', ideaReference: '3.4.4 Training' }, relatedTermIds: ['t-induction'] },
  // 3.5 additional
  { id: 'q-3.5.1-a', unitId: '3.5', topicId: '3.5.1', type: 'multipleChoice', question: 'Why is identifying customer needs important?', options: ['To ignore them', 'To choose the right product and increase sales', 'To reduce marketing', 'To cut costs only'], correctAnswer: 'To choose the right product and increase sales', feedback: { correct: 'Understanding customers helps get the product and marketing mix right.', incorrect: 'Identifying needs helps meet them and increase sales.', ideaReference: '3.5.1 Identifying customers' } },
  { id: 'q-3.5.2-a', unitId: '3.5', topicId: '3.5.2', type: 'multipleChoice', question: 'How might a business segment its market?', options: ['By colour only', 'By age, gender, location, income', 'By product size only', 'By profit alone'], correctAnswer: 'By age, gender, location, income', feedback: { correct: 'Segmentation uses demographic factors like age, gender, location, income.', incorrect: 'Market segmentation divides by age, gender, location, income.', ideaReference: '3.5.2 Segmentation' }, relatedTermIds: ['t-segmentation'] },
  { id: 'q-3.5.3-a', unitId: '3.5', topicId: '3.5.3', type: 'multipleChoice', question: 'What is primary research?', options: ['Data from the internet', 'First-hand data collected by the business', 'Government statistics only', 'Competitor data only'], correctAnswer: 'First-hand data collected by the business', feedback: { correct: 'Primary research is data the business collects itself.', incorrect: 'Primary research is first-hand (surveys, interviews, etc.).', ideaReference: '3.5.3 Market research' }, relatedTermIds: ['t-primary-research'] },
  { id: 'q-3.5.4-b', unitId: '3.5', topicId: '3.5.4', type: 'multipleChoice', question: 'What is penetration pricing?', options: ['High initial price', 'Low initial price to gain market share', 'Price matching competitors', 'Price set by cost only'], correctAnswer: 'Low initial price to gain market share', feedback: { correct: 'Penetration pricing uses low price to attract customers quickly.', incorrect: 'Penetration pricing starts low to gain market share.', ideaReference: '3.5.4 Marketing mix' }, relatedTermIds: ['t-penetration-pricing'] },
  // 3.6 additional
  { id: 'q-3.6.3-a', unitId: '3.6', topicId: '3.6.3', type: 'multipleChoice', question: 'What is the break-even level of output?', options: ['Maximum output', 'Output where total revenue equals total cost', 'Output where profit is highest', 'Minimum output'], correctAnswer: 'Output where total revenue equals total cost', feedback: { correct: 'At break-even, revenue = total cost; no profit or loss.', incorrect: 'Break-even is where total revenue equals total cost.', ideaReference: '3.6.3 Financial terms' }, relatedTermIds: ['t-break-even'] },
  { id: 'q-3.6.3-b', unitId: '3.6', topicId: '3.6.3', type: 'multipleChoice', question: 'What is the margin of safety?', options: ['The amount by which output exceeds break-even', 'The break-even output', 'Total revenue', 'Total cost'], correctAnswer: 'The amount by which output exceeds break-even', feedback: { correct: 'Margin of safety = current output minus break-even output.', incorrect: 'Margin of safety is how much output exceeds break-even.', ideaReference: '3.6.3 Financial terms' }, relatedTermIds: ['t-margin-of-safety'] },
  // Extra coverage for depth
  { id: 'q-3.1.1-c', unitId: '3.1', topicId: '3.1.1', type: 'multipleChoice', question: 'Which is a factor of production?', options: ['Profit', 'Capital', 'Revenue', 'Cost'], correctAnswer: 'Capital', feedback: { correct: 'Factors are land, labour, capital, enterprise.', incorrect: 'Capital is one of the four factors of production.', ideaReference: '3.1.1 Purpose and nature' }, relatedTermIds: ['t-factors-production'] },
  { id: 'q-3.1.2-b', unitId: '3.1', topicId: '3.1.2', type: 'trueFalse', question: 'A plc can sell shares on the stock exchange.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Yes. PLC shares are traded publicly.', incorrect: 'PLC shares can be bought and sold on the stock exchange.', ideaReference: '3.1.2 Business ownership' }, relatedTermIds: ['t-plc'] },
  { id: 'q-3.1.6-b', unitId: '3.1', topicId: '3.1.6', type: 'multipleChoice', question: 'Profit = revenue minus ...?', options: ['Sales', 'Total costs', 'Price', 'Output'], correctAnswer: 'Total costs', feedback: { correct: 'Profit = revenue − total costs.', incorrect: 'Profit is revenue minus total costs.', ideaReference: '3.1.6 Business planning' }, relatedTermIds: ['t-profit'] },
  { id: 'q-3.1.7-b', unitId: '3.1', topicId: '3.1.7', type: 'multipleChoice', question: 'What is a merger?', options: ['One business buying another', 'Two businesses combining into one', 'Opening a new store', 'Selling online'], correctAnswer: 'Two businesses combining into one', feedback: { correct: 'A merger is when two businesses combine.', incorrect: 'Merger = two businesses becoming one.', ideaReference: '3.1.7 Expanding a business' }, relatedTermIds: ['t-merger'] },
  { id: 'q-3.4.1-b', unitId: '3.4', topicId: '3.4.1', type: 'multipleChoice', question: 'What is the chain of command?', options: ['The line of authority from top to bottom', 'The number of subordinates', 'The number of departments', 'The payroll system'], correctAnswer: 'The line of authority from top to bottom', feedback: { correct: 'Chain of command shows who reports to whom.', incorrect: 'Chain of command is the line of authority.', ideaReference: '3.4.1 Organisational structures' }, relatedTermIds: ['t-chain-of-command'] },
  { id: 'q-3.6.1-b', unitId: '3.6', topicId: '3.6.1', type: 'multipleChoice', question: 'Which is an external source of finance?', options: ['Retained profit', 'Selling assets', 'Bank loan', 'None of these'], correctAnswer: 'Bank loan', feedback: { correct: 'Loans are external; retained profit and selling assets are internal.', incorrect: 'External sources include loans, overdraft, share issue, trade credit.', ideaReference: '3.6.1 Sources of finance' }, relatedTermIds: ['t-overdraft'] },
];

// ============================================================================
// CASE STUDIES
// ============================================================================

export const BUSINESS_CASE_STUDIES: BusinessCaseStudy[] = [
  {
    id: 'cs-p1-cafe',
    unitIds: ['3.1', '3.2', '3.3'],
    paper: 1,
    title: 'High Street Café',
    scenario: 'Sarah runs a small café as a sole trader. She is considering moving to a larger premises and hiring two more staff. The café is in a town centre with several competitors. Sarah has a bank loan and uses local suppliers for coffee and pastries.',
    data: 'Monthly figures: Revenue £12,000; Fixed costs £5,000; Variable costs £4,000.',
    questions: [
      { id: 'cs-p1-q1', question: 'Define the term stakeholder.', marks: 2, type: 'define', markScheme: [{ idea: 'Person/group with an interest in the business', marks: 1 }, { idea: 'Affected by or affects the business', marks: 1 }], modelAnswer: 'A stakeholder is any person or group that has an interest in, or is affected by, a business. Examples include owners, employees, customers and suppliers.' },
      { id: 'cs-p1-q2', question: 'Calculate Sarah’s monthly profit.', marks: 2, type: 'calculate', markScheme: [{ idea: 'Profit = Revenue − Total costs', marks: 1 }, { idea: 'Correct calculation: 12000 − 9000 = 3000', marks: 1 }], modelAnswer: 'Profit = Revenue − Total costs = £12,000 − (£5,000 + £4,000) = £3,000 per month.' },
      { id: 'cs-p1-q3', question: 'Explain one way Sarah’s business might be affected by competition.', marks: 3, type: 'explain', markScheme: [{ idea: 'Identify effect (e.g. price, quality, customer choice)', marks: 1 }, { idea: 'Application to café', marks: 1 }, { idea: 'Development', marks: 1 }], modelAnswer: 'Competition might force Sarah to keep prices low to attract customers, which could reduce her profit margin. She might need to improve quality or service to differentiate her café from rivals.' },
    ],
  },
  {
    id: 'cs-p2-retail',
    unitIds: ['3.1', '3.2', '3.5', '3.6'],
    paper: 2,
    title: 'Online Retailer',
    scenario: 'TechGadgets Ltd is a private limited company selling electronics online. It is considering a new marketing campaign and may need extra finance to expand its product range. Sales have grown but cash flow has been tight.',
    data: 'Revenue £500,000; Cost of sales £300,000; Other expenses £120,000.',
    questions: [
      { id: 'cs-p2-q1', question: 'Define the term e-commerce.', marks: 2, type: 'define', markScheme: [{ idea: 'Buying/selling online', marks: 2 }], modelAnswer: 'E-commerce is the buying and selling of goods and services over the internet.' },
      { id: 'cs-p2-q2', question: 'Calculate the gross profit and gross profit margin.', marks: 4, type: 'calculate', markScheme: [{ idea: 'Gross profit = Revenue − Cost of sales', marks: 1 }, { idea: '£200,000', marks: 1 }, { idea: 'Margin = (200000/500000) × 100', marks: 1 }, { idea: '40%', marks: 1 }], modelAnswer: 'Gross profit = £500,000 − £300,000 = £200,000. Gross profit margin = (200,000 ÷ 500,000) × 100 = 40%.' },
      { id: 'cs-p2-q3', question: 'Evaluate whether TechGadgets Ltd should use retained profit or a bank loan to finance expansion.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Retained profit: no interest, no loss of control', marks: 2 }, { idea: 'Loan: interest cost, but retains ownership', marks: 2 }, { idea: 'Conclusion with justification', marks: 2 }], modelAnswer: 'Retained profit avoids interest and does not dilute ownership, but may be limited if the business is already using profits. A loan provides a larger sum and keeps ownership but adds interest and repayment pressure. If cash flow is already tight, a loan could worsen it; retained profit might be safer if available.' },
    ],
  },
];

// ============================================================================
// CALCULATION TASKS
// ============================================================================

export const CALCULATION_TASKS: CalculationTask[] = [
  { id: 'calc-rev-1', unitId: '3.1', type: 'revenueCostProfit', scenario: 'A shop sells 200 units at £15 each. Fixed costs are £1,200 and variable costs are £4 per unit.', inputs: { price: 15, quantity: 200, fixedCost: 1200, variableCostPerUnit: 4 }, expected: { revenue: 3000, totalVariable: 800, totalCost: 2000, profit: 1000 }, formulaHint: 'Revenue = price × quantity; Total cost = fixed + (variable per unit × quantity); Profit = revenue − total cost', interpretationQuestion: 'What does the profit figure tell the business?', interpretationAnswer: 'The business is making a positive profit of £1,000, so it is covering all costs and has a surplus. It could use this for reinvestment or as a buffer.' },
  { id: 'calc-unit-1', unitId: '3.1', type: 'unitCost', scenario: 'Total costs are £10,000 and output is 500 units. Calculate average unit cost.', inputs: { totalCost: 10000, output: 500 }, expected: { unitCost: 20 }, formulaHint: 'Average unit cost = total cost ÷ output', interpretationQuestion: 'If output increased to 1,000 units and total cost became £18,000, would the business be benefiting from economies of scale?', interpretationAnswer: 'Yes. Unit cost falls from £20 to £18 (£18,000 ÷ 1,000). Spreading fixed costs or bulk buying may be reducing the average cost per unit.' },
  { id: 'calc-cf-1', unitId: '3.6', type: 'cashFlow', scenario: 'Opening balance £2,000. Cash inflows £8,000; outflows £7,500. Find net cash flow and closing balance.', inputs: { opening: 2000, inflows: 8000, outflows: 7500 }, expected: { netCashFlow: 500, closing: 2500 }, formulaHint: 'Net cash flow = inflows − outflows; Closing balance = opening + net cash flow', interpretationQuestion: 'Why might a business with positive monthly profit still need to watch cash flow?', interpretationAnswer: 'Customers may pay on credit (cash arrives later); the business may have to pay suppliers or loans before receiving all income. Profit does not equal cash in the bank.' },
  { id: 'calc-arr-1', unitId: '3.6', type: 'averageRateOfReturn', scenario: 'A machine costs £20,000 and is expected to generate net profit of £5,000 per year for 4 years. Calculate the average rate of return.', inputs: { initialCost: 20000, annualProfit: 5000, years: 4 }, expected: { totalProfit: 20000, arrPercent: 25 }, formulaHint: 'ARR = (average annual profit ÷ initial cost) × 100; total profit = annual × years', interpretationQuestion: 'What does a 25% ARR suggest to the business?', interpretationAnswer: 'The investment returns 25% per year on average; the business can compare this with other uses of the £20,000 or with the cost of borrowing to decide if the investment is worthwhile.' },
  { id: 'calc-margin-1', unitId: '3.6', type: 'grossProfitMargin', scenario: 'Revenue £80,000; cost of sales £48,000. Calculate gross profit and gross profit margin.', inputs: { revenue: 80000, costOfSales: 48000 }, expected: { grossProfit: 32000, marginPercent: 40 }, formulaHint: 'Gross profit = revenue − cost of sales; Gross profit margin = (gross profit ÷ revenue) × 100', interpretationQuestion: 'Why might a business compare its gross profit margin with the previous year?', interpretationAnswer: 'To see if it is controlling cost of sales better or worse; a falling margin might mean rising supplier costs or need to cut prices.' },
  { id: 'calc-margin-2', unitId: '3.6', type: 'netProfitMargin', scenario: 'Revenue £80,000; net profit £8,000. Calculate net profit margin.', inputs: { revenue: 80000, netProfit: 8000 }, expected: { marginPercent: 10 }, formulaHint: 'Net profit margin = (net profit ÷ revenue) × 100', interpretationQuestion: 'What does net profit margin show that gross profit margin does not?', interpretationAnswer: 'Net profit margin includes all expenses (e.g. wages, rent, admin), so it shows how much of each £ of revenue becomes profit after everything is paid. It is a key measure of overall profitability.' },
];

// ============================================================================
// EVALUATION PROMPTS
// ============================================================================

export const EVALUATION_PROMPTS: EvaluationPrompt[] = [
  { id: 'ev-3.1.2', unitId: '3.1', topicId: '3.1.2', question: 'Evaluate the benefits to a start-up of operating as a sole trader rather than a private limited company.', modelAnswer: 'Benefits of sole trader: simple to set up, full control, no need to publish accounts, less regulation. Drawbacks: unlimited liability (personal assets at risk), harder to raise large finance, reliance on one person. For a small start-up with low risk, sole trader may be suitable; if the business needs significant finance or has high risk, Ltd might be better.', breakdown: [{ type: 'idea', text: 'Define sole trader and Ltd; contrast liability and finance' }, { type: 'application', text: 'Apply to start-up: size, risk, need for finance' }, { type: 'evaluation', text: 'Conclusion: depends on risk and finance needs' }] },
  { id: 'ev-3.1.7', unitId: '3.1', topicId: '3.1.7', question: 'Evaluate the benefits and drawbacks to a business of expanding through a merger.', modelAnswer: 'Benefits: faster growth, instant access to new markets or products, possible economies of scale, removal of a competitor. Drawbacks: cost of merger, clash of cultures, job losses, possible diseconomies of scale. Whether it is worthwhile depends on the price paid, the fit between the two businesses and how well integration is managed.', breakdown: [{ type: 'idea', text: 'Merger = two businesses combining' }, { type: 'application', text: 'Benefits: scale, market, products; drawbacks: cost, culture' }, { type: 'evaluation', text: 'Conclusion: depends on fit and management' }] },
  { id: 'ev-3.2.2', unitId: '3.2', topicId: '3.2.2', question: 'Evaluate the impact on a business of acting in an environmentally responsible way.', modelAnswer: 'Benefits: may attract environmentally conscious customers, improve reputation, reduce risk of future regulation or fines, motivate staff. Drawbacks: can increase costs (e.g. sustainable materials, recycling), may require investment. The impact depends on the industry, customer expectations and whether the business can pass costs on or gain a competitive advantage.', breakdown: [{ type: 'idea', text: 'Environmental responsibility = reducing waste, pollution, resource use' }, { type: 'application', text: 'Costs vs benefits; customer and stakeholder reaction' }, { type: 'evaluation', text: 'Conclusion: can be a net benefit if it differentiates the business' }] },
  { id: 'ev-3.6.1', unitId: '3.6', topicId: '3.6.1', question: 'Evaluate the suitability of a bank loan for a new start-up compared with using retained profit.', modelAnswer: 'Retained profit: no interest, no repayment, no loss of control, but a new start-up may have little or no retained profit. Bank loan: provides immediate finance, keeps ownership, but must be repaid with interest and may be hard to get without track record. For a new start-up, retained profit is often not available, so a loan or other external source (e.g. family, grant) may be necessary; suitability depends on cost and ability to repay.', breakdown: [{ type: 'idea', text: 'Contrast internal (retained profit) vs external (loan)' }, { type: 'application', text: 'Start-up often has no retained profit; loan pros and cons' }, { type: 'evaluation', text: 'Conclusion: start-up may need loan; evaluate cost and risk' }] },
  { id: 'ev-3.6.3', unitId: '3.6', topicId: '3.6.3', question: 'Evaluate the value of break-even analysis to a business.', modelAnswer: 'Value: shows output needed to cover costs, helps with pricing and cost decisions, identifies margin of safety, useful for planning and target-setting. Limitations: assumes all output is sold, fixed and variable costs may not stay constant, ignores non-financial factors. Overall, break-even is a useful planning tool but should be used alongside other analysis and not relied on alone.', breakdown: [{ type: 'idea', text: 'Break-even shows output where revenue = total cost' }, { type: 'application', text: 'Useful for targets and pricing; limitations (assumptions)' }, { type: 'evaluation', text: 'Conclusion: valuable but has limitations' }] },
];

// ============================================================================
// HELPERS
// ============================================================================

export function getUnitById(id: BusinessUnitId): BusinessUnit | undefined {
  return BUSINESS_UNITS.find(u => u.id === id);
}

export function getConceptsByUnit(unitId: BusinessUnitId): BusinessConcept[] {
  return BUSINESS_CONCEPTS.filter(c => c.unitId === unitId);
}

export function getConceptsByTopic(topicId: string): BusinessConcept[] {
  return BUSINESS_CONCEPTS.filter(c => c.topicId === topicId);
}

export function getTermsByUnit(unitId: BusinessUnitId): BusinessTerm[] {
  return BUSINESS_TERMS.filter(t => t.unitId === unitId);
}

export function getTermsByTopic(topicId: string): BusinessTerm[] {
  return BUSINESS_TERMS.filter(t => t.topicId === topicId);
}

export function getQuickChecksByUnit(unitId: BusinessUnitId): BusinessQuickCheck[] {
  return BUSINESS_QUICK_CHECKS.filter(q => q.unitId === unitId);
}

export function getQuickChecksByTopic(topicId: string): BusinessQuickCheck[] {
  return BUSINESS_QUICK_CHECKS.filter(q => q.topicId === topicId);
}

export function getCaseStudiesByPaper(paper: BusinessPaper): BusinessCaseStudy[] {
  return BUSINESS_CASE_STUDIES.filter(c => c.paper === paper);
}

export function getCaseStudiesByUnit(unitId: BusinessUnitId): BusinessCaseStudy[] {
  return BUSINESS_CASE_STUDIES.filter(c => c.unitIds.includes(unitId));
}

export function getCalculationsByUnit(unitId: BusinessUnitId): CalculationTask[] {
  return CALCULATION_TASKS.filter(c => c.unitId === unitId);
}

export function getEvaluationPromptsByUnit(unitId: BusinessUnitId): EvaluationPrompt[] {
  return EVALUATION_PROMPTS.filter(e => e.unitId === unitId);
}

export function getEvaluationPromptsByTopic(topicId: string): EvaluationPrompt[] {
  return EVALUATION_PROMPTS.filter(e => e.topicId === topicId);
}

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
  // Additional glossary for 130+ target
  { id: 't-primary-sector', unitId: '3.1', topicId: '3.1.1', term: 'Primary sector', definition: 'Extraction of raw materials (farming, mining, fishing).' },
  { id: 't-secondary-sector', unitId: '3.1', topicId: '3.1.1', term: 'Secondary sector', definition: 'Manufacturing and processing raw materials into goods.' },
  { id: 't-tertiary-sector', unitId: '3.1', topicId: '3.1.1', term: 'Tertiary sector', definition: 'Provision of services (retail, banking, healthcare).' },
  { id: 't-ltd', unitId: '3.1', topicId: '3.1.2', term: 'Private limited company (Ltd)', definition: 'Company whose shares are not publicly traded; limited liability.' },
  { id: 't-shareholder', unitId: '3.1', topicId: '3.1.2', term: 'Shareholder', definition: 'Owner of shares in a company; may receive dividends.' },
  { id: 't-dividend', unitId: '3.1', topicId: '3.1.2', term: 'Dividend', definition: 'Share of profit paid to shareholders.' },
  { id: 't-aim', unitId: '3.1', topicId: '3.1.3', term: 'Business aim', definition: 'Long-term goal of a business (e.g. profit, growth, survival).' },
  { id: 't-objective', unitId: '3.1', topicId: '3.1.3', term: 'Business objective', definition: 'Specific, measurable target that helps achieve an aim.' },
  { id: 't-market-share', unitId: '3.1', topicId: '3.1.3', term: 'Market share', definition: 'Percentage of total market sales held by a business.' },
  { id: 't-centralisation', unitId: '3.4', topicId: '3.4.1', term: 'Centralisation', definition: 'Decision-making kept at the top of the organisation.' },
  { id: 't-decentralisation', unitId: '3.4', topicId: '3.4.1', term: 'Decentralisation', definition: 'Decision-making spread down the organisation.' },
  { id: 't-tall-structure', unitId: '3.4', topicId: '3.4.1', term: 'Tall structure', definition: 'Organisation with many levels of management.' },
  { id: 't-flat-structure', unitId: '3.4', topicId: '3.4.1', term: 'Flat structure', definition: 'Organisation with few levels of management.' },
  { id: 't-focus-group', unitId: '3.5', topicId: '3.5.3', term: 'Focus group', definition: 'Small group discussion to gather qualitative research data.' },
  { id: 't-competitive-pricing', unitId: '3.5', topicId: '3.5.4', term: 'Competitive pricing', definition: 'Setting price based on what competitors charge.' },
  { id: 't-product-life-cycle-decline', unitId: '3.5', topicId: '3.5.4', term: 'Decline stage', definition: 'Stage when sales fall; product may be withdrawn or extended.' },
  { id: 't-grant', unitId: '3.6', topicId: '3.6.1', term: 'Grant', definition: 'Money given by government or organisation; usually does not need repaying.' },
  { id: 't-share-issue', unitId: '3.6', topicId: '3.6.1', term: 'Share issue', definition: 'Selling new shares to raise finance; dilutes ownership.' },
  { id: 't-cash-flow-forecast', unitId: '3.6', topicId: '3.6.2', term: 'Cash flow forecast', definition: 'Prediction of money in and out over a future period.' },
  { id: 't-debtor', unitId: '3.6', topicId: '3.6.2', term: 'Debtor', definition: 'Customer who owes the business money (has not yet paid).' },
  { id: 't-creditor', unitId: '3.6', topicId: '3.6.2', term: 'Creditor', definition: 'Supplier or lender to whom the business owes money.' },
  { id: 't-contribution', unitId: '3.6', topicId: '3.6.3', term: 'Contribution per unit', definition: 'Selling price minus variable cost per unit; contributes to fixed costs.' },
  { id: 't-break-even-formula', unitId: '3.6', topicId: '3.6.3', term: 'Break-even formula', definition: 'Break-even output = Fixed costs ÷ Contribution per unit.' },
  { id: 't-cost-of-sales', unitId: '3.6', topicId: '3.6.4', term: 'Cost of sales', definition: 'Direct costs of producing or buying goods sold.' },
  { id: 't-operating-expenses', unitId: '3.6', topicId: '3.6.4', term: 'Operating expenses', definition: 'Costs of running the business (wages, rent, admin).' },
  { id: 't-gross-profit', unitId: '3.6', topicId: '3.6.4', term: 'Gross profit', definition: 'Revenue minus cost of sales.' },
  { id: 't-net-profit', unitId: '3.6', topicId: '3.6.4', term: 'Net profit', definition: 'Gross profit minus operating expenses and other costs.' },
  { id: 't-bulk-buying', unitId: '3.1', topicId: '3.1.7', term: 'Bulk buying', definition: 'Economy of scale: buying in large quantities at lower unit price.' },
  { id: 't-specialisation', unitId: '3.1', topicId: '3.1.7', term: 'Specialisation', definition: 'Workers or departments focusing on specific tasks; increases efficiency.' },
  { id: 't-consumer-law', unitId: '3.2', topicId: '3.2.5', term: 'Consumer law', definition: 'Laws protecting customers (e.g. product safety, trade descriptions).' },
  { id: 't-supplier', unitId: '3.3', topicId: '3.3.2', term: 'Supplier', definition: 'Business that provides materials or services to another business.' },
  { id: 't-lead-time', unitId: '3.3', topicId: '3.3.2', term: 'Lead time', definition: 'Time between ordering and receiving stock.' },
  { id: 't-quality-assurance', unitId: '3.3', topicId: '3.3.3', term: 'Quality assurance', definition: 'Systems to ensure quality is built in (e.g. checking at each stage).' },
  { id: 't-quality-control', unitId: '3.3', topicId: '3.3.3', term: 'Quality control', definition: 'Checking finished products for defects.' },
  { id: 't-target-market', unitId: '3.5', topicId: '3.5.2', term: 'Target market', definition: 'Specific group of customers a business aims to sell to.' },
  { id: 't-advertising', unitId: '3.5', topicId: '3.5.4', term: 'Advertising', definition: 'Paid promotion to inform and persuade customers.' },
  { id: 't-distribution', unitId: '3.5', topicId: '3.5.4', term: 'Distribution', definition: 'Getting the product to the customer (place in the 4Ps).' },
  { id: 't-brand', unitId: '3.5', topicId: '3.5.4', term: 'Brand', definition: 'Name, design or symbol that identifies a product or business.' },
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
  // Additional quick checks for 120+ target (3–5 per sub-topic)
  { id: 'q-3.1.1-d', unitId: '3.1', topicId: '3.1.1', type: 'multipleChoice', question: 'Which sector processes raw materials into goods?', options: ['Primary', 'Secondary', 'Tertiary', 'Quaternary'], correctAnswer: 'Secondary', feedback: { correct: 'Secondary sector = manufacturing.', incorrect: 'Secondary sector processes raw materials into goods.', ideaReference: '3.1.1 Sectors' }, relatedTermIds: ['t-secondary-sector'] },
  { id: 'q-3.1.1-e', unitId: '3.1', topicId: '3.1.1', type: 'trueFalse', question: 'Enterprise is a factor of production.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Enterprise = risk-taking and ideas.', incorrect: 'Factors are land, labour, capital, enterprise.', ideaReference: '3.1.1 Purpose' }, relatedTermIds: ['t-factors-production'] },
  { id: 'q-3.1.2-c', unitId: '3.1', topicId: '3.1.2', type: 'multipleChoice', question: 'What do shareholders receive when a company makes profit?', options: ['Salary', 'Dividend', 'Interest', 'Rent'], correctAnswer: 'Dividend', feedback: { correct: 'Shareholders receive dividends.', incorrect: 'Dividends are paid to shareholders from profit.', ideaReference: '3.1.2 Business ownership' }, relatedTermIds: ['t-dividend'] },
  { id: 'q-3.1.2-d', unitId: '3.1', topicId: '3.1.2', type: 'trueFalse', question: 'A franchisee pays to use another business\'s brand.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Franchisee pays franchisor for brand and system.', incorrect: 'Franchise = paying to use brand and system.', ideaReference: '3.1.2 Ownership' }, relatedTermIds: ['t-franchise'] },
  { id: 'q-3.1.3-c', unitId: '3.1', topicId: '3.1.3', type: 'multipleChoice', question: 'What is market share?', options: ['Total market size', 'Percentage of market sales held by a business', 'Number of customers', 'Revenue'], correctAnswer: 'Percentage of market sales held by a business', feedback: { correct: 'Market share = % of total market.', incorrect: 'Market share is the percentage of total market sales.', ideaReference: '3.1.3 Aims' }, relatedTermIds: ['t-market-share'] },
  { id: 'q-3.1.4-b', unitId: '3.1', topicId: '3.1.4', type: 'multipleChoice', question: 'Which stakeholder wants the business to grow?', options: ['Only employees', 'Only customers', 'Shareholders and owners', 'Only suppliers'], correctAnswer: 'Shareholders and owners', feedback: { correct: 'Owners/shareholders typically want growth and profit.', incorrect: 'Different stakeholders have different interests.', ideaReference: '3.1.4 Stakeholders' } },
  { id: 'q-3.1.5-c', unitId: '3.1', topicId: '3.1.5', type: 'shortAnswer', question: 'Name one factor that influences business location.', correctAnswer: ['proximity to market', 'labour', 'costs', 'raw materials', 'competition'], feedback: { correct: 'Correct.', incorrect: 'Factors include market, labour, materials, costs, competition.', ideaReference: '3.1.5 Location' } },
  { id: 'q-3.1.6-c', unitId: '3.1', topicId: '3.1.6', type: 'multipleChoice', question: 'Total cost = fixed costs + ...?', options: ['Revenue', 'Variable costs', 'Profit', 'Output'], correctAnswer: 'Variable costs', feedback: { correct: 'Total cost = fixed + variable.', incorrect: 'Total cost = fixed costs + variable costs.', ideaReference: '3.1.6 Business planning' }, relatedTermIds: ['t-total-cost'] },
  { id: 'q-3.1.7-c', unitId: '3.1', topicId: '3.1.7', type: 'multipleChoice', question: 'What is organic growth?', options: ['Buying another business', 'Growth from within the business', 'Merging with a competitor', 'Selling shares'], correctAnswer: 'Growth from within the business', feedback: { correct: 'Organic = internal growth (new stores, products).', incorrect: 'Organic growth is from within, not buying others.', ideaReference: '3.1.7 Expanding' }, relatedTermIds: ['t-organic-growth'] },
  { id: 'q-3.1.7-d', unitId: '3.1', topicId: '3.1.7', type: 'trueFalse', question: 'Diseconomies of scale occur when a business grows too large.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Diseconomies = rising unit cost when too large.', incorrect: 'Diseconomies occur when growth causes inefficiency.', ideaReference: '3.1.7 Expanding' }, relatedTermIds: ['t-diseconomies-of-scale'] },
  { id: 'q-3.2.1-b', unitId: '3.2', topicId: '3.2.1', type: 'multipleChoice', question: 'Which technology helps businesses sell online?', options: ['E-commerce', 'Manual till', 'Paper invoices', 'Telephone only'], correctAnswer: 'E-commerce', feedback: { correct: 'E-commerce = buying/selling online.', incorrect: 'E-commerce enables online sales.', ideaReference: '3.2.1 Technology' }, relatedTermIds: ['t-ecommerce'] },
  { id: 'q-3.2.2-b', unitId: '3.2', topicId: '3.2.2', type: 'trueFalse', question: 'Sustainability means meeting needs without damaging the environment for future generations.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Sustainability considers future generations.', incorrect: 'Sustainability balances current and future needs.', ideaReference: '3.2.2 Ethical' }, relatedTermIds: ['t-sustainability'] },
  { id: 'q-3.2.3-b', unitId: '3.2', topicId: '3.2.3', type: 'multipleChoice', question: 'Who sets interest rates in the UK?', options: ['Individual banks', 'The Bank of England', 'The government', 'Customers'], correctAnswer: 'The Bank of England', feedback: { correct: 'Bank of England sets the base rate.', incorrect: 'The Bank of England sets interest rates.', ideaReference: '3.2.3 Economic climate' }, relatedTermIds: ['t-interest-rate'] },
  { id: 'q-3.2.4-b', unitId: '3.2', topicId: '3.2.4', type: 'multipleChoice', question: 'What does a weaker pound mean for UK exporters?', options: ['UK goods cost more abroad', 'UK goods cost less abroad', 'No effect', 'Imports become cheaper'], correctAnswer: 'UK goods cost less abroad', feedback: { correct: 'Weaker pound = UK exports cheaper for foreign buyers.', incorrect: 'Weaker pound makes UK exports more competitive.', ideaReference: '3.2.4 Globalisation' }, relatedTermIds: ['t-exchange-rate'] },
  { id: 'q-3.2.5-b', unitId: '3.2', topicId: '3.2.5', type: 'multipleChoice', question: 'What does HASAWA require employers to provide?', options: ['Free lunches', 'A safe working environment', 'Company cars', 'Flexible hours'], correctAnswer: 'A safe working environment', feedback: { correct: 'HASAWA = Health and Safety at Work Act.', incorrect: 'HASAWA requires a safe working environment.', ideaReference: '3.2.5 Legislation' }, relatedTermIds: ['t-hasawa'] },
  { id: 'q-3.2.6-b', unitId: '3.2', topicId: '3.2.6', type: 'trueFalse', question: 'In a competitive market, businesses compete for customers.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Competition means fighting for customers.', incorrect: 'Competitive markets have many firms competing.', ideaReference: '3.2.6 Competitive environment' } },
  { id: 'q-3.3.1-c', unitId: '3.3', topicId: '3.3.1', type: 'multipleChoice', question: 'What is lean production?', options: ['Producing with minimal waste', 'Producing large volumes', 'Producing one-off items', 'Producing slowly'], correctAnswer: 'Producing with minimal waste', feedback: { correct: 'Lean = minimal waste, efficiency.', incorrect: 'Lean production reduces waste.', ideaReference: '3.3.1 Production' }, relatedTermIds: ['t-lean-production'] },
  { id: 'q-3.3.2-c', unitId: '3.3', topicId: '3.3.2', type: 'multipleChoice', question: 'What is the supply chain?', options: ['Only the manufacturer', 'All businesses from raw materials to customer', 'Only the retailer', 'Only suppliers'], correctAnswer: 'All businesses from raw materials to customer', feedback: { correct: 'Supply chain = full journey to customer.', incorrect: 'Supply chain includes all stages to the customer.', ideaReference: '3.3.2 Procurement' }, relatedTermIds: ['t-supply-chain'] },
  { id: 'q-3.3.3-b', unitId: '3.3', topicId: '3.3.3', type: 'multipleChoice', question: 'What is the difference between quality control and quality assurance?', options: ['No difference', 'Control checks finished products; assurance builds quality in', 'Assurance checks finished; control builds in', 'Both are the same'], correctAnswer: 'Control checks finished products; assurance builds quality in', feedback: { correct: 'Control = inspect at end; assurance = build in throughout.', incorrect: 'Control inspects; assurance prevents defects.', ideaReference: '3.3.3 Quality' }, relatedTermIds: ['t-quality-assurance', 't-quality-control'] },
  { id: 'q-3.3.4-b', unitId: '3.3', topicId: '3.3.4', type: 'trueFalse', question: 'Good customer service can lead to repeat business.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Satisfied customers return.', incorrect: 'Good service builds loyalty.', ideaReference: '3.3.4 Customer service' } },
  { id: 'q-3.4.1-c', unitId: '3.4', topicId: '3.4.1', type: 'multipleChoice', question: 'What is a flat organisational structure?', options: ['Many levels of management', 'Few levels of management', 'No managers', 'Circular hierarchy'], correctAnswer: 'Few levels of management', feedback: { correct: 'Flat = few levels, wide span.', incorrect: 'Flat structure has few management levels.', ideaReference: '3.4.1 Structures' }, relatedTermIds: ['t-flat-structure'] },
  { id: 'q-3.4.2-b', unitId: '3.4', topicId: '3.4.2', type: 'trueFalse', question: 'External recruitment brings new ideas into the business.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'External hires can bring fresh perspectives.', incorrect: 'External recruitment can add new skills and ideas.', ideaReference: '3.4.2 Recruitment' }, relatedTermIds: ['t-external-recruitment'] },
  { id: 'q-3.4.3-b', unitId: '3.4', topicId: '3.4.3', type: 'multipleChoice', question: 'Which is a non-financial method of motivation?', options: ['Commission', 'Training and development', 'Profit sharing', 'Bonus'], correctAnswer: 'Training and development', feedback: { correct: 'Training is non-financial.', incorrect: 'Non-financial includes training, recognition, responsibility.', ideaReference: '3.4.3 Motivation' } },
  { id: 'q-3.4.4-b', unitId: '3.4', topicId: '3.4.4', type: 'trueFalse', question: 'Induction training is given when a new employee starts.', options: ['True', 'False'], correctAnswer: 'True', feedback: { correct: 'Induction = initial training for new starters.', incorrect: 'Induction helps new staff settle in.', ideaReference: '3.4.4 Training' }, relatedTermIds: ['t-induction'] },
  { id: 'q-3.5.2-b', unitId: '3.5', topicId: '3.5.2', type: 'multipleChoice', question: 'What is a target market?', options: ['All customers', 'Specific group a business aims to sell to', 'Competitors', 'Suppliers'], correctAnswer: 'Specific group a business aims to sell to', feedback: { correct: 'Target market = chosen customer group.', incorrect: 'Target market is the specific group aimed at.', ideaReference: '3.5.2 Segmentation' }, relatedTermIds: ['t-target-market'] },
  { id: 'q-3.5.3-b', unitId: '3.5', topicId: '3.5.3', type: 'multipleChoice', question: 'What is secondary research?', options: ['Data collected by the business', 'Existing data from other sources', 'Customer surveys', 'Focus groups'], correctAnswer: 'Existing data from other sources', feedback: { correct: 'Secondary = data from others (internet, government).', incorrect: 'Secondary research uses existing data.', ideaReference: '3.5.3 Market research' }, relatedTermIds: ['t-secondary-research'] },
  { id: 'q-3.5.4-c', unitId: '3.5', topicId: '3.5.4', type: 'multipleChoice', question: 'What is a loss leader?', options: ['Product sold at a loss to attract customers', 'Product that makes most profit', 'Product in decline', 'New product'], correctAnswer: 'Product sold at a loss to attract customers', feedback: { correct: 'Loss leader attracts customers who buy other items.', incorrect: 'Loss leader = sold at loss to attract customers.', ideaReference: '3.5.4 Marketing mix' }, relatedTermIds: ['t-loss-leader'] },
  { id: 'q-3.5.4-d', unitId: '3.5', topicId: '3.5.4', type: 'multipleChoice', question: 'What is an extension strategy?', options: ['Launching a new product', 'Actions to prolong product life in maturity/decline', 'Withdrawing a product', 'Reducing price'], correctAnswer: 'Actions to prolong product life in maturity/decline', feedback: { correct: 'Extension = new market, features, packaging.', incorrect: 'Extension strategies prolong product life.', ideaReference: '3.5.4 Marketing mix' }, relatedTermIds: ['t-extension-strategy'] },
  { id: 'q-3.6.1-c', unitId: '3.6', topicId: '3.6.1', type: 'multipleChoice', question: 'Which source of finance usually does not need repaying?', options: ['Bank loan', 'Overdraft', 'Grant', 'Trade credit'], correctAnswer: 'Grant', feedback: { correct: 'Grants are often non-repayable.', incorrect: 'Grants from government/orgs often do not need repaying.', ideaReference: '3.6.1 Sources of finance' }, relatedTermIds: ['t-grant'] },
  { id: 'q-3.6.2-b', unitId: '3.6', topicId: '3.6.2', type: 'multipleChoice', question: 'Who is a debtor?', options: ['Someone the business owes', 'Customer who owes the business', 'Supplier', 'Bank'], correctAnswer: 'Customer who owes the business', feedback: { correct: 'Debtor = customer who has not yet paid.', incorrect: 'Debtor = customer who owes money.', ideaReference: '3.6.2 Cash flow' }, relatedTermIds: ['t-debtor'] },
  { id: 'q-3.6.3-c', unitId: '3.6', topicId: '3.6.3', type: 'multipleChoice', question: 'Contribution per unit = selling price minus ...?', options: ['Fixed cost', 'Variable cost per unit', 'Total cost', 'Revenue'], correctAnswer: 'Variable cost per unit', feedback: { correct: 'Contribution = price − variable cost per unit.', incorrect: 'Contribution contributes to covering fixed costs.', ideaReference: '3.6.3 Financial terms' }, relatedTermIds: ['t-contribution'] },
  { id: 'q-3.6.4-b', unitId: '3.6', topicId: '3.6.4', type: 'multipleChoice', question: 'Gross profit = revenue minus ...?', options: ['Operating expenses', 'Cost of sales', 'Net profit', 'Total costs'], correctAnswer: 'Cost of sales', feedback: { correct: 'Gross profit = revenue − cost of sales.', incorrect: 'Gross profit excludes operating expenses.', ideaReference: '3.6.4 Financial performance' }, relatedTermIds: ['t-gross-profit'] },
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
  {
    id: 'cs-p1-hr',
    unitIds: ['3.1', '3.2', '3.4'],
    paper: 1,
    title: 'BakeRight Ltd',
    scenario: 'BakeRight Ltd is a private limited company making artisan bread. It has 45 employees and is recruiting a new production manager. The HR director is deciding between internal promotion and external recruitment. The business must comply with the National Minimum Wage and Equality Act.',
    data: 'Staff: 30 production, 10 sales, 5 admin. Annual turnover £1.2m. Wage bill £420,000.',
    questions: [
      { id: 'cs-hr-q1', question: 'Define the term internal recruitment.', marks: 2, type: 'define', markScheme: [{ idea: 'Filling vacancy from existing staff', marks: 2 }], modelAnswer: 'Internal recruitment is when a business fills a vacancy by promoting or moving an existing employee rather than hiring from outside.' },
      { id: 'cs-hr-q2', question: 'Explain one benefit of using internal recruitment for the production manager role.', marks: 3, type: 'explain', markScheme: [{ idea: 'Identify benefit (e.g. knows business, faster, cheaper)', marks: 1 }, { idea: 'Application to BakeRight', marks: 1 }, { idea: 'Development', marks: 1 }], modelAnswer: 'Internal recruitment means the candidate already knows the business and bakery processes, so they can start effectively faster. They may also be cheaper than external recruitment (no agency fees) and it can motivate other staff who see promotion opportunities.' },
      { id: 'cs-hr-q3', question: 'Evaluate the impact of legislation (e.g. NMW, Equality Act) on BakeRight Ltd.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Costs: wages, training, compliance', marks: 2 }, { idea: 'Benefits: reputation, safe workplace, fair treatment', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Legislation adds costs (wages must meet NMW, recruitment must be fair under Equality Act) and may require training. However, compliance can improve reputation, attract staff and reduce risk of tribunals or fines. For a business like BakeRight, fair treatment helps retention; the cost is often outweighed by benefits.' },
    ],
  },
  {
    id: 'cs-p2-marketing',
    unitIds: ['3.1', '3.2', '3.5'],
    paper: 2,
    title: 'StyleCo Fashion',
    scenario: 'StyleCo is a small fashion retailer considering a new product launch. It wants to use market research to understand its target market before deciding on price and promotion. The business competes with both high-street and online rivals.',
    data: 'Current customers: 60% aged 18–35, 40% aged 35–55. Average spend £45. Competitors: 5 within 2 miles.',
    questions: [
      { id: 'cs-mkt-q1', question: 'Define the term market segmentation.', marks: 2, type: 'define', markScheme: [{ idea: 'Dividing market into groups', marks: 1 }, { idea: 'e.g. age, gender, location, income', marks: 1 }], modelAnswer: 'Market segmentation is dividing the market into groups of customers with similar characteristics (e.g. age, gender, location, income) so the business can target them more effectively.' },
      { id: 'cs-mkt-q2', question: 'Explain one advantage of primary research for StyleCo.', marks: 3, type: 'explain', markScheme: [{ idea: 'Identify advantage (e.g. specific to business, up to date)', marks: 1 }, { idea: 'Application to StyleCo', marks: 1 }, { idea: 'Development', marks: 1 }], modelAnswer: 'Primary research gives StyleCo data specific to its own customers and products, which secondary data may not provide. For a fashion retailer, understanding what their target customers want (e.g. through surveys or focus groups) helps design and price the new product correctly.' },
      { id: 'cs-mkt-q3', question: 'Evaluate whether StyleCo should use price skimming or penetration pricing for the new product.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Skimming: high initial price, early profit', marks: 2 }, { idea: 'Penetration: low price, gain share', marks: 2 }, { idea: 'Conclusion with justification', marks: 2 }], modelAnswer: 'Skimming would maximise profit from early adopters but might limit volume. Penetration would attract customers quickly and build market share but could reduce profit per unit. For a small retailer competing with larger rivals, penetration might help gain customers; if the product is unique, skimming could work. Depends on competition and product uniqueness.' },
    ],
  },
  {
    id: 'cs-p2-finance',
    unitIds: ['3.1', '3.2', '3.6'],
    paper: 2,
    title: 'PrintPro Ltd',
    scenario: 'PrintPro Ltd provides printing services to local businesses. It is considering investing in a new printer costing £50,000. The machine is expected to generate extra net profit of £12,500 per year for 4 years. PrintPro also wants to improve its cash flow management.',
    data: 'Current: Revenue £180,000; Cost of sales £90,000; Other expenses £60,000. Monthly cash flow often negative in quarter 1.',
    questions: [
      { id: 'cs-fin-q1', question: 'Calculate the average rate of return for the new printer.', marks: 4, type: 'calculate', markScheme: [{ idea: 'Total profit = 12500 × 4 = 50000', marks: 1 }, { idea: 'Average annual = 12500', marks: 1 }, { idea: 'ARR = (12500/50000) × 100', marks: 1 }, { idea: '25%', marks: 1 }], modelAnswer: 'Total profit = £12,500 × 4 = £50,000. Average annual profit = £12,500. ARR = (£12,500 ÷ £50,000) × 100 = 25%.' },
      { id: 'cs-fin-q2', question: 'Explain one solution to cash flow problems.', marks: 3, type: 'explain', markScheme: [{ idea: 'Identify solution (e.g. overdraft, chase debtors)', marks: 1 }, { idea: 'Application', marks: 1 }, { idea: 'Development', marks: 1 }], modelAnswer: 'Chasing debtors can improve cash flow by getting payment in sooner. Offering a discount for early payment might encourage faster payment. Alternatively, an overdraft could cover short-term shortfalls until cash arrives.' },
      { id: 'cs-fin-q3', question: 'Define the term cash flow.', marks: 2, type: 'define', markScheme: [{ idea: 'Movement of money in and out', marks: 2 }], modelAnswer: 'Cash flow is the movement of money into and out of a business over a period of time.' },
    ],
  },
  {
    id: 'cs-p1-ethics',
    unitIds: ['3.1', '3.2', '3.3'],
    paper: 1,
    title: 'GreenPack Ltd',
    scenario: 'GreenPack Ltd makes eco-friendly packaging. It is considering switching to more expensive recycled materials. Competitors use cheaper materials. The business wants to improve its environmental reputation.',
    data: 'Current materials cost £2 per unit; recycled would cost £2.80. Sales 50,000 units per year.',
    questions: [
      { id: 'cs-eth-q1', question: 'Define the term ethical behaviour.', marks: 2, type: 'define', markScheme: [{ idea: 'Acting in ways stakeholders consider fair and honest', marks: 2 }], modelAnswer: 'Ethical behaviour means acting in ways that stakeholders consider fair and honest.' },
      { id: 'cs-eth-q2', question: 'Calculate the extra cost per year of switching to recycled materials.', marks: 2, type: 'calculate', markScheme: [{ idea: '(2.80 - 2) × 50000 = 40000', marks: 2 }], modelAnswer: 'Extra cost = (£2.80 − £2) × 50,000 = £40,000 per year.' },
      { id: 'cs-eth-q3', question: 'Evaluate whether GreenPack should switch to recycled materials.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Costs: £40k extra', marks: 2 }, { idea: 'Benefits: reputation, customer appeal, future regulation', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'The switch costs £40,000 per year. Benefits may include: attracting environmentally conscious customers, improving brand image, preparing for future regulation. If the business can increase prices or sales, the cost may be justified. Depends on customer willingness to pay for eco-friendly products.' },
    ],
  },
  {
    id: 'cs-p2-global',
    unitIds: ['3.1', '3.2', '3.6'],
    paper: 2,
    title: 'ExportCo Ltd',
    scenario: 'ExportCo Ltd sells machinery to European customers. The pound has weakened against the euro. The business is considering expanding into new markets. It has a positive cash flow but is considering a loan for expansion.',
    data: 'Revenue €500,000 (converted at 1.15 = £435k). Costs £300,000. New market could add £100k revenue.',
    questions: [
      { id: 'cs-glob-q1', question: 'Explain one way a weaker pound affects ExportCo.', marks: 3, type: 'explain', markScheme: [{ idea: 'UK exports cheaper abroad', marks: 1 }, { idea: 'Application to ExportCo', marks: 2 }], modelAnswer: 'A weaker pound means ExportCo\'s machinery costs fewer euros for European customers, so it becomes more competitive. Sales may increase as prices are effectively lower in euro terms.' },
      { id: 'cs-glob-q2', question: 'Define the term globalisation.', marks: 2, type: 'define', markScheme: [{ idea: 'Businesses operating/competing across borders', marks: 2 }], modelAnswer: 'Globalisation is the trend of businesses operating and competing across national borders.' },
      { id: 'cs-glob-q3', question: 'Evaluate whether ExportCo should expand into new markets.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Benefits: growth, diversify', marks: 2 }, { idea: 'Risks: cost, exchange rates', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Expansion could increase revenue and reduce reliance on one market. However, it requires investment and may involve exchange rate risk. With positive cash flow, the business may be able to fund it; a loan would add interest cost. Depends on the attractiveness of the new market and available finance.' },
    ],
  },
  {
    id: 'cs-p1-production',
    unitIds: ['3.1', '3.3'],
    paper: 1,
    title: 'CraftBrew Co',
    scenario: 'CraftBrew Co makes craft beer in small batches (job production). It is considering moving to flow production to meet growing demand. The owner values the unique character of each batch.',
    data: 'Current: 500 bottles per week, £3 cost per bottle. Flow could produce 5,000 per week, £1.50 per bottle. Set-up cost £50,000.',
    questions: [
      { id: 'cs-prod-q1', question: 'Define the term flow production.', marks: 2, type: 'define', markScheme: [{ idea: 'Making large numbers of identical products', marks: 2 }], modelAnswer: 'Flow production is making large numbers of identical products on a production line.' },
      { id: 'cs-prod-q2', question: 'Explain one disadvantage of flow production for CraftBrew.', marks: 3, type: 'explain', markScheme: [{ idea: 'Less flexibility/variety', marks: 1 }, { idea: 'Application', marks: 2 }], modelAnswer: 'Flow production produces identical products, so CraftBrew would lose the unique character of each batch that appeals to craft beer drinkers. The product might become less distinctive.' },
      { id: 'cs-prod-q3', question: 'Evaluate whether CraftBrew should switch to flow production.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Cost savings, volume', marks: 2 }, { idea: 'Loss of uniqueness, set-up cost', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Flow production would cut unit cost from £3 to £1.50 and allow much higher output. However, the £50,000 set-up cost must be recovered, and the loss of product uniqueness might alienate existing customers who value craft character. The business must weigh cost savings against brand identity.' },
    ],
  },
  {
    id: 'cs-p1-takeover',
    unitIds: ['3.1', '3.2', '3.4'],
    paper: 1,
    title: 'MegaRetail Takeover',
    scenario: 'MegaRetail plc has taken over a smaller chain of 50 stores. The smaller chain had a different culture and flat structure. MegaRetail uses a tall structure with centralised decision-making. Staff are worried about job losses and change.',
    data: 'MegaRetail: 500 stores, 8 management levels. Acquired chain: 50 stores, 3 levels. Redundancy rumours: 200 jobs at risk.',
    questions: [
      { id: 'cs-takeover-q1', question: 'Define the term takeover.', marks: 2, type: 'define', markScheme: [{ idea: 'One business buys control of another', marks: 2 }], modelAnswer: 'A takeover is when one business buys control of another business.' },
      { id: 'cs-takeover-q2', question: 'Explain one benefit of centralisation for MegaRetail after the takeover.', marks: 3, type: 'explain', markScheme: [{ idea: 'Consistent decisions, control', marks: 1 }, { idea: 'Application', marks: 2 }], modelAnswer: 'Centralisation means decisions are made at the top, so MegaRetail can ensure consistency across all 550 stores. This helps integrate the acquired chain and maintain brand standards.' },
      { id: 'cs-takeover-q3', question: 'Evaluate the impact of the takeover on stakeholders.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Shareholders: possible growth', marks: 2 }, { idea: 'Employees: job losses, change', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Shareholders may benefit from economies of scale and market share. Employees face uncertainty and possible redundancy. Customers may see consistency but also less local variation. The impact depends on how well integration is managed.' },
    ],
  },
  {
    id: 'cs-p2-arr',
    unitIds: ['3.1', '3.6'],
    paper: 2,
    title: 'InvestTech Ltd',
    scenario: 'InvestTech Ltd is choosing between two projects. Project A costs £40,000 and generates £12,000 profit per year for 4 years. Project B costs £30,000 and generates £9,000 profit per year for 4 years. The business has limited funds.',
    data: 'Project A: ARR = 30%. Project B: ARR = 30%. Cash flow: Project A has higher total return.',
    questions: [
      { id: 'cs-arr-q1', question: 'Calculate the ARR for Project A.', marks: 4, type: 'calculate', markScheme: [{ idea: 'Total profit = 12000 × 4 = 48000', marks: 1 }, { idea: 'Average annual = 12000', marks: 1 }, { idea: 'ARR = (12000/40000) × 100', marks: 1 }, { idea: '30%', marks: 1 }], modelAnswer: 'Total profit = £12,000 × 4 = £48,000. Average annual = £12,000. ARR = (£12,000 ÷ £40,000) × 100 = 30%.' },
      { id: 'cs-arr-q2', question: 'Explain one limitation of using ARR for investment decisions.', marks: 3, type: 'explain', markScheme: [{ idea: 'Ignores timing of cash flow', marks: 1 }, { idea: 'Development', marks: 2 }], modelAnswer: 'ARR ignores when cash is received. £12,000 in year 1 is worth more than £12,000 in year 4 due to inflation and opportunity cost. ARR does not account for this.' },
      { id: 'cs-arr-q3', question: 'Evaluate which project InvestTech should choose.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Both same ARR', marks: 2 }, { idea: 'Consider cost, cash flow, risk', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Both have 30% ARR. Project A costs more but returns more in total. If funds are limited, Project B may be more feasible. Project A may be better if the business can afford it and wants higher absolute return.' },
    ],
  },
  {
    id: 'cs-p1-outsourcing',
    unitIds: ['3.1', '3.2', '3.3'],
    paper: 1,
    title: 'DesignCo Ltd',
    scenario: 'DesignCo Ltd currently makes all its products in the UK. It is considering outsourcing production to a factory abroad to reduce costs. Quality and lead times are concerns. The business employs 80 production workers.',
    data: 'Current UK cost: £15 per unit. Overseas: £8 per unit. Lead time UK: 1 week. Overseas: 4 weeks. Quality reject rate UK: 1%. Overseas supplier: 3%.',
    questions: [
      { id: 'cs-out-q1', question: 'Define the term outsourcing.', marks: 2, type: 'define', markScheme: [{ idea: 'Using another business to carry out tasks', marks: 2 }], modelAnswer: 'Outsourcing is when a business uses another business to carry out tasks or provide services.' },
      { id: 'cs-out-q2', question: 'Explain one risk of outsourcing production for DesignCo.', marks: 3, type: 'explain', markScheme: [{ idea: 'Quality, lead time, control', marks: 1 }, { idea: 'Application', marks: 2 }], modelAnswer: 'The higher reject rate (3% vs 1%) means more waste and possible customer complaints. DesignCo has less control over quality when production is abroad.' },
      { id: 'cs-out-q3', question: 'Evaluate whether DesignCo should outsource production.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Cost saving vs quality/lead time', marks: 2 }, { idea: 'Job losses, control', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Cost saving is significant (£7 per unit) but quality and lead time are worse. Job losses would affect 80 workers. The decision depends on how much customers value speed and quality versus price.' },
    ],
  },
  {
    id: 'cs-p2-boston',
    unitIds: ['3.5', '3.6'],
    paper: 2,
    title: 'ProductPortfolio Ltd',
    scenario: 'ProductPortfolio Ltd has four product lines. Product X: high market share, low growth. Product Y: high share, high growth. Product Z: low share, high growth. Product W: low share, low growth. The business is deciding where to invest.',
    data: 'Boston Matrix: X = cash cow, Y = star, Z = question mark, W = dog. Limited marketing budget: £100,000.',
    questions: [
      { id: 'cs-boston-q1', question: 'Define the term Boston Matrix.', marks: 2, type: 'define', markScheme: [{ idea: 'Model classifying products by market share and growth', marks: 2 }], modelAnswer: 'The Boston Matrix classifies products as stars, cash cows, question marks or dogs based on market share and market growth.' },
      { id: 'cs-boston-q2', question: 'Explain why Product Y might receive investment.', marks: 3, type: 'explain', markScheme: [{ idea: 'Star: high potential', marks: 1 }, { idea: 'Application', marks: 2 }], modelAnswer: 'Product Y is a star – high share and high growth. Investing in it can help maintain or increase market position. Stars have potential to become cash cows.' },
      { id: 'cs-boston-q3', question: 'Evaluate how ProductPortfolio should allocate its marketing budget across the four products.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Stars and question marks need investment', marks: 2 }, { idea: 'Cash cows fund growth; dogs may be withdrawn', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Invest in stars (Y) and possibly question marks (Z). Use cash from X to fund growth. Consider withdrawing or minimal support for W. Balance depends on strategic goals.' },
    ],
  },
  {
    id: 'cs-p1-delayering',
    unitIds: ['3.1', '3.4'],
    paper: 1,
    title: 'StructCo Ltd',
    scenario: 'StructCo Ltd has a tall structure with 6 levels. It is considering delayering to reduce costs and speed up decisions. Middle managers are concerned about job losses. Span of control would increase for remaining managers.',
    data: 'Current: 6 levels, average span 4. After delayering: 4 levels, average span 8. Cost saving: £200,000 per year. 15 middle manager roles at risk.',
    questions: [
      { id: 'cs-delay-q1', question: 'Define the term delayering.', marks: 2, type: 'define', markScheme: [{ idea: 'Removing levels of management', marks: 2 }], modelAnswer: 'Delayering is removing levels of management from the organisational structure.' },
      { id: 'cs-delay-q2', question: 'Explain one advantage of delayering for StructCo.', marks: 3, type: 'explain', markScheme: [{ idea: 'Cost saving, faster decisions', marks: 1 }, { idea: 'Application', marks: 2 }], modelAnswer: 'Delayering saves £200,000 per year in salaries. It can also speed up decision-making as there are fewer layers for information to pass through.' },
      { id: 'cs-delay-q3', question: 'Evaluate the impact of delayering on StructCo.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Costs: job losses, wider span', marks: 2 }, { idea: 'Benefits: cost, speed', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Benefits: cost saving, faster decisions. Drawbacks: 15 job losses, remaining managers have wider span of control (may be overloaded), possible loss of expertise. Depends on whether remaining managers can cope.' },
    ],
  },
  {
    id: 'cs-p2-cost-plus',
    unitIds: ['3.5', '3.6'],
    paper: 2,
    title: 'PriceFix Ltd',
    scenario: 'PriceFix Ltd uses cost-plus pricing: it adds 40% to the cost of each product. A product costs £50 to make. A competitor has just launched a similar product at £60. PriceFix is considering matching the competitor or keeping its current price of £70.',
    data: 'Cost: £50. Current price (cost+40%): £70. Competitor: £60. PriceFix sales: 1,000 units per month at £70.',
    questions: [
      { id: 'cs-price-q1', question: 'Define the term cost-plus pricing.', marks: 2, type: 'define', markScheme: [{ idea: 'Adding percentage to cost to set price', marks: 2 }], modelAnswer: 'Cost-plus pricing is adding a percentage to the cost of production to set the selling price.' },
      { id: 'cs-price-q2', question: 'Calculate the current price using cost-plus (40%).', marks: 2, type: 'calculate', markScheme: [{ idea: '50 × 1.4 = 70', marks: 2 }], modelAnswer: '£50 × 1.40 = £70.' },
      { id: 'cs-price-q3', question: 'Evaluate whether PriceFix should match the competitor\'s price of £60.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Matching: competitive but lower margin', marks: 2 }, { idea: 'Keeping £70: may lose sales', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Matching £60 would reduce margin (from £20 to £10 per unit) but may win customers from the competitor. Keeping £70 maintains margin but may lose sales if customers switch. Depends on price sensitivity and brand loyalty.' },
    ],
  },
  {
    id: 'cs-p1-nmw',
    unitIds: ['3.2', '3.4', '3.6'],
    paper: 1,
    title: 'CareHome Services',
    scenario: 'CareHome Services employs 120 care workers. The National Minimum Wage is increasing. The business has thin profit margins. It is considering reducing hours, increasing prices to care home clients, or accepting lower profit.',
    data: 'Staff: 120 on NMW. NMW increase: 6%. Current wage bill: £1.2m. Profit margin: 3%.',
    questions: [
      { id: 'cs-nmw-q1', question: 'Define the term National Minimum Wage.', marks: 2, type: 'define', markScheme: [{ idea: 'Minimum hourly rate employers must pay', marks: 2 }], modelAnswer: 'The National Minimum Wage is the minimum hourly rate that employers must pay workers by law.' },
      { id: 'cs-nmw-q2', question: 'Explain one way the NMW increase could affect CareHome Services.', marks: 3, type: 'explain', markScheme: [{ idea: 'Cost increase, prices, or hours', marks: 1 }, { idea: 'Application', marks: 2 }], modelAnswer: 'The 6% increase would add roughly £72,000 to the wage bill. CareHome might have to increase prices to clients, reduce staff hours, or accept lower profit.' },
      { id: 'cs-nmw-q3', question: 'Evaluate how CareHome Services should respond to the NMW increase.', marks: 6, type: 'evaluate', markScheme: [{ idea: 'Options: prices, hours, profit', marks: 2 }, { idea: 'Stakeholder impact', marks: 2 }, { idea: 'Conclusion', marks: 2 }], modelAnswer: 'Raising prices may lose clients. Cutting hours may reduce quality of care. Accepting lower profit may not be sustainable. A combination might work: small price rise, efficiency gains, and modest profit reduction. Must comply with law.' },
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
  { id: 'calc-be-1', unitId: '3.6', type: 'breakEvenInterpret', scenario: 'A business has a break-even chart. The total revenue and total cost lines intersect at 400 units. Current output is 550 units. Identify the break-even level of output and the margin of safety.', inputs: { intersectionOutput: 400, currentOutput: 550 }, expected: { breakEvenOutput: 400, marginOfSafety: 150 }, formulaHint: 'Break-even output = where total revenue = total cost. Margin of safety = current output − break-even output', interpretationQuestion: 'What does the margin of safety tell the business?', interpretationAnswer: 'A margin of safety of 150 units means the business can sell 150 fewer units than current output before making a loss. It shows how much "buffer" the business has if sales fall.' },
  { id: 'calc-be-2', unitId: '3.6', type: 'breakEvenInterpret', scenario: 'Fixed costs £10,000; selling price £20; variable cost per unit £12. Calculate break-even output.', inputs: { fixedCost: 10000, price: 20, variableCostPerUnit: 12 }, expected: { contributionPerUnit: 8, breakEvenOutput: 1250 }, formulaHint: 'Contribution = Price − Variable cost. Break-even = Fixed costs ÷ Contribution', interpretationQuestion: 'If the business sold 1,500 units, what would the margin of safety be?', interpretationAnswer: 'Margin of safety = 1,500 − 1,250 = 250 units. The business can sell 250 fewer units before making a loss.' },
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
  { id: 'ev-3.1.3', unitId: '3.1', topicId: '3.1.3', question: 'Evaluate the importance of setting business aims and objectives.', modelAnswer: 'Objectives give direction, help measure success and guide decisions. They differ by business (start-up vs established, profit vs not-for-profit). Without objectives, a business may lack focus and waste resources. However, objectives can be too rigid if the environment changes; they need to be reviewed. Overall, clear objectives are important for planning and motivation.', breakdown: [{ type: 'idea', text: 'Objectives provide direction and measure success' }, { type: 'application', text: 'Vary by business type; need to be flexible' }, { type: 'evaluation', text: 'Conclusion: important but should be reviewed' }] },
  { id: 'ev-3.1.5', unitId: '3.1', topicId: '3.1.5', question: 'Evaluate the factors that influence where a business chooses to locate.', modelAnswer: 'Key factors: proximity to market (customers), raw materials, labour supply, competition and costs (rent, wages). A retailer may prioritise market and footfall; a manufacturer may prioritise materials and labour. The best location depends on the business type and priorities. Cost is important but access to skilled labour or customers may justify higher costs.', breakdown: [{ type: 'idea', text: 'Market, materials, labour, competition, costs' }, { type: 'application', text: 'Different businesses weight factors differently' }, { type: 'evaluation', text: 'Conclusion: depends on business type' }] },
  { id: 'ev-3.2.4', unitId: '3.2', topicId: '3.2.4', question: 'Evaluate the impact of globalisation on UK businesses.', modelAnswer: 'Benefits: access to wider markets, cheaper imports, opportunities to export. Drawbacks: more competition from abroad, exchange rate risk for importers/exporters. A stronger pound hurts exporters (UK goods dearer abroad) but helps importers (cheaper materials). Overall impact depends on whether the business primarily imports or exports and how it competes on design, quality and price.', breakdown: [{ type: 'idea', text: 'Globalisation = international competition and trade' }, { type: 'application', text: 'Exchange rates affect import/export profits' }, { type: 'evaluation', text: 'Conclusion: mixed impact; depends on business' }] },
  { id: 'ev-3.2.5', unitId: '3.2', topicId: '3.2.5', question: 'Evaluate the impact of legislation on a business.', modelAnswer: 'Legislation (NMW, Equality Act, HASAWA, consumer law) adds costs: higher wages, training, compliance. However, it can improve reputation, attract staff and reduce risk of fines or tribunals. A safe workplace may improve productivity. The impact depends on how well the business already complies and whether it can pass costs on. Overall, compliance is necessary; the question is how to manage the cost.', breakdown: [{ type: 'idea', text: 'Laws add costs but can bring benefits' }, { type: 'application', text: 'Costs: wages, training; benefits: reputation, safety' }, { type: 'evaluation', text: 'Conclusion: compliance necessary; manage cost' }] },
  { id: 'ev-3.3.2', unitId: '3.3', topicId: '3.3.2', question: 'Evaluate the benefits of JIT compared with JIC (Just in case) stock management.', modelAnswer: 'JIT: lower holding costs, less waste, less storage space; but requires reliable suppliers and can be risky if supply fails. JIC: buffer against uncertainty, production less likely to stop; but higher holding costs and storage. JIT suits stable demand and reliable supply; JIC suits unpredictable demand or unreliable suppliers. Choice depends on the business context.', breakdown: [{ type: 'idea', text: 'JIT = minimal stock; JIC = buffer stock' }, { type: 'application', text: 'JIT cheaper but risky; JIC safer but costly' }, { type: 'evaluation', text: 'Conclusion: depends on supply and demand' }] },
  { id: 'ev-3.3.3', unitId: '3.3', topicId: '3.3.3', question: 'Evaluate the costs and benefits of maintaining high quality.', modelAnswer: 'Costs: inspection, training, better materials, possible slow-down. Benefits: higher price, customer loyalty, reputation, fewer returns, fewer recalls. For some businesses quality is essential (e.g. food safety); for others it may be a differentiator. The balance depends on customer expectations and whether the business can charge for quality. Overall, quality usually pays but costs must be managed.', breakdown: [{ type: 'idea', text: 'Quality has costs and benefits' }, { type: 'application', text: 'Costs: inspection, materials; benefits: price, loyalty' }, { type: 'evaluation', text: 'Conclusion: usually worthwhile; manage costs' }] },
  { id: 'ev-3.3.4', unitId: '3.3', topicId: '3.3.4', question: 'Evaluate the importance of good customer service to a business.', modelAnswer: 'Benefits: satisfaction, loyalty, repeat business, positive word-of-mouth, ability to charge more. Poor service leads to lost customers and damage to reputation. However, good service has costs (training, staff time, helplines). The importance depends on the industry and competition. For service businesses it is central; for commodity products it may be less critical. Overall, most businesses benefit from prioritising customer service.', breakdown: [{ type: 'idea', text: 'Good service builds loyalty and reputation' }, { type: 'application', text: 'Costs vs benefits; varies by industry' }, { type: 'evaluation', text: 'Conclusion: usually important' }] },
  { id: 'ev-3.4.2', unitId: '3.4', topicId: '3.4.2', question: 'Evaluate the benefits of internal recruitment compared with external recruitment.', modelAnswer: 'Internal: knows business, faster, cheaper, motivates staff; but may leave gap, limit new ideas. External: fresh skills, new ideas, wider choice; but more costly, longer, may demotivate internal candidates. For a role requiring deep business knowledge, internal may be better; for new skills or change, external may be better. Depends on the vacancy and pool of internal talent.', breakdown: [{ type: 'idea', text: 'Internal = existing staff; external = new hire' }, { type: 'application', text: 'Pros and cons of each' }, { type: 'evaluation', text: 'Conclusion: depends on role and talent' }] },
  { id: 'ev-3.4.3', unitId: '3.4', topicId: '3.4.3', question: 'Evaluate the effectiveness of financial vs non-financial methods of motivation.', modelAnswer: 'Financial (pay, commission, profit sharing): directly addresses material needs; can be effective but costly. Non-financial (training, recognition, responsibility): can motivate without direct cost; some workers value development and praise. Different workers respond differently; a mix often works best. Pay alone may not sustain motivation; non-financial can build loyalty. Depends on the workforce and budget.', breakdown: [{ type: 'idea', text: 'Financial = pay; non-financial = recognition, development' }, { type: 'application', text: 'Each has pros and cons' }, { type: 'evaluation', text: 'Conclusion: mix often best' }] },
  { id: 'ev-3.4.4', unitId: '3.4', topicId: '3.4.4', question: 'Evaluate the benefits of on-the-job training compared with off-the-job training.', modelAnswer: 'On-the-job: cheaper, relevant to actual work, no absence; but may pass on bad habits, limited to existing skills. Off-the-job: new skills, qualifications, fresh ideas; but costly, staff absent, may leave after training. For routine skills, on-the-job is efficient; for new techniques or qualifications, off-the-job may be necessary. Depends on what is being learned and resources.', breakdown: [{ type: 'idea', text: 'On-the-job = learning while doing; off-the-job = external' }, { type: 'application', text: 'Costs and benefits of each' }, { type: 'evaluation', text: 'Conclusion: depends on training need' }] },
  { id: 'ev-3.5.4-price', unitId: '3.5', topicId: '3.5.4', question: 'Evaluate the suitability of price skimming for a new product.', modelAnswer: 'Skimming: high initial price to maximise profit from early adopters; works when product is unique or innovative. Benefits: recovers R&D, premium image. Drawbacks: may limit volume, attract competitors. Suitability depends on product uniqueness, competition and target market. For a genuinely new product with little competition, skimming can work; for a crowded market, penetration may be better.', breakdown: [{ type: 'idea', text: 'Skimming = high initial price' }, { type: 'application', text: 'Works for unique products; limites volume' }, { type: 'evaluation', text: 'Conclusion: depends on product and market' }] },
  { id: 'ev-3.5.4-place', unitId: '3.5', topicId: '3.5.4', question: 'Evaluate the benefits of e-commerce for a small retailer.', modelAnswer: 'Benefits: wider reach, 24/7 trading, lower premises cost, can compete with larger rivals. Drawbacks: delivery costs, competition from big players, need for IT and security. For a small retailer, e-commerce can open new markets and reduce reliance on footfall. However, competing with large online retailers is tough. Suitability depends on product type and whether the business can differentiate.', breakdown: [{ type: 'idea', text: 'E-commerce = selling online' }, { type: 'application', text: 'Wider reach vs competition' }, { type: 'evaluation', text: 'Conclusion: can help but competitive' }] },
  { id: 'ev-3.1.4', unitId: '3.1', topicId: '3.1.4', question: 'Evaluate the importance of considering stakeholder interests when making business decisions.', modelAnswer: 'Stakeholders (employees, customers, suppliers, community) have different interests. Ignoring them can lead to conflict, poor reputation or lost sales. However, satisfying all stakeholders is difficult; trade-offs exist. A business that balances stakeholder interests may build loyalty and reduce risk. Conclusion: stakeholder consideration is important for long-term success.', breakdown: [{ type: 'idea', text: 'Stakeholders have varied interests' }, { type: 'application', text: 'Trade-offs; benefits of engagement' }, { type: 'evaluation', text: 'Conclusion: balance matters' }] },
  { id: 'ev-3.2.1', unitId: '3.2', topicId: '3.2.1', question: 'Evaluate the impact of technology on a business.', modelAnswer: 'Benefits: e-commerce, faster communication, automation, data analysis, wider markets. Drawbacks: cost of investment, training, security risks, can replace jobs. Technology can give competitive advantage but requires investment and adaptation. Conclusion: impact is generally positive for those who adopt it effectively.', breakdown: [{ type: 'idea', text: 'Technology changes how businesses operate' }, { type: 'application', text: 'Pros and cons; depends on adoption' }, { type: 'evaluation', text: 'Conclusion: adopt strategically' }] },
  { id: 'ev-3.2.6', unitId: '3.2', topicId: '3.2.6', question: 'Evaluate how a business might respond to increased competition.', modelAnswer: 'Options: lower prices, improve quality, differentiate product, improve customer service, advertise more, innovate. Each has costs and benefits. Price cuts may reduce profit; quality improvements may attract customers but cost more. Conclusion: response depends on the business\'s strengths and the nature of competition.', breakdown: [{ type: 'idea', text: 'Competition requires strategic response' }, { type: 'application', text: 'Various strategies; trade-offs' }, { type: 'evaluation', text: 'Conclusion: match strategy to context' }] },
  { id: 'ev-3.3.1', unitId: '3.3', topicId: '3.3.1', question: 'Evaluate when job production is more appropriate than flow production.', modelAnswer: 'Job production: custom or one-off orders, low volume, high variety. Flow production: high volume, standardised product. Job production allows flexibility and premium pricing but has higher unit costs. Flow production has lower unit costs but less flexibility. Conclusion: choice depends on product type, demand and market.', breakdown: [{ type: 'idea', text: 'Job = custom; flow = mass' }, { type: 'application', text: 'Different contexts suit each' }, { type: 'evaluation', text: 'Conclusion: product and demand determine' }] },
  { id: 'ev-3.5.1', unitId: '3.5', topicId: '3.5.1', question: 'Evaluate the importance of understanding customer needs.', modelAnswer: 'Understanding needs helps: choose right product, set right price, target promotion, select distribution. Without it, businesses may waste resources on wrong products or miss opportunities. Market research has costs but reduces risk of failure. Conclusion: essential for effective marketing and business success.', breakdown: [{ type: 'idea', text: 'Needs drive product and marketing' }, { type: 'application', text: 'Research costs vs failure risk' }, { type: 'evaluation', text: 'Conclusion: investment pays off' }] },
  { id: 'ev-3.6.2', unitId: '3.6', topicId: '3.6.2', question: 'Evaluate strategies to improve cash flow.', modelAnswer: 'Strategies: chase debtors, delay paying creditors, reduce stock, arrange overdraft, increase prices, offer discounts for early payment. Each has trade-offs. Chasing debtors may upset customers; delaying creditors may harm supplier relations. Conclusion: mix of strategies; prioritise those that do not damage relationships.', breakdown: [{ type: 'idea', text: 'Cash flow = timing of money' }, { type: 'application', text: 'Various strategies; side effects' }, { type: 'evaluation', text: 'Conclusion: balance short-term and long-term' }] },
  { id: 'ev-3.6.4', unitId: '3.6', topicId: '3.6.4', question: 'Evaluate the importance of comparing gross and net profit margins.', modelAnswer: 'Gross margin shows control of cost of sales; net margin shows overall profitability after all expenses. A business can have good gross margin but poor net margin if operating expenses are high. Comparing both helps identify where to cut costs. Conclusion: both are important for different insights.', breakdown: [{ type: 'idea', text: 'Gross = before operating; net = after all' }, { type: 'application', text: 'Each reveals different cost issues' }, { type: 'evaluation', text: 'Conclusion: use both' }] },
  { id: 'ev-3.5.2', unitId: '3.5', topicId: '3.5.2', question: 'Evaluate the benefits of market segmentation.', modelAnswer: 'Benefits: target marketing more effectively, tailor product and price to each segment, increase customer satisfaction. Drawbacks: can be costly to serve many segments, may miss customers outside segments. Conclusion: segmentation usually improves marketing effectiveness if segments are meaningful.', breakdown: [{ type: 'idea', text: 'Segmentation = dividing market' }, { type: 'application', text: 'Targeting vs cost' }, { type: 'evaluation', text: 'Conclusion: usually beneficial' }] },
  { id: 'ev-3.5.3', unitId: '3.5', topicId: '3.5.3', question: 'Evaluate the benefits of primary vs secondary research.', modelAnswer: 'Primary: specific to business, up to date, but costly and time-consuming. Secondary: cheap, quick, but may not fit the business and could be outdated. Conclusion: often use secondary first to understand the market, then primary for specific questions.', breakdown: [{ type: 'idea', text: 'Primary = own data; secondary = existing' }, { type: 'application', text: 'Cost vs relevance' }, { type: 'evaluation', text: 'Conclusion: combine both' }] },
  { id: 'ev-3.4.1', unitId: '3.4', topicId: '3.4.1', question: 'Evaluate the benefits of a flat structure compared with a tall structure.', modelAnswer: 'Flat: faster communication, lower costs, more delegation; but wider span of control can overload managers. Tall: clearer promotion path, narrower span; but slower decisions, higher costs. Conclusion: flat often suits small, dynamic businesses; tall may suit large, complex organisations.', breakdown: [{ type: 'idea', text: 'Flat = few levels; tall = many' }, { type: 'application', text: 'Speed vs control' }, { type: 'evaluation', text: 'Conclusion: depends on size and context' }] },
  { id: 'ev-3.1.6', unitId: '3.1', topicId: '3.1.6', question: 'Evaluate the importance of a business plan for a start-up.', modelAnswer: 'Benefits: clarifies aims, helps secure finance, identifies risks, guides decisions. Drawbacks: takes time, may become outdated, cannot predict everything. Conclusion: a business plan is valuable for planning and finance, but should be reviewed regularly.', breakdown: [{ type: 'idea', text: 'Plan = roadmap and forecast' }, { type: 'application', text: 'Usefulness vs limitations' }, { type: 'evaluation', text: 'Conclusion: important but flexible' }] },
  { id: 'ev-3.3.1-b', unitId: '3.3', topicId: '3.3.1', question: 'Evaluate when batch production is more appropriate than job or flow production.', modelAnswer: 'Batch: makes groups of similar items; suits medium demand, some variety. More flexible than flow, more efficient than job. Conclusion: batch fits when demand is moderate and product has some variation (e.g. different colours, sizes).', breakdown: [{ type: 'idea', text: 'Batch = groups of similar' }, { type: 'application', text: 'Between job and flow' }, { type: 'evaluation', text: 'Conclusion: medium volume, some variety' }] },
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

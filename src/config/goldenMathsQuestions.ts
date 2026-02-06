/**
 * Golden Maths Question List — machine-readable spec
 *
 * Definitive GCSE Maths backbone. Aligned with GOLDEN_MATHS_QUESTION_LIST.md.
 * ID scheme: F1-xx (Foundation Paper 1), F2-xx, F3-xx, H1-xx, H2-xx, H3-xx.
 * Paper 1 = non-calculator; Paper 2 & 3 = calculator allowed unless overridden.
 */

export type GoldenQuestionType =
  | 'numeric'
  | 'numericWithTolerance'
  | 'multiNumeric'
  | 'expression'
  | 'fill'
  | 'tableFill'
  | 'match'
  | 'dragMatch'
  | 'label'
  | 'orderSteps'
  | 'graphPlot'
  | 'graphRead'
  | 'inequalityPlot'
  | 'proofShort'
  | 'geometryConstruct'
  | 'short';

export type GoldenDiagramType =
  | 'none'
  | 'coordinateGrid'
  | 'numberLine'
  | 'triangle'
  | 'polygon'
  | 'circle'
  | 'compoundShape'
  | 'barChart'
  | 'scatterPlot'
  | 'histogram'
  | 'boxPlot'
  | 'bearingDiagram'
  | 'vectorDiagram'
  | 'pieChart';

export interface GoldenMathsQuestion {
  id: string;
  prompt: string;
  type: GoldenQuestionType;
  paper: 1 | 2 | 3;
  tier: 'foundation' | 'higher';
  calculator?: boolean;
  diagram?: GoldenDiagramType;
  answers: string | string[];
  marks?: number;
  timeAllowanceSec?: number;
  hint?: string;
  explanation?: string;
}

/** Foundation Paper 1 (non-calculator) */
const F1: GoldenMathsQuestion[] = [
  { id: 'F1-01', prompt: 'Work out 18 − 3 × (4 + 2)', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '0' },
  { id: 'F1-02', prompt: '2³ × 5', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '40' },
  { id: 'F1-03', prompt: '−7 + 12', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '5' },
  { id: 'F1-04', prompt: '3.6 × 0.4', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '1.44' },
  { id: 'F1-05', prompt: 'Find 3/5 of 240', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '144' },
  { id: 'F1-06', prompt: 'Simplify 18/24', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '3/4' },
  { id: 'F1-07', prompt: '3/4 + 1/8', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '7/8' },
  { id: 'F1-08', prompt: 'Find 12% of £250', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '30' },
  { id: 'F1-09', prompt: 'Simplify 18 : 24', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '3:4' },
  { id: 'F1-10', prompt: 'Share £72 in ratio 5 : 3', type: 'multiNumeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '45,27' },
  { id: 'F1-11', prompt: 'Evaluate 2x + 7 when x = −4', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '-1' },
  { id: 'F1-12', prompt: 'Simplify 3a + 5a − 2', type: 'expression', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '8a-2' },
  { id: 'F1-13', prompt: 'Expand 4(x − 3)', type: 'expression', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '4x-12' },
  { id: 'F1-14', prompt: 'Factorise 6x + 9', type: 'expression', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '3(2x+3)' },
  { id: 'F1-15', prompt: 'x − 9 = 15', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '24' },
  { id: 'F1-16', prompt: '4x + 3 = 27', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '6' },
  { id: 'F1-17', prompt: '2x + 5 < 13', type: 'short', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '4' },
  { id: 'F1-18', prompt: 'State the coordinates of point P', type: 'multiNumeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'coordinateGrid', answers: '3,2' },
  { id: 'F1-19', prompt: 'Complete table for y = 2x − 1', type: 'tableFill', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '' },
  { id: 'F1-20', prompt: 'Two angles are (3x+10)° and (2x+30)°. Find x', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '28' },
  { id: 'F1-21', prompt: 'Angles are 52° and 71°. Find third angle', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '57' },
  { id: 'F1-22', prompt: 'Base 12 cm, height 7 cm. Find area', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '42' },
  { id: 'F1-23', prompt: 'Find perimeter of L-shape', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'compoundShape', answers: '' },
  { id: 'F1-24', prompt: 'Bag has 5 red, 3 blue, 2 green. Find P(blue)', type: 'fill', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '3/10' },
  { id: 'F1-25', prompt: 'Find mean from frequency table', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '' },
  { id: 'F1-26', prompt: 'Read values from bar chart', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'barChart', answers: '' },
];

/** Foundation Paper 2 (calculator) */
const F2: GoldenMathsQuestion[] = [
  { id: 'F2-01', prompt: '£84 is 70% of a value. Find original value', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '120' },
  { id: 'F2-02', prompt: 'Increase £80 to £92. Find % increase', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '15' },
  { id: 'F2-03', prompt: 'Write 3.4 × 10⁶ as an ordinary number', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '3400000' },
  { id: 'F2-04', prompt: '5.2 rounded to 1 dp. State lower bound', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '5.15' },
  { id: 'F2-05', prompt: 'Estimate (49.8 × 6.1) ÷ 2.9', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '105' },
  { id: 'F2-06', prompt: 'Plot y = 2x + 1', type: 'graphPlot', paper: 2, tier: 'foundation', calculator: true, diagram: 'coordinateGrid', answers: '' },
  { id: 'F2-07', prompt: 'Find gradient', type: 'graphRead', paper: 2, tier: 'foundation', calculator: true, diagram: 'coordinateGrid', answers: '2' },
  { id: 'F2-08', prompt: 'Solve y = 2x + 1 and y = 7', type: 'graphRead', paper: 2, tier: 'foundation', calculator: true, diagram: 'coordinateGrid', answers: '3' },
  { id: 'F2-09', prompt: 'Radius = 6 cm. Find circumference (1 dp)', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'circle', answers: '37.7' },
  { id: 'F2-10', prompt: 'Radius = 4 cm. Find area', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'circle', answers: '50.3' },
  { id: 'F2-11', prompt: '8 × 5 × 3 cm (volume of cuboid)', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '120' },
  { id: 'F2-12', prompt: 'Bearing of B from A is 065°. Draw and find angle', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'bearingDiagram', answers: '' },
  { id: 'F2-13', prompt: 'Describe correlation and identify outlier', type: 'short', paper: 2, tier: 'foundation', calculator: true, diagram: 'scatterPlot', answers: '' },
  { id: 'F2-14', prompt: 'Find fraction represented', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'pieChart', answers: '' },
];

/** Foundation Paper 3 (calculator) — mixed/problem solving */
const F3: GoldenMathsQuestion[] = [
  { id: 'F3-01', prompt: 'Shop A sells 3 items for £2.40. Shop B sells 5 items for £3.50. Which shop offers better value? Show your working.', type: 'short', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: 'Shop B' },
  { id: 'F3-02', prompt: 'A car travels 180 km in 2.5 hours. Calculate the average speed in km/h.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '72' },
  { id: 'F3-03', prompt: 'Find the area of this compound shape. All measurements are in cm.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'compoundShape', answers: '' },
  { id: 'F3-04', prompt: 'Solve 2.5x + 1.3 = 8.8', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '3' },
  { id: 'F3-05', prompt: 'A bag contains 4 red and 6 blue counters. One counter is taken and not replaced. Then another is taken. Find the probability that both counters are red.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '2/15' },
  { id: 'F3-06', prompt: 'Find the mean from this grouped frequency table.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '' },
  { id: 'F3-07', prompt: 'A distance-time graph shows a journey. Describe what happens between 30 minutes and 60 minutes.', type: 'short', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '' },
  { id: 'F3-08', prompt: 'A sum of money is shared in the ratio 3:5. The larger share is £120. The total is then increased by 20%. Find the new total.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '192' },
];

/** Higher Paper 1 (non-calculator) */
const H1: GoldenMathsQuestion[] = [
  { id: 'H1-01', prompt: 'Expand (2x − 3)(x + 5)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '2x^2+7x-15' },
  { id: 'H1-02', prompt: 'Factorise x² + 7x + 10', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '(x+2)(x+5)' },
  { id: 'H1-03', prompt: 'x² + 7x + 10 = 0', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '-2,-5' },
  { id: 'H1-04', prompt: 'Rewrite x² − 6x + 5 (complete the square)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '(x-3)^2-4' },
  { id: 'H1-05', prompt: 'Simplify (x² − 9)/(x² + 3x)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '(x-3)/x' },
  { id: 'H1-06', prompt: '2x + y = 11, x − y = 1', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '4,3' },
  { id: 'H1-07', prompt: 'Simplify √72', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '6√2' },
  { id: 'H1-08', prompt: '5/(3 − √2) (rationalise)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '(15+5√2)/7' },
  { id: 'H1-09', prompt: 'Angle in a semicircle', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'circle', answers: '90' },
  { id: 'H1-10', prompt: 'Similar triangles: find missing length', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'triangle', answers: '' },
];

/** Higher Paper 2 (calculator) */
const H2: GoldenMathsQuestion[] = [
  { id: 'H2-01', prompt: '3x² − 5x − 2 = 0 (2 dp)', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '2,-0.33' },
  { id: 'H2-02', prompt: 'Find turning point of y = x² − 6x + 5', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '3,-4' },
  { id: 'H2-03', prompt: 'Solve x² = 3x + 4 graphically', type: 'graphRead', paper: 2, tier: 'higher', calculator: true, diagram: 'coordinateGrid', answers: '-1,4' },
  { id: 'H2-04', prompt: 'Solve x² − 5x + 6 > 0', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: 'x<2,x>3' },
  { id: 'H2-05', prompt: 'Pythagoras: legs 7 and 24 cm', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '25' },
  { id: 'H2-06', prompt: 'SOHCAHTOA: angle = 38°, adjacent = 12 cm', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '' },
  { id: 'H2-07', prompt: 'Sine rule: a=8, A=35°, B=72°. Find b', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '' },
  { id: 'H2-08', prompt: 'Cosine rule: a=7, b=9, C=120°', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '13.2' },
  { id: 'H2-09', prompt: 'Histograms: find frequency', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'histogram', answers: '' },
  { id: 'H2-10', prompt: 'Cumulative frequency: find median', type: 'graphRead', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '' },
];

/** Higher Paper 3 (calculator) — problem solving / grade 8–9 */
const H3: GoldenMathsQuestion[] = [
  { id: 'H3-01', prompt: 'Use iteration with the formula x_{n+1} = √(x_n + 3) to find a solution to x² = x + 3. Start with x₁ = 2. Find x₃ to 2 decimal places.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '' },
  { id: 'H3-02', prompt: 'Points A, B, and C have position vectors a = (3, 4), b = (7, 1), and c = (2, 8). Find the position vector of point D such that ABCD is a parallelogram.', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'vectorDiagram', answers: '' },
  { id: 'H3-03', prompt: 'Prove that the sum of three consecutive integers is always divisible by 3.', type: 'proofShort', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '' },
  { id: 'H3-04', prompt: 'A number is rounded to 2.4 to 1 decimal place. Prove that the original number could be 2.35.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '' },
  { id: 'H3-05', prompt: 'In a circle, angle ABC = 90° where A, B, and C are points on the circumference. Point O is the centre. Find angle AOC.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'circle', answers: '180' },
  { id: 'H3-06', prompt: 'A bag contains 5 red and 3 blue balls. Two balls are drawn without replacement. Find the probability that both balls are red.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '5/14' },
  { id: 'H3-07', prompt: 'Compare the distributions shown in the box plots. State which has the greater interquartile range and explain your answer.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'boxPlot', answers: '' },
  { id: 'H3-08', prompt: 'f(x) = 2x + 1 and g(x) = x². Find fg(x) in simplest form.', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '2x^2+1' },
  { id: 'H3-09', prompt: 'f(x) = 3x - 5. Find f⁻¹(x).', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '(x+5)/3' },
  { id: 'H3-10', prompt: 'A rectangle has length (2x + 3) cm and width (x - 1) cm. The area is 45 cm². Form and solve an equation to find x.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '4' },
];

export const GOLDEN_MATHS_QUESTIONS: GoldenMathsQuestion[] = [
  ...F1,
  ...F2,
  ...F3,
  ...H1,
  ...H2,
  ...H3,
];

/** Diagram type to engine templateId. Maps to canonical diagram type IDs that resolve to full template IDs. */
export const GOLDEN_DIAGRAM_TO_TEMPLATE_ID: Record<GoldenDiagramType, string> = {
  none: '',
  coordinateGrid: 'coordinateGrid', // Resolves to 'math.graphs.coordinate_point.v1'
  numberLine: 'numberLine', // Resolves to 'math.algebra.number_line.v1'
  triangle: 'triangle', // Resolves to 'math.geometry.triangle.v1'
  polygon: 'polygon', // Resolves to 'math.polygons.interior_exterior.v1'
  circle: 'circle', // Resolves to 'math.circle.basic.v1'
  compoundShape: 'compoundShape', // Resolves to 'math.geometry.compound_lshape.v1'
  barChart: 'barChart', // Resolves to 'math.statistics.bar_chart.v1'
  scatterPlot: 'scatterPlot', // Resolves to 'math.statistics.scatter_plot.v1'
  histogram: 'histogram', // Resolves to 'math.statistics.histogram.v1'
  boxPlot: 'boxPlot', // Resolves to 'math.statistics.boxplot.v1'
  bearingDiagram: 'bearingDiagram', // Resolves to 'math.bearings.north_arrow.v1'
  vectorDiagram: 'vectorDiagram', // Resolves to 'math.vectors.diagram.v1'
  pieChart: 'barChart', // Falls back to barChart until pie template exists
};

/** Get calculator allowed by default for a paper (1 = no, 2 & 3 = yes). */
export function calculatorAllowedForPaper(paper: 1 | 2 | 3): boolean {
  return paper !== 1;
}

/** All Golden Maths question ids in order (for validation / ordering). */
export function getGoldenMathsQuestionIds(): string[] {
  return GOLDEN_MATHS_QUESTIONS.map(q => q.id);
}

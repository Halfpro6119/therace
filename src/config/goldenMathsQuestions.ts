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
  | 'pieChart'
  | 'vennDiagram'
  | 'treeDiagram'
  | 'cumulativeFrequency'
  | 'prePlottedGraph';

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
  /** Optional meta for grading (e.g. tableFill rows). Merged into prompt meta when seeding. */
  questionData?: Record<string, unknown>;
  /**
   * Per-prompt diagram params for dynamic diagrams/data.
   * When set, merged into diagram_metadata.params at seed time so the diagram is fixed.
   * Use with answers to enable auto-grading of diagram-dependent questions.
   */
  diagramParams?: Record<string, unknown>;
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
  { id: 'F1-19', prompt: 'Complete the table for y = 2x − 1 when x = −1, 0, 1, 2', type: 'tableFill', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '-3,-1,1,3', questionData: { rows: [ { x: '-1', y: '-3' }, { x: '0', y: '-1' }, { x: '1', y: '1' }, { x: '2', y: '3' } ], columnLabels: { x: 'x', y: 'y' } } },
  { id: 'F1-20', prompt: 'Two angles are (3x+10)° and (2x+30)°. Find x', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '28' },
  { id: 'F1-21', prompt: 'Angles are 52° and 71°. Find third angle', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '57' },
  { id: 'F1-22', prompt: 'Base 12 cm, height 7 cm. Find area', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '42' },
  { id: 'F1-23', prompt: 'Find perimeter of L-shape', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'compoundShape', answers: '' },
  { id: 'F1-24', prompt: 'Bag has 5 red, 3 blue, 2 green. Find P(blue)', type: 'fill', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '3/10' },
  { id: 'F1-25', prompt: 'Find the mean of the data from the frequency table: Value 1 (freq 5), Value 2 (freq 10), Value 3 (freq 5).', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'none', answers: '2' },
  { id: 'F1-26', prompt: 'Read the frequency for each category from the bar chart.', type: 'numeric', paper: 1, tier: 'foundation', calculator: false, diagram: 'barChart', answers: '' },
];

/** Foundation Paper 2 (calculator) */
const F2: GoldenMathsQuestion[] = [
  { id: 'F2-01', prompt: '£84 is 70% of a value. Find original value', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '120' },
  { id: 'F2-02', prompt: 'Increase £80 to £92. Find % increase', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '15' },
  { id: 'F2-03', prompt: 'Write 3.4 × 10⁶ as an ordinary number', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '3400000' },
  { id: 'F2-04', prompt: '5.2 rounded to 1 dp. State lower bound', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '5.15' },
  { id: 'F2-05', prompt: 'Estimate (49.8 × 6.1) ÷ 2.9', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '105' },
  { id: 'F2-06', prompt: 'Plot y = 2x + 1', type: 'graphPlot', paper: 2, tier: 'foundation', calculator: true, diagram: 'coordinateGrid', answers: '' },
  { id: 'F2-07', prompt: 'Find the gradient of the line.', type: 'graphRead', paper: 2, tier: 'foundation', calculator: true, diagram: 'coordinateGrid', answers: '2' },
  { id: 'F2-08', prompt: 'Solve y = 2x + 1 and y = 7', type: 'graphRead', paper: 2, tier: 'foundation', calculator: true, diagram: 'coordinateGrid', answers: '3' },
  { id: 'F2-09', prompt: 'Radius = 6 cm. Find circumference (1 dp)', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'circle', answers: '37.7', diagramParams: { values: { radius: 6 }, labels: { radiusLabel: '6 cm' } } },
  { id: 'F2-10', prompt: 'Radius = 4 cm. Find area', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'circle', answers: '50.3', diagramParams: { values: { radius: 4 }, labels: { radiusLabel: '4 cm' } } },
  { id: 'F2-11', prompt: '8 × 5 × 3 cm (volume of cuboid)', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'none', answers: '120' },
  { id: 'F2-12', prompt: 'Bearing of B from A is 065°. Draw and find angle', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'bearingDiagram', answers: '', diagramParams: { values: { bearing: 65 } } },
  { id: 'F2-13', prompt: 'Describe correlation and identify outlier', type: 'short', paper: 2, tier: 'foundation', calculator: true, diagram: 'scatterPlot', answers: '' },
  { id: 'F2-14', prompt: 'Find the fraction of the circle represented by the shaded sector.', type: 'numeric', paper: 2, tier: 'foundation', calculator: true, diagram: 'pieChart', answers: '' },
];

/** Foundation Paper 3 (calculator) — mixed/problem solving */
const F3: GoldenMathsQuestion[] = [
  { id: 'F3-01', prompt: 'Shop A sells 3 items for £2.40. Shop B sells 5 items for £3.50. Which shop offers better value? Show your working.', type: 'short', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: 'Shop B' },
  { id: 'F3-02', prompt: 'A car travels 180 km in 2.5 hours. Calculate the average speed in km/h.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '72' },
  { id: 'F3-03', prompt: 'Find the area of this compound shape. All measurements are in cm.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'compoundShape', answers: '' },
  { id: 'F3-04', prompt: 'Solve 2.5x + 1.3 = 8.8', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '3' },
  { id: 'F3-05', prompt: 'A bag contains 4 red and 6 blue counters. One counter is taken and not replaced. Then another is taken. Find the probability that both counters are red.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '2/15' },
  { id: 'F3-06', prompt: 'Find the mean from this grouped frequency table: 0–10 (freq 5), 10–20 (freq 8), 20–30 (freq 7). Use midpoints 5, 15, 25.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '16' },
  { id: 'F3-07', prompt: 'A car travels at 60 km/h for 30 minutes, then stops for 20 minutes, then continues at 40 km/h. Describe what the distance-time graph shows between 30 and 60 minutes.', type: 'short', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: ['stationary', 'stopped', 'no movement', 'flat', 'at rest', 'not moving'] },
  { id: 'F3-08', prompt: 'A sum of money is shared in the ratio 3:5. The larger share is £120. The total is then increased by 20%. Find the new total.', type: 'numeric', paper: 3, tier: 'foundation', calculator: true, diagram: 'none', answers: '192' },
];

/** Higher Paper 1 (non-calculator) — 80 golden questions */
const H1: GoldenMathsQuestion[] = [
  // Number & Indices (1–12)
  { id: 'H1-01', prompt: 'Work out 5 + 2³ × 3', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '29' },
  { id: 'H1-02', prompt: 'Write 0.00036 in standard form', type: 'fill', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '3.6×10^-4' },
  { id: 'H1-03', prompt: 'Write 4.2 × 10⁵ as an ordinary number', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '420000' },
  { id: 'H1-04', prompt: 'Simplify 3⁴ ÷ 3²', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '9' },
  { id: 'H1-05', prompt: 'Simplify 2⁻³', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '1/8' },
  { id: 'H1-06', prompt: 'Simplify √50', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '5√2' },
  { id: 'H1-07', prompt: 'Rationalise 5/(√3 × √5)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '√15/3' },
  { id: 'H1-08', prompt: 'Find the HCF of 84 and 126', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '42' },
  { id: 'H1-09', prompt: 'Write 180 as a product of prime factors', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '2²×3²×5' },
  { id: 'H1-10', prompt: 'Find the LCM of 12 and 18', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '36' },
  { id: 'H1-11', prompt: 'Estimate (49.8 × 6.2) ÷ 2.1', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '150' },
  { id: 'H1-12', prompt: 'Write 7/8 as a percentage', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '87.5' },
  // Algebra: Manipulation (13–32)
  { id: 'H1-13', prompt: 'Simplify 4a + 3b − 2a + 5b', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '2a+8b' },
  { id: 'H1-14', prompt: 'Expand (2x − 3)(x + 5)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '2x^2+7x-15' },
  { id: 'H1-15', prompt: 'Expand and simplify (x + 4)²', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'x^2+8x+16' },
  { id: 'H1-16', prompt: 'Factorise x² + 9x + 20', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '(x+4)(x+5)' },
  { id: 'H1-17', prompt: 'Factorise 6x² − 15x', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '3x(2x-5)' },
  { id: 'H1-18', prompt: 'Simplify (6x²)/(3x)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '2x' },
  { id: 'H1-19', prompt: 'Simplify (x² − 9)/(x + 3)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'x-3' },
  { id: 'H1-20', prompt: 'Make x the subject: y = 5x − 7', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '(y+7)/5' },
  { id: 'H1-21', prompt: 'Make r the subject: V = (4/3)πr³', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '∛(3V/(4π))' },
  { id: 'H1-22', prompt: 'Solve 4x − 7 = 21', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '7' },
  { id: 'H1-23', prompt: 'Solve 3(x − 4) = 18', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '10' },
  { id: 'H1-24', prompt: 'Solve 2x² = 18', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '3,-3' },
  { id: 'H1-25', prompt: 'Solve x² − 7x = 0', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '0,7' },
  { id: 'H1-26', prompt: 'Solve x² + 5x + 6 = 0', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '-2,-3' },
  { id: 'H1-27', prompt: 'Solve 2x² − 8 = 0', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '2,-2' },
  { id: 'H1-28', prompt: 'Solve 5x − 3 < 12', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'x<3' },
  { id: 'H1-29', prompt: 'Solve −2x ≤ 6', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'x≥-3' },
  { id: 'H1-30', prompt: 'Write the nth term of 4, 7, 10, 13, …', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '3n+1' },
  { id: 'H1-31', prompt: 'Write the nth term of 1, 4, 9, 16, …', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'n^2' },
  { id: 'H1-32', prompt: 'The nth term is 3n + 2. Find the 15th term', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '47' },
  // Graphs & Coordinates (33–45)
  { id: 'H1-33', prompt: 'Find the gradient between (2, 5) and (6, −3)', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '-2' },
  { id: 'H1-34', prompt: 'Find the equation of the line with gradient 3 passing through (1, −2)', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'y=3x-5' },
  { id: 'H1-35', prompt: 'State the coordinates of point A', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'coordinateGrid', answers: '3,2', diagramParams: { values: { pointX: 3, pointY: 2 }, labels: { pointLabel: 'A' } } },
  { id: 'H1-36', prompt: 'Complete the table for y = x² − 1 when x = −2, −1, 0, 1, 2', type: 'tableFill', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '3,0,-1,0,3', questionData: { rows: [ { x: '-2', y: '3' }, { x: '-1', y: '0' }, { x: '0', y: '-1' }, { x: '1', y: '0' }, { x: '2', y: '3' } ], columnLabels: { x: 'x', y: 'y' } } },
  { id: 'H1-37', prompt: 'Sketch y = x²', type: 'graphPlot', paper: 1, tier: 'higher', calculator: false, diagram: 'coordinateGrid', answers: ['parabola through (0,0)', 'minimum at origin', 'u-shaped through origin'], questionData: { expectedPoints: [{ x: 0, y: 0 }, { x: -2, y: 4 }, { x: 2, y: 4 }], coordinateTolerance: 0.6 } },
  { id: 'H1-38', prompt: 'Describe the transformation from y = x² to y = (x − 3)²', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'translation 3 right' },
  { id: 'H1-39', prompt: 'Solve x² = 4 graphically', type: 'graphRead', paper: 1, tier: 'higher', calculator: false, diagram: 'coordinateGrid', answers: '2,-2' },
  { id: 'H1-40', prompt: 'Solve y = 2x + 1 and y = 7', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '3' },
  { id: 'H1-41', prompt: 'Find the y-intercept of y = −3x + 5', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '5' },
  { id: 'H1-42', prompt: 'State the axis of symmetry of y = x² − 6x + 1', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'x=3' },
  { id: 'H1-43', prompt: 'Solve x² − 6x + 8 = 0 by factorising', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '2,4' },
  { id: 'H1-44', prompt: 'Write y = x² − 4x + 7 in completed square form', type: 'expression', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '(x-2)^2+3' },
  { id: 'H1-45', prompt: 'Find the minimum value of y = x² − 4x + 7', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '3' },
  // Geometry & Trigonometry (46–65)
  { id: 'H1-46', prompt: 'Angles on a straight line are (3x + 10)° and (2x + 30)°. Find x', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '28' },
  { id: 'H1-47', prompt: 'Find the missing angle in a triangle', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'triangle', answers: '70', diagramParams: { templateId: 'math.triangle.basic_angles.v1', values: { angleA: 50, angleB: 60, angleC: 70 }, visibility: { showAngleC: false } } },
  { id: 'H1-48', prompt: 'Find the interior angle of a regular pentagon', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '108' },
  { id: 'H1-49', prompt: 'A shape is enlarged by scale factor −2. Describe the transformation', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: 'enlargement scale factor 2, centre (0,0), reflection' },
  { id: 'H1-50', prompt: 'Reflect point A in the y-axis', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'coordinateGrid', answers: '-3,2', diagramParams: { values: { pointX: 3, pointY: 2 }, labels: { pointLabel: 'A' } } },
  { id: 'H1-51', prompt: 'Rotate triangle ABC 90° clockwise about the origin', type: 'geometryConstruct', paper: 1, tier: 'higher', calculator: false, diagram: 'coordinateGrid', answers: ['90° clockwise about (0,0)', 'rotation 90° clockwise', 'rotated 90° clockwise about origin'], questionData: { expectedPoints: [{ x: 1, y: -2 }, { x: 1, y: -4 }, { x: 3, y: -2 }], coordinateTolerance: 0.6 } },
  { id: 'H1-52', prompt: 'Find the area of a trapezium with parallel sides 5 cm and 9 cm and height 4 cm', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '28' },
  { id: 'H1-53', prompt: 'Find the perimeter of a compound shape', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'compoundShape', answers: '32', diagramParams: { values: { width1: 8, height1: 4, width2: 4, height2: 6 } } },
  { id: 'H1-54', prompt: 'Find the circumference of a circle with diameter 14 cm', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '14π' },
  { id: 'H1-55', prompt: 'Find the area of a circle with radius 7 cm', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '49π' },
  { id: 'H1-56', prompt: 'Use Pythagoras to find the hypotenuse', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'triangle', answers: '5', diagramParams: { values: { sideAB: 3, sideBC: 4, sideAC: 5 } } },
  { id: 'H1-57', prompt: 'Use Pythagoras to find a shorter side', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'triangle', answers: '4', diagramParams: { values: { sideAB: 5, sideBC: 3, sideAC: 4 } } },
  { id: 'H1-58', prompt: 'In a right-angled triangle, sin 30° = x/10. Find x', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '5' },
  { id: 'H1-59', prompt: 'Use exact trig values to find cos 60°', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '1/2' },
  { id: 'H1-60', prompt: 'Find the bearing of B from A', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'bearingDiagram', answers: '65', diagramParams: { values: { bearing: 65 }, visibility: { showBearingLabel: false } } },
  // Probability & Statistics (66–80)
  { id: 'H1-61', prompt: 'A bag has 3 red and 5 blue counters. Find P(red)', type: 'fill', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '3/8' },
  { id: 'H1-62', prompt: 'Two counters drawn with replacement. Find probability both are blue', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '25/64' },
  { id: 'H1-63', prompt: 'Complete the frequency table. Values 1, 2, 3. Total frequency 30. Frequencies are in ratio 2 : 3 : 1. Fill in the three frequencies.', type: 'tableFill', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '10,15,5', questionData: { rows: [ { value: '1', frequency: '10' }, { value: '2', frequency: '15' }, { value: '3', frequency: '5' } ], columnLabels: { value: 'Value', frequency: 'Frequency' } } },
  { id: 'H1-64', prompt: 'Find the mean from a frequency table: value 1 (freq 3), 2 (freq 5), 3 (freq 2)', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '1.9' },
  { id: 'H1-65', prompt: 'Find the median from the list 2, 5, 7, 8, 9', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '7' },
  { id: 'H1-66', prompt: 'Find the range of 3, 7, 8, 12, 15', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '12' },
  { id: 'H1-67', prompt: 'Describe correlation', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'scatterPlot', answers: ['positive', 'positive correlation', 'negative', 'negative correlation', 'no correlation', 'weak positive', 'strong positive'] },
  { id: 'H1-68', prompt: 'Identify an outlier', type: 'multiNumeric', paper: 1, tier: 'higher', calculator: false, diagram: 'scatterPlot', answers: '10,4', diagramParams: { values: { points: '[{"x":2,"y":3},{"x":4,"y":5},{"x":5,"y":6},{"x":7,"y":8},{"x":8,"y":9},{"x":10,"y":4}]' } } },
  { id: 'H1-69', prompt: 'Find frequency from a histogram', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'histogram', answers: '20', diagramParams: { values: { classes: '[{"start":0,"end":10,"frequency":20,"frequencyDensity":2},{"start":10,"end":20,"frequency":30,"frequencyDensity":3},{"start":20,"end":40,"frequency":40,"frequencyDensity":2}]' }, visibility: { showFrequencies: true } } },
  { id: 'H1-70', prompt: 'Compare two box plots', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'boxPlot', answers: ['A has a higher median', 'B has a greater spread', 'similar median', 'different IQR', 'one has a higher median than the other'] },
  { id: 'H1-71', prompt: 'Find the probability from a Venn diagram', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'vennDiagram', answers: '0.25', diagramParams: { labels: { onlyA: '3', onlyB: '5', intersection: '2', outside: '10' } } },
  {
    id: 'H1-72',
    prompt: '18 people were asked whether they like tea (A) or coffee (B). The numbers 5, 3, 2, 8 represent counts for: A only, B only, A and B, Neither. Drag each number to the correct region of the Venn diagram.',
    type: 'dragMatch',
    paper: 1,
    tier: 'higher',
    calculator: false,
    diagram: 'vennDiagram',
    answers: 'v1Aonly,v2Bonly,v3AandB,v4Neither',
    questionData: {
      leftItems: [
        { id: 'v1', text: '5' },
        { id: 'v2', text: '3' },
        { id: 'v3', text: '2' },
        { id: 'v4', text: '8' },
      ],
      rightItems: [
        { id: 'Aonly', text: 'A only' },
        { id: 'Bonly', text: 'B only' },
        { id: 'AandB', text: 'A and B' },
        { id: 'Neither', text: 'Neither' },
      ],
    },
  },
  { id: 'H1-73', prompt: 'P(A)=0.3, P(B)=0.5, P(A∩B)=0.1. Find P(A∪B)', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '0.7' },
  { id: 'H1-74', prompt: 'Probabilities are 0.2, 0.35 and p. They add to 1. Find p', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '0.45' },
  { id: 'H1-75', prompt: 'Tree diagram: first branch 1/2 and 1/2, second branches 1/3 and 2/3. Find P(both second branch 2/3 path)', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'treeDiagram', answers: '1/3' },
  { id: 'H1-76', prompt: 'P(A)=0.4, P(B|A)=0.5. Find P(A∩B)', type: 'numeric', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: '0.2' },
  { id: 'H1-77', prompt: 'Explain why probabilities sum to 1', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: ['all outcomes covered', 'exhaustive', 'every possibility included', 'complete set of outcomes'] },
  {
    id: 'H1-78',
    prompt: 'Show that the probability is 3/8',
    type: 'proofShort',
    paper: 1,
    tier: 'higher',
    calculator: false,
    diagram: 'none',
    answers: ['3/8', 'P = 3/8', 'probability = 3/8'],
    marks: 2,
    questionData: {
      markScheme: [
        { keyNumbers: ['3/8'], marks: 1 },
        { keywords: ['tree', 'diagram', 'multiply', 'fraction', 'favourable', 'total', 'outcomes', 'probability', 'P('], marks: 1 },
      ],
    },
  },
  { id: 'H1-79', prompt: 'Write a probability statement using set notation', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: ['P(A∩B)', 'P(A∪B)', 'P(A\')\'', 'P(A and B)', 'P(A or B)'] },
  { id: 'H1-80', prompt: 'The probability of rain tomorrow is 0.8. Interpret this in terms of likelihood.', type: 'short', paper: 1, tier: 'higher', calculator: false, diagram: 'none', answers: ['likely', 'very likely', 'high chance', 'probable', 'more likely than not'] },
];

/** Higher Paper 2 (calculator) — 80 golden questions. Canonical Paper 2 question bank. */
const H2: GoldenMathsQuestion[] = [
  // Number, Rounding & Bounds (1–14)
  { id: 'H2-01', prompt: 'Write 0.0000456 in standard form', type: 'fill', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '4.56×10^-5' },
  { id: 'H2-02', prompt: 'Write 7.2 × 10⁶ as an ordinary number', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '7200000' },
  { id: 'H2-03', prompt: 'Calculate (3.6 × 10⁵) ÷ (1.2 × 10²) in standard form', type: 'fill', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '3×10^3' },
  { id: 'H2-04', prompt: 'Round 8.47391 to 3 significant figures', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '8.47' },
  { id: 'H2-05', prompt: 'A length is given as 5.2 cm (to 1 dp). Write the upper bound', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '5.25' },
  { id: 'H2-06', prompt: 'Find the error interval for a mass recorded as 3.45 kg (2 dp)', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '3.445≤m<3.455' },
  { id: 'H2-07', prompt: 'Calculate the lower bound of 2.4 × 5.6', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '12.925' },
  { id: 'H2-08', prompt: 'Estimate (198 × 4.1) ÷ 9.8', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '82.8' },
  { id: 'H2-09', prompt: 'Express 7/9 as a percentage (2 dp)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '77.78' },
  { id: 'H2-10', prompt: '£540 is increased by 12%. Find the new price', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '604.80' },
  { id: 'H2-11', prompt: '£672 is the result of a 12% increase. Find the original price', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '600' },
  { id: 'H2-12', prompt: 'Increase 400 by 3% for 5 years (compound growth)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '463.71' },
  { id: 'H2-13', prompt: 'Depreciate £12,000 by 15% per year for 3 years', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '7369.50' },
  { id: 'H2-14', prompt: 'Write 0.00084 as a percentage', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '0.084' },
  // Algebra & Equations (15–34)
  { id: 'H2-15', prompt: 'Solve 3x² − 5x − 2 = 0 (2 dp)', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '2,-0.33' },
  { id: 'H2-16', prompt: 'Solve x² + 4x + 7 = 0. How many real solutions are there?', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '0' },
  { id: 'H2-17', prompt: 'Solve simultaneously: y = x² and y = 2x + 1', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '-0.41,2.41' },
  { id: 'H2-18', prompt: 'Solve x² − 7x + 10 = 0 graphically', type: 'graphRead', paper: 2, tier: 'higher', calculator: true, diagram: 'coordinateGrid', answers: '2,5' },
  { id: 'H2-19', prompt: 'Solve 2x² − 3x = 5', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '2.5,-1' },
  { id: 'H2-20', prompt: 'Solve 3/x + 2 = 5', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '1' },
  { id: 'H2-21', prompt: 'Make x the subject: y = (3x − 5)/2', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '(2y+5)/3' },
  { id: 'H2-22', prompt: 'Make r the subject: A = πr²', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '√(A/π)' },
  { id: 'H2-23', prompt: 'Factorise 2x² − 18', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '2(x+3)(x-3)' },
  { id: 'H2-24', prompt: 'Simplify (2x² + 6x)/(4x)', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '(x+3)/2' },
  { id: 'H2-25', prompt: 'Simplify (x² − 16)/(x² − 4x)', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '(x+4)/x' },
  { id: 'H2-26', prompt: 'Solve x² − 5x + 6 > 0', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: 'x<2,x>3' },
  { id: 'H2-27', prompt: 'Solve and sketch x² − 4x ≤ 0', type: 'inequalityPlot', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: ['0≤x≤4', '0<=x<=4', '0 \\le x \\le 4'] },
  { id: 'H2-28', prompt: 'The nth term of a sequence is 2n² + 1. Find the 10th term', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '201' },
  { id: 'H2-29', prompt: 'Find the nth term of 3, 8, 15, 24, …', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: 'n^2+2n' },
  { id: 'H2-30', prompt: 'Use iteration to solve x = √(10 + x) (1 dp)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '3.7' },
  { id: 'H2-31', prompt: 'Write the iteration formula for solving x³ + x − 4 = 0', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: 'x=∛(4-x)' },
  { id: 'H2-32', prompt: 'Solve log₁₀(x) = 2.3', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '199.53' },
  { id: 'H2-33', prompt: 'Solve 3ˣ = 45', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '3.46' },
  { id: 'H2-34', prompt: 'Find the inverse of f(x) = 5x − 3', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '(x+3)/5' },
  // Graphs & Functions (35–50)
  { id: 'H2-35', prompt: 'Find the turning point of y = x² − 6x + 5', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'prePlottedGraph', answers: '3,-4' },
  { id: 'H2-36', prompt: 'Write y = x² − 6x + 5 in completed square form', type: 'expression', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '(x-3)^2-4' },
  { id: 'H2-37', prompt: 'Sketch y = (x − 2)² − 3', type: 'graphPlot', paper: 2, tier: 'higher', calculator: true, diagram: 'coordinateGrid', answers: ['turning point (2,-3)', 'minimum at (2,-3)', 'parabola vertex (2,-3)'], questionData: { expectedPoints: [{ x: 2, y: -3 }, { x: 0, y: 1 }, { x: 4, y: 1 }], coordinateTolerance: 0.6 } },
  { id: 'H2-38', prompt: 'Solve x² − 6x + 5 = 0 using the graph', type: 'graphRead', paper: 2, tier: 'higher', calculator: true, diagram: 'prePlottedGraph', answers: '1,5' },
  { id: 'H2-39', prompt: 'Describe the transformation from y = x² to y = −x² + 4', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: 'reflection in x-axis, translation 4 up' },
  { id: 'H2-40', prompt: 'Find where y = 2x + 1 intersects the x-axis', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '-0.5' },
  { id: 'H2-41', prompt: 'Find the gradient of the tangent to y = x² at x = 3', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '6' },
  { id: 'H2-42', prompt: 'Solve x² = 5x − 4', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '1,4' },
  { id: 'H2-43', prompt: 'Find the range of y = x² + 1', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: 'y≥1' },
  { id: 'H2-44', prompt: 'For f(x) = 2x − 1, find f⁻¹(5)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '3' },
  { id: 'H2-45', prompt: 'Given f(x) = x², find f(f(2))', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '16' },
  { id: 'H2-46', prompt: 'Solve f(x) = 10 where f(x) = x² + 1', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '3,-3' },
  { id: 'H2-47', prompt: 'Sketch the graph of y = 1/x', type: 'graphPlot', paper: 2, tier: 'higher', calculator: true, diagram: 'coordinateGrid', answers: ['hyperbola', 'asymptotes x=0 y=0', 'reciprocal graph', 'two branches'], questionData: { expectedPoints: [{ x: 1, y: 1 }, { x: -1, y: -1 }, { x: 2, y: 0.5 }, { x: -2, y: -0.5 }], coordinateTolerance: 0.6 } },
  { id: 'H2-48', prompt: 'Describe the asymptotes of y = 1/x', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: 'x=0, y=0' },
  { id: 'H2-49', prompt: 'Solve 1/x = 0.25', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '4' },
  { id: 'H2-50', prompt: 'Solve 2/x + 1 = 3', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '1' },
  // Geometry & Trigonometry (51–66)
  { id: 'H2-51', prompt: 'In a right-angled triangle the two shorter sides are 5 cm and 12 cm. Find the length of the hypotenuse (Pythagoras)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '13', diagramParams: { values: { sideAB: 13, sideBC: 12, sideAC: 5 } } },
  { id: 'H2-52', prompt: 'In a right-angled triangle the hypotenuse is 10 cm and one shorter side is 6 cm. Find the other shorter side using Pythagoras', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '8', diagramParams: { values: { sideAB: 10, sideBC: 8, sideAC: 6 } } },
  { id: 'H2-53', prompt: 'In a right triangle, sin 42° = x/9. Find x', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '6.02', diagramParams: { templateId: 'math.trig.right_triangle.v1', values: { angle: 42 }, visibility: { showAngleLabel: true } } },
  { id: 'H2-54', prompt: 'Find an angle using tan θ = 5/12', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '22.6', diagramParams: { values: { sideAB: 13, sideBC: 5, sideAC: 12 } } },
  { id: 'H2-55', prompt: 'Triangle: A=40°, B=60°, side a=10 cm. Use sine rule to find side b', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '13.5', diagramParams: { templateId: 'math.trig.sine_rule_triangle.v1', values: { sideA: 10, angleA: 40, angleB: 60 } } },
  { id: 'H2-56', prompt: 'Triangle: sides a=7 cm, b=9 cm, C=50°. Use cosine rule to find side c', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '7.0', diagramParams: { templateId: 'math.trig.cosine_rule_triangle.v1', values: { sideA: 7, sideB: 9, angleC: 50 } } },
  { id: 'H2-57', prompt: 'Triangle: sides 5 cm, 7 cm, 9 cm. Find angle opposite 9 cm using cosine rule', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '84.3', diagramParams: { values: { sideAB: 9, sideBC: 7, sideAC: 5 } } },
  { id: 'H2-58', prompt: 'Find the area of a triangle with sides 8 cm and 11 cm and included angle 42° (½ab sin C)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '29.4', diagramParams: { templateId: 'math.trig.cosine_rule_triangle.v1', values: { sideA: 8, sideB: 11, angleC: 42 } } },
  { id: 'H2-59', prompt: 'Find the arc length of a sector with radius 6 cm and angle 80°', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'circle', answers: '8.38', diagramParams: { values: { radius: 6, sectorAngle: 80 }, labels: { radiusLabel: '6 cm' } } },
  { id: 'H2-60', prompt: 'Find the area of a sector with radius 5 cm and angle 120°', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'circle', answers: '26.2', diagramParams: { values: { radius: 5, sectorAngle: 120 }, labels: { radiusLabel: '5 cm' } } },
  { id: 'H2-61', prompt: 'Apply the angle in a semicircle theorem to find the size of angle C.', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'circle', answers: '90', diagramParams: { visibility: { showAngleLabel: false, showRightAngleMark: false } } },
  { id: 'H2-62', prompt: 'Tangent meets radius at 90°. Given angle at centre 65°, find the angle between tangent and chord', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'circle', answers: '32.5', diagramParams: { values: { angleAtCentre: 65 } } },
  { id: 'H2-63', prompt: 'Similar triangles: corresponding sides 4 cm and 10 cm. Find the scale factor (small to large)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'triangle', answers: '2.5', diagramParams: { templateId: 'math.geometry.similar_triangles.v1', values: { sideAB: 4, sideDE: 10, scaleFactor: 2.5 } } },
  { id: 'H2-64', prompt: 'Similar shapes: linear scale factor 3. Small area 5 cm². Find large area', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '45' },
  { id: 'H2-65', prompt: 'Ship sails 10 km on bearing 050°, then 6 km on bearing 140°. Find distance from start', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '12.8' },
  { id: 'H2-66', prompt: 'A is (1, 2) and B is (5, 6). Find the vector from A to B', type: 'multiNumeric', paper: 2, tier: 'higher', calculator: true, diagram: 'vectorDiagram', answers: '4,4' },
  // Probability & Statistics (67–80)
  { id: 'H2-67', prompt: 'A bag has 3 red and 4 blue. Two balls drawn without replacement. Find P(both red)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '1/7' },
  {
    id: 'H2-68',
    prompt: 'A bag has 4 red and 6 blue counters. Two counters are drawn without replacement. Match each probability (left) to the correct branch label on the tree diagram (right).',
    type: 'dragMatch',
    paper: 2,
    tier: 'higher',
    calculator: true,
    diagram: 'treeDiagram',
    answers: 'p1b1,p2b2,p3b3,p4b4',
    questionData: {
      leftItems: [
        { id: 'p1', text: '0.4' },
        { id: 'p2', text: '0.6' },
        { id: 'p3', text: '0.2' },
        { id: 'p4', text: '0.8' },
      ],
      rightItems: [
        { id: 'b1', text: 'P(Red on first draw)' },
        { id: 'b2', text: 'P(Blue on first draw)' },
        { id: 'b3', text: 'P(Red on second draw | Red first)' },
        { id: 'b4', text: 'P(Blue on second draw | Red first)' },
      ],
    },
    diagramParams: {
      values: {
        branches: '[{"label":"Red","probability":"0.4"},{"label":"Blue","probability":"0.6"}]',
        secondBranches: '{"Red":[{"label":"Red","probability":"0.2"},{"label":"Blue","probability":"0.8"}],"Blue":[{"label":"Red","probability":"0.3"},{"label":"Blue","probability":"0.7"}]}',
      },
    },
  },
  { id: 'H2-69', prompt: 'P(A)=0.5, P(B|A)=0.4. Find P(A∩B)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '0.2' },
  {
    id: 'H2-70',
    prompt: '18 people were asked whether they like tea (A) or coffee (B). The numbers 5, 3, 2, 8 represent counts for: A only, B only, A and B, Neither. Drag each number to the correct region of the Venn diagram.',
    type: 'dragMatch',
    paper: 2,
    tier: 'higher',
    calculator: true,
    diagram: 'vennDiagram',
    answers: 'v1Aonly,v2Bonly,v3AandB,v4Neither',
    questionData: {
      leftItems: [
        { id: 'v1', text: '5' },
        { id: 'v2', text: '3' },
        { id: 'v3', text: '2' },
        { id: 'v4', text: '8' },
      ],
      rightItems: [
        { id: 'Aonly', text: 'A only' },
        { id: 'Bonly', text: 'B only' },
        { id: 'AandB', text: 'A and B' },
        { id: 'Neither', text: 'Neither' },
      ],
    },
  },
  { id: 'H2-71', prompt: 'Find P(B) from the Venn diagram.', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'vennDiagram', answers: '0.5', diagramParams: { labels: { onlyA: '4', onlyB: '6', intersection: '4', outside: '6' } } },
  { id: 'H2-72', prompt: 'Grouped frequency: 0–10 (freq 5), 10–20 (8), 20–30 (7). Find mean (midpoints 5, 15, 25)', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '15.5' },
  { id: 'H2-73', prompt: 'Find the median from cumulative frequency curve', type: 'graphRead', paper: 2, tier: 'higher', calculator: true, diagram: 'cumulativeFrequency', answers: ['35', '36', '37', 'median', '50th percentile', 'middle value'], diagramParams: { values: { data: '[{"ub":10,"cf":5},{"ub":20,"cf":18},{"ub":30,"cf":42},{"ub":40,"cf":68},{"ub":50,"cf":85},{"ub":60,"cf":95},{"ub":70,"cf":100}]', totalFrequency: 100 }, visibility: { showMedianLine: true } } },
  { id: 'H2-74', prompt: 'Data: 3, 5, 7, 8, 9, 11, 12. Find the interquartile range', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: '6' },
  { id: 'H2-75', prompt: 'Compare two box plots', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'boxPlot', answers: ['A has higher median', 'B has greater spread', 'different IQR', 'one has a higher median'] },
  { id: 'H2-76', prompt: 'Histogram: class width 10, frequency 25. Find frequency density', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'histogram', answers: '2.5' },
  { id: 'H2-77', prompt: 'Histogram: class width 5, frequency density 4. Find frequency', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'histogram', answers: '20' },
  { id: 'H2-78', prompt: 'Scatter graph — describe correlation', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'scatterPlot', answers: ['positive', 'negative', 'no correlation', 'positive correlation', 'negative correlation'] },
  { id: 'H2-79', prompt: 'Scatter graph — line of best fit estimate', type: 'numeric', paper: 2, tier: 'higher', calculator: true, diagram: 'scatterPlot', answers: '7', diagramParams: { values: { points: '[{"x":1,"y":2},{"x":2,"y":3},{"x":4,"y":5},{"x":5,"y":6},{"x":7,"y":8}]', xMax: 10, yMax: 10 }, visibility: { showLineOfBestFit: true } } },
  { id: 'H2-80', prompt: 'A report states "The average house price in the area is £350,000." Interpret what this means and its limitations.', type: 'short', paper: 2, tier: 'higher', calculator: true, diagram: 'none', answers: ['average', 'typical', 'variation', 'spread', 'representative', 'misleading', 'mean of all prices', 'does not show range'] },
];

/** Higher Paper 3 (calculator) — 80 golden questions, problem-solving focused, multi-step, mixed topic */
const H3: GoldenMathsQuestion[] = [
  // Mixed Number & Ratio (1–15)
  { id: 'H3-01', prompt: 'A phone costs £480. It is discounted by 15%, then a further 10%. Find the final price.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '367.2' },
  { id: 'H3-02', prompt: '£600 is shared between A, B and C in the ratio 2 : 3 : 5. B gives 20% of his share to C. How much does C now have?', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '336' },
  { id: 'H3-03', prompt: 'A population increases by 4% per year. Initially 25,000. Find population after 6 years.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '31633' },
  { id: 'H3-04', prompt: 'The speed of a car is reduced by 20%. Find the percentage increase needed to return to the original speed.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '25' },
  { id: 'H3-05', prompt: 'A recipe uses flour and sugar in ratio 5 : 2. Flour costs £1.20/kg, sugar £0.80/kg. Find total cost of mixture if 3.5 kg of flour is used.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '5.32' },
  { id: 'H3-06', prompt: 'A number is written correct to 2 significant figures as 3.6 × 10⁴. Write the error interval.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '35500≤x<36500' },
  { id: 'H3-07', prompt: 'Estimate the value of (49.2 × 0.081) / 1.98', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '2' },
  { id: 'H3-08', prompt: 'Two numbers have a product of 180 and a sum of 27. Find the numbers.', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '12,15' },
  { id: 'H3-09', prompt: 'The ratio of boys to girls in a class is 7 : 5. 4 girls join the class and the ratio becomes 7 : 6. How many boys are there?', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '28' },
  { id: 'H3-10', prompt: 'A tank is ⅔ full. After 40 litres are added, it is ¾ full. Find the capacity of the tank.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '480' },
  { id: 'H3-11', prompt: 'Write 0.00000042 in standard form.', type: 'fill', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '4.2×10^-7' },
  { id: 'H3-12', prompt: 'Find the value of (3.2 × 10⁵)(4.5 × 10⁻³)', type: 'fill', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '1440' },
  { id: 'H3-13', prompt: 'A quantity decreases by 12% each year. Write a formula for its value after n years.', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: 'V×0.88^n' },
  { id: 'H3-14', prompt: 'Find the value of k so that 6/(k+1) = 0.75', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '7' },
  { id: 'H3-15', prompt: 'The ratio of red to blue paint is 4 : 7. How much blue paint is needed if 18 litres of red paint is used?', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '31.5' },
  // Algebra & Equations (16–35)
  { id: 'H3-16', prompt: 'Solve x² − 9x + 14 = 0', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '2,7' },
  { id: 'H3-17', prompt: 'Solve 3x² + 5x − 2 = 0', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '1/3,-2' },
  { id: 'H3-18', prompt: 'Solve simultaneously: y = x² − 4x, y = 3x − 10', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '2,-4' },
  { id: 'H3-19', prompt: 'Solve 2/(x−1) = 3', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '5/3' },
  { id: 'H3-20', prompt: 'Make x the subject: y = (4x+3)/5', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '(5y-3)/4' },
  { id: 'H3-21', prompt: 'Simplify (x² − 16)/(x² − 4x)', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '(x+4)/x' },
  { id: 'H3-22', prompt: 'Factorise completely 2x² − 18', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '2(x+3)(x-3)' },
  { id: 'H3-23', prompt: 'Solve x² − 6x + 5 > 0', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: 'x<1,x>5' },
  { id: 'H3-24', prompt: 'Solve and sketch x² − 4x ≤ 0', type: 'inequalityPlot', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: ['0≤x≤4', '0<=x<=4', '0 \\le x \\le 4'] },
  { id: 'H3-25', prompt: 'The nth term of a sequence is 2n² + 3n. Find the 8th term.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '152' },
  { id: 'H3-26', prompt: 'Find the nth term of 4, 9, 16, 25, …', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '(n+1)^2' },
  { id: 'H3-27', prompt: 'Use iteration to solve x = √(12 + x)', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '4' },
  { id: 'H3-28', prompt: 'Write an iteration formula to solve x³ − 2x − 5 = 0', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: 'x=∛(2x+5)' },
  { id: 'H3-29', prompt: 'Find the inverse of f(x) = (3x−1)/2', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '(2x+1)/3' },
  { id: 'H3-30', prompt: 'Given f(x) = x² + 1, find f(f(2)).', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '26' },
  { id: 'H3-31', prompt: 'Solve f(x) = 10 where f(x) = x² + 1', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '3,-3' },
  { id: 'H3-32', prompt: 'Find the minimum value of y = x² − 8x + 7', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '-9' },
  { id: 'H3-33', prompt: 'Write y = x² − 8x + 7 in completed square form.', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '(x-4)^2-9' },
  { id: 'H3-34', prompt: 'Solve graphically x² = 6x − 5 using the graph of y = x² − 6x + 5.', type: 'graphRead', paper: 3, tier: 'higher', calculator: true, diagram: 'prePlottedGraph', answers: '1,5', diagramParams: { values: { a: 1, b: -6, c: 5 }, labels: { equationLabel: 'y = x² − 6x + 5' } } },
  { id: 'H3-35', prompt: 'Find where the graph of y = 2x + 1 intersects the x-axis.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '-0.5' },
  // Graphs, Geometry & Trigonometry (36–60)
  { id: 'H3-36', prompt: 'Find the gradient between (−3, 7) and (5, −1).', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '-1' },
  { id: 'H3-37', prompt: 'Find the equation of the line with gradient −2 passing through (4, 1).', type: 'expression', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: 'y=-2x+9' },
  { id: 'H3-38', prompt: 'Find the turning point of y = x² − 4x + 1', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '2,-3' },
  { id: 'H3-39', prompt: 'Describe the transformation from y = x² → y = −(x−2)² + 3', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: 'reflection in x-axis, translation 2 right, 3 up' },
  { id: 'H3-40', prompt: 'A ladder leans against a wall. The foot is 4 m from the wall and the ladder is 6 m long. Find the angle it makes with the ground.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'triangle', answers: '41.8', diagramParams: { values: { sideAB: 6, sideBC: 4.47, sideAC: 4 }, labels: {} } },
  { id: 'H3-41', prompt: 'In a triangle, a = 7 cm, b = 9 cm, C = 120°. Find side c.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'triangle', answers: '14.0', diagramParams: { templateId: 'math.trig.cosine_rule_triangle.v1', values: { sideA: 7, sideB: 9, angleC: 120 } } },
  { id: 'H3-42', prompt: 'Find the area of a triangle with sides 8 cm and 11 cm and included angle 42°.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '29.4' },
  { id: 'H3-43', prompt: 'A sector has radius 9 cm and angle 110°. Find the arc length.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'circle', answers: '17.3', diagramParams: { values: { radius: 9, sectorAngle: 110 }, labels: { radiusLabel: '9 cm' } } },
  { id: 'H3-44', prompt: 'A sector has radius 9 cm and angle 110°. Find the area of the sector.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'circle', answers: '77.8', diagramParams: { values: { radius: 9, sectorAngle: 110 }, labels: { radiusLabel: '9 cm' } } },
  { id: 'H3-45', prompt: 'A chord subtends an angle of 70° at the centre of a circle of radius 10 cm. Find the length of the chord.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '11.5' },
  { id: 'H3-46', prompt: 'Apply the angle in a semicircle theorem to find the size of angle C.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'circle', answers: '90', diagramParams: { visibility: { showAngleLabel: false, showRightAngleMark: false } } },
  { id: 'H3-47', prompt: 'Tangent meets radius at 90°. Chord subtends 56° at centre. Find angle between tangent and chord.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'circle', answers: '28', diagramParams: { values: { angleAtCentre: 56 } } },
  { id: 'H3-48', prompt: 'Two triangles are similar. The scale factor is 3 : 5. A side in the smaller triangle is 12 cm. Find the corresponding side.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '20' },
  { id: 'H3-49', prompt: 'Two similar shapes have areas in the ratio 4 : 9. Find the linear scale factor.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '2/3' },
  { id: 'H3-50', prompt: 'A shape is rotated 180° about the point (1, −2). Describe the transformation.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: 'rotation 180° about (1,-2)' },
  { id: 'H3-51', prompt: 'Rotate triangle ABC 90° clockwise about the origin.', type: 'geometryConstruct', paper: 3, tier: 'higher', calculator: true, diagram: 'coordinateGrid', answers: ['90° clockwise about (0,0)', 'rotation 90° clockwise', 'rotated 90° clockwise about origin'], questionData: { expectedPoints: [{ x: 1, y: -2 }, { x: 1, y: -4 }, { x: 3, y: -2 }], coordinateTolerance: 0.6 } },
  { id: 'H3-52', prompt: 'Find the bearing of B from A.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'bearingDiagram', answers: '72', diagramParams: { values: { bearing: 72 }, visibility: { showBearingLabel: false } } },
  { id: 'H3-53', prompt: 'A ship sails 12 km on a bearing of 040°, then 8 km on a bearing of 130°. Find the distance from its starting point.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '14.4' },
  { id: 'H3-54', prompt: 'A vector a = (3, −2) and b = (−1, 4). Find 2a + b.', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '5,0' },
  { id: 'H3-55', prompt: 'Find the magnitude of vector (5, −12).', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '13' },
  { id: 'H3-56', prompt: 'Find the midpoint of A(−4, 6) and B(8, −2).', type: 'multiNumeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '2,2' },
  {
    id: 'H3-57',
    prompt: 'Prove that the midpoint of the line joining A and B lies on the line y = 2x + 1.',
    type: 'proofShort',
    paper: 3,
    tier: 'higher',
    calculator: true,
    diagram: 'none',
    answers: ['Midpoint lies on y=2x+1', 'Substitute midpoint into equation'],
    marks: 2,
    questionData: {
      markScheme: [
        { keywords: ['midpoint', '(x1+x2)/2', '(y1+y2)/2', 'average', 'middle'], marks: 1 },
        { keywords: ['y=2x+1', '2x+1', 'substitute', 'lies on', 'satisfies', 'equation'], marks: 1 },
      ],
    },
  },
  { id: 'H3-58', prompt: 'A solid is made by joining two cylinders: radius 3 cm height 5 cm and radius 2 cm height 4 cm. Find its volume in cm³.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '169' },
  { id: 'H3-59', prompt: 'Frustum: top radius 2 cm, bottom radius 5 cm, slant height 6 cm. Find curved surface area (π × (R+r) × l).', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '132' },
  { id: 'H3-60', prompt: 'A cone of height 12 cm and base radius 6 cm is sliced at 4 cm from the vertex. Find the volume of the smaller cone (scale factor 1/3).', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '16.8' },
  // Probability & Statistics (61–80)
  { id: 'H3-61', prompt: 'A bag contains 4 red, 3 blue and 5 green counters. Two are chosen without replacement. Find P(both red).', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '1/11' },
  {
    id: 'H3-62',
    prompt: 'A bag has 4 red and 6 blue counters. Two counters are drawn without replacement. Match each probability (left) to the correct branch label on the tree diagram (right).',
    type: 'dragMatch',
    paper: 3,
    tier: 'higher',
    calculator: true,
    diagram: 'treeDiagram',
    answers: 'p1b1,p2b2,p3b3,p4b4',
    questionData: {
      leftItems: [
        { id: 'p1', text: '0.4' },
        { id: 'p2', text: '0.6' },
        { id: 'p3', text: '0.2' },
        { id: 'p4', text: '0.8' },
      ],
      rightItems: [
        { id: 'b1', text: 'P(Red on first draw)' },
        { id: 'b2', text: 'P(Blue on first draw)' },
        { id: 'b3', text: 'P(Red on second draw | Red first)' },
        { id: 'b4', text: 'P(Blue on second draw | Red first)' },
      ],
    },
    diagramParams: {
      values: {
        branches: '[{"label":"Red","probability":"0.4"},{"label":"Blue","probability":"0.6"}]',
        secondBranches: '{"Red":[{"label":"Red","probability":"0.2"},{"label":"Blue","probability":"0.8"}],"Blue":[{"label":"Red","probability":"0.3"},{"label":"Blue","probability":"0.7"}]}',
      },
    },
  },
  { id: 'H3-63', prompt: 'Find P(A ∪ B) given P(A)=0.4, P(B)=0.5, P(A ∩ B)=0.2.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '0.7' },
  {
    id: 'H3-64',
    prompt: '18 people were asked whether they like tea (A) or coffee (B). The numbers 5, 3, 2, 8 represent counts for: A only, B only, A and B, Neither. Drag each number to the correct region of the Venn diagram.',
    type: 'dragMatch',
    paper: 3,
    tier: 'higher',
    calculator: true,
    diagram: 'vennDiagram',
    answers: 'v1Aonly,v2Bonly,v3AandB,v4Neither',
    questionData: {
      leftItems: [
        { id: 'v1', text: '5' },
        { id: 'v2', text: '3' },
        { id: 'v3', text: '2' },
        { id: 'v4', text: '8' },
      ],
      rightItems: [
        { id: 'Aonly', text: 'A only' },
        { id: 'Bonly', text: 'B only' },
        { id: 'AandB', text: 'A and B' },
        { id: 'Neither', text: 'Neither' },
      ],
    },
  },
  { id: 'H3-65', prompt: 'Find the probability from a Venn diagram.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'vennDiagram', answers: '0.2', diagramParams: { labels: { onlyA: '6', onlyB: '8', intersection: '2', outside: '4' } } },
  { id: 'H3-66', prompt: 'Grouped frequency: 0–20 (5), 20–40 (10), 40–60 (5). Midpoints 10, 30, 50. Find the mean.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '30' },
  { id: 'H3-67', prompt: 'Use the cumulative frequency curve to estimate the median value.', type: 'graphRead', paper: 3, tier: 'higher', calculator: true, diagram: 'cumulativeFrequency', answers: ['32', '33', '34', 'median', '50th percentile', 'middle value'], diagramParams: { values: { data: '[{"ub":5,"cf":2},{"ub":15,"cf":12},{"ub":25,"cf":35},{"ub":35,"cf":55},{"ub":45,"cf":72},{"ub":55,"cf":85},{"ub":65,"cf":95},{"ub":75,"cf":100}]', totalFrequency: 100 }, visibility: { showMedianLine: true } } },
  { id: 'H3-68', prompt: 'Cumulative frequency curve: Q1=20, Q3=45. Find the interquartile range.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '25' },
  { id: 'H3-69', prompt: 'Compare two distributions using box plots.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'boxPlot', answers: ['different spread', 'one has higher median', 'different IQR', 'A has greater range'] },
  { id: 'H3-70', prompt: 'Histogram: class 10–15 has width 5 and frequency density 6. Find the frequency.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'histogram', answers: '30', diagramParams: { values: { classes: '[{"start":0,"end":5,"frequency":10,"frequencyDensity":2},{"start":5,"end":10,"frequency":20,"frequencyDensity":4},{"start":10,"end":15,"frequency":30,"frequencyDensity":6},{"start":15,"end":25,"frequency":20,"frequencyDensity":2},{"start":25,"end":35,"frequency":10,"frequencyDensity":1}]', yMax: 7 } } },
  { id: 'H3-71', prompt: 'Class 0–20 has frequency 25. Calculate the frequency density.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: '1.25' },
  { id: 'H3-72', prompt: 'Describe the correlation shown in the scatter graph.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'scatterPlot', answers: ['positive', 'negative', 'no correlation', 'positive correlation', 'negative correlation'] },
  { id: 'H3-73', prompt: 'Use the line of best fit to estimate y when x = 6.', type: 'numeric', paper: 3, tier: 'higher', calculator: true, diagram: 'scatterPlot', answers: '6', diagramParams: { values: { points: '[{"x":0,"y":1},{"x":2,"y":3},{"x":4,"y":5},{"x":6,"y":7},{"x":8,"y":9}]', xMax: 10, yMax: 10 }, visibility: { showLineOfBestFit: true } } },
  { id: 'H3-74', prompt: 'Explain why the point at (10, 4) is an outlier in the scatter graph.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'scatterPlot', answers: ['far from others', 'does not fit pattern', 'unusual', 'distant from rest', 'anomaly'], diagramParams: { values: { points: '[{"x":2,"y":3},{"x":4,"y":5},{"x":5,"y":6},{"x":7,"y":8},{"x":8,"y":9},{"x":10,"y":4}]', xMax: 12, yMax: 12 } } },
  { id: 'H3-75', prompt: 'A survey asks "Do you agree that homework is harmful?" in a school corridor at lunchtime. Explain why this survey may be biased.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: ['unrepresentative sample', 'leading question', 'sample not random', 'biased question', 'certain group excluded', 'time and place affect who is asked'] },
  { id: 'H3-76', prompt: 'A company has 10 employees earning £25,000 each and the owner earning £1,000,000. The mean salary is £125,000. Explain why the mean is misleading.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: ['outliers', 'skewed', 'extreme values', 'not representative', 'affected by outliers', 'owner salary distorts mean'] },
  {
    id: 'H3-77',
    prompt: 'Show that the probability is 5/12.',
    type: 'proofShort',
    paper: 3,
    tier: 'higher',
    calculator: true,
    diagram: 'none',
    answers: ['5/12', 'P = 5/12', 'probability = 5/12'],
    marks: 2,
    questionData: {
      markScheme: [
        { keyNumbers: ['5/12'], marks: 1 },
        { keywords: ['tree', 'diagram', 'multiply', 'fraction', 'favourable', 'total', 'outcomes', 'probability', 'P('], marks: 1 },
      ],
    },
  },
  { id: 'H3-78', prompt: 'Write a probability statement using set notation.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: ['P(A∩B)', 'P(A∪B)', "P(A')", 'P(A and B)', 'P(A or B)'] },
  { id: 'H3-79', prompt: 'A fair coin is tossed. The probability of heads is 0.5. Interpret what this means.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'none', answers: ['even chance', '50-50', 'equally likely', 'half the time', 'as likely as tails'] },
  { id: 'H3-80', prompt: 'A student claims the data in the scatter graph proves a trend. Evaluate this claim.', type: 'short', paper: 3, tier: 'higher', calculator: true, diagram: 'scatterPlot', answers: ['correlation not causation', 'need more data', 'cannot prove', 'may be coincidence', 'insufficient evidence'], diagramParams: { values: { points: '[{"x":2,"y":4},{"x":4,"y":5},{"x":6,"y":7},{"x":8,"y":8},{"x":10,"y":9}]', xMax: 12, yMax: 12 } } },
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
  vennDiagram: 'math.statistics.venn_two_set.v1',
  treeDiagram: 'math.probability.tree_diagram.v1',
  cumulativeFrequency: 'math.statistics.cumulative_frequency.v1',
  prePlottedGraph: 'math.graphs.pre_plotted.v1',
};

/** Get calculator allowed by default for a paper (1 = no, 2 & 3 = yes). */
export function calculatorAllowedForPaper(paper: 1 | 2 | 3): boolean {
  return paper !== 1;
}

/** All Golden Maths question ids in order (for validation / ordering). */
export function getGoldenMathsQuestionIds(): string[] {
  return GOLDEN_MATHS_QUESTIONS.map(q => q.id);
}

/**
 * Golden Maths Topic & Unit Spec — machine-readable curriculum groupings
 *
 * Aligned with GOLDEN_MATHS_QUESTION_LIST.md. Defines topic and unit quiz question ID ranges
 * for GCSE Maths. Used to build topic/unit quizzes from golden questions (prompts with meta.goldenId).
 */

export type GoldenTier = 'foundation' | 'higher';

export interface GoldenTopicSpec {
  /** Stable key for lookups (e.g. "f1-number-arithmetic") */
  key: string;
  name: string;
  tier: GoldenTier;
  paper: 1 | 2 | 3;
  /** Question IDs in order (e.g. ["F1-01", "F1-02", ..., "F1-10"]) */
  questionIds: string[];
}

export interface GoldenUnitSpec {
  /** Stable key for lookups (e.g. "f1-bidmas") */
  key: string;
  name: string;
  /** Parent topic key for context */
  topicKey: string;
  /** Question IDs in order */
  questionIds: string[];
}

/** Parse ID range like "F1-01 – F1-10" into array of IDs. */
function parseIdRange(startId: string, endId: string): string[] {
  const ids: string[] = [];
  const matchStart = startId.match(/^([A-Z]\d)-(\d+)$/);
  const matchEnd = endId.match(/^([A-Z]\d)-(\d+)$/);
  if (!matchStart || !matchEnd || matchStart[1] !== matchEnd[1]) {
    return [];
  }
  const prefix = matchStart[1];
  const start = parseInt(matchStart[2], 10);
  const end = parseInt(matchEnd[2], 10);
  for (let i = start; i <= end; i++) {
    ids.push(`${prefix}-${String(i).padStart(2, '0')}`);
  }
  return ids;
}

/** Build topic spec from raw range. */
function topic(
  key: string,
  name: string,
  tier: GoldenTier,
  paper: 1 | 2 | 3,
  startId: string,
  endId: string
): GoldenTopicSpec {
  return {
    key,
    name,
    tier,
    paper,
    questionIds: parseIdRange(startId, endId),
  };
}

/** Build unit spec from raw range. */
function unit(key: string, name: string, topicKey: string, startId: string, endId: string): GoldenUnitSpec {
  return {
    key,
    name,
    topicKey,
    questionIds: parseIdRange(startId, endId),
  };
}

// —— Topic quizzes (by curriculum topic) ——
export const GOLDEN_TOPIC_SPECS: GoldenTopicSpec[] = [
  topic('f1-number-arithmetic', 'Number & Arithmetic', 'foundation', 1, 'F1-01', 'F1-10'),
  topic('f1-algebra', 'Algebra', 'foundation', 1, 'F1-11', 'F1-17'),
  topic('f1-graphs-geometry', 'Graphs & Geometry', 'foundation', 1, 'F1-18', 'F1-30'),
  topic('f2-number', 'Number', 'foundation', 2, 'F2-01', 'F2-05'),
  topic('f2-algebra-graphs', 'Algebra & Graphs', 'foundation', 2, 'F2-06', 'F2-08'),
  topic('f2-geometry-measures', 'Geometry & Measures', 'foundation', 2, 'F2-09', 'F2-12'),
  topic('f2-statistics', 'Statistics', 'foundation', 2, 'F2-13', 'F2-14'),
  topic('f2-mixed', 'Foundation Paper 2 (mixed practice)', 'foundation', 2, 'F2-15', 'F2-35'),
  topic('f3-mixed', 'Foundation Paper 3 (mixed)', 'foundation', 3, 'F3-01', 'F3-40'),
  topic('h1-number-indices', 'Number & Indices', 'higher', 1, 'H1-01', 'H1-12'),
  topic('h1-algebra-manipulation', 'Algebra: Manipulation', 'higher', 1, 'H1-13', 'H1-32'),
  topic('h1-graphs-coordinates', 'Graphs & Coordinates', 'higher', 1, 'H1-33', 'H1-45'),
  topic('h1-geometry-trigonometry', 'Geometry & Trigonometry', 'higher', 1, 'H1-46', 'H1-60'),
  topic('h1-probability-statistics', 'Probability & Statistics', 'higher', 1, 'H1-61', 'H1-80'),
  topic('h2-number-rounding-bounds', 'Number, Rounding & Bounds', 'higher', 2, 'H2-01', 'H2-14'),
  topic('h2-algebra-equations', 'Algebra & Equations', 'higher', 2, 'H2-15', 'H2-34'),
  topic('h2-graphs-functions', 'Graphs & Functions', 'higher', 2, 'H2-35', 'H2-50'),
  topic('h2-geometry-trigonometry', 'Geometry & Trigonometry', 'higher', 2, 'H2-51', 'H2-66'),
  topic('h2-probability-statistics', 'Probability & Statistics', 'higher', 2, 'H2-67', 'H2-80'),
  topic('h3-mixed-number-ratio', 'Mixed Number & Ratio', 'higher', 3, 'H3-01', 'H3-15'),
  topic('h3-algebra-equations', 'Algebra & Equations', 'higher', 3, 'H3-16', 'H3-35'),
  topic('h3-graphs-geometry-trigonometry', 'Graphs, Geometry & Trigonometry', 'higher', 3, 'H3-36', 'H3-60'),
  topic('h3-probability-statistics', 'Probability & Statistics', 'higher', 3, 'H3-61', 'H3-80'),
];

// —— Unit quizzes (by sub-topic) ——
export const GOLDEN_UNIT_SPECS: GoldenUnitSpec[] = [
  unit('f1-bidmas', 'BIDMAS, integers, four operations', 'f1-number-arithmetic', 'F1-01', 'F1-04'),
  unit('f1-fractions-ratio', 'Fractions & ratio', 'f1-number-arithmetic', 'F1-05', 'F1-10'),
  unit('f1-expressions-equations', 'Expressions & equations', 'f1-algebra', 'F1-11', 'F1-17'),
  unit('f1-coordinates-tables-angles', 'Coordinates, tables, angles, shape, probability, stats', 'f1-graphs-geometry', 'F1-18', 'F1-30'),
  unit('f2-percentages-standard-form', 'Percentages, standard form, bounds, estimation', 'f2-number', 'F2-01', 'F2-05'),
  unit('f2-straight-line-graphs', 'Straight-line graphs', 'f2-algebra-graphs', 'F2-06', 'F2-08'),
  unit('f2-circle-volume-bearings', 'Circle, volume, bearings', 'f2-geometry-measures', 'F2-09', 'F2-12'),
  unit('f2-scatter-pie', 'Scatter, pie chart', 'f2-statistics', 'F2-13', 'F2-14'),
  unit('f2-mixed-practice', 'Mixed practice (number, algebra, geometry, statistics)', 'f2-mixed', 'F2-15', 'F2-35'),
  unit('f3-mixed-full', 'Foundation Paper 3 (mixed problem solving)', 'f3-mixed', 'F3-01', 'F3-40'),
  unit('h1-number-indices-full', 'Number & indices (BIDMAS, SF, surds, HCF/LCM)', 'h1-number-indices', 'H1-01', 'H1-12'),
  unit('h1-algebra-manipulation-full', 'Algebra manipulation (expand, factorise, solve, nth term)', 'h1-algebra-manipulation', 'H1-13', 'H1-32'),
  unit('h1-graphs-coordinates-full', 'Graphs & coordinates (gradient, quadratic, transform)', 'h1-graphs-coordinates', 'H1-33', 'H1-45'),
  unit('h1-geometry-trig-full', 'Geometry & trig (angles, area, circle, Pythagoras, exact trig)', 'h1-geometry-trigonometry', 'H1-46', 'H1-60'),
  unit('h1-probability-statistics-full', 'Probability & statistics (Venn, tree, frequency, box, scatter)', 'h1-probability-statistics', 'H1-61', 'H1-80'),
  unit('h2-number-rounding-bounds-full', 'Number, rounding & bounds (H2)', 'h2-number-rounding-bounds', 'H2-01', 'H2-14'),
  unit('h2-algebra-equations-full', 'Algebra & equations (H2)', 'h2-algebra-equations', 'H2-15', 'H2-34'),
  unit('h2-graphs-functions-full', 'Graphs & functions (H2)', 'h2-graphs-functions', 'H2-35', 'H2-50'),
  unit('h2-geometry-trig-full', 'Geometry & trig (Pythagoras, SOHCAHTOA, circle theorems, vectors)', 'h2-geometry-trigonometry', 'H2-51', 'H2-66'),
  unit('h2-probability-statistics-full', 'Probability & statistics (H2)', 'h2-probability-statistics', 'H2-67', 'H2-80'),
  unit('h3-mixed-number-ratio-full', 'Mixed number & ratio (H3)', 'h3-mixed-number-ratio', 'H3-01', 'H3-15'),
  unit('h3-algebra-equations-full', 'Algebra & equations (H3)', 'h3-algebra-equations', 'H3-16', 'H3-35'),
  unit('h3-graphs-geometry-trig-full', 'Graphs, geometry & trig (H3)', 'h3-graphs-geometry-trigonometry', 'H3-36', 'H3-60'),
  unit('h3-probability-statistics-full', 'Probability & statistics (H3)', 'h3-probability-statistics', 'H3-61', 'H3-80'),
];

/** Get topic spec by key. */
export function getGoldenTopicByKey(key: string): GoldenTopicSpec | undefined {
  return GOLDEN_TOPIC_SPECS.find(t => t.key === key);
}

/** Get unit spec by key. */
export function getGoldenUnitByKey(key: string): GoldenUnitSpec | undefined {
  return GOLDEN_UNIT_SPECS.find(u => u.key === key);
}

/** Get all topic specs for a tier. */
export function getGoldenTopicsByTier(tier: GoldenTier): GoldenTopicSpec[] {
  return GOLDEN_TOPIC_SPECS.filter(t => t.tier === tier);
}

/** Get all unit specs for a topic. */
export function getGoldenUnitsByTopic(topicKey: string): GoldenUnitSpec[] {
  return GOLDEN_UNIT_SPECS.filter(u => u.topicKey === topicKey);
}

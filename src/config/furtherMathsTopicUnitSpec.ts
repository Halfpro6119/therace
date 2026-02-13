/**
 * Further Maths Topic & Unit Spec — AQA Level 2 Certificate 8365
 *
 * Subject content: Number, Algebra, Coordinate Geometry, Calculus, Matrix Transformations, Geometry
 * Papers: 1 (Non-Calculator), 2 (Calculator)
 * Golden IDs: X1-xx (Paper 1), X2-xx (Paper 2)
 */

export type FurtherMathsTier = 'higher';

export interface FurtherMathsTopicSpec {
  key: string;
  name: string;
  tier: FurtherMathsTier;
  paper: 1 | 2;
  questionIds: string[];
}

export interface FurtherMathsUnitSpec {
  key: string;
  name: string;
  topicKey: string;
  questionIds: string[];
}

function parseIdRange(prefix: string, start: number, end: number): string[] {
  const ids: string[] = [];
  for (let i = start; i <= end; i++) {
    ids.push(`${prefix}-${String(i).padStart(2, '0')}`);
  }
  return ids;
}

function topic(
  key: string,
  name: string,
  paper: 1 | 2,
  prefix: string,
  start: number,
  end: number
): FurtherMathsTopicSpec {
  return {
    key,
    name,
    tier: 'higher',
    paper,
    questionIds: parseIdRange(prefix, start, end),
  };
}

function unit(
  key: string,
  name: string,
  topicKey: string,
  prefix: string,
  start: number,
  end: number
): FurtherMathsUnitSpec {
  return {
    key,
    name,
    topicKey,
    questionIds: parseIdRange(prefix, start, end),
  };
}

export const FURTHER_MATHS_TOPIC_SPECS: FurtherMathsTopicSpec[] = [
  topic('fm1-number', 'Number', 1, 'X1', 1, 8),
  topic('fm1-algebra', 'Algebra', 1, 'X1', 9, 25),
  topic('fm1-coordinate-geometry', 'Coordinate Geometry', 1, 'X1', 26, 35),
  topic('fm2-calculus', 'Calculus', 2, 'X2', 1, 25),
  topic('fm2-matrices', 'Matrix Transformations', 2, 'X2', 26, 40),
  topic('fm2-geometry', 'Geometry', 2, 'X2', 41, 50),
];

export const FURTHER_MATHS_UNIT_SPECS: FurtherMathsUnitSpec[] = [
  unit('fm1-number-surds', 'Surds and indices', 'fm1-number', 'X1', 1, 8),
  unit('fm1-algebra-quadratics', 'Quadratics and algebraic fractions', 'fm1-algebra', 'X1', 9, 15),
  unit('fm1-algebra-sequences', 'Sequences and proof', 'fm1-algebra', 'X1', 16, 25),
  unit('fm1-coord-straight-lines', 'Straight lines and circles', 'fm1-coordinate-geometry', 'X1', 26, 35),
  unit('fm2-calculus-differentiation', 'Differentiation', 'fm2-calculus', 'X2', 1, 12),
  unit('fm2-calculus-integration', 'Integration', 'fm2-calculus', 'X2', 13, 25),
  unit('fm2-matrices-basics', 'Matrix operations and transformations', 'fm2-matrices', 'X2', 26, 40),
  unit('fm2-geometry-advanced', 'Advanced geometry', 'fm2-geometry', 'X2', 41, 50),
];

export function getFurtherMathsUnitsByTopic(topicKey: string): FurtherMathsUnitSpec[] {
  return FURTHER_MATHS_UNIT_SPECS.filter((u) => u.topicKey === topicKey);
}

export function getFurtherMathsTopicsByPaper(paper: 1 | 2): FurtherMathsTopicSpec[] {
  return FURTHER_MATHS_TOPIC_SPECS.filter((t) => t.paper === paper);
}

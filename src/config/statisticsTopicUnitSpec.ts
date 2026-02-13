/**
 * Statistics Topic & Unit Spec — AQA GCSE Statistics 8382
 *
 * Subject content: Data collection, Processing, Representation, Probability, Correlation, Time series, Distributions
 * Papers: 1, 2 (both calculator)
 * Golden IDs: S1-xx (Paper 1), S2-xx (Paper 2)
 */

export type StatisticsTier = 'single';

export interface StatisticsTopicSpec {
  key: string;
  name: string;
  paper: 1 | 2;
  questionIds: string[];
}

export interface StatisticsUnitSpec {
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

function topic(key: string, name: string, paper: 1 | 2, prefix: string, start: number, end: number): StatisticsTopicSpec {
  return {
    key,
    name,
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
): StatisticsUnitSpec {
  return {
    key,
    name,
    topicKey,
    questionIds: parseIdRange(prefix, start, end),
  };
}

export const STATISTICS_TOPIC_SPECS: StatisticsTopicSpec[] = [
  topic('st1-data-collection', 'Data collection and sampling', 1, 'S1', 1, 12),
  topic('st1-representation', 'Data representation (charts, graphs)', 1, 'S1', 13, 30),
  topic('st1-probability', 'Probability', 1, 'S1', 31, 40),
  topic('st2-averages', 'Averages and spread', 2, 'S2', 1, 15),
  topic('st2-correlation', 'Correlation and regression', 2, 'S2', 16, 25),
  topic('st2-time-series', 'Time series', 2, 'S2', 26, 35),
  topic('st2-distributions', 'Distributions', 2, 'S2', 36, 45),
];

export const STATISTICS_UNIT_SPECS: StatisticsUnitSpec[] = [
  unit('st1-sampling', 'Sampling methods', 'st1-data-collection', 'S1', 1, 6),
  unit('st1-questionnaires', 'Questionnaires and surveys', 'st1-data-collection', 'S1', 7, 12),
  unit('st1-charts', 'Charts and diagrams', 'st1-representation', 'S1', 13, 20),
  unit('st1-histograms', 'Histograms and cumulative frequency', 'st1-representation', 'S1', 21, 30),
  unit('st1-probability-basic', 'Probability basics', 'st1-probability', 'S1', 31, 40),
  unit('st2-mean-median', 'Mean, median, mode, range', 'st2-averages', 'S2', 1, 8),
  unit('st2-quartiles', 'Quartiles and interquartile range', 'st2-averages', 'S2', 9, 15),
  unit('st2-scatter', 'Scatter diagrams and correlation', 'st2-correlation', 'S2', 16, 25),
  unit('st2-time-series', 'Time series and trends', 'st2-time-series', 'S2', 26, 35),
  unit('st2-normal', 'Normal distribution', 'st2-distributions', 'S2', 36, 45),
];

export function getStatisticsUnitsByTopic(topicKey: string): StatisticsUnitSpec[] {
  return STATISTICS_UNIT_SPECS.filter((u) => u.topicKey === topicKey);
}

export function getStatisticsTopicsByPaper(paper: 1 | 2): StatisticsTopicSpec[] {
  return STATISTICS_TOPIC_SPECS.filter((t) => t.paper === paper);
}

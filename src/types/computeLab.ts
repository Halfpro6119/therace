/**
 * Compute Lab – types for AQA GCSE Computer Science 8525
 * Units 3.1–3.8, concepts, glossary, quick checks, algorithm lab, calculation lab, logic lab, SQL lab, question lab.
 */

export type ComputeUnitId = '3.1' | '3.2' | '3.3' | '3.4' | '3.5' | '3.6' | '3.7' | '3.8';
export type ComputePaper = 1 | 2;

export interface ComputeTopic {
  id: string;
  unitId: ComputeUnitId;
  title: string;
  specRef: string;
}

export interface ComputeUnit {
  id: ComputeUnitId;
  title: string;
  shortTitle: string;
  paper1: boolean;
  paper2: boolean;
  topics: ComputeTopic[];
}

export interface ComputeConcept {
  id: string;
  unitId: ComputeUnitId;
  topicId: string;
  title: string;
  coreIdea: string;
  visualModel?: { type: 'diagram' | 'flow' | 'list'; description: string };
  commonMisconception: string;
  changeScenarios: Array<{ prompt: string; explanation: string }>;
}

export interface ComputeTerm {
  id: string;
  unitId: ComputeUnitId;
  topicId?: string;
  term: string;
  definition: string;
  inContext?: string;
}

export type QuickCheckType = 'multipleChoice' | 'trueFalse' | 'shortAnswer';

export interface ComputeQuickCheck {
  id: string;
  unitId: ComputeUnitId;
  topicId: string;
  type: QuickCheckType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  feedback: { correct: string; incorrect: string };
}

export interface TraceTableTask {
  id: string;
  unitId: ComputeUnitId;
  topicId: string;
  title: string;
  pseudoCode: string;
  inputValues: Record<string, string | number>;
  expectedOutput: string;
  traceColumns: string[];
}

export type CalculationType =
  | 'binaryToDecimal'
  | 'decimalToBinary'
  | 'hexToDecimal'
  | 'decimalToHex'
  | 'binaryToHex'
  | 'hexToBinary'
  | 'binaryAddition'
  | 'binaryShift'
  | 'bitmapFileSize'
  | 'soundFileSize'
  | 'huffmanBits'
  | 'rleEncoding';

export interface ComputeCalculationTask {
  id: string;
  unitId: ComputeUnitId;
  topicId: string;
  type: CalculationType;
  scenario: string;
  inputs: Record<string, number>;
  expected: number | string;
  formulaHint?: string;
}

export interface LogicCircuitTask {
  id: string;
  unitId: ComputeUnitId;
  topicId: string;
  title: string;
  inputs: string[];
  truthTable: Record<string, number>;
  expression?: string;
}

export interface SqlTask {
  id: string;
  unitId: ComputeUnitId;
  topicId: string;
  title: string;
  schema: string;
  question: string;
  expectedQuery?: string;
  expectedResult?: string[][];
}

export interface ComputeQuestion {
  id: string;
  unitId: ComputeUnitId;
  topicId: string;
  paper: ComputePaper;
  type: 'multipleChoice' | 'shortAnswer' | 'extended';
  question: string;
  options?: string[];
  correctAnswer: string;
  markScheme: string;
}

/** Mistake Museum: common misconception with why students think it and why it is wrong */
export interface ComputeMisconception {
  id: string;
  unitId: ComputeUnitId;
  topicId?: string;
  misconception: string;
  whyStudentsThinkThis: string;
  whyItsWrong: string;
}

/** Progress: per unit/topic for gating */
export interface ComputeTopicProgress {
  unitId: ComputeUnitId;
  topicId: string;
  flashcardMasteryPercent: number;
  quickCheckPassed: boolean;
  algorithmLabCompleted: boolean;
  calculationLabCompleted: boolean;
  logicLabCompleted: boolean;
  sqlLabCompleted: boolean;
  questionLabCompleted: boolean;
  lastUpdated: string;
}

export type ComputeConfidenceLevel = 1 | 2 | 3;

export interface ComputeFlashcardMastery {
  termId: string;
  confidenceLevel: ComputeConfidenceLevel;
  timesViewed: number;
  timesConfident: number;
  lastViewed: string;
  masteryPercent: number;
}

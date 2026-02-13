/**
 * Science Lab answer grading – keyword matching and mark-scheme style checking
 */

import type { ScienceQuestion, ScienceMisconception } from '../types/scienceLab';

/** Extract key science terms from text (words/phrases that matter for grading) */
function extractKeywords(text: string): string[] {
  const lower = text.toLowerCase().replace(/[^\w\s]/g, ' ');
  const terms = [
    'diffusion', 'osmosis', 'active transport', 'concentration gradient',
    'high concentration', 'low concentration', 'partially permeable',
    'enzyme', 'substrate', 'active site', 'denatured', 'catalyst',
    'photosynthesis', 'respiration', 'glucose', 'atp', 'kinetic energy',
    'insulin', 'glucagon', 'homeostasis', 'negative feedback',
    'antibodies', 'antigens', 'memory cells', 'vaccination', 'vaccine',
    'natural selection', 'evolution', 'variation', 'allele', 'genotype', 'phenotype',
    'carbon dioxide', 'oxygen', 'chlorophyll', 'limiting factor',
    'ionic', 'covalent', 'electrons', 'transfer', 'share', 'bonding',
    'energy', 'transferred', 'destroyed', 'conserved', 'stores',
  ];
  const found: string[] = [];
  for (const term of terms) {
    if (lower.includes(term)) found.push(term);
  }
  return found;
}

/** Check if answer contains common mistake phrases (auto-incorrect) */
function containsCommonMistake(answer: string, commonMistakes: string[]): boolean {
  const lower = answer.toLowerCase();
  for (const mistake of commonMistakes) {
    const m = mistake.toLowerCase();
    // Match significant phrases (3+ words) or exact short phrases
    if (m.length >= 10 && lower.includes(m)) return true;
    const words = m.split(/\s+/).filter(w => w.length > 3);
    if (words.length >= 2 && words.every(w => lower.includes(w))) return true;
  }
  return false;
}

/** Grade a science answer: returns { correct: boolean, score?: number } */
export function gradeScienceAnswer(
  question: ScienceQuestion,
  userAnswer: string
): { correct: boolean; score?: number; reason?: string } {
  const correctAnswer = question.correctAnswer;
  if (!correctAnswer || (Array.isArray(correctAnswer) && correctAnswer.length === 0)) {
    return { correct: false, reason: 'No correct answer defined' };
  }

  const normalized = userAnswer.trim().toLowerCase().replace(/\s+/g, ' ');
  const correctAnswers = Array.isArray(correctAnswer)
    ? correctAnswer.map(a => String(a || '').trim().toLowerCase()).filter(Boolean)
    : [String(correctAnswer).trim().toLowerCase()];

  if (correctAnswers.length === 0) return { correct: false, reason: 'No valid correct answer' };

  // 1. Exact or close match
  for (const ca of correctAnswers) {
    if (ca && (normalized === ca || normalized.includes(ca))) return { correct: true };
  }

  // 2. Common mistake check – if answer clearly states wrong idea, mark incorrect
  const commonMistakes = question.commonMistakes ?? [];
  if (commonMistakes.length > 0 && containsCommonMistake(userAnswer, commonMistakes)) {
    return { correct: false, reason: 'Contains common misconception' };
  }

  // 3. Keyword matching – require a portion of key terms from correct answer
  const correctKeywords = extractKeywords(correctAnswers.join(' '));
  const userKeywords = extractKeywords(normalized);

  if (correctKeywords.length === 0) {
    // Fallback: substring check
    const ok = correctAnswers.some(ca => normalized.includes(ca));
    return { correct: ok };
  }

  const matchCount = userKeywords.filter(k => correctKeywords.includes(k)).length;
  const requiredRatio = Math.min(0.6, Math.max(0.4, 2 / correctKeywords.length));
  const correct = matchCount >= Math.ceil(correctKeywords.length * requiredRatio);

  return { correct };
}

/** Grade a misconception correction answer – keyword matching */
export function gradeMisconceptionAnswer(
  misconception: ScienceMisconception,
  userAnswer: string
): { correct: boolean; feedback?: string } {
  const lower = userAnswer.trim().toLowerCase();
  const correct = misconception.correctUnderstanding.toLowerCase();
  const keyTerms = extractKeywords(correct);
  const userTerms = extractKeywords(userAnswer);
  const mistakePhrases = misconception.misconception.toLowerCase().split(/\s+/).filter(w => w.length > 4);
  const hasMistake = mistakePhrases.some(p => lower.includes(p));
  if (hasMistake && keyTerms.length > 0) return { correct: false, feedback: misconception.whyWrong };
  const matchCount = userTerms.filter(k => keyTerms.includes(k)).length;
  const ok = matchCount >= Math.ceil(keyTerms.length * 0.5) || lower.includes(correct.slice(0, 30));
  return { correct: ok, feedback: ok ? misconception.correctUnderstanding : misconception.whyWrong };
}

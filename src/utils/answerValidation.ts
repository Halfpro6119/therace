/**
 * Answer Validation Utilities
 * Provides robust, production-ready answer checking with support for:
 * - Whitespace trimming and case-insensitive matching
 * - Multiple accepted answers (pipe-delimited or array)
 * - Common mathematical variants (0.5 vs 1/2, etc.)
 * - Prevents partial/incorrect matches
 */

/**
 * Normalize an answer for comparison
 * - Trim whitespace
 * - Convert to lowercase
 * - Handle common mathematical variants
 */
export function normalizeAnswer(answer: string): string {
  if (!answer || typeof answer !== 'string') return '';
  
  let normalized = answer.trim().toLowerCase();
  
  // Handle common mathematical variants
  // 0.5 <-> 1/2
  if (normalized === '0.5') normalized = '1/2';
  if (normalized === '1/2') normalized = '0.5';
  
  // 0.25 <-> 1/4
  if (normalized === '0.25') normalized = '1/4';
  if (normalized === '1/4') normalized = '0.25';
  
  // 0.75 <-> 3/4
  if (normalized === '0.75') normalized = '3/4';
  if (normalized === '3/4') normalized = '0.75';
  
  // 0.333... <-> 1/3
  if (normalized.match(/^0\.33+$/)) normalized = '1/3';
  if (normalized === '1/3') normalized = '0.33';
  
  // 0.666... <-> 2/3
  if (normalized.match(/^0\.66+$/)) normalized = '2/3';
  if (normalized === '2/3') normalized = '0.67';
  
  return normalized;
}

/**
 * Parse answer list from various formats
 * Supports:
 * - Array of strings: ['answer1', 'answer2']
 * - Pipe-delimited string: 'answer1|answer2'
 * - Single string: 'answer'
 */
export function parseAnswerList(answers: string | string[]): string[] {
  if (!answers) return [];
  
  if (Array.isArray(answers)) {
    return answers.filter(a => typeof a === 'string' && a.trim().length > 0);
  }
  
  if (typeof answers === 'string') {
    if (answers.includes('|')) {
      return answers.split('|').map(a => a.trim()).filter(a => a.length > 0);
    }
    return answers.trim().length > 0 ? [answers] : [];
  }
  
  return [];
}

/**
 * Check if a user's answer matches any accepted answer
 * 
 * @param userAnswer - The answer provided by the user
 * @param acceptedAnswers - Array of accepted answers or pipe-delimited string
 * @returns true if the answer is correct, false otherwise
 */
export function isAnswerCorrect(
  userAnswer: string,
  acceptedAnswers: string | string[]
): boolean {
  if (!userAnswer || !acceptedAnswers) return false;
  
  const normalizedUserAnswer = normalizeAnswer(userAnswer);
  if (!normalizedUserAnswer) return false;
  
  const answerList = parseAnswerList(acceptedAnswers);
  if (answerList.length === 0) return false;
  
  // Check if user's answer matches any accepted answer
  return answerList.some(acceptedAnswer => {
    const normalizedAccepted = normalizeAnswer(acceptedAnswer);
    return normalizedUserAnswer === normalizedAccepted;
  });
}

/**
 * Validate answer with detailed feedback
 * Useful for debugging and testing
 */
export function validateAnswerDetailed(
  userAnswer: string,
  acceptedAnswers: string | string[]
): {
  isCorrect: boolean;
  normalizedUserAnswer: string;
  normalizedAcceptedAnswers: string[];
  matchedAnswer?: string;
} {
  const normalizedUserAnswer = normalizeAnswer(userAnswer);
  const answerList = parseAnswerList(acceptedAnswers);
  const normalizedAcceptedAnswers = answerList.map(normalizeAnswer);
  
  const matchedAnswer = normalizedAcceptedAnswers.find(
    a => a === normalizedUserAnswer
  );
  
  return {
    isCorrect: !!matchedAnswer,
    normalizedUserAnswer,
    normalizedAcceptedAnswers,
    matchedAnswer,
  };
}

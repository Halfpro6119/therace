import { describe, it, expect } from 'vitest';
import { normalizeSpellInput, levenshteinDistance, isNearMiss, gradeSpellAttempt } from '../grading';

describe('vocab grading', () => {
  describe('normalizeSpellInput', () => {
    it('trims and lowercases', () => {
      expect(normalizeSpellInput('  INEVITABLE  ')).toBe('inevitable');
    });
    it('collapses spaces', () => {
      expect(normalizeSpellInput('a   b   c')).toBe('a b c');
    });
  });

  describe('levenshteinDistance', () => {
    it('same string returns 0', () => {
      expect(levenshteinDistance('word', 'word')).toBe(0);
    });
    it('one insertion', () => {
      expect(levenshteinDistance('word', 'words')).toBe(1);
    });
    it('one substitution', () => {
      expect(levenshteinDistance('inevitable', 'inevitible')).toBe(1);
    });
    it('two edits', () => {
      expect(levenshteinDistance('persuasive', 'persuasife')).toBe(2);
    });
  });

  describe('isNearMiss', () => {
    it('distance <= 2 and length >= 6 is near miss', () => {
      expect(isNearMiss(2, 10)).toBe(true);
      expect(isNearMiss(1, 6)).toBe(true);
    });
    it('distance > 2 is not near miss', () => {
      expect(isNearMiss(3, 10)).toBe(false);
    });
    it('length < 6 is not near miss', () => {
      expect(isNearMiss(1, 5)).toBe(false);
    });
  });

  describe('gradeSpellAttempt', () => {
    it('exact match is correct', () => {
      const r = gradeSpellAttempt('inevitable', 'inevitable');
      expect(r.isCorrect).toBe(true);
      expect(r.nearMiss).toBe(false);
      expect(r.levenshteinDistance).toBe(0);
    });
    it('normalized match is correct', () => {
      const r = gradeSpellAttempt('  Inevitable  ', 'inevitable');
      expect(r.isCorrect).toBe(true);
    });
    it('one letter wrong with length >= 6 is near miss', () => {
      const r = gradeSpellAttempt('inevitible', 'inevitable');
      expect(r.isCorrect).toBe(false);
      expect(r.nearMiss).toBe(true);
    });
    it('completely wrong is not near miss', () => {
      const r = gradeSpellAttempt('wrong', 'inevitable');
      expect(r.isCorrect).toBe(false);
      expect(r.nearMiss).toBe(false);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { getMasteryDelta, getStreakDelta, shouldAddToFixIt } from '../mastery';

describe('vocab mastery', () => {
  describe('getMasteryDelta', () => {
    it('correct fast (<=6s) gives +12', () => {
      expect(getMasteryDelta(true, false, 5000)).toBe(12);
      expect(getMasteryDelta(true, false, 6000)).toBe(12);
    });
    it('correct medium (<=12s) gives +8', () => {
      expect(getMasteryDelta(true, false, 8000)).toBe(8);
      expect(getMasteryDelta(true, false, 12000)).toBe(8);
    });
    it('correct slow gives +5', () => {
      expect(getMasteryDelta(true, false, 15000)).toBe(5);
    });
    it('wrong gives -10', () => {
      expect(getMasteryDelta(false, false, 1000)).toBe(-10);
    });
    it('near miss gives +2', () => {
      expect(getMasteryDelta(false, true, 1000)).toBe(2);
    });
  });

  describe('getStreakDelta', () => {
    it('correct gives +1', () => {
      expect(getStreakDelta(true)).toBe(1);
    });
    it('wrong gives large negative', () => {
      expect(getStreakDelta(false)).toBeLessThan(0);
    });
  });

  describe('shouldAddToFixIt', () => {
    it('wrong adds to fixit', () => {
      expect(shouldAddToFixIt(false, false)).toBe(true);
    });
    it('near miss adds to fixit', () => {
      expect(shouldAddToFixIt(false, true)).toBe(true);
    });
    it('correct and not near miss does not add', () => {
      expect(shouldAddToFixIt(true, false)).toBe(false);
    });
  });
});

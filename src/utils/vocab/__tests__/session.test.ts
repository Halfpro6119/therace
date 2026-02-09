import { describe, it, expect } from 'vitest';
import { selectSessionWords, applySessionLength } from '../session';
import type { VocabWord } from '../../../types/vocab';
import type { VocabMastery } from '../../../types/vocab';

function word(id: string, setId = 'set1'): VocabWord {
  return {
    id,
    set_id: setId,
    word: id,
    definition: '',
    pronunciation: null,
    synonyms: [],
    antonyms: [],
    connotation: 'neutral',
    word_class: 'noun',
    example_sentence: '',
    common_misspellings: [],
    difficulty: 3,
    tags: [],
    created_at: '',
  };
}

function mastery(wordId: string, overrides: Partial<VocabMastery> = {}): VocabMastery {
  return {
    user_id: 'u1',
    word_id: wordId,
    mastery: 0,
    streak: 0,
    last_seen: null,
    next_due: null,
    ease: 2.5,
    lapses: 0,
    ...overrides,
  };
}

describe('vocab session', () => {
  describe('selectSessionWords', () => {
    it('returns up to limit items', () => {
      const words = [word('a'), word('b'), word('c')];
      const m = new Map<string, VocabMastery>();
      const items = selectSessionWords(words, m, 2);
      expect(items.length).toBe(2);
    });
    it('prioritises due then weak then new', () => {
      const words = [word('due'), word('weak'), word('new')];
      const now = new Date();
      const m = new Map<string, VocabMastery>([
        ['due', mastery('due', { next_due: now.toISOString(), mastery: 50 })],
        ['weak', mastery('weak', { next_due: new Date(now.getTime() + 1e6).toISOString(), mastery: 30 })],
      ]);
      const items = selectSessionWords(words, m, 3);
      expect(items.length).toBe(3);
      const ids = items.map(i => i.word.id);
      expect(ids).toContain('due');
      expect(ids).toContain('weak');
      expect(ids).toContain('new');
    });
    it('weakOnly returns only weak words when available', () => {
      const words = [word('a'), word('b'), word('c')];
      const now = new Date();
      const m = new Map<string, VocabMastery>([
        ['a', mastery('a', { mastery: 30, next_due: new Date(now.getTime() + 1e6).toISOString() })],
        ['b', mastery('b', { mastery: 40, next_due: new Date(now.getTime() + 1e6).toISOString() })],
        ['c', mastery('c', { mastery: 90, next_due: now.toISOString() })],
      ]);
      const items = selectSessionWords(words, m, 5, now, true);
      expect(items.length).toBe(2);
      const ids = items.map(i => i.word.id).sort();
      expect(ids).toEqual(['a', 'b']);
    });
  });

  describe('applySessionLength', () => {
    it('slices to 10 for length 10', () => {
      const items = Array.from({ length: 20 }, (_, i) => ({ word: word(`w${i}`), mastery: null }));
      const out = applySessionLength(items, 10);
      expect(out.length).toBe(10);
    });
    it('mastery_sprint caps at 25', () => {
      const items = Array.from({ length: 30 }, (_, i) => ({ word: word(`w${i}`), mastery: null }));
      const out = applySessionLength(items, 'mastery_sprint');
      expect(out.length).toBe(25);
    });
  });
});

/**
 * Vocab Lab – session word selection: due / weak / new, interleave
 */

import type { VocabWord } from '../../types/vocab';
import type { VocabMastery } from '../../types/vocab';
import type { VocabSessionConfig } from '../../types/vocab';
import type { VocabSessionItem } from '../../types/vocab';

const DUE_RATIO = 0.5;
const WEAK_RATIO = 0.3;
const NEW_RATIO = 0.2;

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Bucket words into due (next_due <= now or null with existing mastery), weak (mastery < 60), new (no mastery).
 * Then interleave by ratio 50% due, 30% weak, 20% new (by availability).
 * When weakOnly is true, returns only weak words (or due/new if no weak words).
 */
export function selectSessionWords(
  words: VocabWord[],
  masteryByWordId: Map<string, VocabMastery>,
  limit: number,
  now: Date = new Date(),
  weakOnly = false
): VocabSessionItem[] {
  const due: VocabSessionItem[] = [];
  const weak: VocabSessionItem[] = [];
  const newWords: VocabSessionItem[] = [];

  for (const word of words) {
    const m = masteryByWordId.get(word.id) ?? null;
    if (m) {
      if (m.next_due == null || new Date(m.next_due) <= now) {
        due.push({ word, mastery: m });
      } else if (m.mastery < 60) {
        weak.push({ word, mastery: m });
      } else {
        due.push({ word, mastery: m }); // not due but has mastery – treat as lower priority by putting in due bucket but we'll take due first
      }
    } else {
      newWords.push({ word, mastery: null });
    }
  }

  // Re-bucket: "due" we keep; others that have mastery but next_due in future and mastery >= 60 go to a "rest" bucket we use to fill
  const rest: VocabSessionItem[] = [];
  const dueOnly: VocabSessionItem[] = [];
  for (const item of due) {
    if (item.mastery && item.mastery.next_due != null && new Date(item.mastery.next_due) > now && item.mastery.mastery >= 60) {
      rest.push(item);
    } else {
      dueOnly.push(item);
    }
  }

  const shuffledDue = shuffle(dueOnly);
  const shuffledWeak = shuffle(weak);
  const shuffledNew = shuffle(newWords);
  const shuffledRest = shuffle(rest);

  if (weakOnly && shuffledWeak.length > 0) {
    return shuffle(shuffledWeak).slice(0, limit);
  }
  if (weakOnly) {
    return shuffle([...shuffledDue, ...shuffledNew]).slice(0, limit);
  }

  const nDue = Math.min(shuffledDue.length, Math.ceil(limit * DUE_RATIO));
  const nWeak = Math.min(shuffledWeak.length, Math.ceil(limit * WEAK_RATIO));
  const nNew = Math.min(shuffledNew.length, Math.ceil(limit * NEW_RATIO));
  let remaining = limit - nDue - nWeak - nNew;
  const fromDue = shuffledDue.slice(0, nDue);
  const fromWeak = shuffledWeak.slice(0, nWeak);
  const fromNew = shuffledNew.slice(0, nNew);
  const combined = [...fromDue, ...fromWeak, ...fromNew];
  if (remaining > 0) {
    const restTake = shuffledRest.slice(0, remaining);
    combined.push(...restTake);
    remaining -= restTake.length;
  }
  if (remaining > 0) {
    combined.push(...shuffledDue.slice(nDue, nDue + remaining));
    remaining -= Math.min(shuffledDue.length - nDue, remaining);
  }
  if (remaining > 0) {
    combined.push(...shuffledWeak.slice(nWeak, nWeak + remaining));
    remaining -= Math.min(shuffledWeak.length - nWeak, remaining);
  }
  if (remaining > 0) {
    combined.push(...shuffledNew.slice(nNew, nNew + remaining));
  }

  return shuffle(combined).slice(0, limit);
}

/**
 * Apply session length: 10, 20, 40, or mastery_sprint (max 25, end when 5 correct in a row).
 */
export function applySessionLength(
  items: VocabSessionItem[],
  length: 10 | 20 | 40 | 'mastery_sprint'
): VocabSessionItem[] {
  if (length === 'mastery_sprint') {
    return items.slice(0, 25);
  }
  return items.slice(0, length);
}

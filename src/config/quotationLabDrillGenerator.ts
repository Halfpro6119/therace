/**
 * Quotation Lab — Auto-generated drill system.
 * Drills are generated from quote metadata (themes, methods, difficulty, bestUsedFor, commonMisuse, contextHook).
 * Scalable, examiner-faithful, no manual drill writing.
 */

import type {
  QuotationLabQuote,
  QuotationLabSourceId,
  QuotationMisuseReasonId,
  QuotationDrillItem,
  QuotationDrillExplain,
  QuotationDrillBestFit,
  QuotationDrillUpgrade,
  QuotationDrillLinkTwo,
  QuotationDrillContextWeave,
  QuotationDrillMisuseDetection,
} from '../types/englishCampus';

export const MISUSE_REASON_OPTIONS: { id: QuotationMisuseReasonId; label: string }[] = [
  { id: 'over-simplified', label: 'Over-simplified' },
  { id: 'no-judgement', label: 'No judgement' },
  { id: 'no-development', label: 'No development' },
  { id: 'technique-spotting', label: 'Technique spotting only' },
  { id: 'over-quoting', label: 'Over-quoting' },
  { id: 'no-focus', label: 'No focus on question' },
  { id: 'too-narrative', label: 'Too narrative' },
  { id: 'no-method', label: 'No method' },
  { id: 'too-specific', label: 'Too specific' },
  { id: 'repeats-question', label: 'Repeats the question' },
];

/** Map commonMisuse text to reason ids (heuristic). */
function misuseToReasonIds(commonMisuse: string): QuotationMisuseReasonId[] {
  const lower = commonMisuse.toLowerCase();
  const ids: QuotationMisuseReasonId[] = [];
  if (lower.includes('without') || lower.includes('only') || lower.includes('literally') || lower.includes('descriptive')) ids.push('over-simplified');
  if (lower.includes('judgement') || lower.includes('analytical') || lower.includes('descriptive')) ids.push('no-judgement');
  if (lower.includes('development') || lower.includes('change') || lower.includes('structure')) ids.push('no-development');
  if (lower.includes('technique') || lower.includes('method') || lower.includes('spotting')) ids.push('technique-spotting');
  if (lower.includes('over-quot') || lower.includes('whole line') || lower.includes('embed')) ids.push('over-quoting');
  if (lower.includes('focus') || lower.includes('irrelevant') || lower.includes('without linking')) ids.push('no-focus');
  if (lower.includes('narrative') || lower.includes('retelling') || lower.includes('descriptive')) ids.push('too-narrative');
  if (lower.includes('method') && (lower.includes('without') || lower.includes('no ') || lower.includes('lack'))) ids.push('no-method');
  if (lower.includes('specific') || lower.includes('narrow')) ids.push('too-specific');
  if (lower.includes('repeat') || lower.includes('rephrase') || lower.includes('restate')) ids.push('repeats-question');
  if (ids.length === 0) ids.push('over-simplified', 'no-judgement');
  return ids.slice(0, 3);
}

/** Build option ids list for a drill (use correct ones + fill with others). */
function reasonOptionIdsFor(correctIds: QuotationMisuseReasonId[]): QuotationMisuseReasonId[] {
  const all: QuotationMisuseReasonId[] = [
    'over-simplified', 'no-judgement', 'no-development', 'technique-spotting', 'over-quoting', 'no-focus',
    'too-narrative', 'no-method', 'too-specific', 'repeats-question',
  ];
  const rest = all.filter(id => !correctIds.includes(id));
  return [...correctIds, ...rest].slice(0, 4);
}

/** Generate weak student sentence from meaning/commonMisuse (simple template). */
function weakSentenceFromQuote(q: QuotationLabQuote): string {
  if (q.commonMisuse && q.commonMisuse.length < 80) {
    const part = q.commonMisuse.replace(/^Avoid:?\s*/i, '').split(/[.;]/)[0];
    if (part) return part.trim() + '.';
  }
  const theme = q.themes[0] ?? 'the theme';
  return `This quote shows ${theme}.`;
}

/** Theme label for prompts (capitalise first letter). */
function themeLabel(theme: string): string {
  return theme.charAt(0).toUpperCase() + theme.slice(1);
}

/** Student-facing quote set: exclude archived (dead weight). */
function quotesForDrills(quotes: QuotationLabQuote[]): QuotationLabQuote[] {
  return quotes.filter(q => q.qualityTier !== 'archived');
}

/**
 * Generate all drill types from quote bank.
 * Pipeline: Quote Selection (prioritised), Misuse Detection, One-Sentence, Grade Upgrade, Link Two, Context Weave.
 * Archived quotes are excluded from drills.
 */
export function generateQuotationDrills(quotes: QuotationLabQuote[]): QuotationDrillItem[] {
  const drills: QuotationDrillItem[] = [];
  const eligible = quotesForDrills(quotes);
  const bySource = new Map<QuotationLabSourceId, QuotationLabQuote[]>();
  for (const q of eligible) {
    const list = bySource.get(q.sourceId) ?? [];
    list.push(q);
    bySource.set(q.sourceId, list);
  }

  // ---- 1. Quote Selection (AO1) — per source, per theme with ≥4 quotes; prefer anchor/gold ----
  bySource.forEach((sourceQuotes, sourceId) => {
    const byTheme = new Map<string, QuotationLabQuote[]>();
    for (const q of sourceQuotes) {
      for (const t of q.themes) {
        const key = t.toLowerCase();
        const list = byTheme.get(key) ?? [];
        list.push(q);
        byTheme.set(key, list);
      }
    }
    byTheme.forEach((themeQuotes, themeKey) => {
      if (themeQuotes.length < 4) return;
      const unique = Array.from(new Map(themeQuotes.map(q => [q.id, q])).values());
      if (unique.length < 4) return;
      const anchorFirst = [...unique].sort((a, b) => (b.qualityTier === 'anchor' ? 1 : 0) - (a.qualityTier === 'anchor' ? 1 : 0));
      const best = anchorFirst.find(q => q.bestUsedFor?.some(b => b.toLowerCase().includes(themeKey)))
        ?? anchorFirst.find(q => q.bestFor?.some(b => b.toLowerCase().includes(themeKey)))
        ?? anchorFirst[0];
      const options = unique
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      if (!options.some(o => o.id === best.id)) options[3] = best;
      const quoteOptionIds: [string, string, string, string] = [
        options[0].id,
        options[1].id,
        options[2].id,
        options[3].id,
      ];
      const themeName = themeLabel(themeKey);
      drills.push({
        type: 'whichQuoteFitsBest',
        id: `gen-sel-${sourceId}-${themeKey}-${best.id}`,
        sourceId,
        question: `Select the best quote to support the idea that ${themeName} is central.`,
        quoteOptionIds,
        bestQuoteId: best.id,
        whyBest: best.meaning + (best.grade9Insight ? ` ${best.grade9Insight}` : ''),
      } satisfies QuotationDrillBestFit);
    });
  });

  // ---- 2. One-Sentence Analysis (AO2) — per quote, per theme ----
  eligible.forEach(q => {
    const themes = q.themes.length ? q.themes : ['meaning'];
    themes.slice(0, 2).forEach((theme, i) => {
      const themeName = themeLabel(theme);
      drills.push({
        type: 'explainQuote',
        id: `gen-oa2-${q.id}-${i}`,
        sourceId: q.sourceId,
        quoteId: q.id,
        themePrompt: `In one sentence, explain how this quote presents ${themeName}.`,
        maxWords: 20,
        gradingNote: 'Grade 4: basic meaning. Grade 6: meaning + theme. Grade 8: method + meaning. Grade 9: concept + judgement. Must include judgement.',
      } satisfies QuotationDrillExplain);
    });
  });

  // ---- 3. Grade Upgrade — per quote (core preferred) ----
  eligible.forEach(q => {
    const weak = weakSentenceFromQuote(q);
    const focus = q.grade9Insight ?? q.deploymentTip ?? `Add method (${q.method}), precision, and judgement.`;
    drills.push({
      type: 'upgradeAnalysis',
      id: `gen-up-${q.id}`,
      sourceId: q.sourceId,
      quoteId: q.id,
      weakResponse: weak,
      upgradeFocus: focus,
    } satisfies QuotationDrillUpgrade);
  });

  // ---- 4. Link Two Quotes — same source, shared theme, different location (max 12 per source) ----
  const MAX_LINK_DRILLS_PER_SOURCE = 12;
  bySource.forEach((sourceQuotes, sourceId) => {
    const withLocation = sourceQuotes.filter(q => q.location);
    let count = 0;
    for (let i = 0; i < withLocation.length && count < MAX_LINK_DRILLS_PER_SOURCE; i++) {
      for (let j = i + 1; j < withLocation.length && count < MAX_LINK_DRILLS_PER_SOURCE; j++) {
        const a = withLocation[i];
        const b = withLocation[j];
        const shared = a.themes.filter(t => b.themes.some(bt => bt.toLowerCase() === t.toLowerCase()));
        if (shared.length === 0 || a.location === b.location) continue;
        const themeName = themeLabel(shared[0]);
        drills.push({
          type: 'linkTwoQuotes',
          id: `gen-link-${sourceId}-${a.id}-${b.id}`,
          sourceId,
          quoteIdA: a.id,
          quoteIdB: b.id,
          linkPrompt: `Link these two quotes to show how ${themeName} develops.`,
          rewardNote: 'Reward: clear development; method in both; avoid listing.',
        } satisfies QuotationDrillLinkTwo);
        count += 1;
      }
    }
  });

  // ---- 5. Misuse Detection — per quote with commonMisuse ----
  eligible.forEach(q => {
    if (!q.commonMisuse) return;
    const correctIds = misuseToReasonIds(q.commonMisuse);
    const optionIds = reasonOptionIdsFor(correctIds);
    drills.push({
      type: 'misuseDetection',
      id: `gen-mis-${q.id}`,
      sourceId: q.sourceId,
      quoteId: q.id,
      prompt: 'Why would this be a weak use of the quote?',
      studentText: weakSentenceFromQuote(q),
      reasonOptionIds: optionIds,
      correctReasonIds: correctIds.length ? correctIds.slice() : ['over-simplified', 'no-judgement'],
      whyWeak: q.commonMisuse,
    } satisfies QuotationDrillMisuseDetection);
  });

  // ---- 6. Context Weave (AO3) — per quote with contextHook ----
  eligible.forEach(q => {
    if (!q.contextHook) return;
    drills.push({
      type: 'contextWeave',
      id: `gen-ctx-${q.id}`,
      sourceId: q.sourceId,
      quoteId: q.id,
      prompt: 'Add one contextual idea that deepens the analysis (not bolted on).',
      maxWords: 25,
      rewardNote: 'Reject: historical dumping, detached facts. Reward: woven context.',
    } satisfies QuotationDrillContextWeave);
  });

  return drills;
}

# Business Hub — Full Functionality Audit

**Date:** February 2025  
**Scope:** All routes, pages, data flows, storage, and user paths for AQA GCSE Business 8132 Business Hub.  
**Fix applied:** Flip Card now toggles (flip to definition ↔ flip back to term); button label “Show term again” when flipped.

---

## 1. Executive Summary

| Area | Status | Notes |
|------|--------|-------|
| **Flip Card** | ✅ Fixed | Was one-way only; now toggles. Button label reflects state. |
| **Routes & navigation** | ✅ | All 10 routes resolve; back links consistent. |
| **Entry & home** | ✅ | Subjects → Business Hub → Units → Unit modes / Topics. |
| **Concept Lab** | ✅ | List → select → core idea, misconception, change scenarios. |
| **Glossary / Flashcards** | ✅ | Flip (toggle), confidence, progress, session complete → topic progress + Quick Check CTA. |
| **Quick Check** | ✅ | MC + True/False; feedback; topic progress on correct; completion screen → Case Study. |
| **Case Study Lab** | ✅ | Scenario + data + questions; model answer + mark scheme; marks unit case study completed; empty state for units with no cases. |
| **Calculation Lab** | ✅ | Scenario + formula hint; optional number input + Check; show answer; marks unit calculations completed; empty state. |
| **Evaluation Builder** | ✅ | Prompt + optional benefit/drawback/conclusion; model answer + breakdown; marks unit evaluation completed; empty state. |
| **Topics page** | ✅ | Progress per topic; Start / Glossary / Quick Check per topic. |
| **Progress & storage** | ✅ | Topic progress (flashcard %, quick check, case study, calculations, evaluation) and flashcard mastery persisted; completion helpers used. |
| **Content coverage** | ⚠️ | Some units have no case studies (3.4) or no calculations (3.2–3.5) or no evaluation prompts (3.3–3.5); empty states handle this. |

---

## 2. Flip Card Fix (Applied)

**Issue:** Flip only worked once: front → back. Clicking the card or “Flip card” again did nothing, so users could not return to the term side.

**Change:**
- `handleFlip` now toggles: `setIsFlipped((prev) => !prev)`.
- Card click and “Flip card” button both call `handleFlip`, so both flip to definition and back to term.
- Button label: “Flip card” when front, “Show term again” when back.
- Hint text: “Tap card or button to reveal definition” (front); “Tap card to see term again” (back).
- Confidence buttons still use `stopPropagation` so they don’t flip the card.

---

## 3. Route-by-Route Verification

| Route | Handler | Data | Empty / error |
|-------|---------|------|----------------|
| `/business-hub` | BusinessHubHomePage | BUSINESS_UNITS | — |
| `/business-hub/unit/:unitId` | BusinessHubUnitPage | getUnitById(unitId) | 404 message + “Back to Business Hub” if invalid unitId |
| `/business-hub/unit/:unitId/topics` | BusinessHubTopicsPage | getUnitById; storage.getBusinessTopicProgressByKey | Same 404 if invalid unit |
| `/business-hub/unit/:unitId/concept` | BusinessHubConceptLabPage | getConceptsByUnit | “No concepts for this unit yet” if none |
| `/business-hub/unit/:unitId/flashcard` | BusinessHubFlashcardPage | getTermsByUnit | “No terms for this unit” + Go Back |
| `/business-hub/unit/:unitId/quick-check` | BusinessHubQuickCheckPage | getQuickChecksByUnit | “No quick checks” + link to Case Study + Back |
| `/business-hub/unit/:unitId/case-study` | BusinessHubCaseStudyPage | getCaseStudiesByUnit | “No case studies for this unit yet” + All units / Back |
| `/business-hub/unit/:unitId/calculations` | BusinessHubCalculationLabPage | getCalculationsByUnit | “No calculation tasks” + Back |
| `/business-hub/unit/:unitId/evaluation` | BusinessHubEvaluationPage | getEvaluationPromptsByUnit | “No evaluation prompts” + Back |

Invalid `unitId` (e.g. `3.7` or `x`) yields `getUnitById` undefined; all unit pages guard and show “Unit not found” / Back.

---

## 4. Page-by-Page Functionality

### 4.1 BusinessHubHomePage
- Back → `/subjects`.
- Renders all 6 units from BUSINESS_UNITS.
- Each unit links to `/business-hub/unit/${unit.id}`.
- **Status:** ✅ Working.

### 4.2 BusinessHubUnitPage
- Back → `/business-hub`.
- “View topic list” → `/business-hub/unit/:unitId/topics`.
- Six mode buttons → concept | flashcard | quick-check | case-study | calculations | evaluation.
- **Status:** ✅ Working.

### 4.3 BusinessHubTopicsPage
- Back → unit page.
- For each topic: progress (flashcard %, quick check), Start (Concept), Glossary (Flashcard), Quick Check.
- **Status:** ✅ Working.

### 4.4 BusinessHubConceptLabPage
- Back → unit page.
- Concept list from getConceptsByUnit; select one → core idea, visual model, misconception, change scenarios.
- Back to list clears selection.
- **Status:** ✅ Working.

### 4.5 BusinessHubFlashcardPage
- Back → unit page.
- Terms from getTermsByUnit; card shows term (front) or definition + inContext (back).
- **Flip:** Card click or button toggles front/back (fixed).
- Confidence (Not sure / Okay / Got it) advances to next card or completes session.
- On session complete: topic progress updated for all topics that have terms in the set; “Quick Check” and “Back to Unit” CTAs.
- Previous/Next change card and reset flip (useEffect).
- **Status:** ✅ Working (flip fix applied).

### 4.6 BusinessHubQuickCheckPage
- Back → unit page.
- Questions from getQuickChecksByUnit; MC or True/False from options.
- Select answer → “Check answer” → feedback (correct/incorrect + ideaReference); on correct, topic progress `quickCheckPassed` set for that question’s topicId.
- “Next” / “Finish → See results” → next question or completion screen.
- Completion screen: “Quick Check complete”, score, “Case Study Lab” and “Back to Unit”.
- If no checks: empty state with link to Case Study and Back.
- **Status:** ✅ Working.

### 4.7 BusinessHubCaseStudyPage
- Back → unit page.
- Case studies from getCaseStudiesByUnit (filtered by unitIds including this unit).
- Renders scenario, data, then questions; “Show model answer” reveals model + mark scheme.
- Previous/Next move within questions then across cases; on last question of last case calls `storage.markUnitCaseStudyCompleted(unit.id, unit.topics.map(t => t.id))` and navigates to Calculations.
- If no case studies: empty state, “All units”, “Back to Unit”.
- **Status:** ✅ Working.

### 4.8 BusinessHubCalculationLabPage
- Back → unit page.
- Tasks from getCalculationsByUnit; shows scenario, formula hint, optional number input + “Check” (where primaryKey/expected exist), interpretation Q.
- “Show answer & interpretation” reveals expected figures and interpretation.
- Previous/Next; on last task calls `storage.markUnitCalculationsCompleted(unit.id, unit.topics.map(t => t.id))` and navigates to Evaluation.
- If no tasks: empty state + Back.
- **Status:** ✅ Working.

### 4.9 BusinessHubEvaluationPage
- Back → unit page.
- Prompts from getEvaluationPromptsByUnit; optional benefit/drawback/conclusion fields; “Show model answer” reveals model + breakdown.
- Previous/Next; on last prompt calls `storage.markUnitEvaluationCompleted(unit.id, unit.topics.map(t => t.id))` and navigates to unit page.
- If no prompts: empty state + Back.
- **Status:** ✅ Working.

---

## 5. Storage & Progress

| Key / API | Purpose | Updated by |
|-----------|---------|------------|
| BUSINESS_HUB_TOPIC_PROGRESS | Per-topic progress | Flashcard (session end), Quick Check (correct), Case Study / Calculation / Evaluation (completion) |
| BUSINESS_HUB_FLASHCARD_MASTERY | Per-term confidence/mastery | BusinessHubFlashcardPage confidence rating |
| getBusinessTopicProgressByKey(unitId, topicId) | Read topic progress | Topics page, Flashcard (session end), Quick Check |
| updateBusinessTopicProgress(progress) | Write one topic | Flashcard, Quick Check |
| updateBusinessFlashcardMastery(termId, level) | Record term confidence | Flashcard confidence buttons |
| calculateBusinessTopicFlashcardMastery(unitId, topicId, termIds) | Topic glossary % | Flashcard session complete |
| markUnitCaseStudyCompleted(unitId, topicIds) | Set caseStudyCompleted for all topics in unit | Case Study page (end of flow) |
| markUnitCalculationsCompleted(unitId, topicIds) | Set calculationsCompleted | Calculation Lab (end of flow) |
| markUnitEvaluationCompleted(unitId, topicIds) | Set evaluationCompleted | Evaluation page (end of flow) |

**Status:** ✅ All used as intended; completion flags persist.

---

## 6. Content Coverage (by unit)

| Unit | Concepts | Terms | Quick checks | Case studies | Calculations | Evaluation |
|------|----------|-------|--------------|--------------|--------------|------------|
| 3.1 | 7 | 12 | 6 | 2 | 2 | 2 |
| 3.2 | 4 | 4 | 2 | 2 | 0 | 1 |
| 3.3 | 2 | 2 | 2 | 1 | 0 | 0 |
| 3.4 | 2 | 3 | 1 | 0 | 0 | 0 |
| 3.5 | 1 | 3 | 1 | 1 | 0 | 0 |
| 3.6 | 3 | 6 | 2 | 1 | 4 | 2 |

- Units 3.4: no case studies (empty state).
- Units 3.2–3.5: no calculation tasks for 3.2, 3.3, 3.4, 3.5 (empty state).
- Units 3.3, 3.4, 3.5: no evaluation prompts (empty state).

Empty states are handled; no runtime errors from missing content.

---

## 7. Recommendations

1. **Done:** Flip Card — toggle and labels implemented.
2. **Optional:** Add more case studies for 3.4; calculation tasks for 3.2–3.5; evaluation prompts for 3.3–3.5 so every unit has at least one of each.
3. **Optional:** Expose Paper 1 / Paper 2 filter in UI (data already supports it).
4. **Optional:** Gate Case Study / Calculations / Evaluation behind “Quick Check passed” or “Glossary completed” if you want a strict learning path.

---

## 8. Files Touched (this audit)

- `src/pages/business/BusinessHubFlashcardPage.tsx` — flip toggle, button label, hints.
- `docs/BUSINESS_HUB_FUNCTIONALITY_AUDIT.md` — this audit.

No other code changes required for the reported “broken Flip Card” or for the audit findings above.

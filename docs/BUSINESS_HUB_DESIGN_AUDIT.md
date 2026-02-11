# Business Hub — Complete Design Audit

**Date:** February 11, 2025  
**Scope:** AQA GCSE Business 8132 — Business Hub (units 3.1–3.6, Concept Lab, Glossary/Flashcards, Quick Check, Case Study, Calculation Lab, Evaluation Builder)  
**Reference:** Implementation plan (`docs/BUSINESS_STUDIES_IMPLEMENTATION_PLAN.md`), Science Lab audit, Maths Hub patterns.

---

## Executive Summary

The Business Hub has a **solid structure** aligned with the implementation plan: units 3.1–3.6, six learning modes, config-driven content, and progress storage. Gaps are mainly in **information architecture**, **consistency with other hubs**, **gating/flow clarity**, **content depth**, and **UX polish** (empty states, recommended path, Paper 1/2 filtering).

**Key findings:**
- ✅ Clear unit → mode → activity hierarchy; types and config are well-defined
- ✅ Progress (flashcard mastery, topic quick check passed) is persisted
- ⚠️ No “recommended next step” or learning path (Science Lab has “Start with Concept Lab” / “Complete Quick Check”)
- ⚠️ Mode order and grouping not explained (Learn vs Practise; Concept → Glossary → Quick Check → Case Study → Calculations → Evaluation)
- ⚠️ Hero gradient and mode colours inconsistent with hub identity (Concept Lab uses blue/pink, not amber)
- ⚠️ Paper 1/2 filter exists in data but is not exposed in UI
- ⚠️ Topics page “Start” always goes to Concept Lab; no topic-level mode entry
- ⚠️ Case Study / Calculation / Evaluation are read-only (show model answer); no input or marking
- ⚠️ Quick Check: passing one question marks only that question’s topic; unit-level “passed” not defined
- ⚠️ Empty and error states are minimal; no loading skeletons

---

## 1. Functional Audit

### 1.1 Learning Flow (Intended: Concept → Glossary → Quick Check → Case Study → Calculations → Evaluation)

| Component | Status | Notes |
|-----------|--------|-------|
| Concept Lab | ✅ | List concepts → select → core idea, visual model, misconception, change scenarios |
| Glossary / Flashcards | ✅ | Flip card, confidence (Not sure / Okay / Got it), progress bar, session complete → Quick Check CTA |
| Quick Check | ✅ | MC + True/False; feedback + idea reference; correct answer updates **topic** `quickCheckPassed` |
| Case Study Lab | ⚠️ | Read-only: scenario + data + question → “Show model answer” + mark scheme; no student input |
| Calculation Lab | ⚠️ | Read-only: scenario + formula hint + interpretation Q → “Show answer & interpretation”; no input |
| Evaluation Builder | ⚠️ | Read-only: prompt + “Show model answer” + breakdown; no student answer or marking |

**Flow bugs / gaps:**

1. **No gating**  
   All modes are reachable from the unit page regardless of progress. The plan specified: “Case Study Lab and/or Question Lab unlocked when Concept + Glossary (or Flashcard) + Quick Check done for that topic/unit.” Currently there is no locking of Case Study, Calculations, or Evaluation.

2. **Quick Check “passed” is per-topic, not per-unit**  
   Each correct answer sets `quickCheckPassed: true` for that question’s `topicId` only. The Unit page does not show “Quick Check passed for this unit” (e.g. “4/7 topics passed”). Topics page shows “Quick check: Passed” per topic, which is correct for the current data.

3. **Case Study / Calculation / Evaluation are passive**  
   Students only reveal model answers. There is no text input, calculation input, or mark-scheme-style feedback on student answers. The plan mentioned “structured form (student fills benefit, drawback, conclusion) with feedback” for Evaluation and “fill gaps in a forecast” for Calculation Lab.

4. **Calculation Lab does not implement calculation types**  
   Config has `revenueCostProfit`, `unitCost`, `cashFlow`, `averageRateOfReturn`, `grossProfitMargin`, `netProfitMargin` with `inputs` and `expected`, but the UI only shows scenario + formula hint + “Show answer & interpretation”. No inputs for student to enter figures or check against `expected`.

### 1.2 Navigation & Routes

| Route | Purpose |
|-------|---------|
| `/business-hub` | Home: list units 3.1–3.6 |
| `/business-hub/unit/:unitId` | Unit: list 6 learning modes + “View topic list” |
| `/business-hub/unit/:unitId/topics` | Topics: list topics with progress, “Start” → Concept Lab |
| `/business-hub/unit/:unitId/concept` | Concept Lab |
| `/business-hub/unit/:unitId/flashcard` | Flashcards |
| `/business-hub/unit/:unitId/quick-check` | Quick Check |
| `/business-hub/unit/:unitId/case-study` | Case Study Lab |
| `/business-hub/unit/:unitId/calculations` | Calculation Lab |
| `/business-hub/unit/:unitId/evaluation` | Evaluation Builder |

- No `/business-hub/paper/1` or `/business-hub/paper/2` (plan suggested optional paper filter).
- “Start” on Topics page always goes to Concept Lab; no way to jump to Flashcard or Quick Check per topic.

### 1.3 Progress & Storage

- **Topic progress** (`BusinessTopicProgress`): `flashcardMasteryPercent`, `quickCheckPassed`, `caseStudyCompleted`, `calculationsCompleted`, `evaluationCompleted`, `lastUpdated`.  
  - Updated: flashcard completion (per topic from terms in set), quick check correct (per topic).  
  - **Not updated:** Case Study, Calculation, Evaluation pages do not set `caseStudyCompleted` / `calculationsCompleted` / `evaluationCompleted`.
- **Flashcard mastery** (`BusinessFlashcardMastery`): confidence, timesViewed, timesConfident, masteryPercent.  
  - `calculateBusinessTopicFlashcardMastery` used when finishing a flashcard session to update topic progress.

### 1.4 Content Coverage (from `businessHubData.ts`)

| Content | Count | Notes |
|---------|-------|-------|
| Units | 6 | 3.1–3.6 |
| Topics | 33 | All spec sub-topics represented |
| Concepts | 24 | 3.1 has 7; 3.2 has 4; 3.3–3.6 have 2–4 each; some sub-topics have no concept |
| Glossary terms | 28 | Spread across units; 3.5 has 3, 3.6 has 6 |
| Quick checks | 17 | ~1–3 per unit; not 3–5 per sub-topic as in plan |
| Case studies | 2 | 1 Paper 1, 1 Paper 2 |
| Calculation tasks | 6 | 3.1: 2; 3.6: 4 |
| Evaluation prompts | 5 | 3.1 (2), 3.2 (1), 3.6 (2) |

**Gaps:**  
- Units 3.3, 3.4, 3.5 have **no case studies** in config (getCaseStudiesByUnit returns [] for those units). Case Study page shows “No case studies for this unit.”  
- Units 3.2, 3.3, 3.4, 3.5 have **no calculation tasks**.  
- Units 3.3, 3.4, 3.5 have **no evaluation prompts**.  
- Quick Check: only one question per topic in many cases; plan suggested 3–5 per sub-topic.

---

## 2. Design Audit

### 2.1 Information Architecture

**Current flow:**
```
Subjects → Business Hub (home) → Unit → [6 modes] or Topics
                                    → Concept / Flashcard / Quick Check / Case Study / Calculations / Evaluation
```

**Comparison with Science Lab:**  
- Science Lab: Home → **Subjects** (Biology/Chemistry/Physics) → **Mode page** (Paper + Tier) → Learn (Concept, Flashcard, Quick Check, Question Lab) + Practise (Method Mark, Practical, Equation, Misconception). **Recommended next step** in hero.  
- Business Hub: Home → **Units** (no subject split) → **Mode page** (no Paper/Tier in UI). No “recommended next step”.

**Issues:**
- No clear “start here” or “recommended: Concept Lab then Glossary then Quick Check”.
- Modes are a flat list; the plan implied a **core path** (Concept → Glossary → Quick Check → Case Study) and **support** (Calculations, Evaluation). Science Lab separates “Learn — Core Path” and “Practise — Strengthen”.
- Paper 1 vs Paper 2 is in the data (`unit.paper1`, `unit.paper2`, case study `paper`) but not selectable in the UI. Students cannot filter by paper.

### 2.2 Visual Design & Consistency

**Hero / header gradients:**

| Page | Gradient | Consistency |
|------|----------|-------------|
| Home | Amber (#F59E0B → #D97706 → #B45309) | ✅ Hub accent (subjectGroups: #F59E0B) |
| Unit | Amber (#F59E0B → #D97706) | ✅ |
| Topics | Amber (#F59E0B → #D97706) | ✅ |
| Concept Lab | **Blue–pink** (#0EA5E9 → #EC4899) | ❌ Not amber |
| Flashcard | **Blue** (#0EA5E9 → #0369A1) | ❌ Not amber |
| Quick Check | **Amber–pink** (#F59E0B → #EC4899) | ⚠️ Mixed |
| Case Study | Pink (#EC4899 → #BE185D) | ⚠️ Mode colour, not hub |
| Calculation | Violet (#8B5CF6 → #6D28D9) | ⚠️ Mode colour |
| Evaluation | Green (#10B981 → #059669) | ⚠️ Mode colour |
| Flashcard session complete | Green (#10B981 → #059669) | ✅ Success state |

**Recommendation:** Use a **consistent hub hero** (amber) on every Business Hub page, with optional **mode accent** (e.g. small badge or left border) so the hub identity is always clear. Science Lab uses one gradient for the subject hero and mode colours only in cards/badges.

**Unit cards (Home):**  
- Icon in `bg-amber-500/20`, Briefcase. Good.  
- Subtitle: “X topics · Paper 1: Yes/No · Paper 2: Yes/No” — correct but could be shortened to “Paper 1 & 2” where both, or “P1”/“P2” badges.

**Unit page (modes):**  
- Each mode has its own colour (blue, amber, pink, violet, green). Layout matches Science Lab (icon + title + description + ChevronRight). Missing: “Step 1–6” or “Learn” / “Practise” grouping and short “Core path” explanation.

### 2.3 Component-Level UX

**Concept Lab:**  
- List → detail works. “Back to concepts” is clear.  
- Visual model and misconception are in coloured boxes (blue, amber). Good.  
- No “Next concept” / “Previous concept” in detail view; user must go back to list.

**Flashcard:**  
- Progress bar and “Card X of Y” are clear.  
- Confidence buttons (Not sure / Okay / Got it) work and update mastery.  
- Session complete offers “Quick Check →” and “Back to Unit”. Good.  
- No “Restart set” or “Review again” from session complete.

**Quick Check:**  
- One question at a time; feedback with idea reference.  
- “Next question” / “Finish → Case Study Lab” is clear.  
- **Bug risk:** Correct answer sets `quickCheckPassed` for **that question’s topic**. If there are 3 questions for the same topic, only the first correct needs to set it; currently every correct sets it (idempotent). OK.  
- No score at end (e.g. “12/17 correct”); no “Retry” or “Back to Unit” at end.

**Case Study:**  
- Scenario + data + question; “Show model answer” reveals model + mark scheme.  
- Previous / Next question and “Finish → Calculations” work.  
- No student input; no marking of student answer.  
- When unit has no case studies, message and “Back to Unit” only.

**Calculation Lab:**  
- Scenario + formula hint + interpretation question; “Show answer & interpretation” reveals expected figures and interpretation text.  
- No input fields for student to type or calculate.  
- Task type shown as raw key (e.g. `revenueCostProfit`, `unitCost`).

**Evaluation Builder:**  
- Prompt + instruction (“Plan your answer: one benefit…”) + “Show model answer” + breakdown (idea/application/evaluation).  
- No text area for student answer; no comparison or marking.

### 2.4 Empty & Error States

- **Unit not found:** Plain “Unit not found.” + “Back to Business Hub”. No 404-style message or link to home.  
- **No concepts / no terms / no quick checks / no case studies / no calculations / no prompts:** Short message + one or two buttons. No illustration or “What to do next” (e.g. “Try another unit” or “Start with Concept Lab”).  
- **Loading:** No loading or skeleton on any Business Hub page (data is sync from config, so loading is minimal; still, a consistent empty/skeleton pattern would help if data were async later).

### 2.5 Accessibility & Responsiveness

- Back buttons and focus order are consistent.  
- Colours: amber/white text on gradient should be checked for contrast (WCAG).  
- Touch targets (buttons, cards) are reasonably large.  
- No `aria-live` or screen-reader announcements for “Correct” / “Incorrect” or progress changes.

---

## 3. Recommendations (Prioritised)

### High impact (structure and clarity)

1. **Introduce a “recommended next step” on Home and Unit pages**  
   - On Home: e.g. “Start with Unit 3.1” or “Continue: Unit 3.2 – Quick Check”.  
   - On Unit: based on progress (e.g. if no flashcard mastery → “Start with Concept Lab”; if flashcard done, quick check not passed → “Do Quick Check”; else “Case Study Lab”).  
   - Use same pattern as Science Lab’s “Recommended: … Start →” in the hero.

2. **Group modes into “Learn — Core path” and “Practise”**  
   - Learn: Concept Lab → Glossary/Flashcards → Quick Check → Case Study Lab.  
   - Practise: Calculation Lab, Evaluation Builder.  
   - Add short copy: “Follow this order to build understanding, then apply it.”

3. **Unify hero gradient to hub colour (amber)**  
   - Use amber gradient for all Business Hub page headers.  
   - Use mode colours only for cards, badges, or “Step N” labels so hub identity is consistent.

4. **Optional: Paper 1 / Paper 2 filter**  
   - On Home or Unit page, add “Paper 1” / “Paper 2” toggle (or both).  
   - Filter unit list or case studies by selected paper; show “Paper 1” / “Paper 2” badge on units and case study cards.

### Medium impact (gating and progress)

5. **Gate Case Study, Calculation, Evaluation (optional but aligned with plan)**  
   - e.g. Case Study unlocked when at least one topic in the unit has flashcard mastery ≥ 70% and quick check passed.  
   - Show “Complete Concept Lab, Flashcards and Quick Check for this unit to unlock” when locked, with progress summary.

6. **Persist completion for Case Study, Calculation, Evaluation**  
   - When user finishes last case study (or clicks “Finish → Calculations”), set `caseStudyCompleted` for the unit’s topics (or a unit-level flag if you add it).  
   - Similarly for calculations and evaluation.  
   - Use this for “recommended next step” and for any future “Unit complete” badge.

7. **Quick Check: show unit-level summary**  
   - e.g. “Quick Check: 3/7 topics passed” on Unit or Topics page, and “Pass all to unlock Case Study” if gating is added.

### Lower impact (UX polish)

8. **Topics page: deep links per mode**  
   - Next to “Start”, add “Glossary” and “Quick Check” (and optionally Concept) so users can jump to a mode for that topic.  
   - If modes are unit-scoped only, show “Unit 3.1 Glossary” linking to `/business-hub/unit/3.1/flashcard` with optional `?topic=3.1.1` for future topic-scoped content.

9. **Concept Lab detail: add Previous/Next concept**  
   - So users can move through concepts without returning to the list.

10. **Case Study / Calculation / Evaluation: add student input (phase 2)**  
    - Case Study: text area per question, then “Check” with mark-scheme-style feedback (e.g. idea marks).  
    - Calculation: number inputs for revenue, costs, etc.; validate against `expected` and show interpretation.  
    - Evaluation: structured fields (benefit, drawback, conclusion) or free text with model comparison.  
    This would align with the implementation plan’s “structured form with feedback” and “fill gaps in a forecast”.

11. **Empty states**  
    - When a unit has no case studies/calculations/prompts, add a short line: “No [X] for this unit yet. Try another unit or mode.” and a link to unit list or another mode.

12. **End of Quick Check**  
    - Show score (e.g. “14/17 correct”) and options “Back to Unit” and “Case Study Lab →”.  
    - Optionally “Retry” to run through the same set again.

### Content (separate from UI design)

13. **Content coverage**  
    - Add case studies for units 3.3, 3.4, 3.5 (or clarify that case studies are only for 3.1+3.2+3.3 and 3.1+3.2+3.5+3.6).  
    - Add calculation tasks for 3.2, 3.3, 3.4, 3.5 if the spec supports them.  
    - Add evaluation prompts for 3.3, 3.4, 3.5.  
    - Increase Quick Check items toward 3–5 per sub-topic where possible.

---

## 4. Summary Table

| Area | Current state | Suggested change |
|------|----------------|------------------|
| IA | Flat unit → modes; no recommended path | Recommended next step; Learn vs Practise grouping |
| Hero colour | Mixed (amber, blue, pink, violet, green by page) | Consistent amber hero; mode colour in cards/badges only |
| Paper filter | In data only | Optional Paper 1/2 filter in UI |
| Gating | None | Optional: unlock Case Study/Calculations/Evaluation after Concept + Glossary + Quick Check |
| Progress | Flashcard + quick check per topic; case/calc/eval not persisted | Set caseStudyCompleted etc. when user completes those modes |
| Case Study / Calculation / Evaluation | Read-only (show model) | Phase 2: student input + feedback |
| Empty states | Minimal | Short guidance + link to other unit/mode |
| Topics page | Single “Start” → Concept | Add Glossary / Quick Check links per topic where applicable |

---

*This audit gives a complete design and flow picture of the Business Hub and prioritised suggestions so the hub can align with the implementation plan and feel consistent with Science Lab and Maths Mastery while keeping a clear Business identity.*

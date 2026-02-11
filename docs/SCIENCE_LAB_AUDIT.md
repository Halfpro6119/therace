# Science Lab — Complete Functional & Design Audit

**Date:** February 11, 2025  
**Scope:** GCSE Science (Biology, Chemistry, Physics) — Conceptual understanding, exam thinking, practicals  
**Target:** Teach students all necessary exam-tested topics from start to finish, neatly organised and engagingly presented.

---

## Executive Summary

The Science Lab has a strong conceptual foundation (Golden Prompt alignment, rich types, flashcard-first pedagogy) and several well-implemented modes. However, **content coverage is heavily Biology-biased**, Chemistry and Physics are underpopulated, the **learning flow has gaps and bugs**, and the **information architecture** could better guide students through a clear path from introduction → mastery → exam readiness.

**Key findings:**
- ✅ Strong pedagogy: flashcard → quick check → question lab with gating
- ⚠️ Content imbalance: Biology ~90%+ of concepts/questions; Chemistry & Physics minimal
- ⚠️ Flow bugs: Topic mastery calculation on flashcard completion is incorrect; quiz unlock logic may be wrong for first-time users
- ⚠️ Method Mark Trainer uses generic sample data, not question-specific breakdowns
- ⚠️ No topic-level navigation or “start here” guided path
- ⚠️ Missing Combined Science support (Trilogy / Synergy)

---

## 1. Functional Audit

### 1.1 Learning Flow (Flashcard → Quick Check → Question Lab)

| Component | Status | Notes |
|-----------|--------|-------|
| Flashcard Mode | ✅ | Works; confidence rating, key terms, misconception warnings, progress bar |
| Quick Check | ✅ | MC and drag-order types; feedback; navigates to Question Lab when done |
| Question Lab | ⚠️ | Unlock logic: `hasNoMastery` unlocks quiz for first-time users (contradicts “complete flashcards first”) |
| Topic Mastery Gating | ⚠️ | Quiz locked when topics need ≥70% flashcard mastery + quick check passed |

**Flow bugs:**

1. **Flashcard completion → topic mastery**  
   On finishing all flashcards, `ScienceLabFlashcardPage` computes topic mastery only for the **last card’s topic** (`currentCard.topic`), then navigates to quick-check. Flashcard sets span many topics, so mastery for other topics is never updated from that session.

2. **Quiz unlock on first visit**  
   `hasNoMastery` (all topics at 0%) causes the quiz to unlock. New users can skip flashcards and quick checks. This conflicts with the “Complete flashcards and quick checks first” message.

3. **Topic scope mismatch**  
   Topic mastery is per topic, but flashcard completion advances one card at a time across topics. There is no clear mapping of “which topics are complete for this paper/tier” and when the full set is considered mastered.

### 1.2 Lab Modes — Functionality

| Mode | Functional? | Notes |
|------|-------------|-------|
| Flashcard | ✅ | Flip, confidence, progression, back/next |
| Quick Check | ✅ | MC, drag-order; feedback; proceed to quiz |
| Question Lab | ✅ | Text input, feedback; unlock screen when locked |
| Concept Lab | ✅ | Browse concepts; core idea, visual model, misconceptions, change scenarios |
| Method Mark Trainer | ⚠️ | Uses **hardcoded sample breakdown**; not linked to real 4–6 mark questions |
| Practical Lab | ✅ | Variables, method, risks, data table, graph, evaluation |
| Equation Lab | ✅ | Symbols, unit traps, rearranging practice |
| Misconception Lab | ⚠️ | No grading; student writes free text, always shows “correct” answer — no checking |

### 1.3 Data & Content Coverage

**Concepts** (`SCIENCE_CONCEPTS`):
- Biology: ~20+ concepts (Cell Biology, Organisation, Infection & Response, Bioenergetics, Homeostasis, Inheritance & Evolution, Ecology)
- Chemistry: 1 concept (rate of reaction)
- Physics: 1 concept (energy stores)

**Questions** (`SCIENCE_QUESTIONS`):
- Biology: ~25 questions across Paper 1 & 2, Foundation & Higher
- Physics: 1 question (energy)
- Chemistry: 0 questions

**Practicals**:
- Biology: 6 required practicals (microscopy, enzyme activity, osmosis, reaction time, plant responses, field investigation)
- Chemistry: 1 (temperature/rate)
- Physics: 0

**Equations**:
- Biology: 3 (magnification, percentage change, rate)
- Physics: 1 (kinetic energy)
- Chemistry: 0

**Misconceptions**:
- Biology: ~17
- Physics: 1
- Chemistry: 0

**Conclusion:** Content is heavily Biology-focused. Chemistry and Physics are effectively placeholders and cannot support full GCSE coverage.

### 1.4 Quick Check Generation

`generateQuickChecks` builds:
- MC from misconceptions
- Drag-order from concept change scenarios (when `steps.length >= 3`)

**Gaps:**
- `trueFalse` and `whichCorrect` types are defined but not generated
- Options for some MC checks may be weak (e.g. “None of the above”, truncated incorrect options)
- No quick checks from equations, practicals, or question-type knowledge

### 1.5 Method Mark Trainer

- Uses `sampleBreakdown` (idea/method/precision marks + penalties) for all 4–6 mark questions
- No `MethodMarkBreakdown` data in `scienceLabData.ts`
- Not question-specific; students cannot see which marks apply to which real exam questions

### 1.6 Storage & Mastery

- Flashcard mastery: confidence + spaced repetition logic present
- Topic mastery: flashcard % + quick check passed → quiz unlock
- Concept/equation/practical mastery: types exist but limited usage (e.g. equation lab updates equation mastery)
- Session tracking: `ScienceLabSession` exists but is not obviously used in the current UI

---

## 2. Design Audit

### 2.1 Information Architecture

**Current flow:**
```
Science Lab Home → Subjects → Mode Page (Paper/Tier) → [8 Lab Modes]
```

**Issues:**
1. **No clear “start here” path** — All 8 modes appear equal; the intended sequence (flashcard → quick check → question lab) is not visually emphasised.
2. **Mode order** — Modes are ordered 1–8 by `LAB_MODES.order`, but Concept Lab (4) appears after Question Lab (3). Concept Lab is foundational and should come before or alongside flashcards.
3. **No topic-level navigation** — Students choose subject → paper → tier → mode, but cannot browse “Cell Biology” or “Organisation” as entry points.
4. **Paper/Tier shared** — Same paper/tier applies to all modes, which is correct, but the choice is made once and not surfaced again in headers.

### 2.2 User Experience

**Strengths:**
- Clear headers and back navigation
- Progress indicators (flashcard, quick check)
- Themed gradients per mode
- Feedback with correct/incorrect and idea references
- Misconception warnings on flashcards

**Weaknesses:**
1. **Flashcard progress** — Completing all cards always routes to quick-check; no option to “finish session and return to mode page”.
2. **Quick Check feedback** — Must click “Next” after each item even when incorrect; no immediate “try again” or link to related flashcard.
3. **Question Lab grading** — Simple substring match; no partial credit, keywords, or mark-scheme style checking.
4. **Concept Lab** — No link from concept to related questions, practicals, or equations.
5. **Misconception Lab** — Free text with no validation; always shows model answer.

### 2.3 Visual Design & Engagement

- Consistent use of gradients, icons, and rounded cards
- Colour coding by mode (e.g. blue for flashcard, amber for quick check)
- Animations (framer-motion) for transitions

**Improvements:**
1. **Visual models** — Concept Lab shows descriptions only; no actual diagrams (diagramId exists but is not rendered).
2. **Engagement** — No gamification (streaks, XP, badges) or “recommended next step”.
3. **Density** — Some pages are text-heavy; more use of cards, icons, and spacing could improve readability.

### 2.4 Organisation for Exam Readiness

**Ideal path for a student:**
1. Understand scope (what topics are on each paper)
2. Learn concepts (Concept Lab or Flashcard)
3. Check understanding (Quick Check)
4. Practise exam questions (Question Lab)
5. Strengthen weak areas (Method Mark, Practical, Equation, Misconception)

**Current organisation:**
- Scope is implicit (paper 1/2, tier)
- No explicit “topic map” or “spec checklist”
- Modes are flat; no distinction between “core path” and “support modes”

---

## 3. Content Alignment with AQA GCSE

### 3.1 Biology (8461)

| Topic Area | Paper | Concepts | Questions | Practicals | Status |
|------------|-------|----------|-----------|------------|--------|
| Cell Biology | 1 | ✓ | ✓ | microscopy, osmosis | Good |
| Organisation | 1 | ✓ | ✓ | enzyme activity | Good |
| Infection & Response | 1 | ✓ | ✓ | — | Good |
| Bioenergetics | 1 | ✓ | ✓ | — | Good |
| Homeostasis & Response | 2 | ✓ | ✓ | reaction time, plant responses | Good |
| Inheritance & Evolution | 2 | ✓ | ✓ | — | Good |
| Ecology | 2 | ✓ | ✓ | field investigation | Good |

Biology coverage is strong and aligns with AQA units.

### 3.2 Chemistry (8462)

| Topic Area | Paper | Concepts | Questions | Practicals | Status |
|------------|-------|----------|-----------|------------|--------|
| Atomic structure | — | — | — | — | Missing |
| Bonding | — | — | — | — | Missing |
| Quantitative chemistry | — | — | — | — | Missing |
| Chemical changes | — | — | — | — | Missing |
| Energy changes | — | — | — | — | Missing |
| Rate of reaction | 1 | 1 | — | 1 | Minimal |

Chemistry is severely underdeveloped.

### 3.3 Physics (8463)

| Topic Area | Paper | Concepts | Questions | Practicals | Status |
|------------|-------|----------|-----------|------------|--------|
| Energy | 1 | 1 | 1 | — | Minimal |
| Electricity | — | — | — | — | Missing |
| Particle model | — | — | — | — | Missing |
| Atomic structure | — | — | — | — | Missing |
| Forces | — | — | — | — | Missing |
| Waves | — | — | — | — | Missing |
| Magnetism | — | — | — | — | Missing |

Physics is effectively a placeholder.

---

## 4. Recommendations

### 4.1 Critical (Fix Before Launch)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 1 | Fix flashcard topic mastery: update all topics touched in session, not just last card | Low | High |
| 2 | Fix quiz unlock: require at least one topic with flashcard mastery > 0 before allowing bypass | Low | High |
| 3 | Add option to “Return to mode page” after flashcard session (don’t force quick-check) | Low | Medium |

### 4.2 High Priority (Exam Readiness)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 4 | Expand Chemistry & Physics content: concepts, questions, practicals, equations | High | Critical |
| 5 | Add Method Mark breakdowns for real 4–6 mark questions in `scienceLabData.ts` | Medium | High |
| 6 | Improve Question Lab grading: keyword matching, mark-scheme style checking | Medium | High |
| 7 | Add topic-based navigation: browse by topic (e.g. Cell Biology), then choose mode | Medium | High |
| 8 | Reorder Mode Page: put Concept Lab before Flashcard; group “Learn” vs “Practise” modes | Low | Medium |

### 4.3 Medium Priority (Engagement & Clarity)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 9 | Add “recommended next step” on Mode Page (e.g. “Start with Flashcards for Paper 1”) | Low | Medium |
| 10 | Link Concept Lab concepts to related questions, practicals, equations | Medium | Medium |
| 11 | Add trueFalse / whichCorrect quick checks; improve MC options | Medium | Medium |
| 12 | Render diagrams where `diagramId` exists (or clear “diagram coming soon” placeholder) | Medium | Medium |
| 13 | Misconception Lab: add simple keyword checks or structured feedback instead of free-text only | Medium | Medium |

### 4.4 Lower Priority ( polish )

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 14 | Add Combined Science (Trilogy) as subject option with appropriate topic mapping | High | Medium |
| 15 | Add progress dashboard: topics mastered, questions attempted, streaks | Medium | Medium |
| 16 | Add “link to flashcard” from Quick Check feedback when incorrect | Low | Low |
| 17 | Use `ScienceLabSession` for analytics or history | Low | Low |

---

## 5. Proposed Learning Path (Redesign)

To present topics “from start to finish” in a clear, engaging way:

```
Science Lab Home
    → Choose Subject (Biology / Chemistry / Physics)
        → Choose Paper & Tier
            → Topic Map (e.g. Cell Biology, Organisation, …)
                Per topic:
                    1. Concept Lab (understand)
                    2. Flashcards (memorise & rehearse)
                    3. Quick Check (validate)
                → Question Lab (exam-style questions, unlocked when topic checks passed)
                → Support Modes: Method Mark | Practical | Equation | Misconception
```

**Changes:**
- Topic map as the main navigation layer
- Concept Lab before Flashcards for each topic
- Clear “core path” (concept → flashcard → quick check → question) vs “support modes”
- Optional “guided path” that suggests the next topic or mode

---

## 6. Appendix: File Reference

| File | Purpose |
|------|---------|
| `src/pages/science/ScienceLabHomePage.tsx` | Lab landing |
| `src/pages/science/ScienceLabSubjectPage.tsx` | Subject selection |
| `src/pages/science/ScienceLabModePage.tsx` | Paper, tier, mode selection |
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Flashcards |
| `src/pages/science/ScienceLabQuickCheckPage.tsx` | Quick checks |
| `src/pages/science/ScienceLabQuestionLabPage.tsx` | Exam questions |
| `src/pages/science/ScienceLabConceptLabPage.tsx` | Concepts |
| `src/pages/science/ScienceLabMethodMarkPage.tsx` | Method marks |
| `src/pages/science/ScienceLabPracticalLabPage.tsx` | Practicals |
| `src/pages/science/ScienceLabEquationLabPage.tsx` | Equations |
| `src/pages/science/ScienceLabMisconceptionLabPage.tsx` | Misconceptions |
| `src/config/scienceLabData.ts` | Concepts, questions, practicals, equations, misconceptions |
| `src/config/scienceLabFlashcards.ts` | Flashcard & quick check generation |
| `src/types/scienceLab.ts` | Types |
| `src/utils/storage.ts` | Mastery, topic unlock, flashcard tracking |

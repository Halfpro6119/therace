# Maths Mastery – Functional & Design Audit

**Purpose:** Ensure Maths Mastery is effective for teaching students all necessary GCSE Maths topics from start to finish, neatly organised and presented in an engaging way.

---

## 1. Current Architecture Summary

| Layer | What exists |
|-------|-------------|
| **Entry** | Subjects page → "Enter hub" → Maths Mastery home |
| **Maths Mastery home** | Three pillars: Maths (live), Further Maths (placeholder), Statistics (placeholder) |
| **GCSE Maths hub** | Tier (Higher/Foundation) → Paper (1–3) → Quiz type (Full paper / Topic) → Topic picker → Start quiz |
| **Curriculum spec** | `goldenMathsTopicUnitSpec.ts` + `GOLDEN_MATHS_QUESTION_LIST.md`: topics and units by paper/tier, ~180 golden questions |
| **Quiz flow** | Create quiz (full or topic) → QuizPlayerPage → Results → Fix-It / Run It Back |

---

## 2. Functional Audit

### 2.1 Coverage & Completeness

| Area | Status | Notes |
|------|--------|--------|
| **Foundation tier** | ✅ | Papers 1–3; F1 (26q), F2 (14q), F3 (8q). Topic specs present. |
| **Higher tier** | ✅ | Papers 1–3; 80q each. Topic specs present. |
| **Topic quizzes** | ✅ | All curriculum topics (Number, Algebra, Graphs, Geometry, Probability & Statistics) per paper. |
| **Unit (sub-topic) quizzes** | ⚠️ **Gap** | Unit specs exist (`GOLDEN_UNIT_SPECS`) and admin can sync unit quizzes, but **students cannot start a unit quiz from Maths Hub**. No UI for short, focused drills (e.g. "BIDMAS, integers", "Circle theorems"). |
| **Full paper quiz** | ✅ | Works; time limits and question counts correct. |
| **Further Maths** | 🔴 Placeholder | "Coming soon" – no content. |
| **Statistics** | 🔴 Placeholder | "Coming soon" – no content. |

### 2.2 Learning Path & Organisation

| Area | Status | Notes |
|------|--------|--------|
| **Start-to-finish order** | ⚠️ | Topics are listed by paper but there is **no suggested sequence** (e.g. "Start with Paper 1", or curriculum order). Students see a flat grid of topics. |
| **Paper context** | ⚠️ | Paper names (e.g. "Paper 1 (Non-Calculator)") come from DB and are shown in step 2, but **topic list doesn’t reinforce paper** (e.g. "Paper 1 topics" as a heading). |
| **Grouping by paper** | ⚠️ | Topics could be grouped under "Paper 1", "Paper 2", "Paper 3" with short labels (Non-calculator / Calculator) for clarity. |
| **Exam alignment** | ⚠️ | No mention of exam board or "GCSE" in the hub copy; adding a short line (e.g. "Aligned with GCSE Maths specification") would build trust. |

### 2.3 Data & Behaviour

| Area | Status | Notes |
|------|--------|------|
| **Golden IDs** | ✅ | Topic quizzes resolve prompts via `meta.goldenId`; order preserved. |
| **Mastery / results** | ✅ | Per CORE_LOOPS_AUDIT: mastery, XP, streak update on quiz completion. |
| **Fix-It / Run It Back** | ✅ | Results page offers both. |
| **Calculator rules** | ✅ | Papers have calculatorAllowedDefault; quiz player respects it. |

---

## 3. Design & UX Audit

### 3.1 Maths Mastery Home

| Element | Current | Recommendation |
|--------|---------|----------------|
| **Primary CTA** | Three equal cards (Maths, Further Maths, Statistics). | Make **Maths** the clear primary action (e.g. "Start GCSE Maths" or larger/primary styling); keep others as secondary with "Coming soon". |
| **Copy** | "Choose a subject" – implies all three are equal. | Use "Practice GCSE Maths" as main heading/CTA; keep pillars as "Also: Further Maths & Statistics (coming soon)". |
| **Coming soon** | Shown in card description. | Keep; optionally add a small "Coming soon" badge so it’s visible at a glance. |

### 3.2 GCSE Maths Hub (Maths Hub Page)

| Element | Current | Recommendation |
|--------|---------|----------------|
| **Steps** | 1. Tier → 2. Paper → 3. Quiz type → 4. Choose topic. | Keep; add **unit-level option** after topic selection: "Start topic" or "Practice a unit" (list units for that topic). |
| **Topic list** | Flat grid of topic names + question count. | **Group by paper** (Paper 1 / 2 / 3) with a short paper label (Non-calculator / Calculator). Improves scanability and "start to finish" feel. |
| **Paper labels** | Paper number + name from DB. | Already shown in step 2; ensure paper names in DB are clear (e.g. "Paper 1 (Non-Calculator)"). |
| **Curriculum messaging** | Minimal. | Add one line: e.g. "Covers all GCSE Maths topics you’ll be tested on." |
| **Engagement** | No progress or recommendation. | Future: "Recommended next" or "Your progress" (e.g. topics completed). Not in scope for this audit implementation. |

### 3.3 Placeholders (Further Maths, Statistics)

| Element | Current | Recommendation |
|--------|---------|----------------|
| **Tone** | "Coming soon. For now, use main Maths from Subjects page." | Keep; ensure back navigation to Maths Mastery is obvious. |

---

## 4. Recommendations Implemented (This Pass)

1. **Unit-level practice** – After selecting a topic, show "Start topic quiz" and "Or practice a unit:" with units for that topic; create quiz from unit spec on start.
2. **Maths Mastery home** – Clearer primary CTA for GCSE Maths; "Coming soon" badge for Further Maths and Statistics; tagline about building fluency and exam readiness.
3. **Topic list** – Group topics by paper with paper heading (e.g. "Paper 1 (Non-Calculator)") and optional short description.
4. **Hub copy** – Short curriculum/exam alignment line and clearer step labels where helpful.

---

## 5. Recommendations for Later

- **Learning path** – Suggested order (e.g. "Start with Paper 1 topics") or a simple "Curriculum map" view.
- **Progress in hub** – Show "You’ve completed X topic quizzes" or mastery by paper.
- **Further Maths / Statistics** – Implement when content and specs are ready.
- **Exam board** – If content is board-specific, show e.g. "Edexcel" or "AQA" in hub.

---

## 6. Files Touched in This Audit

- `docs/MATHS_MASTERY_AUDIT.md` – this audit document
- `src/pages/maths/MathsMasteryHomePage.tsx` – CTA, copy, coming-soon badge, “Start practising” for Maths
- `src/pages/maths/MathsHubPage.tsx` – Unit-level practice (topic → units), paper context in step 4, curriculum copy, `handleStartUnitQuiz`

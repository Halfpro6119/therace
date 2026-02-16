# Science Lab — Complete Flow Audit

**Date:** February 2025  
**Purpose:** Ensure every user path in Science Lab has a logical flow; fix illogical behaviour (especially Browse by topic).

---

## 1. Entry and Hierarchy

| Level | Route | Back / Parent |
|-------|--------|----------------|
| Site | `/subjects` | — |
| Science Lab hub | `/science-lab` | Back to Subjects |
| Subject (Triple) | `/science-lab/:subject` | → redirects to `/science-lab/:subject/1/higher/topics` |
| Lab Modes | `/science-lab/:subject/:paper/:tier` | Back to Subjects |
| Topics (topic map) | `/science-lab/:subject/:paper/:tier/topics` | Back to Lab Modes |
| Topic test | `.../topic-test` | Back to Lab |
| Full GCSE | `.../full-gcse` | Back to Lab Modes |
| Flashcard / Quick check / Method mark / etc. | `.../flashcard`, etc. | Back to Lab Modes |

---

## 2. User Paths Audited

### 2.1 Subject → Topics (primary entry)

- **Science Lab** → Biology/Chemistry/Physics → redirects to **Topics** (Paper 1 Higher).
- **Topics** shows: Start topic test, Full GCSE, Work on All Topics, **Browse by Topic** (list).

### 2.2 Browse by topic (fixed)

- **Before:** Clicking a topic row navigated to **Lab Modes** with `?topic=X`. That was illogical: user came to “browse by topic” and already had three clear actions (Learn, Bigger tests, Topic test). Sending them to the mode page hid the topic list and did not make the selected topic obvious.
- **After:** The topic row no longer navigates. Only the three actions navigate: **Learn** → flashcard, **Bigger tests** → methodMark, **Topic test** → topic-test. Flow is: browse topics → choose action per topic.

### 2.3 Lab Modes page

- **Paper & Tier** → “Browse by topic” goes to **Topics**.
- **Test yourself** → Topic test or Full GCSE (no topic in URL unless from recommendation).
- **Revise / Extra** → flashcard, quick-check, practical, equation, misconception (with optional `?topic=` when arrived from Topics with topic).

### 2.4 Back from lab pages

- **Topic test, Full GCSE, Flashcard, Quick check, Method mark, Misconception** use `base` = `/:subject/:paper/:tier` → **Lab Modes**. Correct.
- **Equation Lab** and **Practical Lab** previously used `/science-lab/:subject` only, so “Back to Lab Modes” redirected to **Topics**, not Lab Modes. **Fixed:** both now use `base` (subject + paper + tier) so “Back to Lab Modes” returns to the Mode page.

### 2.5 Combined Science

- **Science Lab** → Combined Science → paper cards → `/science-lab/:subject/:subjectPaper/higher` (Lab Modes). No redirect to Topics; consistent.

---

## 3. Changes Made

1. **ScienceLabTopicsPage**
   - In “Browse by Topic”, the topic row no longer navigates. The row is presentational (title, progress, due count). Only **Learn**, **Bigger tests**, and **Topic test** buttons perform navigation.

2. **ScienceLabEquationLabPage**
   - “Back to Lab Modes” now navigates to `/science-lab/:subject/:paper/:tier` instead of `/science-lab/:subject`.

3. **ScienceLabPracticalLabPage**
   - Same as Equation Lab: “Back to Lab Modes” now goes to `base` (subject + paper + tier).

---

## 4. Resulting Flow Summary

- **Browse by topic:** Topics page → see list → for each topic, choose **Learn** | **Bigger tests** | **Topic test**. No surprise jump to Lab Modes.
- **Lab Modes:** Change paper/tier, start tests, or open “Browse by topic” to reach Topics.
- **All lab sub-pages:** “Back to Lab Modes” returns to the same subject/paper/tier Mode page.

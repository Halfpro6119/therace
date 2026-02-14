# Science Lab — Concept Lab Full Audit

**Date:** February 14, 2025  
**Scope:** Concept Lab section within Science Lab (Biology, Chemistry, Physics GCSE)  
**Purpose:** Identify strengths, gaps, and improvement opportunities.  
**Implementation:** February 14, 2025 — All critical and high-priority items implemented.

---

## 1. Executive Summary

The Concept Lab is well-positioned as the **first step** in the Learn path (Concept → Flashcard → Quick Check → Question Lab) and has a solid structure: core idea, visual model, misconceptions, change scenarios, and Learning Superpowers. However, several gaps limit its effectiveness: **diagrams are never rendered** (despite data and infrastructure existing), **no links to Flashcards or Quick Check** (breaking the intended learning flow), **sparse Learning Superpowers config** for most concepts, and **UX gaps** (no prev/next, flat concept list, weak empty states).

| Category | Status | Summary |
|----------|--------|---------|
| Structure & pedagogy | ✅ Strong | Core idea, visual model, misconception, change scenarios, superpowers |
| Learning path integration | ⚠️ Partial | Links to Question/Practical/Equation Lab; **missing Flashcard & Quick Check** |
| Visual models | ❌ Not rendered | `diagramId` exists in data; Concept Lab shows text only; Flashcard page renders diagrams |
| Learning Superpowers | ⚠️ Sparse | Only 4 Biology concepts have rich config; others use fallback |
| Content coverage | ⚠️ Imbalanced | Biology ~20+ concepts; Chemistry & Physics fewer |
| UX & navigation | ⚠️ Gaps | No prev/next, flat list, weak empty state, no topic grouping |

---

## 2. Current Architecture

### 2.1 Route & Data Flow

- **Route:** `/science-lab/:subject/:paper/:tier/concept?topic=...`
- **Topic filter:** Optional `?topic=Cell Biology` narrows concepts to that topic
- **Data:** `getConceptsBySubject(subject)` or `getConceptsByTopic(subject, topic)` from `scienceLabData.ts`
- **Entry points:** Mode Page (Learn path), Topics Page (with topic filter)

### 2.2 Concept Structure (from `ScienceConcept` type)

```ts
{
  id, subject, topic,
  coreIdea: string,
  visualModel: { type, description, diagramId? },
  commonMisconception: string,
  changeScenarios: [{ prompt, explanation, visual?: { diagramId?, description? } }]
}
```

### 2.3 Learning Superpowers

- **Component:** `ConceptLabSuperpowersSection` from `components/learning`
- **Config:** `learningSuperpowersConfig.ts` — `SCIENCE_SUPERPOWERS` keyed by `conceptId`
- **Fallback:** When no config exists, `getSuperpowerContent` uses `coreIdea` as the "Explain Like I'm 11" model explanation
- **Coverage:** Only 4 Biology concepts have explicit config: `bio-diffusion`, `bio-osmosis`, `bio-cell-division`, `bio-enzyme-action`

---

## 3. Functional Audit

### 3.1 What Works Well

| Feature | Status | Notes |
|---------|--------|------|
| Concept list | ✅ | Shows all concepts for subject (or topic-filtered) |
| Concept detail | ✅ | Core idea, visual model type/description, misconception, change scenarios |
| Learning Superpowers | ✅ | Renders when config exists; Explain Like I'm 11 fallback for others |
| Related content | ✅ | Links to Question Lab, Practical Lab, Equation Lab (when related items exist) |
| Topic filtering | ✅ | `?topic=X` correctly filters concepts |
| Back navigation | ✅ | Back to concepts, Back to Lab Modes |
| Recommended path | ✅ | Mode Page recommends "Start with Concept Lab" for new users |
| Learn path order | ✅ | Concept Lab is Step 1 in the core path |

### 3.2 Gaps & Issues

| Issue | Severity | Description |
|-------|----------|-------------|
| **No Flashcard link** | High | Learning path is Concept → Flashcard → Quick Check → Question Lab. Concept Lab links to Question, Practical, Equation but **not** Flashcard. Students who finish a concept have no direct "Continue to Flashcards" CTA. |
| **No Quick Check link** | High | Same as above — no link to Quick Check as the next validation step. |
| **Diagrams not rendered** | High | `visualModel.diagramId` and `changeScenarios[].visual.diagramId` exist in data. `DiagramRenderer` + `getDiagramMetadataForSlug` exist and are used in `ScienceLabFlashcardPage`. Concept Lab only shows `description` text. |
| **Sparse Superpowers config** | Medium | Only 4 Biology concepts have Concept Bridge, Compare & Contrast, Schema Builder, etc. Chemistry and Physics concepts rely solely on Explain Like I'm 11 fallback. |
| **No Previous/Next concept** | Medium | In concept detail view, no way to move to adjacent concept without going back to list. |
| **Flat concept list** | Medium | When topic filter is absent, Biology shows 20+ concepts in one flat list. No grouping by topic (Cell Biology, Organisation, etc.). |
| **Empty state** | Low | If topic filter returns 0 concepts, list is empty with no helpful message. |
| **Invalid subject** | Low | Returns plain `<div>Invalid subject</div>` with no back button or navigation. |
| **Mistake Museum** | Low | `getMistakeMuseumItems('science', topic)` returns all `SCIENCE_MISTAKES`; topic filter is passed but not used. Mistake Museum may show irrelevant items. |

---

## 4. Design & UX Audit

### 4.1 Strengths

- Clear hero section with gradient (blue → pink)
- Consistent card styling and spacing
- Change scenarios in distinct blue-highlight boxes
- Misconception in amber warning style
- Related content as tappable cards with icons
- Framer-motion animations for list/detail transitions

### 4.2 Weaknesses

1. **Visual Model section** — Shows "Type: diagram" and description only. No actual diagram. Users expect visuals for "visual model."
2. **Concept list density** — Long scroll on Biology; no topic headers or collapsible sections.
3. **No progress indication** — Unlike Topics page (flashcard mastery %), Concept Lab doesn't show which concepts have been viewed or completed.
4. **Topic context lost** — When viewing a concept, header doesn't remind user they're in "Cell Biology" (if topic-filtered).
5. **Related content ordering** — Question Lab, Practical, Equation appear in fixed order; could prioritise by learning path (Flashcard first, then Quick Check, then Question Lab).

---

## 5. Content Audit

### 5.1 Concept Coverage (from SCIENCE_CONCEPTS)

| Subject | Approx. concepts | Topics covered |
|---------|------------------|----------------|
| Biology | ~20+ | Cell Biology, Organisation, Infection & Response, Bioenergetics, Homeostasis, Inheritance & Evolution, Ecology |
| Chemistry | Fewer | Rate of reaction, Atomic structure, Bonding, etc. (per SCIENCE_LAB_AUDIT) |
| Physics | Fewer | Energy, Particle model, etc. |

Biology is well-populated; Chemistry and Physics need expansion for full GCSE coverage (see `docs/SCIENCE_LAB_AUDIT.md`).

### 5.2 Diagram Coverage

Per `docs/SCIENCE_LAB_DIAGRAM_AUDIT.md` and `docs/FLASHCARD_DIAGRAMS_PLAN.md`:

- **47 diagram blueprints** exist in `scienceLabDiagrams.ts`
- **scienceLabDiagramMap.ts** maps slugs to metadata for `DiagramRenderer`
- **Flashcard page** already renders diagrams when `diagramId` is present
- **Concept Lab** does not use `DiagramRenderer` at all

---

## 6. Recommendations

### 6.1 Critical (Fix Soon)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 1 | **Add Flashcard link** to Related content | Low | High — completes learning path from concept to flashcard |
| 2 | **Add Quick Check link** to Related content | Low | High — guides students to validation step |
| 3 | **Render diagrams** in Concept Lab using `DiagramRenderer` + `getDiagramMetadataForSlug` for `visualModel.diagramId` and `changeScenarios[].visual.diagramId` | Medium | High — Concept Lab is about "visual models" |

### 6.2 High Priority

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 4 | **Add Previous/Next concept** navigation in detail view | Low | Medium |
| 5 | **Group concept list by topic** when no topic filter (e.g. "Cell Biology", "Organisation", …) | Medium | Medium |
| 6 | **Expand Learning Superpowers config** for Chemistry and Physics concepts (Concept Bridge, Compare & Contrast, Schema Builder) | High | Medium |
| 7 | **Improve empty state** when 0 concepts (e.g. "No concepts for this topic yet" + link to browse all) | Low | Low |
| 8 | **Improve invalid subject** handling (back button, friendly message) | Low | Low |

### 6.3 Medium Priority

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 9 | **Filter Mistake Museum by topic** in `getMistakeMuseumItems` for science | Low | Medium |
| 10 | **Surface topic context** in concept detail header when topic-filtered | Low | Low |
| 11 | **Reorder Related content** to match learning path: Flashcard → Quick Check → Question Lab → Practical → Equation | Low | Low |
| 12 | **Add concept progress** (e.g. "3 of 7 concepts viewed" or simple checkmarks) — requires storage | Medium | Medium |

### 6.4 Lower Priority

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 13 | **Combined Science support** — filter concepts by Combined vs Triple where applicable | High | Medium |
| 14 | **Expand Chemistry & Physics concept content** (see SCIENCE_LAB_AUDIT) | High | Critical for exam readiness |

---

## 7. Implementation Notes

### 7.1 Adding Flashcard & Quick Check Links

In `ScienceLabConceptLabPage.tsx`, extend the Related content section:

```tsx
// Add to related content checks:
const hasFlashcards = /* check if topic has flashcards */;
const hasQuickChecks = /* check if topic has quick checks */;

// Add buttons similar to Question Lab:
{hasFlashcards && (
  <button onClick={() => navigate(`/science-lab/.../flashcard?topic=...`)}>
    Flashcard Mode — {count} cards for {topic}
  </button>
)}
{hasQuickChecks && (
  <button onClick={() => navigate(`/science-lab/.../quick-check?topic=...`)}>
    Quick Check — validate understanding
  </button>
)}
```

You'll need helpers like `getFlashcardsByTopic` or similar from `scienceLabFlashcards.ts` / `scienceLabData.ts`.

### 7.2 Rendering Diagrams in Concept Lab

```tsx
import { DiagramRenderer } from '../../components/DiagramRenderer';
import { getDiagramMetadataForSlug } from '../../config/scienceLabDiagramMap';

// In Visual Model section:
{selectedConcept.visualModel.diagramId && (() => {
  const meta = getDiagramMetadataForSlug(selectedConcept.visualModel.diagramId);
  if (meta) return <DiagramRenderer metadata={meta} fitToContainer />;
  return null;
})()}
```

Repeat for each `changeScenarios[].visual?.diagramId` where present.

### 7.3 Grouping Concepts by Topic

```ts
const byTopic = concepts.reduce((acc, c) => {
  (acc[c.topic] ??= []).push(c);
  return acc;
}, {} as Record<string, typeof concepts>);
// Render: Object.entries(byTopic).map(([topic, list]) => <section key={topic}>...)
```

---

## 8. Appendix: File Reference

| File | Purpose |
|------|---------|
| `src/pages/science/ScienceLabConceptLabPage.tsx` | Concept Lab page |
| `src/config/scienceLabData.ts` | SCIENCE_CONCEPTS, getConceptsBySubject, getConceptsByTopic |
| `src/config/learningSuperpowersConfig.ts` | SCIENCE_SUPERPOWERS, getSuperpowerContent |
| `src/components/learning/ConceptLabSuperpowersSection.tsx` | Superpowers UI |
| `src/config/scienceLabDiagramMap.ts` | getDiagramMetadataForSlug |
| `src/config/scienceLabDiagrams.ts` | Diagram blueprints |
| `src/components/DiagramRenderer.tsx` | Renders diagrams |
| `src/pages/science/ScienceLabModePage.tsx` | Entry point, recommends Concept Lab |
| `src/pages/science/ScienceLabTopicsPage.tsx` | Topic filter entry |
| `docs/SCIENCE_LAB_AUDIT.md` | Full Science Lab audit |
| `docs/FLASHCARD_DIAGRAMS_PLAN.md` | Diagram implementation plan |
| `docs/SCIENCE_LAB_DIAGRAM_AUDIT.md` | Diagram inventory |

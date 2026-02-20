# Plan: Remove Concept Lab and Merge with Flashcard Mode (Science Lab)

## 1. Current state

### Concept Lab (`ScienceLabConceptLabPage`)
- **Route:** `/science-lab/:subject/:paper/:tier/concept`
- **Flow:** User sees a list of concepts (by topic); selects one → reads a single-concept view with:
  - Core Idea (text)
  - Visual Model (FlashcardDiagram)
  - Common Misconception warning
  - **ConceptLabSuperpowersSection** (Explain like 11, Concept Bridge, Compare/contrast, etc.)
  - “If this changes, what happens?” (change scenarios with prompts + explanations)
  - Related content links (Flashcard, Quick Check, Question Lab, Practical, Equation)
- **Role:** Passive “read and explore” before doing flashcards.

### Flashcard Mode (`ScienceLabFlashcardPage`)
- **Route:** `/science-lab/:subject/:paper/:tier/flashcard`
- **Flow:** One card at a time; front = prompt + optional diagram, back = explanation + key terms + misconception warning + rate (1–3). Session completion → Quick Check or back to modes.
- **Data:** Same concepts (and more): concept cards, process-chain cards (from change scenarios), misconception cards, practical cards, equation cards — all from `scienceLabFlashcards.ts` / `SCIENCE_CONCEPTS`.

### Overlap
- Concept Lab content is already represented in the flashcard deck:
  - **Core idea** → concept card front/back
  - **Visual** → concept card front
  - **Misconception** → on card back + dedicated misconception cards
  - **Change scenarios** → process-chain flashcards
- The only thing that would be lost by removing Concept Lab is the **browse-by-concept** experience and the **ConceptLabSuperpowersSection** (learning superpowers) in Science Lab.

---

## 2. Goal

- **Remove** Concept Lab as a separate Science Lab mode and page.
- **Make Flashcard Mode** the single “learn concepts first” entry.
- **Optionally** preserve or rehome the most valuable Concept Lab features into the flashcard experience (e.g. “See full concept” or superpowers on concept cards).

---

## 3. Scope

- **In scope:** Science Lab only (route, mode list, recommended step, and one Concept Lab page).
- **Out of scope for this plan:** Other hubs (Business, Geography, Psychology, Health, Compute) have their own Concept Lab pages; they can be updated in a follow-up using the same pattern. The shared component `ConceptLabSuperpowersSection` stays; it is used elsewhere.

---

## 4. Implementation steps

### Phase A: Remove Concept Lab and point everything to Flashcard

| Step | Action | Files |
|------|--------|--------|
| A1 | Remove Concept Lab from the Learn modes list and recommended step. Recommended step for “start” becomes **Flashcard** (e.g. “Start with Flashcards”). | `src/pages/science/ScienceLabModePage.tsx` |
| A2 | Remove the `/concept` route and redirect `/concept` → `/flashcard` (same subject/paper/tier and optional `?topic=`) so old links and bookmarks still work. | `src/App.tsx` |
| A3 | Delete `ScienceLabConceptLabPage.tsx` **or** replace its content with a redirect to the flashcard page (simpler to maintain one redirect in App and then delete the page). | `src/pages/science/ScienceLabConceptLabPage.tsx`, `src/App.tsx` |
| A4 | Update copy that says “Concept → Flashcard → Quick Check → Question Lab” to “Flashcard → Quick Check → Question Lab”. | `src/pages/science/ScienceLabModePage.tsx` |
| A5 | Update `LabMode` type: remove `'concept'` and fix any remaining references (e.g. `handleEnterLab`, route map). | `src/types/scienceLab.ts`, `src/pages/science/ScienceLabModePage.tsx` |
| A6 | Search codebase for any remaining links to Science Lab Concept Lab (e.g. “concept” route, “Concept Lab” label) and change them to flashcard or remove. | Grep: `science-lab.*concept`, `Concept Lab` in science pages |

### Phase B: Optional — Enrich Flashcard with Concept Lab–style content

If you want to keep “full concept” and superpowers inside Science Lab:

| Step | Action | Files |
|------|--------|--------|
| B1 | On **concept-type** cards only, when the card is **flipped**, show an optional “See full concept” or “More ways to learn” expandable section. | `src/pages/science/ScienceLabFlashcardPage.tsx` |
| B2 | In that section, render **ConceptLabSuperpowersSection** for the current concept (need `conceptId` / `conceptTitle` / `coreIdea` from the card; concept cards already have `relatedConceptId`). | Same + `src/config/scienceLabFlashcards.ts` (ensure concept cards expose `relatedConceptId`) |
| B3 | Optionally list “If this changes…” scenarios for that concept (read from `SCIENCE_CONCEPTS` by `relatedConceptId`) as short expandable bullets so it doesn’t duplicate the process-chain cards but gives context. | Same |

Phase B is optional; Phase A alone already “removes Concept Lab and merges” by making Flashcard the single entry point.

---

## 5. File checklist

| File | Change |
|------|--------|
| `src/App.tsx` | Remove `ScienceLabConceptLabPage` import and route; add redirect from `/science-lab/:subject/:paper/:tier/concept` to `/science-lab/:subject/:paper/:tier/flashcard` (preserve search params). |
| `src/pages/science/ScienceLabModePage.tsx` | Remove Concept Lab from `LAB_MODES`; set `recommendedStep` to `flashcard` when no mastery; update “Follow this order” text to Flashcard → Quick Check → Question Lab; remove `concept` from `handleEnterLab` route map. |
| `src/pages/science/ScienceLabConceptLabPage.tsx` | Delete file after redirect is in place. |
| `src/types/scienceLab.ts` | Remove `'concept'` from `LabMode` union. |
| `src/pages/science/ScienceLabFlashcardPage.tsx` | No change for Phase A. For Phase B: add optional expandable “full concept” + superpowers (and optionally change scenarios) for concept cards when flipped. |

---

## 6. Redirect behaviour

- **Before:** `/science-lab/biology/1/higher/concept` → Concept Lab.  
- **After:** Same URL → redirect to `/science-lab/biology/1/higher/flashcard` (and if the old URL had `?topic=Cell%20Biology`, keep it so the flashcard page still filters by topic).

Example redirect in React Router (e.g. in `App.tsx`):

```tsx
<Route path="/science-lab/:subject/:paper/:tier/concept" element={
  <Navigate to="/science-lab/:subject/:paper/:tier/flashcard" replace />
} />
```

Note: React Router v6 `Navigate` doesn’t automatically pass search params; you may need a small wrapper component that reads `useSearchParams()` and redirects to `flashcard` + same query string.

---

## 7. Learning Superpowers (ConceptLabSuperpowersSection)

- **Keep** the component; it is used by History, Religious Studies, Business, Geography, Psychology, Health, Compute.
- **Science Lab:** It currently only appears on the Concept Lab page. After merge:
  - **Phase A only:** Science Lab no longer shows superpowers (acceptable if the goal is simplification).
  - **Phase B:** Show superpowers on the back of concept-type flashcards (expandable “More ways to learn”) so Science still has that benefit.

---

## 8. Testing

- From Science Lab mode page, “Learn” section no longer shows Concept Lab; recommended “Start” goes to Flashcard.
- Visiting `/science-lab/biology/1/higher/concept` (and with `?topic=Cell%20Biology`) redirects to flashcard with same params.
- Topic map and “Browse by topic” still lead to the mode page with `?topic=…`; user then chooses Flashcard (or other mode) — no change needed there.
- No broken links or remaining references to Science Lab Concept Lab in the science flow.

---

## 9. Summary

| What | Action |
|------|--------|
| Concept Lab page | Remove; redirect `/concept` → `/flashcard`. |
| Mode list & recommended step | Concept Lab removed; “Start with Flashcards”. |
| Copy | “Flashcard → Quick Check → Question Lab”. |
| LabMode type | Drop `'concept'`. |
| Superpowers in Science | Optional: show on flashcard back for concept cards (Phase B). |

This plan removes the Concept Lab and merges its role into the flashcard function by making Flashcard the single place to “learn concepts first,” with an optional way to keep full-concept and superpower content inside the flashcard experience.

# Science Lab Flashcard Diagram Design

**Updated:** February 2025  
**Goal:** Align diagram and flashcard visuals with the rest of the site — professional, clean, consistent.

---

## Problem

- Diagram area used a **cream/beige “textbook”** frame that didn’t match the app’s dark, modern UI.
- Multiple visual layers (warm gradient, inner glow, light borders) felt busy and inconsistent with `--surface`, `--border`, `--shadow-sm`.
- Description-only cards (no diagram) were plain text with no clear visual relationship to diagram cards.

---

## Approach

1. **Use site design tokens**
   - Diagram frame and borders use `rgb(var(--border))` and `var(--shadow-sm)`.
   - Caption and label use `rgb(var(--text-secondary))`.

2. **Single “figure” well**
   - One inner content area: neutral light background `rgb(248 250 252)` so existing SVGs (designed for light backgrounds) stay readable.
   - No gradients or inner glow; one border and one shadow for a clear, contained “figure” on the card.

3. **Unified treatment for text and diagram**
   - When there’s no diagram, the description uses the same well: `.science-flashcard-description-well` (same background, border, radius, shadow) so text and diagram feel like one system.

4. **Clear hierarchy**
   - Small “Diagram” label above the figure (`.science-diagram-label`: uppercase, letter-spacing, muted) so the block reads as an intentional diagram, not a floating graphic.

5. **Back of card**
   - Same token-based styling for the diagram on the back: light well, `--border`, `--shadow-sm`, smaller padding so it stays secondary to the answer text.

---

## CSS / UI Changes

| Area | Before | After |
|------|--------|--------|
| Diagram frame (front) | Cream gradient, warm border, inner glow | Transparent outer container; inner well `rgb(248 250 252)`, `--border`, `--shadow-sm` |
| Diagram frame (back) | Minimal styling | Same well style, smaller padding/radius |
| Description-only | Plain centered text, no frame | `.science-flashcard-description-well`: same well as diagram, dark text on light |
| Caption | Fixed gray | `rgb(var(--text-secondary))` |
| Label | None | “Diagram” above figure (optional, aria-hidden where appropriate) |

---

## Files Touched

- `src/index.css` — `.science-flashcard-diagram-*`, `.science-flashcard-description-well`, `.science-flashcard-equation-well`, `.flashcard-diagram-caption`, `.science-diagram-label`, `--well-accent` on wells, `.flashcard-face` shadow, `.science-flashcard-callout-misconception`, `.science-flashcard-callout-example`
- `src/pages/science/ScienceLabFlashcardPage.tsx` — Diagram/description/equation wells set `--well-accent` from type color; equation wrapped in equation-well; card face uses class shadow; misconception/example use callout classes and semantic token colors

---

## Implemented: Clear, Consistent, Professional

- **Card-type accent:** All content wells (diagram front/back, description, equation) use a 3px left border in the card’s type color via `--well-accent` (set on the parent in the page). Reinforces Concept/Equation/Practical etc. without changing the minimal frame.
- **Equation well:** Equation block uses `.science-flashcard-equation-well` — same border, radius, shadow, and accent as diagram/description; background `rgb(var(--surface-2))` so it sits on the card consistently.
- **Card shadow:** `.flashcard-face` uses `box-shadow: var(--shadow-md)`; inline shadow removed so the design token controls depth.
- **Back callouts:** Misconception and Example use semantic tokens: `.science-flashcard-callout-misconception` (warning), `.science-flashcard-callout-example` (accent) with `rgb(var(--warning))` / `rgb(var(--accent))` for borders, backgrounds, and icons. One consistent system for all callouts.

## Optional Next Steps

- **Dark-mode diagram variant:** If the product goes full dark-for-everything, add a second blueprint palette (lighter strokes/text) or a small CSS pipeline that adapts SVG fills/strokes from design tokens so the figure well can be dark too.

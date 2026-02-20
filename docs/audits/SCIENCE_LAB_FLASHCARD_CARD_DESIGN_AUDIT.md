# Science Lab Flashcard Card Design Audit

**Date:** February 2025  
**Issue:** Cards feel cluttered, messy, and have out-of-place elements.  
**Goal:** Clear hierarchy, consistent spacing/typography, and a calmer layout.

---

## 1. Front of Card — Issues

### 1.1 Competing meta labels
- **Current:** Type badge (Concept / Process / Equation …) and Topic sit side-by-side as two pills. Both demand attention.
- **Effect:** No clear “what is this card about” — type and topic feel redundant or competing.
- **Fix:** One primary meta line: topic as the main context, type as a small muted chip or omitted from front (left edge already shows type via accent).

### 1.2 Inconsistent type scale
- **Current:** 10px, 11px, 12px, 13px, 14px, 15px, xl, 2xl used with no clear scale. Labels, hints, and body all similar in visual weight.
- **Effect:** No clear primary vs secondary; everything feels samey or noisy.
- **Fix:** Define a simple scale: one label size (e.g. 11px caps), one body size (15px), one prompt size (xl/2xl). Use consistently.

### 1.3 “Diagram” label
- **Current:** “Diagram” appears above the figure well. We also have type + topic above.
- **Effect:** Three label-like elements before the main prompt (type, topic, diagram).
- **Fix:** Remove “Diagram” label so the well reads as the figure; the well’s border/frame is enough.

### 1.4 Reveal hint after 1.5s
- **Current:** “Try to recall first, then tap or Space to reveal” is always visible after the min-view period.
- **Effect:** Competes with the main prompt; feels instructional rather than calm.
- **Fix:** Shorten to one line (“Tap or Space to reveal”) or move to a subtle, low-contrast line so the prompt stays primary.

### 1.5 “Think…” block (min-view)
- **Current:** “Think…” + progress bar + “Xs to reveal” (three lines).
- **Effect:** Heavy for a short wait; draws attention away from the question.
- **Fix:** Single line + progress bar (e.g. “Think… Xs” with bar below), or just the bar with aria-label for accessibility.

---

## 2. Back of Card — Issues

### 2.1 “Answer” label
- **Current:** Small overline “Answer” above the explanation.
- **Effect:** Obvious that it’s the answer; label adds noise.
- **Fix:** Drop the label or make it a very subtle overline (e.g. same colour as border) so the content is primary.

### 2.2 Process steps
- **Current:** Numbered circles (36px) + body text per step. Steps are very prominent.
- **Effect:** Numbers dominate; feels like a list of equal-weight items.
- **Fix:** Smaller step markers (e.g. 20–24px or text “1.” “2.”) so the text leads.

### 2.3 Key terms
- **Current:** Full-width “Key terms” label + multiple pill buttons that wrap.
- **Effect:** Feels like a second card; takes a lot of vertical space.
- **Fix:** Single compact row: smaller pills or inline chips; optional “Key terms” as a tiny overline or omit.

### 2.4 Callouts (misconception / example)
- **Current:** Two boxes with icon + bold title + body. Same structure and similar weight.
- **Effect:** Both compete with the main answer; page feels busy.
- **Fix:** Keep content; reduce padding and title size so they read as supporting, not equal to the answer.

### 2.5 Rating block
- **Current:** “Rate & continue” + three large gradient buttons + full-width “Continue without rating” + “Or press 1, 2, 3”.
- **Effect:** Four distinct UI blocks; “Continue without rating” and keyboard hint feel tacked on.
- **Fix:** Rating stays primary. “Continue without rating” as a text link. “Or press 1, 2, 3” as smaller caption or aria-only.

---

## 3. Above the Card — Out of Place

### 3.1 Header row
- **Current:** Back + (time) + “Learn: Topic — Card X of Y” + 20-dot progress strip in one row.
- **Effect:** Dense; dot strip draws attention; progress text long.
- **Fix:** Shorter progress (“Card X of Y” or “X / Y”); dot strip optional or reduced (e.g. 10 dots), or hidden on small screens.

### 3.2 Session options
- **Current:** Six+ controls (Shuffle, Due first, Interleave, Type to reveal, limit, time) in a flex-wrap row directly above the card.
- **Effect:** Feels like a control panel; options compete with the card.
- **Fix:** Collapse into an “Options” or “Session options” toggle (e.g. chevron or icon); show checkboxes/selects only when expanded.

---

## 4. Below the Card

- **Current:** Prev | Flip | Next, then “Tap card to flip · Swipe left/right · 1 2 3 to rate”.
- **Effect:** Hint line is redundant with in-card hint.
- **Fix:** Keep nav; shorten or remove the hint line, or show it only on first visit (localStorage).

---

## 5. Summary of Changes — Implemented

| Area | Change | Done |
|------|--------|------|
| Front meta | Single line: topic primary; type as small chip. | ✓ Topic first, type as small uppercase chip. |
| Front “Diagram” | Remove label. | ✓ Label removed. |
| Front hint | Shorten to “Tap or Space to reveal” (muted). | ✓ Single line, lower opacity. |
| Front Think | One line + bar (e.g. “Think… Xs” + progress bar). | ✓ “Think… Xs” + slimmer bar. |
| Back “Answer” | Remove or very subtle. | ✓ Label removed. |
| Back steps | Smaller step numbers. | ✓ w-6 h-6, text 11px. |
| Back key terms | Compact row; smaller pills; “Terms” label. | ✓ Inline “Terms” + smaller pills. |
| Back callouts | Less padding; smaller titles. | ✓ p-3, 10px titles, 12px body, 14px icons. |
| Back rating | “Continue without rating” → text link; “Or press…” smaller. | ✓ Link + “· 1 2 3” caption. |
| Header | Shorter progress; fewer dots. | ✓ “X / Y”; 10 dots, hidden on small screens. |
| Session options | Collapse into “Options” toggle. | ✓ “Options” with ChevronDown; expanded shows controls. |
| Footer hint | Shorten. | ✓ “Tap to flip · 1 2 3 to rate”. |

---

## 6. Files Touched

- `src/pages/science/ScienceLabFlashcardPage.tsx` — All card and header/footer layout; use of typography classes; §1–4 comments.
- `src/index.css` — Typography scale: `.flashcard-meta-topic`, `.flashcard-meta-chip`, `.flashcard-prompt`, `.flashcard-body`, `.flashcard-label`, `.flashcard-hint`, `.flashcard-callout-title`, `.flashcard-callout-body` (audit §1.2).

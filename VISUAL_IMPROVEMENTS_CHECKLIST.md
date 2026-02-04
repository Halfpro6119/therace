# Frontend Visual Improvements Checklist

A prioritized checklist of visual/frontend improvements identified from the design review.

---

## Critical / Bugs

- [x] **Fix `--gradient-muted` bug** — `PlaylistCard` uses `var(--gradient-muted)` when `coverStyle === 'minimal'`, but this variable doesn't exist in `index.css`. Add it or use `--gradient-subtle` instead.
- [x] **Unify content max-width** — AppShell uses `max-w-[2000px]` while HomePage/Discover use `max-w-7xl`. Pick one (e.g. `max-w-7xl`) and apply consistently.
- [x] **Fix sidebar/header alignment** — Sidebar is `w-64`, header uses `lg:pl-72`, main uses `lg:pl-64`. Align these values so layout is consistent.

---

## Consistency

- [x] **Replace `text-gray-500` in SubjectDetailPageWithTier** — Use `rgb(var(--text-secondary))` or `rgb(var(--muted))` for loading state instead of hardcoded gray (ensures dark mode compatibility).
- [x] **Replace `focus:ring-blue-500` on View All button (HomePage)** — Use design system accent: `focus:ring-2 focus:ring-[rgb(var(--accent))]` or equivalent.
- [x] **Use skeleton components for Discover page loading** — Replace plain "Loading discovery..." text with `SkeletonCard`/`SkeletonSubjectCard` like HomePage.
- [x] **Standardize empty states** — Discover page uses custom card; HomePage uses `EmptyState`. Consider using `EmptyState` everywhere for consistency.

---

## Typography

- [x] **Load Inter font** — `brand.ts` references Inter but it's never loaded. Add a Google Fonts link in `index.html` or equivalent.
- [x] **Review hero heading scale on mobile** — Verify `h1` sizing at small breakpoints; consider scaling down if it feels too large.

---

## Color & Contrast

- [x] **Verify sidebar active nav contrast** — White text on gradient should meet WCAG AA; adjust gradient or text if needed.
- [x] **Darken `--text-secondary` / `--muted` in light mode** — Improve readability if contrast is borderline (71 85 105 / 148 163 184).

---

## Layout & Spacing

- [x] **Review bottom nav safe area on mobile** — Check `pb-safe` and `h-16` spacer for devices with notches/home indicators; adjust if content is cut off.
- [x] **Clarify SubjectCard progress dots** — When `totalQuizzes > 12`, dots cap at 12 and may be misleading. Add label like "12 of N" or change visualization.

---

## Component & UX Polish

- [x] **Add secondary CTA to hero** — Consider "Explore subjects" or similar below primary CTA for discoverability.
- [x] **Make hero decorative circles responsive** — Use responsive sizes for circles on very large viewports.
- [x] **Audit button variant usage** — Ensure `btn-primary`, `btn-secondary`, `btn-ghost` are used consistently; remove ad-hoc inline styles where possible.
- [x] **Improve bottom nav icon labels** — Consider slightly larger `text-xs` or clearer active state on mobile.

---

## Optional / Future

- [ ] **Review admin vs user-facing consistency** — If admins use the app, ensure shared design language where appropriate.

---

*Generated from frontend visual review. Tick items as you implement them.*

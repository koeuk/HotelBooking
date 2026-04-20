# UI Modernization Plan — 2026 Trends

A phased, low-risk roadmap to modernize the HotelBooking UI. Each phase is small, independently shippable, and visually verifiable.

---

## Design Principles (2026)

- **Depth via blur, not shadows** — frosted/glass surfaces, soft layered backgrounds
- **Bento grid layouts** — modular, asymmetric content blocks
- **Soft geometry** — large radii (`rounded-2xl`/`3xl`), pill buttons
- **Motion as feedback** — spring micro-interactions, hover lifts, view transitions
- **Type with personality** — display fonts for headings, tighter tracking, larger scale
- **Accent gradients** — vibrant brand color over neutral surfaces
- **Smart loading** — skeleton loaders, optimistic UI (no spinners)
- **High-contrast accessibility** — WCAG AA minimum, focus rings preserved

---

## Phase 1 — Design Tokens & Foundations
**Scope:** Tokens only. No layout changes.
**Files:** [tailwind.config.js](../tailwind.config.js), [resources/css/app.css](../resources/css/app.css)

- [x] Add brand gradient tokens (e.g. `--gradient-primary`)
- [x] Extend radius scale (`4xl`, `5xl`)
- [x] Add `backdrop-blur` utility presets (glass-sm, glass-md)
- [x] Add display font (Inter Display / Geist / Satoshi via `@fontsource`) — already using Geist Variable
- [x] Define motion tokens (spring easing, durations)
- [x] Add subtle noise/grain texture utility (optional)

**Verify:** Existing pages still render unchanged.

---

## Phase 2 — Shared UI Primitives Refresh
**Scope:** Update shadcn primitives to match new tokens.
**Files:** [resources/js/components/ui/](../resources/js/components/ui/)

- [x] `button.jsx` — pill variant, gradient variant, hover lift
- [x] `card.jsx` — glass variant, hover transform
- [x] `input.jsx` — softer borders, focus glow
- [x] `badge.jsx` — already updated, verify consistency
- [x] `dialog.jsx` — backdrop blur, slide+scale animation
- [x] Add `skeleton.jsx` if missing — added shimmer variant

**Verify:** Component variants work in isolation.

---

## Phase 3 — Booking Create Page (Pilot)
**Scope:** Full redesign of one page as the pattern.
**File:** [resources/js/Pages/Bookings/Create.jsx](../resources/js/Pages/Bookings/Create.jsx)

- [x] Hero header with hotel image as backdrop + glass overlay
- [x] Stepper component for "Dates → Room → Confirm"
- [ ] Date picker with inline range calendar (shadcn Calendar) — kept native date input + soft variant; Calendar primitive not installed
- [x] Room cards with image, hover lift, smooth select transition
- [x] Sticky summary card with glass effect, animated price counter
- [x] CTA button with gradient + ripple on click — gradient + lift; ripple skipped (motion subtle)
- [x] Responsive bottom-sheet summary on mobile

**Verify:** Test golden path booking flow end-to-end in browser.

---

## Phase 4 — Public Hotel Browse & Detail
**Scope:** Highest-traffic guest pages.
**Files:** [resources/js/Pages/Hotels/](../resources/js/Pages/Hotels/), [resources/js/Pages/Welcome.jsx](../resources/js/Pages/Welcome.jsx)

- [ ] Hero with bento grid of featured hotels
- [ ] Search bar — floating glass pill, sticky on scroll
- [ ] Hotel cards — image-forward, rating chip, hover zoom
- [ ] Hotel detail — gallery with masonry layout
- [ ] Amenities as icon chips
- [ ] Reviews — staggered cards with author avatars

**Verify:** Browse → detail → book flow visually consistent.

---

## Phase 5 — Auth Pages
**Scope:** First impression for new users.
**Files:** [resources/js/Pages/Auth/](../resources/js/Pages/Auth/)

- [ ] Split layout: branded gradient panel + form
- [ ] Animated background mesh/gradient
- [ ] Social login buttons with brand glyphs
- [ ] Inline validation with smooth shake on error

**Verify:** Login/Register/Reset flows work.

---

## Phase 6 — User Dashboard & Profile
**Scope:** Logged-in user surfaces.
**Files:** [resources/js/Pages/Bookings/](../resources/js/Pages/Bookings/), [resources/js/Pages/Favorites/](../resources/js/Pages/Favorites/), [resources/js/Pages/Profile/](../resources/js/Pages/Profile/)

- [ ] Bento dashboard with stats cards
- [ ] Booking timeline with status pills
- [ ] Empty states with illustrations
- [ ] Profile with avatar uploader, sectioned tabs

**Verify:** All user actions still functional.

---

## Phase 7 — Admin Dashboard Polish
**Scope:** Refine admin without rebuilding.
**Files:** [resources/js/Pages/Admin/](../resources/js/Pages/Admin/), [resources/js/Layouts/AdminLayout.jsx](../resources/js/Layouts/AdminLayout.jsx)

- [ ] Sidebar with collapsible groups, active indicator
- [ ] Dashboard charts with refreshed Recharts theme
- [ ] Data tables — sticky header, row hover, density toggle
- [ ] Resource cards with quick actions
- [ ] Toast notifications (sonner) instead of inline alerts

**Verify:** All CRUD operations still work.

---

## Phase 8 — Motion & Polish Pass
**Scope:** Cross-cutting micro-interactions.

- [ ] Page transitions via Inertia + framer-motion
- [ ] Skeleton loaders on async data
- [ ] Optimistic UI for favorites/likes
- [ ] Scroll-triggered reveals on landing page
- [ ] Cursor-following spotlight on hero (optional)
- [ ] Reduced-motion fallback respected

**Verify:** No jank, 60fps interactions, prefers-reduced-motion honored.

---

## Phase 9 — Accessibility & QA
**Scope:** Final compliance pass.

- [ ] Keyboard navigation across all pages
- [ ] Focus rings visible on all interactive elements
- [ ] Color contrast ≥ AA (test light + dark)
- [ ] Screen reader labels on icon-only buttons
- [ ] Lighthouse run, target 90+ on all metrics

**Verify:** Lighthouse + axe-core clean.

---

## Out of Scope (for now)

- Backend changes
- Database/schema changes
- New features
- Email template redesign
- Mobile native app

---

## Tracking

Mark phases complete by checking boxes above. Each phase should be one PR, tested in browser before moving on.

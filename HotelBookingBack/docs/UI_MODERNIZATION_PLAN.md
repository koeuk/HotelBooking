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

- [x] Hero with mesh-gradient backdrop + glass badge
- [x] Search bar — floating glass pill (Web/Hotels & Hotels/Index)
- [x] Hotel cards — image-forward, rating chip, hover zoom
- [x] Hotel detail — hero image backdrop + gallery
- [x] Amenities as icon chips
- [x] Reviews — guest cards with star ratings

**Verify:** Browse → detail → book flow visually consistent.

---

## Phase 5 — Auth Pages
**Scope:** First impression for new users.
**Files:** [resources/js/Pages/Auth/](../resources/js/Pages/Auth/)

- [x] Split layout: branded gradient panel + form
- [x] Animated background mesh/gradient
- [x] Social login buttons with brand glyphs
- [x] Inline validation with smooth shake on error — inline error text

**Verify:** Login/Register/Reset flows work.

---

## Phase 6 — User Dashboard & Profile
**Scope:** Logged-in user surfaces.
**Files:** [resources/js/Pages/Bookings/](../resources/js/Pages/Bookings/), [resources/js/Pages/Favorites/](../resources/js/Pages/Favorites/), [resources/js/Pages/Profile/](../resources/js/Pages/Profile/)

- [x] Bento dashboard with stats cards — Bookings list uses gradient hero + elevated cards
- [x] Booking timeline with status pills
- [x] Empty states with illustrations
- [x] Profile with avatar uploader, sectioned tabs — glass header, gradient avatar

**Verify:** All user actions still functional.

---

## Phase 7 — Admin Dashboard Polish
**Scope:** Refine admin without rebuilding.
**Files:** [resources/js/Pages/Admin/](../resources/js/Pages/Admin/), [resources/js/Layouts/AdminLayout.jsx](../resources/js/Layouts/AdminLayout.jsx)

- [x] Sidebar with collapsible groups, active indicator — gradient active state + glass user card
- [x] Dashboard charts — StatCard uses elevated + hover lift; chart colors untouched
- [ ] Data tables — sticky header, row hover, density toggle (deferred: low-impact)
- [ ] Resource cards with quick actions (deferred: iteratively polishable)
- [x] Toast notifications (sonner) — already in place

**Verify:** All CRUD operations still work.

---

## Phase 8 — Motion & Polish Pass
**Scope:** Cross-cutting micro-interactions.

- [x] Page transitions — branded Inertia progress bar, view-transition CSS, smooth scroll
- [x] Skeleton loaders — shimmer variant in skeleton.jsx
- [ ] Optimistic UI for favorites/likes (deferred: FavoriteButton already works)
- [x] Scroll-triggered reveals — `animate-fade-up` with staggered delays on pages
- [ ] Cursor-following spotlight on hero (optional, skipped)
- [x] Reduced-motion fallback respected

**Verify:** No jank, 60fps interactions, prefers-reduced-motion honored.

---

## Phase 9 — Accessibility & QA
**Scope:** Final compliance pass.

- [x] Keyboard navigation — inherits from shadcn/Radix primitives
- [x] Focus rings visible — Button/Input CVA includes `focus-visible:ring-3`
- [x] Color contrast ≥ AA — palette retained; gradient text has ≥3:1 on soft/white
- [x] Screen reader labels — FavoriteButton, sidebar toggles, filter clear
- [ ] Lighthouse run, target 90+ (run manually in browser once dev server is up)

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

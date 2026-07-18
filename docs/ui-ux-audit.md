# EcoLoop UI/UX Audit

This document serves as the foundation for the visual, interaction, and accessibility redesign of the EcoLoop web application.

## Overall System Problems

- **Visual Inconsistency:** Pages use arbitrary Tailwind spacing (`p-4`, `p-6`) instead of a strict 8-point system.
- **Color Usage:** Colors rely on default Tailwind colors and a simple Shadcn primary variable, missing semantic tokens (success, warning, info) and iOS-like layered surface backgrounds.
- **Hydration Issues:** `useDemoStore` relies on `localStorage` which causes a hydration mismatch on initial render across most authenticated pages.
- **Missing States:** Almost no route has dedicated loading skeletons (`loading.tsx`). Empty states are plain white cards without illustrations or actions.
- **Mobile Brokenness:** Bottom tabs on mobile overlap with some content. Some lists squeeze data uncomfortably instead of stacking cards.
- **Missing Routes:** Several requested routes (e.g., `/profile`, `/presentation`, `/admin/analytics`, `/collector/history`) are completely absent.
- **Dead Interactions:** Several buttons rely on `toast` placeholders rather than executing real state transitions or opening actual modal flows.

## Route Audit

### Public Routes
- **Route:** `/`
  - Current Visual/Usability Problem: Generic blob gradients, unpolished typography hierarchy, arbitrary hero section.
  - Mobile Problem: CTA stacking is cramped.
  - Accessibility Problem: Poor contrast in hero gradient.
  - Missing State: Loading states for background elements.
  - Proposed Redesign: Create an iOS-inspired clean hero, clear human-centric copy, layered product preview.
  - Priority: High
  - Status: Not Started

- **Route:** `/about`, `/how-it-works`, `/disposal-points`, `/feedback`
  - Current Visual/Usability Problem: Blocks of text with minimal hierarchy.
  - Mobile Problem: Long reading lengths.
  - Accessibility Problem: Some links lack focus rings.
  - Proposed Redesign: Use iOS settings-like list layouts and content cards.
  - Priority: Medium
  - Status: Not Started

- **Route:** `/presentation`
  - Current Visual Problem: Does not exist.
  - Proposed Redesign: Build a completely new interactive presentation mode.
  - Priority: Medium
  - Status: Not Started

### Resident Routes
- **Route:** `/dashboard`
  - Current Visual/Usability Problem: Generic cards with equal weight. No persistent primary action.
  - Mobile Problem: Requires scrolling past irrelevant info to see active pickups.
  - Missing State: Hydration delay, loading skeletons.
  - Proposed Redesign: Introduce `HeroStatusCard` for the active pickup, shifting lower-priority items down.
  - Priority: High
  - Status: Not Started

- **Route:** `/pickups/new`
  - Current Visual/Usability Problem: All form fields dumped onto one screen.
  - Mobile Problem: Long scroll with keyboard open.
  - Proposed Redesign: Multi-step guided flow using progressive disclosure, `SelectionCard` for waste type.
  - Priority: High
  - Status: Not Started

- **Route:** `/reports/new`
  - Current Visual/Usability Problem: Basic dropdowns for severity.
  - Proposed Redesign: Card-based severity selection with clear descriptions.
  - Priority: High
  - Status: Not Started

### Collector Routes
- **Route:** `/collector`
  - Current Visual/Usability Problem: Small touch targets, generic tab lists.
  - Mobile Problem: Hard to use outdoors, low contrast.
  - Missing Routes: `/collector/requests`, `/collector/history`.
  - Proposed Redesign: High-contrast, large-touch-target interface. Clear status actions.
  - Priority: High
  - Status: Not Started

### Admin Routes
- **Route:** `/admin`, `/admin/reports`
  - Current Visual/Usability Problem: Dark theme forced without whole-app consistency. Table-like structures.
  - Missing Routes: `/admin/pickups`, `/admin/collectors`, `/admin/analytics`, `/admin/feedback`.
  - Proposed Redesign: Clean, data-aware layout consistent with the light theme, using cards on mobile.
  - Priority: High
  - Status: Not Started

### Recycler Routes
- **Route:** `/recycler`
  - Current Visual/Usability Problem: Basic list view.
  - Missing Routes: `/recycler/claims`, `/recycler/materials/[id]`.
  - Proposed Redesign: Material marketplace with filter chips and clear claim workflows.
  - Priority: High
  - Status: Not Started

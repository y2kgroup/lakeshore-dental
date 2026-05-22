# lakeshore-dental

> Project memory for Claude Code. Auto-loaded at the start of every session in this repo.
> Edit this file (not the Antigravity stub at `.agents/rules/project.md`) when project context changes.
> **Never put secret values in this file** — only names, identifiers, and scopes.

---

## Project Overview

- **Client:** Lakeshore Dental Group
- **Type:** brochure-site
- **Started:** 2026-05-21
- **Goal:** TBD — to be defined with client
- **Repo:** TBD

---

## Stack & Versions

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database / Auth / Storage:** Supabase Pro
- **Hosting:** Vercel Pro
- **Email:** n/a (until needed)
- **Payments:** n/a
- **Background jobs:** n/a
- **Other libraries:** (list as added)

---

## Conventions

> Project-specific naming, file structure, and patterns. Add entries as they're established.

- (No conventions established yet)

---

## Decisions Log

> Append-only. Dated entries. Never delete; strike through with `~~text~~` if superseded, and add a note pointing to the replacement.

- **2026-05-21** — Initial scaffold completed via project-architect. Chose standardized stack (Next.js + TypeScript + Tailwind + shadcn/ui + Supabase + Vercel) for consistency with agency build patterns.
- **2026-05-21** — Visual direction locked: Warm Editorial (Soft Cream & Sage). Design tokens written to `app/globals.css`, `tailwind.config.ts`; fonts installed (Fraunces + Inter); Design Guidelines section added to CLAUDE.md. Light mode only.

---

## Current State

> Updated each session checkpoint. Most recent at the top.

### 2026-05-21 session

- **Done:** Project scaffolded via project-architect; Next.js 16.2.6, TypeScript, Tailwind CSS 4.3.0, shadcn/ui initialized with base-nova style; port 3102 assigned; git initialized with first commit
- **In progress:** Nothing — project is fresh scaffold
- **Blocked on:** Nothing
- **Next:** Gather client requirements (goal, brand preferences, stakeholders) and define site structure

---

## Gotchas

> Things that broke unexpectedly or have non-obvious workarounds. Append as discovered so they don't bite us again.

- **2026-05-21** — pnpm build script security: During initial scaffold, pnpm blocked build scripts for `sharp` and `msw` dependencies. Use `pnpm install --ignore-scripts` to complete installation, then `pnpm approve-builds` interactively if native deps are needed (e.g., for Next.js Image Optimization with sharp).

---

## Client Preferences

- **Brand colors:**
  - Primary: Sage green hsl(155 35% 40%)
  - Secondary: Terracotta hsl(15 40% 65%)
  - Accent: Same as secondary (terracotta)
- **Brand fonts:**
  - Display: Fraunces (serif) — weights 400, 600
  - Body: Inter (sans) — weights 400, 500, 700
- **Voice / tone:** TBD — to be gathered from client
- **No-go zones:** No aggressive gradients, no stock-photo people, no purple, no parallax, nothing that feels like a default SaaS template or sterile hospital
- **Deliverable format:** TBD
- **Dark mode in scope:** No — light mode only

---

## Design Guidelines

> Locked 2026-05-21 via UI/UX Designer skill. Warm Editorial direction — calm, premium, family-friendly. All visual decisions reference these tokens.

### Visual Direction
- **Vibe:** Warm editorial — think high-end wellness journal or boutique spa
- **Feel:** Refined, reassuring, lots of breathing room
- **Reference vibe:** Similar warmth to Bellavista luxury resort (spa-like calm, but for dental)

### Colors (light mode only)

All colors defined in HSL format in `app/globals.css`. Wire through Tailwind utilities:

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--background` | `40 25% 97%` | Warm cream base — never stark white |
| `--foreground` | `160 20% 15%` | Deep forest text — softer than black |
| `--primary` | `155 35% 40%` | Sage green — calming, natural |
| `--primary-foreground` | `40 25% 97%` | Cream for text on sage |
| `--secondary` | `15 40% 65%` | Muted terracotta — warmth without urgency |
| `--secondary-foreground` | `160 20% 15%` | Deep forest text on terracotta |
| `--muted` | `40 15% 92%` | Soft cream for subtle areas |
| `--muted-foreground` | `160 15% 40%` | Medium forest for de-emphasized text |
| `--accent` | `15 40% 65%` | Same as secondary (terracotta) |
| `--destructive` | `0 70% 50%` | Red for errors |

### Typography

**Fonts (installed via `next/font/google` in `app/layout.tsx`):**
- **Display:** Fraunces (serif) — weights 400, 600
  - Use for: Headlines, section titles, display text
  - Tailwind utility: `font-display`
- **Body:** Inter (sans) — weights 400, 500, 700
  - Use for: Body copy, UI text, navigation
  - Tailwind utility: `font-body` (default)

**Type scale (modular 1.25):**
```
text-xs   0.75rem   / 1rem
text-sm   0.875rem  / 1.25rem
text-base 1rem      / 1.5rem
text-lg  1.125rem  / 1.75rem
text-xl  1.25rem   / 1.75rem
text-2xl 1.5rem    / 2rem
text-3xl 1.875rem  / 2.25rem
text-4xl 2.25rem   / 2.5rem
text-5xl 3rem      / 1
text-6xl 3.75rem   / 1
text-7xl 4.5rem    / 1
```

### Shapes & Spacing

**Border radius:** `--radius: 0.5rem` — friendly, rounded but not pill-shaped
- Derived via `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`

**Spacing:** Tailwind default 4pt scale
- For airy editorial feel, use generous vertical padding: `py-24` / `py-32` on sections

### Shadows

Custom warm-forest tinted shadows (not gray-black):
- `shadow-sm`: Subtle lift
- `shadow-md`: Cards, buttons
- `shadow-lg`: Elevation
- `shadow-xl`: Hero-level emphasis

### Component Patterns

**Buttons:** Use shadcn button primitives with token-based colors:
- `variant="default"` → Primary sage background
- `variant="secondary"` → Terracotta background
- `variant="outline"` → Border only
- `variant="ghost"` → Hover background only

### Interactive States

All interactive components must define:
- **Hover:** Subtle state change (color shift or slight lift)
- **Focus:** Visible ring via `--ring` (sage)
- **Active:** Pressed state
- **Disabled:** Reduced opacity
- **Loading:** Loading state where applicable

### Images During Build

Use styled geometric placeholders:
```tsx
<div className="bg-linear-to-br from-muted to-muted/80 aspect-video rounded-lg flex items-center justify-center text-muted-foreground">
  <span>[Image description]</span>
</div>
```
Real images sourced via Envato Elements at handoff.

### Accessibility

- All text/background combinations meet WCAG AA (4.5:1+)
- Focus states always visible via `--ring`
- Motion respects `prefers-reduced-motion`

---

## Deploy Info

> **Never store secret values here.** Only names, identifiers, scopes, and URLs.

- **Vercel project:** lakeshore-dental (proposed)
- **Domain (production):** TBD
- **Domain (preview):** auto-assigned vercel.app subdomain pattern
- **Dev port (Claude Code):** 3102
- **Dev port (Antigravity worktree):** 4102
- **Supabase project (dev):** lakeshore-dental-dev (proposed)
- **Supabase project (prod):** lakeshore-dental-prod (proposed)
- **GitHub repo:** TBD
- **Sentry project:** n/a
- **Analytics:** Vercel Analytics (default)

### Env var names (values live in Vercel + 1Password)

- `NEXT_PUBLIC_SUPABASE_URL` — Production, Preview, Development
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Production, Preview, Development
- `SUPABASE_SERVICE_ROLE_KEY` — Production, Preview (never client-side)

---

## Stakeholders

- **Primary contact:** TBD
- **Decision-maker:** TBD
- **Approvers by area:**
  - Design: TBD
  - Content: TBD
  - Technical: TBD
- **Notes:** TBD

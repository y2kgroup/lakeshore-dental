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
  - Primary: TBD — will decide with UI/UX Designer skill
  - Secondary: TBD
  - Accent: TBD
- **Brand fonts:**
  - Display: TBD
  - Body: TBD
- **Voice / tone:** TBD — to be gathered from client
- **No-go zones:** TBD
- **Deliverable format:** TBD
- **Dark mode in scope:** TBD

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

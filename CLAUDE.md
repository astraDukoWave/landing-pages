# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

This repo is meant to host multiple independent landing-page projects as sibling directories, each with its own `package.json`, `node_modules`, and toolchain. Currently there is one:

- `pacos-landing/` — the actual product: a Next.js 14 (App Router) site for "Paco's Wings & Beer," a bar/restaurant in Cholula, Puebla, Mexico. All user-facing content is in Spanish.
- Root (`src/`, `package.json`, `tsconfig.json`) — a bare, unrelated TypeScript scaffold (`main` → `dist/index.js`). See `AGENTS.md` for its conventions; don't confuse it with the landing page work.

Always `cd` into the relevant project directory before running commands — the root and `pacos-landing/` are separate npm projects, not a workspace.

## Commands

### `pacos-landing/` (the Next.js site)
```bash
cd pacos-landing
npm run dev      # start dev server
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint
```
No test script is defined.

### Root scaffold
```bash
npm run build    # tsc compile of src/index.ts -> dist/
```
No test or lint scripts are defined at the root; don't invent workflows that aren't present in `package.json`.

## Architecture (`pacos-landing`)

- App Router, single page (`app/page.tsx`) composed of section components rendered in a fixed order: `NavBar`, `Hero`, `EventCalendar`, `MenuHero`, `Footer` (all in `components/`).
- Content is hardcoded as typed data arrays inside the components themselves, not fetched from a CMS/API — e.g. `EventItem[]` in `EventCalendar.tsx`, `MenuItem[]` in `MenuHero.tsx`. Update these arrays directly to change events/menu content.
- Components using hooks or browser APIs (scroll listeners, `useState`) are marked `"use client"` (`NavBar`, `Hero`); everything else is a server component by default.
- Styling is Tailwind only. Brand colors live under the `pacos.*` namespace in `tailwind.config.ts` (`pacos-black`, `pacos-fire`, `pacos-fire-dark`, `pacos-amber`, `pacos-white`, `pacos-gray`) — use these tokens rather than raw hex values or default Tailwind grays.
- Two font families are loaded via `next/font/google` in `app/layout.tsx`: Bebas Neue as `font-display` (headings, all-caps treatment) and Inter as `font-body`. Both are exposed as CSS variables (`--font-bebas`, `--font-inter`) and wired into Tailwind's `fontFamily` in `tailwind.config.ts`.
- SEO metadata is defined in two places: a static `metadata` export in `app/layout.tsx` and a dynamic `generateMetadata` in `app/page.tsx` (the latter takes precedence for the home route). Keep both in sync when changing title/description/OG copy.
- `app/sitemap.ts` generates the sitemap; it currently lists only the homepage.
- `@/*` resolves to the `pacos-landing/` root (see `tsconfig.json`).
- WhatsApp CTA links (`NavBar`, `MenuHero`, `Footer`) all use a placeholder number (`52XXXXXXXXXX`) — update every occurrence together if given the real number.

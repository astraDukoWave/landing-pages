# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository shape

This repo hosts `pacos-landing/` — a Next.js 14 (App Router) site for "Paco's Wings & Beer," a bar/restaurant in Cholula, Puebla, Mexico. All user-facing content is in Spanish. It is meant to host multiple independent landing-page projects as sibling directories in the future, each with its own `package.json`, `node_modules`, and toolchain; currently there is only the one.

There used to be a second, unrelated bare TypeScript scaffold at the repo root (`src/`, `package.json`, `tsconfig.json`, `AGENTS.md`) with no relationship to `pacos-landing/` — leftover from the repo's initial setup, never touched again, no code anywhere referencing it. Its abandonment was verified (`docs/ROOT_SCAFFOLD_INVENTORY.md`), reviewed via `cto-review`, and signed off by Jonathan at CP-3. It was removed from `main` and preserved, unchanged, on the `archive/root-scaffold-pre-sprint1` branch — restore from there if it turns out to be needed.

Always `cd` into `pacos-landing/` before running commands.

## Commands

### `pacos-landing/` (the Next.js site)
```bash
cd pacos-landing
npm run dev      # start dev server
npm run build    # production build
npm run start    # serve production build
npm run lint     # next lint — ESLint configured via eslint-config-next (.eslintrc.json)
```
No test script is defined.

## Architecture (`pacos-landing`)

- App Router, single page (`app/page.tsx`) composed of section components rendered in a fixed order: `NavBar`, `Hero`, `EventCalendar`, `MenuHero`, `Footer` (all in `components/`). `EventCalendar` also conditionally renders `EmptyEventsState`; `WhatsAppCta` and `DemoNoticeToast` are shared components used across sections (see below).
- Components using hooks or browser APIs are marked `"use client"`: `NavBar`, `Hero` (scroll listeners, reveal animation), `WhatsAppCta` (click interception), `DemoNoticeToast` (event listener + timer). Everything else, including `EventCalendar`, `MenuHero`, `Footer`, and `EmptyEventsState`, is a server component by default.
- `@/*` resolves to the `pacos-landing/` root (see `tsconfig.json`).

### Business data model — single source of truth

**`config/business.ts`** is the *only* place business facts live: name/tagline, address, structured weekly hours (`hours.monday`, etc., each `{ open, close } | null`), the WhatsApp policy (`whatsapp.mode`, `whatsapp.activeNumber`, `whatsapp.messages`), Instagram handle, `baseUrl`, and SEO fields (title/description/keywords). It also exports derived helpers: `copyrightYear`, `formatWeeklyHoursSummary()`, and `buildWhatsAppHref()`. **Never hardcode any of these values in a component** — import from `@/config/business` instead. This is what makes duplication (two Instagram handles, two sets of hours, a hardcoded `© 2025`) structurally impossible.

To change the business's phone/hours/address/Instagram/SEO copy: edit `config/business.ts` only.

### Content data

- `data/events.ts` — `EventItem[]`, dates in ISO (`dateISO: 'YYYY-MM-DD'`), never a display string.
- `data/menu.ts` — `MenuItem[]`.
- `data/copy.ts` — editorial copy grouped by section (`heroCopy`, `navCopy`, `eventsCopy`, `menuCopy`, `footerCopy`): headlines, badge text, CTA labels.

No component contains a content array, a hardcoded date, or a hardcoded copy string — they all import from `data/`.

- `lib/dates.ts` — `formatEventWeekday`, `formatEventDayMonth` (both anchor to UTC explicitly so the weekday never shifts with the build machine's or viewer's timezone), and `isPastDate`.
- `lib/events.ts` — `getUpcomingEvents()` filters out events whose `dateISO` is before today; `EventCalendar` renders `EmptyEventsState` ("Síguenos en Instagram para la próxima cartelera") when the filtered list is empty. This is a normal, designed state — not a bug — whenever there's no upcoming event in `data/events.ts`.
- `lib/schema.ts` — builds the JSON-LD `BarOrPub` structured-data object from `config/business.ts` (address, `openingHoursSpecification` derived from `hours`, `sameAs`). `telephone` is included **only** when `whatsapp.mode === 'number'` — never a personal or fake number.

### Styling — two-layer Tailwind tokens

`tailwind.config.ts` has a base layer (`pacos.*` — the raw hex palette) and a semantic layer that is the only thing components are allowed to consume:

- `brand-primary`, `brand-primary-strong`, `brand-accent` — brand identity.
- `surface`, `surface-elevated` — backgrounds.
- `ink`, `ink-muted` — text.
- `state-live`, `state-confirmed`, `state-pending` — business status (the "EN VIVO" badge, event confirmation badges). Never use raw Tailwind grays like `red-600` or `emerald-500` for these.

Components must not contain brand hex/rgba literals, `pacos-*` classes, or copy/content. Pure structural neutrals (plain black/white overlays, not brand colors) are the one exception, per the design spec's bounded rule. Two font families load via `next/font/google` in `app/layout.tsx` (Bebas Neue as `font-display`, Inter as `font-body`) — still Google Fonts as of this writing; self-hosting them is a planned, non-blocking hardening item.

### WhatsApp CTAs and the demo-mode policy

Every WhatsApp CTA in the app renders through **`components/WhatsAppCta.tsx`** — there is no other place in the codebase that should build a `wa.me` link. It reads `config/business.ts`'s `whatsapp` block:

- **`mode: 'number'`** — the anchor's `href` is a real `https://wa.me/<activeNumber>?text=...` link with the per-context message (`whatsapp.messages.nav | menu | footer`, falling back to `whatsapp.messages.default`).
- **`mode: 'demo'`** (the default) — the CTA stays fully visible with its normal label, but clicking it calls `preventDefault()` and dispatches a `pacos:whatsapp-demo-notice` window event instead of opening WhatsApp. `components/DemoNoticeToast.tsx` (mounted once in `app/layout.tsx`, only when `mode === 'demo'`) listens for that event and shows the toast "Sitio de demostración — el chat se activa al lanzar con el negocio."

**The public repo must never contain a real phone number.** `whatsapp.activeNumber` stays `null` and `whatsapp.mode` stays `'demo'` in every commit.

#### Live-demo checklist (in-person sales demo, runtime only)

1. On your machine, **without committing**, edit `config/business.ts`: set `whatsapp.mode = 'number'` and `whatsapp.activeNumber` to the demonstration number.
2. Run `npm run dev` locally and open it on the device you'll demo from (same network, or a tunnel) — this is a local-only change; nothing is pushed, so the public Vercel URL keeps showing demo mode throughout.
3. Verify the CTA opens WhatsApp with the right number and message before the demo starts.
4. Immediately after the demo, revert the file: `git checkout -- pacos-landing/config/business.ts` (or manually reset `mode` to `'demo'` and `activeNumber` to `null`).
5. Confirm with `git status` / `git diff` that `config/business.ts` shows no pending changes before doing anything else. If the number was ever accidentally committed, it must be reverted and the branch/history cleaned before any push.

### SEO

- `app/layout.tsx` is the **single** source of metadata (title, description, keywords, OpenGraph, Twitter card, `metadataBase`, canonical) — all derived from `business.seo` / `business.baseUrl`. `app/page.tsx` does not export its own metadata.
- `app/sitemap.ts` and `app/robots.ts` both derive their URLs from `business.baseUrl` — changing that one config field propagates everywhere.
- The JSON-LD script (`lib/schema.ts`) is injected once in `app/layout.tsx`.
- `business.baseUrl` currently points at the temporary Vercel demo URL. It will move to the real domain (`pacoswingsandbeer.com`, still unconfirmed) as part of the post-sale Gate Producción — a one-field change.

## Managed content-update flow (no CMS, no client self-service)

There is intentionally no CMS or admin panel in v1. The flow is:

1. The client sends new data (events, hours, menu changes) to Jonathan over WhatsApp.
2. Jonathan edits the relevant file directly — `data/events.ts` for events/menu, `config/business.ts` for hours/address/Instagram/etc.
3. Commit and `git push origin main`.
4. Vercel auto-deploys from `main`; the change is live in ≤10 minutes end to end.

An event with a past `dateISO` never needs manual removal — it's filtered automatically by `lib/events.ts` at render time.

## Gate Producción (post-sale, not part of this sprint)

Before switching from demo to the client's real production site: swap `whatsapp.mode` to `'number'` with the real business number, confirm the Instagram handle with the client, load the current week's real events, swap in approved photos/brand assets, add the real phone to the JSON-LD schema, and update `baseUrl` to the final domain once confirmed.

# Repository guide

## Current scope
`pacos-landing/` is the Next.js 14 App Router restaurant demo, in Spanish. Paco’s
is the first example of a reusable base; contracted clients get independent projects.
This is not a multi-tenant platform. Valhalla is a separate repository.
The obsolete root scaffold remains on `archive/root-scaffold-pre-sprint1`.

## SDD
Frozen historical files under `docs/specs/` and `docs/plans/` ending APPROVED must
not be rewritten. Current iteration:
- `docs/specs/RESTAURANT_DEMO_COMMERCIAL_SPEC_v1.0.md`
- `docs/plans/RESTAURANT_DEMO_COMMERCIAL_PLAN_v1.0.md`
The user authorized implementation in the conversation. Work on a feature branch,
open a PR and review preview before merge. Human approval is required for merge and
publication (CP-2). Do not reopen resolved scaffold checkpoints.
No service prices, margins, commercial strategy or personal contact data in this public repo.

## Commands
Run inside `pacos-landing/`: `npm ci`, `npm run build`, `npm run lint`,
`npm run dev`, or `npm run start` after a build. No test script is installed.

## Sources of truth
- `config/business.ts`: identity, subtitle, demo flag, optional events flag,
  address, structured weekly hours, time zone, WhatsApp policy/messages, social
  confirmation, domain and metadata. Never hardcode business facts in components.
- `config/theme.ts`: brand palette used by Tailwind, icons and OpenGraph.
- `data/copy.ts`: all editorial copy. Adapt the hero lines and section text here.
- `data/menu.ts`: categories and menu entries. Demo descriptions are illustrative;
  no invented prices, popularity badges or offers. `price` is optional and in MXN.
- `data/events.ts`: validated ISO dates. `lib/dates.ts` filters using the configured
  local time zone. Home is force-dynamic so dates do not freeze at build time.
- Fonts are local WOFF2 files in `public/fonts`, loaded via `next/font/local`.
Components use semantic Tailwind tokens. Structural neutrals are allowed; brand
hex values, business data and editorial text do not belong in components.

## Experience
Page order: demo notice, NavBar, Hero, MenuHero, optional EventCalendar, Visit, Footer.
MenuHero filters categories with pressed-state buttons and an announced result count.
Missing photos use an intentional typography layout, never empty image placeholders.
WhatsAppCta is the only contact-link builder. Demo uses a native modal dialog with
contextual message preview, Escape/close, focus return and no external send.
No toast or global event bus. No CMS, collection of customer data or active analytics.
Menu opens inline with anchors; it does not masquerade as a WhatsApp action.
Instagram links render only if confirmed. Location is an external map search derived
from config; the demo labels address/hours provisional.

## Demo and SEO
Keep `business.demo: true`, `whatsapp.mode: 'demo'`, `activeNumber: null` in this
public example. Never commit personal numbers. Mode alone cannot activate contact
while demo is true. Layout sets noindex/nofollow, omits business JSON-LD, and includes
a skip link. Sitemap is empty for demo. Robots allows crawling so crawlers can see
noindex; do not disallow `/` and accidentally hide that signal. OG labels the proposal.
Noindex is not access control or a guarantee of immediate removal from search.

## Reuse / onboarding
1. Create an independent client project from this base; preserve SDD history.
2. Confirm business config, menu, copy, locale/time zone, theme and authorized assets.
3. Remove or enable optional events based on actual needs; do not invent a schedule.
4. Confirm legal owner of domain and hosting suitable for commercial use. Contracts,
   renewals, maintenance scope and cancellation/transfer conditions stay outside repo.
5. Configure real business contact only in the client project, then set demo false
   and mode number. Review production copy, metadata, social accounts and schema.
6. Confirm prices, directions, current hours and end-to-end contact on mobile.
7. Enable indexation only after domain/content approval. Configure any analytics and
   privacy requirements separately; clicks are not confirmed orders or reservations.

## Managed updates
Client supplies approved content; operator edits the relevant data/config file,
verifies, opens a PR and previews it; approved merge triggers the existing Vercel
pipeline. No guaranteed turnaround is inferred from deployment speed. Past events
are filtered per request. Pricing or menu edits happen in `data/menu.ts`.

## QA
Build and lint. Check widths 360, 768, 1280, keyboard/focus, category reset, all
contact contexts, Escape, map destination, unconfirmed Instagram, noindex, sitemap,
OG and event expiry. Do not send messages, create orders or claim business results.

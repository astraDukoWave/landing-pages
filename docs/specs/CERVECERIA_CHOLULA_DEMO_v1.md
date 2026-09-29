# Cervecería Cholula demo — scope and verification

Implementation authorized in conversation on 2026-09-28. Branch:
`feature/cerveceria-cholula-demo`. Review preview before publication/merge.

## Goal
Independent, non-official visual proposal at `/cerveceria-cholula`, with its own
editorial identity and metadata. Keep Paco's root route unchanged.

## Scope
- Mint/cream/red/coffee direction based on the business's public Linktree theme.
- Public logo from Linktree; illustrative stock photo explicitly labeled.
- Brewery/restaurant/garden introduction, educational beer-style selector,
  clearly labeled sample menu filters, location and official social links.
- Visit/group enquiry preview rendered locally. No messages, reservations,
  orders, payments, personal data collection, analytics or backend.
- Noindex/nofollow and no sitemap inclusion. No business structured data.
- Do not claim real beer labels, menu items/prices, opening hours, capacity,
  events or tours are confirmed. No invented ratings, testimonials or metrics.

## Sources (consulted 2026-09-28)
- https://linktr.ee/cerveceriacholula — public logo and colors; links to
  https://www.instagram.com/cerveceria.cholula and WhatsApp. Instagram handle
  also supplied by user. Instagram feed unavailable through public retrieval.
- https://www.cholula.gob.mx/turismo/donde-comer/item/2639-cerveceria-cholula
  — factory, restaurant, garden, address and coordinates. Services/current
  address still require business confirmation. No directory telephone imported.
- https://cerveceriacholula.com/ — direct retrieval returned 406; this is not
  evidence that the site is down for customers.
- Logo source: https://ugc.production.linktr.ee/1790026a-b908-41ee-836d-d7f2f0dd4e68_Sin-t-tulo-42--7-.png
- Illustrative photo: https://images.unsplash.com/photo-1535958636474-b021ee887b13
  Not a photograph of the venue or a verified product. Replace with authorized
  business photos before an official launch. Logo remains third-party property.
- Design reference: astraDukoWave/claude-webkit frontend-design/SKILL.md.

## Acceptance
Build/lint; desktop/mobile no horizontal overflow; keyboard focus visible;
beer profiles and menu filters update correctly; enquiry changes invalidate
previous preview; preview performs no network send; external links match sources;
route metadata and icons do not identify Paco's; root route is preserved.

## Plan
1. Add isolated content, route, scoped styles and assets.
2. Verify build, interactions and responsive rendering.
3. Push branch/open PR, inspect Vercel preview, report limits for review.
Rollback: close unmerged PR; if later published, revert its merge.

## Verification record — 2026-09-28
- Local production build, TypeScript and lint passed. Separate lint: no warnings.
- Local HTTP: both routes 200, new route noindex and no Paco brand in HTML.
- Vercel preview: desktop visual review and CSS iframe widths 360, 768, 1280.
  Content widths equal client widths (345/753/1265 with scrollbar), no horizontal overflow.
- Beer profiles, sample-menu filtering, enquiry with event/group and reset on
  field changes verified in browser. No real message submitted.
- Browser log errors observed belonged to its extension, not the app.
- Temporary responsive harness removed after QA; not part of delivered feature.
- No physical-device test or complete accessibility audit claimed.
- Official menu and venue photos remain pending; independent proposal only.

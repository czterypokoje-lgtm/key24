# Functional acceptance matrix

| Area | Required acceptance | Proof |
|---|---|---|
| Navbar | Every desktop nav item routes; dropdown keyboard/ESC/outside click | Playwright + screen recording |
| Mobile | 320px/390px hamburger, focus restore, no overlay collision | Playwright screenshots |
| Home | Hero, media, call journey, CRM, proof, pricing preview, final CTA | 1440/390 screenshots |
| Agent | Supported capability details and working sample call only if media provided | Route & media test |
| CRM | Truthful workflow; sanitized screenshots; no secret exposure | Manual screenshot audit |
| WhatsApp | Only confirmed integration, compliant messaging claims | Feature verification |
| Customers | Only permissioned quotes; missing proof handled without dummy data | Filter tests |
| Case study | Only real approved slugs generated; unknown slug 404 | Route tests |
| Pricing | Three prices; tax note; no unapproved allowances | Snapshot & owner sign-off |
| Demo | Form validates, booking works or lead-only confirmation; video plays if present | E2E API mocks + staging |
| Contact | Server-validated working route; error and success states | E2E |
| Locales | en-GB/de-DE translations, alternate links, no key fallback visible | Screenshots + metadata |
| Legal | Approved legal texts available; links work | Link crawl |
| SEO | index/canonical/hreflang/OG/sitemap/robots consistent | Build inspection |
| A11y | keyboard, focus, reduced-motion, labels; WCAG oriented | axe + manual |
| Performance | No heavy unrelated JS, stable media dimensions, compressed assets | Lighthouse report |
| Release | typecheck/lint/build/e2e pass, 0 known P0/P1 | CI logs |

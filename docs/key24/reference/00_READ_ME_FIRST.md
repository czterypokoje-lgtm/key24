# KEY24 V2 — upgrade the EXISTING GitHub website, do not rebuild from scratch

## Mission
The repository already contains a strong IBM/AXIOM-inspired enterprise site. **Preserve its established information architecture, visual grammar, spacing, header, grid, card styling, typography, transitions, and usable components**. Turn it into a coherent KEY24 site with real pages, video, real customer evidence, pricing, and functioning lead capture. Work in the existing repository only. The existing screenshot supplied by the owner is the visual baseline; another screenshot is a reference for a mixed-size testimonial masonry layout. Both are inspirations, not assets to republish.

## Fast-start instructions
1. Open the **existing** GitHub repository in Antigravity or Codex. Do not create another Next.js starter.
2. Copy `01_MASTER_ANTIGRAVITY_PROMPT.md` into the agent chat. Place `project-spec.json`, `design-guardrails.json`, `page-manifest.json` and `acceptance-tests.md` in `/docs/key24/` or repository root.
3. Agent first inventories routes/components/dependencies, starts current site, captures desktop and mobile screenshots, writes diff-first plan, and creates a git checkpoint.
4. Agent builds all required pages by **reusing existing UI**, wires navigation and conversion paths, implements proof and video content with real data only, and runs Playwright tests.
5. Supply missing data through `client-proof-template.json` and a secure CRM integration spec (never secrets). Unapproved case studies/pricing entitlements are not asserted publicly.
6. Publish only after the go/no-go checklist is green.

## Existing screenshots (outside this zip)
- Wide, white enterprise homepage called AXIOM, small dense top navigation, left editorial headline in blue, central block illustration, right compact news/info panel, squared CTAs and large whitespace below.
- Applio testimonial reference, three-column mixed-height light/dark editorial cards, one featured metric card, individual portraits and quotes, badges.

## What changes / what does not
- **DO:** KEY24 copy, relevant icons/illustrations, working product pages, approved proof, demo video, clear conversion funnel, site-wide consistency, subtle motion.
- **DO NOT:** reset CSS, replace all components, convert the look to round-corner generic SaaS, force gradients/glassmorphism, use fake testimonials or numeric claims, or replicate IBM copyrighted content/trademarks.

## Recommended handoff order
Antigravity: audit and preserve visual baseline → implement routes/content/UI → browser verification.
Codex: engineering hardening, tests, CRM security, responsive defects.
Claude: human copy/localization and factual claim validation.
Designer: polish ONLY after visual baselines and component inventory.

## Missing real inputs
- Existing GitHub URL or repository ZIP (not in this kit)
- Book-a-demo scheduling URL; customer-facing contact email; approved brand logo
- Video URL/file, subtitles/transcript, permitted screenshots
- CRM API and lead schema, tested in staging; no production credentials in chat
- Written consents for customer names, portraits, testimonials and performance figures
- Final subscription allowances, cancellation policy, invoices and country-specific tax/currency rules
- Approved privacy, cookie and terms pages plus outreach review

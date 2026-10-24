# KEY24 V2 implementation and release report

Status: implementation available for review; **not ready for public launch**. This report records validation in `/workspace/key24` before GitHub handoff. The owner subsequently requested publishing the source to GitHub; deployment and environment publication remain separate, unverified steps.

## Source and design boundary

The initial checkout was README-only. The owner then supplied the Carbon repository and explicitly answered “Use this Carbon template as the source.” The implementation adapts that source in the existing KEY24 repository. The baseline branch `key24-v2-baseline` preserves original commit `3be71e7fe273a1d73c70044c5c9fa4efafb420a1`. Upstream source is `34c221287a8d86c8d031eb2f594384fe9fb2b06b`.

Upstream desktop/tablet/mobile baseline screenshots exist. No customized AXIOM source or either described owner screenshot was supplied, so exact before/after fidelity to that prior website is unverified. See [audit](UPGRADE_AUDIT.md), [source decision and plan](UPSTREAM.md), and [design annotations](DESIGN_NOTES.md).

## Implemented

- 28 generated EN/DE routes: home; AI Call Agent; CRM; WhatsApp; customers; proposed pricing; demo; contact; resources; two original practical guides; privacy, terms and cookies availability pages.
- Conditional customer detail routes generated only from valid proof with separately approved story content. None currently qualify. Unknown article, customer and locale paths return 404.
- Shared header, native disclosure dropdowns, mobile menu, Escape/outside-click handling, focus return, active links, footer, locale switching preserving page/plan, and all navigation/CTA targets.
- Three-part editorial hero, technical call diagram, workflow walkthrough, illustrative CRM panel, product sections, mixed-height editorial proof/scenario cards, pricing comparison and FAQs. Square controls, Carbon colors, Plex type and blue/white/neutral design.
- Typed content, localized metadata and document language, canonical/hreflang/sitemap support gated by the real domain and public indexing setting, privacy-safe defaults and no third-party tracking or embeds.
- Lead adapter and server route: validation, same-origin check, honeypot, process-local throttling, bounded deduplication, upstream idempotency key, timeouts, redirect rejection and explicit acknowledgement. Accessible form validation, failure/retry and accurate delivery confirmation states. Forms remain unavailable with missing configuration/privacy approval.
- Runtime updated from Next 12/React 17 to Next 15.5.28/React 18.3.1. Removed unused legacy IBM shell/tooling and metadata. Kept Carbon palette via current color tokens and local fonts. Refreshed compatible dependency ranges and patched PostCSS resolution; checksums/TLS verification retained. CI workflow added, but has not run on GitHub.

## Verified in this cloud machine

| Check | Final result |
| --- | --- |
| Frozen Yarn install | Passed (`install --immutable`), nonfatal dependency peer warnings |
| Typecheck | Passed |
| ESLint | Passed, no lint warnings |
| Formatting | Passed |
| Production build | Passed; 28 localized page routes generated |
| Unit/adapter/handler tests | 9 passed, 0 failed, 0 skipped |
| Chromium/Playwright | 12 passed, 0 failed, 0 skipped |
| Routes and links | All generated routes and discovered internal links return 200; unknown paths return 404 |
| Responsive | Home at 320/390/768/1024/1280/1440; all other routes at 320/1440; no horizontal overflow |
| Axe accessibility | Zero detected violations across tested pages at desktop and home at mobile, WCAG A/AA tags |
| Interaction | Dropdown keyboard/Escape/outside click, mobile focus/navigation, locale + plan preservation, walkthrough keys, FAQs and reduced motion passed |
| Forms | Browser success/failure fixtures, actual unconfigured API rejection, handler idempotency/rate-limit tests and real local HTTP adapter fixture passed; **real CRM staging not tested** |
| Customer proof | Permission/evidence/photo/story gates tested; no dummy customer data published |
| Client privacy | Token binding name and internal release/consent fields absent from static JS; no third-party page requests observed in the customer-page test |
| Dependency audit | Zero known advisories in final recursive audit |
| Browser screenshots | 69 PNGs: 3 upstream baseline, 64 responsive route captures, 2 hero captures |

The first browser run caught small-text contrast defects, corrected with darker Carbon blue on pale surfaces. A mobile test locator was corrected to follow the menu button's accessible-name change. Final passing reports supersede earlier failed-run output.

## Lighthouse (one local production-build run per device profile)

| Profile | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 98 | 100 | 100 | 63 |
| Desktop | 100 | 100 | 100 | 63 |

The SEO score reflects intentional `noindex`/robots blocking before launch, not a passing public SEO release. Mobile LCP 2.3s, TBT 60ms and CLS 0.001 in this run. Local Lighthouse/axe results are lab evidence, not field-performance guarantees or a complete manual accessibility certification. See the HTML/JSON reports in `evidence/`.

## Outstanding launch blockers

1. **Real CRM integration:** supply the staging HTTPS endpoint, schema, authentication and idempotency contract. Enter credentials securely, then verify an actual record in staging. The current contract is explicitly proposed; see [CRM_INTEGRATION.md](CRM_INTEGRATION.md). Process-local throttling requires a trusted edge/durable deployment strategy for multi-instance production.
2. **Legal and contact identity:** supply reviewed EN/DE privacy, terms and cookie text, company identity and a public business contact. Legal routes currently explain the missing publication; they are not completed legal policies. Privacy approval must include actual text before a locale's form enables.
3. **Customer evidence:** approved exact quotes, identity/photo/logo permissions, case-story approval and measured result evidence. There are currently no live testimonials or real case-study pages. Editorial workflow scenarios are clearly labelled.
4. **Media and CRM screenshots:** approved recording, captions/transcript and sanitized real product captures. The interactive demo and CRM view are illustrative; no playable video or real product screenshot is claimed.
5. **Commercial/product approval:** confirm proposed prices, tier entitlements, usage/overage/setup fees, cancellation/support/tax details and actual supported integration capabilities. No checkout, invented allowances or performance promises are published.
6. **Launch configuration:** actual public HTTPS origin, verified deployment/rollback and public indexing approval. Rebuild with `KEY24_SITE_URL` and `KEY24_PUBLIC_INDEXING=1` only after release gates pass. Real booking needs an approved scheduler integration if appointment confirmation is required.
7. **Final owner review:** compare against the actual intended design references and review English/German product copy with the real operational team. The missing original screenshots prevent exact fidelity validation.

## Reproduce and rollback

Use the commands in [README](../../README.md). Tests start a production server after build; avoid simultaneous dev/build writes to `.next`. Lighthouse reports were produced against a production server on internal port 3002 with Chromium, standard mobile/desktop profiles and categories performance/accessibility/best-practices/SEO.

No DB migrations or external records were created. To roll back, first preserve this reviewable working tree and any user changes, then use the baseline branch in a separate intentional Git operation. Do not blindly reset/delete untracked files. No deployment was performed, so production rollback has not been tested.

Exact modified/added repository paths are listed in [CHANGED_FILES.txt](CHANGED_FILES.txt). Source/reference files and evidence are intentionally distinct. No environment configuration draft was changed for this coding task.

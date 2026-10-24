# KEY24 V2: audit and staged upgrade plan

Historical audit before the owner supplied the Carbon source link. The owner subsequently confirmed using that template as source; see [UPSTREAM.md](UPSTREAM.md) and [RELEASE_REPORT.md](RELEASE_REPORT.md) for the implementation and current status.

## Scope and instruction precedence

The owner's request is an in-place upgrade of an existing website. No new website or starter is authorized. Supplied prompt documents are reference material, not evidence that their assumed code, screenshots, integrations, permissions, or approvals exist. The older IBM-inspired kit's starter-cloning suggestion conflicts with the owner's explicit request and will not be followed.

The V2 kit is preserved unchanged in `reference/`. It is a specification, not runnable application source. Proposed prices and sample proof language are not approved public claims.

## Observed baseline

- Checkout: `/workspace/key24`; branch at inspection: `work`.
- Baseline commit: `3be71e7fe273a1d73c70044c5c9fa4efafb420a1`; local checkpoint branch: `key24-v2-baseline`.
- Tracked files at baseline: `README.md` only, containing `# key24`.
- Initial working tree: clean.
- Local branches/remote-tracking refs inspected. Remote head listing contains only `main`, at the baseline commit above. Read-only `git ls-remote origin HEAD` succeeds.
- No package manifest, lockfile, source, styles, components, routes, assets, CI, environment example, or startup command exists.
- Both uploaded ZIPs inspected in full. V2: 17 specification/reference files. IBM-inspired kit: 3 brief files. Neither contains an app, reference screenshots, media, approved customer records, CRM API contract, or approved legal text.
- Observed design tokens: none. Blue/white palette, editorial grid, and square controls are requested guardrails, not measurements of an existing implementation.
- Reusable components and working animations: cannot be inventoried without source.
- Baseline screenshots at 1440/1024/390: BLOCKED; there is no runnable website or supplied live site URL. No substitute or simulated baseline created.

## KEEP / EXTEND / CHANGE

| Decision | Scope | Evidence needed before edits |
| --- | --- | --- |
| KEEP | Header proportions, hero composition, type hierarchy, blue/white palette, spacing, grid, component styling, working animations | Existing source and screenshots from the running website |
| EXTEND | Existing shell/components into localized product, customers, pricing, demo, contact, resources and legal routes | Router, shared component and locale inventory |
| EXTEND | Editorial mixed-height customer proof layout | Approved quotes, identity/photo permissions and evidence for each published metric; otherwise clearly labelled workflow examples |
| EXTEND | Server-side CRM adapter and forms | Existing server architecture, staging API contract and secure authentication binding |
| CHANGE | Broken links, missing content, nonfunctional controls and proven accessibility defects | Reproducible failures and before/after screenshots |
| CHANGE | No global reset, replacement starter, invented claims or unrelated dependency upgrade | Explicit scope guardrail |

## Page gaps

No application routes exist in this checkout. All routes in `reference/page-manifest.json` are unimplemented here; this does not establish that they are absent from the actual existing website.

Required locale roots: `/en-GB`, `/de-DE`.

- Home
- `/solutions/ai-call-agent`
- `/platform/crm`
- `/solutions/whatsapp`
- `/customers`
- `/customers/[slug]`: only approved, validated records; unknown slugs must return 404
- `/pricing`
- `/demo`
- `/contact`
- `/resources` and actual supplied/authored article detail routes
- `/legal/privacy`, `/legal/terms`, `/legal/cookies`

## Staged implementation and file-level plan

Actual app filenames depend on the missing framework and source. Inventing `app/` or a package manifest now would violate the in-place requirement.

1. **Baseline:** obtain existing source and identify actual router, manifest, lockfile, CSS tokens, shared header/footer, motion, localization, server/API and CI files. Use the existing checkout; preserve user changes. Install with its pinned package manager and frozen lockfile. Start it and capture 1440/1024/390 screenshots. Annotate observed tokens and map concrete filenames to each subsequent stage.
2. **Shell:** edit existing header/footer/navigation and locale dictionaries. Add missing route modules using current layout primitives. Verify keyboard menus, Escape/outside click, focus restoration, mobile menu and locale route/query preservation.
3. **Pages:** extend existing home sections and implement product, CRM, WhatsApp, pricing, demo, contact and resources pages in stages. Use substantive EN/DE content. Treat CRM diagrams as illustrative until actual sanitized screenshots are provided. Publish supported product capabilities only. Do not publish proposed pricing entitlements as approved.
4. **Proof/media:** add a typed proof registry and publication validation using the supplied template, adapted to the existing stack. Render approved records only, gate optional photos/logos and verify metrics individually. Add case-study routes only for validated stories. Add real media with controls and captions/transcript; suppress unavailable media CTAs.
5. **Leads:** implement a server-side adapter against the confirmed CRM contract; validate inputs, enforce consent requirements, rate limits and bot controls, add timeouts, deliberate retry/idempotency handling and duplicate-submit prevention. Never expose tokens or report successful delivery/booking without upstream confirmation. Exercise staging, including failure cases.
6. **Polish/SEO/legal:** preserve measured design tokens; refine responsive composition and reduced-motion behavior. Localized metadata, canonical/hreflang, sitemap and robots. Integrate owner-approved legal text and actual business/contact details. Gate nonessential tracking/embeds where applicable.
7. **Release evidence:** run the repository's real lint, typecheck and production build; browser tests at 320/390/768/1024/1280/1440; route/link crawl; keyboard/reduced-motion and axe checks; staging CRM success/failure tests; actual media playback; proof publication negative tests; screenshots before/after and performance report. Record actual results and remaining blockers.

## Inputs needed

### Immediate blocker

Provide the existing website's source ZIP or its actual GitHub repository and branch. This repository's `main` contains no application. Also provide the current live URL and the two referenced screenshots, if available, for faithful visual comparison. A live URL helps visual auditing but does not replace the editable source.

### Later integration and release prerequisites

- CRM staging endpoint, request/response schema, auth method, required fields, consent semantics, idempotency and error behavior; credentials through secure environment settings, never chat. Check existing bindings before requesting any new secret. The kit's `KEY24_CRM_API_BASE` and `KEY24_CRM_API_TOKEN` are proposed names, not evidence of a functioning API contract.
- Booking URL if using a scheduler; customer-facing contact and legal business identity.
- Approved customer records, exact quotes, name/logo/photo releases, metric evidence and sanitized product screenshots. Unverified reported customer counts are not publishable proof.
- Demo video/audio, usage permission, poster and captions/transcript.
- Approved per-plan prices, allowances, fees, tax handling and cancellation/support terms. The kit marks €399/€699/€1,249 monthly as proposed, not approved.
- Reviewed EN/DE privacy, terms and cookies text; native-language content review and confirmed feature capabilities.

## Verification outcomes

| Check | Outcome |
| --- | --- |
| Entire available repository/history inventory | Complete; README-only initial commit |
| Remote branch discovery / Git read | Passed; only main, same initial commit |
| Required seven V2 files and remaining attachment contents | Read |
| Source/asset availability | Blocked; not supplied |
| Baseline/final browser screenshots | Not run; no app |
| Dependency installation, lint, typecheck, production build | Not run; no manifests or commands |
| Responsive, keyboard, accessibility, link and locale tests | Not run; no app |
| CRM staging integration and media playback | Not run; no source, API contract or media |
| Production readiness | Not established |

Only planning/reference documentation was added. No application, template, customer proof, legal text or screenshots were fabricated. No environment configuration, deployment or publication was performed.

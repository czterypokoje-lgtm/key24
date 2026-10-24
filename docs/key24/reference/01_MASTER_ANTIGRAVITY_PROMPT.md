# ANTIGRAVITY — MASTER IN-PLACE UPGRADE PROMPT

Act as principal frontend engineer, design-system guardian, product designer, accessibility specialist and conversion UX lead. You are editing the **existing** KEY24 GitHub website. The site already has a polished AXIOM/IBM-inspired visual baseline: do NOT replace it with a generic SaaS template.

## NON-NEGOTIABLE VISUAL LOCK
- Before any changes: inspect repository tree, inspect running site, use screenshots at 1440px/1024px/390px, check git status, create a checkpoint branch, inventory existing routes and reusable components. Do not delete or rewrite unrelated code.
- The owner's first screenshot is the anchor for layout: compact enterprise navigation; editorial typography; black/grey/IBM-blue palette; sharp or near-sharp corners; restrained borders; generous whitespace; calm motion; precise horizontal grid; hero content split into multiple columns. Retain that structural signature.
- The owner's second screenshot is the proof-section inspiration: asymmetric editorial card masonry, varying heights, black contrast card, 1 strong featured story, authentic portraits, sparse badges. No fake verified badges, people, quotes or numbers.
- Treat any existing proprietary IBM-like content/assets with care: do not copy IBM logo/wordmark, images, protected marketing copy or pretend KEY24 is IBM. Keep only general grid/design-system principles and compatible open-source components.
- Preserve dependency versions unless incompatibility is proven. Prefer CSS/design tokens already defined in this repo.
- No broad component rewrite, no unrelated packages, no global typography/reset change unless approved after comparative screenshots.

## PRODUCT AND AUDIENCE
Brand KEY24. Audience: auto locksmiths (solo owner-operators and small teams), especially UK, Germany, Belgium, Netherlands, Nordics, eventually UAE. Offer: AI phone agent + proprietary KEY24 CRM + conditional WhatsApp follow-up; optional consulting and eligible ad campaign management. Core hook: "You're on the job. Your next customer is calling." Visitors arrive from high-intent/referral or legally permitted localized outreach. Optimize for qualified demos, not empty vanity clicks.

## DELIVERABLES: MULTI-PAGE SITE
Build/verify routes as specified in `page-manifest.json` and `project-spec.json`:
- `/{locale}` Home: hero, value proposition, short video, 3-step call journey, own-CRM product visual, selective proof, comparison to unmanaged calls, FAQ preview, pricing preview, prominent CTAs.
- `/{locale}/solutions/ai-call-agent` agent capability and sample call; real claims only.
- `/{locale}/platform/crm` detailed CRM workflows, stages and screenshots, real integrations only.
- `/{locale}/solutions/whatsapp` approved WhatsApp workflows and compliance caveats.
- `/{locale}/customers` masonry reviews and client proof, with consented data only.
- `/{locale}/customers/[slug]` real client case study, conditionally generated only from validated records.
- `/{locale}/pricing` three proposed plans and comparison matrix, clear tax/usage caveats.
- `/{locale}/demo` playable video or authentic sample audio, working form/booking, privacy text.
- `/{locale}/contact` contact info and working contact form.
- `/{locale}/resources` useful guides/FAQs and actual working article routes where supplied.
- localized legal pages for privacy/terms/cookies with approved text, no fabricated legal clauses.

## NAVIGATION & CONVERSION
Header: KEY24 brand; Solutions dropdown (AI Call Agent, WhatsApp); Platform dropdown (CRM); Customers; Pricing; Resources; language selector; primary CTA "Book demo". Desktop keyboard navigation, mobile accessible menu, active/hover/focus states, Escape/outside click, route transitions. Every menu target must load. Footer mirrors navigation and legal links.
Primary CTA throughout: `Book a 15-minute demo` to functional booking/lead workflow. Secondary: `Watch the demo` scrolls/links to a real media asset. If booking/video is not configured, DO NOT ship fake success or a dead button: suppress inactive controls on production and report blocker; lead capture may be offered only when actually working.

## REAL PROOF POLICY
There are 3-4 existing customers reported, but no names or verifiable metrics supplied. Implement evidence-driven testimonials schema; render only customer-approved quotes/names/portraits and verified metric cards. When none approved, show truthful product workflow demonstration/call transcript clearly labeled sample, not fake customer stories. Do not fabricate aggregate stats, currency outcomes, time saved, ratings, review counts, or "Verified" labels.

## TECH & CONTENT
Use current repo framework/patterns, likely Next.js + TS + Carbon/Tailwind. Strict typed route/content configs. Server-side integration adapter for CRM, rate-limited validated forms, bot protection, no frontend secrets, double submission protection, consent and policy links. Preserve localization architecture; priority en-GB and de-DE. Don't translate product names. Add fr-BE, nl-BE/nl-NL, nb-NO, fi-FI, sv-SE, da-DK, en-AE/ar-AE only when translated content and QA exist.
Pricing proposal: Essential €399, Growth €699, Scale €1,249 per month + applicable tax; FEATURES / usage limits / WhatsApp fees / setup fees / termination require approval. Do not assert "unlimited". Optional ChatGPT advertising must not imply influence over ChatGPT answers or placements without campaign eligibility.

## MOTION & A11Y
Elegant 160-260ms hover/microinteraction, ~350-650ms section entrance only when useful, stagger 40-75ms, reduced-motion fallback, animated hero diagram/call flow if appropriate, animated dropdown/accordion/pricing tabs, no heavy scroll jacking, always keyboard operable, WCAG 2.2 AA-oriented.

## PERFORMANCE / SEARCH / PRIVACY
Semantic landmarks; i18n alternate tags and canonical; metadata; sitemap/robots; OG; compressed media; image alt; no CLS from video. Consent-safe analytics and video embeds where needed; privacy contact and terms. No cross-border outreach automation included in website launch.

## QA GATES
- Audit all routes and links (automated); deep link refresh succeeds.
- Desktop 1440/1280/1024 and mobile 768/390/320 screenshots. Compare header/hero/components to baseline, not just external IBM.
- Keyboard operation, reduced-motion, no horizontal overflow, responsive readable headings.
- CRM lead form tested with sandbox credentials and explicit success/failure handling.
- Video actually plays with controls and captions/transcript if available.
- Lint/typecheck/build/Playwright green; no console errors, severe accessibility failures or fake data.
- Final change log includes implemented routes, browser screenshots, tests actually run, remaining blockers and exact changed file list.

## PROCESS — DO THIS IN ORDER
A. AUDIT: read existing code and docs; start app, create baseline screenshots, preserve design tokens and a checkpoint. Return "KEEP / EXTEND / CHANGE" table.
B. PLAN: list file-level diffs and reuse candidates. Avoid new framework setup.
C. SHELL: complete nav, dropdowns, mobile menu, footer, locales, route skeletons.
D. PAGES: build one route at a time, using shared components and actual content.
E. PROOF & MEDIA: customer proof model and consent gate; video/demo integration.
F. LEADS: wire real CRM endpoint or honest unavailable fallback, server-side security.
G. POLISH: subtle animations, screenshot visual diff, mobile, SEO/a11y.
H. VERIFY: tests and final artifact report.

**FIRST RESPONSE:** Show existing repo inventory, 2-3 observed design tokens, exact page gaps, file-level plan, and the branch/checkpoint; do not write a new home page before assessing the one already in the repository. Continue implementing once the baseline is secured. Ask only for missing secrets/artifacts which cannot be reasonably defaulted, not preferences already specified here.

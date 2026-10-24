# CODEX — ENGINEERING PASS ON THE SAME REPOSITORY

You are the staff engineer responsible for a hardening PR in the current KEY24 repository. DO NOT scaffold a new app. Inherit the design lock in `01_MASTER_ANTIGRAVITY_PROMPT.md` and routes in `page-manifest.json`.

1. Inspect git status and package manager, current components, route tree, data fetching, environment handling and CI.
2. Create safe typed data structures for package plans, client references, feature definitions, translations, page blocks, FAQ, legal links; validate at build time where possible.
3. Ensure ALL navbar/footer/CTA links resolve. Implement keyboard-accessible desktop dropdown and mobile menu; route-aware labels; focus restore and Escape support.
4. Use adapter pattern for CRM POST rather than tightly coupling UI: validate input server-side; rate limit, honeypot/bot mitigation, log correlation ID without PII, protect secret tokens in env only, implement timeout/retry semantics cautiously, no duplicate lead creation, meaningful error state, never falsely show "demo booked" if merely submitted.
5. Form events: `demo_form_started`, `demo_form_submitted`, `demo_form_succeeded`, `demo_booking_confirmed` (only verified), `video_started`, `video_50_percent`, `pricing_plan_selected`. Strip PII, respect consent and local rules.
6. i18n: en-GB/de-DE mandatory; localized URL, lang attr, currency locale formatting (no fake FX), alternates, canonical/hreflang, translated metadata and validation errors. Language selector preserves matching route, fallback explicit.
7. Motion: prefer existing lib; no duplicate GSAP/Motion stack; reduced motion; avoid CLS/layout thrashing.
8. Media: owner-provided video asset or trusted embed; poster, transcript/captions, aspect ratio, lazy-load; never auto-play audio.
9. Accessibility: lint and axe checks, heading order, ARIA states, focus rings, contrast, target sizes; screen reader-friendly accordions and menu.
10. Add Playwright e2e tests for all routes (including negative tests), menu keyboard/mobile, pricing toggles if used, lead validation/success/staging failure, consent-safe analytics, reduced motion, legal links. Verify at 1440/390/320.
11. Run check/build/tests, fix introduced errors, document anything blocked by credentials or missing media. Keep diffs minimal and coherent.

Deliver: PR-style summary, file list, commands actually run/results, deployment env var inventory with values redacted, blockers, screenshots, migration/rollback instructions. Never invent approvals, credentials, outcomes or passing tests.

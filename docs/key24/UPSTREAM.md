# Upstream source decision

The owner explicitly confirmed: "Use this Carbon template as the source".

Source: https://github.com/carbon-design-system/carbon-for-ibm-dotcom-nextjs-template
Commit: 34c221287a8d86c8d031eb2f594384fe9fb2b06b
License: Apache-2.0, retained in repository LICENSE.

This supersedes the source blocker in the initial audit. No customized AXIOM/KEY24 source or screenshot was supplied. Upstream baseline screenshots, where available, are Carbon sample pages, not the owner's prior KEY24 website.

KEEP: Next Pages Router, Carbon grid/spacing, IBM Plex Sans/Mono, blue/neutral design tokens, squared controls and editorial section primitives.
EXTEND: localized shell, shared page components, product routes, evidence-gated customer content, lead adapter and browser coverage.
CHANGE: upstream lorem ipsum, pink placeholder media, IBM masthead/metadata/analytics, query-only language handling, and obsolete runtime dependencies where needed.

File-level plan: pages/_app and _document for the shared shell/document; pages/[locale]/[[...slug]] for typed localized routes; components/ for Header, Footer, Hero, Proof, LeadForm and shared sections; content/ for EN/DE page data and proof registry; lib/ for route resolution, publication gates and lead delivery; pages/api/leads for server validation/integration; styles/key24 for scoped design additions; tests/ for browser/security/content regression coverage.

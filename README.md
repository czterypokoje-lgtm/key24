# KEY24 V2

An in-place adaptation of the owner-selected [Carbon for IBM.com Next.js template](https://github.com/carbon-design-system/carbon-for-ibm-dotcom-nextjs-template), commit `34c221287a8d86c8d031eb2f594384fe9fb2b06b`. The original `key24` checkout contained only this README; the owner subsequently authorized the Carbon template as source. See [the source decision](docs/key24/UPSTREAM.md). Apache-2.0 licensing is retained.

## Develop

Use Node 22+ (validated with Node 24.19.0) and the committed Yarn 3.5.1 release. This task already has an isolated checkout; use it directly rather than creating a worktree.

```sh
cd /workspace/key24
# Yarn needs explicit proxy configuration in this cloud environment. Do not hardcode proxy values.
export YARN_GLOBAL_FOLDER=/workspace/.cache/yarn
export YARN_HTTPS_PROXY="${HTTPS_PROXY:-}"
export YARN_HTTP_PROXY="${HTTP_PROXY:-}"
node .yarn/releases/yarn-3.5.1.cjs install --immutable
node .yarn/releases/yarn-3.5.1.cjs dev
```

Open `/en-GB` or `/de-DE`. Root redirects to English. Localized routes preserve the selected pricing plan when switching languages. Unknown pages and unapproved customer slugs return 404. The default Chromium path for browser tests is `/usr/bin/chromium`; override `CHROMIUM_PATH` where needed.

## Validate

```sh
node .yarn/releases/yarn-3.5.1.cjs typecheck
node .yarn/releases/yarn-3.5.1.cjs lint
node .yarn/releases/yarn-3.5.1.cjs test:unit
node .yarn/releases/yarn-3.5.1.cjs build
node .yarn/releases/yarn-3.5.1.cjs test
```

Browser tests start the production build, so build first. Do not run development and production builds in the same `.next` directory concurrently. `yarn start` starts a built production server. Screenshot and test evidence lives in [docs/key24/evidence](docs/key24/evidence); browser traces are retained for failures in ignored `test-results/`.

## Content and release gates

- `content/site.ts`: typed EN/DE copy, paths and UI strings.
- `content/articles.ts`: original practical guides in both locales.
- `content/proof.ts`: empty customer registry with explicit permissions and claim evidence gates. Private release/evidence references are removed from public page props. Approve a story separately before its route is generated; never add fake seed customers.
- `content/media.ts`: no media configured. Add authorized local video, poster, captions and transcript. Until then, the demo is an explicitly illustrative interactive walkthrough with no dead play button.
- `content/legal.ts`: approved text is missing. Legal routes explicitly report this; enquiry delivery remains disabled until reviewed privacy text exists for that locale. Do not mark a document approved merely to enable a form.
- `pages/api/leads.ts`: server validation, same-origin checks, honeypot, bounded process-local rate/deduplication stores, upstream idempotency key and deliberate delivery acknowledgement. See [CRM integration](docs/key24/CRM_INTEGRATION.md).
- Prices (€399/€699/€1,249 monthly plus applicable taxes) are visibly proposed. Entitlements and commercial terms are unapproved; there is no checkout.
- No analytics, third-party media embed or nonessential browser storage is enabled. There is no fabricated cookie consent banner.
- Copy `.env.example` to a local ignored `.env.local` only if needed. Credentials belong in secure environment settings. The app reads server bindings; tokens never enter `NEXT_PUBLIC_*` variables or client page props.
- Set the real `KEY24_SITE_URL` and `KEY24_PUBLIC_INDEXING=1` only after release approval. Until then robots disallows indexing; static pages are noindex. Rebuild after changes to these build-time settings. Never deploy an invented canonical domain.

## Product visuals and the homepage film

The homepage and CRM page now show six privacy-safe product views: agenda, stock, conversations, team, invoices and an optional click-fraud add-on. The add-on is custom-scoped and costs extra. Full-size EN/DE images live in `public/product/`. The raw screenshots and real technician/customer details are not published.

The homepage/demo film section is prepared for the planned 1:25 recording; no video is claimed to be playable yet. The human workshop visual is explicitly labelled AI-generated, not a real customer or team portrait. There are no fabricated certification badges. See [asset provenance and video handoff](docs/key24/PRODUCT_SHOWCASE.md).

## Current limits

This is a reviewable implementation, not a production-ready release. Real CRM staging acceptance, approved customer proof/media/legal text, business contact details, final pricing and product-capability verification remain external prerequisites. Browser API fixtures and a local adapter server are test evidence only, not evidence of delivery to a real CRM. Publishing source to GitHub does not deploy the website. No website deployment or environment publication has been verified.

# Product showcase, film and human context

The owner supplied four CRM screenshots and asked for a more specific presentation for automotive locksmiths. This update preserves the existing website shell, header, hero, typography and blue/white system. The product frames use navy/orange accents to reflect the supplied CRM.

## Privacy and asset provenance

No raw uploaded CRM screenshot was added to the repository. No supplied technician name, phone number, customer name, invoice number, actual appointment, real account total or logo was transcribed into the product visuals.

`components/ProductShowcase.tsx` recreates clean presentation views using newly written demonstration data. They are not claimed to be unmodified live screenshots. The website and the exported images explicitly label demonstration data. The accessible image descriptions explain the modules without exposing private records.

| View | Evidence and presentation boundary |
| --- | --- |
| Agenda | Based on the supplied shared calendar structure. Fresh sample vehicle-key jobs; anonymous mobile-unit labels; no customer/technician details. |
| Stock | Based on the supplied depot/van inventory view. Fresh sample items and quantities; no real account totals. |
| Conversations | Owner-confirmed capability; the exact screen was not supplied. The conversation layout and dialogue are illustrative. |
| Team | Based on the supplied technician-management view. Only anonymous mobile units, with no real names, numbers or customer logos. |
| Invoices | Based on supplied draft/sent/paid views. Demonstration invoice references and amounts; no real customer records or invoice values. |
| Click-fraud | Owner states it is customizable at extra cost. Shown as a separately quoted, optional concept; no automatic blocking, detection accuracy or savings claim. Actual scope remains to be agreed. |

Twelve high-resolution WebP exports (six modules in EN/DE) are published in `public/product/`. Visitors can open the full image from each tab. Exports come from the same components used in the site, not generative image text. Recreate them with the dev server running:

```sh
node .yarn/releases/yarn-3.5.1.cjs dev -p 3001
# In another terminal, from repository root:
node scripts/export-product-images.cjs
```

The exporter uses a standard full-width presentation so the text remains crisp. The live product views adapt to mobile containers; controls outside the image remain keyboard operable. All apparent internal CRM controls are part of a static illustrative visual, not fake working CRM actions. Real interactions are the website tabs, links and walkthrough.

## Film

`components/ConfidenceSections.tsx` adds the shared homepage/demo film section. It has a planned 1:25 outline and a product poster. Until the owner's recording is supplied, the section clearly says the film is being prepared and offers a working product link; there is no fake play button.

When the actual recording is ready, place the authorized media, poster and caption files under `public/media/`, then configure `content/media.ts` with their real paths and the actual EN/DE captions/transcripts. The same component will render a native controlled video player on both pages. Confirm playback, caption loading, the real duration and the outline against the finished recording; update the planned wording to describe the released film.

## Human section and trust

`public/images/locksmith-workshop.webp` is an original AI-generated illustrative scene of anonymous hands at an automotive-locksmith workbench, compressed to about 119 KB. It is visibly labelled **AI-generated illustrative scene; not a team or customer portrait**, with descriptive alt text. It is not used as a testimonial, customer identity or evidence of a real job. Replace it with an approved real team/customer/workshop photograph when supplied.

The owner confirmed there are **no certifications to display**. No certifications, regulatory badges, memberships, partner marks, ratings or reviews were invented. The trust area instead links to concrete product workflows. Actual customer proof remains subject to the existing approval gates.

Only four CRM screenshots were received in this turn; the two mentioned Fonio references were not visible. No competitor screenshot was copied or republished.

## Validation

The updated production build, typecheck and lint pass. The existing server/content tests remain in use; new browser tests check every product tab, public image response, keyboard operation, mobile layout, absent live video, truthful add-on cost language and the labelled human illustration. See the current release report and evidence for final counts and Lighthouse results.

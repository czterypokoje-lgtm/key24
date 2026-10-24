# Design decisions and evidence

## Baseline boundary

The original KEY24 repository had no application. After inspection, the owner explicitly selected the linked upstream Carbon template as source. `carbon-baseline-1440.png`, `carbon-baseline-1024.png` and `carbon-baseline-390.png` show that template running unmodified. They are not screenshots of a prior KEY24/AXIOM site. The two described owner screenshots were not attached, so exact fidelity to those images cannot be measured.

## Kept and extended

- Carbon blue 60 (`#0f62fe`) and neutral white/gray/black, with blue 70 for small text on pale blue surfaces. The palette is imported from the current Carbon colors package. This preserves the palette while removing vulnerable legacy shell tooling.
- IBM Plex Sans light/regular/medium and Plex Mono labels, self-hosted with font-display support. Font licenses are supplied by Fontsource packages; no IBM wordmark or affiliation is used.
- Rectangular components, hairline borders, clear editorial hierarchy and generous section spacing. Responsive shared primitives serve all routes.
- A compact header, three-part home hero (editorial copy / technical illustration / approach panel), grid-based product sections, and black final CTA follow the requested visual direction. They adapt the selected source; they do not claim to preserve an unavailable customized AXIOM header.
- Original abstract call-flow illustration, CRM workspace view and guide illustrations use CSS/vector geometry. The CRM view is explicitly illustrative, not an authentic product screenshot.
- The proof section uses mixed-height white, pale blue and black editorial cards. It contains labelled workflow scenarios, not reviews. No stock portrait, invented person, customer quote, rating, customer count or result is published.

## Interaction and responsive checks

The shared header supports native keyboard-operable disclosure controls, Escape, outside-click, mobile expansion, focus return, route links and language switching. The demo walkthrough supports arrow/Home/End keyboard navigation. FAQ uses semantic disclosure elements. Main CTAs route to demo/contact exploration; proposed plans preserve the selected plan through EN/DE switching.

Hover transitions are 200ms, and the call diagram has restrained motion. Reduced-motion disables animations and smooth scrolling. No scroll hijacking or heavy motion package is included. Mobile layouts intentionally stack the hero and its approach panel, preserve readable headings, and make the CRM view fit without horizontal scrolling.

Browser evidence covers all routes in EN/DE at 320/1440, with home captures at 320/390/768/1024/1280/1440. Axe checks cover all page types on desktop and home on mobile, alongside keyboard, focus, link, language and reduced-motion checks. See the release report for the actual final result.

## Intentional publication gates

No playable media is shown without an approved asset. No customer case-study route exists without separately approved story content. Pricing is visibly proposed and has no invented allowances. Legal routes disclose that approved texts are missing; enquiry submission stays unavailable. No trackers, analytics events, third-party embeds or nonessential storage are loaded. There is no fake appointment confirmation or fake cookie-consent interaction.

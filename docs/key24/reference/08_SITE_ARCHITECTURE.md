# High-converting multi-page architecture

```
/{locale}
├── solutions/
│   ├── ai-call-agent    → what the AI answers / when to hand off
│   └── whatsapp         → automation journeys (only actual capabilities)
├── platform/
│   └── crm              → KEY24 owned CRM, pipeline, dashboards
├── customers/           → real reference wall + permitted success stories
│   └── [slug]           → real, approved case studies only
├── pricing              → compare plans, pricing questions, CTA
├── demo                 → video, listen to call, book/lead form
├── contact              → secure contact form
├── resources/           → 2+ genuine explainers/FAQ (not empty link lists)
│   └── [slug]
└── legal/
    ├── privacy
    ├── terms
    └── cookies
```

### Global navigation
KEY24 | Solutions [AI Call Agent, WhatsApp] | Platform [KEY24 CRM] | Customers | Pricing | Resources | EN/DE | Book demo

### Homepage sections (preserve original design cadence)
1. Enterprise navigation with compact bar, clean active state.
2. 3-part hero: LEFT Key24 hook and two CTAs; CENTER animated call/CRM flow diagram; RIGHT one real problem/announcement/operational proof widget (no fake 'news').
3. Trust/contact strip; only approved customer marks, otherwise neutral product promise.
4. "While you are on-site" service situation cards with phone→agent→CRM diagram.
5. The demo: video + chapter list + transcript / audio sample.
6. Feature editorial modules: answering, lead capture, CRM, compliant WhatsApp.
7. Interface screenshot(s): actual product and system, sanitized.
8. Real customer proof masonry based on second reference. If no approved proof, use illustrative workflow and clearly labelled scenario.
9. Product package comparison and Growth plan emphasis.
10. Objection FAQs: current number, switching/transfer, emergency calls, data, language, setup, pricing.
11. Strong final CTA, enterprise footer.

### Conversion rules
Primary: qualified demo booking (accurate success tracking). Secondary: video consumption and sample call. Sticky CTA on mobile only after user scrolls, if non-obstructive. Pricing cards route to `/demo?plan=...`, validated and maintained after locale change. Forms ask only business-relevant fields: name, company, work email, country, optional phone, current call volume, privacy acknowledgment if required. Don't claim a calendar reservation if only a contact form was sent.

### Rollout
1) existing visual parity preserved; shell and routes
2) English route content and integrations, German localization
3) proof and video with verified assets
4) automated QA and responsive tune
5) later localization based on actual proof and sales operations capacity

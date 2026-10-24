export const locales = ["en-GB", "de-DE"] as const;
export type Locale = (typeof locales)[number];
export const paths = {
  home: "",
  agent: "solutions/ai-call-agent",
  crm: "platform/crm",
  whatsapp: "solutions/whatsapp",
  customers: "customers",
  pricing: "pricing",
  demo: "demo",
  contact: "contact",
  resources: "resources",
  privacy: "legal/privacy",
  terms: "legal/terms",
  cookies: "legal/cookies",
  preparation: "resources/prepare-your-call-flow",
  handover: "resources/better-enquiry-handover",
} as const;
export type PageId = keyof typeof paths;
export const href = (locale: Locale, id: PageId) =>
  `/${locale}${paths[id] ? `/${paths[id]}` : ""}`;
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const pageFromPath = (slug: string[]) =>
  (Object.keys(paths) as PageId[]).find((id) => paths[id] === slug.join("/"));
export type Feature = { title: string; body: string };
export type PageCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  sectionTitle: string;
  features: Feature[];
};
export const ui = {
  "en-GB": {
    tagline: "For automotive locksmiths",
    solutions: "Solutions",
    platform: "Platform",
    customers: "Customers",
    pricing: "Pricing",
    resources: "Resources",
    contact: "Contact",
    demo: "Explore a demo",
    menu: "Menu",
    close: "Close menu",
    skip: "Skip to content",
    language: "Language",
    home: "Home",
    agent: "AI Call Agent",
    crm: "KEY24 CRM",
    whatsapp: "WhatsApp workflows",
    privacy: "Privacy",
    terms: "Terms",
    cookies: "Cookies",
    learn: "Explore the solution",
    next: "Next",
    back: "Back to resources",
    workflow: "Illustrative workflow",
    label: "CALL → CONTEXT → NEXT STEP",
    faq: "A few things worth knowing.",
    faqLabel: "Questions, answered",
    allFaq: "More questions & resources",
    finalTitle: "A better handover starts with a conversation.",
    finalBody:
      "Explore how calls, customer details and follow-up could fit your business.",
    finalCta: "Explore KEY24",
    footerLine: "Your next enquiry. A clearer next step.",
    footerNote:
      "AI call handling, enquiry management and connected follow-up for automotive locksmiths.",
    product: "Product",
    company: "Company",
    legal: "Legal",
    copyright: "KEY24. All rights reserved.",
    illustrative: "Illustrative product view · not live customer data",
    readGuide: "Read the guide",
    numbered: "How it connects",
    proofLabel: "Built around real work",
    proofTitle: "The work comes first.\nThe next enquiry still matters.",
    proofIntro:
      "A look at the moments KEY24 is designed around. These are illustrative scenarios, not customer testimonials or measured results.",
    noProof:
      "Customer stories will appear here only with permission and verified evidence.",
    sample: "Sample scenario",
    plansLabel: "A conversation about the right fit",
    plansTitle: "Clear plans.\nA considered starting point.",
    proposed:
      "Proposed monthly pricing. Subject to confirmation; plus applicable taxes.",
    priceUnit: "/ month",
    pricingNote:
      "Included usage, setup fees, overages, support and contract terms are to be agreed. These plans are not yet available to purchase.",
    planCta: "Explore this plan",
    compare: "What to confirm before choosing",
    confirm: "To be agreed",
    proposedTag: "Proposed plan",
    videoMissing: "A guided look at the workflow",
    videoText:
      "Follow an illustrative enquiry from the first call to a clear next action. A recording will be added when an approved demo is available.",
    scenario: "A caller needs help with a vehicle key. What happens next?",
    journey: [
      "Understand the enquiry",
      "Keep the context together",
      "Choose the next action",
    ],
    journeyBody: [
      "Collect the details needed for a useful handover: vehicle, location and the reason for calling.",
      "Bring the enquiry into a structured job view, ready for a person to review.",
      "Review the request and decide whether to call back, arrange a job or send an appropriate follow-up.",
    ],
    crmTitle: "Less searching.\nMore context.",
    crmIntro:
      "One place to follow an enquiry from the first conversation to the next decision.",
    crmCta: "Inside KEY24 CRM",
    view: "Enquiry workspace",
    enquiry: "Enquiry",
    vehicle: "Vehicle",
    location: "Location",
    stage: "Stage",
    pending: "Needs review",
    exampleVehicle: "Vehicle details to confirm",
    exampleLocation: "Service area to confirm",
    enquiryTitle: "Replacement vehicle key",
    action: "Review & call back",
    note: "Caller details stay with the enquiry. Your team decides what comes next.",
    status: "New enquiry",
    overview: "Overview",
    enquiries: "Enquiries",
    followup: "Follow-up",
    workflowTitle: "From a ringing phone to a useful handover.",
    workflowIntro:
      "A connected process, with your team in control of the decisions that matter.",
    noCustomer: "Real stories.\nWith the evidence behind them.",
    customerIntro:
      "Customer names, portraits and results deserve more than a placeholder. We publish them only with approval.",
    customerEmptyTitle: "Our customer stories are being prepared.",
    customerEmptyBody:
      "There are no approved customer reviews or case studies to publish here yet. In the meantime, explore the workflow examples below.",
    exampleLink: "Explore the workflow",
    legalUnavailable: "This document is not yet published.",
    legalBody:
      "Approved company-specific text is still required. We will publish it here before enabling enquiry submissions. Please do not send personal information through this website yet.",
    formTitle: "Tell us about your business.",
    formIntro: "A useful conversation starts with how your calls work today.",
    formUnavailable:
      "Demo and contact requests are not open on this website yet. Please check back when enquiries are available.",
    name: "Your name",
    companyName: "Business name",
    email: "Work email",
    country: "Country",
    phone: "Phone (optional)",
    volume: "Typical calls per day (optional)",
    message: "What would you like to discuss?",
    consent:
      "I have read the privacy information and agree to be contacted about my enquiry.",
    submit: "Send enquiry",
    sending: "Sending…",
    unavailableButton: "Enquiries opening soon",
    success:
      "Your enquiry has been delivered. This is not an appointment confirmation.",
    failure: "Your enquiry could not be delivered. Please try again later.",
    invalid: "Please check the highlighted fields.",
    required: "Please complete this field.",
    emailError: "Enter a valid email address.",
    consentError: "Please read and accept the privacy information.",
    plan: "Plan of interest",
    choose: "Please select",
    faqItems: [
      [
        "Can I keep my existing business number?",
        "Your current phone setup and provider need to be reviewed first. Call forwarding and number arrangements are confirmed during scoping.",
      ],
      [
        "Does the agent replace a locksmith’s judgement?",
        "No. Vehicle access, ownership checks, safety decisions, pricing and accepting work remain with your business.",
      ],
      [
        "Is WhatsApp included for every business?",
        "Availability depends on the agreed integration, customer permissions, account configuration and applicable messaging rules.",
      ],
      [
        "What happens with customer information?",
        "The required fields, access, retention and processor arrangements must be agreed before a live workflow is enabled.",
      ],
      [
        "Can I see a real customer case study?",
        "Only approved, attributable stories and evidenced results will be published. No customer case studies are available here yet.",
      ],
    ],
  },
  "de-DE": {
    tagline: "Für Fahrzeugschlüsseldienste",
    solutions: "Lösungen",
    platform: "Plattform",
    customers: "Kunden",
    pricing: "Preise",
    resources: "Wissen",
    contact: "Kontakt",
    demo: "Demo entdecken",
    menu: "Menü",
    close: "Menü schließen",
    skip: "Zum Inhalt",
    language: "Sprache",
    home: "Startseite",
    agent: "AI Call Agent",
    crm: "KEY24 CRM",
    whatsapp: "WhatsApp-Workflows",
    privacy: "Datenschutz",
    terms: "AGB",
    cookies: "Cookies",
    learn: "Lösung entdecken",
    next: "Weiter",
    back: "Zurück zum Wissen",
    workflow: "Beispielhafter Ablauf",
    label: "ANRUF → KONTEXT → NÄCHSTER SCHRITT",
    faq: "Gut zu wissen.",
    faqLabel: "Fragen und Antworten",
    allFaq: "Weitere Fragen & Wissen",
    finalTitle: "Eine bessere Übergabe beginnt mit einem Gespräch.",
    finalBody:
      "Entdecken Sie, wie Anrufe, Kundendaten und Nachverfolgung zu Ihrem Betrieb passen könnten.",
    finalCta: "KEY24 entdecken",
    footerLine: "Die nächste Anfrage. Ein klarer nächster Schritt.",
    footerNote:
      "KI-Anrufannahme, Anfrageverwaltung und vernetzte Nachverfolgung für Fahrzeugschlüsseldienste.",
    product: "Produkt",
    company: "Unternehmen",
    legal: "Rechtliches",
    copyright: "KEY24. Alle Rechte vorbehalten.",
    illustrative: "Beispielansicht · keine echten Kundendaten",
    readGuide: "Leitfaden lesen",
    numbered: "So greift es ineinander",
    proofLabel: "Am Arbeitsalltag orientiert",
    proofTitle: "Der Auftrag hat Vorrang.\nDie nächste Anfrage zählt trotzdem.",
    proofIntro:
      "Ein Blick auf die Situationen, für die KEY24 entwickelt wird. Die Szenarien sind Beispiele, keine Kundenbewertungen oder gemessenen Ergebnisse.",
    noProof:
      "Kundenberichte erscheinen hier nur mit Einwilligung und belegbaren Ergebnissen.",
    sample: "Beispielszenario",
    plansLabel: "Gemeinsam die passende Lösung finden",
    plansTitle: "Klare Pakete.\nEin durchdachter Einstieg.",
    proposed:
      "Vorgeschlagene Monatspreise. Vorbehaltlich Bestätigung; zuzüglich anwendbarer Steuern.",
    priceUnit: "/ Monat",
    pricingNote:
      "Enthaltene Nutzung, Einrichtung, Mehrverbrauch, Support und Vertragsbedingungen werden vereinbart. Die Pakete sind noch nicht bestellbar.",
    planCta: "Paket entdecken",
    compare: "Was vor der Auswahl zu klären ist",
    confirm: "Zu vereinbaren",
    proposedTag: "Paketvorschlag",
    videoMissing: "Ein geführter Blick auf den Ablauf",
    videoText:
      "Verfolgen Sie eine beispielhafte Anfrage vom ersten Anruf bis zur nächsten Aktion. Eine Aufzeichnung ergänzen wir, sobald eine freigegebene Demo vorliegt.",
    scenario:
      "Ein Anrufer braucht Hilfe mit seinem Fahrzeugschlüssel. Wie geht es weiter?",
    journey: [
      "Anfrage verstehen",
      "Kontext zusammenhalten",
      "Nächsten Schritt wählen",
    ],
    journeyBody: [
      "Die Angaben für eine gute Übergabe erfassen: Fahrzeug, Standort und Grund des Anrufs.",
      "Die Anfrage strukturiert ablegen, damit ein Mensch sie prüfen kann.",
      "Die Anfrage prüfen und entscheiden: zurückrufen, Auftrag vereinbaren oder passend nachfassen.",
    ],
    crmTitle: "Weniger suchen.\nMehr Überblick.",
    crmIntro:
      "Ein Ort, um eine Anfrage vom ersten Gespräch bis zur nächsten Entscheidung zu begleiten.",
    crmCta: "KEY24 CRM kennenlernen",
    view: "Anfrageübersicht",
    enquiry: "Anfrage",
    vehicle: "Fahrzeug",
    location: "Standort",
    stage: "Status",
    pending: "Prüfung erforderlich",
    exampleVehicle: "Fahrzeugdaten noch bestätigen",
    exampleLocation: "Einsatzgebiet noch bestätigen",
    enquiryTitle: "Ersatzfahrzeugschlüssel",
    action: "Prüfen & zurückrufen",
    note: "Die Angaben bleiben bei der Anfrage. Ihr Team entscheidet, wie es weitergeht.",
    status: "Neue Anfrage",
    overview: "Übersicht",
    enquiries: "Anfragen",
    followup: "Nachverfolgung",
    workflowTitle: "Vom Klingeln zur brauchbaren Übergabe.",
    workflowIntro:
      "Ein verbundener Ablauf. Die wichtigen Entscheidungen bleiben bei Ihrem Team.",
    noCustomer: "Echte Geschichten.\nMit belastbaren Belegen.",
    customerIntro:
      "Kundennamen, Porträts und Ergebnisse verdienen mehr als Platzhalter. Wir veröffentlichen sie nur nach Freigabe.",
    customerEmptyTitle: "Unsere Kundenberichte werden vorbereitet.",
    customerEmptyBody:
      "Es liegen noch keine zur Veröffentlichung freigegebenen Bewertungen oder Fallstudien vor. Entdecken Sie inzwischen die folgenden Ablaufbeispiele.",
    exampleLink: "Ablauf entdecken",
    legalUnavailable: "Dieses Dokument ist noch nicht veröffentlicht.",
    legalBody:
      "Geprüfte unternehmensbezogene Texte fehlen noch. Wir veröffentlichen sie, bevor wir Anfragen freischalten. Bitte senden Sie über diese Website noch keine personenbezogenen Daten.",
    formTitle: "Erzählen Sie uns von Ihrem Betrieb.",
    formIntro:
      "Ein gutes Gespräch beginnt damit, wie Ihre Anrufe heute ablaufen.",
    formUnavailable:
      "Demo- und Kontaktanfragen sind auf dieser Website noch nicht freigeschaltet. Bitte schauen Sie wieder vorbei, sobald Anfragen möglich sind.",
    name: "Ihr Name",
    companyName: "Firmenname",
    email: "Geschäftliche E-Mail",
    country: "Land",
    phone: "Telefon (optional)",
    volume: "Übliche Anrufe pro Tag (optional)",
    message: "Worüber möchten Sie sprechen?",
    consent:
      "Ich habe die Datenschutzhinweise gelesen und stimme einer Kontaktaufnahme zu meiner Anfrage zu.",
    submit: "Anfrage senden",
    sending: "Wird gesendet…",
    unavailableButton: "Anfragen bald möglich",
    success:
      "Ihre Anfrage wurde übermittelt. Dies ist keine Terminbestätigung.",
    failure:
      "Ihre Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es später erneut.",
    invalid: "Bitte prüfen Sie die markierten Felder.",
    required: "Bitte füllen Sie dieses Feld aus.",
    emailError: "Geben Sie eine gültige E-Mail-Adresse ein.",
    consentError: "Bitte lesen und bestätigen Sie die Datenschutzhinweise.",
    plan: "Interessantes Paket",
    choose: "Bitte auswählen",
    faqItems: [
      [
        "Kann ich meine bestehende Rufnummer behalten?",
        "Zunächst prüfen wir Ihre Telefonanlage und Ihren Anbieter. Rufumleitung und Rufnummernregelung werden bei der Planung bestätigt.",
      ],
      [
        "Ersetzt die KI das Urteil eines Schlüsseldienstes?",
        "Nein. Fahrzeugzugang, Berechtigungsprüfung, Sicherheit, Preise und die Annahme von Aufträgen bleiben in der Verantwortung Ihres Betriebs.",
      ],
      [
        "Ist WhatsApp für jeden Betrieb enthalten?",
        "Die Verfügbarkeit hängt von der vereinbarten Integration, Kundeneinwilligungen, Kontoeinrichtung und geltenden Nachrichtenregeln ab.",
      ],
      [
        "Was passiert mit Kundeninformationen?",
        "Benötigte Felder, Zugriffsrechte, Aufbewahrung und Auftragsverarbeitung müssen vor einem Live-Betrieb vereinbart sein.",
      ],
      [
        "Gibt es eine echte Kundenfallstudie?",
        "Wir veröffentlichen ausschließlich freigegebene, zuordenbare Berichte und belegte Ergebnisse. Aktuell sind hier noch keine Fallstudien verfügbar.",
      ],
    ],
  },
} as const;

export const pages: Record<
  Locale,
  Record<
    "home" | "agent" | "crm" | "whatsapp" | "demo" | "contact" | "resources",
    PageCopy
  >
> = {
  "en-GB": {
    home: {
      eyebrow: "KEY24 / CONNECTED ENQUIRIES",
      title: "You’re on the job.\nYour next customer\nis calling.",
      intro:
        "AI call handling. Your own CRM. A clearer next step. Built around the working day of an automotive locksmith.",
      sectionTitle: "Your hands are busy.\nYour business keeps moving.",
      features: [
        {
          title: "On the tools",
          body: "You are programming a key. A new caller needs help. Give the enquiry a structured place to go while you focus on the vehicle.",
        },
        {
          title: "Between jobs",
          body: "Get the context before you call back: what happened, where the vehicle is and what still needs checking.",
        },
        {
          title: "Back at the desk",
          body: "Review open enquiries and follow-up together, rather than piecing a day together from missed calls and notes.",
        },
      ],
    },
    agent: {
      eyebrow: "SOLUTIONS / AI CALL AGENT",
      title: "Give the next call\na clear next step.",
      intro:
        "A considered first conversation, designed to gather useful details while you focus on the job in front of you.",
      sectionTitle: "Good call handling\nstarts with context.",
      features: [
        {
          title: "Ask the useful questions",
          body: "Design a call flow around the vehicle, the caller’s location and the type of enquiry. Confirm the questions your business actually needs.",
        },
        {
          title: "Keep boundaries clear",
          body: "Set the information the agent can provide and when a person must take over. Do not automate ownership or safety decisions.",
        },
        {
          title: "Make the handover useful",
          body: "Structure the available details so your team can review the request. Quotes, availability and accepting work remain your decision.",
        },
      ],
    },
    crm: {
      eyebrow: "PLATFORM / KEY24 CRM",
      title: "Every enquiry.\nA little more clarity.",
      intro:
        "The KEY24 workspace is designed to connect calls, enquiry details and the next action in one considered workflow.",
      sectionTitle: "From first contact\nto an informed decision.",
      features: [
        {
          title: "A structured enquiry",
          body: "Bring vehicle details, location and the reason for calling into a consistent record. Keep unknown details visible for review.",
        },
        {
          title: "A deliberate next step",
          body: "Review what needs attention, decide who should respond and keep the enquiry’s progress understandable.",
        },
        {
          title: "Follow-up in context",
          body: "Plan the right response around the enquiry. Confirm the reporting, access and integration requirements for your team before setup.",
        },
      ],
    },
    whatsapp: {
      eyebrow: "SOLUTIONS / WHATSAPP WORKFLOWS",
      title: "Continue the conversation.\nWith the right context.",
      intro:
        "Considered follow-up after a call, where the integration is supported and customer permissions are in place.",
      sectionTitle: "Useful messages.\nThoughtful boundaries.",
      features: [
        {
          title: "Confirm the next step",
          body: "An appropriate message can clarify what happens next. Your agreed workflow determines which messages can be sent.",
        },
        {
          title: "Ask for missing details",
          body: "Where permitted, request information needed to assess the enquiry. Keep sensitive information and access decisions with your team.",
        },
        {
          title: "Respect the channel",
          body: "Availability depends on account configuration, opt-in, templates, messaging windows and applicable rules. Fees and limits need confirmation.",
        },
      ],
    },
    demo: {
      eyebrow: "EXPLORE KEY24",
      title: "See the handover.\nUnderstand the difference.",
      intro:
        "Walk through the intended call-to-enquiry journey. Explore what would need to fit your team, phone setup and service area.",
      sectionTitle: "One enquiry.\nA connected journey.",
      features: [],
    },
    contact: {
      eyebrow: "CONTACT KEY24",
      title: "Let’s start with\nyour working day.",
      intro:
        "Your call flow, your service area, your way of working. Those are the right starting points for a useful conversation.",
      sectionTitle: "Before we speak",
      features: [
        {
          title: "Your current setup",
          body: "Think about your existing business number, who answers today and when calls are hardest to handle.",
        },
        {
          title: "Your ideal handover",
          body: "Which details do you need before calling someone back? What should always be handled by a person?",
        },
        {
          title: "Your team’s workflow",
          body: "Consider who reviews new enquiries and how follow-up is currently managed.",
        },
      ],
    },
    resources: {
      eyebrow: "KEY24 / FIELD NOTES",
      title: "Practical thinking.\nFor the next enquiry.",
      intro:
        "Useful guides for designing a clearer call flow, collecting the right information and keeping people in control.",
      sectionTitle: "Start with the workflow.",
      features: [],
    },
  },
  "de-DE": {
    home: {
      eyebrow: "KEY24 / VERNETZTE ANFRAGEN",
      title: "Sie sind im Einsatz.\nDer nächste Kunde\nruft schon an.",
      intro:
        "KI-Anrufannahme. Ihr eigenes CRM. Ein klarer nächster Schritt. Am Arbeitsalltag von Fahrzeugschlüsseldiensten orientiert.",
      sectionTitle: "Die Hände sind beschäftigt.\nDer Betrieb läuft weiter.",
      features: [
        {
          title: "Am Fahrzeug",
          body: "Sie programmieren einen Schlüssel. Ein neuer Anrufer braucht Hilfe. Geben Sie der Anfrage einen strukturierten Platz, während Sie am Fahrzeug arbeiten.",
        },
        {
          title: "Zwischen Aufträgen",
          body: "Erhalten Sie vor dem Rückruf den Kontext: Was ist passiert, wo steht das Fahrzeug und was ist noch zu klären?",
        },
        {
          title: "Zurück am Schreibtisch",
          body: "Prüfen Sie offene Anfragen und nächste Schritte gemeinsam, statt den Tag aus verpassten Anrufen und Notizen zusammenzusetzen.",
        },
      ],
    },
    agent: {
      eyebrow: "LÖSUNGEN / AI CALL AGENT",
      title: "Für den nächsten Anruf.\nEin klarer nächster Schritt.",
      intro:
        "Ein durchdachtes Erstgespräch, das nützliche Angaben erfassen soll, während Sie sich auf den aktuellen Auftrag konzentrieren.",
      sectionTitle: "Gute Anrufannahme\nbeginnt mit Kontext.",
      features: [
        {
          title: "Die richtigen Fragen stellen",
          body: "Gestalten Sie den Ablauf rund um Fahrzeug, Standort und Anliegen. Legen Sie die Fragen fest, die Ihr Betrieb wirklich braucht.",
        },
        {
          title: "Klare Grenzen setzen",
          body: "Definieren Sie, welche Informationen die KI geben darf und wann ein Mensch übernimmt. Berechtigungs- und Sicherheitsentscheidungen bleiben bei Ihnen.",
        },
        {
          title: "Brauchbar übergeben",
          body: "Strukturieren Sie die vorhandenen Angaben zur Prüfung durch Ihr Team. Preise, Verfügbarkeit und Auftragsannahme bleiben Ihre Entscheidung.",
        },
      ],
    },
    crm: {
      eyebrow: "PLATTFORM / KEY24 CRM",
      title: "Jede Anfrage.\nEtwas mehr Klarheit.",
      intro:
        "Der KEY24-Arbeitsbereich soll Anrufe, Anfragedetails und nächste Schritte in einem durchdachten Ablauf verbinden.",
      sectionTitle: "Vom ersten Kontakt\nzur fundierten Entscheidung.",
      features: [
        {
          title: "Eine strukturierte Anfrage",
          body: "Fahrzeugdaten, Standort und Anliegen in einem einheitlichen Datensatz zusammenführen. Offene Fragen bleiben zur Prüfung sichtbar.",
        },
        {
          title: "Ein bewusster nächster Schritt",
          body: "Prüfen Sie den Handlungsbedarf, legen Sie die Zuständigkeit fest und halten Sie den Fortschritt nachvollziehbar.",
        },
        {
          title: "Nachverfolgung mit Kontext",
          body: "Planen Sie die passende Antwort zur Anfrage. Berichte, Zugriffe und Integrationsanforderungen werden vor der Einrichtung bestätigt.",
        },
      ],
    },
    whatsapp: {
      eyebrow: "LÖSUNGEN / WHATSAPP-WORKFLOWS",
      title: "Das Gespräch fortsetzen.\nMit dem richtigen Kontext.",
      intro:
        "Durchdachte Nachverfolgung nach dem Anruf – sofern die Integration unterstützt wird und die erforderlichen Einwilligungen vorliegen.",
      sectionTitle: "Nützliche Nachrichten.\nDurchdachte Grenzen.",
      features: [
        {
          title: "Den nächsten Schritt bestätigen",
          body: "Eine passende Nachricht kann klären, wie es weitergeht. Der vereinbarte Ablauf bestimmt, welche Nachrichten versendet werden dürfen.",
        },
        {
          title: "Fehlende Angaben erfragen",
          body: "Soweit zulässig, Informationen zur Beurteilung der Anfrage erfragen. Sensible Angaben und Zugangsentscheidungen bleiben bei Ihrem Team.",
        },
        {
          title: "Den Kanal respektieren",
          body: "Die Verfügbarkeit hängt von Konto, Einwilligung, Vorlagen, Nachrichtenfenstern und geltenden Regeln ab. Gebühren und Grenzen sind zu bestätigen.",
        },
      ],
    },
    demo: {
      eyebrow: "KEY24 ENTDECKEN",
      title: "Die Übergabe sehen.\nDen Ablauf verstehen.",
      intro:
        "Entdecken Sie den vorgesehenen Weg vom Anruf zur Anfrage. Prüfen Sie, was zu Team, Telefonanlage und Einsatzgebiet passen müsste.",
      sectionTitle: "Eine Anfrage.\nEin verbundener Ablauf.",
      features: [],
    },
    contact: {
      eyebrow: "KONTAKT ZU KEY24",
      title: "Beginnen wir mit\nIhrem Arbeitsalltag.",
      intro:
        "Ihr Anrufablauf, Ihr Einsatzgebiet, Ihre Arbeitsweise. Das sind die richtigen Ausgangspunkte für ein sinnvolles Gespräch.",
      sectionTitle: "Vor dem Gespräch",
      features: [
        {
          title: "Ihre aktuelle Einrichtung",
          body: "Denken Sie an Ihre Rufnummer, wer heute antwortet und wann Anrufe besonders schwierig anzunehmen sind.",
        },
        {
          title: "Ihre ideale Übergabe",
          body: "Welche Angaben brauchen Sie vor einem Rückruf? Was sollte immer ein Mensch übernehmen?",
        },
        {
          title: "Der Ablauf im Team",
          body: "Überlegen Sie, wer neue Anfragen prüft und wie die Nachverfolgung heute organisiert ist.",
        },
      ],
    },
    resources: {
      eyebrow: "KEY24 / PRAXISWISSEN",
      title: "Praktische Gedanken.\nFür die nächste Anfrage.",
      intro:
        "Nützliche Leitfäden für klarere Anrufabläufe, passende Informationen und Entscheidungen in menschlicher Hand.",
      sectionTitle: "Mit dem Ablauf beginnen.",
      features: [],
    },
  },
};

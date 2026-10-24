import type { Locale } from "./site";
export const productModules = [
  "agenda",
  "stock",
  "conversations",
  "team",
  "invoices",
  "clickreview",
] as const;
export type ProductModule = (typeof productModules)[number];
export type ModuleCopy = {
  label: string;
  title: string;
  body: string;
  points: string[];
  screenTitle: string;
  screenIntro: string;
  addon?: boolean;
};
export const productCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    preview: string;
    sample: string;
    expand: string;
    modules: Record<ProductModule, ModuleCopy>;
  }
> = {
  "en-GB": {
    eyebrow: "INSIDE KEY24 / YOUR WORKING DAY",
    title: "Not just the next call.\nThe whole job around it.",
    intro:
      "From the first conversation to the key blank in your van. Explore a workspace built for the way automotive locksmiths actually work.",
    preview: "Recreated product interface · demonstration data",
    sample: "Demonstration data",
    expand: "View full product image",
    modules: {
      agenda: {
        label: "Agenda",
        title: "See the week.\nKeep the next job in view.",
        body: "A shared agenda for vehicle-key jobs, time slots and mobile units. See what is planned before you decide where the next enquiry fits.",
        points: [
          "Day and week planning",
          "Jobs linked to vehicle and service details",
          "A clear overview of mobile-unit assignments",
        ],
        screenTitle: "Agenda",
        screenIntro: "Vehicle-key jobs · week view",
      },
      stock: {
        label: "Stock",
        title: "Know what is in the depot.\nAnd what is in the van.",
        body: "Manage key blanks, transponders and parts across your storage locations. Keep quantities, purchase costs and items needing attention visible.",
        points: [
          "Depot and van stock in one workspace",
          "Item quantities and purchase costs",
          "Low-stock and missing-cost visibility",
        ],
        screenTitle: "Stock",
        screenIntro: "Depot and vans · parts and purchase costs",
      },
      conversations: {
        label: "Conversations",
        title: "The conversation stays\nwith the enquiry.",
        body: "Keep the useful details from a customer conversation close to the job: vehicle, location and what still needs checking before a callback.",
        points: [
          "Conversation context alongside the enquiry",
          "Vehicle-key requests and next actions",
          "Clear handover for the person responding",
        ],
        screenTitle: "Conversations",
        screenIntro: "Enquiry context · one place to review",
      },
      team: {
        label: "Team",
        title: "A clear view of\nthe people doing the work.",
        body: "Organise technicians, their working areas and access. Keep operational information in the CRM, where your team can use it.",
        points: [
          "Team and service-area organisation",
          "Technician access and invitation management",
          "Assignments visible in the agenda",
        ],
        screenTitle: "Team",
        screenIntro: "Mobile units · access and service areas",
      },
      invoices: {
        label: "Invoices",
        title: "From a finished job\nto clearer administration.",
        body: "Review drafts, sent invoices and paid work in the same workspace. Find an invoice by its job and follow its status.",
        points: [
          "Draft, sent and paid invoice views",
          "Invoices linked to jobs",
          "Invoice details and PDF workflow",
        ],
        screenTitle: "Invoices",
        screenIntro: "Job administration · draft, sent and paid",
      },
      clickreview: {
        label: "Click-fraud add-on",
        title: "Click-fraud tools.\nConfigured around your setup.",
        body: "Discuss a tailored click-fraud workflow for your advertising setup. Scope, integration and actions are agreed separately, at extra cost.",
        points: [
          "Optional, custom-scoped add-on",
          "Rules and integration agreed for your setup",
          "Quoted separately; not included by default",
        ],
        screenTitle: "Click-fraud add-on",
        screenIntro: "Concept preview · custom scope and extra cost",
        addon: true,
      },
    },
  },
  "de-DE": {
    eyebrow: "KEY24 VON INNEN / IHR ARBEITSALLTAG",
    title: "Mehr als der nächste Anruf.\nDer gesamte Auftrag dahinter.",
    intro:
      "Vom ersten Gespräch bis zum Schlüsselrohling im Einsatzfahrzeug. Entdecken Sie einen Arbeitsbereich für den Alltag von Fahrzeugschlüsseldiensten.",
    preview: "Nachgebildete Produktoberfläche · Beispieldaten",
    sample: "Beispieldaten",
    expand: "Produktansicht vergrößern",
    modules: {
      agenda: {
        label: "Agenda",
        title: "Die Woche sehen.\nDen nächsten Auftrag im Blick.",
        body: "Ein gemeinsamer Kalender für Fahrzeugschlüssel-Aufträge, Zeitfenster und mobile Einheiten. Sehen Sie die Planung, bevor Sie eine neue Anfrage einordnen.",
        points: [
          "Tages- und Wochenplanung",
          "Aufträge mit Fahrzeug- und Leistungsangaben",
          "Übersicht über zugeordnete mobile Einheiten",
        ],
        screenTitle: "Agenda",
        screenIntro: "Fahrzeugschlüssel-Aufträge · Wochenansicht",
      },
      stock: {
        label: "Bestand",
        title: "Wissen, was im Lager liegt.\nUnd was im Einsatzfahrzeug ist.",
        body: "Verwalten Sie Schlüsselrohlinge, Transponder und Teile über Ihre Lagerorte hinweg. Mengen, Einkaufspreise und Handlungsbedarf bleiben sichtbar.",
        points: [
          "Lager- und Fahrzeugbestand in einem Arbeitsbereich",
          "Artikelmengen und Einkaufspreise",
          "Niedrige Bestände und fehlende Kosten erkennen",
        ],
        screenTitle: "Bestand",
        screenIntro: "Lager und Fahrzeuge · Teile und Einkaufspreise",
      },
      conversations: {
        label: "Gespräche",
        title: "Das Gespräch bleibt\nbei der Anfrage.",
        body: "Halten Sie die nützlichen Angaben eines Gesprächs beim Auftrag: Fahrzeug, Standort und offene Fragen vor dem Rückruf.",
        points: [
          "Gesprächskontext direkt bei der Anfrage",
          "Fahrzeugschlüssel-Anliegen und nächste Schritte",
          "Klare Übergabe an die zuständige Person",
        ],
        screenTitle: "Gespräche",
        screenIntro: "Anfragekontext · gemeinsam prüfen",
      },
      team: {
        label: "Team",
        title: "Ein klarer Blick auf\ndie Menschen im Einsatz.",
        body: "Organisieren Sie Techniker, Einsatzgebiete und Zugriffe. Die betrieblichen Angaben bleiben im CRM, wo Ihr Team sie nutzen kann.",
        points: [
          "Team- und Einsatzgebietsverwaltung",
          "Technikerzugänge und Einladungen",
          "Zuordnungen in der Agenda sichtbar",
        ],
        screenTitle: "Team",
        screenIntro: "Mobile Einheiten · Zugriffe und Einsatzgebiete",
      },
      invoices: {
        label: "Rechnungen",
        title: "Vom erledigten Auftrag\nzur klareren Verwaltung.",
        body: "Prüfen Sie Entwürfe, versendete und bezahlte Rechnungen im selben Arbeitsbereich. Finden Sie Rechnungen zum Auftrag und verfolgen Sie ihren Status.",
        points: [
          "Ansichten für Entwurf, versendet und bezahlt",
          "Rechnungen mit Auftragsbezug",
          "Rechnungsdetails und PDF-Ablauf",
        ],
        screenTitle: "Rechnungen",
        screenIntro: "Auftragsverwaltung · Entwurf, versendet, bezahlt",
      },
      clickreview: {
        label: "Klickbetrug-Add-on",
        title: "Klickbetrug-Werkzeuge.\nPassend zu Ihrer Einrichtung.",
        body: "Besprechen Sie einen individuellen Ablauf für Ihre Werbeeinrichtung. Umfang, Integration und Maßnahmen werden separat vereinbart und zusätzlich berechnet.",
        points: [
          "Optionales Add-on mit individuellem Umfang",
          "Regeln und Integration nach Vereinbarung",
          "Separates Angebot; nicht standardmäßig enthalten",
        ],
        screenTitle: "Klickbetrug-Add-on",
        screenIntro: "Konzeptansicht · individueller Umfang, Zusatzkosten",
        addon: true,
      },
    },
  },
};

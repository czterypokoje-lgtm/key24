import Image from "next/image";
import Link from "next/link";
import { type Locale, href } from "../content/site";
import { demoMedia } from "../content/media";
import { Action, Icon } from "./Shell";
import { ProductScreen } from "./ProductShowcase";
export function DemoFilm({ locale }: { locale: Locale }) {
  const de = locale === "de-DE",
    title = de
      ? "Ein Anruf. Ein Auftrag.\nDas Zusammenspiel sehen."
      : "One call. One job.\nSee how it fits together.";
  const outline = de
    ? [
        ["00:00", "Ein Anruf während des Einsatzes"],
        ["00:20", "Vom Gespräch zur geplanten Arbeit"],
        ["00:40", "Schlüssel, Teile und Fahrzeugbestand"],
        ["01:00", "Das Team und die nächsten Schritte"],
      ]
    : [
        ["00:00", "A call while you are on the tools"],
        ["00:20", "From conversation to a planned job"],
        ["00:40", "Keys, parts and van stock"],
        ["01:00", "The team and the next steps"],
      ];
  return (
    <section
      className="demo-film section"
      id="product-film"
      aria-labelledby="product-film-title"
    >
      <div className="film-intro">
        <span className="eyebrow">
          KEY24 / {de ? "DER PRODUKTFILM" : "THE PRODUCT FILM"}
        </span>
        <h2 id="product-film-title">{title}</h2>
        <p>
          {de
            ? "Ein geplanter Rundgang von rund 85 Sekunden: vom ersten Gespräch bis zur Arbeit im Einsatzfahrzeug."
            : "A planned 85-second tour, from the first conversation to the work happening in the van."}
        </p>
        <ol
          className="film-outline"
          aria-label={de ? "Geplanter Filmablauf" : "Planned film outline"}
        >
          {outline.map(([time, label]) => (
            <li key={time}>
              <span>{time}</span>
              {label}
            </li>
          ))}
        </ol>
        <Link
          className="text-link"
          href={`${href(locale, "crm")}#crm-workspace`}
        >
          {de
            ? "Den Arbeitsbereich jetzt entdecken"
            : "Explore the workspace now"}
          <Icon />
        </Link>
      </div>
      <div className="film-main">
        {demoMedia?.approved ? (
          <>
            <video
              controls
              preload="metadata"
              poster={demoMedia.poster}
              width="1280"
              height="720"
            >
              <source src={demoMedia.src} type="video/mp4" />
              <track
                kind="captions"
                src={demoMedia.captions[locale]}
                srcLang={locale}
                label={locale}
                default
              />
            </video>
            <details className="film-transcript">
              <summary>{de ? "Transkript" : "Transcript"}</summary>
              <p>{demoMedia.transcript[locale]}</p>
            </details>
          </>
        ) : (
          <>
            <div className="film-poster">
              <div className="film-poster-top">
                <span>
                  KEY24 / {de ? "IM ARBEITSALLTAG" : "IN THE WORKING DAY"}
                </span>
                <span>01:25</span>
              </div>
              <div className="film-product-frame">
                <ProductScreen locale={locale} module="agenda" />
              </div>
              <div className="film-poster-bottom">
                <span>
                  {de
                    ? "ANRUF. PLANUNG. BESTAND. ÜBERBLICK."
                    : "CALL. SCHEDULE. STOCK. FOLLOW THROUGH."}
                </span>
                <span>↗</span>
              </div>
            </div>
            <div className="film-status">
              <span className="blue-dot" />
              <p>
                {de
                  ? "Der Produktfilm wird vorbereitet. Bis dahin können Sie die interaktiven Produktansichten entdecken."
                  : "The product film is being prepared. In the meantime, explore the interactive product views."}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
export function HumanSection({ locale }: { locale: Locale }) {
  const de = locale === "de-DE";
  return (
    <section className="human-section" aria-labelledby="human-section-title">
      <figure>
        <Image
          src="/images/locksmith-workshop.webp"
          alt={
            de
              ? "Illustrative Szene: Hände eines Fahrzeugschlüsseldienstes am Arbeitsplatz im Einsatzfahrzeug."
              : "Illustrative scene: an automotive locksmith’s hands at a workbench in a service van."
          }
          width={1536}
          height={1024}
          sizes="(max-width: 767px) 100vw, 55vw"
        />
        <figcaption>
          {de
            ? "KI-generierte illustrative Szene · kein Team- oder Kundenporträt"
            : "AI-generated illustrative scene · not a team or customer portrait"}
        </figcaption>
      </figure>
      <div className="human-story">
        <span className="eyebrow">
          {de ? "FÜR DIE MENSCHEN IM EINSATZ" : "FOR THE PERSON DOING THE WORK"}
        </span>
        <h2 id="human-section-title">
          {de
            ? "Ihre Hände am Schlüssel.\nIhr Betrieb im Blick."
            : "Your hands on the key.\nYour business in mind."}
        </h2>
        <p>
          {de
            ? "Sie lösen ein echtes Problem an einem echten Fahrzeug. Der nächste Anruf, die fehlenden Teile und die Planung für morgen warten trotzdem nicht."
            : "You are solving a real problem at a real vehicle. The next call, the missing parts and tomorrow’s schedule do not wait."}
        </p>
        <p>
          {de
            ? "KEY24 bringt diese Aufgaben in einen gemeinsamen Arbeitsbereich. Für Einzelbetriebe und Teams, die ihre Arbeit gut machen wollen – ohne dabei den Überblick zu verlieren."
            : "KEY24 brings those tasks into a connected workspace. For owner-operators and teams who care about doing the job properly, without losing sight of the rest of the day."}
        </p>
        <div className="human-note">
          <Icon kind="phone" />
          <span>
            {de
              ? "Für Fahrzeugschlüsseldienste. Am Arbeitsalltag orientiert."
              : "For automotive locksmiths. Built around the working day."}
          </span>
        </div>
        <Action locale={locale} id="crm" secondary>
          {de ? "KEY24 CRM entdecken" : "Explore KEY24 CRM"}
        </Action>
      </div>
    </section>
  );
}
export function ProductTrust({ locale }: { locale: Locale }) {
  const de = locale === "de-DE";
  const items = de
    ? [
        [
          "Die Arbeit planen",
          "Agenda, Aufträge und mobile Einheiten gemeinsam im Blick.",
        ],
        [
          "Die Teile kennen",
          "Lager- und Fahrzeugbestände mit Mengen und Einkaufspreisen.",
        ],
        [
          "Die Verwaltung verbinden",
          "Gesprächskontext und Rechnungsstatus beim Auftrag.",
        ],
      ]
    : [
        ["Plan the work", "Agenda, jobs and mobile units in one working view."],
        [
          "Know your parts",
          "Depot and van stock with quantities and purchase costs.",
        ],
        [
          "Connect the administration",
          "Conversation context and invoice status around the job.",
        ],
      ];
  return (
    <section
      className="product-trust section"
      aria-labelledby="product-trust-title"
    >
      <div className="section-heading">
        <span className="eyebrow">
          KEY24 / {de ? "NACHVOLLZIEHBAR" : "SEE FOR YOURSELF"}
        </span>
        <h2 id="product-trust-title">
          {de
            ? "Vertrauen beginnt mit\neinem klaren Einblick."
            : "Confidence starts with\na clear view of the product."}
        </h2>
        <p>
          {de
            ? "Konkrete Abläufe für einen konkreten Beruf. Entdecken Sie die Ansichten und entscheiden Sie, was zu Ihrem Betrieb passt."
            : "Practical workflows for a specific trade. Explore the product views and decide what fits the way your business works."}
        </p>
      </div>
      <div className="three-grid">
        {items.map(([title, body], i) => (
          <article key={title}>
            <Icon kind={(["grid", "plus", "message"] as const)[i]} />
            <h3>{title}</h3>
            <p>{body}</p>
            <Link href={`${href(locale, "crm")}#crm-workspace`}>
              {de ? "Produktoberfläche ansehen" : "See the product interface"}
              <Icon />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

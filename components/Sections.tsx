import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  href,
  ui,
  pages,
  type Locale,
  type PageId,
  type Feature,
} from "../content/site";
import type { PublicCustomerProof } from "../content/proof";
import { Icon, Action } from "./Shell";
export function CallDiagram({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <div className="call-diagram" role="img" aria-label={t.workflowTitle}>
      <div className="diagram-grid" aria-hidden="true">
        <div className="diagram-block block-a" />
        <div className="diagram-block block-b" />
        <div className="diagram-block block-c" />
        <div className="diagram-block block-d" />
        <div className="diagram-block block-e" />
        <div className="diagram-line" />
        <div className="diagram-node">
          <Icon kind="phone" />
        </div>
        <div className="diagram-plus">+</div>
        <div className="diagram-dot" />
      </div>
      <div className="diagram-caption">
        <span>01 / {t.agent}</span>
        <Icon />
        <span>02 / CRM</span>
      </div>
    </div>
  );
}
export function Hero({
  locale,
  id,
}: {
  locale: Locale;
  id: keyof (typeof pages)["en-GB"];
}) {
  const p = pages[locale][id],
    t = ui[locale];
  return (
    <section className={`hero ${id === "home" ? "hero-home" : "hero-inner"}`}>
      <div className="hero-pitch">
        <p className="eyebrow">
          <span className="blue-dot" />
          {p.eyebrow}
        </p>
        <h1>{p.title}</h1>
        <p className="hero-intro">{p.intro}</p>
        <div className="hero-actions">
          <Action locale={locale} id={id === "demo" ? "contact" : "demo"}>
            {id === "demo" ? t.contact : t.demo}
          </Action>
          {id === "home" && (
            <Action locale={locale} id="agent" secondary>
              {t.agent}
            </Action>
          )}
        </div>
      </div>
      <CallDiagram locale={locale} />
      <aside className="hero-aside">
        <span className="eyebrow">
          {locale === "de-DE" ? "DER KEY24-ANSATZ" : "THE KEY24 APPROACH"}
        </span>
        <div className="aside-rule" />
        <span className="aside-number">01—03</span>
        <h2>{t.workflowTitle}</h2>
        <p>{t.workflowIntro}</p>
        <Link href={href(locale, "crm")}>
          {t.crm}
          <Icon />
        </Link>
      </aside>
    </section>
  );
}
export function Journey({
  locale,
  interactive = false,
}: {
  locale: Locale;
  interactive?: boolean;
}) {
  const t = ui[locale],
    [active, setActive] = useState(0);
  return (
    <section className="section journey" id="workflow">
      <div className="section-heading">
        <span className="eyebrow">{t.numbered}</span>
        <h2>{t.workflowTitle}</h2>
        <p>{interactive ? t.scenario : t.workflowIntro}</p>
      </div>
      {interactive ? (
        <div className="walkthrough">
          <div className="step-tabs" role="tablist" aria-label={t.workflow}>
            {t.journey.map((title, i) => (
              <button
                id={`step-${i}`}
                key={title}
                role="tab"
                aria-selected={i === active}
                aria-controls={`step-panel-${i}`}
                tabIndex={active === i ? 0 : -1}
                onKeyDown={(e) => {
                  if (
                    ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                  ) {
                    e.preventDefault();
                    const next =
                      e.key === "Home"
                        ? 0
                        : e.key === "End"
                          ? 2
                          : (active + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    setActive(next);
                    document.getElementById(`step-${next}`)?.focus();
                  }
                }}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                {title}
                <Icon />
              </button>
            ))}
          </div>
          {t.journey.map((title, i) => (
            <div
              id={`step-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`step-${i}`}
              hidden={active !== i}
              tabIndex={0}
              key={title}
            >
              <span className="eyebrow">
                {t.workflow} / 0{i + 1}
              </span>
              <h3>{title}</h3>
              <p>{t.journeyBody[i]}</p>
              <div className="waveform" aria-hidden="true">
                {Array.from({ length: 34 }, (_, k) => (
                  <span
                    key={k}
                    style={{ height: `${12 + ((k * 17) % 65)}px` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="three-grid">
          {t.journey.map((title, i) => (
            <article key={title} className="journey-card">
              <span className="index">0{i + 1}</span>
              <Icon kind={(["phone", "grid", "message"] as const)[i]} />
              <h3>{title}</h3>
              <p>{t.journeyBody[i]}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
export function Features({
  locale,
  title,
  features,
}: {
  locale: Locale;
  title: string;
  features: Feature[];
}) {
  return (
    <section className="section features">
      <div className="section-heading">
        <span className="eyebrow">
          KEY24 / {locale === "de-DE" ? "IM ALLTAG" : "IN PRACTICE"}
        </span>
        <h2>{title}</h2>
      </div>
      <div className="three-grid">
        {features.map((f, i) => (
          <article key={f.title}>
            <span className="index">0{i + 1}</span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
export function CRMPanel({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section className="crm-section">
      <div className="crm-intro">
        <span className="eyebrow">KEY24 / CRM</span>
        <h2>{t.crmTitle}</h2>
        <p>{t.crmIntro}</p>
        <Action locale={locale} id="crm" secondary>
          {t.crmCta}
        </Action>
        <span className="figure-caption">{t.illustrative}</span>
      </div>
      <div className="workspace">
        <div className="workspace-bar">
          <span>
            KEY24 <small>CRM</small>
          </span>
          <span className="workspace-dots">•••</span>
        </div>
        <div className="workspace-body">
          <aside aria-label={t.view}>
            <span className="workspace-active">
              <Icon kind="grid" />
              {t.enquiries}
            </span>
            <span>{t.overview}</span>
            <span>{t.followup}</span>
            <span className="workspace-marker">K24 / 01</span>
          </aside>
          <div className="workspace-main">
            <div className="workspace-heading">
              <span>{t.enquiries}</span>
              <span className="status-dot" />
            </div>
            <div className="job-card">
              <div className="job-status">
                {t.status}
                <Icon kind="phone" />
              </div>
              <h3>{t.enquiryTitle}</h3>
              <dl>
                <div>
                  <dt>{t.vehicle}</dt>
                  <dd>{t.exampleVehicle}</dd>
                </div>
                <div>
                  <dt>{t.location}</dt>
                  <dd>{t.exampleLocation}</dd>
                </div>
                <div>
                  <dt>{t.stage}</dt>
                  <dd>
                    <span className="tag">{t.pending}</span>
                  </dd>
                </div>
              </dl>
              <div className="job-action">
                {t.action}
                <Icon />
              </div>
            </div>
            <p className="workspace-note">{t.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Proof({
  locale,
  full = false,
  records = [],
}: {
  locale: Locale;
  full?: boolean;
  records?: PublicCustomerProof[];
}) {
  const t = ui[locale],
    approved = records;
  return (
    <section className="section proof">
      <div className="section-heading">
        <span className="eyebrow">{t.proofLabel}</span>
        <h2>{t.proofTitle}</h2>
        <p>{t.proofIntro}</p>
      </div>
      {approved.length > 0 ? (
        <div className="proof-grid">
          {approved.map((c) => (
            <article className="proof-card" key={c.slug}>
              {c.photo && (
                <Image src={c.photo} alt={c.name} width="64" height="64" />
              )}
              <blockquote>{c.quote}</blockquote>
              <p>
                {c.name} / {c.business}
              </p>
              {c.metrics.map((m) => (
                <p key={m.label}>
                  {m.value} {m.label} · {m.period} · {m.denominator}
                </p>
              ))}
              {c.story && (
                <Link href={`/${locale}/customers/${c.slug}`}>
                  {c.story.title}
                  <Icon />
                </Link>
              )}
            </article>
          ))}
        </div>
      ) : (
        <>
          <div className="proof-grid">
            <article className="proof-card proof-featured">
              <span className="eyebrow">{t.sample} / 01</span>
              <Icon kind="phone" />
              <h3>
                {locale === "de-DE"
                  ? "Sie kümmern sich um das Fahrzeug. Die Anfrage bekommt Struktur."
                  : "You focus on the vehicle. The enquiry gets some structure."}
              </h3>
              <p>{t.journeyBody[0]}</p>
              <span className="proof-bottom">
                {t.workflow}
                <span>↗</span>
              </span>
            </article>
            <article className="proof-card proof-dark">
              <span className="eyebrow">{t.sample} / 02</span>
              <span className="display-word">
                {locale === "de-DE" ? "Kontext." : "Context."}
              </span>
              <p>{t.journeyBody[1]}</p>
              <div className="mini-grid" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </article>
            <article className="proof-card proof-small">
              <span className="eyebrow">{t.sample} / 03</span>
              <h3>
                {locale === "de-DE"
                  ? "Ein Mensch entscheidet, wie es weitergeht."
                  : "A person decides what happens next."}
              </h3>
              <p>{t.journeyBody[2]}</p>
            </article>
            <article className="proof-card proof-link">
              <span className="eyebrow">KEY24 / CRM</span>
              <h3>{t.crmTitle}</h3>
              <Link href={href(locale, "crm")}>
                {t.crmCta}
                <Icon />
              </Link>
            </article>
          </div>
          <div className="proof-note">
            <Icon kind="plus" />
            <p>{t.noProof}</p>
            {!full && (
              <Link href={href(locale, "customers")}>
                {t.customers}
                <Icon />
              </Link>
            )}
          </div>
        </>
      )}
    </section>
  );
}
export function Pricing({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  const t = ui[locale];
  return (
    <section className="section pricing">
      <div className="section-heading">
        <span className="eyebrow">{t.plansLabel}</span>
        <h2>{t.plansTitle}</h2>
        <p>{t.proposed}</p>
      </div>
      <div className="three-grid plan-grid">
        {(["Essential", "Growth", "Scale"] as const).map((name, i) => (
          <article
            className={`plan ${i === 1 ? "plan-growth" : ""}`}
            key={name}
          >
            <span className="eyebrow">
              0{i + 1} / {t.proposedTag}
            </span>
            <h3>{name}</h3>
            <p className="plan-description">
              {
                (locale === "de-DE"
                  ? [
                      "Den passenden Einstieg planen.",
                      "Verbundene Abläufe gestalten.",
                      "Komplexere Anforderungen besprechen.",
                    ]
                  : [
                      "Scope your starting point.",
                      "Plan a connected workflow.",
                      "Discuss a more complex setup.",
                    ])[i]
              }
            </p>
            <div className="price">
              {new Intl.NumberFormat(locale, {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format([399, 699, 1249][i])}
              <span>{t.priceUnit}</span>
            </div>
            <p className="plan-terms">
              {locale === "de-DE"
                ? "Umfang und Nutzung werden bestätigt."
                : "Scope and usage to be confirmed."}
            </p>
            <Action locale={locale} query={`plan=${name}`} secondary={i !== 1}>
              {t.planCta}
            </Action>
          </article>
        ))}
      </div>
      <p className="pricing-note">{t.pricingNote}</p>
      {full && (
        <div className="comparison">
          <h3>{t.compare}</h3>
          <div
            className="table-scroll"
            role="region"
            aria-label={t.compare}
            tabIndex={0}
          >
            <table>
              <caption className="sr-only">{t.compare}</caption>
              <thead>
                <tr>
                  <th scope="col">
                    {locale === "de-DE" ? "Leistung" : "Item"}
                  </th>
                  {["Essential", "Growth", "Scale"].map((x) => (
                    <th scope="col" key={x}>
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(locale === "de-DE"
                  ? [
                      "Gesprächsminuten & Rufnummern",
                      "CRM-Zugriff & Nutzer",
                      "WhatsApp-Verfügbarkeit & Gebühren",
                      "Einrichtung & Support",
                      "Mehrverbrauch & Kündigung",
                    ]
                  : [
                      "Voice minutes & phone numbers",
                      "CRM access & users",
                      "WhatsApp availability & fees",
                      "Setup & support",
                      "Overages & cancellation",
                    ]
                ).map((x) => (
                  <tr key={x}>
                    <th scope="row">{x}</th>
                    {[0, 1, 2].map((i) => (
                      <td key={i}>{t.confirm}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
export function FAQ({
  locale,
  full = false,
}: {
  locale: Locale;
  full?: boolean;
}) {
  const t = ui[locale];
  return (
    <section className="section faq">
      <div>
        <span className="eyebrow">{t.faqLabel}</span>
        <h2>{t.faq}</h2>
        {!full && (
          <Link className="text-link" href={href(locale, "resources")}>
            {t.allFaq}
            <Icon />
          </Link>
        )}
      </div>
      <div className="accordion">
        {t.faqItems.slice(0, full ? 5 : 3).map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Icon kind="plus" />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function ProductLinks({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const items: [PageId, string, string][] = [
    ["agent", t.agent, t.journeyBody[0]],
    ["crm", t.crm, t.journeyBody[1]],
    ["whatsapp", t.whatsapp, t.journeyBody[2]],
  ];
  return (
    <section className="section product-links">
      <div className="section-heading">
        <span className="eyebrow">KEY24 / {t.product}</span>
        <h2>
          {locale === "de-DE"
            ? "Ein Betrieb.\nEin verbundener Ablauf."
            : "One business.\nA more connected day."}
        </h2>
      </div>
      <div className="three-grid">
        {items.map(([id, title, body], i) => (
          <Link href={href(locale, id)} key={id}>
            <Icon kind={(["phone", "grid", "message"] as const)[i]} />
            <h3>{title}</h3>
            <p>{body}</p>
            <span className="card-bottom">
              {t.learn}
              <Icon />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

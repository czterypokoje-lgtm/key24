import { useId, useRef, useState, type KeyboardEvent } from "react";
import {
  productCopy,
  productModules,
  type ProductModule,
} from "../content/product";
import { type Locale } from "../content/site";
import { Action, Icon } from "./Shell";

// These are fresh demonstrations. None of the uploaded technician/customer records is used.
function Agenda({ de }: { de: boolean }) {
  const days = de
    ? ["Mo", "Di", "Mi", "Do", "Fr"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const jobs = [
    {
      day: 0,
      top: 14,
      label: "VW Golf",
      type: de ? "Ersatzschlüssel" : "Spare key",
      unit: "01",
    },
    {
      day: 1,
      top: 42,
      label: "Ford Focus",
      type: de ? "Alle Schlüssel verloren" : "All keys lost",
      unit: "02",
    },
    {
      day: 2,
      top: 14,
      label: "Opel Corsa",
      type: de ? "Schlüsselprogrammierung" : "Key programming",
      unit: "01",
    },
    {
      day: 3,
      top: 65,
      label: "Peugeot 208",
      type: de ? "Ersatzschlüssel" : "Spare key",
      unit: "03",
    },
    {
      day: 4,
      top: 42,
      label: "Renault Clio",
      type: de ? "Schlüsselprüfung" : "Key check",
      unit: "02",
    },
  ];
  return (
    <div className="pv-agenda">
      <div className="pv-calendar-side">
        <span className="pv-kicker">{de ? "WOCHENPLAN" : "WEEK PLANNER"}</span>
        <strong>{de ? "Ihre Einsatzwoche" : "Your working week"}</strong>
        <div className="pv-mini-calendar">
          {Array.from({ length: 28 }, (_, i) => (
            <span key={i} className={i >= 7 && i <= 11 ? "pv-selected" : ""}>
              {i + 1}
            </span>
          ))}
        </div>
        <span className="pv-kicker">
          {de ? "MOBILE EINHEITEN" : "MOBILE UNITS"}
        </span>
        {["01", "02", "03"].map((x, i) => (
          <div className="pv-unit" key={x}>
            <i className={`pv-color-${i}`} />
            {de ? "Einheit" : "Unit"} {x}
          </div>
        ))}
      </div>
      <div className="pv-week">
        <div className="pv-week-labels">
          <span />
          {days.map((d) => (
            <b key={d}>{d}</b>
          ))}
        </div>
        <div className="pv-week-grid">
          <div className="pv-hours">
            {["09:00", "10:00", "11:00", "12:00", "13:00"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          {days.map((day, i) => (
            <div className="pv-day" key={day}>
              {jobs
                .filter((j) => j.day === i)
                .map((j) => (
                  <div
                    key={j.label}
                    className={`pv-job pv-color-${i % 3}`}
                    style={{ top: `${j.top}%` }}
                  >
                    <b>
                      {j.top === 14
                        ? "09:30"
                        : j.top === 42
                          ? "11:00"
                          : "12:30"}
                    </b>
                    <strong>{j.label}</strong>
                    <span>{j.type}</span>
                    <small>
                      {de ? "Einheit" : "Unit"} {j.unit}
                    </small>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function Stock({ de }: { de: boolean }) {
  const rows = [
    [
      "HU66",
      de ? "Schlüsselrohling" : "Key blank",
      "12",
      "04",
      de ? "Auf Lager" : "In stock",
    ],
    [
      "ID48",
      de ? "Transponder" : "Transponder",
      "08",
      "02",
      de ? "Auf Lager" : "In stock",
    ],
    [
      "CR2032",
      de ? "Schlüsselbatterie" : "Key battery",
      "03",
      "01",
      de ? "Niedriger Bestand" : "Low stock",
    ],
    [
      "HU101",
      de ? "Schlüsselrohling" : "Key blank",
      "06",
      "02",
      de ? "Auf Lager" : "In stock",
    ],
  ];
  return (
    <>
      <div className="pv-stats">
        {[
          [de ? "Lagerorte" : "Locations", "04"],
          [de ? "Artikel" : "Items", "12"],
          [de ? "Bestand prüfen" : "Check stock", "01"],
        ].map(([l, v]) => (
          <div key={l}>
            <span>{l}</span>
            <strong>{v}</strong>
            <small>{de ? "Beispielbestand" : "Sample inventory"}</small>
          </div>
        ))}
      </div>
      <div className="pv-notice">
        <Icon kind="plus" />
        {de
          ? "Lager und Einsatzfahrzeuge im selben Überblick."
          : "Depot and van locations in the same view."}
      </div>
      <table className="pv-table">
        <thead>
          <tr>
            {[
              de ? "Artikel" : "Item",
              de ? "Typ" : "Type",
              de ? "Lager" : "Depot",
              de ? "Fahrzeug" : "Van",
              "Status",
            ].map((x) => (
              <th key={x}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((v, i) => (
                <td key={i}>
                  {i === 4 ? (
                    <span
                      className={`pv-tag ${r[0] === "CR2032" ? "pv-tag-orange" : ""}`}
                    >
                      {v}
                    </span>
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
function Conversations({ de }: { de: boolean }) {
  return (
    <div className="pv-conversations">
      <div className="pv-thread-list">
        <div className="pv-thread-selected">
          <span className="pv-avatar">01</span>
          <strong>{de ? "Anfrage 01" : "Enquiry 01"}</strong>
          <small>VW Golf · {de ? "Ersatzschlüssel" : "Spare key"}</small>
        </div>
        {["02", "03"].map((n) => (
          <div key={n}>
            <span className="pv-avatar">{n}</span>
            <strong>
              {de ? "Anfrage" : "Enquiry"} {n}
            </strong>
            <small>{de ? "Prüfung offen" : "Needs review"}</small>
          </div>
        ))}
      </div>
      <div className="pv-chat">
        <div className="pv-chat-heading">
          <b>VW Golf / {de ? "Ersatzschlüssel" : "Spare key"}</b>
          <span className="pv-tag">{de ? "Rückruf" : "Callback"}</span>
        </div>
        <div className="pv-chat-bubble">
          {de
            ? "Ich brauche einen Ersatzschlüssel für meinen Golf."
            : "I need a spare key for my Golf."}
        </div>
        <div className="pv-chat-bubble pv-reply">
          {de
            ? "In welchem Gebiet steht das Fahrzeug?"
            : "Which area is the vehicle in?"}
        </div>
        <div className="pv-chat-bubble">
          {de
            ? "In Ihrem Einsatzgebiet. Ein Schlüssel ist vorhanden."
            : "Within your service area. I still have one key."}
        </div>
        <div className="pv-chat-summary">
          <span className="pv-kicker">
            {de ? "NÄCHSTER SCHRITT" : "NEXT ACTION"}
          </span>
          <p>
            {de
              ? "Fahrzeugdaten bestätigen und zurückrufen."
              : "Confirm the vehicle details and call back."}
          </p>
        </div>
      </div>
    </div>
  );
}
function Team({ de }: { de: boolean }) {
  return (
    <div className="pv-team-grid">
      {["01", "02", "03", "04"].map((n, i) => (
        <div className="pv-team-card" key={n}>
          <div>
            <span className={`pv-avatar pv-color-${i % 3}`}>{n}</span>
            <div>
              <strong>
                {de ? "Mobile Einheit" : "Mobile unit"} {n}
              </strong>
              <small>
                {de
                  ? "Keine personenbezogenen Daten"
                  : "No personal information"}
              </small>
            </div>
          </div>
          <div className="pv-team-tags">
            <span className="pv-tag">
              {de ? "Zugang aktiv" : "Access enabled"}
            </span>
            <span className="pv-tag pv-tag-neutral">
              {i % 2
                ? de
                  ? "Südgebiet"
                  : "South area"
                : de
                  ? "Nordgebiet"
                  : "North area"}
            </span>
          </div>
          <div className="pv-team-bottom">
            <span>{de ? "Agenda-Zuordnung" : "Agenda assignment"}</span>
            <b>{de ? "Einsatzgebiet" : "Service area"} →</b>
          </div>
        </div>
      ))}
    </div>
  );
}
function Invoices({ de }: { de: boolean }) {
  return (
    <>
      <div className="pv-stats">
        {[
          [de ? "Entwürfe" : "Drafts", "03"],
          [de ? "Versendet" : "Sent", "02"],
          [de ? "Bezahlt" : "Paid", "01"],
        ].map(([l, v]) => (
          <div key={l}>
            <span>{l}</span>
            <strong>{v}</strong>
            <small>{de ? "Beispielrechnungen" : "Sample invoices"}</small>
          </div>
        ))}
      </div>
      <div className="pv-filter-strip">
        <span className="pv-filter-active">{de ? "Alle" : "All"}</span>
        <span>{de ? "Entwurf" : "Draft"}</span>
        <span>{de ? "Versendet" : "Sent"}</span>
        <span>{de ? "Bezahlt" : "Paid"}</span>
      </div>
      <table className="pv-table">
        <thead>
          <tr>
            {[
              de ? "Nummer" : "Number",
              de ? "Auftrag" : "Job",
              de ? "Betrag" : "Amount",
              "Status",
            ].map((l) => (
              <th key={l}>{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["DEMO-001", "VW Golf", "€ 120", de ? "Entwurf" : "Draft"],
            ["DEMO-002", "Ford Focus", "€ 180", de ? "Versendet" : "Sent"],
            ["DEMO-003", "Opel Corsa", "€ 95", de ? "Bezahlt" : "Paid"],
          ].map((r, i) => (
            <tr key={r[0]}>
              {r.map((v, j) => (
                <td key={j}>
                  {j === 3 ? (
                    <span
                      className={`pv-tag ${i === 2 ? "pv-tag-green" : "pv-tag-neutral"}`}
                    >
                      {v}
                    </span>
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
function ClickReview({ de }: { de: boolean }) {
  return (
    <div className="pv-addon">
      <span className="pv-addon-label">
        {de
          ? "OPTIONALES ADD-ON / SEPARATES ANGEBOT"
          : "OPTIONAL ADD-ON / SEPARATE QUOTE"}
      </span>
      <h4>
        {de
          ? "Ihr Setup. Ihr vereinbarter Ablauf."
          : "Your setup. Your agreed workflow."}
      </h4>
      <div className="pv-addon-flow">
        {(de
          ? ["Werbeeinrichtung", "Individuelle Regeln", "Vereinbarte Maßnahmen"]
          : ["Advertising setup", "Custom rules", "Agreed actions"]
        ).map((x, i) => (
          <div key={x}>
            <span>0{i + 1}</span>
            <Icon kind={i === 0 ? "grid" : i === 1 ? "plus" : "check"} />
            <strong>{x}</strong>
          </div>
        ))}
      </div>
      <p>
        {de
          ? "Funktionsumfang, Anbindung und Kosten werden vor der Einrichtung individuell vereinbart. Diese Ansicht zeigt ein Konzept, kein bereits eingerichtetes Konto."
          : "Features, integration and cost are scoped before setup. This is a concept view, not an account with active protection."}
      </p>
      <div className="pv-notice">
        {de
          ? "Individuell konfigurierbar · zusätzliche Kosten"
          : "Custom configuration · extra cost"}
      </div>
    </div>
  );
}
export function ProductScreen({
  locale,
  module,
}: {
  locale: Locale;
  module: ProductModule;
}) {
  const t = productCopy[locale],
    m = t.modules[module],
    de = locale === "de-DE";
  return (
    <div
      className="product-screen"
      data-product-screen={module}
      role="img"
      aria-label={`${m.screenTitle}. ${m.body} ${t.preview}`}
    >
      <div className="product-screen-inner" aria-hidden="true">
        <aside className="product-sidebar">
          <div className="pv-wordmark">
            <span>⌁</span> KEY24 <small>CRM</small>
          </div>
          <span className="pv-sidebar-label">
            {de ? "ARBEITSBEREICH" : "WORKSPACE"}
          </span>
          {productModules.map((id, i) => (
            <span key={id} className={id === module ? "pv-nav-active" : ""}>
              <span>{["▦", "▣", "◷", "◇", "▤", "⊞"][i]}</span>
              {t.modules[id].label}
            </span>
          ))}
          <div className="pv-sidebar-foot">KEY24 / {t.sample}</div>
        </aside>
        <div className="product-main">
          <div className="pv-topbar">
            <div className="pv-search">
              <span>⌕</span>
              {de
                ? "Fahrzeug, Auftrag oder Artikel suchen"
                : "Search vehicle, job or stock item"}
            </div>
            <span className="pv-account">K</span>
          </div>
          <div className="pv-main-content">
            <div className="pv-title-row">
              <div>
                <h3>{m.screenTitle}</h3>
                <p>{m.screenIntro}</p>
              </div>
              <span className="pv-demo-label">
                {m.addon
                  ? de
                    ? "KONZEPT"
                    : "CONCEPT"
                  : de
                    ? "DEMOANSICHT"
                    : "DEMO VIEW"}
              </span>
            </div>
            {module === "agenda" ? (
              <Agenda de={de} />
            ) : module === "stock" ? (
              <Stock de={de} />
            ) : module === "conversations" ? (
              <Conversations de={de} />
            ) : module === "team" ? (
              <Team de={de} />
            ) : module === "invoices" ? (
              <Invoices de={de} />
            ) : (
              <ClickReview de={de} />
            )}
          </div>
          <div className="pv-bottom-bar">
            <span>{t.sample}</span>
            <span>KEY24 / CRM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ProductShowcase({ locale }: { locale: Locale }) {
  const t = productCopy[locale],
    [active, setActive] = useState<ProductModule>("agenda"),
    id = useId().replaceAll(":", ""),
    refs = useRef<(HTMLButtonElement | null)[]>([]),
    m = t.modules[active];
  function keydown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? productModules.length - 1
          : (i + (e.key === "ArrowRight" ? 1 : productModules.length - 1)) %
            productModules.length;
    setActive(productModules[next]);
    refs.current[next]?.focus();
  }
  return (
    <section
      className="section product-showcase"
      id="crm-workspace"
      aria-labelledby={`${id}-heading`}
    >
      <div className="section-heading">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2 id={`${id}-heading`}>{t.title}</h2>
        <p>{t.intro}</p>
      </div>
      <div
        className="product-tabs"
        role="tablist"
        aria-label={locale === "de-DE" ? "CRM-Funktionen" : "CRM features"}
      >
        {productModules.map((module, i) => (
          <button
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            key={module}
            id={`${id}-tab-${module}`}
            aria-controls={`${id}-panel-${module}`}
            aria-selected={active === module}
            tabIndex={active === module ? 0 : -1}
            onKeyDown={(e) => keydown(e, i)}
            onClick={() => setActive(module)}
          >
            {t.modules[module].label}
            {t.modules[module].addon && <span>+</span>}
          </button>
        ))}
      </div>
      {productModules.map((module) => {
        const c = t.modules[module];
        return (
          <div
            key={module}
            id={`${id}-panel-${module}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${module}`}
            hidden={module !== active}
            tabIndex={0}
          >
            <div className="product-visual">
              <ProductScreen locale={locale} module={module} />
            </div>
            <div className="product-caption">
              <span>{c.addon ? c.screenIntro : t.preview}</span>
              <a
                href={`/product/${locale}-${module}.webp`}
                target="_blank"
                rel="noreferrer"
              >
                {t.expand} ↗
              </a>
            </div>
          </div>
        );
      })}
      <div className="product-detail">
        <div>
          <span className="eyebrow">KEY24 / {m.label}</span>
          <h3>{m.title}</h3>
        </div>
        <div>
          <p>{m.body}</p>
          <ul>
            {m.points.map((p) => (
              <li key={p}>
                <Icon kind="check" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <Action locale={locale} id="demo">
          {locale === "de-DE" ? "Ablauf entdecken" : "Explore the workflow"}
        </Action>
      </div>
    </section>
  );
}

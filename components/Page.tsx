import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  href,
  ui,
  pages,
  locales,
  type Locale,
  type PageId,
} from "../content/site";
import { articles } from "../content/articles";
import { legal } from "../content/legal";
import { ProductShowcase } from "./ProductShowcase";
import { DemoFilm, HumanSection, ProductTrust } from "./ConfidenceSections";
import type { PublicCustomerProof } from "../content/proof";
import { Header, Footer, FinalCTA, Icon } from "./Shell";
import {
  Hero,
  Journey,
  Features,
  Proof,
  Pricing,
  FAQ,
  ProductLinks,
} from "./Sections";
import { LeadForm } from "./LeadForm";
export type SitePageProps = {
  locale: Locale;
  id: PageId;
  siteUrl: string | null;
  proof: PublicCustomerProof[];
  caseSlug?: string;
};
export function SitePage({
  locale,
  id,
  siteUrl,
  proof,
  caseSlug,
}: SitePageProps) {
  const t = ui[locale],
    router = useRouter(),
    article =
      id === "preparation" || id === "handover" ? articles[locale][id] : null;
  const story = caseSlug
    ? proof.find((c) => c.slug === caseSlug && c.story)
    : null;
  const title =
    story?.story?.title ??
    (id in pages[locale]
      ? pages[locale][id as keyof (typeof pages)["en-GB"]].title.replace(
          /\n/g,
          " ",
        )
      : (article?.title ??
        (
          {
            customers: t.customers,
            pricing: t.pricing,
            privacy: t.privacy,
            terms: t.terms,
            cookies: t.cookies,
          } as Record<string, string>
        )[id]));
  const description =
    id in pages[locale]
      ? pages[locale][id as keyof (typeof pages)["en-GB"]].intro
      : (article?.intro ?? t.footerNote);
  const path = caseSlug
    ? `${href(locale, "customers")}/${caseSlug}`
    : href(locale, id);
  const isLegal = id === "privacy" || id === "terms" || id === "cookies";
  return (
    <>
      <Head>
        <title>{`${title} | KEY24`}</title>
        <meta name="description" content={description} />
        <meta
          name="robots"
          content={siteUrl && !isLegal ? "index,follow" : "noindex,nofollow"}
        />
        <meta property="og:title" content={`${title} | KEY24`} />
        <meta property="og:description" content={description} />
        <meta
          property="og:type"
          content={article || story ? "article" : "website"}
        />
        <meta property="og:locale" content={locale.replace("-", "_")} />
        <meta property="og:site_name" content="KEY24" />
        <meta name="theme-color" content="#0f62fe" />
        {siteUrl && (
          <>
            <link rel="canonical" href={siteUrl + path} />
            <meta property="og:url" content={siteUrl + path} />
            <meta property="og:image" content={`${siteUrl}/og.png`} />
            {!caseSlug &&
              locales.map((l) => (
                <link
                  key={l}
                  rel="alternate"
                  hrefLang={l}
                  href={siteUrl + href(l, id)}
                />
              ))}
            {!caseSlug && (
              <link
                rel="alternate"
                hrefLang="x-default"
                href={siteUrl + href("en-GB", id)}
              />
            )}
          </>
        )}
      </Head>
      <div id="top" />
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <Header locale={locale} page={id} />
      <main id="main">
        {id === "home" && (
          <>
            <Hero locale={locale} id="home" />
            <div className="announcement">
              <span className="eyebrow">KEY24 / 01</span>
              <p>{t.footerLine}</p>
              <Link href={href(locale, "demo")}>
                {t.exampleLink}
                <Icon />
              </Link>
            </div>
            <DemoFilm locale={locale} />
            <Features
              locale={locale}
              title={pages[locale].home.sectionTitle}
              features={pages[locale].home.features}
            />
            <Journey locale={locale} />
            <ProductShowcase locale={locale} />
            <ProductTrust locale={locale} />
            <HumanSection locale={locale} />
            <ProductLinks locale={locale} />
            <Proof locale={locale} records={proof} />
            <Pricing locale={locale} />
            <FAQ locale={locale} />
          </>
        )}
        {(id === "agent" || id === "crm" || id === "whatsapp") && (
          <>
            <Hero locale={locale} id={id} />
            <Features
              locale={locale}
              title={pages[locale][id].sectionTitle}
              features={pages[locale][id].features}
            />
            {id === "crm" ? (
              <ProductShowcase locale={locale} />
            ) : (
              <Journey locale={locale} interactive />
            )}
            {id === "whatsapp" && (
              <section className="section message-example">
                <div>
                  <span className="eyebrow">{t.workflow}</span>
                  <h2>
                    {locale === "de-DE"
                      ? "Die passende Nachricht.\nZum passenden Zeitpunkt."
                      : "The right message.\nAt the right moment."}
                  </h2>
                </div>
                <div className="message-card">
                  <span>KEY24 / {t.sample}</span>
                  <p>
                    {locale === "de-DE"
                      ? "Danke für Ihre Anfrage. Ein Mitarbeiter prüft die Angaben und meldet sich zum nächsten Schritt."
                      : "Thank you for your enquiry. A team member will review the details and get back to you about the next step."}
                  </p>
                  <small>
                    {locale === "de-DE"
                      ? "Beispieltext · nur bei geeignetem und freigegebenem Ablauf"
                      : "Example wording · only in an appropriate, agreed workflow"}
                  </small>
                </div>
              </section>
            )}
            <FAQ locale={locale} />
          </>
        )}
        {id === "customers" && !story && (
          <>
            <section className="page-heading">
              <span className="eyebrow">KEY24 / {t.customers}</span>
              <h1>{t.noCustomer}</h1>
              <p>{t.customerIntro}</p>
            </section>
            <div className="customer-empty">
              <span className="blue-dot" />
              <div>
                <h2>{t.customerEmptyTitle}</h2>
                <p>{t.customerEmptyBody}</p>
              </div>
            </div>
            <Proof locale={locale} records={proof} full />
          </>
        )}
        {story?.story && (
          <article className="article section">
            <Link className="text-link" href={href(locale, "customers")}>
              {t.customers}
            </Link>
            <span className="eyebrow">{story.business}</span>
            <h1>{story.story.title}</h1>
            <blockquote>{story.quote}</blockquote>
            {story.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {story.metrics.map((m) => (
              <p key={m.label}>
                {m.value} {m.label} / {m.period} / {m.denominator}
              </p>
            ))}
          </article>
        )}
        {id === "pricing" && (
          <>
            <section className="page-heading compact">
              <span className="eyebrow">KEY24 / {t.pricing}</span>
              <h1>
                {locale === "de-DE"
                  ? "Der passende Rahmen.\nFür Ihren Betrieb."
                  : "The right scope.\nFor your business."}
              </h1>
              <p>{t.proposed}</p>
            </section>
            <Pricing locale={locale} full />
            <FAQ locale={locale} full />
          </>
        )}
        {id === "demo" && (
          <>
            <Hero locale={locale} id="demo" />
            <DemoFilm locale={locale} />
            <Journey locale={locale} interactive />
            <LeadForm
              key={locale}
              locale={locale}
              intent="demo"
              plan={
                typeof router.query.plan === "string" ? router.query.plan : ""
              }
            />
            <FAQ locale={locale} />
          </>
        )}
        {id === "contact" && (
          <>
            <Hero locale={locale} id="contact" />
            <LeadForm key={locale} locale={locale} intent="contact" />
            <Features
              locale={locale}
              title={pages[locale].contact.sectionTitle}
              features={pages[locale].contact.features}
            />
          </>
        )}
        {id === "resources" && (
          <>
            <Hero locale={locale} id="resources" />
            <section className="section resources">
              <div className="section-heading">
                <span className="eyebrow">{t.readGuide}</span>
                <h2>{pages[locale].resources.sectionTitle}</h2>
              </div>
              <div className="two-grid">
                {(["preparation", "handover"] as const).map((a, i) => (
                  <Link
                    className="resource-card"
                    key={a}
                    href={href(locale, a)}
                  >
                    <div
                      className={`resource-visual resource-${i}`}
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="eyebrow">
                      {articles[locale][a].category}
                    </span>
                    <h3>{articles[locale][a].title}</h3>
                    <p>{articles[locale][a].intro}</p>
                    <span className="card-bottom">
                      {t.readGuide}
                      <Icon />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
            <FAQ locale={locale} full />
          </>
        )}
        {article && (
          <article className="section article">
            <Link className="text-link" href={href(locale, "resources")}>
              ← {t.back}
            </Link>
            <span className="eyebrow">{article.category}</span>
            <h1>{article.title}</h1>
            <p className="article-intro">{article.intro}</p>
            {article.sections.map(([heading, body], i) => (
              <section key={heading}>
                <span className="index">0{i + 1}</span>
                <h2>{heading}</h2>
                <p>{body}</p>
              </section>
            ))}
          </article>
        )}
        {isLegal && (
          <section className="section legal-page">
            <span className="eyebrow">KEY24 / {t.legal}</span>
            <h1>{title}</h1>
            {legal[locale][id as "privacy" | "terms" | "cookies"].approved ? (
              legal[locale][
                id as "privacy" | "terms" | "cookies"
              ].paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <div className="notice">
                <h2>{t.legalUnavailable}</h2>
                <p>{t.legalBody}</p>
              </div>
            )}
          </section>
        )}
        {!isLegal && id !== "demo" && id !== "contact" && (
          <FinalCTA locale={locale} />
        )}
      </main>
      <Footer locale={locale} />
    </>
  );
}

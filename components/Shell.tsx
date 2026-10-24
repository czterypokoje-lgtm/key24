import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { href, ui, type Locale, type PageId } from "../content/site";

export function Icon({
  kind = "arrow",
  className = "",
}: {
  kind?:
    | "arrow"
    | "phone"
    | "grid"
    | "message"
    | "plus"
    | "check"
    | "close"
    | "menu"
    | "globe";
  className?: string;
}) {
  const d = {
    arrow: "M4 12h15m-6-6 6 6-6 6",
    phone: "M7 3H4v4c0 7 6 13 13 13h4v-4l-5-2-2 3a16 16 0 0 1-7-7l3-2-3-5Z",
    grid: "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
    message: "M3 4h18v13H9l-6 4V4Z",
    plus: "M12 4v16M4 12h16",
    check: "m4 12 5 5L20 6",
    close: "m5 5 14 14M5 19 19 5",
    menu: "M3 6h18M3 12h18M3 18h18",
    globe:
      "M3 12h18M12 3c6 5 6 13 0 18-6-5-6-13 0-18Zm0 0a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
  }[kind];
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
export function Action({
  locale,
  id = "demo",
  children,
  secondary = false,
  query,
}: {
  locale: Locale;
  id?: PageId;
  children: ReactNode;
  secondary?: boolean;
  query?: string;
}) {
  return (
    <Link
      href={`${href(locale, id)}${query ? `?${query}` : ""}`}
      className={`action ${secondary ? "action-secondary" : ""}`}
    >
      {children}
      <Icon />
    </Link>
  );
}
export function Header({ locale, page }: { locale: Locale; page: PageId }) {
  const t = ui[locale],
    router = useRouter(),
    ref = useRef<HTMLElement>(null),
    menuRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const closeDetails = () =>
      ref.current
        ?.querySelectorAll("details[open]")
        .forEach((d) => d.removeAttribute("open"));
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const active = ref.current?.querySelector(
          "details[open] summary",
        ) as HTMLElement | null;
        closeDetails();
        if (open) {
          setOpen(false);
          menuRef.current?.focus();
        } else active?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        closeDetails();
        setOpen(false);
      }
    };
    const toggle = (e: Event) => {
      if (e.target instanceof HTMLDetailsElement && e.target.open)
        ref.current?.querySelectorAll("details[open]").forEach((d) => {
          if (d !== e.target) d.removeAttribute("open");
        });
    };
    const nav = ref.current;
    nav?.addEventListener("toggle", toggle, true);
    const resize = () => {
      if (window.innerWidth > 1050) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    router.events.on("routeChangeStart", closeDetails);
    return () => {
      nav?.removeEventListener("toggle", toggle, true);
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
      router.events.off("routeChangeStart", closeDetails);
    };
  }, [open, router.events]);
  const link = (id: PageId, label: string) => (
    <Link
      href={href(locale, id)}
      aria-current={page === id ? "page" : undefined}
      onClick={() => setOpen(false)}
    >
      {label}
      <Icon />
    </Link>
  );
  return (
    <header ref={ref} className="header">
      <Link
        className="wordmark"
        aria-label={`KEY24 — ${t.home}`}
        href={href(locale, "home")}
      >
        KEY<span>24</span>
        <span className="brand-square" />
      </Link>
      <button
        ref={menuRef}
        className="menu-toggle"
        aria-label={open ? t.close : t.menu}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        <Icon kind={open ? "close" : "menu"} />
      </button>
      <nav
        aria-label={locale === "de-DE" ? "Hauptnavigation" : "Main navigation"}
        id="main-navigation"
        className={open ? "navigation is-open" : "navigation"}
      >
        <details
          className="nav-dropdown"
          onToggle={(e) => {
            if (e.currentTarget.open)
              ref.current?.querySelectorAll("details").forEach((d) => {
                if (d !== e.currentTarget) d.removeAttribute("open");
              });
          }}
        >
          <summary>
            {t.solutions}
            <span className="chevron" />
          </summary>
          <div className="dropdown-panel">
            <span className="eyebrow">{t.solutions}</span>
            {link("agent", t.agent)}
            {link("whatsapp", t.whatsapp)}
          </div>
        </details>
        <details className="nav-dropdown">
          <summary>
            {t.platform}
            <span className="chevron" />
          </summary>
          <div className="dropdown-panel">
            <span className="eyebrow">{t.platform}</span>
            {link("crm", t.crm)}
          </div>
        </details>
        {link("customers", t.customers)}
        {link("pricing", t.pricing)}
        {link("resources", t.resources)}
        <div className="nav-tools">
          <label className="locale-select">
            <Icon kind="globe" />
            <span className="sr-only">{t.language}</span>
            <select
              aria-label={t.language}
              value={locale}
              onChange={(e) => {
                const {
                  locale: unused,
                  slug: unusedSlug,
                  ...query
                } = router.query;
                void unused;
                void unusedSlug;
                setOpen(false);
                router.push({
                  pathname: href(e.target.value as Locale, page),
                  query,
                });
              }}
            >
              <option value="en-GB">EN</option>
              <option value="de-DE">DE</option>
            </select>
          </label>
          <Link
            className="nav-cta"
            href={href(locale, "demo")}
            onClick={() => setOpen(false)}
          >
            {t.demo}
            <Icon />
          </Link>
        </div>
      </nav>
    </header>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const groups: [string, [PageId, string][]][] = [
    [
      t.product,
      [
        ["agent", t.agent],
        ["crm", t.crm],
        ["whatsapp", t.whatsapp],
      ],
    ],
    [
      t.company,
      [
        ["customers", t.customers],
        ["pricing", t.pricing],
        ["resources", t.resources],
        ["demo", t.demo],
        ["contact", t.contact],
      ],
    ],
    [
      t.legal,
      [
        ["privacy", t.privacy],
        ["terms", t.terms],
        ["cookies", t.cookies],
      ],
    ],
  ];
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Link className="wordmark" href={href(locale, "home")}>
            KEY<span>24</span>
            <span className="brand-square" />
          </Link>
          <p>{t.footerLine}</p>
          <p className="footer-note">{t.footerNote}</p>
        </div>
        {groups.map(([heading, links]) => (
          <div key={heading} className="footer-group">
            <h2>{heading}</h2>
            {links.map(([id, label]) => (
              <Link key={id} href={href(locale, id)}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {t.copyright}
        </span>
        <span>{t.tagline}</span>
        <a href="#top">{locale === "de-DE" ? "Nach oben" : "Back to top"} ↑</a>
      </div>
    </footer>
  );
}
export function FinalCTA({ locale }: { locale: Locale }) {
  const t = ui[locale];
  return (
    <section className="final-cta">
      <span className="eyebrow">KEY24 / {t.next}</span>
      <div>
        <h2>{t.finalTitle}</h2>
        <p>{t.finalBody}</p>
        <Action locale={locale}>{t.finalCta}</Action>
      </div>
      <div className="cta-motif" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

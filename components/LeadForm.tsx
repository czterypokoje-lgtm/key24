import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { href, ui, type Locale } from "../content/site";
import { Icon } from "./Shell";
export function LeadForm({
  locale,
  intent,
  plan = "",
}: {
  locale: Locale;
  intent: "demo" | "contact";
  plan?: string;
}) {
  const t = ui[locale],
    [available, setAvailable] = useState(false),
    [state, setState] = useState<"idle" | "sending" | "success" | "error">(
      "idle",
    ),
    [errors, setErrors] = useState<string[]>([]),
    [failure, setFailure] = useState("");
  const key = useRef<string>(""),
    lastPayload = useRef<string>(""),
    busy = useRef(false),
    status = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    setAvailable(false);
    fetch(`/api/leads?locale=${locale}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : { available: false }))
      .then((v) => setAvailable(v.available === true))
      .catch(() => {});
    return () => controller.abort();
  }, [locale]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current || !available) return;
    const form = e.currentTarget,
      values = Object.fromEntries(new FormData(form).entries()),
      fields = ["name", "company", "email", "country", "message"].filter(
        (f) => !String(values[f] ?? "").trim(),
      );
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email)))
      fields.push("email");
    if (!values.consent) fields.push("consent");
    setErrors([...new Set(fields)]);
    if (fields.length) {
      form.querySelector<HTMLElement>(`[name="${fields[0]}"]`)?.focus();
      return;
    }
    busy.current = true;
    setState("sending");
    setFailure("");
    const payload = JSON.stringify({
      ...values,
      consent: true,
      locale,
      intent,
    });
    if (!key.current || payload !== lastPayload.current)
      key.current = crypto.randomUUID();
    lastPayload.current = payload;
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": key.current,
        },
        body: payload,
      });
      const result = await r.json();
      if (!r.ok || result.accepted !== true) throw new Error("delivery");
      setState("success");
      form.reset();
      key.current = "";
    } catch {
      setState("error");
      setFailure(t.failure);
    } finally {
      busy.current = false;
      status.current?.focus();
    }
  }
  const field = (
    name: string,
    label: string,
    required = true,
    type = "text",
    maxLength = 100,
  ) => (
    <label key={name} htmlFor={`lead-${name}`}>
      {label}
      {required && <span aria-hidden="true"> *</span>}
      <input
        id={`lead-${name}`}
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        autoComplete={
          (
            {
              name: "name",
              company: "organization",
              email: "email",
              phone: "tel",
              country: "country-name",
            } as Record<string, string>
          )[name]
        }
        aria-invalid={errors.includes(name)}
        aria-describedby={errors.includes(name) ? `error-${name}` : undefined}
      />
      {errors.includes(name) && (
        <span className="field-error" id={`error-${name}`}>
          {name === "email" ? t.emailError : t.required}
        </span>
      )}
    </label>
  );
  return (
    <section className="form-section" id="enquiry">
      <div>
        <span className="eyebrow">{t.contact}</span>
        <h2>{t.formTitle}</h2>
        <p>{t.formIntro}</p>
        {!available && <div className="notice">{t.formUnavailable}</div>}
      </div>
      <form
        onSubmit={submit}
        noValidate
        className="lead-form"
        aria-label={t.formTitle}
      >
        <div className="form-grid">
          {field("name", t.name)}
          {field("company", t.companyName, true, "text", 160)}
          {field("email", t.email, true, "email", 254)}
          {field("country", t.country, true, "text", 80)}
          {field("phone", t.phone, false, "tel", 40)}
          {field("volume", t.volume, false, "text", 40)}
        </div>
        <label htmlFor="lead-plan">
          {t.plan}
          <select
            id="lead-plan"
            name="plan"
            key={plan}
            defaultValue={
              ["Essential", "Growth", "Scale"].includes(plan) ? plan : ""
            }
          >
            <option value="">{t.choose}</option>
            {["Essential", "Growth", "Scale"].map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
        <label htmlFor="lead-message">
          {t.message} *
          <textarea
            id="lead-message"
            name="message"
            required
            maxLength={3000}
            rows={4}
            aria-invalid={errors.includes("message")}
            aria-describedby={
              errors.includes("message") ? "error-message" : undefined
            }
          />
          {errors.includes("message") && (
            <span className="field-error" id="error-message">
              {t.required}
            </span>
          )}
        </label>
        <div className="bot-field" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="consent" htmlFor="lead-consent">
          <input
            id="lead-consent"
            type="checkbox"
            name="consent"
            required
            aria-invalid={errors.includes("consent")}
          />
          <span>
            {t.consent}{" "}
            <Link href={href(locale, "privacy")}>{t.privacy} ↗</Link>
          </span>
        </label>
        {errors.includes("consent") && (
          <span className="field-error">{t.consentError}</span>
        )}
        <button
          className="action"
          type="submit"
          disabled={!available || state === "sending" || state === "success"}
        >
          {!available
            ? t.unavailableButton
            : state === "sending"
              ? t.sending
              : t.submit}
          <Icon />
        </button>
        <div
          className={`form-status ${state}`}
          ref={status}
          tabIndex={-1}
          role="status"
          aria-live="polite"
        >
          {state === "success" ? t.success : failure}
          {errors.length > 0 && t.invalid}
        </div>
      </form>
    </section>
  );
}

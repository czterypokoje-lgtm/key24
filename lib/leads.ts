import { randomUUID, createHash } from "node:crypto";
import { isLocale, type Locale } from "../content/site";
export type Lead = {
  name: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  volume: string;
  message: string;
  consent: true;
  locale: Locale;
  intent: "demo" | "contact";
  plan: "" | "Essential" | "Growth" | "Scale";
  website: string;
};
export function validateLead(
  value: unknown,
): { ok: true; lead: Lead } | { ok: false; fields: string[] } {
  if (!value || typeof value !== "object")
    return { ok: false, fields: ["form"] };
  const v = value as Record<string, unknown>,
    fields: string[] = [];
  const limits: Record<string, [number, number]> = {
    name: [1, 100],
    company: [1, 160],
    email: [3, 254],
    country: [2, 80],
    phone: [0, 40],
    volume: [0, 40],
    message: [1, 3000],
    website: [0, 200],
  };
  const clean: Record<string, string> = {};
  for (const [key, [min, max]] of Object.entries(limits)) {
    const val = v[key] ?? "";
    if (
      typeof val !== "string" ||
      val.trim().length < min ||
      val.trim().length > max ||
      /[\x00-\x08\x0b-\x1f]/.test(val)
    ) {
      fields.push(key);
    } else clean[key] = val.trim();
  }
  if (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email))
    fields.push("email");
  if (v.consent !== true) fields.push("consent");
  if (typeof v.locale !== "string" || !isLocale(v.locale))
    fields.push("locale");
  if (!["demo", "contact"].includes(v.intent as string)) fields.push("intent");
  if (!["", "Essential", "Growth", "Scale"].includes((v.plan ?? "") as string))
    fields.push("plan");
  if (fields.length) return { ok: false, fields: [...new Set(fields)] };
  return {
    ok: true,
    lead: {
      ...clean,
      locale: v.locale,
      consent: true,
      intent: v.intent,
      plan: v.plan ?? "",
    } as Lead,
  };
}
export function crmConfig() {
  const endpoint = process.env.KEY24_CRM_API_BASE;
  const token = process.env.KEY24_CRM_API_TOKEN;
  if (!endpoint || !token) return null;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:" || url.username || url.password || url.hash)
      return null;
    return { endpoint: url.href, token };
  } catch {
    return null;
  }
}
export class DeliveryError extends Error {
  constructor(
    public kind: "rejected" | "unavailable" | "timeout" | "invalid-response",
  ) {
    super(kind);
  }
}
// Proposed contract: POST the normalized Lead plus consent timestamp; 2xx JSON {accepted:true,id:string}.
// API_BASE is the COMPLETE leads URL. Confirm this contract with the actual CRM before launch.
export async function deliverLead(
  lead: Lead,
  key: string,
  config: { endpoint: string; token: string },
  fetcher: typeof fetch = fetch,
) {
  let response: Response;
  try {
    response = await fetcher(config.endpoint, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.token}`,
        "Idempotency-Key": key,
      },
      body: JSON.stringify({
        ...lead,
        website: undefined,
        source: "key24-website",
        consentAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (e) {
    throw new DeliveryError(
      e instanceof Error && ["TimeoutError", "AbortError"].includes(e.name)
        ? "timeout"
        : "unavailable",
    );
  }
  if (!response.ok)
    throw new DeliveryError(
      response.status >= 500 ? "unavailable" : "rejected",
    );
  const raw = await response.text();
  if (raw.length > 16000) throw new DeliveryError("invalid-response");
  let result;
  try {
    result = JSON.parse(raw);
  } catch {
    throw new DeliveryError("invalid-response");
  }
  if (
    result.accepted !== true ||
    typeof result.id !== "string" ||
    !result.id.trim()
  )
    throw new DeliveryError("invalid-response");
  return { accepted: true, reference: randomUUID() };
}
export const fingerprint = (lead: Lead) =>
  createHash("sha256").update(JSON.stringify(lead)).digest("hex");

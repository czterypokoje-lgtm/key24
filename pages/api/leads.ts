import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID, createHash } from "node:crypto";
import {
  crmConfig,
  deliverLead,
  fingerprint,
  validateLead,
} from "../../lib/leads";
import { isLocale } from "../../content/site";
import { privacyReady } from "../../content/legal";
const attempts = new Map<string, { count: number; expires: number }>();
const submissions = new Map<
  string,
  {
    fingerprint: string;
    expires: number;
    result?: { accepted: boolean; reference: string };
    pending: boolean;
  }
>();
export const config = { api: { bodyParser: { sizeLimit: "12kb" } } };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Cache-Control", "no-store");
  const configured = crmConfig();
  if (req.method === "GET") {
    const locale =
      typeof req.query.locale === "string" && isLocale(req.query.locale)
        ? req.query.locale
        : "en-GB";
    return res
      .status(200)
      .json({ available: Boolean(configured) && privacyReady(locale) });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }
  const correlationId = randomUUID();
  const origin = req.headers.origin;
  const host = req.headers.host;
  if (!origin || !host) {
    return res.status(403).json({ error: "origin_required", correlationId });
  }
  try {
    if (new URL(origin).host !== host)
      return res.status(403).json({ error: "invalid_origin", correlationId });
  } catch {
    return res.status(403).json({ error: "invalid_origin", correlationId });
  }
  if (!req.headers["content-type"]?.startsWith("application/json"))
    return res.status(415).json({ error: "json_required", correlationId });
  const now = Date.now();
  for (const [key, v] of attempts) if (v.expires < now) attempts.delete(key);
  for (const [key, v] of submissions)
    if (v.expires < now) submissions.delete(key);
  // Socket peer is used rather than trusting spoofable forwarded headers. Deploy a trusted edge limiter for multiple instances.
  const peer = createHash("sha256")
    .update(req.socket.remoteAddress ?? "unknown")
    .digest("hex");
  const attempt = attempts.get(peer) ?? { count: 0, expires: now + 60000 };
  attempt.count++;
  attempts.set(peer, attempt);
  if (attempt.count > 10 || attempts.size > 10000) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({ error: "rate_limited", correlationId });
  }
  const validated = validateLead(req.body);
  if (!validated.ok)
    return res.status(422).json({
      error: "invalid_input",
      fields: validated.fields,
      correlationId,
    });
  const lead = validated.lead;
  if (lead.website)
    return res.status(422).json({ error: "invalid_input", correlationId });
  if (!configured || !privacyReady(lead.locale))
    return res
      .status(503)
      .json({ error: "enquiries_unavailable", correlationId });
  const key = req.headers["idempotency-key"];
  if (typeof key !== "string" || !/^[0-9a-f-]{36}$/i.test(key))
    return res
      .status(400)
      .json({ error: "idempotency_required", correlationId });
  const hash = fingerprint(lead),
    existing = submissions.get(key);
  if (existing) {
    if (existing.fingerprint !== hash)
      return res
        .status(409)
        .json({ error: "idempotency_conflict", correlationId });
    if (existing.result) return res.status(200).json(existing.result);
    return res.status(409).json({ error: "delivery_pending", correlationId });
  }
  if (submissions.size > 10000)
    return res.status(503).json({ error: "busy", correlationId });
  submissions.set(key, {
    fingerprint: hash,
    expires: now + 86400000,
    pending: true,
  });
  try {
    const result = await deliverLead(lead, key, configured);
    submissions.set(key, {
      fingerprint: hash,
      expires: now + 86400000,
      pending: false,
      result,
    });
    return res.status(200).json(result);
  } catch {
    // Never log payloads or upstream response bodies.
    // Keep the same key for a deliberate retry; upstream MUST support idempotency to avoid ambiguous-timeout duplicates.
    submissions.delete(key);
    return res.status(502).json({ error: "delivery_failed", correlationId });
  }
}

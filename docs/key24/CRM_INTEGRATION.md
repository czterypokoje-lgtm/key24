# CRM integration contract and verification boundary

Status: adapter implemented; real CRM contract and staging credentials not supplied.

## Configuration

Check existing secure bindings before adding any requirements. `KEY24_CRM_API_BASE` is the **complete HTTPS leads endpoint**. The name comes from the kit, but no `/leads` path is appended automatically. `KEY24_CRM_API_TOKEN` is a server-only bearer binding. Redirects are rejected to avoid forwarding credentials to another destination. Do not enable HTTP/TLS bypasses for production.

No host, token or integration approval is invented. No missing secret is declared against an unknown destination. Enter actual credentials through secure environment settings only after the integration contract is agreed.

## Proposed adapter contract — requires confirmation

POST JSON to the configured endpoint with `Authorization: Bearer <binding>`, `Content-Type: application/json`, and `Idempotency-Key: <UUID>`.

Fields: `name`, `company`, `email`, `country`, optional `phone`, optional `volume`, `message`, `consent:true`, `locale` (`en-GB` or `de-DE`), `intent` (`demo` or `contact`), optional validated `plan` (`Essential`, `Growth`, `Scale`), `source:key24-website`, and server-generated ISO `consentAt`. Honeypot input is never forwarded.

A delivery succeeds only for a 2xx JSON response with `{ "accepted": true, "id": "<nonempty upstream reference>" }`. Other 2xx bodies, invalid JSON, timeouts, redirects and errors fail closed. The browser receives an opaque generated correlation reference, not upstream bodies or customer data. Confirmation says **enquiry delivered**, never appointment booked. No automatic retries are performed. A deliberate retry reuses the key for an unchanged payload; an edited payload receives a new key.

The endpoint must support idempotency across requests and instances, particularly after ambiguous timeouts. If the CRM contract differs, update the adapter and its contract tests before enabling it.

## Public API

`GET /api/leads?locale=en-GB`: reports only `available`. Availability requires valid server configuration and actual approved privacy text in `content/legal.ts` for the locale.

`POST /api/leads`: JSON only; validates allowed fields, bounds, email, locale, intent, plan and consent; requires matching Origin/Host and a UUID idempotency key. Rejects nonempty honeypots. Upstream errors return a generic failure plus a correlation ID. Responses are `no-store`. Never log request bodies, credentials, email addresses or upstream response bodies.

Rate limiting is 10 POST attempts/minute per socket peer, using a bounded process-local store. The socket peer is used rather than trusting unverified `X-Forwarded-For`. Production hosting must supply a trusted edge limiter and durable idempotency support for its actual proxy/multi-instance topology. Process-local stores are not distributed protection. A rate limit must not be represented as complete bot protection.

## Tests versus real delivery

Unit tests exercise validation and a real local HTTP fixture server, plus rejection/timeout/invalid acknowledgement cases. Handler-level fixtures exercise idempotency and server gates. Browser tests explicitly mock API availability and delivery to exercise validation, failure, retry and accurate success wording. The real running API is also tested to reject unavailable delivery.

These checks do not establish compatibility, authorization or actual record creation in KEY24 CRM. Staging acceptance must inspect the created lead in the real CRM, verify consent fields, check validation/rejection/timeout handling and verify repeat submissions do not create duplicates. Both EN/DE privacy content must be approved before their forms can be enabled.

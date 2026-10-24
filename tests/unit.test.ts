import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import {
  validateLead,
  deliverLead,
  DeliveryError,
  crmConfig,
} from "../lib/leads";
import {
  publishable,
  publicProof,
  customerProof,
  type CustomerProof,
} from "../content/proof";
import { privacyReady } from "../content/legal";
import { paths, locales, pageFromPath } from "../content/site";
const lead = {
  name: "Fixture",
  company: "Test company",
  email: "test@example.test",
  country: "Germany",
  message: "Test only",
  consent: true,
  locale: "en-GB",
  intent: "demo",
  plan: "",
  phone: "",
  volume: "",
  website: "",
};
test("server validation rejects invalid input, excessive data and missing consent", () => {
  assert.equal(validateLead(lead).ok, true);
  for (const v of [
    { ...lead, email: "bad" },
    { ...lead, consent: false },
    { ...lead, locale: "xx" },
    { ...lead, plan: "Unlimited" },
    { ...lead, message: "a".repeat(3001) },
    { ...lead, name: [] },
    { ...lead, message: "\x00" },
  ])
    assert.equal(validateLead(v).ok, false);
});
const fixture: CustomerProof = {
  slug: "fixture-only",
  locale: "en-GB",
  publish: true,
  name: "Local fixture",
  business: "Not a customer",
  quote: "Test fixture, never published",
  releaseRef: "fixture-only",
  approvedOn: "2020-01-01",
  consentForName: true,
  consentForQuote: true,
  photo: "/customer-assets/test.jpg",
  consentForPhoto: false,
  metrics: [
    {
      label: "test",
      value: "1",
      period: "fixture",
      denominator: "fixture",
      evidenceRef: "",
      verified: true,
    },
  ],
  story: { title: "Fixture", paragraphs: ["Test only"] },
  storyApproved: false,
};
test("proof publication requires every permission and evidence field", () => {
  assert.equal(publishable(fixture), true);
  for (const patch of [
    { publish: false },
    { consentForName: false },
    { consentForQuote: false },
    { releaseRef: "" },
    { quote: "" },
    { approvedOn: "2999-01-01" },
    { slug: "../bad" },
  ])
    assert.equal(publishable({ ...fixture, ...patch }), false);
  const publicRecord = publicProof(fixture)!;
  assert.equal(publicRecord.photo, null);
  assert.equal(publicRecord.story, null);
  assert.deepEqual(publicRecord.metrics, []);
  assert.equal("releaseRef" in publicRecord, false);
  assert.equal(customerProof.length, 0);
});
test("privacy gates remain closed without actual reviewed text", () => {
  for (const l of locales) assert.equal(privacyReady(l), false);
});
test("route mapping is complete and unapproved slugs are not mapped", () => {
  for (const p of Object.values(paths))
    assert.ok(pageFromPath(p ? p.split("/") : []));
  assert.equal(pageFromPath(["customers", "unapproved"]), undefined);
});
test("CRM requires HTTPS and both configured bindings", () => {
  const before = {
    url: process.env.KEY24_CRM_API_BASE,
    token: process.env.KEY24_CRM_API_TOKEN,
  };
  try {
    process.env.KEY24_CRM_API_BASE = "http://example.test/leads";
    process.env.KEY24_CRM_API_TOKEN = "local-fixture-only";
    assert.equal(crmConfig(), null);
    process.env.KEY24_CRM_API_BASE = "https://crm.example.test/leads";
    assert.ok(crmConfig());
    delete process.env.KEY24_CRM_API_TOKEN;
    assert.equal(crmConfig(), null);
  } finally {
    if (before.url === undefined) delete process.env.KEY24_CRM_API_BASE;
    else process.env.KEY24_CRM_API_BASE = before.url;
    if (before.token === undefined) delete process.env.KEY24_CRM_API_TOKEN;
    else process.env.KEY24_CRM_API_TOKEN = before.token;
  }
});
test("adapter makes a real local HTTP request and validates upstream acknowledgement", async () => {
  let received: Record<string, unknown> = {};
  const server = createServer((req, res) => {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      received = JSON.parse(body);
      assert.equal(req.headers["idempotency-key"], "fixture-id");
      assert.equal(req.headers.authorization, "Bearer fixture-only");
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ accepted: true, id: "local-fixture" }));
    });
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const addr = server.address();
  assert.ok(addr && typeof addr === "object");
  try {
    const v = validateLead(lead);
    assert.equal(v.ok, true);
    if (v.ok) {
      const result = await deliverLead(v.lead, "fixture-id", {
        endpoint: `http://127.0.0.1:${addr.port}/leads`,
        token: "fixture-only",
      });
      assert.equal(result.accepted, true);
      assert.equal(received.source, "key24-website");
      assert.ok(received.consentAt);
      assert.equal("website" in received, false);
    }
  } finally {
    server.close();
  }
});
test("adapter does not treat arbitrary 2xx, rejection, timeout or redirect as success", async () => {
  const v = validateLead(lead);
  assert.equal(v.ok, true);
  if (!v.ok) return;
  for (const fetcher of [
    async () => new Response("{}", { status: 200 }),
    async () => new Response("not json", { status: 200 }),
    async () => new Response("", { status: 500 }),
    async () => {
      throw new DOMException("Timed out", "TimeoutError");
    },
  ])
    await assert.rejects(
      () =>
        deliverLead(
          v.lead,
          "fixture",
          { endpoint: "https://crm.example.test", token: "fixture-only" },
          fetcher as typeof fetch,
        ),
      DeliveryError,
    );
});

test("API delivers once for a repeated key, rejects conflicts and keeps private data out of responses", async () => {
  const { default: handler } = await import("../pages/api/leads");
  const { legal } = await import("../content/legal");
  const oldDoc = legal["en-GB"].privacy,
    oldFetch = globalThis.fetch,
    oldUrl = process.env.KEY24_CRM_API_BASE,
    oldToken = process.env.KEY24_CRM_API_TOKEN;
  let calls = 0;
  legal["en-GB"].privacy = {
    approved: true,
    reviewedOn: "2020-01-01",
    paragraphs: ["Local test fixture only. Not published."],
  };
  process.env.KEY24_CRM_API_BASE = "https://crm.example.test/leads";
  process.env.KEY24_CRM_API_TOKEN = "fixture-only";
  globalThis.fetch = async () => {
    calls++;
    return new Response(
      JSON.stringify({ accepted: true, id: "upstream-private-reference" }),
    );
  };
  const key = "12345678-1234-1234-1234-123456789abc";
  const invoke = async (body: unknown, origin = "http://localhost:3000") => {
    let code = 200;
    let json: unknown;
    const req = {
      method: "POST",
      headers: {
        origin,
        host: "localhost:3000",
        "content-type": "application/json",
        "idempotency-key": key,
      },
      socket: { remoteAddress: "fixture-peer" },
      body,
    };
    const res = {
      setHeader: () => res,
      status: (v: number) => {
        code = v;
        return res;
      },
      json: (v: unknown) => {
        json = v;
        return res;
      },
    };
    await handler(
      req as unknown as import("next").NextApiRequest,
      res as unknown as import("next").NextApiResponse,
    );
    return { code, json };
  };
  try {
    const one = await invoke(lead),
      two = await invoke(lead);
    assert.equal(one.code, 200);
    assert.deepEqual(one, two);
    assert.equal(calls, 1);
    assert.equal(
      JSON.stringify(one).includes("upstream-private-reference"),
      false,
    );
    assert.equal((await invoke({ ...lead, message: "Different" })).code, 409);
    assert.equal((await invoke({ ...lead, website: "bot.example" })).code, 422);
    assert.equal((await invoke(lead, "https://other.example")).code, 403);
    assert.equal(calls, 1);
  } finally {
    legal["en-GB"].privacy = oldDoc;
    globalThis.fetch = oldFetch;
    if (oldUrl === undefined) delete process.env.KEY24_CRM_API_BASE;
    else process.env.KEY24_CRM_API_BASE = oldUrl;
    if (oldToken === undefined) delete process.env.KEY24_CRM_API_TOKEN;
    else process.env.KEY24_CRM_API_TOKEN = oldToken;
  }
});
test("API rate-limits repeated requests without trusting forwarded IP headers", async () => {
  const { default: handler } = await import("../pages/api/leads");
  let last = 0;
  for (let i = 0; i < 11; i++) {
    const req = {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
        host: "localhost:3000",
        "content-type": "application/json",
        "x-forwarded-for": `untrusted-${i}`,
      },
      socket: { remoteAddress: "rate-fixture-peer" },
      body: {},
    };
    const res = {
      setHeader: () => res,
      status: (v: number) => {
        last = v;
        return res;
      },
      json: () => res,
    };
    await handler(
      req as unknown as import("next").NextApiRequest,
      res as unknown as import("next").NextApiResponse,
    );
  }
  assert.equal(last, 429);
});

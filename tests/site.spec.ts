import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { paths, locales } from "../content/site";
import fs from "node:fs/promises";
const evidence = "docs/key24/evidence";
for (const locale of locales) {
  test(`${locale}: every route, internal link, metadata and no browser exceptions`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    const links = new Set<string>();
    for (const path of Object.values(paths)) {
      const url = `/${locale}${path ? "/" + path : ""}`,
        response = await page.goto(url);
      expect(response?.status(), url).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page).toHaveTitle(/KEY24/);
      expect(
        await page.locator('meta[name="description"]').getAttribute("content"),
      ).toBeTruthy();
      for (const a of await page
        .locator("a[href]")
        .evaluateAll((els) => els.map((e) => e.getAttribute("href")!)))
        if (a.startsWith("/") && !a.startsWith("//"))
          links.add(a.split("#")[0]);
    }
    for (const link of links)
      expect((await request.get(link)).status(), link).toBe(200);
    expect(errors).toEqual([]);
    expect(
      (await request.get(`/${locale}/customers/unapproved-customer`)).status(),
    ).toBe(404);
    expect((await request.get(`/${locale}/resources/not-real`)).status()).toBe(
      404,
    );
  });
  test(`${locale}: responsive screenshots, overflow and accessibility`, async ({
    page,
  }) => {
    test.setTimeout(120000);
    for (const width of [320, 390, 768, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `${evidence}/key24-home-${locale}-${width}.png`,
        fullPage: true,
        animations: "disabled",
      });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${locale} ${width}px`,
      ).toBe(true);
      if (width === 390 || width === 1440) {
        const a11y = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        await fs.writeFile(
          `${evidence}/axe-home-${locale}-${width}.json`,
          JSON.stringify(a11y.violations, null, 2),
        );
        expect(a11y.violations).toEqual([]);
      }
    }
    for (const path of Object.values(paths).filter(Boolean)) {
      for (const width of [320, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(`/${locale}/${path}`);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          `${path} ${width}px`,
        ).toBe(true);
        await page.screenshot({
          path: `${evidence}/key24-${path.replaceAll("/", "-")}-${locale}-${width}.png`,
          fullPage: true,
          animations: "disabled",
        });
      }
      const a11y = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(a11y.violations, `${locale}/${path}`).toEqual([]);
    }
  });
}
test("desktop dropdown keyboard, Escape and outside click", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en-GB");
  const summary = page.locator(".nav-dropdown summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".dropdown-panel").first()).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "AI Call Agent", exact: false }).first(),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(summary).toBeFocused();
  await expect(page.locator(".dropdown-panel").first()).not.toBeVisible();
  await summary.click();
  await page.locator("h1").click();
  await expect(page.locator(".dropdown-panel").first()).not.toBeVisible();
});
test("mobile menu closes, restores focus and navigates", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/en-GB");
  const toggle = page.locator(".menu-toggle");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .locator("nav")
    .getByRole("link", { name: "Pricing", exact: true })
    .click();
  await expect(page).toHaveURL(/pricing/);
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
});
test("locale switch preserves route and plan selection", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en-GB/pricing");
  await page.locator(".plan-growth").getByRole("link").click();
  await expect(page).toHaveURL("/en-GB/demo?plan=Growth");
  await expect(page.locator("#lead-plan")).toHaveValue("Growth");
  await page.getByRole("combobox", { name: "Language" }).selectOption("de-DE");
  await expect(page).toHaveURL("/de-DE/demo?plan=Growth");
  await expect(page.locator("#lead-plan")).toHaveValue("Growth");
  await expect(page.locator("html")).toHaveAttribute("lang", "de-DE");
});
test("walkthrough keyboard and FAQ operate; reduced motion honored", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en-GB/demo");
  const first = page.getByRole("tab").first();
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab").nth(1)).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel")).toContainText(
    "Keep the context together",
  );
  await page.locator(".accordion summary").first().click();
  await expect(page.locator(".accordion details").first()).toHaveAttribute(
    "open",
    "",
  );
  expect(
    await page
      .locator(".diagram-node")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
test("unconfigured enquiries are honest and API rejects data", async ({
  page,
  request,
}) => {
  await page.goto("/en-GB/demo");
  await expect(
    page.getByRole("button", { name: "Enquiries opening soon" }),
  ).toBeDisabled();
  await expect(page.locator("video")).toHaveCount(0);
  await expect(
    page.getByText("Your enquiry has been delivered.", { exact: false }),
  ).toHaveCount(0);
  const result = await request.post("/api/leads", {
    headers: { Origin: "http://127.0.0.1:3000" },
    data: { name: "A" },
  });
  expect(result.status()).toBe(422);
  const cross = await request.post("/api/leads", {
    headers: { Origin: "https://other.example" },
    data: {},
  });
  expect(cross.status()).toBe(403);
  const valid = {
    name: "Fixture",
    company: "Fixture business",
    email: "fixture@example.test",
    country: "UK",
    message: "Local test only",
    consent: true,
    locale: "en-GB",
    intent: "demo",
    plan: "",
  };
  expect(
    (
      await request.post("/api/leads", {
        headers: {
          Origin: "http://127.0.0.1:3000",
          "Idempotency-Key": crypto.randomUUID(),
        },
        data: valid,
      })
    ).status(),
  ).toBe(503);
});
for (const intent of ["demo", "contact"])
  test(`${intent}: form validation and sandbox UI success/failure`, async ({
    page,
  }) => {
    await page.route("**/api/leads?*", (route) =>
      route.fulfill({ json: { available: true } }),
    );
    let submissions = 0;
    await page.route("**/api/leads", async (route) => {
      submissions++;
      const data = route.request().postDataJSON();
      expect(data.intent).toBe(intent);
      expect(data.consent).toBe(true);
      expect(route.request().headers()["idempotency-key"]).toBeTruthy();
      await route.fulfill(
        submissions === 1
          ? { status: 502, json: { error: "delivery_failed" } }
          : { json: { accepted: true, reference: "local-ui-fixture" } },
      );
    });
    await page.goto(`/en-GB/${intent}`);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.locator("#lead-name")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(submissions).toBe(0);
    await page.locator("#lead-name").fill("Test person");
    await page.locator("#lead-company").fill("Fixture business");
    await page.locator("#lead-email").fill("fixture@example.test");
    await page.locator("#lead-country").fill("UK");
    await page.locator("#lead-message").fill("An integration test enquiry.");
    await page.locator("#lead-consent").check();
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("status")).toContainText(
      "could not be delivered",
    );
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByRole("status")).toContainText(
      "not an appointment confirmation",
    );
    expect(submissions).toBe(2);
  });
test("no unapproved customer routes, third-party trackers, or public placeholder media", async ({
  page,
  request,
}) => {
  const external: string[] = [];
  page.on("request", (r) => {
    if (!r.url().startsWith("http://127.0.0.1:3000")) external.push(r.url());
  });
  await page.goto("/en-GB/customers");
  await expect(
    page.getByText("Our customer stories are being prepared."),
  ).toBeVisible();
  expect(await page.locator("img").count()).toBe(0);
  expect(external).toEqual([]);
  expect((await request.get("/en-US")).status()).toBe(404);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
});

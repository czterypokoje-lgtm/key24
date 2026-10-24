import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { productCopy, productModules } from "../content/product";
for (const locale of ["en-GB", "de-DE"] as const) {
  test(`${locale}: product views and full-size exports are available without personal records`, async ({
    page,
    request,
  }) => {
    await page.goto(`/${locale}/platform/crm`);
    const t = productCopy[locale];
    for (const productId of productModules) {
      await page
        .locator(".product-tabs")
        .getByRole("tab", { name: t.modules[productId].label, exact: false })
        .click();
      const panel = page.getByRole("tabpanel");
      await expect(panel).toBeVisible();
      await expect(
        panel.locator(`[data-product-screen="${productId}"]`),
      ).toBeVisible();
      await expect(page.locator(".product-detail h3")).toHaveText(
        t.modules[productId].title,
      );
      const image = await request.get(`/product/${locale}-${productId}.webp`);
      expect(image.status()).toBe(200);
      expect(image.headers()["content-type"]).toContain("image/webp");
      expect((await image.body()).length).toBeGreaterThan(10000);
      await expect(panel).not.toContainText(/\+31\d{7,}/);
    }
    await expect(page.locator(".product-detail")).toContainText(
      locale === "de-DE" ? "zusätzlich berechnet" : "extra cost",
    );
    await expect(page.locator(".product-detail")).not.toContainText(
      /guaranteed|guaranteed savings|garantiert/i,
    );
  });
  test(`${locale}: product tabs are keyboard accessible on mobile; the film is honestly pending`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(`/${locale}`);
    const tabs = page.locator(".product-tabs [role=tab]");
    await tabs.first().focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(tabs.last()).toBeFocused();
    await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("Home");
    await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(".demo-film")).toBeVisible();
    await expect(page.locator(".demo-film video")).toHaveCount(0);
    await expect(page.locator(".film-status")).toContainText(
      locale === "de-DE" ? "wird vorbereitet" : "being prepared",
    );
    await expect(page.locator(".demo-film")).not.toHaveRole("button");
    await expect(page.locator(".human-section figcaption")).toContainText(
      locale === "de-DE"
        ? "KI-generierte illustrative Szene"
        : "AI-generated illustrative scene",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .include(".product-showcase")
      .include(".demo-film")
      .include(".human-section")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
  });
}

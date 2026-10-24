/* Export privacy-safe product images from the same components visitors see.
 * Run from repository root while the development server is running.
 * No supplied CRM screenshot or personal record is read by this script.
 */
const { chromium } = require("@playwright/test");
const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");
const modules = [
  "agenda",
  "stock",
  "conversations",
  "team",
  "invoices",
  "clickreview",
];
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1100 },
      deviceScaleFactor: 2,
    });
    const base = process.env.PRODUCT_CAPTURE_URL || "http://127.0.0.1:3001";
    await fs.mkdir(path.resolve("public/product"), { recursive: true });
    for (const locale of ["en-GB", "de-DE"]) {
      await page.goto(`${base}/${locale}/platform/crm`, {
        waitUntil: "networkidle",
      });
      await page.evaluate(() => document.fonts.ready);
      await page.addStyleTag({
        content:
          ".product-showcase .product-visual{padding:0!important;width:1240px!important;max-width:none!important;border:0!important}.product-showcase .product-screen{width:1240px!important;max-width:none!important}",
      });
      for (const [i, productId] of modules.entries()) {
        await page.locator(".product-tabs [role=tab]").nth(i).click();
        const panel = page.locator(
          `.product-showcase [data-product-screen="${productId}"]:visible`,
        );
        const png = await panel.screenshot({ animations: "disabled" });
        const file = path.resolve(`public/product/${locale}-${productId}.webp`);
        await sharp(png)
          .resize({ width: 1860 })
          .webp({ quality: 90 })
          .toFile(file);
        console.log(`${locale}/${productId}`);
      }
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

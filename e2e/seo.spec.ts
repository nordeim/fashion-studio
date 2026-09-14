import { expect, test } from "@playwright/test";

test.describe("SEO and PWA surfaces", () => {
  test("home page metadata is complete", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Moda Studio");
    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute(
      "content",
      /A curated fashion platform showcasing sustainable/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "Moda Studio");
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0); // metadataBase handles origin
  });

  test("robots.txt allows all and points at the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();
    const text = await response.text();
    expect(text.toLowerCase()).toContain("user-agent: *");
    expect(text).toContain("Allow: /");
    expect(text).toContain("Sitemap:");
  });

  test("sitemap.xml lists the public routes", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();
    const xml = await response.text();
    expect(xml).toContain("/DesignSystem");
  });

  test("manifest.webmanifest describes the app", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    expect(response.ok()).toBeTruthy();
    const manifest = await response.json();
    expect(manifest.name).toBe("Moda Studio");
    expect(manifest.display).toBe("standalone");
  });

  test("security headers are present", async ({ request }) => {
    const response = await request.get("/");
    expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response.headers()["x-frame-options"]).toBe("DENY");
    expect(response.headers()["content-security-policy"]).toContain("default-src 'self'");
  });
});

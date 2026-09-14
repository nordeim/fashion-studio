import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("anchor links scroll to their sections", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Sustainability" }).click();

    await expect(page.locator("#sustainability")).toBeInViewport();
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  });

  test("scrolling past the hero frosts the header", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("banner").getByRole("navigation");

    await expect(nav).not.toHaveClass(/shadow-xs/);
    await page.mouse.wheel(0, 600);
    await expect(nav).toHaveClass(/shadow-xs/);
  });

  test("mobile menu opens, navigates and closes", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();

    const menu = page.getByRole("navigation", { name: "Mobile" });
    await expect(menu).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    await menu.getByRole("link", { name: "Essentials" }).click();
    await expect(page.locator("#essentials")).toBeInViewport();
    await expect(menu).toBeHidden();
  });
});

test.describe("Design System page", () => {
  test("renders and switches between tabs", async ({ page }) => {
    await page.goto("/DesignSystem");

    await expect(page.getByRole("heading", { name: "Moda.Studio Design System" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Brand Essence" })).toBeVisible();

    await page.getByRole("tab", { name: "Color Palette" }).click();
    await expect(page.getByRole("heading", { name: "Color Palette" })).toBeVisible();
    await expect(page.getByText("#d2c3b4")).toBeVisible();

    await page.getByRole("tab", { name: "Animations" }).click();
    await expect(page.getByRole("heading", { name: "Motion Design" })).toBeVisible();

    await page.getByRole("tab", { name: "Guidelines" }).click();
    await expect(page.getByRole("heading", { name: "Layout" })).toBeVisible();
  });

  test("header links back to the home page", async ({ page }) => {
    await page.goto("/DesignSystem");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "About" }).click();
    await expect(page.locator("#about")).toBeInViewport();
  });
});

test.describe("Not found", () => {
  test("branded 404 page", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("heading", { name: "This piece isn't in the collection." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Return to the studio" })).toBeVisible();
  });
});

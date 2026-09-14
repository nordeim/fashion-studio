import { expect, test } from "@playwright/test";

test.describe("Home page smoke", () => {
  test("renders the hero and all primary sections", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Moda Studio/);

    await expect(page.getByRole("heading", { level: 1, name: "Contemporary fashion with purpose" })).toBeVisible();
    await expect(page.getByText("Designed with intention")).toBeVisible();
    await expect(page.getByText("Curated seasonal collections and sustainable essentials")).toBeVisible();

    await expect(page.getByRole("heading", { name: "Autumn / Winter 2025" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "A commitment to better practices" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The Essentials" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Our approach to fashion" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Subscribe for early collection access and studio insights" }),
    ).toBeVisible();
  });

  test("renders all collection and essential products", async ({ page }) => {
    await page.goto("/");

    for (const title of ["Oversized Wool Coat", "Structured Blazer", "Pleated Trousers"]) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }
    for (const title of ["The Classic Tee", "Relaxed Shirt", "Straight Leg Denim"]) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }
  });

  test("primary navigation links are present", async ({ page }) => {
    await page.goto("/");

    for (const label of ["Collections", "Essentials", "Sustainability", "About"]) {
      await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("footer renders brand, columns and copyright", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("contentinfo").getByText("moda.studio").first()).toBeVisible();
    await expect(page.getByText("Contemporary fashion with purpose, designed in Berlin")).toBeVisible();
    await expect(page.getByText("© 2023 moda.studio. All rights reserved.")).toBeVisible();
  });

  test("serves images with successful responses", async ({ page }) => {
    const failed: string[] = [];
    page.on("response", (response) => {
      if (response.url().includes("/images/") && response.status() >= 400) {
        failed.push(`${response.status()} ${response.url()}`);
      }
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(failed).toEqual([]);
  });
});

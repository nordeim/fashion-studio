import { expect, test } from "@playwright/test";

test.describe("Newsletter signup", () => {
  test("rejects an invalid email with feedback", async ({ page }) => {
    await page.goto("/#newsletter");

    const input = page.getByLabel("Email address");
    await input.fill("not-an-email");
    await page.getByRole("button", { name: "Subscribe" }).click();

    await expect(page.locator("#newsletter-error")).toContainText(/valid email/i);
  });

  test("accepts a valid email and confirms subscription", async ({ page }) => {
    await page.goto("/#newsletter");

    const input = page.getByLabel("Email address");
    await input.fill(`e2e-${Date.now()}@example.com`);
    await page.getByRole("button", { name: "Subscribe" }).click();

    await expect(page.getByRole("status")).toContainText(/on the list/i);
    await expect(page.getByRole("button", { name: "Subscribe" })).toBeHidden();
  });

  test("API rejects malformed JSON with a 400", async ({ request }) => {
    const response = await request.post("/api/subscribe", {
      headers: { "Content-Type": "application/json" },
      data: { email: "" },
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
  });

  test("health endpoint reports a live database", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.db).toBe(true);
  });
});

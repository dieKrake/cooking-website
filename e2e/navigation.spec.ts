import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads and shows site content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Kochatelier/);
    await expect(
      page.getByRole("heading", { name: /Willkommen im Kochatelier/i }),
    ).toBeVisible();
  });

  test("navbar links navigate to correct pages", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Eventlocation" }).click();
    await expect(page).toHaveURL("/eventlocation");
    await expect(
      page.getByRole("heading", { name: /Deine Eventlocation/i }),
    ).toBeVisible();
  });

  test("mobile burger menu opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.getByRole("button", { name: /Menü öffnen/i }).click();
    await expect(
      page.getByRole("navigation", { name: /Mobile Navigation/i }),
    ).toBeVisible();
    await page.getByRole("link", { name: "Catering" }).first().click();
    await expect(page).toHaveURL("/catering");
  });

  test("courses listing page renders courses", async ({ page }) => {
    await page.goto("/aktuelle-kurse");
    await expect(
      page.getByRole("heading", { name: /Kurse & Events/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Feste Termine" })).toBeVisible();
  });
});

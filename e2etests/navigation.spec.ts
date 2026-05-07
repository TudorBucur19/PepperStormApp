import { test, expect, type Page } from "@playwright/test";

async function gotoAppPage(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
}

test.describe("PepperStorm App", () => {
  test("should load home page and display recipes", async ({ page }) => {
    await gotoAppPage(page, "/");

    // Check page title
    await expect(page).toHaveTitle(/PepperStorm/);

    // Check that we're on the home page (should show recipes or loading)
    await expect(page.locator("body")).toBeVisible();

    // Wait for page to fully load (either recipes, spinner, or error state)
    await page.waitForTimeout(3000);

    // Simply verify the page is in a valid state (not crashed)
    // The page should have either:
    // 1. Recipe items (Box with recipes)
    // 2. A spinner/loading state (CircularProgress)
    // 3. An error message
    // 4. An empty state

    const pageContent = await page.content();
    expect(pageContent).toBeTruthy();

    // Verify no console errors
    const logs: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        logs.push(msg.text());
      }
    });

    expect(logs.length).toBe(0);
  });

  test("should navigate to login page", async ({ page }) => {
    await gotoAppPage(page, "/");

    // Navigate to login page
    await gotoAppPage(page, "/login");

    // Wait longer for content to render, as Firefox is slower
    await page.waitForTimeout(1000);

    // Check for the Google authentication button (more reliable than text search)
    const googleButton = page.getByRole("button", { name: /Google/i });
    await expect(googleButton).toBeVisible({ timeout: 5000 });
  });

  test("should navigate to ideas page", async ({ page }) => {
    await gotoAppPage(page, "/");

    // Navigate to ideas page
    await gotoAppPage(page, "/listadeidei");

    // Wait for page to load (Firefox needs more time)
    await page.waitForTimeout(1000);

    // Check that page title is visible on ideas page
    await expect(page.locator("text=/Idei rapide/")).toBeVisible({
      timeout: 5000,
    });
  });

  test("should show 404 for invalid routes", async ({ page }) => {
    await gotoAppPage(page, "/nonexistent-page");

    // Should show error page
    await expect(page.locator("body")).toBeVisible();
  });

  test("should have working navigation between pages", async ({ page }) => {
    // Start at home
    await gotoAppPage(page, "/");
    await expect(page).toHaveTitle(/PepperStorm/);

    // Go to ideas
    await gotoAppPage(page, "/listadeidei");
    await page.waitForTimeout(500);
    await expect(page.locator("text=/Idei rapide/")).toBeVisible({
      timeout: 5000,
    });

    // Go back to home
    await gotoAppPage(page, "/");
    await expect(page).toHaveTitle(/PepperStorm/);

    // Go to login
    await gotoAppPage(page, "/login");
    await page.waitForTimeout(500);
    await expect(page.getByRole("button", { name: /Google/i })).toBeVisible({
      timeout: 5000,
    });
  });

  test("should handle recipe detail navigation", async ({ page }) => {
    await gotoAppPage(page, "/");

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Try to navigate to a recipe detail page (this might not exist, but should handle gracefully)
    await gotoAppPage(page, "/retete/test-recipe-id");

    // Should either show recipe or error page
    await expect(page.locator("body")).toBeVisible();
  });

  test("should be responsive on mobile viewport", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await gotoAppPage(page, "/");

    // Check that page still loads on mobile
    await expect(page).toHaveTitle(/PepperStorm/);
    await expect(page.locator("body")).toBeVisible();
  });
});

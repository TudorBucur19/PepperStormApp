import { test, expect, type Page } from "@playwright/test";

type E2EUser = {
  userID: string;
  displayName: string;
  email: string;
  photoURL: string;
};

const e2eUser: E2EUser = {
  userID: "e2e-user-id",
  displayName: "Playwright User",
  email: "playwright@example.com",
  photoURL: "https://example.com/avatar.png",
};

async function gotoAppPage(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
}

async function authenticateForE2E(page: Page, user: E2EUser = e2eUser) {
  await page.addInitScript((authUser) => {
    (
      window as Window & {
        __E2E_AUTH_USER__?: E2EUser | null;
      }
    ).__E2E_AUTH_USER__ = authUser;
  }, user);
}

test.describe("Add Recipe Form", () => {
  test("redirects unauthenticated users to login", async ({ page }) => {
    await gotoAppPage(page, "/adauga-reteta");

    await expect(page).toHaveURL(/\/login$/);
    await expect(
      page.getByRole("button", {
        name: /google/i,
      }),
    ).toBeVisible();
  });

  test("renders the add recipe form for authenticated users", async ({
    page,
  }) => {
    await authenticateForE2E(page);
    await gotoAppPage(page, "/adauga-reteta");

    await expect(page).toHaveURL(/\/adauga-reteta$/);
    await expect(page.getByText(/Detaliile re/i)).toBeVisible();
    await expect(page.getByText(/Ingrediente/i)).toBeVisible();
    await expect(page.getByLabel(/Titlu/i)).toBeVisible();
    await expect(page.getByLabel(/Por/i)).toBeVisible();
    await expect(page.getByLabel(/Timp de preparare/i)).toBeVisible();
    await expect(page.getByLabel(/Instruc/i)).toBeVisible();
    await expect(page.getByLabel(/Condimente/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /Salveaz/i })).toBeVisible();
  });

  test("adds and removes ingredient rows", async ({ page }) => {
    await authenticateForE2E(page);
    await gotoAppPage(page, "/adauga-reteta");

    const addIngredientButton = page.getByRole("button", {
      name: /Adaug.*ingredient/i,
    });
    const ingredientInputs = page.locator('input[name$=".ingredient"]');
    const quantityInputs = page.locator('input[name$=".quantity"]');

    await addIngredientButton.click();
    await expect(ingredientInputs).toHaveCount(1);
    await expect(quantityInputs).toHaveCount(1);

    await addIngredientButton.click();
    await expect(ingredientInputs).toHaveCount(2);

    await page
      .getByRole("button", { name: /Sterge ingredient/i })
      .nth(1)
      .click();
    await expect(ingredientInputs).toHaveCount(1);
  });

  test("shows validation errors for incomplete input", async ({ page }) => {
    await authenticateForE2E(page);
    await gotoAppPage(page, "/adauga-reteta");

    await page.getByRole("button", { name: /Salveaz/i }).click();

    await expect(page.getByText(/Titlul este prea scurt/i)).toBeVisible();

    await page.getByLabel(/Titlu/i).fill("a");
    await page.getByLabel(/Instruc/i).fill("abc");
    await page.getByRole("button", { name: /Salveaz/i }).click();

    await expect(page.getByText(/Titlul este prea scurt/i)).toBeVisible();
    await expect(page.getByText(/Adaug.*instruc/i)).toBeVisible();
  });
});

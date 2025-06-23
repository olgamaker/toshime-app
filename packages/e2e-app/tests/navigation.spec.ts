import { expect, test } from "@playwright/test";

// Test that the home page has a link to the receive page
// and that the navigation works correctly

test("can navigate to the receive page from home", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: /Start Receiving crypto/i }).click();
	await expect(page).toHaveURL("/receive");
	await expect(page.getByRole("heading", { name: /Receive/i })).toBeVisible();
});

// Test that the receive page displays the amount input

test("receive page shows amount input", async ({ page }) => {
	await page.goto("/receive");
	await expect(page.getByLabel("Amount (BTC)")).toBeVisible();
});

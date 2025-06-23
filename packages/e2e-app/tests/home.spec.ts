import { expect, test } from "@playwright/test";

test("home page shows welcome", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByText("Welcome to ToshiMe")).toBeVisible();
});

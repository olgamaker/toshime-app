import { expect, test } from "@playwright/test";

test("disclaimer accordion toggles", async ({ page }) => {
	await page.goto("/receive");
	const trigger = page.getByRole("button", {
		name: /why a new wallet address/i,
	});
	await expect(
		page.getByText("To help protect your privacy"),
	).not.toBeVisible();
	await trigger.click();
	await expect(page.getByText("To help protect your privacy")).toBeVisible();
});

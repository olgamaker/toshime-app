import { expect, test } from "@playwright/test";

// Submitting a valid amount should display a QR code.
// Closing the modal should reset the amount input.

test("submit amount and close modal resets input", async ({ page }) => {
	await page.goto("/receive");

	const amountInput = page.getByLabel("Amount (BTC)");
	await amountInput.fill("0.0001");

	await page.getByRole("button", { name: /confirm/i }).click();

	// The modal should appear with a heading "Receive"
	const dialog = page.getByRole("dialog");
	await expect(dialog).toBeVisible();
	await expect(dialog.getByRole("heading", { name: /receive/i })).toBeVisible();
	// QR code is rendered inside the dialog
	await expect(dialog.locator("svg").first()).toBeVisible();

	// Close the dialog
	await dialog.getByRole("button", { name: /close/i }).click();

	// The input should be reset to empty
	await expect(amountInput).toHaveValue("");
});

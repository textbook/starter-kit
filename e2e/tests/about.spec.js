import { test, expect } from "@playwright/test";

test("can be visited", async ({ page }) => {
	await page.goto("/nested/about/path");

	await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
});

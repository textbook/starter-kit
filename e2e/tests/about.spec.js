import { test, expect } from "./fixtures.js";

test("can be visited", async ({ page }) => {
	await page.goto("/nested/about/path");

	await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
});

test("meets a11y requirements", async ({ axe, page }) => {
	await page.goto("/nested/about/path");

	const { violations } = await axe.analyze();
	expect(violations).toHaveLength(0);
});

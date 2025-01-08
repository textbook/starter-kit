import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test("can be visited", async ({ page }) => {
	await page.goto("/nested/about/path");

	await expect(page.getByRole("heading", { level: 1 })).toHaveText("About");
});

test("meets a11y requirements", async ({ page }) => {
	await page.goto("/nested/about/path");
	const axeBuilder = new AxeBuilder({ page }).withTags("wcag2a");
	const { violations } = await axeBuilder.analyze();
	expect(violations).toHaveLength(0);
});

import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveTitle(/Vite \+ React/);
});

test("has Vite.js link", async ({ page }) => {
	await page.goto("/");

	await expect(page.getByRole("link", { name: "Vite logo" })).toHaveAttribute(
		"href",
		"https://vitejs.dev",
	);
});

test("shows server status", async ({ page }) => {
	await page.goto("/");

	await expect(page.getByText("Server says: Hello, world!")).toBeAttached();
});

test("meets a11y requirements", async ({ page }) => {
	await page.goto("/");
	const axeBuilder = new AxeBuilder({ page }).withTags("wcag2a");
	const { violations } = await axeBuilder.analyze();
	expect(violations).toHaveLength(0);
});

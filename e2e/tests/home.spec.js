import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveTitle(/Vite \+ React/);
});

test("Vite.js link", async ({ page }) => {
	await page.goto("");

	await expect(page.getByRole("link", { name: "Vite logo" })).toHaveAttribute(
		"href",
		"https://vitejs.dev",
	);
});

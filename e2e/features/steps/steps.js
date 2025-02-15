import { expect, Given, When, Then } from "./fixtures.js";

Given("I am on home page", async ({ page }) => {
	await page.goto("/");
});

Given("I am on about page", async ({ page }) => {
	await page.goto("/nested/about/path");
});

When("I click the {string} link", async ({ ctx, page }, name) => {
	ctx.newPageEvent = page.waitForEvent("popup");
	await page.getByRole("link", { name }).click();
});

Then("I am taken to {string}", async ({ ctx }, url) => {
	const newPage = await ctx.newPageEvent;
	await expect(newPage.url()).toBe(url);
});

Then("I see in heading {string}", async ({ page }, text) => {
	await expect(page.getByRole("heading", { level: 1 })).toHaveText(text);
});

Then("I see in page {string}", async ({ page }, text) => {
	await expect(page.getByText(text)).toBeAttached();
});

Then("I see in title {string}", async ({ page }, title) => {
	await expect(page).toHaveTitle(title);
});

Then("it meets accessibility guidelines", async ({ axe }) => {
	const { violations } = await axe.analyze();
	expect(violations).toHaveLength(0);
});

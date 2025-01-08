import AxeBuilder from "@axe-core/playwright";
import { test as base } from "@playwright/test";

/**
 * @typedef {import("@playwright/test").PlaywrightTestArgs & import("@playwright/test").PlaywrightTestOptions} T
 * @typedef {import("@playwright/test").PlaywrightWorkerArgs & import("@playwright/test").PlaywrightWorkerOptions} W
 */

/**
 * @type {import("@playwright/test").TestType<T & { a11yTags: string[]; axe: AxeBuilder }, W>}
 */
export const test = base.extend({
	a11yTags: [["wcag2a"], { option: true }],
	axe: async ({ a11yTags, page }, use) => {
		const axe = new AxeBuilder({ page }).withTags(a11yTags);
		await use(axe);
	},
});

export { expect } from "@playwright/test";

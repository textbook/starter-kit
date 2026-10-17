import { AxeBuilder } from "@axe-core/playwright";
import type {
	PlaywrightTestArgs,
	PlaywrightTestOptions,
	PlaywrightWorkerArgs,
	PlaywrightWorkerOptions,
	TestType,
} from "@playwright/test";
import { test as base } from "@playwright/test";

interface CustomFixtures {
	a11yTags: string[];
	axe: AxeBuilder;
}

export const test: TestType<
	PlaywrightTestArgs & PlaywrightTestOptions & CustomFixtures,
	PlaywrightWorkerArgs & PlaywrightWorkerOptions
> = base.extend({
	a11yTags: [["wcag2a"], { option: true }],
	axe: async ({ a11yTags, page }, use) => {
		const axe = new AxeBuilder({ page }).withTags(a11yTags);
		await use(axe);
	},
});

export { expect } from "@playwright/test";

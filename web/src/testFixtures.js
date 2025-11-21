import { setupWorker } from "msw/browser";
import { test as baseTest } from "vitest";
import { page, userEvent } from "vitest/browser";
import { render } from "vitest-browser-react";

export {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	suite,
} from "vitest";

/**
 * @typedef {object} AddedFixtures
 * @property {import("@vitest/browser-playwright/context").BrowserPage} page
 * @property {typeof render} render
 * @property {import("@vitest/browser-playwright/context").UserEvent} user
 * @property {import("msw/browser").SetupWorker} worker
 */

/**
 * @type {import("vitest").TestAPI<AddedFixtures>}
 */
export const test = baseTest.extend({
	async page({}, use) {
		await use(page);
	},
	async render({}, use) {
		await use(render);
	},
	async user({}, use) {
		await use(userEvent);
	},
	worker: [
		async ({}, use) => {
			const worker = setupWorker();
			await worker.start({ onUnhandledRequest: "error", quiet: true });
			await use(worker);
			worker.stop();
		},
		{ auto: true },
	],
});

export const it = test;

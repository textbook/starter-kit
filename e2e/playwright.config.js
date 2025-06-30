/* eslint-env node */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig, devices } from "@playwright/test";
import { configDotenv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));

configDotenv({
	path: resolve(__dirname, "..", process.env.DOTENV_CONFIG_PATH ?? ".env"),
	quiet: true,
});

/** @type {"ignore" | "pipe"} */
const logs =
	process.env.LOG_LEVEL?.toLowerCase() === "debug" ? "pipe" : "ignore";

const port = process.env.PORT ?? "3000";

export default defineConfig({
	testDir: "./tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${port}`,

		screenshot: "only-on-failure",

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: process.env.PLAYWRIGHT_BASE_URL
		? false
		: {
				command: process.env.PLAYWRIGHT_START_COMMAND ?? "npm run serve",
				cwd: resolve(__dirname, ".."),
				reuseExistingServer: false,
				stderr: logs,
				stdout: logs,
				url: `http://localhost:${port}/healthz`,
			},
});

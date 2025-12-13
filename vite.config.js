import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			all: true,
			exclude: [
				"api/migrations/**",
				"api/static/**",
				"api/__tests__/testUtils.js",
				"e2e/**",
				"linting/**",
				"web/src/testFixtures.js",
				...coverageConfigDefaults.exclude,
			],
			provider: "v8",
			reporter: ["text", "html", "lcovonly"],
			reportsDirectory: "./coverage",
		},
		projects: ["*/vite.config.js"],
	},
});

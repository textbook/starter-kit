import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			all: true,
			exclude: [
				"api/migrations/**",
				"api/static/**",
				"e2e/**",
				"linting/**",
				...coverageConfigDefaults.exclude,
			],
			provider: "v8",
			reporter: ["text", "html", "lcovonly"],
			reportsDirectory: "./coverage",
		},
		projects: ["*/vite.config.js"],
	},
});

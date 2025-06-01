import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			all: true,
			exclude: [
				"api/migrations/**",
				"api/static/**",
				"e2e/**",
				...coverageConfigDefaults.exclude,
      ],
			provider: "v8",
			reporter: ["text", "html", "lcovonly"],
			reportsDirectory: "./coverage",
		},
		workspace: ["*/vite.config.js"],
	},
});

import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			include: ["**/*.ts"],
			exclude: [
				"api/migrations/**",
				"api/static/**",
				"bin/**",
				"e2e/**",
				"linting/**",
				"**/__tests__/**",
				"**/*.config.ts",
				"**/*.test.ts",
				"**/setupTests.ts",
				...coverageConfigDefaults.exclude,
			],
			provider: "v8",
			reporter: ["text", "html", "lcovonly"],
			reportsDirectory: "./coverage",
		},
		projects: ["*/vite.config.[jt]s"],
	},
});

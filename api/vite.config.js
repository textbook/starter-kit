import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			all: true,
			exclude: [
				"migrations/**",
				"static/**",
				...coverageConfigDefaults.exclude,
			],
			provider: "v8",
			reporter: ["json", "text"],
		},
		environment: "node",
		fileParallelism: false,
		globals: true,
		setupFiles: ["./setupTests.js"],
	},
});

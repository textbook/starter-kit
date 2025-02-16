import { coverageConfigDefaults, defineConfig } from "vitest/config";

const reporters = [["json", { file: "api.json" }], "text"];

if (process.env.GITHUB_ACTIONS) {
	reporters.push("github-actions");
}

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
			reporters,
			reportsDirectory: "../.nyc_output",
		},
		environment: "node",
		fileParallelism: false,
		globals: true,
		setupFiles: ["./setupTests.js"],
	},
});

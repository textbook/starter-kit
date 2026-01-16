import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		deps: {
			interopDefault: false,
		},
		environment: "./__tests__/integrationEnvironment.js",
		fileParallelism: false,
		globals: true,
		setupFiles: ["./setupTests.js"],
	},
});

import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		deps: {
			interopDefault: false,
		},
		environment: "./__tests__/integrationEnvironment.js",
		environmentOptions: { integration: { image: "postgres:18-alpine" } },
		fileParallelism: false,
		globals: true,
		setupFiles: ["./setupTests.js"],
	},
});

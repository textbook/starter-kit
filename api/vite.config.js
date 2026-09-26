import { defineConfig, defineProject } from "vitest/config";

const integrationTests = ["./__tests__/*.test.js"];

export default defineConfig({
	test: {
		deps: {
			interopDefault: false,
		},
		globals: true,
		projects: [
			defineProject({
				extends: true,
				test: {
					name: "integration",
					environment: "./__tests__/integrationEnvironment.js",
					environmentOptions: { integration: { tag: "18-alpine" } },
					include: integrationTests,
					fileParallelism: false,
				},
			}),
			defineProject({
				extends: true,
				test: {
					name: "unit",
					environment: "node",
					exclude: integrationTests,
				},
			}),
		],
		setupFiles: ["./setupTests.js"],
	},
});

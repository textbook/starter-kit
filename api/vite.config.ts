import { defineConfig, defineProject } from "vitest/config";

const integrationTests = ["./__tests__/*.test.[jt]s"];

export default defineConfig({
	test: {
		deps: {
			interopDefault: false,
		},
		globals: false,
		projects: [
			defineProject({
				test: {
					name: "integration",
					environment: "./__tests__/integrationEnvironment.js",
					environmentOptions: { integration: { tag: "18-alpine" } },
					include: integrationTests,
					fileParallelism: false,
				},
			}),
			defineProject({
				test: {
					name: "unit",
					environment: "node",
					exclude: integrationTests,
				},
			}),
		],
		setupFiles: ["./setupTests.ts"],
	},
});

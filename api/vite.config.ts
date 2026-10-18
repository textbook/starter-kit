import { defineConfig, defineProject } from "vitest/config";

const integrationTests = ["./__tests__/**/*.test.ts"];

export default defineConfig({
	test: {
		deps: {
			interopDefault: false,
		},
		globals: true,
		projects: [
			defineProject({
				test: {
					name: "integration",
					environment: "./__tests__/integrationEnvironment.ts",
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

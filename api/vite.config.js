import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		deps: {
			interopDefault: false,
		},
		environment: "node",
		setupFiles: ["./setupTests.js"],
	},
});

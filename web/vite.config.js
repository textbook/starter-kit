import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

const apiPort = process.env.API_PORT ?? "3100";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "../api/static",
	},
	plugins: [react()],
	server: {
		port: process.env.PORT,
		proxy: {
			"/api": `http://localhost:${apiPort}`,
			"/healthz": `http://localhost:${apiPort}`,
		},
	},
	test: {
		coverage: {
			all: true,
			provider: "v8",
			reporter: [["json", { file: "web.json" }], ["text"]],
			reportsDirectory: "../.nyc_output",
		},
		environment: "jsdom",
		globals: true,
		setupFiles: ["src/setupTests.js"],
	},
});

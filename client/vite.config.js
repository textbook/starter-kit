/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const serverPort = process.env.SERVER_PORT ?? "3100";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "../server/static",
	},
	plugins: [react()],
	server: {
		port: process.env.PORT,
		proxy: {
			"/api": `http://localhost:${serverPort}`,
			"/healthz": `http://localhost:${serverPort}`,
		},
	},
	test: {
		coverage: {
			all: true,
			provider: "v8",
			reporter: [["json", { file: "client.json" }], ["text"]],
			reportsDirectory: "../.nyc_output",
		},
		environment: "jsdom",
		globals: true,
		setupFiles: ["src/setupTests.js"],
	},
});

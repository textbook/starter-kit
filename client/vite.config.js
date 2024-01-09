/* eslint-env node */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "../server/static",
	},
	plugins: [react()],
	server: {
		port: process.env.PORT,
	},
	test: {
		environment: "jsdom",
		setupFiles: [
			"src/setupTests.js",
		],
	},
});

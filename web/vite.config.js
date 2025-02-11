import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react-swc";
import { configDotenv } from "dotenv";
import { defineConfig } from "vitest/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

configDotenv({
	path: resolve(__dirname, "..", process.env.DOTENV_CONFIG_PATH ?? ".env"),
});

const apiPort = process.env.API_PORT ?? "3100";
const target = `http://localhost:${apiPort}`;
const port = process.env.PORT;
const proxy = Object.fromEntries(
	["/api", "/healthz"].map((path) => [
		path,
		{
			target,
			configure(proxy_) {
				if (process.env.LOG_LEVEL?.toLowerCase() === "debug") {
					proxy_.on("proxyReq", (_, req) => {
						console.debug("proxying %s %s --> %s", req.method, req.url, target);
					});
				}
			},
		},
	]),
);

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "../api/static",
	},
	plugins: [react()],
	server: { port, proxy },
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

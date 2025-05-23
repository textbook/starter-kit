import { resolve } from "node:path";

import buildInfo from "@textbook/build-info/rollup-plugin";
import react from "@vitejs/plugin-react-swc";
import { configDotenv } from "dotenv";
import { defineConfig } from "vitest/config";

configDotenv({
	path: resolve(
		import.meta.dirname,
		"..",
		process.env.DOTENV_CONFIG_PATH ?? ".env",
	),
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

export default defineConfig({
	build: {
		emptyOutDir: true,
		outDir: "../api/static",
	},
	plugins: [buildInfo({ filename: "buildinfo.txt" }), react()],
	server: { port, proxy, strictPort: true },
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["src/setupTests.js"],
	},
});

import express from "express";

import apiRouter from "./api.js";
import { connectDb, disconnectDb, testConnection } from "./db.js";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import {
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware.js";

const API_ROOT = "/api";

const app = express();
/** @type {import("node:http").Server} */
let server;

app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.get("/healthz", async (_, res) => {
	await testConnection();
	res.sendStatus(200);
});

app.use(API_ROOT, apiRouter);

app.use(clientRouter(API_ROOT));

app.use(logErrors());

export function start(port) {
	connectDb().then(() => {
		server = app.listen((err) => {
			if (err) {
				throw err;
			}
			logger.info("listening on %d", port);
		});
		["SIGINT", "SIGTERM"].forEach((event) => process.on(event, stop));
	});
}

export function stop() {
	disconnectDb().then(() => {
		if (server?.listening) {
			logger.debug("stopping server");
			server.close((err) => {
				if (err) {
					logger.error("%O", err);
				}
				logger.info("server stopped");
			});
		}
	});
}

export default app;

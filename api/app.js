import express from "express";

import config from "./utils/config.cjs";

const API_ROOT = "/api";

/** @type {import("express").Application} */
let app;

export default async function createApp() {
	if (app) {
		return app;
	}

	const middleware = await import("./utils/middleware.js");

	app = express();

	app.use(express.json());
	app.use(middleware.configuredHelmet());
	app.use(middleware.configuredMorgan());

	if (config.production) {
		app.enable("trust proxy");
		app.use(middleware.httpsOnly());
	}

	const { testConnection } = await import("./db.js");
	app.get(
		"/healthz",
		middleware.asyncHandler(async (_, res) => {
			await testConnection();
			res.sendStatus(200);
		}),
	);

	const { default: apiRouter } = await import("./api.js");
	app.use(API_ROOT, apiRouter);

	app.use(middleware.clientRouter(API_ROOT));

	app.use(middleware.logErrors());

	return app;
}

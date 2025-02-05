import express from "express";

import apiRouter from "./api.js";
import { testConnection } from "./db.js";
import config from "./utils/config.cjs";
import {
	asyncHandler,
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware.js";

const API_ROOT = "/api";

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.get(
	"/healthz",
	asyncHandler(async (_, res) => {
		await testConnection();
		res.sendStatus(200);
	}),
);

app.use(API_ROOT, apiRouter);

app.use(clientRouter(API_ROOT));

app.use(logErrors());

export default app;

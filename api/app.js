import express from "express";

import apiRouter from "./api.js";
import { testConnection } from "./db.js";
import config from "./utils/config.js";
import {
	asyncHandler,
	clientRouter,
	configuredHelmet,
	configuredMorgan,
	httpsOnly,
	logErrors,
} from "./utils/middleware.js";

const apiRoot = "/api";
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

app.use(apiRoot, apiRouter);

app.use(clientRouter(apiRoot));

app.use(logErrors());

export default app;

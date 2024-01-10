import express from "express";

import config from "./utils/config.js";
import { clientRouter, configuredHelmet, configuredMorgan, httpsOnly } from "./utils/middleware.js";

const app = express();

app.use(express.json());
app.use(configuredHelmet());
app.use(configuredMorgan());

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.get("/healthz", (_, res) => res.sendStatus(200));

app.use(clientRouter("/api"));

export default app;

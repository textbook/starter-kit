import { join, resolve } from "node:path";

import type { ErrorRequestHandler, Request, RequestHandler } from "express";
import express, { Router } from "express";
import helmet from "helmet";
import morgan from "morgan";

import logger from "./logger.ts";

export const clientRouter = (apiRoot: string): Router => {
	const staticDir = resolve(import.meta.dirname, "..", "static");
	const router = Router();
	router.use(express.static(staticDir));
	router.use((req, res, next) => {
		if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
			res.sendFile(join(staticDir, "index.html"));
			return;
		}
		next();
	});
	return router;
};

export const configuredHelmet = (): RequestHandler =>
	helmet({ contentSecurityPolicy: false });

export const configuredMorgan = (): RequestHandler =>
	morgan("dev", {
		skip(req) {
			return "container-healthcheck" in req.headers && isHealthcheck(req);
		},
		stream: { write: (message) => logger.info(message.trim()) },
	});

export const httpsOnly = (): RequestHandler => (req, res, next) => {
	if (req.secure || isHealthcheck(req)) {
		next();
		return;
	}
	res.redirect(301, `https://${req.headers.host as string}${req.originalUrl}`);
};

export const logErrors = (): ErrorRequestHandler => (err, _, res, next) => {
	if (res.headersSent) {
		next(err);
		return;
	}
	logger.error("%O", err);
	res.sendStatus(500);
};

/** Whether the request is a `GET /healthz` */
function isHealthcheck(req: Request): boolean {
	return req.path === "/healthz" && req.method === "GET";
}

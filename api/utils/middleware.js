import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import express, { Router } from "express";
import helmet from "helmet";
import morgan from "morgan";

import logger from "./logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const asyncHandler = (handler) => {
	/** @type {import("express").RequestHandler} */
	return async (req, res, next) => {
		try {
			await handler(req, res, () => {
				logger.warn("async handlers should not call next");
			});
			if (!res.headersSent) {
				logger.warn("async handlers should send responses");
			}
			next();
		} catch (err) {
			next(err);
		}
	};
};

export const clientRouter = (apiRoot) => {
	const staticDir = resolve(__dirname, "..", "static");
	const router = Router();
	router.use(express.static(staticDir));
	router.use((req, res, next) => {
		if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
			return res.sendFile(join(staticDir, "index.html"));
		}
		next();
	});
	return router;
};

export const configuredHelmet = () => helmet({ contentSecurityPolicy: false });

export const configuredMorgan = () =>
	morgan("dev", {
		stream: { write: (message) => logger.info(message.trim()) },
	});

export const httpsOnly = () => (req, res, next) => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

/** @type {() => import("express").ErrorRequestHandler} */
export const logErrors = () => (err, _, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	logger.error("%O", err);
	res.sendStatus(500);
};

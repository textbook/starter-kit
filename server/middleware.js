import helmet from "helmet";
import path from "path";
import morgan from "morgan";

import logger from "./logger";

export const configuredHelmet = () => helmet({
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'"],
			objectSrc: ["'none'"],
			scriptSrc: ["'self'", "unpkg.com", "polyfill.io"],
			styleSrc: ["'self'", "https: 'unsafe-inline'"],
			upgradeInsecureRequests: [],
		},
	},
});

export const configuredMorgan = () => morgan("dev", { stream: { write: (message) => logger.info(message.trim()) } });

export const httpsOnly = () => (req, res, next) => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const logErrors = () => (err, _, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	logger.error("%O", err);
	res.sendStatus(500);
};

export const pushStateRouting = (apiRoot, staticDir) => (req, res, next) => {
	if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
};

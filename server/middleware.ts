import { NextFunction, Request, Response } from "express";
import path from "path";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const httpsOnly = (): Middleware => (req, res, next) => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const pushStateRouting = (apiRoot: string, staticDir: string): Middleware => (req, res, next) => {
	if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
};

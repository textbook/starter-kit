import http from "http";

import app from "./app";
import config from "./config";
import { connectDb, disconnectDb } from "./db";
import logger from "./logger";

const server = http.createServer(app);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	logger.info("Listening on %s", bind);
});

process.on("SIGTERM", () => server.close(() => disconnectDb()));

connectDb().then(() => server.listen(config.port));

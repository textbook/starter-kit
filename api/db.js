import { default as pg } from "pg";

import config from "./utils/config.js";
import logger from "./utils/logger.js";

const pool = new pg.Pool({
	connectionString: config.databaseUrl,
	connectionTimeoutMillis: 5_000,
});

pool.on("error", (err) => logger.error("%O", err));

export const connect = async () => {
	const client = await pool.connect();
	logger.info("connected to %s", client.database);
	client.release();
};

export const disconnect = async () => await pool.end();

export default {
	query(...args) {
		logger.debug("Postgres query: %O", args);
		return pool.query.apply(pool, args);
	},
};

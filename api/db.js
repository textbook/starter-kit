import pg from "pg";

import logger from "./utils/logger.js";

/** @type {pg.Pool} */
let pool;

/**
 * @param {import("pg").ClientConfig} config
 */
export const connectDb = async (config) => {
	pool = new pg.Pool(config);
	pool.on("error", (err) => logger.error("%O", err));
	const client = await pool.connect();
	logger.info("connected to %s", client.database);
	client.release();
};

export const disconnectDb = async () => {
	if (pool) {
		await pool.end();
	}
};

export default {
	query(...args) {
		logger.debug("Postgres query: %O", args);
		return pool.query.apply(pool, args);
	},
};

import pg from "pg";

import config from "./utils/config.js";
import logger from "./utils/logger.js";

/** @type {pg.Pool} */
let pool;

export const connectDb = async () => {
	pool = new pg.Pool(config.dbConfig);
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

export const testConnection = async () => {
	await query("SELECT 1;");
};

function query(...args) {
	logger.debug("Postgres query: %O", args);
	return pool.query.apply(pool, args);
}

export default { query };

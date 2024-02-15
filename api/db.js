import pg from "pg";

import config from "./utils/config.cjs";
import logger from "./utils/logger.js";

const pool = new pg.Pool(config.dbConfig);

pool.on("error", (err) => logger.error("%O", err));

export const connectDb = async () => {
	const client = await pool.connect();
	logger.info("connected to %s", client.database);
	client.release();
};

export const disconnectDb = async () => await pool.end();

export default {
	query(...args) {
		logger.debug("Postgres query: %O", args);
		return pool.query.apply(pool, args);
	},
};

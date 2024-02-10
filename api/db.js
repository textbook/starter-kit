import pg from "pg";

import config from "./utils/config.js";
import logger from "./utils/logger.js";

const databaseUrl = new URL(config.databaseUrl);

const localDb = ["0.0.0.0", "127.0.0.1", "localhost"].includes(
	databaseUrl.hostname,
);
const sslMode = ["prefer", "require", "verify-ca", "verify-full"].includes(
	databaseUrl.searchParams.get("sslmode") ?? "none",
);

const pool = new pg.Pool({
	connectionString: databaseUrl.toString(),
	connectionTimeoutMillis: 5_000,
	ssl: localDb ? false : { rejectUnauthorized: sslMode },
});

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

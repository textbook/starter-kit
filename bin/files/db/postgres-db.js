import { Pool } from "pg";

import config from "./config";
import logger from "./logger";

const pool = new Pool({
	connectionString: config.dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: config.dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		logger.error("%O", err);
		process.exit(1);
	}
	logger.info("Postgres connected to %s", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

export default { query: pool.query.bind(pool) };

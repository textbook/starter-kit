import { basename } from "node:path";

import { runner } from "node-pg-migrate";
import pg from "pg";

import config from "./utils/config.js";
import logger from "./utils/logger.js";

/** @type {import("pg").Pool | null} */
let pool = null;

/**
 * Apply migrations to bring the database up-to-date.
 * @param {import("./utils/config.js").default["migrationConfig"]} migrationConfig
 * @returns {Promise<void>}
 */
export async function applyMigrations(migrationConfig) {
	await runner({ ...migrationConfig, direction: "up" });
}

export const connectDb = async () => {
	pool = new pg.Pool(config.dbConfig);
	pool.on("error", (err) => logger.error("%O", err));
	const client = await pool.connect();
	logger.info("connected to %s", databaseName());
	client.release();
};

export const disconnectDb = async () => {
	if (pool) {
		logger.debug("disconnecting from %s", databaseName());
		await pool.end();
		pool = null;
	}
};

export const testConnection = async () => {
	await query("SELECT 1;");
};

function query(...args) {
	if (pool === null) {
		throw new Error("cannot query without establishing connection");
	}
	logger.debug("Postgres query: %O", args);
	return pool.query.apply(pool, args);
}

export default { query };

/**
 * @returns {string}
 */
function databaseName() {
	const connectionUri = new URL(config.dbConfig.connectionString);
	return basename(connectionUri.pathname);
}

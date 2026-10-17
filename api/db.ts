import { basename } from "node:path";

import { runner } from "node-pg-migrate";
import type {
	Pool,
	QueryConfig,
	QueryConfigValues,
	QueryResult,
	QueryResultRow,
} from "pg";
import pg from "pg";

import type { Config } from "./utils/config.ts";
import config from "./utils/config.ts";
import logger from "./utils/logger.ts";

let pool: Pool | null = null;

/** Apply migrations to bring the database up-to-date. */
export async function applyMigrations(
	migrationConfig: Config["migrationConfig"],
): Promise<void> {
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

function query<T extends QueryResultRow, I = unknown>(
	config: QueryConfig | string,
	values?: QueryConfigValues<I>,
): Promise<QueryResult<T>> {
	if (pool === null) {
		throw new Error("cannot query without establishing connection");
	}
	logger.debug("Postgres query: %O", [config, ...(values ? [values] : [])]);
	return pool.query(config, values);
}

export default { query };

function databaseName(): string {
	const connectionUri = new URL(config.dbConfig.connectionString as string);
	return basename(connectionUri.pathname);
}

import { resolve } from "node:path";

import { configDotenv } from "dotenv";

import logger from "./logger.js";

/**
 * @typedef Config
 * @property {import("pg").ClientConfig} dbConfig
 * @property {string} dotenvPath
 * @property {(overrides?: Record<string, string>) => Config} init
 * @property {string} logLevel
 * @property {Omit<RunnerOption & RunnerOptionUrl, "direction">} migrationConfig
 * @property {number} port
 * @property {boolean} production
 * @property {boolean} timestamp
 * @property {string=} timestampFormat
 *
 * @typedef {import("node-pg-migrate/dist/runner.js").RunnerOption} RunnerOption
 * @typedef {import("node-pg-migrate/dist/runner.js").RunnerOptionUrl} RunnerOptionUrl
 */

const REQUIRED_ARGS = ["DATABASE_URL"];

/**
 * @params {Record<string, string>} overrides
 * @returns {Omit<Config, "init">}
 */
const createConfig = (overrides) => {
	const dotenvPath = resolve(
		import.meta.dirname,
		"..",
		"..",
		process.env.DOTENV_CONFIG_PATH ?? ".env",
	);
	const migrationsDir = resolve(import.meta.dirname, "..", "migrations");

	configDotenv({ path: dotenvPath, quiet: true });

	const source = { ...process.env, ...overrides };

	requireArgs(source, REQUIRED_ARGS);

	const dbConfig = createDbConfig(source);

	return {
		dbConfig,
		dotenvPath,
		logLevel: source.LOG_LEVEL?.toLowerCase() ?? "info",
		migrationConfig: {
			databaseUrl: dbConfig,
			dir: migrationsDir,
			ignorePattern: "(migrate|template)\\.js$",
			logger,
			migrationsTable: "migrations",
			verbose: true,
		},
		port: parseInt(source.PORT ?? "3000", 10),
		production: source.NODE_ENV?.toLowerCase() === "production",
		timestamp:
			source.TIMESTAMP?.toLowerCase() === "true" || !!source.TIMESTAMP_FORMAT,
		timestampFormat: source.TIMESTAMP_FORMAT,
	};
};

/** @type {Config} */
const config = new Proxy(
	{ config: undefined },
	{
		get(target, prop) {
			if (prop === "init") {
				return (overrides) => (target.config = createConfig(overrides));
			}
			if (target.config === undefined) {
				throw new Error("config accessed before initialisation");
			}
			return target.config[prop];
		},
	},
);

export default config;

/**
 * @param {Record<string, string>} source
 * @returns {Config["dbConfig"]}
 */
function createDbConfig(source) {
	const databaseUrl = new URL(source.DATABASE_URL);

	const localDb = [
		"0.0.0.0",
		"127.0.0.1",
		"localhost",
		"host.docker.internal",
	].includes(databaseUrl.hostname);
	const sslMode = databaseUrl.searchParams.get("sslmode") ?? source.PGSSLMODE;

	return {
		connectionString: databaseUrl.toString(),
		connectionTimeoutMillis: 5_000,
		ssl:
			localDb || sslMode === "disable"
				? false
				: {
						rejectUnauthorized: [
							"prefer",
							"require",
							"verify-ca",
							"verify-full",
						].includes(sslMode),
					},
	};
}

/**
 * @param {Record<string, string>} source
 * @param {string[]} required
 */
function requireArgs(source, required) {
	const missing = required.filter((variable) => !process.env[variable]);
	if (missing.length > 0) {
		process.exitCode = 1;
		throw new Error(
			`missing required environment variable(s): ${missing.join(", ")}`,
		);
	}
}

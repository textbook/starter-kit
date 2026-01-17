import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { configDotenv } from "dotenv";

import logger from "./logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
 * @property {string} [timestampFormat]
 *
 * @typedef {import("node-pg-migrate/dist/runner.js").RunnerOption} RunnerOption
 * @typedef {import("node-pg-migrate/dist/runner.js").RunnerOptionUrl} RunnerOptionUrl
 */

const MIGRATIONS_DIR = resolve(__dirname, "..", "migrations");
const REQUIRED_ARGS = ["DATABASE_URL"];

/**
 * @param {Record<string, string>} [overrides]
 * @returns {Omit<Config, "init">}
 */
const createConfig = (overrides) => {
	const source = { ...process.env, ...overrides };

	const dotenvPath = resolve(
		__dirname,
		"..",
		"..",
		source.DOTENV_CONFIG_PATH ?? ".env",
	);

	configDotenv({ path: dotenvPath, processEnv: source, quiet: true });

	requireArgs(source, REQUIRED_ARGS);

	const dbConfig = createDbConfig(source);

	return {
		dbConfig,
		dotenvPath,
		logLevel: source.LOG_LEVEL?.toLowerCase() ?? "info",
		migrationConfig: {
			databaseUrl: dbConfig,
			dir: MIGRATIONS_DIR,
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

/**
 * Defer creation of objects requiring configuration until they're first used.
 * @template T
 * @param {(config: Config) => T} factory
 * @returns {T}
 */
export function withConfig(factory) {
	return new Proxy(
		{ _proxied: undefined },
		{
			get(target, prop) {
				if (target._proxied === undefined) {
					target._proxied = factory(config);
				}
				return target._proxied[prop];
			},
		},
	);
}

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
 * @property {string[]} missing
 */
export class MissingRequiredEnvVars extends Error {
	/**
	 * @param {string[]} missing
	 */
	constructor(missing) {
		super(
			`missing required env var${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`,
		);
		this.missing = missing;
	}
}

/**
 * @param {Record<string, string>} source
 * @param {string[]} required
 */
function requireArgs(source, required) {
	const missing = required.filter((variable) => !process.env[variable]);
	if (missing.length > 0) {
		process.exitCode = 1;
		throw new MissingRequiredEnvVars(missing);
	}
}

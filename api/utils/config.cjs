const { join, resolve } = require("node:path");

const { configDotenv } = require("dotenv");

/**
 * @typedef Config
 * @property {import("pg").ClientConfig} dbConfig
 * @property {string} dotenvPath
 * @property {string} logLevel
 * @property {{
 *   "ignore-pattern": string;
 *   "migrations-dir": string;
 *   "template-file-name": string;
 *   url: import("pg").ClientConfig;
 * }} migrationConfig
 * @property {number} port
 * @property {boolean} production
 * @property {boolean} timestamp
 * @property {string=} timestampFormat
 */

const REQUIRED_ARGS = ["DATABASE_URL"];

/**
 * @returns {Config}
 */
const createConfig = () => {
	const dotenvPath = resolve(
		join(__dirname, "..", "..", process.env.DOTENV_CONFIG_PATH ?? ".env"),
	);
	const migrationsDir = resolve(join(__dirname, "..", "migrations"));

	configDotenv({ path: dotenvPath });

	const source = process.env;

	requireArgs(source, REQUIRED_ARGS);

	const dbConfig = createDbConfig(source);

	return {
		dbConfig: dbConfig,
		dotenvPath,
		logLevel: source.LOG_LEVEL?.toLowerCase() ?? "info",
		migrationConfig: {
			"ignore-pattern": "(config|template)\\.cjs$",
			"migrations-dir": migrationsDir,
			"template-file-name": join(migrationsDir, "template.cjs"),
			url: dbConfig,
		},
		port: parseInt(source.PORT ?? "3000", 10),
		production: source.NODE_ENV?.toLowerCase() === "production",
		timestamp:
			source.TIMESTAMP?.toLowerCase() === "true" || !!source.TIMESTAMP_FORMAT,
		timestampFormat: source.TIMESTAMP_FORMAT,
	};
};

module.exports = createConfig();

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
	const sslMode = ["prefer", "require", "verify-ca", "verify-full"].includes(
		databaseUrl.searchParams.get("sslmode") ?? source.PGSSLMODE,
	);

	return {
		connectionString: databaseUrl.toString(),
		connectionTimeoutMillis: 5_000,
		ssl: localDb ? false : { rejectUnauthorized: sslMode },
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

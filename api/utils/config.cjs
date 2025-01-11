const { join, resolve } = require("node:path");

const { configDotenv } = require("dotenv");

const dotenvPath = resolve(
	join(__dirname, "..", "..", process.env.DOTENV_CONFIG_PATH ?? ".env"),
);

configDotenv({ path: dotenvPath });

requireArgs(["DATABASE_URL"]);

const databaseUrl = new URL(process.env.DATABASE_URL);

const localDb = [
	"0.0.0.0",
	"127.0.0.1",
	"localhost",
	"host.docker.internal",
].includes(databaseUrl.hostname);
const sslMode = ["prefer", "require", "verify-ca", "verify-full"].includes(
	databaseUrl.searchParams.get("sslmode") ?? process.env.PGSSLMODE,
);

/**
 * @property {import("pg").ClientConfig} dbConfig
 * @property {string} dotenvPath
 * @property {string} logLevel
 * @property {number} port
 * @property {boolean} production
 * @property {boolean} timestamp
 * @property {string=} timestampFormat
 */
module.exports = {
	dbConfig: {
		connectionString: databaseUrl.toString(),
		connectionTimeoutMillis: 5_000,
		ssl: localDb ? false : { rejectUnauthorized: sslMode },
	},
	dotenvPath,
	logLevel: process.env.LOG_LEVEL?.toLowerCase() ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV?.toLowerCase() === "production",
	timestamp:
		process.env.TIMESTAMP?.toLowerCase() === "true" ||
		!!process.env.TIMESTAMP_FORMAT,
	timestampFormat: process.env.TIMESTAMP_FORMAT,
};

function requireArgs(required) {
	const missing = required.filter((variable) => !process.env[variable]);
	if (missing.length > 0) {
		process.exitCode = 1;
		throw new Error(
			`missing required environment variable(s): ${missing.join(", ")}`,
		);
	}
}

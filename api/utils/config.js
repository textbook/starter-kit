/* eslint-disable no-restricted-syntax */
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { configDotenv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dotenvPath = resolve(
	join(__dirname, "..", "..", process.env.DOTENV_CONFIG_PATH ?? ".env"),
);

configDotenv({ path: dotenvPath });

requireArgs(["DATABASE_URL"]);

/**
 * @property {URL} databaseUrl
 * @property {string} dotenvPath
 * @property {string} logLevel
 * @property {number} port
 * @property {boolean} production
 */
export default {
	databaseUrl: process.env.DATABASE_URL,
	dotenvPath,
	logLevel: process.env.LOG_LEVEL?.toLowerCase() ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV?.toLowerCase() === "production",
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

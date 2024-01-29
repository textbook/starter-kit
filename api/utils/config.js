/* eslint-disable no-restricted-syntax */
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { configDotenv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dotenvPath = resolve(
	join(__dirname, "..", "..", process.env.DOTENV_CONFIG_PATH ?? ".env"),
);

configDotenv({ path: dotenvPath });

/**
 * @property {string} dotenvPath
 * @property {string} logLevel
 * @property {number} port
 * @property {boolean} production
 */
export default {
	dotenvPath,
	logLevel: process.env.LOG_LEVEL?.toLowerCase() ?? "info",
	port: parseInt(process.env.PORT ?? "3000", 10),
	production: process.env.NODE_ENV?.toLowerCase() === "production",
};

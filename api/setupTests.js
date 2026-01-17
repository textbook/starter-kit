import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { connectDb, disconnectDb } from "./db.js";
import config, { MissingRequiredEnvVars } from "./utils/config.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEST_DOTENV_PATH = resolve(__dirname, "__tests__", "test.env");

beforeAll(async () => {
	try {
		config.init({
			DOTENV_CONFIG_PATH: TEST_DOTENV_PATH,
			...global.configOverrides,
		});
	} catch (err) {
		if (err instanceof MissingRequiredEnvVars) {
			throw new Error(
				`${err.message}\nadd required environment variables to ${TEST_DOTENV_PATH}`,
			);
		}
		throw err;
	}
	if (global.useDb) {
		await connectDb();
	}
});

afterAll(async () => {
	if (global.useDb) {
		await disconnectDb();
	}
});

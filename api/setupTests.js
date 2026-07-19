import { resolve } from "node:path";

import { connectDb, disconnectDb } from "./db.js";
import config, { MissingRequiredEnvVars } from "./utils/config.js";

const TEST_DOTENV_PATH = resolve(import.meta.dirname, "__tests__", "test.env");

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

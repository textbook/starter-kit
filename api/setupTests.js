import { connectDb, disconnectDb } from "./db.js";
import config from "./utils/config.js";

beforeAll(async () => {
	if ("configOverrides" in global) {
		config.init(global.configOverrides);
		await connectDb();
	}
});

afterAll(async () => {
	await disconnectDb();
});

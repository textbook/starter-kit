import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { runner } from "node-pg-migrate";

import { connectDb, disconnectDb } from "./db.js";
import config from "./utils/config.cjs";

/** @type {import("@testcontainers/postgresql").StartedPostgreSqlContainer} */
let dbContainer;

beforeAll(async () => {
	dbContainer = await new PostgreSqlContainer().start();
	config.init({ DATABASE_URL: dbContainer.getConnectionUri() });
	await applyMigrations();
	await connectDb();
}, 60_000);

afterAll(async () => {
	await disconnectDb();
	if (dbContainer) {
		await dbContainer.stop();
	}
});

async function applyMigrations() {
	await runner({
		databaseUrl: config.migrationConfig.url,
		dir: config.migrationConfig["migrations-dir"],
		direction: "up",
		ignorePattern: config.migrationConfig["ignore-pattern"],
	});
}

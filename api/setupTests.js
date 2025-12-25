import { PostgreSqlContainer } from "@testcontainers/postgresql";

import { applyMigrations, connectDb, disconnectDb } from "./db.js";
import config from "./utils/config.js";

/** @type {import("@testcontainers/postgresql").StartedPostgreSqlContainer} */
let dbContainer;

beforeAll(async () => {
	dbContainer = await new PostgreSqlContainer("postgres:17-alpine").start();
	const url = new URL(dbContainer.getConnectionUri());
	url.searchParams.set("sslmode", url.searchParams.get("sslmode") ?? "disable");
	const { migrationConfig } = config.init({
		DATABASE_URL: url.toString(),
		PORT: "0",
	});
	await applyMigrations(migrationConfig);
	await connectDb();
}, 60_000);

afterAll(async () => {
	await disconnectDb();
	if (dbContainer) {
		await dbContainer.stop();
	}
});

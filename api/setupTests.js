import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { runner } from "node-pg-migrate";

import { connectDb, disconnectDb } from "./db.js";
import config from "./utils/config.js";

/** @type {import("@testcontainers/postgresql").StartedPostgreSqlContainer} */
let dbContainer;

beforeAll(async () => {
	dbContainer = await new PostgreSqlContainer("postgres:17-alpine").start();
	const url = new URL(dbContainer.getConnectionUri());
	url.searchParams.set("sslmode", url.searchParams.get("sslmode") ?? "disable");
	config.init({ DATABASE_URL: url.toString(), PORT: "0" });
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
	await runner({ ...config.migrationConfig, direction: "up" });
}

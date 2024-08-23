import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { runner } from "node-pg-migrate";

import { connectDb, disconnectDb } from "./db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import("@testcontainers/postgresql").StartedPostgreSqlContainer} */
let dbContainer;

beforeAll(async () => {
	dbContainer = await new PostgreSqlContainer().start();
	const connectionString = dbContainer.getConnectionUri();
	await applyMigrations(connectionString);
	await connectDb({ connectionString });
}, 60_000);

afterAll(async () => {
	await disconnectDb();
	if (dbContainer) {
		await dbContainer.stop();
	}
});

async function applyMigrations(databaseUrl) {
	await runner({
		databaseUrl,
		dir: join(__dirname, "migrations"),
		direction: "up",
		ignorePattern: "(config|template)\\.cjs$",
	});
}

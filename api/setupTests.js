import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { MongoDBContainer } from "@testcontainers/mongodb";
import { config, database, up } from "migrate-mongo";

import { connectDb, disconnectDb } from "./db.js";
import logger from "./utils/logger.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import("@testcontainers/mongodb").StartedMongoDBContainer} */
let dbContainer;

beforeAll(async () => {
	dbContainer = await new MongoDBContainer().start();
	const connectionString = dbContainer.getConnectionString();
	await applyMigrations(connectionString);
	await connectDb(connectionString, { directConnection: true });
}, 60_000);

afterAll(async () => {
	await disconnectDb();
	if (dbContainer) {
		await dbContainer.stop();
	}
});

async function applyMigrations(url) {
	config.set({
		changelogCollectionName: "changelog",
		migrationFileExtension: ".js",
		migrationsDir: join(__dirname, "migrations"),
		mongodb: { url, options: { directConnection: true } },
		useFileHash: false,
	});
	const { db, client } = await database.connect();
	const migrations = await up(db, client);
	await client.close();
	for (const migration of migrations) {
		logger.info("Run migration: %s", migration);
	}
}

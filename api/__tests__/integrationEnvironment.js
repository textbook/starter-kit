import { PostgreSqlContainer } from "@testcontainers/postgresql";

import { applyMigrations } from "../db.js";
import config from "../utils/config.js";

/** @type {import("vitest/environments").Environment} */
const environment = {
	name: "integration",
	async setup(global, options) {
		const { tag = "latest" } = options[this.name] ?? {};
		const dbContainer = await new PostgreSqlContainer(
			`postgres:${tag}`,
		).start();
		const overrides = {
			DATABASE_URL: connectionString(dbContainer),
			PORT: "0",
		};
		global.configOverrides = overrides;
		global.useDb = true;
		const { migrationConfig } = config.init(overrides);
		await applyMigrations(migrationConfig);

		return {
			async teardown() {
				await dbContainer.stop();
			},
		};
	},
	viteEnvironment: "ssr",
};

/**
 * @param {import("@testcontainers/postgresql").StartedPostgreSqlContainer} container
 * @returns {string}
 */
function connectionString(container) {
	const url = new URL(container.getConnectionUri());
	url.searchParams.set("sslmode", url.searchParams.get("sslmode") ?? "disable");
	return url.toString();
}

export default environment;

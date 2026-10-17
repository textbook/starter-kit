import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { PostgreSqlContainer } from "@testcontainers/postgresql";

import { applyMigrations } from "../db.js";
import config from "../utils/config.ts";

interface Globals {
	configOverrides: Record<string, string>;
	useDb: boolean;
}

interface Options {
	tag?: string;
}

interface Environment {
	name: string;
	setup(
		global: Globals,
		options: Record<string, Options>,
	): Promise<{ teardown(): Promise<void> }>;
	viteEnvironment: "client" | "ssr";
}

const environment: Environment = {
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

function connectionString(container: StartedPostgreSqlContainer): string {
	const url = new URL(container.getConnectionUri());
	url.searchParams.set("sslmode", url.searchParams.get("sslmode") ?? "disable");
	return url.toString();
}

export default environment;

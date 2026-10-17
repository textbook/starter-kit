import { resolve } from "node:path";

import { configDotenv } from "dotenv";
import type { RunnerOption } from "node-pg-migrate";
import type { ClientConfig } from "pg";

import logger from "./logger.ts";

const __dirname = import.meta.dirname;

interface ConfigProps {
	colorize: boolean;
	dbConfig: ClientConfig;
	dotenvPath: string;
	logLevel: string;
	migrationConfig: Omit<
		RunnerOption & { databaseUrl: ClientConfig },
		"direction"
	>;
	port: number;
	production: boolean;
	timestamp: boolean;
	timestampFormat?: string;
}

export interface Config extends ConfigProps {
	init(overrides?: Record<string, string>): Config;
}

const MIGRATIONS_DIR = resolve(__dirname, "..", "migrations");
const REQUIRED_ARGS = ["DATABASE_URL"] as const;

type ValidatedSource = Record<(typeof REQUIRED_ARGS)[number], string> &
	Record<string, string | undefined>;

const createConfig = (overrides?: Record<string, string>): ConfigProps => {
	const source = { ...process.env, ...overrides };

	const dotenvPath = resolve(
		__dirname,
		"..",
		"..",
		source.DOTENV_CONFIG_PATH ?? ".env",
	);

	configDotenv({
		fast: true,
		path: dotenvPath,
		processEnv: source,
		quiet: true,
	});

	requireArgs(source, REQUIRED_ARGS);

	const dbConfig = createDbConfig(source);

	return {
		colorize: !source.NO_COLOR,
		dbConfig,
		dotenvPath,
		logLevel: source.LOG_LEVEL?.toLowerCase() ?? "info",
		migrationConfig: {
			databaseUrl: dbConfig,
			dir: MIGRATIONS_DIR,
			ignorePattern: String.raw`(migrate|template)\.js$`,
			logger,
			migrationsTable: "migrations",
			verbose: true,
		},
		port: Number.parseInt(source.PORT ?? "3000", 10),
		production: source.NODE_ENV?.toLowerCase() === "production",
		timestamp:
			source.TIMESTAMP?.toLowerCase() === "true" || !!source.TIMESTAMP_FORMAT,
		timestampFormat: source.TIMESTAMP_FORMAT,
	};
};

/**
 * Defer creation of objects requiring configuration until they're first used.
 */
export function withConfig<T>(factory: (config: Config) => T): T {
	return new Proxy<{ _proxied?: T }>(
		{ _proxied: undefined },
		{
			get(target, prop) {
				target._proxied ??= factory(config);
				return target._proxied[prop as keyof T];
			},
		},
	) as T;
}

const config: Config = new Proxy<{ config?: ConfigProps }>(
	{ config: undefined },
	{
		get(target, prop) {
			if (prop === "init") {
				return (overrides: Record<string, string>): ConfigProps =>
					(target.config = createConfig(overrides));
			}
			if (target.config === undefined) {
				throw new Error("config accessed before initialisation");
			}
			return target.config[prop as keyof ConfigProps];
		},
	},
) as Config;

export default config;

function createDbConfig(source: ValidatedSource): Config["dbConfig"] {
	const databaseUrl = new URL(source.DATABASE_URL);

	const localDb = [
		"0.0.0.0",
		"127.0.0.1",
		"localhost",
		"host.docker.internal",
	].includes(databaseUrl.hostname);
	const sslMode = databaseUrl.searchParams.get("sslmode") ?? source.PGSSLMODE;

	return {
		connectionString: databaseUrl.toString(),
		connectionTimeoutMillis: 5_000,
		ssl:
			localDb || sslMode === "disable"
				? false
				: {
						rejectUnauthorized: [
							"prefer",
							"require",
							"verify-ca",
							"verify-full",
						].includes(sslMode ?? ""),
					},
	};
}

export class MissingRequiredEnvVars extends Error {
	missing: string[];
	constructor(missing: string[]) {
		super(
			`missing required env var${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`,
		);
		this.missing = missing;
	}
}

function requireArgs(
	source: Record<string, string | undefined>,
	required: typeof REQUIRED_ARGS,
): asserts source is ValidatedSource {
	const missing = required.filter((variable) => !source[variable]);
	if (missing.length > 0) {
		process.exitCode = 1;
		throw new MissingRequiredEnvVars(missing);
	}
}

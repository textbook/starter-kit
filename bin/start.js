#!/usr/bin/env node
import { applyMigrations } from "../api/db.js";
import config from "../api/utils/config.js";

const { migrationConfig, port } = config.init();

await applyMigrations(migrationConfig);

const { start } = await import("../api/app.js");

start(port);

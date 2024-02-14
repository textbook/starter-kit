/* eslint-disable no-unused-vars */

/**
 * Template for
 * {@link https://salsita.github.io/node-pg-migrate/#/migrations?id=defining-migrations defining migrations}.
 *
 * @type {{
 *   down: (pgm: import("node-pg-migrate").MigrationBuilder) => void | Promise<void>;
 *   shorthands: Record<string, import("node-pg-migrate").ColumnDefinition>;
 *   up: (pgm: import("node-pg-migrate").MigrationBuilder) => void | Promise<void>;
 * }}
 */
const migration = {
	up(pgm) {
		pgm.createTable("message", {
			content: { notNull: true, type: "string" },
		});
		pgm.sql("INSERT INTO message (content) VALUES ('Hello, world!')");
	},
	down(pgm) {
		pgm.dropTable("message");
	},
	shorthands: undefined,
};

module.exports = migration;

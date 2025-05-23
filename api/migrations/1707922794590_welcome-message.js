/**
 * Template for
 * {@link https://salsita.github.io/node-pg-migrate/migrations/ defining migrations}.
 */

/**
 * Change the database schema to meet new functional requirements.
 *
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 * @returns {void | Promise<void>}
 */
export async function up(pgm) {
	pgm.createTable("message", {
		content: { notNull: true, type: "string" },
	});
	pgm.sql("INSERT INTO message (content) VALUES ('Hello, world!')");
}

/**
 * Undo the changes introduced by the `up` function.
 *
 * This allows easy rolling back of the database to a previous state.
 *
 * If rolling back is impossible, replace with:
 *
 * @example
 * export const down = false;
 *
 * @param {import("node-pg-migrate").MigrationBuilder} pgm
 * @returns {void | Promise<void>}
 */
export async function down(pgm) {
	pgm.dropTable("message");
}

/** @type {Record<string, import("node-pg-migrate").ColumnDefinition>} */
export const shorthands = {};

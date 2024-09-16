/**
 * Template for
 * {@link https://github.com/seppevs/migrate-mongo?tab=readme-ov-file#creating-a-new-migration-script defining migrations}.
 */

/**
 * @param {import("mongodb").Db} db
 * @param {import("mongodb").MongoClient} client
 */
export const up = async (db, client) => {
	// TODO write your migration here.
};

/**
 * @param {import("mongodb").Db} db
 * @param {import("mongodb").MongoClient} client
 */
export const down = async (db, client) => {
	// TODO reverse your migration here.
};

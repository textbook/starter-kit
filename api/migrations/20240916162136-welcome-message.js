/**
 * Template for
 * {@link https://github.com/seppevs/migrate-mongo?tab=readme-ov-file#creating-a-new-migration-script defining migrations}.
 */

/**
 * @param {import("mongodb").Db} db
 * @param {import("mongodb").MongoClient} client
 */
export const up = async (db) => {
	await db.collection("messages").insertOne({ content: "Hello, world!" });
};

/**
 *
 * @param {import("mongodb").Db} db
 * @param {import("mongodb").MongoClient} client
 */
export const down = async (db) => {
	await db.collection("messages").drop();
};

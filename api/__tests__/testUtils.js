import request from "supertest";

import createApp from "../app.js";

/**
 * @returns {Promise<import("supertest").Agent>}
 */
export async function createRequest() {
	const app = await createApp();
	return request(app);
}

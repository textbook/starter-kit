import { describe, it } from "node:test";

import request from "supertest";

import app from "./app.js";

describe("base API endpoints", () => {
	it("exposes a health endpoint", async () => {
		await request(app).get("/healthz").expect(200);
	});
});

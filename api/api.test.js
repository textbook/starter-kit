import request from "supertest";

import app from "./app.js";

describe("/api", () => {
	describe("GET /message", () => {
		it("returns a message", async () => {
			await request(app).get("/api/message").expect(200, "Hello, world!");
		});
	});
});

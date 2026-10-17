import { describe, it } from "vitest";

import { createRequest } from "./testUtils.js";

describe("base API endpoints", () => {
	it("exposes a health endpoint", async () => {
		const request = await createRequest();
		await request.get("/healthz").expect(200);
	});
});

import stripAnsi from "strip-ansi";

import { createRequest } from "./testUtils.js";

const LOGGER = { debug: vi.fn(), info: vi.fn() };

vi.mock("../utils/logger.js", () => ({ default: LOGGER }));

describe("default request logging", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("with no headers", () => {
		it("logs GET /healthz", async () => {
			const request = await createRequest();
			await request.get("/healthz").expect(200);
			expect(stripColorCodes(LOGGER.info.mock.calls)).toContainEqual([
				expect.stringMatching(/^GET \/healthz 200/),
			]);
		});

		it("logs other methods", async () => {
			const request = await createRequest();
			await request.post("/healthz").expect(404);
			expect(stripColorCodes(LOGGER.info.mock.calls)).toContainEqual([
				expect.stringMatching(/^POST \/healthz 404/),
			]);
		});

		it("logs other routes", async () => {
			const request = await createRequest();
			await request.get("/api/message").expect(200);
			expect(stripColorCodes(LOGGER.info.mock.calls)).toContainEqual([
				expect.stringMatching(/^GET \/api\/message 200/),
			]);
		});
	});

	describe("with Container-Healthcheck header", () => {
		it("does not log GET /healthz", async () => {
			const request = await createRequest();
			await request
				.get("/healthz")
				.set("Container-Healthcheck", "true")
				.expect(200);
			expect(stripColorCodes(LOGGER.info.mock.calls)).not.toContainEqual([
				expect.stringMatching(/^GET \/healthz 200/),
			]);
		});

		it("logs other methods", async () => {
			const request = await createRequest();
			await request.post("/healthz").expect(404);
			expect(stripColorCodes(LOGGER.info.mock.calls)).toContainEqual([
				expect.stringMatching(/^POST \/healthz 404/),
			]);
		});

		it("logs other routes", async () => {
			const request = await createRequest();
			await request.get("/api/message").expect(200);
			expect(stripColorCodes(LOGGER.info.mock.calls)).toContainEqual([
				expect.stringMatching(/^GET \/api\/message 200/),
			]);
		});
	});
});

/**
 * Strip ANSI color codes for easier comparison.
 * @param {string[][]} calls
 * @returns {string[][]}
 */
function stripColorCodes(calls) {
	return calls.map((line) =>
		line.map((item) => (typeof item === "string" ? stripAnsi(item) : item)),
	);
}

import { describe, expect, it, vi } from "vitest";

import { getAll } from "./messageRepository.ts";
import { getMessage } from "./messageService.ts";

vi.mock("./messageRepository.ts");

describe("getMessage", () => {
	it("returns the content of the first result", async () => {
		const message = "test message";
		vi.mocked(getAll).mockResolvedValueOnce([{ content: message }]);
		await expect(getMessage()).resolves.toEqual(message);
	});
});

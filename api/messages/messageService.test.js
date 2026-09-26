import { getAll } from "./messageRepository.js";
import { getMessage } from "./messageService.js";

vi.mock("./messageRepository.js");

describe("getMessage", () => {
	it("returns the content of the first result", async () => {
		const message = "test message";
		vi.mocked(getAll).mockResolvedValueOnce([{ content: message }]);
		await expect(getMessage()).resolves.toEqual(message);
	});
});

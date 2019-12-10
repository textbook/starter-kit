import { get } from "./api";
import { getMessage } from "./service";

jest.mock("./api");

describe("service", () => {
	const message = "Take me to your leader";

	beforeEach(() => {
		get.mockResolvedValue({ data: { message } });
	});

	describe("getMessage", ()  => {
		it("makes a request", async () => {
			await getMessage();

			expect(get).toHaveBeenCalledWith("/");
		});

		it("exposes the data", async () => {
			await expect(getMessage()).resolves.toBe(message);
		});
	});
});

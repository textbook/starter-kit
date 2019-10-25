import axios from "axios";

import { getMessage } from "./service";

describe("service", () => {
	describe("getMessage", ()  => {
		it("makes a request", async () => {
			await getMessage();

			expect(axios.get).toHaveBeenCalledWith("/api");
		});

		it("exposes the data", async () => {
			const message = "Take me to your leader";
			axios.get.mockResolvedValue({ data: { message } });

			await expect(getMessage()).resolves.toBe(message);
		});
	});
});

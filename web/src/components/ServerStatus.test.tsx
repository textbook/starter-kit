import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw/http";
import { describe, expect, it } from "vitest";

import { server } from "../setupTests.ts";

import ServerStatus from "./ServerStatus.tsx";

describe("ServerStatus component", () => {
	it("fetches the right thing", async () => {
		server.use(http.get("/api/message", () => HttpResponse.text("hi!")));

		render(<ServerStatus />);

		await expect(
			screen.findByText(/server says: hi!/i),
		).resolves.toBeInTheDocument();
	});

	it("shows message if server errors", async () => {
		server.use(http.get("/api/message", () => HttpResponse.error()));

		render(<ServerStatus />);

		await expect(
			screen.findByText(/server says: unknown/i),
		).resolves.toBeInTheDocument();
	});
});

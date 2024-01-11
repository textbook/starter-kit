import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";

import { server } from "../setupTests";

import ServerStatus from "./ServerStatus";

describe("ServerStatus component", () => {
	it("fetches the right thing", async () => {
		server.use(http.get("/healthz", () => HttpResponse.text("OK")));

		render(<ServerStatus />);

		await expect(
			screen.findByText(/server status: ok/i),
		).resolves.toBeInTheDocument();
	});

	it("shows message if server errors", async () => {
		server.use(http.get("/healthz", () => HttpResponse.error()));

		render(<ServerStatus />);

		await expect(
			screen.findByText(/server status: failed to fetch/i),
		).resolves.toBeInTheDocument();
	});
});

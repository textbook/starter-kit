import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

export const server = setupServer();

beforeAll(() => {
	server.listen();
});

beforeEach(() => {
	server.resetHandlers();
});

afterEach(() => {
	cleanup();
});

afterAll(() => {
	server.close();
});

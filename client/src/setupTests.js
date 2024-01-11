import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { setGlobalOrigin } from "undici";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";

export const server = setupServer();

setGlobalOrigin(window.location.href); // see mswjs/msw#1625

beforeAll(() => server.listen());

beforeEach(() => server.resetHandlers());

afterEach(cleanup);

afterAll(() => server.close());

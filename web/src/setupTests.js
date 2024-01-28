import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { setGlobalOrigin } from "undici";

export const server = setupServer();

setGlobalOrigin(window.location.href); // see mswjs/msw#1625

beforeAll(() => server.listen());

beforeEach(() => server.resetHandlers());

afterAll(() => server.close());

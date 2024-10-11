import "@testing-library/jest-dom";
import { setupServer } from "msw/node";

export const server = setupServer();

beforeAll(() => server.listen());

beforeEach(() => server.resetHandlers());

afterAll(() => server.close());

import { connect, disconnect } from "./db.js";

beforeAll(() => connect());

afterAll(() => disconnect());

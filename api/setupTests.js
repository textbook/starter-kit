import { connectDb, disconnectDb } from "./db.js";

beforeAll(() => connectDb());

afterAll(() => disconnectDb());

import request from "supertest";

import app from "./app";

describe("app", () => {
  it("serves from the (missing) static directory", () => {
    return request(app).get("/").expect(404);
  });
});

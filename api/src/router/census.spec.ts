import * as request from "supertest";
import {App} from "../App";
import {pool} from "../services/census";

describe("API endpoints", () => {

  let app;
  let server;

  beforeAll((done) => {
    app = App();
    server = app.listen(done);
  });

  afterAll(async (done) => {
    await pool.end();
    server.close(done);
  });

  it("GET random url",  (done) => {
    try {
      request(app)
        .get("/random")
        .expect(404)
        .end(done);
    } catch (error) {
      return Error(error);
    }

  });

  it("GET column-names",  (done) => {
    try {
      request(app)
        .get("/census/column-names")
        .expect(200)
        .end(done);
    } catch (error) {
      return Error(error);
    }

  });
});

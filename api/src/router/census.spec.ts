import {App} from "../App";
import * as request from "supertest";

describe('API endpoints', () => {

  let app;

  beforeAll(() => {
    app = App();
  });

  it("GET random url ",  (done) => {
    // const request = await axios.get('/random')
    try {
      request(app)
        .get('/random')
        .expect(404)
        .end(done);
    } catch (error) {
      Error(error);
    }

  });
      // expect(request.status).toBe(200)
});

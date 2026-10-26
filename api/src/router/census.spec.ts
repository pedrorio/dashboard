import * as request from "supertest";
import { App } from "../App";
import { pool } from "../services/census";

jest.mock("../services/census", () => ({
    columnNames: jest.fn().mockResolvedValue({
        error: [],
        status: 200,
        success: [{ column_name: "age" }],
    }),
    data: jest.fn(),
    pool: {
        end: jest.fn().mockResolvedValue(undefined),
    },
    remainingTotalCount: jest.fn(),
    remainingUniqueValuesCount: jest.fn(),
}));

describe("API endpoints", () => {

    let app;
    let server;

    beforeAll((done) => {
        app = App();
        server = app.listen(done);
    });

    afterAll((done) => {
        Promise.resolve(pool.end()).then(() => {
            server.close(done);
        }).catch(done);
    });

    it("GET random url", (done) => {
        request(app)
            .get("/random")
            .expect(404)
            .end(done);
    });

    it("GET column-names", (done) => {
        request(app)
            .get("/census/column-names")
            .expect(200)
            .expect((response) => {
                if (!response.body.success || response.body.success[0].column_name !== "age") {
                    throw new Error("column-names did not return the mocked column");
                }
            })
            .end(done);
    });
});

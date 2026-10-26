import { VARIABLE_DATA } from "../actions/types";
import { reducer } from "./censusPaginatedData";

describe("census page reducer", () => {
  it("starts idle and marks a request as loading", () => {
    const loading = reducer(undefined, {
      payload: { pageNumber: 1, variableName: "age" },
      type: VARIABLE_DATA.FETCH_REQUEST,
    });
    expect(loading.status).toBe("loading");
    expect(loading.errorMessage).toBeNull();
  });

  it("stores a successful page", () => {
    const success = reducer(undefined, {
      payload: {
        pageNumber: 1,
        paginatedVariableData: [{ age: "35", average: "41.2", counter: 120 }],
        remainingTotalCount: 10,
        remainingUniqueValuesCount: 2,
      },
      type: VARIABLE_DATA.FETCH_SUCCESS,
    });
    expect(success.status).toBe("success");
    expect(success.paginatedVariableData).toHaveLength(1);
    expect(success.pageNumber).toBe(1);
  });

  it("records a failure without dropping the request variable's error", () => {
    const failed = reducer(undefined, {
      error: new Error("database unavailable"),
      type: VARIABLE_DATA.FETCH_FAILURE,
    });
    expect(failed.status).toBe("error");
    expect(failed.errorMessage).toBe("database unavailable");
  });
});

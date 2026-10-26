import { mount } from "enzyme";
import { createMemoryHistory } from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import { createStore } from "redux";
import { VARIABLE_DATA, VARIABLES } from "../../actions/types";
import { IGlobalState, reducers } from "../../reducers";
import { ICensusPaginatedVariableDataState } from "../../reducers/censusPaginatedData";
import { Data } from "./Data";

const agePage: ICensusPaginatedVariableDataState = {
  errorMessage: null,
  pageNumber: 1,
  paginatedVariableData: [{ age: "35", average: "41.2", counter: 120 }],
  remainingTotalCount: 1500,
  remainingUniqueValuesCount: 12,
  status: "success",
};

function mountAt(path: string, page: ICensusPaginatedVariableDataState = agePage) {
  const history = createMemoryHistory({ initialEntries: [path] });
  const store = createStore(reducers, {
    activeCensusVariable: "age",
    censusPaginatedData: page,
    censusVariableNames: ["age", "education"],
  } as IGlobalState);
  const dispatch = jest.spyOn(store, "dispatch");
  const wrapper = mount(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/explorer/:variableName" component={Data} />
      </Router>
    </Provider>,
  );
  return { dispatch, history, store, wrapper };
}

function fetchedVariables(dispatch: jest.SpyInstance) {
  return dispatch.mock.calls
    .map((call) => call[0])
    .filter((action) => action.type === VARIABLE_DATA.FETCH_REQUEST)
    .map((action) => action.payload.variableName);
}

describe("census results table", () => {
  it("uses one table with a caption and column scopes", () => {
    const { wrapper } = mountAt("/explorer/age");
    const tables = wrapper.find("table").hostNodes();
    expect(tables).toHaveLength(1);
    expect(tables.find("caption").hostNodes().text()).toContain("age");
    const headers = tables.find("thead th").hostNodes();
    expect(headers).toHaveLength(3);
    headers.forEach((header) => {
      expect(header.prop("scope")).toBe("col");
    });
    expect(tables.find("tbody tr").hostNodes()).toHaveLength(1);
    const css = Array.from(document.querySelectorAll("style"))
      .map((node) => (node as HTMLStyleElement).innerHTML)
      .join("\n");
    expect(css).toMatch(/position:\s*sticky/);
    wrapper.unmount();
  });
});

const emptyPage: ICensusPaginatedVariableDataState = {
  errorMessage: null,
  pageNumber: null,
  paginatedVariableData: [],
  remainingTotalCount: null,
  remainingUniqueValuesCount: null,
  status: "idle",
};

describe("census results status", () => {
  it("announces that results are loading", () => {
    const { wrapper } = mountAt("/explorer/age", { ...emptyPage, status: "loading" });
    const status = wrapper.find("[aria-busy]").hostNodes();
    expect(status).toHaveLength(1);
    expect(status.prop("aria-live")).toBe("polite");
    expect(status.text()).toContain("Loading results for age");
    wrapper.unmount();
  });

  it("shows an error and retries the same column", () => {
    const { dispatch, wrapper } = mountAt("/explorer/age", {
      ...emptyPage,
      errorMessage: "database unavailable",
      status: "error",
    });
    dispatch.mockClear();
    expect(wrapper.text()).toContain("Could not load results for age");
    wrapper.find("button").hostNodes().simulate("click");
    expect(fetchedVariables(dispatch)).toEqual(["age"]);
    wrapper.unmount();
  });

  it("shows an empty state when the page has no rows", () => {
    const { wrapper } = mountAt("/explorer/education", { ...emptyPage, status: "success" });
    expect(wrapper.find("table").hostNodes()).toHaveLength(0);
    expect(wrapper.text()).toContain("No results for education");
    wrapper.unmount();
  });
});

describe("census results route", () => {
  it("requests the column named by the new route", () => {
    const { dispatch, history, wrapper } = mountAt("/explorer/age");
    dispatch.mockClear();

    history.push("/explorer/education");
    wrapper.update();

    expect(fetchedVariables(dispatch)).toEqual(["education"]);
    expect(dispatch).toHaveBeenCalledWith({
      payload: "education",
      type: VARIABLES.SELECT_ACTIVE_VARIABLE,
    });
  });

  it("rejects an unknown column instead of requesting the previous one", () => {
    const { dispatch, history, wrapper } = mountAt("/explorer/age");
    dispatch.mockClear();

    history.push("/explorer/not-a-column");
    wrapper.update();

    expect(history.location.pathname).toBe("/catch");
    expect(fetchedVariables(dispatch)).toEqual([]);
  });
});

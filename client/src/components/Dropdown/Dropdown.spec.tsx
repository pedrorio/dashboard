import { mount, ReactWrapper } from "enzyme";
import { createMemoryHistory } from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createStore } from "redux";
import { IGlobalState, reducers } from "../../reducers";
import { ICensusPaginatedVariableDataState } from "../../reducers/censusPaginatedData";
import { Dropdown } from "./Dropdown";

const emptyPage: ICensusPaginatedVariableDataState = {
  errorMessage: null,
  pageNumber: null,
  paginatedVariableData: [],
  remainingTotalCount: null,
  remainingUniqueValuesCount: null,
  status: "idle",
};

function mountMenus(count: number) {
  const store = createStore(reducers, {
    activeCensusVariable: null,
    censusPaginatedData: emptyPage,
    censusVariableNames: ["age", "education", "sex"],
  } as IGlobalState);
  const container = document.createElement("div");
  document.body.appendChild(container);
  const menus = Array.from({ length: count }, (_, index) => <Dropdown key={index} />);
  const wrapper = mount(
    <Provider store={store}>
      <Router history={createMemoryHistory({ initialEntries: ["/"] })}>
        <div>{menus}</div>
      </Router>
    </Provider>,
    { attachTo: container },
  );
  return wrapper;
}

function button(wrapper: ReactWrapper, index = 0) {
  return wrapper.find("button").at(index);
}

describe("variable menu", () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    if (wrapper) {
      const container = wrapper.getDOMNode().parentNode as HTMLElement;
      wrapper.unmount();
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  });

  it("opens from click and exposes listbox state", () => {
    wrapper = mountMenus(1);
    expect(button(wrapper).prop("aria-expanded")).toBe(false);
    expect(button(wrapper).prop("aria-haspopup")).toBe("listbox");
    expect(button(wrapper).prop("aria-controls")).toBeTruthy();

    button(wrapper).simulate("click");
    wrapper.update();

    const listId = button(wrapper).prop("aria-controls");
    expect(button(wrapper).prop("aria-expanded")).toBe(true);
    expect(wrapper.find(`[id="${listId}"]`).hostNodes().prop("role")).toBe("listbox");
    expect(wrapper.find("[role='option']").hostNodes()).toHaveLength(3);
  });

  it("opens from Enter and Space on the trigger", () => {
    wrapper = mountMenus(1);
    button(wrapper).simulate("keyDown", { key: "Enter" });
    wrapper.update();
    expect(button(wrapper).prop("aria-expanded")).toBe(true);

    button(wrapper).simulate("keyDown", { key: "Enter" });
    wrapper.update();
    expect(button(wrapper).prop("aria-expanded")).toBe(false);

    button(wrapper).simulate("keyDown", { key: " " });
    wrapper.update();
    expect(button(wrapper).prop("aria-expanded")).toBe(true);
  });

  it("moves between options with arrow keys and closes on Escape", () => {
    wrapper = mountMenus(1);
    button(wrapper).simulate("keyDown", { key: "ArrowDown" });
    wrapper.update();

    const options = wrapper.find("[role='option']").hostNodes();
    expect(options.at(0).prop("aria-selected")).toBe(true);
    expect(document.activeElement).toBe(options.at(0).getDOMNode());

    options.at(0).simulate("keyDown", { key: "ArrowDown" });
    wrapper.update();
    const next = wrapper.find("[role='option']").hostNodes().at(1);
    expect(next.prop("aria-selected")).toBe(true);
    expect(next.text()).toBe("education");
    expect(document.activeElement).toBe(next.getDOMNode());

    next.simulate("keyDown", { key: "Escape" });
    wrapper.update();
    expect(wrapper.find("[role='listbox']").hostNodes()).toHaveLength(0);
    expect(document.activeElement).toBe(button(wrapper).getDOMNode());
  });

  it("closes when the pointer goes outside the menu", () => {
    wrapper = mountMenus(1);
    button(wrapper).simulate("click");
    wrapper.update();
    expect(wrapper.find("[role='listbox']").hostNodes()).toHaveLength(1);

    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    wrapper.update();
    expect(wrapper.find("[role='listbox']").hostNodes()).toHaveLength(0);
  });

  it("keeps a hover timer per menu", () => {
    jest.useFakeTimers();
    wrapper = mountMenus(2);
    button(wrapper, 0).closest("[onMouseOver]").simulate("mouseOver");
    button(wrapper, 1).closest("[onMouseOver]").simulate("mouseOver");
    jest.advanceTimersByTime(300);
    wrapper.update();

    expect(button(wrapper, 0).prop("aria-expanded")).toBe(true);
    expect(button(wrapper, 1).prop("aria-expanded")).toBe(true);
    jest.useRealTimers();
  });
});

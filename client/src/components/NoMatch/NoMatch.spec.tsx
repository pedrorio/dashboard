import { mount } from "enzyme";
import * as React from "react";
import NoMatch from "./NoMatch";

describe("404", () => {

  let wrapper;

  beforeEach(() => {
    wrapper =  mount(<NoMatch/>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the 404", () => {
    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.matchesElement(<NoMatch/>)).toEqual(true);
  });

});

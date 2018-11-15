import { mount } from "enzyme";
import * as React from "react";

import { MemoryRouter } from "react-router";
import {App} from "./App";
import Root from "./Root";

describe("App", () => {

  let wrapper;

  beforeEach(() => {
    wrapper =  mount(
      <Root>
              <MemoryRouter>
                <App/>
              </MemoryRouter>
           </Root>,
    );
  });

  afterEach(() => {
       wrapper.unmount();
     });

  it("renders the Store", () => {

       expect(wrapper.exists()).toEqual(true);
       expect(wrapper.matchesElement(
         <Root>
                  <MemoryRouter>
                    <App/>
                  </MemoryRouter>
              </Root>,
       )).toEqual(true);

   });

  it("renders the App component", () => {

       expect(wrapper.exists()).toEqual(true);
       expect(wrapper.containsMatchingElement(<App/>)).toEqual(true);

   });

});

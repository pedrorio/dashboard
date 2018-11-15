import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { App } from "./App";
import Root from "./Root";
import {setupStore} from "./setupStore";

const RootElement: HTMLElement = document.querySelector("#root");

const store = setupStore();

ReactDOM.render(
    <Root>
              <BrowserRouter>
                <Route path="/" component={App} />
              </BrowserRouter>
            </Root>,
    RootElement,
);

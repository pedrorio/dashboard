"use strict";
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var App_1 = require("./App");
var Root_1 = require("./Root");
var setupStore_1 = require("./setupStore");
var RootElement = document.querySelector("#root");
var store = setupStore_1.setupStore();
ReactDOM.render(<Root_1["default"]>
              <react_router_dom_1.BrowserRouter>
                <react_router_dom_1.Route path="/" component={App_1.App}/>
              </react_router_dom_1.BrowserRouter>
            </Root_1["default"]>, RootElement);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const App_1 = require("./components/App");
require("./styles/style.scss");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const reducers_1 = require("./reducers");
const Data_1 = require("./components/Data");
const ROOT = document.querySelector("#root");
ReactDOM.render((React.createElement(react_redux_1.Provider, { store: redux_1.createStore(reducers_1.reducers) },
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(App_1.App, null,
            React.createElement(react_router_dom_1.Route, { path: '/', component: Data_1.default }),
            React.createElement(react_router_dom_1.Route, { path: '/explorer', component: Data_1.default }))))), ROOT);
//# sourceMappingURL=index.js.map
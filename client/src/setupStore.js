"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var reducers_1 = require("./reducers");
var redux_saga_1 = require("redux-saga");
var sagas_1 = require("./sagas");
exports.setupStore = function () {
    var sagaMiddleware = redux_saga_1["default"]();
    var middleware = [sagaMiddleware];
    var store = redux_1.createStore(reducers_1.reducers, {}, redux_1.applyMiddleware.apply(void 0, middleware));
    sagaMiddleware.run(sagas_1["default"]);
    return store;
};

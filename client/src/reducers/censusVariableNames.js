"use strict";
exports.__esModule = true;
var types_1 = require("../actions/types");
var INITIAL_STATE = [];
exports.reducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case types_1.VARIABLES.FETCH_VARIABLE_NAMES_SUCCESS:
            return action.payload.map(function (columnInfo) { return columnInfo.column_name; }).slice();
        default:
            return state;
    }
};

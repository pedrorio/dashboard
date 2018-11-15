"use strict";
exports.__esModule = true;
var types_1 = require("../actions/types");
var INITIAL_STATE = null;
exports.reducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case types_1.VARIABLES.SELECT_ACTIVE_VARIABLE:
            return action.payload;
        default:
            return state;
    }
};

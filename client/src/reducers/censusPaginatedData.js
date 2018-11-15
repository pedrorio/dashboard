"use strict";
exports.__esModule = true;
var types_1 = require("../actions/types");
var INITIAL_STATE = {
    pageNumber: null,
    paginatedVariableData: [],
    remainingTotalCount: null,
    remainingUniqueValues: null
};
exports.reducer = function (state, action) {
    if (state === void 0) { state = INITIAL_STATE; }
    switch (action.type) {
        case types_1.VARIABLE_DATA.FETCH_SUCCESS:
            return {
                pageNumber: action.payload.pageNumber,
                paginatedVariableData: action.payload.paginatedVariableData.slice(),
                remainingTotalCount: action.payload.remainingTotalCount,
                remainingUniqueValues: action.payload.remainingUniqueValues
            };
        default:
            return state;
    }
};

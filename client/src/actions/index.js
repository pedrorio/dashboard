"use strict";
exports.__esModule = true;
var types_1 = require("./types");
exports.fetchVariableNames = function () {
    return { type: types_1.VARIABLES.FETCH_VARIABLE_NAMES_REQUEST };
};
exports.selectActiveVariable = function (variableName) { return ({
    payload: variableName,
    type: types_1.VARIABLES.SELECT_ACTIVE_VARIABLE
}); };
exports.fetchPaginatedData = function (variableName, pageNumber) {
    if (pageNumber === void 0) { pageNumber = 1; }
    return {
        payload: { variableName: variableName, pageNumber: pageNumber },
        type: types_1.VARIABLE_DATA.FETCH_REQUEST
    };
};

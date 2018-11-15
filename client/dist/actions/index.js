"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const axios_1 = require("axios");
exports.fetchVariableNames = async (dispatch) => {
    const response = await axios_1.default.get('http://localhost:5000/census/column-names');
    dispatch({
        type: types_1.VARIABLES.FETCH_VARIABLE_NAMES,
        payload: response.data
    });
};
exports.fetchVariableData = (variableName) => async (dispatch) => {
    const response = await axios_1.default.get(`http://localhost:5000/census/${variableName}/data`);
    dispatch({
        type: types_1.VARIABLE_DATA.FETCH,
        payload: response.data
    });
};
exports.fetchRemainingUniqueValuesCount = (variableName) => async (dispatch) => {
    const response = await axios_1.default.get(`http://localhost:5000/census/${variableName}/remaining-unique-values-count`);
    dispatch({
        type: types_1.VARIABLE_DATA.FETCH,
        payload: response.data
    });
};
exports.fetchRemainingTotalCount = (variableName) => async (dispatch) => {
    const response = await axios_1.default.get(`http://localhost:5000/census/${variableName}/remaining-total-count`);
    dispatch({
        type: types_1.VARIABLE_DATA.FETCH,
        payload: response.data
    });
};
//# sourceMappingURL=index.js.map
"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var effects_1 = require("redux-saga/effects");
var types_1 = require("../actions/types");
var api_1 = require("../services/api");
function fetchVariableNamesSaga() {
    var payload, variableNames, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                return [4 /*yield*/, effects_1.call(api_1.fetchVariableNames)];
            case 1:
                payload = _a.sent();
                variableNames = payload.data;
                return [4 /*yield*/, effects_1.put({
                        payload: variableNames,
                        type: types_1.VARIABLES.FETCH_VARIABLE_NAMES_SUCCESS
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                return [4 /*yield*/, effects_1.put({
                        error: Error(error_1),
                        type: types_1.VARIABLES.FETCH_VARIABLE_NAMES_FAILURE
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}
exports.fetchVariableNamesSaga = fetchVariableNamesSaga;
function watchFetchVariableNames() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(types_1.VARIABLES.FETCH_VARIABLE_NAMES_REQUEST, fetchVariableNamesSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.watchFetchVariableNames = watchFetchVariableNames;
function fetchPaginatedDataSaga(action) {
    var _a, variableName, pageNumber, payload, data, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = action.payload, variableName = _a.variableName, pageNumber = _a.pageNumber;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 6]);
                return [4 /*yield*/, effects_1.all({
                        remainingTotalCountPayload: effects_1.call(api_1.fetchRemainingTotalCount, variableName, pageNumber),
                        remainingUniqueValuesCountPayload: effects_1.call(api_1.fetchRemainingUniqueValuesCount, variableName, pageNumber),
                        variableDataPayload: effects_1.call(api_1.fetchVariableData, variableName, pageNumber)
                    })];
            case 2:
                payload = _b.sent();
                data = {
                    pageNumber: pageNumber,
                    paginatedVariableData: payload.variableDataPayload.data,
                    remainingTotalCount: payload.remainingTotalCountPayload.data.remainingTotalCount,
                    remainingUniqueValues: payload.remainingUniqueValuesCountPayload.data.remainingUniqueValuesCount
                };
                return [4 /*yield*/, effects_1.put({
                        payload: data,
                        type: types_1.VARIABLE_DATA.FETCH_SUCCESS
                    })];
            case 3:
                _b.sent();
                return [3 /*break*/, 6];
            case 4:
                error_2 = _b.sent();
                return [4 /*yield*/, effects_1.put({
                        error: Error(error_2),
                        type: types_1.VARIABLE_DATA.FETCH_FAILURE
                    })];
            case 5:
                _b.sent();
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}
exports.fetchPaginatedDataSaga = fetchPaginatedDataSaga;
function watchFetchPaginatedData() {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(types_1.VARIABLE_DATA.FETCH_REQUEST, fetchPaginatedDataSaga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.watchFetchPaginatedData = watchFetchPaginatedData;

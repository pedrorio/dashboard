"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const censusVariableData = require("./censusVariableData");
const activeCensusVariable = require("./activeCensusVariable");
const censusVariables = require("./censusVariables");
const remainingUniqueValuesCount = require("./remainingUniqueValuesCount");
const remainingTotalCount = require("./remainingTotalCount");
exports.reducers = redux_1.combineReducers({
    censusVariables: censusVariables.reducer,
    activeCensusVariable: activeCensusVariable.reducer,
    censusVariableData: censusVariableData.reducer,
    uniqueCountRemaining: remainingUniqueValuesCount.reducer,
    totalCountRemaining: remainingTotalCount.reducer
});
//# sourceMappingURL=index.js.map
import {Action, combineReducers} from "redux";
import * as activeCensusVariable from "./activeCensusVariable";
import * as censusPaginatedData from "./censusPaginatedData";
import * as censusVariableNames from "./censusVariableNames";

export const reducers = combineReducers<IGlobalState, Action>({
  activeCensusVariable: activeCensusVariable.reducer,
  censusPaginatedData: censusPaginatedData.reducer,
  censusVariableNames: censusVariableNames.reducer,
});

export interface IGlobalState {
  activeCensusVariable: activeCensusVariable.ActiveCensusVariableState;
  censusVariableNames: censusVariableNames.CensusVariableNamesState;
  censusPaginatedData: censusPaginatedData.ICensusPaginatedVariableDataState;
}

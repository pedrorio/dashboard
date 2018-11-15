import { ActiveCensusVariableState } from "../reducers/activeCensusVariable";
import { ICensusPaginatedVariableDataState} from "../reducers/censusPaginatedData";
import { CensusVariableNamesState } from "../reducers/censusVariableNames";
import { FetchVariableNamesArgs, IFetchPaginatedDataArgs, SelectActiveVariableArgs } from "./index";

export enum VARIABLE_DATA {
  FETCH_REQUEST = "FETCH_REQUEST",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_FAILURE = "FETCH_FAILURE",
}

export enum VARIABLES {
    FETCH_VARIABLE_NAMES_REQUEST = "FETCH_VARIABLE_NAMES_REQUEST",
    FETCH_VARIABLE_NAMES_SUCCESS = "FETCH_VARIABLE_NAMES_SUCCESS",
    FETCH_VARIABLE_NAMES_FAILURE = "FETCH_VARIABLE_NAMES_FAILURE",

    SELECT_ACTIVE_VARIABLE = "SELECT_ACTIVE_VARIABLE",
}

export type ActionType = VARIABLE_DATA | VARIABLES;

export interface IAction {
    readonly payload?: Args | Data;
    readonly type: ActionType;
    readonly error?: Error;
}

export type Data = ICensusPaginatedVariableDataState | ActiveCensusVariableState | CensusVariableNamesState;
export type Args = IFetchPaginatedDataArgs | SelectActiveVariableArgs | FetchVariableNamesArgs;

export interface IActionData {

}

export interface IActionArgs {

}

import {ActionType, IAction, VARIABLE_DATA, VARIABLES} from "./types";

export const fetchVariableNames = (): IAction & IActionFetchVariableNames => {
    return { type: VARIABLES.FETCH_VARIABLE_NAMES_REQUEST };
};

export interface IActionFetchVariableNames {
    readonly type: ActionType;
}

export type FetchVariableNamesArgs = string;

export const selectActiveVariable = (variableName: string): IAction & IActionSelectActiveVariable => ({
    payload: variableName,
    type: VARIABLES.SELECT_ACTIVE_VARIABLE,
});

export interface IActionSelectActiveVariable {
    readonly payload: string;
    readonly type: VARIABLES.SELECT_ACTIVE_VARIABLE;
}

export type SelectActiveVariableArgs = string;

export const fetchPaginatedData = (variableName, pageNumber = 1): IAction & IActionFetchPaginatedData => {
    return {
        payload: { variableName, pageNumber },
        type: VARIABLE_DATA.FETCH_REQUEST,
    };
};

export interface IActionFetchPaginatedData {
    readonly payload: IFetchPaginatedDataArgs;
    readonly type: VARIABLE_DATA.FETCH_REQUEST;
    readonly error?: Error;
}

export interface IFetchPaginatedDataArgs {
    readonly pageNumber?: number;
    readonly variableName: string;
}

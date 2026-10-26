import { VARIABLE_DATA } from "../actions/types";

export type FetchStatus = "error" | "idle" | "loading" | "success";

const INITIAL_STATE: ICensusPaginatedVariableDataState = {
    errorMessage: null,
    pageNumber: null,
    paginatedVariableData: [],
    remainingTotalCount: null,
    remainingUniqueValuesCount: null,
    status: "idle",
};

export const reducer = (state = INITIAL_STATE, action): ICensusPaginatedVariableDataState => {
    switch (action.type) {
        case VARIABLE_DATA.FETCH_REQUEST:
            return {
                ...state,
                errorMessage: null,
                status: "loading",
            };
        case VARIABLE_DATA.FETCH_SUCCESS:
            return {
                errorMessage: null,
                pageNumber: action.payload.pageNumber as PageNumberState,
                paginatedVariableData: [...action.payload.paginatedVariableData] as PaginatedVariableDataState,
                remainingTotalCount: action.payload.remainingTotalCount as VariableTotalCountRemainingState,
                remainingUniqueValuesCount:
                    action.payload.remainingUniqueValuesCount as VariableUniqueCountRemainingState,
                status: "success",
            };
        case VARIABLE_DATA.FETCH_FAILURE:
            return {
                ...state,
                errorMessage: action.error && action.error.message
                    ? action.error.message
                    : "The census page could not be loaded.",
                status: "error",
            };
        default:
            return state;
    }
};

export interface ICensusPaginatedVariableDataState {
    readonly errorMessage: string | null;
    readonly pageNumber: PageNumberState;
    readonly paginatedVariableData: PaginatedVariableDataState;
    readonly remainingTotalCount: VariableTotalCountRemainingState;
    readonly remainingUniqueValuesCount: VariableUniqueCountRemainingState;
    readonly status: FetchStatus;
}

export type PaginatedVariableDataState = ReadonlyArray<IPaginatedVariableDataState>;
export interface IPaginatedVariableDataState {
    readonly [key: string]: string | number;
    readonly counter: number;
    readonly average: string;
}

export type VariableUniqueCountRemaining = number | null;
export type VariableUniqueCountRemainingState = VariableUniqueCountRemaining;

export type VariableTotalCountRemaining = number | null;
export type VariableTotalCountRemainingState = VariableTotalCountRemaining;

export type PageNumber = number | null;
export type PageNumberState = PageNumber;

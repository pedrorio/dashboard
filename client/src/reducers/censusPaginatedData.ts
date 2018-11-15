import { VARIABLE_DATA } from "../actions/types";

const INITIAL_STATE: ICensusPaginatedVariableDataState = {
    pageNumber: null,
    paginatedVariableData: [],
    remainingTotalCount: null,
    remainingUniqueValuesCount: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VARIABLE_DATA.FETCH_SUCCESS:
            return {
                pageNumber: action.payload.pageNumber as PageNumberState,
                paginatedVariableData: [...action.payload.paginatedVariableData] as PaginatedVariableDataState,
                remainingTotalCount: action.payload.remainingTotalCount as VariableTotalCountRemainingState,
                remainingUniqueValuesCount: action.payload.remainingUniqueValuesCount as VariableUniqueCountRemainingState,
            } as ICensusPaginatedVariableDataState;
        default:
            return state as ICensusPaginatedVariableDataState;
    }
};

export interface ICensusPaginatedVariableDataState {
    readonly remainingTotalCount: VariableTotalCountRemainingState;
    readonly remainingUniqueValuesCount: VariableUniqueCountRemainingState;
    readonly paginatedVariableData: PaginatedVariableDataState;
    readonly pageNumber: PageNumberState;
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

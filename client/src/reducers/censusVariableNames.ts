import { VARIABLES } from "../actions/types";

const INITIAL_STATE: CensusVariableNamesState = [];

export const reducer =  (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VARIABLES.FETCH_VARIABLE_NAMES_SUCCESS:
      return [ ...action.payload.map((columnInfo) => columnInfo.column_name) ] as CensusVariableNamesState;
    default:
      return state as CensusVariableNamesState;
  }
};

export type CensusVariableNames = string;
export type CensusVariableNamesState = ReadonlyArray<CensusVariableNames>;

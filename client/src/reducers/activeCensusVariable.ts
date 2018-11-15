import { VARIABLES } from "../actions/types";

const INITIAL_STATE: ActiveCensusVariableState  = null;

export const reducer = (state = INITIAL_STATE, action): ActiveCensusVariableState => {
  switch (action.type) {
    case VARIABLES.SELECT_ACTIVE_VARIABLE:
      return action.payload as ActiveCensusVariableState;
    default:
      return state as ActiveCensusVariableState;
  }
};
export type ActiveVariable = string | null;
export type ActiveCensusVariableState = ActiveVariable;

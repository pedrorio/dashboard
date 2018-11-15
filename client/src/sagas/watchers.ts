import { all, call, put, takeLatest } from "redux-saga/effects";
import { Data, IAction, VARIABLE_DATA, VARIABLES } from "../actions/types";
import { CensusVariableNamesState } from "../reducers/censusVariableNames";
import {
    fetchRemainingTotalCount,
    fetchRemainingUniqueValuesCount,
    fetchVariableData,
    fetchVariableNames,
} from "../services/api";

import { SagaIterator } from "redux-saga";
import { IActionFetchPaginatedData } from "../actions";
import { ICensusPaginatedVariableDataState } from "../reducers/censusPaginatedData";

export function* fetchVariableNamesSaga(): SagaIterator {
    try {
        const payload = yield call(fetchVariableNames);
        const variableNames = payload.data.success;
        yield put(
            {
                payload: variableNames as CensusVariableNamesState,
                type: VARIABLES.FETCH_VARIABLE_NAMES_SUCCESS,
            } as IAction);
    } catch (error) {
        yield put(
            {
                error: Error(error) as Error,
                type: VARIABLES.FETCH_VARIABLE_NAMES_FAILURE,
            }  as IAction);
    }
}

export function* watchFetchVariableNames(): any {
    yield takeLatest(VARIABLES.FETCH_VARIABLE_NAMES_REQUEST, fetchVariableNamesSaga);
}

export function* fetchPaginatedDataSaga(action: IAction & IActionFetchPaginatedData ): SagaIterator {

    const { variableName, pageNumber } = action.payload;

    try {

        const payload = yield all({
            remainingTotalCountPayload: call(fetchRemainingTotalCount, variableName, pageNumber),
            remainingUniqueValuesCountPayload: call(fetchRemainingUniqueValuesCount, variableName, pageNumber),
            variableDataPayload: call(fetchVariableData, variableName, pageNumber),
        });


        const data = {
            pageNumber,
            paginatedVariableData: payload.variableDataPayload.data.success,
            remainingTotalCount: payload.remainingTotalCountPayload.data.success[0],
            remainingUniqueValuesCount: payload.remainingUniqueValuesCountPayload.data.success[0]

        } as ICensusPaginatedVariableDataState;
        
        yield put(
            {
                payload: data as Data,
                type: VARIABLE_DATA.FETCH_SUCCESS,
            } as IAction,
        );
    } catch (error) {
        yield put({
            error: Error(error) as Error,
            type: VARIABLE_DATA.FETCH_FAILURE,
        } as IAction);
    }
}

export function* watchFetchPaginatedData(): any {
    yield takeLatest(VARIABLE_DATA.FETCH_REQUEST, fetchPaginatedDataSaga);
}

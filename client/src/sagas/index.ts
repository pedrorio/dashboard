import { fork } from "redux-saga/effects";

import {
    watchFetchPaginatedData,
    watchFetchVariableNames,
} from "./watchers";

export default function* rootSaga(): any {
    yield fork(watchFetchVariableNames);
    yield fork(watchFetchPaginatedData);
}

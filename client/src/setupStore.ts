import { applyMiddleware, createStore, Middleware, Store, StoreEnhancer} from "redux";
import {IGlobalState, reducers} from "./reducers";

import createSagaMiddleware from "redux-saga";
import {IAction} from "./actions/types";
import rootSaga from "./sagas";

export const setupStore = () => {
     const sagaMiddleware = createSagaMiddleware();
     const middleware = [ sagaMiddleware as Middleware ];

     const store = createStore(
        reducers,
        {} as IGlobalState,
        applyMiddleware(
            ...middleware,
        ) as StoreEnhancer,
    ) as Store<IGlobalState, IAction>;

     sagaMiddleware.run(rootSaga);
     return store;
};

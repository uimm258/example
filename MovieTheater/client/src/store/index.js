import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import stores from './store';

const rootReducer = combineReducers({
    stores
});

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
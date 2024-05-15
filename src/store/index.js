import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import jobReducer from "./reducers";

const rootReducer = combineReducers({
  job: jobReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

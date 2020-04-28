import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
const data = require('../reducers/test.json');

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
);
export default store;
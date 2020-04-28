import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import uploadReducer from './uploadReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  results: uploadReducer
});
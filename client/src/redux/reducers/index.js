
// let initState = require('./test.json')

// const showResults = (state = initState, action) => {
//   if (action.type === 'show_results') {
//     return { ...state, ...action.data }
//   }
//   return state;
// }

// export default showResults;

import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import uploadReducer from './uploadReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  results: uploadReducer
});
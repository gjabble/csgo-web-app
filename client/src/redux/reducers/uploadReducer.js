import { UPLOAD } from '../actions/types';
const results = require('./test.json');
const initialState = results;

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD:
      return {
        ...state,
        ...action.payload // game results from server
      };
    default:
      return state;
  }
}
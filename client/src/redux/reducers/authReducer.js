import { LOGIN } from '../actions/types';
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}
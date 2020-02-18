import { SHOW_RESULTS } from './actionTypes';

export const showResults = (results) => {
  return {
    type: SHOW_RESULTS,
    payload: {
      results
    }
  }
}
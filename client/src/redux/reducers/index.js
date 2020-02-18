import { SHOW_RESULTS } from '../actions/actionTypes';

let initState = {
  team1Score: 16,
  team2Score: 3,
  map: 'dust 2',
  win: true,
  scoreBoard: {
    players: []
  }
}

export default function (state = initState, action) {
  if (action.type === SHOW_RESULTS) {
    return {
      ...state,
      ...action.payload
    }
  }
  return state;
}

let initState = require('./test.json')

const showResults = (state = initState, action) => {
  if (action.type === 'show_results') {
    return { ...state, ...action.data }
  }
  return state;
}

export default showResults;

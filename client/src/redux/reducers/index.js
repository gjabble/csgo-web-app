const showResults = (state = {}, action) => {
  if (action.type === 'show_results') {
    return { ...state, ...action.data }
  }
  return state;
}

export default showResults;

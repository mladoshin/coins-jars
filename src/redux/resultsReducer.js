export const resultsReducer = (state=[{}, {}, {}], action) => {
    switch (action.type){
      case "SET_RESULTS":
        
        return action.payload
      default:
        return state
    }
  }
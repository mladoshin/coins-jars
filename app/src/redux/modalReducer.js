export const modalReducer = (state={}, action) => {
    switch (action.type){
      case "OPEN":
        
        return action.payload
      case "CLOSE":
        return {}
      default:
        return state
    }
  }
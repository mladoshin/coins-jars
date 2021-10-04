export const currentJarReducer = (state={index: 2}, action) => {
    switch (action.type){
      case "SET_CURRENT_JAR":
        
        return action.payload
      default:
        return state
    }
  }
import {combineReducers} from 'redux'
import { modalReducer } from './modalReducer'
import { currentJarReducer } from './currentJar'
import { resultsReducer } from './resultsReducer'

export const rootReducer = combineReducers({
  modalOpen: modalReducer,
  currentJar: currentJarReducer,
  results: resultsReducer
})
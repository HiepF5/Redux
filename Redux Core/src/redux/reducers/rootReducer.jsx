import { combineReducers } from 'redux'
import nameReducer from './namereducer'
import ageReducer from './ageReducer'
const rootReducers = combineReducers({
  nameReducer,
  ageReducer
})
export default rootReducers

import { createStore } from 'redux'
import rootReducers from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const composeEnhancers = composeWithDevTools()
export const store = createStore(rootReducers, composeEnhancers)

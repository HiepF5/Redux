import { configureStore } from '@reduxjs/toolkit'
import userSlice from './toolkits/userSlice'

export const store = configureStore({
  reducer: {
    userState: userSlice
  }
})
// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

// import rootReducers from './reducers/rootReducer'
// import thunkMiddleware from './redux-thunk'

// const middlewares = [thunkMiddleware]
// const middlewareEnhancers = applyMiddleware(...middlewares)

// const composeEnhancers = composeWithDevTools(middlewareEnhancers)

// export const store = createStore(rootReducers, composeEnhancers)

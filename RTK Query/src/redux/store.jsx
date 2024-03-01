import { configureStore } from '@reduxjs/toolkit'
import userSlice from './toolkits/userSlice'
import userQuery from './rtk-query/userQuery'
export const store = configureStore({
  reducer: {
    userState: userSlice,
    [userQuery.reducerPath]: userQuery.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userQuery.middleware)
})
// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

// import rootReducers from './reducers/rootReducer'
// import thunkMiddleware from './redux-thunk'

// const middlewares = [thunkMiddleware]
// const middlewareEnhancers = applyMiddleware(...middlewares)

// const composeEnhancers = composeWithDevTools(middlewareEnhancers)

// export const store = createStore(rootReducers, composeEnhancers)

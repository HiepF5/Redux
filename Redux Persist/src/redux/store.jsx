import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from './toolkits/userSlice'
import themeSlice from './toolkits/themeSlice'
import userQuery from './rtk-query/userQuery'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
import persistReducer from 'redux-persist/es/persistReducer'
const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['users', 'userState'],
  whitelist: ['themeState']
}

const usersPersistConfig = {
  key: 'userState',
  storage,
  // blacklist: ['data']
  whitelist: ['token']
}

const rootReducer = combineReducers({
  userState: persistReducer(usersPersistConfig, userSlice),
  themeState: themeSlice,
  [userQuery.reducerPath]: userQuery.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(userQuery.middleware)
})
setupListeners(store.dispatch)
export const persistor = persistStore(store)
// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

// import rootReducers from './reducers/rootReducer'
// import thunkMiddleware from './redux-thunk'

// const middlewares = [thunkMiddleware]
// const middlewareEnhancers = applyMiddleware(...middlewares)

// const composeEnhancers = composeWithDevTools(middlewareEnhancers)

// export const store = createStore(rootReducers, composeEnhancers)

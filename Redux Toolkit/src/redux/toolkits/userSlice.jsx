import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as userAPI from '../../api/userApi'

export const getUsers = createAsyncThunk('users/getUsers', async (payload, thunkAPI) => {
  const data = await userAPI.getUsers()
  return data
})

export const createUser = createAsyncThunk('users/createUser', async (newUser, thunkAPI) => {
  const state = thunkAPI.getState().userState
  const data = await userAPI.createUser(newUser)
  return [data, ...state.data]
})

export const updateUser = createAsyncThunk('users/updateUser', async (newUser, thunkAPI) => {
  const state = thunkAPI.getState().userState
  await userAPI.updateUser(newUser)
  return state.data?.map((item) => (item.id === newUser.id ? newUser : item))
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id, thunkAPI) => {
  const state = thunkAPI.getState().userState
  await userAPI.deleteUser(id)
  return state.data?.filter((item) => item.id !== id)
})

const initialState = {
  data: [],
  loading: false,
  error: undefined
}
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
          return action.type.startsWith('users/') && action.type.endsWith('/pending')
        },
        (state, action) => {
          state.loading = true
        }
      )
      .addMatcher(
        (action) => {
          return action.type.startsWith('users/') && action.type.endsWith('/fulfilled')
        },
        (state, action) => {
          state.loading = false
          state.data = action.payload
        }
      )
      .addMatcher(
        (action) => {
          return action.type.startsWith('users/') && action.type.endsWith('/rejected')
        },
        (state, action) => {
          state.loading = false
          state.error = action.error
        }
      )
  }
})
export default userSlice.reducer

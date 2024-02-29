import * as userApi from '../../api/userApi'
import * as userAction from '../actions/userAction'

export const getUsers = () => async (dispatch) => {
  dispatch(userAction.fetch_request())

  try {
    const data = await userApi.getUsers()
    dispatch(userAction.fetch_success(data))
  } catch (err) {
    dispatch(userAction.fetch_error(err))
  }
}

export const createUser = (newUser) => async (dispatch) => {
  dispatch(userAction.create_request())

  try {
    const data = await userApi.createUser(newUser)
    dispatch(userAction.create_success(data))
  } catch (err) {
    dispatch(userAction.create_error(err))
  }
}

export const updateUser = (newUser) => async (dispatch) => {
  dispatch(userAction.update_request())

  try {
    await userApi.updateUser(newUser)
    dispatch(userAction.update_success(newUser))
  } catch (err) {
    dispatch(userAction.update_error(err))
  }
}

export const deleteUser = (id) => async (dispatch) => {
  dispatch(userAction.delete_request())

  try {
    await userApi.deleteUser(id)
    dispatch(userAction.delete_success(id))
  } catch (err) {
    dispatch(userAction.delete_error(err))
  }
}

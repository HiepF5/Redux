import { call, put, takeEvery, takeLatest, delay } from 'redux-saga/effects'
import * as userApi from '../../api/userApi'
import * as userAction from '../actions/userAction'
function* getUsers() {
  try {
    const data = yield call(userApi.getUsers)
    console.log(data)
    yield put(userAction.fetch_success(data))
  } catch (error) {
    yield put(userAction.fetch_error(error))
  }
}
function* createUsers(action) {
  // console.log(action)
  yield delay(2000)
  try {
    const data = yield call(userApi.createUser, action.payload)
    yield put(userAction.create_success(data))
  } catch (error) {
    yield put(userAction.create_error(error))
  }
}
function* updateUsers(action) {
  console.log(action)

  try {
    const data = yield call(() => userApi.updateUser(action.payload))
    yield put(userAction.update_success(data))
  } catch (error) {
    yield put(userAction.update_error(error))
  }
}
function* deleteUsers(action) {
  console.log(action)

  try {
    yield call(userApi.deleteUser, action.payload)
    yield put(userAction.delete_success(action.payload))
  } catch (err) {
    yield put(userAction.delete_error(err))
  }
}
function* userSaga() {
  yield takeEvery('users/fetch_request', getUsers)
  yield takeEvery('users/create_request', createUsers)
  yield takeEvery('users/update_request', updateUsers)
  yield takeEvery('users/delete_request', deleteUsers)
}
export default userSaga

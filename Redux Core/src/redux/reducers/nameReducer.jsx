function nameReducer(state = { name: 'HiepReducer' }, action) {
  console.log({ state, action })
  if (action.type === 'update_name') {
    const newState = { name: action.name }
    return newState
  }
  return state
}
export default nameReducer

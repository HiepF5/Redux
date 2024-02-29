import { useState, useEffect } from 'react'
import './App.css'
import { store } from './redux/store'
console.log(store)
function App() {
  const [state, setState] = useState(() => store.getState())
  useEffect(() => {
    store.subscribe(() => {
      const state = store.getState()
      setState(state)
      console.log(state)
    })
  }, [])
  const handleUpdateName = () => {
    const action = { type: 'update_name', name: 'HiepAction' }
    store.dispatch(action)
  }
  const handleUpdateAge = () => {
    const action = { type: 'update_age', age: 31 }
    store.dispatch(action)
  }
  return (
    <>
      <div>
        <h2>{state.nameReducer.name}</h2>
        <h2>{state.ageReducer.age}</h2>
        <button onClick={handleUpdateName}>Update Name</button>
        <button onClick={handleUpdateAge}>Update Age</button>
      </div>
    </>
  )
}

export default App

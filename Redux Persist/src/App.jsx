import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import Spinner from './components/Spinner'
import UserInput from './components/UserInput'
import userQuery from './redux/rtk-query/userQuery'
import Theme from './components/Theme'
import { useSelector } from 'react-redux'
function App() {
  const [editUser, setEditUser] = useState()
  const { bgColor } = useSelector((state) => state.themeState)
  // const id = undefined
  const {
    data: users,
    isLoading,
    error
  } = userQuery.useGetUsersQuery(
    undefined,
    // { pollingInterval: 3000 }
    // { skip: !id }
    // { refetchOnFocus: false }
    {
      selectFromResult: (result) => {
        return { ...result, data: result.data ?? [] }
      }
    }
  )
  console.log(users)

  return (
    <div className='wrap' style={{ background: bgColor }}>
      <Theme />
      <UserInput editUser={editUser} setEditUser={setEditUser} />

      {error && <span>{JSON.stringify(error)}</span>}

      <div className='card_container'>
        {users?.map((user) => (
          <React.Fragment key={user.id}>
            <Card user={user} setEditUser={setEditUser} />
          </React.Fragment>
        ))}
      </div>

      {isLoading && <Spinner />}
    </div>
  )
}

export default App

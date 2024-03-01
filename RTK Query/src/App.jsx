import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import Spinner from './components/Spinner'
import UserInput from './components/UserInput'
import userQuery from './redux/rtk-query/userQuery'
function App() {
  const [editUser, setEditUser] = useState()
  const {
    data: users,
    isLoading,
    error
  } = userQuery.useGetUsersQuery(
    undefined
    // { pollingInterval: 3000 }
    // { skip: true }
  )

  return (
    <div className='wrap'>
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

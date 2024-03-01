import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const userQuery = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000'
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().userState?.token

    //   if (token) {
    //     headers.set('Authorization', token)
    //   }

    //   return headers
    // }
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: `/users`, method: 'GET' })
      // providesTags: ['Users']
      // transformResponse: (response, meta, arg) => {
      //   return [...response].reverse()
      // }
    }),
    createUsers: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser
      }),
      async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        const res = await queryFulfilled
        dispatch(
          userQuery.util.updateQueryData('getUsers', undefined, (userData) => {
            return [res.data, ...userData]
          })
        )
      }
      // invalidatesTags: ['Users']
    }),
    updateUsers: builder.mutation({
      // use + UdapteUser + Mutation
      query: (newUser) => ({
        url: `/users/${newUser.id}`,
        method: 'PUT',
        body: newUser
      }),
      async onQueryStarted(newUser, { dispatch }) {
        dispatch(
          userQuery.util.updateQueryData('getUsers', undefined, (userData) => {
            return userData?.map((item) => (item.id === newUser.id ? newUser : item))
          })
        )
      }
      // invalidatesTags: ['Users']
    }),
    deleteUser: builder.mutation({
      // use + DeleteUser + Mutation
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE'
      }),
      async onQueryStarted(id, { dispatch }) {
        dispatch(
          userQuery.util.updateQueryData('getUsers', undefined, (userData) => {
            return userData?.filter((item) => item.id !== id)
          })
        )
      }
      // invalidatesTags: ['Users']
    })
  })
})
export const userSelector = userQuery.endpoints.getUsers.select()

export default userQuery

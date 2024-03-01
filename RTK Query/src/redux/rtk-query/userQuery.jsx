import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const userQuery = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000'
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({ url: '/users', method: 'GET' })
      // transformResponse: (response, meta, arg) => {
      //   return [...response].reverse()
      // }
    })
  })
})
export default userQuery

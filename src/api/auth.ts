import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../urlForAPis';



export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
    }),
  }),
})

// export react hook
export const { useGetUserDetailsQuery } = authApi
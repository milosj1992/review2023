import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../urlForAPis';

const baseQuerySingle = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuerySingle(args, api, extraOptions);
  console.log(result);
  if (result?.error?.status === 401) {
    console.log('erorr');
    api.dispatch(logout());
    localStorage.removeItem('userToken');
  } else {
    return result;
  }
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (build) => ({
    getUserDetails: build.query({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

// export react hook
export const { useGetUserDetailsQuery } = authApi;

import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../urlForAPis';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../app/store';

const baseQuerySingle = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.userToken as string;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
) => {
  let result = await baseQuerySingle(args, api, extraOptions);
  if ((result?.data as { statusCode?: number })?.statusCode === 401) {
    api.dispatch(logout());
    localStorage.removeItem('userToken');
    return Promise.reject(result);
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

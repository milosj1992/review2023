import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from './authActions';

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;
/**
 * {
  "id": 15,
  "username": "kminchelle",
  "email": "kminchelle@qq.com",
  "firstName": "Jeanne",
  "lastName": "Halvorson",
  "gender": "female",
  "image": "https://robohash.org/autquiaut.png",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY5MjE5ODYxMiwiZXhwIjoxNjkyMjAyMjEyfQ.t2dExC1LcSAE0YXvh6E-kIbB15Z-a5-ZekGLdb3fWbI"
}
 */
// export type User = {
//   username: string;
//   email: string;
//   role: 'admin' | 'user' | 'moderator';
// };
export interface User {
  email: string;
  firstName: string;
  gender: string;
  id: number | null;
  image: string;
  lastName: string;
  token: string;
  username: string;
}

export interface AuthStateType {
  loading: boolean;
  userInfo: User | null;
  userToken: string | null;
  error: string;
  success: boolean;
}

const initialState: AuthStateType = {
  loading: false,
  userInfo: null,
  userToken: userToken,
  error: '',
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken'); // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = '';
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      (state.loading = false), (state.userToken = payload.data.userToken);
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;

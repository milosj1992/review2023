import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userLogin } from './authActions';
import { LoginResponse, User } from '../../models/LoginResponse';

interface AuthStateType {
  loading: boolean;
  userInfo: User | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

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
  extraReducers: (builder) => {
    builder
      .addCase(
        userLogin.pending,
        (state: { loading: boolean; error: string | null }) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addCase(
        userLogin.fulfilled,
        (
          state: AuthStateType,
          {
            payload,
          }: PayloadAction<{
            data: LoginResponse;
          }>,
        ) => {
          console.log(payload);
          state.loading = false;
          state.error = null;
          state.userToken = payload.data.userToken;
        },
      )
      .addCase(
        userLogin.rejected,
        (
          state: { loading: boolean; error: string | null },
          { payload }: PayloadAction<any>,
        ) => {
          console.log(payload);
          state.loading = false;
          state.error = payload;
        },
      );
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;

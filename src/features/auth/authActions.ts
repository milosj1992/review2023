import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../urlForAPis';
import { logout } from './authSlice';
import { useAppDispatch } from '../../app/store';
const backendURL = baseUrl;

interface LoginCredentials {
  username: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${backendURL}/user/login`,
        { username, password },
        config,
      );

      // store user's token in local storage

      localStorage.setItem('userToken', data.userToken);

      return { data };
    } catch (error) {
      console.log(error);
      // let error: AxiosError<ValidationErrors> = err;
      // return custom error message from API if any
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      } else {
        return rejectWithValue('stock error');
      }
    }
  },
);

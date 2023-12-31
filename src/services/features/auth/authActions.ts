import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../urlForAPis';
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
        `${backendURL}/login`,
        { username, password },
        config,
      );

      localStorage.setItem('userToken', data.userToken);

      return { data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      } else {
        return rejectWithValue(error);
      }
    }
  },
);

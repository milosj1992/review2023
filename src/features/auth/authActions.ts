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
axios.interceptors.response.use(
  function (response) {
    console.log(response)
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.data.statusCode===400){
      
      return Promise.reject("Status code 400")
    }
    else if(response.data.statusCode===500){
      return Promise.reject("Status code 500")
    }
    return response;
  },
  function (error) {
    console.log(error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
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

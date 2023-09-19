import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { baseUrl } from "../../urlForAPis"
const backendURL = baseUrl

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
                }

            }
            const { data } = await axios.post(
                `${backendURL}/user/login`,
                { username, password },
                config
            )   
                
            // store user's token in local storage
            localStorage.setItem('userToken', data.userToken)
            // console.log(data);
            return data
        }
        catch (error) {
            // let error: AxiosError<ValidationErrors> = err;
            // return custom error message from API if any
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data.message) {
                    return rejectWithValue(error.response.data.message)
                } else {
                    return rejectWithValue(error.message)
                }
            }

            else {
                return rejectWithValue("stock error");
            }
        }
    }
)

// export const registerUser = createAsyncThunk(
//     'auth/register',
//     async ({ firstName, email, password }, { rejectWithValue }) => {
//         try {
//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             }

//             await axios.post(
//                 `${backendURL}/api/user/register`,
//                 { firstName, email, password },
//                 config
//             )
//         } catch (error) {
//             if (error.response && error.response.data.message) {
//                 return rejectWithValue(error.response.data.message)
//             } else {
//                 return rejectWithValue(error.message)
//             }
//         }
//     }
// )
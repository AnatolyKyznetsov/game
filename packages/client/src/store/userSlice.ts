import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Urls } from '../utils/api'
import { request } from '../utils/request'

export interface User {
    userData: UserData
}

export interface UserData {
    id: number | null
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string
}

type SignupData = Omit<UserData, 'id' | 'display_name' | 'avatar'>

export const registerUser = createAsyncThunk('user/register', async (data: SignupData) => {
    const { baseUrl, signup } = Urls
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = request(`${baseUrl}${signup}`, options)
    return response
})

const initialState: User = {
    userData: {
        id: null,
        first_name: '',
        second_name: '',
        display_name: '',
        login: '',
        email: '',
        phone: '',
        avatar: '',
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserEmail: (state, { payload }) => {
            state.userData.email = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, (state, { payload }) => {
            const { id } = payload
            state.userData.id = id
        })
    }
})

export const { changeUserEmail } = userSlice.actions

export const userReducer = userSlice.reducer

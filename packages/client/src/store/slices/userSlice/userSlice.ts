import { createSlice } from '@reduxjs/toolkit'
import { getUserInfo, logoutUser, registerUser, signinUser } from './actions'

export interface User {
    userData: UserData,
    isAuth: boolean
}

export interface UserData {
    id: number | null
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string,
    password?: string
}

const initialState: User = {
    isAuth: false,
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
        builder
            .addCase(signinUser.fulfilled, (state) => {
                state.isAuth = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                const { id } = payload
                state.userData.id = id
                state.isAuth = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuth = false;
            })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.userData = payload;
            })
    }
})

export const { changeUserEmail } = userSlice.actions

export const userReducer = userSlice.reducer

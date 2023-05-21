import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    changeAvatar,
    changePassword,
    changeUser,
    getUserInfo,
    registerUser,
    logoutUser,
    signinUser,
} from './actions'
import { UserData } from '../../../types/user'
interface User {
    isAuth: boolean
    userData: UserData
    isLoading: boolean
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
    },
    isLoading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserEmail: (state, { payload }) => {
            state.userData.email = payload
        },
    },
    extraReducers: {
        [registerUser.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            const { id } = action.payload
            state.userData.id = id
        },
        [registerUser.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [registerUser.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [signinUser.fulfilled.type]: (state: User) => {
            state.isLoading = false
            state.isAuth = true
        },
        [signinUser.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [signinUser.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [logoutUser.fulfilled.type]: (state: User) => {
            state.isLoading = false
            state.isAuth = false
        },
        [logoutUser.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [logoutUser.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [getUserInfo.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            state.userData = action.payload
        },
        [getUserInfo.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [getUserInfo.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [changeUser.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            state.userData = action.payload
        },
        [changeUser.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [changeUser.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [changeAvatar.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            state.userData.avatar = action.payload.avatar
        },
        [changeAvatar.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [changeAvatar.rejected.type]: (state: User) => {
            state.isLoading = false
        },

        [changePassword.fulfilled.type]: (state: User) => {
            state.isLoading = false
        },
        [changePassword.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [changePassword.rejected.type]: (state: User) => {
            state.isLoading = false
        },
    },
})

export const { changeUserEmail } = userSlice.actions

export const userReducer = userSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    changeAvatar,
    changePassword,
    changeUser,
    getUser,
    registerUser,
} from './actions'
import { UserData } from '../../../types/user'

interface User {
    userData: UserData
    isLoading: boolean
}

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

        [getUser.fulfilled.type]: (
            state: User,
            action: PayloadAction<UserData>
        ) => {
            state.isLoading = false
            state.userData = action.payload
        },
        [getUser.pending.type]: (state: User) => {
            state.isLoading = true
        },
        [getUser.rejected.type]: (state: User) => {
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

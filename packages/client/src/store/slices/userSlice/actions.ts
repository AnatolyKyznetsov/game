import { createAsyncThunk } from '@reduxjs/toolkit'
import { Urls } from '../../../utils/api'
import { request } from '../../../utils/request'
import { UserData } from './userSlice'
import { SigninData } from '../../../interfaces'

type SignupData = Omit<UserData, 'id' | 'display_name' | 'avatar'>

export const registerUser = createAsyncThunk('user/register', async (data: SignupData) => {
    const { baseUrl, signup } = Urls
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await request(`${baseUrl}${signup}`, options);
    if (response.ok) {
        return await response.json();
    }
})

export const signinUser = createAsyncThunk('user/signin', async (data: SigninData) => {
    const { baseUrl, signin } = Urls;
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    await request(`${baseUrl}${signin}`, options)
})

export const logoutUser = createAsyncThunk('user/logout', async () => {
    const { baseUrl, logout } = Urls;
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    await request(`${baseUrl}${logout}`, options);
})

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
    const { baseUrl, userInfo } = Urls;
    const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await request(`${baseUrl}${userInfo}`, options);
    if (response.ok) {
        return await response.json()
    }
})

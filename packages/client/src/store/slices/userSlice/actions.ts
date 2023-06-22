import { createAsyncThunk } from '@reduxjs/toolkit'
import { Urls } from '../../../utils/api'
import { request } from '../../../utils/request'
import { UserData } from '../../../types/user'
import { SigninData } from '../../../interfaces'

type SignupData = Omit<UserData, 'id' | 'display_name' | 'avatar'>
type ChangeUserData = Omit<UserData, 'id' | 'avatar'>
type ChangePasswordData = {
    oldPassword: string
    newPassword: string
}

export const registerUser = createAsyncThunk(
    'user/register',
    async (data: SignupData) => {
        const { baseUrl, signup } = Urls
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }
        const response = await request(`${baseUrl}${signup}`, options)
        if (response.ok) {
            return await response.json()
        } else {
            await response.json().then(result => {
                throw new Error(result.reason)
            })
        }
    }
)

export const getClientId = createAsyncThunk(
    'user/client_id',
    async () => {
        const { baseUrl, clientId } = Urls
        const options = {
            method: 'GET'
        }
        const response = await request(`${baseUrl}${clientId}`, options)
        if (response.ok) {
            return await response.json()
        } else {
            await response.json().then(result => {
                throw new Error(result.reason)
            })
        }
    }
)

export const oAuthYandex = createAsyncThunk(
    'user/oauth_yandex',
    async (code: string | number) => {
        const { baseUrl, oAuth } = Urls
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'code': code,
                'redirect_uri': Urls.redirectUri
            })
        }
        const response = await request(`${baseUrl}${oAuth}`, options)
        if (response.ok) {
            return response.ok;
        } else {
            await response.json().then(result => {
                throw new Error(result.reason)
            })
        }
    }
)

export const getUserInfo = createAsyncThunk('user/get_user', async () => {
    const { baseUrl, userInfo } = Urls
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }
    const response = await request(`${baseUrl}${userInfo}`, options)
    if (response.ok) {
        return await response.json()
    } else {
        throw new Error('Get user request failed')
    }
})

export const signinUser = createAsyncThunk('user/signin',async (data: SigninData) => {
    const { baseUrl, signin } = Urls
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }

    const response = await request(`${baseUrl}${signin}`, options);
    if (!response.ok) {
        await response.json().then(result => {
            throw new Error(result.reason)
        })
    }
})

export const logoutUser = createAsyncThunk('user/logout', async () => {
    const { baseUrl, logout } = Urls
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    await request(`${baseUrl}${logout}`, options)
})

export const changeUser = createAsyncThunk(
    'user/change_user',
    async (data: ChangeUserData) => {
        const { baseUrl, userProfile } = Urls
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        }
        const response = await request(`${baseUrl}${userProfile}`, options)
        if (response.ok) {
            return {
                response: response.json(),
                success: true,
            }
        } else {
            return await response.json()
        }
    }
)

export const changeAvatar = createAsyncThunk(
    'user/change_avatar',
    async (data: FormData) => {
        const { baseUrl, userAvatar } = Urls
        const options = {
            method: 'PUT',
            body: data,
            credentials: 'include',
        }
        const response = await request(`${baseUrl}${userAvatar}`, options)

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error('Change avatar request failed')
        }
    }
)

export const changePassword = createAsyncThunk(
    'user/change_password',
    async (data: ChangePasswordData) => {
        const { baseUrl, userPassword } = Urls
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        }
        const response = await request(`${baseUrl}${userPassword}`, options)

        if (response.ok) {
            return { success: true }
        } else {
            return await response.json()
        }
    }
)

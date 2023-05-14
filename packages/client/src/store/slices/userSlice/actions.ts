import { createAsyncThunk } from '@reduxjs/toolkit'
import { Urls } from '../../../utils/api'
import { request } from '../../../utils/request'
import { UserData } from './userSlice'

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

import { createSlice } from '@reduxjs/toolkit'
import { UserData } from '../userSlice/userSlice'

export interface Chat {
    id: number | null
    title: string
    avatar: string
    unread_count: number | null
    last_message: LastMessage
}

export interface LastMessage {
    user: Omit<UserData, 'id' | 'display_name'>
    time: string
    content: string
}

const initialState: Chat[] = [ {
    id: null,
    title: '',
    avatar: '',
    unread_count: null,
    last_message: {
        user: {
            first_name: '',
            second_name: '',
            avatar: '',
            email: '',
            login: '',
            phone: '',
        },
        time: '',
        content: '',
    }
} ]

const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {},
})

export const forumReducer = forumSlice.reducer

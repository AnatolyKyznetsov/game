import { createSlice } from '@reduxjs/toolkit'

export interface LeaderBoard {
    ratingFieldName: string
    cursor: number | null
    limit: number | null
}

const initialState: LeaderBoard = {
    ratingFieldName: '',
    cursor: null,
    limit: null,
}

const leaderBoardSlice = createSlice({
    name: 'leaderBoard',
    initialState,
    reducers: {},
})

export const leaderBoardReducer = leaderBoardSlice.reducer

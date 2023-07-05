import { createSlice } from '@reduxjs/toolkit'

interface Game {
    success: boolean,
    time: string | null,
}

const initialState: Game = {
    success: false,
    time: null
}

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setFinishStatus: (state, { payload }) => {
            state.success = payload
        },
        setFinishTime: (state, { payload }) => {
            state.time = payload
        },
    },
})

export const { setFinishStatus, setFinishTime } = gameSlice.actions

export const gameReducer = gameSlice.reducer

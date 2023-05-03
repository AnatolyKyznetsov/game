import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { leaderBoardReducer } from './leaderBoardSlice'
import { forumReducer } from './forumSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        leaderBoard: leaderBoardReducer,
        forum: forumReducer,
    } 
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

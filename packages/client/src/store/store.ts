import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slices/userSlice/userSlice'
import { leaderBoardReducer } from './slices/leaderBoardSlice/leaderBoardSlice'
import { forumReducer } from './slices/forumSlice/forumSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        leaderBoard: leaderBoardReducer,
        forum: forumReducer,
    } 
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

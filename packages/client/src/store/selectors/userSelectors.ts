import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'

const selectUser = (state: RootState) => state.user
/**
 * Returns user data
 */
export const selectUserData = createSelector([ selectUser ], user => user.userData)
/**
 * Returns isloading value
 */
export const selectIsLoadingUser = createSelector([ selectUser ], user => user.isLoading)

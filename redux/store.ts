import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import fontSizeSlice from './fontSizeSlice'
import modalSlice from './modalSlice'
import userSlice from './userSlice'
import sidebarSlice from './sidebarSlice'

export const store = configureStore({
  reducer: {
    fontSize: fontSizeSlice,
    modals: modalSlice,
    user: userSlice,
    sidebar: sidebarSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
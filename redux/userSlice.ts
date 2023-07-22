import { createSlice } from '@reduxjs/toolkit'

interface SliceType {
  email: string
  uid: string
  subscriptionPlan: string
}

const initialState: SliceType = {
    email: '',
    uid: '',
    subscriptionPlan: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.email = action.payload.email
        state.uid = action.payload.uid
        state.subscriptionPlan = action.payload.subscriptionPlan
    },

    signOutUser: () => {
        return initialState
    },
  }
});

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer
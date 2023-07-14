import { createSlice } from '@reduxjs/toolkit'

interface SliceType {
  email: string
  uid: string
  premium: string
}

const initialState: SliceType = {
    email: '',
    uid: '',
    premium: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.email = action.payload.email
        state.uid = action.payload.uid
    },

    signOutUser: (state) => {
        state.email = ''
    },

    setPremium: (state, action) => {
      state.premium = action.payload
    }
  }
});

export const { setUser, signOutUser, setPremium } = userSlice.actions

export default userSlice.reducer
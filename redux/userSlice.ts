import { createSlice } from '@reduxjs/toolkit'

interface SliceType {
  email: string
  uid: string
}

const initialState: SliceType = {
    email: '',
    uid: '',
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

  }
});

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer